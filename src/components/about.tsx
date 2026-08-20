import { motion } from 'framer-motion'
import { MarqueeDemo } from './techstack-marquee'
import { FadeText } from './ui/fade'

export function About() {
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
                text="where"
              />
              <span className="block font-bold not-italic">
                <FadeText
                  className="text-white"
                  direction="right"
                  framerProps={{
                    show: { transition: { delay: 0.8 } },
                  }}
                  text="EXPERIENCE"
                />
                <FadeText
                  className="text-white"
                  direction="right"
                  framerProps={{
                    show: { transition: { delay: 1 } },
                  }}
                  text="BUILDS"
                />
                <FadeText
                  className="text-white"
                  direction="down"
                  framerProps={{
                    show: { transition: { delay: 1.2 } },
                  }}
                  text="CHARACTER"
                />
                
              </span>
            </h2>
            <p className="text-gray-400 text-sm sm:text-base md:text-lg mb-8">
            I am an Information Technology student at Politeknik Negeri Madiun with experience in Laravel, PHP, JavaScript, React, Kotlin, Python, as well as interests in IoT and cybersecurity. I aim to become a skilled full-stack developer and software engineer while deepening my knowledge of networking, IoT, and secure system design. Through various projects, I’ve integrated Laravel with React and JavaScript, explored mobile app development with Kotlin, and built IoT-based solutions. My passion for technology drives me to keep learning and contribute to creating innovative and secure solutions.
            </p>
          </div>
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="aspect-square bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl"
            >
              <img
                src="/profile.jpg"
                alt="About section illustration"
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

