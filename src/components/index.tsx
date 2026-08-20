import { motion } from 'framer-motion'
import { GradualSpacing } from '@/components/ui/gradual-spacing'
import { WavyBackground } from './ui/wavy-background'
import { usePortfolioData } from '@/lib/portfolio-store'

export function Hero() {
  const { profile } = usePortfolioData()
  
  return (
    <WavyBackground id="home">
      <div className="flex min-h-[85vh] sm:min-h-screen justify-center items-center relative px-4 sm:px-6 py-16 sm:py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center flex flex-col items-center"
        >
          <div className="text-xl sm:text-3xl md:text-5xl lg:text-7xl font-bold leading-snug sm:leading-tight">
            <div className="text-white flex flex-col sm:flex-row gap-1 sm:gap-3 justify-center items-center">
              <GradualSpacing
                className="font-display italic font-light text-white"
                text={profile.role1 || "I'm a"}
              />
              <GradualSpacing
                className="font-display font-bold text-white"
                text={profile.role2 || "FULL-STACK"}
              />
            </div>
            <div className="mt-1 sm:mt-3">
              <GradualSpacing
                className="font-display font-bold text-white"
                text={profile.role3 || "DEVELOPER & SOFTWARE ENGINEER"}
              />
            </div>
          </div>
          <p className="mt-4 sm:mt-6 text-xs sm:text-base md:text-xl text-gray-300 max-w-2xl mx-auto px-2 sm:px-4 leading-relaxed">
            {profile.heroBio}
          </p>
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto px-4">
            <a href="#about" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto bg-white text-black hover:bg-neutral-200 px-6 sm:px-8 py-3 rounded-full font-medium text-sm sm:text-base transition-colors"
              >
                Know more
              </motion.button>
            </a>
            <a href="#contact" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto border border-white hover:bg-white/10 text-white px-6 sm:px-8 py-3 rounded-full font-medium text-sm sm:text-base transition-colors"
              >
                Contact
              </motion.button>
            </a>
            <a href={profile.cvUrl || "/CV_Adi_Alam_Sami_Aji_1.pdf"} download="CV_Adi_Alam_Sami_Aji.pdf" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto border border-white hover:bg-white/10 text-white px-6 sm:px-8 py-3 rounded-full font-medium text-sm sm:text-base transition-colors flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Download CV
              </motion.button>
            </a>
          </div>
        </motion.div>
      </div>
    </WavyBackground>
  )
}



