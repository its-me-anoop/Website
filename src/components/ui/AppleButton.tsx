import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export interface AppleButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  variant?: "primary" | "secondary" | "glass";
  children: React.ReactNode;
}

/**
 * A highly interactive, premium button designed in the Apple product aesthetic.
 * Adheres to SOLID design principles (Single Responsibility, Liskov Substitution).
 */
export const AppleButton = React.forwardRef<HTMLButtonElement, AppleButtonProps>(
  ({ className, variant = "primary", children, ...props }, ref) => {
    const baseStyle =
      "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full px-5 py-2.5 font-sans font-medium text-[13px] tracking-wide transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] cursor-pointer select-none";

    const variants = {
      primary: "bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white shadow-lg shadow-[var(--accent-muted)]",
      secondary: "bg-white/10 hover:bg-white/15 text-white border border-white/5",
      glass: "bg-white/5 hover:bg-white/10 backdrop-blur-md text-white border border-white/10",
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.98 }}
        className={cn(baseStyle, variants[variant], className)}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

AppleButton.displayName = "AppleButton";
