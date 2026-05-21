import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion, MotionValue, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export interface TiltParallaxCardProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: (props: {
    xOffset: MotionValue<number>;
    yOffset: MotionValue<number>;
    xOffsetInverse: MotionValue<number>;
    yOffsetInverse: MotionValue<number>;
  }) => React.ReactNode;
  glowColor?: string;
  maxTilt?: number;
  maxParallax?: number;
  interactive?: boolean;
}

/**
 * A state-of-the-art interactive bento card component with:
 * 1. Coordinates-tracked spotlight glow.
 * 2. 3D spring-damped tilt perspective relative to cursor.
 * 3. Exposed parallax motion offsets via a render-prop pattern.
 * 4. Automatic accessibility bypass for prefers-reduced-motion.
 */
export function TiltParallaxCard({
  className,
  children,
  glowColor = "rgba(255, 255, 255, 0.05)",
  maxTilt = 6,
  maxParallax = 12,
  interactive = true,
  ...props
}: TiltParallaxCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  // Mouse normalized motion values (0 to 1, centered at 0.5)
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Map normalized coordinate to tilt angles
  const rotateX = useTransform(springY, [0, 1], [maxTilt, -maxTilt]);
  const rotateY = useTransform(springX, [0, 1], [-maxTilt, maxTilt]);

  // Parallax shifts
  const xOffset = useTransform(springX, [0, 1], [-maxParallax, maxParallax]);
  const yOffset = useTransform(springY, [0, 1], [-maxParallax, maxParallax]);

  // Inverse parallax shifts
  const xOffsetInverse = useTransform(springX, [0, 1], [maxParallax, -maxParallax]);
  const yOffsetInverse = useTransform(springY, [0, 1], [maxParallax, -maxParallax]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || !interactive) return;
    const rect = ref.current.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;

    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });

    const normX = (e.clientX - rect.left) / w;
    const normY = (e.clientY - rect.top) / h;
    mouseX.set(normX);
    mouseY.set(normY);
  };

  const handleMouseEnter = () => {
    if (interactive) setHovered(true);
  };

  const handleMouseLeave = () => {
    if (interactive) {
      setHovered(false);
      mouseX.set(0.5);
      mouseY.set(0.5);
    }
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: shouldReduceMotion || !interactive ? 0 : rotateX,
        rotateY: shouldReduceMotion || !interactive ? 0 : rotateY,
        transformPerspective: 1200,
        transformStyle: "preserve-3d",
      }}
      whileHover={shouldReduceMotion || !interactive ? undefined : { y: -3 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "relative flex flex-col justify-between overflow-hidden rounded-[24px] border border-white/5 bg-[#09090b]/80 p-6 backdrop-blur-xl shadow-[var(--shadow)] transition-all duration-500 hover:border-white/10 hover:shadow-2xl group",
        className
      )}
      {...props}
    >
      {/* Dynamic Cursor Spotlight Layer */}
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

      {children({ xOffset, yOffset, xOffsetInverse, yOffsetInverse })}
    </motion.div>
  );
}
