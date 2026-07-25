"use client";

import { Globe2, HeartPulse, Smartphone } from "lucide-react";
import { GlassCard, Stagger, StaggerItem } from "@/components/fx";
import { suite } from "../data";
import { Btn, Section, SectionHead } from "../primitives";

const icons = [HeartPulse, Globe2, Smartphone] as const;

/** Each craft gets its own light: teal, sky, violet. */
const auras = [
  "from-au-teal/25 to-au-aqua/5 text-au-teal",
  "from-au-sky/25 to-au-violet/5 text-au-sky",
  "from-au-violet/25 to-au-rose/5 text-au-violet",
] as const;

const glows = [
  "bg-au-teal/18",
  "bg-au-sky/18",
  "bg-au-violet/18",
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

      <Stagger className="mt-16 grid gap-5 md:grid-cols-3" delay={0.1}>
        {suite.map((service, i) => {
          const Icon = icons[i];
          return (
            <StaggerItem key={service.id} className="h-full">
              <GlassCard as="article" className="flex h-full flex-col p-7 sm:p-8">
                {/* Corner glow that warms on hover. */}
                <span
                  aria-hidden
                  className={`pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full blur-3xl transition-opacity duration-700 ${glows[i]} opacity-40 group-hover:opacity-90`}
                />
                <span
                  aria-hidden
                  className="au-mono absolute right-6 top-6 text-[11px] tracking-[0.2em] text-white/15"
                >
                  0{i + 1}
                </span>

                <span
                  className={`relative flex h-13 w-13 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br p-3.5 ${auras[i]}`}
                >
                  <Icon size={22} aria-hidden />
                </span>

                <h3 className="relative mt-6 text-[21px] font-medium tracking-tight text-au-ink">
                  {service.title}
                </h3>
                <p className="relative mt-3 text-[14.5px] leading-relaxed text-au-ink-2">
                  {service.copy}
                </p>

                <ul className="relative mt-5 flex flex-wrap gap-2">
                  {service.points.map((point) => (
                    <li
                      key={point}
                      className="rounded-full border border-white/8 bg-white/[0.04] px-3 py-1 text-[12.5px] font-medium text-au-ink-3"
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
              </GlassCard>
            </StaggerItem>
          );
        })}
      </Stagger>
    </Section>
  );
}
