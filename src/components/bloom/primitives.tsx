"use client";

import { Fragment } from "react";
import Link from "next/link";
import { m, useReducedMotion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

/** Shared spring for entrances — soft, slightly overdamped. */
export const EASE = [0.16, 1, 0.3, 1] as const;

/* ─────────────────────────────────────────────────────────────
   RevealWords — staggered word reveal for display headings.
   Words rise out of clipped line-boxes; segments can be tinted.
   ───────────────────────────────────────────────────────────── */

export type WordSegment = {
  text: string;
  tone?: "ink" | "muted" | "teal";
};

const toneClass: Record<NonNullable<WordSegment["tone"]>, string> = {
  ink: "text-bl-ink",
  muted: "text-bl-muted",
  teal: "text-bl-teal",
};

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
  stagger = 0.05,
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
            /* The clip span is inline-block, so the separating space must
               be a sibling of it, not inside it. */
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
  y = 28,
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
   Eyebrow + SectionHead — the recurring section opener.
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
        "text-[11px] font-semibold uppercase tracking-[0.26em] text-bl-teal",
        className
      )}
    >
      {children}
    </p>
  );
}

export function SectionHead({
  eyebrow,
  title,
  copy,
  align = "center",
  className,
}: {
  eyebrow: string;
  title: readonly WordSegment[];
  copy?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        align === "center" ? "mx-auto max-w-[680px] text-center" : "max-w-[680px]",
        className
      )}
    >
      <Eyebrow className="mb-4">{eyebrow}</Eyebrow>
      <RevealWords
        as="h2"
        segments={title}
        className="text-[clamp(1.9rem,4.6vw,3rem)] font-medium leading-[1.08] tracking-[-0.03em] text-bl-ink"
      />
      {copy ? (
        <p
          className={cn(
            "mt-4 text-[16px] leading-relaxed text-bl-ink-soft",
            align === "center" && "mx-auto max-w-[560px]"
          )}
        >
          {copy}
        </p>
      ) : null}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Buttons — pill links in four finishes.
   ───────────────────────────────────────────────────────────── */

const btnTone = {
  teal: "bg-bl-teal text-white shadow-[0_10px_26px_-12px_rgba(14,122,99,0.65)] hover:bg-bl-teal-hover",
  pine: "bg-bl-pine text-bl-pine-ink hover:bg-bl-pine-2",
  outline:
    "border border-bl-line-2 bg-bl-surface text-bl-ink hover:border-bl-teal hover:text-bl-teal",
  white: "bg-white text-bl-pine hover:bg-bl-teal-soft",
  ghost: "text-bl-teal hover:text-bl-teal-hover",
} as const;

export function BtnLink({
  children,
  href,
  tone = "teal",
  className,
  external,
  arrow,
}: {
  children: React.ReactNode;
  href: string;
  tone?: keyof typeof btnTone;
  className?: string;
  external?: boolean;
  arrow?: boolean;
}) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[14.5px] font-medium transition-[background-color,border-color,color,transform] duration-300 hover:-translate-y-0.5",
    btnTone[tone],
    className
  );
  const content = (
    <>
      {children}
      {arrow ? <ArrowRight size={16} aria-hidden /> : null}
    </>
  );

  /* Client-side navigation (with prefetch) for internal routes; plain
     anchors for hashes, mailto:, tel: and external URLs. */
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={classes}
    >
      {content}
    </a>
  );
}

/* ─────────────────────────────────────────────────────────────
   CheckItem — tick list entry used across sectors / packages.
   ───────────────────────────────────────────────────────────── */

export function CheckItem({
  children,
  tone = "teal",
  className,
}: {
  children: React.ReactNode;
  tone?: "teal" | "pine";
  className?: string;
}) {
  return (
    <li className={cn("flex items-start gap-3", className)}>
      <span
        className={cn(
          "mt-0.5 flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full",
          tone === "teal"
            ? "bg-bl-teal-soft text-bl-teal"
            : "bg-white/12 text-bl-pine-ink"
        )}
      >
        <Check size={13} strokeWidth={2.6} aria-hidden />
      </span>
      <span className="text-[14.5px] leading-relaxed">{children}</span>
    </li>
  );
}

/* ─────────────────────────────────────────────────────────────
   FaqList — accessible native disclosure accordion.
   ───────────────────────────────────────────────────────────── */

export function FaqList({
  items,
  className,
}: {
  items: readonly { q: string; a: string }[];
  className?: string;
}) {
  return (
    <div className={cn("divide-y divide-bl-line rounded-3xl border border-bl-line bg-bl-surface", className)}>
      {items.map((item) => (
        <details key={item.q} className="group px-6 py-5 sm:px-8">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15.5px] font-medium text-bl-ink [&::-webkit-details-marker]:hidden">
            {item.q}
            <span
              aria-hidden
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-bl-band text-bl-teal transition-transform duration-300 group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="mt-3 max-w-[640px] text-[14.5px] leading-relaxed text-bl-ink-soft">
            {item.a}
          </p>
        </details>
      ))}
    </div>
  );
}
