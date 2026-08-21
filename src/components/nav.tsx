import React from 'react';
import { motion } from 'framer-motion';

export function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-8 py-3.5 sm:py-4 transition-all duration-300">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <motion.a
          href="#home"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="group flex items-center gap-2.5 bg-neutral-900/70 border border-white/10 hover:border-white/25 backdrop-blur-md px-3.5 py-1.5 rounded-full transition-all"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]"></span>
          <span className="font-display font-semibold text-xs sm:text-sm text-white tracking-tight group-hover:text-neutral-200">
            Adi Alam
          </span>
        </motion.a>

        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden sm:flex items-center gap-3"
        >
          <span className="text-[11px] font-mono text-neutral-400 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
            Available for new opportunities
          </span>
        </motion.div>
      </div>
    </header>
  );
}



