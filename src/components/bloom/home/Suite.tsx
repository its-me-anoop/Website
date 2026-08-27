"use client";

import { ArrowRight, Check } from "lucide-react";
import { services, supportService } from "../data";
import { BtnLink, Rise, SectionHead } from "../primitives";

export function Suite() {
  return (
    <section id="services" className="scroll-mt-24 border-b border-bl-line bg-bl-band-2">
      <div className="mx-auto grid w-full max-w-[1240px] gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[0.68fr_1.32fr]">
        <div>
          <SectionHead
            align="left"
            eyebrow="What Flutterly delivers"
            title={[
              { text: "One plan for the" },
              { text: "technology customers and teams depend on.", tone: "muted" },
            ]}
            copy="Start with the operational need. Flutterly then brings together the right website, product, business system or campaign support to solve it."
          />
          <Rise delay={0.12} className="mt-8">
            <BtnLink href="/services" tone="outline" arrow>
              View all services
            </BtnLink>
          </Rise>
        </div>

        <div className="border-t border-bl-line-2">
          {services.map((service, index) => (
            <Rise key={service.id} delay={(index % 2) * 0.06}>
              <article className="grid gap-4 border-b border-bl-line py-7 sm:grid-cols-[46px_1fr_auto] sm:items-start">
                <span className="text-[12px] font-semibold tabular-nums text-bl-teal">
                  {service.number}
                </span>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.17em] text-bl-muted">
                    {service.label}
                  </p>
                  <h3 className="mt-2 text-[clamp(1.3rem,2.5vw,1.8rem)] font-semibold tracking-[-0.03em] text-bl-ink">
                    {service.title}
                  </h3>
                  <p className="mt-3 max-w-[580px] text-[14.5px] leading-[1.65] text-bl-ink-soft">
                    {service.copy}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                    {service.points.map((point) => (
                      <li key={point} className="inline-flex items-center gap-2 text-[12.5px] font-medium text-bl-ink-soft">
                        <Check size={12} strokeWidth={2.7} aria-hidden className="text-bl-teal" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
                <a
                  href={service.cta.href}
                  aria-label={service.cta.label}
                  className="group mt-1 inline-flex h-9 w-9 items-center justify-center rounded-full border border-bl-line-2 text-bl-teal transition-colors duration-300 hover:bg-bl-teal hover:text-white sm:justify-self-end"
                >
                  <ArrowRight size={15} aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5" />
                </a>
              </article>
            </Rise>
          ))}

          <Rise>
            <div className="grid gap-5 overflow-hidden rounded-[26px] bg-bl-pine px-6 py-7 text-bl-pine-ink sm:grid-cols-[1fr_auto] sm:items-end sm:px-8">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-bl-pine-ink/65">
                  {supportService.label}
                </p>
                <h3 className="mt-2 text-[21px] font-semibold tracking-[-0.025em] text-bl-pine-ink">
                  {supportService.title}
                </h3>
                <p className="mt-2 max-w-[590px] text-[14px] leading-[1.65] text-bl-pine-ink/72">
                  {supportService.copy}
                </p>
              </div>
              <BtnLink href={supportService.cta.href} tone="white">
                Support options
              </BtnLink>
            </div>
          </Rise>
        </div>
      </div>
    </section>
  );
}
