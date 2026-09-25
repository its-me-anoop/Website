import { cn } from "@/lib/utils";

export type ArrowDir = "right" | "left" | "up" | "down" | "up-right" | "down-right" | "down-left";

const rotation: Record<ArrowDir, number> = {
  right: 0,
  "down-right": 45,
  down: 90,
  "down-left": 135,
  left: 180,
  up: -90,
  "up-right": -45,
};

/**
 * The wayfinding arrow: a heavy shaft and a broad triangular head, the
 * shape public signs use, rather than a thin line icon. One path is
 * rotated to point any way; the rotation lives on an inner group so a
 * transform on the <svg> (a hover nudge) never fights it.
 */
export function SignArrow({
  dir = "right",
  size = 20,
  className,
}: {
  dir?: ArrowDir;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
      className={cn("shrink-0", className)}
    >
      <g transform={`rotate(${rotation[dir]} 12 12)`}>
        <path d="M2.5 9.6H12.2V4.2L21.5 12L12.2 19.8V14.4H2.5Z" fill="currentColor" />
      </g>
    </svg>
  );
}
