import { useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Github, Linkedin, Mail, Instagram, FileText } from 'lucide-react'
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
          {(profile.whatsappUrl || "https://wa.me/6287823872633") && (
            <motion.a
              href={profile.whatsappUrl || "https://wa.me/6287823872633"}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -7, scale: 1.12 }}
              whileTap={{ scale: 0.9 }}
              className="contact-icon opacity-0 group p-4 bg-neutral-900/70 border border-white/10 rounded-2xl hover:border-emerald-500/50 hover:bg-emerald-500/10 backdrop-blur-lg transition-all shadow-lg text-white"
              aria-label="WhatsApp"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-current text-white group-hover:text-emerald-400 transition-colors" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.572-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" />
              </svg>
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
          {(profile.cvUrl || '/CV_Adi_Alam_Sami_Aji_1.pdf') && (
            <motion.a
              href={profile.cvUrl || '/CV_Adi_Alam_Sami_Aji_1.pdf'}
              download="CV_Adi_Alam_Sami_Aji.pdf"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -7, scale: 1.12 }}
              whileTap={{ scale: 0.9 }}
              className="contact-icon opacity-0 group p-4 bg-neutral-900/70 border border-white/10 rounded-2xl hover:border-purple-500/50 hover:bg-purple-500/10 backdrop-blur-lg transition-all shadow-lg text-white"
              aria-label="Unduh CV"
              title="Unduh CV (PDF)"
            >
              <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:text-purple-400 transition-colors" />
            </motion.a>
          )}
        </div>

      </div>
    </section>
  )
}
