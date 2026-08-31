"use client";

import { useEffect, useRef } from "react";
import styles from "./home.module.css";

function readShiftCap(element: HTMLElement): number {
  const raw = getComputedStyle(element).getPropertyValue("--fl-grain-shift").trim();
  const parsed = Number.parseFloat(raw);
  return Number.isFinite(parsed) ? parsed : 8;
}

export function HeroGrain() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grain = ref.current;
    const host = grain?.parentElement;
    if (!grain || !host) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const setShift = (x: number, y: number) => {
      grain.style.setProperty("--grain-x", `${x}px`);
      grain.style.setProperty("--grain-y", `${y}px`);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (reduced.matches) return;
      const rect = host.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const cap = readShiftCap(grain);
      const nx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((event.clientY - rect.top) / rect.height) * 2 - 1;
      setShift(
        Math.max(-cap, Math.min(cap, nx * cap)),
        Math.max(-cap, Math.min(cap, ny * cap)),
      );
    };

    const onPointerLeave = () => setShift(0, 0);

    const onVisibility = () => {
      grain.style.animationPlayState = document.hidden ? "paused" : "running";
    };

    host.addEventListener("pointermove", onPointerMove);
    host.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibility);
    onVisibility();

    return () => {
      host.removeEventListener("pointermove", onPointerMove);
      host.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div ref={ref} className={styles.heroGrain} data-hero-grain="" aria-hidden="true">
      <div className={styles.heroGrainShift}>
        <div className={styles.heroGrainTile} />
      </div>
    </div>
  );
}
