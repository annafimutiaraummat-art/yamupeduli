'use client';

import { useState, useEffect, use } from 'react'; // <--- Import 'use'
import { Calendar, User, ArrowLeft, Tag, Loader2 } from 'lucide-react';
import Link from 'next/link';

// === INITIALIZE SUPABASE CLIENT ===
import { createClient } from '@supabase/supabase-js';
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Ubah tipe params menjadi Promise
export default function BeritaDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // Unwrap params menggunakan React.use()
  const unwrappedParams = use(params);
  const articleId = unwrappedParams.id;

  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getSingleArticle() {
      setLoading(true);
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('id', articleId) // <--- Panggil articleId yang sudah aman
        .single();
      
      if (!error && data) {
        setArticle(data);
      }
      setLoading(false);
    }
    getSingleArticle();
  }, [articleId]); // <--- Dependency pakai articleId

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-3 text-slate-400 font-sans">
        <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
        <span className="text-xs font-bold uppercase tracking-wider">Memuat Konten Berita...</span>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-4 font-sans text-center px-6">
        <h2 className="text-xl font-bold text-slate-900">Artikel Tidak Ditemukan</h2>
        <p className="text-sm text-slate-500">Maaf, berita penyaluran yang Anda cari tidak tersedia.</p>
        <Link href="/berita" className="px-5 py-2.5 bg-teal-600 text-white font-bold rounded-xl text-xs">Kembali ke Berita</Link>
      </div>
    );
  }

  const formattedDate = new Date(article.created_at).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric'
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased pb-24 selection:bg-teal-500 selection:text-white">
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { opacity: 0; animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}} />

      <div className="max-w-3xl mx-auto px-6 pt-12 space-y-6 animate-fade-in-up">
        
        <Link href="/berita" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-teal-600 transition-colors group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Kembali ke Berita
        </Link>

        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-400">
            <span className="flex items-center gap-1.5 bg-teal-50 text-teal-700 px-2.5 py-1 rounded-md">
              <Tag className="w-3.5 h-3.5" /> {article.category}
            </span>
            <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {formattedDate}</span>
            <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> Tim Admin</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            {article.title}
          </h1>
        </div>

        <div className="w-full h-[300px] md:h-[420px] rounded-[2rem] overflow-hidden shadow-md bg-slate-200">
          <img src={article.image_url} className="w-full h-full object-cover" alt={article.title} />
        </div>

        <div className="bg-white rounded-[2rem] p-6 md:p-10 shadow-xl shadow-teal-900/5 border border-slate-200/60 text-slate-600 leading-relaxed text-base md:text-lg whitespace-pre-line font-medium">
          {article.snippet}
        </div>

      </div>
    </div>
  );
}