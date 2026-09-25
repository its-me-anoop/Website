import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { SignArrow, type ArrowDir } from "./Arrow";

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-[1320px] px-4 sm:px-8", className)}>{children}</div>;
}

/**
 * The small sign that opens a section: an arrow square and a mono
 * label, like the plate that tells you which wing you are entering.
 */
export function Kicker({
  children,
  dir = "down-right",
  className,
  as: Tag = "p",
}: {
  children: ReactNode;
  dir?: ArrowDir;
  className?: string;
  as?: "p" | "span";
}) {
  return (
    <Tag className={cn("wf-kicker", className)}>
      <span className="wf-kicker__arrow">
        <SignArrow dir={dir} size={16} />
      </span>
      <span className="wf-label">{children}</span>
    </Tag>
  );
}

const headingSize = {
  hero: "text-[clamp(2.6rem,5.5vw,5.75rem)]",
  xl: "text-[clamp(2.4rem,5.6vw,5.1rem)]",
  lg: "text-[clamp(2.1rem,4.4vw,3.9rem)]",
  md: "text-[clamp(1.75rem,3.2vw,2.7rem)]",
  sm: "text-[clamp(1.4rem,2.2vw,1.85rem)]",
} as const;

export type HeadingSize = keyof typeof headingSize;

/** Display heading. Wrap the words that matter in `<mark className="wf-mark">`. */
export function Heading({
  as: Tag = "h2",
  size = "lg",
  className,
  children,
  id,
}: {
  as?: "h1" | "h2" | "h3" | "p";
  size?: HeadingSize;
  className?: string;
  children: ReactNode;
  id?: string;
}) {
  return (
    <Tag id={id} className={cn("wf-display", headingSize[size], className)}>
      {children}
    </Tag>
  );
}

/** Kicker, heading and an optional lead paragraph, as one block. */
export function SectionHead({
  kicker,
  title,
  copy,
  size = "lg",
  className,
  headingId,
  headingClassName,
}: {
  kicker?: string;
  title: ReactNode;
  copy?: ReactNode;
  size?: HeadingSize;
  className?: string;
  headingId?: string;
  headingClassName?: string;
}) {
  return (
    <div className={cn("max-w-[880px]", className)}>
      {kicker ? <Kicker className="mb-6">{kicker}</Kicker> : null}
      <Heading size={size} id={headingId} className={headingClassName}>
        {title}
      </Heading>
      {copy ? <p className="wf-lead mt-6 max-w-[62ch] text-[18px] leading-[1.6] sm:text-[19px]">{copy}</p> : null}
    </div>
  );
}
