import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // 1. Solusi Error TypeScript 7
  // Mengaktifkan CLI eksternal karena TS 7 tidak punya JS API internal
  experimental: {
    useTypeScriptCli: true,
  },

  // 2. Konfigurasi Gambar (Supabase & Unsplash)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        // GANTI 'xxxxxx' DI BAWAH INI DENGAN PROJECT REF SUPABASE ANDA
        // Contoh: 'abcde-fghij-12345.supabase.co'
        hostname: 'qhqtewsbfqvxuxwtdiqb.supabase.co', 
      },
    ],
  },
};

export default nextConfig;   