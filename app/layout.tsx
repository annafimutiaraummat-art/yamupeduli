import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import Script from 'next/script'; // <-- 1. Import komponen Script dari Next.js

import ConditionalNavbar from './components/ConditionalNavbar';
import Footer from './components/Footer';
import Preloader from './components/Preloader';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'YAMU Peduli | Yayasan An-Nafi Mutiara Ummat',
  description: 'Lembaga filantropi resmi yang berdedikasi membangun kemandirian umat melalui program air bersih, pendidikan yatim, dan sosial keagamaan.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth" data-scroll-behavior="smooth">
      <head>
        {/* ========================================================== */}
        {/* 2. SCRIPT GOOGLE ANALYTICS (YOUTUBE & GOOGLE ADS) */}
        {/* ========================================================== */}
        <Script 
          src={`https://www.googletagmanager.com/gtag/js?id=G-WFFDXMSEHQ`} 
          strategy="afterInteractive" 
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-WFFDXMSEHQ', {
              page_path: window.location.pathname,
            });
          `}
        </Script>

        {/* ========================================================== */}
        {/* 3. SCRIPT META PIXEL (FACEBOOK & INSTAGRAM ADS) */}
        {/* ========================================================== */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', 'XXXXXXXXXXXXXXXX'); // <-- Masukkan ID Pixel Lu Nanti Di Sini
            fbq('track', 'PageView');
          `}
        </Script>
      </head>

      <body className={`${inter.className} bg-[#f8faf9] text-slate-900 antialiased pt-16 sm:pt-20 flex flex-col min-h-screen`}>
        
        <Preloader />
        <ConditionalNavbar />
        <Toaster position="top-center" toastOptions={{ duration: 4000 }} />
        
        <main className="flex-grow">
          {children}
        </main>
        
        <Footer />
        
      </body>
    </html>
  );
}