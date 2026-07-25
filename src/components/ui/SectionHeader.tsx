"use client";

import React from "react";
import { m as motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  /** Small caption above the title (e.g. "Selected work"). */
  eyebrow: string;
  /** The heading content — wrap an emphasis word in <em> to tint it accent. */
  title: React.ReactNode;
  /** Optional supporting paragraph shown beside / below the title. */
  lede?: React.ReactNode;
  /** id applied to the <h2> so sections can be aria-labelledby it. */
  headingId?: string;
  /** Accent colour for the eyebrow dot. */
  dot?: string;
  align?: "split" | "center";
  className?: string;
}

/**
 * Consistent section heading: a small caption, a large display title and an
 * optional lede. Drives the editorial rhythm shared across every section.
 */
export function SectionHeader({
  eyebrow,
  title,
  lede,
  headingId,
  dot = "var(--accent)",
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
        "mb-14 gap-8 md:mb-20",
        align === "split"
          ? "grid items-end md:grid-cols-2 md:gap-16"
          : "mx-auto flex max-w-2xl flex-col items-center text-center",
        className
      )}
    >
      <div>
        <motion.span
          {...reveal(0)}
          className="inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.14em] text-muted"
        >
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: dot }}
          />
          {eyebrow}
        </motion.span>
        <motion.h2
          id={headingId}
          {...reveal(0.08)}
          className="mt-4 text-[clamp(34px,5vw,64px)] font-semibold leading-[1.04] tracking-[-0.03em] text-ink [&_em]:not-italic [&_em]:text-accent"
        >
          {title}
        </motion.h2>
      </div>
      {lede ? (
        <motion.div
          {...reveal(0.16)}
          className={cn(
            "text-[16px] leading-[1.7] text-ink-3",
            align === "split" ? "max-w-[440px]" : "mt-5 max-w-xl"
          )}
        >
          {lede}
        </motion.div>
      ) : null}
    </div>
  );
}
