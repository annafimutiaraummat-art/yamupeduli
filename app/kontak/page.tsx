'use client';

import { useState } from 'react';
import { Send, Phone, MapPin, Mail, MessageCircle } from 'lucide-react';

export default function KontakPage() {
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  // HANDLER KIRIM PESAN LANGSUNG KE WHATSAPP
  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // ⚠️ GANTI DENGAN NOMOR WA ADMIN YAYASAN LU (Format: 628...)
    const adminPhone = "6281388898967"; 

    // Merangkai template pesan otomatis
    const waText = `Halo Admin YAMU Peduli, saya ingin menghubungi Anda.
    
*Nama:* ${name}
*Subjek:* ${subject}

*Pesan:*
${message}`;

    // Mengubah teks menjadi format URL yang dipahami WhatsApp
    const encodedText = encodeURIComponent(waText);
    const waUrl = `https://wa.me/${adminPhone}?text=${encodedText}`;

    // Membuka tab WhatsApp baru
    window.open(waUrl, '_blank');

    // (Opsional) Mengosongkan form setelah diklik
    setName('');
    setSubject('');
    setMessage('');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-teal-500 selection:text-white">
      
      {/* ANIMASI CSS */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { opacity: 0; animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
      `}} />

      {/* HEADER BANNER */}
      <div className="bg-gradient-to-b from-emerald-900 via-emerald-800 to-emerald-900 pt-8 sm:pt-12 pb-20 px-6 text-center text-white relative overflow-hidden">
        <div className="max-w-3xl mx-auto space-y-3">
          <span className="inline-block px-4 py-1.5 rounded-full border border-amber-400/30 bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-widest backdrop-blur-md animate-fade-in-up">
            Hubungi Kami
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight animate-fade-in-up delay-100">
            Layanan Donatur Terpadu
          </h1>
          <p className="text-teal-100/80 text-sm md:text-base max-w-xl mx-auto font-normal animate-fade-in-up delay-200">
            Punya pertanyaan seputar program donasi atau ingin berkolaborasi? Jangan ragu untuk menghubungi tim relawan kami.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-8 -mt-10 relative z-20 pb-24">
        <div className="grid lg:grid-cols-5 gap-8 bg-white rounded-[2rem] shadow-xl shadow-teal-900/5 border border-slate-200/60 overflow-hidden animate-fade-in-up delay-200">
          
          {/* KOLOM KIRI: INFO KONTAK */}
          <div className="lg:col-span-2 bg-teal-900 text-teal-50 p-8 md:p-10 flex flex-col justify-between">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-black text-white mb-2">Informasi Kontak</h3>
                <p className="text-teal-200/80 text-sm leading-relaxed">
                  Tim layanan kami siap merespon pesan Anda melalui WhatsApp untuk komunikasi yang lebih cepat dan mudah.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-teal-800/50 rounded-xl border border-teal-700/50 shrink-0">
                    <MapPin className="w-5 h-5 text-teal-300" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">Kantor Pusat</h4>
                    <p className="text-teal-200/80 text-sm mt-1">JL. Jombang Raya, Villa Jombang Baru Blok A3 No.26 RT 001 RW 014. Kel. Jombang Kec. Ciputat Kota. Tangerang Selatan Kode pos 15224.</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 bg-teal-800/50 rounded-xl border border-teal-700/50 shrink-0">
                    <Phone className="w-5 h-5 text-teal-300" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">Telepon / WhatsApp</h4>
                    <p className="text-teal-200/80 text-sm mt-0.5">+6281388898967</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 bg-teal-800/50 rounded-xl border border-teal-700/50 shrink-0">
                    <Mail className="w-5 h-5 text-teal-300" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">Email Resmi</h4>
                    <p className="text-teal-200/80 text-sm mt-0.5">annafimutiaraummat@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* KOLOM KANAN: FORM DIRECT TO WHATSAPP */}
          <div className="lg:col-span-3 p-8 md:p-10">
            <div className="mb-8 border-b border-slate-100 pb-4">
              <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <MessageCircle className="w-6 h-6 text-teal-600" /> Kirim Pesan Langsung
              </h3>
              <p className="text-sm text-slate-500 mt-1">Isi formulir ini dan pesan Anda akan diarahkan otomatis ke WhatsApp Admin kami.</p>
            </div>

            <form onSubmit={handleWhatsAppSubmit} className="space-y-5 text-sm font-bold text-slate-500">
              
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Nama Lengkap *</label>
                <input 
                  type="text" 
                  maxLength={50}
                  required 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  placeholder="Masukkan nama Anda" 
                  className="w-full bg-slate-50 border border-slate-200 p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-900 transition-all" 
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Subjek Pesan *</label>
                <select 
                  required 
                  value={subject} 
                  onChange={(e) => setSubject(e.target.value)} 
                  className="w-full bg-slate-50 border border-slate-200 p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-900 transition-all appearance-none"
                >
                  <option value="" disabled>Pilih Subjek Pertanyaan</option>
                  <option value="Konfirmasi Donasi Manual">Konfirmasi Donasi Manual</option>
                  <option value="Pertanyaan Program Bantuan">Pertanyaan Program Bantuan</option>
                  <option value="Kerjasama / Kemitraan">Kerjasama / Kemitraan</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Isi Pesan *</label>
                <textarea 
                  rows={5} 
                  required 
                  value={message} 
                  onChange={(e) => setMessage(e.target.value)} 
                  placeholder="Tuliskan pertanyaan atau pesan Anda di sini..." 
                  className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none text-slate-900 font-medium leading-relaxed transition-all" 
                />
              </div>

              <button 
                type="submit" 
                className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 font-black text-sm active:scale-[0.98]"
              >
                <Send className="w-4 h-4" /> Hubungi via WhatsApp
              </button>

            </form>
          </div>

        </div>
      </div>
    </div>
  );
}