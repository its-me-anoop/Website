"use client";

import { Children, isValidElement, useRef, type ReactNode } from "react";
import { m, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { useFinePointer, useMotionAllowed } from "./hooks";

/** Shared expo-out curve for entrances. */
export const EASE = [0.16, 1, 0.3, 1] as const;

/* ─────────────────────────────────────────────────────────────
   Reveal: blur-and-rise when scrolled into view.
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
      initial={{ y, opacity: 0, filter: "blur(10px)" }}
      whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: motion ? 0.9 : 0, ease: EASE, delay: motion ? delay : 0 }}
    >
      {children}
    </Tag>
  );
}

/* ─────────────────────────────────────────────────────────────
   WipeReveal: an image uncovers from the bottom edge upwards as it
   scrolls in, with a slight settle in scale.
   ───────────────────────────────────────────────────────────── */

export function WipeReveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const motion = useMotionAllowed();
  return (
    <m.div
      className={cn("a-reveal", className)}
      initial={{ clipPath: "inset(100% 0% 0% 0%)", scale: 1.06 }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)", scale: 1 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: motion ? 1.1 : 0, ease: [0.76, 0, 0.24, 1], delay: motion ? delay : 0 }}
    >
      {children}
    </m.div>
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
   Tilt: a 3D card that leans towards the pointer.
   ───────────────────────────────────────────────────────────── */

export function Tilt({
  children,
  className,
  max = 8,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const fine = useFinePointer();
  const motion = useMotionAllowed();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 150, damping: 20 });
  const sry = useSpring(ry, { stiffness: 150, damping: 20 });
  const enabled = fine && motion;

  return (
    <div className={cn("[perspective:1400px]", className)}>
      <m.div
        className="h-full w-full [transform-style:preserve-3d]"
        style={enabled ? { rotateX: srx, rotateY: sry } : undefined}
        onPointerMove={(e) => {
          if (!enabled) return;
          const rect = e.currentTarget.getBoundingClientRect();
          const px = (e.clientX - rect.left) / rect.width - 0.5;
          const py = (e.clientY - rect.top) / rect.height - 0.5;
          ry.set(px * max * 2);
          rx.set(-py * max * 2);
        }}
        onPointerLeave={() => {
          rx.set(0);
          ry.set(0);
        }}
      >
        {children}
      </m.div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   ScrollTilt: flattens a raked 3D plane as it scrolls into view.
   ───────────────────────────────────────────────────────────── */

export function ScrollTilt({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const motion = useMotionAllowed();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const rotateX = useTransform(scrollYProgress, [0, 1], [28, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.86, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0.3, 1]);
  return (
    <div ref={ref} className={cn("[perspective:1600px]", className)}>
      <m.div style={motion ? { rotateX, scale, opacity, transformOrigin: "50% 100%" } : undefined}>
        {children}
      </m.div>
    </div>
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
