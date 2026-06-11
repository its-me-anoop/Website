import type { ReactNode } from "react";
import { ArrowDown } from "lucide-react";
import { Reveal } from "./Reveal";
import { Counter } from "./Counter";

const STATS: Array<{ value: ReactNode; label: string }> = [
  { value: <Counter target={12} suffix="+" />, label: "Apps shipped" },
  {
    value: (
      <>
        100<span className="text-mint">/</span>100
      </>
    ),
    label: "Lighthouse",
  },
  { value: <>&lt;48h</>, label: "Reply time" },
  { value: "01", label: "Keyboard, no hand-offs" },
];

export function Hero() {
  return (
    <section
      id="top"
      className="relative z-[1] flex min-h-screen flex-col justify-end px-6 pt-[140px] md:px-12"
    >
      <div className="mx-auto w-full max-w-[1320px]">
        <Reveal delay={650} className="mb-[34px] flex items-center gap-4">
          <span className="h-[9px] w-[9px] rounded-full bg-mint shadow-[0_0_14px_rgba(61,242,196,.9)] [animation:au-pulse_2.6s_ease-in-out_infinite]" />
          <span className="font-jb text-[11px] uppercase tracking-[0.3em] text-frost/55">
            Flutterly Ltd — Product studio — Est. 2024 — Booking Summer
            &rsquo;26
          </span>
        </Reveal>

        <h1 className="m-0 font-syne text-[clamp(38px,9.6vw,150px)] font-extrabold uppercase leading-[.96] tracking-[-0.035em] text-frost">
          <Reveal kind="word" delay={750} as="span" className="inline-block">
            Design-grade
          </Reveal>
          <br />
          <Reveal kind="word" delay={900} as="span" className="inline-block">
            <span className="text-outline-hero">engineering</span>
          </Reveal>
        </h1>

        <div className="mt-12 flex flex-wrap items-end justify-between gap-12">
          <Reveal delay={1050}>
            <p className="m-0 max-w-[480px] text-lg leading-[1.65] text-frost/65">
              A one-person product studio in Reading, UK. Web in Next.js and
              React, native iOS in SwiftUI, cross-platform in Flutter —
              designed, built, and shipped by Anoop Jose.
            </p>
          </Reveal>
          <Reveal delay={1150} className="flex flex-wrap items-center gap-3.5">
            <a
              href="#work"
              className="inline-flex items-center gap-2.5 rounded-full bg-frost px-[30px] py-4 font-grotesk text-[15px] font-bold text-obsidian transition-[transform,box-shadow] duration-[250ms] ease-[cubic-bezier(.3,1.4,.45,.9)] hover:scale-105 hover:shadow-[0_0_36px_rgba(139,124,255,.5)] active:scale-95"
            >
              See the work <ArrowDown size={16} aria-hidden />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2.5 rounded-full border border-white/[.14] bg-white/5 px-[30px] py-4 font-grotesk text-[15px] font-semibold text-frost shadow-[inset_0_1px_0_rgba(255,255,255,.08)] backdrop-blur-[16px] transition-[transform,border-color] duration-[250ms] ease-[cubic-bezier(.3,1.4,.45,.9)] hover:scale-105 hover:border-mint/50 active:scale-95"
            >
              Start a project
            </a>
          </Reveal>
        </div>

        <Reveal
          delay={1250}
          className="mt-[72px] grid grid-cols-2 border-t border-white/10 md:grid-cols-4"
        >
          {STATS.map(({ value, label }, i) => (
            <div
              key={label}
              className={`flex flex-col gap-1.5 px-6 pb-[34px] pt-[26px] first:pl-0 md:last:pr-0 ${
                i > 0 ? "md:border-l md:border-white/10" : ""
              } ${i % 2 === 1 ? "border-l border-white/10" : ""} ${
                i > 1 ? "border-t border-white/10 md:border-t-0" : ""
              }`}
            >
              <span className="font-syne text-[32px] font-bold tracking-[-1px] text-frost">
                {value}
              </span>
              <span className="font-jb text-[10px] uppercase tracking-[0.22em] text-frost/[.42]">
                {label}
              </span>
            </div>
          ))}
        </Reveal>
      </div>

      <div className="absolute bottom-9 right-12 hidden flex-col items-center gap-2.5 md:flex">
        <span className="font-jb text-[10px] tracking-[0.3em] text-frost/40 [writing-mode:vertical-rl]">
          SCROLL
        </span>
        <span className="h-11 w-px bg-frost/50 [animation:au-scrollline_2s_cubic-bezier(.76,0,.24,1)_infinite]" />
      </div>
    </section>
  );
}
