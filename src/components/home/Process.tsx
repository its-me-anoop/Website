"use client";

import { useEffect, useRef, type RefObject } from "react";
import { Reveal } from "./Reveal";

type Step = {
  number: string;
  week: string;
  title: string;
  description: string;
  stroke: string; // rgba colour of the outlined number
};

const STEPS: Step[] = [
  {
    number: "01",
    week: "Week 1",
    title: "Discover",
    description:
      "Talk to the people it's for. Sketch, prototype, and write the one-pager that keeps everyone honest later.",
    stroke: "rgba(139,124,255,.6)",
  },
  {
    number: "02",
    week: "Weeks 2–3",
    title: "Design",
    description:
      "Figma first, then straight into code — real components with real data, on a real device.",
    stroke: "rgba(61,242,196,.6)",
  },
  {
    number: "03",
    week: "Weeks 4–8",
    title: "Build",
    description:
      "Type-safe, tested, demoed every Friday. The product grows where you can watch it grow.",
    stroke: "rgba(255,180,92,.6)",
  },
  {
    number: "04",
    week: "Week 9",
    title: "Launch",
    description:
      "App Store submission, analytics, monitoring — and a press kit that's ready on the day.",
    stroke: "rgba(255,111,203,.6)",
  },
  {
    number: "05",
    week: "Ongoing",
    title: "Support",
    description:
      "Version 1.1 starts the week after 1.0. SLAs, monitoring, and a fast response when production misbehaves.",
    stroke: "rgba(236,238,248,.5)",
  },
];

/** Gradient rule that draws itself across the timeline as you scroll. */
function ProcessLine({
  sectionRef,
}: {
  sectionRef: RefObject<HTMLElement | null>;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const sec = sectionRef.current;
      if (!sec) return;
      const r = sec.getBoundingClientRect();
      const p = Math.min(
        1,
        Math.max(0, (window.innerHeight * 0.8 - r.top) / (r.height * 0.9))
      );
      el.style.width = `${p * 100}%`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sectionRef]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="absolute left-0 top-0 h-0.5 w-0 shadow-[0_0_12px_rgba(61,242,196,.5)] transition-[width] duration-[250ms] ease-linear [background:linear-gradient(90deg,#8B7CFF,#3DF2C4,#FF6FCB)]"
    />
  );
}

export function Process() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative z-[1] px-6 pb-[60px] pt-[150px] md:px-12"
    >
      <div className="mx-auto max-w-[1320px]">
        <Reveal className="mb-5 font-jb text-[11px] uppercase tracking-[0.3em] text-candy">
          <span className="text-frost/40">03 /</span> Process
        </Reveal>
        <Reveal delay={80}>
          <h2 className="m-0 font-syne text-[clamp(34px,5.6vw,84px)] font-extrabold uppercase leading-none tracking-[-0.03em] text-frost">
            Nine weeks.
            <br />
            <span className="text-outline">
              Every Friday, something to click.
            </span>
          </h2>
        </Reveal>

        <div className="relative mt-[88px]">
          <div className="absolute inset-x-0 top-0 h-px bg-white/10" />
          <ProcessLine sectionRef={sectionRef} />

          <div className="grid sm:grid-cols-2 lg:grid-cols-5">
            {STEPS.map((step, i) => (
              <Reveal
                key={step.number}
                delay={i * 80}
                className={`pt-11 sm:px-7 ${
                  i === 0 ? "sm:pl-0" : ""
                } ${i === STEPS.length - 1 ? "lg:pr-0" : ""} ${
                  i > 0 ? "lg:border-l lg:border-white/[.08]" : ""
                }`}
              >
                <div
                  className="font-syne text-[64px] font-extrabold leading-none text-transparent"
                  style={{ WebkitTextStroke: `1px ${step.stroke}` }}
                >
                  {step.number}
                </div>
                <div className="mt-[18px] font-jb text-[10px] uppercase tracking-[0.22em] text-frost/[.42]">
                  {step.week}
                </div>
                <h3 className="mb-0 mt-2 font-syne text-[22px] font-bold text-frost">
                  {step.title}
                </h3>
                <p className="mb-0 mt-3 text-sm leading-relaxed text-frost/[.58]">
                  {step.description}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
