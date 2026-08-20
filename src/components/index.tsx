import { motion } from 'framer-motion'
import { GradualSpacing } from '@/components/ui/gradual-spacing'
import { WavyBackground } from './ui/wavy-background'
import { usePortfolioData } from '@/lib/portfolio-store'

export function Hero() {
  const { profile } = usePortfolioData()
  
  return (
  <WavyBackground id="home">
    <div className="flex min-h-screen justify-center items-center relative px-4 sm:px-6 text-center">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto text-center"
                  >
                    <div className="text-2xl sm:text-3xl md:text-6xl lg:text-7xl font-bold leading-tight">
                      <div className="text-white flex flex-col sm:flex-row gap-2 sm:gap-5 justify-center">
                        <GradualSpacing
                          className="font-display italic font-light -tracking-widesttext-white before:md:leading-[5rem]"
                          text={profile.role1 || "I'm a"}
                        />
                        <GradualSpacing
                          className="font-display block font-bold md:inline -tracking-widesttext-white before:md:leading-[5rem]"
                          text={profile.role2 || "FULL-STACK"}
                        />{' '}
                      </div>
                      <GradualSpacing
                        className="font-display block font-bold -tracking-widesttext-white before:md:leading-[5rem]"
                        text={profile.role3 || "DEVELOPER & SOFTWARE ENGINEER"}
                      />
                    </div>
                    <p className="mt-6 text-sm sm:text-base md:text-xl text-gray-300 max-w-2xl mx-auto px-4 leading-relaxed">
                        {profile.heroBio}
                    </p>
                    <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 px-4">
                        <a href="#about">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-white text-black hover:bg-neutral-200 px-6 sm:px-8 py-3 rounded-full font-medium text-sm sm:text-base transition-colors"
                            >
                                Know more
                            </motion.button>
                        </a>
                        <a href="#contact">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="border border-white hover:bg-white/10 text-white px-6 sm:px-8 py-3 rounded-full font-medium text-sm sm:text-base transition-colors"
                            >
                                Contact
                            </motion.button>
                        </a>
                        <a href={profile.cvUrl || "/CV_Adi_Alam_Sami_Aji_1.pdf"} download="CV_Adi_Alam_Sami_Aji.pdf">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="border border-white hover:bg-white/10 text-white px-6 sm:px-8 py-3 rounded-full font-medium text-sm sm:text-base transition-colors flex items-center gap-2"
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


