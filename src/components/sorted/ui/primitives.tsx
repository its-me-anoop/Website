"use client";

import { useId, useState, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal, SplitWords } from "../effects/Motion";

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
  return <p className={cn("s-eyebrow", className)}>{children}</p>;
}

const displaySize = {
  hero: "text-[clamp(2.9rem,7.6vw,7.4rem)]",
  xl: "text-[clamp(2.5rem,6.2vw,5.6rem)]",
  lg: "text-[clamp(2.1rem,4.6vw,4rem)]",
  md: "text-[clamp(1.7rem,3.2vw,2.7rem)]",
  sm: "text-[clamp(1.35rem,2.2vw,1.8rem)]",
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
  /** Turn the words up one at a time (CSS, visible without JavaScript). */
  split?: boolean;
  delay?: number;
  className?: string;
  children: ReactNode;
  id?: string;
}) {
  const Tag = as;
  return (
    <Tag id={id} className={cn("s-display text-s-ink", displaySize[size], className)}>
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
    <Reveal
      turn={0}
      className={cn(align === "center" ? "mx-auto max-w-[860px] text-center" : "max-w-[860px]", className)}
    >
      {eyebrow ? <Eyebrow className="mb-5">{eyebrow}</Eyebrow> : null}
      <Display size={size} id={headingId}>
        {title}
      </Display>
      {copy ? (
        <p
          className={cn(
            "mt-6 text-[17px] leading-[1.6] text-s-ink-soft sm:text-[18px]",
            align === "center" ? "mx-auto max-w-[620px]" : "max-w-[640px]"
          )}
        >
          {copy}
        </p>
      ) : null}
    </Reveal>
  );
}

/* ─────────────────────────────────────────────────────────────
   Buttons: keys with a side that presses down
   ───────────────────────────────────────────────────────────── */

const btnTone = {
  /** The action: flame on most tones, navy on a bright one. */
  primary: "s-key",
  /** A white key, for the second choice. */
  plain: "s-key s-key-plain",
  navy: "s-key s-key-navy",
  outline: "s-key s-key-outline",
  ghost: "s-ul font-semibold text-s-ink",
} as const;

const btnSize = {
  sm: "h-10 px-4 text-[14.5px]",
  md: "h-12 px-5 text-[15.5px]",
  lg: "h-[54px] px-7 text-[17px]",
} as const;

export function ButtonLink({
  children,
  href,
  tone = "primary",
  size = "md",
  className,
  external,
  arrow,
}: {
  children: ReactNode;
  href: string;
  tone?: keyof typeof btnTone;
  size?: keyof typeof btnSize;
  className?: string;
  external?: boolean;
  arrow?: "right" | "up";
}) {
  const classes = cn(
    "group/btn",
    tone === "ghost" ? "inline-flex min-h-11 items-center gap-1.5 text-[15.5px]" : btnSize[size],
    btnTone[tone],
    className
  );
  const content = (
    <>
      <span>{children}</span>
      {arrow === "right" ? (
        <ArrowRight size={17} strokeWidth={2.4} aria-hidden className="transition-transform duration-300 group-hover/btn:translate-x-1" />
      ) : null}
      {arrow === "up" ? (
        <ArrowUpRight
          size={17}
          strokeWidth={2.4}
          aria-hidden
          className="transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5"
        />
      ) : null}
    </>
  );
  return href.startsWith("/") || href.startsWith("#") ? (
    <Link href={href} className={classes}>
      {content}
    </Link>
  ) : (
    <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className={classes}>
      {content}
    </a>
  );
}

/* ─────────────────────────────────────────────────────────────
   Small pieces
   ───────────────────────────────────────────────────────────── */

export function Tag({
  children,
  tone = "plain",
  className,
}: {
  children: ReactNode;
  tone?: "plain" | "action" | "navy" | "sun" | "warn" | "fail";
  className?: string;
}) {
  const tones = {
    plain: "border-[1.5px] border-s-line-2 text-s-ink-soft",
    action: "bg-s-action text-s-action-ink",
    navy: "bg-s-navy text-white",
    sun: "bg-s-sun text-s-navy",
    warn: "border-[1.5px] border-s-warn text-s-warn",
    fail: "border-[1.5px] border-s-fail text-s-fail",
  } as const;
  return (
    <span className={cn("s-label inline-flex items-center rounded-[5px] px-2 py-1 text-[12px] leading-none", tones[tone], className)}>
      {children}
    </span>
  );
}

/** A ticked box: the accent of whatever tone it sits on. */
export function CheckItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <li className={cn("flex items-start gap-3", className)}>
      <span aria-hidden className="mt-[3px] flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[4px] bg-s-accent text-s-bg">
        <Check size={13} strokeWidth={3.4} />
      </span>
      <span className="text-[15.5px] leading-[1.55] text-s-ink">{children}</span>
    </li>
  );
}

export function FaqList({ items, className }: { items: readonly { q: string; a: string }[]; className?: string }) {
  return (
    <div className={cn("border-t-2 border-s-ink", className)}>
      {items.map((item) => (
        <details key={item.q} className="group border-b-[1.5px] border-s-line-2">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-5 py-5 text-[17px] font-semibold leading-snug text-s-ink sm:text-[18.5px] [&::-webkit-details-marker]:hidden">
            <span className="min-w-0 flex-1 text-left">{item.q}</span>
            <span
              aria-hidden
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[7px] border-2 border-s-ink text-s-ink transition-[transform,background-color,color] duration-500 group-open:rotate-[135deg] group-open:bg-s-ink group-open:text-s-bg"
            >
              <Plus size={16} strokeWidth={2.6} />
            </span>
          </summary>
          <p className="max-w-[700px] pb-6 text-[16px] leading-[1.65] text-s-ink-soft">{item.a}</p>
        </details>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   AuditBar: paste a web address, press the key, and the instant
   audit runs at /audit?url=…. A plain GET form, so it works before
   hydration and the report address is shareable. The field is always
   a white slot with navy type, whatever tone it sits on.
   ───────────────────────────────────────────────────────────── */

export function AuditBar({
  className,
  label = "Your website address",
  placeholder = "yourpractice.nhs.uk",
  hint = "Paste your address for an instant, free report on accessibility, speed, search and more. No sign-up needed.",
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
      <div className="flex items-center gap-2 rounded-[12px] border-2 border-s-navy bg-white p-1.5 pl-4 shadow-[0_5px_0_0_var(--s-navy)] has-[input:focus-visible]:shadow-[0_0_0_3px_var(--s-navy),0_0_0_8px_var(--s-sun)]">
        <span aria-hidden className="hidden text-[14px] font-semibold text-[#596080] sm:inline">
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
          className="min-w-0 flex-1 rounded-[6px] bg-transparent py-2.5 text-[16.5px] font-medium text-s-navy placeholder:font-normal placeholder:text-[#596080] focus-visible:!shadow-none focus-visible:!outline-none"
        />
        <button
          type="submit"
          className="s-key h-11 shrink-0 px-4 text-[15px] [--key-depth:0px] [--key-face:var(--s-flame)] [--key-ink:var(--s-navy)] hover:!translate-y-0 hover:bg-[#ff7440] sm:px-5"
          aria-label="Run the free website audit"
        >
          <span aria-hidden className="hidden sm:inline">
            Audit
          </span>
          <ArrowRight size={18} strokeWidth={2.6} aria-hidden />
        </button>
      </div>
      <p id={`${id}-hint`} className={cn("mt-4 text-[14px] leading-snug text-s-muted", align === "center" && "text-center")}>
        {hint}
      </p>
    </form>
  );
}
