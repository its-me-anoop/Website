"use client";

import { useEffect, useRef } from "react";
import { useFinePointer, useMotionAllowed } from "./hooks";

/**
 * One delegated pointer listener for every `.a-spot` surface on the
 * page: it writes the pointer position into --mx / --my on whichever
 * spotlight card is under the cursor, so cards need no per-instance
 * listeners.
 */
export function SpotlightTracker() {
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const target = (e.target as Element | null)?.closest?.<HTMLElement>(".a-spot");
      if (!target) return;
      const rect = target.getBoundingClientRect();
      target.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      target.style.setProperty("--my", `${e.clientY - rect.top}px`);
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => document.removeEventListener("pointermove", onMove);
  }, []);
  return null;
}

/**
 * A soft coloured light that trails the cursor across the whole page.
 * Mouse and trackpad only, and never under reduced motion.
 */
export function CursorGlow() {
  const fine = useFinePointer();
  const motion = useMotionAllowed();
  const ref = useRef<HTMLDivElement>(null);
  const enabled = fine && motion;

  useEffect(() => {
    const el = ref.current;
    if (!enabled || !el) return;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 3;
    let tx = x;
    let ty = y;
    let frame = 0;
    const tick = () => {
      x += (tx - x) * 0.12;
      y += (ty - y) * 0.12;
      el.style.transform = `translate3d(${x - 300}px, ${y - 300}px, 0)`;
      if (Math.abs(tx - x) > 0.5 || Math.abs(ty - y) > 0.5) frame = requestAnimationFrame(tick);
      else frame = 0;
    };
    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      el.style.opacity = "1";
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const onLeave = () => {
      el.style.opacity = "0";
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <div
      ref={ref}
      aria-hidden="true"
      data-aurora-fx
      className="pointer-events-none fixed left-0 top-0 z-[5] h-[600px] w-[600px] rounded-full opacity-0 mix-blend-screen transition-opacity duration-700"
      style={{
        background:
          "radial-gradient(circle at center, rgba(155,140,255,0.13), rgba(69,227,212,0.06) 35%, transparent 65%)",
      }}
    />
  );
}
