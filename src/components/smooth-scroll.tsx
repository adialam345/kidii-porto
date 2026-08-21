'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

export function SmoothScroll() {
  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    })

    let animationFrameId: number

    function raf(time: number) {
      lenis.raf(time)
      animationFrameId = requestAnimationFrame(raf)
    }

    animationFrameId = requestAnimationFrame(raf)

    // Smooth scroll support for hash links (#about, #work, #contact, #education-certificates, etc.)
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      const anchor = target?.closest('a')
      if (anchor) {
        const href = anchor.getAttribute('href')
        if (href && href.startsWith('#') && href.length > 1) {
          const targetEl = document.querySelector(href)
          if (targetEl) {
            e.preventDefault()
            e.stopPropagation()
            lenis.scrollTo(targetEl as HTMLElement, { 
              offset: -40, 
              duration: 1.5,
              easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
            })
          }
        }
      }
    }

    // Use capture phase (true) to intercept anchor clicks BEFORE native browser instant jumps occur
    document.addEventListener('click', handleAnchorClick, true)

    return () => {
      document.removeEventListener('click', handleAnchorClick, true)
      cancelAnimationFrame(animationFrameId)
      lenis.destroy()
    }
  }, [])

  return null
}
