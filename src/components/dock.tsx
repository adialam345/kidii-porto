import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Flip } from "gsap/Flip";
import { useGSAP } from "@gsap/react";
import { Home, User, GraduationCap, Briefcase, Mail, FileDown } from "lucide-react";
import { Dock, DockIcon } from "@/components/ui/dock-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollToPlugin, Flip, useGSAP);
}

const NAV_ITEMS = [
  { id: "home", label: "HOME", icon: Home },
  { id: "about", label: "ABOUT", icon: User },
  { id: "education-certificates", label: "EDUCATION & CERTIFICATES", icon: GraduationCap },
  { id: "work", label: "PROJECT", icon: Briefcase },
  { id: "contact", label: "CONTACT", icon: Mail },
];

export function DockDemo() {
  const [activeSection, setActiveSection] = useState("home");
  const previousSection = useRef("home");
  const dockRef = useRef<HTMLDivElement>(null);

  // Smooth GSAP ScrollTo on navigation click + section morphing zoom
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (!target) return;

    // PPT Morph Section Transition: Zoom out current section briefly, scroll, then zoom in
    const currentSectionEl = document.getElementById(activeSection);
    if (currentSectionEl) {
      gsap.to(currentSectionEl, {
        scale: 0.97,
        opacity: 0.85,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          gsap.to(currentSectionEl, { scale: 1, opacity: 1, duration: 0.4, ease: "power2.out" });
        }
      });
    }

    gsap.to(window, {
      duration: 1.1,
      scrollTo: { y: target, offsetY: 20 },
      ease: "power3.inOut",
    });
  };

  // ScrollSpy to update active section & trigger Flip morph
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 300;
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            if (previousSection.current !== item.id) {
              // Morph FLIP active indicator
              const activePill = document.querySelector(".dock-active-pill");
              if (activePill) {
                const state = Flip.getState(activePill);
                setActiveSection(item.id);
                previousSection.current = item.id;
                requestAnimationFrame(() => {
                  Flip.from(state, {
                    duration: 0.45,
                    ease: "power3.out",
                    absolute: true,
                  });
                });
              } else {
                setActiveSection(item.id);
                previousSection.current = item.id;
              }
            }
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={dockRef} className="fixed bottom-3 sm:bottom-6 left-0 right-0 z-50 px-2 sm:px-0 flex justify-center">
      <Dock iconMagnification={54} iconDistance={70} iconSize={38} className="bg-neutral-900/80 backdrop-blur-xl border-white/15 shadow-2xl relative">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <DockIcon
              key={item.id}
              className="relative bg-white/5 hover:bg-white/15 transition-colors"
            >
              {isActive && (
                <div
                  className="dock-active-pill absolute inset-0 rounded-full bg-white/20 border border-white/30 shadow-[0_0_15px_rgba(255,255,255,0.2)] pointer-events-none z-0"
                />
              )}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => handleNavClick(e, item.id)}
                      aria-label={`${item.label} section`}
                      className="p-2 flex items-center justify-center size-full relative z-10"
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>{item.label}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </DockIcon>
          );
        })}

        {/* Download CV item */}
        <DockIcon className="bg-white/5 hover:bg-white/15 transition-colors">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href="/CV_Adi_Alam_Sami_Aji_1.pdf"
                  download="CV_Adi_Alam_Sami_Aji.pdf"
                  aria-label="Download CV"
                  className="p-2 flex items-center justify-center size-full"
                >
                  <FileDown className="w-5 h-5 text-white" />
                </a>
              </TooltipTrigger>
              <TooltipContent>DOWNLOAD CV</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </DockIcon>
      </Dock>
    </div>
  );
}



