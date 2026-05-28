"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles, Code2, Smartphone, Layers, Zap } from "lucide-react";
import { Iphone17ProFrame } from "@/components/ui/Iphone17ProFrame";
import { AppleButton } from "@/components/ui/AppleButton";

const stats = [
  { value: "12+", label: "Apps shipped" },
  { value: "100%", label: "Lighthouse" },
  { value: "<48h", label: "Reply time" },
  { value: "UK", label: "Reading, GB" },
];

const tabs = [
  { id: "hydration" as const, label: "Hydration", icon: Sparkles },
  { id: "insights" as const, label: "Insights", icon: Layers },
  { id: "alerts" as const, label: "Coach", icon: Zap },
];

type TabId = (typeof tabs)[number]["id"];

/**
 * Modern app/web-dev studio hero.
 * Headline, animated subtitle, CTAs, trust stats and a live interactive iPhone demo.
 */
export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState<TabId>("hydration");
  const shouldReduceMotion = useReducedMotion();

  // Auto-cycle tabs as a built-in micro-animation
  useEffect(() => {
    if (shouldReduceMotion) return;
    const id = setInterval(() => {
      setActiveTab((prev) => {
        const idx = tabs.findIndex((t) => t.id === prev);
        return tabs[(idx + 1) % tabs.length].id;
      });
    }, 5200);
    return () => clearInterval(id);
  }, [shouldReduceMotion]);

  return (
    <header
      ref={heroRef}
      id="top"
      className="relative isolate min-h-screen overflow-hidden pt-32 pb-20 md:pt-36 md:pb-28"
    >
      {/* Glow behind headline */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/3 -z-[1] h-[700px] w-[1100px] -translate-x-1/2 -translate-y-1/2 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(99,102,241,0.25) 0%, rgba(168,85,247,0.10) 30%, transparent 65%)",
          filter: "blur(40px)",
        }}
      />

      <div className="relative z-[2] mx-auto w-full max-w-[1240px] px-5 md:px-7">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          {/* Left side — copy */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            {/* Tag */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/[0.10] bg-white/[0.04] px-3 py-1.5 backdrop-blur-md"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-mint" />
              </span>
              <span className="text-[11.5px] font-medium tracking-tight text-ink-2">
                Booking briefs for Summer&nbsp;’26
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-[14ch] font-display text-[clamp(40px,5.2vw,72px)] font-bold leading-[0.98] tracking-[-0.035em] text-white"
            >
              We build apps
              people{" "}
              <span className="text-gradient inline-block">love opening.</span>
            </motion.h1>

            {/* Subhead */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="mt-7 max-w-[560px] text-[16px] leading-[1.65] text-ink-3 md:text-[18px]"
            >
              Flutterly is a boutique product studio designing and engineering
              <span className="text-white"> fast, beautiful web and mobile apps.</span> Built
              with Next.js, React, SwiftUI and Flutter — shipped with care, kept alive long after launch.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
            >
              <Link href="#brief" aria-label="Start a project">
                <AppleButton variant="primary" size="lg" className="group">
                  Start a project
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </AppleButton>
              </Link>
              <Link href="#work" aria-label="See our work">
                <AppleButton variant="glass" size="lg">
                  See our work
                </AppleButton>
              </Link>
            </motion.div>

            {/* Trust strip */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="mt-12 grid w-full max-w-md grid-cols-4 gap-4 border-t border-white/[0.06] pt-7 lg:max-w-lg"
            >
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.75 + i * 0.06, duration: 0.5 }}
                  className="flex flex-col items-center lg:items-start"
                >
                  <span className="font-display text-[20px] font-bold text-white md:text-[22px]">
                    {s.value}
                  </span>
                  <span className="mt-0.5 text-[11px] font-medium text-muted">{s.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right side — interactive iPhone */}
          <div className="relative flex flex-col items-center lg:items-end">
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-[280px] sm:w-[300px] lg:w-[320px]"
            >
              {/* Ambient device glow */}
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-16 -z-10 blur-3xl"
                animate={{
                  opacity: 0.7,
                  background:
                    activeTab === "hydration"
                      ? "radial-gradient(circle, rgba(99,102,241,0.32) 0%, transparent 70%)"
                      : activeTab === "insights"
                      ? "radial-gradient(circle, rgba(34,211,238,0.30) 0%, transparent 70%)"
                      : "radial-gradient(circle, rgba(236,72,153,0.30) 0%, transparent 70%)",
                }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              />

              {/* Floating chips */}
              <FloatingChip
                className="absolute -left-12 top-16 hidden md:flex"
                delay={1.2}
                icon={<Code2 className="h-3.5 w-3.5 text-violet" />}
              >
                Next.js · 16
              </FloatingChip>
              <FloatingChip
                className="absolute -right-8 top-44 hidden md:flex"
                delay={1.4}
                icon={<Smartphone className="h-3.5 w-3.5 text-cyan" />}
              >
                SwiftUI
              </FloatingChip>
              <FloatingChip
                className="absolute -left-8 bottom-32 hidden md:flex"
                delay={1.6}
                icon={<Zap className="h-3.5 w-3.5 text-fuchsia" />}
              >
                100/100 Lighthouse
              </FloatingChip>

              <Iphone17ProFrame className="shadow-[0_40px_120px_-20px_rgba(99,102,241,0.45)]">
                <div className="relative flex h-full w-full flex-col bg-[#050714] p-5 font-sans text-white">
                  {/* App header */}
                  <div className="mt-9 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                        Hydration
                      </span>
                      <span className="font-display text-[18px] font-bold tracking-tight">
                        Sipli
                      </span>
                    </div>
                    <motion.span
                      key={activeTab}
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="rounded-full border border-white/[0.08] bg-white/[0.05] px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-zinc-200 backdrop-blur"
                    >
                      Live
                    </motion.span>
                  </div>

                  {/* Tab screens */}
                  <div className="flex flex-grow flex-col justify-center overflow-hidden">
                    <AnimatePresence mode="wait">
                      {activeTab === "hydration" && (
                        <TabHydration key="hydration" />
                      )}
                      {activeTab === "insights" && <TabInsights key="insights" />}
                      {activeTab === "alerts" && <TabAlerts key="alerts" />}
                    </AnimatePresence>
                  </div>
                </div>
              </Iphone17ProFrame>
            </motion.div>

            {/* Tab switcher */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] p-1 backdrop-blur-md"
              role="tablist"
              aria-label="Live demo screens"
            >
              {tabs.map((tab) => {
                const active = activeTab === tab.id;
                const Icon = tab.icon;
                return (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    role="tab"
                    aria-selected={active}
                    aria-controls={`hero-demo-${tab.id}`}
                    whileTap={{ scale: 0.97 }}
                    className={`relative flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[11.5px] font-semibold tracking-tight transition-colors duration-300 ${
                      active ? "text-white" : "text-muted hover:text-white"
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="hero-tab-pill"
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-brand to-violet"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10 inline-flex items-center gap-1.5">
                      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                      {tab.label}
                    </span>
                  </motion.button>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </header>
  );
}

function FloatingChip({
  children,
  className = "",
  delay = 0,
  icon,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  icon?: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`animate-float z-10 items-center gap-2 rounded-full border border-white/[0.10] bg-[rgba(20,22,42,0.7)] px-3 py-1.5 text-[11px] font-semibold text-white shadow-[0_8px_24px_-8px_rgba(0,0,0,0.6)] backdrop-blur-md ${className}`}
    >
      {icon}
      <span>{children}</span>
    </motion.div>
  );
}

/* ── Phone tab screens ── */

function TabHydration() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.98 }}
      transition={{ type: "spring", stiffness: 200, damping: 25, mass: 0.8 }}
      className="flex flex-grow flex-col items-center justify-center py-6"
      id="hero-demo-hydration"
      role="tabpanel"
    >
      <div className="relative flex h-44 w-44 items-center justify-center rounded-full bg-gradient-to-br from-brand/15 to-violet/15">
        <div className="absolute inset-0 rounded-full border border-white/[0.05]" />
        <svg
          className="absolute inset-0 h-full w-full -rotate-90"
          viewBox="0 0 100 100"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="ring" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="60%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
          <circle
            cx="50"
            cy="50"
            r="42"
            className="fill-none stroke-white/[0.06]"
            strokeWidth="5"
          />
          <motion.circle
            cx="50"
            cy="50"
            r="42"
            stroke="url(#ring)"
            className="fill-none"
            strokeWidth="5"
            strokeLinecap="round"
            initial={{
              strokeDasharray: "263.89 263.89",
              strokeDashoffset: 263.89,
            }}
            animate={{ strokeDashoffset: 263.89 * (1 - 0.72) }}
            transition={{ type: "spring", stiffness: 40, damping: 15, delay: 0.2 }}
          />
        </svg>
        <div className="z-10 flex flex-col items-center">
          <motion.span
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="font-display text-[34px] font-extrabold tracking-tight"
          >
            72<span className="text-[16px] text-muted">%</span>
          </motion.span>
          <span className="mt-0.5 text-[9px] font-medium uppercase tracking-[0.16em] text-muted">
            1.8L of 2.5L
          </span>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        className="mt-8 inline-flex h-10 items-center gap-1.5 rounded-full bg-gradient-to-r from-brand to-violet px-5 text-[12px] font-bold text-white shadow-lg shadow-brand/30"
        aria-label="Add a drink"
      >
        + Add Drink
      </motion.button>
    </motion.div>
  );
}

function TabInsights() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.98 }}
      transition={{ type: "spring", stiffness: 200, damping: 25, mass: 0.8 }}
      className="flex flex-grow flex-col justify-center py-6"
      id="hero-demo-insights"
      role="tabpanel"
    >
      <span className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-muted">
        Weekly Intake
      </span>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
        }}
        className="flex h-28 items-end justify-between gap-1.5 px-2"
      >
        {[60, 80, 45, 95, 70, 85, 90].map((val, idx) => (
          <div
            key={idx}
            className="flex h-full flex-1 flex-col items-center justify-end gap-1.5"
          >
            <motion.div
              variants={{
                hidden: { height: 0, opacity: 0 },
                visible: {
                  height: `${val}%`,
                  opacity: 1,
                  transition: { type: "spring", stiffness: 120, damping: 16 },
                },
              }}
              className={`w-full rounded-t ${
                idx === 6
                  ? "bg-gradient-to-t from-cyan to-brand shadow-[0_0_18px_rgba(99,102,241,0.5)]"
                  : "bg-white/[0.10]"
              }`}
            />
            <span className="font-mono text-[8px] text-muted">
              {["M", "T", "W", "T", "F", "S", "S"][idx]}
            </span>
          </div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, type: "spring", stiffness: 100, damping: 16 }}
        className="mt-5 rounded-xl border border-white/[0.06] bg-white/[0.03] p-3 backdrop-blur"
      >
        <div className="font-mono text-[10px] uppercase text-muted">Streak</div>
        <div className="mt-0.5 text-sm font-bold text-white">14 days consistent</div>
      </motion.div>
    </motion.div>
  );
}

function TabAlerts() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.98 }}
      transition={{ type: "spring", stiffness: 200, damping: 25, mass: 0.8 }}
      className="flex flex-grow flex-col justify-center py-6"
      id="hero-demo-alerts"
      role="tabpanel"
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 18, delay: 0.1 }}
        className="flex flex-col gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-4 shadow-xl backdrop-blur"
      >
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-fuchsia opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-fuchsia" />
          </span>
          <span className="text-xs font-semibold text-white">Hydration Coach</span>
        </div>
        <p className="text-[12.5px] leading-relaxed text-ink-3">
          You&rsquo;re 250&thinsp;ml behind your 2&thinsp;PM checkpoint. A glass of water
          now keeps your afternoon energy steady.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 18, delay: 0.25 }}
        className="mt-4 flex items-center justify-between rounded-2xl border border-fuchsia/30 bg-fuchsia/[0.10] p-4"
      >
        <div>
          <div className="font-mono text-[10px] uppercase tracking-wide text-fuchsia">
            Quick Add
          </div>
          <div className="mt-0.5 text-sm font-semibold text-white">250&thinsp;ml Glass</div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-fuchsia to-violet font-bold text-white"
          aria-label="Quick add water"
        >
          +
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
