import { e as createComponent, k as renderComponent, l as renderScript, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_CzcP1_xN.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_BMghxs4L.mjs';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import * as React from 'react';
import React__default, { useState, useRef, useEffect, createContext, forwardRef, useCallback, useMemo, useImperativeHandle } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { createNoise3D } from 'simplex-noise';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { SplitText as SplitText$1 } from 'gsap/SplitText';
import { GraduationCap, Award, BadgeCheck, Calendar, MapPin, ExternalLink, Layers, ArrowUpRight, X, Github, Linkedin, Instagram, Mail, Home, User, Briefcase, FileDown } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { Flip } from 'gsap/Flip';
export { renderers } from '../renderers.mjs';

function Nav() {
  return /* @__PURE__ */ jsx("header", { className: "fixed top-0 left-0 right-0 z-40 px-4 sm:px-8 py-3.5 sm:py-4 transition-all duration-300", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto flex items-center justify-between", children: [
    /* @__PURE__ */ jsxs(
      motion.a,
      {
        href: "#home",
        initial: { opacity: 0, x: -10 },
        animate: { opacity: 1, x: 0 },
        className: "group flex items-center gap-2.5 bg-neutral-900/70 border border-white/10 hover:border-white/25 backdrop-blur-md px-3.5 py-1.5 rounded-full transition-all",
        children: [
          /* @__PURE__ */ jsx("span", { className: "w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" }),
          /* @__PURE__ */ jsx("span", { className: "font-display font-semibold text-xs sm:text-sm text-white tracking-tight group-hover:text-neutral-200", children: "Adi Alam" })
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, x: 10 },
        animate: { opacity: 1, x: 0 },
        className: "hidden sm:flex items-center gap-3",
        children: /* @__PURE__ */ jsx("span", { className: "text-[11px] font-mono text-neutral-400 bg-white/5 border border-white/10 px-3 py-1 rounded-full", children: "Available for new opportunities" })
      }
    )
  ] }) });
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

const WavyBackground = ({
  children,
  className,
  containerClassName,
  colors,
  waveWidth,
  backgroundFill,
  blur = 10,
  speed = "fast",
  waveOpacity = 0.7,
  ...props
}) => {
  const [mounted, setMounted] = useState(false);
  const noise = createNoise3D();
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const getSpeed = () => {
    switch (speed) {
      case "slow":
        return 8e-4;
      case "fast":
        return 15e-4;
      default:
        return 1e-3;
    }
  };
  const waveColors = colors ?? [
    "#7caac2",
    "#2b6684",
    "#1a2328",
    "#4f8eaf",
    "#d9e9f6",
    "#0a3a52"
  ];
  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    let nt = 0;
    let animationId;
    let isVisible = true;
    const drawWave = (n) => {
      if (!ctx) return;
      nt += getSpeed();
      for (let i = 0; i < n; i++) {
        ctx.beginPath();
        ctx.lineWidth = waveWidth || 45;
        ctx.strokeStyle = waveColors[i % waveColors.length];
        for (let x = 0; x < w + 12; x += 12) {
          const y = noise(x / 800, 0.3 * i, nt) * 100;
          ctx.lineTo(x, y + h * 0.5);
        }
        ctx.stroke();
        ctx.closePath();
      }
    };
    const render = () => {
      if (!ctx || !isVisible) return;
      ctx.fillStyle = backgroundFill || "black";
      ctx.globalAlpha = waveOpacity || 0.5;
      ctx.fillRect(0, 0, w, h);
      drawWave(5);
      animationId = requestAnimationFrame(render);
    };
    render();
    const handleResize = () => {
      if (!canvas || !ctx) return;
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    const handleVisibilityChange = () => {
      if (document.hidden) {
        isVisible = false;
        cancelAnimationFrame(animationId);
      } else {
        isVisible = true;
        render();
      }
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!isVisible) {
            isVisible = true;
            render();
          }
        } else {
          isVisible = false;
          cancelAnimationFrame(animationId);
        }
      },
      { threshold: 0.05 }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    window.addEventListener("resize", handleResize);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      cancelAnimationFrame(animationId);
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [mounted]);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref: containerRef,
      className: cn$1(
        "min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden",
        containerClassName
      ),
      children: [
        /* @__PURE__ */ jsx(
          "canvas",
          {
            className: "absolute inset-0 z-0 pointer-events-none gpu-accelerated",
            ref: canvasRef,
            id: "canvas",
            style: {
              filter: `blur(${blur}px)`,
              WebkitFilter: `blur(${blur}px)`,
              transform: "translateZ(0)"
            }
          }
        ),
        /* @__PURE__ */ jsx("div", { className: cn$1("relative z-10 w-full", className), ...props, children })
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
const initialEducation = [
  {
    id: 1,
    institution: "Politeknik Negeri Madiun",
    degree: "D3 Teknik Informatika (Information Technology)",
    period: "2022 - Sekarang",
    description: "Fokus pada Software Engineering, Full-Stack Web Development (Laravel & React), Mobile App Development (Kotlin), Internet of Things (IoT), serta Computer Networking & Cybersecurity.",
    location: "Madiun, Jawa Timur"
  }
];
const initialCertificates = [
  {
    id: 1,
    title: "Full-Stack Web Development",
    issuer: "Dicoding Indonesia / Sertifikasi Kompetensi",
    issueDate: "2024",
    skills: ["Laravel", "React", "Node.js", "MySQL"],
    credentialUrl: "https://github.com/adialam345"
  },
  {
    id: 2,
    title: "Cyber Security & Computer Networking Essentials",
    issuer: "Cisco Networking Academy",
    issueDate: "2024",
    skills: ["Networking", "Cyber Security", "Routing & Switching"],
    credentialUrl: "https://github.com/adialam345"
  },
  {
    id: 3,
    title: "IoT & Mobile Application Development with Kotlin",
    issuer: "Politeknik Negeri Madiun",
    issueDate: "2023",
    skills: ["Kotlin", "Firebase", "IoT Sensors", "Material Design"],
    credentialUrl: "https://github.com/adialam345"
  }
];
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

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}
const CYCLING_ROLES = ["FULL-STACK", "FRONTEND", "BACKEND", "SOFTWARE"];
function SplitText({ text, className }) {
  return /* @__PURE__ */ jsx(Fragment, { children: text.split("").map((ch, i) => /* @__PURE__ */ jsx(
    "span",
    {
      className: `split-char inline-block ${className ?? ""}`,
      style: { whiteSpace: ch === " " ? "pre" : void 0 },
      children: ch === " " ? " " : ch
    },
    i
  )) });
}
function Hero() {
  const { profile } = usePortfolioData();
  const containerRef = useRef(null);
  const badgeRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const roleWordRef = useRef(null);
  const bioRef = useRef(null);
  const ctaBtnsRef = useRef(null);
  const scrollHintRef = useRef(null);
  const roleIndex = useRef(0);
  useGSAP(() => {
    if (!containerRef.current) return;
    const master = gsap.timeline({ defaults: { ease: "power4.out" } });
    master.fromTo(
      badgeRef.current,
      { opacity: 0, y: -16, scale: 0.85 },
      { opacity: 1, y: 0, scale: 1, duration: 0.65 }
    ).fromTo(
      ".hero-line1 .split-char",
      { opacity: 0, y: 80, skewX: -12, scale: 0.85 },
      { opacity: 1, y: 0, skewX: 0, scale: 1, duration: 0.8, stagger: { each: 0.04, from: "start" } },
      "-=0.2"
    ).fromTo(
      ".hero-line2 .split-char",
      { opacity: 0, y: 80, skewX: -10, scale: 0.85 },
      { opacity: 1, y: 0, skewX: 0, scale: 1, duration: 0.75, stagger: { each: 0.025, from: "start" } },
      "-=0.55"
    ).fromTo(
      bioRef.current,
      { opacity: 0, y: 28, filter: "blur(6px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.75 },
      "-=0.4"
    ).fromTo(
      ".hero-cta-btn",
      { opacity: 0, y: 22, scale: 0.92 },
      { opacity: 1, y: 0, scale: 1, duration: 0.55, stagger: 0.1 },
      "-=0.4"
    ).fromTo(
      scrollHintRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.5 },
      "-=0.2"
    );
    gsap.to(scrollHintRef.current, {
      y: 9,
      repeat: -1,
      yoyo: true,
      duration: 1.3,
      ease: "sine.inOut",
      delay: 2.5
    });
    gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=70%",
        pin: true,
        pinSpacing: true,
        scrub: 1
      }
    }).to(badgeRef.current, { y: -30, opacity: 0, scale: 0.9 }, 0).to(line1Ref.current, { y: -60, scale: 1.08, opacity: 0.3, skewX: -6 }, 0).to(line2Ref.current, { y: -60, scale: 1.08, opacity: 0.3, skewX: 6 }, 0).to(bioRef.current, { y: -40, opacity: 0, filter: "blur(8px)" }, 0).to(ctaBtnsRef.current, { y: -30, opacity: 0, scale: 0.9 }, 0).to(scrollHintRef.current, { opacity: 0 }, 0);
  }, { scope: containerRef });
  useEffect(() => {
    if (!roleWordRef.current) return;
    const el = roleWordRef.current;
    const cycle = () => {
      roleIndex.current = (roleIndex.current + 1) % CYCLING_ROLES.length;
      const next = CYCLING_ROLES[roleIndex.current];
      gsap.to(el, {
        clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
        duration: 0.35,
        ease: "power2.in",
        onComplete: () => {
          el.textContent = next;
          gsap.fromTo(
            el,
            { clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" },
            { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", duration: 0.45, ease: "power2.out" }
          );
        }
      });
    };
    const id = setInterval(cycle, 2400);
    return () => clearInterval(id);
  }, []);
  return /* @__PURE__ */ jsx(WavyBackground, { id: "home", children: /* @__PURE__ */ jsx(
    "div",
    {
      ref: containerRef,
      className: "flex min-h-[90vh] sm:min-h-screen justify-center items-center relative px-4 sm:px-6 py-16 sm:py-24 text-center",
      children: /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto flex flex-col items-center w-full", children: [
        /* @__PURE__ */ jsxs(
          "div",
          {
            ref: badgeRef,
            className: "opacity-0 mb-6 sm:mb-8 inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/15 bg-white/5 backdrop-blur-md text-xs sm:text-sm text-neutral-300 font-mono tracking-wide",
            children: [
              /* @__PURE__ */ jsx("span", { className: "w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse" }),
              "Available for new projects"
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "div",
          {
            ref: line1Ref,
            className: "hero-line1 text-2xl sm:text-4xl md:text-6xl lg:text-8xl font-display font-extrabold tracking-tight leading-none flex flex-wrap justify-center items-baseline gap-3 sm:gap-4",
            children: [
              /* @__PURE__ */ jsx("span", { className: "italic font-light text-neutral-400 text-[0.65em]", children: /* @__PURE__ */ jsx(SplitText, { text: profile.role1 || "I'm a" }) }),
              /* @__PURE__ */ jsx(
                "span",
                {
                  ref: roleWordRef,
                  className: "text-white",
                  style: { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" },
                  children: profile.role2 || "FULL-STACK"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            ref: line2Ref,
            className: "hero-line2 mt-2 sm:mt-3 text-2xl sm:text-4xl md:text-6xl lg:text-8xl font-display font-extrabold tracking-tight leading-none text-white",
            children: /* @__PURE__ */ jsx(SplitText, { text: profile.role3 || "DEVELOPER & ENGINEER" })
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "mt-6 sm:mt-8 w-16 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" }),
        /* @__PURE__ */ jsx(
          "p",
          {
            ref: bioRef,
            className: "opacity-0 mt-6 text-sm sm:text-base md:text-xl text-neutral-300 max-w-2xl leading-relaxed text-balance px-2",
            children: profile.heroBio
          }
        ),
        /* @__PURE__ */ jsxs("div", { ref: ctaBtnsRef, className: "mt-9 sm:mt-10 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto px-4", children: [
          /* @__PURE__ */ jsx("a", { href: "#about", className: "w-full sm:w-auto", children: /* @__PURE__ */ jsx("button", { className: "hero-cta-btn opacity-0 w-full sm:w-auto bg-white text-black hover:bg-neutral-100 px-8 sm:px-10 py-3.5 rounded-full font-semibold text-sm sm:text-base transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_50px_rgba(255,255,255,0.35)] hover:scale-105 active:scale-95", children: "Know more" }) }),
          /* @__PURE__ */ jsx("a", { href: "#contact", className: "w-full sm:w-auto", children: /* @__PURE__ */ jsx("button", { className: "hero-cta-btn opacity-0 w-full sm:w-auto border border-white/20 bg-white/5 backdrop-blur-md hover:bg-white/12 hover:border-white/40 text-white px-8 sm:px-10 py-3.5 rounded-full font-medium text-sm sm:text-base transition-all hover:scale-105 active:scale-95", children: "Contact" }) }),
          /* @__PURE__ */ jsx("a", { href: profile.cvUrl || "/CV_Adi_Alam_Sami_Aji_1.pdf", download: "CV_Adi_Alam_Sami_Aji.pdf", className: "w-full sm:w-auto", children: /* @__PURE__ */ jsxs("button", { className: "hero-cta-btn opacity-0 w-full sm:w-auto border border-white/20 bg-white/5 backdrop-blur-md hover:bg-white/12 hover:border-white/40 text-white px-8 sm:px-10 py-3.5 rounded-full font-medium text-sm sm:text-base transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2", children: [
            /* @__PURE__ */ jsxs("svg", { className: "w-4 h-4", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ jsx("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
              /* @__PURE__ */ jsx("polyline", { points: "7 10 12 15 17 10" }),
              /* @__PURE__ */ jsx("line", { x1: "12", y1: "15", x2: "12", y2: "3" })
            ] }),
            "Download CV"
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { ref: scrollHintRef, className: "opacity-0 mt-12 sm:mt-16 flex flex-col items-center gap-2 relative z-10", children: [
          /* @__PURE__ */ jsx("span", { className: "text-[10px] uppercase tracking-[0.3em] text-neutral-500 font-mono", children: "Scroll" }),
          /* @__PURE__ */ jsx("div", { className: "w-px h-10 bg-gradient-to-b from-neutral-500 to-transparent" })
        ] }),
        /* @__PURE__ */ jsx("div", { id: "hero-shared-origin", className: "absolute bottom-10 left-1/2 -translate-x-1/2 text-[9vw] font-display font-black text-white/5 whitespace-nowrap pointer-events-none tracking-tighter select-none z-0", children: "CRAFTING DIGITAL EXPERIENCES" })
      ] })
    }
  ) });
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
      className: cn$1(
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
          className: cn$1("flex shrink-0 justify-around [gap:var(--gap)]", {
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
    className: cn$1(
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
      className: cn$1(
        "relative w-28 sm:w-40 cursor-pointer overflow-hidden rounded-xl border p-2.5 sm:p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      ),
      children: /* @__PURE__ */ jsx("div", { className: "flex flex-col justify-center items-center", children: /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsxs(Tooltip, { children: [
        /* @__PURE__ */ jsx(TooltipTrigger, { children: /* @__PURE__ */ jsx("img", { className: "rounded w-10 sm:w-16 h-10 sm:h-16 object-contain grayscale brightness-100", alt: name, src: image, loading: "lazy", decoding: "async" }) }),
        /* @__PURE__ */ jsx(TooltipContent, { children: name })
      ] }) }) })
    }
  );
};
function MarqueeDemo() {
  return /* @__PURE__ */ jsxs("div", { className: "relative mt-6 sm:mt-10 flex h-[160px] sm:h-[260px] border-0 w-full flex-col items-center justify-center overflow-hidden rounded-lg ", children: [
    /* @__PURE__ */ jsx(Marquee, { pauseOnHover: true, className: "[--duration:20s]", children: firstRow.map((review) => /* @__PURE__ */ jsx(ReviewCard, { ...review }, review.name)) }),
    /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-y-0 left-0 w-1/4 sm:w-1/3 bg-gradient-to-r from-black dark:from-background" }),
    /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-y-0 right-0 w-1/4 sm:w-1/3 bg-gradient-to-l from-black dark:from-background" })
  ] });
}

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}
const STATS = [
  { value: 3, suffix: "+", label: "Years Exp." },
  { value: 20, suffix: "+", label: "Projects" },
  { value: 15, suffix: "+", label: "Technologies" }
];
function About() {
  const { profile } = usePortfolioData();
  const sectionRef = useRef(null);
  const textColRef = useRef(null);
  const imageWrapRef = useRef(null);
  const glowRef = useRef(null);
  const statsRef = useRef(null);
  useGSAP(() => {
    if (!sectionRef.current) return;
    const pinTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=120%",
        pin: true,
        pinSpacing: true,
        scrub: 1
      }
    });
    pinTl.fromTo(".about-label", { opacity: 0, x: -30 }, { opacity: 1, x: 0 }, 0).fromTo(".about-h-italic", { opacity: 0, y: 55, skewX: -10 }, { opacity: 1, y: 0, skewX: 0 }, 0.05).fromTo(".about-h-bold", { opacity: 0, y: 55, skewX: -8 }, { opacity: 1, y: 0, skewX: 0 }, 0.1).fromTo(".about-bio", { opacity: 0, y: 25, filter: "blur(6px)" }, { opacity: 1, y: 0, filter: "blur(0px)" }, 0.15).fromTo(
      imageWrapRef.current,
      { clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)", scale: 0.8, opacity: 0 },
      { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", scale: 1, opacity: 1 },
      0.1
    ).fromTo(glowRef.current, { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1 }, 0.15).fromTo(".stat-card", { opacity: 0, y: 25, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, stagger: 0.05 }, 0.25);
    const statEls = sectionRef.current.querySelectorAll(".stat-number");
    statEls.forEach((el, i) => {
      const target = STATS[i]?.value ?? 0;
      const obj = { val: 0 };
      gsap.to(obj, {
        val: target,
        ease: "power2.out",
        onUpdate: () => {
          el.textContent = Math.round(obj.val).toString();
        },
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 70%",
          toggleActions: "play none none reset"
        }
      });
    });
    gsap.to(imageWrapRef.current, {
      y: -10,
      repeat: -1,
      yoyo: true,
      duration: 3.5,
      ease: "sine.inOut"
    });
  }, { scope: sectionRef });
  return /* @__PURE__ */ jsxs("section", { id: "about", ref: sectionRef, className: "py-12 sm:py-28 px-4 sm:px-6 overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "max-w-6xl mx-auto", children: /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-12 md:gap-16 items-center", children: [
      /* @__PURE__ */ jsxs("div", { ref: textColRef, children: [
        /* @__PURE__ */ jsx("div", { id: "about-shared-target", className: "min-h-[24px] mb-5 flex items-center", children: /* @__PURE__ */ jsx("span", { className: "w-8 h-px bg-emerald-500 inline-block mr-3 opacity-0", id: "shared-line" }) }),
        /* @__PURE__ */ jsxs("h2", { className: "text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-display tracking-tight leading-[1.05] mb-5 sm:mb-6", children: [
          /* @__PURE__ */ jsx("span", { className: "about-h-italic opacity-0 block font-light italic text-neutral-300", children: profile.aboutHeadline1 || "where" }),
          /* @__PURE__ */ jsx("span", { className: "about-h-bold opacity-0 block font-extrabold text-white mt-1.5", children: profile.aboutHeadline2 || "EXPERIENCE BUILDS CHARACTER" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "about-bio opacity-0 text-neutral-400 text-sm sm:text-base md:text-lg leading-relaxed text-balance", children: profile.aboutBio }),
        /* @__PURE__ */ jsx("div", { ref: statsRef, className: "mt-8 sm:mt-10 grid grid-cols-3 gap-4", children: STATS.map((s, i) => /* @__PURE__ */ jsxs(
          "div",
          {
            className: "stat-card opacity-0 flex flex-col items-center bg-white/5 border border-white/10 rounded-2xl py-4 px-2",
            children: [
              /* @__PURE__ */ jsxs("span", { className: "text-2xl sm:text-3xl font-extrabold font-display text-white leading-none", children: [
                /* @__PURE__ */ jsx("span", { className: "stat-number", children: "0" }),
                /* @__PURE__ */ jsx("span", { className: "text-neutral-400", children: s.suffix })
              ] }),
              /* @__PURE__ */ jsx("span", { className: "mt-1.5 text-[10px] sm:text-xs text-neutral-500 font-mono uppercase tracking-wider text-center", children: s.label })
            ]
          },
          i
        )) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "relative flex justify-center items-center", children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            ref: glowRef,
            className: "opacity-0 absolute w-80 h-80 rounded-full blur-[80px] bg-gradient-radial from-purple-500/25 via-indigo-500/10 to-transparent pointer-events-none"
          }
        ),
        /* @__PURE__ */ jsxs(
          "div",
          {
            ref: imageWrapRef,
            className: "opacity-0 relative w-72 h-72 sm:w-[340px] sm:h-[340px] md:w-[380px] md:h-[380px]",
            style: { clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" },
            children: [
              /* @__PURE__ */ jsx("div", { className: "absolute -inset-1 rounded-3xl bg-gradient-to-br from-white/20 via-white/5 to-white/10 blur-sm pointer-events-none" }),
              /* @__PURE__ */ jsxs("div", { className: "w-full h-full rounded-3xl overflow-hidden border border-white/15 shadow-[0_25px_70px_rgba(0,0,0,0.7)]", children: [
                /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: profile.profileImage || "/profile.jpg",
                    alt: "Profile photo",
                    loading: "lazy",
                    decoding: "async",
                    className: "w-full h-full object-cover"
                  }
                ),
                /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-white/5 pointer-events-none" })
              ] })
            ]
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "mt-20 sm:mt-28", children: /* @__PURE__ */ jsx(MarqueeDemo, {}) })
  ] });
}

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText$1, useGSAP);
}
function EducationCertificates() {
  const [educationList] = useState(initialEducation);
  const [certificatesList] = useState(initialCertificates);
  const [activeTab, setActiveTab] = useState("all");
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const particlesRef = useRef(null);
  useGSAP(() => {
    if (!sectionRef.current || !headingRef.current) return;
    const split = SplitText$1.create(headingRef.current, {
      type: "chars,words",
      charsClass: "edu-char"
    });
    const chars = split.chars;
    const scatterVectors = chars.map((_, i) => {
      const angle = i / chars.length * Math.PI * 2 + Math.random() * 1.2;
      const radius = 180 + Math.random() * 320;
      return {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius - 80,
        rotation: (Math.random() - 0.5) * 540,
        scale: 0.1 + Math.random() * 0.5,
        opacity: 0
      };
    });
    chars.forEach((char, i) => {
      gsap.set(char, {
        x: scatterVectors[i].x,
        y: scatterVectors[i].y,
        rotation: scatterVectors[i].rotation,
        scale: scatterVectors[i].scale,
        opacity: scatterVectors[i].opacity,
        display: "inline-block"
      });
    });
    const particleTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 90%",
        end: "top 20%",
        scrub: 1.2
      }
    });
    chars.forEach((char, i) => {
      const progress = i / chars.length;
      particleTl.to(
        char,
        {
          x: 0,
          y: 0,
          rotation: 0,
          scale: 1,
          opacity: 1,
          ease: "back.out(1.7)",
          duration: 0.6
        },
        progress * 0.7
        // stagger start positions across 70% of timeline
      );
    });
    if (particlesRef.current) {
      const dots = Array.from(particlesRef.current.querySelectorAll(".edu-dot"));
      dots.forEach((dot, i) => {
        const angle = i / dots.length * Math.PI * 2;
        const radius = 80 + i % 3 * 40;
        gsap.set(dot, {
          x: Math.cos(angle) * radius,
          y: Math.sin(angle) * radius,
          opacity: 0,
          scale: 0
        });
        gsap.to(dot, {
          opacity: 0.4 + i % 2 * 0.3,
          scale: 0.6 + i % 3 * 0.3,
          duration: 0.4 + i * 0.06,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            toggleActions: "play none none reverse"
          }
        });
        gsap.to(dot, {
          x: Math.cos(angle + Math.PI) * radius * 0.8,
          y: Math.sin(angle + Math.PI) * radius * 0.8,
          rotation: 360,
          repeat: -1,
          yoyo: true,
          duration: 3 + i % 5,
          ease: "sine.inOut",
          delay: i * 0.15
        });
      });
    }
    const entryTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        toggleActions: "play none none reverse"
      },
      defaults: { ease: "power3.out" }
    });
    entryTl.fromTo(".edu-label", { opacity: 0, x: -24 }, { opacity: 1, x: 0, duration: 0.5 }).fromTo(".edu-subheading", { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.55 }, "-=0.2").fromTo(".edu-tabs", { opacity: 0, y: 12, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.5 }, "-=0.3");
    gsap.set(".gsap-cert-card", {
      clipPath: "circle(0% at 50% 50%)",
      opacity: 0,
      y: 80,
      scale: 0.78,
      rotationX: -25,
      rotationY: -10,
      transformPerspective: 1e3
    });
    ScrollTrigger.batch(".gsap-cert-card", {
      start: "top 88%",
      interval: 0.08,
      batchMax: 3,
      onEnter: (batch) => {
        gsap.to(batch, {
          clipPath: "circle(150% at 50% 50%)",
          opacity: 1,
          y: 0,
          scale: 1,
          rotationX: 0,
          rotationY: 0,
          duration: 0.9,
          stagger: 0.13,
          ease: "back.out(1.4)",
          overwrite: true
        });
      },
      onLeaveBack: (batch) => {
        gsap.to(batch, {
          clipPath: "circle(0% at 50% 50%)",
          opacity: 0,
          y: 50,
          scale: 0.8,
          duration: 0.45,
          stagger: 0.06,
          ease: "power2.in",
          overwrite: true
        });
      }
    });
    const cards = sectionRef.current.querySelectorAll(".gsap-cert-card");
    cards.forEach((card) => {
      const el = card;
      const handleMove = (e) => {
        const rect = el.getBoundingClientRect();
        const dx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
        const dy = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
        gsap.to(el, {
          rotationY: dx * 8,
          rotationX: -dy * 8,
          transformPerspective: 700,
          scale: 1.03,
          duration: 0.35,
          ease: "power2.out",
          overwrite: "auto"
        });
      };
      const handleLeave = () => gsap.to(el, { rotationY: 0, rotationX: 0, scale: 1, duration: 0.55, ease: "power3.out", overwrite: "auto" });
      el.addEventListener("mousemove", handleMove);
      el.addEventListener("mouseleave", handleLeave);
    });
  }, { scope: sectionRef, dependencies: [activeTab] });
  const DOT_COUNT = 14;
  return /* @__PURE__ */ jsx("section", { id: "education-certificates", ref: sectionRef, className: "py-8 sm:py-20 px-4 sm:px-6 relative", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            ref: particlesRef,
            "aria-hidden": "true",
            className: "absolute inset-0 pointer-events-none overflow-visible",
            children: Array.from({ length: DOT_COUNT }).map((_, i) => /* @__PURE__ */ jsx(
              "span",
              {
                className: "edu-dot absolute rounded-full",
                style: {
                  width: `${3 + i % 4 * 2}px`,
                  height: `${3 + i % 4 * 2}px`,
                  background: i % 3 === 0 ? "radial-gradient(circle, #a78bfa, transparent)" : i % 3 === 1 ? "radial-gradient(circle, #34d399, transparent)" : "radial-gradient(circle, #60a5fa, transparent)",
                  top: "50%",
                  left: "40%"
                }
              },
              i
            ))
          }
        ),
        /* @__PURE__ */ jsxs("span", { className: "edu-label opacity-0 inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-neutral-500 mb-3", children: [
          /* @__PURE__ */ jsx("span", { className: "w-6 h-px bg-neutral-600 inline-block" }),
          "Background"
        ] }),
        /* @__PURE__ */ jsx(
          "h2",
          {
            ref: headingRef,
            className: "edu-heading text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-display leading-tight overflow-visible",
            style: { perspective: "600px" },
            children: "Education & Certifications"
          }
        ),
        /* @__PURE__ */ jsx("p", { className: "edu-subheading opacity-0 text-neutral-400 text-xs sm:text-sm mt-1 sm:mt-2", children: "Latar belakang akademis dan lisensi sertifikasi profesional" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "edu-tabs opacity-0 flex flex-wrap gap-2", children: [
        { key: "all", label: `Semua (${educationList.length + certificatesList.length})`, icon: null },
        { key: "education", label: `Education (${educationList.length})`, icon: /* @__PURE__ */ jsx(GraduationCap, { className: "w-3.5 h-3.5" }) },
        { key: "certificates", label: `Certifications (${certificatesList.length})`, icon: /* @__PURE__ */ jsx(Award, { className: "w-3.5 h-3.5" }) }
      ].map(({ key, label, icon }) => /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => setActiveTab(key),
          className: `px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${activeTab === key ? "bg-white text-black shadow-lg scale-105" : "bg-white/5 border border-white/10 text-neutral-400 hover:text-white hover:bg-white/10"}`,
          children: [
            icon,
            label
          ]
        },
        key
      )) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-12 sm:space-y-16", children: [
      (activeTab === "all" || activeTab === "education") && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
          /* @__PURE__ */ jsx("div", { className: "w-9 h-9 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-white", children: /* @__PURE__ */ jsx(GraduationCap, { className: "w-4 h-4" }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl sm:text-2xl font-bold text-white", children: "Pendidikan Akademis" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-6", children: educationList.map((edu) => /* @__PURE__ */ jsxs(
          "div",
          {
            className: "gsap-cert-card relative bg-neutral-900/60 border border-white/10 hover:border-white/30 rounded-2xl p-6 sm:p-8 backdrop-blur-xl transition-colors duration-300",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium bg-white/10 border border-white/15 text-white mb-3", children: [
                    /* @__PURE__ */ jsx(BadgeCheck, { className: "w-3.5 h-3.5 text-white" }),
                    "Official Degree"
                  ] }),
                  /* @__PURE__ */ jsx("h4", { className: "text-xl sm:text-2xl font-bold text-white", children: edu.institution }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm sm:text-base font-medium text-neutral-300 mt-1", children: edu.degree })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:items-end gap-1.5 text-xs text-neutral-400", children: [
                  /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-300 font-mono", children: [
                    /* @__PURE__ */ jsx(Calendar, { className: "w-3.5 h-3.5 text-neutral-400" }),
                    edu.period
                  ] }),
                  edu.location && /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1 text-neutral-400 mt-1", children: [
                    /* @__PURE__ */ jsx(MapPin, { className: "w-3.5 h-3.5 text-neutral-400" }),
                    edu.location
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-neutral-400 text-xs sm:text-sm leading-relaxed border-t border-white/10 pt-4", children: edu.description })
            ]
          },
          edu.id
        )) })
      ] }),
      (activeTab === "all" || activeTab === "certificates") && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
          /* @__PURE__ */ jsx("div", { className: "w-9 h-9 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-white", children: /* @__PURE__ */ jsx(Award, { className: "w-4 h-4" }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl sm:text-2xl font-bold text-white", children: "Sertifikasi & Lisensi" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: certificatesList.map((cert) => /* @__PURE__ */ jsxs(
          "div",
          {
            className: "gsap-cert-card group relative flex flex-col justify-between bg-neutral-900/60 border border-white/10 hover:border-white/30 rounded-2xl p-6 backdrop-blur-xl transition-colors duration-300",
            children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-2 mb-3", children: [
                  /* @__PURE__ */ jsx("span", { className: "px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-white/10 border border-white/15 text-white", children: cert.issueDate }),
                  cert.credentialUrl && /* @__PURE__ */ jsx(
                    "a",
                    {
                      href: cert.credentialUrl,
                      target: "_blank",
                      rel: "noopener noreferrer",
                      className: "p-1.5 rounded-full border border-white/10 hover:border-white/30 text-neutral-400 hover:text-white transition-colors",
                      title: "Lihat Sertifikat",
                      children: /* @__PURE__ */ jsx(ExternalLink, { className: "w-3.5 h-3.5" })
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx("h4", { className: "text-base sm:text-lg font-bold text-white mb-1.5 group-hover:text-neutral-200 transition-colors line-clamp-2", children: cert.title }),
                /* @__PURE__ */ jsxs("p", { className: "text-xs text-neutral-400 mb-4 font-medium flex items-center gap-1", children: [
                  /* @__PURE__ */ jsx(BadgeCheck, { className: "w-3.5 h-3.5 text-neutral-400 flex-shrink-0" }),
                  /* @__PURE__ */ jsx("span", { children: cert.issuer })
                ] })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "pt-4 border-t border-white/10", children: /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1.5", children: cert.skills?.map((skill, idx) => /* @__PURE__ */ jsx(
                "span",
                {
                  className: "px-2 py-0.5 rounded-md text-[10px] bg-white/5 border border-white/10 text-neutral-300 font-mono",
                  children: skill
                },
                idx
              )) }) })
            ]
          },
          cert.id
        )) })
      ] })
    ] })
  ] }) });
}

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}
function Projects() {
  const { projectsList } = usePortfolioData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sectionRef = useRef(null);
  const mainPageProjects = projectsList.slice(0, 6);
  useGSAP(() => {
    if (!sectionRef.current) return;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 78%",
        toggleActions: "play none none reverse"
      },
      defaults: { ease: "power3.out" }
    });
    tl.fromTo(".projects-label", { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.5 }).fromTo(".projects-heading", { opacity: 0, y: 40, skewX: -5 }, { opacity: 1, y: 0, skewX: 0, duration: 0.8 }, "-=0.2").fromTo(".projects-subheading", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.4");
    gsap.set(".gsap-project-card", {
      clipPath: "circle(0% at 50% 50%)",
      opacity: 0,
      y: 90,
      scale: 0.75,
      rotationX: -35,
      rotationY: 15,
      transformPerspective: 1e3
    });
    ScrollTrigger.batch(".gsap-project-card", {
      start: "top 88%",
      interval: 0.08,
      batchMax: 3,
      onEnter: (batch) => {
        gsap.to(batch, {
          clipPath: "circle(150% at 50% 50%)",
          opacity: 1,
          y: 0,
          scale: 1,
          rotationX: 0,
          rotationY: 0,
          duration: 0.95,
          stagger: 0.15,
          ease: "back.out(1.4)",
          overwrite: true
        });
      },
      onLeaveBack: (batch) => {
        gsap.to(batch, {
          clipPath: "circle(0% at 50% 50%)",
          opacity: 0,
          y: 60,
          scale: 0.8,
          rotationX: -20,
          duration: 0.5,
          stagger: 0.07,
          ease: "power2.in",
          overwrite: true
        });
      }
    });
    const cards = sectionRef.current.querySelectorAll(".gsap-project-card");
    cards.forEach((card) => {
      const el = card;
      const handleMove = (e) => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / (rect.width / 2);
        const dy = (e.clientY - cy) / (rect.height / 2);
        gsap.to(el, {
          rotationY: dx * 9,
          rotationX: -dy * 9,
          transformPerspective: 700,
          scale: 1.035,
          duration: 0.35,
          ease: "power2.out",
          overwrite: "auto"
        });
      };
      const handleLeave = () => {
        gsap.to(el, { rotationY: 0, rotationX: 0, scale: 1, duration: 0.55, ease: "power3.out", overwrite: "auto" });
      };
      el.addEventListener("mousemove", handleMove);
      el.addEventListener("mouseleave", handleLeave);
    });
  }, { scope: sectionRef });
  return /* @__PURE__ */ jsxs("section", { id: "work", ref: sectionRef, className: "py-8 sm:py-20 px-4 sm:px-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-12 gap-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("span", { className: "projects-label opacity-0 inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-neutral-500 mb-3", children: [
            /* @__PURE__ */ jsx("span", { className: "w-6 h-px bg-neutral-600 inline-block" }),
            "Portfolio"
          ] }),
          /* @__PURE__ */ jsx("h2", { className: "projects-heading opacity-0 text-2xl sm:text-4xl md:text-5xl font-extrabold font-display tracking-tight text-white", children: "All Projects" }),
          /* @__PURE__ */ jsx("p", { className: "projects-subheading opacity-0 text-neutral-400 text-xs sm:text-sm mt-1 sm:mt-2", children: "Kumpulan karya & proyek pengembangan perangkat lunak" })
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
            className: "flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/15 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl text-xs font-semibold text-white transition-all shadow-lg backdrop-blur-md w-full sm:w-auto",
            children: [
              /* @__PURE__ */ jsx(Layers, { className: "w-4 h-4 text-white" }),
              /* @__PURE__ */ jsxs("span", { children: [
                "Lihat Semua (",
                projectsList.length,
                " Proyek)"
              ] })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex sm:hidden items-center justify-between text-xs text-neutral-400 mb-3 px-1", children: [
        /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
          "Geser untuk melihat proyek",
          /* @__PURE__ */ jsx("span", { className: "animate-pulse", children: "→" })
        ] }),
        /* @__PURE__ */ jsx("span", { className: "text-[10px] bg-white/10 text-white border border-white/20 px-2 py-0.5 rounded-full font-medium", children: "Swipe" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:pb-0 sm:grid sm:grid-cols-2 md:grid-cols-3 sm:gap-4 md:gap-6 no-scrollbar", children: mainPageProjects.map((project) => /* @__PURE__ */ jsxs(
        motion.div,
        {
          className: "gsap-project-card flex-shrink-0 w-[85vw] max-w-[310px] sm:w-auto snap-center group relative flex flex-col justify-between bg-neutral-900/60 border border-white/10 rounded-2xl p-4 transition-colors duration-300 hover:bg-neutral-900/90 hover:border-white/25 shadow-xl backdrop-blur-xl",
          children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: "overflow-hidden rounded-xl aspect-video mb-3 sm:mb-4 bg-neutral-950", children: /* @__PURE__ */ jsx(
                "img",
                {
                  src: project.image || "/ponpes.png",
                  alt: project.title,
                  loading: "lazy",
                  decoding: "async",
                  className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                }
              ) }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-2 sm:mb-3 gap-2", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-base sm:text-lg font-semibold line-clamp-1", children: project.title }),
                project.link && /* @__PURE__ */ jsx("a", { href: project.link, target: "_blank", rel: "noopener noreferrer", title: "View Project", children: /* @__PURE__ */ jsx(
                  motion.button,
                  {
                    whileHover: { scale: 1.1 },
                    whileTap: { scale: 0.9 },
                    className: "p-1.5 sm:p-2 rounded-full border border-white/20 hover:bg-white hover:text-black transition-colors",
                    children: /* @__PURE__ */ jsx(ArrowUpRight, { className: "w-3.5 h-3.5 sm:w-4 sm:h-4" })
                  }
                ) })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-3 text-xs sm:text-sm leading-relaxed line-clamp-3", children: project.description })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex gap-1.5 sm:gap-2 flex-wrap mt-2", children: project.tags?.map((tag) => /* @__PURE__ */ jsx(
              "span",
              {
                className: "px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs border border-white/20 rounded-full text-neutral-300 bg-white/5",
                children: tag
              },
              tag
            )) })
          ]
        },
        project.id
      )) })
    ] }),
    /* @__PURE__ */ jsx(AnimatePresence, { children: isModalOpen && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/85 backdrop-blur-md overflow-hidden", children: /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.95, y: 20 },
        animate: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.95, y: 20 },
        transition: { type: "spring", damping: 25, stiffness: 300 },
        className: "bg-neutral-900 border border-white/15 w-full max-w-6xl max-h-[92vh] sm:max-h-[85vh] rounded-2xl sm:rounded-3xl flex flex-col shadow-2xl overflow-hidden",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "p-4 sm:p-6 border-b border-white/10 flex items-center justify-between bg-neutral-950/60", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-xl sm:text-2xl font-bold text-white flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(Layers, { className: "w-5 h-5 sm:w-6 sm:h-6 text-white" }),
                "All Projects (",
                projectsList.length,
                ")"
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-[11px] sm:text-xs text-neutral-400 mt-1", children: "Seluruh proyek pengembangan aplikasi web, mobile, dan IoT." })
            ] }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setIsModalOpen(false),
                className: "p-2 sm:p-2.5 rounded-full border border-white/15 text-neutral-400 hover:text-white hover:bg-white/10 transition-colors",
                children: /* @__PURE__ */ jsx(X, { className: "w-4 h-4 sm:w-5 sm:h-5" })
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "p-3 sm:p-6 overflow-y-auto max-h-[70vh] sm:max-h-[65vh] space-y-4 sm:space-y-6 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6", children: projectsList.map((project) => /* @__PURE__ */ jsxs(
            "div",
            {
              className: "group relative flex flex-col justify-between bg-white/5 border border-white/10 rounded-2xl p-3.5 sm:p-4 transition-all duration-300 hover:bg-white/[0.08] hover:border-white/25",
              children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("div", { className: "overflow-hidden rounded-xl aspect-video mb-3 sm:mb-4 bg-neutral-950", children: /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: project.image || "/ponpes.png",
                      alt: project.title,
                      loading: "lazy",
                      decoding: "async",
                      className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    }
                  ) }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-2 sm:mb-3 gap-2", children: [
                    /* @__PURE__ */ jsx("h3", { className: "text-base sm:text-lg font-semibold line-clamp-1", children: project.title }),
                    project.link && /* @__PURE__ */ jsx("a", { href: project.link, target: "_blank", rel: "noopener noreferrer", title: "View Project", children: /* @__PURE__ */ jsx(
                      motion.button,
                      {
                        whileHover: { scale: 1.1 },
                        whileTap: { scale: 0.9 },
                        className: "p-1.5 sm:p-2 rounded-full border border-white/20 hover:bg-white hover:text-black transition-colors",
                        children: /* @__PURE__ */ jsx(ArrowUpRight, { className: "w-3.5 h-3.5 sm:w-4 sm:h-4" })
                      }
                    ) })
                  ] }),
                  /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-3 text-xs sm:text-sm leading-relaxed", children: project.description })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "flex gap-1.5 sm:gap-2 flex-wrap mt-2", children: project.tags?.map((tag) => /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: "px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs border border-white/20 rounded-full text-neutral-300 bg-white/5",
                    children: tag
                  },
                  tag
                )) })
              ]
            },
            project.id
          )) }) }),
          /* @__PURE__ */ jsxs("div", { className: "p-3.5 sm:p-4 border-t border-white/10 bg-neutral-950/80 flex justify-between items-center text-xs text-neutral-400", children: [
            /* @__PURE__ */ jsxs("span", { children: [
              "Total ",
              projectsList.length,
              " Proyek"
            ] }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setIsModalOpen(false),
                className: "px-4 sm:px-5 py-2 sm:py-2.5 bg-white text-black font-semibold rounded-xl text-xs hover:bg-neutral-200 transition-colors",
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
        className: cn$1(buttonVariants({ variant, size, className })),
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

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}
function SplitChars({ text, baseClass }) {
  return /* @__PURE__ */ jsx(Fragment, { children: text.split("").map((ch, i) => /* @__PURE__ */ jsx(
    "span",
    {
      className: `contact-char inline-block ${baseClass ?? ""}`,
      style: { whiteSpace: ch === " " ? "pre" : void 0 },
      children: ch === " " ? " " : ch
    },
    i
  )) });
}
function Contact() {
  const { profile } = usePortfolioData();
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subRef = useRef(null);
  const btnRef = useRef(null);
  const dividerRef = useRef(null);
  const blobRef = useRef(null);
  useGSAP(() => {
    if (!sectionRef.current) return;
    const blobStates = [
      "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
      "polygon(50% 0%, 85% 15%, 100% 50%, 85% 85%, 50% 100%, 15% 85%, 0% 50%, 15% 15%)",
      "polygon(40% 0%, 80% 10%, 100% 40%, 90% 80%, 50% 100%, 10% 90%, 0% 50%, 20% 10%)",
      "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)"
    ];
    let blobIdx = 0;
    const morphBlob = () => {
      blobIdx = (blobIdx + 1) % blobStates.length;
      gsap.to(blobRef.current, {
        clipPath: blobStates[blobIdx],
        duration: 3.5,
        ease: "sine.inOut",
        onComplete: morphBlob
      });
    };
    gsap.fromTo(
      blobRef.current,
      { opacity: 0, scale: 0.4, clipPath: blobStates[0] },
      {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        onComplete: morphBlob
      }
    );
    gsap.set(".contact-char-1", { opacity: 0 });
    gsap.set(".contact-line2", { clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" });
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        toggleActions: "play none none reverse"
      },
      defaults: { ease: "power4.out" }
    });
    tl.fromTo(
      dividerRef.current,
      { scaleX: 0, transformOrigin: "center" },
      { scaleX: 1, duration: 0.75 }
    ).call(() => {
      gsap.set(".contact-char-1", {
        x: () => gsap.utils.random(-80, 80),
        y: () => gsap.utils.random(-60, 60),
        rotation: () => gsap.utils.random(-35, 35),
        scale: 0.4,
        opacity: 0
      });
    }).to(
      ".contact-char-1",
      {
        opacity: 1,
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        duration: 0.9,
        stagger: { each: 0.045, from: "random" },
        ease: "back.out(1.5)"
      },
      "-=0.05"
    ).fromTo(
      ".contact-line2",
      { clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)", opacity: 1 },
      { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", duration: 0.7, ease: "power2.inOut" },
      "-=0.3"
    ).fromTo(
      subRef.current,
      { opacity: 0, y: 22, filter: "blur(6px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.65 },
      "-=0.25"
    ).fromTo(
      btnRef.current,
      { opacity: 0, scale: 0.82 },
      { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.6)" },
      "-=0.3"
    ).fromTo(
      ".contact-icon",
      { opacity: 0, y: 18, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.09 },
      "-=0.25"
    );
  }, { scope: sectionRef });
  return /* @__PURE__ */ jsxs("section", { id: "contact", ref: sectionRef, className: "relative py-20 sm:py-32 px-4 sm:px-6 overflow-hidden", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        ref: blobRef,
        className: "opacity-0 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-radial from-purple-600/12 via-indigo-500/6 to-transparent blur-2xl pointer-events-none",
        style: { clipPath: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)" }
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center", children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          ref: dividerRef,
          className: "mb-10 h-px w-28 bg-gradient-to-r from-transparent via-white/40 to-transparent"
        }
      ),
      /* @__PURE__ */ jsxs(
        "h2",
        {
          ref: headingRef,
          className: "font-display font-extrabold tracking-tight text-white leading-[0.95] mb-6",
          children: [
            /* @__PURE__ */ jsx("span", { className: "block text-4xl sm:text-6xl md:text-7xl lg:text-8xl", children: /* @__PURE__ */ jsx(SplitChars, { text: "Get in", baseClass: "contact-char-1" }) }),
            /* @__PURE__ */ jsx("span", { className: "contact-line2 block text-5xl sm:text-7xl md:text-8xl lg:text-9xl italic font-light text-neutral-300 mt-1", children: "Touch" })
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        "p",
        {
          ref: subRef,
          className: "opacity-0 text-sm sm:text-lg md:text-xl text-neutral-300 mb-10 sm:mb-14 max-w-md leading-relaxed text-balance",
          children: "Have a project in mind? Let's work together to create something amazing."
        }
      ),
      /* @__PURE__ */ jsx("div", { ref: btnRef, className: "opacity-0 mb-12 sm:mb-16", children: /* @__PURE__ */ jsx(
        ConfettiButton,
        {
          className: "bg-white text-black hover:bg-neutral-100 px-10 sm:px-16 py-4 sm:py-5 rounded-full font-semibold text-base sm:text-lg transition-all shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:shadow-[0_0_70px_rgba(255,255,255,0.3)] hover:scale-105 active:scale-95",
          children: "Let's talk"
        }
      ) }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-center gap-4 flex-wrap", children: [
        profile.githubUrl && /* @__PURE__ */ jsx(
          motion.a,
          {
            href: profile.githubUrl,
            target: "_blank",
            rel: "noopener noreferrer",
            whileHover: { y: -7, scale: 1.12 },
            whileTap: { scale: 0.9 },
            className: "contact-icon opacity-0 group p-4 bg-neutral-900/70 border border-white/10 rounded-2xl hover:border-white/35 hover:bg-white/8 backdrop-blur-lg transition-all shadow-lg text-white",
            "aria-label": "GitHub",
            children: /* @__PURE__ */ jsx(Github, { className: "w-5 h-5 sm:w-6 sm:h-6" })
          }
        ),
        profile.linkedinUrl && /* @__PURE__ */ jsx(
          motion.a,
          {
            href: profile.linkedinUrl,
            target: "_blank",
            rel: "noopener noreferrer",
            whileHover: { y: -7, scale: 1.12 },
            whileTap: { scale: 0.9 },
            className: "contact-icon opacity-0 group p-4 bg-neutral-900/70 border border-white/10 rounded-2xl hover:border-white/35 hover:bg-white/8 backdrop-blur-lg transition-all shadow-lg text-white",
            "aria-label": "LinkedIn",
            children: /* @__PURE__ */ jsx(Linkedin, { className: "w-5 h-5 sm:w-6 sm:h-6" })
          }
        ),
        profile.instagramUrl && /* @__PURE__ */ jsx(
          motion.a,
          {
            href: profile.instagramUrl,
            target: "_blank",
            rel: "noopener noreferrer",
            whileHover: { y: -7, scale: 1.12 },
            whileTap: { scale: 0.9 },
            className: "contact-icon opacity-0 group p-4 bg-neutral-900/70 border border-white/10 rounded-2xl hover:border-white/35 hover:bg-white/8 backdrop-blur-lg transition-all shadow-lg text-white",
            "aria-label": "Instagram",
            children: /* @__PURE__ */ jsx(Instagram, { className: "w-5 h-5 sm:w-6 sm:h-6" })
          }
        ),
        profile.email && /* @__PURE__ */ jsx(
          motion.a,
          {
            href: `mailto:${profile.email}`,
            whileHover: { y: -7, scale: 1.12 },
            whileTap: { scale: 0.9 },
            className: "contact-icon opacity-0 group p-4 bg-neutral-900/70 border border-white/10 rounded-2xl hover:border-white/35 hover:bg-white/8 backdrop-blur-lg transition-all shadow-lg text-white",
            "aria-label": "Email",
            children: /* @__PURE__ */ jsx(Mail, { className: "w-5 h-5 sm:w-6 sm:h-6" })
          }
        )
      ] })
    ] })
  ] });
}

function Footer() {
  const [currentYear, setCurrentYear] = useState("");
  useEffect(() => {
    setCurrentYear((/* @__PURE__ */ new Date()).getFullYear().toString());
  }, []);
  return /* @__PURE__ */ jsx("footer", { className: "py-8 sm:py-10 px-4 sm:px-6 border-t border-white/10 pb-24 sm:pb-20", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-xs sm:text-sm text-gray-400", children: [
      "© ",
      currentYear,
      " Adi Alam Sami Aji. All rights reserved."
    ] }),
    /* @__PURE__ */ jsxs("nav", { className: "flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-400", children: [
      /* @__PURE__ */ jsx("a", { href: "#", className: "hover:text-white transition-colors", children: "Privacy Policy" }),
      /* @__PURE__ */ jsx("a", { href: "#", className: "hover:text-white transition-colors", children: "Terms & Conditions" }),
      /* @__PURE__ */ jsx("a", { href: "#", className: "hover:text-white transition-colors", children: "Cookies Policy" })
    ] })
  ] }) });
}

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const DEFAULT_SIZE = 40;
const DEFAULT_MAGNIFICATION = 60;
const DEFAULT_DISTANCE = 140;
const dockVariants = cva(
  "supports-backdrop-blur:bg-white/10 supports-backdrop-blur:dark:bg-black/10 mx-auto flex h-[50px] sm:h-[58px] w-max max-w-[95vw] items-center justify-center gap-1 sm:gap-2 rounded-2xl border p-1.5 sm:p-2 backdrop-blur-md shadow-2xl"
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
        className: cn(dockVariants({ className }), {
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
      className: cn(
        "flex aspect-square cursor-pointer items-center justify-center rounded-full",
        className
      ),
      ...props,
      children
    }
  );
};
DockIcon.displayName = "DockIcon";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollToPlugin, Flip, useGSAP);
}
const NAV_ITEMS = [
  { id: "home", label: "HOME", icon: Home },
  { id: "about", label: "ABOUT", icon: User },
  { id: "education-certificates", label: "EDUCATION & CERTIFICATES", icon: GraduationCap },
  { id: "work", label: "PROJECT", icon: Briefcase },
  { id: "contact", label: "CONTACT", icon: Mail }
];
function DockDemo() {
  const [activeSection, setActiveSection] = useState("home");
  const previousSection = useRef("home");
  const dockRef = useRef(null);
  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (!target) return;
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
      ease: "power3.inOut"
    });
  };
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
              const activePill = document.querySelector(".dock-active-pill");
              if (activePill) {
                const state = Flip.getState(activePill);
                setActiveSection(item.id);
                previousSection.current = item.id;
                requestAnimationFrame(() => {
                  Flip.from(state, {
                    duration: 0.45,
                    ease: "power3.out",
                    absolute: true
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
  return /* @__PURE__ */ jsx("div", { ref: dockRef, className: "fixed bottom-3 sm:bottom-6 left-0 right-0 z-50 px-2 sm:px-0 flex justify-center", children: /* @__PURE__ */ jsxs(Dock, { iconMagnification: 54, iconDistance: 70, iconSize: 38, className: "bg-neutral-900/80 backdrop-blur-xl border-white/15 shadow-2xl relative", children: [
    NAV_ITEMS.map((item) => {
      const Icon = item.icon;
      const isActive = activeSection === item.id;
      return /* @__PURE__ */ jsxs(
        DockIcon,
        {
          className: "relative bg-white/5 hover:bg-white/15 transition-colors",
          children: [
            isActive && /* @__PURE__ */ jsx(
              "div",
              {
                className: "dock-active-pill absolute inset-0 rounded-full bg-white/20 border border-white/30 shadow-[0_0_15px_rgba(255,255,255,0.2)] pointer-events-none z-0"
              }
            ),
            /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsxs(Tooltip, { children: [
              /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsx(
                "a",
                {
                  href: `#${item.id}`,
                  onClick: (e) => handleNavClick(e, item.id),
                  "aria-label": `${item.label} section`,
                  className: "p-2 flex items-center justify-center size-full relative z-10",
                  children: /* @__PURE__ */ jsx(Icon, { className: "w-5 h-5 text-white" })
                }
              ) }),
              /* @__PURE__ */ jsx(TooltipContent, { children: item.label })
            ] }) })
          ]
        },
        item.id
      );
    }),
    /* @__PURE__ */ jsx(DockIcon, { className: "bg-white/5 hover:bg-white/15 transition-colors", children: /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsxs(Tooltip, { children: [
      /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsx(
        "a",
        {
          href: "/CV_Adi_Alam_Sami_Aji_1.pdf",
          download: "CV_Adi_Alam_Sami_Aji.pdf",
          "aria-label": "Download CV",
          className: "p-2 flex items-center justify-center size-full",
          children: /* @__PURE__ */ jsx(FileDown, { className: "w-5 h-5 text-white" })
        }
      ) }),
      /* @__PURE__ */ jsx(TooltipContent, { children: "DOWNLOAD CV" })
    ] }) }) })
  ] }) });
}

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
      className: cn$1(
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

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}
function SafariDemo() {
  const { projectsList } = usePortfolioData();
  const featuredProject = projectsList.find((p) => p.isFeatured) || projectsList[0] || {
    title: "PONPES MIFTAHUL HUDA | WEBSITE",
    description: "Sebuah sistem informasi berbasis web menggunakan Laravel untuk manajemen lembaga pendidikan.",
    image: "/ponpes.png",
    link: "https://miftahulhudadoho.or.id/"
  };
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  useGSAP(() => {
    if (!containerRef.current || !cardRef.current) return;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse"
      },
      defaults: { ease: "power3.out" }
    });
    tl.fromTo(
      ".safari-heading",
      { opacity: 0, y: 40, skewX: -5 },
      { opacity: 1, y: 0, skewX: 0, duration: 0.8 }
    ).fromTo(
      ".safari-sub",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6 },
      "-=0.4"
    ).fromTo(
      cardRef.current,
      { opacity: 0, scale: 0.88, rotationX: 15 },
      { opacity: 1, scale: 1, rotationX: 0, duration: 1, ease: "power3.out" },
      "-=0.3"
    );
    const el = cardRef.current;
    const handleMove = (e) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      gsap.to(el, {
        rotationY: dx * 7,
        rotationX: -dy * 7,
        transformPerspective: 800,
        scale: 1.02,
        duration: 0.4,
        ease: "power2.out",
        overwrite: "auto"
      });
    };
    const handleLeave = () => {
      gsap.to(el, {
        rotationY: 0,
        rotationX: 0,
        scale: 1,
        duration: 0.6,
        ease: "power3.out",
        overwrite: "auto"
      });
    };
    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
  }, { scope: containerRef });
  return /* @__PURE__ */ jsxs("div", { ref: containerRef, className: "w-full py-4 sm:py-12 my-2 sm:my-6", children: [
    /* @__PURE__ */ jsx("h2", { className: "safari-heading opacity-0 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight font-display mb-3 flex justify-center items-center px-4 text-center text-white", children: featuredProject.title || "Latest Projects" }),
    /* @__PURE__ */ jsx("p", { className: "safari-sub opacity-0 mt-6 text-sm sm:text-base md:text-lg lg:text-xl text-center text-neutral-300 max-w-2xl mb-10 mx-auto px-4 leading-relaxed text-balance", children: featuredProject.description }),
    /* @__PURE__ */ jsx(
      "div",
      {
        ref: cardRef,
        className: "relative w-full flex items-center justify-center px-3 sm:px-8 opacity-0",
        children: /* @__PURE__ */ jsx(
          ShineBorder,
          {
            borderWidth: 2,
            className: "relative flex flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl w-full max-w-4xl lg:w-3/5",
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
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Adi Alam | Portfolio", "description": "Personal portfolio website" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main> ${renderComponent($$result2, "ParticleBackground", ParticleBackground, { "client:idle": true, "client:component-hydration": "idle", "client:component-path": "F:/Portofolio-NextJS-Acernity/src/components/particles", "client:component-export": "ParticleBackground" })} ${renderComponent($$result2, "Nav", Nav, { "client:load": true, "client:component-hydration": "load", "client:component-path": "F:/Portofolio-NextJS-Acernity/src/components/nav", "client:component-export": "Nav" })} ${renderComponent($$result2, "DockDemo", DockDemo, { "client:load": true, "client:component-hydration": "load", "client:component-path": "F:/Portofolio-NextJS-Acernity/src/components/dock", "client:component-export": "DockDemo" })} ${renderComponent($$result2, "Hero", Hero, { "client:load": true, "client:component-hydration": "load", "client:component-path": "F:/Portofolio-NextJS-Acernity/src/components/index", "client:component-export": "Hero" })} ${renderComponent($$result2, "About", About, { "client:load": true, "client:component-hydration": "load", "client:component-path": "F:/Portofolio-NextJS-Acernity/src/components/about", "client:component-export": "About" })} ${renderComponent($$result2, "EducationCertificates", EducationCertificates, { "client:load": true, "client:component-hydration": "load", "client:component-path": "F:/Portofolio-NextJS-Acernity/src/components/education-certificates", "client:component-export": "EducationCertificates" })} ${renderComponent($$result2, "SafariDemo", SafariDemo, { "client:load": true, "client:component-hydration": "load", "client:component-path": "F:/Portofolio-NextJS-Acernity/src/components/recent-project", "client:component-export": "SafariDemo" })} ${renderComponent($$result2, "Projects", Projects, { "client:load": true, "client:component-hydration": "load", "client:component-path": "F:/Portofolio-NextJS-Acernity/src/components/projects", "client:component-export": "Projects" })} ${renderComponent($$result2, "Contact", Contact, { "client:load": true, "client:component-hydration": "load", "client:component-path": "F:/Portofolio-NextJS-Acernity/src/components/contact", "client:component-export": "Contact" })} ${renderComponent($$result2, "Footer", Footer, { "client:load": true, "client:component-hydration": "load", "client:component-path": "F:/Portofolio-NextJS-Acernity/src/components/footer", "client:component-export": "Footer" })} </main> ` })} ${renderScript($$result, "F:/Portofolio-NextJS-Acernity/src/pages/index.astro?astro&type=script&index=0&lang.ts")}`;
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
