"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Multilayered ambient gradient mesh.
 * Electric indigo, violet, and fuchsia drift slowly across a deep slate canvas.
 */
export function SpaceMeshBackground() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[#06070d]"
    >
      {/* Subtle dot grid texture */}
      <div className="absolute inset-0 dot-grid opacity-[0.45]" />

      {/* Indigo aurora */}
      <motion.div
        className="absolute left-[-10%] top-[-10%] h-[900px] w-[900px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(99,102,241,0.16) 0%, rgba(99,102,241,0.04) 35%, transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={
          shouldReduceMotion
            ? undefined
            : { x: [0, 80, -40, 0], y: [0, -60, 40, 0], scale: [1, 1.08, 0.94, 1] }
        }
        transition={{ duration: 42, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Violet aurora */}
      <motion.div
        className="absolute right-[-10%] top-[20%] h-[1000px] w-[1000px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(168,85,247,0.13) 0%, rgba(168,85,247,0.03) 35%, transparent 70%)",
          filter: "blur(80px)",
        }}
        animate={
          shouldReduceMotion
            ? undefined
            : { x: [0, -100, 60, 0], y: [0, 80, -50, 0], scale: [1, 0.95, 1.1, 1] }
        }
        transition={{ duration: 52, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Fuchsia / cyan accent at the bottom */}
      <motion.div
        className="absolute left-[15%] bottom-[-15%] h-[800px] w-[800px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(236,72,153,0.10) 0%, rgba(34,211,238,0.04) 35%, transparent 70%)",
          filter: "blur(80px)",
        }}
        animate={
          shouldReduceMotion
            ? undefined
            : { x: [0, 50, -60, 0], y: [0, 50, 80, 0], scale: [1, 1.05, 0.92, 1] }
        }
        transition={{ duration: 38, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      />

      {/* Top sheen */}
      <div
        className="absolute inset-x-0 top-0 h-[60vh]"
        style={{
          background:
            "linear-gradient(180deg, rgba(99,102,241,0.06) 0%, transparent 100%)",
        }}
      />
    </div>
  );
}
