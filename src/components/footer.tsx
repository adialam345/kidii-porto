'use client'

import { useEffect, useState } from 'react'

export function Footer() {
  const [currentYear, setCurrentYear] = useState('');

  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString());
  }, []);

  return (
    <footer className="py-8 sm:py-10 px-4 sm:px-6 border-t border-white/10 pb-24 sm:pb-20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
        <div className="text-xs sm:text-sm text-gray-400">
          © {currentYear} Adi Alam Sami Aji. All rights reserved.
        </div>
        <nav className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-400">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
          <a href="#" className="hover:text-white transition-colors">Cookies Policy</a>
        </nav>
      </div>
    </footer>
  )
}
  
  