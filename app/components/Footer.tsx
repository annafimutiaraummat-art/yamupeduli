'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { 
    ArrowRight, Globe, Share2, ExternalLink, 
    Heart, MapPin, Phone, Mail, ShieldCheck, X
} from 'lucide-react';
import toast from 'react-hot-toast'; // Tambahan untuk notif Copy Link

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const [showSocials, setShowSocials] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Fungsi otomatis menutup card jika user klik di luar kotak
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowSocials(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Fungsi Share Canggih (Native Share HP / Copy Clipboard PC)
    const handleShare = async () => {
        const shareData = {
            title: 'YAMU Peduli - Yayasan An-Nafi Mutiara Ummat',
            text: 'Mari salurkan sedekah dan bangun kemandirian umat bersama YAMU Peduli.',
            url: window.location.origin
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.log('Membatalkan share');
            }
        } else {
            // Fallback untuk browser PC yang gak support Native Share
            navigator.clipboard.writeText(window.location.origin);
            toast.success('Link website disalin ke clipboard!', {
                icon: '🔗',
                style: { borderRadius: '10px', background: '#334155', color: '#fff' }
            });
        }
    };

    return (
        <footer className="bg-teal-950 text-teal-50 pt-20 pb-8 border-t-4 border-amber-500 relative">

            {/* Background Ornament */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')]"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">

                    {/* ========================================== */}
                    {/* KOLOM 1: BRAND & TENTANG */}
                    {/* ========================================== */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="bg-teal-50 p-2.5 rounded-xl">
                                <Heart className="w-6 h-6 text-teal-600" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-black text-white tracking-tight leading-none">YAMU Peduli</h3>
                                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest mt-1 block">Yayasan An-Nafi Mutiara Ummat</span>
                            </div>
                        </div>
                        <p className="text-sm text-teal-100/80 leading-relaxed font-medium pr-4">
                            Lembaga filantropi resmi yang berdedikasi membangun kemandirian umat melalui program air bersih, pendidikan yatim, dan sosial keagamaan di pelosok negeri.
                        </p>

                        <div className="flex items-start gap-3 bg-teal-900/50 p-4 rounded-xl border border-teal-800 inline-flex">
                            <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-wider text-teal-300">Terdaftar Resmi</p>
                                <p className="text-xs font-medium text-teal-100 mt-1 leading-relaxed">
                                    Kemenkumham RI:<br />AHU-0016362.AH.01.04<br />
                                    NPWP: 86.715.418.9-453.000
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* ========================================== */}
                    {/* KOLOM 2: NAVIGASI CEPAT */}
                    {/* ========================================== */}
                    <div>
                        <h4 className="text-lg font-black text-white mb-6">Pintasan Program</h4>
                        <ul className="space-y-4 text-sm font-medium text-teal-100/80">
                            <li><Link href="/tentang" className="hover:text-amber-400 transition-colors flex items-center gap-2"><ArrowRight className="w-3.5 h-3.5" /> Profil Yayasan</Link></li>
                            <li><Link href="/program" className="hover:text-amber-400 transition-colors flex items-center gap-2"><ArrowRight className="w-3.5 h-3.5" /> Program Kebaikan</Link></li>
                            <li><Link href="/sedekah" className="hover:text-amber-400 transition-colors flex items-center gap-2"><ArrowRight className="w-3.5 h-3.5" /> Sedekah & Infaq</Link></li>
                            <li><Link href="/zakat" className="hover:text-amber-400 transition-colors flex items-center gap-2"><ArrowRight className="w-3.5 h-3.5" /> Kalkulator Zakat</Link></li>
                            <li><Link href="/berita" className="hover:text-amber-400 transition-colors flex items-center gap-2"><ArrowRight className="w-3.5 h-3.5" /> Berita Penyaluran</Link></li>
                        </ul>
                    </div>

                    {/* ========================================== */}
                    {/* KOLOM 3: KONTAK & ALAMAT */}
                    {/* ========================================== */}
                    <div>
                        <h4 className="text-lg font-black text-white mb-6">Hubungi Kami</h4>
                        <ul className="space-y-5 text-sm font-medium text-teal-100/80">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                                <span className="leading-relaxed">JL. Jombang Raya, Villa Jombang Baru Blok A3 No.26 RT 001/RW 014, Kel. Jombang, Kec. Ciputat, Tangsel 15224.</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-amber-400 shrink-0" />
                                <span>+62 813-8889-8967</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-amber-400 shrink-0" />
                                <span>annafimutiaraummat@gmail.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* ========================================== */}
                    {/* KOLOM 4: SOSIAL MEDIA & BANK */}
                    {/* ========================================== */}
                    <div>
                        <h4 className="text-lg font-black text-white mb-6">Ikuti Jejak Kebaikan</h4>
                        <div className="flex items-center gap-3 mb-8">
                            
                            {/* TOMBOL 1: POP-UP SOCIAL MEDIA */}
                            <div className="relative" ref={dropdownRef}>
                                <button 
                                    onClick={() => setShowSocials(!showSocials)}
                                    className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${
                                        showSocials 
                                            ? 'bg-amber-500 text-slate-900 border-amber-500 scale-105' 
                                            : 'bg-teal-900 border-teal-800 text-teal-100 hover:bg-amber-500 hover:text-slate-900 hover:border-amber-500'
                                    }`}
                                    title="Sosial Media Kami"
                                >
                                    <Globe className="w-5 h-5" />
                                </button>

                                {/* KARTU POP-UP ALA "LINKTREE / BIO" */}
                                {showSocials && (
                                    <div className="absolute bottom-full mb-4 left-0 md:-left-8 w-[280px] bg-white/95 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-slate-200 p-6 z-[999] animate-in fade-in slide-in-from-bottom-4 duration-200">
                                        <div className="space-y-3">
                                            <a href="https://www.youtube.com/@yamufoundation7691" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-1.5 pr-4 bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 rounded-full transition-all group hover:scale-[1.02] hover:shadow-md">
                                                <div className="bg-rose-100 text-rose-600 w-10 h-10 rounded-full flex items-center justify-center shrink-0">
                                                    <svg xmlns="http://w3.org" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" /><polygon points="10 15 15 12 10 9" /></svg>
                                                </div>
                                                <span className="text-xs font-black text-slate-700 group-hover:text-rose-600 transition-colors flex-grow text-center pr-4">YouTube Channel</span>
                                            </a>
                                            <a href="https://www.facebook.com/p/annafi-mutiara-ummat-100066893095636/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-1.5 pr-4 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 rounded-full transition-all group hover:scale-[1.02] hover:shadow-md">
                                                <div className="bg-blue-100 text-blue-600 w-10 h-10 rounded-full flex items-center justify-center shrink-0">
                                                    <svg xmlns="http://w3.org" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                                                </div>
                                                <span className="text-xs font-black text-slate-700 group-hover:text-blue-600 transition-colors flex-grow text-center pr-4">Facebook Page</span>
                                            </a>
                                            <a href="https://www.instagram.com/yamupeduli/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-1.5 pr-4 bg-slate-50 hover:bg-fuchsia-50 border border-slate-200 hover:border-fuchsia-200 rounded-full transition-all group hover:scale-[1.02] hover:shadow-md">
                                                <div className="bg-fuchsia-100 text-fuchsia-600 w-10 h-10 rounded-full flex items-center justify-center shrink-0">
                                                    <svg xmlns="http://w3.org" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
                                                </div>
                                                <span className="text-xs font-black text-slate-700 group-hover:text-fuchsia-600 transition-colors flex-grow text-center pr-4">Instagram</span>
                                            </a>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* TOMBOL 2: FITUR SHARE (NATIVE/COPY) */}
                            <button 
                                onClick={handleShare}
                                className="w-10 h-10 rounded-full bg-teal-900 border border-teal-800 flex items-center justify-center text-teal-100 hover:bg-amber-500 hover:text-slate-900 hover:border-amber-500 transition-all"
                                title="Bagikan Website"
                            >
                                <Share2 className="w-5 h-5" />
                            </button>

                            {/* TOMBOL 3: JALUR RAHASIA ADMIN (STEALTH BACKDOOR) */}
                            <Link 
                                href="/admin" 
                                className="w-10 h-10 rounded-full bg-teal-900 border border-teal-800 flex items-center justify-center text-teal-100 hover:bg-amber-500 hover:text-slate-900 hover:border-amber-500 transition-all"
                                title="Portal Khusus Staf"
                            >
                                <ExternalLink className="w-5 h-5" />
                            </Link>
                        </div>

                        <h4 className="text-sm font-bold text-teal-100/50 uppercase tracking-wider mb-4">Rekening Resmi</h4>
                        <div className="flex flex-wrap gap-2 opacity-70 grayscale">
                            <span className="px-3 py-1.5 bg-white text-slate-900 text-xs font-black rounded-md">BJB</span>
                            <span className="px-3 py-1.5 bg-white text-blue-800 text-xs font-black rounded-md">Mandiri</span>
                            <span className="px-3 py-1.5 bg-white text-blue-900 text-xs font-black rounded-md">BCA</span>
                            <span className="px-3 py-1.5 bg-white text-blue-700 text-xs font-black rounded-md">BRI</span>
                        </div>
                    </div>

                </div>

                {/* ========================================== */}
                {/* COPYRIGHT BAR */}
                {/* ========================================== */}
                <div className="pt-6 border-t border-teal-800/50 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium text-teal-100/50">
                    <p>© {currentYear} YAYASAN AN-NAFI MUTIARA UMMAT. Hak Cipta Dilindungi.</p>
                    <div className="flex items-center gap-4">
                        <Link href="#" className="hover:text-amber-400 transition-colors">Syarat & Ketentuan</Link>
                        <span className="w-1 h-1 rounded-full bg-teal-800"></span>
                        <Link href="#" className="hover:text-amber-400 transition-colors">Kebijakan Privasi</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}