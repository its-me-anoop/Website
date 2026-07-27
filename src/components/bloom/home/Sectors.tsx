"use client";

import { HeartHandshake, Stethoscope } from "lucide-react";
import { sectorCards } from "../data";
import { BtnLink, CheckItem, Rise, SectionHead } from "../primitives";

const accents = {
  nhs: {
    card: "bg-bl-nhs-soft",
    eyebrow: "text-bl-nhs",
    icon: "bg-white text-bl-nhs",
  },
  amber: {
    card: "bg-bl-amber-soft",
    eyebrow: "text-bl-amber",
    icon: "bg-white text-bl-amber",
  },
} as const;

const icons = { nhs: Stethoscope, amber: HeartHandshake } as const;

export function Sectors() {
  return (
    <section id="sectors" className="mx-auto w-full max-w-[1240px] scroll-mt-24 px-5 pb-20 sm:px-8 sm:pb-28">
      <SectionHead
        eyebrow="Healthcare websites"
        title={[
          { text: "Built for the sectors" },
          { text: "where websites matter most.", tone: "muted" },
        ]}
        copy="Two specialisms, one standard: accessible, fast and honest websites for organisations that people depend on."
      />

      <div className="mt-14 grid gap-5 lg:grid-cols-2">
        {sectorCards.map((sector, i) => {
          const accent = accents[sector.accent];
          const Icon = icons[sector.accent];
          return (
            <Rise key={sector.slug} delay={i * 0.12}>
              <article
                className={`bl-card flex h-full flex-col rounded-[28px] p-8 sm:p-10 ${accent.card}`}
              >
                <div className="flex items-center justify-between gap-4">
                  <p
                    className={`text-[11px] font-semibold uppercase tracking-[0.26em] ${accent.eyebrow}`}
                  >
                    {sector.eyebrow}
                  </p>
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-2xl shadow-[0_10px_24px_-14px_rgba(11,47,40,0.35)] ${accent.icon}`}
                  >
                    <Icon size={20} aria-hidden />
                  </span>
                </div>
                <h3 className="mt-4 max-w-[420px] text-[clamp(1.4rem,2.6vw,1.8rem)] font-medium leading-[1.15] tracking-[-0.02em] text-bl-ink">
                  {sector.title}
                </h3>
                <p className="mt-3 max-w-[460px] text-[14.5px] leading-relaxed text-bl-ink-soft">
                  {sector.copy}
                </p>
                <ul className="mt-6 space-y-3 text-bl-ink">
                  {sector.points.map((point) => (
                    <CheckItem key={point}>{point}</CheckItem>
                  ))}
                </ul>
                <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-3 pt-8">
                  <BtnLink href={`/${sector.slug}`} tone="pine" arrow>
                    {sector.cta}
                  </BtnLink>
                  <BtnLink
                    href={sector.demoHref}
                    tone="ghost"
                    arrow
                    className="px-0 py-0"
                  >
                    {sector.demoLabel}
                  </BtnLink>
                </div>
              </article>
            </Rise>
          );
        })}
      </div>
    </section>
  );
}
