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

    // Smooth scroll support for hash links (#about, #work, #contact, etc.)
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      const anchor = target?.closest('a')
      if (anchor) {
        const href = anchor.getAttribute('href')
        if (href && href.startsWith('#') && href.length > 1) {
          const targetEl = document.querySelector(href)
          if (targetEl) {
            e.preventDefault()
            lenis.scrollTo(targetEl as HTMLElement, { offset: -20 })
          }
        }
      }
    }

    document.addEventListener('click', handleAnchorClick)

    return () => {
      document.removeEventListener('click', handleAnchorClick)
      cancelAnimationFrame(animationFrameId)
      lenis.destroy()
    }
  }, [])

  return null
}
