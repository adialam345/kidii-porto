import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Presentation, ChevronUp, ChevronDown, Sparkles } from 'lucide-react';

const slides = [
  { id: 'home', label: '01 HERO', title: 'Overview & Roles' },
  { id: 'about', label: '02 ABOUT', title: 'Experience & Character' },
  { id: 'education-certificates', label: '03 EDUCATION', title: 'Degrees & Certifications' },
  { id: 'recent-showcase', label: '04 SHOWCASE', title: 'Featured Case Study' },
  { id: 'work', label: '05 PROJECTS', title: 'Software Engineering Work' },
  { id: 'contact', label: '06 CONTACT', title: 'Get in Touch' },
];

export function PresentationMorph() {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = 0; i < slides.length; i++) {
        const el = document.getElementById(slides[i].id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSlideIndex(i);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const goToSlide = (index: number) => {
    const slide = slides[index];
    const el = document.getElementById(slide.id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentSlide = slides[activeSlideIndex] || slides[0];

  return (
    <>
      {/* Scroll Progress Bar across top of screen */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-white via-neutral-300 to-neutral-500 z-50 origin-left shadow-[0_0_15px_rgba(255,255,255,0.8)]"
        style={{ scaleX }}
      />

      {/* Slide Presentation Badge & Controls - Top Right */}
      <div className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 flex items-center gap-2 pointer-events-none">
        <motion.div 
          layoutId="presentation-morph-badge"
          className="pointer-events-auto flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-neutral-950/80 border border-white/20 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.8)] text-xs text-neutral-200"
        >
          <Presentation className="w-3.5 h-3.5 text-white animate-pulse" />
          <span className="font-mono font-bold text-white tracking-wider uppercase text-[11px]">
            SLIDE {currentSlide.label}
          </span>
          <span className="hidden sm:inline text-neutral-400 font-medium">| {currentSlide.title}</span>
        </motion.div>
      </div>

      {/* Floating Presentation Morph Navigation Rail - Right Side (Desktop) */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-3 pointer-events-none">
        <div className="pointer-events-auto bg-neutral-950/80 border border-white/15 backdrop-blur-xl p-2 rounded-full flex flex-col items-center gap-2 shadow-2xl">
          <button
            onClick={() => goToSlide(Math.max(0, activeSlideIndex - 1))}
            disabled={activeSlideIndex === 0}
            className="p-1.5 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
            title="Previous Slide"
          >
            <ChevronUp className="w-4 h-4" />
          </button>

          <div className="flex flex-col gap-2 my-1">
            {slides.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => goToSlide(idx)}
                className="group relative flex items-center justify-center p-1"
                title={slide.title}
              >
                <span className={`block rounded-full transition-all duration-300 ${
                  activeSlideIndex === idx 
                    ? 'w-3 h-3 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)] scale-110' 
                    : 'w-2 h-2 bg-neutral-600 hover:bg-neutral-300'
                }`} />

                {/* Tooltip on Hover */}
                <span className="absolute right-7 px-2.5 py-1 rounded-md bg-neutral-900 border border-white/20 text-[10px] font-mono text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
                  {slide.label} — {slide.title}
                </span>
              </button>
            ))}
          </div>

          <button
            onClick={() => goToSlide(Math.min(slides.length - 1, activeSlideIndex + 1))}
            disabled={activeSlideIndex === slides.length - 1}
            className="p-1.5 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
            title="Next Slide"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  );
}
