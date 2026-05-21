"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Iphone17ProFrame } from "@/components/ui/Iphone17ProFrame";
import { AppleButton } from "@/components/ui/AppleButton";

const ledger = [
  { k: "Studio", v: "Flutterly Ltd" },
  { k: "Est.", v: "Reading, UK · 2024" },
  { k: "Focus", v: "High-Performance Apps" },
];

/**
 * An ultra-premium Hero section designed with Apple Pro aesthetics.
 * Features:
 * - A dynamic interactive background canvas painting neon fluid waves.
 * - Technical hardware specs ledger.
 * - Pure high-contrast geometric typography.
 * - An interactive, pixel-perfect floating iPhone 17 Pro simulation displaying a custom live-updating app interface.
 */
export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState<"hydration" | "insights" | "alerts">("hydration");

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
    
    // Cool Apple neon blue-green spectrum
    const hueBase = 215; 
    const intensity = 0.65;

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
      t += 0.005;
      mouseX += (tMouseX - mouseX) * 0.06;
      mouseY += (tMouseY - mouseY) * 0.06;

      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "rgba(0,0,0,0.15)";
      ctx.fillRect(0, 0, W, H);

      ctx.globalCompositeOperation = "screen";

      const cx = mouseX * W;
      const cy = mouseY * H;

      // Primary Blue Neon Sun
      const r1 = 400 + Math.sin(t * 0.5) * 50;
      const g1 = ctx.createRadialGradient(cx, cy, 0, cx, cy, r1);
      g1.addColorStop(0, hsla(hueBase, 90, 50, 0.22 * intensity));
      g1.addColorStop(0.5, hsla(hueBase + 20, 85, 45, 0.08 * intensity));
      g1.addColorStop(1, hsla(hueBase, 80, 40, 0));
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, W, H);

      // Secondary Emerald Green echo
      const ox = W * (0.8 - mouseX * 0.6) + Math.cos(t) * 80;
      const oy = H * (0.8 - mouseY * 0.5) + Math.sin(t * 1.1) * 50;
      const r2 = 350 + Math.cos(t * 0.4) * 60;
      const g2 = ctx.createRadialGradient(ox, oy, 0, ox, oy, r2);
      const h2 = (hueBase + 120) % 360; // Shift to Emerald green
      g2.addColorStop(0, hsla(h2, 85, 48, 0.14 * intensity));
      g2.addColorStop(1, hsla(h2, 80, 40, 0));
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, W, H);

      // Drifting subtle glowing nodes
      for (let i = 0; i < 3; i++) {
        const a = i * 2.0 + t * 0.3;
        const x = W * 0.5 + Math.cos(a) * W * 0.28 + (mouseX - 0.5) * 50 * (i + 1);
        const y = H * 0.5 + Math.sin(a * 1.2) * H * 0.24 + (mouseY - 0.5) * 30 * (i + 1);
        const r = 200 + i * 40;
        const gi = ctx.createRadialGradient(x, y, 0, x, y, r);
        const hh = (hueBase + i * 15) % 360;
        gi.addColorStop(0, hsla(hh, 90, 50, 0.06 * intensity));
        gi.addColorStop(1, hsla(hh, 80, 40, 0));
        ctx.fillStyle = gi;
        ctx.fillRect(0, 0, W, H);
      }

      // technical flow grid lines
      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = hsla(hueBase, 40, 20, 0.05 * intensity);
      ctx.lineWidth = 1;
      const step = 64;
      ctx.beginPath();
      for (let x = 0; x < W; x += step) {
        for (let y = 0; y < H; y += step) {
          const dx = x - cx;
          const dy = y - cy;
          const d = Math.sqrt(dx * dx + dy * dy);
          const ang = Math.atan2(dy, dx) + Math.sin(d * 0.002 - t) * 0.5 + t * 0.15;
          const len = 18 + Math.sin(d * 0.008 - t * 1.1) * 8;
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

  return (
    <header
      ref={heroRef}
      id="top"
      className="relative min-h-screen overflow-hidden bg-black pb-12 pt-[130px] isolate"
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-60"
      />
      {/* background vignette overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(circle at 50% 30%, transparent 10%, rgba(0,0,0,0.85) 80%)",
        }}
      />

      <div className="relative z-[2] mx-auto w-full max-w-[1240px] px-5 md:px-7">
        {/* Ledger Grid */}
        <div className="mb-14 grid grid-cols-2 gap-5 border-b border-white/5 pb-5 pt-2 md:mb-16 md:grid-cols-4">
          {ledger.map((cell) => (
            <div key={cell.k} className="flex flex-col gap-1">
              <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-zinc-500">
                {cell.k}
              </span>
              <span className="text-[12px] font-medium text-zinc-300">{cell.v}</span>
            </div>
          ))}
          <div className="flex flex-col gap-1">
            <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-zinc-500">
              Availability
            </span>
            <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-zinc-300">
              <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-[var(--accent)]" />
              Taking Briefs · Summer &rsquo;26
            </span>
          </div>
        </div>

        {/* Hero Title & Subtitle */}
        <div className="text-center md:text-left">
          <h1 className="font-sans text-[clamp(44px,7.8vw,104px)] font-bold leading-[0.96] tracking-[-0.04em] text-white">
            <span className="block">Apps that feel</span>
            <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-200 to-emerald-300">
              instantly familiar.
            </span>
          </h1>
          <p className="mt-6 max-w-[620px] text-[16px] leading-[1.6] text-zinc-400 md:text-[18px]">
            Flutterly is a boutique product studio designing and engineering polished web and mobile
            experiences with the precision, responsiveness, and restraint people expect from their daily tools.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 md:justify-start">
            <Link href="#brief">
              <AppleButton variant="primary" className="shadow-2xl shadow-blue-500/20">
                Start a project
              </AppleButton>
            </Link>
            <Link
              href="#work"
              className="inline-flex items-center gap-1.5 py-3 pr-2 pl-2 text-sm font-medium text-zinc-300 transition-colors hover:text-white"
            >
              See our ships ↓
            </Link>
          </div>
        </div>

        {/* Centerpiece Showcase: High-Precision Interactive iPhone Pro */}
        <div className="mt-16 grid items-center gap-12 md:mt-24 md:grid-cols-[1fr_1.1fr]">
          <div className="flex flex-col gap-6 text-center md:text-left">
            <div className="inline-flex items-center gap-2 self-center rounded-full bg-white/5 px-3 py-1 text-[11px] font-medium tracking-wide text-zinc-400 border border-white/5 md:self-start">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-2)]" />
              Interactive Prototype
            </div>
            <h3 className="font-sans text-2xl font-bold tracking-tight text-white md:text-4xl">
              Simulated Experience
            </h3>
            <p className="text-[14px] leading-[1.6] text-zinc-400">
              Tap the buttons below to switch screens inside the iPhone 17 Pro device container. 
              We build using high-performance frameworks so interactive systems react instantly.
            </p>

            <div className="flex flex-wrap justify-center gap-2.5 md:justify-start">
              {[
                { id: "hydration", label: "Hydration" },
                { id: "insights", label: "Insights" },
                { id: "alerts", label: "Coach" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition-all border cursor-pointer ${
                    activeTab === tab.id
                      ? "bg-white text-black border-white shadow-xl"
                      : "bg-white/5 text-zinc-400 border-white/5 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* iPhone Frame Container */}
          <div className="relative flex justify-center">
            {/* Ambient behind-device glow */}
            <div
              className="pointer-events-none absolute -inset-4 opacity-40 blur-3xl transition-all duration-1000"
              style={{
                background:
                  activeTab === "hydration"
                    ? "radial-gradient(circle, rgba(0, 113, 227, 0.3) 0%, transparent 70%)"
                    : activeTab === "insights"
                    ? "radial-gradient(circle, rgba(48, 209, 88, 0.25) 0%, transparent 70%)"
                    : "radial-gradient(circle, rgba(255, 159, 10, 0.25) 0%, transparent 70%)",
              }}
            />

            <Iphone17ProFrame className="shadow-2xl scale-[0.9] sm:scale-100 transition-transform duration-500">
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
                  <span className="rounded-full bg-blue-500/10 px-2.5 py-1 text-[9px] font-bold text-blue-400 border border-blue-500/10">
                    Active
                  </span>
                </div>

                {/* Tab Switch screens with AnimatePresence and Spring transitions */}
                <div className="flex-grow flex flex-col justify-center overflow-hidden">
                  <AnimatePresence mode="wait">
                    {activeTab === "hydration" && (
                      <motion.div
                        key="hydration"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ type: "spring", stiffness: 180, damping: 18 }}
                        className="flex-grow flex flex-col justify-center items-center py-6"
                      >
                        {/* Circle Indicator */}
                        <div className="relative flex h-40 w-40 items-center justify-center rounded-full bg-blue-500/5 shadow-2xl">
                          {/* Inner glowing pulse */}
                          <div className="absolute inset-2 rounded-full bg-blue-500/2 animate-pulse" />
                          {/* Outer thin ring */}
                          <div className="absolute inset-0 rounded-full border border-white/5" />
                          
                          {/* Premium SVG Circular progress ring */}
                          <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 100 100">
                            {/* Background Track */}
                            <circle
                              cx="50"
                              cy="50"
                              r="42"
                              className="stroke-blue-500/10 fill-none"
                              strokeWidth="4"
                            />
                            {/* Animated Active Segment */}
                            <motion.circle
                              cx="50"
                              cy="50"
                              r="42"
                              className="stroke-blue-400 fill-none"
                              strokeWidth="4"
                              strokeLinecap="round"
                              initial={{ strokeDasharray: "263.89 263.89", strokeDashoffset: 263.89 }}
                              animate={{ strokeDashoffset: 263.89 * (1 - 0.72) }}
                              transition={{ type: "spring", stiffness: 60, damping: 15, delay: 0.15 }}
                            />
                          </svg>

                          <div className="flex flex-col items-center z-10">
                            <span className="text-3xl font-extrabold tracking-tight">72%</span>
                            <span className="text-[9px] font-medium uppercase tracking-wider text-zinc-400 mt-0.5">
                              1.8L of 2.5L
                            </span>
                          </div>
                        </div>

                        {/* Action button */}
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="mt-8 flex h-10 w-32 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white shadow-lg shadow-blue-500/20 active:scale-95 transition-transform cursor-pointer"
                        >
                          + Add Drink
                        </motion.button>
                      </motion.div>
                    )}

                    {activeTab === "insights" && (
                      <motion.div
                        key="insights"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ type: "spring", stiffness: 180, damping: 18 }}
                        className="flex-grow flex flex-col justify-center py-6"
                      >
                        <span className="text-xs font-bold text-zinc-400 mb-3">Weekly Intake</span>
                        
                        {/* Staggered Vertical Bar Chart */}
                        <motion.div
                          initial="hidden"
                          animate="visible"
                          variants={{
                            hidden: { opacity: 0 },
                            visible: {
                              opacity: 1,
                              transition: {
                                staggerChildren: 0.05,
                              },
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
                                    transition: { type: "spring", stiffness: 150, damping: 14 }
                                  }
                                }}
                                className={`w-full rounded-t-sm ${
                                  idx === 6 ? "bg-emerald-400 shadow-md shadow-emerald-400/25" : "bg-zinc-700/80"
                                }`}
                              />
                              <span className="text-[8px] font-mono text-zinc-500">
                                {["M", "T", "W", "T", "F", "S", "S"][idx]}
                              </span>
                            </div>
                          ))}
                        </motion.div>

                        {/* Slide-in Streak Info */}
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.25, type: "spring", stiffness: 120, damping: 14 }}
                          className="mt-5 rounded-xl bg-zinc-900/60 p-3 border border-white/5"
                        >
                          <div className="text-[10px] text-zinc-500 uppercase font-mono">Streak</div>
                          <div className="text-sm font-bold text-white mt-0.5">14 Days Consistent</div>
                        </motion.div>
                      </motion.div>
                    )}

                    {activeTab === "alerts" && (
                      <motion.div
                        key="alerts"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ type: "spring", stiffness: 180, damping: 18 }}
                        className="flex-grow flex flex-col justify-center py-6"
                      >
                        {/* Slide from Left for Coach */}
                        <motion.div
                          initial={{ opacity: 0, x: -15 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ type: "spring", stiffness: 130, damping: 15, delay: 0.05 }}
                          className="rounded-2xl bg-zinc-900/80 p-4 border border-white/5 shadow-xl flex flex-col gap-3"
                        >
                          <div className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
                            <span className="text-[9px] font-bold text-amber-400 uppercase tracking-widest">
                              Smart Coach
                            </span>
                          </div>
                          <p className="text-xs leading-relaxed text-zinc-300">
                            &ldquo;You are tracking slightly behind your usual afternoon pace. Take a glass of water now to maintain optimal focus.&rdquo;
                          </p>
                        </motion.div>
                        
                        {/* Slide from Right for Tip */}
                        <motion.div
                          initial={{ opacity: 0, x: 15 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ type: "spring", stiffness: 120, damping: 14, delay: 0.18 }}
                          className="mt-4 rounded-2xl bg-blue-500/10 p-4 border border-blue-500/5 shadow-xl flex flex-col gap-1.5"
                        >
                          <span className="text-[9px] font-mono uppercase text-zinc-500">Hydration Tip</span>
                          <span className="text-xs text-white font-medium">Drinking early boosts focus.</span>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Footer simulation */}
                <div className="mt-auto border-t border-zinc-900 pt-3 flex justify-between text-[8px] text-zinc-500 font-mono">
                  <span>Device: Watch Ultra</span>
                  <span>Sync: Just Now</span>
                </div>
              </div>
            </Iphone17ProFrame>
          </div>
        </div>
      </div>
    </header>
  );
}
