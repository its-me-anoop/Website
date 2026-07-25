"use client";

import Image from "next/image";
import { m, useReducedMotion } from "framer-motion";
import { ShieldCheck, Sparkles, Zap } from "lucide-react";
import { site } from "@/lib/site";
import {
  CountUp,
  EASE,
  ParticleField,
  Reveal,
  TextReveal,
  Tilt,
} from "@/components/fx";
import { heroStats } from "../data";
import { Btn } from "../primitives";

const chips = [
  { label: "WCAG 2.2 AA", icon: ShieldCheck, position: "left-[-7%] top-[1%]" },
  { label: "100/100 speed budget", icon: Zap, position: "right-[-4%] top-[52%]" },
  { label: "No templates", icon: Sparkles, position: "left-[4%] bottom-[2%]" },
] as const;

/**
 * The fold — the one place the page inverts to cocoa.
 *
 * A Fraunces headline in cream over a warm-lit night band, a gold stat
 * row beneath it, and to the right two client sites floating in glass
 * browser frames on a shared 3D tilt, with capability chips pinned in
 * the space between them. The three-colour rule cuts the band off at
 * the bottom, which is where the cream page begins.
 *
 * Everything decorative is aria-hidden, and the whole composition
 * renders still (but complete) under reduced motion.
 */
export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="top"
      className="au-night au-grain au-rule-bottom au-rule-heavy relative overflow-hidden pb-20 pt-14 sm:pb-28 sm:pt-20"
    >
      <div
        aria-hidden
        className="au-wash-night pointer-events-none absolute inset-0"
      />
      <ParticleField className="opacity-80" />

      <div className="relative mx-auto grid w-full max-w-[1240px] items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.06fr_0.94fr] lg:gap-8">
        <div className="relative">
          <Reveal y={16} blur={4}>
            <p className="inline-flex items-center gap-2.5 rounded-full border border-au-line bg-au-surface-2 py-1.5 pl-2.5 pr-4 text-[12.5px] font-medium text-au-ink-2 backdrop-blur-md">
              <span className="relative flex h-2 w-2" aria-hidden>
                <span className="animate-pulse-soft absolute inline-flex h-full w-full rounded-full bg-au-teal-lift" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-au-teal-lift" />
              </span>
              Independent product studio · Reading, UK
            </p>
          </Reveal>

          <TextReveal
            as="h1"
            delay={0.12}
            stagger={0.06}
            className="au-display-hero mt-7 max-w-[680px] text-[clamp(2.7rem,6.4vw,4.75rem)]"
            segments={[
              { text: "Websites that care for" },
              { text: "the people", tone: "gradient" },
              { text: "who use them." },
            ]}
          />

          <Reveal delay={0.3}>
            <p className="mt-7 max-w-[520px] text-[17px] leading-[1.62] text-au-ink-2">
              Flutterly designs and builds accessible, fast websites for GP
              practices, care homes and ambitious products — custom-coded in
              the UK and looked after by the person who built them.
            </p>
          </Reveal>

          <Reveal delay={0.4} className="mt-9 flex flex-wrap items-center gap-3">
            <Btn href="/free-audit" tone="cream" arrow>
              Get your free website audit
            </Btn>
            <Btn href="/packages" tone="outline">
              See packages
            </Btn>
          </Reveal>

          <Reveal delay={0.5}>
            <dl className="mt-14 grid max-w-[620px] grid-cols-2 gap-x-7 gap-y-8 border-t border-au-line pt-9 sm:grid-cols-4">
              {heroStats.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="flex min-h-[2.3em] items-start text-balance text-[clamp(1.1rem,1.8vw,1.4rem)] font-bold leading-tight tracking-[-0.02em] text-au-gold">
                    <CountUp value={stat.value} />
                  </dd>
                  <dd className="au-label mt-2.5 tracking-[0.14em] leading-[1.5] text-au-muted">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* Layered browser frames of live client work. */}
        <div className="relative mx-auto w-full max-w-[520px] lg:max-w-none">
          <Tilt strength={7} className="relative">
            <m.div
              aria-hidden
              className="absolute -right-[1%] top-[4%] hidden w-[74%] overflow-hidden rounded-[var(--r-lg)] border border-au-line-2 bg-au-night-2/90 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.95)] backdrop-blur-md sm:block [transform:translateZ(20px)_rotate(4deg)]"
              initial={reduce ? false : { y: 44, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: EASE, delay: 0.5 }}
            >
              <BrowserChrome label="greenmead.co.uk" />
              <Image
                src="/project-greenmead.png"
                alt=""
                width={640}
                height={420}
                className="h-auto w-full object-cover opacity-90"
              />
            </m.div>

            <m.figure
              className="relative w-[88%] overflow-hidden rounded-[var(--r-xl)] border border-au-line-2 bg-au-night-2/95 shadow-[0_50px_110px_-40px_rgba(0,0,0,0.95)] backdrop-blur-md sm:mt-20 [transform:translateZ(55px)_rotate(-2deg)]"
              initial={reduce ? false : { y: 56, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: EASE, delay: 0.32 }}
            >
              <BrowserChrome label="sandbournecare.co.uk" />
              <Image
                src="/project-sandbourne.png"
                alt="The Sandbourne Care website, designed and built by Flutterly"
                width={640}
                height={420}
                priority
                className="h-auto w-full object-cover"
              />
              <figcaption className="sr-only">
                Live client work: Sandbourne Care and Greenmead Housing
              </figcaption>
            </m.figure>

            {/* Warm light pooling under the stack. */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-[8%] bottom-[-8%] h-24 rounded-[50%] bg-au-amber/25 blur-3xl"
            />
          </Tilt>

          {chips.map((chip, i) => {
            const Icon = chip.icon;
            return (
              <m.span
                key={chip.label}
                aria-hidden
                className={`absolute ${chip.position} z-20 hidden items-center gap-2 rounded-full border border-au-line-2 bg-au-night/85 px-3.5 py-2 text-[12.5px] font-medium text-au-ink shadow-[0_18px_40px_-20px_rgba(0,0,0,0.9)] backdrop-blur-md sm:inline-flex`}
                initial={reduce ? false : { y: 18, opacity: 0, scale: 0.94 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.85 + i * 0.14 }}
              >
                <Icon size={14} className="text-au-teal-lift" />
                {chip.label}
              </m.span>
            );
          })}
        </div>
      </div>

      <p className="sr-only">Contact Flutterly: {site.email}</p>
    </section>
  );
}

/** The three-dot title bar shared by every browser frame on the site. */
export function BrowserChrome({ label }: { label?: string }) {
  return (
    <div className="flex items-center gap-2 border-b border-au-line bg-au-surface px-3.5 py-2.5">
      <span className="flex gap-1.5" aria-hidden>
        <span className="h-2 w-2 rounded-full bg-au-surface-3" />
        <span className="h-2 w-2 rounded-full bg-au-surface-3" />
        <span className="h-2 w-2 rounded-full bg-au-surface-3" />
      </span>
      {label ? (
        <span className="au-label ml-2 truncate rounded-full bg-au-surface-2 px-2.5 py-0.5 text-[10px] tracking-[0.14em] text-au-muted">
          {label}
        </span>
      ) : null}
    </div>
  );
}
