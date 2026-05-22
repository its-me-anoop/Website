"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * A premium multilayered space mesh background with Apple-style
 * slow-drifting organic radial glow gradients that animate smoothly.
 */
export function SpaceMeshBackground() {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-black">
        {/* Static high-fidelity glows */}
        <div className="absolute left-[10%] top-[15%] w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(0,113,227,0.04)_0%,transparent_70%)] blur-[140px]" />
        <div className="absolute right-[10%] top-[45%] w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle,rgba(48,209,88,0.025)_0%,transparent_70%)] blur-[160px]" />
        <div className="absolute left-[20%] bottom-[10%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(255,159,10,0.015)_0%,transparent_70%)] blur-[130px]" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-black">
      {/* Glow 1 - Premium Apple Cobalt Blue */}
      <motion.div
        animate={{
          x: [0, 80, -40, 0],
          y: [0, -60, 40, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-[5%] top-[10%] w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle,rgba(0,113,227,0.04)_0%,transparent_75%)] blur-[100px]"
      />

      {/* Glow 2 - Deep Emerald Green */}
      <motion.div
        animate={{
          x: [0, -100, 60, 0],
          y: [0, 80, -50, 0],
          scale: [1, 0.95, 1.08, 1],
        }}
        transition={{
          duration: 48,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute right-[5%] top-[35%] w-[900px] h-[900px] rounded-full bg-[radial-gradient(circle,rgba(48,209,88,0.025)_0%,transparent_75%)] blur-[120px]"
      />

      {/* Glow 3 - Amber / Gold Aurora */}
      <motion.div
        animate={{
          x: [0, 50, -60, 0],
          y: [0, 50, 80, 0],
          scale: [1, 1.05, 0.95, 1],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
        className="absolute left-[15%] bottom-[5%] w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(255,159,10,0.015)_0%,transparent_75%)] blur-[110px]"
      />
    </div>
  );
}
