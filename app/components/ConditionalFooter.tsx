'use client';

import { usePathname } from 'next/navigation';
import Footer from './Footer'; // <-- PASTIKAN INI IMPORT FOOTER, BUKAN NAVBAR!

export default function ConditionalFooter() {
  const pathname = usePathname();
  
  if (pathname && pathname.startsWith('/admin')) {
    return null;
  }

  return <Footer />; // <-- PASTIKAN INI MENGEMBALIKAN <Footer />, BUKAN <Navbar />!
}
