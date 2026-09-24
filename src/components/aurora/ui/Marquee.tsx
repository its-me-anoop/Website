import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Infinite horizontal loop. The first copy is the real content; the
 * second exists only to close the seam and is hidden from assistive
 * technology. Pauses on hover and focus; static for reduced motion.
 */
export function Marquee({
  items,
  label,
  duration = 40,
  reverse,
  className,
  renderItem,
}: {
  items: readonly string[];
  label: string;
  duration?: number;
  reverse?: boolean;
  className?: string;
  renderItem: (item: string) => ReactNode;
}) {
  const row = (copy: boolean) => (
    <ul
      aria-label={copy ? undefined : label}
      aria-hidden={copy || undefined}
      data-marquee-copy={copy ? "" : undefined}
      className="flex shrink-0 items-center"
    >
      {items.map((item) => (
        <li key={item} className="shrink-0">
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );
  return (
    <div className={cn("a-marquee overflow-hidden", className)}>
      <div
        className="a-marquee-track flex w-max"
        style={{
          ["--marquee-duration" as string]: `${duration}s`,
          animationDirection: reverse ? "reverse" : undefined,
        }}
      >
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
