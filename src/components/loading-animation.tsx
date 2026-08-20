'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

export function LoadingAnimation() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 400) // Fast load fade-out

    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black pointer-events-none"
        >
          <div className="flex flex-col items-center space-y-4">
            {/* Spinning circle */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
              className="w-10 h-10 border-2 border-white/20 border-t-white rounded-full"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

