'use client';

import { useState, useEffect, use } from 'react';
import { Calendar, User, ArrowLeft, Tag, Loader2, Share2, Heart, PlayCircle } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

// === INITIALIZE SUPABASE CLIENT ===
import { createClient } from '@supabase/supabase-js';
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function BeritaDetailPage({ params }: { params: Promise<{ id: string }> }) {
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
        .eq('id', articleId)
        .single();
      
      if (!error && data) {
        setArticle(data);
      }
      setLoading(false);
    }
    getSingleArticle();
  }, [articleId]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link artikel berhasil disalin!');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-4 text-slate-400 font-sans">
        <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
        <span className="text-xs font-bold uppercase tracking-wider">Memuat Kabar Kebaikan...</span>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-4 font-sans text-center px-6">
        <div className="w-16 h-16 bg-slate-200 text-slate-400 rounded-full flex items-center justify-center mb-2">
          <Tag className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-black text-slate-900">Artikel Tidak Ditemukan</h2>
        <p className="text-sm text-slate-500 max-w-md leading-relaxed">Maaf, berita penyaluran atau artikel yang Anda cari mungkin telah dipindahkan atau dihapus.</p>
        <Link href="/berita" className="mt-2 px-6 py-3 bg-teal-600 hover:bg-teal-500 transition-colors text-white font-bold rounded-xl text-sm shadow-md">
          Kembali ke Indeks Berita
        </Link>
      </div>
    );
  }

  const formattedDate = new Date(article.created_at).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric'
  });

  // --- LOGIKA SMART VIDEO EMBED ---
  const isVideo = !!article.video_url;
  const getYouTubeId = (url: string) => {
    if (!url) return null;
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=|shorts\/)|youtu\.be\/)([^"&?\/\s]{11})/i);
    return match ? match[1] : null;
  };
  const ytId = isVideo ? getYouTubeId(article.video_url) : null;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased pb-24 selection:bg-teal-500 selection:text-white">
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { opacity: 0; animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}} />

      <div className="max-w-3xl mx-auto px-6 pt-10 space-y-8 animate-fade-in-up">
        
        {/* NAVIGASI ATAS & SHARE */}
        <div className="flex items-center justify-between border-b border-slate-200/60 pb-4">
          <Link href="/berita" className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-teal-600 transition-colors group uppercase tracking-wider">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Indeks Berita
          </Link>
          <button 
            onClick={handleShare}
            className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-teal-600 bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-sm active:scale-95 transition-all"
          >
            <Share2 className="w-3.5 h-3.5" /> Bagikan
          </button>
        </div>

        {/* JUDUL & META DATA */}
        <div className="space-y-5">
          <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-500">
            <span className="flex items-center gap-1.5 bg-teal-50 text-teal-700 px-3 py-1 rounded-md uppercase tracking-wider border border-teal-100">
              <Tag className="w-3.5 h-3.5" /> {article.category}
            </span>
            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-slate-400" /> {formattedDate}</span>
            <span className="flex items-center gap-1.5"><User className="w-4 h-4 text-slate-400" /> Humas YAMU</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
            {article.title}
          </h1>
        </div>

        {/* FOTO SAMPUL / MEDIA PLAYER */}
        <div className="w-full aspect-video rounded-3xl overflow-hidden shadow-lg bg-slate-900 border border-slate-200/60 relative group">
          {isVideo ? (
            ytId ? (
              <iframe 
                src={`https://www.youtube.com/embed/${ytId}`} 
                title={article.title}
                className="w-full h-full absolute inset-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              />
            ) : (
              <video controls className="w-full h-full absolute inset-0 object-contain bg-black">
                <source src={article.video_url} type="video/mp4" />
                Browser Anda tidak mendukung tag video.
              </video>
            )
          ) : (
            <img 
              src={article.image_url || '/placeholder.jpg'} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 absolute inset-0" 
              alt={article.title} 
            />
          )}
        </div>

        {/* ISI ARTIKEL */}
        <article className="bg-white rounded-[2rem] p-6 md:p-10 shadow-xl shadow-teal-900/5 border border-slate-200/60 text-slate-700 leading-loose text-base md:text-lg whitespace-pre-line font-medium">
          {article.snippet}
        </article>

        {/* CTA BAWAH */}
        <div className="mt-12 bg-teal-950 rounded-[2rem] p-8 md:p-10 text-center text-white shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1593113543327-0b1a0e88ba92?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center"></div>
          <div className="relative z-10 space-y-4 max-w-xl mx-auto">
            <h3 className="text-2xl font-black">Mari Lanjutkan Estafet Kebaikan</h3>
            <p className="text-sm text-teal-100/80 leading-relaxed pb-2">
              Kabar baik ini terwujud berkat sedekah Anda. Masih banyak saudara kita yang menanti uluran tangan. Yuk, sisihkan sedikit rezeki hari ini!
            </p>
            <Link href="/sedekah" className="inline-flex items-center gap-2 bg-amber-500 text-slate-900 px-8 py-3.5 rounded-full font-black shadow-xl shadow-amber-500/20 hover:bg-amber-400 hover:-translate-y-1 transition-all text-sm">
              Salurkan Sedekah <Heart className="w-4 h-4 fill-current" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}