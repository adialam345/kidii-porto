import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, X, Layers } from 'lucide-react'
import { usePortfolioData } from '@/lib/portfolio-store'

export function Projects() {
  const { projectsList } = usePortfolioData()
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Show max 6 on main page
  const mainPageProjects = projectsList.slice(0, 6)

  return (
    <section id="work" className="min-h-screen py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 md:mb-12 gap-4">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold"
            >
              All Projects
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-neutral-400 text-sm mt-2"
            >
              Kumpulan karya & proyek pengembangan perangkat lunak
            </motion.p>
          </div>

          {projectsList.length > 6 && (
            <motion.button
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setIsModalOpen(true)}
              className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/15 px-5 py-3 rounded-xl text-xs font-semibold text-white transition-all shadow-lg backdrop-blur-md"
            >
              <Layers className="w-4 h-4 text-purple-400" />
              <span>Lihat Semua ({projectsList.length} Proyek)</span>
            </motion.button>
          )}
        </div>

        {/* MAIN PAGE GRID (MAX 6) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {mainPageProjects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative flex flex-col justify-between bg-white/5 border border-white/10 rounded-2xl p-4 transition-all duration-300 hover:bg-white/[0.08] hover:border-white/25"
            >
              <div>
                <div className="overflow-hidden rounded-xl h-[200px] mb-4 bg-neutral-950">
                  <img
                    src={project.image || '/ponpes.png'}
                    alt={project.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex items-center justify-between mb-3 gap-2">
                  <h3 className="text-lg font-semibold line-clamp-1">{project.title}</h3>
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" title="View Project">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 rounded-full border border-white/20 hover:bg-white hover:text-black transition-colors"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </motion.button>
                    </a>
                  )}
                </div>
                <p className="text-gray-400 mb-3 text-sm leading-relaxed line-clamp-3">{project.description}</p>
              </div>
              <div className="flex gap-2 flex-wrap mt-2">
                {project.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs border border-white/20 rounded-full text-neutral-300 bg-white/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ALL PROJECTS MODAL POPUP */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/85 backdrop-blur-md overflow-hidden">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-neutral-900 border border-white/15 w-full max-w-6xl max-h-[85vh] rounded-3xl flex flex-col shadow-2xl overflow-hidden"
            >
              {/* MODAL HEADER */}
              <div className="p-6 border-b border-white/10 flex items-center justify-between bg-neutral-950/60">
                <div>
                  <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Layers className="w-6 h-6 text-purple-400" />
                    All Projects ({projectsList.length})
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1">
                    Seluruh proyek pengembangan aplikasi web, mobile, dan IoT.
                  </p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2.5 rounded-full border border-white/15 text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* MODAL GRID CONTENT */}
              <div className="p-6 overflow-y-auto max-h-[65vh] space-y-6 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                  {projectsList.map((project) => (
                    <div
                      key={project.id}
                      className="group relative flex flex-col justify-between bg-white/5 border border-white/10 rounded-2xl p-4 transition-all duration-300 hover:bg-white/[0.08] hover:border-white/25"
                    >
                      <div>
                        <div className="overflow-hidden rounded-xl h-[200px] mb-4 bg-neutral-950">
                          <img
                            src={project.image || '/ponpes.png'}
                            alt={project.title}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <div className="flex items-center justify-between mb-3 gap-2">
                          <h3 className="text-lg font-semibold line-clamp-1">{project.title}</h3>
                          {project.link && (
                            <a href={project.link} target="_blank" rel="noopener noreferrer" title="View Project">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="p-2 rounded-full border border-white/20 hover:bg-white hover:text-black transition-colors"
                              >
                                <ArrowUpRight className="w-4 h-4" />
                              </motion.button>
                            </a>
                          )}
                        </div>
                        <p className="text-gray-400 mb-3 text-sm leading-relaxed">{project.description}</p>
                      </div>
                      <div className="flex gap-2 flex-wrap mt-2">
                        {project.tags?.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 text-xs border border-white/20 rounded-full text-neutral-300 bg-white/5"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* MODAL FOOTER */}
              <div className="p-4 border-t border-white/10 bg-neutral-950/80 flex justify-between items-center text-xs text-neutral-400">
                <span>Total {projectsList.length} Proyek</span>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 bg-white text-black font-semibold rounded-xl text-xs hover:bg-neutral-200 transition-colors"
                >
                  Tutup Modal
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}




