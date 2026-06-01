import Link from 'next/link';
import { ArrowRight, Globe, Share2, ExternalLink, Heart, MapPin, Phone, Mail, ShieldCheck } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-teal-950 text-teal-50 pt-20 pb-8 border-t-4 border-amber-500 relative overflow-hidden">

            {/* Background Ornament (Opsional buat ngasih tekstur tipis) */}
            <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')]"></div>

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

                        {/* Badge Legalitas */}
                        <div className="flex items-start gap-3 bg-teal-900/50 p-4 rounded-xl border border-teal-800 inline-block">
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
                            <a href="#" className="w-10 h-10 rounded-full bg-teal-900 border border-teal-800 flex items-center justify-center text-teal-100 hover:bg-amber-500 hover:text-slate-900 hover:border-amber-500 transition-all">
                                <Globe className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-teal-900 border border-teal-800 flex items-center justify-center text-teal-100 hover:bg-amber-500 hover:text-slate-900 hover:border-amber-500 transition-all">
                                <Share2 className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-teal-900 border border-teal-800 flex items-center justify-center text-teal-100 hover:bg-amber-500 hover:text-slate-900 hover:border-amber-500 transition-all">
                                <ExternalLink className="w-5 h-5" />
                            </a>
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