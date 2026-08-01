'use server';
import { createClient } from '@supabase/supabase-js';
import { headers } from 'next/headers';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Baca byte asli file. JPEG = FF D8 FF | PNG = 89 50 4E 47
function detectMagic(buf: Buffer): 'jpeg' | 'png' | null {
  if (buf.length < 4) return null;
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return 'jpeg';
  if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) return 'png';
  return null; // bukan gambar asli → kemungkinan script/HTML berkedok .jpg
}

export async function submitDonationWithProof(formData: FormData) {
  try {
    // === LAYER 1: ORIGIN ===
    const h = await headers();
    const origin = h.get('origin');
    const referer = h.get('referer');
    const allowed = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001';
    if (origin !== allowed && !referer?.includes(allowed)) {
      return { success: false, message: 'Request tidak valid.' };
    }

    // === LAYER 2: HONEYPOT ===
    if ((formData.get('website_url') || '').toString().trim() !== '') {
      return { success: false, message: 'Aktivitas mencurigakan.' };
    }

    // === LAYER 3: TIME-TRAP (manusia butuh >4 detik) ===
    const t = Number(formData.get('submit_time'));
    if (!t || Date.now() - t < 4000) {
      return { success: false, message: 'Terlalu cepat. Isi form dengan benar.' };
    }

    // === LAYER 4: SANITASI + VALIDASI SERVER (sumber kebenaran, bukan client) ===
    const name   = ((formData.get('name')   as string) || 'Hamba Allah').trim().slice(0, 100);
    const phone  = ((formData.get('phone')  as string) || '').replace(/\D/g, '').slice(0, 15);
    const amount = Number(formData.get('amount'));
    const title  = ((formData.get('program_title') as string) || 'Sedekah Umum').trim().slice(0, 200);
    const pid    = (formData.get('program_id') as string) || null;
    const msg    = ((formData.get('message') as string) || '').trim().slice(0, 300) || null;

    if (amount < 10000 || amount > 100000000) return { success: false, message: 'Nominal tidak valid.' };
    if (phone.length < 10)                    return { success: false, message: 'Nomor WA wajib & valid.' }; // <-- IDENTITAS TIDAK BISA KOSONG

    // === LAYER 5: FILE — validasi GANDA (header + magic number) ===
    const file = formData.get('payment_proof') as File | null;
    if (!file || file.size === 0)             return { success: false, message: 'Bukti transfer wajib.' };
    if (file.size > 5 * 1024 * 1024)          return { success: false, message: 'Maksimal 5MB.' };

    const ext = file.name.split('.').pop()?.toLowerCase();
    if (!['jpg', 'jpeg', 'png'].includes(ext || '')) return { success: false, message: 'Hanya JPG/PNG.' };

    const bytes  = Buffer.from(await file.arrayBuffer());
    const magic  = detectMagic(bytes);
    const isJpeg = ext === 'jpg' || ext === 'jpeg';
    if ((isJpeg && magic !== 'jpeg') || (!isJpeg && magic !== 'png')) {
      return { success: false, message: 'File rusak / bukan gambar asli.' }; // anti polyglot/injection
    }

    // === UPLOAD (nama random → anti path-traversal) ===
    const safeName = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}.${magic === 'jpeg' ? 'jpg' : 'png'}`;
    const filePath = `proofs/${safeName}`;
    const { error: upErr } = await supabase.storage.from('payment-proofs')
      .upload(filePath, bytes, { contentType: magic === 'jpeg' ? 'image/jpeg' : 'image/png', upsert: false });
    if (upErr) return { success: false, message: 'Gagal unggah bukti.' };

    // === INSERT (status DIPAKSA PENDING; RLS + trigger yang ngatur sisanya) ===
    const { error: dbErr } = await supabase.from('donations').insert([{
      name, phone, amount, program_title: title, program_id: pid,
      message: msg, status: 'PENDING',
      payment_proof_path: filePath,   // <-- simpan PATH, bukan publicUrl
      payment_proof_url: null,
    }]);

    if (dbErr) {
      await supabase.storage.from('payment-proofs').remove([filePath]); // rollback file
      return { success: false, message: 'Gagal simpan donasi.' };
    }
    return { success: true, message: 'Donasi tercatat! Menunggu verifikasi admin (1x24 jam).' };
  } catch (e) {
    return { success: false, message: 'Kesalahan sistem. Coba lagi.' };
  }
}