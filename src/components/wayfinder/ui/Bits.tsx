import type { ReactNode } from "react";
import { Check, Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

/** A ticked line: the tick sits in a small ink square, like a checklist on a notice board. */
export function CheckItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <li className={cn("flex items-start gap-3", className)}>
      <span
        aria-hidden="true"
        className="mt-[2px] flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-[4px] bg-wf-ink text-wf-sign [.wf-on-ink_&]:bg-wf-sign [.wf-on-ink_&]:text-wf-ink"
      >
        <Check size={14} strokeWidth={3.2} />
      </span>
      <span className="text-[16px] leading-[1.55]">{children}</span>
    </li>
  );
}

/** A plain "no" line for honest comparisons. */
export function CrossItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <li className={cn("flex items-start gap-3", className)}>
      <span
        aria-hidden="true"
        className="mt-[2px] flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-[4px] border-2 border-current text-wf-fail"
      >
        <Minus size={13} strokeWidth={3.2} />
      </span>
      <span className="text-[16px] leading-[1.55] text-wf-ink-soft">{children}</span>
    </li>
  );
}

type TagTone = "ink" | "sign" | "outline" | "pass" | "warn" | "fail";

const tagTone: Record<TagTone, string> = {
  ink: "bg-wf-ink text-wf-on-ink",
  sign: "bg-wf-sign text-wf-ink",
  outline: "border-[1.5px] border-wf-line-2 text-wf-ink",
  pass: "border-[1.5px] border-wf-pass/40 text-wf-pass bg-wf-card",
  warn: "border-[1.5px] border-wf-warn/40 text-wf-warn bg-wf-card",
  fail: "border-[1.5px] border-wf-fail/40 text-wf-fail bg-wf-card",
};

/** A small label plate. */
export function Tag({ children, tone = "outline", className }: { children: ReactNode; tone?: TagTone; className?: string }) {
  return (
    <span
      className={cn(
        "wf-label inline-flex items-center rounded-[4px] px-2 py-1 text-[11.5px] font-bold",
        tagTone[tone],
        className
      )}
    >
      {children}
    </span>
  );
}

/** Questions as native disclosures, each a plate with a plus that becomes a minus. */
export function FaqList({ items, className }: { items: readonly { q: string; a: string }[]; className?: string }) {
  return (
    <div className={cn("border-t-2 border-wf-ink", className)}>
      {items.map((item) => (
        <details key={item.q} className="group border-b-[1.5px] border-wf-line-2">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 text-[18px] font-bold leading-snug sm:text-[20px] [&::-webkit-details-marker]:hidden">
            <span className="min-w-0 flex-1 text-left">{item.q}</span>
            <span
              aria-hidden="true"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[5px] border-2 border-wf-ink transition-colors group-open:bg-wf-ink group-open:text-wf-sign"
            >
              <Plus size={16} strokeWidth={3} className="group-open:hidden" />
              <Minus size={16} strokeWidth={3} className="hidden group-open:block" />
            </span>
          </summary>
          <p className="max-w-[68ch] pb-7 pr-12 text-[17px] leading-[1.65] text-wf-ink-soft">{item.a}</p>
        </details>
      ))}
    </div>
  );
}

/**
 * The Flutterly wings as a flat pictogram: the logo's alpha used as a
 * mask, filled with the current colour, the way a sign symbol is cut
 * from one sheet.
 */
export function Pictogram({ size = 24, className }: { size?: number; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn("wf-pictogram shrink-0", className)}
      style={{ width: size, height: size }}
    />
  );
}

/** The wings on a signal-yellow plate, beside the wordmark. */
export function BrandMark({ className, size = "md" }: { className?: string; size?: "md" | "lg" }) {
  const lg = size === "lg";
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span
        aria-hidden="true"
        className={cn(
          "flex items-center justify-center rounded-[6px] bg-wf-sign text-wf-ink",
          lg ? "h-12 w-12" : "h-9 w-9"
        )}
      >
        <Pictogram size={lg ? 34 : 26} />
      </span>
      <span className={cn("font-extrabold tracking-[-0.03em]", lg ? "text-[34px]" : "text-[21px]")}>Flutterly</span>
    </span>
  );
}
