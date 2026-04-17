"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Cell = { level: "" | "l1" | "l2" | "l3" | "l4"; count: number };

function generateHeat(): { cells: Cell[]; total: number } {
  const total = 52 * 7;
  const cells: Cell[] = [];
  let count = 0;
  for (let i = 0; i < total; i++) {
    const week = Math.floor(i / 7);
    const boost = week > 8 ? 0.2 : 0;
    const r = Math.random() + boost;
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
    slash: "flutterly/",
    name: "hydration-engine",
    desc: "On-device hydration model — ships inside Sipli.",
    lang: "Swift",
    langClass: "bg-[#f05138]",
    stars: 412,
    forks: 38,
  },
  {
    slash: "flutterly/",
    name: "nextjs-seo-kit",
    desc: "Structured-data helpers we use on every site.",
    lang: "TypeScript",
    langClass: "bg-[#3178c6]",
    stars: 289,
    forks: 24,
  },
  {
    slash: "flutterly/",
    name: "gesture-lab",
    desc: "Playground for SwiftUI/Flutter micro-interactions.",
    lang: "Dart",
    langClass: "bg-[#03589c]",
    stars: 176,
    forks: 11,
  },
  {
    slash: "flutterly/",
    name: "friday-ship",
    desc: "Tiny changelog generator — pings Slack each Friday.",
    lang: "JavaScript",
    langClass: "bg-[#f7df1e]",
    stars: 94,
    forks: 7,
  },
];

function Heatmap() {
  const [data, setData] = useState<{ cells: Cell[]; total: number } | null>(null);
  const [shown, setShown] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    setData(generateHeat());
  }, []);

  useEffect(() => {
    if (!data || !ref.current) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !triggered.current) {
          triggered.current = true;
          let current = 0;
          const step = Math.max(1, Math.round(data.total / 40));
          const tick = () => {
            current += step;
            if (current >= data.total) {
              setShown(data.total);
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
    io.observe(ref.current);
    return () => io.disconnect();
  }, [data]);

  const bg = (level: string) => {
    switch (level) {
      case "l4": return "bg-[var(--accent)]";
      case "l3": return "bg-[rgba(209,74,31,0.78)]";
      case "l2": return "bg-[rgba(209,74,31,0.55)]";
      case "l1": return "bg-[rgba(209,74,31,0.35)]";
      default: return "bg-[rgba(245,239,228,0.06)]";
    }
  };

  return (
    <div
      ref={ref}
      className="relative overflow-hidden rounded-[22px] border border-[rgba(245,239,228,0.08)] bg-[#1e1c16] p-6"
    >
      <div className="mb-5 flex items-baseline justify-between gap-4">
        <span className="font-mono text-[12px] tracking-[0.14em] text-[var(--accent)]">
          @ its-me-anoop
        </span>
        <div className="flex gap-6 font-mono text-[10.5px] uppercase tracking-[0.22em] text-[rgba(245,239,228,0.5)]">
          <div>
            Commits · ytd
            <b className="mt-1 block font-display text-[22px] font-light normal-case tracking-normal text-[var(--paper)]">
              {shown || "—"}
            </b>
          </div>
          <div>
            Best streak
            <b className="mt-1 block font-display text-[22px] font-light normal-case tracking-normal text-[var(--paper)]">
              27d
            </b>
          </div>
          <div>
            Repos
            <b className="mt-1 block font-display text-[22px] font-light normal-case tracking-normal text-[var(--paper)]">
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
        {(data?.cells || []).map((c, i) => (
          <span key={i} className={`aspect-square rounded-[2px] ${bg(c.level)}`} />
        ))}
      </div>
      <div className="mt-2.5 grid grid-cols-12 font-mono text-[9px] uppercase tracking-[0.18em] text-[rgba(245,239,228,0.4)]">
        {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((m) => (
          <span key={m}>{m}</span>
        ))}
      </div>
    </div>
  );
}

export function OpenSource() {
  return (
    <section
      id="oss"
      className="relative border-t border-[var(--rule)] bg-[#15140f] py-[120px] text-[var(--paper)]"
    >
      <div className="mx-auto w-full max-w-[1240px] px-5 md:px-7">
        {/* Head */}
        <div className="mb-14 grid items-end gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <div className="font-mono text-[10.5px] uppercase tracking-[0.28em] text-[var(--accent)]">
              № 04 · Open source
            </div>
            <h2
              className="mt-3 font-display text-[clamp(40px,5.5vw,72px)] font-light leading-[1.02] tracking-[-0.025em] text-[var(--paper)]"
              style={{ fontVariationSettings: '"opsz" 144, "SOFT" 50, "WONK" 0' }}
            >
              We ship in
              <br />
              <em className="italic text-[rgba(245,239,228,0.85)]">public, too.</em>
            </h2>
          </div>
          <p className="max-w-[420px] text-[16px] leading-[1.6] text-[rgba(245,239,228,0.7)]">
            Small tools, experiments, and bits of client work that are safe to
            open up. Pull requests are welcome — so are issues, and so is silence.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-8 md:grid-cols-[1.2fr_1fr]">
          <Heatmap />
          <div className="flex flex-col gap-2.5">
            {repos.map((r) => (
              <Link
                key={r.name}
                href="#"
                className="grid grid-cols-[1fr_auto] items-center gap-3 rounded-[14px] border border-[rgba(245,239,228,0.08)] bg-[#1a1812] px-5 py-4 transition-all hover:translate-x-0.5 hover:border-[rgba(209,74,31,0.4)] hover:bg-[#221f17]"
              >
                <div>
                  <div className="font-mono text-[13px] text-[var(--paper)]">
                    <span className="text-[var(--muted-2)]">{r.slash}</span>
                    {r.name}
                  </div>
                  <div className="mt-1 text-[13px] text-[rgba(245,239,228,0.6)]">
                    {r.desc}
                  </div>
                </div>
                <div className="text-right">
                  <div className="inline-flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.2em] text-[rgba(245,239,228,0.7)]">
                    <span className={`h-2 w-2 rounded-full ${r.langClass}`} />
                    {r.lang}
                  </div>
                  <div className="mt-1 flex justify-end gap-3.5 font-mono text-[11px] text-[rgba(245,239,228,0.55)]">
                    <span>★ {r.stars}</span>
                    <span>↳ {r.forks}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
