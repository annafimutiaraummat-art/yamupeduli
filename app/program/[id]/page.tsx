'use client';

import { useState, useEffect, use, useRef, useCallback } from 'react';
import { submitDonationWithProof } from '@/app/actions/donate';
import { supabase } from '@/supabase';
import Link from 'next/link';
import toast from 'react-hot-toast';
import {
  ShieldCheck, Upload, X, CheckCircle2, Loader2, AlertCircle,
  ArrowRight, ArrowLeft, Copy, Banknote, User, Phone,
  MessageSquareHeart, Sparkles, Share2, HandHeart, Calendar,
  Target, Tag, CreditCard, Landmark, Wallet, QrCode, Heart,
  ChevronRight, Users, CheckCircle, Info, HeartHandshake
} from 'lucide-react';

// ===== METODE BAYAR DATA-DRIVEN =====
type PayMethod = {
  id: string;
  category: 'bank' | 'ewallet' | 'qris';
  name: string;
  number: string;
  holder: string;
  color: string;
};

const PAYMENT_METHODS: PayMethod[] = [
  { id: 'bjb', category: 'bank', name: 'Bank BJB', number: '0070 2011 0209 83', holder: 'YAYASAN AN-NAFI MUTIARA UMMAT', color: 'bg-cyan-600' },
  { id: 'mandiri', category: 'bank', name: 'Bank Mandiri', number: '164 000 293 3200', holder: 'YAYASAN AN-NAFI MUTIARA UMMAT', color: 'bg-blue-800' },
  { id: 'bca', category: 'bank', name: 'Bank BCA', number: '6801 143 498', holder: 'YAYASAN AN-NAFI MUTIARA UMMAT', color: 'bg-blue-600' },
  { id: 'bri', category: 'bank', name: 'Bank BRI', number: '1127 010 007 225 68', holder: 'YAYASAN AN-NAFI MUTIARA UMMAT', color: 'bg-blue-700' },
];

const CATEGORIES = [
  { key: 'bank', label: 'Bank Transfer', Icon: Landmark },
  { key: 'ewallet', label: 'E-Wallet', Icon: Wallet },
  { key: 'qris', label: 'QRIS', Icon: QrCode },
] as const;

const ACTIVE_CATS = CATEGORIES.filter(c => PAYMENT_METHODS.some(m => m.category === c.key));

export default function ProgramDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: programId } = use(params);
  const [program, setProgram] = useState<any>(null);
  const [recentDonors, setRecentDonors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'cerita' | 'donatur'>('cerita');

  // Form State
  const [step, setStep] = useState(1);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [formLoadTime] = useState(() => Date.now());
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
  const finalAmount = selectedAmount || Number(customAmount.replace(/\D/g, '')) || 0;
  const phoneDigits = donorPhone.replace(/\D/g, '');
  const phoneOk = phoneDigits.length >= 8 && phoneDigits.length <= 15;

  const methodsInCat = PAYMENT_METHODS.filter(m => m.category === payCat);
  const selectedMethod = PAYMENT_METHODS.find(m => m.id === payMethod) || null;

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const { data: progData } = await supabase
          .from('programs')
          .select('*')
          .eq('id', programId)
          .single();

        if (progData) {
          setProgram(progData);
          const { data: donorData } = await supabase
            .from('donations')
            .select('*')
            .eq('program_id', programId)
            .eq('status', 'LUNAS')
            .order('created_at', { ascending: false })
            .limit(10);

          if (donorData) setRecentDonors(donorData);
        }
      } catch (e) {
        console.error('Error fetching program detail:', e);
      } finally {
        setLoading(false);
      }
    })();
  }, [programId]);

  const pickFile = useCallback((f: File) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/heic'];
    if (!validTypes.includes(f.type) && !/\.(jpg|jpeg|png|webp|heic)$/i.test(f.name)) {
      return toast.error('Format file harus berupa gambar (JPG, PNG, WebP, HEIC)');
    }
    if (f.size > 10 * 1024 * 1024) return toast.error('Ukuran file maksimal 10MB');

    setFile(f);
    const r = new FileReader();
    r.onloadend = () => setPreview(r.result as string);
    r.readAsDataURL(f);
  }, []);

  const onDrag = (e: React.DragEvent) => {
    e.preventDefault();
    setDrag(e.type === 'dragenter' || e.type === 'dragover');
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDrag(false);
    if (e.dataTransfer.files[0]) pickFile(e.dataTransfer.files[0]);
  };

  const clearFile = () => {
    setFile(null);
    setPreview(null);
    if (fileRef.current) fileRef.current.value = '';
  };

  const fmt = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAmount(null);
    const raw = e.target.value.replace(/\D/g, '');
    setCustomAmount(raw ? Number(raw).toLocaleString('id-ID') : '');
  };

  const copy = (t: string, tag: string) => {
    navigator.clipboard.writeText(t.replace(/\s/g, ''));
    setCopied(tag);
    toast.success('Nomor rekening berhasil disalin!');
    setTimeout(() => setCopied(''), 2000);
  };

  const steps = [
    { n: 1, label: 'Nominal', Icon: Banknote },
    { n: 2, label: 'Identitas', Icon: User },
    { n: 3, label: 'Pembayaran', Icon: CreditCard },
    { n: 4, label: 'Bukti Transfer', Icon: Upload },
  ];

  const stepName = steps.find(s => s.n === step)?.label || '';

  const next = () => {
    if (step === 1 && finalAmount < 10000) return toast.error('Pilih atau masukkan nominal minimal Rp 10.000');
    if (step === 2 && !phoneOk) return toast.error('Nomor WhatsApp wajib valid (8–15 digit)');
    if (step === 3 && !payMethod) return toast.error('Pilih metode pembayaran terlebih dahulu');
    setStep(s => Math.min(s + 1, 4));
  };

  const prev = () => setStep(s => Math.max(s - 1, 1));

  const submit = async () => {
    if (finalAmount < 10000) return toast.error('Nominal tidak valid');
    if (!phoneOk) return toast.error('Nomor WhatsApp tidak valid');
    if (!payMethod) return toast.error('Pilih metode pembayaran');
    if (!file) return toast.error('Unggah foto bukti transfer terlebih dahulu');

    setSubmitLoading(true);
    try {
      const fd = new FormData();
      fd.append('name', isAnon ? 'Hamba Allah' : donorName || 'Hamba Allah');
      fd.append('phone', donorPhone);
      fd.append('amount', finalAmount.toString());
      fd.append('program_title', program.title);
      fd.append('program_id', program.id);
      fd.append('message', doa || '');
      fd.append('payment_method', selectedMethod?.name || '');
      fd.append('payment_proof', file);
      fd.append('website_url', '');
      fd.append('submit_time', formLoadTime.toString());

      const res = await submitDonationWithProof(fd);
      if (!res.success) return toast.error(res.message);

      toast.success(res.message, { duration: 6000 });
      setStep(1);
      clearFile();
      setCustomAmount('');
      setSelectedAmount(null);
      setDonorName('');
      setDonorPhone('');
      setDoa('');
      setPayMethod(null);
    } catch {
      toast.error('Terjadi kesalahan sistem. Silakan coba kembali.');
    } finally {
      setSubmitLoading(false);
    }
  };

  if (loading) return (
    <div className="min-h-[calc(100vh-5rem)] bg-[#f4f7f6] flex flex-col items-center justify-center gap-3 text-teal-800">
      <div className="w-12 h-12 rounded-2xl bg-teal-100 flex items-center justify-center text-teal-600 animate-bounce">
        <HeartHandshake className="w-6 h-6" />
      </div>
      <span className="text-xs font-bold uppercase tracking-widest text-teal-700">Memuat Program YAMU...</span>
    </div>
  );

  if (!program) return (
    <div className="min-h-[calc(100vh-5rem)] bg-[#f4f7f6] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 mb-4 border border-amber-200">
        <Info className="w-8 h-8" />
      </div>
      <h2 className="text-xl font-black text-slate-800">Program Tidak Ditemukan</h2>
      <p className="text-sm text-slate-500 max-w-sm mt-1 mb-6">Program yang Anda cari tidak tersedia.</p>
      <Link href="/program" className="px-6 py-3 bg-teal-600 text-white rounded-xl font-bold text-xs uppercase tracking-wider shadow-md hover:bg-teal-700 transition-all">
        Lihat Program Lainnya
      </Link>
    </div>
  );

  const progress = Math.min(Math.round(((program.terkumpul || 0) / program.target) * 100), 100);
  const isTargetReached = program.terkumpul >= program.target || program.status === 'Selesai';
  const tglMulai = new Date(program.created_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' });

  return (
    <div className="min-h-[calc(100vh-4rem)] lg:h-[calc(100vh-5rem)] bg-[#f4f7f6] text-slate-800 font-sans antialiased overflow-x-hidden selection:bg-teal-500 selection:text-white flex flex-col">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .fu { opacity: 0; animation: fadeUp .4s cubic-bezier(.22,1,.36,1) forwards; }
        .thin-scroll::-webkit-scrollbar { width: 4px; }
        .thin-scroll::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 9999px; }
        .thin-scroll { scrollbar-width: thin; }
      ` }} />

      {/* TOP HEADER SUB-NAV / BREADCRUMB */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200/60 py-2 px-4 sm:px-6 lg:px-8 text-xs font-semibold text-slate-500 shrink-0">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 truncate">
            <Link href="/" className="hover:text-teal-600 transition-colors">Beranda</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <Link href="/program" className="hover:text-teal-600 transition-colors">Program</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-teal-900 font-bold truncate">{program.title}</span>
          </div>
          <button
            type="button"
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              toast.success('Link program berhasil disalin!');
            }}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-slate-100 hover:bg-teal-50 text-slate-600 hover:text-teal-700 rounded-lg transition-colors text-[11px] font-bold shrink-0 border border-slate-200/80"
          >
            <Share2 className="w-3.5 h-3.5" /> Bagikan Program
          </button>
        </div>
      </div>

      {/* MAIN LAYOUT: FULL VIEWPORT ON LAPTOP (lg:h-full lg:overflow-hidden) */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-3 lg:py-4 lg:overflow-hidden flex flex-col">
        <div className="grid lg:grid-cols-12 gap-4 lg:gap-6 lg:h-full items-stretch min-h-0">

          {/* LEFT SIDE: CAMPAIGN INFO, IMAGE & TAB CONTENT (7 COLS) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-4 sm:p-5 shadow-sm border border-slate-200/80 flex flex-col min-h-0 fu">
            
            {/* PROGRAM TITLE & BADGES */}
            <div className="space-y-2 mb-3 shrink-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-teal-50 text-teal-700 font-bold text-[10px] rounded-full uppercase tracking-wider border border-teal-200/60">
                  <Tag className="w-3 h-3 text-teal-600" /> {program.category || 'Program Kebaikan'}
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-amber-50 text-amber-700 font-bold text-[10px] rounded-full uppercase tracking-wider border border-amber-200/60">
                  <ShieldCheck className="w-3 h-3 text-amber-600" /> Yayasan Terverifikasi
                </span>
              </div>
              <h1 className="text-lg sm:text-xl lg:text-2xl font-black text-slate-900 leading-snug line-clamp-2">
                {program.title}
              </h1>
            </div>

            {/* PROGRAM FEATURED IMAGE */}
            <div className="w-full h-[180px] sm:h-[220px] lg:h-[210px] xl:h-[230px] rounded-2xl overflow-hidden bg-slate-100 shrink-0 relative group mb-3 shadow-sm border border-slate-100">
              <img
                src={program.image_url || '/placeholder.jpg'}
                alt={program.title}
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[11px] font-bold text-white">
                <span className="px-2.5 py-1 bg-slate-900/80 backdrop-blur-md rounded-lg flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-amber-400" /> {tglMulai}
                </span>
                <span className="px-2.5 py-1 bg-teal-700/90 backdrop-blur-md rounded-lg font-black uppercase text-[9px] tracking-wider">
                  100% Salur Bebas Potongan
                </span>
              </div>
            </div>

            {/* TAB CONTROLS */}
            <div className="flex border-b border-slate-200/80 gap-6 shrink-0 mb-3">
              <button
                type="button"
                onClick={() => setActiveTab('cerita')}
                className={`pb-2 font-black text-xs sm:text-sm transition-all border-b-2 ${activeTab === 'cerita' ? 'border-teal-600 text-teal-700' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
              >
                Cerita Kampanye
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('donatur')}
                className={`pb-2 font-black text-xs sm:text-sm transition-all border-b-2 flex items-center gap-1.5 ${activeTab === 'donatur' ? 'border-teal-600 text-teal-700' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
              >
                Doa & Donatur
                {recentDonors.length > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] bg-teal-100 text-teal-800 font-bold">
                    {recentDonors.length}
                  </span>
                )}
              </button>
            </div>

            {/* TAB BODY (SCROLLABLE AREA IN LAPTOP VIEWPORT) */}
            <div className="flex-1 overflow-y-auto thin-scroll pr-1">
              {activeTab === 'cerita' ? (
                <div className="space-y-4 fu text-slate-700 text-xs sm:text-sm font-medium leading-relaxed whitespace-pre-wrap">
                  {program.description}
                  <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                    <div className="w-10 h-10 bg-teal-50 text-teal-700 rounded-xl flex items-center justify-center shrink-0 border border-teal-100">
                      <HandHeart className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="font-bold text-slate-900 text-xs">Penyaluran Resmi Yayasan</h5>
                      <p className="text-[11px] text-slate-500 font-medium">Dikelola transparan oleh Yayasan An-Nafi Mutiara Ummat.</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-2.5 fu">
                  {recentDonors.length > 0 ? (
                    recentDonors.map((d, i) => (
                      <div key={d.id || i} className="p-3 rounded-xl bg-teal-50/30 border border-teal-100/60 flex items-start gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-teal-600 text-white font-black text-xs flex items-center justify-center shrink-0 shadow-sm">
                          {d.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <h5 className="font-bold text-slate-900 text-xs truncate">{d.name}</h5>
                            <span className="font-black text-teal-700 text-xs shrink-0">Rp {Number(d.amount).toLocaleString('id-ID')}</span>
                          </div>
                          {d.message && (
                            <p className="text-[11px] text-slate-600 bg-white p-2 rounded-lg border border-teal-100/60 mt-1 font-medium italic">
                              "{d.message}"
                            </p>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="py-8 text-center space-y-1">
                      <Heart className="w-8 h-8 text-teal-300 mx-auto" />
                      <p className="text-xs font-bold text-slate-500">Belum ada donatur terverifikasi.</p>
                    </div>
                  )}
                </div>
              )}
            </div>

          </div>

          {/* RIGHT SIDE: DONATION WIZARD CARD (5 COLS) - COMPACT FITS LAPTOP SCREEN */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-4 sm:p-5 shadow-lg border border-teal-100/80 flex flex-col min-h-0 justify-between fu">
            
            {/* TOP STATS & PROGRESS BOX */}
            <div className="space-y-3 shrink-0">
              
              {/* COMPACT BRANDED CAMPAIGN STATS CARD */}
              <div className="bg-gradient-to-br from-teal-800 via-cyan-900 to-emerald-900 rounded-2xl p-4 text-white shadow-md relative overflow-hidden">
                <div className="flex justify-between items-end mb-1.5 gap-2 relative z-10">
                  <div className="min-w-0">
                    <span className="text-cyan-200/80 block mb-0.5 text-[9px] uppercase tracking-widest font-black">Dana Terkumpul</span>
                    <span className="text-lg sm:text-xl font-black text-white leading-none break-words">
                      Rp {(program.terkumpul || 0).toLocaleString('id-ID')}
                    </span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-cyan-200/80 block mb-0.5 text-[9px] uppercase tracking-widest font-black">Target</span>
                    <span className="font-bold text-cyan-100 text-xs">
                      Rp {program.target.toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>

                <div className="w-full bg-slate-950/40 rounded-full h-2.5 overflow-hidden mt-2 p-0.5 border border-white/10 relative z-10">
                  <div
                    className="bg-gradient-to-r from-amber-400 to-amber-300 h-full rounded-full transition-all duration-700 shadow-sm"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <div className="flex justify-between items-center mt-2 text-[10px] font-bold text-cyan-100 relative z-10">
                  <span className="flex items-center gap-1"><Users className="w-3 h-3 text-amber-300" /> {recentDonors.length} Donatur</span>
                  <span className="bg-white/20 px-2 py-0.5 rounded text-white font-black">{progress}% Terpenuhi</span>
                </div>
              </div>

              {/* WIZARD STEP HEADER */}
              {!isTargetReached && (
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-black text-slate-400 uppercase tracking-widest text-[9px]">Langkah {step} / 4</span>
                    <span className="font-black text-teal-700 uppercase tracking-wider text-[10px]">{stepName}</span>
                  </div>
                  <div className="flex gap-1.5">
                    {steps.map(s => (
                      <div
                        key={s.n}
                        className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${step >= s.n ? 'bg-teal-600' : 'bg-slate-200'}`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* WIZARD FORM CONTENT */}
            {isTargetReached ? (
              <div className="bg-teal-50 border border-teal-200 rounded-2xl p-5 text-center space-y-2 my-auto">
                <CheckCircle2 className="w-8 h-8 text-teal-600 mx-auto" />
                <h4 className="font-black text-teal-900 text-sm">Target Terpenuhi!</h4>
                <p className="text-xs text-teal-700 font-medium">Penggalangan dana program ini telah selesai.</p>
                <Link href="/program" className="block py-2.5 bg-teal-600 text-white font-bold rounded-xl text-xs hover:bg-teal-700 transition-colors">
                  Lihat Program Lain
                </Link>
              </div>
            ) : (
              <div className="flex-1 flex flex-col justify-center my-2 min-h-0">

                {/* STEP 1: NOMINAL */}
                {step === 1 && (
                  <div className="space-y-3 fu">
                    <h3 className="font-black text-slate-900 text-sm">Pilih Nominal Sedekah</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {presets.map(a => (
                        <button
                          key={a}
                          type="button"
                          onClick={() => { setSelectedAmount(a); setCustomAmount(''); }}
                          className={`py-2.5 rounded-xl font-black text-xs border-2 transition-all ${selectedAmount === a ? 'bg-teal-50 border-teal-600 text-teal-800 shadow-sm' : 'bg-white border-slate-200 text-slate-700 hover:border-teal-300'}`}
                        >
                          Rp {(a / 1000)}.000
                        </button>
                      ))}
                    </div>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-black text-slate-400 text-xs">Rp</span>
                      <input
                        type="text"
                        inputMode="numeric"
                        placeholder="Nominal lain..."
                        value={customAmount}
                        onChange={fmt}
                        className="w-full bg-white border-2 border-slate-200 rounded-xl py-2.5 pl-10 pr-3 text-xs font-bold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-teal-600"
                      />
                    </div>
                    {finalAmount > 0 && (
                      <div className="flex justify-between items-center p-2.5 rounded-xl bg-teal-50 border border-teal-200 text-xs">
                        <span className="font-bold text-slate-600">Niat Sedekah</span>
                        <span className="font-black text-teal-700 text-sm">Rp {finalAmount.toLocaleString('id-ID')}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* STEP 2: IDENTITAS */}
                {step === 2 && (
                  <div className="space-y-2.5 fu">
                    <h3 className="font-black text-slate-900 text-sm">Identitas Donatur</h3>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        maxLength={40}
                        placeholder="Nama Lengkap"
                        disabled={isAnon}
                        value={isAnon ? 'Hamba Allah' : donorName}
                        onChange={e => setDonorName(e.target.value)}
                        className="w-full bg-white border-2 border-slate-200 rounded-xl py-2 pl-9 pr-3 text-xs font-bold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-teal-600 disabled:bg-slate-50"
                      />
                    </div>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                      <input
                        type="tel"
                        inputMode="tel"
                        maxLength={20}
                        placeholder="No. WhatsApp (8-15 digit)"
                        value={donorPhone}
                        onChange={e => setDonorPhone(e.target.value)}
                        className={`w-full bg-white border-2 rounded-xl py-2 pl-9 pr-3 text-xs font-bold text-slate-800 placeholder:text-slate-400 focus:outline-none ${phoneDigits && !phoneOk ? 'border-rose-300' : 'border-slate-200 focus:border-teal-600'}`}
                      />
                    </div>
                    <div className="relative">
                      <MessageSquareHeart className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                      <textarea
                        rows={2}
                        maxLength={250}
                        placeholder="Doa / harapan Anda (opsional)..."
                        value={doa}
                        onChange={e => setDoa(e.target.value)}
                        className="w-full bg-white border-2 border-slate-200 rounded-xl py-2 pl-9 pr-3 text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-teal-600 resize-none"
                      />
                    </div>
                    <label className="flex items-center gap-2 cursor-pointer pt-0.5">
                      <input type="checkbox" checked={isAnon} onChange={e => setIsAnon(e.target.checked)} className="rounded text-teal-600 focus:ring-0" />
                      <span className="text-[11px] font-bold text-slate-600">Donasi sebagai <b className="text-teal-700">Hamba Allah</b></span>
                    </label>
                  </div>
                )}

                {/* STEP 3: PEMBAYARAN */}
                {step === 3 && (
                  <div className="space-y-2.5 fu">
                    <div className="flex justify-between items-center">
                      <h3 className="font-black text-slate-900 text-sm">Metode Pembayaran</h3>
                      <span className="text-[11px] font-black text-teal-700 bg-teal-50 px-2 py-0.5 rounded">Rp {finalAmount.toLocaleString('id-ID')}</span>
                    </div>

                    <div className="flex gap-1.5 overflow-x-auto pb-1">
                      {ACTIVE_CATS.map(c => (
                        <button
                          key={c.key}
                          type="button"
                          onClick={() => { setPayCat(c.key); setPayMethod(null); }}
                          className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[9px] font-black uppercase border-2 transition-all ${payCat === c.key ? 'bg-teal-600 border-teal-600 text-white' : 'bg-white border-slate-200 text-slate-500'}`}
                        >
                          <c.Icon className="w-3 h-3" /> {c.label}
                        </button>
                      ))}
                    </div>

                    <div className="space-y-1.5 max-h-[140px] overflow-y-auto thin-scroll pr-1">
                      {methodsInCat.map(m => (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => setPayMethod(m.id)}
                          className={`w-full flex items-center gap-2.5 p-2 rounded-xl border-2 text-left transition-all ${payMethod === m.id ? 'border-teal-600 bg-teal-50/60' : 'border-slate-200 bg-white hover:border-teal-300'}`}
                        >
                          <span className={`w-7 h-7 rounded-md ${m.color} text-white flex items-center justify-center shrink-0`}>
                            {m.category === 'bank' ? <Landmark className="w-3.5 h-3.5" /> : m.category === 'ewallet' ? <Wallet className="w-3.5 h-3.5" /> : <QrCode className="w-3.5 h-3.5" />}
                          </span>
                          <span className="font-bold text-slate-800 text-xs flex-1 truncate">{m.name}</span>
                          {payMethod === m.id && <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />}
                        </button>
                      ))}
                    </div>

                    {selectedMethod && (
                      <div className="rounded-xl border border-teal-200 bg-teal-50/50 p-2.5 flex items-center justify-between gap-2">
                        <div className="min-w-0">
                          <span className="font-mono font-black text-slate-900 text-xs block truncate">{selectedMethod.number}</span>
                          <span className="text-[8px] text-slate-500 font-bold uppercase truncate block">A/N {selectedMethod.holder}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => copy(selectedMethod.number, selectedMethod.id)}
                          className={`p-1.5 rounded-md border shrink-0 ${copied === selectedMethod.id ? 'bg-teal-100 text-teal-700 border-teal-200' : 'bg-white text-slate-500'}`}
                        >
                          {copied === selectedMethod.id ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* STEP 4: BUKTI TRANSFER */}
                {step === 4 && (
                  <div className="space-y-2.5 fu">
                    <h3 className="font-black text-slate-900 text-sm">Unggah Bukti Transfer</h3>
                    {!preview ? (
                      <div
                        onDragEnter={onDrag}
                        onDragLeave={onDrag}
                        onDragOver={onDrag}
                        onDrop={onDrop}
                        onClick={() => fileRef.current?.click()}
                        className={`border-2 border-dashed rounded-xl p-4 flex flex-col items-center cursor-pointer transition-all ${drag ? 'border-teal-500 bg-teal-50' : 'border-slate-300 hover:border-teal-400 bg-white'}`}
                      >
                        <input
                          ref={fileRef}
                          type="file"
                          accept="image/jpeg,image/png,image/webp,image/heic,.jpg,.jpeg,.png,.webp,.heic"
                          className="hidden"
                          onChange={e => e.target.files?.[0] && pickFile(e.target.files[0])}
                        />
                        <Upload className="w-5 h-5 text-teal-600 mb-1" />
                        <p className="text-xs font-bold text-slate-700 text-center">Klik / Drag Foto Bukti Transfer</p>
                        <p className="text-[9px] text-slate-400 mt-0.5">JPG, PNG, WebP, HEIC (Maks 10MB)</p>
                      </div>
                    ) : (
                      <div className="relative border border-teal-200 rounded-xl p-2 bg-teal-50/40 flex items-center gap-2.5">
                        <button
                          type="button"
                          onClick={clearFile}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-white border border-slate-200 text-slate-600 rounded-full flex items-center justify-center shadow-md hover:text-rose-500"
                        >
                          <X className="w-3 h-3" />
                        </button>
                        <img src={preview} alt="Bukti" className="w-12 h-12 rounded-lg object-cover border border-white shadow-sm shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold text-slate-800 truncate">{file?.name}</p>
                          <span className="text-[9px] font-bold text-teal-700 bg-teal-100 px-1.5 py-0.5 rounded inline-block mt-0.5">Foto Bukti Siap</span>
                        </div>
                      </div>
                    )}

                    <div className="p-2 bg-slate-50 rounded-lg border border-slate-200/80 text-[10px] space-y-1">
                      <div className="flex justify-between"><span className="text-slate-500">Nominal</span><b className="text-teal-700">Rp {finalAmount.toLocaleString('id-ID')}</b></div>
                      <div className="flex justify-between"><span className="text-slate-500">Metode</span><b className="text-slate-800">{selectedMethod?.name || '-'}</b></div>
                    </div>
                  </div>
                )}

              </div>
            )}

            {/* WIZARD ACTION BUTTONS AT BOTTOM */}
            {!isTargetReached && (
              <div className="pt-2 border-t border-slate-100 flex gap-2 shrink-0">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={prev}
                    className="px-3.5 py-2.5 rounded-xl border-2 border-slate-200 text-slate-600 hover:text-slate-900 font-bold text-xs flex items-center gap-1 active:scale-95 transition-all"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Kembali
                  </button>
                )}

                {step < 4 ? (
                  <button
                    type="button"
                    onClick={next}
                    className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 via-cyan-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-black text-xs shadow-md shadow-teal-600/20 active:scale-[.98] flex items-center justify-center gap-1.5 transition-all"
                  >
                    Lanjut Pembayaran <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={submit}
                    disabled={submitLoading || !file}
                    className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 via-cyan-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 disabled:from-slate-200 disabled:to-slate-200 disabled:text-slate-400 disabled:shadow-none text-white font-black text-xs shadow-md active:scale-[.98] flex items-center justify-center gap-1.5 transition-all"
                  >
                    {submitLoading ? (
                      <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Memproses...</>
                    ) : (
                      <><Sparkles className="w-3.5 h-3.5 text-amber-300" /> Kirim Donasi & Bukti</>
                    )}
                  </button>
                )}
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}