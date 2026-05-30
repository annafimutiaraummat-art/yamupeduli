import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css'; // Pastikan path globals.css lu bener ya bro

const inter = Inter({ subsets: ['latin'] });

// ==========================================================
// KONFIGURASI METADATA SEO GOOGLE & SOSIAL MEDIA (OPEN GRAPH)
// ==========================================================
export const metadata: Metadata = {
  // 1. Judul Utama di Google (Maksimal 60 karakter agar tidak terpotong)
  title: 'YAMU Peduli | Yayasan An-Nafi Mutiara Ummat Resmi',
  
  // 2. Deskripsi Web (Maksimal 160 karakter, dibaca robot Google)
  description: 'Situs resmi Yayasan An-Nafi Mutiara Ummat (YAMU Peduli) Tangerang Selatan. Salurkan sedekah dan donasi Anda secara transparan dan amanah.',
  
  // 3. Kata Kunci / Keywords relevan
  keywords: [
    'YAMU Peduli', 
    'Yayasan An-Nafi Mutiara Ummat', 
    'Donasi Tangerang Selatan', 
    'Sedekah Anak Yatim Tangsel', 
    'Infaq Online Resmi', 
    'Yayasan YAMU',
    'Amal Jariyah Air Bersih',
    'yamupeduli'
  ],

  // 4. Pengaturan robot crawling Google
  robots: {
    index: true,
    follow: true,
    nocache: true,
  },

  // 5. Open Graph / Facebook Meta Tags (Biar pas di-share ke WA muncul preview cakep)
  openGraph: {
    title: 'YAMU Peduli - Mengalirkan Kebaikan, Wujudkan Harapan',
    description: 'Bantu anak-anak yatim dan dhuafa meraih cita-cita melalui program pendidikan, sosial kemanusiaan, dan beasiswa berkelanjutan.',
    url: 'https://yamupeduli.org', // ⚠️ GANTI dengan domain asli lu nanti bro
    siteName: 'YAMU Peduli',
    locale: 'id_ID',
    type: 'website',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=630&q=80', // Foto default saat di-share
        width: 1200,
        height: 630,
        alt: 'YAMU Peduli Kebaikan Umat',
      },
    ],
  },

  // 6. Twitter Card (Opsional tapi bagus buat SEO)
  twitter: {
    card: 'summary_large_image',
    title: 'YAMU Peduli | Yayasan An-Nafi Mutiara Ummat',
    description: 'Salurkan sedekah dan donasi terbaik Anda bersama YAMU Peduli.',
    images: ['https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=630&q=80'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        {/* Favicon icon kecil di tab browser */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`${inter.className} bg-slate-50 text-slate-900 antialiased`}>
        {children}
      </body>
    </html>
  );
}