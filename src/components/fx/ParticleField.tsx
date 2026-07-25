"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type Particle = {
  x: number;
  y: number;
  z: number; // depth 0.35–1, drives size, speed and alpha
  vx: number;
  vy: number;
  hue: number;
};

/* The three-colour rule, plus the gold the fold's stat row uses —
   motes of the same light the rest of the page is lit by. */
const PALETTE = ["62,195,213", "232,154,42", "240,127,165", "245,166,35"];

/**
 * A slow constellation of light motes drifting across the hero.
 *
 * Deliberately cheap: particle count scales with viewport area and is
 * capped, the canvas is drawn at a DPR of at most 2, links are only
 * traced between near neighbours, and the loop is cancelled outright —
 * not merely skipped — whenever the canvas leaves the viewport or the
 * tab is hidden. A resize carries the existing field across rather than
 * building a new one, so the constellation survives an orientation
 * change or a phone's URL bar sliding away. Pointer movement
 * applies a gentle parallax rather than a physics repulsion, which
 * keeps the motion calm on a marketing page.
 *
 * Renders nothing at all for `prefers-reduced-motion` users.
 */
export function ParticleField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let particles: Particle[] = [];
    /* 0 means "not scheduled" — the loop is genuinely stopped, not just
       idling. rAF ids are always ≥ 1, so 0 is safe as the sentinel. */
    let frame = 0;
    /* Pointer parallax, eased towards the raw pointer each frame. */
    let px = 0;
    let py = 0;
    let tx = 0;
    let ty = 0;

    const countFor = (w: number, h: number) =>
      Math.min(52, Math.max(12, Math.round((w * h) / 26000)));

    const seed = () => {
      const count = countFor(width, height);
      particles = Array.from({ length: count }, () => {
        const z = 0.35 + Math.random() * 0.65;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          z,
          vx: (Math.random() - 0.5) * 0.16 * z,
          vy: (-0.05 - Math.random() * 0.16) * z,
          hue: Math.floor(Math.random() * PALETTE.length),
        };
      });
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const nextWidth = Math.max(1, rect.width);
      const nextHeight = Math.max(1, rect.height);

      dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(nextWidth * dpr);
      canvas.height = Math.round(nextHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      /* Carry the constellation across a resize instead of rebuilding
         it. Reseeding here meant every orientation change — and on
         mobile, every time the URL bar slid away — teleported every
         mote to a new random position. Only a change in how many motes
         the area calls for is worth a fresh field. */
      const sameCount =
        particles.length > 0 &&
        particles.length === countFor(nextWidth, nextHeight);

      if (sameCount && width > 0 && height > 0) {
        const scaleX = nextWidth / width;
        const scaleY = nextHeight / height;
        for (const particle of particles) {
          particle.x *= scaleX;
          particle.y *= scaleY;
        }
        width = nextWidth;
        height = nextHeight;
      } else {
        width = nextWidth;
        height = nextHeight;
        seed();
      }
    };

    const draw = () => {
      frame = requestAnimationFrame(draw);

      px += (tx - px) * 0.045;
      py += (ty - py) * 0.045;

      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        /* Wrap rather than bounce — no visible edges, no clumping. */
        if (p.y < -12) {
          p.y = height + 12;
          p.x = Math.random() * width;
        }
        if (p.x < -12) p.x = width + 12;
        if (p.x > width + 12) p.x = -12;

        const ox = p.x + px * p.z * 26;
        const oy = p.y + py * p.z * 26;
        const r = 0.55 + p.z * 1.4;
        const alpha = 0.1 + p.z * 0.3;
        const rgb = PALETTE[p.hue];

        const glow = ctx.createRadialGradient(ox, oy, 0, ox, oy, r * 5.5);
        glow.addColorStop(0, `rgba(${rgb},${alpha})`);
        glow.addColorStop(1, `rgba(${rgb},0)`);
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(ox, oy, r * 5.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(${rgb},${Math.min(0.75, alpha + 0.2)})`;
        ctx.beginPath();
        ctx.arc(ox, oy, r * 0.5, 0, Math.PI * 2);
        ctx.fill();
      }

      /* Constellation links: only the closest pairs, faintly. */
      ctx.lineWidth = 0.6;
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > 11000) continue;
          const alpha = (1 - d2 / 11000) * 0.09;
          ctx.strokeStyle = `rgba(245, 230, 215,${alpha})`;
          ctx.beginPath();
          ctx.moveTo(a.x + px * a.z * 26, a.y + py * a.z * 26);
          ctx.lineTo(b.x + px * b.z * 26, b.y + py * b.z * 26);
          ctx.stroke();
        }
      }
    };

    /* Actually stop, rather than keep a no-op callback scheduled at the
       display refresh rate. The reschedule used to sit above the
       running check, so the hero kept waking the compositor for as long
       as the tab was open — even scrolled thousands of pixels away. */
    let onScreen = false;
    const sync = () => {
      const shouldRun = onScreen && document.visibilityState === "visible";
      if (shouldRun && !frame) frame = requestAnimationFrame(draw);
      else if (!shouldRun && frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    };

    const onPointer = (event: PointerEvent) => {
      tx = (event.clientX / window.innerWidth - 0.5) * 2;
      ty = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    resize();

    const observer = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        sync();
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    window.addEventListener("pointermove", onPointer, { passive: true });
    document.addEventListener("visibilitychange", sync);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      observer.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", sync);
    };
  }, [reduce]);

  if (reduce) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
    />
  );
}
