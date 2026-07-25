"use client";

import Image from "next/image";
import { ShieldCheck } from "lucide-react";
import { Plate, Parallax, Reveal, Stagger, StaggerItem, TextReveal, Tilt } from "@/components/fx";
import { Shell } from "../Shell";
import { CtaBand } from "../CtaBand";
import { BrowserChrome } from "../home/Hero";
import type { Sector } from "../data";
import { Band, Btn, CheckItem, FaqList, Section, SectionHead } from "../primitives";

const accents = {
  nhs: {
    brand: "var(--au-nhs)",
    text: "text-au-nhs",
    glow: "bg-au-nhs/14",
    chip: "border-au-nhs/30 bg-au-nhs/10 text-au-nhs",
  },
  amber: {
    brand: "var(--au-care)",
    text: "text-au-care",
    glow: "bg-au-care/14",
    chip: "border-au-care/30 bg-au-care/10 text-au-care",
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
                className={`au-label inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 tracking-[0.22em] ${accent.chip}`}
              >
                {sector.eyebrow}
              </p>
            </Reveal>
            <TextReveal
              as="h1"
              delay={0.1}
              className="au-display-hero mt-6 max-w-[620px] text-[clamp(2.3rem,5.6vw,3.9rem)]"
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
              <Btn href="/packages" tone="plate">
                See packages
              </Btn>
            </Reveal>
          </div>

          <Reveal delay={0.2} className="mx-auto w-full max-w-[520px]">
            <Tilt strength={6}>
              <figure className="au-plate-strong relative overflow-hidden rounded-[var(--r-xl)]">
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
              <Plate
                as="article"
                brand={accent.brand}
                className="h-full p-6 sm:p-7"
              >
                <span
                  className={`au-label relative inline-flex h-9 w-9 items-center justify-center rounded-full border text-[11px] tracking-[0.06em] ${accent.chip}`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="au-display relative mt-5 text-[19px]">
                  {feature.title}
                </h3>
                <p className="relative mt-2.5 text-[14px] leading-relaxed text-au-ink-2">
                  {feature.copy}
                </p>
              </Plate>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* Live sample site */}
      <Section className="grid items-center gap-14 lg:grid-cols-[0.92fr_1.08fr]">
        <div>
          <Reveal>
            <p
              className={`au-label ${accent.text}`}
            >
              See it for yourself
            </p>
          </Reveal>
          <TextReveal
            as="h2"
            delay={0.06}
            className="au-display mt-5 max-w-[520px] text-[clamp(1.9rem,4.2vw,2.95rem)]"
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
              <span className="au-plate-strong relative block overflow-hidden rounded-[var(--r-xl)] transition-transform duration-500 group-hover:-translate-y-1.5">
                <span className="flex items-center gap-2 border-b border-au-line bg-au-surface px-4 py-2.5">
                  <span className="flex gap-1.5" aria-hidden>
                    <span className="h-2 w-2 rounded-full bg-au-surface-3" />
                    <span className="h-2 w-2 rounded-full bg-au-surface-3" />
                    <span className="h-2 w-2 rounded-full bg-au-surface-3" />
                  </span>
                  <span className="au-label ml-2 truncate rounded-full bg-au-surface-2 px-2.5 py-0.5 text-[10px] tracking-[0.14em] text-au-muted">
                    flutterly.uk{sector.demo.href}
                  </span>
                  <span className="ml-auto flex items-center gap-1.5 text-[10.5px] font-semibold text-au-teal-deep">
                    <span className="animate-pulse-soft h-1.5 w-1.5 rounded-full bg-au-teal-deep" aria-hidden />
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
              className={`au-label ${accent.text}`}
            >
              {sector.compliance.eyebrow}
            </p>
          </Reveal>
          <TextReveal
            as="h2"
            delay={0.06}
            className="au-display mt-5 max-w-[520px] text-[clamp(1.9rem,4.2vw,2.95rem)]"
            segments={[{ text: sector.compliance.title }]}
          />
          <Reveal delay={0.16}>
            <p className="mt-5 max-w-[520px] text-[15.5px] leading-relaxed text-au-ink-2">
              {sector.compliance.copy}
            </p>
          </Reveal>
        </div>
        <Reveal delay={0.15}>
          <Plate strong className="p-7 sm:p-9">
            <span className="relative flex h-12 w-12 items-center justify-center rounded-[var(--r-sm)] border border-au-teal/30 bg-au-teal/12 text-au-teal-deep">
              <ShieldCheck size={22} aria-hidden />
            </span>
            <ul className="relative mt-7 space-y-4">
              {sector.compliance.points.map((point) => (
                <CheckItem key={point}>{point}</CheckItem>
              ))}
            </ul>
          </Plate>
        </Reveal>
      </Section>

      {/* What's included — the tinted relief band */}
      <Band rule="both">
        <Section>
          <SectionHead
            eyebrow="Every build includes"
            title={[
              { text: "Nothing essential" },
              { text: "is an add-on.", tone: "muted" },
            ]}
          />
          <Reveal delay={0.1} className="mx-auto mt-12 max-w-[900px]">
            <ul className="au-plate-strong grid gap-x-10 gap-y-4 rounded-[var(--r-xl)] p-8 sm:grid-cols-2 sm:p-10">
              {sector.included.map((item) => (
                <CheckItem key={item}>{item}</CheckItem>
              ))}
            </ul>
          </Reveal>
        </Section>
      </Band>

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
