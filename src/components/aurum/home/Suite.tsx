"use client";

import { Globe2, HeartPulse, Smartphone } from "lucide-react";
import { Plate, Stagger, StaggerItem } from "@/components/fx";
import { suite } from "../data";
import { Btn, Section, SectionHead } from "../primitives";

const icons = [HeartPulse, Globe2, Smartphone] as const;

/* Three crafts, the three colours of the rule — read left to right,
   the row spells out the same gradient the seams are drawn in. */
const crafts = [
  { brand: "var(--au-teal)", chip: "bg-au-teal/12 text-au-teal-deep ring-au-teal/25" },
  { brand: "var(--au-amber)", chip: "bg-au-amber/16 text-au-amber-ink ring-au-amber/35" },
  { brand: "var(--au-rose)", chip: "bg-au-rose/12 text-au-rose-ink ring-au-rose/25" },
] as const;

export function Suite() {
  return (
    <Section id="services">
      <SectionHead
        eyebrow="What Flutterly does"
        title={[
          { text: "One studio," },
          { text: "three crafts.", tone: "muted" },
        ]}
        copy="Everything is designed and engineered in-house — so the person you talk to is the person doing the work."
      />

      <Stagger className="mt-16 grid gap-6 md:grid-cols-3" delay={0.1}>
        {suite.map((service, i) => {
          const Icon = icons[i];
          const craft = crafts[i];
          return (
            <StaggerItem key={service.id} className="h-full">
              <Plate
                as="article"
                brand={craft.brand}
                className="flex h-full flex-col p-7 sm:p-8"
              >
                {/* The card's own colour, cut across its head. */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-[3px]"
                  style={{ background: craft.brand }}
                />
                <span
                  aria-hidden
                  className="au-label absolute right-6 top-6 text-[10px] text-au-line-2"
                >
                  0{i + 1}
                </span>

                <span
                  className={`relative flex h-12 w-12 items-center justify-center rounded-[var(--r-sm)] ring-1 ${craft.chip}`}
                >
                  <Icon size={22} aria-hidden />
                </span>

                <h3 className="au-display relative mt-6 text-[23px]">
                  {service.title}
                </h3>
                <p className="relative mt-3 text-[14.5px] leading-relaxed text-au-ink-2">
                  {service.copy}
                </p>

                <ul className="relative mt-5 flex flex-wrap gap-2">
                  {service.points.map((point) => (
                    <li
                      key={point}
                      className="rounded-full border border-au-line bg-au-surface px-3 py-1 text-[12.5px] font-medium text-au-ink-3"
                    >
                      {point}
                    </li>
                  ))}
                </ul>

                <div className="relative mt-auto pt-7">
                  <Btn href={service.cta.href} tone="ghost" arrow>
                    {service.cta.label}
                  </Btn>
                </div>
              </Plate>
            </StaggerItem>
          );
        })}
      </Stagger>
    </Section>
  );
}
