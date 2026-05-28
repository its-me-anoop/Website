"use client";

import React from "react";
import { m, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  /** Small mono label above the title (e.g. "What we build"). */
  eyebrow: string;
  /** The heading content — pass JSX to highlight words with <em>. */
  title: React.ReactNode;
  /** Optional supporting paragraph shown beside / below the title. */
  lede?: React.ReactNode;
  /** id applied to the <h2> so sections can be aria-labelledby it. */
  headingId?: string;
  /** Dot colour for the eyebrow marker. */
  dot?: string;
  align?: "split" | "center";
  className?: string;
}

/**
 * Consistent section heading: an eyebrow chip, a large display title and an
 * optional lede. Drives the editorial rhythm shared across every section.
 */
export function SectionHeader({
  eyebrow,
  title,
  lede,
  headingId,
  dot = "var(--signal)",
  align = "split",
  className,
}: SectionHeaderProps) {
  const reduce = useReducedMotion();

  const reveal = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 22, filter: "blur(8px)" },
          whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
          viewport: { once: true, margin: "-12% 0px" },
          transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as const },
        };

  return (
    <div
      className={cn(
        "mb-14 gap-8 md:mb-16",
        align === "split"
          ? "grid items-end md:grid-cols-2 md:gap-16"
          : "mx-auto flex max-w-2xl flex-col items-center text-center",
        className
      )}
    >
      <div>
        <m.span
          {...reveal(0)}
          className="inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.02] px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-ink-3 backdrop-blur"
        >
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: dot }}
          />
          {eyebrow}
        </m.span>
        <m.h2
          id={headingId}
          {...reveal(0.08)}
          className="mt-5 text-[clamp(34px,5vw,60px)] font-semibold leading-[1.02] tracking-[-0.03em] text-ink [&_em]:not-italic [&_em]:text-signal"
        >
          {title}
        </m.h2>
      </div>
      {lede ? (
        <m.div
          {...reveal(0.16)}
          className={cn(
            "text-[15.5px] leading-[1.7] text-ink-3",
            align === "split" ? "max-w-[440px]" : "mt-5 max-w-xl"
          )}
        >
          {lede}
        </m.div>
      ) : null}
    </div>
  );
}
