// app/components/Navbar.tsx
'use client';

import Link from 'next/link';
import { FaInstagram, FaYoutube, FaFacebook } from 'react-icons/fa';
import { Phone, Mail, Heart, ArrowRight } from 'lucide-react';

export default function Navbar() {
  return (
    <>
      {/* TOP BAR */}
      <div className="bg-teal-950 text-teal-50 py-2.5 hidden md:block text-xs font-medium tracking-wide">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <a href="tel:6281388898967" className="flex items-center gap-2 hover:text-amber-400 transition-colors">
              <Phone className="w-3.5 h-3.5" />  +6281388898967

            </a>
            <a href="mailto:annafimutiaraummat@gmail.com" className="flex items-center gap-2 hover:text-amber-400 transition-colors">
              <Mail className="w-3.5 h-3.5" /> annafimutiaraummat@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span className="opacity-60 border-r border-teal-800 pr-4">Ikuti Kami</span>
            <a href="https://www.instagram.com/yamupeduli" target="_blank" rel="noreferrer" className="hover:text-amber-400 transition-colors"><FaInstagram className="w-4 h-4" /></a>
            <a href="https://www.youtube.com/@yamufoundation7691" target="_blank" rel="noreferrer" className="hover:text-amber-400 transition-colors"><FaYoutube className="w-4 h-4" /></a>
            <a href="https://www.facebook.com/p/annafi-mutiara-ummat-100066893095636/" target="_blank" rel="noreferrer" className="hover:text-amber-400 transition-colors"><FaFacebook className="w-4 h-4" /></a>
          </div>
        </div>
      </div>

      {/* MAIN NAVBAR */}
      <nav className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="bg-teal-50 p-2.5 rounded-xl border border-teal-100 group-hover:bg-teal-100 transition-colors">
              <Heart className="w-6 h-6 text-teal-600" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight text-teal-950 leading-none">YAMU Peduli</span>
              <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest mt-0.5">Yayasan An-Nafi Mutiara Ummat</span>
            </div>
          </Link>

          {/* MENU LINK DENGAN TAMBAHAN KALKULATOR ZAKAT */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-bold text-slate-600">
            <Link href="/" className="hover:text-teal-600 transition-colors">Beranda</Link>
            <Link href="/tentang" className="hover:text-teal-600 transition-colors">Tentang Kami</Link>
            <Link href="/program" className="hover:text-teal-600 transition-colors">Program Kebaikan</Link>
            <Link href="/kalkulator-zakat" className="hover:text-teal-600 transition-colors">Kalkulator Zakat</Link>
            <Link href="/berita" className="hover:text-teal-600 transition-colors">Berita & Artikel</Link>
            <Link href="/kontak" className="hover:text-teal-600 transition-colors">Kontak</Link>
          </div>

          <Link href="/sedekah" className="hidden sm:flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-6 py-2.5 rounded-full font-bold shadow-lg shadow-teal-600/20 transition-all hover:-translate-y-0.5">
            Mulai Donasi <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </nav>
    </>
  );
}

