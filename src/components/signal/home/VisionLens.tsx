"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode, type PointerEvent } from "react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "../effects/hooks";
import { conditionById, conditions, lensPosition, type ConditionId } from "../effects/vision";

/**
 * Wraps a block of content with a lens that shows it as someone with a
 * given viewing condition might see it. The lens follows a mouse, and
 * moves to wherever a finger taps. The choice of condition is a group
 * of toggle buttons, so it works by keyboard and screen reader too; the
 * lens itself is decorative.
 */
export function VisionLens({
  children,
  initial = "cataract",
  className,
}: {
  children: ReactNode;
  initial?: ConditionId;
  className?: string;
}) {
  const [condition, setCondition] = useState<ConditionId>(initial);
  const lensSize = useMediaQuery("(min-width: 640px)") ? 280 : 170;
  const areaRef = useRef<HTMLDivElement>(null);
  const lensRef = useRef<HTMLDivElement>(null);
  const frame = useRef(0);

  const place = useCallback((clientX: number, clientY: number) => {
    const area = areaRef.current;
    const lens = lensRef.current;
    if (!area || !lens) return;
    const rect = area.getBoundingClientRect();
    const { x, y } = lensPosition(
      { x: clientX - rect.left, y: clientY - rect.top },
      { width: rect.width, height: rect.height },
      lensSize
    );
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      lens.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    });
  }, [lensSize]);

  /* Start over the headline so the effect is visible without a mouse. */
  useEffect(() => {
    const area = areaRef.current;
    const heading = area?.querySelector("h1");
    if (!area || !heading) return;
    const h = heading.getBoundingClientRect();
    place(h.left + h.width * 0.62, h.top + h.height * 0.5);
    return () => cancelAnimationFrame(frame.current);
  }, [place]);

  const onMove = (e: PointerEvent) => {
    if (e.pointerType === "mouse" || e.pointerType === "pen") place(e.clientX, e.clientY);
  };
  const onDown = (e: PointerEvent) => {
    if (e.pointerType === "touch") place(e.clientX, e.clientY);
  };

  const active = conditionById(condition);

  return (
    <div className={className}>
      <div ref={areaRef} className="relative" onPointerMove={onMove} onPointerDown={onDown}>
        {children}
        <div
          ref={lensRef}
          aria-hidden="true"
          data-condition={condition}
          className={cn("s-lens z-10", condition === "none" && "opacity-0")}
          style={{ ["--lens" as string]: `${lensSize}px` }}
        >
          <span className="s-label absolute left-1/2 top-full mt-3 -translate-x-1/2 whitespace-nowrap rounded-[3px] bg-s-signal px-2 py-1 text-[11.5px] text-s-ink">
            {active.label}
          </span>
        </div>
      </div>

      <div className="mt-12 border-t border-s-line pt-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-8">
          <p id="vision-label" className="s-label shrink-0 text-s-on-ink-2">
            See this page with
          </p>
          <div role="group" aria-labelledby="vision-label" className="flex flex-wrap gap-2">
            {conditions.map((c) => (
              <button
                key={c.id}
                type="button"
                aria-pressed={condition === c.id}
                onClick={() => setCondition(c.id)}
                className="rounded-[4px] border border-s-line-2 px-3.5 py-2 text-[15px] transition-colors hover:border-s-on-ink aria-pressed:border-s-signal aria-pressed:bg-s-signal aria-pressed:text-s-ink"
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
        <p aria-live="polite" className="mt-4 text-[15px] leading-[1.55] text-s-on-ink-2">
          {active.id === "none"
            ? "Choose a condition, then move the lens over the page."
            : `${active.description} An approximation. Move your mouse, or tap, to move the lens.`}
        </p>
      </div>
    </div>
  );
}
