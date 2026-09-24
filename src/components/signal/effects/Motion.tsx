"use client";

import type { ReactNode } from "react";
import { m } from "framer-motion";
import { cn } from "@/lib/utils";
import { useMotionAllowed } from "./hooks";

/** Shared ease for entrances: quick start, long settle. */
export const EASE = [0.2, 0.8, 0.2, 1] as const;

/** Short rise when a block scrolls into view. Static for reduced motion. */
export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li" | "article" | "figure" | "section";
}) {
  const motion = useMotionAllowed();
  const Tag = m[as] as typeof m.div;
  return (
    <Tag
      className={cn("s-reveal", className)}
      initial={{ y: 16, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: motion ? 0.7 : 0, ease: EASE, delay: motion ? delay : 0 }}
    >
      {children}
    </Tag>
  );
}
