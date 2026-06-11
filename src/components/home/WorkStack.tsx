"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ConciergeBell,
  Images,
  Leaf,
  Package,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "./Reveal";

type Project = {
  name: string;
  index: string;
  meta: string;
  live?: boolean;
  description: string;
  chips?: string[];
  cta: { label: string; href: string; internal?: boolean };
  accent: string; // hex accent colour
  accentRgb: string; // same accent as "r,g,b" for alpha effects
  cardBg: string;
  top: string; // sticky offset (stagger so stacked headers peek)
  minH: string;
  icon?: LucideIcon;
  mascot?: boolean;
};

const PROJECTS: Project[] = [
  {
    name: "Sipli",
    index: "01",
    meta: "iOS · watchOS — 2026",
    live: true,
    description:
      "A hydration tracker that adapts — to weight, workouts, weather, and the hour. On-device intelligence and a SwiftUI architecture that holds 120hz on iPhone and Apple Watch.",
    chips: ["35+ BEVERAGES", "ON-DEVICE AI", "HEALTHKIT"],
    cta: { label: "Case study", href: "/projects/sipli", internal: true },
    accent: "#3DF2C4",
    accentRgb: "61,242,196",
    cardBg: "rgba(11,14,22,.72)",
    top: "13vh",
    minH: "lg:min-h-[66vh]",
    mascot: true,
  },
  {
    name: "Artling",
    index: "02",
    meta: "iOS — 2025 — Shipped",
    description:
      "A visual archive for children's milestones — the loud years, kept quietly. Built native in SwiftUI with a local-first photo pipeline.",
    cta: { label: "Case study", href: "/projects/artling", internal: true },
    accent: "#FF6FCB",
    accentRgb: "255,111,203",
    cardBg: "rgba(13,11,20,.72)",
    top: "15vh",
    minH: "lg:min-h-[62vh]",
    icon: Images,
  },
  {
    name: "Greenmead",
    index: "03",
    meta: "Brand · Web — 2024",
    description:
      "Brand and marketing site for a wellness practice — calm pages that load like they mean it. Edge-rendered Next.js, 100/100 Lighthouse.",
    cta: { label: "Ask about it", href: "#contact" },
    accent: "#7CE38B",
    accentRgb: "124,227,139",
    cardBg: "rgba(10,14,16,.72)",
    top: "17vh",
    minH: "lg:min-h-[58vh]",
    icon: Leaf,
  },
  {
    name: "JJ Paper",
    index: "04",
    meta: "Commerce — 2024",
    description:
      "A custom paper-goods storefront with a print-on-demand pipeline running quietly behind it — Stripe in front, presses out back.",
    cta: { label: "Ask about it", href: "#contact" },
    accent: "#FFB45C",
    accentRgb: "255,180,92",
    cardBg: "rgba(16,13,10,.72)",
    top: "19vh",
    minH: "lg:min-h-[54vh]",
    icon: Package,
  },
  {
    name: "Sandbourne",
    index: "05",
    meta: "Hospitality — 2024",
    description:
      "A reservations engine for boutique hotels, built for the Saturday-night rush — real-time availability without the double-bookings.",
    cta: { label: "Ask about it", href: "#contact" },
    accent: "#8B7CFF",
    accentRgb: "139,124,255",
    cardBg: "rgba(12,11,20,.72)",
    top: "21vh",
    minH: "lg:min-h-[50vh]",
    icon: ConciergeBell,
  },
];

function CardCta({ project }: { project: Project }) {
  const className =
    "mt-9 inline-flex items-center gap-2.5 font-grotesk text-[15px] font-bold transition-[gap] duration-[250ms] hover:gap-4";
  const style = { color: project.accent };
  const label = (
    <>
      {project.cta.label} <ArrowRight size={16} aria-hidden />
    </>
  );
  return project.cta.internal ? (
    <Link href={project.cta.href} className={className} style={style}>
      {label}
    </Link>
  ) : (
    <a href={project.cta.href} className={className} style={style}>
      {label}
    </a>
  );
}

function CardVisual({ project }: { project: Project }) {
  const Icon = project.icon;
  return (
    <div className="relative h-[240px] overflow-hidden border-t border-white/[.07] lg:h-auto lg:border-l lg:border-t-0">
      <div
        className="absolute left-1/2 top-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: `radial-gradient(circle, rgba(${project.accentRgb},.26) 0%, transparent 65%)`,
        }}
      />
      <div
        aria-hidden
        className="absolute -top-[8%] -right-[6%] select-none font-syne text-[220px] font-extrabold leading-none lg:text-[380px]"
        style={{ color: `rgba(${project.accentRgb},.07)` }}
      >
        {project.index}
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        {project.mascot ? (
          <>
            <div className="absolute h-[200px] w-[200px] rounded-full border border-dashed border-frost/[.18] [animation:au-spin_50s_linear_infinite] lg:h-[340px] lg:w-[340px]" />
            <Image
              src="/images/sipli-mascot.png"
              alt="Sipli mascot"
              width={210}
              height={210}
              className="h-[130px] w-[130px] object-contain [animation:au-float_6s_ease-in-out_infinite] [filter:drop-shadow(0_30px_40px_rgba(0,0,0,.55))] lg:h-[210px] lg:w-[210px]"
            />
          </>
        ) : (
          Icon && (
            <div
              className="flex h-[120px] w-[120px] items-center justify-center rounded-[32px]"
              style={{
                background: `rgba(${project.accentRgb},.12)`,
                border: `1px solid rgba(${project.accentRgb},.35)`,
                boxShadow: `0 0 60px rgba(${project.accentRgb},.24)`,
              }}
            >
              <Icon size={48} style={{ color: project.accent }} aria-hidden />
            </div>
          )
        )}
      </div>
    </div>
  );
}

function StackCard({
  project,
  isLast,
  cardRef,
}: {
  project: Project;
  isLast: boolean;
  cardRef: (el: HTMLDivElement | null) => void;
}) {
  return (
    <div
      ref={cardRef}
      data-stack-card
      className={`sticky grid overflow-hidden rounded-[32px] border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,.09),0_30px_80px_rgba(0,0,0,.5)] backdrop-blur-[28px] lg:grid-cols-[1.05fr_.95fr] ${
        isLast ? "mb-[8vh]" : "mb-[11vh]"
      } ${project.minH}`}
      style={{ top: project.top, background: project.cardBg }}
    >
      <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-16">
        <div className="flex flex-wrap items-center gap-x-[18px] gap-y-2">
          <span
            className="font-jb text-xs tracking-[0.2em]"
            style={{ color: project.accent }}
          >
            {project.index} / 05
          </span>
          <span className="font-jb text-[11px] uppercase tracking-[0.18em] text-frost/50">
            {project.meta}
          </span>
          {project.live && (
            <span className="inline-flex items-center gap-[7px] rounded-full border border-mint/35 px-3 py-[5px] font-jb text-[10px] uppercase tracking-[0.18em] text-mint">
              <span className="h-1.5 w-1.5 rounded-full bg-mint [animation:au-pulse_2.4s_infinite]" />
              Live
            </span>
          )}
        </div>
        <div className="mt-7 font-syne text-[clamp(38px,4.4vw,68px)] font-extrabold tracking-[-0.02em] text-frost">
          {project.name}
        </div>
        <p className="mb-0 mt-4 max-w-[440px] text-base leading-[1.65] text-frost/65">
          {project.description}
        </p>
        {project.chips && (
          <div className="mt-7 flex flex-wrap gap-2.5">
            {project.chips.map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-white/[.14] px-3.5 py-[7px] font-jb text-[11px] tracking-[0.12em] text-frost/70"
              >
                {chip}
              </span>
            ))}
          </div>
        )}
        <div>
          <CardCta project={project} />
        </div>
      </div>
      <CardVisual project={project} />
    </div>
  );
}

/**
 * Sticky-stacking work showcase: each card pins below the nav while the
 * next slides over it; the covered card scales down and dims in
 * proportion to how much of it is hidden.
 */
export function WorkStack() {
  const cardsRef = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const onScroll = () => {
      const cards = cardsRef.current;
      for (let i = 0; i < cards.length - 1; i++) {
        const card = cards[i];
        const next = cards[i + 1];
        if (!card || !next) continue;
        const r = card.getBoundingClientRect();
        const nr = next.getBoundingClientRect();
        const covered = Math.min(
          1,
          Math.max(0, (r.bottom - nr.top) / r.height)
        );
        card.style.transform = `scale(${1 - covered * 0.06})`;
        card.style.filter = `brightness(${1 - covered * 0.45})`;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="work" className="relative z-[1] px-6 pb-[60px] pt-[150px] md:px-12">
      <div className="mx-auto max-w-[1320px]">
        <Reveal className="mb-5 font-jb text-[11px] uppercase tracking-[0.3em] text-mint">
          <span className="text-frost/40">01 /</span> Selected work
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mb-20 mt-0 font-syne text-[clamp(34px,5.6vw,84px)] font-extrabold uppercase leading-none tracking-[-0.03em] text-frost">
            Five products,
            <br />
            <span className="text-outline">five problems.</span>
          </h2>
        </Reveal>

        {PROJECTS.map((project, i) => (
          <StackCard
            key={project.name}
            project={project}
            isLast={i === PROJECTS.length - 1}
            cardRef={(el) => {
              cardsRef.current[i] = el;
            }}
          />
        ))}

        <Reveal>
          <p className="mb-0 mt-6 text-center font-jb text-[11px] uppercase tracking-[0.18em] text-frost/[.38]">
            A few projects live under NDA — ask, and I&rsquo;ll walk you
            through what I can.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
