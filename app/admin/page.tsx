'use client';

import { useState, useEffect } from 'react';
import {
  LayoutDashboard, FileText, Upload, PlusCircle,
  Coins, ShieldCheck, LogIn, LogOut, Loader2,
  Trash2, Edit, Download, BarChart3, CheckCircle2, Eye, EyeOff, Save, MessageSquare, Settings, AlertCircle, RefreshCw, Video, Image as ImageIcon
} from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import toast from 'react-hot-toast';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function AdminPanel() {
  const [session, setSession] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [activeMenu, setActiveMenu] = useState<'dashboard' | 'program' | 'berita' | 'donasi' | 'qurban'>('dashboard');
  const [loading, setLoading] = useState(false);
  const [envError, setEnvError] = useState(false);

  // Form States Program
  const [isEditingProg, setIsEditingProg] = useState(false);
  const [editProgId, setEditProgId] = useState<string | null>(null);
  const [existingProgImg, setExistingProgImg] = useState('');
  const [progTitle, setProgTitle] = useState('');
  const [progCategory, setProgCategory] = useState('');
  const [progTarget, setProgTarget] = useState('');
  const [progDesc, setProgDesc] = useState('');
  const [progFile, setProgFile] = useState<File | null>(null);

  // Form States Berita & Video (UPGRADED WITH EDIT FEATURE)
  const [isEditingNews, setIsEditingNews] = useState(false);
  const [editNewsId, setEditNewsId] = useState<string | null>(null);
  const [existingNewsImg, setExistingNewsImg] = useState('');
  const [newsTitle, setNewsTitle] = useState('');
  const [newsCategory, setNewsCategory] = useState('');
  const [newsSnippet, setNewsSnippet] = useState('');
  const [newsVideoUrl, setNewsVideoUrl] = useState('');
  const [newsFile, setNewsFile] = useState<File | null>(null);

  // Form States Qurban
  const [qurbanStatus, setQurbanStatus] = useState<'OFF' | 'ON' | 'POST'>('OFF');
  const [hargaKambing, setHargaKambing] = useState('');
  const [hargaSapiPatungan, setHargaSapiPatungan] = useState('');
  const [hargaSapiUtuh, setHargaSapiUtuh] = useState('');
  const [qurbanOrders, setQurbanOrders] = useState<any[]>([]);

  // Live Database
  const [liveDonations, setLiveDonations] = useState<any[]>([]);
  const [programs, setPrograms] = useState<any[]>([]);
  const [articles, setArticles] = useState<any[]>([]);

  useEffect(() => {
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) setEnvError(true);
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, currentSession) => setSession(currentSession));
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

  const fetchQurbanSettings = async () => {
    try {
      const { data } = await supabase.from('qurban_settings').select('*').eq('id', 1).maybeSingle();
      if (data) {
        setQurbanStatus(data.status);
        setHargaKambing(data.harga_kambing.toString());
        setHargaSapiPatungan(data.harga_sapi_patungan.toString());
        setHargaSapiUtuh(data.harga_sapi_utuh.toString());
      }
    } catch (err) {}
  };

  const fetchQurbanOrders = async () => {
    const { data } = await supabase.from('qurban_orders').select('*').order('created_at', { ascending: false });
    if (data) setQurbanOrders(data);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (envError) return toast.error('Variabel konfigurasi .env belum terpasang.');
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) toast.error(`Akses Ditolak: Kredensial salah.`);
    else if (data?.session) { setSession(data.session); toast.success('Otorisasi berhasil!'); }
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
    if (!isEditingProg && !progFile) return toast.error('Wajib mengunggah foto!');
    setLoading(true);
    try {
      let finalImgUrl = existingProgImg;
      if (progFile) finalImgUrl = await uploadImage(progFile, 'programs');
      const payload = { title: progTitle, category: progCategory, target: Number(progTarget), description: progDesc, image_url: finalImgUrl };
      if (isEditingProg && editProgId) {
        await supabase.from('programs').update(payload).eq('id', editProgId);
        toast.success('Diperbarui!');
      } else {
        await supabase.from('programs').insert([{ ...payload, terkumpul: 0, status: 'Aktif' }]);
        toast.success('Diterbitkan!');
      }
      cancelEditProg(); fetchPrograms();
    } catch (err: any) { toast.error(err.message); } finally { setLoading(false); }
  };

  const startEditProg = (p: any) => {
    setIsEditingProg(true); setEditProgId(p.id); setProgTitle(p.title); setProgCategory(p.category);
    setProgTarget(p.target.toString()); setProgDesc(p.description); setExistingProgImg(p.image_url); setProgFile(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEditProg = () => {
    setIsEditingProg(false); setEditProgId(null); setProgTitle(''); setProgCategory('');
    setProgTarget(''); setProgDesc(''); setExistingProgImg(''); setProgFile(null);
  };

  const handleManualDonation = async (id: string, currentTotal: number) => {
    const amountStr = window.prompt("Masukkan nominal dana offline/tunai:");
    if (!amountStr) return;
    const amount = Number(amountStr);
    if (isNaN(amount) || amount <= 0) return toast.error('Nominal tidak valid!');
    const { error } = await supabase.from('programs').update({ terkumpul: currentTotal + amount }).eq('id', id);
    if (!error) { toast.success(`Berhasil tambah tunai Rp ${amount.toLocaleString('id-ID')}`); fetchPrograms(); }
  };

  const handleToggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'Selesai' ? 'Aktif' : 'Selesai';
    if (!confirm(`Ubah status menjadi ${newStatus}?`)) return;
    const { error } = await supabase.from('programs').update({ status: newStatus }).eq('id', id);
    if (!error) { toast.success(`Status program kini: ${newStatus}`); fetchPrograms(); }
  };

  // MANAGEMENT KONTEN BERITA/VIDEO (BISA POST DAN BISA EDIT)
  const handleAddNews = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsFile && !newsVideoUrl && !existingNewsImg) {
      return toast.error('Wajib mengunggah foto cover ATAU memasukkan tautan video!');
    }
    setLoading(true);
    try {
      let img = existingNewsImg || null;
      if (newsFile) img = await uploadImage(newsFile, 'articles');
      
      const payload = { 
        title: newsTitle, 
        category: newsCategory, 
        snippet: newsSnippet, 
        image_url: img,
        video_url: newsVideoUrl || null 
      };

      if (isEditingNews && editNewsId) {
        const { error } = await supabase.from('articles').update(payload).eq('id', editNewsId);
        if (error) throw error;
        toast.success('Artikel/Video berhasil diperbarui!');
      } else {
        const { error } = await supabase.from('articles').insert([payload]);
        if (error) throw error;
        toast.success('Artikel/Video baru diterbitkan!');
      }
      
      cancelEditNews(); 
      fetchArticles();
    } catch (err: any) { 
      toast.error(`Gagal menyimpan: ${err.message}`); 
    } finally { 
      setLoading(false); 
    }
  };

  const startEditNews = (a: any) => {
    setIsEditingNews(true);
    setEditNewsId(a.id);
    setNewsTitle(a.title);
    setNewsCategory(a.category);
    setNewsSnippet(a.snippet);
    setNewsVideoUrl(a.video_url || '');
    setExistingNewsImg(a.image_url || '');
    setNewsFile(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEditNews = () => {
    setIsEditingNews(false);
    setEditNewsId(null);
    setNewsTitle('');
    setNewsCategory('');
    setNewsSnippet('');
    setNewsVideoUrl('');
    setExistingNewsImg('');
    setNewsFile(null);
  };

  const handleUpdateQurbanSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.from('qurban_settings').upsert({
        id: 1, status: qurbanStatus, harga_kambing: Number(hargaKambing),
        harga_sapi_patungan: Number(hargaSapiPatungan), harga_sapi_utuh: Number(hargaSapiUtuh),
        updated_at: new Date().toISOString()
      });
      if (error) throw error;
      toast.success('Konfigurasi Qurban diperbarui!');
      fetchQurbanSettings();
    } catch (err: any) { toast.error(err.message); } finally { setLoading(false); }
  };

  const handleDeleteRecord = async (table: string, id: string, refreshFn: () => void) => {
    if (!confirm('Apakah Anda yakin ingin MENGHAPUS data ini secara permanen?')) return;
    setLoading(true);
    const { error } = await supabase.from(table).delete().eq('id', id);
    if (!error) { toast.success('Data tunggal berhasil dihapus.'); refreshFn(); }
    else toast.error(`Gagal menghapus: ${error.message}`);
    setLoading(false);
  };

  const handleClearAllDonations = async () => {
    if (!confirm('PERINGATAN KERAS: Anda akan MENGHAPUS BERSIH semua riwayat donasi & doa masuk. Seluruh angka Dashboard akan kembali ke Rp 0. Lanjutkan?')) return;
    if (!confirm('Konfirmasi terakhir, tindakan ini TIDAK BISA DIBATALKAN. Hapus semua?')) return;
    setLoading(true);
    try {
      const { error } = await supabase.from('donations').delete().neq('status', 'PROTECT_X');
      if (error) throw error;
      toast.success('Database dibersihkan! Seluruh data donasi & dashboard berhasil di-reset ke awal.');
      loadAllData();
    } catch (err: any) {
      toast.error(`Gagal reset data: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const downloadDonationsCSV = () => {
    if (liveDonations.length === 0) return toast.error('Tidak ada data.');
    const headers = ['Tanggal', 'Nama Donatur', 'Nominal (Rp)', 'Program Kampanye', 'Status', 'Pesan Doa'];
    const rows = liveDonations.map(d => [
      new Date(d.created_at).toLocaleDateString('id-ID'), `"${d.name}"`, d.amount, `"${d.program_title}"`, `"${d.status}"`, `"${d.message || '-'}"`
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + headers.join(',') + "\n" + rows.map(e => e.join(',')).join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", `Laporan_Donasi_YAMU.csv`);
    document.body.appendChild(link); link.click(); link.remove();
  };

  const validateDonation = async (don: any) => {
    if (!confirm(`Terima dan sahkan donasi Rp ${don.amount.toLocaleString('id-ID')} dari ${don.name}? (Doa donatur akan langsung tayang secara live di web publik)`)) return;
    setLoading(true);
    try {
      const { error: updateErr } = await supabase.from('donations').update({ status: 'LUNAS' }).eq('id', don.id);
      if (updateErr) throw updateErr;

      if (don.program_id) {
        const { data: progData } = await supabase.from('programs').select('terkumpul').eq('id', don.program_id).single();
        if (progData) {
          await supabase.from('programs').update({ terkumpul: (progData.terkumpul || 0) + don.amount }).eq('id', don.program_id);
        }
      }
      
      toast.success('Sukses divalidasi! Dana masuk bertambah & Doa tayang di web publik.');
      loadAllData();
    } catch (err: any) {
      toast.error(`Gagal melakukan validasi: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (!session) {
    return (
      <div className="fixed inset-0 z-[999999] bg-slate-950 flex items-center justify-center px-6 font-sans text-slate-100 w-screen h-screen">
        <form onSubmit={handleLogin} className="w-full max-w-md bg-slate-900/80 backdrop-blur-md p-8 rounded-[2rem] border border-slate-800 shadow-2xl space-y-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 via-emerald-500 to-teal-600"></div>
          <div className="text-center space-y-2">
            <div className="w-14 h-14 bg-teal-950 border border-teal-800/50 rounded-2xl flex items-center justify-center mx-auto shadow-inner shadow-teal-500/10"><ShieldCheck className="w-7 h-7 text-teal-400" /></div>
            <h1 className="text-xl font-black text-white tracking-tight">YAMU</h1>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Gerbang Otorisasi</p>
          </div>
          <div className="space-y-4">
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Akses" className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3.5 px-4 text-xs font-bold focus:outline-none text-white focus:border-teal-500" />
            <div className="relative">
              <input type={showPassword ? 'text' : 'password'} required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Kata Sandi" className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3.5 pl-4 pr-12 text-xs font-bold focus:outline-none text-white focus:border-teal-500" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-3.5 text-slate-500 hover:text-slate-300"><Eye className="w-4 h-4" /></button>
            </div>
          </div>
          <button type="submit" disabled={loading} className="w-full py-4 bg-teal-600 hover:bg-teal-500 font-black rounded-xl text-xs uppercase tracking-wider text-white flex items-center justify-center gap-2">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><LogIn className="w-4 h-4" /> Masuk Panel</>}
          </button>
        </form>
      </div>
    );
  }

  const LUNASDonations = liveDonations.filter(don => don.status === 'LUNAS');
  const totalDanaTerkumpul = LUNASDonations.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);

  return (
    <div className="fixed inset-0 z-[99998] bg-slate-50 font-sans flex text-slate-800 antialiased w-screen h-screen overflow-hidden">
      
      {/* SIDEBAR */}
      <div className="w-64 bg-slate-950 text-slate-400 p-6 flex flex-col gap-6 shrink-0 border-r border-slate-900 shadow-2xl h-full select-none">
        <div className="pb-4 border-b border-slate-900">
          <h1 className="text-white font-black text-lg tracking-tight flex items-center gap-2">YAMU <span className="text-teal-400 font-medium text-xs bg-teal-950 border border-teal-900 px-2 py-0.5 rounded">Core</span></h1>
          <span className="text-[9px] uppercase font-bold text-slate-500 tracking-widest flex items-center gap-1 mt-1.5"><ShieldCheck className="w-3.5 h-3.5 text-teal-500" /> Root Administrator</span>
        </div>
        <div className="flex flex-col gap-1.5 flex-grow text-xs font-bold">
          <button onClick={() => setActiveMenu('dashboard')} className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all ${activeMenu === 'dashboard' ? 'bg-teal-600 text-white shadow-md' : 'hover:bg-slate-900 hover:text-white'}`}><LayoutDashboard className="w-4 h-4" /> Ringkasan Beranda</button>
          <button onClick={() => setActiveMenu('program')} className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all ${activeMenu === 'program' ? 'bg-teal-600 text-white shadow-md' : 'hover:bg-slate-900 hover:text-white'}`}><PlusCircle className="w-4 h-4" /> Kelola Kampanye</button>
          <button onClick={() => setActiveMenu('berita')} className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all ${activeMenu === 'berita' ? 'bg-teal-600 text-white shadow-md' : 'hover:bg-slate-900 hover:text-white'}`}><FileText className="w-4 h-4" /> Rilis Berita & Video</button>
          <button onClick={() => setActiveMenu('donasi')} className={`flex items-center justify-between px-4 py-3.5 rounded-xl transition-all ${activeMenu === 'donasi' ? 'bg-teal-600 text-white shadow-md' : 'hover:bg-slate-900 hover:text-white'}`}>
            <span className="flex items-center gap-3"><Coins className="w-4 h-4" /> Validasi & Reset Data</span>
            {liveDonations.some(d => d.status !== 'LUNAS') && <span className="w-2 h-2 bg-rose-500 rounded-full animate-pulse"></span>}
          </button>
          <button onClick={() => setActiveMenu('qurban')} className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all ${activeMenu === 'qurban' ? 'bg-teal-600 text-white shadow-md' : 'hover:bg-slate-900 hover:text-white'}`}><Settings className="w-4 h-4" /> Kontrol Fitur Qurban</button>
        </div>
        <button onClick={handleLogout} className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl font-black text-xs text-rose-400 hover:bg-rose-950/30 border border-rose-950/20 transition-colors uppercase tracking-wider"><LogOut className="w-4 h-4" /> Tutup Sesi</button>
      </div>

      <div className="flex-grow p-8 md:p-10 overflow-y-auto h-full max-w-5xl">
        
        {/* ======================= DASHBOARD ======================= */}
        {activeMenu === 'dashboard' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-teal-950 via-slate-900 to-teal-950 rounded-[2rem] p-8 md:p-10 shadow-xl text-white relative overflow-hidden border border-slate-900">
              <div className="relative z-10 space-y-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-500/10 text-teal-400 font-bold text-[9px] rounded-lg uppercase tracking-widest border border-teal-500/20 mb-2">Pusat Kendali Aktif</span>
                <h2 className="text-2xl md:text-3xl font-black tracking-tight">Selamat Datang, Humas YAMU</h2>
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
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2"><FileText className="w-4 h-4 text-blue-500" /> Total Artikel & Video</span>
                <span className="text-3xl font-black text-slate-900">{articles.length} <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tayang</span></span>
              </div>
            </div>

            <div className="bg-white rounded-[2rem] p-6 md:p-8 border border-slate-200/60 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2"><Coins className="w-4 h-4 text-teal-600" /> 5 Data Transaksi / Doa Terbaru</h3>
                <button onClick={() => setActiveMenu('donasi')} className="text-[10px] font-black uppercase tracking-wider text-slate-500 hover:text-teal-600 bg-slate-50 px-3 py-2 rounded-xl border border-slate-100">Cek Log Lengkap</button>
              </div>
              <div className="space-y-3">
                {liveDonations.slice(0, 5).map(don => (
                  <div key={don.id} className="flex justify-between items-center p-4 bg-slate-50/50 rounded-2xl border border-slate-100 hover:border-slate-300 transition-colors">
                    <div className="flex items-center gap-4 flex-grow truncate">
                      {don.status === 'LUNAS' ? (
                        <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0"><CheckCircle2 className="w-4 h-4" /></div>
                      ) : (
                        <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center shrink-0 animate-pulse"><AlertCircle className="w-4 h-4" /></div>
                      )}
                      <div className="truncate">
                        <span className="font-bold text-slate-800 block text-xs md:text-sm truncate">{don.name} <span className="text-teal-600 font-black ml-1">Transfer Rp {don.amount.toLocaleString('id-ID')}</span></span>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] text-slate-400 font-bold">{new Date(don.created_at).toLocaleDateString('id-ID')} • {don.program_title}</span>
                          {don.status !== 'LUNAS' && <span className="text-[8px] bg-rose-100 text-rose-700 px-2 py-0.5 rounded font-black uppercase tracking-wider border border-rose-200/50">Belum Divalidasi</span>}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 ml-4">
                      {don.status !== 'LUNAS' && (
                        <button onClick={() => validateDonation(don)} className="p-2 text-emerald-600 bg-emerald-100 hover:bg-emerald-200 rounded-xl transition-colors" title="Validasi Donasi Ini"><CheckCircle2 className="w-4 h-4" /></button>
                      )}
                      <button onClick={() => handleDeleteRecord('donations', don.id, loadAllData)} className="p-2 text-rose-500 bg-rose-100 hover:bg-rose-200 rounded-xl transition-colors" title="Hapus Data Ini"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                ))}
                {liveDonations.length === 0 && (<p className="text-center text-xs font-bold text-slate-400 py-10">Belum ada data masuk.</p>)}
              </div>
            </div>
          </div>
        )}

        {/* ======================= KELOLA PROGRAM ======================= */}
        {activeMenu === 'program' && (
          <div className="space-y-8">
            <div className={`bg-white rounded-[2rem] p-6 md:p-8 shadow-xl border ${isEditingProg ? 'ring-4 ring-amber-500/20 border-amber-300' : 'border-slate-200/60'}`}>
              <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
                <h2 className="text-base font-black text-slate-900 uppercase tracking-wider">{isEditingProg ? 'Mode Koreksi Kampanye' : 'Terbitkan Program Baru'}</h2>
                {isEditingProg && <button onClick={cancelEditProg} className="text-[10px] font-black uppercase tracking-wider text-slate-500 hover:text-slate-800 bg-slate-100 px-4 py-2 rounded-xl">Batal</button>}
              </div>
              <form onSubmit={handleSaveProgram} className="space-y-5 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <div className="space-y-1.5"><label>Judul Kampanye Donasi *</label><input type="text" required value={progTitle} onChange={(e) => setProgTitle(e.target.value)} className="w-full bg-slate-50/80 border border-slate-200 p-3.5 rounded-xl focus:outline-none text-slate-800 font-bold normal-case" /></div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-1.5"><label>Kategori Sasaran *</label><input type="text" required value={progCategory} onChange={(e) => setProgCategory(e.target.value)} className="w-full bg-slate-50/80 border border-slate-200 p-3.5 rounded-xl focus:outline-none text-slate-800 font-bold normal-case" /></div>
                  <div className="space-y-1.5"><label>Target Anggaran (Rp) *</label><input type="number" required value={progTarget} onChange={(e) => setProgTarget(e.target.value)} className="w-full bg-slate-50/80 border border-slate-200 p-3.5 rounded-xl focus:outline-none text-slate-800 font-bold normal-case" /></div>
                </div>
                <div className="space-y-1.5">
                  <label>Dokumentasi Sampul Utama *</label>
                  <div className="border-2 border-dashed border-slate-200 p-6 rounded-xl bg-slate-50/50 relative cursor-pointer hover:border-teal-500 flex flex-col items-center justify-center">
                    <input type="file" accept="image/*" required={!isEditingProg} onChange={(e) => setProgFile(e.target.files?.[0] || null)} className="absolute inset-0 opacity-0 cursor-pointer" />
                    <Upload className="w-5 h-5 text-slate-400 mb-2" />
                    <span className="text-slate-600 block text-center normal-case">{progFile ? <span className="text-teal-600 font-black">✓ Berkas Siap: {progFile.name}</span> : 'Klik/Tarik foto utama di sini'}</span>
                  </div>
                </div>
                <div className="space-y-1.5"><label>Narasi Lengkap *</label><textarea rows={8} required value={progDesc} onChange={(e) => setProgDesc(e.target.value)} className="w-full bg-slate-50/80 border border-slate-200 p-4 rounded-xl focus:outline-none text-slate-800 font-medium normal-case" /></div>
                <button type="submit" disabled={loading} className={`w-full py-4 text-white rounded-xl shadow-md flex items-center justify-center gap-2 font-black text-xs uppercase tracking-wider ${isEditingProg ? 'bg-amber-500 text-slate-900' : 'bg-teal-600'}`}>
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : (isEditingProg ? 'Eksekusi Pembaruan' : 'Publish Program')}
                </button>
              </form>
            </div>
            
            <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-xl border border-slate-200/60">
              <h3 className="font-bold text-xs text-slate-400 uppercase tracking-wider mb-4">Arsip Database Penggalangan</h3>
              <div className="space-y-4">
                {programs.map(p => (
                  <div key={p.id} className="flex flex-col lg:flex-row justify-between p-5 rounded-2xl border bg-white shadow-sm hover:border-teal-200">
                    <div className="mb-4 lg:mb-0 space-y-1">
                      <span className="font-black text-slate-900 text-base block">{p.title}</span>
                      <div className="flex items-center gap-2 pt-0.5"><span className="text-[9px] bg-slate-100 text-slate-600 font-black px-2 py-0.5 rounded uppercase tracking-wider">{p.category}</span></div>
                      <p className="text-[11px] text-slate-400 font-bold pt-1.5">Terkumpul: <span className="text-teal-600 font-black">Rp {(p.terkumpul || 0).toLocaleString('id-ID')}</span> / Rp {p.target.toLocaleString('id-ID')}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleManualDonation(p.id, p.terkumpul || 0)} className="px-3 py-2 text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-xl text-xs font-black"><Coins className="w-3.5 h-3.5 inline mr-1" /> Tunai</button>
                      <button onClick={() => handleToggleStatus(p.id, p.status || 'Aktif')} className="p-2 text-blue-600 bg-blue-50 border border-blue-100 rounded-xl">{p.status === 'Selesai' ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}</button>
                      <button onClick={() => startEditProg(p)} className="p-2 text-amber-600 bg-amber-50 border border-amber-100 rounded-xl"><Edit className="w-4 h-4" /></button>
                      <button onClick={() => handleDeleteRecord('programs', p.id, fetchPrograms)} className="p-2 text-rose-600 bg-rose-50 border border-rose-100 rounded-xl"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ======================= TAB BERITA & VIDEO ======================= */}
        {activeMenu === 'berita' && (
          <div className="space-y-8">
            <div className={`bg-white rounded-[2rem] p-6 md:p-8 shadow-xl border ${isEditingNews ? 'ring-4 ring-amber-500/20 border-amber-300' : 'border-slate-200/60'}`}>
              <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
                <h2 className="text-base font-black text-slate-900 uppercase tracking-wider">{isEditingNews ? 'Mode Koreksi Publikasi' : 'Penerbitan Berita & Video'}</h2>
                {isEditingNews && <button onClick={cancelEditNews} className="text-[10px] font-black uppercase tracking-wider text-slate-500 hover:text-slate-800 bg-slate-100 px-4 py-2 rounded-xl">Batal</button>}
              </div>
              <form onSubmit={handleAddNews} className="space-y-5 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <div className="grid md:grid-cols-2 gap-4">
                  <div><label>Judul Publikasi *</label><input type="text" required value={newsTitle} onChange={(e) => setNewsTitle(e.target.value)} className="w-full bg-slate-50/80 border p-3.5 rounded-xl font-bold normal-case mt-1.5 focus:outline-none focus:border-teal-500 text-slate-800" /></div>
                  <div><label>Label Kategori *</label><input type="text" required value={newsCategory} onChange={(e) => setNewsCategory(e.target.value)} className="w-full bg-slate-50/80 border p-3.5 rounded-xl font-bold normal-case mt-1.5 focus:outline-none focus:border-teal-500 text-slate-800" /></div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center gap-2"><ImageIcon className="w-4 h-4" /> Foto Cover (Wajib jika Artikel)</label>
                    <div className="border-2 border-dashed border-slate-200 p-4 rounded-xl bg-slate-50/50 mt-1.5 relative cursor-pointer text-center hover:border-teal-500 transition-colors">
                      <input type="file" onChange={(e) => setNewsFile(e.target.files?.[0] || null)} className="absolute inset-0 opacity-0 cursor-pointer" />
                      <span className="text-slate-600 normal-case">{newsFile ? <span className="text-teal-600 font-black">{newsFile.name}</span> : 'Pilih berkas gambar'}</span>
                    </div>
                  </div>
                  <div>
                    <label className="flex items-center gap-2"><Video className="w-4 h-4" /> Tautan Video (Opsional)</label>
                    <input type="text" value={newsVideoUrl} onChange={(e) => setNewsVideoUrl(e.target.value)} placeholder="Link YouTube atau URL .mp4" className="w-full bg-slate-50/80 border p-3.5 rounded-xl font-bold normal-case mt-1.5 focus:outline-none focus:border-teal-500 text-slate-800" />
                    <p className="text-[9px] text-slate-400 normal-case mt-1">Kosongkan jika hanya membuat artikel teks biasa.</p>
                  </div>
                </div>

                <div><label>Konten Artikel / Deskripsi Video *</label><textarea rows={6} required value={newsSnippet} onChange={(e) => setNewsSnippet(e.target.value)} className="w-full bg-slate-50/80 border p-4 rounded-xl font-medium normal-case mt-1.5 focus:outline-none focus:border-teal-500 text-slate-800" /></div>
                <button type="submit" disabled={loading} className={`w-full py-4 text-white rounded-xl font-black text-xs uppercase tracking-wider shadow-md transition-colors ${isEditingNews ? 'bg-amber-500 text-slate-900' : 'bg-teal-600 hover:bg-teal-500'}`}>{loading ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : (isEditingNews ? 'Eksekusi Pembaruan' : 'Tayangkan Publikasi')}</button>
              </form>
            </div>

            <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-xl border border-slate-200/60">
              <h3 className="font-bold text-xs text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-100 pb-4">Arsip Publikasi Yayasan</h3>
              <div className="space-y-3">
                {articles.map(a => (
                  <div key={a.id} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-teal-300 transition-colors">
                    <div className="flex items-center gap-3">
                      {a.video_url ? <Video className="w-5 h-5 text-rose-500" /> : <FileText className="w-5 h-5 text-teal-600" />}
                      <div className="font-bold text-sm text-slate-800">{a.title}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => startEditNews(a)} className="p-2 text-amber-600 bg-amber-50 border border-amber-100 rounded-xl transition-colors"><Edit className="w-4 h-4" /></button>
                      <button onClick={() => handleDeleteRecord('articles', a.id, fetchArticles)} className="p-2 text-rose-600 bg-rose-100 hover:bg-rose-200 rounded-xl transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ======================= LOG KEUANGAN & VALIDASI ======================= */}
        {activeMenu === 'donasi' && (
          <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-xl border border-slate-200/60 space-y-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-base font-black text-slate-900 uppercase tracking-wider">Validasi Data Donatur & Doa</h2>
                <p className="text-[11px] font-bold text-slate-400 uppercase mt-0.5">Sistem filter anti-spam donasi manual</p>
              </div>
              <button onClick={downloadDonationsCSV} className="px-4 py-2.5 bg-slate-900 text-white text-xs font-black rounded-xl flex items-center gap-1.5 self-start"><Download className="w-4 h-4" /> Ekspor (.csv)</button>
            </div>

            <div className="bg-rose-50/40 p-4 border border-rose-100 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex gap-3 items-start">
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-black text-slate-900 text-xs uppercase tracking-wider">Pusat Kendali / Reset Database</h4>
                  <p className="text-[11px] text-slate-500 font-medium normal-case leading-relaxed">Gunakan tombol di samping untuk menghapus seluruh riwayat masuk donasi secara total sekaligus mengosongkan angka akumulasi di Dashboard utama ke Rp 0.</p>
                </div>
              </div>
              <button onClick={handleClearAllDonations} type="button" className="px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 shadow-sm shrink-0">
                <RefreshCw className="w-3.5 h-3.5" /> Reset Dashboard & Doa
              </button>
            </div>

            <div className="border border-slate-200 rounded-2xl overflow-x-auto w-full shadow-sm">
              <table className="min-w-[900px] w-full text-left text-xs table-fixed">
                <thead className="bg-slate-50/80 font-black border-b text-[9px] text-slate-400 uppercase tracking-widest select-none">
                  <tr>
                    <th className="p-4 w-[12%]">Tanggal</th>
                    <th className="p-4 w-[35%]">Biodata & Pesan Doa</th>
                    <th className="p-4 w-[15%]">Nominal</th>
                    <th className="p-4 w-[20%]">Alokasi Kampanye</th>
                    <th className="p-4 w-[18%] text-center">Tindakan Admin</th>
                  </tr>
                </thead>
                <tbody className="divide-y text-slate-600 font-medium">
                  {liveDonations.length > 0 ? liveDonations.map((don) => (
                    <tr key={don.id} className={`${don.status !== 'LUNAS' ? 'bg-amber-50/30' : 'hover:bg-slate-50/30'} transition-colors`}>
                      <td className="p-4 text-slate-400 font-bold">{new Date(don.created_at).toLocaleDateString('id-ID')}</td>
                      <td className="p-4">
                        <div className="font-black text-slate-900 text-xs">{don.name}</div>
                        <div className="text-[10px] text-slate-400 font-bold pt-0.5">{don.phone || 'No. HP Kosong'}</div>
                        {don.message && (
                          <div className="mt-2 p-2.5 bg-teal-50/60 border border-teal-100 rounded-lg text-[10px] text-teal-800 font-medium flex items-start gap-2 normal-case shadow-sm">
                            <MessageSquare className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                            <span className="break-words w-full"><span className="font-black">Doa:</span> "{don.message}"</span>
                          </div>
                        )}
                      </td>
                      <td className="p-4 text-teal-600 font-black text-sm whitespace-nowrap">Rp {don.amount.toLocaleString('id-ID')}</td>
                      <td className="p-4">
                        <span className="text-slate-800 font-bold block truncate" title={don.program_title}>{don.program_title}</span>
                        <div className="pt-1.5">
                          {don.status === 'LUNAS' ? (
                            <span className="text-[8px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded font-black uppercase tracking-wider border border-emerald-200">Terverifikasi (Tampil)</span>
                          ) : (
                            <span className="text-[8px] bg-rose-100 text-rose-700 px-2 py-0.5 rounded font-black uppercase tracking-wider border border-rose-200">Belum Valid (Sembunyi)</span>
                          )}
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          {don.status !== 'LUNAS' && (
                            <button type="button" onClick={() => validateDonation(don)} className="px-2.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-lg transition-colors flex items-center gap-1 shadow-sm uppercase tracking-wider text-[9px] shrink-0">
                              <CheckCircle2 className="w-3.5 h-3.5" /> COCOK, VALIDASI
                            </button>
                          )}
                          <button type="button" onClick={() => handleDeleteRecord('donations', don.id, loadAllData)} className="p-2 text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl transition-all" title="Hapus permanen data ini">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )) : <tr><td colSpan={5} className="p-10 text-center font-bold text-slate-400 bg-slate-50 border border-dashed rounded-2xl">Belum ada srikulasi data transaksi donasi masuk.</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ======================= TAB QURBAN ======================= */}
        {activeMenu === 'qurban' && (
          <div className="space-y-8">
            <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-xl border border-slate-200/60">
              <h2 className="text-base font-black text-slate-900 uppercase tracking-wider mb-6 flex items-center gap-2"><Settings className="w-5 h-5 text-teal-600" /> Pengaturan Qurban</h2>
              <form onSubmit={handleUpdateQurbanSettings} className="space-y-6 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <div className="space-y-2">
                  <label>Status Operasional *</label>
                  <div className="grid grid-cols-3 gap-3">
                    <button type="button" onClick={() => setQurbanStatus('OFF')} className={`py-3 rounded-xl border ${qurbanStatus === 'OFF' ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-600'}`}>OFF (Tabungan)</button>
                    <button type="button" onClick={() => setQurbanStatus('ON')} className={`py-3 rounded-xl border ${qurbanStatus === 'ON' ? 'bg-emerald-600 text-white' : 'bg-slate-50 text-slate-600'}`}>ON (Live)</button>
                    <button type="button" onClick={() => setQurbanStatus('POST')} className={`py-3 rounded-xl border ${qurbanStatus === 'POST' ? 'bg-blue-600 text-white' : 'bg-slate-50 text-slate-600'}`}>POST (Laporan)</button>
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div><label>Kambing (Rp)</label><input type="number" required value={hargaKambing} onChange={(e) => setHargaKambing(e.target.value)} className="w-full bg-slate-50 border p-3.5 rounded-xl font-bold normal-case mt-1" /></div>
                  <div><label>Sapi Patungan (Rp)</label><input type="number" required value={hargaSapiPatungan} onChange={(e) => setHargaSapiPatungan(e.target.value)} className="w-full bg-slate-50 border p-3.5 rounded-xl font-bold normal-case mt-1" /></div>
                  <div><label>Sapi Utuh (Rp)</label><input type="number" required value={hargaSapiUtuh} onChange={(e) => setHargaSapiUtuh(e.target.value)} className="w-full bg-slate-50 border p-3.5 rounded-xl font-bold normal-case mt-1" /></div>
                </div>
                <button type="submit" disabled={loading} className="w-full py-4 bg-teal-600 text-white font-black rounded-xl flex justify-center">{loading ? 'Memproses...' : 'Simpan Konfigurasi'}</button>
              </form>
            </div>
            
            <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-xl border border-slate-200/60">
              <h3 className="font-bold text-xs text-slate-400 uppercase tracking-wider mb-4">Daftar Shohibul Qurban</h3>
              <div className="border border-slate-200 rounded-2xl overflow-x-auto w-full">
                <table className="min-w-[600px] w-full text-left text-xs">
                  <thead className="bg-slate-50/80 font-black border-b text-[9px] text-slate-400 uppercase tracking-widest">
                    <tr><th className="p-4">Tgl</th><th className="p-4">Mudhohi</th><th className="p-4">Tipe</th><th className="p-4 text-center">Tindakan</th></tr>
                  </thead>
                  <tbody className="divide-y text-slate-600 font-medium">
                    {qurbanOrders.map((order) => (
                      <tr key={order.id} className={`${order.status_pembayaran === 'PENDING' ? 'bg-amber-50/20' : ''}`}>
                        <td className="p-4 text-slate-400">{new Date(order.created_at).toLocaleDateString('id-ID')}</td>
                        <td className="p-4"><div className="font-black text-slate-900 text-xs">{order.nama_mudhohi}</div><div className="text-[10px] text-slate-400">{order.nama_donatur} ({order.nomor_wa})</div></td>
                        <td className="p-4"><span className="px-2.5 py-1 bg-slate-100 text-slate-700 font-black rounded text-[9px] uppercase">{order.tipe_qurban}</span></td>
                        <td className="p-4 text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            {order.status_pembayaran === 'PENDING' && (
                              <button onClick={async () => {
                                await supabase.from('qurban_orders').update({ status_pembayaran: 'LUNAS' }).eq('id', order.id); fetchQurbanOrders();
                              }} className="px-2.5 py-1.5 bg-emerald-600 text-white rounded-lg text-[9px] uppercase font-black">Validasi</button>
                            )}
                            <button onClick={() => handleDeleteRecord('qurban_orders', order.id, loadAllData)} className="p-2 text-rose-500 bg-rose-50 rounded-xl"><Trash2 className="w-3.5 h-3.5" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
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