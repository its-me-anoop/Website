"use client";

import { Children, isValidElement, type ReactNode } from "react";
import { m, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";
import { useFinePointer, useMotionAllowed } from "./hooks";

/** Shared curve for entrances: quick away, long settle. */
export const EASE = [0.2, 0.9, 0.2, 1] as const;

/* ─────────────────────────────────────────────────────────────
   Reveal: a block tips up into place as it scrolls into view, hinged
   on its top edge like a flap. The perspective is the block's own
   (`transformPerspective`), so no ancestor becomes a 3D context and
   nothing nested stops reporting itself as in view. Transform and
   opacity only: never a filter.
   ───────────────────────────────────────────────────────────── */

export function Reveal({
  children,
  className,
  delay = 0,
  turn = 26,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Degrees the block starts tipped back; 0 for a plain rise. */
  turn?: number;
  as?: "div" | "li" | "article" | "figure" | "section";
}) {
  const motion = useMotionAllowed();
  const Tag = m[as] as typeof m.div;
  return (
    <Tag
      className={cn("s-reveal", className)}
      style={{ transformOrigin: "50% 0%" }}
      initial={{ y: 30, opacity: 0, rotateX: -turn, transformPerspective: 1100 }}
      whileInView={{ y: 0, opacity: 1, rotateX: 0, transformPerspective: 1100 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: motion ? 0.85 : 0, ease: EASE, delay: motion ? delay : 0 }}
    >
      {children}
    </Tag>
  );
}

/* ─────────────────────────────────────────────────────────────
   SplitWords: headline words turn up one at a time (CSS, so the
   finished text is in the server HTML). Strings are split on spaces;
   elements (e.g. <em>) turn as one group. The accessible text is
   unchanged.
   ───────────────────────────────────────────────────────────── */

export function SplitWords({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  let i = 0;
  const out: ReactNode[] = [];
  const word = (node: ReactNode, key: string) => (
    <span className="s-w" key={key}>
      <span style={{ ["--i" as string]: i, ["--d" as string]: `${delay}ms` }}>{node}</span>
    </span>
  );
  Children.forEach(children, (child) => {
    if (typeof child === "string") {
      child.split(/(\s+)/).forEach((part) => {
        if (!part) return;
        if (/^\s+$/.test(part)) {
          out.push(" ");
          return;
        }
        out.push(word(part, `w${i}`));
        i += 1;
      });
    } else if (isValidElement(child)) {
      out.push(word(child, `e${i}`));
      i += 1;
    }
  });
  return <span className="s-words">{out}</span>;
}

/* ─────────────────────────────────────────────────────────────
   Tilt: the child leans towards the pointer in 3D, and settles flat
   when the pointer leaves. Fine pointers only; on touch screens and
   under reduced motion it is a plain wrapper.
   ───────────────────────────────────────────────────────────── */

export function Tilt({
  children,
  className,
  max = 9,
}: {
  children: ReactNode;
  className?: string;
  /** Largest lean, in degrees. */
  max?: number;
}) {
  const fine = useFinePointer();
  const motion = useMotionAllowed();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 170, damping: 16, mass: 0.6 });
  const sry = useSpring(ry, { stiffness: 170, damping: 16, mass: 0.6 });
  const enabled = fine && motion;
  return (
    <m.div
      className={className}
      style={enabled ? { rotateX: srx, rotateY: sry, transformPerspective: 1200, transformStyle: "preserve-3d" } : undefined}
      onPointerMove={(e) => {
        if (!enabled) return;
        const rect = e.currentTarget.getBoundingClientRect();
        ry.set(((e.clientX - rect.left) / rect.width - 0.5) * 2 * max);
        rx.set(((e.clientY - rect.top) / rect.height - 0.5) * -2 * max);
      }}
      onPointerLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
    >
      {children}
    </m.div>
  );
}
