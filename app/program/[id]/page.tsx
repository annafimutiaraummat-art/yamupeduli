'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { ShieldCheck, Heart, MapPin, ArrowRight, Loader2, Copy, CheckCircle2, Share2 } from 'lucide-react';

import { createClient } from '@supabase/supabase-js';
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function ProgramDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const programId = unwrappedParams.id;

  const [program, setProgram] = useState<any>(null);
  const [loading, setLoading] = useState(true);
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
  
  // Menghapus titik pada string sebelum diubah jadi angka untuk kalkulasi database
  const rawCustomAmount = Number(customAmount.replace(/\./g, ''));
  const finalAmount = selectedAmount || rawCustomAmount || 0;

  const bankAccounts = [
    { bank: 'BJB', acc: '0070 2011 0209 83', name: 'YAYASAN AN-NAFI MUTIARA UMMAT' },
    { bank: 'Mandiri', acc: '164 000 293 3200', name: 'YAYASAN AN-NAFI MUTIARA UMMAT' },
    { bank: 'BCA', acc: '6801 143 498', name: 'YAYASAN AN-NAFI MUTIARA UMMAT' },
    { bank: 'BRI', acc: '1127 010 007 225 68', name: 'YAYASAN AN-NAFI MUTIARA UMMAT' },
  ];

  useEffect(() => {
    async function getSingleProgram() {
      setLoading(true);
      const { data } = await supabase.from('programs').select('*').eq('id', programId).single();
      if (data) setProgram(data);
      setLoading(false);
    }
    getSingleProgram();
  }, [programId]);

  const copyToClipboard = (text: string, bank: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBank(bank);
    setTimeout(() => setCopiedBank(''), 2000);
  };

  // HANDLER: Format Titik Otomatis Saat Ngetik Nominal
  const handleCustomInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAmount(null);
    // Hapus semua karakter selain angka
    const rawValue = e.target.value.replace(/[^0-9]/g, '');
    if (!rawValue) {
      setCustomAmount('');
      return;
    }
    // Ubah jadi format titik (Contoh: 10000 jadi 10.000)
    setCustomAmount(Number(rawValue).toLocaleString('id-ID'));
  };

  const handleDonateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (finalAmount < 10000) return alert('Minimal donasi adalah Rp 10.000');
    if (!donorPhone) return alert('Nomor WhatsApp wajib diisi');

    setSubmitLoading(true);

    try {
      const finalName = isAnon ? 'Hamba Allah' : donorName || 'Hamba Allah';

      const { error } = await supabase.from('donations').insert([{
        name: finalName,
        amount: finalAmount,
        program_title: program.title,
        program_id: program.id,
        status: 'PENDING',
        message: doaMessage || null 
      }]);

      if (error) throw error;

      const adminPhone = "6281234567890"; // GANTI DENGAN NO WA ADMIN LU
      const waText = `Halo Admin YAMU Peduli, saya ingin konfirmasi transfer donasi.
      *Nama:* ${finalName}
      *Tujuan:* Sedekah Umum / Operasional
      *Nominal:* Rp ${finalAmount.toLocaleString('id-ID')}
      ${doaMessage ? `*Doa/Harapan:* "${doaMessage}"\n` : ''}
      Berikut saya lampirkan bukti transfernya:`;

      const encodedText = encodeURIComponent(waText);
      window.open(`https://wa.me/${adminPhone}?text=${encodedText}`, '_blank');
      
      setCustomAmount('');
      setSelectedAmount(null); 
      setDonorName(''); 
      setDonorPhone('');
      setDoaMessage('');
    } catch (err: any) {
      alert(`Terjadi kesalahan: ${err.message}`);
    } finally {
      setSubmitLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-3 text-slate-400">
        <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
        <span className="text-xs font-bold uppercase tracking-wider">Memuat Detail...</span>
      </div>
    );
  }

  if (!program) return <div className="p-12 text-center font-bold text-slate-500">Program Tidak Ditemukan.</div>;
  
  const progress = Math.min(Math.round(((program.terkumpul || 0) / program.target) * 100), 100);
  
  // LOGIKA KUNCI TARGET: True jika terkumpul >= target atau statusnya 'Selesai'
  const isTargetReached = program.terkumpul >= program.target || program.status === 'Selesai';

  return (
  <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased pb-24">
    <div className="w-full h-[300px] lg:h-[380px] relative bg-slate-900">
      <img src={program.image_url} className="w-full h-full object-cover opacity-50" alt={program.title} />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-teal-950/20 to-transparent" />
    </div>

    <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 -mt-24 lg:-mt-32">
      <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 items-start">
          
          {/* ========================================== */}
          {/* KOLOM KIRI: FOKUS CERITA & DESKRIPSI (BERSIH) */}
          {/* ========================================== */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-xl border border-slate-200/60">
              <span className="inline-block px-4 py-1.5 bg-teal-50 text-teal-700 font-bold text-[10px] rounded-lg uppercase tracking-widest mb-5 border border-teal-100">
                {program.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-8 tracking-tight leading-snug">
                {program.title}
              </h1>
              
              {/* Teks deskripsi dibikin lebih enak dibaca (line-height lega) */}
              <div className="text-sm md:text-base text-slate-600 space-y-6 whitespace-pre-line leading-loose font-medium">
                {program.description}
              </div>
            </div>
          </div>

          {/* ========================================== */}
          {/* KOLOM KANAN: SIDEBAR DONASI (STICKY) */}
          {/* ========================================== */}
          <div className="lg:col-span-1 relative">
            <div className="sticky top-28 space-y-6">
              
              <form onSubmit={handleDonateSubmit} className="bg-white rounded-[2rem] p-6 shadow-2xl border border-slate-200/60 flex flex-col gap-6">
                
                {/* 1. INFO PENGGALANG DANA (Pindah ke atas form) */}
                <div className="flex items-center justify-between pb-5 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center shrink-0 border border-teal-100">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Penggalang Dana</p>
                      <p className="text-xs font-black text-slate-900 flex items-center gap-1 mt-0.5">
                        YAMU Peduli <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
                      </p>
                    </div>
                  </div>
                  <button 
                    type="button"
                    onClick={() => { navigator.clipboard.writeText(window.location.href); toast.success('Link disalin!'); }}
                    className="p-2.5 bg-slate-50 hover:bg-teal-50 text-slate-400 hover:text-teal-600 rounded-xl transition-colors border border-slate-100"
                    title="Bagikan Program"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>

                {/* 2. PROGRESS BAR */}
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                  <div className="flex justify-between items-end mb-2">
                    <div>
                      <span className="text-slate-400 block mb-0.5 text-[10px] uppercase tracking-wider font-bold">Terkumpul</span>
                      <span className="text-xl font-black text-teal-600 leading-none">Rp {(program.terkumpul || 0).toLocaleString('id-ID')}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-slate-400 block mb-0.5 text-[10px] uppercase tracking-wider font-bold">Target</span>
                      <span className="font-bold text-slate-600 text-xs">Rp {program.target.toLocaleString('id-ID')}</span>
                    </div>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden mt-3">
                    <div className="bg-teal-500 h-full shadow-sm transition-all duration-1000" style={{ width: `${progress}%` }} />
                  </div>
                </div>

                {/* JIKA TARGET TERPENUHI */}
                {isTargetReached ? (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-3">
                    <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h4 className="font-black text-emerald-800 text-sm">Alhamdulillah, Target Terpenuhi!</h4>
                    <p className="text-xs font-medium text-emerald-700/80 leading-relaxed">
                      Penggalangan dana ditutup karena target telah tercapai. Terima kasih atas kedermawanan Anda.
                    </p>
                    <Link href="/program" className="mt-4 block w-full py-3 bg-white border border-emerald-200 text-emerald-700 font-bold rounded-xl text-xs hover:bg-emerald-100 transition-colors">
                      Lihat Program Lainnya
                    </Link>
                  </div>
                ) : (
                  /* JIKA TARGET BELUM PENUH (FORM INPUT) */
                  <div className="space-y-5">
                    
                    {/* Input Nominal */}
                    <div className="space-y-2">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">1. Nominal Donasi</span>
                      <div className="grid grid-cols-2 gap-2">
                        {presets.map((amt) => (
                          <button key={amt} type="button" onClick={() => { setSelectedAmount(amt); setCustomAmount(''); }} className={`py-2.5 rounded-xl font-bold text-xs border transition-all ${selectedAmount === amt ? 'bg-teal-600 border-teal-600 text-white shadow-md' : 'bg-white text-slate-600 hover:border-teal-400'}`}>
                            Rp {amt.toLocaleString('id-ID')}
                          </button>
                        ))}
                      </div>
                      <div className="relative mt-2">
                        <span className="absolute left-3 top-2.5 font-black text-slate-400 text-sm">Rp</span>
                        <input maxLength={20} type="number" placeholder="Nominal lainnya" value={customAmount} onChange={handleCustomInput} className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-9 pr-4 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all" />
                      </div>
                    </div>

                    {/* Identitas */}
                    <div className="space-y-2">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">2. Identitas Diri</span>
                      <input maxLength={25} type="text" placeholder="Nama Lengkap" disabled={isAnon} value={isAnon ? 'Hamba Allah' : donorName} onChange={(e) => setDonorName(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-50 transition-all" />
                      <input maxLength={13} type="number" required placeholder="Nomor WhatsApp Aktif" value={donorPhone} onChange={(e) => setDonorPhone(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all" />
                      <label className="flex items-center gap-2 pt-1 cursor-pointer select-none">
                        <input type="checkbox" checked={isAnon} onChange={(e) => setIsAnon(e.target.checked)} className="w-3.5 h-3.5 rounded text-teal-600 focus:ring-teal-500" />
                        <span className="text-[11px] font-semibold text-slate-500">Sembunyikan nama (Hamba Allah)</span>
                      </label>
                      <textarea 
                        rows={2} 
                        placeholder="Tulis doa atau harapan Anda di sini (Opsional)" 
                        value={doaMessage} 
                        onChange={(e) => setDoaMessage(e.target.value)} 
                        className="w-full bg-slate-50 border rounded-xl py-3 px-4 text-sm font-medium focus:outline-none transition-all resize-none"
                      />
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

                    {/* Tombol Submit */}
                    <button type="submit" disabled={submitLoading} className="w-full py-3.5 bg-teal-600 hover:bg-teal-500 text-white font-black rounded-xl text-sm transition-all shadow-lg shadow-teal-600/20 active:scale-[0.98] flex justify-center items-center gap-2">
                      {submitLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Lanjutkan Pembayaran'}
                    </button>
                  </div>
                )}

                {/* 3. GARANSI AMANAH (Pindah ke paling bawah form) */}
                <div className="pt-4 mt-2 border-t border-slate-100 flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                  <p className="text-[10px] text-slate-500 leading-relaxed font-medium">
                    <strong className="text-slate-700">100% Donasi Amanah.</strong> Dana disalurkan langsung oleh yayasan tanpa potongan biaya platform pihak ketiga.
                  </p>
                </div>

              </form>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
