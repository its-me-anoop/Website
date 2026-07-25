"use client";

import Image from "next/image";
import { ShieldCheck } from "lucide-react";
import { GlassCard, Parallax, Reveal, Stagger, StaggerItem, TextReveal, Tilt } from "@/components/fx";
import { Shell } from "../Shell";
import { CtaBand } from "../CtaBand";
import { BrowserChrome } from "../home/Hero";
import type { Sector } from "../data";
import { Btn, CheckItem, FaqList, Section, SectionHead } from "../primitives";

const accents = {
  nhs: {
    text: "text-au-nhs",
    glow: "bg-au-nhs/20",
    chip: "border-au-nhs/25 bg-au-nhs/10 text-au-nhs",
  },
  amber: {
    text: "text-au-care",
    glow: "bg-au-care/20",
    chip: "border-au-care/25 bg-au-care/10 text-au-care",
  },
} as const;

/**
 * One template, two sectors. Everything below is driven by the `Sector`
 * record, so the GP-practice and care-home pages stay in step as the
 * offer evolves — only the accent light changes.
 */
export function SectorPage({ sector }: { sector: Sector }) {
  const accent = accents[sector.accent];

  return (
    <Shell>
      {/* Hero */}
      <section id="top" className="relative overflow-hidden px-5 pb-14 pt-12 sm:px-8 sm:pb-20 sm:pt-16">
        <span
          aria-hidden
          className={`pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full blur-[110px] ${accent.glow}`}
        />
        <div className="relative mx-auto grid w-full max-w-[1240px] items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
          <div>
            <Reveal y={14} blur={4}>
              <p
                className={`au-mono inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.22em] ${accent.chip}`}
              >
                {sector.eyebrow}
              </p>
            </Reveal>
            <TextReveal
              as="h1"
              delay={0.1}
              className="mt-6 max-w-[620px] text-[clamp(2.3rem,5.8vw,3.9rem)] font-medium leading-[1.04] tracking-[-0.04em] text-au-ink"
              segments={[{ text: sector.headline }]}
            />
            <Reveal delay={0.24}>
              <p className="mt-6 max-w-[540px] text-[17px] leading-relaxed text-au-ink-2">
                {sector.intro}
              </p>
            </Reveal>
            <Reveal delay={0.32}>
              <ul className="mt-8 space-y-3.5">
                {sector.heroPoints.map((point) => (
                  <CheckItem key={point}>{point}</CheckItem>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.4} className="mt-10 flex flex-wrap gap-3">
              <Btn href="/free-audit" tone="primary" arrow>
                Get your free audit
              </Btn>
              <Btn href="/packages" tone="glass">
                See packages
              </Btn>
            </Reveal>
          </div>

          <Reveal delay={0.2} className="mx-auto w-full max-w-[520px]">
            <Tilt strength={6}>
              <figure className="relative overflow-hidden rounded-[24px] border border-white/12 bg-[#0a161b]/95 shadow-[0_50px_110px_-45px_rgba(0,0,0,0.95)]">
                <BrowserChrome />
                <Image
                  src={sector.heroImage.src}
                  alt={sector.heroImage.alt}
                  width={900}
                  height={600}
                  priority
                  sizes="(max-width: 1024px) 92vw, 520px"
                  className="h-auto w-full object-cover"
                />
              </figure>
            </Tilt>
          </Reveal>
        </div>
      </section>

      {/* Feature grid */}
      <Section>
        <SectionHead
          eyebrow="What the website does"
          title={[
            { text: "Designed around real journeys," },
            { text: "not page templates.", tone: "muted" },
          ]}
        />
        <Stagger className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" delay={0.06}>
          {sector.features.map((feature, i) => (
            <StaggerItem key={feature.title} className="h-full">
              <GlassCard as="article" className="h-full p-6 sm:p-7">
                <span
                  className={`au-mono relative inline-flex h-9 w-9 items-center justify-center rounded-full border text-[12px] font-medium tabular-nums ${accent.chip}`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="relative mt-5 text-[17.5px] font-medium tracking-tight text-au-ink">
                  {feature.title}
                </h3>
                <p className="relative mt-2.5 text-[14px] leading-relaxed text-au-ink-2">
                  {feature.copy}
                </p>
              </GlassCard>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* Live sample site */}
      <Section className="grid items-center gap-14 lg:grid-cols-[0.92fr_1.08fr]">
        <div>
          <Reveal>
            <p
              className={`au-mono text-[11px] font-medium uppercase tracking-[0.26em] ${accent.text}`}
            >
              See it for yourself
            </p>
          </Reveal>
          <TextReveal
            as="h2"
            delay={0.06}
            className="mt-5 max-w-[520px] text-[clamp(1.9rem,4.2vw,2.9rem)] font-medium leading-[1.08] tracking-[-0.03em] text-au-ink"
            segments={[
              { text: "Don’t take our word for it — click around" },
              { text: sector.demo.name, tone: "gradient" },
            ]}
          />
          <Reveal delay={0.16}>
            <p className="mt-5 max-w-[520px] text-[15.5px] leading-relaxed text-au-ink-2">
              {sector.demo.copy}
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <ul className="mt-7 space-y-3.5">
              {sector.demo.points.map((point) => (
                <CheckItem key={point}>{point}</CheckItem>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.32} className="mt-9">
            <Btn href={sector.demo.href} tone="primary" arrow>
              Explore the sample site
            </Btn>
          </Reveal>
        </div>

        <Parallax distance={44}>
          <Reveal delay={0.12}>
            <a
              href={sector.demo.href}
              aria-label={`Open the ${sector.demo.name} sample website`}
              className="group block"
            >
              <span className="relative block overflow-hidden rounded-[24px] border border-white/12 bg-[#0a161b]/95 shadow-[0_50px_120px_-50px_rgba(0,0,0,0.95)] transition-transform duration-500 group-hover:-translate-y-1.5">
                <span className="flex items-center gap-2 border-b border-white/8 bg-white/[0.04] px-4 py-2.5">
                  <span className="flex gap-1.5" aria-hidden>
                    <span className="h-2 w-2 rounded-full bg-white/15" />
                    <span className="h-2 w-2 rounded-full bg-white/15" />
                    <span className="h-2 w-2 rounded-full bg-white/15" />
                  </span>
                  <span className="au-mono ml-2 truncate rounded-full bg-white/[0.05] px-2.5 py-0.5 text-[10.5px] text-au-muted">
                    flutterly.uk{sector.demo.href}
                  </span>
                  <span className="ml-auto flex items-center gap-1.5 text-[10.5px] font-medium text-au-teal">
                    <span className="animate-pulse-soft h-1.5 w-1.5 rounded-full bg-au-teal" aria-hidden />
                    Live
                  </span>
                </span>
                <Image
                  src={sector.demo.image}
                  alt={sector.demo.imageAlt}
                  width={960}
                  height={645}
                  sizes="(max-width: 1024px) 92vw, 620px"
                  className="h-auto w-full object-cover"
                />
              </span>
              <span className="mt-4 block text-center text-[13px] text-au-muted">
                A live, hosted sample — the organisation shown is fictional
              </span>
            </a>
          </Reveal>
        </Parallax>
      </Section>

      {/* Compliance / trust */}
      <Section className="grid items-center gap-14 lg:grid-cols-2">
        <div>
          <Reveal>
            <p
              className={`au-mono text-[11px] font-medium uppercase tracking-[0.26em] ${accent.text}`}
            >
              {sector.compliance.eyebrow}
            </p>
          </Reveal>
          <TextReveal
            as="h2"
            delay={0.06}
            className="mt-5 max-w-[520px] text-[clamp(1.9rem,4.2vw,2.9rem)] font-medium leading-[1.08] tracking-[-0.03em] text-au-ink"
            segments={[{ text: sector.compliance.title }]}
          />
          <Reveal delay={0.16}>
            <p className="mt-5 max-w-[520px] text-[15.5px] leading-relaxed text-au-ink-2">
              {sector.compliance.copy}
            </p>
          </Reveal>
        </div>
        <Reveal delay={0.15}>
          <GlassCard strong className="p-7 sm:p-9">
            <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-au-teal/25 bg-au-teal/12 text-au-teal">
              <ShieldCheck size={22} aria-hidden />
            </span>
            <ul className="relative mt-7 space-y-4">
              {sector.compliance.points.map((point) => (
                <CheckItem key={point}>{point}</CheckItem>
              ))}
            </ul>
          </GlassCard>
        </Reveal>
      </Section>

      {/* What's included — the daylight interlude */}
      <section className="relative mx-auto w-full max-w-[1440px] px-3 py-14 sm:px-6 sm:py-20">
        <div className="au-day-panel au-grain relative overflow-hidden rounded-[32px] px-5 py-20 sm:rounded-[44px] sm:px-10 sm:py-24">
          <SectionHead
            tone="day"
            eyebrow="Every build includes"
            title={[
              { text: "Nothing essential" },
              { text: "is an add-on.", tone: "day-muted" },
            ]}
          />
          <Reveal delay={0.1} className="mx-auto mt-12 max-w-[900px]">
            <ul className="grid gap-x-10 gap-y-4 rounded-[24px] border border-au-day-line bg-white/70 p-8 shadow-[0_30px_80px_-50px_rgba(6,35,28,0.5)] sm:grid-cols-2 sm:p-10">
              {sector.included.map((item) => (
                <CheckItem key={item} tone="day">
                  {item}
                </CheckItem>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <Section width="narrow">
        <SectionHead
          eyebrow="Questions"
          title={[{ text: "Asked and" }, { text: "answered.", tone: "muted" }]}
        />
        <FaqList items={sector.faqs} className="mt-12" />
      </Section>

      <CtaBand title={sector.ctaTitle} copy={sector.ctaCopy} id="contact" />
    </Shell>
  );
}
