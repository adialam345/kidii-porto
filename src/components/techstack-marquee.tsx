import { cn } from "@/lib/utils";
import { Marquee } from "./ui/marquee";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const techStack = [
  {
    name: "JavaScript",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  },
  {
    name: "React",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  {
    name: "Node.js",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  },
  {
    name: "Next.js",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  },
  {
    name: "Tailwind CSS",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  },
  {
    name: "Laravel",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg",
  },
  {
    name: "Kotlin",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg",
  },
  {
    name: "Python",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  {
    name: "Bootstrap",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
  },
  {
    name: "C++",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
  },
  {
    name: "Java",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  },
  {
    name: "MySQL",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  },
];

const ReviewCard = ({
  image,
  name,
}: {
  image: string;
  name: string;
}) => {
  return (
    <figure
      className={cn(
        "relative w-24 sm:w-32 cursor-pointer overflow-hidden rounded-2xl p-3 sm:p-4 transition-all duration-300",
        "border border-white/10 bg-white/[0.03] backdrop-blur-sm",
        "hover:border-emerald-500/50 hover:bg-emerald-500/10 hover:scale-105 hover:shadow-[0_0_20px_rgba(52,211,153,0.15)]",
        "group flex flex-col items-center justify-center gap-2"
      )}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex flex-col items-center justify-center gap-2">
              <img
                className="w-8 sm:w-12 h-8 sm:h-12 object-contain transition-all duration-300 group-hover:scale-110"
                alt={name}
                src={image}
                loading="lazy"
                decoding="async"
              />
              <span className="text-[10px] sm:text-xs font-mono text-neutral-400 group-hover:text-emerald-400 transition-colors font-medium">
                {name}
              </span>
            </div>
          </TooltipTrigger>
          <TooltipContent>{name}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </figure>
  );
};

export function MarqueeDemo() {
  return (
    <div className="relative mt-8 sm:mt-12 flex h-[140px] sm:h-[180px] w-full flex-col items-center justify-center overflow-hidden bg-transparent">
      <Marquee pauseOnHover className="[--duration:25s] [--gap:1rem]">
        {techStack.map((tech) => (
          <ReviewCard key={tech.name} {...tech} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 sm:w-1/4 bg-gradient-to-r from-black/80 to-transparent"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 sm:w-1/4 bg-gradient-to-l from-black/80 to-transparent"></div>
    </div>
  );
}
