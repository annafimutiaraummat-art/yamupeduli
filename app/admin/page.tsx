'use client';

import { useState, useEffect } from 'react';
import {
  LayoutDashboard, FileText, Upload, PlusCircle,
  Coins, ShieldCheck, LogIn, LogOut, Loader2,
  Trash2, Edit, Download, BarChart3, CheckCircle2, Eye, EyeOff, Save, MessageSquare, Settings
} from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import toast from 'react-hot-toast';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function AdminPanel() {
  // --- Auth & Session States ---
  const [session, setSession] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  // Tambah 'qurban' ke dalam menu aktif
  const [activeMenu, setActiveMenu] = useState<'dashboard' | 'program' | 'berita' | 'donasi' | 'qurban'>('dashboard');
  const [loading, setLoading] = useState(false);
  const [envError, setEnvError] = useState(false);

  // --- Form States: Program ---
  const [isEditingProg, setIsEditingProg] = useState(false);
  const [editProgId, setEditProgId] = useState<string | null>(null);
  const [existingProgImg, setExistingProgImg] = useState('');
  const [progTitle, setProgTitle] = useState('');
  const [progCategory, setProgCategory] = useState('');
  const [progTarget, setProgTarget] = useState('');
  const [progDesc, setProgDesc] = useState('');
  const [progFile, setProgFile] = useState<File | null>(null);

  // --- Form States: Berita ---
  const [newsTitle, setNewsTitle] = useState('');
  const [newsCategory, setNewsCategory] = useState('');
  const [newsSnippet, setNewsSnippet] = useState('');
  const [newsFile, setNewsFile] = useState<File | null>(null);

  // --- STATE BARU: KONFIGURASI QURBAN ---
  const [qurbanStatus, setQurbanStatus] = useState<'OFF' | 'ON' | 'POST'>('OFF');
  const [hargaKambing, setHargaKambing] = useState('');
  const [hargaSapiPatungan, setHargaSapiPatungan] = useState('');
  const [hargaSapiUtuh, setHargaSapiUtuh] = useState('');
  const [qurbanOrders, setQurbanOrders] = useState<any[]>([]);

  // --- Live Database States ---
  const [liveDonations, setLiveDonations] = useState<any[]>([]);
  const [programs, setPrograms] = useState<any[]>([]);
  const [articles, setArticles] = useState<any[]>([]);

  useEffect(() => {
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) setEnvError(true);

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      setSession(currentSession);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) loadAllData();
  }, [session]);

  const loadAllData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        fetchLiveDonations(),
        fetchPrograms(),
        fetchArticles(),
        // FUNGSI KOREKSI: Menggunakan .maybeSingle() biar anti-error 406
        fetchQurbanSettings(),
        fetchQurbanOrders()
      ]);
    } catch (err) {
      toast.error("Gagal sinkronisasi data database.");
    } finally {
      setLoading(false);
    }
  };

  const fetchLiveDonations = async () => {
    const { data } = await supabase.from('donations').select('*').order('created_at', { ascending: false });
    if (data) setLiveDonations(data);
  };

  const fetchPrograms = async () => {
    const { data } = await supabase.from('programs').select('*').order('created_at', { ascending: false });
    if (data) setPrograms(data);
  };

  const fetchArticles = async () => {
    const { data } = await supabase.from('articles').select('*').order('created_at', { ascending: false });
    if (data) setArticles(data);
  };

  // FUNGSI BARU: Tarik Setting Saklar Qurban
  const fetchQurbanSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('qurban_settings')
        .select('*')
        .eq('id', 1)
        .maybeSingle(); // <--- GANTI DI SINI JADI .maybeSingle() BRO

      if (error) throw error;

      if (data) {
        setQurbanStatus(data.status);
        setHargaKambing(data.harga_kambing.toString());
        setHargaSapiPatungan(data.harga_sapi_patungan.toString());
        setHargaSapiUtuh(data.harga_sapi_utuh.toString());
      } else {
        // JALUR PENYELAMAT: Kalau di DB kosong, kasih nilai default biar form admin ga kosong
        setQurbanStatus('OFF');
        setHargaKambing('2500000');
        setHargaSapiPatungan('3000000');
        setHargaSapiUtuh('21000000');
      }
    } catch (err: any) {
      console.error("Gagal memuat konfigurasi qurban:", err.message);
    }
  };

  // FUNGSI BARU: Tarik Data Pembeli Qurban
  const fetchQurbanOrders = async () => {
    const { data } = await supabase.from('qurban_orders').select('*').order('created_at', { ascending: false });
    if (data) setQurbanOrders(data);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (envError) return toast.error('Variabel konfigurasi .env belum terpasang.');

    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      toast.error(`Akses Ditolak: Kredensial salah.`);
    } else if (data?.session) {
      setSession(data.session);
      toast.success('Otorisasi berhasil. Selamat datang kembali!');
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    toast.success('Sesi aman ditutup.');
  };

  const uploadImage = async (file: File, folder: string) => {
    const filePath = `${folder}/${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from('yamu-assets').upload(filePath, file);
    if (error) throw error;
    return supabase.storage.from('yamu-assets').getPublicUrl(filePath).data.publicUrl;
  };

  const handleSaveProgram = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEditingProg && !progFile) return toast.error('Wajib mengunggah foto sampul program!');

    setLoading(true);
    try {
      let finalImgUrl = existingProgImg;
      if (progFile) finalImgUrl = await uploadImage(progFile, 'programs');

      const payload = {
        title: progTitle,
        category: progCategory,
        target: Number(progTarget),
        description: progDesc,
        image_url: finalImgUrl
      };

      if (isEditingProg && editProgId) {
        const { error } = await supabase.from('programs').update(payload).eq('id', editProgId);
        if (error) throw error;
        toast.success('Pembaruan data kampanye berhasil disimpan!');
      } else {
        const { error } = await supabase.from('programs').insert([{ ...payload, terkumpul: 0, status: 'Aktif' }]);
        if (error) throw error;
        toast.success('Program kampanye baru berhasil diterbitkan live!');
      }
      cancelEditProg();
      fetchPrograms();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const startEditProg = (p: any) => {
    setIsEditingProg(true);
    setEditProgId(p.id);
    setProgTitle(p.title);
    setProgCategory(p.category);
    setProgTarget(p.target.toString());
    setProgDesc(p.description);
    setExistingProgImg(p.image_url);
    setProgFile(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEditProg = () => {
    setIsEditingProg(false); setEditProgId(null); setProgTitle(''); setProgCategory('');
    setProgTarget(''); setProgDesc(''); setExistingProgImg(''); setProgFile(null);
  };

  const handleManualDonation = async (id: string, currentTotal: number) => {
    const amountStr = window.prompt("Masukkan nominal dana offline/tunai yang masuk:");
    if (!amountStr) return;

    const amount = Number(amountStr);
    if (isNaN(amount) || amount <= 0) return toast.error('Nominal angka tidak valid!');

    const { error } = await supabase.from('programs').update({ terkumpul: currentTotal + amount }).eq('id', id);
    if (!error) {
      toast.success(`Berhasil menambahkan pembukuan tunai Rp ${amount.toLocaleString('id-ID')}`);
      fetchPrograms();
    }
  };

  const handleToggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'Selesai' ? 'Aktif' : 'Selesai';
    if (!confirm(`Ubah status program ini menjadi ${newStatus}?`)) return;

    const { error } = await supabase.from('programs').update({ status: newStatus }).eq('id', id);
    if (!error) {
      toast.success(`Status program kini: ${newStatus}`);
      fetchPrograms();
    }
  };

  const handleAddNews = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsFile) return toast.error('Wajib mengunggah foto berita!');

    setLoading(true);
    try {
      const img = await uploadImage(newsFile, 'articles');
      const { error } = await supabase.from('articles').insert([
        { title: newsTitle, category: newsCategory, snippet: newsSnippet, image_url: img }
      ]);
      if (error) throw error;
      toast.success('Artikel edukasi berhasil diterbitkan!');
      setNewsTitle(''); setNewsCategory(''); setNewsSnippet(''); setNewsFile(null);
      fetchArticles();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // FUNGSI KOREKSI TOTAL: Menggunakan .upsert() agar otomatis meng-insert jika data id:1 belum ada
  const handleUpdateQurbanSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { error } = await supabase.from('qurban_settings').upsert({
        id: 1, // Memaksa baris data ini selalu mengontrol ID 1
        status: qurbanStatus,
        harga_kambing: Number(hargaKambing),
        harga_sapi_patungan: Number(hargaSapiPatungan),
        harga_sapi_utuh: Number(hargaSapiUtuh),
        updated_at: new Date().toISOString()
      });

      if (error) throw error;

      toast.success('Konfigurasi sistem Qurban berhasil diperbarui secara live!');
      fetchQurbanSettings(); // Ambil ulang data terbaru dari database
    } catch (err: any) {
      toast.error(`Gagal memperbarui konfigurasi: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRecord = async (table: string, id: string, refreshFn: () => void) => {
    if (!confirm('PERINGATAN: Menghapus data ini bersifat permanen dari sistem cloud database. Lanjutkan?')) return;

    setLoading(true);
    const { error } = await supabase.from(table).delete().eq('id', id);

    if (!error) {
      toast.success('Data dihapus permanen.');
      refreshFn();
    } else {
      toast.error(`Gagal menghapus: ${error.message}`);
    }
    setLoading(false);
  };

  const downloadDonationsCSV = () => {
    if (liveDonations.length === 0) return toast.error('Tidak ada rekam jejak arus keuangan.');

    const headers = ['Tanggal', 'Nama Donatur', 'Nominal (Rp)', 'Program Kampanye', 'Status', 'Pesan Doa'];
    const rows = liveDonations.map(d => [
      new Date(d.created_at).toLocaleDateString('id-ID'),
      `"${d.name}"`,
      d.amount,
      `"${d.program_title}"`,
      `"${d.status}"`,
      `"${d.message || '-'}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + headers.join(',') + "\n" + rows.map(e => e.join(',')).join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", `Laporan_Donasi_YAMU.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  if (!session) {
    return (
      <div className="fixed inset-0 z-[999999] bg-slate-950 flex items-center justify-center px-6 font-sans text-slate-100 w-screen h-screen">
        <form onSubmit={handleLogin} className="w-full max-w-md bg-slate-900/80 backdrop-blur-md p-8 rounded-[2rem] border border-slate-800 shadow-2xl space-y-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 via-emerald-500 to-teal-600"></div>

          <div className="text-center space-y-2">
            <div className="w-14 h-14 bg-teal-950 border border-teal-800/50 rounded-2xl flex items-center justify-center mx-auto shadow-inner shadow-teal-500/10">
              <ShieldCheck className="w-7 h-7 text-teal-400" />
            </div>
            <h1 className="text-xl font-black text-white tracking-tight">YAMU Core Security</h1>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Gerbang Otorisasi Administrasi</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email ID Admin" className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3.5 px-4 text-xs font-bold focus:outline-none text-white focus:border-teal-500 transition-colors" autoComplete="email" />
            </div>

            <div className="space-y-1 relative">
              <input type={showPassword ? 'text' : 'password'} required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Kata Sandi Keamanan" className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3.5 pl-4 pr-12 text-xs font-bold focus:outline-none text-white focus:border-teal-500 transition-colors" autoComplete="current-password" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-3.5 text-slate-500 hover:text-slate-300 transition-colors focus:outline-none">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full py-4 bg-teal-600 hover:bg-teal-500 font-black rounded-xl text-xs uppercase tracking-wider text-white flex items-center justify-center gap-2">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><LogIn className="w-4 h-4" /> Autentikasi Akses</>}
          </button>
        </form>
      </div>
    );
  }

  const LUNASDonations = liveDonations.filter(don => don.status === 'LUNAS');
  const totalDanaTerkumpul = LUNASDonations.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);

  return (
    <div className="fixed inset-0 z-[99998] bg-slate-50 font-sans flex text-slate-800 antialiased w-screen h-screen overflow-hidden">
      <style dangerouslySetInnerHTML={{ __html: `@keyframes fadeInUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } } .animate-fade-in-up { animation: fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }` }} />

      {/* SIDEBAR CONTROL PANEL */}
      <div className="w-64 bg-slate-950 text-slate-400 p-6 flex flex-col gap-6 shrink-0 border-r border-slate-900 shadow-2xl h-full select-none">
        <div className="pb-4 border-b border-slate-900">
          <h1 className="text-white font-black text-lg tracking-tight flex items-center gap-2">YAMU <span className="text-teal-400 font-medium text-xs bg-teal-950 border border-teal-900 px-2 py-0.5 rounded">Core</span></h1>
          <span className="text-[9px] uppercase font-bold text-slate-500 tracking-widest flex items-center gap-1 mt-1.5"><ShieldCheck className="w-3.5 h-3.5 text-teal-500" /> Root Administrator</span>
        </div>

        <div className="flex flex-col gap-1.5 flex-grow text-xs font-bold">
          <button onClick={() => setActiveMenu('dashboard')} className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all ${activeMenu === 'dashboard' ? 'bg-teal-600 text-white shadow-md' : 'hover:bg-slate-900 hover:text-white'}`}><LayoutDashboard className="w-4 h-4" /> Ringkasan Beranda</button>
          <button onClick={() => setActiveMenu('program')} className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all ${activeMenu === 'program' ? 'bg-teal-600 text-white shadow-md' : 'hover:bg-slate-900 hover:text-white'}`}><PlusCircle className="w-4 h-4" /> Kelola Kampanye</button>
          <button onClick={() => setActiveMenu('berita')} className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all ${activeMenu === 'berita' ? 'bg-teal-600 text-white shadow-md' : 'hover:bg-slate-900 hover:text-white'}`}><FileText className="w-4 h-4" /> Publikasi Berita</button>
          <button onClick={() => setActiveMenu('donasi')} className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all ${activeMenu === 'donasi' ? 'bg-teal-600 text-white shadow-md' : 'hover:bg-slate-900 hover:text-white'}`}><Coins className="w-4 h-4" /> Log & Arus Keuangan</button>
          {/* TAB BARU DI SIDEBAR */}
          <button onClick={() => setActiveMenu('qurban')} className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all ${activeMenu === 'qurban' ? 'bg-teal-600 text-white shadow-md' : 'hover:bg-slate-900 hover:text-white'}`}><Settings className="w-4 h-4" /> Kontrol Fitur Qurban</button>
        </div>

        <button onClick={handleLogout} className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl font-black text-xs text-rose-400 hover:bg-rose-950/30 border border-rose-950/20 transition-colors uppercase tracking-wider"><LogOut className="w-4 h-4" /> Tutup Sesi</button>
      </div>

      {/* DASHBOARD VIEWPORT BLOCK */}
      <div className="flex-grow p-8 md:p-10 overflow-y-auto h-full max-w-5xl">

        {/* TAB: DASHBOARD */}
        {activeMenu === 'dashboard' && (
          <div className="space-y-8 animate-fade-in-up">
            <div className="bg-gradient-to-r from-teal-950 via-slate-900 to-teal-950 rounded-[2rem] p-8 md:p-10 shadow-xl text-white relative overflow-hidden border border-slate-900">
              <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#fff_1px,transparent_1px)] bg-[size:16px_16px]"></div>
              <div className="relative z-10 space-y-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-500/10 text-teal-400 font-bold text-[9px] rounded-lg uppercase tracking-widest border border-teal-500/20 mb-2">Pusat Kendali Aktif</span>
                <h2 className="text-2xl md:text-3xl font-black tracking-tight">Selamat Datang, Humas YAMU</h2>
                <p className="text-slate-400 text-xs md:text-sm max-w-xl leading-relaxed font-medium">Sistem manajemen terintegrasi untuk mengontrol transparansi donasi, publikasi artikel kegiatan, serta pengelolaan kampanye sosial amanah umat.</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm flex flex-col justify-between h-36">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2"><BarChart3 className="w-4 h-4 text-teal-600" /> Total Sedekah Valid</span>
                <span className="text-2xl font-black text-slate-900">Rp {totalDanaTerkumpul.toLocaleString('id-ID')}</span>
              </div>
              <div className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm flex flex-col justify-between h-36">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2"><LayoutDashboard className="w-4 h-4 text-amber-500" /> Total Kampanye</span>
                <span className="text-3xl font-black text-slate-900">{programs.length} <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Program</span></span>
              </div>
              <div className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm flex flex-col justify-between h-36">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2"><FileText className="w-4 h-4 text-blue-500" /> Total Artikel Berita</span>
                <span className="text-3xl font-black text-slate-900">{articles.length} <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Terbit</span></span>
              </div>
            </div>

            <div className="bg-white rounded-[2rem] p-6 md:p-8 border border-slate-200/60 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2"><Coins className="w-4 h-4 text-teal-600" /> 5 Transaksi Keuangan Terbaru</h3>
                <button onClick={() => setActiveMenu('donasi')} className="text-[10px] font-black uppercase tracking-wider text-slate-500 hover:text-teal-600 bg-slate-50 hover:bg-teal-50 px-3 py-2 rounded-xl border border-slate-100 transition-colors">Semua Transaksi</button>
              </div>
              <div className="space-y-3">
                {LUNASDonations.slice(0, 5).map(don => (
                  <div key={don.id} className="flex justify-between items-center p-4 bg-slate-50/50 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-4">
                      <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0"><CheckCircle2 className="w-4 h-4" /></div>
                      <div>
                        <span className="font-bold text-slate-800 block text-xs md:text-sm">{don.name} <span className="text-emerald-600 font-black">Transfer Rp {don.amount.toLocaleString('id-ID')}</span></span>
                        <span className="text-[10px] text-slate-400 font-bold">{new Date(don.created_at).toLocaleDateString('id-ID')} • {don.program_title}</span>
                      </div>
                    </div>
                  </div>
                ))}
                {LUNASDonations.length === 0 && (<p className="text-center text-xs font-bold text-slate-400 py-10 bg-slate-50 border border-dashed rounded-2xl">Belum ada sirkulasi dana masuk yang tervalidasi.</p>)}
              </div>
            </div>
          </div>
        )}

        {/* TAB 1: KELOLA PROGRAM */}
        {activeMenu === 'program' && (
          <div className="space-y-8 animate-fade-in-up">
            <div className={`bg-white rounded-[2rem] p-6 md:p-8 shadow-xl border transition-all ${isEditingProg ? 'ring-4 ring-amber-500/20 border-amber-300' : 'border-slate-200/60'}`}>
              <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
                <h2 className="text-base font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  {isEditingProg ? <><Edit className="w-4 h-4 text-amber-500" /> Mode Koreksi Kampanye</> : 'Terbitkan Program Kampanye Baru'}
                </h2>
                {isEditingProg && <button type="button" onClick={cancelEditProg} className="text-[10px] font-black uppercase tracking-wider text-slate-500 hover:text-slate-800 bg-slate-100 px-4 py-2 rounded-xl transition-colors">Batal</button>}
              </div>

              <form onSubmit={handleSaveProgram} className="space-y-5 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <div className="space-y-1.5">
                  <label className="block">Judul Kampanye Donasi *</label>
                  <input type="text" required value={progTitle} onChange={(e) => setProgTitle(e.target.value)} placeholder="Contoh: Sedekah Pembangunan Sumur Air Bersih" className="w-full bg-slate-50/80 border border-slate-200 p-3.5 rounded-xl focus:outline-none text-slate-800 font-bold normal-case" />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block">Kategori Sasaran *</label>
                    <input type="text" required value={progCategory} onChange={(e) => setProgCategory(e.target.value)} placeholder="Contoh: Air Bersih, Yatim, dll" className="w-full bg-slate-50/80 border border-slate-200 p-3.5 rounded-xl focus:outline-none text-slate-800 font-bold normal-case" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block">Target Anggaran Dana (Rp) *</label>
                    <input type="number" required value={progTarget} onChange={(e) => setProgTarget(e.target.value)} placeholder="Masukkan nominal bersih tanpa titik" className="w-full bg-slate-50/80 border border-slate-200 p-3.5 rounded-xl focus:outline-none text-slate-800 font-bold normal-case" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block">Dokumentasi Sampul Utama *</label>
                  <div className="border-2 border-dashed border-slate-200 p-6 rounded-xl bg-slate-50/50 relative cursor-pointer hover:border-teal-500 flex flex-col items-center justify-center transition-all">
                    <input type="file" accept="image/*" required={!isEditingProg} onChange={(e) => setProgFile(e.target.files?.[0] || null)} className="absolute inset-0 opacity-0 cursor-pointer" />
                    <Upload className="w-5 h-5 text-slate-400 mb-2" />
                    <span className="text-slate-600 block text-center normal-case">{progFile ? <span className="text-teal-600 font-black">✓ Berkas Siap: {progFile.name}</span> : (isEditingProg ? 'Kosongkan jika tidak berencana mengubah gambar' : 'Klik / Tarik foto utama program di sini')}</span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block">Narasi & Detail Cerita Lengkap *</label>
                  <textarea rows={8} required value={progDesc} onChange={(e) => setProgDesc(e.target.value)} placeholder="Tulis esai latar belakang program dan rincian penyaluran di sini..." className="w-full bg-slate-50/80 border border-slate-200 p-4 rounded-xl focus:outline-none text-slate-800 font-medium normal-case leading-relaxed" />
                </div>

                <button type="submit" disabled={loading} className={`w-full py-4 text-white rounded-xl shadow-md transition-all flex items-center justify-center gap-2 font-black text-xs uppercase tracking-wider ${isEditingProg ? 'bg-amber-500 hover:bg-amber-400 text-slate-900' : 'bg-teal-600 hover:bg-teal-500'}`}>
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : (isEditingProg ? <><Save className="w-4 h-4" /> Eksekusi Pembaruan</> : 'Publish Program Sekarang')}
                </button>
              </form>
            </div>

            <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-xl border border-slate-200/60">
              <h3 className="font-bold text-xs text-slate-400 uppercase tracking-wider mb-4">Arsip Database Penggalangan</h3>
              <div className="space-y-4">
                {programs.length > 0 ? programs.map(p => (
                  <div key={p.id} className={`flex flex-col lg:flex-row justify-between lg:items-center p-5 rounded-2xl border transition-colors ${p.status === 'Selesai' ? 'bg-slate-50/80 border-slate-200 opacity-60' : 'bg-white border-slate-200 hover:border-teal-200 shadow-sm'}`}>
                    <div className="mb-4 lg:mb-0 space-y-1">
                      <span className="font-black text-slate-900 text-base block">{p.title}</span>
                      <div className="flex items-center gap-2 pt-0.5">
                        <span className="text-[9px] bg-slate-100 text-slate-600 font-black px-2 py-0.5 rounded uppercase tracking-wider">{p.category}</span>
                        {p.status === 'Selesai' && <span className="text-[9px] bg-amber-100 text-amber-700 font-black px-2 py-0.5 rounded uppercase tracking-wider">Selesai/Ditutup</span>}
                      </div>
                      <p className="text-[11px] text-slate-400 font-bold pt-1.5">Terkumpul: <span className="text-teal-600 font-black">Rp {(p.terkumpul || 0).toLocaleString('id-ID')}</span> <span className="mx-1 text-slate-300">/</span> Target: Rp {p.target.toLocaleString('id-ID')}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button onClick={() => handleManualDonation(p.id, p.terkumpul || 0)} className="px-3 py-2 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-100 rounded-xl flex items-center gap-1.5 text-xs font-black"><Coins className="w-3.5 h-3.5" /> Tunai Manual</button>
                      <button onClick={() => handleToggleStatus(p.id, p.status || 'Aktif')} className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 border border-blue-100 rounded-xl">{p.status === 'Selesai' ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}</button>
                      <button onClick={() => startEditProg(p)} className="p-2 text-amber-600 bg-amber-50 hover:bg-amber-100 border border-amber-100 rounded-xl"><Edit className="w-4 h-4" /></button>
                      <button onClick={() => handleDeleteRecord('programs', p.id, fetchPrograms)} className="p-2 text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-100 rounded-xl"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                )) : <p className="text-xs text-slate-400 font-bold text-center py-10 bg-slate-50 border border-dashed rounded-2xl">Arsip database program kosong.</p>}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: KELOLA BERITA */}
        {activeMenu === 'berita' && (
          <div className="space-y-8 animate-fade-in-up">
            <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-xl border border-slate-200/60">
              <div className="border-b border-slate-100 pb-4 mb-6">
                <h2 className="text-base font-black text-slate-900 uppercase tracking-wider">Penerbitan Berita Penyaluran / Edukasi</h2>
              </div>
              <form onSubmit={handleAddNews} className="space-y-5 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-1.5"><label className="block">Judul Publikasi Resmi *</label><input type="text" required value={newsTitle} onChange={(e) => setNewsTitle(e.target.value)} placeholder="Ketik judul artikel..." className="w-full bg-slate-50/80 border p-3.5 rounded-xl focus:outline-none text-slate-800 normal-case font-bold" /></div>
                  <div className="space-y-1.5"><label className="block">Label Tag Kategori *</label><input type="text" required value={newsCategory} onChange={(e) => setNewsCategory(e.target.value)} placeholder="Contoh: Penyaluran, Info, dll" className="w-full bg-slate-50/80 border p-3.5 rounded-xl focus:outline-none text-slate-800 normal-case font-bold" /></div>
                </div>
                <div className="space-y-1.5">
                  <label className="block">Foto Dokumentasi Lapangan *</label>
                  <div className="border-2 border-dashed border-slate-200 p-6 rounded-xl bg-slate-50/50 relative cursor-pointer hover:border-teal-500 flex flex-col items-center justify-center">
                    <input type="file" accept="image/*" required onChange={(e) => setNewsFile(e.target.files?.[0] || null)} className="absolute inset-0 opacity-0 cursor-pointer" />
                    <Upload className="w-5 h-5 text-slate-400 mb-2" />
                    <span className="text-slate-600 block normal-case">{newsFile ? <span className="text-teal-600 font-black">✓ Berkas Siap: {newsFile.name}</span> : 'Pilih atau seret berkas gambar'}</span>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="block">Badan Konten / Teks Artikel Berita *</label>
                  <textarea rows={8} required value={newsSnippet} onChange={(e) => setNewsSnippet(e.target.value)} placeholder="Uraikan laporan kegiatan lapangan secara detail di sini..." className="w-full bg-slate-50/80 border p-4 rounded-xl focus:outline-none text-slate-800 font-medium normal-case leading-loose" />
                </div>
                <button type="submit" disabled={loading} className="w-full py-4 text-white rounded-xl shadow-md bg-teal-600 hover:bg-teal-500 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2">{loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Save className="w-4 h-4" /> Tayangkan Berita</>}</button>
              </form>
            </div>
          </div>
        )}

        {/* TAB 3: LOG KEUANGAN */}
        {activeMenu === 'donasi' && (
          <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-xl border border-slate-200/60 space-y-6 animate-fade-in-up">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-base font-black text-slate-900 uppercase tracking-wider">Validasi Arus Kas Masuk</h2>
              </div>
              <button onClick={downloadDonationsCSV} className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-black rounded-xl shadow-md flex items-center gap-1.5 transition-all uppercase tracking-wider"><Download className="w-4 h-4" /> Ekspor File Pembukuan (.csv)</button>
            </div>

            <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/80 font-black border-b text-[9px] text-slate-400 uppercase tracking-widest select-none">
                  <tr><th className="p-4">Tanggal</th><th className="p-4">Biodata Donatur</th><th className="p-4">Nominal Dana</th><th className="p-4">Alokasi Kampanye</th><th className="p-4 text-center">Tindakan</th></tr>
                </thead>
                <tbody className="divide-y text-slate-600 font-medium">
                  {liveDonations.length > 0 ? liveDonations.map((don) => (
                    <tr key={don.id} className={`transition-colors ${don.status === 'PENDING' ? 'bg-amber-50/20' : 'hover:bg-slate-50/30'}`}>
                      <td className="p-4 whitespace-nowrap text-slate-400 font-bold">{new Date(don.created_at).toLocaleDateString('id-ID')}</td>
                      <td className="p-4">
                        <div className="font-black text-slate-900 text-xs">{don.name}</div>
                        <div className="text-[10px] text-slate-400 font-bold pt-0.5">{don.phone || 'No. HP Kosong'}</div>
                        {don.message && (
                          <div className="mt-2 p-2 bg-teal-50/50 border border-teal-100 rounded-lg text-[10px] text-teal-800 font-medium flex items-start gap-1.5 max-w-xs normal-case">
                            <MessageSquare className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                            <span>Doa: "{don.message}"</span>
                          </div>
                        )}
                      </td>
                      <td className="p-4 text-teal-600 font-black text-sm whitespace-nowrap">Rp {don.amount.toLocaleString('id-ID')}</td>
                      <td className="p-4">
                        <span className="text-slate-800 font-bold block max-w-[180px] truncate">{don.program_title}</span>
                        <div className="pt-1">
                          {don.status === 'PENDING' ? <span className="text-[8px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded font-black uppercase tracking-wider border border-amber-200/30">Awaiting WA Confirm</span> : <span className="text-[8px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded font-black uppercase tracking-wider border border-emerald-200/30">Valid / Terverifikasi</span>}
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          {don.status === 'PENDING' && (
                            <button
                              onClick={async () => {
                                if (!confirm('Pastikan mutasi dana sudah masuk ke rekening yayasan. Konfirmasi validasi?')) return;
                                setLoading(true);
                                const { error: updateErr } = await supabase.from('donations').update({ status: 'LUNAS' }).eq('id', don.id);
                                if (!updateErr) {
                                  if (don.program_id) {
                                    await supabase.rpc('increment_program_donation', { target_program_id: don.program_id, donation_amount: don.amount });
                                  }
                                  toast.success('Transaksi sukses tervalidasi masuk buku kas utama!');
                                  fetchLiveDonations();
                                  fetchPrograms();
                                } else {
                                  toast.error(`Eror validasi: ${updateErr?.message}`);
                                }
                                setLoading(false);
                              }}
                              className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-lg transition-colors flex items-center gap-1 shadow-sm uppercase tracking-wider text-[9px]"
                            ><CheckCircle2 className="w-3 h-3" /> Validasi</button>
                          )}
                          <button onClick={() => handleDeleteRecord('donations', don.id, fetchLiveDonations)} className="p-2 text-rose-500 bg-rose-50 hover:bg-rose-100 border border-rose-100 rounded-xl"><Trash2 className="w-3.5 h-3.5" /></button>
                        </div>
                      </td>
                    </tr>
                  )) : <tr><td colSpan={5} className="p-10 text-center font-bold text-slate-400 bg-slate-50 border border-dashed rounded-2xl">Belum ada sirkulasi data transaksi donasi masuk.</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================== */}
        {/* TAB 4: MANAGEMENT FITUR QURBAN (BARU) */}
        {/* ========================================================== */}
        {activeMenu === 'qurban' && (
          <div className="space-y-8 animate-fade-in-up">

            {/* PANEL KONTROL HARGA & SAKLAR STATUS */}
            <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-xl border border-slate-200/60">
              <div className="border-b border-slate-100 pb-4 mb-6">
                <h2 className="text-base font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <Settings className="w-5 h-5 text-teal-600" /> Pengaturan Global Musim Qurban
                </h2>
              </div>

              <form onSubmit={handleUpdateQurbanSettings} className="space-y-6 text-xs font-bold text-slate-400 uppercase tracking-wider">

                {/* Switcher Status Fitur */}
                <div className="space-y-2">
                  <label className="block">Status Operasional Halaman Qurban *</label>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => setQurbanStatus('OFF')}
                      className={`py-3 rounded-xl font-black text-xs uppercase tracking-wider border transition-all ${qurbanStatus === 'OFF' ? 'bg-slate-900 border-slate-900 text-white shadow-md' : 'bg-slate-50 text-slate-600 hover:border-slate-300'}`}
                    >
                      OFF (Luar Musim)
                    </button>
                    <button
                      type="button"
                      onClick={() => setQurbanStatus('ON')}
                      className={`py-3 rounded-xl font-black text-xs uppercase tracking-wider border transition-all ${qurbanStatus === 'ON' ? 'bg-emerald-600 border-emerald-600 text-white shadow-md' : 'bg-slate-50 text-slate-600 hover:border-emerald-300'}`}
                    >
                      ON (Musim Qurban Aktif)
                    </button>
                    <button
                      type="button"
                      onClick={() => setQurbanStatus('POST')}
                      className={`py-3 rounded-xl font-black text-xs uppercase tracking-wider border transition-all ${qurbanStatus === 'POST' ? 'bg-blue-600 border-blue-600 text-white shadow-md' : 'bg-slate-50 text-slate-600 hover:border-blue-300'}`}
                    >
                      POST (Laporan Penyaluran)
                    </button>
                  </div>
                  <p className="normal-case font-medium text-slate-400 mt-1">
                    * {qurbanStatus === 'OFF' && "Halaman publik akan menampilkan form pendaftaran 'Tabungan/Cicilan Qurban'."}
                    {qurbanStatus === 'ON' && "Halaman publik akan mengaktifkan form pembelian hewan qurban secara live."}
                    {qurbanStatus === 'POST' && "Form ditutup, halaman publik otomatis berubah memajang galeri laporan dokumentasi."}
                  </p>
                </div>

                {/* Input Harga Hewan Qurban */}
                <div className="grid md:grid-cols-3 gap-4 pt-2">
                  <div className="space-y-1.5">
                    <label className="block">Harga Kambing / Domba Premium (Rp) *</label>
                    <input type="number" required value={hargaKambing} onChange={(e) => setHargaKambing(e.target.value)} className="w-full bg-slate-50 border border-slate-200 p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 font-bold normal-case" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block">Harga Sapi Patungan 1/7 (Rp) *</label>
                    <input type="number" required value={hargaSapiPatungan} onChange={(e) => setHargaSapiPatungan(e.target.value)} className="w-full bg-slate-50 border border-slate-200 p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 font-bold normal-case" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block">Harga Sapi Utuh (Rp) *</label>
                    <input type="number" required value={hargaSapiUtuh} onChange={(e) => setHargaSapiUtuh(e.target.value)} className="w-full bg-slate-50 border border-slate-200 p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 font-bold normal-case" />
                  </div>
                </div>

                <button type="submit" disabled={loading} className="w-full py-4 bg-teal-600 hover:bg-teal-500 text-white font-black rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md">
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Save className="w-4 h-4" /> Simpan Konfigurasi Qurban</>}
                </button>
              </form>
            </div>

            {/* LOG LOGISTIK PEMBELI HEWAN QURBAN */}
            <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-xl border border-slate-200/60">
              <h3 className="font-bold text-xs text-slate-400 uppercase tracking-wider mb-4">Daftar Shohibul Qurban (Donatur Qurban)</h3>

              <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50/80 font-black border-b text-[9px] text-slate-400 uppercase tracking-widest select-none">
                    <tr>
                      <th className="p-4">Tanggal</th>
                      <th className="p-4">Mudhohi (Niat Qurban)</th>
                      <th className="p-4">Tipe Hewan</th>
                      <th className="p-4">Total Bayar</th>
                      <th className="p-4 text-center">Tindakan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y text-slate-600 font-medium">
                    {qurbanOrders.length > 0 ? qurbanOrders.map((order) => (
                      <tr key={order.id} className={`transition-colors ${order.status_pembayaran === 'PENDING' ? 'bg-amber-50/20' : 'hover:bg-slate-50/30'}`}>
                        <td className="p-4 text-slate-400 font-bold">{new Date(order.created_at).toLocaleDateString('id-ID')}</td>
                        <td className="p-4">
                          <div className="font-black text-slate-900 text-xs">Atas Nama: {order.nama_mudhohi}</div>
                          <div className="text-[10px] text-slate-400 font-bold pt-0.5">Pemesan: {order.nama_donatur} ({order.nomor_wa})</div>
                        </td>
                        <td className="p-4">
                          <span className="px-2.5 py-1 bg-slate-100 text-slate-700 font-black rounded text-[9px] uppercase tracking-wider border border-slate-200">{order.tipe_qurban}</span>
                        </td>
                        <td className="p-4 text-teal-600 font-black text-sm whitespace-nowrap">Rp {order.total_bayar.toLocaleString('id-ID')}</td>
                        <td className="p-4 text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            {order.status_pembayaran === 'PENDING' && (
                              <button
                                onClick={async () => {
                                  if (!confirm('Validasi pembayaran qurban shohibul ini?')) return;
                                  setLoading(true);
                                  const { error } = await supabase.from('qurban_orders').update({ status_pembayaran: 'LUNAS' }).eq('id', order.id);
                                  if (!error) {
                                    toast.success('Shohibul qurban berhasil divalidasi lunas!');
                                    fetchQurbanOrders();
                                  }
                                  setLoading(false);
                                }}
                                className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-lg text-[9px] uppercase tracking-wider"
                              >
                                Validasi
                              </button>
                            )}
                            <button onClick={() => handleDeleteRecord('qurban_orders', order.id, fetchQurbanOrders)} className="p-2 text-rose-500 bg-rose-50 hover:bg-rose-100 rounded-xl">
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={5} className="p-10 text-center font-bold text-slate-400 bg-slate-50 border border-dashed rounded-2xl">
                          Belum ada transaksi pembelian hewan qurban.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}