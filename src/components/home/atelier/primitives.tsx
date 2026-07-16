"use client";

import { Fragment } from "react";
import { m, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/** Shared spring for entrances — soft, slightly overdamped. */
export const EASE = [0.16, 1, 0.3, 1] as const;

/* ─────────────────────────────────────────────────────────────
   RevealWords — the signature staggered word reveal. Words rise
   out of an overflow-hidden line one by one; segments can be
   tinted (muted / terracotta / violet) like the reference.
   ───────────────────────────────────────────────────────────── */

export type WordSegment = {
  text: string;
  tone?: "ink" | "muted" | "soft" | "terracotta" | "violet";
};

const toneClass: Record<NonNullable<WordSegment["tone"]>, string> = {
  ink: "text-at-ink",
  muted: "text-at-muted",
  soft: "text-at-ink-soft",
  terracotta: "text-at-terracotta",
  violet: "text-at-violet",
};

/* The words rise out of clipped line-boxes, so the words themselves are
   invisible to IntersectionObserver while hidden. The parent heading is
   what gets observed; it propagates the `visible` variant down to each
   word with a per-word delay. */
const wordVariants = {
  hidden: { y: "110%", opacity: 0 },
  visible: (order: { delay: number; stagger: number; index: number }) => ({
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: EASE,
      delay: order.delay + order.index * order.stagger,
    },
  }),
};

const revealTags = { h1: m.h1, h2: m.h2, h3: m.h3, p: m.p } as const;

export function RevealWords({
  segments,
  as = "h2",
  className,
  delay = 0,
  stagger = 0.055,
}: {
  segments: readonly WordSegment[];
  as?: keyof typeof revealTags;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const reduce = useReducedMotion();
  const MTag = revealTags[as];
  const Tag = as;
  let wordIndex = 0;

  if (reduce) {
    return (
      <Tag className={className}>
        {segments.map((segment, s) => (
          <span key={s} className={toneClass[segment.tone ?? "ink"]}>
            {segment.text}{" "}
          </span>
        ))}
      </Tag>
    );
  }

  return (
    <MTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
    >
      {segments.map((segment, s) => (
        <span key={s} className={toneClass[segment.tone ?? "ink"]}>
          {segment.text.split(" ").map((word) => {
            const i = wordIndex++;
            /* The clip span is inline-block, so a space inside it collapses
               at the boundary — the separating space must be a sibling. */
            return (
              <Fragment key={i}>
                <span className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em] align-bottom">
                  <m.span
                    className="inline-block will-change-transform"
                    variants={wordVariants}
                    custom={{ delay, stagger, index: i }}
                  >
                    {word}
                  </m.span>
                </span>{" "}
              </Fragment>
            );
          })}
        </span>
      ))}
    </MTag>
  );
}

/* ─────────────────────────────────────────────────────────────
   Rise — soft rise-in wrapper for blocks.
   ───────────────────────────────────────────────────────────── */

export function Rise({
  children,
  className,
  delay = 0,
  y = 32,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <m.div
      className={className}
      initial={reduce ? false : { y, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </m.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Eyebrow — letterspaced small-caps section label.
   ───────────────────────────────────────────────────────────── */

export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "text-[11px] font-medium uppercase tracking-[0.28em] text-at-ink-soft",
        className
      )}
    >
      {children}
    </p>
  );
}

/* ─────────────────────────────────────────────────────────────
   HandleChip — the @handle speech bubble from the reference.
   ───────────────────────────────────────────────────────────── */

const chipTone = {
  dark: "bg-at-dark text-at-dark-ink",
  terracotta: "bg-at-terracotta text-white",
  violet: "bg-at-violet text-white",
} as const;

export function HandleChip({
  handle,
  tone = "dark",
  className,
}: {
  handle: string;
  tone?: keyof typeof chipTone;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "at-chip-tail relative inline-flex rotate-[-6deg] rounded-full px-3.5 py-1.5 text-[13px] font-medium shadow-[0_10px_24px_-12px_rgba(34,33,31,0.45)]",
        chipTone[tone],
        className
      )}
    >
      {handle}
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────
   Pill buttons + circular icon buttons.
   ───────────────────────────────────────────────────────────── */

const pillTone = {
  dark: "liquid-dark",
  light: "liquid",
  violet: "liquid-violet",
  ghost: "bg-transparent text-at-ink-soft hover:text-at-ink",
} as const;

export function Pill({
  children,
  href,
  tone = "dark",
  className,
  external,
}: {
  children: React.ReactNode;
  href: string;
  tone?: keyof typeof pillTone;
  className?: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[14px] font-medium transition-[filter,color,transform] duration-300 hover:-translate-y-0.5 hover:brightness-105",
        pillTone[tone],
        className
      )}
    >
      {children}
    </a>
  );
}

export function ArrowButton({
  direction,
  onClick,
  label,
  disabled,
  className,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  label: string;
  disabled?: boolean;
  className?: string;
}) {
  const Icon = direction === "prev" ? ArrowLeft : ArrowRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      disabled={disabled}
      className={cn(
        "liquid flex h-11 w-11 items-center justify-center rounded-full transition-[filter,opacity,transform] duration-300 hover:-translate-y-0.5 hover:brightness-105 disabled:cursor-default disabled:opacity-35 disabled:hover:translate-y-0",
        className
      )}
    >
      <Icon size={17} aria-hidden />
    </button>
  );
}
