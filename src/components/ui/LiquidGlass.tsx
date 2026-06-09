"use client";

import React, { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  LiquidGlass as Engine,
  type LensShape,
  type LensOptics,
} from "@/lib/liquid-glass";

interface LiquidGlassProps {
  children: React.ReactNode;
  /** Extra classes on the stage (the bounded, clipped surface). */
  className?: string;
  /** Extra classes on the filtered content layer. */
  contentClassName?: string;
  /**
   * Background painted on the stage. Displaced rim pixels sample from here, so
   * it should match the surrounding surface (defaults to the page canvas).
   */
  scene?: string;
  shape?: Partial<LensShape>;
  optics?: Partial<LensOptics>;
  draggable?: boolean;
  /** Gentle ambient drift when not being dragged. */
  idle?: boolean;
  /** 0–1 follow factor; lower is silkier. */
  smoothing?: number;
  /** Specular-rim brightness, 0–1. */
  highlight?: number;
  /** Optional rounded-corner radius for the stage, e.g. "var(--r-xl)". */
  radius?: string;
}

/**
 * Wraps its children in a "liquid glass" stage: a single SVG displacement
 * filter bends the children's own pixels through a canvas-generated lens that
 * the visitor can drag (and which drifts gently on its own). Cross-browser,
 * SSR-safe, and a no-op under `prefers-reduced-motion` or where canvas 2D is
 * unavailable — the children always render normally underneath.
 *
 * @see lib/liquid-glass.ts for the engine and the technique's provenance.
 */
export function LiquidGlass({
  children,
  className,
  contentClassName,
  scene = "var(--canvas)",
  shape,
  optics,
  draggable = true,
  idle = true,
  smoothing,
  highlight = 0.6,
  radius,
}: LiquidGlassProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const stage = stageRef.current;
    const content = contentRef.current;
    if (!stage || !content) return;

    const engine = new Engine({
      stage,
      content,
      shape,
      optics,
      draggable: draggable && !reduce,
      idle: idle && !reduce,
      smoothing,
      highlight,
      reducedMotion: !!reduce,
    });
    return () => engine.destroy();
    // Re-init only when the structural options change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce, draggable, idle, smoothing, highlight]);

  return (
    <div
      ref={stageRef}
      className={cn("lg-stage", className)}
      style={{ background: scene, borderRadius: radius }}
    >
      <div ref={contentRef} className={cn("lg-content", contentClassName)}>
        {children}
      </div>
    </div>
  );
}
