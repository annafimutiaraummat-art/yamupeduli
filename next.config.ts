/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      // Ganti dengan hostname Supabase lu yang ada di URL storage
      { protocol: 'https', hostname: 'xxxxxx.supabase.co' }, 
    ],
  },
};

export default nextConfig;