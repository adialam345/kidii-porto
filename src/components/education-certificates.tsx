import React, { useState, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'
import { GraduationCap, Award, Calendar, MapPin, ExternalLink, BadgeCheck, X, Eye, FileText, Download } from 'lucide-react'
import { usePortfolioData, EducationItem, CertificateItem } from '@/lib/portfolio-store'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP)
}

// ─── Helper: scatter chars to wild random positions ──────────────────────────
function scatterSet(chars: Element[]) {
  gsap.set(chars, {
    opacity: 0,
    x: () => gsap.utils.random(-700, 700),
    y: () => gsap.utils.random(-500, 500),
    rotation: () => gsap.utils.random(-360, 360),
    scale: () => gsap.utils.random(0.05, 3),
    z: () => gsap.utils.random(-400, 400),     // depth axis for 3D feel
    force3D: true,
  })
}

// ─── Helper: chars explode FROM scattered → land on correct positions ─────────
function scatterAssemble(chars: Element[], delay = 0) {
  return gsap.to(chars, {
    opacity: 1,
    x: 0,
    y: 0,
    z: 0,
    rotation: 0,
    scale: 1,
    duration: 1.2,
    ease: 'back.out(2.5)',              // overshoots then snaps in — feels explosive
    stagger: { each: 0.04, from: 'random' },   // wider stagger = more chaos
    delay,
    force3D: true,
    overwrite: true,
  })
}

export function EducationCertificates() {
  const { educationList, certificatesList } = usePortfolioData()
  const [activeTab, setActiveTab] = useState<'all' | 'education' | 'certificates'>('all')
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null)
  
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const tabsRef = useRef<HTMLDivElement>(null)
  const certModalRef = useRef<HTMLDivElement>(null)

  const handleOpenCert = (cert: CertificateItem) => {
    setSelectedCert(cert)
    if (certModalRef.current) {
      gsap.to(certModalRef.current, {
        display: 'flex',
        opacity: 1,
        duration: 0.35,
        ease: 'power2.out',
      })
    }
  }

  const handleCloseCert = () => {
    if (certModalRef.current) {
      gsap.to(certModalRef.current, {
        opacity: 0,
        duration: 0.25,
        ease: 'power2.in',
        onComplete: () => {
          if (certModalRef.current) certModalRef.current.style.display = 'none'
          setSelectedCert(null)
        },
      })
    } else {
      setSelectedCert(null)
    }
  }

  // quickTo refs for magnetic tilt — 1 tween per card, reused each mousemove
  const tiltRefs = useRef<Map<Element, { qX: ReturnType<typeof gsap.quickTo>; qY: ReturnType<typeof gsap.quickTo> }>>(new Map())

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const el = e.currentTarget as HTMLElement
    let qt = tiltRefs.current.get(el)
    if (!qt) {
      qt = {
        qX: gsap.quickTo(el, 'rotationY', { duration: 0.35, ease: 'power2.out' }),
        qY: gsap.quickTo(el, 'rotationX', { duration: 0.35, ease: 'power2.out' }),
      }
      tiltRefs.current.set(el, qt)
    }
    const rect = el.getBoundingClientRect()
    const dx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)
    const dy = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)
    qt.qX(dx * 8)
    qt.qY(-dy * 8)
    gsap.to(el, { scale: 1.025, transformPerspective: 700, duration: 0.3, ease: 'power2.out', overwrite: 'auto' })
  }, [])

  const handleMouseLeave = useCallback((e: MouseEvent) => {
    const el = e.currentTarget as HTMLElement
    const qt = tiltRefs.current.get(el)
    if (qt) { qt.qX(0); qt.qY(0) }
    gsap.to(el, { scale: 1, duration: 0.55, ease: 'power3.out', overwrite: 'auto' })
  }, [])

  useGSAP((_, contextSafe) => {
    if (!sectionRef.current || !headingRef.current) return

    // ── SPLIT all text targets ─────────────────────────────────────────────
    // 1. Main heading h2
    const headingSplit = SplitText.create(headingRef.current, { type: 'chars' })
    scatterSet(headingSplit.chars)

    // 2. Section sub-headers (h3 inside section)
    const h3Els = sectionRef.current.querySelectorAll('.edu-section-title')
    const h3Splits = Array.from(h3Els).map(el => {
      const s = SplitText.create(el as HTMLElement, { type: 'chars' })
      scatterSet(s.chars)
      return s
    })

    // 3. Card main titles (institution / cert title h4)
    const cardTitleEls = sectionRef.current.querySelectorAll('.edu-card-title')
    const cardSplits = Array.from(cardTitleEls).map(el => {
      const s = SplitText.create(el as HTMLElement, { type: 'chars' })
      scatterSet(s.chars)
      return s
    })

    // ── 1. HEADING + label + sub + tabs entrance ───────────────────────────
    // FIX "hanya sekali": 'play none restart reset'
    //   onEnter → play, onLeave → none, onEnterBack → restart, onLeaveBack → reset
    //   So EVERY time the heading enters viewport, scatter-assemble fires.
    const entranceTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 78%',
        toggleActions: 'play none restart reset',
      },
    })

    entranceTl
      .fromTo(
        labelRef.current,
        { opacity: 0, x: -24 },
        { opacity: 1, x: 0, duration: 0.4, ease: 'power3.out' },
        0
      )
      .add(scatterAssemble(headingSplit.chars), 0.05)
      .fromTo(
        subRef.current,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' },
        '-=0.5'
      )
      .fromTo(
        tabsRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' },
        '-=0.35'
      )

    // ── 2. Section h3 titles scatter ──────────────────────────────────────
    // Each h3 gets its own ScrollTrigger — fires independently
    h3Els.forEach((el, i) => {
      const chars = h3Splits[i]?.chars
      if (!chars?.length) return

      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none restart reset',
        onEnter: () => scatterAssemble(chars),
        onEnterBack: () => scatterAssemble(chars),
        onLeaveBack: () => scatterSet(chars),
      })
    })

    // ── 3. Card title text scatter — fires when each card enters ──────────
    cardTitleEls.forEach((el, i) => {
      const chars = cardSplits[i]?.chars
      if (!chars?.length) return

      ScrollTrigger.create({
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none restart reset',
        onEnter: () => scatterAssemble(chars, 0.12),   // slight delay after card reveal
        onEnterBack: () => scatterAssemble(chars, 0.1),
        onLeaveBack: () => scatterSet(chars),
      })
    })

    // ── 4. SKILL TAGS — particle scatter assemble ─────────────────────────
    const skillTags = sectionRef.current.querySelectorAll('.skill-tag')

    ScrollTrigger.batch(skillTags, {
      start: 'top 92%',
      interval: 0.12,
      batchMax: 8,
      onEnter: (batch) => {
        gsap.to(batch, {
          opacity: 1, scale: 1, x: 0, y: 0, rotation: 0,
          duration: 0.85, ease: 'back.out(2.8)',
          stagger: { each: 0.055, from: 'random' },
          force3D: true, overwrite: true,
        })
      },
      onLeaveBack: (batch) => {
        gsap.set(batch, {
          opacity: 0, scale: 0.05,
          x: () => gsap.utils.random(-200, 200),
          y: () => gsap.utils.random(-150, 150),
          rotation: () => gsap.utils.random(-300, 300),
        })
      },
    })

    // Initial scatter for skill tags (farther than the reset)
    gsap.set(skillTags, {
      opacity: 0,
      scale: () => gsap.utils.random(0.05, 0.8),
      x: () => gsap.utils.random(-220, 220),
      y: () => gsap.utils.random(-160, 160),
      rotation: () => gsap.utils.random(-300, 300),
      force3D: true,
    })

    // ── 5. CARDS — 3D reveal (scale+opacity+rotationX, no clipPath) ──────
    gsap.set('.gsap-cert-card', {
      opacity: 0, y: 50, scale: 0.88,
      rotationX: -18, transformPerspective: 900, force3D: true,
    })

    ScrollTrigger.batch('.gsap-cert-card', {
      start: 'top 88%',
      interval: 0.1,
      batchMax: 4,
      onEnter: (batch) => {
        gsap.to(batch, {
          opacity: 1, y: 0, scale: 1, rotationX: 0,
          duration: 0.75, stagger: 0.12,
          ease: 'back.out(1.4)', force3D: true, overwrite: true,
        })
      },
      onLeaveBack: (batch) => {
        gsap.set(batch, { opacity: 0, y: 40, scale: 0.9, rotationX: -12 })
      },
    })

    // ── 6. MAGNETIC TILT via quickTo ──────────────────────────────────────
    const safeMoveHandler = contextSafe!(handleMouseMove)
    const safeLeaveHandler = contextSafe!(handleMouseLeave)

    const cards = sectionRef.current.querySelectorAll('.gsap-cert-card')
    cards.forEach((card) => {
      card.addEventListener('mousemove', safeMoveHandler as EventListener)
      card.addEventListener('mouseleave', safeLeaveHandler as EventListener)
    })

    return () => {
      cards.forEach((card) => {
        card.removeEventListener('mousemove', safeMoveHandler as EventListener)
        card.removeEventListener('mouseleave', safeLeaveHandler as EventListener)
      })
      // Revert all SplitText splits → restore original DOM
      headingSplit.revert()
      h3Splits.forEach(s => s.revert())
      cardSplits.forEach(s => s.revert())
      tiltRefs.current.clear()
    }
  }, { scope: sectionRef, dependencies: [activeTab], revertOnUpdate: true })

  return (
    <section
      id="education-certificates"
      ref={sectionRef}
      className="py-8 sm:py-20 px-4 sm:px-6 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">

        {/* ── Section Header ──────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-14 gap-4">
          <div>
            <span
              ref={labelRef}
              className="opacity-0 inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-neutral-500 mb-3"
            >
              <span className="w-6 h-px bg-neutral-600 inline-block" />
              Background
            </span>

            {/* h2: chars scattered by GSAP on mount */}
            <h2
              ref={headingRef}
              className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-display leading-tight"
              style={{ willChange: 'transform' }}
            >
              Education &amp; Certifications
            </h2>

            <p
              ref={subRef}
              className="opacity-0 text-neutral-400 text-xs sm:text-sm mt-1 sm:mt-2"
            >
              Latar belakang akademis dan lisensi sertifikasi profesional
            </p>
          </div>

          {/* Filter Tabs */}
          <div ref={tabsRef} className="opacity-0 flex flex-wrap gap-2">
            {(
              [
                { id: 'all', label: `Semua (${educationList.length + certificatesList.length})` },
                { id: 'education', icon: <GraduationCap className="w-3.5 h-3.5" />, label: `Education (${educationList.length})` },
                { id: 'certificates', icon: <Award className="w-3.5 h-3.5" />, label: `Certifications (${certificatesList.length})` },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  activeTab === tab.id
                    ? 'bg-white text-black shadow-lg scale-105'
                    : 'bg-white/5 border border-white/10 text-neutral-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {'icon' in tab ? tab.icon : null}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Content ─────────────────────────────────────────────────── */}
        <div className="space-y-12 sm:space-y-16">

          {/* SECTION 1: EDUCATION */}
          {(activeTab === 'all' || activeTab === 'education') && (
            <div>
              {/* h3 target — class edu-section-title enables per-element scatter */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-white shrink-0">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <h3
                  className="edu-section-title text-xl sm:text-2xl font-bold text-white"
                  style={{ willChange: 'transform' }}
                >
                  Pendidikan Akademis
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {educationList.map((edu) => (
                  <div
                    key={edu.id}
                    className="gsap-cert-card relative bg-neutral-900/60 border border-white/10 hover:border-white/30 rounded-2xl p-6 sm:p-8 backdrop-blur-xl transition-colors duration-300"
                    style={{ willChange: 'transform, opacity', transformPerspective: 900 }}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                      <div>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium bg-white/10 border border-white/15 text-white mb-3">
                          <BadgeCheck className="w-3.5 h-3.5 text-white" />
                          Official Degree
                        </span>
                        {/* edu-card-title → gets per-card scatter animation */}
                        <h4
                          className="edu-card-title text-xl sm:text-2xl font-bold text-white"
                          style={{ willChange: 'transform' }}
                        >
                          {edu.institution}
                        </h4>
                        <p className="text-sm sm:text-base font-medium text-neutral-300 mt-1">{edu.degree}</p>
                      </div>

                      <div className="flex flex-col sm:items-end gap-1.5 text-xs text-neutral-400 shrink-0">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-300 font-mono">
                          <Calendar className="w-3.5 h-3.5" />
                          {edu.period}
                        </span>
                        {edu.location && (
                          <span className="inline-flex items-center gap-1 text-neutral-400 mt-1">
                            <MapPin className="w-3.5 h-3.5" />
                            {edu.location}
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed border-t border-white/10 pt-4 mb-4">
                      {edu.description}
                    </p>

                    {edu.skills && edu.skills.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {edu.skills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="skill-tag px-2 py-0.5 rounded-md text-[10px] bg-violet-500/10 border border-violet-500/20 text-violet-300 font-mono"
                            style={{ willChange: 'transform, opacity' }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION 2: CERTIFICATIONS */}
          {(activeTab === 'all' || activeTab === 'certificates') && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-white shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <h3
                  className="edu-section-title text-xl sm:text-2xl font-bold text-white"
                  style={{ willChange: 'transform' }}
                >
                  Sertifikasi &amp; Lisensi
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certificatesList.map((cert) => (
                  <div
                    key={cert.id}
                    onClick={() => handleOpenCert(cert)}
                    className="gsap-cert-card group relative flex flex-col justify-between bg-neutral-900/60 border border-white/10 hover:border-white/30 rounded-2xl p-6 backdrop-blur-xl transition-all duration-300 cursor-pointer hover:shadow-[0_12px_40px_rgba(255,255,255,0.06)]"
                    style={{ willChange: 'transform, opacity', transformPerspective: 900 }}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-white/10 border border-white/15 text-white">
                          {cert.issueDate}
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-white/5 group-hover:bg-white/15 border border-white/10 text-neutral-300 group-hover:text-white transition-all">
                          {cert.pdfUrl || cert.credentialUrl?.endsWith('.pdf') ? (
                            <>
                              <FileText className="w-3.5 h-3.5 text-emerald-400" /> Lihat PDF
                            </>
                          ) : (
                            <>
                              <Eye className="w-3.5 h-3.5 text-emerald-400" /> Lihat Foto
                            </>
                          )}
                        </span>
                      </div>

                      {/* edu-card-title → per-card scatter */}
                      <h4
                        className="edu-card-title text-base sm:text-lg font-bold text-white mb-1.5 group-hover:text-emerald-300 transition-colors"
                        style={{ willChange: 'transform' }}
                      >
                        {cert.title}
                      </h4>
                      <p className="text-xs text-neutral-400 mb-4 font-medium flex items-center gap-1">
                        <BadgeCheck className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                        <span>{cert.issuer}</span>
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-2">
                      <div className="flex flex-wrap gap-1.5">
                        {cert.skills?.map((skill, idx) => (
                          <span
                            key={idx}
                            className="skill-tag px-2 py-0.5 rounded-md text-[10px] bg-white/5 border border-white/10 text-neutral-300 font-mono"
                            style={{ willChange: 'transform, opacity' }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      {(cert.pdfUrl || cert.credentialUrl) && (
                        <a
                          href={cert.pdfUrl || cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 rounded-full border border-white/10 hover:border-white/30 text-neutral-400 hover:text-white transition-colors shrink-0 bg-white/5"
                          title="Lihat / Download PDF"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Certificate Photo & PDF Document Modal Overlay ─────────────────── */}
      <div
        ref={certModalRef}
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85"
        style={{
          display: 'none',
          opacity: 0,
          WebkitBackdropFilter: 'blur(24px)',
          backdropFilter: 'blur(24px)',
        }}
        onClick={(e) => { if (e.target === certModalRef.current) handleCloseCert() }}
        role="dialog"
        aria-modal="true"
        aria-label="Certificate Document Preview"
      >
        <div className="relative max-w-5xl w-full bg-neutral-900/95 border border-white/15 rounded-3xl overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.9)] flex flex-col max-h-[95vh]">
          {/* Close button */}
          <button
            onClick={handleCloseCert}
            className="absolute top-4 right-4 z-20 p-2.5 rounded-full border border-white/20 bg-black/70 text-white hover:bg-white/20 transition-colors shadow-lg"
            aria-label="Close Preview"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Document / Image Container */}
          <div className="relative w-full flex-1 bg-black flex items-center justify-center p-2 sm:p-5 overflow-hidden">
            {selectedCert?.image ? (
              <img
                src={selectedCert.image}
                alt={selectedCert.title}
                className="max-h-[70vh] sm:max-h-[75vh] w-auto max-w-full object-contain rounded-xl shadow-2xl border border-white/10"
              />
            ) : selectedCert && (selectedCert.pdfUrl || selectedCert.credentialUrl?.endsWith('.pdf')) ? (
              <div className="w-full aspect-[1.414/1] max-h-[70vh] sm:max-h-[75vh] rounded-xl overflow-hidden border border-white/10 bg-neutral-950 shadow-2xl">
                <iframe
                  src={`${selectedCert.pdfUrl || selectedCert.credentialUrl}#toolbar=0&navpanes=0&scrollbar=0&view=Fit`}
                  className="w-full h-full border-0 overflow-hidden"
                  title={selectedCert.title}
                />
              </div>
            ) : (
              <img
                src="/ponpes.png"
                alt={selectedCert?.title || 'Certificate'}
                className="max-h-[65vh] w-auto max-w-full object-contain rounded-xl shadow-2xl"
              />
            )}
          </div>

          {/* Info Details */}
          {selectedCert && (
            <div className="p-5 sm:p-7 bg-neutral-950 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 font-semibold mb-1 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" />
                  {selectedCert.issuer} — {selectedCert.issueDate}
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white font-display">
                  {selectedCert.title}
                </h3>
                {selectedCert.skills && selectedCert.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2.5">
                    {selectedCert.skills.map((s, idx) => (
                      <span key={idx} className="text-[10px] font-mono px-2.5 py-0.5 rounded-md border border-white/15 bg-white/5 text-neutral-300">
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {(selectedCert.pdfUrl || selectedCert.credentialUrl) && (
                <a
                  href={selectedCert.pdfUrl || selectedCert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-black px-6 py-2.5 rounded-full text-xs font-bold hover:bg-neutral-200 transition-colors shrink-0 shadow-lg"
                >
                  <Download className="w-4 h-4" /> Download / Buka PDF
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
