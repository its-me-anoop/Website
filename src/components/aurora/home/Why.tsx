"use client";

import { Sparkles, UserRound, Users } from "lucide-react";
import { GlassCard, Stagger, StaggerItem } from "@/components/fx";
import { whyFlutterly } from "../data";
import { Section, SectionHead } from "../primitives";

const icons = [UserRound, Users, Sparkles] as const;

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
      <Stagger className="mt-16 grid gap-5 md:grid-cols-3" delay={0.08}>
        {whyFlutterly.map((item, i) => {
          const Icon = icons[i];
          return (
            <StaggerItem key={item.title} className="h-full">
              <GlassCard as="article" className="h-full p-7 sm:p-8">
                <span className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-au-teal/20 bg-au-teal/10 text-au-teal">
                  <Icon size={20} aria-hidden />
                </span>
                <h3 className="relative mt-6 text-[18px] font-medium tracking-tight text-au-ink">
                  {item.title}
                </h3>
                <p className="relative mt-3 text-[14.5px] leading-relaxed text-au-ink-2">
                  {item.copy}
                </p>
              </GlassCard>
            </StaggerItem>
          );
        })}
      </Stagger>
    </Section>
  );
}
