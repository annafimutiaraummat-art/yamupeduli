'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Calculator, HelpCircle, ArrowRight, CheckCircle2, ChevronDown, Coins, Briefcase } from 'lucide-react';

export default function KalkulatorZakat() {
  const [activeTab, setActiveTab] = useState<'penghasilan' | 'maal'>('penghasilan');
  
  // State Input Penghasilan
  const [gaji, setGaji] = useState<string>('');
  const [bonus, setBonus] = useState<string>('');
  
  // State Input Maal
  const [tabungan, setTabungan] = useState<string>('');
  const [emas, setEmas] = useState<string>('');

  // State FAQ Accordion
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  // Standar Parameter Fiqh Zakat (Asumsi harga emas per gram Rp 1.400.000)
  const HARGA_EMAS = 1400000;
  const NISAB_MAAL_TAHUNAN = 85 * HARGA_EMAS; // Rp 119.000.000
  const NISAB_PENGHASILAN_BULANAN = NISAB_MAAL_TAHUNAN / 12; // Rp 9.916.666

  // Perhitungan Logika Zakat
  let totalHarta = 0;
  let wajibZakat = false;
  let jumlahZakat = 0;
  let batasNisab = 0;

  if (activeTab === 'penghasilan') {
    totalHarta = (Number(gaji) || 0) + (Number(bonus) || 0);
    batasNisab = NISAB_PENGHASILAN_BULANAN;
    wajibZakat = totalHarta >= batasNisab;
    jumlahZakat = wajibZakat ? totalHarta * 0.025 : 0;
  } else {
    totalHarta = (Number(tabungan) || 0) + ((Number(emas) || 0) * HARGA_EMAS);
    batasNisab = NISAB_MAAL_TAHUNAN;
    wajibZakat = totalHarta >= batasNisab;
    jumlahZakat = wajibZakat ? totalHarta * 0.025 : 0;
  }

  const toggleFaq = (index: number) => {
    setFaqOpen(faqOpen === index ? null : index);
  };

  const faqs = [
    { q: 'Apa itu Nisab dalam zakat?', a: 'Nisab adalah batasan minimal jumlah harta yang menyebabkan harta tersebut wajib dikeluarkan zakatnya. Jika harta Anda berada di bawah batas nisab, Anda tidak wajib berzakat namun disarankan bersedekah biasa.' },
    { q: 'Berapakah kadar zakat yang harus dikeluarkan?', a: 'Kadar zakat untuk zakat penghasilan dan zakat maal/tabungan adalah sebesar 2,5% dari total harta bersih yang telah mencapai nisab.' },
    { q: 'Bagaimana jika harta saya belum mencapai nisab?', a: 'Kalkulator akan otomatis mendeteksi jika harta Anda belum mencapai nisab. Anda tidak dibebankan kewajiban zakat, tetapi Anda tetap bisa mengalirkan kebaikan melalui infak atau sedekah sukarela.' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased pb-24 selection:bg-teal-500 selection:text-white">
      
      {/* STYLE ANIMASI */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { opacity: 0; animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
      `}} />

      {/* HEADER HALAMAN */}
      <div className="bg-gradient-to-b from-emerald-900 via-emerald-800 to-emerald-900 pt-8 sm:pt-12 pb-16 px-6 text-center text-white relative overflow-hidden">
        <div className="max-w-3xl mx-auto space-y-3">
          <span className="inline-block px-4 py-1.5 rounded-full border border-amber-400/30 bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-widest backdrop-blur-md animate-fade-in-up">
            Fitur Edukasi
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight animate-fade-in-up delay-100">
            Kalkulator Zakat Digital
          </h1>
          <p className="text-teal-100/80 text-sm md:text-base max-w-xl mx-auto font-normal animate-fade-in-up delay-200">
            Hitung kewajiban zakat Anda secara cepat, tepat, dan transparan sesuai dengan kaidah fiqh kontemporer.
          </p>
        </div>
      </div>

      {/* CONTAINER DUA KOLOM KALKULATOR */}
      <div className="max-w-6xl mx-auto px-6 lg:px-8 mt-12">
        <div className="grid lg:grid-cols-5 gap-10 items-start">
          
          {/* KOLOM KIRI: INPUT DATA TRANSKASI */}
          <div className="lg:col-span-3 bg-white rounded-[2rem] p-6 md:p-8 shadow-xl shadow-teal-900/5 border border-slate-200/60 space-y-6 animate-fade-in-up">
            
            {/* Tab Selector */}
            <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
              <button
                onClick={() => { setActiveTab('penghasilan'); }}
                className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs md:text-sm font-bold rounded-xl transition-all ${
                  activeTab === 'penghasilan' ? 'bg-teal-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Briefcase className="w-4 h-4" /> Zakat Penghasilan
              </button>
              <button
                onClick={() => { setActiveTab('maal'); }}
                className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs md:text-sm font-bold rounded-xl transition-all ${
                  activeTab === 'maal' ? 'bg-teal-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Coins className="w-4 h-4" /> Zakat Maal / Tabungan
              </button>
            </div>

            {/* Form Input Dinamis Berdasarkan Tab */}
            <div className="space-y-4">
              {activeTab === 'penghasilan' ? (
                <>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Gaji Bulanan Utama *</label>
                    <div className="relative">
                      <span className="absolute left-4 top-3.5 font-black text-slate-400 text-sm">Rp</span>
                      <input
                        type="number"
                        placeholder="0"
                        value={gaji}
                        onChange={(e) => setGaji(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-12 pr-4 font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Pendapatan Lain / Bonus (Bulanan)</label>
                    <div className="relative">
                      <span className="absolute left-4 top-3.5 font-black text-slate-400 text-sm">Rp</span>
                      <input
                        type="number"
                        placeholder="0"
                        value={bonus}
                        onChange={(e) => setBonus(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-12 pr-4 font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Saldo Tabungan / Giro / Deposito *</label>
                    <div className="relative">
                      <span className="absolute left-4 top-3.5 font-black text-slate-400 text-sm">Rp</span>
                      <input
                        type="number"
                        placeholder="0"
                        value={tabungan}
                        onChange={(e) => setTabungan(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-12 pr-4 font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Kepemilikan Emas Produktif (Dalam Satuan Gram)</label>
                    <div className="relative">
                      <input
                        type="number"
                        placeholder="0 gram"
                        value={emas}
                        onChange={(e) => setEmas(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 px-4 font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all"
                      />
                    </div>
                    <span className="text-[10px] text-slate-400 font-semibold block mt-1">* Harga acuan emas hari ini dikonfigurasi otomatis senilai Rp {HARGA_EMAS.toLocaleString('id-ID')}/gram</span>
                  </div>
                </>
              )}
            </div>

          </div>

          {/* KOLOM KANAN: HASIL KUALIFIKASI & TRANSFER CTA */}
          <div className="lg:col-span-2 space-y-6 animate-fade-in-up delay-100">
            <div className="bg-white rounded-[2rem] p-6 shadow-2xl shadow-teal-900/10 border border-slate-200/60 space-y-5">
              <div>
                <h3 className="font-black text-slate-900 text-lg flex items-center gap-2"><Calculator className="w-5 h-5 text-teal-600" /> Hasil Perhitungan</h3>
                <p className="text-xs text-slate-400 mt-0.5 font-medium">Berdasarkan kalkulasi nominal parameter nisab saat ini.</p>
              </div>

              {/* Status Banner */}
              <div className={`p-4 rounded-2xl border text-xs font-bold leading-relaxed ${
                wajibZakat 
                  ? 'bg-teal-50 border-teal-200 text-teal-800' 
                  : 'bg-amber-50 border-amber-200 text-amber-800'
              }`}>
                {wajibZakat ? (
                  <p>✓ Harta Anda senilai Rp {totalHarta.toLocaleString('id-ID')} telah mencapai batas nisab minimal (Rp {Math.round(batasNisab).toLocaleString('id-ID')}). Anda diwajibkan menunaikan zakat.</p>
                ) : (
                  <p>⚠ Harta Anda senilai Rp {totalHarta.toLocaleString('id-ID')} belum mencapai batas nisab minimal (Rp {Math.round(batasNisab).toLocaleString('id-ID')}). Anda tidak wajib berzakat bulan/tahun ini.</p>
                )}
              </div>

              {/* Total Kewajiban */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 text-center space-y-1">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Kewajiban Zakat Anda</span>
                <p className="text-2xl md:text-3xl font-black text-slate-900">Rp {jumlahZakat.toLocaleString('id-ID')}</p>
              </div>

              {/* Action Button */}
              <Link 
                href={wajibZakat ? "/program" : "/program"}
                className="flex items-center justify-center w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-900 font-black rounded-xl shadow-lg shadow-amber-500/10 transition-all active:scale-[0.98] text-xs md:text-sm gap-1.5"
              >
                {wajibZakat ? 'Tunaikan Zakat Sekarang' : 'Salurkan Sedekah Pengganti'} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>

        {/* 2. INTERACTIVE FAQ ACCORDION */}
        <section className="mt-20 max-w-4xl mx-auto space-y-6 animate-fade-in-up delay-200">
          <div className="text-center space-y-1.5 mb-8">
            <h3 className="text-2xl font-black text-slate-900 flex items-center justify-center gap-2"><HelpCircle className="w-6 h-6 text-teal-600" /> Fiqh & Edukasi Zakat</h3>
            <p className="text-xs md:text-sm text-slate-400 font-semibold uppercase tracking-wider">Pertanyaan umum yang sering ditanyakan donatur</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden transition-all duration-300">
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full flex justify-between items-center p-5 text-left font-bold text-slate-900 text-sm md:text-base hover:text-teal-600 transition-colors focus:outline-none"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 shrink-0 ${faqOpen === index ? 'rotate-180 text-teal-600' : ''}`} />
                </button>
                
                {/* Expandable Panel */}
                <div className={`transition-all duration-300 ease-in-out ${
                  faqOpen === index ? 'max-h-40 border-t border-slate-100 opacity-100' : 'max-h-0 opacity-0'
                } overflow-hidden bg-slate-50/50`}>
                  <p className="p-5 text-xs md:text-sm text-slate-500 leading-relaxed font-medium">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}