"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Iphone17ProFrame } from "@/components/ui/Iphone17ProFrame";
import { AppleButton } from "@/components/ui/AppleButton";
import { FloatingTechBadges } from "@/components/ui/FloatingTechBadges";
import { AnimatedCodeBlock } from "@/components/ui/AnimatedCodeBlock";
import { TechMarquee } from "@/components/ui/TechMarquee";

const ledger = [
  { k: "Studio", v: "Flutterly Ltd" },
  { k: "Est.", v: "Reading, UK · 2024" },
  { k: "Focus", v: "High-Performance Apps" },
];

// Apple-style spring configuration
const springConfig = {
  type: "spring" as const,
  stiffness: 100,
  damping: 20,
  mass: 1,
};

const smoothSpring = {
  type: "spring" as const,
  stiffness: 60,
  damping: 20,
  mass: 0.8,
};

/**
 * An ultra-premium Hero section designed with Apple Pro aesthetics.
 * Features fluid animations, Apple-style typography reveals, and polished interactions.
 */
export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState<"hydration" | "insights" | "alerts">("hydration");
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const cv = canvasRef.current;
    const hero = heroRef.current;
    if (!cv || !hero) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    let W = 0, H = 0;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    let mouseX = 0.5, mouseY = 0.3, tMouseX = 0.5, tMouseY = 0.3;
    let t = 0;
    let running = true;
    let raf = 0;
    
    const hueBase = 215; 
    const intensity = 0.55;

    const resize = () => {
      const r = hero.getBoundingClientRect();
      W = Math.floor(r.width);
      H = Math.floor(r.height);
      cv.width = W * DPR;
      cv.height = H * DPR;
      cv.style.width = `${W}px`;
      cv.style.height = `${H}px`;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };
    resize();

    const onResize = () => resize();
    window.addEventListener("resize", onResize);

    const onMove = (e: MouseEvent) => {
      const r = hero.getBoundingClientRect();
      tMouseX = (e.clientX - r.left) / r.width;
      tMouseY = (e.clientY - r.top) / r.height;
    };
    const onLeave = () => {
      tMouseX = 0.5;
      tMouseY = 0.3;
    };
    hero.addEventListener("mousemove", onMove);
    hero.addEventListener("mouseleave", onLeave);

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => (running = e.isIntersecting)),
      { threshold: 0 }
    );
    io.observe(hero);

    const hsla = (h: number, s: number, l: number, a: number) =>
      `hsla(${h} ${s}% ${l}% / ${a})`;

    const frame = () => {
      raf = requestAnimationFrame(frame);
      if (!running || W === 0 || H === 0) return;
      t += 0.004;
      mouseX += (tMouseX - mouseX) * 0.04;
      mouseY += (tMouseY - mouseY) * 0.04;

      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "rgba(0,0,0,0.12)";
      ctx.fillRect(0, 0, W, H);

      ctx.globalCompositeOperation = "screen";

      const cx = mouseX * W;
      const cy = mouseY * H;

      // Primary Blue Neon Sun
      const r1 = 450 + Math.sin(t * 0.4) * 60;
      const g1 = ctx.createRadialGradient(cx, cy, 0, cx, cy, r1);
      g1.addColorStop(0, hsla(hueBase, 85, 55, 0.18 * intensity));
      g1.addColorStop(0.4, hsla(hueBase + 15, 80, 48, 0.08 * intensity));
      g1.addColorStop(1, hsla(hueBase, 75, 40, 0));
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, W, H);

      // Secondary Emerald Green echo
      const ox = W * (0.8 - mouseX * 0.5) + Math.cos(t * 0.8) * 100;
      const oy = H * (0.75 - mouseY * 0.4) + Math.sin(t * 0.9) * 60;
      const r2 = 400 + Math.cos(t * 0.35) * 70;
      const g2 = ctx.createRadialGradient(ox, oy, 0, ox, oy, r2);
      const h2 = (hueBase + 125) % 360;
      g2.addColorStop(0, hsla(h2, 80, 50, 0.1 * intensity));
      g2.addColorStop(1, hsla(h2, 75, 42, 0));
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, W, H);

      // Subtle ambient nodes
      for (let i = 0; i < 2; i++) {
        const a = i * 2.2 + t * 0.25;
        const x = W * 0.5 + Math.cos(a) * W * 0.3 + (mouseX - 0.5) * 40 * (i + 1);
        const y = H * 0.5 + Math.sin(a * 1.15) * H * 0.26 + (mouseY - 0.5) * 25 * (i + 1);
        const r = 220 + i * 50;
        const gi = ctx.createRadialGradient(x, y, 0, x, y, r);
        const hh = (hueBase + i * 20) % 360;
        gi.addColorStop(0, hsla(hh, 85, 52, 0.05 * intensity));
        gi.addColorStop(1, hsla(hh, 75, 42, 0));
        ctx.fillStyle = gi;
        ctx.fillRect(0, 0, W, H);
      }

      // Minimal grid lines
      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = hsla(hueBase, 30, 20, 0.03 * intensity);
      ctx.lineWidth = 1;
      const step = 80;
      ctx.beginPath();
      for (let x = 0; x < W; x += step) {
        for (let y = 0; y < H; y += step) {
          const dx = x - cx;
          const dy = y - cy;
          const d = Math.sqrt(dx * dx + dy * dy);
          const ang = Math.atan2(dy, dx) + Math.sin(d * 0.0015 - t) * 0.4 + t * 0.1;
          const len = 14 + Math.sin(d * 0.006 - t * 0.9) * 6;
          ctx.moveTo(x, y);
          ctx.lineTo(x + Math.cos(ang) * len, y + Math.sin(ang) * len);
        }
      }
      ctx.stroke();
    };
    frame();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      hero.removeEventListener("mousemove", onMove);
      hero.removeEventListener("mouseleave", onLeave);
      io.disconnect();
    };
  }, []);

  // Staggered animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      filter: "blur(10px)",
    },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: "blur(0px)",
      transition: {
        ...smoothSpring,
        duration: 0.8,
      },
    },
  };

  const titleVariants = {
    hidden: { 
      opacity: 0, 
      y: 40,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        ...springConfig,
        duration: 1,
      },
    },
  };

  return (
    <header
      ref={heroRef}
      id="top"
      className="relative min-h-screen overflow-hidden bg-black pb-16 pt-[130px] isolate"
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-50"
      />
      {/* Refined vignette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 120% 80% at 50% 20%, transparent 0%, rgba(0,0,0,0.7) 70%, rgba(0,0,0,0.95) 100%)",
        }}
      />

      <motion.div 
        className="relative z-[2] mx-auto w-full max-w-[1240px] px-5 md:px-7"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Ledger Grid */}
        <motion.div 
          className="mb-14 grid grid-cols-2 gap-5 border-b border-white/[0.06] pb-6 pt-2 md:mb-16 md:grid-cols-4"
          variants={itemVariants}
        >
          {ledger.map((cell, index) => (
            <motion.div 
              key={cell.k} 
              className="flex flex-col gap-1.5"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: 0.2 + index * 0.08,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">
                {cell.k}
              </span>
              <span className="text-[13px] font-medium text-zinc-300">{cell.v}</span>
            </motion.div>
          ))}
          <motion.div 
            className="flex flex-col gap-1.5"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: 0.44,
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">
              Availability
            </span>
            <span className="inline-flex items-center gap-2 text-[13px] font-medium text-zinc-300">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent)]" />
              </span>
              Taking Briefs · Summer &rsquo;26
            </span>
          </motion.div>
        </motion.div>

        {/* Hero Title & Subtitle */}
        <div className="text-center md:text-left">
          <motion.h1 
            className="font-sans text-[clamp(42px,7.5vw,98px)] font-bold leading-[0.94] tracking-[-0.035em] text-white"
            variants={titleVariants}
          >
            <motion.span 
              className="block"
              initial={{ opacity: 0, y: 50, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ 
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.3,
              }}
            >
              Apps that feel
            </motion.span>
            <motion.span 
              className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-emerald-300"
              initial={{ opacity: 0, y: 50, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ 
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.45,
              }}
            >
              instantly familiar.
            </motion.span>
          </motion.h1>
          
          <motion.p 
            className="mt-7 max-w-[580px] text-[16px] leading-[1.65] text-zinc-400 md:text-[17px]"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.6,
            }}
          >
            Flutterly is a boutique product studio designing and engineering polished web and mobile
            experiences with the precision, responsiveness, and restraint people expect from their daily tools.
          </motion.p>
          
          <motion.div 
            className="mt-9 flex flex-wrap items-center justify-center gap-4 md:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.75,
            }}
          >
            <Link href="#brief">
              <AppleButton variant="primary" className="shadow-2xl shadow-blue-500/15">
                Start a project
              </AppleButton>
            </Link>
            <Link
              href="#work"
              className="group inline-flex items-center gap-2 py-3 pr-3 pl-3 text-sm font-medium text-zinc-400 transition-all duration-300 hover:text-white"
            >
              See our ships
              <motion.span
                className="text-zinc-500 transition-colors group-hover:text-white"
                animate={{ y: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                ↓
              </motion.span>
            </Link>
          </motion.div>
        </div>

        {/* Centerpiece Showcase: High-Precision Interactive iPhone Pro */}
        <motion.div 
          className="mt-20 grid items-center gap-12 md:mt-28 md:grid-cols-[1fr_1.1fr]"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.9,
          }}
        >
          <div className="flex flex-col gap-6 text-center md:text-left">
            <motion.div 
              className="inline-flex items-center gap-2.5 self-center rounded-full bg-white/[0.04] px-3.5 py-1.5 text-[11px] font-medium tracking-wide text-zinc-400 border border-white/[0.06] backdrop-blur-sm md:self-start"
              whileHover={{ 
                backgroundColor: "rgba(255, 255, 255, 0.06)",
                borderColor: "rgba(255, 255, 255, 0.1)",
              }}
              transition={{ duration: 0.3 }}
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent-2)] opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--accent-2)]" />
              </span>
              Interactive Prototype
            </motion.div>
            
            <h3 className="font-sans text-2xl font-bold tracking-tight text-white md:text-[32px]">
              Simulated Experience
            </h3>
            <p className="text-[14px] leading-[1.65] text-zinc-400">
              Tap the buttons below to switch screens inside the iPhone 17 Pro device container. 
              We build using high-performance frameworks so interactive systems react instantly.
            </p>

            <div className="flex flex-wrap justify-center gap-2.5 md:justify-start">
              {[
                { id: "hydration", label: "Hydration" },
                { id: "insights", label: "Insights" },
                { id: "alerts", label: "Coach" },
              ].map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as "hydration" | "insights" | "alerts")}
                  className={`relative rounded-full px-5 py-2.5 text-xs font-semibold tracking-wide transition-all duration-300 cursor-pointer overflow-hidden ${
                    activeTab === tab.id
                      ? "bg-white text-black shadow-lg shadow-white/10"
                      : "bg-white/[0.04] text-zinc-400 border border-white/[0.06] hover:bg-white/[0.08] hover:text-white hover:border-white/10"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  {activeTab === tab.id && (
                    <motion.span
                      layoutId="active-tab-pill"
                      className="absolute inset-0 bg-white rounded-full"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* iPhone Frame Container */}
          <div className="relative flex justify-center">
            {/* Ambient behind-device glow */}
            <motion.div
              className="pointer-events-none absolute -inset-8 blur-3xl"
              animate={{
                opacity: 0.35,
                background:
                  activeTab === "hydration"
                    ? "radial-gradient(circle, rgba(0, 113, 227, 0.25) 0%, transparent 70%)"
                    : activeTab === "insights"
                    ? "radial-gradient(circle, rgba(48, 209, 88, 0.2) 0%, transparent 70%)"
                    : "radial-gradient(circle, rgba(255, 159, 10, 0.2) 0%, transparent 70%)",
              }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            />

            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                duration: 1.2,
                ease: [0.22, 1, 0.36, 1],
                delay: 1,
              }}
            >
              <Iphone17ProFrame className="shadow-2xl shadow-black/50">
                {/* App Screen Simulation */}
                <div className="relative flex h-full w-full flex-col bg-[#050B14] p-5 text-white font-sans">
                  {/* Header */}
                  <div className="mt-8 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-medium text-zinc-500 uppercase tracking-widest">
                        Hydration
                      </span>
                      <span className="text-[16px] font-bold tracking-tight">Sipli</span>
                    </div>
                    <motion.span 
                      className="rounded-full bg-blue-500/10 px-2.5 py-1 text-[9px] font-bold text-blue-400 border border-blue-500/10"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.3, duration: 0.4 }}
                    >
                      Active
                    </motion.span>
                  </div>

                  {/* Tab Switch screens */}
                  <div className="flex-grow flex flex-col justify-center overflow-hidden">
                    <AnimatePresence mode="wait">
                      {activeTab === "hydration" && (
                        <motion.div
                          key="hydration"
                          initial={{ opacity: 0, y: 20, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -20, scale: 0.98 }}
                          transition={{ 
                            type: "spring", 
                            stiffness: 200, 
                            damping: 25,
                            mass: 0.8,
                          }}
                          className="flex-grow flex flex-col justify-center items-center py-6"
                        >
                          {/* Circle Indicator */}
                          <div className="relative flex h-40 w-40 items-center justify-center rounded-full bg-blue-500/5">
                            <div className="absolute inset-0 rounded-full border border-white/[0.04]" />
                            
                            <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 100 100">
                              <circle
                                cx="50"
                                cy="50"
                                r="42"
                                className="stroke-blue-500/10 fill-none"
                                strokeWidth="4"
                              />
                              <motion.circle
                                cx="50"
                                cy="50"
                                r="42"
                                className="stroke-blue-400 fill-none"
                                strokeWidth="4"
                                strokeLinecap="round"
                                initial={{ strokeDasharray: "263.89 263.89", strokeDashoffset: 263.89 }}
                                animate={{ strokeDashoffset: 263.89 * (1 - 0.72) }}
                                transition={{ 
                                  type: "spring", 
                                  stiffness: 40, 
                                  damping: 15, 
                                  delay: 0.2,
                                }}
                              />
                            </svg>

                            <div className="flex flex-col items-center z-10">
                              <motion.span 
                                className="text-3xl font-extrabold tracking-tight"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                              >
                                72%
                              </motion.span>
                              <span className="text-[9px] font-medium uppercase tracking-wider text-zinc-400 mt-0.5">
                                1.8L of 2.5L
                              </span>
                            </div>
                          </div>

                          <motion.button
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.96 }}
                            className="mt-8 flex h-10 w-32 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white shadow-lg shadow-blue-500/20 cursor-pointer"
                            transition={{ duration: 0.2 }}
                          >
                            + Add Drink
                          </motion.button>
                        </motion.div>
                      )}

                      {activeTab === "insights" && (
                        <motion.div
                          key="insights"
                          initial={{ opacity: 0, y: 20, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -20, scale: 0.98 }}
                          transition={{ 
                            type: "spring", 
                            stiffness: 200, 
                            damping: 25,
                            mass: 0.8,
                          }}
                          className="flex-grow flex flex-col justify-center py-6"
                        >
                          <span className="text-xs font-bold text-zinc-400 mb-3">Weekly Intake</span>
                          
                          <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={{
                              hidden: { opacity: 0 },
                              visible: {
                                opacity: 1,
                                transition: { staggerChildren: 0.06 },
                              },
                            }}
                            className="flex items-end justify-between h-28 px-2 gap-1.5"
                          >
                            {[60, 80, 45, 95, 70, 85, 90].map((val, idx) => (
                              <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                                <motion.div
                                  variants={{
                                    hidden: { height: 0, opacity: 0 },
                                    visible: {
                                      height: `${val}%`,
                                      opacity: 1,
                                      transition: { 
                                        type: "spring", 
                                        stiffness: 120, 
                                        damping: 16,
                                      },
                                    },
                                  }}
                                  className={`w-full rounded-t ${
                                    idx === 6 ? "bg-emerald-400 shadow-md shadow-emerald-400/25" : "bg-zinc-700/80"
                                  }`}
                                />
                                <span className="text-[8px] font-mono text-zinc-500">
                                  {["M", "T", "W", "T", "F", "S", "S"][idx]}
                                </span>
                              </div>
                            ))}
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, type: "spring", stiffness: 100, damping: 16 }}
                            className="mt-5 rounded-xl bg-zinc-900/60 p-3 border border-white/[0.04]"
                          >
                            <div className="text-[10px] text-zinc-500 uppercase font-mono">Streak</div>
                            <div className="text-sm font-bold text-white mt-0.5">14 Days Consistent</div>
                          </motion.div>
                        </motion.div>
                      )}

                      {activeTab === "alerts" && (
                        <motion.div
                          key="alerts"
                          initial={{ opacity: 0, y: 20, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -20, scale: 0.98 }}
                          transition={{ 
                            type: "spring", 
                            stiffness: 200, 
                            damping: 25,
                            mass: 0.8,
                          }}
                          className="flex-grow flex flex-col justify-center py-6"
                        >
                          <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ type: "spring", stiffness: 120, damping: 18, delay: 0.1 }}
                            className="rounded-2xl bg-zinc-900/80 p-4 border border-white/[0.04] shadow-xl flex flex-col gap-3"
                          >
                            <div className="flex items-center gap-2">
                              <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-400" />
                              </span>
                              <span className="text-xs font-semibold text-white">Hydration Coach</span>
                            </div>
                            <p className="text-[13px] leading-relaxed text-zinc-300">
                              You&rsquo;re 250ml behind your 2PM checkpoint. A glass of water now keeps your afternoon energy steady.
                            </p>
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ type: "spring", stiffness: 120, damping: 18, delay: 0.25 }}
                            className="mt-4 rounded-2xl bg-blue-500/10 p-4 border border-blue-500/10 flex items-center justify-between"
                          >
                            <div>
                              <div className="text-[10px] text-blue-400 uppercase font-mono tracking-wide">Quick Add</div>
                              <div className="text-sm font-semibold text-white mt-0.5">250ml Glass</div>
                            </div>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="h-9 w-9 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold cursor-pointer"
                            >
                              +
                            </motion.button>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </Iphone17ProFrame>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </header>
  );
}
