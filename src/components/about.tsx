import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { MarqueeDemo } from './techstack-marquee'
import { usePortfolioData } from '@/lib/portfolio-store'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP)
}

// ─── Stats for the counter morph ──────────────────────────────────────────
const STATS = [
  { value: 3, suffix: '+', label: 'Years Exp.' },
  { value: 20, suffix: '+', label: 'Projects' },
  { value: 15, suffix: '+', label: 'Technologies' },
]

export function About() {
  const { profile } = usePortfolioData()
  const sectionRef   = useRef<HTMLElement>(null)
  const textColRef   = useRef<HTMLDivElement>(null)
  const imageWrapRef = useRef<HTMLDivElement>(null)
  const glowRef      = useRef<HTMLDivElement>(null)
  const statsRef     = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!sectionRef.current) return

    // ── Master Pinned Timeline: vertical scroll drives morph progress ──────
    const pinTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=120%',
        pin: true,
        pinSpacing: true,
        scrub: 1,
      },
    })

    // Phase 1: Text cascade & photo entrance (0 -> 0.4 progress)
    pinTl
      .fromTo('.about-label', { opacity: 0, x: -30 }, { opacity: 1, x: 0 }, 0)
      .fromTo('.about-h-italic', { opacity: 0, y: 55, skewX: -10 }, { opacity: 1, y: 0, skewX: 0 }, 0.05)
      .fromTo('.about-h-bold', { opacity: 0, y: 55, skewX: -8 }, { opacity: 1, y: 0, skewX: 0 }, 0.1)
      .fromTo('.about-bio', { opacity: 0, y: 25, filter: 'blur(6px)' }, { opacity: 1, y: 0, filter: 'blur(0px)' }, 0.15)
      .fromTo(
        imageWrapRef.current,
        { clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)', scale: 0.8, opacity: 0 },
        { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', scale: 1, opacity: 1 },
        0.1
      )
      .fromTo(glowRef.current, { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1 }, 0.15)
      .fromTo('.stat-card', { opacity: 0, y: 25, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, stagger: 0.05 }, 0.25)

    // Phase 2: Stats counters count-up triggered during scrub
    const statEls = sectionRef.current.querySelectorAll('.stat-number')
    statEls.forEach((el, i) => {
      const target = STATS[i]?.value ?? 0
      const obj = { val: 0 }
      gsap.to(obj, {
        val: target,
        ease: 'power2.out',
        onUpdate: () => { el.textContent = Math.round(obj.val).toString() },
        scrollTrigger: {
          trigger: statsRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reset',
        },
      })
    })

    // Phase 3: Continuous float animation
    gsap.to(imageWrapRef.current, {
      y: -10,
      repeat: -1,
      yoyo: true,
      duration: 3.5,
      ease: 'sine.inOut',
    })
  }, { scope: sectionRef })

  return (
    <section id="about" ref={sectionRef} className="py-12 sm:py-28 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">

          <div ref={textColRef}>
            {/* Target for GSAP Shared Transition (Flip) */}
            <div id="about-shared-target" className="min-h-[24px] mb-5 flex items-center">
              <span className="w-8 h-px bg-emerald-500 inline-block mr-3 opacity-0" id="shared-line" />
            </div>

            <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-display tracking-tight leading-[1.05] mb-5 sm:mb-6">
              <span className="about-h-italic opacity-0 block font-light italic text-neutral-300">
                {profile.aboutHeadline1 || 'where'}
              </span>
              <span className="about-h-bold opacity-0 block font-extrabold text-white mt-1.5">
                {profile.aboutHeadline2 || 'EXPERIENCE BUILDS CHARACTER'}
              </span>
            </h2>

            <p className="about-bio opacity-0 text-neutral-400 text-sm sm:text-base md:text-lg leading-relaxed text-balance">
              {profile.aboutBio}
            </p>

            {/* ── Stat counters ──────────────────────────────────────── */}
            <div ref={statsRef} className="mt-8 sm:mt-10 grid grid-cols-3 gap-4">
              {STATS.map((s, i) => (
                <div
                  key={i}
                  className="stat-card opacity-0 flex flex-col items-center bg-white/5 border border-white/10 rounded-2xl py-4 px-2"
                >
                  <span className="text-2xl sm:text-3xl font-extrabold font-display text-white leading-none">
                    <span className="stat-number">0</span>
                    <span className="text-neutral-400">{s.suffix}</span>
                  </span>
                  <span className="mt-1.5 text-[10px] sm:text-xs text-neutral-500 font-mono uppercase tracking-wider text-center">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Image column ──────────────────────────────────────────── */}
          <div className="relative flex justify-center items-center">
            {/* Bloom glow */}
            <div
              ref={glowRef}
              className="opacity-0 absolute w-80 h-80 rounded-full blur-[80px] bg-gradient-radial from-purple-500/25 via-indigo-500/10 to-transparent pointer-events-none"
            />

            {/* Photo with diamond → rect morph */}
            <div
              ref={imageWrapRef}
              className="opacity-0 relative w-72 h-72 sm:w-[340px] sm:h-[340px] md:w-[380px] md:h-[380px]"
              style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
            >
              {/* Subtle border glow ring */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-white/20 via-white/5 to-white/10 blur-sm pointer-events-none" />
              <div className="w-full h-full rounded-3xl overflow-hidden border border-white/15 shadow-[0_25px_70px_rgba(0,0,0,0.7)]">
                <img
                  src={profile.profileImage || '/profile.jpg'}
                  alt="Profile photo"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
                {/* Overlay sheen */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-white/5 pointer-events-none" />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Marquee */}
      <div className="mt-20 sm:mt-28">
        <MarqueeDemo />
      </div>
    </section>
  )
}
