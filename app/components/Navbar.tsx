'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Heart, ArrowRight, Menu, X, Sparkles } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const navLinks = [
    { name: 'Beranda', href: '/' },
    { name: 'Tentang Kami', href: '/tentang' },
    { name: 'Program Kebaikan', href: '/program' },
    { name: 'Berita & Artikel', href: '/berita' },
    { name: 'Ruang Doa', href: '/ruang-doa' },
    { name: 'Kontak', href: '/kontak' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-teal-100/60 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        
        <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
          <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-2 sm:p-2.5 rounded-xl border border-teal-100/80 group-hover:border-teal-300 transition-colors shadow-sm">
            <img src="/yamu.png" alt="Logo YAMU Peduli" className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg sm:text-xl font-black tracking-tight text-teal-950 leading-none">YAMU Peduli</span>
            <span className="text-[9px] sm:text-[10px] font-bold text-amber-500 uppercase tracking-widest mt-0.5 block">
              Yayasan An-Nafi Mutiara Ummat
            </span>
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-5 xl:gap-8 text-sm font-bold text-slate-600">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className={`hover:text-teal-600 transition-colors relative py-1 ${pathname === link.href ? 'text-teal-700 font-black' : ''}`}
            >
              {link.name}
              {pathname === link.href && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-teal-500 to-amber-400 rounded-full" />
              )}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center">
          <Link href="/sedekah" className="flex items-center gap-2 bg-gradient-to-r from-teal-600 via-cyan-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white px-6 py-2.5 rounded-full font-black shadow-md shadow-teal-600/20 transition-all hover:-translate-y-0.5 text-sm">
            Mulai Sedekah <ArrowRight className="w-4 h-4 text-amber-300" />
          </Link>
        </div>

        <button 
          className="lg:hidden p-2 -mr-2 text-slate-600 hover:text-teal-600 transition-colors focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6 sm:w-7 sm:h-7" /> : <Menu className="w-6 h-6 sm:w-7 sm:h-7" />}
        </button>
      </div>

      <div className={`lg:hidden absolute top-[100%] left-0 w-full bg-white border-b border-teal-100 shadow-xl transition-all duration-300 ease-in-out overflow-y-auto ${isOpen ? 'max-h-[calc(100vh-64px)] opacity-100 visible' : 'max-h-0 opacity-0 invisible'}`}>
        <div className="px-4 sm:px-6 py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className={`text-base font-bold pb-3 border-b border-slate-50 ${pathname === link.href ? 'text-teal-700' : 'text-slate-600'}`}
            >
              {link.name}
            </Link>
          ))}
          <Link href="/sedekah" className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white text-center py-4 rounded-xl font-bold mt-4 flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-md">
            Mulai Sedekah <Heart className="w-4 h-4 text-amber-300" />
          </Link>
        </div>
      </div>
    </nav>
  );
}
