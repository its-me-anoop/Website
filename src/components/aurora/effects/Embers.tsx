"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { emberAlpha, emberCount, spawnEmber, stepEmber, type Ember } from "./embers";
import { frameGate, targetFps, whenIdle } from "./schedule";

/** Ember colours from cool (deep orange) to hot (pale gold). */
const HUES = ["255,90,31", "255,138,42", "255,176,32", "255,210,122"] as const;
const SPRITE = 64;

/** One soft glow per hue, drawn once and stamped with drawImage each frame. */
function makeSprites(): HTMLCanvasElement[] {
  return HUES.map((hue) => {
    const c = document.createElement("canvas");
    c.width = c.height = SPRITE;
    const ctx = c.getContext("2d");
    if (ctx) {
      const r = SPRITE / 2;
      const g = ctx.createRadialGradient(r, r, 0, r, r, r);
      g.addColorStop(0, `rgba(${hue},1)`);
      g.addColorStop(0.2, `rgba(${hue},0.55)`);
      g.addColorStop(1, `rgba(${hue},0)`);
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, SPRITE, SPRITE);
    }
    return c;
  });
}

/**
 * Sparks rising through the hero, drawn additively on a 2D canvas over
 * the shader. Starts only once the page is loaded and idle, runs at
 * half rate on small or touch screens, pauses off screen and in
 * background tabs, and is not rendered at all for reduced motion.
 */
export function Embers({ className, enabled }: { className?: string; enabled: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!enabled || !canvas) return;
    let teardown: (() => void) | undefined;
    const cancelIdle = whenIdle(() => {
      teardown = startEmbers(canvas);
    }, 600);
    return () => {
      cancelIdle();
      teardown?.();
    };
  }, [enabled]);

  if (!enabled) return null;
  return <canvas ref={ref} aria-hidden="true" className={cn("pointer-events-none absolute inset-0 h-full w-full", className)} />;
}

function startEmbers(canvas: HTMLCanvasElement): (() => void) | undefined {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const sprites = makeSprites();
  const small = window.matchMedia("(max-width: 767px), (pointer: coarse)").matches;
  const gate = frameGate(targetFps({ width: window.innerWidth, coarse: small }));

  let embers: Ember[] = [];
  let bounds = { width: 0, height: 0 };
  let frame = 0;
  let last = performance.now();
  let visible = true;

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, small ? 1.5 : 2);
    bounds = { width: rect.width, height: rect.height };
    canvas.width = Math.max(1, Math.floor(rect.width * dpr));
    canvas.height = Math.max(1, Math.floor(rect.height * dpr));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.globalCompositeOperation = "lighter";
    /* Seed across the full height so the field is alive at once. */
    const target = emberCount(rect.width, rect.height);
    embers = Array.from({ length: target }, () => {
      const e = spawnEmber(Math.random, bounds);
      return { ...e, y: Math.random() * bounds.height, age: Math.random() * e.life * 0.6 };
    });
  };

  const tick = (now: number) => {
    frame = requestAnimationFrame(tick);
    if (!gate(now)) return;
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    ctx.clearRect(0, 0, bounds.width, bounds.height);
    const target = emberCount(bounds.width, bounds.height);
    const next: Ember[] = [];
    for (const e of embers) next.push(stepEmber(e, dt, bounds) ?? spawnEmber(Math.random, bounds));
    while (next.length < target) next.push(spawnEmber(Math.random, bounds));
    embers = next;

    for (const e of embers) {
      const alpha = emberAlpha(e);
      if (alpha <= 0.01) continue;
      const sprite = sprites[Math.min(HUES.length - 1, Math.floor(e.heat * HUES.length))];
      const size = e.size * 6.4;
      ctx.globalAlpha = alpha;
      ctx.drawImage(sprite, e.x - size / 2, e.y - size / 2, size, size);
    }
    ctx.globalAlpha = 1;
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
}
