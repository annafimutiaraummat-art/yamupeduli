'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaInstagram, FaYoutube, FaFacebook, FaWhatsapp } from 'react-icons/fa';
import {
  Phone, Heart, ArrowRight, CheckCircle2, Users, Droplets,
  BookOpen, MapPin, MessageCircle, ShieldCheck, FileText,
  Activity, Calendar, Calculator, Landmark, Gift, Quote, Coins
} from 'lucide-react';
import Image from 'next/image';
import { createClient } from '@supabase/supabase-js';
import toast from 'react-hot-toast'; // Kita pakai toast resmi di sini bro

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

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

const getYouTubeEmbedUrl = (url: string) => {
  const id = getYouTubeId(url);
  return id ? `https://www.youtube.com/embed/${id}` : null;
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
    tag: 'Pendidikan'
  }
];

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [programs, setPrograms] = useState<any[]>([]);
  const [berita, setBerita] = useState<any[]>([]);
  const [doaList, setDoaList] = useState<any[]>([]);
  const [stats, setStats] = useState({ penerima: 0, airBersih: 0, santri: 0 });
  const [isLoading, setIsLoading] = useState(true);

  // --- STATE INTERAKTIF BARU UNTUK RUANG DOA DI HOMEPAGE ---
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

    // Ambil list doa yang pernah diaminkan dari LocalStorage device ini
    const savedAmins = localStorage.getItem('yamu_clicked_amins');
    if (savedAmins) {
      setClickedAmins(JSON.parse(savedAmins));
    }

    const loadRealData = async () => {
      setIsLoading(true);

      const { data: progs } = await supabase.from('programs').select('*').order('created_at', { ascending: false }).limit(3);
      const { data: arts } = await supabase.from('articles').select('*').order('created_at', { ascending: false }).limit(3);
      const { data: qurbanSettings } = await supabase.from('qurban_settings').select('status').eq('id', 1).maybeSingle();

      // PERBAIKAN: Masukkan kolom amin_count ke dalam select query
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

      if (progs) setPrograms(progs);
      if (arts) setBerita(arts);
      if (prayers) setDoaList(prayers);
      if (qurbanSettings) setQurbanStatus(qurbanSettings.status);

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

  // FUNGSI AKSI BARU: Mengaminkan Doa Secara Real-time langsung dari Beranda
  const handleAminSubmit = async (id: string, currentCount: number) => {
    if (clickedAmins.includes(id)) {
      toast('Anda sudah mengaminkan doa ini', { icon: '✨' });
      return;
    }

    // Update di layar secara instan (Optimistic Update)
    setDoaList(prev => prev.map(p => p.id === id ? { ...p, amin_count: (p.amin_count || 0) + 1 } : p));

    const newClicked = [...clickedAmins, id];
    setClickedAmins(newClicked);
    localStorage.setItem('yamu_clicked_amins', JSON.stringify(newClicked));

    const { error } = await supabase
      .from('donations')
      .update({ amin_count: (currentCount || 0) + 1 })
      .eq('id', id);

    if (error) {
      // Kembalikan ke angka semula jika server gagal merespon
      setDoaList(prev => prev.map(p => p.id === id ? { ...p, amin_count: currentCount } : p));
      toast.error('Gagal mengaminkan, coba lagi.');
    } else {
      toast.success('Aamiin, doa berhasil diaminkan.', { duration: 1500 });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-teal-500 selection:text-white">
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { opacity: 0; animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
      `}} />

      <main>
        {/* HERO SLIDER */}
        <section className="relative w-full min-h-[600px] lg:min-h-[700px] overflow-hidden bg-slate-900">
          {slides.map((slide, index) => (
            <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${activeSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
              <Image src={slide.image} alt="Hero" fill priority className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-teal-950/40 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center pt-10">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
                  <div className="max-w-3xl space-y-6 text-center mx-auto">
                    <div className="animate-fade-in-up"><span className="inline-block px-4 py-1.5 rounded-full border border-amber-400/30 bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-widest backdrop-blur-md">{slide.tag}</span></div>
                    <h1 className="animate-fade-in-up delay-100 text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight drop-shadow-lg">{slide.title}</h1>
                    <p className="animate-fade-in-up delay-200 text-sm md:text-lg text-teal-50/90 leading-relaxed max-w-xl mx-auto drop-shadow-md">{slide.description}</p>
                    <div className="animate-fade-in-up delay-300 flex justify-center pt-4">
                      <Link href="/sedekah" className="bg-amber-500 text-slate-900 px-8 py-4 rounded-full font-black shadow-xl shadow-amber-500/20 hover:bg-amber-400 hover:-translate-y-1 transition-all flex items-center gap-2 text-sm md:text-base">Mulai Sedekah Bebas <Heart className="w-5 h-5" /></Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* FLOATING STATS */}
        <section className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 md:-mt-24 mb-10">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl md:rounded-[2rem] shadow-2xl shadow-teal-900/10 p-6 md:p-8 border border-slate-100 animate-fade-in-up delay-200">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-4 lg:gap-8 lg:divide-x divide-slate-100">
              <div className="flex flex-col items-center text-center px-2 lg:px-4 hover:-translate-y-1 transition-transform duration-300">
                <Users className="w-7 h-7 md:w-8 md:h-8 text-teal-600 mb-2 md:mb-3" />
                <h3 className="text-2xl md:text-3xl font-black text-slate-900"><CountUpAnimation endValue={stats.penerima} suffix="+" /></h3>
                <p className="text-xs md:text-sm font-medium text-slate-500 mt-1">Penerima Manfaat</p>
              </div>
              <div className="flex flex-col items-center text-center px-2 lg:px-4 hover:-translate-y-1 transition-transform duration-300">
                <Droplets className="w-7 h-7 md:w-8 md:h-8 text-teal-600 mb-2 md:mb-3" />
                <h3 className="text-2xl md:text-3xl font-black text-slate-900"><CountUpAnimation endValue={stats.airBersih} suffix="+" /></h3>
                <p className="text-xs md:text-sm font-medium text-slate-500 mt-1">Titik Air Bersih</p>
              </div>
              <div className="flex flex-col items-center text-center px-2 lg:px-4 hover:-translate-y-1 transition-transform duration-300">
                <BookOpen className="w-7 h-7 md:w-8 md:h-8 text-teal-600 mb-2 md:mb-3" />
                <h3 className="text-2xl md:text-3xl font-black text-slate-900"><CountUpAnimation endValue={stats.santri} suffix="+" /></h3>
                <p className="text-xs md:text-sm font-medium text-slate-500 mt-1">Santri Dibina</p>
              </div>
              <div className="flex flex-col items-center text-center px-2 lg:px-4 hover:-translate-y-1 transition-transform duration-300">
                <ShieldCheck className="w-7 h-7 md:w-8 md:h-8 text-teal-600 mb-2 md:mb-3" />
                <h3 className="text-2xl md:text-3xl font-black text-slate-900"><CountUpAnimation endValue={100} suffix="%" /></h3>
                <p className="text-xs md:text-sm font-medium text-slate-500 mt-1">Amanah & Transparan</p>
              </div>
            </div>
          </div>
        </section>

        {/* PILAR KEBAIKAN */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-24 animate-fade-in-up delay-300">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-3">Pilih Jalur Kebaikan</h2>
            <p className="text-sm md:text-base text-slate-500 font-medium">Salurkan amanah Anda melalui program resmi kami yang dikelola secara profesional, tepat sasaran, dan transparan.</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <Link href="/sedekah" className="group bg-white p-6 md:p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-xl hover:border-teal-500 transition-all duration-300 flex flex-col items-center text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-teal-400 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="w-16 h-16 bg-teal-50 border border-teal-100 rounded-2xl text-teal-600 mb-5 flex items-center justify-center group-hover:scale-110 group-hover:bg-teal-600 group-hover:text-white transition-all duration-300 shadow-sm"><Heart className="w-8 h-8" /></div>
              <h3 className="text-base md:text-lg font-black text-slate-900 mb-2">Infaq & Sedekah</h3>
              <p className="text-[11px] md:text-xs text-slate-500 leading-relaxed font-medium">Pahala jariyah tak terputus untuk mendukung operasional dan dakwah umat.</p>
            </Link>

            <a href="#kalkulator-zakat" className="group bg-white p-6 md:p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-xl hover:border-amber-500 transition-all duration-300 flex flex-col items-center text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-amber-400 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="w-16 h-16 bg-amber-50 border border-amber-100 rounded-2xl text-amber-500 mb-5 flex items-center justify-center group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300 shadow-sm"><Calculator className="w-8 h-8" /></div>
              <h3 className="text-base md:text-lg font-black text-slate-900 mb-2">Tunaikan Zakat</h3>
              <p className="text-[11px] md:text-xs text-slate-500 leading-relaxed font-medium">Sucikan harta Anda dengan perhitungan nisab zakat profesi yang akurat.</p>
            </a>

            <Link href="/program" className="group bg-white p-6 md:p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-500 transition-all duration-300 flex flex-col items-center text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="w-16 h-16 bg-blue-50 border border-blue-100 rounded-2xl text-blue-600 mb-5 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm"><Landmark className="w-8 h-8" /></div>
              <h3 className="text-base md:text-lg font-black text-slate-900 mb-2">Wakaf Abadi</h3>
              <p className="text-[11px] md:text-xs text-slate-500 leading-relaxed font-medium">Bangun peradaban lewat sumur bor dan fasilitas pendidikan yang kokoh.</p>
            </Link>

            <Link href="/qurban" className="group bg-white p-6 md:p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-xl hover:border-emerald-500 transition-all duration-300 flex flex-col items-center text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-emerald-400 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className={`absolute top-4 right-4 text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-sm ${qurbanStatus === 'ON' ? 'bg-emerald-500 text-white animate-pulse' : qurbanStatus === 'POST' ? 'bg-blue-500 text-white' : 'bg-amber-500 text-slate-900'}`}>
                {qurbanStatus === 'ON' ? 'Live / Buka' : qurbanStatus === 'POST' ? 'Laporan' : 'Tabungan'}
              </span>
              <div className="w-16 h-16 bg-emerald-50 border border-emerald-100 rounded-2xl text-emerald-600 mb-5 flex items-center justify-center group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300 shadow-sm"><Gift className="w-8 h-8" /></div>
              <h3 className="text-base md:text-lg font-black text-slate-900 mb-2">{qurbanStatus === 'ON' ? 'Qurban Pelosok' : qurbanStatus === 'POST' ? 'Laporan Qurban' : 'Tabungan Qurban'}</h3>
              <p className="text-[11px] md:text-xs text-slate-500 leading-relaxed font-medium">
                {qurbanStatus === 'ON' ? 'Pilih dan tunaikan pembelian hewan qurban syar\'i secara online.' : qurbanStatus === 'POST' ? 'Lihat transparansi dokumentasi pelaksanaan distribusi qurban.' : 'Amankan kuota hewan qurban tahun depan dengan mencicil mulai sekarang.'}
              </p>
            </Link>
          </div>
        </section>

        {/* MINI KALKULATOR ZAKAT */}
        <section id="kalkulator-zakat" className="py-20 bg-teal-950 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-800 rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2"></div>
          <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-teal-900 text-teal-300 text-xs font-bold uppercase tracking-widest mb-4"><Calculator className="w-4 h-4" /> Zakat Profesi</div>
              <h2 className="text-3xl md:text-4xl font-black mb-4">Sucikan Harta, <br /><span className="text-amber-400">Berkahkan Hidup</span></h2>
              <p className="text-teal-100/80 leading-relaxed mb-6">Zakat profesi adalah zakat yang dikeluarkan dari penghasilan rutin. Cukup masukkan estimasi penghasilan bulanan Anda, dan sistem kami akan menghitung kewajiban zakat (2,5%) secara akurat.</p>
            </div>
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-2xl text-slate-900">
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Penghasilan Per Bulan (Rp)</label>
                  <input type="number" value={gaji} onChange={(e) => setGaji(e.target.value)} placeholder="Contoh: 10000000" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-lg font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Bonus / THR / Lainnya (Rp)</label>
                  <input type="number" value={bonus} onChange={(e) => setBonus(e.target.value)} placeholder="Contoh: 2000000" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-lg font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500" />
                </div>
              </div>
              <div className="bg-teal-50 rounded-2xl p-6 border border-teal-100 mb-6">
                <p className="text-sm font-bold text-slate-600 mb-1">Kewajiban Zakat Anda (2,5%)</p>
                <p className="text-3xl font-black text-teal-600">Rp {zakatNominal.toLocaleString('id-ID')}</p>
              </div>
              <Link href={`/sedekah?kategori=Zakat&nominal=${zakatNominal}`} className={`block w-full py-4 text-center rounded-xl font-bold transition-all shadow-lg ${zakatNominal > 0 ? 'bg-amber-500 text-slate-900 hover:bg-amber-400' : 'bg-slate-200 text-slate-400 pointer-events-none'}`}>Tunaikan Zakat Sekarang</Link>
            </div>
          </div>
        </section>

        {/* TENTANG YAYASAN */}
        <section className="py-20 bg-slate-50 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative group">
              <div className="absolute inset-0 bg-teal-600 rounded-[3rem] -translate-x-4 translate-y-4 opacity-10 transition-transform duration-500 group-hover:-translate-x-6 group-hover:translate-y-6"></div>
              <img src="https://images.unsplash.com/photo-1544928147-79a2dbc1f389?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Kegiatan YAMU" className="relative rounded-[3rem] shadow-xl object-cover h-[500px] w-full border-4 border-white transition-transform duration-500 group-hover:scale-[1.02]" />
              <div className="absolute bottom-8 -right-4 bg-white p-5 rounded-2xl shadow-xl flex items-center gap-4 border border-slate-100 max-w-xs animate-bounce" style={{ animationDuration: '3s' }}>
                <div className="bg-amber-100 p-3 rounded-full text-amber-600 shrink-0"><ShieldCheck className="w-6 h-6" /></div>
                <div><p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Terdaftar Resmi</p><p className="text-sm font-black text-slate-900">Pemerintah RI</p></div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-teal-100 text-teal-700 text-xs font-bold uppercase tracking-widest"><Activity className="w-4 h-4" /> Tentang Kami</div>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight">Langkah Nyata Anda, <br /><span className="text-teal-600">Perubahan Besar Bagi Mereka</span></h2>
              <p className="text-base text-slate-600 leading-relaxed">YAMU Peduli berdedikasi menjembatani niat baik Anda. Kami memastikan setiap sedekah yang dititipkan tersalurkan tepat sasaran untuk menciptakan dampak dan kemandirian umat yang berkelanjutan.</p>
              <div className="pt-4 grid sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-teal-300 transition-colors">
                  <div className="bg-teal-50 p-2.5 rounded-xl text-teal-600 shrink-0"><ShieldCheck className="w-6 h-6" /></div>
                  <div><h4 className="font-bold text-slate-900 text-sm">SK Kemenkumham RI</h4><p className="text-xs font-medium text-slate-500 mt-1.5 leading-relaxed">AHU-0016362.AH.01.04<br />AHU-AH.01.08-0043725</p></div>
                </div>
                <div className="flex items-start gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-teal-300 transition-colors">
                  <div className="bg-teal-50 p-2.5 rounded-xl text-teal-600 shrink-0"><FileText className="w-6 h-6" /></div>
                  <div><h4 className="font-bold text-slate-900 text-sm">Dinsos & NPWP</h4><p className="text-xs font-medium text-slate-500 mt-1.5 leading-relaxed">Kota Tangerang Selatan<br />NPWP: 86.715.418.9-453.000</p></div>
                </div>
              </div>
              <div className="pt-4"><Link href="/tentang" className="inline-flex items-center font-bold text-teal-700 hover:text-teal-500 transition-colors group">Kenali Kami Lebih Dekat <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" /></Link></div>
            </div>
          </div>
        </section>
          {/* ========================================================== */}
        {/* BANNER CROSS-PROMO: BIMBA YAMU PEDULI (SUBDOMAIN LINK)     */}
        {/* ========================================================== */}
        <section className="py-16 md:py-20 bg-blue-950 relative overflow-hidden border-y border-blue-900">
          {/* Efek Cahaya Background */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 rounded-full blur-[100px] opacity-30 -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-amber-500 rounded-full blur-[100px] opacity-20 translate-y-1/2 -translate-x-1/4 pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 grid lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/50 border border-blue-800 text-amber-400 text-xs font-bold uppercase tracking-widest backdrop-blur-md">
                <BookOpen className="w-4 h-4" /> Unit Pendidikan Resmi Yayasan
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
                Bimba Bintang Junior <br />
                <span className="text-amber-400">Cabang YAMU Peduli</span>
              </h2>
              <p className="text-blue-100/90 leading-relaxed text-sm md:text-base max-w-lg">
                Alhamdulillah! Berkat sedekah Anda, YAMU Peduli kini memfasilitasi pendidikan usia dini berstandar nasional di Villa Jombang Baru. <span className="font-bold text-white">100% Gratis & Bersubsidi penuh</span> khusus anak yatim dan dhuafa.
              </p>
              <div className="pt-2">
                <a 
                  href="https://bimba.yamupeduli.id" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-2 bg-amber-500 text-blue-950 px-7 py-3.5 rounded-full font-black shadow-lg shadow-amber-500/20 hover:bg-amber-400 hover:-translate-y-1 transition-all text-sm"
                >
                  Kunjungi Website Bimba <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
            
            {/* Visualisasi Bimba */}
            <div className="relative h-64 md:h-[350px] w-full rounded-[2.5rem] overflow-hidden border-4 border-white/10 shadow-2xl group">
              <img 
                src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Bimba YAMU Jombang" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-blue-950/40 to-transparent flex items-end p-6 md:p-8">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span className="text-white font-bold text-xs uppercase tracking-wider">Telah Beroperasi</span>
                  </div>
                  <p className="text-white font-medium text-sm md:text-base leading-relaxed">Membangun generasi cerdas berkarakter sejak usia dini di lingkungan Jombang, Ciputat.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* PROGRAM MENDESAK TERBARU */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div><p className="text-sm font-bold tracking-widest text-amber-500 uppercase mb-2">Program Kebaikan</p><h2 className="text-3xl md:text-4xl font-black text-slate-900">Hadirkan Senyum Hari Ini</h2></div>
              <Link href="/program" className="inline-flex items-center px-6 py-3 rounded-full bg-teal-50 font-bold text-teal-700 hover:bg-teal-100 transition-colors">Lihat Semua Program <ArrowRight className="w-4 h-4 ml-2" /></Link>
            </div>
            <div className="col-span-full grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {isLoading ? (
                [1, 2, 3].map((n) => (
                  <div key={n} className="bg-white rounded-3xl border border-slate-200 h-[480px] animate-pulse flex flex-col overflow-hidden">
                    <div className="h-48 bg-slate-200 w-full shrink-0"></div>
                    <div className="p-6 flex flex-col flex-grow gap-4">
                      <div className="h-6 bg-slate-200 rounded-md w-3/4"></div>
                      <div className="h-4 bg-slate-200 rounded-md w-full"></div>
                      <div className="mt-auto space-y-4"><div className="h-2 bg-slate-200 rounded-full w-full"></div><div className="h-12 bg-slate-200 rounded-xl w-full"></div></div>
                    </div>
                  </div>
                ))
              ) : programs.length > 0 ? (
                programs.map((prog) => {
                  const progress = Math.min(Math.round(((prog.terkumpul || 0) / prog.target) * 100), 100);
                  const isTargetReached = prog.terkumpul >= prog.target || prog.status === 'Selesai';
                  return (
                    <div key={prog.id} className="group bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col h-[480px]">
                      <div className="relative h-48 w-full overflow-hidden shrink-0">
                        <span className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-sm text-teal-700 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">{prog.category}</span>
                        {isTargetReached ? (<span className="absolute top-4 right-4 z-10 bg-emerald-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1.5 uppercase"><CheckCircle2 className="w-3.5 h-3.5" /> Terpenuhi</span>) : (<span className="absolute top-4 right-4 z-10 bg-amber-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1.5 uppercase"><span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span> Berjalan</span>)}
                        <img src={prog.image_url} alt={prog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                      <div className="p-6 flex flex-col flex-grow justify-between">
                        <div>
                          <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-teal-600 transition-colors line-clamp-2">{prog.title}</h3>
                          <p className="text-slate-500 text-xs md:text-sm mb-4 line-clamp-2">{prog.description}</p>
                        </div>
                        <div className="mt-auto">
                          <div className="flex justify-between items-end mb-2">
                            <div className="flex flex-col"><span className="text-slate-400 text-[10px] font-bold uppercase mb-0.5">Terkumpul</span><span className="text-teal-600 font-extrabold text-sm">Rp {(prog.terkumpul || 0).toLocaleString('id-ID')}</span></div>
                            <div className="flex flex-col text-right"><span className="text-slate-400 text-[10px] font-bold uppercase mb-0.5">Target</span><span className="text-slate-700 font-bold text-xs">Rp {prog.target.toLocaleString('id-ID')}</span></div>
                          </div>
                          <div className="w-full bg-slate-100 rounded-full h-1.5 mb-5 overflow-hidden">
                            <div className={`h-full rounded-full transition-all duration-1000 ${isTargetReached ? 'bg-emerald-500' : 'bg-teal-500'}`} style={{ width: `${progress}%` }}></div>
                          </div>
                          <Link href={`/program/${prog.id}`} className={`block text-center w-full py-3 font-bold rounded-xl transition-colors text-sm border ${isTargetReached ? 'bg-slate-50 text-slate-500 border-slate-200' : 'bg-teal-50 text-teal-700 border-teal-100 hover:bg-teal-600 hover:text-white'}`}>{isTargetReached ? 'Lihat Detail' : 'Donasi Sekarang'}</Link>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : null}
            </div>
          </div>
        </section>

        {/* ========================================================== */}
        {/* PREVIEW RUANG DOA (PERBAIKAN TOTAL SINKRON DAN DINAMIS) */}
        {/* ========================================================== */}
        <section className="py-24 bg-gradient-to-b from-teal-50/50 to-white border-t border-teal-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="w-12 h-12 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm"><MessageCircle className="w-6 h-6" /></div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-3">Untaian Doa & Harapan</h2>
              <p className="text-sm md:text-base text-slate-500 font-medium">Dengarkan untaian harapan tulus dari para #OrangBaik. Mari aminkan doa mereka, semoga berbalik menjadi berkah untuk kita semua.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {doaList.map((prayer) => {
                const isAlreadyAmin = clickedAmins.includes(prayer.id);
                const nameInitials = (prayer.name || 'HA')
                  .split(' ')
                  .map((n: string) => n[0])
                  .slice(0, 2)
                  .join('')
                  .toUpperCase();

                return (
                  <div key={prayer.id} className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-200/60 relative overflow-hidden flex flex-col justify-between group hover:shadow-xl hover:border-teal-100 transition-all duration-300">
                    <Quote className="absolute -top-2 -right-2 w-16 h-16 text-slate-50 pointer-events-none group-hover:text-teal-50/40 transition-colors duration-300 rotate-12" />
                    <div className="relative z-10">
                      <p className="text-slate-700 italic text-sm leading-relaxed mb-6 font-medium break-words line-clamp-4">
                        "{prayer.message}"
                      </p>
                    </div>

                    <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-auto relative z-10">
                      <div className="flex items-center gap-3 max-w-[60%]">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-teal-500 to-teal-700 text-white font-black text-xs flex items-center justify-center shadow-sm uppercase shrink-0">{nameInitials}</div>
                        <div className="truncate">
                          <h4 className="font-black text-slate-900 text-xs md:text-sm capitalize truncate">{prayer.name === 'Hamba Allah' || !prayer.name ? 'Hamba Allah' : prayer.name}</h4>
                          <p className="text-[10px] text-slate-400 font-bold mt-0.5 truncate">{new Date(prayer.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}</p>
                        </div>
                      </div>

                      {/* TOMBOL AMIN SINKRON DAN INTERAKTIF */}
                      <button
                        onClick={() => handleAminSubmit(prayer.id, prayer.amin_count || 0)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 border text-xs font-black rounded-xl transition-all shadow-sm active:scale-95 ${isAlreadyAmin
                            ? 'bg-rose-50 border-rose-100 text-rose-500 cursor-default'
                            : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-rose-500 hover:bg-rose-50 hover:border-rose-100'
                          }`}
                      >
                        <Heart className={`w-3.5 h-3.5 ${isAlreadyAmin ? 'fill-current text-rose-500' : ''}`} />
                        <span>{prayer.amin_count || 0} <span className="font-bold text-[9px] ml-0.5">{isAlreadyAmin ? 'Diamiinkan' : 'Aamiin'}</span></span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="text-center"><Link href="/ruang-doa" className="inline-flex items-center px-8 py-4 rounded-full bg-white border border-slate-200 font-black text-sm text-teal-700 hover:border-teal-500 hover:shadow-md transition-all shadow-sm gap-2 group">Lihat Semua Doa <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" /></Link></div>
          </div>
        </section>

        {/* BANNER SEKSI PROGRAM QURBAN DINAMIS */}
        <section className="py-16 bg-gradient-to-br from-emerald-50 via-white to-teal-50/50 border-y border-emerald-100">
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <span className={`inline-block px-4 py-1.5 rounded-xl text-xs font-black uppercase tracking-widest border ${qurbanStatus === 'ON' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : qurbanStatus === 'POST' ? 'bg-blue-100 text-blue-800 border-blue-200' : 'bg-amber-100 text-amber-800 border-amber-200'}`}>{qurbanStatus === 'ON' ? 'Program Live Aktif' : qurbanStatus === 'POST' ? 'Dokumentasi Penyaluran' : 'Persiapan Berkelanjutan'}</span>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                {qurbanStatus === 'ON' && <>Qurban Pelosok Negeri:<br /><span className="text-emerald-600">Menebar Bahagia Besarkan Syiar</span></>}
                {qurbanStatus === 'OFF' && <>Tabungan Qurban:<br /><span className="text-amber-600">Cicil Niat Baik Mulai Hari Ini</span></>}
                {qurbanStatus === 'POST' && <>Amanah Terlaksana:<br /><span className="text-blue-600">Laporan Penyaluran Hewan Qurban</span></>}
              </h2>
              <p className="text-sm md:text-base text-slate-500 font-medium leading-relaxed">
                {qurbanStatus === 'ON' && "Yayasan An-Nafi Mutiara Ummat memfasilitasi ibadah qurban Anda untuk disalurkan secara tepat sasaran langsung kepada para santri binaan, dhuafa, dan warga pedalaman yang jarang menikmati daging qurban."}
                {qurbanStatus === 'OFF' && "Belum masuk musim Qurban? Jangan khawatir, amankan niat terbaik Anda lewat program Tabungan Qurban Berkala. Lebih ringan, terencana, and siap disembelih saat hari raya tiba."}
                {qurbanStatus === 'POST' && "Seluruh rangkaian pemotongan dan distribusi hewan qurban amanah para shohibul qurban periode ini telah selesai disalurkan secara transparan ke berbagai pondok yatim dhuafa."}
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link href="/qurban" className={`px-6 py-3.5 text-white font-black rounded-xl text-xs uppercase tracking-wider shadow-lg active:scale-95 transition-all flex items-center gap-2 ${qurbanStatus === 'ON' ? 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/20' : qurbanStatus === 'POST' ? 'bg-blue-600 hover:bg-blue-500 shadow-blue-600/20' : 'bg-amber-500 hover:bg-amber-400 text-slate-900 shadow-amber-500/20'}`}>
                  {qurbanStatus === 'ON' && "Pilih Hewan Qurban Anda"} {qurbanStatus === 'OFF' && "Buka Rekening Tabungan"} {qurbanStatus === 'POST' && "Lihat Galeri Penyaluran"} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-sm space-y-2"><div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center font-bold"><ShieldCheck className="w-5 h-5" /></div><h4 className="font-black text-sm text-slate-800">100% Syar'i</h4><p className="text-[11px] text-slate-400 font-semibold leading-relaxed">Hewan sehat sesuai syariat Islam, dirawat dengan pakan terbaik.</p></div>
              <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-sm space-y-2"><div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center font-bold"><Users className="w-5 h-5" /></div><h4 className="font-black text-sm text-slate-800">Tepat Sasaran</h4><p className="text-[11px] text-slate-400 font-semibold leading-relaxed">Didistribusikan ke kampung binaan dhuafa & pondok yatim pelosok.</p></div>
              <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-sm space-y-2"><div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center font-bold"><FileText className="w-5 h-5" /></div><h4 className="font-black text-sm text-slate-800">Laporan Transparan</h4><p className="text-[11px] text-slate-400 font-semibold leading-relaxed">Shohibul qurban menerima sertifikat dokumentasi penyembelihan.</p></div>
              <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-sm space-y-2"><div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center font-bold"><Coins className="w-5 h-5" /></div><h4 className="font-black text-sm text-slate-800">Harga Flat</h4><p className="text-[11px] text-slate-400 font-semibold leading-relaxed">Harga bersih sudah termasuk biaya operasional pengadaan & distribusi.</p></div>
            </div>
          </div>
        </section>

        {/* BERITA TERBARU */}
        <section className="py-24 bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div><p className="text-sm font-bold tracking-widest text-amber-500 uppercase mb-2">Berita & Artikel</p><h2 className="text-3xl md:text-4xl font-black text-slate-900">Kabar Penyaluran Terbaru</h2></div>
              <Link href="/berita" className="inline-flex items-center px-6 py-3 rounded-full bg-slate-50 border border-slate-200 font-bold text-slate-700 hover:bg-slate-100 transition-colors">Lihat Semua Berita <ArrowRight className="w-4 h-4 ml-2" /></Link>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {berita.map((item) => {
                const hasVideo = !!item.video_url;
                const ytId = hasVideo ? getYouTubeId(item.video_url) : null;
                const thumbnailSrc = item.image_url
                  ? item.image_url
                  : (ytId ? `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg` : '/placeholder.jpg');

                return (
                  <Link href={`/berita/${item.id}`} key={item.id} className="group bg-white rounded-3xl p-5 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col gap-4">
                    {/* div untuk berita bergambar atau video */}
                    <div className="relative w-full h-48 rounded-2xl overflow-hidden shrink-0 bg-slate-100">
                      <img src={thumbnailSrc} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      {hasVideo && (
                        <div className="absolute inset-0 bg-slate-950/20 backdrop-blur-[0.5px] transition-opacity opacity-0 group-hover:opacity-100" />
                      )}
                      {hasVideo && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="w-12 h-12 rounded-full bg-white/90 shadow-md text-rose-600 flex items-center justify-center transition-transform group-hover:scale-110">
                            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M8 5v14l11-7z" /></svg>
                          </div>
                        </div>
                      )}
                      {hasVideo && (
                        <div className="absolute top-3 right-3 bg-rose-600 text-white text-[8px] font-black uppercase tracking-wider px-2 py-1 rounded shadow-sm">
                          Video Dokumentasi
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col flex-grow">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider bg-amber-50 border border-amber-100 px-2 py-1 rounded-md">{item.category || (hasVideo ? 'Video' : 'Berita')}</span>
                        <span className="text-xs text-slate-400 font-medium flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-teal-600 transition-colors line-clamp-2 leading-snug">{item.title}</h3>
                      <p className="text-sm text-slate-500 line-clamp-2">{item.snippet}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* LOKASI MAPS & KONTAK */}
        <section className="bg-slate-50 py-20 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div><h2 className="text-3xl font-black text-slate-900 mb-4">Kunjungi Kantor Kami</h2><p className="text-slate-600 leading-relaxed">Pintu kantor Yayasan YAMU Peduli selalu terbuka untuk Anda yang ingin bersilaturahmi, konsultasi program, atau melihat langsung operasional administrasi kami.</p></div>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-5 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                  <div className="bg-teal-50 p-3 rounded-full text-teal-600 shrink-0"><MapPin className="w-6 h-6" /></div>
                  <div><h4 className="font-bold text-slate-900">Alamat Pusat</h4><p className="text-sm text-slate-500 mt-1 leading-relaxed">JL. Jombang Raya, Villa Jombang Baru Blok A3 No.26 <br />RT 001/RW 014, Kel. Jombang, Kec. Ciputat <br />Kota Tangerang Selatan, Kode Pos 15224.</p></div>
                </div>
                <div className="flex items-start gap-4 p-5 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                  <div className="bg-teal-50 p-3 rounded-full text-teal-600 shrink-0"><Phone className="w-6 h-6" /></div>
                  <div><h4 className="font-bold text-slate-900">Layanan Donatur</h4><p className="text-sm text-slate-500 mt-1">Senin - Minggu (08:00 - 20:00)<br />WhatsApp: +6287819972512</p></div>
                </div>
              </div>
            </div>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1982.8500131548194!2d106.71453997001967!3d-6.303088139770467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69e5593a557f25%3A0x94cc918c76af961e!2sYAYASAN%20AN%20NAFI%20MUTIARA%20UMMAT!5e0!3m2!1sid!2sid!4v1780119967311!5m2!1sid!2sid" width="100%" height="100%" style={{ border: 0 }} allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </section>
      </main>

      {/* METODE PEMBAYARAN */}
      <section className="py-20 relative overflow-hidden border-t border-slate-200">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-slate-100/50 to-slate-50"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] bg-[size:32px_32px] opacity-[0.15]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[250px] bg-teal-400/20 blur-[100px] rounded-full pointer-events-none"></div>

        <style dangerouslySetInnerHTML={{
          __html: `
          @keyframes marquee { 0% { transform: translateX(0%); } 100% { transform: translateX(-100%); } }
          .animate-marquee { animation: marquee 35s linear infinite; }
          .pause-on-hover:hover .animate-marquee { animation-play-state: paused; }
        `}} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center mb-10">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-md border border-slate-200 shadow-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <p className="text-[10px] font-black uppercase text-slate-600 tracking-widest">Jalur Transaksi Resmi</p>
          </div>
        </div>

        <div className="relative flex overflow-hidden pause-on-hover w-full py-4 group">
          <div className="absolute top-0 left-0 w-24 md:w-56 h-full bg-gradient-to-r from-slate-50 to-transparent z-20 pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-24 md:w-56 h-full bg-gradient-to-l from-slate-50 to-transparent z-20 pointer-events-none"></div>

          <div className="animate-marquee whitespace-nowrap flex items-center shrink-0 justify-around w-full min-w-max gap-6 md:gap-8 px-3 md:px-4">
            <div className="flex items-center justify-center min-w-[180px] md:min-w-[220px] h-16 md:h-20 bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200 shadow-lg hover:shadow-xl hover:border-teal-400 hover:-translate-y-1.5 transition-all duration-300 grayscale group-hover:grayscale-0 cursor-default"><span className="text-xl md:text-2xl font-black text-slate-800 tracking-tighter">BANK BJB</span></div>
            <div className="flex items-center justify-center min-w-[180px] md:min-w-[220px] h-16 md:h-20 bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200 shadow-lg hover:shadow-xl hover:border-teal-400 hover:-translate-y-1.5 transition-all duration-300 grayscale group-hover:grayscale-0 cursor-default"><span className="text-xl md:text-2xl font-black text-slate-800 tracking-tighter">Bank <span className="text-blue-600">mandırı</span></span></div>
            <div className="flex items-center justify-center min-w-[180px] md:min-w-[220px] h-16 md:h-20 bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200 shadow-lg hover:shadow-xl hover:border-teal-400 hover:-translate-y-1.5 transition-all duration-300 grayscale group-hover:grayscale-0 cursor-default"><span className="text-xl md:text-2xl font-black text-blue-900 tracking-tighter">BCA</span></div>
            <div className="flex items-center justify-center min-w-[180px] md:min-w-[220px] h-16 md:h-20 bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200 shadow-lg hover:shadow-xl hover:border-teal-400 hover:-translate-y-1.5 transition-all duration-300 grayscale group-hover:grayscale-0 cursor-default"><span className="text-xl md:text-2xl font-black text-blue-700 tracking-tighter">BANK BRI</span></div>
          </div>

          <div className="animate-marquee whitespace-nowrap flex items-center shrink-0 justify-around w-full min-w-max gap-6 md:gap-8 px-3 md:px-4" aria-hidden="true">
            <div className="flex items-center justify-center min-w-[180px] md:min-w-[220px] h-16 md:h-20 bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200 shadow-lg hover:shadow-xl hover:border-teal-400 hover:-translate-y-1.5 transition-all duration-300 grayscale group-hover:grayscale-0 cursor-default"><span className="text-xl md:text-2xl font-black text-slate-800 tracking-tighter">BANK BJB</span></div>
            <div className="flex items-center justify-center min-w-[180px] md:min-w-[220px] h-16 md:h-20 bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200 shadow-lg hover:shadow-xl hover:border-teal-400 hover:-translate-y-1.5 transition-all duration-300 grayscale group-hover:grayscale-0 cursor-default"><span className="text-xl md:text-2xl font-black text-slate-800 tracking-tighter">Bank <span className="text-blue-600">mandırı</span></span></div>
            <div className="flex items-center justify-center min-w-[180px] md:min-w-[220px] h-16 md:h-20 bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200 shadow-lg hover:shadow-xl hover:border-teal-400 hover:-translate-y-1.5 transition-all duration-300 grayscale group-hover:grayscale-0 cursor-default"><span className="text-xl md:text-2xl font-black text-blue-900 tracking-tighter">BCA</span></div>
            <div className="flex items-center justify-center min-w-[180px] md:min-w-[220px] h-16 md:h-20 bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200 shadow-lg hover:shadow-xl hover:border-teal-400 hover:-translate-y-1.5 transition-all duration-300 grayscale group-hover:grayscale-0 cursor-default"><span className="text-xl md:text-2xl font-black text-blue-700 tracking-tighter">BANK BRI</span></div>
          </div>
        </div>
      </section>

      {/* FINAL CLOSING CTA BANNER */}
      <section className="relative py-20 bg-teal-950 text-white overflow-hidden text-center px-6">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center"></div>
        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight">Siap Mengalirkan Kebahagiaan Hari Ini?</h2>
          <p className="text-sm md:text-base text-teal-100/80 max-w-xl mx-auto leading-relaxed">Harta tidak akan berkurang karena sedekah. Uluran tangan sekecil apa pun adalah harapan besar bagi kemandirian yatim dan dhuafa.</p>
          <div className="pt-2"><Link href="/sedekah" className="inline-flex items-center gap-2 bg-amber-500 text-slate-900 px-8 py-4 rounded-full font-black shadow-xl shadow-amber-500/20 hover:bg-amber-400 hover:-translate-y-0.5 transition-all text-sm md:text-base">Salurkan Sedekah Sekarang <Heart className="w-4 h-4 fill-current" /></Link></div>
        </div>
      </section>

      {/* FLOATING CTA */}
      <a className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors flex items-center justify-center" href="https://wa.me/6287819972512" target="_blank" rel="noopener noreferrer"><FaWhatsapp className="w-8 h-8" /></a>
    </div>
  );
}