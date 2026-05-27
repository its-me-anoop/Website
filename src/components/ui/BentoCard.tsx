"use client";

import React from "react";
import { motion, HTMLMotionProps, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface BentoCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  glowColor?: string;
  interactive?: boolean;
}

/**
 * Glassmorphic bento card with spotlight tracking and lift on hover.
 */
export const BentoCard = React.forwardRef<HTMLDivElement, BentoCardProps>(
  (
    { className, children, glowColor = "rgba(99, 102, 241, 0.18)", interactive = true, ...props },
    ref
  ) => {
    const [coords, setCoords] = React.useState({ x: 0, y: 0 });
    const [hovered, setHovered] = React.useState(false);
    const localRef = React.useRef<HTMLDivElement | null>(null);
    const shouldReduceMotion = useReducedMotion();

    React.useImperativeHandle(ref, () => localRef.current!);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!interactive) return;
      const rect = e.currentTarget.getBoundingClientRect();
      setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    return (
      <motion.div
        ref={localRef}
        whileHover={
          interactive && !shouldReduceMotion ? { y: -4, scale: 1.005 } : undefined
        }
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => interactive && setHovered(true)}
        onMouseLeave={() => interactive && setHovered(false)}
        className={cn(
          "relative flex flex-col justify-between overflow-hidden rounded-[24px] border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-xl transition-all duration-500 hover:border-white/[0.14] hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] group",
          className
        )}
        {...props}
      >
        {/* Spotlight Glow */}
        {interactive && (
          <motion.div
            className="pointer-events-none absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{
              background: `radial-gradient(420px circle at ${coords.x}px ${coords.y}px, ${glowColor}, transparent 65%)`,
            }}
            aria-hidden="true"
          />
        )}
        {children}
      </motion.div>
    );
  }
);

BentoCard.displayName = "BentoCard";
