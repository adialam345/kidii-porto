import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { GraduationCap, Award, Calendar, MapPin, ExternalLink, BadgeCheck } from 'lucide-react'
import { initialEducation, initialCertificates, EducationItem, CertificateItem } from '@/lib/portfolio-store'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP)
}

export function EducationCertificates() {
  const [educationList] = useState<EducationItem[]>(initialEducation)
  const [certificatesList] = useState<CertificateItem[]>(initialCertificates)
  const [activeTab, setActiveTab] = useState<'all' | 'education' | 'certificates'>('all')
  const sectionRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!sectionRef.current) return

    // ── Heading entrance timeline ────────────────────────────────────────────
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 78%',
        toggleActions: 'play none none reverse',
      },
      defaults: { ease: 'power3.out' },
    })
    tl.fromTo(
      '.edu-label',
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.5 }
    )
    .fromTo(
      '.edu-heading',
      { opacity: 0, y: 40, skewX: -5 },
      { opacity: 1, y: 0, skewX: 0, duration: 0.8 },
      '-=0.2'
    )
    .fromTo(
      '.edu-subheading',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6 },
      '-=0.4'
    )
    .fromTo(
      '.edu-tabs',
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.5 },
      '-=0.3'
    )

    // Set initial 3D transform & Iris Shutter clip-path hidden state on client
    gsap.set('.gsap-cert-card', {
      clipPath: 'circle(0% at 50% 50%)',
      opacity: 0,
      y: 80,
      scale: 0.78,
      rotationX: -25,
      rotationY: -10,
      transformPerspective: 1000,
    })

    // ── Cards batch Sci-Fi Shutter Morph ─────────────────────────────────────
    ScrollTrigger.batch('.gsap-cert-card', {
      start: 'top 88%',
      interval: 0.08,
      batchMax: 3,
      onEnter: (batch) => {
        gsap.to(batch, {
          clipPath: 'circle(150% at 50% 50%)',
          opacity: 1,
          y: 0,
          scale: 1,
          rotationX: 0,
          rotationY: 0,
          duration: 0.9,
          stagger: 0.13,
          ease: 'back.out(1.4)',
          overwrite: true,
        })
      },
      onLeaveBack: (batch) => {
        gsap.to(batch, {
          clipPath: 'circle(0% at 50% 50%)',
          opacity: 0,
          y: 50,
          scale: 0.8,
          duration: 0.45,
          stagger: 0.06,
          ease: 'power2.in',
          overwrite: true,
        })
      },
    })

    // ── Magnetic 3D tilt on hover ─────────────────────────────────────────
    const cards = sectionRef.current.querySelectorAll('.gsap-cert-card')
    cards.forEach((card) => {
      const el = card as HTMLElement
      const handleMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect()
        const cx   = rect.left + rect.width / 2
        const cy   = rect.top  + rect.height / 2
        const dx   = (e.clientX - cx) / (rect.width  / 2)
        const dy   = (e.clientY - cy) / (rect.height / 2)
        gsap.to(el, {
          rotationY: dx * 8, rotationX: -dy * 8,
          transformPerspective: 700, scale: 1.03,
          duration: 0.35, ease: 'power2.out', overwrite: 'auto',
        })
      }
      const handleLeave = () => {
        gsap.to(el, { rotationY: 0, rotationX: 0, scale: 1, duration: 0.55, ease: 'power3.out', overwrite: 'auto' })
      }
      el.addEventListener('mousemove', handleMove)
      el.addEventListener('mouseleave', handleLeave)
    })
  }, { scope: sectionRef, dependencies: [activeTab] })

  return (
    <section id="education-certificates" ref={sectionRef} className="py-8 sm:py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header - Harmonized with All Projects & About */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <span className="edu-label opacity-0 inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-neutral-500 mb-3">
              <span className="w-6 h-px bg-neutral-600 inline-block" />
              Background
            </span>
            <h2 className="edu-heading opacity-0 text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-display">
              Education & Certifications
            </h2>
            <p className="edu-subheading opacity-0 text-neutral-400 text-xs sm:text-sm mt-1 sm:mt-2">
              Latar belakang akademis dan lisensi sertifikasi profesional
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="edu-tabs opacity-0 flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'all'
                  ? 'bg-white text-black shadow-lg scale-105'
                  : 'bg-white/5 border border-white/10 text-neutral-400 hover:text-white hover:bg-white/10'
              }`}
            >
              Semua ({educationList.length + certificatesList.length})
            </button>
            <button
              onClick={() => setActiveTab('education')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'education'
                  ? 'bg-white text-black shadow-lg scale-105'
                  : 'bg-white/5 border border-white/10 text-neutral-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" /> Education ({educationList.length})
            </button>
            <button
              onClick={() => setActiveTab('certificates')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'certificates'
                  ? 'bg-white text-black shadow-lg scale-105'
                  : 'bg-white/5 border border-white/10 text-neutral-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <Award className="w-3.5 h-3.5" /> Certifications ({certificatesList.length})
            </button>
          </div>
        </div>

        {/* Content Container */}
        <div className="space-y-12 sm:space-y-16">
          {/* SECTION 1: EDUCATION */}
          {(activeTab === 'all' || activeTab === 'education') && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-white">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">Pendidikan Akademis</h3>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {educationList.map((edu) => (
                  <motion.div
                    key={edu.id}
                    whileHover={{ y: -3 }}
                    className="gsap-cert-card relative bg-neutral-900/60 border border-white/10 hover:border-white/30 rounded-2xl p-6 sm:p-8 backdrop-blur-xl transition-all duration-300"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                      <div>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium bg-white/10 border border-white/15 text-white mb-3">
                          <BadgeCheck className="w-3.5 h-3.5 text-white" />
                          Official Degree
                        </span>
                        <h4 className="text-xl sm:text-2xl font-bold text-white">
                          {edu.institution}
                        </h4>
                        <p className="text-sm sm:text-base font-medium text-neutral-300 mt-1">
                          {edu.degree}
                        </p>
                      </div>

                      <div className="flex flex-col sm:items-end gap-1.5 text-xs text-neutral-400">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-300 font-mono">
                          <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                          {edu.period}
                        </span>
                        {edu.location && (
                          <span className="inline-flex items-center gap-1 text-neutral-400 mt-1">
                            <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                            {edu.location}
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed border-t border-white/10 pt-4">
                      {edu.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* SECTION 2: CERTIFICATIONS */}
          {(activeTab === 'all' || activeTab === 'certificates') && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-white">
                  <Award className="w-4 h-4" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">Sertifikasi & Lisensi</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certificatesList.map((cert) => (
                  <motion.div
                    key={cert.id}
                    whileHover={{ y: -4 }}
                    className="gsap-cert-card group relative flex flex-col justify-between bg-neutral-900/60 border border-white/10 hover:border-white/30 rounded-2xl p-6 backdrop-blur-xl transition-all duration-300"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-white/10 border border-white/15 text-white">
                          {cert.issueDate}
                        </span>
                        {cert.credentialUrl && (
                          <a
                            href={cert.credentialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-full border border-white/10 hover:border-white/30 text-neutral-400 hover:text-white transition-colors"
                            title="Lihat Sertifikat"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>

                      <h4 className="text-base sm:text-lg font-bold text-white mb-1.5 group-hover:text-neutral-200 transition-colors line-clamp-2">
                        {cert.title}
                      </h4>
                      <p className="text-xs text-neutral-400 mb-4 font-medium flex items-center gap-1">
                        <BadgeCheck className="w-3.5 h-3.5 text-neutral-400 flex-shrink-0" />
                        <span>{cert.issuer}</span>
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/10">
                      <div className="flex flex-wrap gap-1.5">
                        {cert.skills?.map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-md text-[10px] bg-white/5 border border-white/10 text-neutral-300 font-mono"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
