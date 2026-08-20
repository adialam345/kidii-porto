'use client'

import { useEffect, useRef, useState } from 'react'

export function ParticleBackground() {
  const [mounted, setMounted] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    if (typeof window === 'undefined') return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Dynamic particle count based on screen size for ultra performance
    const count = window.innerWidth < 768 ? 40 : 70

    const particles: Array<{
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
    }> = []

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.8 + 0.5,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.4
      })
    }

    let animationId: number
    let isVisible = true

    function animate() {
      if (!ctx || !canvas || !isVisible) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)'
      particles.forEach(particle => {
        particle.x += particle.speedX
        particle.y += particle.speedY

        if (particle.x > canvas.width) particle.x = 0
        if (particle.x < 0) particle.x = canvas.width
        if (particle.y > canvas.height) particle.y = 0
        if (particle.y < 0) particle.y = canvas.height

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      if (typeof window === 'undefined' || !canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const handleVisibilityChange = () => {
      if (document.hidden) {
        isVisible = false
        cancelAnimationFrame(animationId)
      } else {
        isVisible = true
        animate()
      }
    }

    window.addEventListener('resize', handleResize)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [mounted])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none gpu-accelerated z-0"
    />
  )
}


