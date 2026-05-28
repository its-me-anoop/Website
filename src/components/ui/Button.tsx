"use client";

import React, { useRef } from "react";
import { motion, HTMLMotionProps, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  /** Visual style. `signal` is the citron primary CTA. */
  variant?: "signal" | "outline" | "ghost" | "solid";
  size?: "sm" | "md" | "lg";
  /** Subtle cursor-attraction on hover (auto-disabled for reduced motion). */
  magnetic?: boolean;
  children: React.ReactNode;
}

const sizes: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "h-9 px-4 text-[12.5px]",
  md: "h-11 px-5 text-[13.5px]",
  lg: "h-13 px-7 text-[14.5px] py-3.5",
};

const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
  signal:
    "bg-signal text-signal-ink shadow-[0_10px_34px_-10px_var(--signal-glow)] hover:bg-signal-soft",
  solid: "bg-ink text-obsidian hover:bg-white",
  outline:
    "border border-line-2 bg-white/[0.02] text-ink backdrop-blur-md hover:border-line-3 hover:bg-white/[0.05]",
  ghost: "text-ink-2 hover:bg-white/[0.05] hover:text-ink",
};

/**
 * Primary interaction primitive for the studio site.
 *  • Citron "signal" / solid / outline / ghost variants
 *  • Optional magnetic hover that nudges the button toward the cursor
 *  • Spring tap feedback, fully reduced-motion aware
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "signal",
      size = "md",
      magnetic = true,
      children,
      onMouseMove,
      onMouseLeave,
      ...props
    },
    ref
  ) => {
    const reduce = useReducedMotion();
    const innerRef = useRef<HTMLButtonElement | null>(null);

    const setRefs = (node: HTMLButtonElement | null) => {
      innerRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref)
        (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
    };

    const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
      onMouseMove?.(e);
      if (reduce || !magnetic) return;
      const el = innerRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      el.style.transform = `translate(${x * 0.16}px, ${y * 0.22}px)`;
    };

    const handleLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
      onMouseLeave?.(e);
      if (innerRef.current) innerRef.current.style.transform = "translate(0,0)";
    };

    return (
      <motion.button
        ref={setRefs}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        whileTap={reduce ? undefined : { scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className={cn(
          "relative inline-flex items-center justify-center gap-2 rounded-full font-sans font-semibold tracking-[-0.01em] cursor-pointer select-none transition-[transform,background-color,border-color,box-shadow] duration-300 will-change-transform focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal",
          sizes[size],
          variants[variant],
          className
        )}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
