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
 * The fold. A live particle field and a slow conic sunrise sit behind
 * the headline; to the right, two client sites float in glass browser
 * frames on a shared 3D tilt, with capability chips pinned in the space
 * between them. Everything decorative is aria-hidden, and the whole
 * composition renders still (but complete) under reduced motion.
 */
export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section id="top" className="relative overflow-hidden pb-16 pt-10 sm:pb-24 sm:pt-16">
      <ParticleField className="opacity-90" />

      {/* Slow conic sunrise behind the headline. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[30%] -top-[45%] h-[90vh] w-[90vh] opacity-[0.55]"
      >
        <div className="animate-spin-slow h-full w-full rounded-full bg-[conic-gradient(from_180deg,transparent_0%,rgba(47,216,173,0.28)_18%,transparent_38%,rgba(92,178,255,0.24)_62%,transparent_82%)] blur-[60px]" />
      </div>

      <div className="relative mx-auto grid w-full max-w-[1240px] items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.06fr_0.94fr] lg:gap-8">
        <div className="relative">
          <Reveal y={16} blur={4}>
            <p className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.045] py-1.5 pl-2.5 pr-4 text-[12.5px] font-medium text-au-ink-2 backdrop-blur-md">
              <span className="relative flex h-2 w-2" aria-hidden>
                <span className="animate-pulse-soft absolute inline-flex h-full w-full rounded-full bg-au-teal" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-au-teal" />
              </span>
              Independent product studio · Reading, UK
            </p>
          </Reveal>

          <TextReveal
            as="h1"
            delay={0.12}
            stagger={0.06}
            className="mt-7 max-w-[660px] text-[clamp(2.6rem,6.6vw,4.6rem)] font-medium leading-[1.02] tracking-[-0.04em]"
            segments={[
              { text: "Websites that care for" },
              { text: "the people", tone: "gradient" },
              { text: "who use them." },
            ]}
          />

          <Reveal delay={0.3}>
            <p className="mt-7 max-w-[520px] text-[17px] leading-relaxed text-au-ink-2">
              Flutterly designs and builds accessible, fast websites for GP
              practices, care homes and ambitious products — custom-coded in
              the UK and looked after by the person who built them.
            </p>
          </Reveal>

          <Reveal delay={0.4} className="mt-9 flex flex-wrap items-center gap-3">
            <Btn href="/free-audit" tone="primary" arrow>
              Get your free website audit
            </Btn>
            <Btn href="/packages" tone="glass">
              See packages
            </Btn>
          </Reveal>

          <Reveal delay={0.5}>
            <dl className="mt-14 grid max-w-[620px] grid-cols-2 gap-x-7 gap-y-8 border-t border-white/8 pt-9 sm:grid-cols-4">
              {heroStats.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="flex min-h-[2.3em] items-start text-[clamp(1.05rem,1.7vw,1.35rem)] font-semibold leading-tight tracking-tight text-balance text-au-ink">
                    <CountUp value={stat.value} />
                  </dd>
                  <dd className="mt-2 text-[12px] leading-snug text-au-muted">
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
              className="absolute -right-[1%] top-[4%] hidden w-[74%] overflow-hidden rounded-[20px] border border-white/10 bg-[#0a161b]/90 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.95)] backdrop-blur-md sm:block [transform:translateZ(20px)_rotate(4deg)]"
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
              className="relative w-[88%] overflow-hidden rounded-[22px] border border-white/12 bg-[#0a161b]/95 shadow-[0_50px_110px_-40px_rgba(0,0,0,0.95)] backdrop-blur-md sm:mt-20 [transform:translateZ(55px)_rotate(-2deg)]"
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

            {/* Glow pooling under the stack. */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-[8%] bottom-[-8%] h-24 rounded-[50%] bg-au-teal/25 blur-3xl"
            />
          </Tilt>

          {chips.map((chip, i) => {
            const Icon = chip.icon;
            return (
              <m.span
                key={chip.label}
                aria-hidden
                className={`absolute ${chip.position} z-20 hidden items-center gap-2 rounded-full border border-white/12 bg-[#08131a]/85 px-3.5 py-2 text-[12.5px] font-medium text-au-ink shadow-[0_18px_40px_-20px_rgba(0,0,0,0.9)] backdrop-blur-md sm:inline-flex`}
                initial={reduce ? false : { y: 18, opacity: 0, scale: 0.94 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.85 + i * 0.14 }}
              >
                <Icon size={14} className="text-au-teal" />
                {chip.label}
              </m.span>
            );
          })}
        </div>
      </div>

      {/* Scroll cue */}
      <div
        aria-hidden
        className="relative mx-auto mt-14 hidden h-14 w-px overflow-hidden bg-white/10 lg:block"
      >
        <m.span
          className="absolute inset-x-0 top-0 h-5 bg-[linear-gradient(180deg,transparent,var(--au-teal))]"
          initial={reduce ? false : { y: -20 }}
          animate={reduce ? {} : { y: 56 }}
          transition={{ duration: 2.2, ease: "easeInOut", repeat: Infinity }}
        />
      </div>

      <p className="sr-only">Contact Flutterly: {site.email}</p>
    </section>
  );
}

/** The three-dot title bar shared by every browser frame on the site. */
export function BrowserChrome({ label }: { label?: string }) {
  return (
    <div className="flex items-center gap-2 border-b border-white/8 bg-white/[0.04] px-3.5 py-2.5">
      <span className="flex gap-1.5" aria-hidden>
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="h-2 w-2 rounded-full bg-white/15" />
      </span>
      {label ? (
        <span className="au-mono ml-2 truncate rounded-full bg-white/[0.05] px-2.5 py-0.5 text-[10.5px] text-au-muted">
          {label}
        </span>
      ) : null}
    </div>
  );
}
