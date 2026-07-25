"use client";

import Image from "next/image";
import { HeartHandshake, Stethoscope } from "lucide-react";
import { GlassCard, Reveal } from "@/components/fx";
import { sectorCards } from "../data";
import { Btn, CheckItem, Section, SectionHead } from "../primitives";

/* Two accents, two atmospheres: NHS blue for practices, warm amber for
   homes. Teal stays the action colour on both. */
const accents = {
  nhs: {
    glow: "bg-au-nhs/20",
    ring: "border-au-nhs/25",
    text: "text-au-nhs",
    tint: "from-au-nhs/16",
    icon: "bg-au-nhs/12 text-au-nhs ring-au-nhs/25",
  },
  amber: {
    glow: "bg-au-care/20",
    ring: "border-au-care/25",
    text: "text-au-care",
    tint: "from-au-care/16",
    icon: "bg-au-care/12 text-au-care ring-au-care/25",
  },
} as const;

const icons = { nhs: Stethoscope, amber: HeartHandshake } as const;
const previews = {
  "gp-websites": {
    src: "/demos/gp-home.png",
    alt: "The Willowbrook Surgery sample practice website",
  },
  "care-home-websites": {
    src: "/demos/care-home.png",
    alt: "The Oakfield House sample care home website",
  },
} as const;

export function Sectors() {
  return (
    <Section id="sectors">
      <SectionHead
        eyebrow="Healthcare websites"
        title={[
          { text: "Built for the sectors" },
          { text: "where websites matter most.", tone: "muted" },
        ]}
        copy="Two specialisms, one standard: accessible, fast and honest websites for organisations that people depend on."
      />

      <div className="mt-16 grid gap-5 lg:grid-cols-2">
        {sectorCards.map((sector, i) => {
          const accent = accents[sector.accent];
          const Icon = icons[sector.accent];
          const preview = previews[sector.slug as keyof typeof previews];

          return (
            <Reveal key={sector.slug} delay={i * 0.12} className="h-full">
              <GlassCard
                as="article"
                className={`flex h-full flex-col ${accent.ring}`}
              >
                <span
                  aria-hidden
                  className={`pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full blur-[70px] ${accent.glow}`}
                />

                <div className="relative flex grow flex-col p-8 sm:p-10">
                  <div className="flex items-center justify-between gap-4">
                    <p
                      className={`au-mono text-[11px] font-medium uppercase tracking-[0.26em] ${accent.text}`}
                    >
                      {sector.eyebrow}
                    </p>
                    <span
                      className={`flex h-11 w-11 items-center justify-center rounded-2xl ring-1 ${accent.icon}`}
                    >
                      <Icon size={20} aria-hidden />
                    </span>
                  </div>

                  <h3 className="mt-5 max-w-[440px] text-[clamp(1.5rem,2.8vw,1.95rem)] font-medium leading-[1.14] tracking-[-0.025em] text-au-ink">
                    {sector.title}
                  </h3>
                  <p className="mt-3.5 max-w-[480px] text-[14.5px] leading-relaxed text-au-ink-2">
                    {sector.copy}
                  </p>

                  <ul className="mt-7 space-y-3">
                    {sector.points.map((point) => (
                      <CheckItem key={point}>{point}</CheckItem>
                    ))}
                  </ul>

                  <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-3 pt-9">
                    <Btn href={`/${sector.slug}`} tone="glass" arrow>
                      {sector.cta}
                    </Btn>
                    <Btn href={sector.demoHref} tone="ghost" arrow>
                      {sector.demoLabel}
                    </Btn>
                  </div>
                </div>

                {/* A sliver of the finished sample site, rising on hover. */}
                <div className="relative mt-2 h-[132px] overflow-hidden px-8 sm:px-10">
                  <div
                    aria-hidden
                    className={`pointer-events-none absolute inset-0 z-10 bg-gradient-to-t ${accent.tint} via-transparent to-transparent`}
                  />
                  <Image
                    src={preview.src}
                    alt={preview.alt}
                    width={900}
                    height={600}
                    sizes="(max-width: 1024px) 92vw, 560px"
                    className="w-full rounded-t-2xl border border-white/10 border-b-0 object-cover object-top shadow-[0_-20px_60px_-30px_rgba(0,0,0,0.9)] transition-transform duration-700 ease-out group-hover:-translate-y-3"
                  />
                </div>
              </GlassCard>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
