'use client';
import { useState, useRef, useCallback } from 'react';
import { submitDonationWithProof } from '@/app/actions/donate';
import toast from 'react-hot-toast';
import {
  ShieldCheck, Upload, X, CheckCircle2, Loader2, AlertCircle,
  HandHeart, ArrowRight, ArrowLeft, Copy, Banknote, User, Phone,
  MessageSquareHeart, Sparkles, CreditCard, Landmark, Wallet, QrCode,
} from 'lucide-react';

// ============================================================
// KONFIGURASI METODE PEMBAYARAN (DATA-DRIVEN)
// Tambah e-wallet/QRIS di sini → tab kategori OTOMATIS muncul.
// Kategori yang method-nya kosong → tab-nya OTOMATIS disembunyikan.
// ============================================================
type PayMethod = {
  id: string; category: 'bank' | 'ewallet' | 'qris';
  name: string; number: string; holder: string; color: string;
};
const PAYMENT_METHODS: PayMethod[] = [
  { id: 'bjb',     category: 'bank', name: 'Bank BJB', number: '0070 2011 0209 83', holder: 'YAYASAN AN-NAFI MUTIARA UMMAT', color: 'bg-cyan-600' },
  { id: 'mandiri', category: 'bank', name: 'Mandiri',  number: '164 000 293 3200',  holder: 'YAYASAN AN-NAFI MUTIARA UMMAT', color: 'bg-blue-800' },
  { id: 'bca',     category: 'bank', name: 'BCA',      number: '6801 143 498',      holder: 'YAYASAN AN-NAFI MUTIARA UMMAT', color: 'bg-blue-600' },
  { id: 'bri',     category: 'bank', name: 'BRI',      number: '1127 010 007 225 68', holder: 'YAYASAN AN-NAFI MUTIARA UMMAT', color: 'bg-blue-700' },
  // --- E-WALLET: uncomment & isi nomor asli lo, tab langsung muncul ---
  // { id: 'dana', category: 'ewallet', name: 'DANA',     number: '0812-XXXX-XXXX', holder: 'Nama Pemilik', color: 'bg-sky-500' },
  // { id: 'ovo',  category: 'ewallet', name: 'OVO',      number: '0812-XXXX-XXXX', holder: 'Nama Pemilik', color: 'bg-purple-600' },
  // { id: 'gopay',category: 'ewallet', name: 'GoPay',    number: '0812-XXXX-XXXX', holder: 'Nama Pemilik', color: 'bg-emerald-500' },
  // --- QRIS: kalau lo punya gambar QR merchant, isi qrisImage di state & tambah method qris ---
];
const CATEGORIES = [
  { key: 'bank',    label: 'Bank Transfer', Icon: Landmark },
  { key: 'ewallet', label: 'E-Wallet',      Icon: Wallet },
  { key: 'qris',    label: 'QRIS',          Icon: QrCode },
] as const;
// Kategori aktif = yang punya minimal 1 method (auto-hide yang kosong)
const ACTIVE_CATS = CATEGORIES.filter(c => PAYMENT_METHODS.some(m => m.category === c.key));

export default function SedekahPage() {
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

  // Payment state
  const [payCat, setPayCat] = useState<string>(ACTIVE_CATS[0]?.key || 'bank');
  const [payMethod, setPayMethod] = useState<string | null>(null);

  const presets = [25000, 50000, 100000, 250000, 500000, 1000000];
  // FIX BUG: pakai \D (non-digit), bukan /./g yang makan semua karakter
  const finalAmount = selectedAmount || Number(customAmount.replace(/\D/g, '')) || 0;
  const phoneDigits = donorPhone.replace(/\D/g, '');
  const phoneOk = phoneDigits.length >= 8 && phoneDigits.length <= 15; // fleksibel per negara

  const methodsInCat = PAYMENT_METHODS.filter(m => m.category === payCat);
  const selectedMethod = PAYMENT_METHODS.find(m => m.id === payMethod) || null;

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
  const copy = (t: string, tag: string) => {
    navigator.clipboard.writeText(t.replace(/\s/g, ''));
    setCopied(tag); toast.success('Nomor disalin'); setTimeout(() => setCopied(''), 2000);
  };

  const steps = [
    { n: 1, label: 'Nominal', Icon: Banknote },
    { n: 2, label: 'Identitas', Icon: User },
    { n: 3, label: 'Pembayaran', Icon: CreditCard },
    { n: 4, label: 'Bukti', Icon: Upload },
  ];
  const currentStepName = steps.find(s => s.n === step)?.label || '';

  // === KUNCI STEP (triple-guard: UI + submit + server) ===
  const next = () => {
    if (step === 1 && finalAmount < 10000) return toast.error('Pilih nominal minimal Rp 10.000');
    if (step === 2 && !phoneOk) return toast.error('Nomor WhatsApp tidak valid (8–15 digit)');
    if (step === 3 && !payMethod) return toast.error('Pilih metode pembayaran dulu');
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
      fd.append('program_title', 'Sedekah Umum / Operasional');
      fd.append('program_id', '');
      fd.append('message', doa || '');
      fd.append('payment_method', selectedMethod?.name || '');
      fd.append('payment_proof', file);
      fd.append('website_url', '');                      // honeypot
      fd.append('submit_time', formLoadTime.toString()); // time-trap

      const res = await submitDonationWithProof(fd);
      if (!res.success) return toast.error(res.message);
      toast.success(res.message, { duration: 5000 });
      setStep(1); clearFile(); setCustomAmount(''); setSelectedAmount(null);
      setDonorName(''); setDonorPhone(''); setDoa(''); setPayMethod(null);
    } catch { toast.error('Kesalahan sistem'); }
    finally { setSubmitLoading(false); }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased pb-24 overflow-x-hidden selection:bg-emerald-500 selection:text-white">
      <style dangerouslySetInnerHTML={{ __html: `@keyframes fadeUp{from{opacity:0;transform:translateY(18px) scale(.99)}to{opacity:1;transform:translateY(0) scale(1)}}.fu{opacity:0;animation:fadeUp .55s cubic-bezier(.22,1,.36,1) forwards}@keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}` }} />

      {/* HEADER ZAMRUD */}
      <div className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-900 pt-20 pb-28 sm:pb-36 px-5 text-center relative overflow-hidden shadow-inner">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-[20%] -right-[10%] w-[55%] h-[55%] rounded-full bg-emerald-500/20 blur-[120px] animate-pulse" />
          <div className="absolute -bottom-[25%] -left-[10%] w-[55%] h-[55%] rounded-full bg-teal-400/20 blur-[120px] animate-pulse" style={{ animationDelay: '1.5s' }} />
        </div>
        <div className="max-w-3xl mx-auto space-y-4 relative z-10 fu">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-emerald-700/80 to-teal-800/80 backdrop-blur-md rounded-2xl flex items-center justify-center border border-emerald-500/30 shadow-xl text-amber-300">
            <HandHeart className="w-8 h-8" />
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            Sedekah <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-200">Bebas</span>
          </h1>
          <p className="text-emerald-100/90 text-sm md:text-base max-w-xl mx-auto leading-relaxed font-medium px-2">
            Bantu operasional yayasan tanpa potongan pihak ketiga. Upload bukti transfer untuk verifikasi transparan.
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 relative z-20 -mt-20 sm:-mt-24">
        <div className="bg-white rounded-3xl p-5 sm:p-9 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100 fu">

          {/* ===== MOBILE STEP HEADER (block sm:hidden) ===== */}
          <div className="sm:hidden mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider">Langkah {step} dari 4</span>
              <span className="text-[11px] font-black text-emerald-600 uppercase tracking-wider">{currentStepName}</span>
            </div>
            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500" style={{ width: `${(step / 4) * 100}%` }} />
            </div>
          </div>

          {/* ===== DESKTOP STEP CIRCLES (hidden sm:flex) ===== */}
          <div className="hidden sm:flex items-center justify-between pb-8 mb-8 border-b border-slate-100/80">
            {steps.map((s, i) => (
              <div key={s.n} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center gap-2">
                  <div className={`w-11 h-11 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                    step === s.n ? 'bg-gradient-to-br from-emerald-500 to-emerald-600 border-emerald-500 text-white shadow-lg shadow-emerald-500/30 scale-110'
                    : step > s.n ? 'bg-teal-50 border-teal-500 text-teal-600'
                    : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
                    {step > s.n ? <CheckCircle2 className="w-5 h-5" /> : <s.Icon className="w-5 h-5" />}
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${step === s.n ? 'text-emerald-700' : step > s.n ? 'text-teal-600' : 'text-slate-400'}`}>{s.label}</span>
                </div>
                {i < steps.length - 1 && (
                  <div className="flex-1 h-1 mx-3 mb-6 rounded-full bg-slate-100 overflow-hidden">
                    <div className={`h-full bg-gradient-to-r from-emerald-400 to-teal-400 transition-transform duration-500 origin-left ${step > s.n ? 'scale-x-100' : 'scale-x-0'}`} />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="min-h-[380px]">
            {/* ===== STEP 1: NOMINAL ===== */}
            {step === 1 && (
              <div className="space-y-5 fu">
                <div>
                  <h3 className="font-black text-slate-800 text-lg sm:text-xl">Pilih Nominal Sedekah</h3>
                  <p className="text-sm text-slate-500 mt-1">Minimal Rp 10.000 • Tanpa batas maksimal</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {presets.map(a => (
                    <button key={a} type="button" onClick={() => { setSelectedAmount(a); setCustomAmount(''); }}
                      className={`py-3.5 sm:py-4 rounded-2xl font-bold text-sm border-2 transition-all ${selectedAmount === a ? 'bg-emerald-50 border-emerald-500 text-emerald-700 shadow-md scale-[1.02]' : 'bg-white border-slate-200 text-slate-600 hover:border-emerald-300'}`}>
                      Rp {(a / 1000)}k
                    </button>
                  ))}
                </div>
                <div className="relative">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 font-black text-slate-400">Rp</span>
                  <input type="text" inputMode="numeric" placeholder="Nominal lainnya..." value={customAmount} onChange={fmt}
                    className="w-full bg-white border-2 border-slate-200 rounded-2xl py-4 pl-14 pr-4 text-base font-bold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10" />
                </div>
                {finalAmount > 0 && (
                  <div className="flex justify-between items-center p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100">
                    <span className="text-sm font-bold text-slate-600">Total Sedekah</span>
                    <span className="text-xl sm:text-2xl font-black text-emerald-600">Rp {finalAmount.toLocaleString('id-ID')}</span>
                  </div>
                )}
              </div>
            )}

            {/* ===== STEP 2: IDENTITAS ===== */}
            {step === 2 && (
              <div className="space-y-4 fu">
                <div>
                  <h3 className="font-black text-slate-800 text-lg sm:text-xl">Data Diri Donatur</h3>
                  <p className="text-sm text-slate-500 mt-1">WhatsApp <span className="text-rose-500 font-bold">wajib</span> (8–15 digit, format bebas)</p>
                </div>
                <div className="relative">
                  <User className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                  <input type="text" maxLength={30} placeholder="Nama Lengkap" disabled={isAnon} value={isAnon ? 'Hamba Allah' : donorName} onChange={e => setDonorName(e.target.value)}
                    className="w-full bg-white border-2 border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 text-sm sm:text-base font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 disabled:opacity-60 disabled:bg-slate-50" />
                </div>
                <div className="relative">
                  <Phone className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                  <input type="tel" inputMode="tel" maxLength={20} placeholder="cth: 08123456789 / +62812..." value={donorPhone} onChange={e => setDonorPhone(e.target.value)}
                    className={`w-full bg-white border-2 rounded-2xl py-3.5 pl-12 pr-4 text-sm sm:text-base font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-4 transition-colors ${phoneDigits && !phoneOk ? 'border-rose-300 focus:border-rose-400 focus:ring-rose-500/10' : 'border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/10'}`} />
                  {phoneDigits && !phoneOk && <span className="absolute right-4 top-4 text-[10px] font-bold text-rose-500">digit tidak valid</span>}
                </div>
                <div className="relative">
                  <MessageSquareHeart className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                  <textarea rows={3} maxLength={300} placeholder="Doa / harapan (opsional)" value={doa} onChange={e => setDoa(e.target.value)}
                    className="w-full bg-white border-2 border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 text-sm sm:text-base font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 resize-none" />
                </div>
                <label className="flex items-center gap-3 cursor-pointer pt-1 group w-fit">
                  <div className="relative flex items-center justify-center">
                    <input type="checkbox" checked={isAnon} onChange={e => setIsAnon(e.target.checked)} className="peer sr-only" />
                    <div className="w-5 h-5 rounded border-2 border-slate-300 peer-checked:bg-emerald-500 peer-checked:border-emerald-500" />
                    <CheckCircle2 className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100" />
                  </div>
                  <span className="text-sm font-semibold text-slate-600">Sembunyikan nama (<b className="text-emerald-600">Hamba Allah</b>)</span>
                </label>
              </div>
            )}

            {/* ===== STEP 3: PAYMENT GATEWAY STYLE ===== */}
            {step === 3 && (
              <div className="space-y-5 fu">
                <div>
                  <h3 className="font-black text-slate-800 text-lg sm:text-xl">Pilih Metode Pembayaran</h3>
                  <p className="text-sm text-slate-500 mt-1">Transfer tepat <b className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Rp {finalAmount.toLocaleString('id-ID')}</b></p>
                </div>

                {/* Category tabs (scrollable di mobile, auto-hide kosong) */}
                <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-none">
                  {ACTIVE_CATS.map(c => (
                    <button key={c.key} type="button" onClick={() => { setPayCat(c.key); setPayMethod(null); }}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider whitespace-nowrap border-2 transition-all ${payCat === c.key ? 'bg-emerald-600 border-emerald-600 text-white shadow-md' : 'bg-white border-slate-200 text-slate-500 hover:border-emerald-300'}`}>
                      <c.Icon className="w-4 h-4" /> {c.label}
                    </button>
                  ))}
                </div>

                {/* Method grid compact */}
                <div className="grid grid-cols-2 gap-2.5">
                  {methodsInCat.map(m => (
                    <button key={m.id} type="button" onClick={() => setPayMethod(m.id)}
                      className={`flex items-center gap-3 p-3 rounded-2xl border-2 text-left transition-all ${payMethod === m.id ? 'border-emerald-500 bg-emerald-50/50 shadow-sm' : 'border-slate-200 bg-white hover:border-emerald-300'}`}>
                      <span className={`w-9 h-9 rounded-xl ${m.color} text-white flex items-center justify-center shrink-0`}>
                        {m.category === 'bank' ? <Landmark className="w-4 h-4" /> : m.category === 'ewallet' ? <Wallet className="w-4 h-4" /> : <QrCode className="w-4 h-4" />}
                      </span>
                      <span className="font-bold text-slate-800 text-sm truncate flex-1">{m.name}</span>
                      {payMethod === m.id && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                    </button>
                  ))}
                </div>

                {/* Selected method detail panel (ala Midtrans instruction) */}
                {selectedMethod && (
                  <div className="rounded-2xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50/60 to-white p-4 sm:p-5 space-y-4 fu">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Transfer ke rekening ini</span>
                      <button type="button" onClick={() => setPayMethod(null)} className="text-[10px] font-bold text-emerald-600 hover:underline">Ganti metode</button>
                    </div>
                    <div className="flex items-center justify-between gap-3 bg-white border border-slate-200 rounded-xl p-3.5">
                      <div className="min-w-0">
                        <span className="font-mono font-black text-slate-900 text-base sm:text-lg tracking-wide block truncate">{selectedMethod.number}</span>
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">A/N {selectedMethod.holder}</span>
                      </div>
                      <button type="button" onClick={() => copy(selectedMethod.number, selectedMethod.id)}
                        className={`p-2.5 rounded-xl border shrink-0 transition-all ${copied === selectedMethod.id ? 'bg-emerald-100 border-emerald-200 text-emerald-600' : 'bg-slate-50 border-slate-200 text-slate-500 hover:text-emerald-600'}`}>
                        {copied === selectedMethod.id ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                    <div className="flex items-center justify-between p-3.5 rounded-xl bg-emerald-600 text-white">
                      <span className="text-xs font-bold opacity-90">Nominal yang harus ditransfer</span>
                      <span className="font-black text-lg">Rp {finalAmount.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-xl">
                      <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <p className="text-[11px] text-amber-800 leading-relaxed font-medium">Simpan screenshot bukti transfer untuk diunggah di langkah berikutnya.</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ===== STEP 4: BUKTI ===== */}
            {step === 4 && (
              <div className="space-y-5 fu">
                <div>
                  <h3 className="font-black text-slate-800 text-lg sm:text-xl">Upload Bukti Transfer</h3>
                  <p className="text-sm text-slate-500 mt-1">JPG / PNG • Maksimal 5MB</p>
                </div>
                {!preview ? (
                  <div onDragEnter={onDrag} onDragLeave={onDrag} onDragOver={onDrag} onDrop={onDrop} onClick={() => fileRef.current?.click()}
                    className={`border-2 border-dashed rounded-3xl p-8 sm:p-10 flex flex-col items-center cursor-pointer transition-all ${drag ? 'border-emerald-400 bg-emerald-50 scale-[1.01]' : 'border-slate-300 hover:border-emerald-400 bg-white'}`}>
                    <input ref={fileRef} type="file" accept=".jpg,.jpeg,.png" className="hidden" onChange={e => e.target.files?.[0] && pickFile(e.target.files[0])} />
                    <div className={`p-4 rounded-full mb-3 ${drag ? 'bg-emerald-100' : 'bg-slate-100'}`}>
                      <Upload className={`w-8 h-8 ${drag ? 'text-emerald-600' : 'text-slate-500'}`} />
                    </div>
                    <p className="text-base font-bold text-slate-700">{drag ? 'Lepaskan file' : 'Klik atau drag & drop'}</p>
                    <p className="text-xs text-slate-400 mt-1">Pastikan bukti terlihat jelas</p>
                  </div>
                ) : (
                  <div className="relative border-2 border-emerald-100 rounded-3xl p-4 sm:p-5 bg-gradient-to-br from-emerald-50/50 to-white">
                    <button type="button" onClick={clearFile} className="absolute -top-3 -right-3 w-8 h-8 bg-white border border-slate-200 text-slate-600 rounded-full flex items-center justify-center shadow-md hover:bg-rose-50 hover:text-rose-500 z-10"><X className="w-4 h-4" /></button>
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-4 border-white shadow-md shrink-0 bg-slate-100">
                        <img src={preview} alt="bukti" className="w-full h-full object-cover" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm sm:text-base font-bold text-slate-800 truncate">{file?.name}</p>
                        <p className="text-xs sm:text-sm text-slate-500 mt-1">{((file?.size || 0) / 1024 / 1024).toFixed(2)} MB</p>
                        <div className="inline-flex items-center gap-1.5 mt-2 px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded-lg text-xs font-bold"><CheckCircle2 className="w-4 h-4" /> Siap dikirim</div>
                      </div>
                    </div>
                  </div>
                )}
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2.5 text-sm">
                  <div className="flex justify-between"><span className="text-slate-500">Nominal</span><b className="text-emerald-600">Rp {finalAmount.toLocaleString('id-ID')}</b></div>
                  <div className="flex justify-between border-t border-slate-200/60 pt-2.5"><span className="text-slate-500">Nama</span><b className="text-slate-800">{isAnon ? 'Hamba Allah' : donorName || 'Hamba Allah'}</b></div>
                  <div className="flex justify-between border-t border-slate-200/60 pt-2.5"><span className="text-slate-500">Metode</span><b className="text-slate-800">{selectedMethod?.name || '-'}</b></div>
                </div>
              </div>
            )}
          </div>

          {/* NAV */}
          <div className="flex gap-3 pt-7 mt-7 border-t border-slate-100">
            {step > 1 && (
              <button type="button" onClick={prev} className="px-5 py-3.5 sm:py-4 rounded-2xl border-2 border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300 font-bold text-sm flex items-center gap-2 active:scale-95">
                <ArrowLeft className="w-5 h-5" /> <span className="hidden sm:inline">Kembali</span>
              </button>
            )}
            {step < 4 ? (
              <button type="button" onClick={next} className="flex-1 py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-black text-sm shadow-xl shadow-emerald-600/20 active:scale-[.98] flex items-center justify-center gap-2">
                Lanjut <ArrowRight className="w-5 h-5" />
              </button>
            ) : (
              <button type="button" onClick={submit} disabled={submitLoading || !file}
                className="flex-1 py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 disabled:from-slate-200 disabled:to-slate-200 disabled:text-slate-400 disabled:shadow-none text-white font-black text-sm shadow-xl shadow-emerald-600/20 active:scale-[.98] flex items-center justify-center gap-2">
                {submitLoading ? <><Loader2 className="w-5 h-5 animate-spin" /> Memproses...</> : <><Sparkles className="w-5 h-5" /> Kirim Donasi & Bukti</>}
              </button>
            )}
          </div>
          <p className="text-center text-[11px] font-bold text-slate-400 mt-5 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500" /> Transaksi aman • Terverifikasi admin
          </p>
        </div>
      </div>
    </div>
  );
}