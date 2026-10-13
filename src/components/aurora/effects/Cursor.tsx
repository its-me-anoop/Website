"use client";

import { useEffect, useRef } from "react";
import { approach, cursorReadout, magneticTarget } from "./fx-math";
import { useFinePointer } from "./hooks";

/**
 * Heron-style pointer effects for mouse and trackpad users:
 *
 * - thin amber crosshair lines that follow the pointer,
 * - a small square and a tag reading the page position, which turns
 *   into the element's label over anything with `data-cursor`,
 * - `data-magnetic` elements drift slightly towards the pointer,
 * - `data-fx-glow` sections get `--mx` / `--my` so their glow follows.
 *
 * Nothing renders on touch devices. With reduced motion the crosshair
 * tracks without easing and nothing drifts.
 */
export function Cursor() {
  const fine = useFinePointer();
  const hLine = useRef<HTMLDivElement>(null);
  const vLine = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const tag = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!fine) return;
    const h = hLine.current;
    const v = vLine.current;
    const d = dot.current;
    const t = tag.current;
    if (!h || !v || !d || !t) return;

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ease = still ? 1 : 0.2;
    const parts = [h, v, d, t];
    const offsets = new WeakMap<HTMLElement, { x: number; y: number }>();
    let x = -99;
    let y = -99;
    let tx = -99;
    let ty = -99;
    let on = false;
    let label = "";
    let shown = "";
    let raf = 0;

    const show = (value: boolean) => parts.forEach((p) => (p.dataset.on = String(value)));

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!on) {
        on = true;
        x = tx;
        y = ty;
        show(true);
      }
      const target = e.target instanceof Element ? e.target.closest<HTMLElement>("[data-cursor]") : null;
      label = target?.dataset.cursor ?? "";
    };
    const onLeave = () => {
      on = false;
      show(false);
    };

    const loop = () => {
      raf = requestAnimationFrame(loop);
      x = approach(x, tx, ease);
      y = approach(y, ty, ease);
      h.style.transform = `translate3d(0,${y.toFixed(1)}px,0)`;
      v.style.transform = `translate3d(${x.toFixed(1)}px,0,0)`;
      d.style.transform = `translate3d(${(x - 4).toFixed(1)}px,${(y - 4).toFixed(1)}px,0) scale(${label ? 1.8 : 1})`;
      t.style.transform = `translate3d(${(x + 14).toFixed(1)}px,${(y + 14).toFixed(1)}px,0)`;
      const text = cursorReadout(x, y, window.scrollY, label);
      if (text !== shown) {
        t.textContent = text;
        t.dataset.mode = label ? "label" : "coords";
        shown = text;
      }

      document.querySelectorAll<HTMLElement>("[data-fx-glow]").forEach((el) => {
        const box = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${(tx - box.left).toFixed(0)}px`);
        el.style.setProperty("--my", `${(ty - box.top).toFixed(0)}px`);
      });

      if (still) return;
      document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
        const box = el.getBoundingClientRect();
        const current = offsets.get(el) ?? { x: 0, y: 0 };
        const dx = tx - (box.left + box.width / 2 - current.x);
        const dy = ty - (box.top + box.height / 2 - current.y);
        const goal = magneticTarget(dx, dy, box.width, box.height, on);
        const next = { x: approach(current.x, goal.x, 0.18), y: approach(current.y, goal.y, 0.18) };
        offsets.set(el, next);
        el.style.transform =
          Math.abs(next.x) < 0.05 && Math.abs(next.y) < 0.05
            ? ""
            : `translate3d(${next.x.toFixed(2)}px,${next.y.toFixed(2)}px,0)`;
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      show(false);
      document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => (el.style.transform = ""));
    };
  }, [fine]);

  if (!fine) return null;

  return (
    <div aria-hidden="true" data-fx-cursor>
      <div ref={hLine} className="fx-cursor h-px w-full bg-a-amber/40" />
      <div ref={vLine} className="fx-cursor h-full w-px bg-a-amber/40" />
      <div ref={dot} className="fx-cursor h-2 w-2 bg-a-amber" />
      <div
        ref={tag}
        className="fx-cursor a-mono whitespace-pre border border-a-line-2 bg-a-void px-2 py-[5px] text-[11px] uppercase tracking-[0.1em] text-a-ink data-[mode=label]:border-a-amber data-[mode=label]:bg-a-amber data-[mode=label]:text-a-void"
      />
    </div>
  );
}
