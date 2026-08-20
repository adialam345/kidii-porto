import { Safari } from "@/components/ui/safari";
import { motion } from 'framer-motion';
import { ShineBorder } from "./ui/shine-border";
import { usePortfolioData } from "@/lib/portfolio-store";

export function SafariDemo() {
  const { projectsList } = usePortfolioData();
  const featuredProject = projectsList.find(p => p.isFeatured) || projectsList[0] || {
    title: 'PONPES MIFTAHUL HUDA | WEBSITE',
    description: 'Sebuah sistem informasi berbasis web menggunakan Laravel untuk manajemen lembaga pendidikan.',
    image: '/ponpes.png',
    link: 'https://miftahulhudadoho.or.id/'
  };

  return (
    <div className="w-full mb-5">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 flex justify-center items-center px-4"
        >
          {featuredProject.title || "Latest Projects"}
        </motion.h2>
        <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-6 text-sm sm:text-base md:text-lg lg:text-xl text-center text-gray-300 max-w-2xl mb-10 mx-auto px-4 leading-relaxed">
                {featuredProject.description}
        </motion.p>
        <motion.div 
          drag
          dragTransition={{ bounceStiffness: 100, bounceDamping: 10 }}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{
            scale:1.05,
            transition: { duration : 0.2}
          }}
          viewport={{ once: true }}
          className="relative w-full flex items-center justify-center px-4 sm:px-8">
          <ShineBorder
            borderWidth={3}
            className="relative flex flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl w-full lg:w-3/5"
            color={["#d9e9f6", "#2b6684", "#7caac2"]}
          >
              <Safari
              url={featuredProject.link || "https://miftahulhudadoho.or.id/"}
              className="w-full h-auto"
              imageSrc={featuredProject.image || "/ponpes.png"}
                />
          </ShineBorder>
        </motion.div>
    </div>
  );
}

