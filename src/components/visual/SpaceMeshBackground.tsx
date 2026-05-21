"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * A premium multilayered Obsidian space mesh background.
 * Overlaps slow-drifting, organic radial HSL glow gradients (neon blues, emerald greens, and soft amber)
 * that animate smoothly in the background, creating depth.
 * Automatically switches to static layout when prefers-reduced-motion is detected.
 */
export function SpaceMeshBackground() {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-black">
        {/* Static high-fidelity glows */}
        <div className="absolute left-[10%] top-[15%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(0,113,227,0.05)_0%,transparent_70%)] blur-[120px]" />
        <div className="absolute right-[10%] top-[45%] w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(48,209,88,0.03)_0%,transparent_70%)] blur-[140px]" />
        <div className="absolute left-[20%] bottom-[10%] w-[550px] h-[550px] rounded-full bg-[radial-gradient(circle,rgba(255,159,10,0.02)_0%,transparent_70%)] blur-[110px]" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-black">
      {/* Glow 1 - Premium Apple Cobalt Blue */}
      <motion.div
        animate={{
          x: [0, 60, -30, 0],
          y: [0, -50, 30, 0],
          scale: [1, 1.12, 0.92, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-[5%] top-[10%] w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(0,113,227,0.05)_0%,transparent_75%)] blur-[90px]"
      />

      {/* Glow 2 - Deep Emerald Green */}
      <motion.div
        animate={{
          x: [0, -80, 50, 0],
          y: [0, 60, -40, 0],
          scale: [1, 0.92, 1.08, 1],
        }}
        transition={{
          duration: 36,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
        className="absolute right-[5%] top-[35%] w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle,rgba(48,209,88,0.035)_0%,transparent_75%)] blur-[110px]"
      />

      {/* Glow 3 - Amber / Gold Aurora */}
      <motion.div
        animate={{
          x: [0, 40, -50, 0],
          y: [0, 40, 60, 0],
          scale: [1, 1.08, 0.95, 1],
        }}
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
        className="absolute left-[15%] bottom-[5%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(255,159,10,0.02)_0%,transparent_75%)] blur-[100px]"
      />
    </div>
  );
}
