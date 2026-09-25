import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { SignArrow, type ArrowDir } from "./Arrow";

export type ButtonTone = "sign" | "ink" | "outline" | "text";
export type ButtonSize = "sm" | "md";

const toneClass: Record<Exclude<ButtonTone, "text">, string> = {
  sign: "wf-btn--sign",
  ink: "wf-btn--ink",
  outline: "wf-btn--outline",
};

function buttonClass(tone: ButtonTone, size: ButtonSize, className?: string) {
  if (tone === "text") {
    return cn(
      "wf-link group/tl inline-flex items-center gap-2 font-bold text-current",
      size === "sm" ? "text-[15px]" : "text-[16px]",
      className
    );
  }
  return cn("wf-btn", toneClass[tone], size === "sm" && "wf-btn--sm", className);
}

function ButtonContent({
  children,
  tone,
  arrow,
  size,
  external,
}: {
  children: ReactNode;
  tone: ButtonTone;
  arrow: ArrowDir | false;
  size: ButtonSize;
  external?: boolean;
}) {
  const note = external ? (
    <>
      {" "}
      <span className="sr-only">(opens in a new tab)</span>
    </>
  ) : null;
  if (tone === "text") {
    return (
      <>
        <span>
          {children}
          {note}
        </span>
        {arrow ? (
          <SignArrow
            dir={arrow}
            size={size === "sm" ? 15 : 17}
            className="transition-transform duration-300 group-hover/tl:translate-x-1"
          />
        ) : null}
      </>
    );
  }
  return (
    <>
      <span className="wf-btn__label">
        {children}
        {note}
      </span>
      {arrow ? (
        <span className="wf-btn__arrow">
          <SignArrow dir={arrow} size={size === "sm" ? 17 : 19} />
        </span>
      ) : null}
    </>
  );
}

/**
 * A link styled as a sign plate: the label, then the arrow in its own
 * square. `text` is the quiet version, an underlined link with an arrow.
 * Internal routes use next/link; everything else is a plain anchor, and
 * `external` opens in a new tab with `noopener`.
 */
export function ButtonLink({
  children,
  href,
  tone = "sign",
  size = "md",
  arrow = "right",
  external,
  className,
}: {
  children: ReactNode;
  href: string;
  tone?: ButtonTone;
  size?: ButtonSize;
  arrow?: ArrowDir | false;
  external?: boolean;
  className?: string;
}) {
  const classes = buttonClass(tone, size, className);
  const content = (
    <ButtonContent tone={tone} arrow={arrow} size={size} external={external}>
      {children}
    </ButtonContent>
  );
  const dataArrow = arrow || undefined;

  if (href.startsWith("/") && !external) {
    return (
      <Link href={href} className={classes} data-arrow={dataArrow}>
        {content}
      </Link>
    );
  }
  return (
    <a
      href={href}
      className={classes}
      data-arrow={dataArrow}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {content}
    </a>
  );
}

/** The same plate as a real <button>, for in-page actions. */
export function Button({
  children,
  tone = "sign",
  size = "md",
  arrow = false,
  className,
  ...rest
}: Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  children: ReactNode;
  tone?: ButtonTone;
  size?: ButtonSize;
  arrow?: ArrowDir | false;
}) {
  return (
    <button type="button" className={buttonClass(tone, size, className)} {...rest}>
      <ButtonContent tone={tone} arrow={arrow} size={size}>
        {children}
      </ButtonContent>
    </button>
  );
}
