import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Which blueprint sketch sits under the content while it reveals. */
export type WireframeSketch = "site" | "phone" | "portrait" | "type";

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1,
  vectorEffect: "non-scaling-stroke",
} as const;
const dashed = { ...stroke, strokeDasharray: "3 4" } as const;

const sketches: Record<WireframeSketch, ReactNode> = {
  site: (
    <>
      <path d="M0 0L100 100M100 0L0 100" {...stroke} />
      <rect x="6" y="9" width="72" height="60" {...dashed} />
      <rect x="45" y="50" width="50" height="42" {...dashed} />
    </>
  ),
  phone: (
    <>
      <rect x="26" y="8" width="48" height="96" rx="2" {...dashed} />
      <path d="M26 8L74 100M74 8L26 100" {...stroke} />
      <rect x="4" y="4" width="10.5" height="10" {...stroke} />
    </>
  ),
  portrait: (
    <>
      <path d="M0 0L100 100M100 0L0 100" {...stroke} />
      <ellipse cx="50" cy="34" rx="15" ry="12" {...dashed} />
      <path d="M14 100C16 72 30 60 50 60C70 60 84 72 86 100" {...dashed} />
    </>
  ),
  type: (
    <>
      <path d="M0 0L100 100M100 0L0 100" {...stroke} />
      <rect x="6" y="56" width="58" height="17" {...dashed} />
      <rect x="6" y="76" width="30" height="17" {...dashed} />
    </>
  ),
};

/**
 * A media box that builds itself from a wireframe as it scrolls in: a
 * dashed frame with crossed diagonals and a spec label, then an amber
 * scan line wipes the real content in over it. Pure CSS (see the
 * `fx-wf-*` rules); where scroll timelines are unsupported, or motion
 * is reduced, the content is simply there.
 */
export function WireframeMedia({
  sketch,
  label,
  labelSide = "left",
  className,
  surface,
  children,
}: {
  sketch: WireframeSketch;
  /** Spec label, e.g. "Screen · iPhone". Decorative. */
  label: string;
  labelSide?: "left" | "right";
  /** Box size, radius and colour (the mark uses `currentColor`). */
  className?: string;
  /** Classes for the revealed layer, e.g. its background. */
  surface?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("fx-wf-box overflow-hidden", className)}>
      <div className="fx-wf-mark" aria-hidden="true" data-wireframe>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none">
          {sketches[sketch]}
        </svg>
        <span style={labelSide === "right" ? { left: "auto", right: 16 } : undefined}>{label}</span>
      </div>
      <div className={cn("fx-wf-reveal", surface)}>{children}</div>
      <div className="fx-scan" aria-hidden="true" />
    </div>
  );
}
