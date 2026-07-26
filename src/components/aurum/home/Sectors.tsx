"use client";

import Image from "next/image";
import { HeartHandshake, Stethoscope } from "lucide-react";
import { Plate, Reveal } from "@/components/fx";
import { sectorCards } from "../data";
import { Btn, Band, CheckItem, Section, SectionHead } from "../primitives";

/* Two accents, two atmospheres: NHS blue for practices, burnt amber for
   homes. Teal stays the action colour on both. */
const accents = {
  nhs: {
    brand: "var(--au-nhs)",
    text: "text-au-nhs",
    icon: "bg-au-nhs/10 text-au-nhs ring-au-nhs/25",
  },
  amber: {
    brand: "var(--au-care)",
    text: "text-au-care",
    icon: "bg-au-care/10 text-au-care ring-au-care/25",
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
    <Band id="sectors" rule="top">
      <Section>
        <SectionHead
          eyebrow="Healthcare websites"
          title={[
            { text: "Built for the sectors" },
            { text: "where websites matter most.", tone: "muted" },
          ]}
          copy="Two specialisms, one standard: accessible, fast and honest websites for organisations that people depend on."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {sectorCards.map((sector, i) => {
            const accent = accents[sector.accent];
            const Icon = icons[sector.accent];
            const preview = previews[sector.slug as keyof typeof previews];

            return (
              <Reveal key={sector.slug} delay={i * 0.12} className="h-full">
                <Plate
                  as="article"
                  brand={accent.brand}
                  className="flex h-full flex-col"
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 top-0 h-[3px]"
                    style={{ background: accent.brand }}
                  />

                  <div className="relative flex grow flex-col p-8 sm:p-10">
                    <div className="flex items-center justify-between gap-4">
                      <p className={`au-label ${accent.text}`}>
                        {sector.eyebrow}
                      </p>
                      <span
                        className={`flex h-11 w-11 items-center justify-center rounded-[var(--r-sm)] ring-1 ${accent.icon}`}
                      >
                        <Icon size={20} aria-hidden />
                      </span>
                    </div>

                    <h3 className="au-display mt-5 max-w-[440px] text-[clamp(1.6rem,2.9vw,2.05rem)]">
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
                      <Btn href={`/${sector.slug}`} tone="plate" arrow>
                        {sector.cta}
                      </Btn>
                      <Btn href={sector.demoHref} tone="ghost" arrow>
                        {sector.demoLabel}
                      </Btn>
                    </div>
                  </div>

                  {/* The finished sample site, whole. The card's foot *is*
                      the screenshot: bled to the plate's own edges and ended
                      by the plate's own radius, cut by nothing.

                      It used to be a 132px window over the top of the image.
                      At 1440 that showed 40% of it and put the cut one pixel
                      above the card's bottom edge, so the crop had no frame
                      to belong to and read as a failed render — on the care
                      card it severed the words "home, with care". The
                      hairline is the seam `Work.tsx` puts between a specimen
                      and its body, inverted.

                      `width`/`height` are the raster's true dimensions, so
                      the box reserved on load is the box that gets painted;
                      the old 900×600 against a 1.488 image was a latent
                      layout shift. `sizes` stops at 600px deliberately —
                      620 crosses a Next image-size boundary and would fetch
                      w=1920 for a box that measures 574. */}
                  <div className="relative shrink-0 border-t border-au-line bg-au-paper-3">
                    <Image
                      src={preview.src}
                      alt={preview.alt}
                      width={1920}
                      height={1290}
                      sizes="(max-width: 1023px) 94vw, 600px"
                      className="block h-auto w-full"
                    />
                  </div>
                </Plate>
              </Reveal>
            );
          })}
        </div>
      </Section>
    </Band>
  );
}
