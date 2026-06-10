"use client";

import { useEffect, useRef, useState } from "react";
import { m as motion, useInView, useReducedMotion } from "framer-motion";
import { LiftCard } from "@/components/ui/LiftCard";

const ease = [0.16, 1, 0.3, 1] as const;

const metrics = [
  { label: "Lighthouse", value: 100, suffix: "", decimals: 0 },
  { label: "Crash-free", value: 99.96, suffix: "%", decimals: 2 },
  { label: "Apps shipped", value: 12, suffix: "+", decimals: 0 },
  { label: "Reply time", value: 48, prefix: "<", suffix: "h", decimals: 0 },
];

/** Smooth shipping-velocity curve (viewBox 0 0 600 200). */
const AREA_LINE =
  "M0,168 C40,160 70,150 100,138 C130,126 160,128 190,116 C220,104 250,108 280,92 C310,76 340,84 370,66 C400,48 430,56 460,40 C490,26 530,30 560,18 L600,10";
const AREA_FILL = `${AREA_LINE} L600,200 L0,200 Z`;

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

const sparks = [
  { label: "Deploys / wk", value: "34", bars: [40, 62, 48, 78, 64, 88, 96] },
  { label: "Uptime", value: "99.99%", bars: [88, 92, 90, 94, 92, 96, 98] },
  { label: "Open PRs", value: "3", bars: [70, 52, 64, 38, 46, 30, 22] },
];

/** Count-up that respects reduced motion and only runs once in view. */
function Counter({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  start,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  start: boolean;
}) {
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? value : 0);

  useEffect(() => {
    if (reduce || !start) return;
    const t0 = performance.now();
    const DURATION = 1400;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - t0) / DURATION);
      setN(value * (1 - Math.pow(1 - t, 3)));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, value, reduce]);

  return (
    <span className="tabular-nums">
      {prefix}
      {n.toFixed(decimals)}
      {suffix}
    </span>
  );
}

/**
 * The hero centrepiece: a live studio dashboard. Metrics count up, the
 * shipping-velocity area chart draws itself and a scan-line sweeps it,
 * sparkbars rise, and the whole panel tilts gently toward the cursor
 * (via LiftCard). Everything renders statically under reduced motion.
 */
export function DashboardPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduce = useReducedMotion();

  return (
    <div ref={ref} className="relative">
      {/* Ambient glow bed */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-16 -top-24 -bottom-16 -z-10"
        style={{
          background:
            "radial-gradient(60% 70% at 50% 20%, rgba(47,214,195,0.13), transparent 65%), radial-gradient(40% 50% at 80% 60%, rgba(123,120,255,0.08), transparent 60%)",
        }}
      />

      <LiftCard tilt={1.6} interactive={!reduce} className="border-line-2 bg-surface/90 p-0 shadow-[0_50px_120px_-40px_rgba(0,0,0,0.9)] backdrop-blur">
        {/* Window chrome */}
        <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="flex gap-1.5">
              <i className="h-2.5 w-2.5 rounded-full bg-pink/70" />
              <i className="h-2.5 w-2.5 rounded-full bg-orange/70" />
              <i className="h-2.5 w-2.5 rounded-full bg-green/70" />
            </span>
            <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted">
              flutterly · studio metrics
            </span>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent-soft px-2.5 py-1 font-mono text-[9.5px] font-semibold uppercase tracking-[0.16em] text-accent">
            <span className="h-1 w-1 animate-pulse rounded-full bg-accent" />
            Live
          </span>
        </div>

        <div className="grid gap-px bg-line md:grid-cols-[220px_1fr]">
          {/* Metric column */}
          <dl className="grid grid-cols-2 gap-px bg-line md:grid-cols-1">
            {metrics.map((mtr) => (
              <div key={mtr.label} className="bg-surface px-5 py-4">
                <dt className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-muted">
                  {mtr.label}
                </dt>
                <dd className="m-0 mt-1 font-display text-[26px] font-semibold leading-none text-ink">
                  <Counter
                    value={mtr.value}
                    prefix={mtr.prefix}
                    suffix={mtr.suffix}
                    decimals={mtr.decimals}
                    start={inView}
                  />
                </dd>
              </div>
            ))}
          </dl>

          {/* Chart panel */}
          <div className="relative bg-surface px-5 pb-4 pt-5">
            <div className="mb-3 flex items-center justify-between">
              <span className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-muted">
                Shipping velocity — H1 ’26
              </span>
              <span className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-accent">
                ▲ 32%
              </span>
            </div>

            <div className="relative overflow-hidden rounded-[var(--r-sm)]">
              <svg viewBox="0 0 600 200" className="block h-[180px] w-full md:h-[210px]" aria-hidden="true" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="dash-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.28" />
                    <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {/* gridlines */}
                {[50, 100, 150].map((y) => (
                  <line key={y} x1="0" x2="600" y1={y} y2={y} stroke="var(--line)" strokeWidth="1" />
                ))}
                <motion.path
                  d={AREA_FILL}
                  fill="url(#dash-fill)"
                  initial={reduce ? false : { opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 1, delay: 1, ease }}
                />
                <motion.path
                  d={AREA_LINE}
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  initial={reduce ? false : { pathLength: 0 }}
                  animate={inView ? { pathLength: 1 } : {}}
                  transition={{ duration: 1.6, delay: 0.3, ease }}
                />
                {/* terminal dot */}
                <motion.circle
                  cx="600"
                  cy="10"
                  r="5"
                  fill="var(--accent)"
                  initial={reduce ? false : { opacity: 0, scale: 0 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 1.9, duration: 0.4, ease }}
                />
              </svg>

              {/* scan-line sweep */}
              {!reduce && (
                <motion.span
                  aria-hidden="true"
                  className="absolute inset-y-0 w-px bg-gradient-to-b from-transparent via-accent/70 to-transparent"
                  initial={{ left: "0%" }}
                  animate={inView ? { left: ["0%", "100%"] } : {}}
                  transition={{ duration: 5, delay: 2.2, repeat: Infinity, repeatDelay: 1.6, ease: "easeInOut" }}
                />
              )}
            </div>

            <div className="mt-2 flex justify-between font-mono text-[9px] uppercase tracking-[0.16em] text-muted" aria-hidden="true">
              {months.map((mo) => (
                <span key={mo}>{mo}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Sparkbars */}
        <div className="grid gap-px border-t border-line bg-line sm:grid-cols-3">
          {sparks.map((s, si) => (
            <div key={s.label} className="flex items-end justify-between gap-4 bg-surface px-5 py-4">
              <div>
                <div className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-muted">
                  {s.label}
                </div>
                <div className="mt-1 font-display text-[18px] font-semibold leading-none text-ink">
                  {s.value}
                </div>
              </div>
              <div className="flex h-9 items-end gap-1" aria-hidden="true">
                {s.bars.map((b, bi) => (
                  <motion.span
                    key={bi}
                    className={`w-1.5 rounded-t-sm ${bi === s.bars.length - 1 ? "bg-accent" : "bg-faint"}`}
                    initial={reduce ? { height: `${b}%` } : { height: 0 }}
                    animate={inView ? { height: `${b}%` } : {}}
                    transition={{ duration: 0.7, delay: 0.6 + si * 0.12 + bi * 0.05, ease }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </LiftCard>
    </div>
  );
}
