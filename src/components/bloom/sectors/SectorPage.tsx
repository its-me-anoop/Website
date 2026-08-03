"use client";

import Image from "next/image";
import { ArrowRight, ShieldCheck } from "lucide-react";
import type { ReactNode } from "react";
import { site } from "@/lib/site";
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
 * sectors: entirely data-driven from `Sector` so both pages stay
 * consistent as the offer evolves.
 */
export function SectorPage({ sector, extra }: { sector: Sector; extra?: ReactNode }) {
  const enquiryHref = `mailto:${site.email}?subject=${encodeURIComponent(
    `${sector.eyebrow} enquiry`
  )}`;

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
              <BtnLink href={enquiryHref} tone="teal" arrow>
                {sector.heroCtaLabel}
              </BtnLink>
              <BtnLink href="/free-audit" tone="outline">
                Get a free website audit
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
            align="left"
            eyebrow="What the website does"
            title={[
              { text: "Designed around real journeys," },
              { text: "not page templates.", tone: "muted" },
            ]}
          />
          <div className="mt-14 grid border-t border-bl-line sm:grid-cols-2 lg:grid-cols-3">
            {sector.features.map((feature, i) => (
              <Rise key={feature.title} delay={(i % 3) * 0.08}>
                <article className="h-full border-b border-bl-line px-1 py-8 sm:px-7 sm:first:pl-0 lg:border-r lg:[&:nth-child(3n)]:border-r-0">
                  <span className={`text-[12px] font-semibold tabular-nums ${accentText[sector.accent]}`}>
                    0{i + 1}
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

      {/* Connected operational services */}
      <section className="border-y border-bl-line bg-bl-band-2">
        <div className="mx-auto w-full max-w-[1240px] px-5 py-16 sm:px-8 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <p className={`text-[11px] font-semibold uppercase tracking-[0.24em] ${accentText[sector.accent]}`}>
                Beyond the website
              </p>
              <h2 className="mt-4 max-w-[440px] text-[clamp(1.8rem,4vw,2.7rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-bl-ink">
                Connect the tools and campaigns around the same audience.
              </h2>
            </div>
            <div className="border-t border-bl-line-2">
              <a href="/business-email" className="group grid gap-3 border-b border-bl-line py-6 sm:grid-cols-[1fr_1.4fr_auto] sm:items-start">
                <h3 className="text-[17px] font-semibold text-bl-ink">Business email &amp; collaboration</h3>
                <p className="text-[14px] leading-relaxed text-bl-ink-soft">Secure accounts, shared mailboxes, calendars and files configured for your team.</p>
                <ArrowRight size={17} aria-hidden className="mt-1 text-bl-teal transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a href="/social-media-marketing" className="group grid gap-3 border-b border-bl-line py-6 sm:grid-cols-[1fr_1.4fr_auto] sm:items-start">
                <h3 className="text-[17px] font-semibold text-bl-ink">Social media campaigns</h3>
                <p className="text-[14px] leading-relaxed text-bl-ink-soft">Responsible content support for awareness, service communication and recruitment.</p>
                <ArrowRight size={17} aria-hidden className="mt-1 text-bl-teal transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Live sample site */}
      <section className="mx-auto grid w-full max-w-[1240px] items-center gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <Rise>
            <p
              className={`text-[11px] font-semibold uppercase tracking-[0.26em] ${accentText[sector.accent]}`}
            >
              See it for yourself
            </p>
            <h2 className="mt-4 max-w-[520px] text-[clamp(1.8rem,4vw,2.7rem)] font-medium leading-[1.1] tracking-[-0.03em] text-bl-ink">
              Don&rsquo;t take our word for it: click around{" "}
              {sector.demo.name}
            </h2>
            <p className="mt-4 max-w-[520px] text-[15.5px] leading-relaxed text-bl-ink-soft">
              {sector.demo.copy}
            </p>
          </Rise>
          <Rise delay={0.1}>
            <ul className="mt-6 space-y-3">
              {sector.demo.points.map((point) => (
                <CheckItem key={point}>{point}</CheckItem>
              ))}
            </ul>
          </Rise>
          <Rise delay={0.18} className="mt-8">
            <BtnLink href={sector.demo.href} tone="teal" arrow>
              Explore the sample site
            </BtnLink>
          </Rise>
        </div>

        <Rise delay={0.15}>
          <a
            href={sector.demo.href}
            aria-label={`Open the ${sector.demo.name} sample website`}
            className="group block"
          >
            <span
              className={`bl-card block overflow-hidden rounded-[26px] border border-bl-line transition-transform duration-300 group-hover:-translate-y-1 ${accentSoft[sector.accent]}`}
            >
              <span className="flex items-center gap-2 border-b border-bl-line bg-bl-surface px-4 py-2.5">
                <span className="flex gap-1.5" aria-hidden>
                  <span className="h-2 w-2 rounded-full bg-bl-line-2" />
                  <span className="h-2 w-2 rounded-full bg-bl-line-2" />
                  <span className="h-2 w-2 rounded-full bg-bl-line-2" />
                </span>
                <span className="ml-2 truncate rounded-full bg-bl-band px-3 py-0.5 text-[12px] font-medium text-bl-ink-soft">
                  flutterly.uk{sector.demo.href}
                </span>
              </span>
              <Image
                src={sector.demo.image}
                alt={sector.demo.imageAlt}
                width={960}
                height={645}
                className="h-auto w-full object-cover"
              />
            </span>
            <span className="mt-3 block text-center text-[13px] text-bl-muted">
              A live, hosted sample: the organisation shown is fictional
            </span>
          </a>
        </Rise>
      </section>

      {extra}

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

      <CtaBand
        title={sector.ctaTitle}
        copy={sector.ctaCopy}
        primaryHref={enquiryHref}
        secondaryLabel="Get a free website audit"
        id="contact"
      />
    </BloomShell>
  );
}
