"use client";

import { Fragment } from "react";
import { m, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

/** The house entrance curve — fast out of the gate, long tail. */
export const EASE = [0.16, 1, 0.3, 1] as const;

/* ─────────────────────────────────────────────────────────────
   Reveal — the scroll entrance used by every block on the site.

   Note: Framer keeps the final `filter: blur(0px)` on the element. It
   is an identity filter visually, but any filter other than `none`
   makes the element a containing block for fixed-position descendants.
   Nothing fixed lives inside a Reveal, so it is harmless here — the
   page-transition wrapper in `app/template.tsx` deliberately does not
   animate a filter for exactly that reason.
   ───────────────────────────────────────────────────────────── */

export function Reveal({
  children,
  className,
  delay = 0,
  y = 26,
  blur = 8,
  scale,
  once = true,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  blur?: number;
  scale?: number;
  once?: boolean;
  as?: "div" | "li" | "section" | "span";
}) {
  const reduce = useReducedMotion();
  const MTag = { div: m.div, li: m.li, section: m.section, span: m.span }[Tag];

  if (reduce) return <Tag className={className}>{children}</Tag>;

  return (
    <MTag
      className={className}
      initial={{
        opacity: 0,
        y,
        filter: `blur(${blur}px)`,
        ...(scale ? { scale } : {}),
      }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
      viewport={{ once, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.85, ease: EASE, delay }}
    >
      {children}
    </MTag>
  );
}

/* ─────────────────────────────────────────────────────────────
   TextReveal — display headings assembled word by word.
   Words rise out of clipped line boxes with the blur burning off,
   so the sentence resolves into focus rather than sliding in.
   ───────────────────────────────────────────────────────────── */

export type Segment = {
  text: string;
  tone?: "ink" | "muted" | "accent" | "gradient" | "day" | "day-muted";
};

const toneClass: Record<NonNullable<Segment["tone"]>, string> = {
  ink: "text-au-ink",
  muted: "text-au-ink-3",
  accent: "text-au-accent",
  gradient: "au-grad-text",
  day: "text-au-day-ink",
  "day-muted": "text-au-day-muted",
};

const wordVariants: Variants = {
  hidden: { y: "112%", opacity: 0, filter: "blur(10px)" },
  visible: (order: { delay: number; stagger: number; index: number }) => ({
    y: "0%",
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.82,
      ease: EASE,
      delay: order.delay + order.index * order.stagger,
    },
  }),
};

const tags = { h1: m.h1, h2: m.h2, h3: m.h3, p: m.p, span: m.span } as const;

export function TextReveal({
  segments,
  as = "h2",
  className,
  delay = 0,
  stagger = 0.055,
}: {
  segments: readonly Segment[];
  as?: keyof typeof tags;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const reduce = useReducedMotion();
  const MTag = tags[as];
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
        <span key={s}>
          {segment.text.split(" ").map((word) => {
            const i = wordIndex++;
            /* The clip span is inline-block, so the separating space has
               to be its sibling rather than living inside it.

               The tone lands on the *animated* span, not this wrapper:
               a `background-clip: text` fill painted on an ancestor of a
               transformed element never reaches the glyphs, which left
               gradient words rendering as empty space. */
            return (
              <Fragment key={i}>
                <span className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
                  <m.span
                    className={cn(
                      "inline-block will-change-transform",
                      toneClass[segment.tone ?? "ink"]
                    )}
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
   Stagger — a parent/child pair for lists and card grids.
   ───────────────────────────────────────────────────────────── */

export function Stagger({
  children,
  className,
  delay = 0,
  gap = 0.09,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  gap?: number;
  as?: "div" | "ul" | "ol";
}) {
  const reduce = useReducedMotion();
  const MTag = { div: m.div, ul: m.ul, ol: m.ol }[as];
  const Tag = as;

  if (reduce) return <Tag className={className}>{children}</Tag>;

  return (
    <MTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: gap, delayChildren: delay } },
      }}
    >
      {children}
    </MTag>
  );
}

const childVariants: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: EASE },
  },
};

export function StaggerItem({
  children,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "li";
}) {
  const reduce = useReducedMotion();
  const MTag = { div: m.div, li: m.li }[as];
  const Tag = as;

  if (reduce) return <Tag className={className}>{children}</Tag>;

  return (
    <MTag className={className} variants={childVariants}>
      {children}
    </MTag>
  );
}

/* ─────────────────────────────────────────────────────────────
   Eyebrow — the small monospaced label above every section head.
   ───────────────────────────────────────────────────────────── */

export function Eyebrow({
  children,
  className,
  tone = "accent",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "accent" | "day";
}) {
  return (
    <p
      className={cn(
        "au-mono flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.28em]",
        tone === "accent" ? "text-au-accent" : "text-au-teal-deep",
        className
      )}
    >
      <span
        aria-hidden
        className={cn(
          "inline-block h-px w-6",
          tone === "accent" ? "bg-au-accent/60" : "bg-au-teal-deep/50"
        )}
      />
      {children}
    </p>
  );
}
