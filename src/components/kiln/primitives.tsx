"use client";

import { useId, useState, type FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { m, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/** Shared ease-out for entrances: soft, slightly overdamped. */
export const EASE = [0.16, 1, 0.3, 1] as const;

/* ─────────────────────────────────────────────────────────────
   Rise: soft rise-in wrapper for blocks. Static under reduced
   motion.
   ───────────────────────────────────────────────────────────── */

export function Rise({
  children,
  className,
  delay = 0,
  y = 22,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "li" | "article" | "figure";
}) {
  const reduce = useReducedMotion();
  const Tag = m[as] as typeof m.div;
  return (
    <Tag
      className={className}
      initial={reduce ? false : { y, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.75, ease: EASE, delay }}
    >
      {children}
    </Tag>
  );
}

/* ─────────────────────────────────────────────────────────────
   Eyebrow and Display: the recurring section opener. Display
   renders Zodiak; `em` inside the title becomes italic.
   ───────────────────────────────────────────────────────────── */

export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <p className={cn("k-eyebrow", className)}>{children}</p>;
}

const displaySize = {
  xl: "text-[clamp(2.35rem,8vw,5.6rem)]",
  lg: "text-[clamp(1.95rem,5.2vw,4rem)]",
  md: "text-[clamp(1.65rem,3.8vw,2.9rem)]",
  sm: "text-[clamp(1.4rem,2.8vw,2.1rem)]",
} as const;

export function Display({
  as = "h2",
  size = "lg",
  className,
  children,
  id,
}: {
  as?: "h1" | "h2" | "h3" | "p";
  size?: keyof typeof displaySize;
  className?: string;
  children: React.ReactNode;
  id?: string;
}) {
  const Tag = as;
  return (
    <Tag id={id} className={cn("k-display", displaySize[size], className)}>
      {children}
    </Tag>
  );
}

export function SectionHead({
  eyebrow,
  title,
  copy,
  align = "center",
  size = "lg",
  onCoal,
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  copy?: string;
  align?: "center" | "left";
  size?: keyof typeof displaySize;
  onCoal?: boolean;
  className?: string;
}) {
  return (
    <Rise
      className={cn(
        align === "center" ? "mx-auto max-w-[760px] text-center" : "max-w-[720px]",
        className
      )}
    >
      {eyebrow ? (
        <Eyebrow className={cn("mb-5", onCoal ? "text-k-coal-soft" : "text-k-muted")}>
          {eyebrow}
        </Eyebrow>
      ) : null}
      <Display size={size} className={onCoal ? "text-k-coal-ink" : "text-k-ink"}>
        {title}
      </Display>
      {copy ? (
        <p
          className={cn(
            "mt-5 text-[17px] leading-[1.6]",
            onCoal ? "text-k-coal-soft" : "text-k-ink-soft",
            align === "center" && "mx-auto max-w-[560px]"
          )}
        >
          {copy}
        </p>
      ) : null}
    </Rise>
  );
}

/* ─────────────────────────────────────────────────────────────
   Buttons: compact rounded actions in the Melius mould. Fire is
   the primary, butter the quiet second, coal / bone the neutrals.
   ───────────────────────────────────────────────────────────── */

const btnTone = {
  fire: "bg-k-fire text-k-bone hover:bg-k-fire-hover",
  butter: "bg-k-butter text-k-ink hover:bg-[#ead977]",
  coal: "bg-k-coal text-k-coal-ink hover:bg-k-coal-3",
  bone: "bg-k-bone text-k-ink hover:bg-white",
  outline:
    "border border-k-line-2 bg-transparent text-k-ink hover:border-k-ink hover:bg-k-paper",
  "outline-coal":
    "border border-k-coal-line bg-transparent text-k-coal-ink hover:border-k-coal-soft hover:bg-k-coal-2",
  ghost: "text-k-fire underline-offset-4 hover:underline",
} as const;

const btnSize = {
  sm: "px-3.5 py-2 text-[13px]",
  md: "px-5 py-2.5 text-[14.5px]",
  lg: "px-6 py-3.5 text-[15.5px]",
} as const;

export function BtnLink({
  children,
  href,
  tone = "fire",
  size = "md",
  className,
  external,
  arrow,
}: {
  children: React.ReactNode;
  href: string;
  tone?: keyof typeof btnTone;
  size?: keyof typeof btnSize;
  className?: string;
  external?: boolean;
  arrow?: "right" | "up";
}) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-[10px] font-medium transition-[background-color,border-color,color] duration-200",
    btnTone[tone],
    btnSize[size],
    className
  );
  const content = (
    <>
      {children}
      {arrow === "right" ? <ArrowRight size={15} aria-hidden /> : null}
      {arrow === "up" ? <ArrowUpRight size={15} aria-hidden /> : null}
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
   Tag: small filled label (Melius "Per month" / "Save 15%").
   ───────────────────────────────────────────────────────────── */

export function Tag({
  children,
  tone = "bone",
  className,
}: {
  children: React.ReactNode;
  tone?: "bone" | "butter" | "fire" | "coal";
  className?: string;
}) {
  const tones = {
    bone: "bg-k-bone-2 text-k-ink-soft",
    butter: "bg-k-butter text-k-ink",
    fire: "bg-k-fire text-k-bone",
    coal: "bg-k-coal text-k-coal-ink",
  } as const;
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[6px] px-2 py-1 text-[11px] font-medium leading-none",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────
   CheckItem: tick list entry used across sectors and packages.
   ───────────────────────────────────────────────────────────── */

export function CheckItem({
  children,
  onCoal,
  className,
}: {
  children: React.ReactNode;
  onCoal?: boolean;
  className?: string;
}) {
  return (
    <li className={cn("flex items-start gap-3", className)}>
      <Check
        size={15}
        strokeWidth={2.4}
        aria-hidden
        className={cn("mt-[5px] shrink-0", onCoal ? "text-k-fire-lite" : "text-k-fire")}
      />
      <span
        className={cn(
          "text-[15px] leading-[1.55]",
          onCoal ? "text-k-coal-ink" : "text-k-ink"
        )}
      >
        {children}
      </span>
    </li>
  );
}

/* ─────────────────────────────────────────────────────────────
   FaqList: accessible native disclosure list, hairline rows.
   ───────────────────────────────────────────────────────────── */

export function FaqList({
  items,
  onCoal,
  className,
}: {
  items: readonly { q: string; a: string }[];
  onCoal?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "divide-y border-y",
        onCoal ? "divide-k-coal-line border-k-coal-line" : "divide-k-line border-k-line",
        className
      )}
    >
      {items.map((item) => (
        <details key={item.q} className="group py-5">
          <summary
            className={cn(
              "flex cursor-pointer list-none items-start justify-between gap-4 text-[16px] font-medium sm:gap-6 sm:text-[17px] [&::-webkit-details-marker]:hidden",
              onCoal ? "text-k-coal-ink" : "text-k-ink"
            )}
          >
            <span className="min-w-0 flex-1 text-left">{item.q}</span>
            <span
              aria-hidden
              className={cn(
                "relative mt-0.5 h-5 w-5 shrink-0 transition-transform duration-300 ease-out group-open:rotate-45",
                onCoal ? "text-k-coal-soft" : "text-k-muted"
              )}
            >
              <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-current" />
              <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current" />
            </span>
          </summary>
          <p
            className={cn(
              "mt-3 max-w-[640px] text-[15.5px] leading-[1.6]",
              onCoal ? "text-k-coal-soft" : "text-k-ink-soft"
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
   AuditBar: the site's version of the Melius prompt bar. Type a
   web address, submit, and a prefilled audit request opens in the
   visitor's mail client. No backend, nothing stored.
   ───────────────────────────────────────────────────────────── */

export function auditMailto(url?: string) {
  const body = [
    "Hi Anoop,",
    "",
    "Please audit our website.",
    "",
    `Website address: ${url ?? ""}`,
    "Organisation (GP practice / care home / other): ",
    "Anything you'd like the audit to focus on: ",
    "",
    "Thanks,",
  ].join("\n");
  return `mailto:${site.email}?subject=${encodeURIComponent(
    "Free website audit request"
  )}&body=${encodeURIComponent(body)}`;
}

export function AuditBar({
  onCoal,
  className,
  label = "Your website address",
  placeholder = "yourpractice.nhs.uk",
  hint = "Paste your address for a free written audit. No forms, no obligation.",
}: {
  onCoal?: boolean;
  className?: string;
  label?: string;
  placeholder?: string;
  hint?: string;
}) {
  const [value, setValue] = useState("");
  const id = useId();

  function submit(e: FormEvent) {
    e.preventDefault();
    const trimmed = value.trim();
    window.location.href = auditMailto(trimmed || undefined);
  }

  return (
    <form
      onSubmit={submit}
      className={cn("w-full max-w-[560px]", className)}
      aria-describedby={`${id}-hint`}
    >
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <div
        className={cn(
          "flex items-center gap-2 rounded-[14px] p-1.5 pl-4 shadow-[0_24px_60px_-30px_rgba(23,20,15,0.55)]",
          onCoal ? "bg-k-coal-2 ring-1 ring-k-coal-line" : "bg-k-coal"
        )}
      >
        <span aria-hidden className="text-k-coal-soft">
          <Image src="/flutterly-logo.png" alt="" width={20} height={20} className="opacity-90" />
        </span>
        <input
          id={id}
          type="text"
          inputMode="url"
          autoComplete="url"
          spellCheck={false}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className="min-w-0 flex-1 bg-transparent py-2.5 text-[16px] text-k-coal-ink placeholder:text-k-coal-soft/80 focus:outline-none"
        />
        <button
          type="submit"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-k-fire text-k-bone transition-colors hover:bg-k-fire-hover"
          aria-label="Request a free website audit"
        >
          <ArrowRight size={17} aria-hidden />
        </button>
      </div>
      <p
        id={`${id}-hint`}
        className={cn(
          "mt-3 text-[13.5px] leading-snug",
          onCoal ? "text-k-coal-soft" : "text-k-muted"
        )}
      >
        {hint}
      </p>
    </form>
  );
}

/* ─────────────────────────────────────────────────────────────
   BrowserFrame: coal chrome around a screenshot, with the sample
   site's address in a pill. Used by the showcase and sector pages.
   ───────────────────────────────────────────────────────────── */

export function BrowserFrame({
  src,
  alt,
  url,
  priority,
  className,
  sizes = "(min-width: 1024px) 720px, 92vw",
}: {
  src: string;
  alt: string;
  url: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
}) {
  return (
    <figure
      className={cn(
        "overflow-hidden rounded-[14px] bg-k-coal p-1.5 shadow-[0_40px_90px_-40px_rgba(23,20,15,0.6)] sm:rounded-[18px] sm:p-2",
        className
      )}
    >
      <div className="flex items-center gap-2 px-1.5 pb-1.5 pt-0.5 sm:px-2 sm:pb-2 sm:pt-1">
        <span className="flex gap-1.5" aria-hidden>
          <span className="h-1.5 w-1.5 rounded-full bg-k-coal-soft/40 sm:h-2 sm:w-2" />
          <span className="h-1.5 w-1.5 rounded-full bg-k-coal-soft/40 sm:h-2 sm:w-2" />
          <span className="h-1.5 w-1.5 rounded-full bg-k-coal-soft/40 sm:h-2 sm:w-2" />
        </span>
        <span className="ml-1 truncate rounded-[6px] bg-k-coal-2 px-2 py-0.5 text-[10.5px] text-k-coal-soft sm:px-2.5 sm:py-1 sm:text-[11.5px]">
          {url}
        </span>
      </div>
      <div className="relative aspect-[1440/1000] overflow-hidden rounded-[10px] bg-k-bone sm:rounded-[12px]">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover object-top"
        />
      </div>
    </figure>
  );
}
