"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useReducedMotion } from "framer-motion";

// three.js is heavy — load it only on the client, after first paint.
const ShaderField = dynamic(
  () => import("./ShaderField").then((m) => m.ShaderField),
  { ssr: false }
);

/**
 * Ambient site background.
 *
 * Always paints a lightweight CSS gradient field (instant, zero-JS, also the
 * static fallback). On capable, motion-friendly clients it layers the animated
 * WebGL `ShaderField` on top once mounted. Honours `prefers-reduced-motion`
 * and skips WebGL entirely when the context is unavailable.
 */
export function ShaderBackground() {
  const reduce = useReducedMotion();
  const [canRender, setCanRender] = useState(false);

  useEffect(() => {
    if (reduce) return;
    // Defer mount until idle so it never competes with first paint.
    let ok = false;
    try {
      const canvas = document.createElement("canvas");
      ok = !!(
        canvas.getContext("webgl2") || canvas.getContext("webgl")
      );
    } catch {
      ok = false;
    }
    if (!ok) return;
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    const id = w.requestIdleCallback
      ? w.requestIdleCallback(() => setCanRender(true))
      : window.setTimeout(() => setCanRender(true), 200);
    return () => {
      if (w.cancelIdleCallback) w.cancelIdleCallback(id);
      else clearTimeout(id);
    };
  }, [reduce]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-obsidian"
    >
      {/* Static CSS field — always present (fallback + instant paint). */}
      <div
        className="absolute inset-0 opacity-90"
        style={{
          background:
            "radial-gradient(80% 60% at 15% 8%, rgba(124,155,255,0.10), transparent 60%)," +
            "radial-gradient(70% 55% at 85% 30%, rgba(181,140,255,0.08), transparent 60%)," +
            "radial-gradient(90% 60% at 50% 110%, rgba(212,242,76,0.08), transparent 55%)",
        }}
      />
      <div className="dot-grid absolute inset-0 opacity-30" />
      {canRender && <ShaderField />}
      {/* Legibility scrim so foreground text always meets contrast. */}
      <div className="absolute inset-0 bg-obsidian/45" />
    </div>
  );
}
