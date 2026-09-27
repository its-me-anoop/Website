"use client";

import { useId, useState, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Check, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Magnetic, Reveal, SplitWords } from "../effects/Motion";

/* ─────────────────────────────────────────────────────────────
   Layout
   ───────────────────────────────────────────────────────────── */

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-[1320px] px-5 sm:px-8", className)}>{children}</div>;
}

/* ─────────────────────────────────────────────────────────────
   Type
   ───────────────────────────────────────────────────────────── */

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("a-eyebrow", className)}>{children}</p>;
}

const displaySize = {
  hero: "text-[clamp(3rem,7.4vw,8rem)]",
  xl: "text-[clamp(2.6rem,7.4vw,6.4rem)]",
  lg: "text-[clamp(2.2rem,5.4vw,4.6rem)]",
  md: "text-[clamp(1.8rem,3.8vw,3.1rem)]",
  sm: "text-[clamp(1.4rem,2.6vw,2rem)]",
} as const;

export function Display({
  as = "h2",
  size = "lg",
  split,
  delay,
  className,
  children,
  id,
}: {
  as?: "h1" | "h2" | "h3" | "p";
  size?: keyof typeof displaySize;
  /** Animate word by word (CSS, visible without JavaScript). */
  split?: boolean;
  delay?: number;
  className?: string;
  children: ReactNode;
  id?: string;
}) {
  const Tag = as;
  return (
    <Tag id={id} className={cn("a-display text-a-ink", displaySize[size], className)}>
      {split ? <SplitWords delay={delay}>{children}</SplitWords> : children}
    </Tag>
  );
}

export function SectionIntro({
  eyebrow,
  title,
  copy,
  align = "left",
  size = "lg",
  className,
  headingId,
}: {
  eyebrow?: string;
  title: ReactNode;
  copy?: ReactNode;
  align?: "left" | "center";
  size?: keyof typeof displaySize;
  className?: string;
  headingId?: string;
}) {
  return (
    <Reveal className={cn(align === "center" ? "mx-auto max-w-[860px] text-center" : "max-w-[820px]", className)}>
      {eyebrow ? <Eyebrow className="mb-6">{eyebrow}</Eyebrow> : null}
      <Display size={size} id={headingId}>
        {title}
      </Display>
      {copy ? (
        <p
          className={cn(
            "mt-6 text-[17px] leading-[1.65] text-a-ink-soft sm:text-[18px]",
            align === "center" ? "mx-auto max-w-[600px]" : "max-w-[620px]"
          )}
        >
          {copy}
        </p>
      ) : null}
    </Reveal>
  );
}

/* ─────────────────────────────────────────────────────────────
   Buttons
   ───────────────────────────────────────────────────────────── */

const btnTone = {
  primary:
    "a-shine bg-a-amber text-a-void shadow-[0_0_0_1px_rgba(255,176,32,0.4),0_18px_50px_-18px_rgba(255,176,32,0.65)] hover:bg-a-amber-hover",
  glass: "a-glass text-a-ink hover:bg-white/10",
  outline: "border border-a-line-2 text-a-ink hover:border-a-ink/60 hover:bg-white/5",
  ghost: "text-a-ink underline decoration-a-line-2 underline-offset-[6px] hover:decoration-a-amber",
} as const;

const btnSize = {
  sm: "h-10 px-4 text-[14px]",
  md: "h-12 px-6 text-[15px]",
  lg: "h-14 px-7 text-[16px]",
} as const;

export function ButtonLink({
  children,
  href,
  tone = "primary",
  size = "md",
  className,
  external,
  arrow,
  magnetic,
}: {
  children: ReactNode;
  href: string;
  tone?: keyof typeof btnTone;
  size?: keyof typeof btnSize;
  className?: string;
  external?: boolean;
  arrow?: "right" | "up";
  magnetic?: boolean;
}) {
  const classes = cn(
    "group/btn inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-[-0.01em] transition-[background-color,border-color,color,box-shadow,transform] duration-300",
    tone !== "ghost" && btnSize[size],
    btnTone[tone],
    className
  );
  const content = (
    <>
      <span className="relative">{children}</span>
      {arrow === "right" ? (
        <ArrowRight size={16} aria-hidden className="relative transition-transform duration-300 group-hover/btn:translate-x-0.5" />
      ) : null}
      {arrow === "up" ? (
        <ArrowUpRight
          size={16}
          aria-hidden
          className="relative transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5"
        />
      ) : null}
    </>
  );

  const link = href.startsWith("/") ? (
    <Link href={href} className={classes}>
      {content}
    </Link>
  ) : (
    <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className={classes}>
      {content}
    </a>
  );

  return magnetic ? <Magnetic>{link}</Magnetic> : link;
}

/* ─────────────────────────────────────────────────────────────
   Small pieces
   ───────────────────────────────────────────────────────────── */

export function Tag({
  children,
  tone = "glass",
  className,
}: {
  children: ReactNode;
  tone?: "glass" | "amber" | "grad" | "warn" | "fail";
  className?: string;
}) {
  const tones = {
    glass: "border border-a-line-2 bg-white/5 text-a-ink-soft",
    amber: "bg-a-amber text-a-void",
    grad: "text-a-void [background:var(--a-grad)]",
    warn: "bg-a-warn/10 text-a-warn ring-1 ring-a-warn/30",
    fail: "bg-a-fail/10 text-a-fail ring-1 ring-a-fail/30",
  } as const;
  return (
    <span
      className={cn(
        "a-mono inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium uppercase leading-none tracking-[0.1em]",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}

export function CheckItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <li className={cn("flex items-start gap-3", className)}>
      <span
        aria-hidden
        className="mt-[3px] flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-a-amber/15 text-a-amber ring-1 ring-a-amber/30"
      >
        <Check size={11} strokeWidth={3} />
      </span>
      <span className="text-[15px] leading-[1.6] text-a-ink">{children}</span>
    </li>
  );
}

export function FaqList({ items, className }: { items: readonly { q: string; a: string }[]; className?: string }) {
  return (
    <div className={cn("grid gap-3", className)}>
      {items.map((item) => (
        <details key={item.q} className="a-glass a-spot group rounded-[20px] px-6 py-5 open:bg-white/[0.06]">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-5 text-[16px] font-medium text-a-ink sm:text-[17px] [&::-webkit-details-marker]:hidden">
            <span className="min-w-0 flex-1 text-left">{item.q}</span>
            <span
              aria-hidden
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-a-line-2 text-a-ink-soft transition-[transform,background-color,color] duration-500 group-open:rotate-[135deg] group-open:bg-a-amber group-open:text-a-void"
            >
              <Plus size={14} />
            </span>
          </summary>
          <p className="mt-4 max-w-[680px] text-[15.5px] leading-[1.65] text-a-ink-soft">{item.a}</p>
        </details>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   AuditBar: paste a web address, press the arrow, and the instant
   audit runs at /audit?url=…. A plain GET form, so it works before
   hydration and the report address is shareable.
   ───────────────────────────────────────────────────────────── */

export function AuditBar({
  className,
  label = "Your website address",
  placeholder = "yourpractice.nhs.uk",
  hint = "Paste your address for an instant, free report on accessibility, speed, search and more. Nothing is stored.",
  defaultValue = "",
  autoFocus,
  align = "left",
}: {
  className?: string;
  label?: string;
  placeholder?: string;
  hint?: string;
  defaultValue?: string;
  autoFocus?: boolean;
  align?: "left" | "center";
}) {
  const [value, setValue] = useState(defaultValue);
  const id = useId();

  function submit(e: FormEvent) {
    if (!value.trim()) {
      e.preventDefault();
      document.getElementById(id)?.focus();
    }
  }

  return (
    <form
      action="/audit"
      method="get"
      onSubmit={submit}
      className={cn("w-full max-w-[600px]", className)}
      aria-describedby={`${id}-hint`}
    >
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <div className="a-field-ring rounded-full">
        <div className="flex items-center gap-2 rounded-full bg-a-void/90 p-1.5 pl-5 backdrop-blur-xl">
          <span aria-hidden className="a-mono hidden text-[13px] text-a-muted sm:inline">
            https://
          </span>
          <input
            id={id}
            name="url"
            type="text"
            inputMode="url"
            autoComplete="url"
            autoCapitalize="none"
            spellCheck={false}
            autoFocus={autoFocus}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={placeholder}
            className="min-w-0 flex-1 bg-transparent py-3 text-[16px] text-a-ink placeholder:text-a-muted"
          />
          <button
            type="submit"
            className="a-shine flex h-11 shrink-0 items-center gap-2 rounded-full bg-a-amber px-4 text-[14.5px] font-medium text-a-void transition-colors hover:bg-a-amber-hover sm:px-5"
            aria-label="Run the free website audit"
          >
            <span aria-hidden className="hidden sm:inline">
              Audit
            </span>
            <ArrowRight size={17} aria-hidden />
          </button>
        </div>
      </div>
      <p
        id={`${id}-hint`}
        className={cn("mt-3.5 text-[13.5px] leading-snug text-a-muted", align === "center" && "text-center")}
      >
        {hint}
      </p>
    </form>
  );
}

/* ─────────────────────────────────────────────────────────────
   BrowserFrame: glass chrome around a screenshot.
   ───────────────────────────────────────────────────────────── */

export function BrowserFrame({
  src,
  alt,
  url,
  priority,
  loading,
  className,
  sizes = "(min-width: 1024px) 760px, 92vw",
}: {
  src: string;
  alt: string;
  url: string;
  priority?: boolean;
  loading?: "eager" | "lazy";
  className?: string;
  sizes?: string;
}) {
  return (
    <figure
      className={cn(
        "a-glass overflow-hidden rounded-[18px] p-1.5 shadow-[0_60px_120px_-50px_rgba(232,64,31,0.45)] sm:rounded-[22px] sm:p-2",
        className
      )}
    >
      {/* inline-size containment: a long URL truncates instead of setting
          the frame's minimum width and pushing a grid column off screen. */}
      <div className="flex items-center gap-2 px-2 pb-2 pt-1 [contain:inline-size]">
        <span className="flex gap-1.5" aria-hidden>
          <span className="h-2 w-2 rounded-full bg-[#ff5f57]/80" />
          <span className="h-2 w-2 rounded-full bg-[#febc2e]/80" />
          <span className="h-2 w-2 rounded-full bg-[#28c840]/80" />
        </span>
        <span className="a-mono mx-auto min-w-0 truncate rounded-full bg-white/5 px-3 py-1 text-[11px] text-a-muted">{url}</span>
        <span className="w-10" aria-hidden />
      </div>
      <div className="relative aspect-[1440/1000] overflow-hidden rounded-[12px] bg-a-deep sm:rounded-[16px]">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          loading={loading}
          sizes={sizes}
          className="object-cover object-top"
        />
      </div>
    </figure>
  );
}
