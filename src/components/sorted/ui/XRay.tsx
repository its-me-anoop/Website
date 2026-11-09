import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

/** One sheet per audit area, top of the stack first. */
const SHEETS = [
  { label: "Accessibility", face: "var(--s-white)", ink: "var(--s-navy)" },
  { label: "Speed", face: "var(--s-sun)", ink: "var(--s-navy)" },
  { label: "Search", face: "var(--s-cobalt)", ink: "#ffffff" },
  { label: "Content", face: "var(--s-pink)", ink: "var(--s-navy)" },
  { label: "Mobile", face: "var(--s-jade)", ink: "var(--s-navy)" },
  { label: "Security", face: "var(--s-flame)", ink: "var(--s-navy)" },
  { label: "Local presence", face: "var(--s-navy-3)", ink: "#ffffff" },
] as const;

export const XRAY_SHEETS = SHEETS.length;

/**
 * A web page pulled apart into the seven things the audit reads, seen
 * from above. The sheets start pressed together as one page and
 * separate as the stack scrolls into view (CSS scroll timeline; apart
 * from the start where that is unsupported). `active` lifts one sheet
 * and fades the rest, so a list beside it can point at a layer.
 * Decorative: the list carries the words.
 */
export function XRay({ active = null, className }: { active?: number | null; className?: string }) {
  return (
    <div aria-hidden="true" data-scene="xray" data-active={active ?? undefined} className={cn("xray", className)}>
      <div className="xray-stack">
        {SHEETS.map((sheet, i) => (
          <div
            key={sheet.label}
            className="xray-sheet"
            data-on={active === i ? "" : undefined}
            style={{ "--z": SHEETS.length - 1 - i, "--sheet": sheet.face, "--sheet-ink": sheet.ink } as CSSProperties}
          >
            {i === 0 ? (
              <div className="flex h-[78%] flex-col gap-[2.4cqw]">
                <div className="flex items-center justify-between">
                  <span className="h-[3cqw] w-[11cqw] rounded-[0.5cqw] bg-s-navy" />
                  <span className="flex gap-[1.4cqw]">
                    <span className="h-[1.3cqw] w-[5cqw] bg-s-navy/40" />
                    <span className="h-[1.3cqw] w-[5cqw] bg-s-navy/40" />
                    <span className="h-[1.3cqw] w-[5cqw] bg-s-navy/40" />
                  </span>
                </div>
                <span className="mt-[2cqw] h-[4.6cqw] w-[80%] rounded-[0.5cqw] bg-s-navy" />
                <span className="h-[4.6cqw] w-[56%] rounded-[0.5cqw] bg-s-navy" />
                <span className="mt-[1cqw] h-[1.4cqw] w-[70%] bg-s-navy/35" />
                <span className="h-[1.4cqw] w-[62%] bg-s-navy/35" />
                <span className="mt-[1.4cqw] h-[5.4cqw] w-[20cqw] rounded-[0.8cqw] bg-s-flame" />
              </div>
            ) : null}
            <span className="s-label absolute bottom-[2.2cqw] left-[3cqw] whitespace-nowrap">
              <span className="s-num mr-[1.2cqw] opacity-70">0{i + 1}</span>
              {sheet.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
