"use client";

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Eyebrow, Magnetic, Reveal, TextReveal, type Segment } from "@/components/fx";

/* Re-exported so pages can pull the whole Aurora vocabulary from one
   place rather than reaching into the effects kit for a label. */
export { Eyebrow };

/* ─────────────────────────────────────────────────────────────
   Btn — one pill in five finishes.
   The primary finish carries a light sweep on hover and a magnetic
   lean; both are decoration over an ordinary link, so keyboard users
   get exactly the same target.
   ───────────────────────────────────────────────────────────── */

const tones = {
  primary:
    "bg-au-teal text-au-teal-ink shadow-[0_16px_44px_-16px_rgba(47,216,173,0.75)] hover:bg-au-aqua",
  glass:
    "au-glass text-au-ink hover:border-white/25 hover:text-white",
  outline:
    "border border-au-line-2 bg-transparent text-au-ink hover:border-au-teal hover:text-au-teal",
  day: "bg-au-teal-deep text-white shadow-[0_16px_40px_-18px_rgba(14,122,99,0.9)] hover:bg-[#0c6a56]",
  dayOutline:
    "border border-au-day-line bg-white/70 text-au-day-ink hover:border-au-teal-deep hover:text-au-teal-deep",
  ghost: "text-au-accent hover:text-au-aqua",
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
    "group/btn relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full text-[14.5px] font-medium transition-[background-color,border-color,color,box-shadow] duration-300",
    !isGhost && "px-6 py-3",
    tones[tone],
    className
  );

  const content = (
    <>
      {/* Light sweep — only drawn on filled finishes. */}
      {tone === "primary" || tone === "day" ? (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 -left-full w-1/2 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.55),transparent)] transition-transform duration-700 ease-out group-hover/btn:translate-x-[320%]"
        />
      ) : null}
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
   SectionHead — the recurring opener.
   ───────────────────────────────────────────────────────────── */

export function SectionHead({
  eyebrow,
  title,
  copy,
  align = "center",
  tone = "dark",
  className,
}: {
  eyebrow: string;
  title: readonly Segment[];
  copy?: string;
  align?: "center" | "left";
  tone?: "dark" | "day";
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
        <Eyebrow
          tone={tone === "day" ? "day" : "accent"}
          className={align === "center" ? "justify-center" : ""}
        >
          {eyebrow}
        </Eyebrow>
      </Reveal>
      <TextReveal
        as="h2"
        segments={
          tone === "day"
            ? title.map((segment) => ({ ...segment, tone: segment.tone ?? "day" }))
            : title
        }
        delay={0.06}
        className={cn(
          "mt-5 text-[clamp(2rem,5vw,3.4rem)] font-medium leading-[1.06] tracking-[-0.035em]",
          tone === "day" ? "text-au-day-ink" : "text-au-ink"
        )}
      />
      {copy ? (
        <Reveal delay={0.16}>
          <p
            className={cn(
              "mt-5 text-[16.5px] leading-relaxed",
              tone === "day" ? "text-au-day-soft" : "text-au-ink-2",
              align === "center" && "mx-auto max-w-[600px]"
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
  tone = "dark",
  className,
}: {
  children: React.ReactNode;
  tone?: "dark" | "day";
  className?: string;
}) {
  return (
    <li className={cn("flex items-start gap-3", className)}>
      <span
        aria-hidden
        className={cn(
          "mt-[3px] flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full",
          tone === "day"
            ? "bg-au-teal-deep/12 text-au-teal-deep"
            : "bg-au-teal/14 text-au-teal ring-1 ring-au-teal/25"
        )}
      >
        <Check size={13} strokeWidth={2.8} />
      </span>
      <span
        className={cn(
          "text-[14.5px] leading-relaxed",
          tone === "day" ? "text-au-day-soft" : "text-au-ink-2"
        )}
      >
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
  tone = "dark",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "dark" | "day";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[12.5px] font-medium",
        tone === "day"
          ? "bg-au-day-ink/6 text-au-day-soft"
          : "border border-white/10 bg-white/[0.045] text-au-ink-2",
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
          <details className="au-glass group rounded-[22px] px-6 py-5 transition-colors duration-300 open:border-au-teal/25 sm:px-8">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-[15.5px] font-medium text-au-ink [&::-webkit-details-marker]:hidden">
              {item.q}
              <span
                aria-hidden
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[18px] leading-none text-au-teal transition-transform duration-300 group-open:rotate-45"
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
   SectionShell — consistent gutters and rhythm.
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
