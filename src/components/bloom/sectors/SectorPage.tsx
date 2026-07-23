"use client";

import Image from "next/image";
import { ShieldCheck } from "lucide-react";
import { BloomShell } from "../BloomShell";
import { CtaBand } from "../CtaBand";
import type { Sector } from "../data";
import {
  BtnLink,
  CheckItem,
  FaqList,
  Rise,
  SectionHead,
} from "../primitives";

const accentText = { nhs: "text-bl-nhs", amber: "text-bl-amber" } as const;
const accentSoft = { nhs: "bg-bl-nhs-soft", amber: "bg-bl-amber-soft" } as const;

/**
 * Shared landing-page template for the GP-practice and care-home
 * sectors — entirely data-driven from `Sector` so both pages stay
 * consistent as the offer evolves.
 */
export function SectorPage({ sector }: { sector: Sector }) {
  return (
    <BloomShell>
      {/* Hero */}
      <section id="top" className="relative overflow-hidden">
        <div aria-hidden className="bl-grid absolute inset-0" />
        <div className="relative mx-auto grid w-full max-w-[1240px] items-center gap-12 px-5 pb-16 pt-14 sm:px-8 sm:pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:pb-24">
          <div>
            <Rise>
              <p
                className={`text-[11px] font-semibold uppercase tracking-[0.26em] ${accentText[sector.accent]}`}
              >
                {sector.eyebrow}
              </p>
            </Rise>
            <Rise delay={0.08}>
              <h1 className="mt-4 max-w-[600px] text-[clamp(2.2rem,5.6vw,3.6rem)] font-medium leading-[1.06] tracking-[-0.035em] text-bl-ink">
                {sector.headline}
              </h1>
            </Rise>
            <Rise delay={0.16}>
              <p className="mt-5 max-w-[520px] text-[16.5px] leading-relaxed text-bl-ink-soft">
                {sector.intro}
              </p>
            </Rise>
            <Rise delay={0.24}>
              <ul className="mt-7 space-y-3">
                {sector.heroPoints.map((point) => (
                  <CheckItem key={point}>{point}</CheckItem>
                ))}
              </ul>
            </Rise>
            <Rise delay={0.32} className="mt-9 flex flex-wrap gap-3">
              <BtnLink href="/free-audit" tone="teal" arrow>
                Get your free audit
              </BtnLink>
              <BtnLink href="/packages" tone="outline">
                See packages
              </BtnLink>
            </Rise>
          </div>

          <Rise delay={0.2} className="mx-auto w-full max-w-[480px]">
            <figure
              className="bl-card overflow-hidden rounded-[26px] border border-bl-line"
              style={{ backgroundColor: sector.heroImage.tint }}
            >
              <div className="flex items-center gap-1.5 border-b border-bl-line bg-bl-band-2 px-3 py-2">
                <span className="h-2 w-2 rounded-full bg-bl-line-2" />
                <span className="h-2 w-2 rounded-full bg-bl-line-2" />
                <span className="h-2 w-2 rounded-full bg-bl-line-2" />
              </div>
              <Image
                src={sector.heroImage.src}
                alt={sector.heroImage.alt}
                width={760}
                height={500}
                priority
                className="h-auto w-full object-cover"
              />
            </figure>
          </Rise>
        </div>
      </section>

      {/* Feature grid */}
      <section className="border-t border-bl-line bg-bl-band-2">
        <div className="mx-auto w-full max-w-[1240px] px-5 py-20 sm:px-8 sm:py-28">
          <SectionHead
            eyebrow="What the website does"
            title={[
              { text: "Designed around real journeys," },
              { text: "not page templates.", tone: "muted" },
            ]}
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {sector.features.map((feature, i) => (
              <Rise key={feature.title} delay={(i % 3) * 0.08}>
                <article className="h-full rounded-[24px] border border-bl-line bg-bl-surface p-6 sm:p-7">
                  <span
                    className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-[13px] font-semibold tabular-nums ${accentSoft[sector.accent]} ${accentText[sector.accent]}`}
                  >
                    {i + 1}
                  </span>
                  <h3 className="mt-4 text-[17px] font-medium tracking-tight text-bl-ink">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-bl-ink-soft">
                    {feature.copy}
                  </p>
                </article>
              </Rise>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance / trust */}
      <section className="mx-auto grid w-full max-w-[1240px] items-center gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-2">
        <div>
          <Rise>
            <p
              className={`text-[11px] font-semibold uppercase tracking-[0.26em] ${accentText[sector.accent]}`}
            >
              {sector.compliance.eyebrow}
            </p>
            <h2 className="mt-4 max-w-[520px] text-[clamp(1.8rem,4vw,2.7rem)] font-medium leading-[1.1] tracking-[-0.03em] text-bl-ink">
              {sector.compliance.title}
            </h2>
            <p className="mt-4 max-w-[520px] text-[15.5px] leading-relaxed text-bl-ink-soft">
              {sector.compliance.copy}
            </p>
          </Rise>
        </div>
        <Rise delay={0.15}>
          <div className="bl-card rounded-[26px] border border-bl-line bg-bl-surface p-7 sm:p-9">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-bl-teal-soft text-bl-teal">
              <ShieldCheck size={22} aria-hidden />
            </span>
            <ul className="mt-6 space-y-4">
              {sector.compliance.points.map((point) => (
                <CheckItem key={point}>{point}</CheckItem>
              ))}
            </ul>
          </div>
        </Rise>
      </section>

      {/* What's included */}
      <section className="border-y border-bl-line bg-bl-band">
        <div className="mx-auto w-full max-w-[1240px] px-5 py-20 sm:px-8 sm:py-28">
          <SectionHead
            eyebrow="Every build includes"
            title={[
              { text: "Nothing essential" },
              { text: "is an add-on.", tone: "teal" },
            ]}
          />
          <Rise className="mx-auto mt-12 max-w-[860px]">
            <ul className="bl-card grid gap-x-10 gap-y-4 rounded-[26px] border border-bl-line bg-bl-surface p-8 sm:grid-cols-2 sm:p-10">
              {sector.included.map((item) => (
                <CheckItem key={item}>{item}</CheckItem>
              ))}
            </ul>
          </Rise>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto w-full max-w-[860px] px-5 py-20 sm:px-8 sm:py-28">
        <SectionHead
          eyebrow="Questions"
          title={[{ text: "Asked and" }, { text: "answered.", tone: "muted" }]}
        />
        <Rise className="mt-12">
          <FaqList items={sector.faqs} />
        </Rise>
      </section>

      <CtaBand title={sector.ctaTitle} copy={sector.ctaCopy} id="contact" />
    </BloomShell>
  );
}
