import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Instagram } from 'lucide-react'
import { ConfettiButton } from './ui/confetti'
import { usePortfolioData } from '@/lib/portfolio-store'

export function Contact() {
  const { profile } = usePortfolioData()

  return (
    <section id="contact" className="min-h-[calc(100dvh-20rem)] py-20 px-4 sm:px-6">
      <div className="max-w-6xl flex justify-center items-center mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-8">Get in Touch</h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-12">
            Have a project in mind? Let&apos;s work together to create something amazing.
          </p>
            <ConfettiButton className="bg-white text-black px-8 sm:px-14 py-6 sm:py-10 rounded-full font-medium text-base sm:text-lg mb-12" >Let&apos;s talk</ConfettiButton>
          <div className="flex justify-center gap-4 sm:gap-8">
            {profile.githubUrl && (
              <motion.a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5 }}
                className="p-3 sm:p-4 border border-white/20 rounded-full hover:border-white/40 transition-colors"
                title="GitHub"
              >
                <Github className="w-6 h-6" />
              </motion.a>
            )}
            {profile.linkedinUrl && (
              <motion.a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5 }}
                className="p-3 sm:p-4 border border-white/20 rounded-full hover:border-white/40 transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="w-6 h-6" />
              </motion.a>
            )}
            {profile.instagramUrl && (
              <motion.a
                href={profile.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5 }}
                className="p-3 sm:p-4 border border-white/20 rounded-full hover:border-white/40 transition-colors"
                title="Instagram"
              >
                <Instagram className="w-6 h-6" />
              </motion.a>
            )}
            {profile.email && (
              <motion.a
                href={`mailto:${profile.email}`}
                whileHover={{ y: -5 }}
                className="p-3 sm:p-4 border border-white/20 rounded-full hover:border-white/40 transition-colors"
                title="Email"
              >
                <Mail className="w-6 h-6" />
              </motion.a>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}


