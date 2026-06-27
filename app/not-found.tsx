'use client';

import Link from 'next/link';
import { ArrowRight, Home, Leaf, Sprout, TreePine } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="fixed inset-0 z-[99999] overflow-hidden bg-[#f4fbf7] flex flex-col items-center justify-center px-6 font-sans text-slate-800 select-none">

      {/* SUNTIKAN ANIMASI ALAM & KUCING */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes blink {
          0%, 92%, 100% { transform: scaleY(1); }
          96% { transform: scaleY(0.1); }
        }
        @keyframes tailWag {
          0%, 100% { transform: rotate(15deg); }
          50% { transform: rotate(-25deg); }
        }
        @keyframes earTwitch {
          0%, 90%, 100% { transform: rotate(-12deg); }
          95% { transform: rotate(-25deg); }
        }
        @keyframes earTwitchRight {
          0%, 90%, 100% { transform: rotate(12deg); }
          95% { transform: rotate(25deg); }
        }
        @keyframes leafFall {
          0% { transform: translateY(-10vh) rotate(0deg) translateX(0px); opacity: 0; }
          10% { opacity: 0.4; }
          90% { opacity: 0.4; }
          100% { transform: translateY(110vh) rotate(360deg) translateX(30px); opacity: 0; }
        }
        
        .animate-float { animation: float 3.5s ease-in-out infinite; }
        .animate-blink { animation: blink 4s infinite; }
        .animate-tail-wag { animation: tailWag 2.5s ease-in-out infinite; transform-origin: top center; }
        .animate-ear-left { animation: earTwitch 5s infinite; transform-origin: bottom right; }
        .animate-ear-right { animation: earTwitchRight 5s infinite; transform-origin: bottom left; }
        
        /* Daun Berguguran */
        .leaf-1 { animation: leafFall 12s linear infinite; }
        .leaf-2 { animation: leafFall 15s linear infinite 4s; }
        .leaf-3 { animation: leafFall 10s linear infinite 2s; }
        .leaf-4 { animation: leafFall 14s linear infinite 7s; }
      `}} />

      {/* 1. BACKGROUND ORNAMEN ALAM ZAMRUD */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {/* Glow lembut di pojokan */}
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-emerald-200/30 blur-[120px] rounded-full" />
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-teal-200/30 blur-[120px] rounded-full" />
        
        {/* Daun-daun berguguran (Siluet) */}
        <Leaf className="absolute left-[10%] top-[-10%] w-8 h-8 text-emerald-600/10 leaf-1" />
        <Leaf className="absolute left-[80%] top-[-10%] w-6 h-6 text-emerald-600/15 leaf-2" />
        <Leaf className="absolute left-[40%] top-[-10%] w-10 h-10 text-emerald-600/10 leaf-3" />
        <Leaf className="absolute left-[65%] top-[-10%] w-5 h-5 text-emerald-600/20 leaf-4" />

        {/* Ornamen statis di bawah */}
        <div className="absolute bottom-4 left-4 md:bottom-8 md:left-12 opacity-10 text-emerald-800 flex gap-4">
            <TreePine className="w-16 h-16 md:w-24 md:h-24" />
            <Sprout className="w-10 h-10 md:w-16 md:h-16 mt-auto" />
        </div>
      </div>

      {/* 404 WATERMARK ELEGAN */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h1 className="text-[12rem] md:text-[20rem] font-black tracking-tighter text-emerald-900/[0.03] font-sans select-none">
          404
        </h1>
      </div>

      {/* 2. MASKOT KUCING PUTIH ZAMRUD (INTERAKTIF) */}
      <div className="relative flex flex-col items-center mb-6 md:mb-8 shrink-0 group cursor-pointer z-10">

        {/* Tubuh Utama Kucing (Putih Bersih) */}
        <div className="relative w-32 h-28 md:w-40 md:h-36 bg-gradient-to-b from-white to-slate-100 rounded-[2.5rem] md:rounded-[3rem] shadow-[0_10px_40px_-10px_rgba(4,120,87,0.3)] border-4 border-slate-50 flex flex-col items-center justify-center animate-float z-10 transition-transform duration-300 group-hover:-translate-y-4 group-active:scale-95">
          
          {/* Daun Zamrud di Kepala Kucing */}
          <Leaf className="absolute -top-5 z-20 w-8 h-8 text-emerald-500 -rotate-12 fill-emerald-100" />

          {/* Telinga Kiri */}
          <div className="absolute -top-4 -left-1 md:-top-5 md:left-1 w-10 h-10 md:w-12 md:h-12 bg-white rounded-tl-full rounded-tr-md rounded-b-md border-t-4 border-l-4 border-slate-50 animate-ear-left -z-10 flex justify-center items-end pb-2">
             <div className="w-4 h-4 bg-pink-100 rounded-full" />
          </div>
          {/* Telinga Kanan */}
          <div className="absolute -top-4 -right-1 md:-top-5 md:right-1 w-10 h-10 md:w-12 md:h-12 bg-white rounded-tr-full rounded-tl-md rounded-b-md border-t-4 border-r-4 border-slate-50 animate-ear-right -z-10 flex justify-center items-end pb-2">
             <div className="w-4 h-4 bg-pink-100 rounded-full" />
          </div>

          {/* Ekor Goyang (Putih Abu) */}
          <div className="absolute -bottom-2 -right-3 md:-right-6 w-5 h-16 md:w-6 md:h-20 bg-slate-100 rounded-full border-4 border-white animate-tail-wag -z-20 shadow-sm" />

          {/* Muka Kucing Anime */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pt-2 md:pt-4">
            
            {/* Mata Zamrud Blink */}
            <div className="flex gap-4 md:gap-6 z-20">
              <div className="w-5 h-6 md:w-6 md:h-8 bg-white rounded-full flex items-center justify-center animate-blink shadow-inner overflow-hidden border-2 border-emerald-600 transition-transform duration-300 group-hover:scale-y-125">
                <div className="w-3 h-4 md:w-4 md:h-5 bg-emerald-800 rounded-full relative">
                  <div className="absolute top-0.5 right-0.5 w-1 h-1 md:w-1.5 md:h-1.5 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="w-5 h-6 md:w-6 md:h-8 bg-white rounded-full flex items-center justify-center animate-blink shadow-inner overflow-hidden border-2 border-emerald-600 transition-transform duration-300 group-hover:scale-y-125">
                <div className="w-3 h-4 md:w-4 md:h-5 bg-emerald-800 rounded-full relative">
                   <div className="absolute top-0.5 right-0.5 w-1 h-1 md:w-1.5 md:h-1.5 bg-white rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Hidung Kecil & Mulut Kucing (w) */}
            <div className="mt-1 md:mt-2 flex flex-col items-center z-20">
              <div className="w-2 h-1.5 bg-pink-300 rounded-full" />
              <div className="flex -mt-1 md:-mt-1.5 text-slate-600 font-black text-sm md:text-lg">w</div>
            </div>

            {/* Pipi Merona */}
            <div className="absolute top-10 md:top-14 w-full flex justify-between px-5 md:px-8 z-10 pointer-events-none transition-opacity duration-300 group-hover:opacity-100 opacity-60">
              <span className="w-4 h-2 md:w-5 md:h-2 bg-pink-400/30 rounded-full blur-[1px] block" />
              <span className="w-4 h-2 md:w-5 md:h-2 bg-pink-400/30 rounded-full blur-[1px] block" />
            </div>

          </div>
        </div>

        {/* Bayangan Kucing */}
        <div className="w-20 md:w-28 h-2.5 bg-emerald-900/10 rounded-full mt-4 md:mt-6 transition-all duration-300 group-hover:scale-75 group-hover:opacity-50" />
      </div>

      {/* 3. TEKS PESAN YAYASAN */}
      <div className="text-center max-w-sm md:max-w-xl space-y-3 md:space-y-4 px-4 shrink-0 relative z-20">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-700 text-[10px] md:text-xs font-bold uppercase tracking-widest">
          <Sprout className="w-3.5 h-3.5" /> Tersesat dari Jalur
        </div>
        
        <h2 className="text-2xl md:text-4xl font-black text-slate-800 tracking-tight leading-tight">
          Halaman Ini <br />
          <span className="text-emerald-600">Tidak Ditemukan</span>
        </h2>
        
      </div>

      {/* 4. TOMBOL KENDALI ZAMRUD */}
      <div className="mt-8 flex flex-col sm:flex-row gap-3 w-full max-w-xs sm:max-w-md px-4 shrink-0 relative z-20">
        <Link
          href="/"
          className="group px-6 py-3.5 md:py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs md:text-sm uppercase tracking-wider shadow-lg shadow-emerald-600/20 active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <Home className="w-4 h-4" />
          Pulang ke Beranda
        </Link>

        <Link
          href="/program"
          className="group px-6 py-3.5 md:py-4 rounded-2xl border-2 border-emerald-100 bg-white hover:bg-emerald-50 text-emerald-800 font-bold text-xs md:text-sm flex items-center justify-center gap-2 active:scale-95 transition-all shadow-sm"
        >
          Lihat Program Kami
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

    </main>
  );
}