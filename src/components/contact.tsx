import { useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Github, Linkedin, Mail, Instagram } from 'lucide-react'
import { ConfettiButton } from './ui/confetti'
import { usePortfolioData } from '@/lib/portfolio-store'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP)
}

// ─── Manual char split helper ────────────────────────────────────────────────
function SplitChars({ text, baseClass }: { text: string; baseClass?: string }) {
  return (
    <>
      {text.split('').map((ch, i) => (
        <span
          key={i}
          className={`contact-char inline-block ${baseClass ?? ''}`}
          style={{ whiteSpace: ch === ' ' ? 'pre' : undefined }}
        >
          {ch === ' ' ? '\u00a0' : ch}
        </span>
      ))}
    </>
  )
}

export function Contact() {
  const { profile } = usePortfolioData()
  const sectionRef  = useRef<HTMLElement>(null)
  const headingRef  = useRef<HTMLHeadingElement>(null)
  const subRef      = useRef<HTMLParagraphElement>(null)
  const btnRef      = useRef<HTMLDivElement>(null)
  const dividerRef  = useRef<HTMLDivElement>(null)
  const blobRef     = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!sectionRef.current) return

    // ── 1. Morphing blob shape in background (clip-path polygon morph) ────
    const blobStates = [
      'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
      'polygon(50% 0%, 85% 15%, 100% 50%, 85% 85%, 50% 100%, 15% 85%, 0% 50%, 15% 15%)',
      'polygon(40% 0%, 80% 10%, 100% 40%, 90% 80%, 50% 100%, 10% 90%, 0% 50%, 20% 10%)',
      'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
    ]
    let blobIdx = 0
    const morphBlob = () => {
      blobIdx = (blobIdx + 1) % blobStates.length
      gsap.to(blobRef.current, {
        clipPath: blobStates[blobIdx],
        duration: 3.5,
        ease: 'sine.inOut',
        onComplete: morphBlob,
      })
    }
    gsap.fromTo(
      blobRef.current,
      { opacity: 0, scale: 0.4, clipPath: blobStates[0] },
      {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        onComplete: morphBlob,
      }
    )

    // Set initial hidden states on client only (won't affect SSR)
    gsap.set('.contact-char-1', { opacity: 0 })
    gsap.set('.contact-line2', { clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)' })

    // ── 2. Divider line draw ──────────────────────────────────────────────
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        toggleActions: 'play none none reverse',
      },
      defaults: { ease: 'power4.out' },
    })

    tl.fromTo(
      dividerRef.current,
      { scaleX: 0, transformOrigin: 'center' },
      { scaleX: 1, duration: 0.75 }
    )

    // ── 3. "Get in" — character scatter → assemble morph ─────────────────
    // Set scatter positions before animating
    .call(() => {
      gsap.set('.contact-char-1', {
        x: () => gsap.utils.random(-80, 80),
        y: () => gsap.utils.random(-60, 60),
        rotation: () => gsap.utils.random(-35, 35),
        scale: 0.4,
        opacity: 0,
      })
    })
    .to(
      '.contact-char-1',
      {
        opacity: 1, x: 0, y: 0, rotation: 0, scale: 1,
        duration: 0.9, stagger: { each: 0.045, from: 'random' }, ease: 'back.out(1.5)',
      },
      '-=0.05'
    )

    // ── 4. "Touch" — wipe clip-path morph ────────────────────────────────
    .fromTo(
      '.contact-line2',
      { clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)', opacity: 1 },
      { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', duration: 0.7, ease: 'power2.inOut' },
      '-=0.3'
    )

    // ── 5. Sub / button / icons ───────────────────────────────────────────
    .fromTo(
      subRef.current,
      { opacity: 0, y: 22, filter: 'blur(6px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.65 },
      '-=0.25'
    )
    .fromTo(
      btnRef.current,
      { opacity: 0, scale: 0.82 },
      { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.6)' },
      '-=0.3'
    )
    .fromTo(
      '.contact-icon',
      { opacity: 0, y: 18, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.09 },
      '-=0.25'
    )
  }, { scope: sectionRef })

  return (
    <section id="contact" ref={sectionRef} className="relative py-20 sm:py-32 px-4 sm:px-6 overflow-hidden">

      {/* Morphing blob background decoration */}
      <div
        ref={blobRef}
        className="opacity-0 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-radial from-purple-600/12 via-indigo-500/6 to-transparent blur-2xl pointer-events-none"
        style={{ clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)' }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">

        {/* Divider */}
        <div
          ref={dividerRef}
          className="mb-10 h-px w-28 bg-gradient-to-r from-transparent via-white/40 to-transparent"
        />

        {/* Heading */}
        <h2
          ref={headingRef}
          className="font-display font-extrabold tracking-tight text-white leading-[0.95] mb-6"
        >
          {/* Line 1: scatter morph */}
          <span className="block text-4xl sm:text-6xl md:text-7xl lg:text-8xl">
            <SplitChars text="Get in" baseClass="contact-char-1" />
          </span>
          {/* Line 2: wipe clip-path morph — initial state set by gsap.set() */}
          <span className="contact-line2 block text-5xl sm:text-7xl md:text-8xl lg:text-9xl italic font-light text-neutral-300 mt-1">
            Touch
          </span>
        </h2>

        <p
          ref={subRef}
          className="opacity-0 text-sm sm:text-lg md:text-xl text-neutral-300 mb-10 sm:mb-14 max-w-md leading-relaxed text-balance"
        >
          Have a project in mind? Let&apos;s work together to create something amazing.
        </p>

        <div ref={btnRef} className="opacity-0 mb-12 sm:mb-16">
          <ConfettiButton
            className="bg-white text-black hover:bg-neutral-100 px-10 sm:px-16 py-4 sm:py-5 rounded-full font-semibold text-base sm:text-lg transition-all shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:shadow-[0_0_70px_rgba(255,255,255,0.3)] hover:scale-105 active:scale-95"
          >
            Let&apos;s talk
          </ConfettiButton>
        </div>

        {/* Social icons */}
        <div className="flex justify-center gap-4 flex-wrap">
          {profile.githubUrl && (
            <motion.a
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -7, scale: 1.12 }}
              whileTap={{ scale: 0.9 }}
              className="contact-icon opacity-0 group p-4 bg-neutral-900/70 border border-white/10 rounded-2xl hover:border-white/35 hover:bg-white/8 backdrop-blur-lg transition-all shadow-lg text-white"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.a>
          )}
          {profile.linkedinUrl && (
            <motion.a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -7, scale: 1.12 }}
              whileTap={{ scale: 0.9 }}
              className="contact-icon opacity-0 group p-4 bg-neutral-900/70 border border-white/10 rounded-2xl hover:border-white/35 hover:bg-white/8 backdrop-blur-lg transition-all shadow-lg text-white"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.a>
          )}
          {profile.instagramUrl && (
            <motion.a
              href={profile.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -7, scale: 1.12 }}
              whileTap={{ scale: 0.9 }}
              className="contact-icon opacity-0 group p-4 bg-neutral-900/70 border border-white/10 rounded-2xl hover:border-white/35 hover:bg-white/8 backdrop-blur-lg transition-all shadow-lg text-white"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.a>
          )}
          {profile.email && (
            <motion.a
              href={`mailto:${profile.email}`}
              whileHover={{ y: -7, scale: 1.12 }}
              whileTap={{ scale: 0.9 }}
              className="contact-icon opacity-0 group p-4 bg-neutral-900/70 border border-white/10 rounded-2xl hover:border-white/35 hover:bg-white/8 backdrop-blur-lg transition-all shadow-lg text-white"
              aria-label="Email"
            >
              <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.a>
          )}
        </div>

      </div>
    </section>
  )
}
