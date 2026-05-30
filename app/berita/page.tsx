'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Calendar, User, ArrowRight, Loader2, Tag } from 'lucide-react';

import { createClient } from '@supabase/supabase-js';
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function BeritaPage() {
  const [berita, setBerita] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function getArticles() {
      setLoading(true);
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (!error && data) setBerita(data);
      setLoading(false);
    }
    getArticles();
  }, []);

  const filteredBerita = berita.filter((item) => {
    const term = searchQuery.toLowerCase();
    return item.title.toLowerCase().includes(term) || item.category.toLowerCase().includes(term);
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-teal-500 selection:text-white">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { opacity: 0; animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
      `}} />

      <div className="bg-teal-950 pt-24 pb-16 px-6 text-center border-b border-teal-900">
        <div className="max-w-3xl mx-auto space-y-3">
          <span className="inline-block px-4 py-1.5 rounded-full border border-amber-400/30 bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-widest backdrop-blur-md animate-fade-in-up">
            Kabar YAMU Peduli
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight animate-fade-in-up delay-100">
            Berita & Artikel Terbaru
          </h1>
          <p className="text-teal-100/80 text-sm md:text-base max-w-xl mx-auto font-normal animate-fade-in-up delay-200">
            Ikuti perkembangan penyaluran dana amanah umat secara transparan dan akuntabel di sini.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-8 -mt-7 relative z-20 pb-24">
        
        {/* SEARCH BAR ONLY */}
        <div className="bg-white rounded-2xl shadow-xl shadow-teal-900/5 border border-slate-200/60 p-4 mb-12 animate-fade-in-up delay-200 max-w-2xl mx-auto">
          <div className="relative w-full">
            <input 
              type="text" 
              placeholder="Cari artikel atau tag kegiatan..." 
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
            <span className="text-xs font-bold uppercase tracking-wider">Memuat Data Artikel...</span>
          </div>
        ) : (
          <div className="space-y-6 animate-fade-in-up">
            {filteredBerita.length > 0 ? (
              filteredBerita.map((item) => {
                const formattedDate = new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
                return (
                  <Link href={`/berita/${item.id}`} key={item.id} className="group bg-white rounded-[2rem] p-5 border border-slate-200/60 shadow-sm hover:shadow-xl hover:border-teal-200 transition-all duration-300 flex flex-col md:flex-row gap-6 items-center">
                    <div className="w-full md:w-64 h-48 rounded-2xl overflow-hidden shrink-0 bg-slate-100">
                      <img src={item.image_url} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="flex flex-col justify-between h-full w-full py-1">
                      <div>
                        <div className="flex flex-wrap items-center gap-4 mb-3">
                          <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md uppercase tracking-wider border border-amber-200 flex items-center gap-1">
                            <Tag className="w-3 h-3" /> {item.category}
                          </span>
                          <span className="text-xs text-slate-400 font-medium flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {formattedDate}</span>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-teal-600 transition-colors leading-snug line-clamp-2">{item.title}</h3>
                        <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">{item.snippet}</p>
                      </div>
                      <div className="pt-4 flex items-center gap-1.5 text-xs font-bold text-teal-600 group-hover:text-teal-500 transition-colors">
                        Baca Selengkapnya <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                );
              })
            ) : (
              <div className="py-12 text-center text-slate-400 font-bold text-sm">
                Belum ada publikasi artikel/berita yang sesuai.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}