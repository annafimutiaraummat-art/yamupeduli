'use client';
import { useState, useEffect, use, useRef, useCallback } from 'react';
import { submitDonationWithProof } from '@/app/actions/donate';
import Link from 'next/link';
import toast from 'react-hot-toast';
import {
  ShieldCheck, Upload, X, CheckCircle2, Loader2, AlertCircle,
  ArrowRight, ArrowLeft, Copy, Banknote, User, Phone,
  MessageSquareHeart, Sparkles, Share2, HandHeart, Calendar,
  Target, Tag, CreditCard, Landmark, Wallet, QrCode,
} from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

// ===== METODE BAYAR (data-driven; tambah e-wallet/QRIS → tab auto-muncul) =====
type PayMethod = { id: string; category: 'bank' | 'ewallet' | 'qris'; name: string; number: string; holder: string; color: string };
const PAYMENT_METHODS: PayMethod[] = [
  { id: 'bjb', category: 'bank', name: 'Bank BJB', number: '0070 2011 0209 83', holder: 'YAYASAN AN-NAFI MUTIARA UMMAT', color: 'bg-cyan-600' },
  { id: 'mandiri', category: 'bank', name: 'Mandiri', number: '164 000 293 3200', holder: 'YAYASAN AN-NAFI MUTIARA UMMAT', color: 'bg-blue-800' },
  { id: 'bca', category: 'bank', name: 'BCA', number: '6801 143 498', holder: 'YAYASAN AN-NAFI MUTIARA UMMAT', color: 'bg-blue-600' },
  { id: 'bri', category: 'bank', name: 'BRI', number: '1127 010 007 225 68', holder: 'YAYASAN AN-NAFI MUTIARA UMMAT', color: 'bg-blue-700' },
  // { id: 'dana', category: 'ewallet', name: 'DANA', number: '0812-XXXX', holder: 'Nama', color: 'bg-sky-500' },
];
const CATEGORIES = [
  { key: 'bank', label: 'Bank', Icon: Landmark },
  { key: 'ewallet', label: 'E-Wallet', Icon: Wallet },
  { key: 'qris', label: 'QRIS', Icon: QrCode },
] as const;
const ACTIVE_CATS = CATEGORIES.filter(c => PAYMENT_METHODS.some(m => m.category === c.key));

export default function ProgramDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: programId } = use(params);
  const [program, setProgram] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [step, setStep] = useState(1);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [formLoadTime] = useState(() => Date.now()); // time-trap BENAR (set saat mount)
  const [copied, setCopied] = useState('');

  const [preview, setPreview] = useState<string | null>(null);
  const [drag, setDrag] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [donorName, setDonorName] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [isAnon, setIsAnon] = useState(false);
  const [doa, setDoa] = useState('');

  const [payCat, setPayCat] = useState<string>(ACTIVE_CATS[0]?.key || 'bank');
  const [payMethod, setPayMethod] = useState<string | null>(null);

  const presets = [25000, 50000, 100000, 250000, 500000];
  const finalAmount = selectedAmount || Number(customAmount.replace(/\D/g, '')) || 0; // FIX regex
  const phoneDigits = donorPhone.replace(/\D/g, '');
  const phoneOk = phoneDigits.length >= 8 && phoneDigits.length <= 15;

  const methodsInCat = PAYMENT_METHODS.filter(m => m.category === payCat);
  const selectedMethod = PAYMENT_METHODS.find(m => m.id === payMethod) || null;

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data } = await supabase.from('programs').select('*').eq('id', programId).single();
      if (data) setProgram(data);
      setLoading(false);
    })();
  }, [programId]);

  const pickFile = useCallback((f: File) => {
    if (!['image/jpeg', 'image/png'].includes(f.type)) return toast.error('Hanya JPG/PNG');
    if (f.size > 5 * 1024 * 1024) return toast.error('Maksimal 5MB');
    setFile(f);
    const r = new FileReader();
    r.onloadend = () => setPreview(r.result as string);
    r.readAsDataURL(f);
  }, []);
  const onDrag = (e: React.DragEvent) => { e.preventDefault(); setDrag(e.type === 'dragenter' || e.type === 'dragover'); };
  const onDrop = (e: React.DragEvent) => { e.preventDefault(); setDrag(false); if (e.dataTransfer.files[0]) pickFile(e.dataTransfer.files[0]); };
  const clearFile = () => { setFile(null); setPreview(null); if (fileRef.current) fileRef.current.value = ''; };

  const fmt = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAmount(null);
    const raw = e.target.value.replace(/\D/g, '');
    setCustomAmount(raw ? Number(raw).toLocaleString('id-ID') : '');
  };
  const copy = (t: string, tag: string) => { navigator.clipboard.writeText(t.replace(/\s/g, '')); setCopied(tag); toast.success('Nomor disalin'); setTimeout(() => setCopied(''), 2000); };

  const steps = [
    { n: 1, label: 'Nominal', Icon: Banknote },
    { n: 2, label: 'Identitas', Icon: User },
    { n: 3, label: 'Bayar', Icon: CreditCard },
    { n: 4, label: 'Bukti', Icon: Upload },
  ];
  const stepName = steps.find(s => s.n === step)?.label || '';

  const next = () => {
    if (step === 1 && finalAmount < 10000) return toast.error('Nominal minimal Rp 10.000');
    if (step === 2 && !phoneOk) return toast.error('Nomor WhatsApp tidak valid (8–15 digit)');
    if (step === 3 && !payMethod) return toast.error('Pilih metode pembayaran');
    setStep(s => Math.min(s + 1, 4));
  };
  const prev = () => setStep(s => Math.max(s - 1, 1));

  const submit = async () => {
    if (finalAmount < 10000) return toast.error('Nominal tidak valid');
    if (!phoneOk) return toast.error('Nomor WhatsApp tidak valid');
    if (!payMethod) return toast.error('Pilih metode pembayaran');
    if (!file) return toast.error('Upload bukti transfer dulu');
    setSubmitLoading(true);
    try {
      const fd = new FormData();
      fd.append('name', isAnon ? 'Hamba Allah' : donorName || 'Hamba Allah');
      fd.append('phone', donorPhone);
      fd.append('amount', finalAmount.toString());
      fd.append('program_title', program.title);   // judul asli
      fd.append('program_id', program.id);         // NYAMBUNG ke program
      fd.append('message', doa || '');
      fd.append('payment_method', selectedMethod?.name || '');
      fd.append('payment_proof', file);
      fd.append('website_url', '');
      fd.append('submit_time', formLoadTime.toString());
      const res = await submitDonationWithProof(fd); // fungsi yg benar (FIX crash)
      if (!res.success) return toast.error(res.message);
      toast.success(res.message, { duration: 5000 });
      setStep(1); clearFile(); setCustomAmount(''); setSelectedAmount(null);
      setDonorName(''); setDonorPhone(''); setDoa(''); setPayMethod(null);
    } catch { toast.error('Kesalahan sistem'); }
    finally { setSubmitLoading(false); }
  };

  if (loading) return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-3 text-slate-400">
      <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
      <span className="text-xs font-bold uppercase tracking-wider">Memuat program...</span>
    </div>
  );
  if (!program) return <div className="p-12 text-center font-bold text-slate-500">Program tidak ditemukan.</div>;

  const progress = Math.min(Math.round(((program.terkumpul || 0) / program.target) * 100), 100);
  const isTargetReached = program.terkumpul >= program.target || program.status === 'Selesai';
  const tglMulai = new Date(program.created_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' });

  return (
    // ROOT: overflow-x-hidden = MUSTAHIL ada scrollbar horizontal
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased pb-20 overflow-x-hidden selection:bg-emerald-500 selection:text-white">
      <style dangerouslySetInnerHTML={{ __html: `@keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}.fu{opacity:0;animation:fadeUp .6s cubic-bezier(.22,1,.36,1) forwards}.thin-scroll::-webkit-scrollbar{width:6px}.thin-scroll::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:9999px}.thin-scroll{scrollbar-width:thin}` }} />

      {/* HERO — gradient selalu di belakang sbg fallback kalau gambar rusak */}
      <div className="w-full h-[220px] sm:h-[300px] lg:h-[380px] relative bg-gradient-to-br from-emerald-800 to-teal-900 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center text-emerald-300/10"><HandHeart className="w-32 h-32 sm:w-40 sm:h-40" /></div>
        {program.image_url && (
          <img src={program.image_url} alt={program.title} onError={(e) => { e.currentTarget.style.display = 'none'; }}
            className="absolute inset-0 w-full h-full object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-emerald-950/40 to-emerald-950/20" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 -mt-14 sm:-mt-20 lg:-mt-28">
        <div className="grid lg:grid-cols-3 gap-5 lg:gap-8 items-start">

          {/* ===== KIRI: CERITA + INFO ===== */}
          <div className="lg:col-span-2 space-y-5 fu min-w-0">
            <div className="bg-white rounded-3xl p-5 sm:p-9 lg:p-10 shadow-xl border border-slate-100">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-50 text-emerald-700 font-bold text-[10px] rounded-lg uppercase tracking-widest mb-4 sm:mb-5 border border-emerald-100">
                <Tag className="w-3 h-3" /> {program.category}
              </span>
              {/* break-words = judul panjang gak luber */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 mb-6 sm:mb-7 tracking-tight leading-snug break-words">
                {program.title}
              </h1>
              {/* FIX OVERFLOW: pre-wrap + break-words + overflow-wrap anywhere */}
              <div className="text-sm md:text-base text-slate-600 space-y-4 sm:space-y-5 whitespace-pre-wrap break-words [overflow-wrap:anywhere] leading-loose font-medium">
                {program.description}
              </div>
            </div>

            {/* Card info kampanye */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-xl border border-slate-100">
              <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4">Informasi Kampanye</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1"><Target className="w-3 h-3" /> Target</span>
                  <span className="font-black text-slate-800 text-sm break-words">Rp {program.target.toLocaleString('id-ID')}</span>
                </div>
                <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1"><Calendar className="w-3 h-3" /> Dibuka</span>
                  <span className="font-black text-slate-800 text-sm">{tglMulai}</span>
                </div>
                <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-100 col-span-2">
                  <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1"><ShieldCheck className="w-3 h-3" /> Status</span>
                  <span className="font-black text-sm text-emerald-600">{isTargetReached ? 'Selesai — Target Tercapai' : 'Aktif — Sedang Berjalan'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* ===== KANAN: SIDEBAR WIZARD =====
              KUNCI MOBILE: sticky + max-h + overflow HANYA di lg: (desktop).
              Di HP ini jadi blok biasa yg mengalir natural → gak ke-clip. */}
          <div className="lg:col-span-1 min-w-0">
            <div className="lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto thin-scroll">
              <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-2xl border border-slate-100 flex flex-col gap-5 fu">

                {/* Header penggalang + share */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center shrink-0 border border-emerald-100"><ShieldCheck className="w-5 h-5" /></div>
                    <div className="min-w-0">
                      <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Penggalang Dana</p>
                      <p className="text-xs font-black text-slate-900 flex items-center gap-1 mt-0.5 truncate">YAMU Peduli <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0" /></p>
                    </div>
                  </div>
                  <button type="button" onClick={() => { navigator.clipboard.writeText(window.location.href); toast.success('Link disalin!'); }}
                    className="p-2.5 bg-slate-50 hover:bg-emerald-50 text-slate-400 hover:text-emerald-600 rounded-xl transition-colors border border-slate-100 shrink-0" title="Bagikan">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Progress */}
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-4 border border-emerald-100">
                  <div className="flex justify-between items-end mb-2 gap-2">
                    <div className="min-w-0"><span className="text-slate-400 block mb-0.5 text-[10px] uppercase tracking-wider font-bold">Terkumpul</span><span className="text-lg sm:text-xl font-black text-emerald-600 leading-none break-words">Rp {(program.terkumpul || 0).toLocaleString('id-ID')}</span></div>
                    <div className="text-right shrink-0"><span className="text-slate-400 block mb-0.5 text-[10px] uppercase tracking-wider font-bold">Target</span><span className="font-bold text-slate-600 text-xs">Rp {program.target.toLocaleString('id-ID')}</span></div>
                  </div>
                  <div className="w-full bg-emerald-100 rounded-full h-2 overflow-hidden mt-3"><div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full transition-all duration-1000" style={{ width: `${progress}%` }} /></div>
                  <div className="text-right mt-1.5"><span className="text-[10px] font-black text-emerald-600">{progress}%</span></div>
                </div>

                {isTargetReached ? (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-3">
                    <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto"><CheckCircle2 className="w-6 h-6" /></div>
                    <h4 className="font-black text-emerald-800 text-sm">Alhamdulillah, Target Terpenuhi!</h4>
                    <p className="text-xs font-medium text-emerald-700/80 leading-relaxed">Penggalangan ditutup. Terima kasih atas kedermawanan Anda.</p>
                    <Link href="/program" className="mt-3 block w-full py-3 bg-white border border-emerald-200 text-emerald-700 font-bold rounded-xl text-xs hover:bg-emerald-100 transition-colors">Lihat Program Lainnya</Link>
                  </div>
                ) : (
                  <>
                    {/* STEP INDICATOR — mobile: lingkaran compact; desktop sidebar: segmented bar */}
                    <div className="flex items-center justify-between lg:hidden">
                      {steps.map((s, i) => (
                        <div key={s.n} className="flex items-center flex-1 last:flex-none">
                          <div className="flex flex-col items-center gap-1">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${step === s.n ? 'bg-gradient-to-br from-emerald-500 to-emerald-600 border-emerald-500 text-white shadow-md scale-110' : step > s.n ? 'bg-teal-50 border-teal-500 text-teal-600' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
                              {step > s.n ? <CheckCircle2 className="w-4 h-4" /> : <s.Icon className="w-3.5 h-3.5" />}
                            </div>
                            <span className={`text-[8px] font-bold uppercase tracking-wider ${step >= s.n ? 'text-emerald-700' : 'text-slate-400'}`}>{s.label}</span>
                          </div>
                          {i < steps.length - 1 && <div className="flex-1 h-0.5 mx-1 mb-4 rounded-full bg-slate-100 overflow-hidden"><div className={`h-full bg-emerald-400 transition-transform duration-500 origin-left ${step > s.n ? 'scale-x-100' : 'scale-x-0'}`} /></div>}
                        </div>
                      ))}
                    </div>
                    <div className="hidden lg:block">
                      <div className="flex items-center justify-between mb-2"><span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Langkah {step} / 4</span><span className="text-[10px] font-black text-emerald-600 uppercase tracking-wider">{stepName}</span></div>
                      <div className="flex gap-1.5">{steps.map(s => <div key={s.n} className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${step >= s.n ? 'bg-gradient-to-r from-emerald-500 to-teal-400' : 'bg-slate-200'}`} />)}</div>
                    </div>

                    {/* STEP CONTENT */}
                    <div className="min-h-[300px]">

                      {/* STEP 1 */}
                      {step === 1 && (
                        <div className="space-y-4 fu">
                          <h3 className="font-black text-slate-800 text-base">Pilih Nominal</h3>
                          <div className="grid grid-cols-2 gap-2.5">
                            {presets.map(a => <button key={a} type="button" onClick={() => { setSelectedAmount(a); setCustomAmount(''); }} className={`py-3 rounded-xl font-bold text-xs border-2 transition-all ${selectedAmount === a ? 'bg-emerald-50 border-emerald-500 text-emerald-700 shadow-sm' : 'bg-white border-slate-200 text-slate-600 hover:border-emerald-300'}`}>Rp {(a / 1000)}k</button>)}
                          </div>
                          <div className="relative"><span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-slate-400 text-sm">Rp</span><input type="text" inputMode="numeric" placeholder="Nominal lainnya..." value={customAmount} onChange={fmt} className="w-full bg-white border-2 border-slate-200 rounded-xl py-3 pl-11 pr-4 text-sm font-bold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10" /></div>
                          {finalAmount > 0 && <div className="flex justify-between items-center p-3.5 rounded-xl bg-emerald-50 border border-emerald-100"><span className="text-xs font-bold text-slate-600">Total</span><span className="text-lg font-black text-emerald-600 break-words">Rp {finalAmount.toLocaleString('id-ID')}</span></div>}
                        </div>
                      )}

                      {/* STEP 2 */}
                      {step === 2 && (
                        <div className="space-y-3.5 fu">
                          <h3 className="font-black text-slate-800 text-base">Data Diri</h3>
                          <div className="relative"><User className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" /><input type="text" maxLength={30} placeholder="Nama Lengkap" disabled={isAnon} value={isAnon ? 'Hamba Allah' : donorName} onChange={e => setDonorName(e.target.value)} className="w-full bg-white border-2 border-slate-200 rounded-xl py-3 pl-10 pr-3 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 disabled:opacity-60 disabled:bg-slate-50" /></div>
                          <div className="relative"><Phone className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" /><input type="tel" inputMode="tel" maxLength={20} placeholder="No. WhatsApp (wajib)" value={donorPhone} onChange={e => setDonorPhone(e.target.value)} className={`w-full bg-white border-2 rounded-xl py-3 pl-10 pr-3 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-4 ${phoneDigits && !phoneOk ? 'border-rose-300 focus:border-rose-400 focus:ring-rose-500/10' : 'border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/10'}`} /></div>
                          <div className="relative"><MessageSquareHeart className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" /><textarea rows={2} maxLength={300} placeholder="Doa / harapan (opsional)" value={doa} onChange={e => setDoa(e.target.value)} className="w-full bg-white border-2 border-slate-200 rounded-xl py-3 pl-10 pr-3 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 resize-none" /></div>
                          <label className="flex items-center gap-2.5 cursor-pointer pt-1 group w-fit">
                            <div className="relative flex items-center justify-center"><input type="checkbox" checked={isAnon} onChange={e => setIsAnon(e.target.checked)} className="peer sr-only" /><div className="w-4 h-4 rounded border-2 border-slate-300 peer-checked:bg-emerald-500 peer-checked:border-emerald-500" /><CheckCircle2 className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100" /></div>
                            <span className="text-xs font-semibold text-slate-600">Sembunyikan nama (<b className="text-emerald-600">Hamba Allah</b>)</span>
                          </label>
                        </div>
                      )}

                      {/* STEP 3 — payment compact 1 kolom (muat sempit) */}
                      {step === 3 && (
                        <div className="space-y-3.5 fu">
                          <h3 className="font-black text-slate-800 text-base">Metode Pembayaran</h3>
                          <p className="text-xs text-slate-500 -mt-2">Transfer <b className="text-emerald-600">Rp {finalAmount.toLocaleString('id-ID')}</b></p>
                          <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
                            {ACTIVE_CATS.map(c => <button key={c.key} type="button" onClick={() => { setPayCat(c.key); setPayMethod(null); }} className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-[10px] font-black uppercase tracking-wider whitespace-nowrap border-2 transition-all ${payCat === c.key ? 'bg-emerald-600 border-emerald-600 text-white' : 'bg-white border-slate-200 text-slate-500 hover:border-emerald-300'}`}><c.Icon className="w-3.5 h-3.5" /> {c.label}</button>)}
                          </div>
                          <div className="space-y-2">
                            {methodsInCat.map(m => (
                              <button key={m.id} type="button" onClick={() => setPayMethod(m.id)} className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-all ${payMethod === m.id ? 'border-emerald-500 bg-emerald-50/50' : 'border-slate-200 bg-white hover:border-emerald-300'}`}>
                                <span className={`w-8 h-8 rounded-lg ${m.color} text-white flex items-center justify-center shrink-0`}>{m.category === 'bank' ? <Landmark className="w-3.5 h-3.5" /> : m.category === 'ewallet' ? <Wallet className="w-3.5 h-3.5" /> : <QrCode className="w-3.5 h-3.5" />}</span>
                                <span className="font-bold text-slate-800 text-sm flex-1 truncate">{m.name}</span>
                                {payMethod === m.id && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                              </button>
                            ))}
                          </div>
                          {selectedMethod && (
                            <div className="rounded-xl border-2 border-emerald-200 bg-emerald-50/40 p-3.5 space-y-3 fu">
                              <div className="flex items-center justify-between bg-white border border-slate-200 rounded-lg p-3 gap-2">
                                <div className="min-w-0"><span className="font-mono font-black text-slate-900 text-sm block break-words">{selectedMethod.number}</span><span className="text-[9px] text-slate-500 font-bold uppercase">A/N {selectedMethod.holder}</span></div>
                                <button type="button" onClick={() => copy(selectedMethod.number, selectedMethod.id)} className={`p-2 rounded-lg border shrink-0 ${copied === selectedMethod.id ? 'bg-emerald-100 border-emerald-200 text-emerald-600' : 'bg-slate-50 border-slate-200 text-slate-500 hover:text-emerald-600'}`}>{copied === selectedMethod.id ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}</button>
                              </div>
                              <div className="flex items-start gap-2 p-2.5 bg-amber-50 border border-amber-200 rounded-lg"><AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" /><p className="text-[10px] text-amber-800 leading-relaxed font-medium">Simpan screenshot bukti transfer untuk langkah berikutnya.</p></div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* STEP 4 */}
                      {step === 4 && (
                        <div className="space-y-3.5 fu">
                          <h3 className="font-black text-slate-800 text-base">Upload Bukti Transfer</h3>
                          {!preview ? (
                            <div onDragEnter={onDrag} onDragLeave={onDrag} onDragOver={onDrag} onDrop={onDrop} onClick={() => fileRef.current?.click()} className={`border-2 border-dashed rounded-2xl p-7 flex flex-col items-center cursor-pointer transition-all ${drag ? 'border-emerald-400 bg-emerald-50 scale-[1.01]' : 'border-slate-300 hover:border-emerald-400 bg-white'}`}>
                              <input ref={fileRef} type="file" accept=".jpg,.jpeg,.png" className="hidden" onChange={e => e.target.files?.[0] && pickFile(e.dataTransfer?.files?.[0] || e.target.files?.[0])} />
                              <div className={`p-3 rounded-full mb-2.5 ${drag ? 'bg-emerald-100' : 'bg-slate-100'}`}><Upload className={`w-6 h-6 ${drag ? 'text-emerald-600' : 'text-slate-500'}`} /></div>
                              <p className="text-sm font-bold text-slate-700 text-center">{drag ? 'Lepaskan file' : 'Klik / drag & drop'}</p>
                              <p className="text-[10px] text-slate-400 mt-1">JPG / PNG • Maks 5MB</p>
                            </div>
                          ) : (
                            <div className="relative border-2 border-emerald-100 rounded-2xl p-3.5 bg-emerald-50/40">
                              <button type="button" onClick={clearFile} className="absolute -top-2.5 -right-2.5 w-7 h-7 bg-white border border-slate-200 text-slate-600 rounded-full flex items-center justify-center shadow-md hover:bg-rose-50 hover:text-rose-500 z-10"><X className="w-3.5 h-3.5" /></button>
                              <div className="flex items-center gap-3">
                                <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-white shadow-sm shrink-0 bg-slate-100"><img src={preview} alt="bukti" className="w-full h-full object-cover" /></div>
                                <div className="min-w-0 flex-1"><p className="text-xs font-bold text-slate-800 truncate">{file?.name}</p><p className="text-[10px] text-slate-500 mt-0.5">{((file?.size || 0) / 1024 / 1024).toFixed(2)} MB</p><div className="inline-flex items-center gap-1 mt-1.5 px-2 py-1 bg-emerald-100 text-emerald-700 rounded-md text-[10px] font-bold"><CheckCircle2 className="w-3 h-3" /> Siap</div></div>
                              </div>
                            </div>
                          )}
                          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-2 text-xs">
                            <div className="flex justify-between gap-2"><span className="text-slate-500 shrink-0">Nominal</span><b className="text-emerald-600 break-words text-right">Rp {finalAmount.toLocaleString('id-ID')}</b></div>
                            <div className="flex justify-between gap-2 border-t border-slate-200/60 pt-2"><span className="text-slate-500 shrink-0">Nama</span><b className="text-slate-800 truncate text-right">{isAnon ? 'Hamba Allah' : donorName || 'Hamba Allah'}</b></div>
                            <div className="flex justify-between gap-2 border-t border-slate-200/60 pt-2"><span className="text-slate-500 shrink-0">Metode</span><b className="text-slate-800 text-right">{selectedMethod?.name || '-'}</b></div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* NAV */}
                    <div className="flex gap-2.5 pt-2">
                      {step > 1 && <button type="button" onClick={prev} className="px-4 py-3 rounded-xl border-2 border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300 font-bold text-xs flex items-center gap-1.5 active:scale-95"><ArrowLeft className="w-4 h-4" /> <span className="hidden sm:inline">Kembali</span></button>}
                      {step < 4 ? (
                        <button type="button" onClick={next} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-black text-xs shadow-lg shadow-emerald-600/20 active:scale-[.98] flex items-center justify-center gap-1.5">Lanjut <ArrowRight className="w-4 h-4" /></button>
                      ) : (
                        <button type="button" onClick={submit} disabled={submitLoading || !file} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 disabled:from-slate-200 disabled:to-slate-200 disabled:text-slate-400 disabled:shadow-none text-white font-black text-xs shadow-lg shadow-emerald-600/20 active:scale-[.98] flex items-center justify-center gap-1.5">
                          {submitLoading ? <><Loader2 className="w-4 h-4 animate-spin" /> Memproses...</> : <><Sparkles className="w-4 h-4" /> Kirim & Bukti</>}
                        </button>
                      )}
                    </div>
                  </>
                )}

                <div className="pt-3 border-t border-slate-100 flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <p className="text-[10px] text-slate-500 leading-relaxed font-medium"><strong className="text-slate-700">100% Amanah.</strong> Disalurkan langsung yayasan tanpa potongan platform.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}