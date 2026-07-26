"use client";

import { m, useReducedMotion } from "framer-motion";
import { ShieldCheck, Sparkles, Zap } from "lucide-react";
import { site } from "@/lib/site";
import {
  CountUp,
  EASE,
  IMac,
  MacBook,
  ParticleField,
  Reveal,
  TextReveal,
  Tilt,
} from "@/components/fx";
import { heroStats } from "../data";
import { Btn } from "../primitives";

const chips = [
  { label: "WCAG 2.2 AA", icon: ShieldCheck, position: "left-[-9%] top-[26%]" },
  { label: "100/100 speed budget", icon: Zap, position: "right-[-7%] top-[6%]" },
  { label: "No templates", icon: Sparkles, position: "left-[-2%] bottom-[2%]" },
] as const;

/**
 * The fold — the one place the page inverts to cocoa.
 *
 * A Bricolage headline in cream over a warm-lit night band, a gold stat
 * row beneath it, and to the right a desk: the Willowbrook Surgery
 * sample practice site on an iMac at the back, the Pembroke Care build
 * on a MacBook in front of it. Real hardware rather than floating
 * rectangles, because the claim being made is that these are websites
 * people actually sit down in front of.
 *
 * The three-colour rule cuts the band off at the bottom, which is where
 * the cream page begins. Everything decorative is aria-hidden, and the
 * whole composition renders still (but complete) under reduced motion.
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

      <div className="relative mx-auto grid w-full max-w-[1240px] items-center gap-16 px-5 sm:px-8 lg:grid-cols-[1.04fr_0.96fr] lg:gap-12">
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
            className="au-display-hero mt-7 max-w-[640px] text-[clamp(2.6rem,6vw,4.5rem)]"
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
                  <dd className="au-label mt-2.5 leading-[1.55] tracking-[0.1em] text-au-muted">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* The desk. */}
        <div className="relative mx-auto w-full max-w-[560px] lg:max-w-none">
          <Tilt strength={5} className="relative">
            {/* The iMac stands at the back of the desk, carrying the
                sample practice site. Hidden below `sm`, where there is
                no room for two machines and the MacBook alone tells the
                story. */}
            <m.div
              className="relative hidden w-[78%] sm:block [transform:translateZ(12px)]"
              initial={reduce ? false : { y: 34, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: EASE, delay: 0.5 }}
            >
              <IMac
                shell="dark"
                shot={{
                  src: "/demos/gp-home.png",
                  alt: "",
                  tint: "#f0f4f5",
                  sizes: "(max-width: 1024px) 56vw, 400px",
                }}
              />
            </m.div>

            {/* The MacBook sits in front of it and to the right,
                carrying the strongest build. On its own below `sm`. */}
            <m.div
              className="relative w-full sm:absolute sm:-bottom-[9%] sm:-right-[3%] sm:w-[68%] sm:[transform:translateZ(56px)]"
              initial={reduce ? false : { y: 46, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: EASE, delay: 0.32 }}
            >
              <MacBook
                shell="light"
                shot={{
                  src: "/project-pembroke.png",
                  alt: "The Pembroke Care website, designed and built by Flutterly",
                  tint: "#f7f2ea",
                  priority: true,
                  sizes: "(max-width: 1024px) 76vw, 360px",
                }}
              />
              <figcaption className="sr-only">
                Live client work: Pembroke Care, and the Willowbrook Surgery
                sample practice website
              </figcaption>
            </m.div>

            {/* Warm light pooling under the desk. */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-[6%] bottom-[-12%] h-24 rounded-[50%] bg-au-amber/25 blur-3xl"
            />
          </Tilt>

          {chips.map((chip, i) => {
            const Icon = chip.icon;
            return (
              <m.span
                key={chip.label}
                aria-hidden
                className={`absolute ${chip.position} z-20 hidden items-center gap-2 rounded-full border border-au-line-2 bg-au-night/85 px-3.5 py-2 text-[12.5px] font-medium text-au-ink shadow-[0_18px_40px_-20px_rgba(0,0,0,0.9)] backdrop-blur-md lg:inline-flex`}
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
