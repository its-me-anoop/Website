"use client";

import { Sparkles, UserRound, Users } from "lucide-react";
import { Plate, Stagger, StaggerItem } from "@/components/fx";
import { whyFlutterly } from "../data";
import { Section, SectionHead } from "../primitives";

const icons = [UserRound, Users, Sparkles] as const;

const brands = ["var(--au-teal)", "var(--au-amber)", "var(--au-rose)"] as const;
const chips = [
  "bg-au-teal/12 text-au-teal-deep ring-au-teal/25",
  "bg-au-amber/16 text-au-amber-ink ring-au-amber/35",
  "bg-au-rose/12 text-au-rose-ink ring-au-rose/25",
] as const;

export function Why() {
  return (
    <Section>
      <SectionHead
        eyebrow="Why Flutterly"
        title={[
          { text: "Small studio." },
          { text: "Serious standards.", tone: "muted" },
        ]}
      />
      <Stagger className="mt-16 grid gap-6 md:grid-cols-3" delay={0.08}>
        {whyFlutterly.map((item, i) => {
          const Icon = icons[i];
          return (
            <StaggerItem key={item.title} className="h-full">
              <Plate as="article" brand={brands[i]} className="h-full p-7 sm:p-8">
                <span
                  className={`relative flex h-11 w-11 items-center justify-center rounded-[var(--r-sm)] ring-1 ${chips[i]}`}
                >
                  <Icon size={20} aria-hidden />
                </span>
                <h3 className="au-display relative mt-6 text-[20px]">
                  {item.title}
                </h3>
                <p className="relative mt-3 text-[14.5px] leading-relaxed text-au-ink-2">
                  {item.copy}
                </p>
              </Plate>
            </StaggerItem>
          );
        })}
      </Stagger>
    </Section>
  );
}
