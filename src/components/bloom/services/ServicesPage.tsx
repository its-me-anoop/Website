"use client";

import { ArrowRight, Check } from "lucide-react";
import { site } from "@/lib/site";
import { BloomShell } from "../BloomShell";
import { CtaBand } from "../CtaBand";
import { services, supportService } from "../data";
import { BtnLink, Rise } from "../primitives";

export function ServicesPage() {
  return (
    <BloomShell>
      <section className="relative overflow-hidden border-b border-bl-line bg-bl-band-2">
        <div aria-hidden className="bl-grid absolute inset-0 opacity-70" />
        <div className="relative mx-auto w-full max-w-[1240px] px-5 pb-16 pt-14 sm:px-8 sm:pb-24 sm:pt-20">
          <Rise>
            <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-bl-teal">
              Services
            </p>
            <h1 className="mt-5 max-w-[900px] font-display text-[clamp(2.7rem,7.2vw,5.8rem)] font-semibold leading-[0.94] tracking-[-0.052em] text-bl-ink">
              Digital services that work together.
            </h1>
            <p className="mt-7 max-w-[680px] text-[18px] leading-[1.65] text-bl-ink-soft">
              Flutterly Limited plans, builds and supports websites, digital products, business systems and campaigns for GP practices, care homes and other organisations.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <BtnLink href={`mailto:${site.email}?subject=${encodeURIComponent("Digital project enquiry")}`} tone="teal" arrow>
                Discuss what you need
              </BtnLink>
              <BtnLink href="/#work" tone="outline">Review delivered work</BtnLink>
            </div>
          </Rise>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1240px] px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-10 lg:grid-cols-[0.62fr_1.38fr]">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-bl-muted">The delivery offer</p>
            <h2 className="mt-4 max-w-[390px] font-display text-[clamp(2rem,4.2vw,3.25rem)] font-semibold leading-[1.03] tracking-[-0.04em] text-bl-ink">
              Start with the business need, then choose the technology.
            </h2>
          </div>
          <div className="border-t border-bl-line-2">
            {services.map((service, index) => (
              <Rise key={service.id} delay={(index % 2) * 0.05}>
                <article className="grid gap-4 border-b border-bl-line py-8 sm:grid-cols-[52px_1fr_auto] sm:items-start">
                  <span className="text-[12px] font-semibold tabular-nums text-bl-teal">{service.number}</span>
                  <div>
                    <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-bl-muted">{service.label}</p>
                    <h3 className="mt-2 text-[clamp(1.35rem,2.8vw,2rem)] font-semibold tracking-[-0.03em] text-bl-ink">{service.title}</h3>
                    <p className="mt-3 max-w-[620px] text-[15px] leading-[1.65] text-bl-ink-soft">{service.copy}</p>
                    <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                      {service.points.map((point) => (
                        <li key={point} className="inline-flex items-center gap-2 text-[13px] font-medium text-bl-ink-soft">
                          <Check size={13} className="text-bl-teal" aria-hidden />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <a href={service.cta.href} className="group mt-1 inline-flex items-center gap-2 text-[14px] font-semibold text-bl-teal sm:justify-self-end">
                    {service.cta.label}
                    <ArrowRight size={15} aria-hidden className="transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </article>
              </Rise>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bl-pine text-bl-pine-ink">
        <div className="mx-auto grid w-full max-w-[1240px] gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-bl-pine-ink/65">{supportService.label}</p>
            <h2 className="mt-4 max-w-[580px] font-display text-[clamp(2rem,4.6vw,3.5rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-bl-pine-ink">{supportService.title}</h2>
          </div>
          <div>
            <p className="max-w-[620px] text-[16px] leading-[1.7] text-bl-pine-ink/72">{supportService.copy}</p>
            <div className="mt-7"><BtnLink href={supportService.cta.href} tone="white" arrow>{supportService.cta.label}</BtnLink></div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1240px] px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-8 border-y border-bl-line py-10 md:grid-cols-[1fr_auto_auto] md:items-center">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-bl-muted">Healthcare specialisms</p>
            <h2 className="mt-3 max-w-[600px] text-[clamp(1.8rem,3.7vw,2.7rem)] font-semibold tracking-[-0.035em] text-bl-ink">Focused delivery for GP practices and care providers.</h2>
          </div>
          <BtnLink href="/gp-websites" tone="outline">GP practice websites</BtnLink>
          <BtnLink href="/care-home-websites" tone="outline">Care home websites</BtnLink>
        </div>
      </section>

      <CtaBand
        title="Bring the digital work into one clear plan"
        copy="Share the problem, the current setup and what a better result looks like. Flutterly will recommend the most practical next step, even when that means keeping part of what you already have."
        secondaryLabel="Start with a website audit"
        id="contact"
      />
    </BloomShell>
  );
}
