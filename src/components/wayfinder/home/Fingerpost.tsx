import Link from "next/link";
import type { CSSProperties } from "react";
import type { HeroSign } from "@/lib/marketing/content";
import { cn } from "@/lib/utils";

/**
 * A fingerpost: an ink pole with arms that swing out on load, each arm a
 * real link to the page a visitor would be looking for. The reading
 * order is task first ("Book an appointment, Willowbrook Surgery"),
 * even though the place is shown above the task on the arm.
 */
export function Fingerpost({
  signs,
  label,
  caption,
  highlight = 2,
  className,
}: {
  signs: readonly HeroSign[];
  /** Accessible name for the list of arms. */
  label: string;
  caption?: string;
  /** Which arm is painted yellow. */
  highlight?: number;
  className?: string;
}) {
  return (
    <div className={cn("wf-post-wrap", className)}>
      <div className="wf-post pb-4">
        <span aria-hidden="true" className="wf-post__pole" />
        <ul aria-label={label} className="relative space-y-3.5 pt-9 sm:space-y-4">
          {signs.map((sign, i) => (
            <li key={sign.href}>
              <Link
                href={sign.href}
                className="wf-arm"
                data-point={sign.point}
                data-tone={i === highlight ? "sign" : undefined}
                style={{ ["--i" as string]: i } as CSSProperties}
              >
                <span className="flex flex-col-reverse">
                  <span className="wf-arm__label">
                    {sign.label}
                    <span className="sr-only">, </span>
                  </span>
                  <span className="wf-arm__place">
                    {sign.place}
                    <span className="sr-only"> sample site</span>
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {caption ? <p className="wf-lead mt-3 text-center text-[14.5px]">{caption}</p> : null}
    </div>
  );
}
