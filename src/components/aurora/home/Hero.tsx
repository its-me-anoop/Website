"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { m, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { AuroraCanvas } from "../effects/AuroraCanvas";
import { Embers } from "../effects/Embers";
import { Magnetic } from "../effects/Motion";
import { useMotionAllowed } from "../effects/hooks";
import { AuditBar, ButtonLink, Display } from "../ui/primitives";

const facts = [
  { value: "WCAG 2.2 AA", label: "Designed in on every build" },
  { value: "~60 checks", label: "In the free instant audit" },
  { value: "1 person", label: "Designs, builds and supports it" },
  { value: "£995", label: "Published starting price" },
] as const;

/**
 * Full-height opening: the live WebGL aurora over drifting CSS light,
 * a perspective grid, a word-by-word headline, the audit bar and a
 * glass strip of plain facts. The headline block drifts up and fades
 * as the page scrolls away.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const motion = useMotionAllowed();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} id="top" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10 bg-a-void">
        <div className="a-blobs">
          <span />
          <span />
          <span />
        </div>
        <AuroraCanvas reduced={!motion} />
        <Embers enabled={motion} />
        <div className="a-grid absolute inset-0 [transform:perspective(800px)_rotateX(55deg)_translateY(18%)_scale(1.6)] [transform-origin:50%_100%]" />
        {/* Scrim: keeps body copy on the brightest curtains above 4.5:1. */}
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 48% 42% at 50% 55%, rgba(11,9,7,0.62), transparent 100%)" }}
        />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-a-void" />
      </div>

      <m.div
        style={motion ? { y, opacity } : undefined}
        className="mx-auto flex w-full max-w-[1320px] flex-1 flex-col items-center justify-center px-5 pb-12 pt-28 text-center sm:px-8 sm:pt-32"
      >
        <Link
          href="/leaving-msw"
          className="a-fade-up a-glass group inline-flex items-center gap-3 rounded-full py-1.5 pl-1.5 pr-4 text-[13.5px] text-a-ink-soft transition-colors hover:text-a-ink"
        >
          <span className="a-mono rounded-full bg-a-amber px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.08em] text-a-void">
            New
          </span>
          <span>
            Leaving My Surgery Website?<span className="sr-only sm:not-sr-only"> Meet Clear Path</span>
          </span>
          <ArrowRight size={14} aria-hidden className="transition-transform group-hover:translate-x-0.5" />
        </Link>

        <Display as="h1" size="hero" split delay={0} className="mt-8 max-w-[16ch]">
          Healthcare websites, <em>beautifully</em> built.
        </Display>

        <p
          className="a-fade-up mx-auto mt-8 max-w-[640px] text-[17px] leading-[1.65] text-a-ink-soft sm:text-[19px]"
          style={{ ["--d" as string]: "250ms" }}
        >
          Flutterly designs and builds websites for GP practices, care homes and clinics. Custom-coded in
          Reading, accessible to WCAG 2.2 AA, and looked after by the person who built them.
        </p>

        <div
          className="a-fade-up mt-10 flex w-full flex-col items-center gap-5"
          style={{ ["--d" as string]: "320ms" }}
        >
          <AuditBar align="center" />
          <div className="flex flex-wrap items-center justify-center gap-3">
            <ButtonLink href="/book" tone="glass" size="sm" arrow="right" magnetic>
              Book a call
            </ButtonLink>
            <ButtonLink href="#services" tone="ghost" size="sm">
              Explore the sample sites
            </ButtonLink>
          </div>
        </div>
      </m.div>

      <div
        className="a-fade-up relative mx-auto w-full max-w-[1320px] px-5 pb-8 sm:px-8"
        style={{ ["--d" as string]: "420ms" }}
      >
        <dl className="a-glass grid grid-cols-2 overflow-hidden rounded-[24px] lg:grid-cols-4">
          {facts.map((fact, i) => (
            <div
              key={fact.value}
              className={
                "flex flex-col gap-1 px-5 py-5 sm:px-7 " +
                (i % 2 === 1 ? "border-l border-a-line " : "") +
                (i >= 2 ? "border-t border-a-line lg:border-t-0 " : "") +
                (i === 2 ? "lg:border-l" : "")
              }
            >
              <dt className="order-2 text-[13px] leading-snug text-a-muted">{fact.label}</dt>
              <dd className="a-display order-1 text-[clamp(1.35rem,2.4vw,1.9rem)]">{fact.value}</dd>
            </div>
          ))}
        </dl>
        <Magnetic className="absolute -top-16 right-8 hidden xl:inline-flex">
          <a
            href="#services"
            aria-label="Scroll to the sample sites"
            className="group flex h-24 w-24 items-center justify-center rounded-full border border-a-line-2 backdrop-blur-md"
          >
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full motion-safe:animate-[spin_16s_linear_infinite]" aria-hidden>
              <defs>
                <path id="hero-circle" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" />
              </defs>
              <text className="a-mono fill-a-ink-soft text-[9.5px] uppercase tracking-[0.3em]">
                <textPath href="#hero-circle">Scroll · Explore · Scroll · Explore ·</textPath>
              </text>
            </svg>
            <ArrowRight size={18} aria-hidden className="rotate-90 text-a-amber transition-transform group-hover:translate-y-1" />
          </a>
        </Magnetic>
      </div>
    </section>
  );
}
