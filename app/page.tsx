'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaInstagram, FaYoutube, FaFacebook } from 'react-icons/fa';
import { 
  Phone, Heart, ArrowRight, CheckCircle2, Users, Droplets, 
  BookOpen, MapPin, MessageCircle, ChevronRight, ChevronLeft,
  ShieldCheck, FileText, Activity, Calendar, Loader2
} from 'lucide-react';

// === INITIALIZE SUPABASE CLIENT SECURELY ===
import { createClient } from '@supabase/supabase-js';
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ==========================================
// KOMPONEN ANIMASI ANGKA (COUNT UP)
// ==========================================
const CountUpAnimation = ({ endValue, suffix = '' }: { endValue: number, suffix?: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const duration = 2500; // Durasi animasi 2.5 detik

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Efek easing (melambat di akhir)
      const easeOutQuart = 1 - Math.pow(1 - progress, 4); 
      
      setCount(Math.floor(easeOutQuart * endValue));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    // Mulai animasi jika endValue > 0
    if (endValue > 0) requestAnimationFrame(animate);
  }, [endValue]);

  return <span>{count.toLocaleString('id-ID')}{suffix}</span>;
};

// ==========================================
// DATA SLIDER BANNER STATIS
// ==========================================
const slides = [
  {
    title: 'Alirkan Kebaikan, Wujudkan Harapan',
    description: 'Bersama YAMU Peduli, setiap sedekah Anda bertransformasi menjadi senyum kemandirian bagi santri, yatim, dan dhuafa di pelosok negeri.',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
    tag: 'Tebar Kebaikan'
  },
  {
    title: 'Pendidikan Layak untuk Generasi Umat',
    description: 'Bantu anak-anak yatim meraih cita-cita mereka melalui fasilitas pendidikan dan beasiswa yang berkelanjutan.',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
    tag: 'Pendidikan'
  }
];

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);

  // States Database Real-time
  const [programs, setPrograms] = useState<any[]>([]);
  const [berita, setBerita] = useState<any[]>([]);
  const [stats, setStats] = useState({ penerima: 0, airBersih: 0, santri: 0 });
  const [isLoading, setIsLoading] = useState(true);

  // ANGKA MIGRASI DARI WORDPRESS LAMA (Bisa lu ubah sesuai data asli yayasan lu)
  const MIGRATION_OFFSET = {
    penerimaManfaat: 12000, 
    titikAirBersih: 50,
    santriDibina: 300
  };

  useEffect(() => {
    // 1. Timer Slider
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);

    // 2. Tarik Data Live dari Supabase
    const loadRealData = async () => {
      setIsLoading(true);

      // Tarik 3 Program Terbaru
      const { data: progs } = await supabase
        .from('programs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3);
      
      // Tarik 3 Berita Terbaru
      const { data: arts } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3);

      // Tarik Data Statistik Akurat (Kalkulasi dari DB)
      const { count: countDonations } = await supabase.from('donations').select('id', { count: 'exact', head: true });
      const { count: countAir } = await supabase.from('programs').select('id', { count: 'exact', head: true }).eq('category', 'Air Bersih');
      const { count: countPendidikan } = await supabase.from('programs').select('id', { count: 'exact', head: true }).eq('category', 'Pendidikan');

      if (progs) setPrograms(progs);
      if (arts) setBerita(arts);
      
      // Gabungkan data lama (offset) dengan data baru (Supabase)
      setStats({
        penerima: MIGRATION_OFFSET.penerimaManfaat + (countDonations || 0),
        airBersih: MIGRATION_OFFSET.titikAirBersih + (countAir || 0),
        santri: MIGRATION_OFFSET.santriDibina + (countPendidikan || 0)
      });

      setIsLoading(false);
    };

    loadRealData();

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-teal-500 selection:text-white">
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          opacity: 0;
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
      `}} />

      <main>
        {/* ========================================================== */}
        {/* HERO SLIDER ELEGANT */}
        {/* ========================================================== */}
        <section className="relative w-full h-[650px] lg:h-[750px] overflow-hidden bg-slate-900">
          {slides.map((slide, index) => (
            <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${activeSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
              <img 
                src={slide.image} 
                alt="Hero" 
                className={`w-full h-full object-cover opacity-70 transition-transform duration-[10000ms] ${activeSlide === index ? 'scale-100' : 'scale-110'}`} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-teal-950 via-teal-900/60 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-teal-950/90 via-teal-900/40 to-transparent hidden md:block" />
              
              <div className="absolute inset-0 flex items-center pt-16">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
                  <div className="max-w-2xl space-y-6">
                    <div className="animate-fade-in-up">
                      <span className="inline-block px-4 py-1.5 rounded-full border border-amber-400/30 bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-widest backdrop-blur-md">
                        {slide.tag}
                      </span>
                    </div>
                    <h1 className="animate-fade-in-up delay-100 text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.1] drop-shadow-lg">
                      {slide.title}
                    </h1>
                    <p className="animate-fade-in-up delay-200 text-lg text-teal-50/90 leading-relaxed max-w-xl drop-shadow-md">
                      {slide.description}
                    </p>
                    
                    <div className="animate-fade-in-up delay-300 flex flex-wrap items-center gap-4 pt-4">
                      {/* Tombol diarahkan ke sedekah bebas */}
                      <Link href="/sedekah" className="bg-amber-500 text-slate-900 px-8 py-4 rounded-full font-black shadow-xl shadow-amber-500/20 hover:bg-amber-400 transition-all hover:-translate-y-0.5 flex items-center gap-2">
                        Mulai Sedekah Bebas <Heart className="w-5 h-5" />
                      </Link>
                      <Link href="/program" className="px-8 py-4 rounded-full font-bold text-white border border-white/30 hover:bg-white/10 transition-colors backdrop-blur-sm">
                        Lihat Program Kami
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Navigasi Slider Bawah */}
          <div className="absolute bottom-12 right-6 lg:right-auto lg:left-1/2 lg:-translate-x-1/2 z-20 flex items-center gap-4">
            <div className="hidden lg:flex gap-2 mr-6">
              {slides.map((_, idx) => (
                <div key={idx} className={`h-1.5 rounded-full transition-all duration-500 ${activeSlide === idx ? 'w-8 bg-amber-500' : 'w-4 bg-white/30'}`} />
              ))}
            </div>
            <button onClick={() => setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))} className="p-3 rounded-full border border-white/20 bg-black/20 text-white backdrop-blur-md hover:bg-teal-600 transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={() => setActiveSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))} className="p-3 rounded-full border border-white/20 bg-black/20 text-white backdrop-blur-md hover:bg-teal-600 transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </section>

        {/* ========================================================== */}
        {/* FLOATING STATS LIVE ANIMATION */}
        {/* ========================================================== */}
        <section className="relative z-30 max-w-7xl mx-auto px-6 lg:px-8 -mt-24 mb-20 hidden md:block">
          <div className="bg-white/95 backdrop-blur-xl rounded-[2rem] shadow-2xl shadow-teal-900/5 p-8 border border-slate-100 animate-fade-in-up delay-200">
            <div className="grid grid-cols-4 gap-8 divide-x divide-slate-100">
              
              <div className="flex flex-col items-center text-center px-4 hover:-translate-y-1 transition-transform duration-300">
                <Users className="w-8 h-8 text-teal-600 mb-3" />
                <h3 className="text-3xl font-black text-slate-900">
                  <CountUpAnimation endValue={stats.penerima} suffix="+" />
                </h3>
                <p className="text-sm font-medium text-slate-500 mt-1">Penerima Manfaat</p>
              </div>
              
              <div className="flex flex-col items-center text-center px-4 hover:-translate-y-1 transition-transform duration-300">
                <Droplets className="w-8 h-8 text-teal-600 mb-3" />
                <h3 className="text-3xl font-black text-slate-900">
                  <CountUpAnimation endValue={stats.airBersih} suffix="+" />
                </h3>
                <p className="text-sm font-medium text-slate-500 mt-1">Titik Air Bersih</p>
              </div>
              
              <div className="flex flex-col items-center text-center px-4 hover:-translate-y-1 transition-transform duration-300">
                <BookOpen className="w-8 h-8 text-teal-600 mb-3" />
                <h3 className="text-3xl font-black text-slate-900">
                  <CountUpAnimation endValue={stats.santri} suffix="+" />
                </h3>
                <p className="text-sm font-medium text-slate-500 mt-1">Santri Dibina</p>
              </div>
              
              <div className="flex flex-col items-center text-center px-4 hover:-translate-y-1 transition-transform duration-300">
                <ShieldCheck className="w-8 h-8 text-teal-600 mb-3" />
                <h3 className="text-3xl font-black text-slate-900">
                  <CountUpAnimation endValue={100} suffix="%" />
                </h3>
                <p className="text-sm font-medium text-slate-500 mt-1">Amanah & Transparan</p>
              </div>

            </div>
          </div>
        </section>

        {/* ========================================================== */}
        {/* TENTANG YAYASAN & LEGALITAS RESMI */}
        {/* ========================================================== */}
        <section className="py-20 bg-slate-50 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center animate-fade-in-up">
            <div className="relative group">
              <div className="absolute inset-0 bg-teal-600 rounded-[3rem] -translate-x-4 translate-y-4 opacity-10 transition-transform duration-500 group-hover:-translate-x-6 group-hover:translate-y-6"></div>
              <img src="https://images.unsplash.com/photo-1544928147-79a2dbc1f389?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Kegiatan YAMU" className="relative rounded-[3rem] shadow-xl object-cover h-[500px] w-full border-4 border-white transition-transform duration-500 group-hover:scale-[1.02]" />
              <div className="absolute bottom-8 -right-4 bg-white p-5 rounded-2xl shadow-xl flex items-center gap-4 border border-slate-100 max-w-xs animate-bounce" style={{ animationDuration: '3s' }}>
                <div className="bg-amber-100 p-3 rounded-full text-amber-600 shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Terdaftar Resmi</p>
                  <p className="text-sm font-black text-slate-900">Pemerintah RI</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-teal-100 text-teal-700 text-xs font-bold uppercase tracking-widest">
                <Activity className="w-4 h-4" /> Tentang Kami
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight">
                Langkah Nyata Anda, <br/><span className="text-teal-600">Perubahan Besar Bagi Mereka</span>
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                YAMU Peduli berdedikasi menjembatani niat baik Anda. Kami memastikan setiap sedekah yang dititipkan tersalurkan tepat sasaran untuk menciptakan dampak dan kemandirian umat yang berkelanjutan.
              </p>
              
              {/* KOTAK LEGALITAS RESMI - RAPI & ELEGAN */}
              <div className="pt-4 grid sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-teal-300 transition-colors">
                  <div className="bg-teal-50 p-2.5 rounded-xl text-teal-600 shrink-0">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">SK Kemenkumham RI</h4>
                    <p className="text-xs font-medium text-slate-500 mt-1.5 leading-relaxed">
                      AHU-0016362.AH.01.04<br/>
                      AHU-AH.01.08-0043725
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-teal-300 transition-colors">
                  <div className="bg-teal-50 p-2.5 rounded-xl text-teal-600 shrink-0">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Dinsos & NPWP</h4>
                    <p className="text-xs font-medium text-slate-500 mt-1.5 leading-relaxed">
                      Kota Tangerang Selatan<br/>
                      NPWP: 86.715.418.9-453.000
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Link href="/tentang" className="inline-flex items-center font-bold text-teal-700 hover:text-teal-500 transition-colors group">
                  Kenali Kami Lebih Dekat <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================== */}
        {/* 5. 3 PROGRAM MENDESAK TERBARU (LIVE DB) */}
        {/* ========================================================== */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 animate-fade-in-up">
              <div>
                <p className="text-sm font-bold tracking-widest text-amber-500 uppercase mb-2">Program Kebaikan</p>
                <h2 className="text-3xl md:text-4xl font-black text-slate-900">Hadirkan Senyum Hari Ini</h2>
              </div>
              <Link href="/program" className="inline-flex items-center px-6 py-3 rounded-full bg-teal-50 font-bold text-teal-700 hover:bg-teal-100 transition-colors">
                Lihat Semua Program <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {isLoading ? (
                <div className="col-span-full py-20 flex flex-col items-center justify-center text-slate-400">
                  <Loader2 className="w-8 h-8 animate-spin text-teal-600 mb-3" />
                  <p className="font-bold uppercase tracking-wider text-xs">Memuat Program Terbaru...</p>
                </div>
              ) : programs.length > 0 ? (
                programs.map((prog) => {
                  const progress = Math.min(Math.round(((prog.terkumpul || 0) / prog.target) * 100), 100);
                  const isTargetReached = prog.terkumpul >= prog.target || prog.status === 'Selesai';

                  return (
                    <div key={prog.id} className="group bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col h-[480px]">
                      <div className="relative h-48 w-full overflow-hidden shrink-0">
                        <span className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-sm text-teal-700 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                          {prog.category}
                        </span>
                        
                        {/* Status Label Dinamis */}
                        {isTargetReached ? (
                          <span className="absolute top-4 right-4 z-10 bg-emerald-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1.5 uppercase tracking-wider">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Terpenuhi
                          </span>
                        ) : (
                          <span className="absolute top-4 right-4 z-10 bg-amber-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1.5 uppercase tracking-wider">
                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span> Berjalan
                          </span>
                        )}

                        <img src={prog.image_url} alt={prog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                      
                      <div className="p-6 flex flex-col flex-grow justify-between">
                        <div>
                          <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-teal-600 transition-colors leading-snug line-clamp-2">{prog.title}</h3>
                          <p className="text-slate-500 text-xs md:text-sm mb-4 line-clamp-2">{prog.description}</p>
                        </div>
                        
                        <div className="mt-auto">
                          <div className="flex justify-between items-end mb-2">
                            <div className="flex flex-col">
                              <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-0.5">Terkumpul</span>
                              <span className="text-teal-600 font-extrabold text-sm">Rp {(prog.terkumpul || 0).toLocaleString('id-ID')}</span>
                            </div>
                            <div className="flex flex-col text-right">
                              <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-0.5">Target</span>
                              <span className="text-slate-700 font-bold text-xs">Rp {prog.target.toLocaleString('id-ID')}</span>
                            </div>
                          </div>
                          <div className="w-full bg-slate-100 rounded-full h-1.5 mb-5 overflow-hidden">
                            <div className={`h-full rounded-full transition-all duration-1000 ${isTargetReached ? 'bg-emerald-500' : 'bg-teal-500'}`} style={{ width: `${progress}%` }}></div>
                          </div>
                          
                          <Link href={`/program/${prog.id}`} className={`block text-center w-full py-3 font-bold rounded-xl transition-colors text-sm border ${isTargetReached ? 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100' : 'bg-teal-50 text-teal-700 border-teal-100 hover:bg-teal-600 hover:text-white hover:border-teal-600'}`}>
                            {isTargetReached ? 'Lihat Detail' : 'Donasi Sekarang'}
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="col-span-full text-center py-12 text-slate-400 font-bold text-sm bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                  Belum ada program kampanye yang ditayangkan.
                </p>
              )}
            </div>
          </div>
        </section>

        {/* ========================================================== */}
        {/* 6. 3 BERITA TERBARU (LIVE DB) */}
        {/* ========================================================== */}
        <section className="py-24 bg-slate-50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 animate-fade-in-up">
              <div>
                <p className="text-sm font-bold tracking-widest text-amber-500 uppercase mb-2">Berita & Artikel</p>
                <h2 className="text-3xl md:text-4xl font-black text-slate-900">Kabar Penyaluran Terbaru</h2>
              </div>
              <Link href="/berita" className="inline-flex items-center px-6 py-3 rounded-full bg-white border border-slate-200 font-bold text-slate-700 hover:bg-slate-100 transition-colors">
                Lihat Semua Berita <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {isLoading ? (
                <p className="text-slate-400 font-bold col-span-full text-center py-10 uppercase tracking-wider text-xs">Memuat Berita...</p>
              ) : berita.length > 0 ? (
                berita.map((item) => (
                  <Link href={`/berita/${item.id}`} key={item.id} className="group bg-white rounded-3xl p-5 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col gap-4">
                    <div className="w-full h-48 rounded-2xl overflow-hidden shrink-0 bg-slate-100">
                      <img src={item.image_url} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="flex flex-col flex-grow">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider bg-amber-50 border border-amber-100 px-2 py-1 rounded-md">{item.category}</span>
                        <span className="text-xs text-slate-400 font-medium flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric'})}</span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-teal-600 transition-colors line-clamp-2 leading-snug">{item.title}</h3>
                      <p className="text-sm text-slate-500 line-clamp-2">{item.snippet}</p>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="col-span-full text-center py-12 text-slate-400 font-bold text-sm bg-white rounded-3xl border border-dashed border-slate-200">
                  Belum ada publikasi berita/artikel terbaru.
                </p>
              )}
            </div>
          </div>
        </section>

        {/* ========================================================== */}
        {/* 7. LOKASI MAPS & KONTAK */}
        {/* ========================================================== */}
        <section className="bg-slate-50 py-20 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in-up">
              <div>
                <h2 className="text-3xl font-black text-slate-900 mb-4">Kunjungi Kantor Kami</h2>
                <p className="text-slate-600 leading-relaxed">Pintu kantor Yayasan YAMU Peduli selalu terbuka untuk Anda yang ingin bersilaturahmi, konsultasi program, atau melihat langsung operasional administrasi kami.</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-5 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                  <div className="bg-teal-50 p-3 rounded-full text-teal-600 shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Alamat Pusat</h4>
                    <p className="text-sm text-slate-500 mt-1 leading-relaxed">JL. Jombang Raya, 
                    Villa Jombang Baru Blok A3 No.26  RT 001  RW 014. 
                    Kel. Jombang
                    Kec. Ciputat
                    Kota. Tangerang Selatan
                    Kode pos  15224.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-5 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                  <div className="bg-teal-50 p-3 rounded-full text-teal-600 shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Layanan Donatur</h4>
                    <p className="text-sm text-slate-500 mt-1">Senin - Minggu (08:00 - 20:00)<br/>WhatsApp: +6287819972512</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="h-[450px] bg-slate-200 rounded-[2rem] overflow-hidden shadow-lg border-4 border-white relative animate-fade-in-up delay-200">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1982.8500131548194!2d106.71453997001967!3d-6.303088139770467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69e5593a557f25%3A0x94cc918c76af961e!2sYAYASAN%20AN%20NAFI%20MUTIARA%20UMMAT!5e0!3m2!1sid!2sid!4v1780119967311!5m2!1sid!2sid"
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade">
              </iframe>
            </div>
          </div>
        </section>
      </main>

      {/* ========================================================== */}
      {/* 8. FOOTER DENGAN NAMA YAYASAN ASLI */}
      {/* ========================================================== */}
      <footer className="bg-teal-950 text-teal-50 pt-20 pb-24 sm:pb-10 border-t-4 border-amber-500">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            
            <div className="lg:col-span-1 space-y-6">
              <div className="flex items-center gap-2">
                <Heart className="w-7 h-7 text-amber-400" />
                <span className="text-2xl font-black tracking-tight text-white">YAMU Peduli</span>
              </div>
              <p className="text-sm text-teal-200/80 leading-relaxed">
                <strong className="text-white font-bold">Yayasan An-Nafi Mutiara Ummat</strong> berdedikasi membangun kemandirian umat melalui program kemanusiaan, pendidikan, dan sosial keagamaan yang resmi dan terdaftar di Kemenkumham RI.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-6">Tentang Kami</h4>
              <ul className="space-y-3 text-sm text-teal-200/80">
                <li><Link href="/tentang" className="hover:text-amber-400 transition-colors">Profil Yayasan</Link></li>
                <li><Link href="/visi-misi" className="hover:text-amber-400 transition-colors">Visi & Misi</Link></li>
                <li><Link href="/legalitas" className="hover:text-amber-400 transition-colors">Legalitas</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-6">Layanan Donasi</h4>
              <ul className="space-y-3 text-sm text-teal-200/80">
                <li><Link href="/program" className="hover:text-amber-400 transition-colors">Semua Program</Link></li>
                <li><Link href="/sedekah" className="hover:text-amber-400 transition-colors">Sedekah Bebas</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-6">Ikuti Kami</h4>
              <div className="flex gap-3">
                <a href="https://www.instagram.com/yamupeduli" target="_blank" rel="noreferrer" className="p-3 bg-teal-900 rounded-xl hover:bg-amber-500 hover:text-slate-900 transition-all"><FaInstagram className="w-5 h-5" /></a>
                <a href="https://www.youtube.com/@yamufoundation7691" target="_blank" rel="noreferrer" className="p-3 bg-teal-900 rounded-xl hover:bg-amber-500 hover:text-slate-900 transition-all"><FaYoutube className="w-5 h-5" /></a>
                <a href="https://www.facebook.com/p/annafi-mutiara-ummat-100066893095636/ " target="_blank" rel="noreferrer" className="p-3 bg-teal-900 rounded-xl hover:bg-amber-500 hover:text-slate-900 transition-all"><FaFacebook className="w-5 h-5" /></a>
              </div>
            </div>
          </div>
        </div>
        <footer className="bg-teal-950 text-teal-50 pt-4 pb-6 border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center text-xs text-teal-500">
            &copy; {new Date().getFullYear()} YAYASAN AN-NAFI MUTIARA UMMAT. All rights reserved.
          </div>
        </footer>
      </footer>

      {/* ========================================================== */}
      {/* 9. FLOATING CTA (Mobile & WA) */}
      {/* ========================================================== */}
      <a href="https://wa.me/6287819972512" target="_blank" rel="noreferrer" className="fixed bottom-24 sm:bottom-8 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all border-4 border-white/50">
        <MessageCircle className="w-8 h-8" />
      </a>
      <div className="sm:hidden fixed bottom-0 left-0 w-full z-40 p-4 bg-white/95 backdrop-blur-md border-t border-slate-200 pb-safe">
        <Link href="/sedekah" className="flex items-center justify-center w-full bg-teal-600 text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-teal-600/20 active:scale-95 transition-transform text-base gap-2">
          Mulai Sedekah Bebas <Heart className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
}