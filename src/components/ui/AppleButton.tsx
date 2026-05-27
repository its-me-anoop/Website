"use client";

import React, { useRef } from "react";
import { motion, HTMLMotionProps, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface AppleButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  variant?: "primary" | "secondary" | "glass" | "ghost";
  size?: "sm" | "md" | "lg";
  magnetic?: boolean;
  children: React.ReactNode;
}

/**
 * Premium interactive button:
 *  • Magnetic hover (subtle cursor-attraction)
 *  • Gradient or glass variants
 *  • Spring physics, reduced-motion aware
 */
export const AppleButton = React.forwardRef<HTMLButtonElement, AppleButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      magnetic = true,
      children,
      onMouseMove,
      onMouseLeave,
      ...props
    },
    ref
  ) => {
    const shouldReduceMotion = useReducedMotion();
    const innerRef = useRef<HTMLButtonElement | null>(null);

    const setRefs = (node: HTMLButtonElement | null) => {
      innerRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
    };

    const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
      onMouseMove?.(e);
      if (shouldReduceMotion || !magnetic) return;
      const el = innerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = e.clientX - rect.left - rect.width / 2;
      const cy = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${cx * 0.15}px, ${cy * 0.2}px)`;
    };

    const handleLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
      onMouseLeave?.(e);
      const el = innerRef.current;
      if (el) el.style.transform = "translate(0,0)";
    };

    const sizes: Record<"sm" | "md" | "lg", string> = {
      sm: "min-h-9 px-4 py-1.5 text-[12px]",
      md: "min-h-11 px-5 py-2.5 text-[13px]",
      lg: "min-h-12 px-7 py-3 text-[14px]",
    };

    const base =
      "relative inline-flex items-center justify-center gap-2 rounded-full font-sans font-semibold tracking-[-0.01em] cursor-pointer select-none overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand will-change-transform transition-[transform,box-shadow] duration-300";

    const variants: Record<NonNullable<AppleButtonProps["variant"]>, string> = {
      primary:
        "text-white shadow-[0_8px_28px_-6px_rgba(99,102,241,0.55),inset_0_1px_0_rgba(255,255,255,0.18)] bg-[linear-gradient(135deg,#6366f1_0%,#a855f7_50%,#ec4899_100%)] bg-[length:200%_100%] hover:bg-[position:100%_0] hover:shadow-[0_12px_36px_-6px_rgba(168,85,247,0.7),inset_0_1px_0_rgba(255,255,255,0.22)]",
      secondary:
        "bg-white text-[#06070d] hover:bg-white/95 shadow-[0_4px_18px_rgba(255,255,255,0.18)]",
      glass:
        "bg-white/[0.06] hover:bg-white/[0.10] backdrop-blur-md text-white border border-white/[0.10] hover:border-white/[0.18]",
      ghost:
        "bg-transparent text-white hover:bg-white/[0.05] border border-transparent hover:border-white/[0.08]",
    };

    return (
      <motion.button
        ref={setRefs}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className={cn(base, sizes[size], variants[variant], className)}
        {...props}
      >
        {variant === "primary" && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
            }}
          />
        )}
        <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
      </motion.button>
    );
  }
);

AppleButton.displayName = "AppleButton";
