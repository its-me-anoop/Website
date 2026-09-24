"use client";

import { useId, useState, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Check, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "../effects/Motion";

/* ─────────────────────────────────────────────────────────────
   Layout
   ───────────────────────────────────────────────────────────── */

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-[1320px] px-5 sm:px-8", className)}>{children}</div>;
}

/* ─────────────────────────────────────────────────────────────
   Type
   ───────────────────────────────────────────────────────────── */

export function Label({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("s-label", className)}>{children}</p>;
}

const displaySize = {
  hero: "text-[clamp(3rem,8.4vw,8.4rem)]",
  xl: "text-[clamp(2.6rem,6.6vw,6rem)]",
  lg: "text-[clamp(2.2rem,5vw,4.4rem)]",
  md: "text-[clamp(1.8rem,3.6vw,3rem)]",
  sm: "text-[clamp(1.4rem,2.4vw,1.9rem)]",
} as const;

export function Display({
  as = "h2",
  size = "lg",
  rise,
  className,
  children,
  id,
}: {
  as?: "h1" | "h2" | "h3" | "p";
  size?: keyof typeof displaySize;
  /** Lift the heading out of a clipped box on load (CSS, no JS needed). */
  rise?: boolean;
  className?: string;
  children: ReactNode;
  id?: string;
}) {
  const Tag = as;
  return (
    <Tag id={id} className={cn("s-display", displaySize[size], rise && "s-lines", className)}>
      {rise ? (
        <span className="s-line">
          <span>{children}</span>
        </span>
      ) : (
        children
      )}
    </Tag>
  );
}

export function SectionIntro({
  label,
  title,
  copy,
  align = "left",
  size = "lg",
  onPaper,
  className,
  headingId,
}: {
  label?: string;
  title: ReactNode;
  copy?: ReactNode;
  align?: "left" | "center";
  size?: keyof typeof displaySize;
  onPaper?: boolean;
  className?: string;
  headingId?: string;
}) {
  return (
    <Reveal className={cn(align === "center" ? "mx-auto max-w-[860px] text-center" : "max-w-[860px]", className)}>
      {label ? <Label className={cn("mb-5", onPaper ? "text-s-on-paper-2" : "text-s-on-ink-2")}>{label}</Label> : null}
      <Display size={size} id={headingId}>
        {title}
      </Display>
      {copy ? (
        <p
          className={cn(
            "mt-6 text-[18px] leading-[1.6]",
            onPaper ? "text-s-on-paper-2" : "text-s-on-ink-2",
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
   Buttons
   ───────────────────────────────────────────────────────────── */

const btnTone = {
  /** The one filled action: signal yellow, ink text. */
  signal: "bg-s-signal text-s-ink hover:bg-s-signal-hover",
  /** Hairline on ink. */
  outline: "border border-s-line-2 text-s-on-ink hover:border-s-on-ink",
  /** Solid ink, for use on paper and yellow. */
  ink: "bg-s-ink text-s-on-ink hover:bg-s-ink-2",
  /** Hairline on paper. */
  "outline-paper": "border border-s-on-paper/30 text-s-on-paper hover:border-s-on-paper",
  link: "underline decoration-1 underline-offset-[6px] hover:decoration-s-signal hover:decoration-2",
} as const;

const btnSize = {
  sm: "h-10 px-4 text-[15px]",
  md: "h-12 px-5 text-[16px]",
  lg: "h-14 px-7 text-[17px]",
} as const;

export function ButtonLink({
  children,
  href,
  tone = "signal",
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
    "group/btn inline-flex items-center justify-center gap-2 font-semibold transition-colors duration-200",
    tone !== "link" && cn("rounded-[4px]", btnSize[size]),
    btnTone[tone],
    className
  );
  const content = (
    <>
      <span>{children}</span>
      {arrow === "right" ? (
        <ArrowRight size={17} aria-hidden className="transition-transform duration-200 group-hover/btn:translate-x-0.5" />
      ) : null}
      {arrow === "up" ? (
        <ArrowUpRight
          size={17}
          aria-hidden
          className="transition-transform duration-200 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5"
        />
      ) : null}
    </>
  );

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }
  return (
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
  tone = "line",
  className,
}: {
  children: ReactNode;
  tone?: "line" | "signal" | "warn" | "fail";
  className?: string;
}) {
  const tones = {
    line: "border border-s-line-2 text-s-on-ink-2",
    signal: "bg-s-signal text-s-ink",
    warn: "border border-s-warn/50 text-s-warn",
    fail: "border border-s-fail/50 text-s-fail",
  } as const;
  return (
    <span
      className={cn(
        "s-label inline-flex items-center rounded-[3px] px-2 py-1 text-[11.5px] leading-none",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}

export function CheckItem({
  children,
  onPaper,
  className,
}: {
  children: ReactNode;
  onPaper?: boolean;
  className?: string;
}) {
  return (
    <li className={cn("flex items-start gap-3", className)}>
      <Check
        size={17}
        strokeWidth={2.6}
        aria-hidden
        className={cn("mt-[4px] shrink-0", onPaper ? "text-s-on-paper" : "text-s-signal")}
      />
      <span className={cn("text-[16px] leading-[1.55]", onPaper ? "text-s-on-paper" : "text-s-on-ink")}>
        {children}
      </span>
    </li>
  );
}

export function FaqList({
  items,
  onPaper,
  className,
}: {
  items: readonly { q: string; a: string }[];
  onPaper?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "divide-y border-y",
        onPaper ? "divide-s-line-paper border-s-line-paper" : "divide-s-line border-s-line",
        className
      )}
    >
      {items.map((item) => (
        <details key={item.q} className="group py-6">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-[18px] font-semibold [&::-webkit-details-marker]:hidden">
            <span className="min-w-0 flex-1 text-left">{item.q}</span>
            <Plus
              size={22}
              aria-hidden
              className="mt-0.5 shrink-0 transition-transform duration-300 group-open:rotate-45"
            />
          </summary>
          <p
            className={cn(
              "mt-4 max-w-[680px] text-[17px] leading-[1.65]",
              onPaper ? "text-s-on-paper-2" : "text-s-on-ink-2"
            )}
          >
            {item.a}
          </p>
        </details>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   AuditBar: paste a web address, press the button, and the instant
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
  onPaper,
}: {
  className?: string;
  label?: string;
  placeholder?: string;
  hint?: string;
  defaultValue?: string;
  autoFocus?: boolean;
  align?: "left" | "center";
  onPaper?: boolean;
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
      className={cn("w-full max-w-[620px]", className)}
      aria-describedby={`${id}-hint`}
    >
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <div
        className={cn(
          "flex items-stretch rounded-[4px] border-2 focus-within:outline focus-within:outline-3 focus-within:outline-offset-2 focus-within:outline-s-signal",
          onPaper ? "border-s-on-paper bg-white" : "border-s-on-ink bg-s-ink"
        )}
      >
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
          className={cn(
            "min-w-0 flex-1 bg-transparent px-4 py-3.5 text-[17px] focus:outline-none",
            onPaper ? "text-s-on-paper placeholder:text-s-on-paper-2" : "text-s-on-ink placeholder:text-s-on-ink-2"
          )}
        />
        <button
          type="submit"
          className="flex shrink-0 items-center gap-2 bg-s-signal px-5 text-[16px] font-semibold text-s-ink transition-colors hover:bg-s-signal-hover"
          aria-label="Run the free website audit"
        >
          <span aria-hidden className="hidden sm:inline">
            Audit my site
          </span>
          <ArrowRight size={18} aria-hidden />
        </button>
      </div>
      <p
        id={`${id}-hint`}
        className={cn(
          "mt-3 text-[14.5px] leading-snug",
          onPaper ? "text-s-on-paper-2" : "text-s-on-ink-2",
          align === "center" && "text-center"
        )}
      >
        {hint}
      </p>
    </form>
  );
}

/* ─────────────────────────────────────────────────────────────
   Screenshot: a plain framed image with its address as a caption.
   ───────────────────────────────────────────────────────────── */

export function Screenshot({
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
  url?: string;
  priority?: boolean;
  loading?: "eager" | "lazy";
  className?: string;
  sizes?: string;
}) {
  return (
    <figure className={className}>
      <div className="relative aspect-[1440/1000] overflow-hidden rounded-[4px] border border-s-line bg-s-ink-2">
        <Image src={src} alt={alt} fill priority={priority} loading={loading} sizes={sizes} className="object-cover object-top" />
      </div>
      {url ? <figcaption className="mt-3 text-[14px] text-s-on-ink-2">{url}</figcaption> : null}
    </figure>
  );
}
