import { useRef, useCallback } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { MarqueeDemo } from './techstack-marquee'
import { usePortfolioData } from '@/lib/portfolio-store'



export function About() {
  const { profile } = usePortfolioData()
  const sectionRef   = useRef<HTMLElement>(null)
  const card3dRef    = useRef<HTMLDivElement>(null)
  const cardInnerRef = useRef<HTMLDivElement>(null)

  // ── 3D Holographic Card Mouse Tilt (using gsap.quickTo for smooth 60fps) ──
  const quickRotateX = useRef<((val: number) => void) | null>(null)
  const quickRotateY = useRef<((val: number) => void) | null>(null)

  useGSAP(() => {
    if (!cardInnerRef.current) return

    // Register high-performance quickTo setters
    quickRotateX.current = gsap.quickTo(cardInnerRef.current, 'rotateX', { duration: 0.45, ease: 'power2.out' })
    quickRotateY.current = gsap.quickTo(cardInnerRef.current, 'rotateY', { duration: 0.45, ease: 'power2.out' })


  }, { scope: sectionRef })

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!card3dRef.current || !quickRotateX.current || !quickRotateY.current) return

    const rect = card3dRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    // Max 18 degrees 3D tilt
    const rotX = -(y / (rect.height / 2)) * 18
    const rotY = (x / (rect.width / 2)) * 18

    quickRotateX.current(rotX)
    quickRotateY.current(rotY)
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (quickRotateX.current && quickRotateY.current) {
      quickRotateX.current(0)
      quickRotateY.current(0)
    }
  }, [])

  return (
    <section id="about" ref={sectionRef} className="py-16 sm:py-28 px-4 sm:px-6 overflow-hidden select-none">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">

          {/* ── Text Column ──────────────────────────────────── */}
          <div>
            {/* Target for GSAP Shared Transition (Flip) */}
            <div id="about-shared-target" className="min-h-[56px] mb-6 flex items-center gap-3.5 overflow-visible py-2">
              <span className="w-10 sm:w-14 h-0.5 bg-emerald-500 rounded-full inline-block opacity-80 shrink-0" id="shared-line" />
            </div>

            <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-display tracking-tight leading-[1.05] mb-5 sm:mb-6">
              <span className="block font-light italic text-neutral-300">
                {profile.aboutHeadline1 || 'where'}
              </span>
              <span className="block font-extrabold text-white mt-1.5">
                {profile.aboutHeadline2 || 'EXPERIENCE BUILDS CHARACTER'}
              </span>
            </h2>

            <p className="text-neutral-300 text-sm sm:text-base md:text-lg leading-relaxed text-balance">
              {profile.aboutBio}
            </p>

            {/* Stat cards removed */}
          </div>

          {/* ── 3D Holographic Interactive Image Column ────────────────────────── */}
          <div
            ref={card3dRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative flex justify-center items-center py-6 cursor-pointer"
            style={{ perspective: '1200px' }}
          >
            {/* Ambient Background Blur Glow (Depth Z: -60px) */}
            <div
              className="absolute w-80 h-80 rounded-full blur-[100px] bg-gradient-radial from-emerald-500/25 via-purple-500/15 to-transparent pointer-events-none"
              style={{ transform: 'translateZ(-60px)' }}
            />

            {/* The 3D Interactive Card Container */}
            <div
              ref={cardInnerRef}
              className="relative w-72 h-72 sm:w-[340px] sm:h-[340px] md:w-[380px] md:h-[380px]"
              style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
            >
              {/* Layer 1: Outer Border & Base Frame (Z: 0px) */}
              <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-br from-emerald-500/30 via-purple-500/20 to-white/10 blur-md pointer-events-none" />

              {/* Layer 2: Main Image Card (Depth Z: 20px) */}
              <div
                className="w-full h-full rounded-3xl overflow-hidden border border-white/20 shadow-[0_30px_90px_rgba(0,0,0,0.8)] relative bg-neutral-900"
                style={{ transform: 'translateZ(20px)', transformStyle: 'preserve-3d' }}
              >
                <img
                  src={profile.profileImage || '/profile.jpg'}
                  alt="Profile photo"
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
                {/* Metallic Sheen Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/10 pointer-events-none" />
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
