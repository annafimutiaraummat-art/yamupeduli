'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaInstagram, FaYoutube, FaFacebook, FaWhatsapp } from 'react-icons/fa';
import {
  Phone, Heart, ArrowRight, CheckCircle2, Users, Droplets,
  BookOpen, MapPin, MessageCircle, ShieldCheck, FileText,
  Activity, Calendar, Calculator, Landmark, Gift, Quote, Coins,
  Sparkles, HandHeart, ChevronRight, Award, Compass, HeartHandshake
} from 'lucide-react';
import Image from 'next/image';
import { supabase } from '@/supabase';
import toast from 'react-hot-toast';

const CountUpAnimation = ({ endValue, suffix = '' }: { endValue: number, suffix?: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const duration = 2500;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * endValue));
      if (progress < 1) requestAnimationFrame(animate);
    };
    if (endValue > 0) requestAnimationFrame(animate);
  }, [endValue]);

  return <span>{count.toLocaleString('id-ID')}{suffix}</span>;
};

const getYouTubeId = (url: string) => {
  if (!url) return null;
  const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=|shorts\/)|youtu\.be\/)([^"&?\/\s]{11})/i);
  return match ? match[1] : null;
};

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
    tag: 'Pendidikan Santri'
  }
];

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [programs, setPrograms] = useState<any[]>([]);
  const [berita, setBerita] = useState<any[]>([]);
  const [doaList, setDoaList] = useState<any[]>([]);
  const [stats, setStats] = useState({ penerima: 12150, airBersih: 52, santri: 310 });
  const [isLoading, setIsLoading] = useState(true);

  const [clickedAmins, setClickedAmins] = useState<string[]>([]);
  const [qurbanStatus, setQurbanStatus] = useState<'OFF' | 'ON' | 'POST'>('OFF');

  // State Kalkulator Zakat
  const [gaji, setGaji] = useState('');
  const [bonus, setBonus] = useState('');

  const totalPendapatan = (Number(gaji) || 0) + (Number(bonus) || 0);
  const zakatNominal = totalPendapatan * 0.025;

  const MIGRATION_OFFSET = { penerimaManfaat: 12000, titikAirBersih: 50, santriDibina: 300 };

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);

    const savedAmins = localStorage.getItem('yamu_clicked_amins');
    if (savedAmins) {
      try { setClickedAmins(JSON.parse(savedAmins)); } catch (e) {}
    }

    const loadRealData = async () => {
      setIsLoading(true);
      try {
        const { data: progs } = await supabase.from('programs').select('*').order('created_at', { ascending: false }).limit(3);
        const { data: arts } = await supabase.from('articles').select('*').order('created_at', { ascending: false }).limit(3);
        const { data: qurbanSettings } = await supabase.from('qurban_settings').select('status').eq('id', 1).maybeSingle();

        const { data: prayers } = await supabase.from('donations')
          .select('id, name, message, amin_count, created_at, program_title')
          .eq('status', 'LUNAS')
          .not('message', 'is', null)
          .neq('message', '')
          .neq('message', 'Menunggu konfirmasi via WA')
          .order('created_at', { ascending: false })
          .limit(3);

        const { count: countDonations } = await supabase.from('donations').select('id', { count: 'exact', head: true });
        const { count: countAir } = await supabase.from('programs').select('id', { count: 'exact', head: true }).eq('category', 'Air Bersih');
        const { count: countPendidikan } = await supabase.from('programs').select('id', { count: 'exact', head: true }).eq('category', 'Pendidikan');

        if (progs && progs.length > 0) setPrograms(progs);
        if (arts && arts.length > 0) setBerita(arts);
        if (prayers && prayers.length > 0) setDoaList(prayers);
        if (qurbanSettings?.status) setQurbanStatus(qurbanSettings.status);

        setStats({
          penerima: MIGRATION_OFFSET.penerimaManfaat + (countDonations || 0),
          airBersih: MIGRATION_OFFSET.titikAirBersih + (countAir || 0),
          santri: MIGRATION_OFFSET.santriDibina + (countPendidikan || 0)
        });
      } catch (err) {
        console.warn('Proteksi Jaringan: Menampilkan data cadangan lokal', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadRealData();
    return () => clearInterval(timer);
  }, []);

  const handleAminSubmit = async (id: string, currentCount: number) => {
    if (clickedAmins.includes(id)) {
      toast('Anda sudah mengaminkan doa ini', { icon: '✨' });
      return;
    }

    setDoaList(prev => prev.map(p => p.id === id ? { ...p, amin_count: (p.amin_count || 0) + 1 } : p));
    const newClicked = [...clickedAmins, id];
    setClickedAmins(newClicked);
    localStorage.setItem('yamu_clicked_amins', JSON.stringify(newClicked));

    try {
      await supabase
        .from('donations')
        .update({ amin_count: (currentCount || 0) + 1 })
        .eq('id', id);
      toast.success('Aamiin, doa berhasil diaminkan.', { duration: 1500 });
    } catch (err) {
      console.warn('Gagal sync amin ke server:', err);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f7f6] font-sans text-slate-900 selection:bg-teal-500 selection:text-white">
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { opacity: 0; animation: fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
      `}} />

      <main>
        {/* VIBRANT BRANDED HERO SLIDER */}
        <section className="relative w-full min-h-[580px] lg:min-h-[660px] overflow-hidden bg-gradient-to-b from-teal-950 via-cyan-950 to-slate-900">
          {slides.map((slide, index) => (
            <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${activeSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
              <Image src={slide.image} alt="Hero" fill priority className="object-cover opacity-35 scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#f4f7f6] via-teal-950/60 to-teal-900/40" />
              <div className="absolute inset-0 flex items-center justify-center pt-8">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
                  <div className="max-w-3xl space-y-6 text-center mx-auto">
                    <div className="animate-fade-in-up">
                      <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-amber-400/40 bg-amber-500/20 text-amber-300 text-xs font-black uppercase tracking-widest backdrop-blur-md shadow-sm">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" /> {slide.tag}
                      </span>
                    </div>
                    <h1 className="animate-fade-in-up delay-100 text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight drop-shadow-md">
                      {slide.title}
                    </h1>
                    <p className="animate-fade-in-up delay-200 text-sm md:text-base text-cyan-50/90 leading-relaxed max-w-2xl mx-auto font-medium">
                      {slide.description}
                    </p>
                    <div className="animate-fade-in-up delay-300 flex flex-wrap justify-center gap-3 pt-2">
                      <Link href="/sedekah" className="bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-teal-950 px-8 py-3.5 rounded-full font-black shadow-lg shadow-amber-500/25 hover:from-amber-400 hover:to-yellow-400 hover:-translate-y-0.5 transition-all flex items-center gap-2 text-sm md:text-base active:scale-95">
                        Mulai Sedekah Subuh <Heart className="w-4 h-4 fill-current text-teal-950" />
                      </Link>
                      <Link href="/program" className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-6 py-3.5 rounded-full font-bold transition-all text-sm flex items-center gap-2">
                        Lihat Program <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* FLOATING STATS CARD */}
        <section className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 md:-mt-20 mb-10">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-xl shadow-teal-900/10 p-6 md:p-8 border border-teal-100/80 animate-fade-in-up delay-200">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-6 gap-x-4 lg:gap-8 lg:divide-x divide-teal-100">
              <div className="flex flex-col items-center text-center px-2 lg:px-4 hover:-translate-y-1 transition-transform duration-300">
                <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mb-3 border border-teal-100">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-slate-900"><CountUpAnimation endValue={stats.penerima} suffix="+" /></h3>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">Penerima Manfaat</p>
              </div>
              <div className="flex flex-col items-center text-center px-2 lg:px-4 hover:-translate-y-1 transition-transform duration-300">
                <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center mb-3 border border-cyan-100">
                  <Droplets className="w-6 h-6" />
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-slate-900"><CountUpAnimation endValue={stats.airBersih} suffix="+" /></h3>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">Titik Air Bersih</p>
              </div>
              <div className="flex flex-col items-center text-center px-2 lg:px-4 hover:-translate-y-1 transition-transform duration-300">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3 border border-amber-100">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-slate-900"><CountUpAnimation endValue={stats.santri} suffix="+" /></h3>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">Santri Dibina</p>
              </div>
              <div className="flex flex-col items-center text-center px-2 lg:px-4 hover:-translate-y-1 transition-transform duration-300">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3 border border-emerald-100">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-slate-900"><CountUpAnimation endValue={100} suffix="%" /></h3>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">Amanah & Transparan</p>
              </div>
            </div>
          </div>
        </section>

        {/* PILAR KEBAIKAN (NATURAL & VIBRANT) */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-20 animate-fade-in-up delay-300">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-block px-3.5 py-1 rounded-full bg-teal-50 border border-teal-200/80 text-teal-700 font-black text-[10px] uppercase tracking-widest mb-2">
              Layanan Utama
            </span>
            <h2 className="text-2xl md:text-4xl font-black text-slate-900 mb-3">Jalur Kebaikan YAMU</h2>
            <p className="text-xs md:text-sm text-slate-500 font-medium">Salurkan amanah Anda melalui program resmi yang dikelola secara profesional, tepat sasaran, dan akuntabel.</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <Link href="/sedekah" className="group bg-white p-6 rounded-3xl border border-teal-100/80 shadow-sm hover:shadow-xl hover:border-teal-400 transition-all duration-300 flex flex-col items-center text-center relative overflow-hidden">
              <div className="w-14 h-14 bg-teal-50 border border-teal-100 rounded-2xl text-teal-600 mb-4 flex items-center justify-center group-hover:scale-110 group-hover:bg-gradient-to-r group-hover:from-teal-600 group-hover:to-cyan-600 group-hover:text-white transition-all duration-300 shadow-sm">
                <Heart className="w-7 h-7" />
              </div>
              <h3 className="text-base font-black text-slate-900 mb-1.5">Infaq & Sedekah</h3>
              <p className="text-[11px] text-slate-500 leading-relaxed font-medium">Pahala jariyah tak terputus untuk mendukung operasional dan dakwah sosial.</p>
            </Link>

            <a href="#kalkulator-zakat" className="group bg-white p-6 rounded-3xl border border-amber-100/80 shadow-sm hover:shadow-xl hover:border-amber-400 transition-all duration-300 flex flex-col items-center text-center relative overflow-hidden">
              <div className="w-14 h-14 bg-amber-50 border border-amber-100 rounded-2xl text-amber-600 mb-4 flex items-center justify-center group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300 shadow-sm">
                <Calculator className="w-7 h-7" />
              </div>
              <h3 className="text-base font-black text-slate-900 mb-1.5">Tunaikan Zakat</h3>
              <p className="text-[11px] text-slate-500 leading-relaxed font-medium">Sucikan harta Anda dengan kalkulasi nisab zakat penghasilan yang presisi.</p>
            </a>

            <Link href="/program" className="group bg-white p-6 rounded-3xl border border-cyan-100/80 shadow-sm hover:shadow-xl hover:border-cyan-400 transition-all duration-300 flex flex-col items-center text-center relative overflow-hidden">
              <div className="w-14 h-14 bg-cyan-50 border border-cyan-100 rounded-2xl text-cyan-600 mb-4 flex items-center justify-center group-hover:scale-110 group-hover:bg-cyan-600 group-hover:text-white transition-all duration-300 shadow-sm">
                <Landmark className="w-7 h-7" />
              </div>
              <h3 className="text-base font-black text-slate-900 mb-1.5">Wakaf Abadi</h3>
              <p className="text-[11px] text-slate-500 leading-relaxed font-medium">Bangun peradaban lewat sumur bor dan sarana pendidikan yang kokoh.</p>
            </Link>

            <Link href="/qurban" className="group bg-white p-6 rounded-3xl border border-emerald-100/80 shadow-sm hover:shadow-xl hover:border-emerald-400 transition-all duration-300 flex flex-col items-center text-center relative overflow-hidden">
              <div className="w-14 h-14 bg-emerald-50 border border-emerald-100 rounded-2xl text-emerald-600 mb-4 flex items-center justify-center group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300 shadow-sm">
                <Gift className="w-7 h-7" />
              </div>
              <h3 className="text-base font-black text-slate-900 mb-1.5">Program Qurban</h3>
              <p className="text-[11px] text-slate-500 leading-relaxed font-medium">Qurban pelosok syar'i atau ikuti program Tabungan Qurban Berkala.</p>
            </Link>
          </div>
        </section>

        {/* KALKULATOR ZAKAT (BG BRANDED DEEP TEAL/CYAN) */}
        <section id="kalkulator-zakat" className="py-16 bg-gradient-to-br from-teal-900 via-cyan-900 to-emerald-950 text-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-10 items-center relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white/10 text-cyan-200 text-xs font-bold uppercase tracking-widest mb-3 border border-white/15">
                <Calculator className="w-4 h-4 text-amber-400" /> Zakat Profesi
              </div>
              <h2 className="text-2xl md:text-4xl font-black mb-3 text-white leading-tight">
                Sucikan Harta, <span className="text-amber-400">Berkahkan Rezeki</span>
              </h2>
              <p className="text-cyan-100/80 text-xs md:text-sm leading-relaxed mb-6 font-medium">
                Zakat profesi dikeluarkan dari penghasilan rutin bulanan. Masukkan estimasi penghasilan Anda untuk menghitung kewajiban zakat (2,5%) secara syar'i.
              </p>
            </div>
            <div className="bg-white rounded-3xl p-6 shadow-2xl text-slate-900 border border-teal-100/80">
              <div className="space-y-3 mb-5">
                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1">Penghasilan Per Bulan (Rp)</label>
                  <input type="number" value={gaji} onChange={(e) => setGaji(e.target.value)} placeholder="Contoh: 10000000" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-base font-bold text-slate-900 focus:outline-none focus:border-teal-600" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1">Bonus / THR / Lainnya (Rp)</label>
                  <input type="number" value={bonus} onChange={(e) => setBonus(e.target.value)} placeholder="Contoh: 2000000" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-base font-bold text-slate-900 focus:outline-none focus:border-teal-600" />
                </div>
              </div>
              <div className="bg-teal-50/80 rounded-2xl p-4 border border-teal-200/80 mb-5">
                <p className="text-xs font-bold text-slate-600 mb-1">Kewajiban Zakat Anda (2,5%)</p>
                <p className="text-2xl font-black text-teal-700">Rp {zakatNominal.toLocaleString('id-ID')}</p>
              </div>
              <Link href={`/sedekah?kategori=Zakat&nominal=${zakatNominal}`} className={`block w-full py-3.5 text-center rounded-xl font-black text-xs uppercase tracking-wider transition-all shadow-md ${zakatNominal > 0 ? 'bg-gradient-to-r from-amber-500 to-amber-400 text-teal-950 hover:from-amber-400 hover:to-yellow-400' : 'bg-slate-200 text-slate-400 pointer-events-none'}`}>
                Tunaikan Zakat Sekarang
              </Link>
            </div>
          </div>
        </section>

        {/* PROGRAM KEMANUSIAAN TERBARU */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
              <div>
                <span className="text-[10px] font-black tracking-widest text-amber-500 uppercase mb-1 block">Program Pilihan</span>
                <h2 className="text-2xl md:text-3xl font-black text-slate-900">Bantu Sekarang Hari Ini</h2>
              </div>
              <Link href="/program" className="inline-flex items-center px-5 py-2.5 rounded-full bg-teal-50 font-bold text-teal-700 hover:bg-teal-100 transition-colors text-xs">
                Lihat Semua Program <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Link>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {isLoading ? (
                [1, 2, 3].map((n) => (
                  <div key={n} className="bg-slate-50 rounded-3xl h-80 animate-pulse border border-slate-100" />
                ))
              ) : programs.length > 0 ? (
                programs.map((prog) => {
                  const progress = Math.min(Math.round(((prog.terkumpul || 0) / prog.target) * 100), 100);
                  const isTargetReached = prog.terkumpul >= prog.target || prog.status === 'Selesai';
                  return (
                    <div key={prog.id} className="group bg-white rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col h-[440px]">
                      <div className="relative h-44 w-full overflow-hidden shrink-0 bg-slate-100">
                        <span className="absolute top-3 left-3 z-10 bg-white/95 backdrop-blur-sm text-teal-700 text-[10px] font-black px-2.5 py-1 rounded-full shadow-sm">
                          {prog.category}
                        </span>
                        <img src={prog.image_url || '/placeholder.jpg'} alt={prog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                      <div className="p-5 flex flex-col flex-grow justify-between">
                        <div>
                          <h3 className="text-base font-black text-slate-900 mb-1.5 group-hover:text-teal-600 transition-colors line-clamp-2 leading-snug">
                            {prog.title}
                          </h3>
                          <p className="text-slate-500 text-xs mb-3 line-clamp-2 font-medium">{prog.description}</p>
                        </div>
                        <div className="mt-auto">
                          <div className="flex justify-between items-end mb-1.5 text-xs">
                            <div>
                              <span className="text-slate-400 text-[9px] font-bold uppercase block">Terkumpul</span>
                              <span className="text-teal-700 font-black">Rp {(prog.terkumpul || 0).toLocaleString('id-ID')}</span>
                            </div>
                            <div className="text-right">
                              <span className="text-slate-400 text-[9px] font-bold uppercase block">Target</span>
                              <span className="text-slate-600 font-bold">Rp {prog.target.toLocaleString('id-ID')}</span>
                            </div>
                          </div>
                          <div className="w-full bg-slate-100 rounded-full h-2 mb-4 overflow-hidden p-0.5 border border-slate-200/50">
                            <div className={`h-full rounded-full transition-all duration-700 ${isTargetReached ? 'bg-emerald-500' : 'bg-gradient-to-r from-teal-500 to-amber-400'}`} style={{ width: `${progress}%` }} />
                          </div>
                          <Link href={`/program/${prog.id}`} className="block text-center w-full py-2.5 font-bold rounded-xl text-xs border border-teal-200 bg-teal-50 text-teal-700 hover:bg-teal-600 hover:text-white transition-all">
                            {isTargetReached ? 'Lihat Detail' : 'Donasi Sekarang'}
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : null}
            </div>
          </div>
        </section>

        {/* DINDING DOA */}
        <section className="py-16 bg-teal-50/40 border-t border-teal-100/60">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="inline-block px-3 py-1 rounded-full bg-teal-100/80 text-teal-800 font-bold text-[10px] uppercase tracking-widest mb-2">
                Mading Kebaikan
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">Untaian Doa Donatur</h2>
              <p className="text-xs md:text-sm text-slate-500 font-medium">Mari aminkan doa tulus para #OrangBaik, semoga berbalik menjadi keberkahan untuk kita semua.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-5 mb-8">
              {doaList.map((prayer) => {
                const isAlreadyAmin = clickedAmins.includes(prayer.id);
                return (
                  <div key={prayer.id} className="bg-white p-5 rounded-2xl shadow-sm border border-teal-100/80 flex flex-col justify-between">
                    <p className="text-slate-700 italic text-xs leading-relaxed mb-4 font-medium line-clamp-3">
                      "{prayer.message}"
                    </p>
                    <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                      <span className="font-bold text-slate-900 text-xs truncate max-w-[140px]">{prayer.name || 'Hamba Allah'}</span>
                      <button
                        onClick={() => handleAminSubmit(prayer.id, prayer.amin_count || 0)}
                        className={`flex items-center gap-1 px-2.5 py-1 border text-[11px] font-black rounded-lg transition-all ${isAlreadyAmin ? 'bg-rose-50 border-rose-100 text-rose-500' : 'bg-slate-50 border-slate-200 text-slate-500 hover:text-rose-500'}`}
                      >
                        <Heart className={`w-3.5 h-3.5 ${isAlreadyAmin ? 'fill-current text-rose-500' : ''}`} />
                        <span>{prayer.amin_count || 0} Aamiin</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="text-center">
              <Link href="/ruang-doa" className="inline-flex items-center px-6 py-3 rounded-full bg-white border border-teal-200 font-black text-xs text-teal-700 hover:bg-teal-50 transition-all shadow-sm gap-2">
                Lihat Semua Doa <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* FLOATING WHATSAPP CTA */}
      <a className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white p-3.5 rounded-full shadow-lg hover:bg-emerald-500 transition-colors flex items-center justify-center active:scale-95" href="https://wa.me/6287819972512" target="_blank" rel="noopener noreferrer">
        <FaWhatsapp className="w-7 h-7" />
      </a>
    </div>
  );
}