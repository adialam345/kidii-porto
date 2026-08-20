import { motion } from 'framer-motion'
import { MarqueeDemo } from './techstack-marquee'
import { FadeText } from './ui/fade'
import { usePortfolioData } from '@/lib/portfolio-store'

export function About() {
  const { profile } = usePortfolioData()

  return (
    <section id="about" className="min-h-screen py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8 md:gap-12 items-center"
        >
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-light italic mb-6">
            <FadeText
                className="text-white"
                direction="up"
                framerProps={{
                  show: { transition: { delay: 0.5 } },
                }}
                text={profile.aboutHeadline1 || "where"}
              />
              <span className="block font-bold not-italic">
                <FadeText
                  className="text-white"
                  direction="right"
                  framerProps={{
                    show: { transition: { delay: 0.8 } },
                  }}
                  text={profile.aboutHeadline2 || "EXPERIENCE BUILDS CHARACTER"}
                />
              </span>
            </h2>
            <p className="text-gray-400 text-sm sm:text-base md:text-lg mb-8 leading-relaxed">
              {profile.aboutBio}
            </p>
          </div>
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="aspect-square bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden shadow-2xl"
            >
              <img
                src={profile.profileImage || "/profile.jpg"}
                alt="Profile photo"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover rounded-2xl"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>

      <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
        <MarqueeDemo />
      </motion.div>
    </section>
  )
}

