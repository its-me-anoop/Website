"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  m as motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowRight, Code2, Smartphone, Layers, Zap, Sparkles } from "lucide-react";
import { PhoneFrame } from "@/components/ui/PhoneFrame";
import { Button } from "@/components/ui/Button";
import { LiquidGlass } from "@/components/ui/LiquidGlass";

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

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Portfolio hero — an Apple-style, centered, type-led opening followed by a
 * scroll-scrubbed live product demo (Sipli on an iPhone) that scales and
 * settles into place as it enters the viewport.
 */
export function Hero() {
  const [activeTab, setActiveTab] = useState<TabId>("hydration");
  const reduce = useReducedMotion();

  // Scroll-scrub: the phone grows from 92% → 100% and parallaxes upward.
  const phoneRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: phoneRef,
    offset: ["start end", "center center"],
  });
  const phoneScale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);
  const phoneY = useTransform(scrollYProgress, [0, 1], [40, 0]);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => {
      setActiveTab((prev) => {
        const idx = tabs.findIndex((t) => t.id === prev);
        return tabs[(idx + 1) % tabs.length].id;
      });
    }, 5200);
    return () => clearInterval(id);
  }, [reduce]);

  // Entrance animations render statically for reduced-motion users — Framer
  // ignores the CSS reduced-motion overrides, so we must gate in JS.
  const enter = <T extends object>(props: T): T | Record<string, never> =>
    reduce ? {} : props;

  return (
    <header
      id="top"
      className="relative isolate overflow-hidden px-[var(--gutter)] pt-36 pb-16 md:pt-44 md:pb-24"
    >
      <div className="mx-auto flex w-full max-w-[1000px] flex-col items-center text-center">
        {/* Availability */}
        <motion.div
          {...enter({
            initial: { opacity: 0, y: 10 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.6, ease },
          })}
          className="mb-7 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green opacity-70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green" />
          </span>
          <span className="text-[12px] font-medium text-ink-2">
            Booking briefs for Summer&nbsp;’26
          </span>
        </motion.div>

        {/* Name */}
        <motion.p
          {...enter({
            initial: { opacity: 0, y: 14 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.7, delay: 0.05, ease },
          })}
          className="text-[15px] font-semibold uppercase tracking-[0.18em] text-muted"
        >
          Anoop Jose · Developer &amp; Designer
        </motion.p>

        {/* Headline — refracted through a draggable, gently drifting glass lens */}
        <LiquidGlass
          className="mt-5 w-full py-3"
          radius="var(--r-xl)"
          shape={{ width: 220, height: 132, radius: 60, depth: 32, curvature: 1.5 }}
          optics={{ scale: 52, chroma: 0.26 }}
          highlight={0.5}
          smoothing={0.14}
        >
          <motion.h1
            {...enter({
              initial: { opacity: 0, y: 26, filter: "blur(12px)" },
              animate: { opacity: 1, y: 0, filter: "blur(0px)" },
              transition: { duration: 1, delay: 0.12, ease },
            })}
            className="mx-auto max-w-[16ch] text-[clamp(44px,8vw,108px)] font-semibold leading-[1.0] tracking-[-0.035em] text-ink"
          >
            I build apps people{" "}
            <span className="text-accent-gradient">love opening.</span>
          </motion.h1>
        </LiquidGlass>

        {/* Subhead */}
        <motion.p
          {...enter({
            initial: { opacity: 0, y: 18 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.8, delay: 0.3, ease },
          })}
          className="mt-7 max-w-[620px] text-[17px] leading-[1.65] text-ink-3 md:text-[19px]"
        >
          Developer and designer crafting fast, beautiful web and mobile apps
          with Next.js, React, SwiftUI and Flutter. Founder of Flutterly — a
          product studio in Reading, UK.
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...enter({
            initial: { opacity: 0, y: 14 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.7, delay: 0.46, ease },
          })}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <Link href="#work" aria-label="See my work">
            <Button variant="primary" size="lg" className="group">
              See my work
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Button>
          </Link>
          <Link href="#brief" aria-label="Start a project">
            <Button variant="outline" size="lg">
              Start a project
            </Button>
          </Link>
        </motion.div>

        {/* Trust stats */}
        <motion.dl
          {...enter({
            initial: { opacity: 0, y: 14 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.8, delay: 0.62, ease },
          })}
          className="mt-14 grid w-full max-w-xl grid-cols-4 gap-4 border-t border-line pt-8"
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              {...enter({
                initial: { opacity: 0, y: 8 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: 0.72 + i * 0.06, duration: 0.5 },
              })}
              className="flex flex-col items-center"
            >
              <dd className="font-display text-[22px] font-semibold text-ink">
                {s.value}
              </dd>
              <dt className="mt-0.5 text-[11.5px] font-medium text-muted">
                {s.label}
              </dt>
            </motion.div>
          ))}
        </motion.dl>
      </div>

      {/* Scroll-scrubbed product demo */}
      <div className="relative mx-auto mt-20 flex w-full max-w-[1000px] flex-col items-center md:mt-28">
        <motion.div
          ref={phoneRef}
          style={reduce ? undefined : { scale: phoneScale, y: phoneY }}
          className="relative w-[280px] sm:w-[300px] lg:w-[320px]"
        >
          {/* Soft ambient tint behind the device */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-20 -z-10 rounded-full blur-3xl"
            animate={{
              opacity: 0.5,
              background:
                activeTab === "hydration"
                  ? "radial-gradient(circle, rgba(0,113,227,0.14) 0%, transparent 70%)"
                  : activeTab === "insights"
                  ? "radial-gradient(circle, rgba(94,92,230,0.14) 0%, transparent 70%)"
                  : "radial-gradient(circle, rgba(48,176,199,0.14) 0%, transparent 70%)",
            }}
            transition={{ duration: 0.9, ease }}
          />

          <FloatingChip className="absolute -left-16 top-16 hidden md:flex" delay={1.0} icon={<Code2 className="h-3.5 w-3.5 text-accent" />}>
            Next.js · 16
          </FloatingChip>
          <FloatingChip className="absolute -right-12 top-44 hidden md:flex" delay={1.2} icon={<Smartphone className="h-3.5 w-3.5 text-teal" />}>
            SwiftUI
          </FloatingChip>
          <FloatingChip className="absolute -left-12 bottom-32 hidden md:flex" delay={1.4} icon={<Zap className="h-3.5 w-3.5 text-orange" />}>
            100/100 Lighthouse
          </FloatingChip>

          <PhoneFrame>
            <div className="relative flex h-full w-full flex-col bg-[#0a0a0c] p-5 font-sans text-white">
              <div className="mt-9 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
                    Hydration
                  </span>
                  <span className="font-display text-[18px] font-semibold tracking-tight">
                    Sipli
                  </span>
                </div>
                <motion.span
                  key={activeTab}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[9px] font-semibold uppercase tracking-wider text-white/80"
                >
                  Live
                </motion.span>
              </div>

              <div className="flex flex-grow flex-col justify-center overflow-hidden">
                <AnimatePresence mode="wait">
                  {activeTab === "hydration" && <TabHydration key="hydration" />}
                  {activeTab === "insights" && <TabInsights key="insights" />}
                  {activeTab === "alerts" && <TabAlerts key="alerts" />}
                </AnimatePresence>
              </div>
            </div>
          </PhoneFrame>
        </motion.div>

        {/* Tab switcher */}
        <motion.div
          {...enter({
            initial: { opacity: 0, y: 16 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.7, delay: 0.2, ease },
          })}
          className="mt-9 flex items-center gap-1 rounded-full border border-line bg-surface p-1 shadow-[0_1px_3px_rgba(0,0,0,0.05)]"
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
                className={`relative flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[12px] font-semibold tracking-tight transition-colors duration-300 ${
                  active ? "text-accent-ink" : "text-ink-3 hover:text-ink"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="hero-tab-pill"
                    className="absolute inset-0 rounded-full bg-accent"
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
      transition={{ delay, duration: 0.6, ease }}
      className={`animate-float z-10 items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-[11.5px] font-semibold text-ink shadow-[0_8px_24px_-10px_rgba(0,0,0,0.18)] ${className}`}
    >
      {icon}
      <span>{children}</span>
    </motion.div>
  );
}

/* ── Phone tab screens (in-device UI stays dark, like a real app) ── */

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
      <div className="relative flex h-44 w-44 items-center justify-center rounded-full bg-white/[0.03]">
        <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 100 100" aria-hidden="true">
          <defs>
            <linearGradient id="ring" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#0a84ff" />
              <stop offset="100%" stopColor="#30b0c7" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="42" className="fill-none stroke-white/[0.08]" strokeWidth="5" />
          <motion.circle
            cx="50"
            cy="50"
            r="42"
            stroke="url(#ring)"
            className="fill-none"
            strokeWidth="5"
            strokeLinecap="round"
            initial={{ strokeDasharray: "263.89 263.89", strokeDashoffset: 263.89 }}
            animate={{ strokeDashoffset: 263.89 * (1 - 0.72) }}
            transition={{ type: "spring", stiffness: 40, damping: 15, delay: 0.2 }}
          />
        </svg>
        <div className="z-10 flex flex-col items-center">
          <span className="font-display text-[34px] font-semibold tracking-tight">
            72<span className="text-[16px] text-white/40">%</span>
          </span>
          <span className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.16em] text-white/40">
            1.8L of 2.5L
          </span>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        className="mt-8 inline-flex h-10 items-center gap-1.5 rounded-full bg-[#0a84ff] px-5 text-[12px] font-bold text-white"
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
      <span className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">
        Weekly Intake
      </span>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.06 } } }}
        className="flex h-28 items-end justify-between gap-1.5 px-2"
      >
        {[60, 80, 45, 95, 70, 85, 90].map((val, idx) => (
          <div key={idx} className="flex h-full flex-1 flex-col items-center justify-end gap-1.5">
            <motion.div
              variants={{
                hidden: { height: 0, opacity: 0 },
                visible: { height: `${val}%`, opacity: 1, transition: { type: "spring", stiffness: 120, damping: 16 } },
              }}
              className={`w-full rounded-t ${idx === 6 ? "bg-[#0a84ff] shadow-[0_0_18px_rgba(10,132,255,0.5)]" : "bg-white/[0.12]"}`}
            />
            <span className="font-mono text-[8px] text-white/40">{["M", "T", "W", "T", "F", "S", "S"][idx]}</span>
          </div>
        ))}
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, type: "spring", stiffness: 100, damping: 16 }}
        className="mt-5 rounded-xl border border-white/10 bg-white/[0.04] p-3"
      >
        <div className="font-mono text-[10px] uppercase text-white/40">Streak</div>
        <div className="mt-0.5 text-sm font-semibold">14 days consistent</div>
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
        className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4"
      >
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#30d158] opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#30d158]" />
          </span>
          <span className="text-xs font-semibold">Hydration Coach</span>
        </div>
        <p className="text-[12.5px] leading-relaxed text-white/60">
          You&rsquo;re 250&thinsp;ml behind your 2&thinsp;PM checkpoint. A glass of water
          now keeps your afternoon energy steady.
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 18, delay: 0.25 }}
        className="mt-4 flex items-center justify-between rounded-2xl border border-[#30d158]/30 bg-[#30d158]/10 p-4"
      >
        <div>
          <div className="font-mono text-[10px] uppercase tracking-wide text-[#30d158]">Quick Add</div>
          <div className="mt-0.5 text-sm font-semibold">250&thinsp;ml Glass</div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-[#30d158] font-bold text-black"
          aria-label="Quick add water"
        >
          +
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
