'use server';
import { createClient } from '@supabase/supabase-js';
import { headers } from 'next/headers';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

/**
 * Deteksi magic number file secara akurat untuk mendukung format mobile modern
 * (JPEG, PNG, WebP, GIF, HEIC/HEIF)
 */
function detectImageType(buf: Buffer): 'jpeg' | 'png' | 'webp' | 'gif' | 'heic' | null {
  if (!buf || buf.length < 4) return null;

  // JPEG: FF D8 FF
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return 'jpeg';

  // PNG: 89 50 4E 47
  if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) return 'png';

  // WEBP: RIFF .... WEBP
  if (
    buf.length >= 12 &&
    buf[0] === 0x52 && buf[1] === 0x49 && buf[2] === 0x46 && buf[3] === 0x46 &&
    buf[8] === 0x57 && buf[9] === 0x45 && buf[10] === 0x42 && buf[11] === 0x50
  ) {
    return 'webp';
  }

  // GIF: GIF8
  if (buf[0] === 0x47 && buf[1] === 0x49 && buf[2] === 0x46 && buf[3] === 0x38) return 'gif';

  // HEIC / HEIF (Common iPhone screenshot format)
  if (buf.length >= 12 && buf[4] === 0x66 && buf[5] === 0x74 && buf[6] === 0x79 && buf[7] === 0x70) return 'heic';

  return null;
}

export async function submitDonationWithProof(formData: FormData) {
  try {
    // === LAYER 1: VALIDASI ORIGIN DYNAMIC (Cegah False Positive pada Human) ===
    const h = await headers();
    const origin = h.get('origin') || '';
    const host = h.get('host') || '';
    const envAppUrl = (process.env.NEXT_PUBLIC_APP_URL || '').replace(/^\"|\"$/g, '').trim();

    if (origin) {
      const cleanOrigin = origin.replace(/^https?:\/\//, '').split(':')[0];
      const cleanHost = host.split(':')[0];
      const isLocalDev = cleanOrigin === 'localhost' || cleanOrigin === '127.0.0.1';
      const matchesHost = cleanHost && cleanOrigin.includes(cleanHost);
      const matchesEnv = envAppUrl && origin.includes(envAppUrl.replace(/^https?:\/\//, ''));

      if (!isLocalDev && !matchesHost && !matchesEnv) {
        console.warn(`[Donate Action] Origin rejected: origin=${origin}, host=${host}, env=${envAppUrl}`);
        return { success: false, message: 'Domain / Origin permintaan tidak sesuai.' };
      }
    }

    // === LAYER 2: HONEYPOT (Hanya Bot Otomatis yang mengisi field tersembunyi ini) ===
    const honeypot = (formData.get('website_url') || '').toString().trim();
    if (honeypot !== '') {
      console.warn('[Donate Action] Bot detected via Honeypot field');
      return { success: false, message: 'Aktivitas otomatis terdeteksi.' };
    }

    // === LAYER 3: TIME-TRAP AMAN (Hanya blokir bot script dengan 0ms delay) ===
    const submitTime = Number(formData.get('submit_time'));
    if (submitTime && Date.now() - submitTime < 500) {
      return { success: false, message: 'Permintaan terlalu cepat. Harap coba lagi.' };
    }

    // === LAYER 4: SANITASI & VALIDASI INPUT SERVER ===
    const name   = ((formData.get('name')   as string) || 'Hamba Allah').trim().slice(0, 100);
    const phone  = ((formData.get('phone')  as string) || '').replace(/\D/g, '').slice(0, 15);
    const amount = Number(formData.get('amount'));
    const title  = ((formData.get('program_title') as string) || 'Sedekah Umum').trim().slice(0, 200);
    const pid    = (formData.get('program_id') as string) || null;
    const msg    = ((formData.get('message') as string) || '').trim().slice(0, 300) || null;

    if (!amount || amount < 10000 || amount > 100000000) {
      return { success: false, message: 'Nominal donasi minimal Rp 10.000.' };
    }
    if (phone.length < 8 || phone.length > 15) {
      return { success: false, message: 'Nomor WhatsApp wajib valid (8–15 digit).' };
    }

    // === LAYER 5: VALIDASI BUKTI TRANSFER FILE ===
    const file = formData.get('payment_proof') as File | null;
    if (!file || file.size === 0) {
      return { success: false, message: 'File bukti transfer wajib diunggah.' };
    }
    if (file.size > 10 * 1024 * 1024) {
      return { success: false, message: 'Ukuran file maksimal 10MB.' };
    }

    const ext = (file.name.split('.').pop() || '').toLowerCase();
    const allowedExts = ['jpg', 'jpeg', 'png', 'webp', 'jfif', 'heic'];
    if (!allowedExts.includes(ext)) {
      return { success: false, message: 'Format file harus berupa gambar (JPG, PNG, WebP, HEIC).' };
    }

    const bytes = Buffer.from(await file.arrayBuffer());
    const detectedType = detectImageType(bytes);

    // Jika magic number gagal mengenali namun ekstensi valid, tetap berikan toleransi jika buffer valid
    const finalExt = detectedType || (ext === 'jpeg' ? 'jpg' : ext);
    const contentTypeMap: Record<string, string> = {
      jpeg: 'image/jpeg',
      jpg: 'image/jpeg',
      png: 'image/png',
      webp: 'image/webp',
      gif: 'image/gif',
      heic: 'image/heic',
    };
    const mimeType = contentTypeMap[finalExt] || file.type || 'image/jpeg';

    // === UPLOAD KE SUPABASE STORAGE ===
    const safeName = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}.${finalExt}`;
    const filePath = `proofs/${safeName}`;

    const { error: upErr } = await supabase.storage.from('payment-proofs')
      .upload(filePath, bytes, { contentType: mimeType, upsert: false });

    if (upErr) {
      console.error('[Donate Action] Storage Upload Error:', upErr);
      return { 
        success: false, 
        message: `Gagal mengunggah bukti: ${upErr.message || 'Error penyimpanan storage'}.` 
      };
    }

    // === SIMPAN KE SUPABASE DATABASE ===
    const { error: dbErr } = await supabase.from('donations').insert([{
      name: name || 'Hamba Allah',
      phone,
      amount,
      program_title: title,
      program_id: pid,
      message: msg,
      status: 'PENDING',
      payment_proof_path: filePath,
      payment_proof_url: null,
    }]);

    if (dbErr) {
      console.error('[Donate Action] Database Insert Error:', dbErr);
      // Rollback file di storage jika simpan DB gagal
      await supabase.storage.from('payment-proofs').remove([filePath]);
      return { 
        success: false, 
        message: `Gagal menyimpan data donasi: ${dbErr.message || 'Error database'}.` 
      };
    }

    return { 
      success: true, 
      message: 'Donasi & bukti transfer berhasil dikirim! Menunggu verifikasi admin (1x24 jam).' 
    };

  } catch (e: any) {
    console.error('[Donate Action] System Error:', e);
    return { success: false, message: `Kesalahan sistem: ${e?.message || 'Gagal memproses request'}.` };
  }
}