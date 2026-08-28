'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Calendar, ArrowRight, Loader2, Tag, ChevronLeft, ChevronRight, Filter } from 'lucide-react';

import { supabase } from '@/supabase';

export default function BeritaPage() {
  const [berita, setBerita] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // --- STATE UNTUK SEARCH & FILTER ---
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua Kategori');
  const [selectedYear, setSelectedYear] = useState('Semua Tahun');

  // --- STATE UNTUK PAGINASI (HALAMAN 1,2,3) ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Nampilin 6 berita per halaman biar pas grid-nya (3x2)

  useEffect(() => {
    async function getArticles() {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('articles')
          .select('*')
          .order('created_at', { ascending: false });
        if (!error && data) setBerita(data);
      } catch (err) {
        console.warn('Gagal memuat berita:', err);
      } finally {
        setLoading(false);
      }
    }
    getArticles();
  }, []);

  // --- Reset ke halaman 1 setiap kali user ganti filter ---
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, selectedYear]);

  // --- MENGAMBIL OPSI KATEGORI & TAHUN OTOMATIS DARI DATABASE ---
  const categories = ['Semua Kategori', ...Array.from(new Set(berita.map(item => item.category)))];
  const years = ['Semua Tahun', ...Array.from(new Set(berita.map(item => new Date(item.created_at).getFullYear().toString())))].sort((a, b) => b.localeCompare(a));

  // --- LOGIKA FILTERING (SEARCH + KATEGORI + TAHUN) ---
  const filteredBerita = berita.filter((item) => {
    const term = searchQuery.toLowerCase();
    const matchSearch = item.title.toLowerCase().includes(term) || item.snippet.toLowerCase().includes(term);
    const matchCategory = selectedCategory === 'Semua Kategori' || item.category === selectedCategory;
    
    const itemYear = new Date(item.created_at).getFullYear().toString();
    const matchYear = selectedYear === 'Semua Tahun' || itemYear === selectedYear;

    return matchSearch && matchCategory && matchYear;
  });

  // --- LOGIKA PEMOTONGAN DATA UNTUK PAGINASI ---
  const totalPages = Math.ceil(filteredBerita.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedBerita = filteredBerita.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-teal-500 selection:text-white">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { opacity: 0; animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
      `}} />

      {/* HEADER BANNER */}
      <div className="bg-gradient-to-b from-emerald-900 via-emerald-800 to-emerald-900 pt-8 sm:pt-12 pb-16 px-6 text-center text-white relative overflow-hidden">
        <div className="max-w-3xl mx-auto space-y-3">
          <span className="inline-block px-4 py-1.5 rounded-full border border-amber-400/30 bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-widest backdrop-blur-md animate-fade-in-up">
            Kabar YAMU Peduli
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight animate-fade-in-up delay-100">
            Jejak Langkah Kebaikan
          </h1>
          <p className="text-teal-100/80 text-sm md:text-base max-w-xl mx-auto font-normal animate-fade-in-up delay-200">
            Arsip publikasi, transparansi penyaluran donasi, dan cerita inspiratif dari lapangan.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 -mt-7 relative z-20 pb-24">
        
        {/* ========================================================== */}
        {/* ADVANCED SEARCH ENGINE (FILTERING) */}
        {/* ========================================================== */}
        <div className="bg-white rounded-[2rem] shadow-xl shadow-teal-900/5 border border-slate-200/60 p-5 mb-12 animate-fade-in-up delay-200">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            
            {/* Kolom Pencarian Teks */}
            <div className="relative w-full md:flex-1">
              <input 
                type="text" 
                placeholder="Cari judul berita atau isi..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-12 pr-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all text-slate-800" 
              />
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
            </div>

            {/* Kolom Filter Kategori */}
            <div className="relative w-full md:w-64 shrink-0">
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-11 pr-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-teal-500 appearance-none text-slate-700 cursor-pointer"
              >
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
              <Filter className="w-4 h-4 text-slate-400 absolute left-4 top-4" />
            </div>

            {/* Kolom Filter Tahun */}
            <div className="relative w-full md:w-48 shrink-0">
              <select 
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-11 pr-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-teal-500 appearance-none text-slate-700 cursor-pointer"
              >
                {years.map(yr => <option key={yr} value={yr}>{yr}</option>)}
              </select>
              <Calendar className="w-4 h-4 text-slate-400 absolute left-4 top-4" />
            </div>

          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3 text-slate-400">
            <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
            <span className="text-xs font-bold uppercase tracking-wider">Mencari Arsip Berita...</span>
          </div>
        ) : (
          <div className="space-y-12 animate-fade-in-up">
            
            {/* ========================================================== */}
            {/* GRID ARTIKEL (REDESIGN: VERTIKAL ALA MAJALAH) */}
            {/* ========================================================== */}
            {displayedBerita.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayedBerita.map((item) => {
                // 1. Taruh ini di dalam loop .map() sebelum return card
                const hasVideo = !!item.video_url;

                // FUNGSI REGEX SUPER (Bisa baca format watch, youtu.be, sampai Shorts!)
                const getYouTubeId = (url: string) => {
                  if (!url) return null;
                  const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=|shorts\/)|youtu\.be\/)([^"&?\/\s]{11})/i);
                  return match ? match[1] : null;
                };

                const getYouTubeEmbedUrl = (url: string) => {
                  const id = getYouTubeId(url);
                  return id ? `https://www.youtube.com/embed/${id}` : null;
                };

                const ytId = hasVideo ? getYouTubeId(item.video_url) : null;
                const formattedDate = new Date(item.created_at).toLocaleDateString('id-ID', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                });

                // Logika Prioritas Gambar:
                const thumbnailSrc = item.image_url 
                  ? item.image_url 
                  : (ytId ? `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg` : '/placeholder.jpg');
                return (
                    <Link href={`/berita/${item.id}`} key={item.id} className="group bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col overflow-hidden h-full">
                      
                      {/* FOTO SAMPUL & MEDIA PLAYER */}
                      <div className="w-full aspect-video relative bg-slate-900">
                        {hasVideo ? (
                          item.video_url.includes('youtu') ? (
                            <iframe 
                              src={getYouTubeEmbedUrl(item.video_url)!} 
                              title={item.title}
                              className="w-full h-full absolute inset-0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                              allowFullScreen
                            />
                          ) : (
                            <video controls className="w-full h-full object-cover absolute inset-0">
                              <source src={item.video_url} type="video/mp4" />
                              Browser Anda tidak mendukung tag video.
                            </video>
                          )
                        ) : (
                          <img 
                            src={item.image_url || '/placeholder.jpg'} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                            alt={item.title} 
                          />
                        )}
                      </div>
                      
                      {/* Content Body */}
                      <div className="p-6 flex flex-col flex-grow">
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-3">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{formattedDate}</span>
                        </div>
                        <h3 className="text-lg md:text-xl font-black text-slate-900 mb-3 group-hover:text-teal-600 transition-colors leading-snug line-clamp-2">
                          {item.title}
                        </h3>
                        <p className="text-sm text-slate-500 leading-relaxed font-medium line-clamp-3 mb-6">
                          {item.snippet}
                        </p>
                        
                        {/* Footer Card */}
                        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-bold text-teal-600 group-hover:text-teal-500 transition-colors">
                          Baca Selengkapnya <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>

                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="py-16 text-center bg-white rounded-3xl border border-dashed border-slate-300 shadow-sm">
                <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4"><Search className="w-8 h-8" /></div>
                <h3 className="text-lg font-black text-slate-900 mb-1">Berita Tidak Ditemukan</h3>
                <p className="text-sm text-slate-500 font-medium">Coba gunakan kata kunci atau filter lain untuk pencarian Anda.</p>
              </div>
            )}

            {/* ========================================================== */}
            {/* SISTEM PAGINASI ANGKA (1, 2, 3...) */}
            {/* ========================================================== */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-8">
                
                {/* Tombol Previous */}
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-teal-600 disabled:opacity-50 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Angka Paginasi Dinamis */}
                {[...Array(totalPages)].map((_, index) => {
                  const pageNumber = index + 1;
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => setCurrentPage(pageNumber)}
                      className={`w-10 h-10 flex items-center justify-center rounded-xl font-bold text-sm transition-all ${
                        currentPage === pageNumber 
                          ? 'bg-teal-600 text-white shadow-md shadow-teal-600/20' 
                          : 'border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-teal-600'
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}

                {/* Tombol Next */}
                <button 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-teal-600 disabled:opacity-50 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-all"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                
              </div>
            )}

          </div>
        )}
      </div>
    </div>
  );
}