'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { Search, Heart, Loader2 } from 'lucide-react';

import { supabase } from '@/supabase';

export default function ProgramPage() {
  const [programs, setPrograms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function getPrograms() {
      setLoading(true);
      const { data, error } = await supabase
        .from('programs')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (!error && data) setPrograms(data);
      setLoading(false);
    }
    getPrograms();
  }, []);

  // Filter Search Cerdas: Cek Judul ATAU Kategori
  const filteredPrograms = programs.filter((prog) => {
    const term = searchQuery.toLowerCase();
    return prog.title.toLowerCase().includes(term) || prog.category.toLowerCase().includes(term);
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-teal-500 selection:text-white">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { opacity: 0; animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
      `}} />

      <div className="bg-gradient-to-b from-emerald-900 via-emerald-800 to-emerald-900 pt-8 sm:pt-12 pb-16 px-6 text-center text-white relative overflow-hidden">
        <div className="max-w-3xl mx-auto space-y-3">
          <span className="inline-block px-4 py-1.5 rounded-full border border-amber-400/30 bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-widest backdrop-blur-md animate-fade-in-up">
            Program YAMU Peduli
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight animate-fade-in-up delay-100">
            Pilih Wadah Kebaikan Anda
          </h1>
          <p className="text-teal-100/80 text-sm md:text-base max-w-xl mx-auto font-normal animate-fade-in-up delay-200">
            Daftar program penyaluran bantuan yang dikelola secara amanah dan transparan.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 -mt-7 relative z-20 pb-24">
        
        {/* SEARCH BAR ONLY (CLEAN UI) */}
        <div className="bg-white rounded-2xl shadow-xl shadow-teal-900/5 border border-slate-200/60 p-4 mb-12 animate-fade-in-up delay-200 max-w-2xl mx-auto">
          <div className="relative w-full">
            <input 
              type="text" 
              placeholder="Cari nama program atau kategori (contoh: Pendidikan, Air Bersih)..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all text-slate-800" 
            />
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3" />
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3 text-slate-400">
            <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
            <span className="text-xs font-bold uppercase tracking-wider">Menghubungkan ke Database...</span>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in-up">
            {filteredPrograms.length > 0 ? (
              filteredPrograms.map((prog) => {
                const progress = Math.min(Math.round(((prog.terkumpul || 0) / prog.target) * 100), 100);
                // Hanya tampilkan program yang statusnya bukan 'Selesai' (Jika sudah implementasi fitur status)
                if(prog.status === 'Selesai') return null; 

                return (
                  <div key={prog.id} className="group bg-white rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-2 hover:border-teal-200 transition-all duration-500 overflow-hidden flex flex-col h-[480px]">
                    <div className="relative h-48 w-full overflow-hidden bg-slate-100 shrink-0">
                      <span className="absolute top-3 left-3 z-10 bg-white/95 backdrop-blur-sm text-teal-700 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md shadow-sm border border-teal-100">
                        {prog.category}
                      </span>
                      <img src={prog.image_url} alt={prog.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <div className="p-5 flex flex-col flex-grow justify-between">
                      <div className="space-y-2">
                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-600 transition-colors leading-snug line-clamp-2">{prog.title}</h3>
                        <p className="text-slate-500 text-xs md:text-sm leading-relaxed line-clamp-3">{prog.description}</p>
                      </div>
                      <div className="pt-4 border-t border-slate-100">
                        <div className="flex justify-between items-end mb-2">
                          <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Terkumpul</span>
                            <span className="text-teal-600 font-extrabold text-sm">Rp {(prog.terkumpul || 0).toLocaleString('id-ID')}</span>
                          </div>
                          <div className="flex flex-col text-right">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Target</span>
                            <span className="text-slate-700 font-bold text-xs">Rp ({(prog.target || 0).toLocaleString('id-ID')})</span>
                          </div>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-1.5 mb-5 overflow-hidden">
                          <div className="bg-teal-500 h-full rounded-full transition-all duration-1000" style={{ width: `${progress}%` }} />
                        </div>
                        <Link href={`/program/${prog.id}`} className="flex items-center justify-center w-full py-3 bg-teal-50 text-teal-700 font-bold rounded-xl group-hover:bg-teal-600 group-hover:text-white transition-all duration-300 border border-teal-100 group-hover:border-teal-600 text-xs md:text-sm">
                          Donasi Sekarang <Heart className="w-4 h-4 ml-1.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-full py-12 text-center text-slate-400 font-bold text-sm">
                Program tidak ditemukan. Coba kata kunci lain.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}