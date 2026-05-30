'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar'; // Ini file Navbar utama lu yang kemarin

export default function ConditionalNavbar() {
  const pathname = usePathname();
  
  // Jika URL saat ini diawali dengan '/admin', maka jangan tampilkan Navbar
  if (pathname && pathname.startsWith('/admin')) {
    return null;
  }

  // Jika di halaman lain (beranda, program, dll), tampilkan Navbar
  return <Navbar />;
}