'use client';

import { useState, useEffect } from 'react';
import { HandHeart } from 'lucide-react'; // Ikon yang lebih bermakna (Tangan & Hati)

export default function Preloader() {
  const [isExiting, setIsExiting] = useState(false);
  const [isUnmounted, setIsUnmounted] = useState(false);

  useEffect(() => {
    // Kunci scroll
    document.body.style.overflow = 'hidden';

    // Durasi super kilat! Cuma 1.2 detik langsung kebuka
    const timer1 = setTimeout(() => {
      setIsExiting(true);
    }, 1200);

    // Hapus komponen 600ms setelah animasi transisi beres
    const timer2 = setTimeout(() => {
      setIsUnmounted(true);
      document.body.style.overflow = 'unset';
    }, 1800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (isUnmounted) return null;

  return (
    <div
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-slate-50 transition-all duration-[600ms] ease-in-out ${
        isExiting ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background Pattern Organik Halus */}
      <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#10b981_1px,transparent_1px)] bg-[size:20px_20px]"></div>

      <div className={`relative z-10 flex flex-col items-center transition-all duration-500 ${isExiting ? 'translate-y-8' : 'translate-y-0'}`}>
        
        {/* Animasi Riak Air (Ripple) Natural */}
        <div className="relative flex items-center justify-center w-24 h-24 mb-6">
          {/* Lingkaran yang melebar kayak ombak air */}
          <div className="absolute inset-0 rounded-full border-4 border-emerald-200 animate-ripple"></div>
          <div className="absolute inset-0 rounded-full border-4 border-emerald-300 animate-ripple" style={{ animationDelay: '0.4s' }}></div>
          
          {/* Ikon Utama */}
          <div className="relative z-10 w-20 h-20 bg-emerald-600 rounded-full flex items-center justify-center shadow-lg shadow-emerald-600/30">
            <HandHeart className="w-10 h-10 text-white" />
          </div>
        </div>

        {/* Teks Lembut & Hangat */}
        <h1 className="text-3xl font-black text-slate-800 tracking-tight">
          YAMU <span className="text-emerald-600">Peduli</span>
        </h1>
        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-2 animate-pulse-soft">
          Menebar Kebaikan...
        </p>
      </div>

      {/* CSS Custom untuk Animasi Organik */}
      <style dangerouslySetInnerHTML={{__html: `
        /* Efek Tetesan Air / Riak */
        @keyframes ripple {
          0% { transform: scale(0.8); opacity: 1; }
          100% { transform: scale(2.5); opacity: 0; }
        }
        .animate-ripple {
          animation: ripple 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        
        /* Animasi kedip lembut untuk teks */
        @keyframes pulseSoft {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .animate-pulse-soft {
          animation: pulseSoft 1.5s ease-in-out infinite;
        }
      `}} />
    </div>
  );
}