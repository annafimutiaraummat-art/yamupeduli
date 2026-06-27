'use client';

import { useState } from 'react';
import { ShieldCheck, Heart, ArrowRight, Loader2, Copy, CheckCircle2, HandHeart } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

import { createClient } from '@supabase/supabase-js';
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function SedekahPage() {
  const [submitLoading, setSubmitLoading] = useState(false);
  const [copiedBank, setCopiedBank] = useState('');

  // Form States
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [donorName, setDonorName] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [isAnon, setIsAnon] = useState(false);
  const [doaMessage, setDoaMessage] = useState('');

  const presets = [50000, 100000, 250000, 500000];
  
  // Menghapus titik pada string sebelum diubah jadi angka untuk kalkulasi
  const rawCustomAmount = Number(customAmount.replace(/\./g, ''));
  const finalAmount = selectedAmount || rawCustomAmount || 0;

  const bankAccounts = [
    { bank: 'BJB', acc: '1234567890', name: 'YAMU Peduli' },
    { bank: 'Mandiri', acc: '0987654321', name: 'YAMU Peduli' },
    { bank: 'BCA', acc: '1122334455', name: 'YAMU Peduli' },
    { bank: 'BRI', acc: '5544332211', name: 'YAMU Peduli' },
  ];

  const copyToClipboard = (text: string, bank: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBank(bank);
    setTimeout(() => setCopiedBank(''), 2000);
  };

  // HANDLER: Format Titik Otomatis Saat Ngetik Nominal
  const handleCustomInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAmount(null);
    const rawValue = e.target.value.replace(/[^0-9]/g, '');
    if (!rawValue) {
      setCustomAmount('');
      return;
    }
    setCustomAmount(Number(rawValue).toLocaleString('id-ID'));
  };

  const handleDonateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (finalAmount < 10000) return toast.error('Minimal donasi adalah Rp 10.000');
    if (!donorPhone) return toast.error('Nomor WhatsApp wajib diisi');

    setSubmitLoading(true);

    try {
      const finalName = isAnon ? 'Hamba Allah' : donorName || 'Hamba Allah';

      // 1. Simpan ke Database dengan Doa Donatur (Bukan pesan mati admin lagi)
      const { error } = await supabase.from('donations').insert([{
        name: finalName,
        phone: donorPhone,
        amount: finalAmount,
        program_title: 'Sedekah Umum / Bebas',
        program_id: null, 
        status: 'PENDING',
        message: doaMessage || null // <--- Menyimpan doa ke database
      }]);

      if (error) throw error;

      const adminPhone = "6281388898967"; // Pastikan ini nomor WA Admin yang benar

      // 2. Template WA Cerdas (Otomatis nambahin baris doa kalau diisi)
      const waText = `Halo Admin YAMU Peduli, saya ingin konfirmasi transfer donasi.
      *Nama:* ${finalName}
      *Tujuan:* Sedekah Umum / Operasional
      *Nominal:* Rp ${finalAmount.toLocaleString('id-ID')}
      ${doaMessage ? `*Doa/Harapan:* "${doaMessage}"\n` : ''}
      Berikut saya lampirkan bukti transfernya:`;

      const encodedText = encodeURIComponent(waText);
      window.open(`https://wa.me/${adminPhone}?text=${encodedText}`, '_blank');
      
      // 3. Reset form setelah berhasil
      setCustomAmount(''); 
      setSelectedAmount(null); 
      setDonorName(''); 
      setDonorPhone('');
      setDoaMessage(''); // <--- Jangan lupa reset kolom doanya juga
    } catch (err: any) {
      toast.error(`Terjadi kesalahan: ${err.message}`);
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased pb-24 selection:bg-teal-500 selection:text-white">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { opacity: 0; animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}} />

      {/* HEADER BANNER */}
      <div className="bg-teal-950 pt-24 pb-32 px-6 text-center border-b border-teal-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1593113543327-0b1a0e88ba92?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center"></div>
        <div className="max-w-3xl mx-auto space-y-4 relative z-10 animate-fade-in-up">
          <div className="mx-auto w-16 h-16 bg-teal-800/50 rounded-2xl flex items-center justify-center border border-teal-700/50 mb-4 shadow-lg text-amber-400">
            <HandHeart className="w-8 h-8" />
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            Sedekah Bebas
          </h1>
          <p className="text-teal-100/80 text-sm md:text-base max-w-xl mx-auto font-normal">
            Bantu operasional yayasan dan program-program kebaikan yang tidak terikat target. Setiap rupiah Anda adalah bensin penggerak kebaikan.
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 lg:px-8 relative z-20 -mt-20">
        <form onSubmit={handleDonateSubmit} className="bg-white rounded-[2rem] p-6 md:p-10 shadow-2xl border border-slate-200/60 space-y-6 animate-fade-in-up">
          
          <div className="text-center border-b border-slate-100 pb-6">
            <h3 className="font-black text-slate-900 text-xl">Mulai Bersedekah</h3>
            <p className="text-xs text-slate-400 mt-1">100% amanah tanpa potongan pihak ketiga.</p>
          </div>

          <div className="space-y-3">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">1. Pilih Nominal Sedekah</span>
            <div className="grid grid-cols-2 gap-3">
              {presets.map((amt) => (
                <button key={amt} type="button" onClick={() => { setSelectedAmount(amt); setCustomAmount(''); }} className={`py-3.5 rounded-xl font-bold text-sm border transition-all shadow-sm ${selectedAmount === amt ? 'bg-teal-600 border-teal-600 text-white shadow-teal-600/20' : 'bg-white text-slate-600 hover:border-teal-400'}`}>
                  Rp {amt.toLocaleString('id-ID')}
                </button>
              ))}
            </div>
            <div className="relative mt-2">
              <span className="absolute left-4 top-3.5 font-black text-slate-400 text-sm">Rp</span>
              <input 
                type="text" 
                placeholder="Nominal lainnya (Min. 10.000)"
                maxLength={20}
                value={customAmount} 
                onChange={handleCustomInput} 
                className="w-full bg-slate-50 border rounded-xl py-3.5 pl-11 pr-4 text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all" 
              />
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">2. Data Diri & Harapan</span>
            <input maxLength={25} type="text" placeholder="Nama Lengkap" disabled={isAnon} value={isAnon ? 'Hamba Allah' : donorName} onChange={(e) => setDonorName(e.target.value)} className="w-full bg-slate-50 border rounded-xl py-3.5 px-4 text-sm font-medium focus:outline-none disabled:opacity-60 transition-all" />
            <input maxLength={13} type="number" required placeholder="Nomor WhatsApp Aktif (Wajib)" value={donorPhone} onChange={(e) => setDonorPhone(e.target.value)} className="w-full bg-slate-50 border rounded-xl py-3.5 px-4 text-sm font-medium focus:outline-none transition-all" />
            
            {/* KOTAK INPUT DOA BARU */}
            <textarea 
              rows={2}
              placeholder="Tulis doa atau harapan Anda di sini (Opsional)" 
              value={doaMessage} 
              maxLength={300}
              onChange={(e) => setDoaMessage(e.target.value)} 
              className="w-full bg-slate-50 border rounded-xl py-3 px-4 text-sm font-medium focus:outline-none transition-all resize-none"
            />

            <label className="flex items-center gap-2 cursor-pointer pt-1">
              <input type="checkbox" checked={isAnon} onChange={(e) => setIsAnon(e.target.checked)} className="rounded text-teal-600 w-4 h-4" />
              <span className="text-xs font-semibold text-slate-500">Sembunyikan nama (Tampil sebagai Hamba Allah)</span>
            </label>
          </div>

          <div className="space-y-3 pt-2 pb-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">3. Transfer ke Rekening Resmi</span>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-4">
              {bankAccounts.map((b) => (
                <div key={b.bank} className="flex justify-between items-center">
                  <div>
                    <span className="font-black text-slate-800 text-sm md:text-base block leading-none mb-1">{b.bank}</span>
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">A/N {b.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-teal-700 tracking-wider">{b.acc}</span>
                    <button type="button" onClick={() => copyToClipboard(b.acc, b.bank)} className="p-2 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-teal-600 hover:shadow-sm transition-all shadow-sm">
                      {copiedBank === b.bank ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <button type="submit" disabled={submitLoading || finalAmount < 10000} className="w-full py-4 bg-[#25D366] hover:bg-[#1EBE5D] disabled:bg-slate-200 disabled:text-slate-400 text-white font-black rounded-xl shadow-lg transition-all text-sm flex items-center justify-center gap-2 active:scale-[0.98]">
              {submitLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Konfirmasi via WhatsApp <ArrowRight className="w-4 h-4" /></>}
            </button>
            <p className="text-center text-[10px] font-bold text-slate-400 mt-4 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-500" /> Transaksi Aman & Terenkripsi
            </p>
          </div>

        </form>
      </div>
    </div>
  );
}