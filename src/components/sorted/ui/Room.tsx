import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

/*
 * The parts of a room. A section is the wall (a `tone-*` class); these
 * are the floor it ends on, the porthole let into it, and the vermilion
 * dot that follows the wordmark around. All three are flat colour and
 * decorative unless the floor is given something to hold.
 */

const FLOORS = {
  paper: "var(--s-chalk)",
  bottle: "var(--s-bottle)",
  tomato: "var(--s-tomato)",
  pink: "var(--s-pink)",
  cobalt: "var(--s-cobalt)",
  mint: "var(--s-jade)",
  ink: "var(--s-navy)",
  sun: "var(--s-sun)",
} as const;

export type FloorColour = keyof typeof FLOORS;

/**
 * The floor at the foot of a room, with a skirting board in the shade
 * of the wall. Empty, it is hidden from assistive technology; with
 * children it is a band they stand in.
 */
export function Floor({
  colour,
  children,
  className,
}: {
  colour: FloorColour;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div
      {...(children ? {} : { "aria-hidden": true })}
      data-floor={colour}
      className={cn("s-floor", className)}
      style={{ "--floor-c": FLOORS[colour] } as CSSProperties}
    >
      {children}
    </div>
  );
}

/** A disc of another colour let into the wall, behind the room's content. */
export function Porthole({ colour, className }: { colour: string; className?: string }) {
  return <span aria-hidden="true" className={cn("s-porthole", className)} style={{ "--hole": colour } as CSSProperties} />;
}

/**
 * The vermilion dot. As a `slot` it is also a place the travelling dot
 * (effects/DotTrail) comes to rest: where that dot is running the slot
 * is left empty for it, and everywhere else it shows its own.
 */
export function Dot({ className, slot }: { className?: string; slot?: boolean }) {
  return <span aria-hidden="true" {...(slot ? { "data-dot": "slot" } : {})} className={cn("s-dot", className)} />;
}
