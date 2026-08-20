import { e as createComponent, g as addAttribute, l as renderHead, k as renderComponent, n as renderSlot, r as renderTemplate, h as createAstro } from './astro/server_DWnod6f9.mjs';
import 'piccolore';
/* empty css                         */
import { useEffect } from 'react';
import Lenis from 'lenis';

function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5
    });
    let animationFrameId;
    function raf(time) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }
    animationFrameId = requestAnimationFrame(raf);
    const handleAnchorClick = (e) => {
      const target = e.target;
      const anchor = target?.closest("a");
      if (anchor) {
        const href = anchor.getAttribute("href");
        if (href && href.startsWith("#") && href.length > 1) {
          const targetEl = document.querySelector(href);
          if (targetEl) {
            e.preventDefault();
            lenis.scrollTo(targetEl, { offset: -20 });
          }
        }
      }
    };
    document.addEventListener("click", handleAnchorClick);
    return () => {
      document.removeEventListener("click", handleAnchorClick);
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, []);
  return null;
}

const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const {
    title = "Adi Alam | Portfolio",
    description = "Personal portfolio website"
  } = Astro2.props;
  return renderTemplate`<html lang="en" class="dark"> <head><meta charset="UTF-8"><meta name="description"${addAttribute(description, "content")}><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">${renderHead()}</head> <body class="bg-black text-white font-sans antialiased selection:bg-purple-500 selection:text-white"> ${renderComponent($$result, "SmoothScroll", SmoothScroll, { "client:load": true, "client:component-hydration": "load", "client:component-path": "F:/Portofolio-NextJS-Acernity/src/components/smooth-scroll", "client:component-export": "SmoothScroll" })} ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "F:/Portofolio-NextJS-Acernity/src/layouts/Layout.astro", void 0);

export { $$Layout as $ };
