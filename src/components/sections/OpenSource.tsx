"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Github, Star, GitFork, ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { staggerContainer, staggerItem } from "@/components/ui/Reveal";

type Cell = { level: "" | "l1" | "l2" | "l3" | "l4"; count: number };

// Deterministic PRNG so SSR and client render the same heatmap (no hydration mismatch).
function mulberry32(seed: number) {
  let a = seed | 0;
  return function () {
    a = (a + 0x6d2b79f5) | 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function generateHeat(seed = 0xc0ffee): { cells: Cell[]; total: number } {
  const rng = mulberry32(seed);
  const total = 52 * 7;
  const cells: Cell[] = [];
  let count = 0;
  for (let i = 0; i < total; i++) {
    const week = Math.floor(i / 7);
    const boost = week > 8 ? 0.2 : 0;
    const r = rng() + boost;
    let level: Cell["level"] = "";
    let c = 0;
    if (r > 0.95) { level = "l4"; c = 5; }
    else if (r > 0.85) { level = "l3"; c = 3; }
    else if (r > 0.68) { level = "l2"; c = 2; }
    else if (r > 0.45) { level = "l1"; c = 1; }
    cells.push({ level, count: c });
    count += c;
  }
  return { cells, total: count };
}

const repos = [
  {
    name: "hydration-engine",
    slash: "flutterly/",
    desc: "On-device hydration model — ships inside Sipli.",
    lang: "Swift",
    langClass: "bg-[#f05138]",
    stars: 412,
    forks: 38,
  },
  {
    name: "nextjs-seo-kit",
    slash: "flutterly/",
    desc: "Structured-data helpers I use on every site.",
    lang: "TypeScript",
    langClass: "bg-[#3178c6]",
    stars: 289,
    forks: 24,
  },
  {
    name: "gesture-lab",
    slash: "flutterly/",
    desc: "Playground for SwiftUI/Flutter micro-interactions.",
    lang: "Dart",
    langClass: "bg-[#03589c]",
    stars: 176,
    forks: 11,
  },
  {
    name: "friday-ship",
    slash: "flutterly/",
    desc: "Tiny changelog generator — pings Slack each Friday.",
    lang: "JavaScript",
    langClass: "bg-[#f7df1e]",
    stars: 94,
    forks: 7,
  },
];

const heatmapData = generateHeat();

function Heatmap() {
  const [shown, setShown] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    if (!ref.current) return;
    const node = ref.current;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !triggered.current) {
          triggered.current = true;
          let current = 0;
          const step = Math.max(1, Math.round(heatmapData.total / 50));
          const tick = () => {
            current += step;
            if (current >= heatmapData.total) {
              setShown(heatmapData.total);
              return;
            }
            setShown(current);
            requestAnimationFrame(tick);
          };
          tick();
          io.disconnect();
        }
      });
    });
    io.observe(node);
    return () => io.disconnect();
  }, []);

  const bg = (level: string) => {
    switch (level) {
      case "l4":
        return "bg-accent";
      case "l3":
        return "bg-accent/70";
      case "l2":
        return "bg-accent/40";
      case "l1":
        return "bg-accent/20";
      default:
        return "bg-black/[0.05]";
    }
  };

  return (
    <div
      ref={ref}
      className="relative overflow-hidden rounded-[var(--r-xl)] border border-line bg-surface p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
    >
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <Link
          href="https://github.com/its-me-anoop"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 rounded-full border border-line bg-surface-2 px-3 py-1.5 text-[12px] font-semibold text-ink-2 transition-colors hover:border-line-2 hover:text-ink"
        >
          <Github className="h-3.5 w-3.5" aria-hidden="true" />
          @its-me-anoop
          <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
        <div className="flex gap-5 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">
          <div>
            Commits&nbsp;·&nbsp;ytd
            <b className="mt-1 block font-display text-xl font-semibold normal-case tracking-tight text-ink">
              {shown || "—"}
            </b>
          </div>
          <div>
            Best streak
            <b className="mt-1 block font-display text-xl font-semibold normal-case tracking-tight text-ink">
              27d
            </b>
          </div>
          <div>
            Repos
            <b className="mt-1 block font-display text-xl font-semibold normal-case tracking-tight text-ink">
              12
            </b>
          </div>
        </div>
      </div>

      <div
        className="grid gap-[3px]"
        style={{ gridTemplateColumns: "repeat(52, 1fr)", aspectRatio: "52/7" }}
        aria-hidden="true"
      >
        {heatmapData.cells.map((c, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.002, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className={`aspect-square rounded-[2px] ${bg(c.level)}`}
          />
        ))}
      </div>

      <div className="mt-4 grid grid-cols-12 font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
        {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((m) => (
          <span key={m}>{m}</span>
        ))}
      </div>
    </div>
  );
}

/** Open source — contribution heatmap and a shortlist of public repos. */
export function OpenSource() {
  return (
    <section
      id="oss"
      className="relative bg-canvas-2 px-[var(--gutter)] py-[var(--space-section)]"
      aria-labelledby="oss-heading"
    >
      <div className="mx-auto w-full max-w-[1200px]">
        <SectionHeader
          eyebrow="Open source"
          headingId="oss-heading"
          dot="var(--green)"
          title={
            <>
              I ship in
              <br />
              <em>public, too.</em>
            </>
          }
          lede="Small tools, experiments, and bits of client work that are safe to open up. Pull requests welcome — so are issues, and so is silence."
        />

        <div className="grid gap-6 lg:grid-cols-[1.25fr_1fr]">
          <Heatmap />

          <motion.ul
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-8% 0px" }}
            className="flex flex-col gap-3"
            aria-label="Featured repositories"
          >
            {repos.map((r) => (
              <motion.li key={r.name} variants={staggerItem}>
                <Link
                  href={`https://github.com/its-me-anoop/${r.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid grid-cols-[1fr_auto] items-center gap-4 rounded-2xl border border-line bg-surface px-5 py-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-line-2 hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
                >
                  <div>
                    <div className="font-mono text-[13px] font-semibold text-ink-2 transition-colors duration-300 group-hover:text-ink">
                      <span className="font-normal text-muted">{r.slash}</span>
                      {r.name}
                    </div>
                    <div className="mt-1 text-[13px] text-muted transition-colors duration-300 group-hover:text-ink-3">
                      {r.desc}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-3">
                      <span className={`h-1.5 w-1.5 rounded-full ${r.langClass}`} />
                      {r.lang}
                    </div>
                    <div className="mt-1 flex justify-end gap-3 font-mono text-[11px] text-muted">
                      <span className="inline-flex items-center gap-1">
                        <Star className="h-3 w-3" aria-hidden="true" /> {r.stars}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <GitFork className="h-3 w-3" aria-hidden="true" /> {r.forks}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
