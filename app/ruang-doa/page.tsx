'use client';

import { useState, useEffect } from 'react';
import { 
  MessageCircle, Heart, Search, Loader2, 
  ChevronLeft, ChevronRight, Quote, Smile
} from 'lucide-react';
import { supabase } from '@/supabase';
import toast from 'react-hot-toast';

export default function RuangDoaPage() {
  const [prayers, setPrayers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  // State untuk menyimpan ID doa yang sudah diaminkan oleh user ini (biar ga spam klik)
  const [clickedAmins, setClickedAmins] = useState<string[]>([]);

  // State Paginasi Angka (1, 2, 3...)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // 9 doa per halaman biar pas berbentuk grid 3x3

  useEffect(() => {
    fetchPrayers();
    
    // Load data doa yang pernah diaminkan dari localStorage biar permanen per device
    const savedAmins = localStorage.getItem('yamu_clicked_amins');
    if (savedAmins) {
      setClickedAmins(JSON.parse(savedAmins));
    }
  }, []);

  // Reset ke halaman 1 tiap kali user mengetik pencarian
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const fetchPrayers = async () => {
    setLoading(true);
    try {
      // Tarik semua donasi yang ada pesan doanya
      const { data, error } = await supabase
        .from('donations')
        .select('id, name, message, amin_count, created_at, program_title')
        .eq('status', 'LUNAS')
        .not('message', 'is', null)
        .neq('message', '')
        .neq('message', 'Menunggu konfirmasi via WA')
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data) setPrayers(data);
    } catch (err: any) {
      console.error("Gagal memuat ruang doa:", err.message);
    } finally {
      setLoading(false);
    }
  };

  // FUNGSI UTAMA: Increment jumlah Aamiin secara Real-time ke Database
  const handleAminSubmit = async (id: string, currentCount: number) => {
    // Proteksi: Kalau sudah pernah klik, batalkan biar tidak spam
    if (clickedAmins.includes(id)) {
      toast('Anda sudah mengaminkan doa ini', { icon: '✨' });
      return;
    }

    // Update secara lokal di UI dulu (Optimistic Update biar kerasa instan tanpa delay)
    setPrayers(prev => prev.map(p => p.id === id ? { ...p, amin_count: (p.amin_count || 0) + 1 } : p));
    
    const newClicked = [...clickedAmins, id];
    setClickedAmins(newClicked);
    localStorage.setItem('yamu_clicked_amins', JSON.stringify(newClicked));

    // Eksekusi update langsung ke Supabase cloud
    const { error } = await supabase
      .from('donations')
      .update({ amin_count: (currentCount || 0) + 1 })
      .eq('id', id);

    if (error) {
      // Rollback jika server error
      setPrayers(prev => prev.map(p => p.id === id ? { ...p, amin_count: currentCount } : p));
      toast.error('Gagal mengaminkan, coba lagi.');
    } else {
      toast.success('Aamiin, doa berhasil diaminkan.', { duration: 1500 });
    }
  };

  // LOGIKA SEARCHING FILTER
  const filteredPrayers = prayers.filter(p => {
    const term = searchQuery.toLowerCase();
    const matchName = (p.name || 'Hamba Allah').toLowerCase().includes(term);
    const matchMessage = p.message.toLowerCase().includes(term);
    const matchProgram = (p.program_title || '').toLowerCase().includes(term);
    return matchName || matchMessage || matchProgram;
  });

  // LOGIKA PEMOTONGAN DATA (PAGINASI)
  const totalPages = Math.ceil(filteredPrayers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedPrayers = filteredPrayers.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased pb-24">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { opacity: 0; animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
      `}} />

      {/* HERO BANNER BANNER */}
      <div className="bg-gradient-to-b from-emerald-900 via-emerald-800 to-emerald-900 pt-8 sm:pt-12 pb-16 px-6 text-center text-white relative overflow-hidden">
        <div className="max-w-3xl mx-auto space-y-3 relative z-10">
          <span className="inline-block px-4 py-1.5 rounded-full border border-teal-500/30 bg-teal-500/20 text-teal-300 text-xs font-bold uppercase tracking-widest backdrop-blur-md animate-fade-in-up">
            Mading Kebaikan Donatur
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight animate-fade-in-up delay-100">
            Dinding Doa & Harapan
          </h1>
          <p className="text-teal-100/70 text-sm md:text-base max-w-xl mx-auto font-medium animate-fade-in-up delay-200">
            Kumpulan baris doa tulus dari para #OrangBaik. Mari rapatkan barisan untuk mengaminkan harapan mereka bersama-sama.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 -mt-7 relative z-20">
        
        {/* BAR SEARCH ENGINE */}
        <div className="bg-white rounded-[2rem] shadow-xl shadow-teal-900/5 border border-slate-200/60 p-4 mb-12 animate-fade-in-up delay-200">
          <div className="relative w-full">
            <input 
              type="text" 
              placeholder="Cari berdasarkan nama donatur atau isi untaian doa..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all text-slate-800" 
            />
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-4" />
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3 text-slate-400">
            <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
            <span className="text-xs font-bold uppercase tracking-wider">Membuka Lembaran Doa...</span>
          </div>
        ) : (
          <div className="space-y-12 animate-fade-in-up">
            
            {/* GRID KARTU DOA (3 KOLOM ELEGAN) */}
            {displayedPrayers.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedPrayers.map((prayer) => {
                  const isAlreadyAmin = clickedAmins.includes(prayer.id);
                  const nameInitials = (prayer.name || 'HA')
                    .split(' ')
                    .map((n: string) => n[0])
                    .slice(0, 2)
                    .join('')
                    .toUpperCase();

                  return (
                    <div 
                      key={prayer.id} 
                      className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-200/60 relative overflow-hidden flex flex-col justify-between group hover:shadow-xl hover:border-teal-100 transition-all duration-300"
                    >
                      {/* Dekorasi Tanda Kutip Cantik */}
                      <Quote className="absolute -top-2 -right-2 w-16 h-16 text-slate-50 pointer-events-none group-hover:text-teal-50/50 transition-colors duration-300 rotate-12" />
                      
                      <div className="relative z-10 mb-6">
                        <p className="text-slate-700 italic text-sm md:text-base leading-relaxed font-medium break-words whitespace-pre-wrap">
                          "{prayer.message}"
                        </p>
                      </div>

                      {/* Footer Kartu Doa */}
                      <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-auto relative z-10">
                        <div className="flex items-center gap-3 max-w-[60%]">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-teal-500 to-teal-700 text-white font-black text-xs flex items-center justify-center shadow-sm uppercase shrink-0">
                            {nameInitials}
                          </div>
                          <div className="truncate">
                            <h4 className="font-black text-slate-900 text-xs md:text-sm capitalize truncate">
                              {prayer.name === 'Hamba Allah' || !prayer.name ? 'Hamba Allah' : prayer.name}
                            </h4>
                            <p className="text-[9px] md:text-[10px] text-slate-400 font-bold mt-0.5 truncate">
                              {new Date(prayer.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })} • {prayer.program_title || 'Sedekah'}
                            </p>
                          </div>
                        </div>

                        {/* TOMBOL AMIN INTERAKTIF */}
                        <button 
                          onClick={() => handleAminSubmit(prayer.id, prayer.amin_count || 0)}
                          className={`flex items-center gap-1.5 px-3.5 py-2 border rounded-xl text-xs font-black transition-all shadow-sm active:scale-95 ${
                            isAlreadyAmin 
                              ? 'bg-rose-50 border-rose-100 text-rose-500 cursor-default' 
                              : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-rose-500 hover:bg-rose-50 hover:border-rose-100'
                          }`}
                        >
                          <Heart className={`w-3.5 h-3.5 ${isAlreadyAmin ? 'fill-current text-rose-500' : ''}`} />
                          <span>{prayer.amin_count || 0} <span className="font-bold text-[10px] ml-0.5">{isAlreadyAmin ? 'Diamiinkan' : 'Aamiin'}</span></span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-16 text-center bg-white rounded-3xl border border-dashed border-slate-300 shadow-sm">
                <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4"><MessageCircle className="w-8 h-8" /></div>
                <h3 className="text-lg font-black text-slate-900 mb-1">Doa Tidak Ditemukan</h3>
                <p className="text-sm text-slate-500 font-medium">Coba cari dengan kata kunci doa atau nama donatur lainnya.</p>
              </div>
            )}

            {/* SISTEM PAGINASI ANGKA (1, 2, 3...) */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-6">
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-teal-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

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

                <button 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-teal-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
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