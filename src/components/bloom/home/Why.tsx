"use client";

import { ClipboardCheck, UserRoundCheck, UsersRound } from "lucide-react";
import { whyFlutterly } from "../data";
import { Rise, SectionHead } from "../primitives";

const icons = [UserRoundCheck, UsersRound, ClipboardCheck] as const;

export function Why() {
  return (
    <section className="mx-auto w-full max-w-[1240px] px-5 py-20 sm:px-8 sm:py-28">
      <SectionHead
        align="left"
        eyebrow="Why organisations choose Flutterly"
        title={[
          { text: "Company-level delivery." },
          { text: "Direct accountability.", tone: "muted" },
        ]}
        copy="A focused delivery company can move quickly without losing the standards, documentation and ownership serious organisations expect."
      />
      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {whyFlutterly.map((item, i) => {
          const Icon = icons[i];
          return (
            <Rise key={item.title} delay={i * 0.1}>
              <article className="h-full rounded-[26px] border border-bl-line bg-bl-surface p-7">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-bl-teal-soft text-bl-teal">
                  <Icon size={20} aria-hidden />
                </span>
                <h3 className="mt-5 text-[18px] font-medium tracking-tight text-bl-ink">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-[14.5px] leading-relaxed text-bl-ink-soft">
                  {item.copy}
                </p>
              </article>
            </Rise>
          );
        })}
      </div>
    </section>
  );
}
