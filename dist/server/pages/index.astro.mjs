import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_DWnod6f9.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_DVL0br5h.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import * as React from 'react';
import React__default, { useState, useRef, useEffect, useMemo, createContext, forwardRef, useCallback, useImperativeHandle } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { Layers, ArrowUpRight, X, Github, Linkedin, Instagram, Mail } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
export { renderers } from '../renderers.mjs';

function Nav() {
  return /* @__PURE__ */ jsx(
    motion.header,
    {
      initial: { y: -100 },
      animate: { y: 0 },
      className: "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4",
      children: /* @__PURE__ */ jsx("a", { href: "/", className: "text-xl font-bold border rounded-full px-4 py-2", children: "KIDII DEV" })
    }
  );
}

function ParticleBackground() {
  const [mounted, setMounted] = useState(false);
  const canvasRef = useRef(null);
  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;
    if (typeof window === "undefined") return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const count = window.innerWidth < 768 ? 40 : 70;
    const particles = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.8 + 0.5,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.4
      });
    }
    let animationId;
    let isVisible = true;
    function animate() {
      if (!ctx || !canvas || !isVisible) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
      particles.forEach((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.y > canvas.height) particle.y = 0;
        if (particle.y < 0) particle.y = canvas.height;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });
      animationId = requestAnimationFrame(animate);
    }
    animate();
    const handleResize = () => {
      if (typeof window === "undefined" || !canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    const handleVisibilityChange = () => {
      if (document.hidden) {
        isVisible = false;
        cancelAnimationFrame(animationId);
      } else {
        isVisible = true;
        animate();
      }
    };
    window.addEventListener("resize", handleResize);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [mounted]);
  return /* @__PURE__ */ jsx(
    "canvas",
    {
      ref: canvasRef,
      className: "fixed inset-0 pointer-events-none gpu-accelerated z-0"
    }
  );
}

function cn$1(...inputs) {
  return twMerge(clsx(inputs));
}

function GradualSpacing({
  text,
  duration = 0.5,
  delayMultiple = 0.04,
  className
}) {
  const words = text.split(" ");
  return /* @__PURE__ */ jsx("div", { className: "flex flex-wrap justify-center gap-x-2 gap-y-1", children: words.map((word, i) => /* @__PURE__ */ jsx(
    motion.span,
    {
      initial: { opacity: 0, y: 15 },
      animate: { opacity: 1, y: 0 },
      transition: {
        duration,
        delay: i * 0.08,
        ease: [0.25, 0.4, 0.25, 1]
      },
      className: cn$1("inline-block gpu-accelerated", className),
      children: word
    },
    i
  )) });
}

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const WavyBackground = ({
  children,
  className,
  containerClassName,
  ...props
}) => {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        "h-screen flex flex-col items-center justify-center relative overflow-hidden bg-black",
        containerClassName
      ),
      children: [
        /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-60", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-sky-900/30 via-blue-950/20 to-transparent animate-spin-slow blur-3xl gpu-accelerated" }),
          /* @__PURE__ */ jsx("div", { className: "absolute top-1/4 left-1/2 -translate-x-1/2 w-[120%] h-[500px] bg-gradient-to-r from-cyan-600/20 via-sky-500/30 to-blue-700/20 blur-2xl rounded-full transform -rotate-12 animate-pulse-slow gpu-accelerated" }),
          /* @__PURE__ */ jsxs(
            "svg",
            {
              className: "absolute w-full h-full inset-0 opacity-50 blur-lg gpu-accelerated",
              xmlns: "http://www.w3.org/2000/svg",
              viewBox: "0 0 1440 320",
              preserveAspectRatio: "none",
              children: [
                /* @__PURE__ */ jsx(
                  "path",
                  {
                    fill: "url(#wave-gradient-1)",
                    d: "M0,192L48,197.3C96,203,192,213,288,197.3C384,181,480,139,576,138.7C672,139,768,181,864,197.3C960,213,1056,203,1152,176C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                    className: "animate-wave-slow"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "path",
                  {
                    fill: "url(#wave-gradient-2)",
                    d: "M0,96L48,128C96,160,192,224,288,229.3C384,235,480,181,576,149.3C672,117,768,107,864,128C960,149,1056,203,1152,213.3C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                    className: "animate-wave-fast"
                  }
                ),
                /* @__PURE__ */ jsxs("defs", { children: [
                  /* @__PURE__ */ jsxs("linearGradient", { id: "wave-gradient-1", x1: "0%", y1: "0%", x2: "100%", y2: "0%", children: [
                    /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: "#2b6684", stopOpacity: "0.8" }),
                    /* @__PURE__ */ jsx("stop", { offset: "50%", stopColor: "#4f8eaf", stopOpacity: "0.6" }),
                    /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: "#0a3a52", stopOpacity: "0.8" })
                  ] }),
                  /* @__PURE__ */ jsxs("linearGradient", { id: "wave-gradient-2", x1: "0%", y1: "0%", x2: "100%", y2: "0%", children: [
                    /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: "#7caac2", stopOpacity: "0.5" }),
                    /* @__PURE__ */ jsx("stop", { offset: "50%", stopColor: "#1a2328", stopOpacity: "0.7" }),
                    /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: "#d9e9f6", stopOpacity: "0.4" })
                  ] })
                ] })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: cn("relative z-10", className), ...props, children })
      ]
    }
  );
};

const projects = [
  {
    id: 1,
    title: "PONPES MIFTAHUL HUDA | WEBSITE",
    description: "Pondok Pesantren Miftahul Huda: Sebuah sistem informasi berbasis web menggunakan Laravel untuk manajemen lembaga pendidikan. Fitur utama meliputi autentikasi berbasis peran, manajemen konten dinamis, pendaftaran siswa online, antarmuka responsif, dan arsitektur database yang efisien.",
    tags: ["Laravel", "Tailwind CSS"],
    image: "/ponpes.png",
    link: "https://github.com/adialam345/ponpes_miftahulhuda"
  },
  {
    id: 2,
    title: "SISTOK GUDANG | MOBILE",
    description: "Sisitok Gudang: Adalah aplikasi Android untuk memantau dan mengelola inventaris gudang secara real-time. Fitur utama mencakup pencatatan barang masuk/keluar, manajemen pemasok, autentikasi pengguna, dan sinkronisasi data melalui API dengan arsitektur MVVM dan basis data lokal.",
    tags: ["Kotlin"],
    image: "/apkgudang.png",
    link: "https://github.com/adialam345/sistok_gudang"
  },
  {
    id: 3,
    title: "MONITORING SENSOR | MOBILE",
    description: "Monitoring Sensor: Sebuah aplikasi Android untuk memantau data sensor secara real-time menggunakan teknologi Internet of Things (IoT) dan Firebase Realtime Database. Fitur utama meliputi integrasi layanan Google dan antarmuka modern berbasis Material Design untuk tampilan yang intuitif dan responsif.",
    tags: ["Kotlin", "Firebase", "IOT"],
    image: "/sensoriot.png",
    link: "https://github.com/adialam345/aplikasi-monitoring-sensor-IOT"
  },
  {
    id: 4,
    title: "IOT SMART LAMP | WEBSITE",
    description: "IoT Smart Lamp Monitoring & Control: Sebuah sistem IoT berbasis web untuk memantau dan mengontrol lampu secara real-time menggunakan Firebase Realtime Database. Fitur utama meliputi pemantauan status perangkat, mode otomatis dan manual, deteksi gerakan dengan sensor PIR, serta antarmuka web responsif untuk kendali lampu.",
    tags: ["IOT", "Firebase"],
    image: "/iotlampu.png",
    link: "https://github.com/adialam345/iot-lampu"
  },
  {
    id: 5,
    title: "ABSENSI PROJECT | WEBSITE",
    description: "Sistem Absensi Digital: Sebuah aplikasi web untuk manajemen absensi karyawan dengan fitur canggih seperti deteksi lokasi dengan radius, foto selfie untuk verifikasi kehadiran, dan dashboard real-time. Dibangun menggunakan Laravel dan Tailwind CSS dengan fitur keamanan tinggi dan antarmuka yang user-friendly.",
    tags: ["Laravel", "Tailwind CSS", "GPS", "Camera API"],
    image: "/absensi.png",
    link: "https://github.com/adialam345/absensi-notepro"
  },
  {
    id: 6,
    title: "LAUNDRY SYSTEM | WEBSITE",
    description: "Sistem Manajemen Laundry: Sebuah aplikasi web untuk pengelolaan transaksi laundry, manajemen pelanggan, pelacakan status cucian (proses, cuci, setrika, selesai), cetak nota/struk, dan laporan keuangan. Dibangun menggunakan Laravel dan Tailwind CSS dengan antarmuka yang responsif dan efisien.",
    tags: ["Laravel", "Tailwind CSS"],
    image: "/laundry.png",
    link: "https://github.com/adialam345/laundry"
  }
];

const initialProfileData = {
  name: "Adi Alam Sami Aji",
  role1: "I'm a",
  role2: "FULL-STACK",
  role3: "DEVELOPER & SOFTWARE ENGINEER",
  heroBio: "I am a student at Polytechnic State Madiun, majoring in Information Technology. I am currently learning to become a full-stack developer and software engineer, with skills in internet networking.",
  aboutHeadline1: "where",
  aboutHeadline2: "EXPERIENCE BUILDS CHARACTER",
  aboutBio: "I am an Information Technology student at Politeknik Negeri Madiun with experience in Laravel, PHP, JavaScript, React, Kotlin, Python, as well as interests in IoT and cybersecurity. I aim to become a skilled full-stack developer and software engineer while deepening my knowledge of networking, IoT, and secure system design. Through various projects, I've integrated Laravel with React and JavaScript, explored mobile app development with Kotlin, and built IoT-based solutions. My passion for technology drives me to keep learning and contribute to creating innovative and secure solutions.",
  profileImage: "/profile.jpg",
  cvUrl: "/CV_Adi_Alam_Sami_Aji_1.pdf",
  githubUrl: "https://github.com/adialam345",
  linkedinUrl: "https://www.linkedin.com/in/adi-alam-sami-aji-a62234334/",
  instagramUrl: "https://www.instagram.com/kidiepie_/",
  email: "adialam347@gmail.com"
};
const PROJECTS_KEY = "portfolio_projects_data_v1";
const PROFILE_KEY = "portfolio_profile_data_v1";
function getStoredProjects() {
  if (typeof window === "undefined") return projects;
  try {
    const data = localStorage.getItem(PROJECTS_KEY);
    return data ? JSON.parse(data) : projects;
  } catch (e) {
    return projects;
  }
}
async function fetchProjectsFromApi() {
  try {
    const res = await fetch("/api/projects");
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        localStorage.setItem(PROJECTS_KEY, JSON.stringify(data));
        return data;
      }
    }
  } catch (err) {
    console.warn("Using local cache/defaults for projects:", err);
  }
  return getStoredProjects();
}
function getStoredProfile() {
  if (typeof window === "undefined") return initialProfileData;
  try {
    const data = localStorage.getItem(PROFILE_KEY);
    return data ? JSON.parse(data) : initialProfileData;
  } catch (e) {
    return initialProfileData;
  }
}
async function fetchProfileFromApi() {
  try {
    const res = await fetch("/api/profile");
    if (res.ok) {
      const data = await res.json();
      if (data && data.role2) {
        localStorage.setItem(PROFILE_KEY, JSON.stringify(data));
        return data;
      }
    }
  } catch (err) {
    console.warn("Using local cache/defaults for profile:", err);
  }
  return getStoredProfile();
}
function usePortfolioData() {
  const [projectsList, setProjectsList] = useState(projects);
  const [profile, setProfile] = useState(initialProfileData);
  const refreshData = async () => {
    setProjectsList(getStoredProjects());
    setProfile(getStoredProfile());
    const freshProjects = await fetchProjectsFromApi();
    setProjectsList(freshProjects);
    const freshProfile = await fetchProfileFromApi();
    setProfile(freshProfile);
  };
  useEffect(() => {
    refreshData();
    const handleUpdate = () => refreshData();
    window.addEventListener("portfolio-data-updated", handleUpdate);
    return () => window.removeEventListener("portfolio-data-updated", handleUpdate);
  }, []);
  return { projectsList, profile };
}

function Hero() {
  const { profile } = usePortfolioData();
  return /* @__PURE__ */ jsx(WavyBackground, { id: "home", children: /* @__PURE__ */ jsx("div", { className: "flex min-h-screen justify-center items-center relative px-4 sm:px-6 text-center", children: /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.8 },
      className: "max-w-4xl mx-auto text-center",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "text-2xl sm:text-3xl md:text-6xl lg:text-7xl font-bold leading-tight", children: [
          /* @__PURE__ */ jsxs("div", { className: "text-white flex flex-col sm:flex-row gap-2 sm:gap-5 justify-center", children: [
            /* @__PURE__ */ jsx(
              GradualSpacing,
              {
                className: "font-display italic font-light -tracking-widesttext-white before:md:leading-[5rem]",
                text: profile.role1 || "I'm a"
              }
            ),
            /* @__PURE__ */ jsx(
              GradualSpacing,
              {
                className: "font-display block font-bold md:inline -tracking-widesttext-white before:md:leading-[5rem]",
                text: profile.role2 || "FULL-STACK"
              }
            ),
            " "
          ] }),
          /* @__PURE__ */ jsx(
            GradualSpacing,
            {
              className: "font-display block font-bold -tracking-widesttext-white before:md:leading-[5rem]",
              text: profile.role3 || "DEVELOPER & SOFTWARE ENGINEER"
            }
          )
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-6 text-sm sm:text-base md:text-xl text-gray-300 max-w-2xl mx-auto px-4 leading-relaxed", children: profile.heroBio }),
        /* @__PURE__ */ jsxs("div", { className: "mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 px-4", children: [
          /* @__PURE__ */ jsx("a", { href: "#about", children: /* @__PURE__ */ jsx(
            motion.button,
            {
              whileHover: { scale: 1.05 },
              whileTap: { scale: 0.95 },
              className: "bg-white text-black hover:bg-neutral-200 px-6 sm:px-8 py-3 rounded-full font-medium text-sm sm:text-base transition-colors",
              children: "Know more"
            }
          ) }),
          /* @__PURE__ */ jsx("a", { href: "#contact", children: /* @__PURE__ */ jsx(
            motion.button,
            {
              whileHover: { scale: 1.05 },
              whileTap: { scale: 0.95 },
              className: "border border-white hover:bg-white/10 text-white px-6 sm:px-8 py-3 rounded-full font-medium text-sm sm:text-base transition-colors",
              children: "Contact"
            }
          ) }),
          /* @__PURE__ */ jsx("a", { href: profile.cvUrl || "/CV_Adi_Alam_Sami_Aji_1.pdf", download: "CV_Adi_Alam_Sami_Aji.pdf", children: /* @__PURE__ */ jsxs(
            motion.button,
            {
              whileHover: { scale: 1.05 },
              whileTap: { scale: 0.95 },
              className: "border border-white hover:bg-white/10 text-white px-6 sm:px-8 py-3 rounded-full font-medium text-sm sm:text-base transition-colors flex items-center gap-2",
              children: [
                /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", className: "w-4 h-4", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
                  /* @__PURE__ */ jsx("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
                  /* @__PURE__ */ jsx("polyline", { points: "7 10 12 15 17 10" }),
                  /* @__PURE__ */ jsx("line", { x1: "12", y1: "15", x2: "12", y2: "3" })
                ] }),
                "Download CV"
              ]
            }
          ) })
        ] })
      ]
    }
  ) }) });
}

function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      ...props,
      className: cn(
        "group flex overflow-hidden p-2 [--duration:40s] [--gap:5px] [gap:var(--gap)]",
        {
          "flex-row": !vertical,
          "flex-col": vertical
        },
        className
      ),
      children: Array(repeat).fill(0).map((_, i) => /* @__PURE__ */ jsx(
        "div",
        {
          className: cn("flex shrink-0 justify-around [gap:var(--gap)]", {
            "animate-marquee flex-row": !vertical,
            "animate-marquee-vertical flex-col": vertical,
            "group-hover:[animation-play-state:paused]": pauseOnHover,
            "[animation-direction:reverse]": reverse
          }),
          children
        },
        i
      ))
    }
  );
}

const TooltipProvider = TooltipPrimitive.Provider;
const Tooltip = TooltipPrimitive.Root;
const TooltipTrigger = TooltipPrimitive.Trigger;
const TooltipContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(
  TooltipPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

const techStack = [
  {
    name: "JavaScript",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png"
  },
  {
    name: "React",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
  },
  {
    name: "Node.js",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg"
  },
  {
    name: "Tailwind CSS",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg"
  },
  {
    name: "Laravel",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Laravel.svg"
  },
  {
    name: "Kotlin",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/74/Kotlin_Icon.png"
  },
  {
    name: "Python",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.freebiesupply.com%2Flogos%2Flarge%2F2x%2Fpython-5-logo-png-transparent.png&f=1&nofb=1&ipt=b3a2c04645c1e1e1dad1c914350563945745ff96c83ccae27a86b9dac37e7b16&ipo=images"
  },
  {
    name: "Botstrap",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fuxwing.com%2Fwp-content%2Fthemes%2Fuxwing%2Fdownload%2Fbrands-and-social-media%2Fbootstrap-5-logo-icon.png&f=1&nofb=1&ipt=a6f29b7a2a68329ff06ae29b8db349ba53f8dc04dbfcccee0ec27da5253a57b8&ipo=images"
  },
  {
    name: "C++",
    image: "https://upload.wikimedia.org/wikipedia/commons/1/18/ISO_C%2B%2B_Logo.svg"
  },
  {
    name: "Java",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fbrandlogos.net%2Fwp-content%2Fuploads%2F2021%2F11%2Fjava-logo.png&f=1&nofb=1&ipt=61ef57427665cc668e60c3425e84c5790b7b7b9b90aeebf459771f53f78cb39d&ipo=images"
  },
  {
    name: "",
    image: ""
  }
];
const firstRow = techStack.slice(0, techStack.length - 1);
const ReviewCard = ({
  image,
  name
}) => {
  return /* @__PURE__ */ jsx(
    "figure",
    {
      className: cn(
        "relative w-40 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      ),
      children: /* @__PURE__ */ jsx("div", { className: "flex flex-col justify-center items-center", children: /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsxs(Tooltip, { children: [
        /* @__PURE__ */ jsx(TooltipTrigger, { children: /* @__PURE__ */ jsx("img", { className: "rounded w-16 grayscale brightness-100", alt: name, src: image, loading: "lazy", decoding: "async" }) }),
        /* @__PURE__ */ jsx(TooltipContent, { children: name })
      ] }) }) })
    }
  );
};
function MarqueeDemo() {
  return /* @__PURE__ */ jsxs("div", { className: "relative mt-10 flex h-[300px] border-0 w-full flex-col items-center justify-center overflow-hidden rounded-lg ", children: [
    /* @__PURE__ */ jsx(Marquee, { pauseOnHover: true, className: "[--duration:20s]", children: firstRow.map((review) => /* @__PURE__ */ jsx(ReviewCard, { ...review }, review.name)) }),
    /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-black dark:from-background" }),
    /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-black dark:from-background" })
  ] });
}

function FadeText({
  direction = "up",
  className,
  framerProps = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { type: "spring" } }
  },
  text
}) {
  const directionOffset = useMemo(() => {
    const map = { up: 10, down: -10, left: -10, right: 10 };
    return map[direction];
  }, [direction]);
  const axis = direction === "up" || direction === "down" ? "y" : "x";
  const FADE_ANIMATION_VARIANTS = useMemo(() => {
    const { hidden, show, ...rest } = framerProps;
    return {
      ...rest,
      hidden: {
        ...hidden ?? {},
        opacity: hidden?.opacity ?? 0,
        [axis]: hidden?.[axis] ?? directionOffset
      },
      show: {
        ...show ?? {},
        opacity: show?.opacity ?? 1,
        [axis]: show?.[axis] ?? 0
      }
    };
  }, [directionOffset, axis, framerProps]);
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      initial: "hidden",
      animate: "show",
      viewport: { once: true },
      variants: FADE_ANIMATION_VARIANTS,
      children: /* @__PURE__ */ jsx(motion.span, { className, children: text })
    }
  );
}

function About() {
  const { profile } = usePortfolioData();
  return /* @__PURE__ */ jsxs("section", { id: "about", className: "min-h-screen py-20 px-4 sm:px-6", children: [
    /* @__PURE__ */ jsx("div", { className: "max-w-6xl mx-auto", children: /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        className: "grid md:grid-cols-2 gap-8 md:gap-12 items-center",
        children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("h2", { className: "text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-light italic mb-6", children: [
              /* @__PURE__ */ jsx(
                FadeText,
                {
                  className: "text-white",
                  direction: "up",
                  framerProps: {
                    show: { transition: { delay: 0.5 } }
                  },
                  text: profile.aboutHeadline1 || "where"
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "block font-bold not-italic", children: /* @__PURE__ */ jsx(
                FadeText,
                {
                  className: "text-white",
                  direction: "right",
                  framerProps: {
                    show: { transition: { delay: 0.8 } }
                  },
                  text: profile.aboutHeadline2 || "EXPERIENCE BUILDS CHARACTER"
                }
              ) })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm sm:text-base md:text-lg mb-8 leading-relaxed", children: profile.aboutBio })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "relative", children: /* @__PURE__ */ jsx(
            motion.div,
            {
              initial: { opacity: 0, scale: 0.8 },
              whileInView: { opacity: 1, scale: 1 },
              viewport: { once: true },
              className: "aspect-square bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden shadow-2xl",
              children: /* @__PURE__ */ jsx(
                "img",
                {
                  src: profile.profileImage || "/profile.jpg",
                  alt: "Profile photo",
                  loading: "lazy",
                  decoding: "async",
                  className: "w-full h-full object-cover rounded-2xl"
                }
              )
            }
          ) })
        ]
      }
    ) }),
    /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        children: /* @__PURE__ */ jsx(MarqueeDemo, {})
      }
    )
  ] });
}

function Projects() {
  const { projectsList } = usePortfolioData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const mainPageProjects = projectsList.slice(0, 6);
  return /* @__PURE__ */ jsxs("section", { id: "work", className: "min-h-screen py-20 px-4 sm:px-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-end justify-between mb-8 md:mb-12 gap-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(
            motion.h2,
            {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              className: "text-3xl sm:text-4xl md:text-5xl font-bold",
              children: "All Projects"
            }
          ),
          /* @__PURE__ */ jsx(
            motion.p,
            {
              initial: { opacity: 0, y: 10 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              className: "text-neutral-400 text-sm mt-2",
              children: "Kumpulan karya & proyek pengembangan perangkat lunak"
            }
          )
        ] }),
        projectsList.length > 6 && /* @__PURE__ */ jsxs(
          motion.button,
          {
            initial: { opacity: 0 },
            whileInView: { opacity: 1 },
            viewport: { once: true },
            whileHover: { scale: 1.03 },
            whileTap: { scale: 0.97 },
            onClick: () => setIsModalOpen(true),
            className: "flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/15 px-5 py-3 rounded-xl text-xs font-semibold text-white transition-all shadow-lg backdrop-blur-md",
            children: [
              /* @__PURE__ */ jsx(Layers, { className: "w-4 h-4 text-purple-400" }),
              /* @__PURE__ */ jsxs("span", { children: [
                "Lihat Semua (",
                projectsList.length,
                " Proyek)"
              ] })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6", children: mainPageProjects.map((project) => /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          className: "group relative flex flex-col justify-between bg-white/5 border border-white/10 rounded-2xl p-4 transition-all duration-300 hover:bg-white/[0.08] hover:border-white/25",
          children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: "overflow-hidden rounded-xl h-[200px] mb-4 bg-neutral-950", children: /* @__PURE__ */ jsx(
                "img",
                {
                  src: project.image || "/ponpes.png",
                  alt: project.title,
                  loading: "lazy",
                  decoding: "async",
                  className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                }
              ) }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-3 gap-2", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold line-clamp-1", children: project.title }),
                project.link && /* @__PURE__ */ jsx("a", { href: project.link, target: "_blank", rel: "noopener noreferrer", title: "View Project", children: /* @__PURE__ */ jsx(
                  motion.button,
                  {
                    whileHover: { scale: 1.1 },
                    whileTap: { scale: 0.9 },
                    className: "p-2 rounded-full border border-white/20 hover:bg-white hover:text-black transition-colors",
                    children: /* @__PURE__ */ jsx(ArrowUpRight, { className: "w-4 h-4" })
                  }
                ) })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-3 text-sm leading-relaxed line-clamp-3", children: project.description })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex gap-2 flex-wrap mt-2", children: project.tags?.map((tag) => /* @__PURE__ */ jsx(
              "span",
              {
                className: "px-2 py-1 text-xs border border-white/20 rounded-full text-neutral-300 bg-white/5",
                children: tag
              },
              tag
            )) })
          ]
        },
        project.id
      )) })
    ] }),
    /* @__PURE__ */ jsx(AnimatePresence, { children: isModalOpen && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/85 backdrop-blur-md overflow-hidden", children: /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.95, y: 20 },
        animate: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.95, y: 20 },
        transition: { type: "spring", damping: 25, stiffness: 300 },
        className: "bg-neutral-900 border border-white/15 w-full max-w-6xl max-h-[85vh] rounded-3xl flex flex-col shadow-2xl overflow-hidden",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "p-6 border-b border-white/10 flex items-center justify-between bg-neutral-950/60", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-2xl font-bold text-white flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(Layers, { className: "w-6 h-6 text-purple-400" }),
                "All Projects (",
                projectsList.length,
                ")"
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-neutral-400 mt-1", children: "Seluruh proyek pengembangan aplikasi web, mobile, dan IoT." })
            ] }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setIsModalOpen(false),
                className: "p-2.5 rounded-full border border-white/15 text-neutral-400 hover:text-white hover:bg-white/10 transition-colors",
                children: /* @__PURE__ */ jsx(X, { className: "w-5 h-5" })
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "p-6 overflow-y-auto max-h-[65vh] space-y-6 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6", children: projectsList.map((project) => /* @__PURE__ */ jsxs(
            "div",
            {
              className: "group relative flex flex-col justify-between bg-white/5 border border-white/10 rounded-2xl p-4 transition-all duration-300 hover:bg-white/[0.08] hover:border-white/25",
              children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("div", { className: "overflow-hidden rounded-xl h-[200px] mb-4 bg-neutral-950", children: /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: project.image || "/ponpes.png",
                      alt: project.title,
                      loading: "lazy",
                      decoding: "async",
                      className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    }
                  ) }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-3 gap-2", children: [
                    /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold line-clamp-1", children: project.title }),
                    project.link && /* @__PURE__ */ jsx("a", { href: project.link, target: "_blank", rel: "noopener noreferrer", title: "View Project", children: /* @__PURE__ */ jsx(
                      motion.button,
                      {
                        whileHover: { scale: 1.1 },
                        whileTap: { scale: 0.9 },
                        className: "p-2 rounded-full border border-white/20 hover:bg-white hover:text-black transition-colors",
                        children: /* @__PURE__ */ jsx(ArrowUpRight, { className: "w-4 h-4" })
                      }
                    ) })
                  ] }),
                  /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-3 text-sm leading-relaxed", children: project.description })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "flex gap-2 flex-wrap mt-2", children: project.tags?.map((tag) => /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: "px-2 py-1 text-xs border border-white/20 rounded-full text-neutral-300 bg-white/5",
                    children: tag
                  },
                  tag
                )) })
              ]
            },
            project.id
          )) }) }),
          /* @__PURE__ */ jsxs("div", { className: "p-4 border-t border-white/10 bg-neutral-950/80 flex justify-between items-center text-xs text-neutral-400", children: [
            /* @__PURE__ */ jsxs("span", { children: [
              "Total ",
              projectsList.length,
              " Proyek"
            ] }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setIsModalOpen(false),
                className: "px-5 py-2.5 bg-white text-black font-semibold rounded-xl text-xs hover:bg-neutral-200 transition-colors",
                children: "Tutup Modal"
              }
            )
          ] })
        ]
      }
    ) }) })
  ] });
}

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx(
      Comp,
      {
        className: cn(buttonVariants({ variant, size, className })),
        ref,
        ...props
      }
    );
  }
);
Button.displayName = "Button";

const ConfettiContext = createContext({});
const ConfettiComponent = forwardRef((props, ref) => {
  const {
    options,
    globalOptions = { resize: true, useWorker: true },
    manualstart = false,
    children,
    ...rest
  } = props;
  const instanceRef = useRef(null);
  const canvasRef = useCallback(
    (node) => {
      if (node !== null) {
        if (instanceRef.current) return;
        instanceRef.current = confetti.create(node, {
          ...globalOptions,
          resize: true
        });
      } else {
        if (instanceRef.current) {
          instanceRef.current.reset();
          instanceRef.current = null;
        }
      }
    },
    [globalOptions]
  );
  const fire = useCallback(
    async (opts = {}) => {
      try {
        await instanceRef.current?.({ ...options, ...opts });
      } catch (error) {
        console.error("Confetti error:", error);
      }
    },
    [options]
  );
  const api = useMemo(
    () => ({
      fire
    }),
    [fire]
  );
  useImperativeHandle(ref, () => api, [api]);
  useEffect(() => {
    if (!manualstart) {
      (async () => {
        try {
          await fire();
        } catch (error) {
          console.error("Confetti effect error:", error);
        }
      })();
    }
  }, [manualstart, fire]);
  return /* @__PURE__ */ jsxs(ConfettiContext.Provider, { value: api, children: [
    /* @__PURE__ */ jsx("canvas", { ref: canvasRef, ...rest }),
    children
  ] });
});
ConfettiComponent.displayName = "Confetti";
const ConfettiButtonComponent = ({
  options,
  children,
  ...props
}) => {
  const handleClick = async (event) => {
    try {
      const rect = event.currentTarget.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      await confetti({
        ...options,
        origin: {
          x: x / window.innerWidth,
          y: y / window.innerHeight
        }
      });
    } catch (error) {
      console.error("Confetti button error:", error);
    }
  };
  return /* @__PURE__ */ jsx(Button, { onClick: handleClick, ...props, children });
};
ConfettiButtonComponent.displayName = "ConfettiButton";
const ConfettiButton = ConfettiButtonComponent;

function Contact() {
  const { profile } = usePortfolioData();
  return /* @__PURE__ */ jsx("section", { id: "contact", className: "min-h-[calc(100dvh-20rem)] py-20 px-4 sm:px-6", children: /* @__PURE__ */ jsx("div", { className: "max-w-6xl flex justify-center items-center mx-auto", children: /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      className: "text-center max-w-3xl mx-auto",
      children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-8", children: "Get in Touch" }),
        /* @__PURE__ */ jsx("p", { className: "text-base sm:text-lg md:text-xl text-gray-400 mb-12", children: "Have a project in mind? Let's work together to create something amazing." }),
        /* @__PURE__ */ jsx(ConfettiButton, { className: "bg-white text-black px-8 sm:px-14 py-6 sm:py-10 rounded-full font-medium text-base sm:text-lg mb-12", children: "Let's talk" }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-center gap-4 sm:gap-8", children: [
          profile.githubUrl && /* @__PURE__ */ jsx(
            motion.a,
            {
              href: profile.githubUrl,
              target: "_blank",
              rel: "noopener noreferrer",
              whileHover: { y: -5 },
              className: "p-3 sm:p-4 border border-white/20 rounded-full hover:border-white/40 transition-colors",
              title: "GitHub",
              children: /* @__PURE__ */ jsx(Github, { className: "w-6 h-6" })
            }
          ),
          profile.linkedinUrl && /* @__PURE__ */ jsx(
            motion.a,
            {
              href: profile.linkedinUrl,
              target: "_blank",
              rel: "noopener noreferrer",
              whileHover: { y: -5 },
              className: "p-3 sm:p-4 border border-white/20 rounded-full hover:border-white/40 transition-colors",
              title: "LinkedIn",
              children: /* @__PURE__ */ jsx(Linkedin, { className: "w-6 h-6" })
            }
          ),
          profile.instagramUrl && /* @__PURE__ */ jsx(
            motion.a,
            {
              href: profile.instagramUrl,
              target: "_blank",
              rel: "noopener noreferrer",
              whileHover: { y: -5 },
              className: "p-3 sm:p-4 border border-white/20 rounded-full hover:border-white/40 transition-colors",
              title: "Instagram",
              children: /* @__PURE__ */ jsx(Instagram, { className: "w-6 h-6" })
            }
          ),
          profile.email && /* @__PURE__ */ jsx(
            motion.a,
            {
              href: `mailto:${profile.email}`,
              whileHover: { y: -5 },
              className: "p-3 sm:p-4 border border-white/20 rounded-full hover:border-white/40 transition-colors",
              title: "Email",
              children: /* @__PURE__ */ jsx(Mail, { className: "w-6 h-6" })
            }
          )
        ] })
      ]
    }
  ) }) });
}

function Footer() {
  const [currentYear, setCurrentYear] = useState("");
  useEffect(() => {
    setCurrentYear((/* @__PURE__ */ new Date()).getFullYear().toString());
  }, []);
  return /* @__PURE__ */ jsx("footer", { className: "py-8 px-6 border-t border-white/10", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-sm text-gray-400", children: [
      "© ",
      currentYear,
      " Adi Alam Sami Aji. All rights reserved."
    ] }),
    /* @__PURE__ */ jsxs("nav", { className: "flex gap-6 text-sm text-gray-400", children: [
      /* @__PURE__ */ jsx("a", { href: "#", className: "hover:text-white transition-colors", children: "Privacy Policy" }),
      /* @__PURE__ */ jsx("a", { href: "#", className: "hover:text-white transition-colors", children: "Terms & Conditions" }),
      /* @__PURE__ */ jsx("a", { href: "#", className: "hover:text-white transition-colors", children: "Cookies Policy" })
    ] })
  ] }) });
}

const DEFAULT_SIZE = 40;
const DEFAULT_MAGNIFICATION = 60;
const DEFAULT_DISTANCE = 140;
const dockVariants = cva(
  "supports-backdrop-blur:bg-white/10 supports-backdrop-blur:dark:bg-black/10 mx-auto mt-8 flex h-[58px] w-max items-center justify-center gap-2 rounded-2xl border p-2 backdrop-blur-md"
);
const Dock = React__default.forwardRef(
  ({
    className,
    children,
    iconSize = DEFAULT_SIZE,
    iconMagnification = DEFAULT_MAGNIFICATION,
    iconDistance = DEFAULT_DISTANCE,
    direction = "middle",
    ...props
  }, ref) => {
    const mouseX = useMotionValue(Infinity);
    const renderChildren = () => {
      return React__default.Children.map(children, (child) => {
        if (React__default.isValidElement(child) && child.type === DockIcon) {
          return React__default.cloneElement(child, {
            ...child.props,
            mouseX,
            size: iconSize,
            magnification: iconMagnification,
            distance: iconDistance
          });
        }
        return child;
      });
    };
    return /* @__PURE__ */ jsx(
      motion.div,
      {
        ref,
        onMouseMove: (e) => mouseX.set(e.pageX),
        onMouseLeave: () => mouseX.set(Infinity),
        ...props,
        className: cn$1(dockVariants({ className }), {
          "items-start": direction === "top",
          "items-center": direction === "middle",
          "items-end": direction === "bottom"
        }),
        children: renderChildren()
      }
    );
  }
);
Dock.displayName = "Dock";
const DockIcon = ({
  size = DEFAULT_SIZE,
  magnification = DEFAULT_MAGNIFICATION,
  distance = DEFAULT_DISTANCE,
  mouseX,
  className,
  children,
  ...props
}) => {
  const ref = useRef(null);
  const padding = Math.max(6, size * 0.2);
  const defaultMouseX = useMotionValue(Infinity);
  const distanceCalc = useTransform(mouseX ?? defaultMouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });
  const sizeTransform = useTransform(
    distanceCalc,
    [-distance, 0, distance],
    [size, magnification, size]
  );
  const scaleSize = useSpring(sizeTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12
  });
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      ref,
      style: { width: scaleSize, height: scaleSize, padding },
      className: cn$1(
        "flex aspect-square cursor-pointer items-center justify-center rounded-full",
        className
      ),
      ...props,
      children
    }
  );
};
DockIcon.displayName = "DockIcon";

function DockDemo() {
  return /* @__PURE__ */ jsx("div", { className: "fixed bottom-3 sm:bottom-5 left-0 right-0 z-50 px-4 sm:px-0", children: /* @__PURE__ */ jsxs(Dock, { iconMagnification: 60, iconDistance: 80, children: [
    /* @__PURE__ */ jsx(DockIcon, { className: "bg-black/10  dark:bg-white/10", children: /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsxs(Tooltip, { children: [
      /* @__PURE__ */ jsx(TooltipTrigger, { children: /* @__PURE__ */ jsx("a", { href: "#home", children: /* @__PURE__ */ jsx(Icons.gitHub, { className: "size-full" }) }) }),
      /* @__PURE__ */ jsx(TooltipContent, { children: "HOME" })
    ] }) }) }),
    /* @__PURE__ */ jsx(DockIcon, { className: "bg-black/10 dark:bg-white/10", children: /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsxs(Tooltip, { children: [
      /* @__PURE__ */ jsx(TooltipTrigger, { children: /* @__PURE__ */ jsx("a", { href: "#about", children: /* @__PURE__ */ jsx(Icons.notion, { className: "size-full" }) }) }),
      /* @__PURE__ */ jsx(TooltipContent, { children: "ABOUT" })
    ] }) }) }),
    /* @__PURE__ */ jsx(DockIcon, { className: "bg-black/10 dark:bg-white/10", children: /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsxs(Tooltip, { children: [
      /* @__PURE__ */ jsx(TooltipTrigger, { children: /* @__PURE__ */ jsx("a", { href: "#work", children: /* @__PURE__ */ jsx(Icons.googleDrive, { className: "size-full" }) }) }),
      /* @__PURE__ */ jsx(TooltipContent, { children: "PROJECT" })
    ] }) }) }),
    /* @__PURE__ */ jsx(DockIcon, { className: "bg-black/10 dark:bg-white/10", children: /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsxs(Tooltip, { children: [
      /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsx("a", { href: "#contact", children: /* @__PURE__ */ jsx(Icons.whatsapp, { className: "size-full" }) }) }),
      /* @__PURE__ */ jsx(TooltipContent, { children: "CONTACT" })
    ] }) }) }),
    /* @__PURE__ */ jsx(DockIcon, { className: "bg-black/10 dark:bg-white/10", children: /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsxs(Tooltip, { children: [
      /* @__PURE__ */ jsx(TooltipTrigger, { children: /* @__PURE__ */ jsx("a", { href: "/CV_Adi_Alam_Sami_Aji_1.pdf", download: "CV_Adi_Alam_Sami_Aji.pdf", children: /* @__PURE__ */ jsx(Icons.download, { className: "size-full" }) }) }),
      /* @__PURE__ */ jsx(TooltipContent, { children: "DOWNLOAD CV" })
    ] }) }) })
  ] }) });
}
const Icons = {
  gitHub: (props) => /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", id: "Layer_1", "data-name": "Layer 1", viewBox: "0 0 24 24", width: "512", height: "512", ...props, children: /* @__PURE__ */ jsx("path", { fill: "#fff", d: "M22,5.724V2c0-.552-.447-1-1-1s-1,.448-1,1v2.366L14.797,.855c-1.699-1.146-3.895-1.146-5.594,0L2.203,5.579c-1.379,.931-2.203,2.48-2.203,4.145v9.276c0,2.757,2.243,5,5,5h2c.553,0,1-.448,1-1V14c0-.551,.448-1,1-1h6c.552,0,1,.449,1,1v9c0,.552,.447,1,1,1h2c2.757,0,5-2.243,5-5V9.724c0-1.581-.744-3.058-2-4Z" }) }),
  notion: (props) => /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", id: "Layer_1", "data-name": "Layer 1", viewBox: "0 0 24 24", ...props, children: [
    /* @__PURE__ */ jsx("path", { fill: "#fff", d: "M12.006,12.309c3.611-.021,5.555-1.971,5.622-5.671-.062-3.56-2.111-5.614-5.634-5.637-3.561,.022-5.622,2.122-5.622,5.672s2.062,5.615,5.634,5.636Z" }),
    /* @__PURE__ */ jsx("path", { fill: "#fff", d: "M11.994,13.661c-5.328,.034-8.195,2.911-8.291,8.322-.004,.268,.099,.527,.287,.718s.445,.299,.713,.299h14.595c.268,0,.525-.108,.713-.299,.188-.191,.291-.45,.287-.718-.092-5.333-3.036-8.288-8.304-8.322Z" })
  ] }),
  googleDrive: (props) => /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", id: "Layer_1", "data-name": "Layer 1", viewBox: "0 0 24 24", ...props, children: /* @__PURE__ */ jsx("path", { fill: "#fff", d: "M23.899,6H0v-1C0,2.243,2.243,0,5,0h2.528c.463,0,.927,.109,1.341,.316l3.156,1.578c.138,.069,.293,.105,.447,.105h6.528c2.414,0,4.434,1.721,4.899,4Zm-.778,14.928c-1.157,1.916-3.25,3.196-5.484,3.063-3.145-.188-5.637-2.797-5.637-5.989,0-1.139,.882-3.11,1.465-4.139,.32-.566,.812-.498,1.062,.103,.208,.501,.428,2.035,1.104,2.035,1.82,0,1.433-3.302,2.37-5.492,.234-.548,.637-.61,1.083-.215,2.6,2.303,6.736,6.168,4.038,10.636Zm-3.794-2.43l-.769-1.097c-.308-.308-.807-.308-1.115,0l-.77,1.096c-.754,.754-.889,1.99-.195,2.8,.802,.937,2.242,.937,3.044,0,.693-.809,.559-2.046-.195-2.8ZM0,17c0,2.757,2.243,5,5,5h6.083c-.684-1.181-1.083-2.545-1.083-3.999,0-2.019,1.548-4.812,1.724-5.124,.528-.935,1.429-1.456,2.399-1.399,.513,.031,.987,.22,1.383,.537,.147-.749,.334-1.544,.655-2.293,.498-1.163,1.374-1.503,1.847-1.623,.183-.046,.375-.088,.585-.099H0v9ZM18.77,8c.423,.023,.934,.204,1.638,.794h0c.951,.844,2.401,2.138,3.591,3.758v-4.552h-5.23Z" }) }),
  whatsapp: (props) => /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", id: "Layer_1", "data-name": "Layer 1", viewBox: "0 0 24 24", ...props, children: /* @__PURE__ */ jsx("path", { fill: "#fff", d: "M22.246,7.479c-.898-2.647-3.028-4.758-5.695-5.645-2.984-.992-6.109-.992-9.094,0-2.671,.888-4.801,3-5.697,5.647-1.016,2.998-1.016,6.038,0,9.036,.897,2.649,3.027,4.761,5.697,5.648,1.492,.496,3.022,.748,4.547,.748s3.054-.251,4.545-.747c.786-.261,1.212-1.11,.951-1.896-.263-.785-1.112-1.213-1.896-.95-2.374,.789-4.829,.787-7.201,0-1.783-.593-3.204-2-3.801-3.764-.799-2.359-.799-4.751,0-7.111,.597-1.763,2.018-3.17,3.802-3.763,2.372-.788,4.829-.789,7.2,0,1.782,.593,3.203,1.999,3.802,3.762,.687,2.026,.778,4.092,.274,6.146-.175,.201-.43,.317-.707,.317-.46,0-.844-.329-.916-.759,.411-1.726,.326-3.466-.257-5.187-.433-1.275-1.458-2.292-2.741-2.719-2.026-.674-4.083-.674-6.11,0-1.285,.427-2.31,1.443-2.742,2.72-.683,2.017-.683,4.062,0,6.078,.432,1.276,1.457,2.293,2.742,2.72,1.013,.337,2.034,.505,3.055,.505s2.042-.168,3.055-.505c.508-.169,.976-.431,1.383-.765,.679,.57,1.561,.912,2.531,.912,1.381,0,2.676-.734,3.381-1.915,.07-.118,.125-.246,.16-.379,.729-2.716,.64-5.452-.268-8.132Zm-7.288,6.597c-.132,.391-.449,.704-.847,.836-1.418,.471-2.797,.472-4.216,0-.397-.132-.714-.444-.846-.835-.474-1.398-.474-2.756,0-4.154,.132-.391,.449-.703,.846-.835,.709-.236,1.409-.354,2.108-.354s1.399,.118,2.108,.354c.397,.132,.715,.445,.847,.835,.473,1.397,.473,2.757,0,4.153Z" }) }),
  download: (props) => /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", id: "Layer_1", "data-name": "Layer 1", viewBox: "0 0 24 24", ...props, children: /* @__PURE__ */ jsx("path", { fill: "#fff", d: "M14,0H5C2.239,0,0,2.239,0,5V19c0,2.761,2.239,5,5,5H19c2.761,0,5-2.239,5-5V10L14,0Zm-2,17c-.256,0-.512-.098-.707-.293l-3.5-3.5c-.391-.391-.391-1.023,0-1.414s1.023-.391,1.414,0l1.793,1.793V8c0-.552,.448-1,1-1s1,.448,1,1v5.586l1.793-1.793c.391-.391,1.023-.391,1.414,0s.391,1.023,0,1.414l-3.5,3.5c-.195,.195-.451,.293-.707,.293ZM14,8V2.5L19.5,8H14Z" }) })
};

function Safari({
  imageSrc,
  videoSrc,
  url,
  width = 1203,
  height = 753,
  ...props
}) {
  const imageSrcUrl = typeof imageSrc === "string" ? imageSrc : imageSrc?.src;
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      width,
      height,
      viewBox: `0 0 ${width} ${height}`,
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      ...props,
      children: [
        /* @__PURE__ */ jsxs("g", { clipPath: "url(#path0)", children: [
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M0 52H1202V741C1202 747.627 1196.63 753 1190 753H12C5.37258 753 0 747.627 0 741V52Z",
              className: "fill-[#404040]"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              fillRule: "evenodd",
              clipRule: "evenodd",
              d: "M0 12C0 5.37258 5.37258 0 12 0H1190C1196.63 0 1202 5.37258 1202 12V52H0L0 12Z",
              className: "fill-[#404040]"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              fillRule: "evenodd",
              clipRule: "evenodd",
              d: "M1.06738 12C1.06738 5.92487 5.99225 1 12.0674 1H1189.93C1196.01 1 1200.93 5.92487 1200.93 12V51H1.06738V12Z",
              className: "fill-[#262626]"
            }
          ),
          /* @__PURE__ */ jsx(
            "circle",
            {
              cx: "27",
              cy: "25",
              r: "6",
              className: "fill-[#404040]"
            }
          ),
          /* @__PURE__ */ jsx(
            "circle",
            {
              cx: "47",
              cy: "25",
              r: "6",
              className: "fill-[#404040]"
            }
          ),
          /* @__PURE__ */ jsx(
            "circle",
            {
              cx: "67",
              cy: "25",
              r: "6",
              className: "fill-[#404040]"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M286 17C286 13.6863 288.686 11 292 11H946C949.314 11 952 13.6863 952 17V35C952 38.3137 949.314 41 946 41H292C288.686 41 286 38.3137 286 35V17Z",
              className: "fill-[#404040]"
            }
          ),
          /* @__PURE__ */ jsx("g", { className: "mix-blend-luminosity", children: /* @__PURE__ */ jsx(
            "path",
            {
              d: "M566.269 32.0852H572.426C573.277 32.0852 573.696 31.6663 573.696 30.7395V25.9851C573.696 25.1472 573.353 24.7219 572.642 24.6521V23.0842C572.642 20.6721 571.036 19.5105 569.348 19.5105C567.659 19.5105 566.053 20.6721 566.053 23.0842V24.6711C565.393 24.7727 565 25.1917 565 25.9851V30.7395C565 31.6663 565.418 32.0852 566.269 32.0852ZM567.272 22.97C567.272 21.491 568.211 20.6785 569.348 20.6785C570.478 20.6785 571.423 21.491 571.423 22.97V24.6394L567.272 24.6458V22.97Z",
              fill: "#A3A3A3"
            }
          ) }),
          /* @__PURE__ */ jsx("g", { className: "mix-blend-luminosity", children: /* @__PURE__ */ jsx(
            "text",
            {
              x: "580",
              y: "30",
              fill: "#A3A3A3",
              fontSize: "12",
              fontFamily: "Arial, sans-serif",
              children: url
            }
          ) }),
          /* @__PURE__ */ jsx("g", { className: "mix-blend-luminosity", children: /* @__PURE__ */ jsx(
            "path",
            {
              d: "M265.5 33.8984C265.641 33.8984 265.852 33.8516 266.047 33.7422C270.547 31.2969 272.109 30.1641 272.109 27.3203V21.4219C272.109 20.4844 271.742 20.1484 270.961 19.8125C270.094 19.4453 267.18 18.4297 266.328 18.1406C266.07 18.0547 265.766 18 265.5 18C265.234 18 264.93 18.0703 264.672 18.1406C263.82 18.3828 260.906 19.4531 260.039 19.8125C259.258 20.1406 258.891 20.4844 258.891 21.4219V27.3203C258.891 30.1641 260.461 31.2812 264.945 33.7422C265.148 33.8516 265.359 33.8984 265.5 33.8984ZM265.922 19.5781C266.945 19.9766 269.172 20.7656 270.344 21.1875C270.562 21.2656 270.617 21.3828 270.617 21.6641V27.0234C270.617 29.3125 269.469 29.9375 265.945 32.0625C265.727 32.1875 265.617 32.2344 265.508 32.2344V19.4844C265.617 19.4844 265.734 19.5156 265.922 19.5781Z",
              fill: "#A3A3A3"
            }
          ) }),
          /* @__PURE__ */ jsx("g", { className: "mix-blend-luminosity", children: /* @__PURE__ */ jsx(
            "path",
            {
              d: "M936.273 24.9766C936.5 24.9766 936.68 24.9062 936.82 24.7578L940.023 21.5312C940.195 21.3594 940.273 21.1719 940.273 20.9531C940.273 20.7422 940.188 20.5391 940.023 20.3828L936.82 17.125C936.68 16.9688 936.5 16.8906 936.273 16.8906C935.852 16.8906 935.516 17.2422 935.516 17.6719C935.516 17.8828 935.594 18.0547 935.727 18.2031L937.594 20.0312C937.227 19.9766 936.852 19.9453 936.477 19.9453C932.609 19.9453 929.516 23.0391 929.516 26.9141C929.516 30.7891 932.633 33.9062 936.5 33.9062C940.375 33.9062 943.484 30.7891 943.484 26.9141C943.484 26.4453 943.156 26.1094 942.688 26.1094C942.234 26.1094 941.93 26.4453 941.93 26.9141C941.93 29.9297 939.516 32.3516 936.5 32.3516C933.492 32.3516 931.07 29.9297 931.07 26.9141C931.07 23.875 933.469 21.4688 936.477 21.4688C936.984 21.4688 937.453 21.5078 937.867 21.5781L935.734 23.6875C935.594 23.8281 935.516 24 935.516 24.2109C935.516 24.6406 935.852 24.9766 936.273 24.9766Z",
              fill: "#A3A3A3"
            }
          ) }),
          /* @__PURE__ */ jsx("g", { className: "mix-blend-luminosity", children: /* @__PURE__ */ jsx(
            "path",
            {
              d: "M1134 33.0156C1134.49 33.0156 1134.89 32.6094 1134.89 32.1484V27.2578H1139.66C1140.13 27.2578 1140.54 26.8594 1140.54 26.3672C1140.54 25.8828 1140.13 25.4766 1139.66 25.4766H1134.89V20.5859C1134.89 20.1172 1134.49 19.7188 1134 19.7188C1133.52 19.7188 1133.11 20.1172 1133.11 20.5859V25.4766H1128.34C1127.88 25.4766 1127.46 25.8828 1127.46 26.3672C1127.46 26.8594 1127.88 27.2578 1128.34 27.2578H1133.11V32.1484C1133.11 32.6094 1133.52 33.0156 1134 33.0156Z",
              fill: "#A3A3A3"
            }
          ) }),
          /* @__PURE__ */ jsx("g", { className: "mix-blend-luminosity", children: /* @__PURE__ */ jsx(
            "path",
            {
              d: "M1161.8 31.0703H1163.23V32.375C1163.23 34.0547 1164.12 34.9219 1165.81 34.9219H1174.2C1175.89 34.9219 1176.77 34.0547 1176.77 32.3828V24.0469C1176.77 22.375 1175.89 21.5 1174.2 21.5H1172.77V20.2578C1172.77 18.5859 1171.88 17.7109 1170.19 17.7109H1161.8C1160.1 17.7109 1159.23 18.5781 1159.23 20.2578V28.5234C1159.23 30.1953 1160.1 31.0703 1161.8 31.0703ZM1161.9 29.5078C1161.18 29.5078 1160.78 29.1328 1160.78 28.3828V20.3984C1160.78 19.6406 1161.18 19.2656 1161.9 19.2656H1170.09C1170.8 19.2656 1171.2 19.6406 1171.2 20.3984V21.5H1165.81C1164.12 21.5 1163.23 22.375 1163.23 24.0469V29.5078H1161.9ZM1165.91 33.3672C1165.19 33.3672 1164.8 32.9922 1164.8 32.2422V24.1875C1164.8 23.4297 1165.19 23.0625 1165.91 23.0625H1174.1C1174.81 23.0625 1175.21 23.4297 1175.21 24.1875V32.2422C1175.21 32.9922 1174.81 33.3672 1174.1 33.3672H1165.91Z",
              fill: "#A3A3A3"
            }
          ) }),
          /* @__PURE__ */ jsx("g", { className: "mix-blend-luminosity", children: /* @__PURE__ */ jsx(
            "path",
            {
              d: "M1099.51 28.4141C1099.91 28.4141 1100.24 28.0859 1100.24 27.6953V19.8359L1100.18 18.6797L1100.66 19.25L1101.75 20.4141C1101.88 20.5547 1102.06 20.625 1102.24 20.625C1102.6 20.625 1102.9 20.3672 1102.9 20C1102.9 19.8047 1102.82 19.6641 1102.69 19.5312L1100.06 17.0078C1099.88 16.8203 1099.7 16.7578 1099.51 16.7578C1099.32 16.7578 1099.14 16.8203 1098.95 17.0078L1096.33 19.5312C1096.2 19.6641 1096.12 19.8047 1096.12 20C1096.12 20.3672 1096.41 20.625 1096.77 20.625C1096.95 20.625 1097.14 20.5547 1097.27 20.4141L1098.35 19.25L1098.84 18.6719L1098.78 19.8359V27.6953C1098.78 28.0859 1099.11 28.4141 1099.51 28.4141ZM1095 34.6562H1104C1105.7 34.6562 1106.57 33.7812 1106.57 32.1094V24.4297C1106.57 22.7578 1105.7 21.8828 1104 21.8828H1101.89V23.4375H1103.9C1104.61 23.4375 1105.02 23.8125 1105.02 24.5625V31.9688C1105.02 32.7188 1104.61 33.0938 1103.9 33.0938H1095.1C1094.38 33.0938 1093.98 32.7188 1093.98 31.9688V24.5625C1093.98 23.8125 1094.38 23.4375 1095.1 23.4375H1097.13V21.8828H1095C1093.31 21.8828 1092.43 22.75 1092.43 24.4297V32.1094C1092.43 33.7812 1093.31 34.6562 1095 34.6562Z",
              fill: "#A3A3A3"
            }
          ) }),
          /* @__PURE__ */ jsx("g", { className: "mix-blend-luminosity", children: /* @__PURE__ */ jsx(
            "path",
            {
              d: "M99.5703 33.6016H112.938C114.633 33.6016 115.516 32.7266 115.516 31.0547V21.5469C115.516 19.875 114.633 19 112.938 19H99.5703C97.8828 19 97 19.8672 97 21.5469V31.0547C97 32.7266 97.8828 33.6016 99.5703 33.6016ZM99.6719 32.0469C98.9531 32.0469 98.5547 31.6719 98.5547 30.9141V21.6875C98.5547 20.9297 98.9531 20.5547 99.6719 20.5547H103.234V32.0469H99.6719ZM112.836 20.5547C113.555 20.5547 113.953 20.9297 113.953 21.6875V30.9141C113.953 31.6719 113.555 32.0469 112.836 32.0469H104.711V20.5547H112.836ZM101.703 23.4141C101.984 23.4141 102.219 23.1719 102.219 22.9062C102.219 22.6406 101.984 22.4062 101.703 22.4062H100.102C99.8203 22.4062 99.5859 22.6406 99.5859 22.9062C99.5859 23.1719 99.8203 23.4141 100.102 23.4141H101.703ZM101.703 25.5156C101.984 25.5156 102.219 25.2812 102.219 25.0078C102.219 24.7422 101.984 24.5078 101.703 24.5078H100.102C99.8203 24.5078 99.5859 24.7422 99.5859 25.0078C99.5859 25.2812 99.8203 25.5156 100.102 25.5156H101.703ZM101.703 27.6094C101.984 27.6094 102.219 27.3828 102.219 27.1094C102.219 26.8438 101.984 26.6172 101.703 26.6172H100.102C99.8203 26.6172 99.5859 26.8438 99.5859 27.1094C99.5859 27.3828 99.8203 27.6094 100.102 27.6094H101.703Z",
              fill: "#A3A3A3"
            }
          ) }),
          /* @__PURE__ */ jsx("g", { className: "mix-blend-luminosity", children: /* @__PURE__ */ jsx(
            "path",
            {
              d: "M143.914 32.5938C144.094 32.7656 144.312 32.8594 144.562 32.8594C145.086 32.8594 145.492 32.4531 145.492 31.9375C145.492 31.6797 145.391 31.4453 145.211 31.2656L139.742 25.9219L145.211 20.5938C145.391 20.4141 145.492 20.1719 145.492 19.9219C145.492 19.4062 145.086 19 144.562 19C144.312 19 144.094 19.0938 143.922 19.2656L137.844 25.2031C137.625 25.4062 137.516 25.6562 137.516 25.9297C137.516 26.2031 137.625 26.4375 137.836 26.6484L143.914 32.5938Z",
              fill: "#A3A3A3"
            }
          ) }),
          /* @__PURE__ */ jsx("g", { className: "mix-blend-luminosity", children: /* @__PURE__ */ jsx(
            "path",
            {
              d: "M168.422 32.8594C168.68 32.8594 168.891 32.7656 169.07 32.5938L175.148 26.6562C175.359 26.4375 175.469 26.2109 175.469 25.9297C175.469 25.6562 175.367 25.4141 175.148 25.2109L169.07 19.2656C168.891 19.0938 168.68 19 168.422 19C167.898 19 167.492 19.4062 167.492 19.9219C167.492 20.1719 167.602 20.4141 167.773 20.5938L173.25 25.9375L167.773 31.2656C167.594 31.4531 167.492 31.6797 167.492 31.9375C167.492 32.4531 167.898 32.8594 168.422 32.8594Z",
              fill: "#A3A3A3"
            }
          ) }),
          imageSrc && /* @__PURE__ */ jsx(
            "foreignObject",
            {
              x: "1",
              y: "52",
              width: "1200",
              height: "700",
              preserveAspectRatio: "xMidYMid slice",
              clipPath: "url(#roundedBottom)",
              children: /* @__PURE__ */ jsx(
                "img",
                {
                  src: imageSrcUrl,
                  width: "1200",
                  height: "700",
                  loading: "lazy",
                  decoding: "async",
                  style: { width: "100%", height: "100%" },
                  alt: "image"
                }
              )
            }
          ),
          videoSrc && /* @__PURE__ */ jsx(
            "foreignObject",
            {
              x: "1",
              y: "52",
              width: "1200",
              height: "700",
              preserveAspectRatio: "xMidYMid slice",
              clipPath: "url(#roundedBottom)",
              children: /* @__PURE__ */ jsx(
                "video",
                {
                  className: "size-full overflow-hidden object-cover",
                  src: videoSrc,
                  autoPlay: true,
                  loop: true,
                  muted: true,
                  playsInline: true
                }
              )
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("defs", { children: [
          /* @__PURE__ */ jsx("clipPath", { id: "path0", children: /* @__PURE__ */ jsx("rect", { width, height, fill: "white" }) }),
          /* @__PURE__ */ jsx("clipPath", { id: "roundedBottom", children: /* @__PURE__ */ jsx(
            "path",
            {
              d: "M1 52H1201V741C1201 747.075 1196.08 752 1190 752H12C5.92486 752 1 747.075 1 741V52Z",
              fill: "white"
            }
          ) })
        ] })
      ]
    }
  );
}

function ShineBorder({
  borderRadius = 8,
  borderWidth = 1,
  duration = 14,
  color = "#000000",
  className,
  children
}) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      style: {
        "--border-radius": `${borderRadius}px`
      },
      className: cn(
        "relative min-h-[60px] w-fit min-w-[300px] place-items-center rounded-[--border-radius] bg-white p-3 text-black dark:bg-black dark:text-white",
        className
      ),
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            style: {
              "--border-width": `${borderWidth}px`,
              "--border-radius": `${borderRadius}px`,
              "--duration": `${duration}s`,
              "--mask-linear-gradient": `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
              "--background-radial-gradient": `radial-gradient(transparent,transparent, ${color instanceof Array ? color.join(",") : color},transparent,transparent)`
            },
            className: `pointer-events-none before:bg-shine-size before:absolute before:inset-0 before:size-full before:rounded-[--border-radius] before:p-[--border-width] before:will-change-[background-position] before:content-[""] before:![-webkit-mask-composite:xor] before:![mask-composite:exclude] before:[background-image:--background-radial-gradient] before:[background-size:300%_300%] before:[mask:--mask-linear-gradient] motion-safe:before:animate-shine`
          }
        ),
        children
      ]
    }
  );
}

function SafariDemo() {
  const { projectsList } = usePortfolioData();
  const featuredProject = projectsList.find((p) => p.isFeatured) || projectsList[0] || {
    title: "PONPES MIFTAHUL HUDA | WEBSITE",
    description: "Sebuah sistem informasi berbasis web menggunakan Laravel untuk manajemen lembaga pendidikan.",
    image: "/ponpes.png",
    link: "https://miftahulhudadoho.or.id/"
  };
  return /* @__PURE__ */ jsxs("div", { className: "w-full mb-5", children: [
    /* @__PURE__ */ jsx(
      motion.h2,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        className: "text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 flex justify-center items-center px-4",
        children: featuredProject.title || "Latest Projects"
      }
    ),
    /* @__PURE__ */ jsx(
      motion.p,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        className: "mt-6 text-sm sm:text-base md:text-lg lg:text-xl text-center text-gray-300 max-w-2xl mb-10 mx-auto px-4 leading-relaxed",
        children: featuredProject.description
      }
    ),
    /* @__PURE__ */ jsx(
      motion.div,
      {
        drag: true,
        dragTransition: { bounceStiffness: 100, bounceDamping: 10 },
        initial: { opacity: 0, y: 10 },
        whileInView: { opacity: 1, y: 0 },
        whileHover: {
          scale: 1.05,
          transition: { duration: 0.2 }
        },
        viewport: { once: true },
        className: "relative w-full flex items-center justify-center px-4 sm:px-8",
        children: /* @__PURE__ */ jsx(
          ShineBorder,
          {
            borderWidth: 3,
            className: "relative flex flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl w-full lg:w-3/5",
            color: ["#d9e9f6", "#2b6684", "#7caac2"],
            children: /* @__PURE__ */ jsx(
              Safari,
              {
                url: featuredProject.link || "https://miftahulhudadoho.or.id/",
                className: "w-full h-auto",
                imageSrc: featuredProject.image || "/ponpes.png"
              }
            )
          }
        )
      }
    )
  ] });
}

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Adi Alam | Portfolio", "description": "Personal portfolio website" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main> ${renderComponent($$result2, "ParticleBackground", ParticleBackground, { "client:idle": true, "client:component-hydration": "idle", "client:component-path": "F:/Portofolio-NextJS-Acernity/src/components/particles", "client:component-export": "ParticleBackground" })} ${renderComponent($$result2, "Nav", Nav, { "client:load": true, "client:component-hydration": "load", "client:component-path": "F:/Portofolio-NextJS-Acernity/src/components/nav", "client:component-export": "Nav" })} ${renderComponent($$result2, "DockDemo", DockDemo, { "client:load": true, "client:component-hydration": "load", "client:component-path": "F:/Portofolio-NextJS-Acernity/src/components/dock", "client:component-export": "DockDemo" })} ${renderComponent($$result2, "Hero", Hero, { "client:load": true, "client:component-hydration": "load", "client:component-path": "F:/Portofolio-NextJS-Acernity/src/components/index", "client:component-export": "Hero" })} ${renderComponent($$result2, "About", About, { "client:load": true, "client:component-hydration": "load", "client:component-path": "F:/Portofolio-NextJS-Acernity/src/components/about", "client:component-export": "About" })} ${renderComponent($$result2, "SafariDemo", SafariDemo, { "client:load": true, "client:component-hydration": "load", "client:component-path": "F:/Portofolio-NextJS-Acernity/src/components/recent-project", "client:component-export": "SafariDemo" })} ${renderComponent($$result2, "Projects", Projects, { "client:load": true, "client:component-hydration": "load", "client:component-path": "F:/Portofolio-NextJS-Acernity/src/components/projects", "client:component-export": "Projects" })} ${renderComponent($$result2, "Contact", Contact, { "client:load": true, "client:component-hydration": "load", "client:component-path": "F:/Portofolio-NextJS-Acernity/src/components/contact", "client:component-export": "Contact" })} ${renderComponent($$result2, "Footer", Footer, { "client:load": true, "client:component-hydration": "load", "client:component-path": "F:/Portofolio-NextJS-Acernity/src/components/footer", "client:component-export": "Footer" })} </main> ` })}`;
}, "F:/Portofolio-NextJS-Acernity/src/pages/index.astro", void 0);

const $$file = "F:/Portofolio-NextJS-Acernity/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
