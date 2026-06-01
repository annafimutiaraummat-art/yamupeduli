'use client';

import Link from 'next/link';
import { Home, ArrowRight, Compass, HelpCircle } from 'lucide-react';

export default function NotFound() {
  return (
    // Menggunakan fixed inset-0 dan z-[99999] untuk MENUTUP TOTAL Navbar & Footer global
    <div className="fixed inset-0 z-[99999] bg-slate-50 flex flex-col items-center justify-center px-6 font-sans antialiased overflow-hidden h-screen w-screen select-none">
      
      {/* CSS Animasi Premium - Dijamin Halus di iOS & Android */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(2deg); }
        }
        @keyframes shadowPulse {
          0%, 100% { transform: scale(1); opacity: 0.15; }
          50% { transform: scale(0.85); opacity: 0.35; }
        }
        @keyframes ripple {
          0% { transform: scale(0.8); opacity: 0.5; }
          100% { transform: scale(2); opacity: 0; }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-shadow {
          animation: shadowPulse 4s ease-in-out infinite;
        }
        .animate-ripple {
          animation: ripple 2.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
      `}} />

      {/* 1. Efek Background Alam / Asri (Riak Air & Grid Halus) */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#10b981_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[450px] h-[280px] sm:h-[450px] bg-emerald-200/30 blur-[80px] rounded-full pointer-events-none"></div>

      {/* 2. MASKOT KARTUN INTERAKTIF & RESPONSIF */}
      <div className="relative flex flex-col items-center mb-6 sm:mb-8 shrink-0">
        
        {/* Lingkaran Riak Air di belakang Kartun */}
        <div className="absolute w-32 h-32 sm:w-44 sm:h-44 rounded-full border-2 border-emerald-200/60 animate-ripple"></div>
        <div className="absolute w-32 h-32 sm:w-44 sm:h-44 rounded-full border-2 border-emerald-300/40 animate-ripple" style={{ animationDelay: '0.8s' }}></div>

        {/* Tubuh Maskot (Ukuran fleksibel pakai utility sm: md:) */}
        <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-[2rem] sm:rounded-[2.5rem] flex items-center justify-center shadow-xl shadow-emerald-950/10 border-4 border-white animate-float z-10">
          
          {/* Ekpresi Wajah Kartun Anime Jepang (Mata Bingung/Kedip + Mulut Imut) */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 sm:gap-3">
            {/* Alis Bingung */}
            <div className="flex gap-10 sm:gap-14 -mb-1">
              <span className="w-3 h-1 bg-white/60 rounded-full block rotate-12"></span>
              <span className="w-3 h-1 bg-white/60 rounded-full block -rotate-12"></span>
            </div>
            {/* Mata Bulat */}
            <div className="flex gap-8 sm:gap-12">
              <span className="w-3 h-3 bg-white rounded-full block animate-pulse"></span>
              <span className="w-3 h-3 bg-white rounded-full block animate-pulse"></span>
            </div>
            {/* Mulut Imut Melengkung Kebalik (Sedih/Bingung) */}
            <div className="w-5 h-2.5 border-t-2 border-white rounded-t-full mt-1"></div>
          </div>
          
          {/* Watermark Kompas Samar di Background Badan Maskot */}
          <Compass className="w-16 h-16 text-white/10 absolute -rotate-12" />
          
          {/* Angka 404 Besar Gaya Layer 3D di Belakang Maskot */}
          <span className="absolute -top-8 sm:-top-12 text-7xl sm:text-8xl md:text-9xl font-black text-slate-200/70 tracking-tighter -z-10 font-sans">
            404
          </span>
        </div>

        {/* Bayangan Fleksibel di Bawah Maskot */}
        <div className="w-20 sm:w-28 h-2.5 bg-slate-900/10 rounded-full blur-[2px] mt-5 sm:mt-6 animate-shadow"></div>
      </div>

      {/* 3. TEKS PESAN (RESPONSIF UKURANNYA) */}
      <div className="text-center max-w-sm sm:max-w-md space-y-3 px-4 shrink-0">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-800 tracking-tight flex items-center justify-center gap-2">
          <HelpCircle className="w-6 h-6 text-emerald-600 shrink-0" /> Jalurnya Terputus...
        </h2>
        <p className="text-slate-500 text-xs sm:text-sm md:text-base font-medium leading-relaxed">
          Waduh, sepertinya Anda tersesat ke halaman yang salah atau program kebaikan ini sudah selesai dialihkan. Yuk, kembali ke jalur utama.
        </p>
      </div>

      {/* 4. TOMBOL NAVIGASI PENYELAMAT (Pas di Jempol HP & Kokoh di Desktop) */}
      <div className="mt-8 flex flex-col sm:flex-row gap-3 w-full max-w-xs sm:max-w-md px-4 shrink-0 relative z-10">
        <Link 
          href="/" 
          className="flex items-center justify-center gap-2 w-full py-3.5 sm:py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl shadow-lg shadow-emerald-600/20 active:scale-95 transition-all text-xs sm:text-sm"
        >
          <Home className="w-4 h-4" /> Ke Halaman Utama
        </Link>
        <Link 
          href="/program" 
          className="flex items-center justify-center gap-1.5 w-full py-3.5 sm:py-4 bg-white hover:bg-slate-100/80 text-slate-700 font-bold rounded-xl border border-slate-200 shadow-sm active:scale-95 transition-all text-xs sm:text-sm group"
        >
          Lihat Program Lain <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

    </div>
  );
}