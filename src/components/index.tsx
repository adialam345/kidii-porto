import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { WavyBackground } from './ui/wavy-background'
import { usePortfolioData } from '@/lib/portfolio-store'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP)
}

// ─── Roles that cycle like a morphing typewriter ───────────────────────────
const CYCLING_ROLES = ['FULL-STACK', 'FRONTEND', 'BACKEND', 'SOFTWARE']

// ─── Split string into individual letter spans grouped by word ────────────
function SplitText({ text, className }: { text: string; className?: string }) {
  const words = text.split(' ')
  return (
    <>
      {words.map((word, wIdx) => (
        <span key={wIdx} className="inline-block whitespace-nowrap">
          {word.split('').map((ch, cIdx) => (
            <span
              key={cIdx}
              className={`split-char inline-block ${className ?? ''}`}
            >
              {ch}
            </span>
          ))}
          {wIdx < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </>
  )
}

export function Hero() {
  const { profile } = usePortfolioData()
  const containerRef  = useRef<HTMLDivElement>(null)
  const badgeRef      = useRef<HTMLDivElement>(null)
  const line1Ref      = useRef<HTMLDivElement>(null)
  const line2Ref      = useRef<HTMLDivElement>(null)
  const roleWordRef   = useRef<HTMLSpanElement>(null)
  const bioRef        = useRef<HTMLParagraphElement>(null)
  const ctaBtnsRef    = useRef<HTMLDivElement>(null)
  const scrollHintRef = useRef<HTMLDivElement>(null)
  const roleIndex     = useRef(0)

  useGSAP(() => {
    if (!containerRef.current) return

    // ── 1. Cinematic Entrance + Pinned Scrub Timeline ──────────────────────
    const master = gsap.timeline({ defaults: { ease: 'power4.out' } })

    master
      .fromTo(
        badgeRef.current,
        { opacity: 0, y: -16, scale: 0.85 },
        { opacity: 1, y: 0, scale: 1, duration: 0.65 }
      )
      .fromTo(
        '.hero-line1 .split-char',
        { opacity: 0, y: 80, skewX: -12, scale: 0.85 },
        { opacity: 1, y: 0, skewX: 0, scale: 1, duration: 0.8, stagger: { each: 0.04, from: 'start' } },
        '-=0.2'
      )
      .fromTo(
        '.hero-line2 .split-char',
        { opacity: 0, y: 80, skewX: -10, scale: 0.85 },
        { opacity: 1, y: 0, skewX: 0, scale: 1, duration: 0.75, stagger: { each: 0.025, from: 'start' } },
        '-=0.55'
      )
      .fromTo(
        bioRef.current,
        { opacity: 0, y: 28, filter: 'blur(6px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.75 },
        '-=0.4'
      )
      .fromTo(
        '.hero-cta-btn',
        { opacity: 0, y: 22, scale: 0.92 },
        { opacity: 1, y: 0, scale: 1, duration: 0.55, stagger: 0.1 },
        '-=0.4'
      )
      .fromTo(
        scrollHintRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5 },
        '-=0.2'
      )

    // ── 2. Scroll-hint bounce loop ────────────────────────────────────────
    gsap.to(scrollHintRef.current, {
      y: 9,
      repeat: -1,
      yoyo: true,
      duration: 1.3,
      ease: 'sine.inOut',
      delay: 2.5,
    })

    // ── 3. Pinned Section Scrub Transition ────────────────────────────────
    // Locks Hero in viewport while vertical scroll progresses through out-morph
    gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=70%',
        pin: true,
        pinSpacing: true,
        scrub: 1,
      },
    })
    .to(badgeRef.current, { y: -30, opacity: 0, scale: 0.9 }, 0)
    .to(line1Ref.current, { y: -60, scale: 1.08, opacity: 0.3, skewX: -6 }, 0)
    .to(line2Ref.current, { y: -60, scale: 1.08, opacity: 0.3, skewX: 6 }, 0)
    .to(bioRef.current, { y: -40, opacity: 0, filter: 'blur(8px)' }, 0)
    .to(ctaBtnsRef.current, { y: -30, opacity: 0, scale: 0.9 }, 0)
    .to(scrollHintRef.current, { opacity: 0 }, 0)
  }, { scope: containerRef })

  // ── 5. Role-word cycling morph ─────────────────────────────────────────
  useEffect(() => {
    if (!roleWordRef.current) return
    const el = roleWordRef.current

    const cycle = () => {
      roleIndex.current = (roleIndex.current + 1) % CYCLING_ROLES.length
      const next = CYCLING_ROLES[roleIndex.current]
      // morph out
      gsap.to(el, {
        clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
        duration: 0.35,
        ease: 'power2.in',
        onComplete: () => {
          el.textContent = next
          // morph in
          gsap.fromTo(
            el,
            { clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)' },
            { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', duration: 0.45, ease: 'power2.out' }
          )
        },
      })
    }

    const id = setInterval(cycle, 2400)
    return () => clearInterval(id)
  }, [])

  return (
    <WavyBackground id="home">

      <div
        ref={containerRef}
        className="flex min-h-[90vh] sm:min-h-screen justify-center items-center relative px-4 sm:px-6 py-16 sm:py-24 text-center"
      >
        <div className="max-w-5xl mx-auto flex flex-col items-center w-full">

          {/* Badge */}
          <div
            ref={badgeRef}
            className="opacity-0 mb-6 sm:mb-8 inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/15 bg-white/5 backdrop-blur-md text-xs sm:text-sm text-neutral-300 font-mono tracking-wide"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse" />
            Available for new projects
          </div>

          {/* Line 1: italic role label + cycling word */}
          <div
            ref={line1Ref}
            className="hero-line1 text-xl sm:text-3xl md:text-5xl lg:text-7xl font-display font-extrabold tracking-tight leading-none flex flex-wrap justify-center items-baseline gap-2 sm:gap-4"
          >
            <span className="italic font-light text-neutral-400 text-[0.65em]">
              <SplitText text={profile.role1 || "I'm a"} />
            </span>
            <span
              ref={roleWordRef}
              className="text-white inline-block whitespace-nowrap"
              style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
            >
              {profile.role2 || 'FULL-STACK'}
            </span>
          </div>

          {/* Line 2: DEVELOPER & SOFTWARE ENGINEER */}
          <div
            ref={line2Ref}
            className="hero-line2 mt-2 sm:mt-3 text-xl sm:text-3xl md:text-5xl lg:text-7xl font-display font-extrabold tracking-tight leading-tight text-white flex flex-wrap justify-center items-center gap-x-3 gap-y-1"
          >
            <SplitText text={profile.role3 || 'DEVELOPER & ENGINEER'} />
          </div>

          {/* Decorative thin rule */}
          <div className="mt-6 sm:mt-8 w-16 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

          {/* Bio */}
          <p
            ref={bioRef}
            className="opacity-0 mt-6 text-sm sm:text-base md:text-xl text-neutral-300 max-w-2xl leading-relaxed text-balance px-2"
          >
            {profile.heroBio}
          </p>

          {/* CTAs */}
          <div ref={ctaBtnsRef} className="mt-9 sm:mt-10 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto px-4">
            <a href="#about" className="w-full sm:w-auto">
              <button className="hero-cta-btn opacity-0 w-full sm:w-auto bg-white text-black hover:bg-neutral-100 px-8 sm:px-10 py-3.5 rounded-full font-semibold text-sm sm:text-base transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_50px_rgba(255,255,255,0.35)] hover:scale-105 active:scale-95">
                Know more
              </button>
            </a>
            <a href="#contact" className="w-full sm:w-auto">
              <button className="hero-cta-btn opacity-0 w-full sm:w-auto border border-white/20 bg-white/5 backdrop-blur-md hover:bg-white/12 hover:border-white/40 text-white px-8 sm:px-10 py-3.5 rounded-full font-medium text-sm sm:text-base transition-all hover:scale-105 active:scale-95">
                Contact
              </button>
            </a>
            <a href={profile.cvUrl || '/CV_Adi_Alam_Sami_Aji_1.pdf'} download="CV_Adi_Alam_Sami_Aji.pdf" className="w-full sm:w-auto">
              <button className="hero-cta-btn opacity-0 w-full sm:w-auto border border-white/20 bg-white/5 backdrop-blur-md hover:bg-white/12 hover:border-white/40 text-white px-8 sm:px-10 py-3.5 rounded-full font-medium text-sm sm:text-base transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Download CV
              </button>
            </a>
          </div>

          {/* Scroll hint */}
          <div ref={scrollHintRef} className="opacity-0 mt-12 sm:mt-16 flex flex-col items-center gap-2 relative z-10">
            <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 font-mono">Scroll</span>
            <div className="w-px h-10 bg-gradient-to-b from-neutral-500 to-transparent" />
          </div>

          {/* GSAP Shared Transition Origin */}
          <div id="hero-shared-origin" className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[9vw] font-display font-black text-white/5 whitespace-nowrap pointer-events-none tracking-tighter select-none z-0">
            CRAFTING DIGITAL EXPERIENCES
          </div>
        </div>
      </div>
    </WavyBackground>
  )
}
