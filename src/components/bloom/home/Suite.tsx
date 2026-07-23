"use client";

import { Globe2, HeartPulse, Smartphone } from "lucide-react";
import { suite } from "../data";
import { BtnLink, Rise, SectionHead } from "../primitives";

const icons = [HeartPulse, Globe2, Smartphone] as const;

const iconTone = [
  "bg-bl-teal-soft text-bl-teal",
  "bg-bl-nhs-soft text-bl-nhs",
  "bg-bl-amber-soft text-bl-amber",
] as const;

export function Suite() {
  return (
    <section id="services" className="mx-auto w-full max-w-[1240px] scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28">
      <SectionHead
        eyebrow="What Flutterly does"
        title={[
          { text: "One studio," },
          { text: "three crafts.", tone: "muted" },
        ]}
        copy="Everything is designed and engineered in-house — so the person you talk to is the person doing the work."
      />

      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {suite.map((service, i) => {
          const Icon = icons[i];
          return (
            <Rise key={service.id} delay={i * 0.1}>
              <article className="bl-card flex h-full flex-col rounded-[26px] border border-bl-line bg-bl-surface p-7">
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl ${iconTone[i]}`}
                >
                  <Icon size={22} aria-hidden />
                </span>
                <h3 className="mt-5 text-[20px] font-medium tracking-tight text-bl-ink">
                  {service.title}
                </h3>
                <p className="mt-2.5 text-[14.5px] leading-relaxed text-bl-ink-soft">
                  {service.copy}
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {service.points.map((point) => (
                    <li
                      key={point}
                      className="rounded-full bg-bl-band px-3 py-1 text-[12.5px] font-medium text-bl-ink-soft"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-6">
                  <BtnLink href={service.cta.href} tone="ghost" arrow className="px-0 py-0">
                    {service.cta.label}
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
