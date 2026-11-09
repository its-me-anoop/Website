import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const COLOURS = {
  navy: "var(--s-navy-3)",
  pink: "var(--s-pink)",
  jade: "var(--s-jade)",
  sun: "var(--s-sun)",
  flame: "var(--s-flame)",
  cobalt: "var(--s-cobalt)",
  white: "var(--s-white)",
} as const;

export type SlabColour = keyof typeof COLOURS;

const DEFAULT_ORDER: readonly SlabColour[] = ["navy", "pink", "jade", "sun", "cobalt", "white"];

/**
 * A neat stack of slabs in the service colours, seen from above: the
 * picture of "sorted". Each slab drops into place, then the stack
 * breathes. Pure CSS and decorative, so it is hidden from assistive
 * technology. `top` draws on the uppermost slab; by default that is the
 * Flutterly butterfly.
 */
export function SlabStack({
  order = DEFAULT_ORDER,
  top,
  className,
}: {
  /** Bottom to top. */
  order?: readonly SlabColour[];
  top?: ReactNode;
  className?: string;
}) {
  return (
    <div aria-hidden="true" data-scene="stack" className={cn("stack", className)}>
      <div className="stack-iso">
        {order.map((colour, z) => (
          <div
            key={`${colour}-${z}`}
            className="slab stack-slab"
            data-edge="left"
            style={{ ["--z" as string]: z, ["--face" as string]: COLOURS[colour] } as CSSProperties}
          >
            {z === order.length - 1 ? (
              <div className="slab-face flex items-center justify-center">
                {top ?? <Image src="/flutterly-logo.png" alt="" width={220} height={220} className="h-[62%] w-[62%] object-contain" />}
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
