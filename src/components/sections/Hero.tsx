"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { m, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowRight, Code2, Smartphone, Layers, Zap, Sparkles } from "lucide-react";
import { PhoneFrame } from "@/components/ui/PhoneFrame";
import { Button } from "@/components/ui/Button";

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
 * Landing hero — editorial headline + CTAs + trust stats on the left, and a
 * live, auto-cycling iPhone product demo (Sipli) on the right.
 */
export function Hero() {
  const [activeTab, setActiveTab] = useState<TabId>("hydration");
  const reduce = useReducedMotion();

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

  return (
    <header
      id="top"
      className="relative isolate overflow-hidden px-[var(--gutter)] pt-36 pb-20 md:pt-40 md:pb-28"
    >
      <div className="mx-auto grid w-full max-w-[1280px] items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        {/* Copy */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <m.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-line-2 bg-white/[0.03] px-3 py-1.5 backdrop-blur-md"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-signal" />
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-2">
              Booking briefs for Summer&nbsp;’26
            </span>
          </m.div>

          <m.h1
            initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, delay: 0.05, ease }}
            className="max-w-[15ch] text-[clamp(42px,6vw,82px)] font-semibold leading-[0.96] tracking-[-0.035em] text-ink"
          >
            We build apps people{" "}
            <span className="text-signal">love opening.</span>
          </m.h1>

          <m.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.22, ease }}
            className="mt-7 max-w-[560px] text-[16px] leading-[1.7] text-ink-3 md:text-[18px]"
          >
            Flutterly is a boutique product studio designing and engineering{" "}
            <span className="text-ink">fast, beautiful web and mobile apps.</span>{" "}
            Built with Next.js, React, SwiftUI and Flutter — shipped with care,
            kept alive long after launch.
          </m.p>

          <m.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease }}
            className="mt-10 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
          >
            <Link href="#brief" aria-label="Start a project">
              <Button variant="signal" size="lg" className="group">
                Start a project
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Button>
            </Link>
            <Link href="#work" aria-label="See our work">
              <Button variant="outline" size="lg">
                See our work
              </Button>
            </Link>
          </m.div>

          <m.dl
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.58, ease }}
            className="mt-12 grid w-full max-w-md grid-cols-4 gap-4 border-t border-line pt-7 lg:max-w-lg"
          >
            {stats.map((s, i) => (
              <m.div
                key={s.label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.68 + i * 0.06, duration: 0.5 }}
                className="flex flex-col items-center lg:items-start"
              >
                <dd className="font-display text-[21px] font-semibold text-ink">
                  {s.value}
                </dd>
                <dt className="mt-0.5 text-[11px] font-medium text-muted">
                  {s.label}
                </dt>
              </m.div>
            ))}
          </m.dl>
        </div>

        {/* Interactive phone */}
        <div className="relative flex flex-col items-center lg:items-end">
          <m.div
            initial={{ opacity: 0, y: 30, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.35, ease }}
            className="relative w-[280px] sm:w-[300px] lg:w-[320px]"
          >
            <m.div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-16 -z-10"
              animate={{
                opacity: 0.6,
                background:
                  activeTab === "hydration"
                    ? "radial-gradient(circle, rgba(212,242,76,0.22) 0%, transparent 70%)"
                    : activeTab === "insights"
                    ? "radial-gradient(circle, rgba(124,155,255,0.22) 0%, transparent 70%)"
                    : "radial-gradient(circle, rgba(88,224,199,0.20) 0%, transparent 70%)",
              }}
              transition={{ duration: 0.9, ease }}
            />

            <FloatingChip className="absolute -left-12 top-16 hidden md:flex" delay={1.1} icon={<Code2 className="h-3.5 w-3.5 text-azure" />}>
              Next.js · 16
            </FloatingChip>
            <FloatingChip className="absolute -right-8 top-44 hidden md:flex" delay={1.3} icon={<Smartphone className="h-3.5 w-3.5 text-aqua" />}>
              SwiftUI
            </FloatingChip>
            <FloatingChip className="absolute -left-8 bottom-32 hidden md:flex" delay={1.5} icon={<Zap className="h-3.5 w-3.5 text-signal" />}>
              100/100 Lighthouse
            </FloatingChip>

            <PhoneFrame>
              <div className="relative flex h-full w-full flex-col bg-[#070708] p-5 font-sans text-ink">
                <div className="mt-9 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                      Hydration
                    </span>
                    <span className="font-display text-[18px] font-semibold tracking-tight">
                      Sipli
                    </span>
                  </div>
                  <m.span
                    key={activeTab}
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="rounded-full border border-line-2 bg-white/[0.05] px-2.5 py-1 font-mono text-[9px] font-semibold uppercase tracking-wider text-ink-2"
                  >
                    Live
                  </m.span>
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
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.95, ease }}
            className="mt-8 flex items-center gap-1.5 rounded-full border border-line-2 bg-white/[0.03] p-1 backdrop-blur-md"
            role="tablist"
            aria-label="Live demo screens"
          >
            {tabs.map((tab) => {
              const active = activeTab === tab.id;
              const Icon = tab.icon;
              return (
                <m.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  role="tab"
                  aria-selected={active}
                  aria-controls={`hero-demo-${tab.id}`}
                  whileTap={{ scale: 0.97 }}
                  className={`relative flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[11.5px] font-semibold tracking-tight transition-colors duration-300 ${
                    active ? "text-signal-ink" : "text-muted hover:text-ink"
                  }`}
                >
                  {active && (
                    <m.span
                      layoutId="hero-tab-pill"
                      className="absolute inset-0 rounded-full bg-signal"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 inline-flex items-center gap-1.5">
                    <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                    {tab.label}
                  </span>
                </m.button>
              );
            })}
          </m.div>
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
    <m.div
      initial={{ opacity: 0, y: 12, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.6, ease }}
      className={`animate-float z-10 items-center gap-2 rounded-full border border-line-2 bg-surface/80 px-3 py-1.5 text-[11px] font-semibold text-ink shadow-[0_8px_24px_-8px_rgba(0,0,0,0.7)] backdrop-blur-md ${className}`}
    >
      {icon}
      <span>{children}</span>
    </m.div>
  );
}

function TabHydration() {
  return (
    <m.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.98 }}
      transition={{ type: "spring", stiffness: 200, damping: 25, mass: 0.8 }}
      className="flex flex-grow flex-col items-center justify-center py-6"
      id="hero-demo-hydration"
      role="tabpanel"
    >
      <div className="relative flex h-44 w-44 items-center justify-center rounded-full bg-white/[0.02]">
        <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 100 100" aria-hidden="true">
          <defs>
            <linearGradient id="ring" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#d4f24c" />
              <stop offset="100%" stopColor="#58e0c7" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="42" className="fill-none stroke-white/[0.07]" strokeWidth="5" />
          <m.circle
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
            72<span className="text-[16px] text-muted">%</span>
          </span>
          <span className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
            1.8L of 2.5L
          </span>
        </div>
      </div>

      <m.button
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        className="mt-8 inline-flex h-10 items-center gap-1.5 rounded-full bg-signal px-5 text-[12px] font-bold text-signal-ink"
        aria-label="Add a drink"
      >
        + Add Drink
      </m.button>
    </m.div>
  );
}

function TabInsights() {
  return (
    <m.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.98 }}
      transition={{ type: "spring", stiffness: 200, damping: 25, mass: 0.8 }}
      className="flex flex-grow flex-col justify-center py-6"
      id="hero-demo-insights"
      role="tabpanel"
    >
      <span className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
        Weekly Intake
      </span>
      <m.div
        initial="hidden"
        animate="visible"
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.06 } } }}
        className="flex h-28 items-end justify-between gap-1.5 px-2"
      >
        {[60, 80, 45, 95, 70, 85, 90].map((val, idx) => (
          <div key={idx} className="flex h-full flex-1 flex-col items-center justify-end gap-1.5">
            <m.div
              variants={{
                hidden: { height: 0, opacity: 0 },
                visible: { height: `${val}%`, opacity: 1, transition: { type: "spring", stiffness: 120, damping: 16 } },
              }}
              className={`w-full rounded-t ${idx === 6 ? "bg-azure shadow-[0_0_18px_rgba(124,155,255,0.5)]" : "bg-white/[0.10]"}`}
            />
            <span className="font-mono text-[8px] text-muted">{["M", "T", "W", "T", "F", "S", "S"][idx]}</span>
          </div>
        ))}
      </m.div>
      <m.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, type: "spring", stiffness: 100, damping: 16 }}
        className="mt-5 rounded-xl border border-line bg-white/[0.03] p-3"
      >
        <div className="font-mono text-[10px] uppercase text-muted">Streak</div>
        <div className="mt-0.5 text-sm font-semibold text-ink">14 days consistent</div>
      </m.div>
    </m.div>
  );
}

function TabAlerts() {
  return (
    <m.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.98 }}
      transition={{ type: "spring", stiffness: 200, damping: 25, mass: 0.8 }}
      className="flex flex-grow flex-col justify-center py-6"
      id="hero-demo-alerts"
      role="tabpanel"
    >
      <m.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 18, delay: 0.1 }}
        className="flex flex-col gap-3 rounded-2xl border border-line bg-white/[0.03] p-4"
      >
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-aqua opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-aqua" />
          </span>
          <span className="text-xs font-semibold text-ink">Hydration Coach</span>
        </div>
        <p className="text-[12.5px] leading-relaxed text-ink-3">
          You&rsquo;re 250&thinsp;ml behind your 2&thinsp;PM checkpoint. A glass of water
          now keeps your afternoon energy steady.
        </p>
      </m.div>
      <m.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 18, delay: 0.25 }}
        className="mt-4 flex items-center justify-between rounded-2xl border border-aqua/30 bg-aqua/[0.08] p-4"
      >
        <div>
          <div className="font-mono text-[10px] uppercase tracking-wide text-aqua">Quick Add</div>
          <div className="mt-0.5 text-sm font-semibold text-ink">250&thinsp;ml Glass</div>
        </div>
        <m.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-aqua font-bold text-[#04141a]"
          aria-label="Quick add water"
        >
          +
        </m.button>
      </m.div>
    </m.div>
  );
}
