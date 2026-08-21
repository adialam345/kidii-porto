import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Safari } from "@/components/ui/safari"
import { ShineBorder } from "./ui/shine-border"
import { usePortfolioData } from "@/lib/portfolio-store"

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP)
}

export function SafariDemo() {
  const { projectsList } = usePortfolioData()
  const featuredProject = projectsList.find(p => p.isFeatured) || projectsList[0] || {
    title: 'PONPES MIFTAHUL HUDA | WEBSITE',
    description: 'Sebuah sistem informasi berbasis web menggunakan Laravel untuk manajemen lembaga pendidikan.',
    image: '/ponpes.png',
    link: 'https://miftahulhudadoho.or.id/'
  }

  const containerRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!containerRef.current || !cardRef.current) return

    // Entrance timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      defaults: { ease: 'power3.out' }
    })

    tl.fromTo(
      '.safari-heading',
      { opacity: 0, y: 40, skewX: -5 },
      { opacity: 1, y: 0, skewX: 0, duration: 0.8 }
    )
    .fromTo(
      '.safari-sub',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6 },
      '-=0.4'
    )
    .fromTo(
      cardRef.current,
      { opacity: 0, scale: 0.88, rotationX: 15 },
      { opacity: 1, scale: 1, rotationX: 0, duration: 1, ease: 'power3.out' },
      '-=0.3'
    )

    // 3D Magnetic tilt on hover
    const el = cardRef.current
    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = (e.clientX - cx) / (rect.width / 2)
      const dy = (e.clientY - cy) / (rect.height / 2)
      gsap.to(el, {
        rotationY: dx * 7,
        rotationX: -dy * 7,
        transformPerspective: 800,
        scale: 1.02,
        duration: 0.4,
        ease: 'power2.out',
        overwrite: 'auto',
      })
    }
    const handleLeave = () => {
      gsap.to(el, {
        rotationY: 0,
        rotationX: 0,
        scale: 1,
        duration: 0.6,
        ease: 'power3.out',
        overwrite: 'auto',
      })
    }

    el.addEventListener('mousemove', handleMove)
    el.addEventListener('mouseleave', handleLeave)
  }, { scope: containerRef })

  return (
    <div ref={containerRef} className="w-full py-4 sm:py-12 my-2 sm:my-6">
      <h2 className="safari-heading opacity-0 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight font-display mb-3 flex justify-center items-center px-4 text-center text-white">
        {featuredProject.title || "Latest Projects"}
      </h2>
      <p className="safari-sub opacity-0 mt-6 text-sm sm:text-base md:text-lg lg:text-xl text-center text-neutral-300 max-w-2xl mb-10 mx-auto px-4 leading-relaxed text-balance">
        {featuredProject.description}
      </p>
      <div 
        ref={cardRef}
        className="relative w-full flex items-center justify-center px-3 sm:px-8 opacity-0"
      >
        <ShineBorder
          borderWidth={2}
          className="relative flex flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl w-full max-w-4xl lg:w-3/5"
          color={["#d9e9f6", "#2b6684", "#7caac2"]}
        >
          <Safari
            url={featuredProject.link || "https://miftahulhudadoho.or.id/"}
            className="w-full h-auto"
            imageSrc={featuredProject.image || "/ponpes.png"}
          />
        </ShineBorder>
      </div>
    </div>
  )
}

