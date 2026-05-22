import React from "react";
import { motion, HTMLMotionProps, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface AppleButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  variant?: "primary" | "secondary" | "glass";
  children: React.ReactNode;
}

/**
 * A highly interactive, premium button designed in the Apple product aesthetic
 * with smooth spring physics and tactile feedback.
 */
export const AppleButton = React.forwardRef<HTMLButtonElement, AppleButtonProps>(
  ({ className, variant = "primary", children, ...props }, ref) => {
    const shouldReduceMotion = useReducedMotion();
    
    const baseStyle =
      "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full px-5 py-2.5 font-sans font-medium text-[13px] tracking-wide transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] cursor-pointer select-none";

    const variants = {
      primary: "bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white shadow-lg shadow-[var(--accent)]/15",
      secondary: "bg-white/[0.06] hover:bg-white/[0.1] text-white border border-white/[0.06] hover:border-white/[0.1]",
      glass: "bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-md text-white border border-white/[0.06] hover:border-white/[0.1]",
    };

    return (
      <motion.button
        ref={ref}
        whileHover={shouldReduceMotion ? undefined : { y: -1, scale: 1.02 }}
        whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25,
        }}
        className={cn(baseStyle, variants[variant], className)}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

AppleButton.displayName = "AppleButton";
