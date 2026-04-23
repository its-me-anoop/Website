"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

function ArrowUp({ size = 12 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 12 12"
      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
    >
      <path
        d="M3 9 9 3M5 3h4v4"
        stroke="currentColor"
        strokeWidth="1.3"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MiniHeatmap() {
  const [cells, setCells] = useState<string[]>([]);
  useEffect(() => {
    const out: string[] = [];
    for (let i = 0; i < 12 * 5; i++) {
      const r = Math.random();
      if (r > 0.93) out.push("l4");
      else if (r > 0.8) out.push("l3");
      else if (r > 0.62) out.push("l2");
      else if (r > 0.4) out.push("l1");
      else out.push("");
    }
    setCells(out);
  }, []);
  const bg = (level: string) => {
    switch (level) {
      case "l4": return "bg-[var(--accent)]";
      case "l3": return "bg-[rgba(209,74,31,0.85)]";
      case "l2": return "bg-[rgba(209,74,31,0.6)]";
      case "l1": return "bg-[rgba(209,74,31,0.35)]";
      default: return "bg-[rgba(245,239,228,0.08)]";
    }
  };
  return (
    <div
      aria-hidden="true"
      className="my-2.5 grid flex-1 grid-cols-12 gap-[3px]"
      style={{ aspectRatio: "12/7" }}
    >
      {cells.map((c, i) => (
        <span
          key={i}
          className={`aspect-square rounded-[2px] transition-colors ${bg(c)}`}
        />
      ))}
    </div>
  );
}

export function FeaturedWork() {
  return (
    <section
      id="work"
      className="relative border-t border-[var(--rule)] bg-[var(--paper)] py-[120px]"
    >
      <div className="mx-auto w-full max-w-[1240px] px-5 md:px-7">
        {/* Section head */}
        <div className="mb-14 grid items-end gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <div className="font-mono text-[10.5px] uppercase tracking-[0.28em] text-[var(--accent)]">
              № 02 · Ledger of ships
            </div>
            <h2
              className="mt-3 font-display text-[clamp(40px,5.5vw,72px)] font-light leading-[1.02] tracking-[-0.025em]"
              style={{ fontVariationSettings: '"opsz" 144, "SOFT" 50, "WONK" 0' }}
            >
              Five recent things
              <br />
              <em className="font-light italic text-[var(--ink-2)]">we&rsquo;re proud of.</em>
            </h2>
          </div>
          <p className="max-w-[420px] text-[16px] leading-[1.6] text-[var(--ink-2)]">
            A running journal of client work and internal products. Dates are when
            we shipped — not when we started. We&rsquo;re usually still iterating
            long after the first release.
          </p>
        </div>

        {/* Bento grid */}
        <div
          className="grid gap-[18px]"
          style={{
            gridTemplateColumns: "repeat(12, 1fr)",
            gridAutoRows: "160px",
          }}
        >
          {/* Sipli hero tile */}
          <Link
            href="/projects/sipli"
            className="group relative isolate flex flex-col justify-between overflow-hidden rounded-[22px] border border-[rgba(245,239,228,0.1)] bg-[linear-gradient(165deg,#0b2540,#0a1930)] p-6 text-[var(--paper)] transition-all hover:-translate-y-0.5 max-md:col-span-full max-md:row-span-3 md:col-span-7 md:row-span-3"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-10"
              style={{
                background:
                  "radial-gradient(600px 300px at 80% 20%, rgba(77,212,232,.38), transparent 60%), radial-gradient(500px 280px at 20% 90%, rgba(209,74,31,.28), transparent 60%)",
              }}
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-24 -right-16 h-[120%] w-[46%] overflow-hidden rounded-[44px] border border-[rgba(245,239,228,0.1)] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.55)] transition-transform duration-700 group-hover:-translate-y-3 group-hover:rotate-[5deg]"
              style={{ transform: "rotate(8deg)" }}
            >
              <Image
                src="/images/sipli/iphone/01-hero-1320x2868.png"
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 520px"
                className="object-cover object-top"
              />
            </div>
            <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-[rgba(245,239,228,0.6)]">
              01 · 2026 · iOS · iPadOS · watchOS
            </span>
            <div className="relative max-w-[60%]">
              <h3 className="font-display text-[34px] font-normal leading-tight tracking-[-0.02em]">
                Sipli.
              </h3>
              <p className="mt-2 max-w-[36ch] text-[14px] leading-[1.5] text-[rgba(245,239,228,0.85)]">
                An AI hydration coach on your wrist. 35+ beverages, Apple Watch
                quick-logging, and an on-device model that feels human.
              </p>
            </div>
            <div className="flex items-center justify-between font-mono text-[10.5px] uppercase tracking-[0.2em] text-[rgba(245,239,228,0.6)]">
              <span className="inline-flex items-center gap-1.5 text-[rgba(245,239,228,0.9)] transition-colors group-hover:text-[var(--accent)]">
                Case study <ArrowUp />
              </span>
              <span>Live</span>
            </div>
          </Link>

          {/* Now on bench */}
          <Link
            href="#brief"
            className="group relative flex flex-col justify-between overflow-hidden rounded-[22px] bg-[var(--accent)] p-6 text-[var(--accent-ink)] transition-all hover:-translate-y-0.5 max-md:col-span-full md:col-span-5 md:row-span-1"
          >
            <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-[rgba(255,246,236,0.75)]">
              Now · on the bench
            </span>
            <div className="flex items-end justify-between gap-4">
              <h3 className="font-display text-[28px] font-normal leading-tight tracking-[-0.02em]">
                Sipli 3.0 — shipping Friday.
              </h3>
              <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em]">
                <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-[var(--accent-ink)]" />
                Live
              </span>
            </div>
          </Link>

          {/* Artling */}
          <Link
            href="#"
            className="group relative flex flex-col justify-between overflow-hidden rounded-[22px] p-6 transition-all hover:-translate-y-0.5 max-md:col-span-3 max-md:row-span-2 md:col-span-3 md:row-span-2"
            style={{
              background:
                "radial-gradient(circle at 30% 40%, #f4c9a5, #d99a5f 55%, #b87841 90%)",
              color: "#2a1b10",
            }}
          >
            <Image
              src="/projects/artling/fox-painter.png"
              alt=""
              width={160}
              height={224}
              sizes="160px"
              className="pointer-events-none absolute -right-3 top-8 w-[140px] rotate-[6deg] transition-transform duration-700 group-hover:-translate-y-1 group-hover:rotate-0"
              style={{
                filter: "drop-shadow(0 12px 24px rgba(184,120,65,0.45))",
              }}
            />
            <span className="relative font-mono text-[10.5px] uppercase tracking-[0.22em]">
              02 · 2025 · iOS
            </span>
            <div className="relative">
              <h3 className="font-display text-[34px] font-normal leading-tight tracking-[-0.02em]">
                Artling.
              </h3>
              <p className="mt-2 max-w-[18ch] text-[13px] leading-[1.5]">
                A quiet corner of the App Store for families to archive
                children&rsquo;s artwork.
              </p>
            </div>
            <div className="relative z-[1] flex items-center justify-between font-mono text-[10.5px] uppercase tracking-[0.2em]">
              <span className="inline-flex items-center gap-1.5">
                Case <ArrowUp />
              </span>
            </div>
          </Link>

          {/* GitHub mini tile */}
          <div
            aria-label="Open source activity"
            className="relative flex flex-col justify-between overflow-hidden rounded-[22px] bg-[#15140f] p-6 text-[var(--paper)] max-md:col-span-3 max-md:row-span-2 md:col-span-2 md:row-span-2"
          >
            <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-[rgba(245,239,228,0.55)]">
              GitHub · 2026
            </span>
            <MiniHeatmap />
            <div>
              <div className="font-display text-[22px] leading-tight">41</div>
              <div className="mt-0.5 flex items-center justify-between font-mono text-[10.5px] uppercase tracking-[0.2em] text-[rgba(245,239,228,0.55)]">
                <span>ships · ytd</span>
                <span>→</span>
              </div>
            </div>
          </div>

          {/* Greenmead */}
          <Link
            href="#"
            className="group relative isolate flex flex-col justify-between overflow-hidden rounded-[22px] p-6 text-[#10281f] transition-all hover:-translate-y-0.5 max-md:col-span-full md:col-span-4 md:row-span-1"
          >
            <Image
              src="/abstract-greenmead.png"
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 420px"
              className="-z-10 object-cover transition-transform duration-[900ms] group-hover:scale-[1.04]"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-10"
              style={{
                background:
                  "linear-gradient(135deg, rgba(196,217,201,0.75), rgba(109,150,136,0.55))",
              }}
            />
            <span className="font-mono text-[10.5px] uppercase tracking-[0.22em]">
              03 · 2024 · Brand
            </span>
            <div className="flex items-end justify-between">
              <h3 className="font-display text-[34px] font-normal leading-tight tracking-[-0.02em]">
                Greenmead.
              </h3>
              <span className="font-mono text-[10.5px] uppercase tracking-[0.2em]">→</span>
            </div>
          </Link>

          {/* JJ Paper */}
          <Link
            href="#"
            className="group relative isolate flex flex-col justify-between overflow-hidden rounded-[22px] bg-[var(--paper-3)] p-6 text-[var(--ink)] transition-all hover:-translate-y-0.5 max-md:col-span-full md:col-span-4 md:row-span-1"
          >
            <Image
              src="/abstract-jjpaper.png"
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 420px"
              className="-z-10 object-cover opacity-75 transition-transform duration-[900ms] group-hover:scale-[1.04]"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-10"
              style={{
                background:
                  "linear-gradient(135deg, rgba(232,223,204,0.55), rgba(245,239,228,0.25))",
              }}
            />
            <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-[var(--muted)]">
              04 · 2024 · Commerce
            </span>
            <div className="flex items-end justify-between">
              <h3 className="font-display text-[34px] font-normal leading-tight tracking-[-0.02em]">
                JJ Paper.
              </h3>
              <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-[var(--muted)]">→</span>
            </div>
          </Link>

          {/* Sandbourne */}
          <Link
            href="#"
            className="group relative isolate flex flex-col justify-between overflow-hidden rounded-[22px] p-6 text-[var(--ink)] transition-all hover:-translate-y-0.5 max-md:col-span-full md:col-span-4 md:row-span-2"
          >
            <Image
              src="/abstract-sandbourne.png"
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 420px"
              className="-z-10 object-cover transition-transform duration-[900ms] group-hover:scale-[1.04]"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-10"
              style={{
                background:
                  "linear-gradient(180deg, rgba(245,239,228,0.35) 0%, rgba(245,239,228,0.1) 40%, rgba(21,20,15,0.35) 100%)",
              }}
            />
            <span className="relative font-mono text-[10.5px] uppercase tracking-[0.22em] text-[var(--muted)]">
              05 · 2024 · Hospitality
            </span>
            <div className="relative">
              <h3 className="font-display text-[34px] font-normal leading-tight tracking-[-0.02em] text-[var(--paper)]" style={{textShadow:"0 1px 14px rgba(21,20,15,0.35)"}}>
                Sandbourne.
              </h3>
              <p className="mt-2 max-w-[28ch] text-[13px] leading-[1.5] text-[rgba(245,239,228,0.92)]" style={{textShadow:"0 1px 10px rgba(21,20,15,0.45)"}}>
                A reservations engine for boutique inns — effortless from first
                tap to front desk.
              </p>
            </div>
            <div className="relative flex items-center justify-between font-mono text-[10.5px] uppercase tracking-[0.2em] text-[rgba(245,239,228,0.75)]">
              <span className="inline-flex items-center gap-1.5 text-[var(--paper)]">
                Case <ArrowUp />
              </span>
            </div>
          </Link>

          {/* Journal */}
          <Link
            href="#"
            className="group relative flex flex-col justify-between overflow-hidden rounded-[22px] bg-[var(--surface)] p-6 text-[var(--surface-ink)] transition-all hover:-translate-y-0.5 max-md:col-span-full md:col-span-8 md:row-span-1"
          >
            <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-[rgba(245,239,228,0.55)]">
              Journal · weekly
            </span>
            <h3 className="font-display text-[28px] font-normal leading-tight tracking-[-0.02em]">
              № 18 — <em className="italic text-[var(--accent)]">Design at the code.</em>
            </h3>
            <div className="flex items-center justify-between font-mono text-[10.5px] uppercase tracking-[0.2em] text-[rgba(245,239,228,0.55)]">
              <span className="inline-flex items-center gap-1.5 text-[var(--paper)]">
                Read <ArrowUp />
              </span>
              <span>6 min</span>
            </div>
          </Link>
        </div>

        <p className="mt-9 max-w-[440px] font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
          A few engagements are covered by NDAs and don&rsquo;t appear here. Happy
          to walk through them on a call.
        </p>
      </div>
    </section>
  );
}
