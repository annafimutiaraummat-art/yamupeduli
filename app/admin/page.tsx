'use client';
import { useState, useEffect, useMemo } from 'react';
import {
  LayoutDashboard, FileText, Upload, PlusCircle, Coins, ShieldCheck,
  LogIn, LogOut, Loader2, Trash2, Edit, Download, BarChart3, CheckCircle2,
  Eye, EyeOff, MessageSquare, Settings, AlertCircle, RefreshCw, Video,
  Image as ImageIcon, Search, ChevronLeft, ChevronRight, X, AlertTriangle,
  Archive, FileSpreadsheet, Clock,
} from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import toast from 'react-hot-toast';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || '', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '');
const PER_PAGE = 20;

// ===== MODAL KONFIRMASI RAMAH (ganti confirm() browser yang bikin panik) =====
type Confirm = { title: string; message: string; tone: 'danger' | 'warn' | 'info'; confirmLabel: string; requireText?: string; onConfirm: () => void } | null;

export default function AdminPanel() {
  const [session, setSession] = useState<any>(null);
  const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const [showPassword, setShowPassword] = useState(false);
  const [activeMenu, setActiveMenu] = useState<'dashboard' | 'program' | 'berita' | 'donasi' | 'qurban'>('dashboard');
  const [loading, setLoading] = useState(false);
  const [envError, setEnvError] = useState(false);
  const [confirm, setConfirm] = useState<Confirm>(null);
  const [confirmText, setConfirmText] = useState('');

  // Program
  const [isEditingProg, setIsEditingProg] = useState(false); const [editProgId, setEditProgId] = useState<string | null>(null);
  const [existingProgImg, setExistingProgImg] = useState(''); const [progTitle, setProgTitle] = useState(''); const [progCategory, setProgCategory] = useState('');
  const [progTarget, setProgTarget] = useState(''); const [progDesc, setProgDesc] = useState(''); const [progFile, setProgFile] = useState<File | null>(null);
  // Berita
  const [isEditingNews, setIsEditingNews] = useState(false); const [editNewsId, setEditNewsId] = useState<string | null>(null);
  const [existingNewsImg, setExistingNewsImg] = useState(''); const [newsTitle, setNewsTitle] = useState(''); const [newsCategory, setNewsCategory] = useState('');
  const [newsSnippet, setNewsSnippet] = useState(''); const [newsVideoUrl, setNewsVideoUrl] = useState(''); const [newsFile, setNewsFile] = useState<File | null>(null);
  // Qurban
  const [qurbanStatus, setQurbanStatus] = useState<'OFF' | 'ON' | 'POST'>('OFF');
  const [hargaKambing, setHargaKambing] = useState(''); const [hargaSapiPatungan, setHargaSapiPatungan] = useState(''); const [hargaSapiUtuh, setHargaSapiUtuh] = useState('');
  const [qurbanOrders, setQurbanOrders] = useState<any[]>([]);
  // Data
  const [programs, setPrograms] = useState<any[]>([]); const [articles, setArticles] = useState<any[]>([]);
  const [recentDonations, setRecentDonations] = useState<any[]>([]); const [totalValid, setTotalValid] = useState(0);
  // Donasi (pagination server-side)
  const [donRows, setDonRows] = useState<any[]>([]); const [donCount, setDonCount] = useState(0);
  const [donPage, setDonPage] = useState(1); const [donFilter, setDonFilter] = useState<'semua' | 'menunggu' | 'valid'>('semua');
  const [donSearch, setDonSearch] = useState(''); const [donSearchInput, setDonSearchInput] = useState('');
  const [signedUrls, setSignedUrls] = useState<Record<string, string>>({});

  const ask = (c: NonNullable<Confirm>) => { setConfirmText(''); setConfirm(c); };
  const closeConfirm = () => { setConfirm(null); setConfirmText(''); };

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) setEnvError(true);
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => { if (session) loadAll(); }, [session]);

  // debounce pencarian nama
  useEffect(() => { const t = setTimeout(() => { setDonSearch(donSearchInput); setDonPage(1); }, 400); return () => clearTimeout(t); }, [donSearchInput]);
  useEffect(() => { if (session) fetchDonPage(); }, [session, donPage, donFilter, donSearch]);

  const loadAll = async () => {
    setLoading(true);
    try { await Promise.all([fetchPrograms(), fetchArticles(), fetchQurbanSettings(), fetchQurbanOrders(), fetchDashboard(), fetchDonPage()]); }
    catch { toast.error('Gagal memuat data.'); } finally { setLoading(false); }
  };

  const fetchPrograms = async () => { const { data } = await supabase.from('programs').select('*').order('created_at', { ascending: false }); if (data) setPrograms(data); };
  const fetchArticles = async () => { const { data } = await supabase.from('articles').select('*').order('created_at', { ascending: false }); if (data) setArticles(data); };
  const fetchQurbanSettings = async () => { const { data } = await supabase.from('qurban_settings').select('*').eq('id', 1).maybeSingle(); if (data) { setQurbanStatus(data.status); setHargaKambing(data.harga_kambing.toString()); setHargaSapiPatungan(data.harga_sapi_patungan.toString()); setHargaSapiUtuh(data.harga_sapi_utuh.toString()); } };
  const fetchQurbanOrders = async () => { const { data } = await supabase.from('qurban_orders').select('*').order('created_at', { ascending: false }); if (data) setQurbanOrders(data); };

  // Dashboard: total kebal-arsip + 5 terbaru
  const fetchDashboard = async () => {
    const [{ data: progRows }, { data: umumRows }, { data: recent }] = await Promise.all([
      supabase.from('programs').select('terkumpul'),
      supabase.from('donations').select('amount').eq('status', 'LUNAS').is('program_id', null),
      supabase.from('donations').select('*').order('created_at', { ascending: false }).limit(5),
    ]);
    const tProg = progRows?.reduce((s, p) => s + (Number(p.terkumpul) || 0), 0) || 0;
    const tUmum = umumRows?.reduce((s, d) => s + (Number(d.amount) || 0), 0) || 0;
    setTotalValid(tProg + tUmum);
    if (recent) setRecentDonations(recent);
  };

  // Tab donasi: 1 halaman + hitung total + signed URL bukti
  const fetchDonPage = async () => {
    setLoading(true);
    let q = supabase.from('donations').select('*', { count: 'exact' });
    if (donFilter === 'menunggu') q = q.eq('status', 'PENDING');
    if (donFilter === 'valid') q = q.eq('status', 'LUNAS');
    if (donSearch.trim()) q = q.ilike('name', `%${donSearch.trim()}%`);
    const { data, count } = await q.order('created_at', { ascending: false }).range((donPage - 1) * PER_PAGE, donPage * PER_PAGE - 1);
    setDonRows(data || []); setDonCount(count || 0);
    // signed URL (bucket private)
    const paths = (data || []).map((d: any) => d.payment_proof_path).filter(Boolean);
    if (paths.length) {
      const { data: signed } = await supabase.storage.from('payment-proofs').createSignedUrls(paths, 3600);
      const map: Record<string, string> = {};
      (signed || []).forEach((s, i) => { if (s.signedUrl) map[(data as any)[i].id] = s.signedUrl; });
      setSignedUrls(map);
    } else setSignedUrls({});
    setLoading(false);
  };

  const reloadDon = async () => { await Promise.all([fetchDonPage(), fetchDashboard(), fetchPrograms()]); };

  // ===== LOGIN / LOGOUT =====
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (envError) return toast.error('File .env belum lengkap.');
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) toast.error('Email atau kata sandi salah.');
    else if (data?.session) { setSession(data.session); toast.success('Berhasil masuk.'); }
    setLoading(false);
  };
  const handleLogout = async () => { await supabase.auth.signOut(); setSession(null); toast.success('Sesi ditutup.'); };

  // ===== UPLOAD GAMBAR =====
  const uploadImage = async (file: File, folder: string) => {
    const filePath = `${folder}/${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from('yamu-assets').upload(filePath, file);
    if (error) throw error;
    return supabase.storage.from('yamu-assets').getPublicUrl(filePath).data.publicUrl;
  };

  // ===== PROGRAM CRUD =====
  const handleSaveProgram = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEditingProg && !progFile) return toast.error('Foto sampul wajib diunggah.');
    setLoading(true);
    try {
      let img = existingProgImg; if (progFile) img = await uploadImage(progFile, 'programs');
      const payload = { title: progTitle, category: progCategory, target: Number(progTarget), description: progDesc, image_url: img };
      if (isEditingProg && editProgId) { await supabase.from('programs').update(payload).eq('id', editProgId); toast.success('Program diperbarui.'); }
      else { await supabase.from('programs').insert([{ ...payload, terkumpul: 0, status: 'Aktif' }]); toast.success('Program diterbitkan.'); }
      cancelEditProg(); fetchPrograms();
    } catch (err: any) { toast.error(err.message); } finally { setLoading(false); }
  };
  const startEditProg = (p: any) => { setIsEditingProg(true); setEditProgId(p.id); setProgTitle(p.title); setProgCategory(p.category); setProgTarget(p.target.toString()); setProgDesc(p.description); setExistingProgImg(p.image_url); setProgFile(null); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const cancelEditProg = () => { setIsEditingProg(false); setEditProgId(null); setProgTitle(''); setProgCategory(''); setProgTarget(''); setProgDesc(''); setExistingProgImg(''); setProgFile(null); };
  const handleManualDonation = (id: string, current: number) => {
    const s = window.prompt('Masukkan nominal dana tunai/offline (Rp):'); if (!s) return;
    const n = Number(s); if (isNaN(n) || n <= 0) return toast.error('Nominal tidak valid.');
    ask({ tone: 'info', title: 'Tambah Dana Tunai', message: `Menambahkan Rp ${n.toLocaleString('id-ID')} ke progress kampanye ini sebagai dana tunai/offline. Lanjutkan?`, confirmLabel: 'Ya, Tambahkan', onConfirm: async () => { closeConfirm(); const { error } = await supabase.from('programs').update({ terkumpul: current + n }).eq('id', id); if (!error) { toast.success('Dana tunai ditambahkan.'); fetchPrograms(); fetchDashboard(); } } });
  };
  const handleToggleStatus = (id: string, cur: string) => {
    const neu = cur === 'Selesai' ? 'Aktif' : 'Selesai';
    ask({ tone: 'warn', title: 'Ubah Status Kampanye', message: `Status kampanye akan diubah menjadi "${neu}".`, confirmLabel: 'Ubah Status', onConfirm: async () => { closeConfirm(); const { error } = await supabase.from('programs').update({ status: neu }).eq('id', id); if (!error) { toast.success(`Status kini: ${neu}`); fetchPrograms(); } } });
  };

  // ===== BERITA CRUD =====
  const handleAddNews = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsFile && !newsVideoUrl && !existingNewsImg) return toast.error('Unggah foto cover atau isi tautan video.');
    setLoading(true);
    try {
      let img = existingNewsImg || null; if (newsFile) img = await uploadImage(newsFile, 'articles');
      const payload = { title: newsTitle, category: newsCategory, snippet: newsSnippet, image_url: img, video_url: newsVideoUrl || null };
      if (isEditingNews && editNewsId) { const { error } = await supabase.from('articles').update(payload).eq('id', editNewsId); if (error) throw error; toast.success('Publikasi diperbarui.'); }
      else { const { error } = await supabase.from('articles').insert([payload]); if (error) throw error; toast.success('Publikasi diterbitkan.'); }
      cancelEditNews(); fetchArticles();
    } catch (err: any) { toast.error(`Gagal menyimpan: ${err.message}`); } finally { setLoading(false); }
  };
  const startEditNews = (a: any) => { setIsEditingNews(true); setEditNewsId(a.id); setNewsTitle(a.title); setNewsCategory(a.category); setNewsSnippet(a.snippet); setNewsVideoUrl(a.video_url || ''); setExistingNewsImg(a.image_url || ''); setNewsFile(null); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const cancelEditNews = () => { setIsEditingNews(false); setEditNewsId(null); setNewsTitle(''); setNewsCategory(''); setNewsSnippet(''); setNewsVideoUrl(''); setExistingNewsImg(''); setNewsFile(null); };

  // ===== QURBAN =====
  const handleUpdateQurbanSettings = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true);
    try { const { error } = await supabase.from('qurban_settings').upsert({ id: 1, status: qurbanStatus, harga_kambing: Number(hargaKambing), harga_sapi_patungan: Number(hargaSapiPatungan), harga_sapi_utuh: Number(hargaSapiUtuh), updated_at: new Date().toISOString() }); if (error) throw error; toast.success('Pengaturan qurban disimpan.'); fetchQurbanSettings(); }
    catch (err: any) { toast.error(err.message); } finally { setLoading(false); }
  };

  // ===== HAPUS SATUAN =====
  const handleDeleteRecord = (table: string, id: string, refresh: () => void, label = 'data ini') => {
    ask({ tone: 'danger', title: 'Hapus Permanen', message: `${label} akan dihapus permanen dan TIDAK bisa dikembalikan. Yakin?`, confirmLabel: 'Ya, Hapus', onConfirm: async () => { closeConfirm(); setLoading(true); const { error } = await supabase.from(table).delete().eq('id', id); if (!error) { toast.success('Data dihapus.'); refresh(); } else toast.error(`Gagal menghapus: ${error.message}`); setLoading(false); } });
  };

  // ===== CSV HELPER =====
  const toCSV = (rows: any[]) => {
    const head = ['Tanggal', 'Nama', 'No WA', 'Nominal', 'Kampanye', 'Status', 'Metode', 'Doa'];
    const esc = (v: any) => `"${String(v ?? '').replace(/"/g, '""')}"`;
    const body = rows.map(d => [new Date(d.created_at).toLocaleDateString('id-ID'), esc(d.name), esc(d.phone), d.amount, esc(d.program_title), esc(d.status), esc(d.payment_method), esc(d.message)].join(','));
    return 'data:text/csv;charset=utf-8,\uFEFF' + [head.join(','), ...body].join('\n');
  };
  const triggerDownload = (csv: string, name: string) => { const a = document.createElement('a'); a.href = encodeURI(csv); a.download = name; document.body.appendChild(a); a.click(); a.remove(); };
  const stamp = () => new Date().toISOString().slice(0, 10).replace(/-/g, '');

  // ===== BERSIHKAN RIWAYAT AMAN (backup dulu, hapus hanya donasi program yg valid) =====
  const backupAndClearVerified = async () => {
    setLoading(true);
    const { data } = await supabase.from('donations').select('*').eq('status', 'LUNAS').not('program_id', 'is', null);
    setLoading(false);
    if (!data || data.length === 0) return toast.error('Tidak ada riwayat program terverifikasi untuk dibersihkan.');
    triggerDownload(toCSV(data), `Backup_Riwayat_Program_${stamp()}.csv`);
    ask({
      tone: 'warn', title: 'Bersihkan Riwayat Program Terverifikasi',
      message: `File Excel backup (${data.length} baris) sudah tersimpan di komputer Anda. Tindakan ini menghapus catatan donasi PROGRAM yang sudah valid dari sistem. Angka dashboard & progress kampanye TIDAK berubah, karena sudah tercatat di masing-masing kampanye. Donasi sedekah umum/operasional tetap aman.`,
      confirmLabel: 'Ya, Bersihkan Riwayat',
      onConfirm: async () => { closeConfirm(); setLoading(true); const { error } = await supabase.from('donations').delete().eq('status', 'LUNAS').not('program_id', 'is', null); if (!error) { toast.success('Riwayat program terverifikasi dibersihkan. Backup Excel sudah Anda pegang.'); reloadDon(); } else toast.error(`Gagal: ${error.message}`); setLoading(false); },
    });
  };

  // ===== RESET BAHAYA (backup semua + wajib ketik RESET + nol-kan progress) =====
  const resetAll = async () => {
    setLoading(true);
    const { data } = await supabase.from('donations').select('*');
    setLoading(false);
    if (data && data.length) triggerDownload(toCSV(data), `Backup_SEMUA_Donasi_${stamp()}.csv`);
    ask({
      tone: 'danger', title: 'RESET SELURUH DATA — SANGAT BAHAYA', requireText: 'RESET',
      message: 'Ini menghapus SEMUA catatan donasi (termasuk sedekah umum) DAN mengosongkan progress SEMUA kampanye menjadi Rp 0. File backup sudah diunduh otomatis. Tindakan ini TIDAK BISA dibatalkan. Ketik RESET di kotak bawah untuk mengaktifkan tombol.',
      confirmLabel: 'Reset Sekarang',
      onConfirm: async () => {
        closeConfirm(); setLoading(true);
        const { error: e1 } = await supabase.from('donations').delete().neq('status', 'PROTECT_X');
        const { error: e2 } = await supabase.from('programs').update({ terkumpul: 0 });
        if (!e1 && !e2) { toast.success('Seluruh data di-reset ke nol.'); loadAll(); } else toast.error('Gagal reset sebagian.');
        setLoading(false);
      },
    });
  };

  // ===== VALIDASI DONASI =====
  const validateDonation = (don: any) => {
    ask({ tone: 'info', title: 'Tandai Donasi Lunas', message: `Menandai donasi Rp ${don.amount.toLocaleString('id-ID')} dari ${don.name} sebagai LUNAS. Progress kampanye terkait akan bertambah otomatis.`, confirmLabel: 'Ya, Tandai Lunas', onConfirm: async () => {
      closeConfirm(); setLoading(true);
      try {
        const { error } = await supabase.from('donations').update({ status: 'LUNAS', verified_at: new Date().toISOString(), verified_by: session.user.email }).eq('id', don.id);
        if (error) throw error;
        toast.success('Donasi ditandai lunas.');
        reloadDon();
      } catch (err: any) { toast.error(`Gagal: ${err.message}`); } finally { setLoading(false); }
    } });
  };

  // ===== LOGIN SCREEN =====
  if (!session) return (
    <div className="fixed inset-0 z-[999999] bg-slate-950 flex items-center justify-center px-6 font-sans text-slate-100 w-screen h-screen">
      <form onSubmit={handleLogin} className="w-full max-w-md bg-slate-900/80 backdrop-blur-md p-8 rounded-[2rem] border border-slate-800 shadow-2xl space-y-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 via-emerald-500 to-teal-600" />
        <div className="text-center space-y-2">
          <div className="w-14 h-14 bg-teal-950 border border-teal-800/50 rounded-2xl flex items-center justify-center mx-auto"><ShieldCheck className="w-7 h-7 text-teal-400" /></div>
          <h1 className="text-xl font-black text-white tracking-tight">YAMU Peduli</h1>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Halaman Masuk Admin</p>
        </div>
        <div className="space-y-4">
          <input type="email" required suppressHydrationWarning autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email admin" className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3.5 px-4 text-sm font-bold focus:outline-none text-white focus:border-teal-500" />
          <div className="relative">
            <input type={showPassword ? 'text' : 'password'} required suppressHydrationWarning autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Kata sandi" className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3.5 pl-4 pr-12 text-sm font-bold focus:outline-none text-white focus:border-teal-500" />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-3.5 text-slate-500 hover:text-slate-300">{showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button>
          </div>
        </div>
        <button type="submit" disabled={loading} className="w-full py-4 bg-teal-600 hover:bg-teal-500 font-black rounded-xl text-xs uppercase tracking-wider text-white flex items-center justify-center gap-2">{loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><LogIn className="w-4 h-4" /> Masuk</>}</button>
      </form>
    </div>
  );

  const totalPages = Math.max(1, Math.ceil(donCount / PER_PAGE));
  const waitingCount = donRows.filter(d => d.status !== 'LUNAS').length; // indikator halaman ini

  return (
    <div className="fixed inset-0 z-[99998] bg-slate-50 font-sans flex text-slate-800 antialiased w-screen h-screen overflow-hidden">
      {/* SIDEBAR */}
      <div className="w-64 bg-slate-950 text-slate-400 p-6 flex flex-col gap-6 shrink-0 border-r border-slate-900 shadow-2xl h-full select-none">
        <div className="pb-4 border-b border-slate-900">
          <h1 className="text-white font-black text-lg tracking-tight flex items-center gap-2">YAMU <span className="text-teal-400 font-medium text-xs bg-teal-950 border border-teal-900 px-2 py-0.5 rounded">Admin</span></h1>
          <span className="text-[9px] uppercase font-bold text-slate-500 tracking-widest flex items-center gap-1 mt-1.5"><ShieldCheck className="w-3.5 h-3.5 text-teal-500" /> Administrator</span>
        </div>
        <div className="flex flex-col gap-1.5 flex-grow text-xs font-bold">
          <button onClick={() => setActiveMenu('dashboard')} className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all ${activeMenu === 'dashboard' ? 'bg-teal-600 text-white shadow-md' : 'hover:bg-slate-900 hover:text-white'}`}><LayoutDashboard className="w-4 h-4" /> Ringkasan</button>
          <button onClick={() => setActiveMenu('program')} className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all ${activeMenu === 'program' ? 'bg-teal-600 text-white shadow-md' : 'hover:bg-slate-900 hover:text-white'}`}><PlusCircle className="w-4 h-4" /> Kelola Program</button>
          <button onClick={() => setActiveMenu('berita')} className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all ${activeMenu === 'berita' ? 'bg-teal-600 text-white shadow-md' : 'hover:bg-slate-900 hover:text-white'}`}><FileText className="w-4 h-4" /> Berita & Video</button>
          <button onClick={() => setActiveMenu('donasi')} className={`flex items-center justify-between px-4 py-3.5 rounded-xl transition-all ${activeMenu === 'donasi' ? 'bg-teal-600 text-white shadow-md' : 'hover:bg-slate-900 hover:text-white'}`}>
            <span className="flex items-center gap-3"><Coins className="w-4 h-4" /> Konfirmasi Donasi</span>
          </button>
          <button onClick={() => setActiveMenu('qurban')} className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all ${activeMenu === 'qurban' ? 'bg-teal-600 text-white shadow-md' : 'hover:bg-slate-900 hover:text-white'}`}><Settings className="w-4 h-4" /> Pengaturan Qurban</button>
        </div>
        <button onClick={handleLogout} className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl font-black text-xs text-rose-400 hover:bg-rose-950/30 border border-rose-950/20 transition-colors uppercase tracking-wider"><LogOut className="w-4 h-4" /> Keluar</button>
      </div>

      <div className="flex-grow p-6 md:p-10 overflow-y-auto h-full">
        {/* ===== RINGKASAN ===== */}
        {activeMenu === 'dashboard' && (
          <div className="space-y-8 max-w-5xl">
            <div className="bg-gradient-to-r from-teal-950 via-slate-900 to-teal-950 rounded-[2rem] p-8 md:p-10 shadow-xl text-white relative overflow-hidden border border-slate-900">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-500/10 text-teal-400 font-bold text-[9px] rounded-lg uppercase tracking-widest border border-teal-500/20 mb-2">Panel Aktif</span>
              <h2 className="text-2xl md:text-3xl font-black tracking-tight">Selamat datang, Tim YAMU 👋</h2>
              <p className="text-teal-100/70 text-sm mt-2">Ringkasan singkat kondisi yayasan hari ini.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm flex flex-col justify-between h-36"><span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2"><BarChart3 className="w-4 h-4 text-teal-600" /> Total Dana Terverifikasi</span><span className="text-2xl font-black text-slate-900">Rp {totalValid.toLocaleString('id-ID')}</span></div>
              <div className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm flex flex-col justify-between h-36"><span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2"><PlusCircle className="w-4 h-4 text-amber-500" /> Program Aktif</span><span className="text-3xl font-black text-slate-900">{programs.length}</span></div>
              <div className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm flex flex-col justify-between h-36"><span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2"><FileText className="w-4 h-4 text-blue-500" /> Berita & Video Tayang</span><span className="text-3xl font-black text-slate-900">{articles.length}</span></div>
            </div>
            <div className="bg-white rounded-[2rem] p-6 md:p-8 border border-slate-200/60 shadow-sm">
              <div className="flex justify-between items-center mb-6"><h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2"><Clock className="w-4 h-4 text-teal-600" /> 5 Donasi Terbaru</h3><button onClick={() => setActiveMenu('donasi')} className="text-[10px] font-black uppercase tracking-wider text-slate-500 hover:text-teal-600 bg-slate-50 px-3 py-2 rounded-xl border border-slate-100">Buka Semua</button></div>
              <div className="space-y-3">
                {recentDonations.map(don => (
                  <div key={don.id} className="flex justify-between items-center p-4 bg-slate-50/50 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-4 flex-grow truncate">
                      {don.status === 'LUNAS' ? <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0"><CheckCircle2 className="w-4 h-4" /></div> : <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center shrink-0 animate-pulse"><AlertCircle className="w-4 h-4" /></div>}
                      <div className="truncate"><span className="font-bold text-slate-800 block text-sm truncate">{don.name} — Rp {don.amount.toLocaleString('id-ID')}</span><span className="text-[10px] text-slate-400 font-bold">{new Date(don.created_at).toLocaleDateString('id-ID')} • {don.program_title}</span></div>
                    </div>
                    {don.status !== 'LUNAS' && <span className="text-[8px] bg-rose-100 text-rose-700 px-2 py-0.5 rounded font-black uppercase tracking-wider border border-rose-200/50 shrink-0 ml-3">Perlu Dicek</span>}
                  </div>
                ))}
                {recentDonations.length === 0 && <p className="text-center text-xs font-bold text-slate-400 py-10">Belum ada donasi masuk.</p>}
              </div>
            </div>
          </div>
        )}

        {/* ===== PROGRAM ===== */}
        {activeMenu === 'program' && (
          <div className="space-y-8 max-w-5xl">
            <div className={`bg-white rounded-[2rem] p-6 md:p-8 shadow-xl border ${isEditingProg ? 'ring-4 ring-amber-500/20 border-amber-300' : 'border-slate-200/60'}`}>
              <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4"><h2 className="text-base font-black text-slate-900">{isEditingProg ? '✏️ Edit Program' : '➕ Buat Program Baru'}</h2>{isEditingProg && <button onClick={cancelEditProg} className="text-[10px] font-black uppercase tracking-wider text-slate-500 hover:text-slate-800 bg-slate-100 px-4 py-2 rounded-xl">Batal</button>}</div>
              <form onSubmit={handleSaveProgram} className="space-y-5">
                <div className="space-y-1.5"><label className="text-xs font-bold text-slate-500">Judul Program *</label><input type="text" required value={progTitle} onChange={e => setProgTitle(e.target.value)} className="w-full bg-slate-50 border border-slate-200 p-3.5 rounded-xl focus:outline-none focus:border-teal-500 text-slate-800 font-bold" /></div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-1.5"><label className="text-xs font-bold text-slate-500">Kategori *</label><input type="text" required value={progCategory} onChange={e => setProgCategory(e.target.value)} className="w-full bg-slate-50 border border-slate-200 p-3.5 rounded-xl focus:outline-none focus:border-teal-500 text-slate-800 font-bold" /></div>
                  <div className="space-y-1.5"><label className="text-xs font-bold text-slate-500">Target (Rp) *</label><input type="number" required value={progTarget} onChange={e => setProgTarget(e.target.value)} className="w-full bg-slate-50 border border-slate-200 p-3.5 rounded-xl focus:outline-none focus:border-teal-500 text-slate-800 font-bold" /></div>
                </div>
                <div className="space-y-1.5"><label className="text-xs font-bold text-slate-500">Foto Sampul *</label>
                  <div className="border-2 border-dashed border-slate-200 p-6 rounded-xl bg-slate-50 relative cursor-pointer hover:border-teal-500 flex flex-col items-center"><input type="file" accept="image/*" required={!isEditingProg} onChange={e => setProgFile(e.target.files?.[0] || null)} className="absolute inset-0 opacity-0 cursor-pointer" /><Upload className="w-5 h-5 text-slate-400 mb-2" /><span className="text-slate-600 text-sm">{progFile ? <span className="text-teal-600 font-black">✓ {progFile.name}</span> : 'Klik atau tarik foto ke sini'}</span></div>
                </div>
                <div className="space-y-1.5"><label className="text-xs font-bold text-slate-500">Cerita / Deskripsi *</label><textarea rows={8} required value={progDesc} onChange={e => setProgDesc(e.target.value)} className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl focus:outline-none focus:border-teal-500 text-slate-800 font-medium" /></div>
                <button type="submit" disabled={loading} className={`w-full py-4 text-white rounded-xl shadow-md flex items-center justify-center gap-2 font-black text-xs uppercase tracking-wider ${isEditingProg ? 'bg-amber-500 text-slate-900' : 'bg-teal-600'}`}>{loading ? <Loader2 className="w-4 h-4 animate-spin" /> : (isEditingProg ? 'Simpan Perubahan' : 'Terbitkan Program')}</button>
              </form>
            </div>
            <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-xl border border-slate-200/60">
              <h3 className="font-bold text-xs text-slate-400 uppercase tracking-wider mb-4">Daftar Program</h3>
              <div className="space-y-4">
                {programs.map(p => (
                  <div key={p.id} className="flex flex-col lg:flex-row justify-between p-5 rounded-2xl border bg-white shadow-sm hover:border-teal-200 gap-4">
                    <div className="space-y-1"><span className="font-black text-slate-900 text-base block break-words">{p.title}</span><span className="text-[9px] bg-slate-100 text-slate-600 font-black px-2 py-0.5 rounded uppercase tracking-wider">{p.category}</span><p className="text-[11px] text-slate-400 font-bold pt-1.5">Terkumpul: <span className="text-teal-600 font-black">Rp {(p.terkumpul || 0).toLocaleString('id-ID')}</span> / Rp {p.target.toLocaleString('id-ID')}</p></div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <button onClick={() => handleManualDonation(p.id, p.terkumpul || 0)} className="px-3 py-2 text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-xl text-xs font-black"><Coins className="w-3.5 h-3.5 inline mr-1" /> Tambah Tunai</button>
                      <button onClick={() => handleToggleStatus(p.id, p.status || 'Aktif')} className="p-2 text-blue-600 bg-blue-50 border border-blue-100 rounded-xl" title="Ganti status">{p.status === 'Selesai' ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}</button>
                      <button onClick={() => startEditProg(p)} className="p-2 text-amber-600 bg-amber-50 border border-amber-100 rounded-xl" title="Edit"><Edit className="w-4 h-4" /></button>
                      <button onClick={() => handleDeleteRecord('programs', p.id, fetchPrograms, 'Program ini')} className="p-2 text-rose-600 bg-rose-50 border border-rose-100 rounded-xl" title="Hapus"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                ))}
                {programs.length === 0 && <p className="text-center text-xs font-bold text-slate-400 py-8">Belum ada program.</p>}
              </div>
            </div>
          </div>
        )}

        {/* ===== BERITA ===== */}
        {activeMenu === 'berita' && (
          <div className="space-y-8 max-w-5xl">
            <div className={`bg-white rounded-[2rem] p-6 md:p-8 shadow-xl border ${isEditingNews ? 'ring-4 ring-amber-500/20 border-amber-300' : 'border-slate-200/60'}`}>
              <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4"><h2 className="text-base font-black text-slate-900">{isEditingNews ? '✏️ Edit Publikasi' : '➕ Buat Berita / Video'}</h2>{isEditingNews && <button onClick={cancelEditNews} className="text-[10px] font-black uppercase tracking-wider text-slate-500 hover:text-slate-800 bg-slate-100 px-4 py-2 rounded-xl">Batal</button>}</div>
              <form onSubmit={handleAddNews} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-4">
                  <div><label className="text-xs font-bold text-slate-500">Judul *</label><input type="text" required value={newsTitle} onChange={e => setNewsTitle(e.target.value)} className="w-full bg-slate-50 border border-slate-200 p-3.5 rounded-xl font-bold mt-1.5 focus:outline-none focus:border-teal-500 text-slate-800" /></div>
                  <div><label className="text-xs font-bold text-slate-500">Kategori *</label><input type="text" required value={newsCategory} onChange={e => setNewsCategory(e.target.value)} className="w-full bg-slate-50 border border-slate-200 p-3.5 rounded-xl font-bold mt-1.5 focus:outline-none focus:border-teal-500 text-slate-800" /></div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div><label className="flex items-center gap-2 text-xs font-bold text-slate-500"><ImageIcon className="w-4 h-4" /> Foto Cover</label><div className="border-2 border-dashed border-slate-200 p-4 rounded-xl bg-slate-50 mt-1.5 relative cursor-pointer text-center hover:border-teal-500"><input type="file" onChange={e => setNewsFile(e.target.files?.[0] || null)} className="absolute inset-0 opacity-0 cursor-pointer" /><span className="text-slate-600 text-sm">{newsFile ? <span className="text-teal-600 font-black">{newsFile.name}</span> : 'Pilih gambar'}</span></div></div>
                  <div><label className="flex items-center gap-2 text-xs font-bold text-slate-500"><Video className="w-4 h-4" /> Tautan Video (opsional)</label><input type="text" value={newsVideoUrl} onChange={e => setNewsVideoUrl(e.target.value)} placeholder="Link YouTube / .mp4" className="w-full bg-slate-50 border border-slate-200 p-3.5 rounded-xl font-bold mt-1.5 focus:outline-none focus:border-teal-500 text-slate-800" /><p className="text-[9px] text-slate-400 mt-1">Kosongkan untuk artikel teks biasa.</p></div>
                </div>
                <div><label className="text-xs font-bold text-slate-500">Isi Artikel *</label><textarea rows={6} required value={newsSnippet} onChange={e => setNewsSnippet(e.target.value)} className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl font-medium mt-1.5 focus:outline-none focus:border-teal-500 text-slate-800" /></div>
                <button type="submit" disabled={loading} className={`w-full py-4 text-white rounded-xl font-black text-xs uppercase tracking-wider shadow-md ${isEditingNews ? 'bg-amber-500 text-slate-900' : 'bg-teal-600 hover:bg-teal-500'}`}>{loading ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : (isEditingNews ? 'Simpan Perubahan' : 'Terbitkan')}</button>
              </form>
            </div>
            <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-xl border border-slate-200/60">
              <h3 className="font-bold text-xs text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-100 pb-4">Daftar Publikasi</h3>
              <div className="space-y-3">
                {articles.map(a => (
                  <div key={a.id} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-teal-300 gap-3">
                    <div className="flex items-center gap-3 min-w-0">{a.video_url ? <Video className="w-5 h-5 text-rose-500 shrink-0" /> : <FileText className="w-5 h-5 text-teal-600 shrink-0" />}<div className="font-bold text-sm text-slate-800 truncate">{a.title}</div></div>
                    <div className="flex items-center gap-2 shrink-0"><button onClick={() => startEditNews(a)} className="p-2 text-amber-600 bg-amber-50 border border-amber-100 rounded-xl"><Edit className="w-4 h-4" /></button><button onClick={() => handleDeleteRecord('articles', a.id, fetchArticles, 'Publikasi ini')} className="p-2 text-rose-600 bg-rose-100 hover:bg-rose-200 rounded-xl"><Trash2 className="w-4 h-4" /></button></div>
                  </div>
                ))}
                {articles.length === 0 && <p className="text-center text-xs font-bold text-slate-400 py-8">Belum ada publikasi.</p>}
              </div>
            </div>
          </div>
        )}

        {/* ===== KONFIRMASI DONASI (pagination + aman) ===== */}
        {activeMenu === 'donasi' && (
          <div className="bg-white rounded-[2rem] p-5 md:p-8 shadow-xl border border-slate-200/60 space-y-6 max-w-6xl">
            <div className="flex flex-col gap-4 border-b border-slate-100 pb-4">
              <div><h2 className="text-base font-black text-slate-900">Konfirmasi Donasi Masuk</h2><p className="text-xs text-slate-500 mt-1">Cek bukti transfer, lalu tandai lunas. Data ditampilkan per halaman agar tetap cepat walau datanya banyak.</p></div>
              {/* Filter + cari */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1"><Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" /><input type="text" placeholder="Cari nama donatur..." value={donSearchInput} onChange={e => setDonSearchInput(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-11 pr-4 text-sm font-bold focus:outline-none focus:border-teal-500 text-slate-800" /></div>
                <div className="flex gap-2">
                  {(['semua', 'menunggu', 'valid'] as const).map(f => <button key={f} onClick={() => { setDonFilter(f); setDonPage(1); }} className={`px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider border-2 transition-all ${donFilter === f ? 'bg-teal-600 border-teal-600 text-white' : 'bg-white border-slate-200 text-slate-500 hover:border-teal-300'}`}>{f === 'semua' ? 'Semua' : f === 'menunggu' ? 'Perlu Dicek' : 'Sudah Valid'}</button>)}
                </div>
              </div>
            </div>

            {/* Tombol aksi: AMAN vs BAHAYA, terpisah jelas */}
            <div className="grid sm:grid-cols-2 gap-3">
              <button onClick={backupAndClearVerified} className="flex items-center justify-center gap-2 px-4 py-3 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700 font-black text-xs rounded-xl transition-colors"><Archive className="w-4 h-4" /> Unduh Excel & Bersihkan Riwayat Program</button>
              <button onClick={resetAll} className="flex items-center justify-center gap-2 px-4 py-3 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 font-black text-xs rounded-xl transition-colors"><AlertTriangle className="w-4 h-4" /> Reset Seluruh Data (Bahaya)</button>
            </div>

            {/* Daftar: tabel di desktop, kartu di HP */}
            <p className="text-[11px] font-bold text-slate-400">Menampilkan {donRows.length ? (donPage - 1) * PER_PAGE + 1 : 0}–{Math.min(donPage * PER_PAGE, donCount)} dari <span className="text-slate-700">{donCount}</span> data</p>

            {/* Desktop table */}
            <div className="hidden md:block border border-slate-200 rounded-2xl overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 font-black border-b text-[9px] text-slate-400 uppercase tracking-widest"><tr><th className="p-4">Tanggal</th><th className="p-4">Donatur & Doa</th><th className="p-4">Nominal</th><th className="p-4">Bukti</th><th className="p-4">Kampanye</th><th className="p-4 text-center">Aksi</th></tr></thead>
                <tbody className="divide-y text-slate-600 font-medium">
                  {donRows.map(don => (
                    <tr key={don.id} className={don.status !== 'LUNAS' ? 'bg-amber-50/30' : 'hover:bg-slate-50/30'}>
                      <td className="p-4 text-slate-400 font-bold whitespace-nowrap">{new Date(don.created_at).toLocaleDateString('id-ID')}</td>
                      <td className="p-4"><div className="font-black text-slate-900 text-xs">{don.name}</div><div className="text-[10px] text-slate-400 font-bold">{don.phone || '—'}</div>{don.message && <div className="mt-2 p-2.5 bg-teal-50/60 border border-teal-100 rounded-lg text-[10px] text-teal-800 flex items-start gap-2"><MessageSquare className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" /><span className="break-words">"{don.message}"</span></div>}</td>
                      <td className="p-4 text-teal-600 font-black whitespace-nowrap">Rp {don.amount.toLocaleString('id-ID')}</td>
                      <td className="p-4">{signedUrls[don.id] ? <button onClick={() => window.open(signedUrls[don.id], '_blank')} className="w-12 h-12 rounded-lg overflow-hidden border-2 border-slate-200 hover:border-teal-500"><img src={signedUrls[don.id]} alt="bukti" className="w-full h-full object-cover" /></button> : <span className="text-[10px] text-slate-400">—</span>}</td>
                      <td className="p-4"><span className="text-slate-800 font-bold block break-words">{don.program_title}</span><div className="pt-1.5">{don.status === 'LUNAS' ? <span className="text-[8px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded font-black uppercase tracking-wider border border-emerald-200">Sudah Valid</span> : <span className="text-[8px] bg-rose-100 text-rose-700 px-2 py-0.5 rounded font-black uppercase tracking-wider border border-rose-200">Perlu Dicek</span>}</div></td>
                      <td className="p-4"><div className="flex items-center justify-center gap-2">{don.status !== 'LUNAS' && <button onClick={() => validateDonation(don)} className="px-2.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-lg text-[9px] uppercase tracking-wider flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Tandai Lunas</button>}<button onClick={() => handleDeleteRecord('donations', don.id, reloadDon, 'Donasi ini')} className="p-2 text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl"><Trash2 className="w-4 h-4" /></button></div></td>
                    </tr>
                  ))}
                  {donRows.length === 0 && <tr><td colSpan={6} className="p-10 text-center font-bold text-slate-400">Tidak ada data pada filter ini.</td></tr>}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden space-y-3">
              {donRows.map(don => (
                <div key={don.id} className={`p-4 rounded-2xl border ${don.status !== 'LUNAS' ? 'bg-amber-50/40 border-amber-200' : 'bg-white border-slate-200'}`}>
                  <div className="flex justify-between items-start gap-3">
                    <div className="min-w-0"><div className="font-black text-slate-900 text-sm break-words">{don.name}</div><div className="text-[10px] text-slate-400 font-bold">{don.phone || '—'} • {new Date(don.created_at).toLocaleDateString('id-ID')}</div></div>
                    <span className="text-teal-600 font-black whitespace-nowrap">Rp {don.amount.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="text-[11px] text-slate-600 font-bold mt-2 break-words">{don.program_title}</div>
                  {don.message && <div className="mt-2 p-2.5 bg-teal-50/60 border border-teal-100 rounded-lg text-[10px] text-teal-800">"{don.message}"</div>}
                  {signedUrls[don.id] && <button onClick={() => window.open(signedUrls[don.id], '_blank')} className="mt-2 w-16 h-16 rounded-lg overflow-hidden border-2 border-slate-200"><img src={signedUrls[don.id]} alt="bukti" className="w-full h-full object-cover" /></button>}
                  <div className="flex items-center gap-2 mt-3">
                    {don.status !== 'LUNAS' ? <button onClick={() => validateDonation(don)} className="flex-1 px-3 py-2.5 bg-emerald-600 text-white font-black rounded-lg text-[10px] uppercase tracking-wider flex items-center justify-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Tandai Lunas</button> : <span className="flex-1 text-center text-[9px] bg-emerald-100 text-emerald-700 px-2 py-2 rounded-lg font-black uppercase tracking-wider">Sudah Valid</span>}
                    <button onClick={() => handleDeleteRecord('donations', don.id, reloadDon, 'Donasi ini')} className="p-2.5 text-rose-600 bg-rose-50 border border-rose-200 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}
              {donRows.length === 0 && <p className="text-center text-xs font-bold text-slate-400 py-10">Tidak ada data pada filter ini.</p>}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-2">
                <button onClick={() => setDonPage(p => Math.max(1, p - 1))} disabled={donPage === 1} className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40"><ChevronLeft className="w-5 h-5" /></button>
                <span className="px-3 text-xs font-bold text-slate-600">Halaman {donPage} dari {totalPages}</span>
                <button onClick={() => setDonPage(p => Math.min(totalPages, p + 1))} disabled={donPage === totalPages} className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40"><ChevronRight className="w-5 h-5" /></button>
              </div>
            )}
          </div>
        )}

        {/* ===== QURBAN ===== */}
        {activeMenu === 'qurban' && (
          <div className="space-y-8 max-w-5xl">
            <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-xl border border-slate-200/60">
              <h2 className="text-base font-black text-slate-900 mb-6 flex items-center gap-2"><Settings className="w-5 h-5 text-teal-600" /> Pengaturan Qurban</h2>
              <form onSubmit={handleUpdateQurbanSettings} className="space-y-6">
                <div className="space-y-2"><label className="text-xs font-bold text-slate-500">Status Operasional *</label>
                  <div className="grid grid-cols-3 gap-3">
                    <button type="button" onClick={() => setQurbanStatus('OFF')} className={`py-3 rounded-xl border text-xs font-bold ${qurbanStatus === 'OFF' ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-600'}`}>OFF</button>
                    <button type="button" onClick={() => setQurbanStatus('ON')} className={`py-3 rounded-xl border text-xs font-bold ${qurbanStatus === 'ON' ? 'bg-emerald-600 text-white' : 'bg-slate-50 text-slate-600'}`}>ON (Live)</button>
                    <button type="button" onClick={() => setQurbanStatus('POST')} className={`py-3 rounded-xl border text-xs font-bold ${qurbanStatus === 'POST' ? 'bg-blue-600 text-white' : 'bg-slate-50 text-slate-600'}`}>POST</button>
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div><label className="text-xs font-bold text-slate-500">Kambing (Rp)</label><input type="number" required value={hargaKambing} onChange={e => setHargaKambing(e.target.value)} className="w-full bg-slate-50 border border-slate-200 p-3.5 rounded-xl font-bold mt-1" /></div>
                  <div><label className="text-xs font-bold text-slate-500">Sapi Patungan (Rp)</label><input type="number" required value={hargaSapiPatungan} onChange={e => setHargaSapiPatungan(e.target.value)} className="w-full bg-slate-50 border border-slate-200 p-3.5 rounded-xl font-bold mt-1" /></div>
                  <div><label className="text-xs font-bold text-slate-500">Sapi Utuh (Rp)</label><input type="number" required value={hargaSapiUtuh} onChange={e => setHargaSapiUtuh(e.target.value)} className="w-full bg-slate-50 border border-slate-200 p-3.5 rounded-xl font-bold mt-1" /></div>
                </div>
                <button type="submit" disabled={loading} className="w-full py-4 bg-teal-600 text-white font-black rounded-xl flex justify-center text-xs uppercase tracking-wider">{loading ? 'Menyimpan...' : 'Simpan Pengaturan'}</button>
              </form>
            </div>
            <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-xl border border-slate-200/60">
              <h3 className="font-bold text-xs text-slate-400 uppercase tracking-wider mb-4">Daftar Shohibul Qurban</h3>
              <div className="border border-slate-200 rounded-2xl overflow-x-auto">
                <table className="min-w-[600px] w-full text-left text-xs">
                  <thead className="bg-slate-50 font-black border-b text-[9px] text-slate-400 uppercase tracking-widest"><tr><th className="p-4">Tgl</th><th className="p-4">Mudhohi</th><th className="p-4">Tipe</th><th className="p-4 text-center">Aksi</th></tr></thead>
                  <tbody className="divide-y text-slate-600 font-medium">
                    {qurbanOrders.map(o => (
                      <tr key={o.id} className={o.status_pembayaran === 'PENDING' ? 'bg-amber-50/20' : ''}>
                        <td className="p-4 text-slate-400">{new Date(o.created_at).toLocaleDateString('id-ID')}</td>
                        <td className="p-4"><div className="font-black text-slate-900 text-xs">{o.nama_mudhohi}</div><div className="text-[10px] text-slate-400">{o.nama_donatur} ({o.nomor_wa})</div></td>
                        <td className="p-4"><span className="px-2.5 py-1 bg-slate-100 text-slate-700 font-black rounded text-[9px] uppercase">{o.tipe_qurban}</span></td>
                        <td className="p-4 text-center"><div className="flex items-center justify-center gap-1.5">{o.status_pembayaran === 'PENDING' && <button onClick={() => ask({ tone: 'info', title: 'Tandai Qurban Lunas', message: `Tandai qurban atas nama ${o.nama_mudhohi} sebagai lunas?`, confirmLabel: 'Ya, Lunas', onConfirm: async () => { closeConfirm(); await supabase.from('qurban_orders').update({ status_pembayaran: 'LUNAS' }).eq('id', o.id); fetchQurbanOrders(); } })} className="px-2.5 py-1.5 bg-emerald-600 text-white rounded-lg text-[9px] uppercase font-black">Lunas</button>}<button onClick={() => handleDeleteRecord('qurban_orders', o.id, () => { fetchQurbanOrders(); loadAll(); }, 'Data qurban ini')} className="p-2 text-rose-500 bg-rose-50 rounded-xl"><Trash2 className="w-3.5 h-3.5" /></button></div></td>
                      </tr>
                    ))}
                    {qurbanOrders.length === 0 && <tr><td colSpan={4} className="p-8 text-center font-bold text-slate-400">Belum ada data qurban.</td></tr>}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ===== MODAL KONFIRMASI ===== */}
      {confirm && (
        <div className="fixed inset-0 z-[9999999] bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={closeConfirm}>
          <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${confirm.tone === 'danger' ? 'bg-rose-100 text-rose-600' : confirm.tone === 'warn' ? 'bg-amber-100 text-amber-600' : 'bg-teal-100 text-teal-600'}`}>
              {confirm.tone === 'danger' ? <AlertTriangle className="w-6 h-6" /> : confirm.tone === 'warn' ? <Archive className="w-6 h-6" /> : <CheckCircle2 className="w-6 h-6" />}
            </div>
            <h3 className="text-lg font-black text-slate-900">{confirm.title}</h3>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">{confirm.message}</p>
            {confirm.requireText && (
              <input type="text" value={confirmText} onChange={e => setConfirmText(e.target.value)} placeholder={`Ketik ${confirm.requireText} di sini`} className="w-full mt-4 bg-slate-50 border-2 border-slate-200 rounded-xl py-3 px-4 text-sm font-bold focus:outline-none focus:border-rose-400 text-slate-800" />
            )}
            <div className="flex gap-3 mt-6">
              <button onClick={closeConfirm} className="flex-1 py-3 rounded-xl border-2 border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50">Batal</button>
              <button onClick={confirm.onConfirm} disabled={!!confirm.requireText && confirmText !== confirm.requireText}
                className={`flex-1 py-3 rounded-xl text-white font-black text-sm disabled:opacity-40 ${confirm.tone === 'danger' ? 'bg-rose-600 hover:bg-rose-500' : confirm.tone === 'warn' ? 'bg-amber-500 hover:bg-amber-400 text-slate-900' : 'bg-teal-600 hover:bg-teal-500'}`}>{confirm.confirmLabel}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}