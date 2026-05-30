'use client';

import { useState } from 'react';
import { MessageSquare, Heart, Calendar, ShieldCheck, User } from 'lucide-react';

// DUMMY DATABASE FEED (Otomatis bertambah real-time saat webhook payment sukses)
const databaseDoa = [
  { id: 1, name: 'Hamba Allah', amount: 100000, program: 'Sumur Bor Ponpes Al-Husfa', time: '2 jam yang lalu', message: 'Semoga pembangunan sumur bor ini dilancarkan dan menjadi aliran pahala jariyah untuk keluarga kami, amin.' },
  { id: 2, name: 'Budi Santoso', amount: 50000, program: 'Sumur Bor Ponpes Al-Husfa', time: '5 jam yang lalu', message: 'Bismillah, sedikit rezeki untuk mempermudah wudhu adik-adik santri penghafal Al-Qur’an.' },
  { id: 3, name: 'Siti Rahma', amount: 250000, program: "Sedekah Al-Qur'an Pelosok", time: '1 hari yang lalu', message: 'Niat sedekah atas nama almarhum ayahanda tercinta. Mohon doanya dari para santri sekalian.' },
  { id: 4, name: 'Ahmad Subarkah', amount: 1000000, program: 'Beasiswa Yatim', time: '2 hari yang lalu', message: 'Semoga anak-anak yatim binaan YAMU kelak menjadi ulama besar penuntun umat. Amin ya Allah.' }
];

export default function RuangDoaPage() {
  const [doas] = useState(databaseDoa);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased pb-24 selection:bg-teal-500 selection:text-white">
      
      {/* STYLE ANIMASI FADE IN UP */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { opacity: 0; animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}} />

      {/* HEADER ROOM */}
      <div className="bg-teal-950 pt-24 pb-16 px-6 text-center border-b border-teal-900">
        <div className="max-w-3xl mx-auto space-y-3 animate-fade-in-up">
          <span className="inline-block px-4 py-1.5 rounded-full border border-amber-400/30 bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-widest backdrop-blur-md">
            Dinding Transparansi
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            Ruang Doa & Kebaikan Umat
          </h1>
          <p className="text-teal-100/80 text-sm md:text-base max-w-xl mx-auto font-normal">
            Untaian doa tulus dari para donatur mulia YAMU Peduli yang terverifikasi otomatis oleh sistem finansial secara aman.
          </p>
        </div>
      </div>

      {/* MAIN PLACEMENT */}
      <div className="max-w-4xl mx-auto px-6 mt-12 space-y-6 animate-fade-in-up">
        
        {/* Counter Card */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-sm flex items-center justify-between text-xs md:text-sm font-bold text-slate-500">
          <span className="flex items-center gap-2"><MessageSquare className="w-4 h-4 text-teal-600" /> Total Doa Terkumpul: <span className="text-teal-600 font-black">3,421 Doa</span></span>
          <span className="flex items-center gap-1.5 text-teal-700"><ShieldCheck className="w-4 h-4" /> 100% Terverifikasi Sistem</span>
        </div>

        {/* List Grid Doa */}
        <div className="space-y-4">
          {doas.map((doa) => (
            <div key={doa.id} className="p-5 md:p-6 rounded-[2rem] bg-white border border-slate-200/60 shadow-md shadow-slate-200/50 flex items-start gap-4 hover:border-teal-200 transition-colors duration-200">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 shrink-0">
                <User className="w-6 h-6" />
              </div>
              
              <div className="space-y-2 w-full">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-black text-slate-900 text-base">{doa.name}</h3>
                    <span className="text-[10px] text-slate-400 font-bold block mt-0.5 uppercase tracking-wider">Program: {doa.program}</span>
                  </div>
                  <span className="text-xs font-medium text-slate-400 flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {doa.time}</span>
                </div>
                
                <p className="text-sm font-extrabold text-teal-600 bg-teal-50/50 inline-block px-3 py-1 rounded-lg border border-teal-100/60">
                  Berdonasi Berkah Rp {doa.amount.toLocaleString('id-ID')}
                </p>

                <p className="text-sm md:text-base text-slate-600 leading-relaxed italic bg-slate-50 p-4 rounded-2xl border border-slate-200/80 mt-2 block font-medium">
                  "{doa.message}"
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}