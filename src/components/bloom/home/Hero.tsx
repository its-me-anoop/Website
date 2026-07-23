"use client";

import Image from "next/image";
import { m, useReducedMotion } from "framer-motion";
import { site } from "@/lib/site";
import { heroStats } from "../data";
import { BtnLink, EASE, RevealWords, Rise } from "../primitives";

const floatChips = [
  { label: "WCAG 2.2 AA", className: "-left-3 top-8" },
  { label: "UK hosting", className: "-right-2 top-1/3" },
  { label: "No templates", className: "left-6 -bottom-4" },
] as const;

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section id="top" className="relative overflow-hidden">
      <div aria-hidden className="bl-grid absolute inset-0" />
      <div className="relative mx-auto grid w-full max-w-[1240px] gap-14 px-5 pb-16 pt-14 sm:px-8 sm:pt-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:pb-24">
        <div>
          <Rise>
            <p className="inline-flex items-center gap-2 rounded-full border border-bl-line-2 bg-bl-surface px-4 py-1.5 text-[12.5px] font-medium text-bl-ink-soft">
              <span className="h-1.5 w-1.5 rounded-full bg-bl-teal" aria-hidden />
              Independent product studio · Reading, UK
            </p>
          </Rise>
          <RevealWords
            as="h1"
            delay={0.1}
            className="mt-6 max-w-[620px] text-[clamp(2.5rem,6.4vw,4.2rem)] font-medium leading-[1.04] tracking-[-0.035em]"
            segments={[
              { text: "Websites that care for" },
              { text: "the people", tone: "teal" },
              { text: "who use them." },
            ]}
          />
          <Rise delay={0.25}>
            <p className="mt-6 max-w-[520px] text-[16.5px] leading-relaxed text-bl-ink-soft">
              Flutterly designs and builds accessible, fast websites for GP
              practices, care homes and ambitious products — custom-coded in
              the UK and looked after by the person who built them.
            </p>
          </Rise>
          <Rise delay={0.35} className="mt-8 flex flex-wrap items-center gap-3">
            <BtnLink href="/free-audit" tone="teal" arrow>
              Get your free website audit
            </BtnLink>
            <BtnLink href="/packages" tone="outline">
              See packages
            </BtnLink>
          </Rise>
          <Rise delay={0.45}>
            <dl className="mt-12 grid max-w-[560px] grid-cols-2 gap-x-8 gap-y-7 border-t border-bl-line pt-8 sm:grid-cols-4">
              {heroStats.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="text-[22px] font-semibold tracking-tight text-bl-ink">
                    {stat.value}
                  </dd>
                  <dd className="mt-1 text-[12.5px] leading-snug text-bl-muted">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>
          </Rise>
        </div>

        {/* Layered browser cards of live client work. */}
        <div className="relative mx-auto w-full max-w-[460px] lg:max-w-none">
          <m.div
            aria-hidden
            className="absolute -right-4 top-10 hidden w-[78%] rotate-3 overflow-hidden rounded-2xl border border-bl-line bg-bl-surface shadow-[0_30px_70px_-30px_rgba(11,47,40,0.4)] sm:block"
            initial={reduce ? false : { y: 40, opacity: 0, rotate: 6 }}
            animate={{ y: 0, opacity: 1, rotate: 3 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.35 }}
          >
            <div className="flex items-center gap-1.5 border-b border-bl-line bg-bl-band-2 px-3 py-2">
              <span className="h-2 w-2 rounded-full bg-bl-line-2" />
              <span className="h-2 w-2 rounded-full bg-bl-line-2" />
              <span className="h-2 w-2 rounded-full bg-bl-line-2" />
            </div>
            <Image
              src="/project-greenmead.png"
              alt=""
              width={640}
              height={420}
              className="h-auto w-full object-cover"
            />
          </m.div>

          <m.figure
            className="relative w-[88%] overflow-hidden rounded-2xl border border-bl-line bg-bl-surface shadow-[0_30px_70px_-28px_rgba(11,47,40,0.45)] sm:mt-24 sm:-rotate-2"
            initial={reduce ? false : { y: 48, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
          >
            <div className="flex items-center gap-1.5 border-b border-bl-line bg-bl-band-2 px-3 py-2">
              <span className="h-2 w-2 rounded-full bg-bl-line-2" />
              <span className="h-2 w-2 rounded-full bg-bl-line-2" />
              <span className="h-2 w-2 rounded-full bg-bl-line-2" />
            </div>
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

          {floatChips.map((chip, i) => (
            <m.span
              key={chip.label}
              aria-hidden
              className={`absolute ${chip.className} rounded-full border border-bl-line bg-bl-surface px-3.5 py-1.5 text-[12.5px] font-semibold text-bl-teal shadow-[0_14px_30px_-16px_rgba(11,47,40,0.4)]`}
              initial={reduce ? false : { y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.6 + i * 0.12 }}
            >
              {chip.label}
            </m.span>
          ))}
        </div>
      </div>
      <p className="sr-only">Contact Flutterly: {site.email}</p>
    </section>
  );
}
