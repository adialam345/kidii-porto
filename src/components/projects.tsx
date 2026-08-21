import { useState, useRef, useEffect, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { ArrowUpRight, X } from 'lucide-react'
import { usePortfolioData } from '@/lib/portfolio-store'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP)
}

// ── Fibonacci sphere — evenly distribute N points on sphere surface ────────────
function fibonacciSphere(n: number, radius: number) {
  const phi = (1 + Math.sqrt(5)) / 2
  return Array.from({ length: n }, (_, i) => {
    const theta = 2 * Math.PI * i / phi
    const cosZ  = 1 - (2 * i + 1) / n
    const sinZ  = Math.sqrt(1 - cosZ * cosZ)
    return {
      x: radius * sinZ * Math.cos(theta),
      y: radius * cosZ,
      z: radius * sinZ * Math.sin(theta),
    }
  })
}

// Pre-computed orbit radii for desktop (radius 260) and mobile (radius 130)
const SPHERE_POINTS_DESKTOP = fibonacciSphere(6, 260)
const SPHERE_POINTS_MOBILE  = fibonacciSphere(6, 130)

function getSpherePoints(count: number = 6) {
  if (typeof window === 'undefined') return fibonacciSphere(count, 260)
  const isMobile = window.innerWidth < 768
  if (isMobile) {
    const mobileRadius = Math.min(window.innerWidth * 0.38, 160)
    return fibonacciSphere(count, Math.max(130, mobileRadius))
  }
  const r = Math.min(window.innerWidth * 0.22, 280)
  return fibonacciSphere(count, Math.max(220, r))
}

interface ProjectItem {
  id: number; title: string; description: string
  tags: string[]; image: string; link?: string
}
interface DetailState { project: ProjectItem; originRect: DOMRect }

// ── Sphere drag state (all in refs — zero re-renders per frame) ───────────────
interface SphereState {
  rotX: number; rotY: number
  targetRotX: number; targetRotY: number
  velX: number; velY: number
  dragging: boolean
  lastX: number; lastY: number
  startX: number; startY: number
  moved: boolean
}

const DRAG_THRESHOLD = 8

export function Projects() {
  const { projectsList } = usePortfolioData()
  const projects = projectsList

  const sectionRef      = useRef<HTMLElement>(null)
  const sceneRef        = useRef<HTMLDivElement>(null)   // perspective container
  const sphereRef       = useRef<HTMLDivElement>(null)   // rotates in 3D
  const itemRefs        = useRef<(HTMLDivElement | null)[]>([])
  const overlayRef      = useRef<HTMLDivElement>(null)
  const overlayImgRef   = useRef<HTMLImageElement>(null)
  const overlayPanelRef = useRef<HTMLDivElement>(null)

  const [detail, setDetail]         = useState<DetailState | null>(null)
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [spherePoints, setSpherePoints] = useState(() => getSpherePoints(projects.length))

  // Run layout effect before paint to immediately calculate mobile sphere points
  useEffect(() => {
    setSpherePoints(getSpherePoints(projects.length))
    const handleResize = () => setSpherePoints(getSpherePoints(projects.length))
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [projects.length])

  const sphere = useRef<SphereState>({
    rotX: -15, rotY: 0,
    targetRotX: -15, targetRotY: 0,
    velX: 0, velY: 0,
    dragging: false, lastX: 0, lastY: 0,
    startX: 0, startY: 0, moved: false,
  })
  const rafRef = useRef<number>()

  // ── RAF: auto-rotate + drag inertia + apply transform ───────────────────────
  const tick = useCallback(() => {
    const s = sphere.current
    if (!sphereRef.current) { rafRef.current = requestAnimationFrame(tick); return }

    // Auto-rotate when idle
    if (!s.dragging) {
      s.targetRotY += 0.18
      s.velX *= 0.90
      s.velY *= 0.90
      s.targetRotX += s.velX
      s.targetRotY += s.velY
    }

    // Clamp vertical rotation so sphere doesn't flip upside-down
    s.targetRotX = Math.max(-60, Math.min(60, s.targetRotX))

    // Lerp toward target
    s.rotX += (s.targetRotX - s.rotX) * 0.07
    s.rotY += (s.targetRotY - s.rotY) * 0.07

    sphereRef.current.style.transform =
      `rotateX(${s.rotX}deg) rotateY(${s.rotY}deg)`

    // Update item position + billboard counter-rotation
    const rotXr = s.rotX * Math.PI / 180
    const rotYr = s.rotY * Math.PI / 180

    itemRefs.current.forEach((el, i) => {
      if (!el || !spherePoints[i]) return
      const pt = spherePoints[i]

      // Compute world-space Z after rotY then rotX (for stacking order only)
      const x1 =  pt.x * Math.cos(rotYr) + pt.z * Math.sin(rotYr)
      const z1 = -pt.x * Math.sin(rotYr) + pt.z * Math.cos(rotYr)
      const z2 =  z1   * Math.cos(rotXr) - pt.y * Math.sin(rotXr)

      const norm = (z2 / 280 + 1) / 2  // 0 = back, 1 = front

      // Only z-index and 3D transform updated per frame (avoids iOS layout thrashing)
      el.style.zIndex = String(Math.round(norm * 100))

      // ── BILLBOARD: counter-rotate so card always faces camera ──────────
      el.style.transform =
        `translate3d(${pt.x}px, ${pt.y}px, ${pt.z}px)` +
        ` rotateY(${-s.rotY}deg)` +
        ` rotateX(${-s.rotX}deg)`
    })

    rafRef.current = requestAnimationFrame(tick)
  }, [spherePoints])

  useEffect(() => {
    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [tick])

  // ── Drag handlers ─────────────────────────────────────────────────────────
  const onPointerDown = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if ((e.target as HTMLElement).closest('a, button')) return
    const cl = 'touches' in e ? e.touches[0] : e
    const s  = sphere.current
    s.dragging = true; s.moved = false
    s.startX = cl.clientX; s.startY = cl.clientY
    s.lastX  = cl.clientX; s.lastY  = cl.clientY
    s.velX = 0; s.velY = 0
    setIsDragging(false)
  }, [])

  useEffect(() => {
    const moveHandler = (e: MouseEvent | TouchEvent) => {
      const s = sphere.current
      if (!s.dragging) return
      const cl = 'touches' in e ? (e as TouchEvent).touches[0] : e as MouseEvent
      const dx = cl.clientX - s.lastX
      const dy = cl.clientY - s.lastY
      const dist = Math.hypot(cl.clientX - s.startX, cl.clientY - s.startY)
      if (!s.moved && dist > DRAG_THRESHOLD) {
        s.moved = true
        setIsDragging(true)
        setHoveredIdx(null)
      }
      if (!s.moved) return
      // Horizontal drag → rotateY, vertical drag → rotateX
      s.velY = dx * 0.35 * 0.5 + s.velY * 0.5
      s.velX = -dy * 0.25 * 0.5 + s.velX * 0.5
      s.targetRotY += dx * 0.35
      s.targetRotX -= dy * 0.25
      s.lastX = cl.clientX; s.lastY = cl.clientY
    }
    const upHandler = () => {
      const s = sphere.current
      s.dragging = false
      setIsDragging(false)
    }
    document.addEventListener('mousemove', moveHandler, { passive: true })
    document.addEventListener('mouseup', upHandler)
    document.addEventListener('touchmove', moveHandler, { passive: false })
    document.addEventListener('touchend', upHandler)
    return () => {
      document.removeEventListener('mousemove', moveHandler)
      document.removeEventListener('mouseup', upHandler)
      document.removeEventListener('touchmove', moveHandler)
      document.removeEventListener('touchend', upHandler)
    }
  }, [])

  // ── Heading scroll entrance ───────────────────────────────────────────────
  useGSAP(() => {
    if (!sectionRef.current) return
    gsap.fromTo('.proj-label, .proj-heading, .proj-sub',
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out', stagger: 0.1,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 82%', toggleActions: 'play none none reverse' } }
    )
    // Sphere fade-in
    if (sceneRef.current) {
      gsap.fromTo(sceneRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none reverse' } }
      )
    }
  }, { scope: sectionRef })

  // ── Morph open trigger ───────────────────────────────────────────────────
  const handleOpen = useCallback((project: ProjectItem, idx: number) => {
    if (sphere.current.moved) return
    const thumb = itemRefs.current[idx]
    if (!thumb) return

    const pt = spherePoints[idx]
    if (pt) {
      // Calculate target 3D angles to bring clicked card front & center
      const yAngle = Math.atan2(-pt.x, pt.z) * (180 / Math.PI)
      const xAngle = Math.atan2(pt.y, Math.sqrt(pt.x * pt.x + pt.z * pt.z)) * (180 / Math.PI)

      const currentRotY = sphere.current.rotY
      const diffY = ((yAngle - (currentRotY % 360) + 540) % 360) - 180
      sphere.current.targetRotY = currentRotY + diffY
      sphere.current.targetRotX = xAngle
    }

    // 3D scale zoom effect on card
    gsap.to(thumb, { scale: 1.35, zIndex: 999, duration: 0.35, ease: 'back.out(1.7)' })

    setTimeout(() => {
      const rect = thumb.getBoundingClientRect()
      setDetail({ project, originRect: rect })
    }, 120)
  }, [spherePoints])

  // ── Animate overlay when `detail` state changes ──────────────────────────
  useEffect(() => {
    if (!detail || !overlayRef.current || !overlayImgRef.current || !overlayPanelRef.current) return

    const rect = detail.originRect
    const overlayEl = overlayRef.current
    const imgEl = overlayImgRef.current
    const panelEl = overlayPanelRef.current

    overlayEl.style.display = 'flex'
    overlayEl.style.opacity = '0'

    // Set starting position at clicked thumbnail
    gsap.set(imgEl, {
      position: 'fixed',
      left: rect.left,
      top: rect.top,
      width: rect.width,
      height: rect.height,
      borderRadius: 16,
      zIndex: 60,
      objectFit: 'cover',
    })

    // Fade backdrop
    gsap.to(overlayEl, { opacity: 1, duration: 0.35, ease: 'power2.out' })

    // Compute compact image size to leave ample space for title & details
    const isMobile = window.innerWidth < 768
    const maxImgH = Math.min(window.innerHeight * (isMobile ? 0.3 : 0.38), isMobile ? 220 : 360)
    const tw = Math.min(window.innerWidth * (isMobile ? 0.88 : 0.82), maxImgH / 0.5625, isMobile ? 420 : 640)
    const th = tw * 0.5625
    const imgTop = isMobile ? Math.max(20, (window.innerHeight - (th + 220)) / 2.5) : Math.max(36, (window.innerHeight - (th + 240)) / 2.2)

    gsap.to(imgEl, {
      left: (window.innerWidth - tw) / 2,
      top: imgTop,
      width: tw,
      height: th,
      borderRadius: isMobile ? 14 : 20,
      duration: 0.7,
      ease: 'power3.inOut',
    })

    // Position text panel cleanly below the image
    const panelTop = imgTop + th + 20
    gsap.set(panelEl, { top: panelTop })

    // Slide up text details panel
    gsap.fromTo(
      panelEl,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.45, ease: 'power3.out', delay: 0.4 }
    )
  }, [detail])

  // ── Morph close ───────────────────────────────────────────────────────────
  const handleClose = useCallback(() => {
    if (!detail || !overlayRef.current || !overlayImgRef.current || !overlayPanelRef.current) return
    const { originRect: r } = detail
    const overlayEl = overlayRef.current
    const imgEl = overlayImgRef.current
    const panelEl = overlayPanelRef.current

    gsap.to(panelEl, { y: 25, opacity: 0, duration: 0.22, ease: 'power2.in' })
    gsap.to(imgEl, {
      left: r.left,
      top: r.top,
      width: r.width,
      height: r.height,
      borderRadius: 16,
      duration: 0.55,
      ease: 'power3.inOut',
      onComplete: () => {
        gsap.to(overlayEl, {
          opacity: 0,
          duration: 0.2,
          onComplete: () => {
            overlayEl.style.display = 'none'
            setDetail(null)
            itemRefs.current.forEach(el => {
              if (el) gsap.to(el, { scale: 1, duration: 0.4, ease: 'power2.out' })
            })
          },
        })
      },
    })
  }, [detail])

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape' && detail) handleClose() }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [detail, handleClose])

  const cursor = isDragging ? 'grabbing' : 'grab'

  return (
    <>
      <section id="work" ref={sectionRef} className="relative py-12 sm:py-24 px-4 sm:px-6 overflow-hidden select-none">
        {/* Heading */}
        <div className="text-center mb-4 sm:mb-8">
          <span className="proj-label opacity-0 inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-neutral-500 mb-3">
            <span className="w-6 h-px bg-neutral-600" />Portfolio<span className="w-6 h-px bg-neutral-600" />
          </span>
          <h2 className="proj-heading opacity-0 text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white">
            All Projects
          </h2>
          <p className="proj-sub opacity-0 text-neutral-500 text-xs sm:text-sm mt-2 font-mono">
            Drag to spin · Klik untuk melihat detail
          </p>
        </div>

        {/* ── 3D Sphere Scene ──────────────────────────────────────────────── */}
        <div
          ref={sceneRef}
          className="relative mx-auto flex items-center justify-center w-full touch-none select-none"
          style={{
            height: 'clamp(360px, 80vw, 580px)',
            perspective: '1000px', WebkitPerspective: '1000px',
            perspectiveOrigin: '50% 50%', WebkitPerspectiveOrigin: '50% 50%',
            cursor,
            touchAction: 'none',
          }}
          onMouseDown={onPointerDown}
          onTouchStart={onPointerDown}
          aria-label="3D project sphere — drag to rotate, click to open"
        >
          {/* Ambient glow */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-64 sm:w-80 h-64 sm:h-80 rounded-full bg-purple-600/8 blur-[80px]" />
          </div>

          {/* Orbit ring guides */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden>
            <div
              className="rounded-full border border-white/6"
              style={{
                width: 'clamp(290px, 76vw, 560px)',
                height: 'clamp(290px, 76vw, 560px)',
                transform: 'rotateX(75deg)', WebkitTransform: 'rotateX(75deg)',
              }}
            />
            <div
              className="absolute rounded-full border border-white/4"
              style={{
                width: 'clamp(210px, 56vw, 420px)',
                height: 'clamp(210px, 56vw, 420px)',
                transform: 'rotateX(75deg) rotateZ(45deg)', WebkitTransform: 'rotateX(75deg) rotateZ(45deg)',
              }}
            />
          </div>

          {/* The rotating sphere wrapper */}
          <div
            ref={sphereRef}
            style={{
              width: 0, height: 0,
              position: 'relative',
              transformStyle: 'preserve-3d', WebkitTransformStyle: 'preserve-3d',
              transform: 'rotateX(-15deg) rotateY(0deg)', WebkitTransform: 'rotateX(-15deg) rotateY(0deg)',
            }}
          >
            {projects.map((project, i) => {
              const pt = spherePoints[i] ?? { x: 0, y: 0, z: 0 }
              return (
                <div
                  key={project.id}
                  ref={el => { itemRefs.current[i] = el }}
                  className="absolute group cursor-pointer w-[100px] md:w-[210px] -ml-[50px] md:-ml-[105px] -mt-[28.1px] md:-mt-[59px]"
                  style={{
                    transform: `translate3d(${pt.x}px, ${pt.y}px, ${pt.z}px)`,
                    WebkitBackfaceVisibility: 'hidden',
                    backfaceVisibility: 'hidden',
                    WebkitTransformStyle: 'preserve-3d',
                    transformStyle: 'preserve-3d',
                    cursor,
                  }}
                  onClick={(e) => {
                    e.stopPropagation()
                    handleOpen(project, i)
                  }}
                  onMouseEnter={() => {
                    if (!sphere.current.moved) {
                      setHoveredIdx(i)
                      gsap.to(itemRefs.current[i], { scale: 1.1, duration: 0.3, ease: 'power2.out', overwrite: 'auto' })
                    }
                  }}
                  onMouseLeave={() => {
                    setHoveredIdx(null)
                    gsap.to(itemRefs.current[i], { scale: 1, duration: 0.4, ease: 'power3.out', overwrite: 'auto' })
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`View ${project.title}`}
                  onKeyDown={e => { if (e.key === 'Enter') handleOpen(project, i) }}
                >
                  {/* Card */}
                  <div className="overflow-hidden rounded-xl border border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.6)] group-hover:border-white/30 transition-colors duration-300">
                    <img
                      src={project.image || '/ponpes.png'}
                      alt={project.title}
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                      className="w-full aspect-video object-cover pointer-events-none"
                    />
                  </div>

                  {/* Hover label */}
                  <div
                    className="absolute -bottom-9 left-0 right-0 text-center pointer-events-none transition-all duration-300"
                    style={{
                      opacity: hoveredIdx === i ? 1 : 0,
                      transform: hoveredIdx === i ? 'translateY(0)' : 'translateY(4px)',
                    }}
                  >
                    <p className="text-[9px] font-mono uppercase tracking-widest text-neutral-500">{project.tags?.[0]}</p>
                    <h3 className="text-xs font-bold text-white leading-tight mt-0.5 line-clamp-1 px-1">{project.title}</h3>
                  </div>

                  {/* Expand icon */}
                  <div
                    aria-hidden
                    className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-white flex items-center justify-center shadow-lg pointer-events-none transition-all duration-300 scale-0 group-hover:scale-100"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5 text-black" />
                  </div>
                </div>
              )
            })}
          </div>

          {/* Drag hint */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[9px] font-mono uppercase tracking-[0.25em] text-neutral-700 pointer-events-none" aria-hidden>
            ↺ Drag to rotate
          </div>
        </div>
      </section>

      {/* ── Morph Overlay ──────────────────────────────────────────────────── */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-50 flex flex-col items-center justify-start pt-8 px-4 bg-black/85"
        style={{
          display: 'none',
          opacity: 0,
          WebkitBackdropFilter: 'blur(24px)',
          backdropFilter: 'blur(24px)',
        }}
        onClick={e => { if (e.target === overlayRef.current) handleClose() }}
        role="dialog" aria-modal="true" aria-label={detail?.project.title ?? 'Project detail'}
      >
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 z-10 p-2.5 rounded-full border border-white/20 bg-white/5 text-white hover:bg-white/15 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {detail && (
          <img
            ref={overlayImgRef}
            src={detail.project.image || '/ponpes.png'}
            alt={detail.project.title}
            draggable={false}
            className="rounded-2xl object-cover shadow-[0_40px_120px_rgba(0,0,0,0.8)] pointer-events-none"
            style={{ position: 'fixed', willChange: 'left,top,width,height' }}
          />
        )}

        {detail && (
          <div
            ref={overlayPanelRef}
            className="absolute left-0 right-0 px-6 sm:px-10 py-4 pointer-events-auto"
            style={{ opacity: 0 }}
          >
            <div className="max-w-3xl mx-auto">
              <p className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 mb-1">{detail.project.tags?.[0]}</p>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display tracking-tight mb-2">{detail.project.title}</h2>
              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed mb-4 max-w-2xl">{detail.project.description}</p>
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex flex-wrap gap-2">
                  {detail.project.tags?.map(tag => (
                    <span key={tag} className="text-[11px] font-mono px-3 py-1 rounded-full border border-white/20 text-neutral-300 bg-white/5">{tag}</span>
                  ))}
                </div>
                {detail.project.link && (
                  <a href={detail.project.link} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white text-black px-5 py-2 rounded-full text-xs font-bold hover:bg-neutral-100 transition-colors shadow-lg ml-auto cursor-pointer"
                    onClick={e => e.stopPropagation()}
                  >
                    View Project <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
