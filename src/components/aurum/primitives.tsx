"use client";

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Eyebrow, Magnetic, Reveal, TextReveal, type Segment } from "@/components/fx";

/* Re-exported so pages can pull the whole Aurum vocabulary from one
   place rather than reaching into the effects kit for a label. */
export { Eyebrow };

/* ─────────────────────────────────────────────────────────────
   Btn — one pill in six finishes.

   Every finish reads its colours from tokens, so the same button
   works on paper and inside a `.au-night` band without a variant:
   `--au-teal-deep` and `--au-ink` are simply different values in
   there. The light sweep and the magnetic lean are decoration over
   an ordinary link — keyboard users get exactly the same target.
   ───────────────────────────────────────────────────────────── */

const tones = {
  /* The action colour — cream on teal-deep is 5.8:1. Hover deepens the
     fill rather than lightening it: cream on the full-strength teal is
     only 3.7:1, which a 14.5px label cannot use. */
  primary:
    "au-sweep bg-au-teal-deep text-au-teal-ink shadow-[0_14px_32px_-14px_rgba(20,108,122,0.7)] hover:bg-au-teal-press hover:shadow-[0_18px_40px_-14px_rgba(20,108,122,0.85)]",
  /* Card stock — the quiet second action. */
  plate: "au-plate text-au-ink hover:border-au-teal hover:text-au-teal-deep",
  /* A hairline outline, for a third action or a dense row. */
  outline:
    "border border-au-line-2 bg-transparent text-au-ink-2 hover:border-au-teal hover:text-au-teal-deep",
  /* Cocoa fill — the emphatic finish on a pale section. Both this and
     `cream` use the two fixed tokens, so they keep their identity
     inside a night band instead of inverting with it. */
  ink: "au-sweep bg-au-cocoa text-au-cream shadow-[0_14px_32px_-14px_rgba(20,8,10,0.55)] hover:bg-au-night-2",
  /* Cream fill — the emphatic finish on a night band, lifted from
     the reference hero. */
  cream:
    "au-sweep bg-au-cream text-au-cocoa shadow-[0_14px_36px_-10px_rgba(0,0,0,0.55)] hover:bg-white",
  /* A text action with a travelling arrow. */
  ghost: "text-au-teal-deep hover:text-au-teal-press",
} as const;

export function Btn({
  children,
  href,
  tone = "primary",
  className,
  external,
  arrow,
  magnetic = true,
  onClick,
}: {
  children: React.ReactNode;
  href: string;
  tone?: keyof typeof tones;
  className?: string;
  external?: boolean;
  arrow?: boolean;
  magnetic?: boolean;
  onClick?: () => void;
}) {
  const isGhost = tone === "ghost";
  const classes = cn(
    "group/btn relative inline-flex items-center justify-center gap-2 rounded-full text-[14.5px] font-semibold transition-[background-color,border-color,color,box-shadow] duration-300",
    !isGhost && "px-7 py-3.5",
    tones[tone],
    className
  );

  const content = (
    <>
      <span className="relative">{children}</span>
      {arrow ? (
        <ArrowRight
          size={16}
          aria-hidden
          className="relative transition-transform duration-300 group-hover/btn:translate-x-1"
        />
      ) : null}
    </>
  );

  /* Client-side navigation for internal routes; plain anchors for
     hashes, mailto:, tel: and external URLs. */
  const element = href.startsWith("/") ? (
    <Link href={href} className={classes} onClick={onClick}>
      {content}
    </Link>
  ) : (
    <a
      href={href}
      onClick={onClick}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={classes}
    >
      {content}
    </a>
  );

  if (!magnetic || isGhost) return element;
  return <Magnetic>{element}</Magnetic>;
}

/* ─────────────────────────────────────────────────────────────
   TextLink — the uppercase, letterspaced action under a card: a
   hairline underline that takes the accent on hover and an arrow
   that steps forward.
   ───────────────────────────────────────────────────────────── */

export function TextLink({
  children,
  href,
  external,
  className,
}: {
  children: React.ReactNode;
  href: string;
  external?: boolean;
  className?: string;
}) {
  const classes = cn(
    "group/link inline-flex items-center gap-2 self-start border-b border-au-line-2 pb-1.5 text-[12.5px] font-semibold uppercase tracking-[0.12em] text-au-ink transition-colors duration-300 hover:border-au-teal hover:text-au-teal-deep",
    className
  );
  const content = (
    <>
      {children}
      <ArrowRight
        size={14}
        aria-hidden
        className="transition-transform duration-300 group-hover/link:translate-x-1"
      />
    </>
  );

  return href.startsWith("/") ? (
    <Link href={href} className={classes}>
      {content}
    </Link>
  ) : (
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
   SectionHead — the recurring opener: eyebrow, Fraunces display
   heading, lead paragraph.
   ───────────────────────────────────────────────────────────── */

export function SectionHead({
  eyebrow,
  title,
  copy,
  align = "center",
  className,
}: {
  eyebrow: string;
  title: readonly Segment[];
  copy?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        align === "center" ? "mx-auto max-w-[760px] text-center" : "max-w-[720px]",
        className
      )}
    >
      <Reveal>
        <Eyebrow className={align === "center" ? "justify-center" : ""}>
          {eyebrow}
        </Eyebrow>
      </Reveal>
      <TextReveal
        as="h2"
        segments={title}
        delay={0.06}
        className="au-display mt-5 text-[clamp(2.1rem,4.8vw,3.6rem)]"
      />
      {copy ? (
        <Reveal delay={0.16}>
          <p
            className={cn(
              "mt-5 text-[17px] leading-[1.6] text-au-ink-2",
              align === "center" && "mx-auto max-w-[620px]"
            )}
          >
            {copy}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   CheckItem — tick list entry.
   ───────────────────────────────────────────────────────────── */

export function CheckItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <li className={cn("flex items-start gap-3", className)}>
      <span
        aria-hidden
        className="mt-[3px] flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-au-teal/12 text-au-teal-deep ring-1 ring-au-teal/25"
      >
        <Check size={13} strokeWidth={2.8} />
      </span>
      <span className="text-[14.5px] leading-relaxed text-au-ink-2">
        {children}
      </span>
    </li>
  );
}

/* ─────────────────────────────────────────────────────────────
   Pill — small labelled chip.
   ───────────────────────────────────────────────────────────── */

export function Pill({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-au-line bg-au-surface px-3.5 py-1.5 text-[12.5px] font-medium text-au-ink-2",
        className
      )}
    >
      {children}
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────
   FaqList — native disclosure accordion, no JS state.
   ───────────────────────────────────────────────────────────── */

export function FaqList({
  items,
  className,
}: {
  items: readonly { q: string; a: string }[];
  className?: string;
}) {
  return (
    <div className={cn("grid gap-3", className)}>
      {items.map((item, i) => (
        <Reveal key={item.q} delay={Math.min(i, 4) * 0.06}>
          <details className="au-plate group rounded-[var(--r-lg)] px-6 py-5 transition-colors duration-300 open:border-au-teal/35 sm:px-8">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-[15.5px] font-semibold text-au-ink [&::-webkit-details-marker]:hidden">
              {item.q}
              <span
                aria-hidden
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-au-line bg-au-surface text-[18px] leading-none text-au-teal-deep transition-transform duration-300 group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="mt-3.5 max-w-[680px] text-[14.5px] leading-relaxed text-au-ink-2">
              {item.a}
            </p>
          </details>
        </Reveal>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Section — consistent gutters and rhythm.
   ───────────────────────────────────────────────────────────── */

export function Section({
  children,
  className,
  id,
  width = "default",
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  width?: "default" | "narrow" | "wide";
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative mx-auto w-full scroll-mt-28 px-5 py-20 sm:px-8 sm:py-28",
        width === "narrow" && "max-w-[900px]",
        width === "default" && "max-w-[1240px]",
        width === "wide" && "max-w-[1440px]",
        className
      )}
    >
      {children}
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   Band — a full-bleed ground: the tinted relief band, or an
   inverted night band. Either can carry the three-colour rule at
   whichever seams it is given.
   ───────────────────────────────────────────────────────────── */

export function Band({
  children,
  tone = "sink",
  rule,
  className,
  id,
}: {
  children: React.ReactNode;
  tone?: "sink" | "night";
  /** Which seams carry the three-colour rule. */
  rule?: "top" | "bottom" | "both";
  className?: string;
  id?: string;
}) {
  return (
    <div
      id={id}
      className={cn(
        "relative scroll-mt-28",
        tone === "night" ? "au-night au-grain overflow-hidden" : "au-band",
        (rule === "top" || rule === "both") && "au-rule-top",
        (rule === "bottom" || rule === "both") && "au-rule-bottom",
        className
      )}
    >
      {tone === "night" ? (
        <div
          aria-hidden
          className="au-wash-night pointer-events-none absolute inset-0"
        />
      ) : null}
      <div className="relative">{children}</div>
    </div>
  );
}
