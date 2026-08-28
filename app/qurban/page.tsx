'use client';

import { useState, useEffect } from 'react';
import { 
  Heart, ShieldCheck, CheckCircle2, Loader2, 
  Sparkles, MessageSquare, Users, Award, HelpCircle, ArrowRight, Calendar, Coins
} from 'lucide-react';
import { supabase } from '@/supabase';
import toast from 'react-hot-toast';

export default function QurbanPage() {
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  
  // Database States
  const [status, setStatus] = useState<'OFF' | 'ON' | 'POST'>('OFF');
  const [prices, setPrices] = useState({ kambing: 2500000, sapiPatungan: 3000000, sapiUtuh: 21000000 });
  const [shohibulList, setShohibulList] = useState<any[]>([]);

  // Form Pembelian Qurban (ON)
  const [selectedPackage, setSelectedPackage] = useState<'Kambing' | 'Sapi Patungan' | 'Sapi Utuh'>('Kambing');
  const [buyerName, setBuyerName] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [mudhohiName, setMudhohiName] = useState('');

  // Form Tabungan Qurban (OFF)
  const [tabunganName, setTabunganName] = useState('');
  const [tabunganPhone, setTabunganPhone] = useState('');
  const [tabunganTarget, setTabunganTarget] = useState('Kambing Premium');
  const [tabunganPlan, setTabunganPlan] = useState('Bulanan (Rp 250.000 / Bulan)');

  useEffect(() => {
    async function initQurbanPage() {
      setLoading(true);
      try {
        const { data: settings } = await supabase.from('qurban_settings').select('*').eq('id', 1).maybeSingle();
        if (settings) {
          setStatus(settings.status);
          setPrices({ kambing: settings.harga_kambing, sapiPatungan: settings.harga_sapi_patungan, sapiUtuh: settings.harga_sapi_utuh });
        }

        const { data: orders } = await supabase.from('qurban_orders').select('*').eq('status_pembayaran', 'LUNAS').order('created_at', { ascending: false });
        if (orders) setShohibulList(orders);
      } catch (err) {
        console.error("Gagal menyelaraskan sistem qurban:", err);
      } finally {
        setLoading(false);
      }
    }
    initQurbanPage();
  }, []);

  const handleQurbanSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyerName || !buyerPhone || !mudhohiName) return toast.error('Semua kolom wajib diisi!');

    setSubmitLoading(true);
    const currentPrice = selectedPackage === 'Kambing' ? prices.kambing : selectedPackage === 'Sapi Patungan' ? prices.sapiPatungan : prices.sapiUtuh;

    try {
      const { error } = await supabase.from('qurban_orders').insert([
        { nama_donatur: buyerName, nomor_wa: buyerPhone, tipe_qurban: selectedPackage, nama_mudhohi: mudhohiName, total_bayar: currentPrice, status_pembayaran: 'PENDING' }
      ]);
      if (error) throw error;

      const adminPhone = "6281388898967";
      const waText = `Halo Admin YAMU Peduli, saya ingin konfirmasi niat Qurban.

*Nama Pemesan:* ${buyerName}
*Nomor WhatsApp:* ${buyerPhone}
*Paket Pilihan:* Qurban ${selectedPackage}
*Niat Pahala Qurban Atas Nama:* ${mudhohiName}
*Total Nominal:* Rp ${currentPrice.toLocaleString('id-ID')}

Mohon dikirimkan instruksi nomor rekening transfer yayasannya admin. Terima kasih.`;

      window.open(`https://wa.me/${adminPhone}?text=${encodeURIComponent(waText)}`, '_blank');
      toast.success('Pemesanan terekam! Dialihkan ke WhatsApp...');
      setBuyerName(''); setBuyerPhone(''); setMudhohiName('');
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleTabunganSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tabunganName || !tabunganPhone) return toast.error('Nama dan Nomor WA wajib diisi!');

    const adminPhone = "6281388898967";
    const waText = `Halo Admin YAMU Peduli, saya berminat mendaftar program *Tabungan Qurban Berkala*.

*Nama Lengkap:* ${tabunganName}
*Nomor WhatsApp:* ${tabunganPhone}
*Target Hewan:* ${tabunganTarget}
*Rencana Setoran:* ${tabunganPlan}

Mohon panduan langkah awal pembukaan tabungan qurban nya admin. Terima kasih.`;

    window.open(`https://wa.me/${adminPhone}?text=${encodeURIComponent(waText)}`, '_blank');
    toast.success('Pendaftaran dikirim ke WhatsApp!');
    setTabunganName(''); setTabunganPhone('');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-3 text-slate-400">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
        <span className="text-xs font-bold uppercase tracking-wider">Menghubungkan Sistem Kebaikan...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased pb-24">
      
      {/* HERO HEADER */}
      <div className="bg-emerald-950 pt-24 pb-20 px-6 text-center border-b border-emerald-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] bg-[size:20px_20px]"></div>
        <div className="max-w-3xl mx-auto space-y-4 relative z-10">
          <span className="inline-block px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-widest backdrop-blur-md">
            Ibadah Qurban YAMU Peduli
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Tunaikan Qurban Terbaik<br/>Untuk Saudara di Pelosok
          </h1>
          <p className="text-emerald-100/70 text-sm md:text-base max-w-xl mx-auto font-medium">
            Jembatan kemudahan ibadah qurban yang berkah, amanah, profesional, dan seratus persen tepat sasaran sampai ke penerima manfaat.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-8 -mt-8 relative z-20">
        
        {/* ========================================== */}
        {/* KONDISI 1: OFF-SEASON (TABUNGAN QURBAN) */}
        {/* ========================================== */}
        {status === 'OFF' && (
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 bg-white rounded-[2rem] p-8 md:p-10 shadow-xl border border-slate-200/60 space-y-6">
              <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center"><Calendar className="w-6 h-6" /></div>
              <h2 className="text-2xl font-black tracking-tight text-slate-900">Program Tabungan Qurban Berkelanjutan</h2>
              <p className="text-sm md:text-base text-slate-500 leading-relaxed font-medium">
                Saat ini penggalangan pembelian hewan qurban live **belum dibuka** karena belum memasuki bulan Dzulhijjah. 
                <br/><br/>
                Namun, jangan biarkan persiapan ibadah terbaik Anda tergesa-gesa di akhir waktu. YAMU Peduli menyediakan fitur **Tabungan Qurban Berkala**. Anda bisa mencicil rezeki Anda setiap minggu atau bulan secara konsisten. Tim yayasan akan mengamankan kuota hewan qurban Anda lebih awal dengan harga peternak yang jauh lebih hemat dan stabil.
              </p>
            </div>
            
            <div className="lg:col-span-1 bg-white rounded-[2rem] p-6 shadow-2xl border border-emerald-100 space-y-5">
              <h3 className="font-black text-sm text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600" /> Formulir Pembukaan Tabungan
              </h3>
              <form onSubmit={handleTabunganSubmit} className="space-y-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <div className="space-y-1.5">
                  <label>Nama Lengkap Anda</label>
                  <input maxLength={25} type="text" required value={tabunganName} onChange={(e) => setTabunganName(e.target.value)} placeholder="Nama..." className="w-full bg-slate-50 border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800 normal-case" />
                </div>
                <div className="space-y-1.5">
                  <label>Nomor WhatsApp Aktif</label>
                  <input maxLength={13} type="number" required value={tabunganPhone} onChange={(e) => setTabunganPhone(e.target.value)} placeholder="0813..." className="w-full bg-slate-50 border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800 normal-case" />
                </div>
                <div className="space-y-1.5">
                  <label>Target Hewan Qurban</label>
                  <select value={tabunganTarget} onChange={(e) => setTabunganTarget(e.target.value)} className="w-full bg-slate-50 border p-3 rounded-xl focus:outline-none text-slate-700 normal-case cursor-pointer">
                    <option value="Kambing Premium">Kambing / Domba Premium</option>
                    <option value="Sapi Patungan 1/7">Sapi Patungan (1/7 Lembu)</option>
                    <option value="Sapi Utuh Mandiri">Sapi Utuh Mandiri</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label>Rencana Pembayaran</label>
                  <select value={tabunganPlan} onChange={(e) => setTabunganPlan(e.target.value)} className="w-full bg-slate-50 border p-3 rounded-xl focus:outline-none text-slate-700 normal-case cursor-pointer">
                    <option value="Bulanan (Rp 250.000 / Bulan)">Bulanan (Rp 250.000 / Bulan)</option>
                    <option value="Mingguan (Rp 60.000 / Minggu)">Mingguan (Rp 60.000 / Minggu)</option>
                    <option value="Bebas Sesuai Kelonggaran">Bebas Fleksibel / Sesuai Kelonggaran</option>
                  </select>
                </div>
                <button type="submit" className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl text-xs uppercase tracking-wider shadow-md">
                  Daftar Tabungan Via WA
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* KONDISI 2: ON-SEASON (LIVE ORDER QURBAN ACTIVE) */}
        {/* ========================================== */}
        {status === 'ON' && (
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            
            {/* Kolom Kiri: Pilihan Paket Hewan */}
            <div className="lg:col-span-2 space-y-6">
              <div className="grid sm:grid-cols-3 gap-4">
                
                {/* Card Kambing */}
                <button type="button" onClick={() => setSelectedPackage('Kambing')} className={`p-6 rounded-[2rem] bg-white border text-left flex flex-col justify-between h-48 transition-all ${selectedPackage === 'Kambing' ? 'ring-4 ring-emerald-500/20 border-emerald-500 shadow-xl' : 'border-slate-200/60 shadow-sm'}`}>
                  <span className="text-[10px] font-black uppercase bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-md border border-emerald-100">Kambing Premium</span>
                  <div className="mt-6">
                    <span className="text-[10px] block text-slate-400 font-bold uppercase tracking-wider">Harga Flat</span>
                    <span className="text-xl font-black text-slate-900">Rp {prices.kambing.toLocaleString('id-ID')}</span>
                  </div>
                </button>

                {/* Card Sapi Patungan */}
                <button type="button" onClick={() => setSelectedPackage('Sapi Patungan')} className={`p-6 rounded-[2rem] bg-white border text-left flex flex-col justify-between h-48 transition-all ${selectedPackage === 'Sapi Patungan' ? 'ring-4 ring-emerald-500/20 border-emerald-500 shadow-xl' : 'border-slate-200/60 shadow-sm'}`}>
                  <span className="text-[10px] font-black uppercase bg-teal-50 text-teal-700 px-2.5 py-1 rounded-md border border-teal-100">Sapi Patungan 1/7</span>
                  <div className="mt-6">
                    <span className="text-[10px] block text-slate-400 font-bold uppercase tracking-wider">Harga Flat</span>
                    <span className="text-xl font-black text-slate-900">Rp {prices.sapiPatungan.toLocaleString('id-ID')}</span>
                  </div>
                </button>

                {/* Card Sapi Utuh */}
                <button type="button" onClick={() => setSelectedPackage('Sapi Utuh')} className={`p-6 rounded-[2rem] bg-white border text-left flex flex-col justify-between h-48 transition-all ${selectedPackage === 'Sapi Utuh' ? 'ring-4 ring-emerald-500/20 border-emerald-500 shadow-xl' : 'border-slate-200/60 shadow-sm'}`}>
                  <span className="text-[10px] font-black uppercase bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md border border-blue-100">Sapi Utuh Mandiri</span>
                  <div className="mt-6">
                    <span className="text-[10px] block text-slate-400 font-bold uppercase tracking-wider">Harga Flat</span>
                    <span className="text-xl font-black text-slate-900">Rp {prices.sapiUtuh.toLocaleString('id-ID')}</span>
                  </div>
                </button>

              </div>

              {/* Ticker Berjalan Nama Shohibul Qurban */}
              <div className="bg-white rounded-[2rem] p-6 border border-slate-200/60 shadow-sm">
                <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider mb-4 flex items-center gap-1.5"><Users className="w-4 h-4 text-emerald-600" /> Daftar Shohibul Qurban Tahun Ini</h3>
                <div className="flex flex-wrap gap-2">
                  {shohibulList.map((s) => (
                    <span key={s.id} className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-50/50 text-emerald-800 text-xs font-bold rounded-xl border border-emerald-100">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> {s.nama_mudhohi}
                    </span>
                  ))}
                  {shohibulList.length === 0 && <p className="text-xs font-bold text-slate-400 py-2">Menantikan shohibul qurban pertama tahun ini...</p>}
                </div>
              </div>
            </div>

            {/* Form Pembelian Qurban */}
            <div className="lg:col-span-1 bg-white rounded-[2rem] p-6 shadow-2xl border border-emerald-100">
              <h3 className="font-black text-sm text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3 flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-600" /> Niat Akad Shohibul Qurban
              </h3>
              <form onSubmit={handleQurbanSubmit} className="space-y-4 text-xs font-bold text-slate-400 uppercase tracking-wider pt-3">
                <div className="space-y-1.5">
                  <label>Pilihan Paket Anda</label>
                  <div className="p-3 bg-slate-50 border rounded-xl text-slate-800 font-black normal-case">
                    Qurban {selectedPackage}
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label>Niat Qurban Atas Nama (Mudhohi) *</label>
                  <input type="text" required value={mudhohiName} onChange={(e) => setMudhohiName(e.target.value)} placeholder="Misal: Ahmad bin Fulan" className="w-full bg-slate-50 border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800 normal-case" />
                  <p className="normal-case font-medium text-[10px] text-slate-400 mt-0.5">* Wajib diisi sebagai keabsahan nama pemilik niat ibadah qurban.</p>
                </div>
                <div className="space-y-1.5">
                  <label>Nama Lengkap Pemesan *</label>
                  <input type="text" required value={buyerName} onChange={(e) => setBuyerName(e.target.value)} placeholder="Nama Anda..." className="w-full bg-slate-50 border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800 normal-case" />
                </div>
                <div className="space-y-1.5">
                  <label>Nomor WhatsApp Anda *</label>
                  <input type="tel" required value={buyerPhone} onChange={(e) => setBuyerPhone(e.target.value)} placeholder="08..." className="w-full bg-slate-50 border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800 normal-case" />
                </div>
                <button type="submit" disabled={submitLoading} className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl text-xs uppercase tracking-wider shadow-md flex justify-center items-center gap-2">
                  {submitLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Lanjutkan Pemesanan Akad'}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* KONDISI 3: POST-EVENT (LAPORAN PENYALURAN) */}
        {/* ========================================== */}
        {status === 'POST' && (
          <div className="space-y-8 animate-fade-in-up">
            <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-xl border border-slate-200/60 space-y-4 text-center max-w-3xl mx-auto">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto"><CheckCircle2 className="w-6 h-6" /></div>
              <h2 className="text-2xl font-black tracking-tight text-slate-900">Ibadah Qurban Telah Terlaksana & Ditutup</h2>
              <p className="text-sm md:text-base text-slate-500 leading-relaxed font-medium">
                Alhamdulillah tsumma Alhamdulillah, rangkaian pemesanan hewan qurban YAMU Peduli periode tahun ini resmi **telah selesai dilaksanakan dengan lancar**. 
                <br/><br/>
                Seluruh amanah hewan sembelihan dari para shohibul qurban telah dipotong secara syar'i dan didistribusikan merata kepada seluruh penerima manfaat di desa tertinggal. Terima kasih atas kedermawanan Anda, sampai jumpa di musim ibadah qurban tahun depan!
              </p>
            </div>
            
            {/* Grid Galeri Pendukung Semu (Placeholder Asri) */}
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="h-48 bg-slate-200 rounded-3xl overflow-hidden relative shadow-sm border">
                <img src="https://images.unsplash.com/photo-1593113543327-0b1a0e88ba92?auto=format&fit=crop&w=500&q=80" className="w-full h-full object-cover" alt="Laporan" />
              </div>
              <div className="h-48 bg-slate-200 rounded-3xl overflow-hidden relative shadow-sm border">
                <img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=500&q=80" className="w-full h-full object-cover" alt="Laporan" />
              </div>
              <div className="h-48 bg-slate-200 rounded-3xl overflow-hidden relative shadow-sm border">
                <img src="https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=500&q=80" className="w-full h-full object-cover" alt="Laporan" />
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}