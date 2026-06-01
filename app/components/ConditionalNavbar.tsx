'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar'; // Ini file Navbar utama lu yang kemarin

export default function ConditionalNavbar() {
  const pathname = usePathname();

  if (pathname === '/admin') {
    return null; // Jangan tampilkan Navbar di halaman admin
  }
  // Jika di halaman lain (beranda, program, dll), tampilkan Navbar
  return <Navbar />;
}