"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { emberAlpha, emberCount, spawnEmber, stepEmber, type Ember } from "./embers";

/** Ember colours from cool (deep orange) to hot (pale gold). */
const HUES = ["255,90,31", "255,138,42", "255,176,32", "255,210,122"] as const;

/**
 * Sparks rising through the hero, drawn additively on a 2D canvas over
 * the shader. Paused off screen and in background tabs; not rendered
 * at all for reduced motion.
 */
export function Embers({ className, enabled }: { className?: string; enabled: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!enabled || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let embers: Ember[] = [];
    let bounds = { width: 0, height: 0 };
    let frame = 0;
    let last = performance.now();
    let visible = true;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      bounds = { width: rect.width, height: rect.height };
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      /* Seed across the full height so the field is alive at once. */
      const target = emberCount(rect.width, rect.height);
      embers = Array.from({ length: target }, () => {
        const e = spawnEmber(Math.random, bounds);
        return { ...e, y: Math.random() * bounds.height, age: Math.random() * e.life * 0.6 };
      });
    };

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      ctx.clearRect(0, 0, bounds.width, bounds.height);
      ctx.globalCompositeOperation = "lighter";
      const target = emberCount(bounds.width, bounds.height);
      const next: Ember[] = [];
      for (const e of embers) {
        const moved = stepEmber(e, dt, bounds);
        next.push(moved ?? spawnEmber(Math.random, bounds));
      }
      while (next.length < target) next.push(spawnEmber(Math.random, bounds));
      embers = next;

      for (const e of embers) {
        const alpha = emberAlpha(e);
        if (alpha <= 0.01) continue;
        const hue = HUES[Math.min(HUES.length - 1, Math.floor(e.heat * HUES.length))];
        const glow = e.size * 3.2;
        const g = ctx.createRadialGradient(e.x, e.y, 0, e.x, e.y, glow);
        g.addColorStop(0, `rgba(${hue},${alpha})`);
        g.addColorStop(0.2, `rgba(${hue},${alpha * 0.55})`);
        g.addColorStop(1, `rgba(${hue},0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(e.x, e.y, glow, 0, Math.PI * 2);
        ctx.fill();
      }
      frame = requestAnimationFrame(tick);
    };

    const run = () => {
      cancelAnimationFrame(frame);
      if (visible && !document.hidden) {
        last = performance.now();
        frame = requestAnimationFrame(tick);
      }
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      run();
    });
    io.observe(canvas);
    document.addEventListener("visibilitychange", run);
    resize();
    run();

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", run);
    };
  }, [enabled]);

  if (!enabled) return null;
  return <canvas ref={ref} aria-hidden="true" className={cn("pointer-events-none absolute inset-0 h-full w-full", className)} />;
}
