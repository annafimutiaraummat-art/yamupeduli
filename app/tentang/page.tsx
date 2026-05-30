'use client';

import Link from 'next/link';
import { ShieldCheck, Heart, Users, Award, CheckCircle2, Target, Compass } from 'lucide-react';

const pengurus = [
  {
    name: 'Ust. H. Ahmad Fauzi, M.Ag',
    role: 'Ketua Pembina Yayasan',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    desc: 'Bertanggung jawab atas keselarasan program yayasan dengan kaidah syariah dan kemaslahatan umat.'
  },
  {
    name: 'Muhammad Azzam, S.E.',
    role: 'Ketua Pengurus Harian',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    desc: 'Mengawasi jalannya operasional harian, manajemen dana, dan transparansi penyaluran bantuan di lapangan.'
  },
  {
    name: 'Siti Aminah, S.Sos',
    role: 'Direktur Program & Penyaluran',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    desc: 'Merancang titik lokasi bantuan, survei lapangan, dan memastikan amanah donatur tepat sasaran.'
  }
];

export default function TentangPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased selection:bg-teal-500 selection:text-white pb-24">
      
      {/* STYLE ANIMASI FADE IN UP */}
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

      {/* 1. HEADER HALAMAN */}
      <div className="bg-teal-950 pt-24 pb-16 px-6 text-center border-b border-teal-900">
        <div className="max-w-3xl mx-auto space-y-3">
          <span className="inline-block px-4 py-1.5 rounded-full border border-amber-400/30 bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-widest backdrop-blur-md animate-fade-in-up">
            Profil Lembaga
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight animate-fade-in-up delay-100">
            Tentang YAMU Peduli
          </h1>
          <p className="text-teal-100/80 text-sm md:text-base max-w-xl mx-auto font-normal animate-fade-in-up delay-200">
            Mengenal lebih dekat visi, legalitas, dan struktur kepengurusan amanah Yayasan An-Nafi Mutiara Ummat.
          </p>
        </div>
      </div>

      {/* CONTAINER UTAMA */}
      <div className="max-w-6xl mx-auto px-6 lg:px-8 mt-12 space-y-16">
        
        {/* 2. SEJARAH & PROFIL SINGKAT */}
        <section className="bg-white rounded-[2rem] p-6 md:p-10 shadow-xl shadow-teal-900/5 border border-slate-200/60 grid md:grid-cols-5 gap-8 items-center animate-fade-in-up">
          <div className="md:col-span-3 space-y-4">
            <h2 className="text-2xl font-black text-slate-900">Niat Mulia Menolak Kemandekan Umat</h2>
            <p className="text-sm md:text-base text-slate-600 leading-relaxed">
              Yayasan An-Nafi Mutiara Ummat (YAMU Peduli) didirikan sebagai bentuk kepedulian nyata terhadap pemenuhan hajat hidup dasar masyarakat, khususnya di bidang fasilitas air bersih keagamaan, kesejahteraan anak yatim, dan edukasi umat.
            </p>
            <p className="text-sm md:text-base text-slate-600 leading-relaxed">
              Kami bergerak secara independen dan profesional dengan prinsip keterbukaan. Setiap rupiah amanah dari para donatur dicatat, disalurkan langsung oleh tim internal, dan dilaporkan secara berkala demi menjaga nilai akuntabilitas tertinggi.
            </p>
          </div>
          <div className="md:col-span-2 bg-slate-100 h-64 rounded-2xl overflow-hidden shadow-inner border border-slate-200">
            <img 
              src="https://images.unsplash.com/photo-1593113543327-0b1a0e88ba92?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
              className="w-full h-full object-cover" 
              alt="Dokumentasi Yayasan" 
            />
          </div>
        </section>

        {/* 3. VISI & MISI GRID */}
        <section className="grid md:grid-cols-2 gap-8 animate-fade-in-up delay-100">
          {/* Card Visi */}
          <div className="bg-white rounded-[2rem] p-8 shadow-md border border-slate-200/60 flex flex-col items-center text-center space-y-4">
            <div className="w-14 h-14 bg-teal-50 rounded-2xl flex items-center justify-center text-teal-600 border border-teal-100">
              <Compass className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-black text-slate-900">Visi Kami</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              "Menjadi lembaga filantropi Islam terpercaya yang profesional, amanah, dan unggul dalam membangun kemandirian spiritual serta ekonomi umat di pelosok negeri."
            </p>
          </div>

          {/* Card Misi */}
          <div className="bg-white rounded-[2rem] p-8 shadow-md border border-slate-200/60 space-y-4">
            <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 border border-amber-100 mx-auto">
              <Target className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-black text-slate-900 text-center">Misi Kami</h3>
            <ul className="space-y-3 text-sm text-slate-600 leading-relaxed">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                <span>Menyelenggarakan program pengadaan air bersih (sumur bor) bagi fasilitas ibadah dan warga pelosok yang mengalami krisis air.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                <span>Menjamin akses pendidikan, pembinaan karakter, dan sandang-pangan bagi anak-anak yatim dhuafa secara kontinu.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                <span>Menerapkan sistem pelaporan keuangan digital yang transparan dan dapat dipertanggungjawabkan kapan saja oleh publik.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* 4. LEGALITAS RESMI (Trust Section) */}
        <section className="bg-teal-950 text-white rounded-[2rem] p-6 md:p-10 border border-teal-900 shadow-xl text-center space-y-6 animate-fade-in-up delay-200">
          <div className="max-w-xl mx-auto space-y-2">
            <h3 className="text-2xl font-black">Legalitas Hukum Yayasan</h3>
            <p className="text-xs md:text-sm text-teal-200/70 font-medium">Kepercayaan Anda adalah prioritas kami. YAMU Peduli telah mengantongi izin operasional resmi dari kementerian terkait.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-4 text-slate-900">
            <div className="bg-white p-5 rounded-2xl border border-teal-900 flex flex-col items-center">
              <Award className="w-8 h-8 text-amber-500 mb-2" />
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Kemenkumham RI</span>
              <p className="text-xs font-bold text-slate-800 mt-1">AHU-0016362.AH.01.04
AHU-AH.01.08-0043725</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-teal-900 flex flex-col items-center">
              <ShieldCheck className="w-8 h-8 text-teal-600 mb-2" />
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Izin Dinas Sosial</span>
              <p className="text-xs font-bold text-slate-800 mt-1">Kota Tangerang Selatan</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-teal-900 flex flex-col items-center">
              <Users className="w-8 h-8 text-teal-600 mb-2" />
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">NPWP Resmi</span>
              <p className="text-xs font-bold text-slate-800 mt-1">NPWP: 86.715.418.9-453.000</p>
            </div>
          </div>
        </section>

        {/* 5. STRUKTUR ORGANISASI KEPENGURUSAN */}
        <section className="space-y-8 animate-fade-in-up delay-300">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h3 className="text-2xl font-black text-slate-900">Struktur Kepengurusan</h3>
            <p className="text-sm text-slate-500 font-medium">Amanah donasi Anda dikelola oleh individu-individu kompeten yang berdedikasi penuh.</p>
          </div>
          
          {/* Grid Struktur dengan Batas Tinggi Fleksibel tapi Rapi */}
          <div className="grid md:grid-cols-3 gap-8">
            {pengurus.map((person, idx) => (
              <div key={idx} className="bg-white rounded-3xl border border-slate-200/60 shadow-sm p-6 flex flex-col items-center text-center h-[380px] justify-between">
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-teal-50 shadow-md">
                    <img src={person.image} alt={person.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-base leading-snug">{person.name}</h4>
                    <p className="text-xs font-bold text-teal-600 uppercase tracking-wider mt-1">{person.role}</p>
                  </div>
                </div>
                <p className="text-xs md:text-sm text-slate-500 leading-relaxed border-t border-slate-100 pt-4 mt-4">
                  {person.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}