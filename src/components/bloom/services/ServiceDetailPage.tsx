"use client";

import { ArrowRight, ShieldCheck } from "lucide-react";
import { site } from "@/lib/site";
import { BloomShell } from "../BloomShell";
import { CtaBand } from "../CtaBand";
import type { BusinessService } from "../data";
import { BtnLink, CheckItem, Rise, SectionHead } from "../primitives";

const relatedServices = [
  {
    href: "/gp-websites",
    label: "GP practice websites",
    copy: "Accessible patient journeys and clear NHS signposting.",
  },
  {
    href: "/care-home-websites",
    label: "Care home websites",
    copy: "Trust-building journeys for families and future staff.",
  },
  {
    href: "/services",
    label: "All digital services",
    copy: "Websites, products, business systems and campaign support.",
  },
] as const;

export function ServiceDetailPage({ service }: { service: BusinessService }) {
  const enquiryHref = `mailto:${site.email}?subject=${encodeURIComponent(
    `${service.eyebrow} enquiry`
  )}`;

  return (
    <BloomShell>
      <section id="top" className="relative overflow-hidden border-b border-bl-line bg-bl-band-2">
        <div aria-hidden className="bl-grid absolute inset-0 opacity-70" />
        <div className="relative mx-auto grid w-full max-w-[1240px] gap-12 px-5 pb-16 pt-14 sm:px-8 sm:pb-24 sm:pt-20 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div>
            <Rise>
              <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-bl-teal">
                {service.eyebrow}
              </p>
            </Rise>
            <Rise delay={0.08}>
              <h1 className="mt-5 max-w-[700px] font-display text-[clamp(2.45rem,6vw,4.6rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-bl-ink">
                {service.headline}
              </h1>
            </Rise>
            <Rise delay={0.16}>
              <p className="mt-6 max-w-[610px] text-[17px] leading-[1.65] text-bl-ink-soft">
                {service.intro}
              </p>
            </Rise>
            <Rise delay={0.24} className="mt-8 flex flex-wrap gap-3">
              <BtnLink href={enquiryHref} tone="teal" arrow>
                {service.heroCtaLabel}
              </BtnLink>
              <BtnLink href="/services" tone="outline">
                View all services
              </BtnLink>
            </Rise>
          </div>

          <Rise delay={0.18}>
            <div className="border-y border-bl-line-2 bg-bl-canvas/90">
              {service.heroPoints.map((point, index) => (
                <div
                  key={point}
                  className="grid grid-cols-[38px_1fr] gap-4 border-b border-bl-line px-1 py-5 last:border-b-0 sm:grid-cols-[46px_1fr]"
                >
                  <span className="text-[13px] font-semibold tabular-nums text-bl-teal">
                    0{index + 1}
                  </span>
                  <p className="max-w-[500px] text-[15px] leading-relaxed text-bl-ink">
                    {point}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-2" aria-label="Supported platforms and capabilities">
              {service.platforms.map((platform) => (
                <span
                  key={platform}
                  className="rounded-full border border-bl-line-2 bg-bl-surface px-3 py-1.5 text-[12.5px] font-medium text-bl-ink-soft"
                >
                  {platform}
                </span>
              ))}
            </div>
          </Rise>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1240px] px-5 py-20 sm:px-8 sm:py-28">
        <SectionHead
          align="left"
          eyebrow="What this delivers"
          title={[
            { text: "Practical outcomes," },
            { text: "not another platform to manage.", tone: "muted" },
          ]}
          copy="The scope is shaped around the result your organisation needs and the capacity your team has to maintain it."
        />
        <div className="mt-14 grid border-t border-bl-line md:grid-cols-2">
          {service.outcomes.map((outcome, index) => (
            <Rise
              key={outcome.title}
              delay={(index % 2) * 0.08}
              className="border-b border-bl-line py-8 md:[&:nth-child(odd)]:pr-10 md:[&:nth-child(even)]:border-l md:[&:nth-child(even)]:pl-10"
            >
              <span className="text-[12px] font-semibold text-bl-teal">0{index + 1}</span>
              <h3 className="mt-3 text-[21px] font-semibold tracking-[-0.025em] text-bl-ink">
                {outcome.title}
              </h3>
              <p className="mt-3 max-w-[540px] text-[15px] leading-[1.65] text-bl-ink-soft">
                {outcome.copy}
              </p>
            </Rise>
          ))}
        </div>
      </section>

      <section className="bg-bl-pine text-bl-pine-ink">
        <div className="mx-auto w-full max-w-[1240px] px-5 py-20 sm:px-8 sm:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-bl-pine-ink/70">
                Delivery process
              </p>
              <h2 className="mt-4 max-w-[420px] font-display text-[clamp(2rem,4.4vw,3.3rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-bl-pine-ink">
                {service.processTitle}
              </h2>
            </div>
            <ol className="border-t border-white/15">
              {service.process.map(([title, copy], index) => (
                <li key={title} className="grid gap-3 border-b border-white/15 py-6 sm:grid-cols-[56px_150px_1fr] sm:items-start">
                  <span className="text-[12px] font-semibold tabular-nums text-bl-pine-ink/60">
                    0{index + 1}
                  </span>
                  <h3 className="text-[17px] font-semibold text-bl-pine-ink">{title}</h3>
                  <p className="max-w-[540px] text-[14.5px] leading-[1.65] text-bl-pine-ink/72">
                    {copy}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-[1240px] gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-2">
        <Rise>
          <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-bl-teal">
            A strong fit for
          </p>
          <h2 className="mt-4 max-w-[500px] font-display text-[clamp(2rem,4.4vw,3.2rem)] font-semibold leading-[1.04] tracking-[-0.04em] text-bl-ink">
            {service.idealTitle}
          </h2>
        </Rise>
        <Rise delay={0.1}>
          <ul className="space-y-4">
            {service.idealFor.map((item) => (
              <CheckItem key={item}>{item}</CheckItem>
            ))}
          </ul>
          <div className="mt-8 flex gap-4 border-t border-bl-line pt-6">
            <ShieldCheck className="mt-0.5 shrink-0 text-bl-teal" size={22} aria-hidden />
            <p className="max-w-[560px] text-[14px] leading-[1.65] text-bl-ink-soft">{service.note}</p>
          </div>
        </Rise>
      </section>

      <section className="border-y border-bl-line bg-bl-band-2">
        <div className="mx-auto w-full max-w-[1240px] px-5 py-16 sm:px-8 sm:py-20">
          <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-bl-muted">
            Connected services
          </p>
          <div className="mt-7 grid border-t border-bl-line md:grid-cols-3">
            {relatedServices.map((related) => (
              <a
                key={related.href}
                href={related.href}
                className="group border-b border-bl-line py-6 md:border-r md:px-6 md:first:pl-0 md:last:border-r-0"
              >
                <span className="flex items-center justify-between gap-4 text-[17px] font-semibold text-bl-ink">
                  {related.label}
                  <ArrowRight size={17} aria-hidden className="text-bl-teal transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <span className="mt-2 block text-[14px] leading-relaxed text-bl-ink-soft">
                  {related.copy}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title={service.ctaTitle}
        copy={service.ctaCopy}
        primaryLabel={service.heroCtaLabel}
        primaryHref={enquiryHref}
        secondaryLabel="Review all services"
        secondaryHref="/services"
        id="contact"
      />
    </BloomShell>
  );
}
