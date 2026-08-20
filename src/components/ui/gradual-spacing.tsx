"use client";

import { AnimatePresence, motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface GradualSpacingProps {
  text: string;
  duration?: number;
  delayMultiple?: number;
  framerProps?: Variants;
  className?: string;
}

export function GradualSpacing({
  text,
  duration = 0.5,
  delayMultiple = 0.04,
  framerProps = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  },
  className,
}: GradualSpacingProps) {
  const words = text.split(" ");
  let globalCharIndex = 0;

  return (
    <div className="flex flex-wrap justify-center gap-x-[0.25em] gap-y-1">
      {words.map((word, wordIdx) => {
        const chars = word.split("");
        return (
          <span key={wordIdx} className="inline-flex space-x-[0.02em] whitespace-nowrap">
            <AnimatePresence>
              {chars.map((char) => {
                const charIndex = globalCharIndex++;
                return (
                  <motion.span
                    key={charIndex}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={framerProps}
                    transition={{ duration, delay: charIndex * delayMultiple }}
                    className={cn("inline-block drop-shadow-sm", className)}
                  >
                    {char}
                  </motion.span>
                );
              })}
            </AnimatePresence>
          </span>
        );
      })}
    </div>
  );
}

