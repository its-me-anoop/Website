"use client";

import { Fragment, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/** The house entrance curve — fast out of the gate, long tail. */
export const EASE = [0.16, 1, 0.3, 1] as const;

/* ─────────────────────────────────────────────────────────────
   The entrance system.

   Two rules make this safe, and both matter:

   1. A block is only ever hidden once JavaScript has *armed* it. The
      hidden start state in the stylesheet requires `[data-armed]`, an
      attribute nothing but the effect below writes. So with no
      JavaScript, a blocked script, a chunk that 404s or a hydration
      crash, every word on the page is simply readable — there is no
      state in which content is hidden and nothing is coming to reveal
      it.

   2. Only what is *below the fold at hydration* gets armed. Anything
      already on screen is left exactly as it was served, so the
      headline, the lede and the calls to action paint with the HTML
      and never wait on a bundle. On a slow connection that is the
      difference between reading the page at first paint and staring at
      an empty cream column until React arrives.

   The attributes are written imperatively rather than rendered from
   state: React does not own them, so it cannot clobber them on a
   re-render, and 70+ blocks do not each schedule one.

   The motion itself is hard-edged on purpose — transform and opacity
   only, and words clipped out of their line boxes. No blur: it is the
   most expensive thing you can composite during a scroll, and it
   softens type that is meant to read as precise.
   ───────────────────────────────────────────────────────────── */

/* One IntersectionObserver for the whole document rather than one per
   block. A long marketing page mounts 70+ entrances; a shared observer
   keeps that a single registration instead of seventy. */
type Hit = (visible: boolean) => void;

let sharedObserver: IntersectionObserver | null = null;
const hits = new WeakMap<Element, Hit>();

function observerFor(): IntersectionObserver | null {
  if (typeof IntersectionObserver === "undefined") return null;
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) hits.get(entry.target)?.(entry.isIntersecting);
      },
      /* Bottom −12%: a block resolves as its top passes 88% of the
         viewport, which is what gives the entrance its timing.
         ─────────────────────────────────────────────────────────
         Top +100000px: the root is extended far above the viewport so
         that anything already scrolled past still counts as
         intersecting. Without it, a trackpad flick, a jump to a
         `#hash`, or a restored scroll position can carry a block from
         below the fold to above it between two animation frames — the
         intersection ratio goes 0 → 0, no threshold is crossed, the
         observer never fires at all, and that block stays invisible for
         the rest of the session. Widening the root cannot make anything
         reveal early: the bottom edge alone decides that. */
      { rootMargin: "100000px 0px -12% 0px" }
    );
  }
  return sharedObserver;
}

/**
 * Arms `ref` for a scroll entrance, and reveals it when it arrives.
 *
 * Returns nothing: `data-armed` and `data-in` are set straight on the
 * node. Where IntersectionObserver is missing, or the element is
 * already on screen, the element is never armed and so is never hidden.
 */
function useReveal(once = true) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = observerFor();
    if (!io) return;

    /* Already on screen when JavaScript caught up? Then the viewer has
       it, and hiding it now to animate it back in would be a flash of
       content disappearing. Leave it exactly as served. */
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    el.setAttribute("data-armed", "");

    hits.set(el, (visible) => {
      if (visible) {
        el.setAttribute("data-in", "");
        if (once) {
          io.unobserve(el);
          hits.delete(el);
        }
      } else if (!once) {
        el.removeAttribute("data-in");
      }
    });
    io.observe(el);

    return () => {
      io.unobserve(el);
      hits.delete(el);
    };
  }, [once]);

  return ref;
}

/* ─────────────────────────────────────────────────────────────
   Reveal — the scroll entrance used by every block on the site.
   ───────────────────────────────────────────────────────────── */

export function Reveal({
  children,
  className,
  delay = 0,
  y = 26,
  scale,
  once = true,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Distance risen, in px. */
  y?: number;
  /** Optional scale-up, for plates that should settle rather than rise. */
  scale?: number;
  once?: boolean;
  as?: "div" | "li" | "section" | "span";
}) {
  const ref = useReveal(once);
  /* Widened to ElementType so the ref is not type-intersected across
     every tag in the union. The public `as` prop stays narrow. */
  const Tag = as as React.ElementType;

  return (
    <Tag
      ref={ref}
      className={className}
      data-au-reveal=""
      style={
        {
          "--au-delay": `${delay}s`,
          "--au-rise": `${y}px`,
          ...(scale ? { "--au-scale": `${scale}` } : {}),
        } as React.CSSProperties
      }
    >
      {children}
    </Tag>
  );
}

/* ─────────────────────────────────────────────────────────────
   TextReveal — display headings assembled word by word.
   Words are clipped out of their line boxes and rise into place,
   so the sentence resolves in reading order.
   ───────────────────────────────────────────────────────────── */

export type Segment = {
  text: string;
  tone?: "ink" | "muted" | "accent";
};

const toneClass: Record<NonNullable<Segment["tone"]>, string> = {
  ink: "text-au-ink",
  muted: "text-au-ink-3",
  accent: "text-au-teal-deep",
};

export function TextReveal({
  segments,
  as = "h2",
  className,
  delay = 0,
  stagger = 0.055,
}: {
  segments: readonly Segment[];
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const ref = useReveal();
  const Tag = as as React.ElementType;
  let wordIndex = 0;

  return (
    <Tag ref={ref} className={className} data-au-words="">
      {segments.map((segment, s) => (
        <span key={s} className={toneClass[segment.tone ?? "ink"]}>
          {segment.text.split(" ").map((word) => {
            const i = wordIndex++;
            /* The clip span is inline-block, so the separating space has
               to be its sibling rather than living inside it. */
            return (
              <Fragment key={i}>
                <span className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
                  <span
                    className="inline-block"
                    data-au-word=""
                    style={
                      {
                        "--au-delay": `${delay + i * stagger}s`,
                      } as React.CSSProperties
                    }
                  >
                    {word}
                  </span>
                </span>{" "}
              </Fragment>
            );
          })}
        </span>
      ))}
    </Tag>
  );
}

/* ─────────────────────────────────────────────────────────────
   Stagger — a parent/child pair for lists and card grids. The
   parent watches the viewport; each child's delay comes from its
   position in the row (see the nth-child ladder in globals.css).
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
  as?: "div" | "ul" | "ol" | "tbody";
}) {
  const ref = useReveal();
  const Tag = as as React.ElementType;

  return (
    <Tag
      ref={ref}
      className={className}
      data-au-stagger=""
      style={
        {
          "--au-delay": `${delay}s`,
          "--au-gap": `${gap}s`,
        } as React.CSSProperties
      }
    >
      {children}
    </Tag>
  );
}

export function StaggerItem({
  children,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "li" | "tr";
}) {
  const Tag = as as React.ElementType;
  return (
    <Tag className={className} data-au-stagger-item="">
      {children}
    </Tag>
  );
}

/* ─────────────────────────────────────────────────────────────
   Eyebrow — the wide, letterspaced label above every section head,
   led by a short three-colour tick.
   ───────────────────────────────────────────────────────────── */

export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("au-label flex items-center gap-3 text-au-muted", className)}>
      <span
        aria-hidden
        className="inline-block h-[3px] w-7 rounded-full bg-[image:var(--au-rule)]"
      />
      {children}
    </p>
  );
}
