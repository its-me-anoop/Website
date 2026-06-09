"use client";

import React from "react";
import { motion, HTMLMotionProps, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  /** Visual style. `primary` is the Apple-blue pill. */
  variant?: "primary" | "dark" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

const sizes: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "h-9 px-4 text-[13px]",
  md: "h-11 px-5 text-[14px]",
  lg: "h-12 px-7 text-[15px]",
};

const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-accent text-accent-ink shadow-[0_8px_24px_-8px_rgba(0,113,227,0.5)] hover:bg-accent-hover",
  dark: "bg-ink text-white hover:bg-black",
  outline:
    "border border-line-2 bg-surface text-ink hover:border-line-3 hover:bg-surface-2",
  ghost: "text-accent hover:bg-accent-soft",
};

/**
 * Primary interaction primitive: a calm, Apple-style pill button with
 * spring tap feedback and a soft hover lift. Reduced-motion aware.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const reduce = useReducedMotion();

    return (
      <motion.button
        ref={ref}
        whileHover={reduce ? undefined : { y: -1 }}
        whileTap={reduce ? undefined : { scale: 0.97 }}
        transition={{ type: "spring", stiffness: 420, damping: 26 }}
        className={cn(
          "relative inline-flex items-center justify-center gap-2 rounded-full font-sans font-medium tracking-[-0.01em] cursor-pointer select-none transition-[background-color,border-color,box-shadow] duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
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
