"use client";

import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

export function WaveScrollIndicator() {
  const [isSwiped, setIsSwiped] = useState(false);
  const dragY = useMotionValue(0);
  const scale = useTransform(dragY, [0, 70], [1, 1.15]);
  const opacity = useTransform(dragY, [0, 70], [1, 0.5]);

  const handleScrollClick = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDragEnd = (_: any, info: { offset: { y: number } }) => {
    if (info.offset.y > 30) {
      setIsSwiped(true);
      handleScrollClick();
      setTimeout(() => setIsSwiped(false), 1200);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9, duration: 0.8 }}
      className="mt-4 sm:mt-8 flex flex-col items-center justify-center relative w-full cursor-pointer select-none group z-20"
      onClick={handleScrollClick}
    >
      {/* Wave Label Badge */}
      <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/15 backdrop-blur-md shadow-lg transition-all group-hover:border-white/30 group-hover:bg-white/10 mb-2">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
        </span>
        <span className="text-[11px] font-mono tracking-widest text-gray-200 uppercase font-medium">
          {isSwiped ? "Exploring..." : "Drag / Tap to Scroll"}
        </span>
      </div>

      {/* Interactive Draggable Handle & Wave Stream Container */}
      <div className="relative flex flex-col items-center h-20 sm:h-32 w-full max-w-[200px]">
        {/* Interactive Drag Handle */}
        <motion.div
          drag="y"
          dragConstraints={{ top: 0, bottom: 60 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
          style={{ y: dragY, scale, opacity }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="z-30 p-2.5 rounded-full bg-gradient-to-b from-white/25 to-white/5 border border-white/35 backdrop-blur-xl shadow-[0_0_25px_rgba(255,255,255,0.2)] flex items-center justify-center hover:border-white/60 transition-colors"
        >
          <motion.div
            animate={{
              y: [0, 6, 0],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.div>
        </motion.div>

        {/* Animated Fluid Sine-Wave Stream Line */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-8 h-full pointer-events-none overflow-hidden flex justify-center z-10">
          <svg
            className="w-6 h-full text-cyan-300/40"
            viewBox="0 0 24 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Wave Line Path 1 */}
            <motion.path
              d="M12 0 C 20 20, 4 40, 12 60 C 20 80, 4 100, 12 120"
              stroke="url(#waveGradient1)"
              strokeWidth="2.5"
              strokeLinecap="round"
              animate={{
                d: [
                  "M12 0 C 20 20, 4 40, 12 60 C 20 80, 4 100, 12 120",
                  "M12 0 C 4 20, 20 40, 12 60 C 4 80, 20 100, 12 120",
                  "M12 0 C 20 20, 4 40, 12 60 C 20 80, 4 100, 12 120",
                ],
              }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            {/* Wave Line Path 2 (Offset Wave) */}
            <motion.path
              d="M12 0 C 4 20, 20 40, 12 60 C 4 80, 20 100, 12 120"
              stroke="url(#waveGradient2)"
              strokeWidth="1.5"
              strokeOpacity="0.7"
              strokeLinecap="round"
              animate={{
                d: [
                  "M12 0 C 4 20, 20 40, 12 60 C 4 80, 20 100, 12 120",
                  "M12 0 C 20 20, 4 40, 12 60 C 20 80, 4 100, 12 120",
                  "M12 0 C 4 20, 20 40, 12 60 C 4 80, 20 100, 12 120",
                ],
              }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Traveling Light Pulse Particle */}
            <motion.circle
              r="3.5"
              fill="#ffffff"
              className="drop-shadow-[0_0_10px_#38bdf8]"
              animate={{
                cy: [0, 120],
                cx: [12, 18, 6, 18, 12],
                opacity: [0, 1, 1, 0.8, 0],
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* SVG Gradient definitions */}
            <defs>
              <linearGradient id="waveGradient1" x1="0" y1="0" x2="0" y2="120" gradientUnits="userSpaceOnUse">
                <stop stopColor="#ffffff" stopOpacity="0.95" />
                <stop offset="0.5" stopColor="#38bdf8" stopOpacity="0.75" />
                <stop offset="1" stopColor="#0284c7" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id="waveGradient2" x1="0" y1="0" x2="0" y2="120" gradientUnits="userSpaceOnUse">
                <stop stopColor="#7caac2" stopOpacity="0.85" />
                <stop offset="0.5" stopColor="#ffffff" stopOpacity="0.9" />
                <stop offset="1" stopColor="#2b6684" stopOpacity="0.2" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Ambient Wave Concentric Pulse Rings */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-12 pointer-events-none flex items-center justify-center">
          <motion.div
            className="w-12 h-12 rounded-full border border-cyan-300/40"
            animate={{
              scale: [1, 1.8, 2.5],
              opacity: [0.7, 0.2, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
          <motion.div
            className="w-12 h-12 rounded-full border border-white/50 absolute"
            animate={{
              scale: [1, 1.5, 2.1],
              opacity: [0.85, 0.3, 0],
            }}
            transition={{
              duration: 2.5,
              delay: 0.8,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}
