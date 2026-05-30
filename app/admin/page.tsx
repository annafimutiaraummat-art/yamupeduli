'use client';

import { useState, useEffect } from 'react';
import { 
  LayoutDashboard, FileText, Upload, PlusCircle, 
  Coins, ShieldCheck, LogIn, LogOut, Loader2, 
  Trash2, Edit, Download, BarChart3, CheckCircle2, Eye, EyeOff, Save
} from 'lucide-react';

import { createClient } from '@supabase/supabase-js';
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function AdminPanel() {
  const [session, setSession] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeMenu, setActiveMenu] = useState<'dashboard' | 'program' | 'berita' | 'donasi'>('dashboard');
  const [statusMessage, setStatusMessage] = useState({ text: '', isError: false });
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
  
  // Form States Berita
  const [newsTitle, setNewsTitle] = useState(''); 
  const [newsCategory, setNewsCategory] = useState(''); 
  const [newsSnippet, setNewsSnippet] = useState(''); 
  const [newsFile, setNewsFile] = useState<File | null>(null);

  // Live Database States
  const [liveDonations, setLiveDonations] = useState<any[]>([]);
  const [programs, setPrograms] = useState<any[]>([]);
  const [articles, setArticles] = useState<any[]>([]);

  useEffect(() => {
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) setEnvError(true);
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, currentSession) => setSession(currentSession));
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => { if (session) loadAllData(); }, [session]);

  const loadAllData = () => { 
    fetchLiveDonations(); 
    fetchPrograms(); 
    fetchArticles(); 
  };

  const fetchLiveDonations = async () => { const { data } = await supabase.from('donations').select('*').order('created_at', { ascending: false }); if (data) setLiveDonations(data); };
  const fetchPrograms = async () => { const { data } = await supabase.from('programs').select('*').order('created_at', { ascending: false }); if (data) setPrograms(data); };
  const fetchArticles = async () => { const { data } = await supabase.from('articles').select('*').order('created_at', { ascending: false }); if (data) setArticles(data); };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (envError) return setStatusMessage({ text: 'Eror: Variabel .env kosong.', isError: true });
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setStatusMessage({ text: `Akses Ditolak: ${error.message}`, isError: true });
    else if (data?.session) setSession(data.session);
    setLoading(false);
    setTimeout(() => setStatusMessage({ text: '', isError: false }), 4000);
  };
  const handleLogout = async () => { await supabase.auth.signOut(); setSession(null); };

  const showToast = (msg: string, isError = false) => { setStatusMessage({ text: msg, isError }); setTimeout(() => setStatusMessage({ text: '', isError: false }), 4000); };
  
  const uploadImage = async (file: File, folder: string) => {
    const filePath = `${folder}/${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from('yamu-assets').upload(filePath, file);
    if (error) throw error;
    return supabase.storage.from('yamu-assets').getPublicUrl(filePath).data.publicUrl;
  };

  const handleSaveProgram = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEditingProg && !progFile) return showToast('Pilih foto sampul!', true);
    setLoading(true);
    try {
      let finalImgUrl = existingProgImg;
      if (progFile) { finalImgUrl = await uploadImage(progFile, 'programs'); }
      const payload = { title: progTitle, category: progCategory, target: Number(progTarget), description: progDesc, image_url: finalImgUrl };

      if (isEditingProg && editProgId) {
        const { error } = await supabase.from('programs').update(payload).eq('id', editProgId);
        if (error) throw error;
        showToast('✓ Pembaruan data program berhasil disimpan!');
      } else {
        const { error } = await supabase.from('programs').insert([{ ...payload, terkumpul: 0, status: 'Aktif' }]);
        if (error) throw error;
        showToast('✓ Program kampanye baru berhasil diterbitkan!');
      }
      cancelEditProg();
      fetchPrograms();
    } catch (err: any) { showToast(err.message, true); }
    setLoading(false);
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
    const amountStr = window.prompt("Masukkan nominal dana offline/tunai yang ingin ditambahkan (Misal: 500000):");
    if (!amountStr) return;
    const amount = Number(amountStr);
    if (isNaN(amount) || amount <= 0) return showToast('Nominal tidak valid!', true);

    const { error } = await supabase.from('programs').update({ terkumpul: currentTotal + amount }).eq('id', id);
    if (!error) { showToast(`✓ Berhasil menambahkan Rp ${amount.toLocaleString('id-ID')} secara manual.`); fetchPrograms(); }
  };

  const handleToggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'Selesai' ? 'Aktif' : 'Selesai';
    if(!confirm(`Ubah status program ini menjadi ${newStatus}?`)) return;
    const { error } = await supabase.from('programs').update({ status: newStatus }).eq('id', id);
    if (!error) { showToast(`✓ Status diubah menjadi ${newStatus}.`); fetchPrograms(); }
  };

  const handleAddNews = async (e: React.FormEvent) => {
    e.preventDefault(); if (!newsFile) return showToast('Pilih foto berita!', true);
    setLoading(true);
    try {
      const img = await uploadImage(newsFile, 'articles');
      const { error } = await supabase.from('articles').insert([{ title: newsTitle, category: newsCategory, snippet: newsSnippet, image_url: img }]);
      if (error) throw error;
      showToast('✓ Artikel berhasil diterbitkan live!'); setNewsTitle(''); setNewsCategory(''); setNewsSnippet(''); setNewsFile(null); fetchArticles();
    } catch (err: any) { showToast(err.message, true); }
    setLoading(false);
  };

  // LOGIKA HAPUS DIPERBAIKI: Harus nunggu database berhasil dulu baru UI direfresh
  const handleDeleteRecord = async (table: string, id: string, refreshFn: () => void) => {
    if(!confirm('Anda yakin ingin menghapus data ini secara permanen?')) return;
    
    setLoading(true);
    const { error } = await supabase.from(table).delete().eq('id', id);
    
    if (!error) { 
      showToast('✓ Data berhasil dihapus secara permanen.'); 
      refreshFn(); // Refresh UI setelah database sukses menghapus
    } else {
      showToast(`Gagal menghapus: ${error.message}`, true);
    }
    setLoading(false);
  };

  const downloadDonationsCSV = () => {
    if(liveDonations.length === 0) return showToast('Belum ada data donasi.', true);
    const headers = ['Tanggal', 'Nama Donatur', 'Nominal (Rp)', 'Program Kampanye', 'Status'];
    const rows = liveDonations.map(d => [ new Date(d.created_at).toLocaleDateString('id-ID'), `"${d.name}"`, d.amount, `"${d.program_title}"`, `"${d.status}"` ]);
    const csvContent = "data:text/csv;charset=utf-8," + headers.join(',') + "\n" + rows.map(e => e.join(',')).join("\n");
    const link = document.createElement("a"); link.setAttribute("href", encodeURI(csvContent)); link.setAttribute("download", `Laporan_Donasi.csv`);
    document.body.appendChild(link); link.click(); link.remove();
  };

  if (!session) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6 font-sans text-slate-100">
        <form onSubmit={handleLogin} className="w-full max-w-md bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <ShieldCheck className="w-12 h-12 text-teal-500 mx-auto" />
            <h1 className="text-2xl font-black text-white">YAMU Core Security</h1>
          </div>
          {statusMessage.text && <div className={`p-4 text-xs font-bold rounded-xl border ${statusMessage.isError ? 'bg-red-950/50 border-red-800 text-red-400' : 'bg-teal-950/50 border-teal-800 text-teal-400'}`}>{statusMessage.text}</div>}
          <div className="space-y-4">
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email ID Admin" className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3.5 px-4 text-sm font-medium focus:outline-none text-white" />
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3.5 px-4 text-sm font-medium focus:outline-none text-white" />
          </div>
          <button type="submit" disabled={loading} className="w-full py-4 bg-teal-600 hover:bg-teal-500 font-black rounded-xl text-sm flex items-center justify-center gap-2">
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><LogIn className="w-5 h-5" /> Autentikasi Akses</>}
          </button>
        </form>
      </div>
    );
  }

  const LUNASDonations = liveDonations.filter(don => don.status === 'LUNAS');
  const totalDanaTerkumpul = LUNASDonations.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex text-slate-800 antialiased">
      <div className="w-64 bg-slate-950 text-slate-400 p-5 flex flex-col gap-6 shrink-0 border-r border-slate-900 shadow-2xl">
        <div>
          <h1 className="text-white font-black text-lg tracking-tight">YAMU Control</h1>
          <span className="text-[10px] uppercase font-bold text-teal-400 tracking-wider flex items-center gap-1 mt-0.5"><ShieldCheck className="w-3.5 h-3.5" /> Root Akses</span>
        </div>
        <div className="flex flex-col gap-1.5 flex-grow text-xs md:text-sm font-bold">
          <button onClick={() => setActiveMenu('dashboard')} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeMenu === 'dashboard' ? 'bg-teal-600 text-white shadow-md' : 'hover:bg-slate-900 hover:text-white'}`}><LayoutDashboard className="w-4 h-4" /> Beranda</button>
          <button onClick={() => setActiveMenu('program')} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeMenu === 'program' ? 'bg-teal-600 text-white shadow-md' : 'hover:bg-slate-900 hover:text-white'}`}><PlusCircle className="w-4 h-4" /> Kelola Program</button>
          <button onClick={() => setActiveMenu('berita')} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeMenu === 'berita' ? 'bg-teal-600 text-white shadow-md' : 'hover:bg-slate-900 hover:text-white'}`}><FileText className="w-4 h-4" /> Kelola Berita</button>
          <button onClick={() => setActiveMenu('donasi')} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeMenu === 'donasi' ? 'bg-teal-600 text-white shadow-md' : 'hover:bg-slate-900 hover:text-white'}`}><Coins className="w-4 h-4" /> Log Keuangan</button>
        </div>
        <button onClick={handleLogout} className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-xs text-rose-400 hover:bg-rose-950/30 border border-rose-900/30 transition-colors"><LogOut className="w-4 h-4" /> Logout</button>
      </div>

      <div className="flex-grow p-8 md:p-10 overflow-y-auto max-w-5xl">
        
        {statusMessage.text && (
          <div className={`mb-6 p-4 text-sm font-bold rounded-2xl border flex items-center gap-2 ${statusMessage.isError ? 'bg-red-50 border-red-200 text-red-800' : 'bg-teal-50 border-teal-200 text-teal-800'}`}>
            <CheckCircle2 className="w-5 h-5 shrink-0" /> {statusMessage.text}
          </div>
        )}

        {/* TAB 0: DASHBOARD / BERANDA */}
        {activeMenu === 'dashboard' && (
          <div className="space-y-8 animate-fade-in-up">
            <div className="bg-gradient-to-r from-teal-900 to-teal-700 rounded-[2rem] p-8 md:p-10 shadow-xl text-white relative overflow-hidden border border-teal-600/30">
              <div className="absolute top-0 right-0 p-12 opacity-10"><ShieldCheck className="w-48 h-48" /></div>
              <div className="relative z-10 space-y-2">
                <span className="inline-block px-3 py-1 bg-teal-800/50 text-teal-100 font-bold text-[10px] rounded-lg uppercase tracking-widest border border-teal-500/30 mb-2">System Online</span>
                <h2 className="text-3xl md:text-4xl font-black tracking-tight">Selamat Datang di Pusat Kendali</h2>
                <p className="text-teal-100/80 text-sm max-w-xl leading-relaxed">Pantau sirkulasi donasi, kelola kampanye program, dan publikasikan kegiatan yayasan dengan mudah, cepat, dan transparan.</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-[2rem] border shadow-sm flex flex-col justify-between h-40">
                <span className="text-xs font-bold text-slate-400 uppercase flex items-center gap-2"><BarChart3 className="w-4 h-4 text-teal-600" /> Total Donasi Valid</span>
                <span className="text-3xl font-black">Rp {totalDanaTerkumpul.toLocaleString('id-ID')}</span>
              </div>
              <div className="bg-white p-6 rounded-[2rem] border shadow-sm flex flex-col justify-between h-40">
                <span className="text-xs font-bold text-slate-400 uppercase flex items-center gap-2"><LayoutDashboard className="w-4 h-4 text-amber-500" /> Program Berjalan</span>
                <span className="text-4xl font-black">{programs.length} <span className="text-sm font-medium text-slate-400">Kampanye</span></span>
              </div>
              <div className="bg-white p-6 rounded-[2rem] border shadow-sm flex flex-col justify-between h-40">
                <span className="text-xs font-bold text-slate-400 uppercase flex items-center gap-2"><FileText className="w-4 h-4 text-blue-500" /> Publikasi Berita</span>
                <span className="text-4xl font-black">{articles.length} <span className="text-sm font-medium text-slate-400">Artikel Tayang</span></span>
              </div>
            </div>

            <div className="bg-white rounded-[2rem] p-6 md:p-8 border border-slate-200 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-black text-slate-900 flex items-center gap-2"><Coins className="w-5 h-5 text-teal-600" /> 5 Donasi Valid Terbaru</h3>
                <button onClick={() => setActiveMenu('donasi')} className="text-xs font-bold text-slate-500 hover:text-teal-600 bg-slate-100 hover:bg-teal-50 px-3 py-1.5 rounded-lg transition-colors">Lihat Semua &rarr;</button>
              </div>
              <div className="space-y-3">
                {LUNASDonations.slice(0, 5).map(don => (
                  <div key={don.id} className="flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-teal-100 border border-teal-200 flex items-center justify-center text-teal-600 shrink-0"><CheckCircle2 className="w-5 h-5" /></div>
                      <div>
                        <span className="font-bold text-slate-900 block text-sm">{don.name} <span className="text-teal-600 font-black">berdonasi Rp {don.amount.toLocaleString('id-ID')}</span></span>
                        <span className="text-xs text-slate-500 font-medium">{new Date(don.created_at).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'})} • {don.program_title}</span>
                      </div>
                    </div>
                  </div>
                ))}
                {LUNASDonations.length === 0 && ( <p className="text-center text-sm font-bold text-slate-400 py-6 bg-slate-50 rounded-xl border border-dashed border-slate-200">Belum ada donasi valid yang terekam sistem.</p> )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 1: KELOLA PROGRAM */}
        {activeMenu === 'program' && (
          <div className="space-y-8 animate-fade-in-up">
            <div className={`bg-white rounded-[2rem] p-8 shadow-xl border border-slate-200/80 transition-all ${isEditingProg ? 'ring-4 ring-amber-500/20 border-amber-200' : ''}`}>
              <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
                <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                  {isEditingProg ? <><Edit className="w-5 h-5 text-amber-500" /> Edit Mode: Program</> : 'Tulis Kampanye Program Baru'}
                </h2>
                {isEditingProg && <button type="button" onClick={cancelEditProg} className="text-xs font-bold text-slate-500 hover:text-slate-800 bg-slate-100 px-4 py-2 rounded-xl transition-colors">Batalkan Edit</button>}
              </div>
              
              <form onSubmit={handleSaveProgram} className="space-y-5 text-sm font-bold text-slate-500">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Judul Kampanye *</label>
                  <input type="text" required value={progTitle} onChange={(e) => setProgTitle(e.target.value)} placeholder="Masukkan judul..." className="w-full bg-slate-50 border border-slate-200 p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-900" />
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Kategori Bebas *</label>
                    <input type="text" required value={progCategory} onChange={(e) => setProgCategory(e.target.value)} placeholder="Ketik manual..." className="w-full bg-slate-50 border border-slate-200 p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-900" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Target Dana (Rp) *</label>
                    <input type="number" required value={progTarget} onChange={(e) => setProgTarget(e.target.value)} placeholder="Contoh: 10000000" className="w-full bg-slate-50 border border-slate-200 p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-900" />
                  </div>
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Foto Sampul Utama *</label>
                  <div className="border-2 border-dashed border-slate-300 p-6 rounded-xl bg-slate-50 relative cursor-pointer hover:border-teal-500 flex flex-col items-center justify-center transition-all">
                    <input type="file" accept="image/*" required={!isEditingProg} onChange={(e) => setProgFile(e.target.files?.[0] || null)} className="absolute inset-0 opacity-0 cursor-pointer" />
                    <Upload className="w-6 h-6 text-slate-400 mb-2" />
                    <span className="text-slate-600 block text-center">{progFile ? <span className="text-teal-600 font-black">✓ File Siap: {progFile.name}</span> : (isEditingProg ? 'Biarkan kosong jika foto tidak diubah' : 'Klik atau Tarik Foto Kampanye ke Sini')}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Narasi Kampanye (Cerita) *</label>
                  <textarea rows={10} required value={progDesc} onChange={(e) => setProgDesc(e.target.value)} placeholder="Mulai menulis cerita program di sini..." className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 resize-y text-slate-900 font-medium leading-relaxed" />
                </div>
                
                <button type="submit" disabled={loading} className={`w-full py-4 text-white rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 font-black text-sm ${isEditingProg ? 'bg-amber-500 hover:bg-amber-400 text-slate-900' : 'bg-teal-600 hover:bg-teal-500'}`}>
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (isEditingProg ? <><Save className="w-5 h-5" /> Simpan Perubahan</> : 'Terbitkan Program')}
                </button>
              </form>
            </div>

            <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-slate-200/80">
              <h3 className="font-bold text-sm text-slate-400 uppercase tracking-wider mb-4">Database Program Aktif & Selesai</h3>
              <div className="space-y-4">
                {programs.length > 0 ? programs.map(p => (
                  <div key={p.id} className={`flex flex-col lg:flex-row justify-between lg:items-center p-5 rounded-2xl border transition-colors ${p.status === 'Selesai' ? 'bg-slate-50 border-slate-200 opacity-80' : 'bg-white border-slate-200 hover:border-teal-300 shadow-sm'}`}>
                    <div className="mb-4 lg:mb-0 space-y-1">
                      <span className="font-black text-slate-900 text-base md:text-lg block">{p.title}</span>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] bg-slate-100 text-slate-600 font-black px-2.5 py-1 rounded-md uppercase tracking-widest">{p.category}</span>
                        {p.status === 'Selesai' && <span className="text-[10px] bg-amber-100 text-amber-700 font-black px-2.5 py-1 rounded-md uppercase tracking-widest">Selesai</span>}
                      </div>
                      <p className="text-xs text-slate-500 font-bold mt-2">Terkumpul: <span className="text-teal-600 text-sm">Rp {(p.terkumpul || 0).toLocaleString('id-ID')}</span> <span className="mx-1">/</span> Target: Rp {p.target.toLocaleString('id-ID')}</p>
                    </div>
                    
                    <div className="flex items-center gap-2 w-full lg:w-auto overflow-x-auto pb-1 lg:pb-0">
                      <button onClick={() => handleManualDonation(p.id, p.terkumpul || 0)} className="px-4 py-2.5 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-100 rounded-xl flex items-center gap-2 text-xs font-black shrink-0"><Coins className="w-4 h-4" /> <span className="hidden sm:block">Dana Tunai</span></button>
                      <button onClick={() => handleToggleStatus(p.id, p.status || 'Aktif')} className="p-2.5 text-blue-600 bg-blue-50 hover:bg-blue-100 border border-blue-100 rounded-xl shrink-0">{p.status === 'Selesai' ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}</button>
                      <button onClick={() => startEditProg(p)} className="p-2.5 text-amber-600 bg-amber-50 hover:bg-amber-100 border border-amber-100 rounded-xl shrink-0"><Edit className="w-4 h-4" /></button>
                      <button onClick={() => handleDeleteRecord('programs', p.id, fetchPrograms)} className="p-2.5 text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-100 rounded-xl shrink-0"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                )) : <p className="text-sm text-slate-400 font-bold text-center py-6 bg-slate-50 rounded-2xl border border-dashed">Belum ada program di database.</p>}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: KELOLA BERITA */}
        {activeMenu === 'berita' && (
          <div className="space-y-8 animate-fade-in-up">
            <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-slate-200/80">
              <div className="border-b border-slate-100 pb-4 mb-6">
                <h2 className="text-xl font-black text-slate-900">Publikasikan Berita & Artikel Baru</h2>
              </div>
              <form onSubmit={handleAddNews} className="space-y-5 text-sm font-bold text-slate-500">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-1.5"><label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Judul Berita Resmi *</label><input type="text" required value={newsTitle} onChange={(e) => setNewsTitle(e.target.value)} placeholder="Judul..." className="w-full bg-slate-50 border p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-900" /></div>
                  <div className="space-y-1.5"><label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Kategori Berita *</label><input type="text" required value={newsCategory} onChange={(e) => setNewsCategory(e.target.value)} placeholder="Ketik manual..." className="w-full bg-slate-50 border p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-900" /></div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Foto Kegiatan *</label>
                  <div className="border-2 border-dashed border-slate-300 p-6 rounded-xl bg-slate-50 relative cursor-pointer hover:border-teal-500 flex flex-col items-center">
                    <input type="file" accept="image/*" required onChange={(e) => setNewsFile(e.target.files?.[0] || null)} className="absolute inset-0 opacity-0 cursor-pointer" />
                    <Upload className="w-6 h-6 text-slate-400 mb-2" />
                    <span className="text-slate-600 block">{newsFile ? <span className="text-teal-600 font-black">✓ Siap: {newsFile.name}</span> : 'Klik atau Tarik Foto'}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Isi Konten Berita *</label>
                  <textarea rows={8} required value={newsSnippet} onChange={(e) => setNewsSnippet(e.target.value)} placeholder="Tulis berita di sini..." className="w-full bg-slate-50 border p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 resize-y text-slate-900 font-medium leading-relaxed" />
                </div>
                <button type="submit" disabled={loading} className="w-full py-4 text-slate-900 rounded-xl shadow-lg bg-amber-500 hover:bg-amber-400 font-black text-sm flex items-center justify-center gap-2">{loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Save className="w-5 h-5" /> Publikasi Berita</>}</button>
              </form>
            </div>
            
            <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-slate-200/80">
              <h3 className="font-bold text-sm text-slate-400 uppercase tracking-wider mb-4">Database Berita</h3>
              <div className="space-y-3">
                {articles.length > 0 ? articles.map(a => (
                  <div key={a.id} className="flex flex-col sm:flex-row justify-between sm:items-center p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
                    <div className="mb-3 sm:mb-0"><span className="font-black text-slate-900 block mb-1">{a.title}</span><div className="flex items-center gap-2"><span className="text-[10px] bg-slate-100 text-slate-600 font-black px-2.5 py-1 rounded-md uppercase tracking-widest">{a.category}</span><span className="text-xs text-slate-500 font-medium">• {new Date(a.created_at).toLocaleDateString('id-ID')}</span></div></div>
                    <button onClick={() => handleDeleteRecord('articles', a.id, fetchArticles)} className="p-2.5 text-rose-500 bg-rose-50 hover:bg-rose-100 rounded-xl"><Trash2 className="w-4 h-4" /></button>
                  </div>
                )) : <p className="text-sm text-slate-400 text-center py-6">Belum ada berita terpublikasi.</p>}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: LOG KEUANGAN & VALIDASI MANUAL */}
        {activeMenu === 'donasi' && (
          <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-slate-200/80 space-y-6 animate-fade-in-up">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-xl font-black text-slate-900">Validasi Arus Kas Manual</h2>
              </div>
              <button onClick={downloadDonationsCSV} className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-2 transition-all"><Download className="w-4 h-4" /> Download Laporan Excel</button>
            </div>
            
            <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 font-bold border-b text-[10px] text-slate-400 uppercase tracking-wider">
                  <tr><th className="p-4">Tanggal</th><th className="p-4">Donatur</th><th className="p-4">Nominal</th><th className="p-4">Program & Status</th><th className="p-4 text-center">Aksi</th></tr>
                </thead>
                <tbody className="divide-y text-slate-600 font-medium">
                  {liveDonations.length > 0 ? liveDonations.map((don) => (
                    <tr key={don.id} className={`transition-colors ${don.status === 'PENDING' ? 'bg-amber-50/30' : 'hover:bg-slate-50/50'}`}>
                      <td className="p-4 text-xs whitespace-nowrap">{new Date(don.created_at).toLocaleDateString('id-ID')}</td>
                      <td className="p-4 font-bold text-slate-900">{don.name}</td>
                      <td className="p-4 text-teal-600 font-black whitespace-nowrap">Rp {don.amount.toLocaleString('id-ID')}</td>
                      <td className="p-4">
                        <span className="text-slate-700 font-bold truncate max-w-[200px] block">{don.program_title}</span>
                        {don.status === 'PENDING' ? <span className="text-[9px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded font-black uppercase tracking-wider">Pending</span> : <span className="text-[9px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded font-black uppercase tracking-wider">Lunas</span>}
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          {don.status === 'PENDING' && (
                            <button 
                              onClick={async () => {
                                if(!confirm('Yakin dana transfer ini sudah masuk ke rekening?')) return;
                                setLoading(true);
                                const { error: updateErr } = await supabase.from('donations').update({ status: 'LUNAS' }).eq('id', don.id);
                                if (!updateErr) {
                                  // Hanya jalankan RPC penambah dana JIKA donasi tersebut punya program_id
                                  if (don.program_id) {
                                    await supabase.rpc('increment_program_donation', { target_program_id: don.program_id, donation_amount: don.amount });
                                  }
                                  showToast('✓ Donasi tervalidasi!');
                                  fetchLiveDonations();
                                  fetchPrograms();
                                } else {
                                  showToast(`Gagal: ${updateErr?.message}`, true);
                                }
                              }} 
                              className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1 shadow-sm"
                            ><CheckCircle2 className="w-3.5 h-3.5" /> Validasi</button>
                          )}
                          <button onClick={() => handleDeleteRecord('donations', don.id, fetchLiveDonations)} className="p-1.5 text-rose-500 hover:bg-rose-100 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  )) : <tr><td colSpan={5} className="p-8 text-center font-bold text-slate-400">Belum ada donasi masuk.</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}