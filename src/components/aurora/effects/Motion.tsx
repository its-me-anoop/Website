"use client";

import { Children, isValidElement, type ReactNode } from "react";
import { m, useMotionValue, useScroll, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";
import { useFinePointer, useMotionAllowed } from "./hooks";

/** Shared expo-out curve for entrances. */
export const EASE = [0.16, 1, 0.3, 1] as const;

/* ─────────────────────────────────────────────────────────────
   Reveal: fade-and-rise when scrolled into view. No filter: a blur
   animation leaves every revealed block holding a filter layer, and
   iOS Safari runs out of layer memory (black regions, frozen frames).
   ───────────────────────────────────────────────────────────── */

export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "li" | "article" | "figure" | "section";
}) {
  const motion = useMotionAllowed();
  const Tag = m[as] as typeof m.div;
  return (
    <Tag
      className={cn("a-reveal", className)}
      initial={{ y, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: motion ? 0.9 : 0, ease: EASE, delay: motion ? delay : 0 }}
    >
      {children}
    </Tag>
  );
}

/* ─────────────────────────────────────────────────────────────
   SplitWords: CSS word-by-word reveal for headlines. Strings are
   split on spaces; elements (e.g. <em>) animate as one word group.
   The accessible text is unchanged.
   ───────────────────────────────────────────────────────────── */

export function SplitWords({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  let i = 0;
  const out: ReactNode[] = [];
  Children.forEach(children, (child) => {
    if (typeof child === "string") {
      const parts = child.split(/(\s+)/);
      parts.forEach((part) => {
        if (!part) return;
        if (/^\s+$/.test(part)) {
          out.push(" ");
          return;
        }
        out.push(
          <span className="a-w" key={`w${i}`}>
            <span style={{ ["--i" as string]: i, ["--d" as string]: `${delay}ms` }}>{part}</span>
          </span>
        );
        i += 1;
      });
    } else if (isValidElement(child)) {
      out.push(
        <span className="a-w" key={`e${i}`}>
          <span style={{ ["--i" as string]: i, ["--d" as string]: `${delay}ms` }}>{child}</span>
        </span>
      );
      i += 1;
    }
  });
  return <span className="a-words">{out}</span>;
}

/* ─────────────────────────────────────────────────────────────
   Magnetic: the child drifts towards the pointer while hovered.
   ───────────────────────────────────────────────────────────── */

export function Magnetic({
  children,
  strength = 0.28,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const fine = useFinePointer();
  const motion = useMotionAllowed();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });
  const enabled = fine && motion;

  return (
    <m.span
      className={cn("inline-flex", className)}
      style={enabled ? { x: sx, y: sy } : undefined}
      onPointerMove={(e) => {
        if (!enabled) return;
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left - rect.width / 2) * strength);
        y.set((e.clientY - rect.top - rect.height / 2) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </m.span>
  );
}

/* ─────────────────────────────────────────────────────────────
   ScrollProgress: a hairline gradient bar across the top.
   ───────────────────────────────────────────────────────────── */

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });
  return (
    <m.div
      aria-hidden="true"
      data-aurora-fx
      className="fixed inset-x-0 top-0 z-[130] h-[2px] origin-left"
      style={{ scaleX, background: "var(--a-grad)" }}
    />
  );
}

/* ─────────────────────────────────────────────────────────────
   EmberGlow: the one remaining light. A static radial of ember at
   the foot (or head) of a night section that breathes slowly.
   ───────────────────────────────────────────────────────────── */

export function EmberGlow({ position = "bottom", className }: { position?: "top" | "bottom"; className?: string }) {
  const bottom = position === "bottom";
  return (
    <div
      aria-hidden
      className={cn(
        "a-glow pointer-events-none absolute inset-x-[-10%] h-[560px]",
        bottom ? "bottom-[-40%] origin-bottom" : "top-[-40%] origin-top",
        className
      )}
      style={{
        background: `radial-gradient(60% 100% at 50% ${bottom ? "100%" : "0%"}, rgba(255,138,42,0.24) 0%, rgba(255,90,31,0.08) 45%, rgba(11,9,7,0) 75%)`,
      }}
    />
  );
}
