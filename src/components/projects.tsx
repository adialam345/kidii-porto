'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import {projects} from '@/components/global-project'
import Image from 'next/image'
import Link from 'next/link'

export function Projects() {
  return (
    <section id="work" className="min-h-screen py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 md:mb-12"
        >
          All Projects
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="overflow-hidden rounded-2xl">
                <Image
                  src={Object.values(project.image)[0]}
                  alt={project.title}
                  className="w-full h-[200px] object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold">{project.title}</h3>
                  <Link href={project.link}>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 rounded-full border border-white/20"
                        >
                        <ArrowUpRight className="w-5 h-5" />
                      </motion.button>
                  </Link>

                </div>
                <p className="text-gray-400 mb-3 text-sm">{project.description}</p>
                <div className="flex gap-2 flex-wrap">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs border border-white/20 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

