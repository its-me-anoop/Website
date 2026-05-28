"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Route transition wrapper. `template.tsx` re-mounts on every navigation, so a
 * plain enter animation gives each page a soft blur-and-rise reveal. Disabled
 * for reduced-motion users, who get the content immediately.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();

  if (reduce) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
