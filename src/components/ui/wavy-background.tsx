"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";
import { createNoise3D } from "simplex-noise";

export const WavyBackground = ({
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
}: {
  children?: any;
  className?: string;
  containerClassName?: string;
  colors?: string[];
  waveWidth?: number;
  backgroundFill?: string;
  blur?: number;
  speed?: "slow" | "fast";
  waveOpacity?: number;
  [key: string]: any;
}) => {
  const [mounted, setMounted] = useState(false);
  const noise = createNoise3D();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const getSpeed = () => {
    switch (speed) {
      case "slow":
        return 0.0008;
      case "fast":
        return 0.0015;
      default:
        return 0.001;
    }
  };

  const waveColors = colors ?? [
    "#7caac2",
    "#2b6684",
    "#1a2328",
    "#4f8eaf",
    "#d9e9f6",
    "#0a3a52",
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

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let nt = 0;
    let animationId: number;
    let isVisible = true;

    const drawWave = (n: number) => {
      if (!ctx) return;
      nt += getSpeed();
      for (let i = 0; i < n; i++) {
        ctx.beginPath();
        ctx.lineWidth = waveWidth || 45;
        ctx.strokeStyle = waveColors[i % waveColors.length];
        // x += 12 step for 60% reduction in per-frame CPU calculations
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

    // Pause canvas animation loop when hero component is scrolled out of view
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

  return (
    <div
      ref={containerRef}
      className={cn(
        "h-screen flex flex-col items-center justify-center relative overflow-hidden",
        containerClassName
      )}
    >
      <canvas
        className="absolute inset-0 z-0 pointer-events-none gpu-accelerated"
        ref={canvasRef}
        id="canvas"
        style={{
          filter: `blur(${blur}px)`,
          WebkitFilter: `blur(${blur}px)`,
          transform: "translateZ(0)",
        }}
      ></canvas>
      <div className={cn("relative z-10", className)} {...props}>
        {children}
      </div>
    </div>
  );
};

