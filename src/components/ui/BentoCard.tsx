import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export interface BentoCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  glowColor?: string;
  interactive?: boolean;
}

/**
 * A highly reusable, premium glassmorphic bento card.
 * Adheres to SOLID design principles:
 * - Single Responsibility: Handles outer card container aesthetics, layout transitions, and interactive highlights.
 * - Liskov Substitution / Open-Closed: Extends full Framer Motion Div props and HTML elements.
 */
export const BentoCard = React.forwardRef<HTMLDivElement, BentoCardProps>(
  ({ className, children, glowColor = "rgba(255, 255, 255, 0.05)", interactive = true, ...props }, ref) => {
    const [coords, setCoords] = React.useState({ x: 0, y: 0 });
    const [hovered, setHovered] = React.useState(false);
    const localRef = React.useRef<HTMLDivElement | null>(null);

    React.useImperativeHandle(ref, () => localRef.current!);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!interactive) return;
      const rect = e.currentTarget.getBoundingClientRect();
      setCoords({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    return (
      <motion.div
        ref={localRef}
        whileHover={interactive ? { y: -2 } : undefined}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => interactive && setHovered(true)}
        onMouseLeave={() => interactive && setHovered(false)}
        className={cn(
          "relative flex flex-col justify-between overflow-hidden rounded-[24px] border border-white/5 bg-[#09090b]/80 p-6 backdrop-blur-xl shadow-[var(--shadow)] transition-all duration-500 hover:border-white/10 hover:shadow-2xl group",
          className
        )}
        {...props}
      >
        {/* Apple Spotlight Glow */}
        {interactive && (
          <div
            className="pointer-events-none absolute inset-0 transition-opacity duration-300"
            style={{
              opacity: hovered ? 1 : 0,
              background: `radial-gradient(350px circle at ${coords.x}px ${coords.y}px, ${glowColor}, transparent 80%)`,
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
