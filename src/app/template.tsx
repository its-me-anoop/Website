"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1.0];

/**
 * Re-mounted on every route change in App Router.
 * Gives a subtle entry animation to every page — a faint blur + lift, not a
 * generic fade.
 */
export default function Template({ children }: { children: ReactNode }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, ease }}
        >
            {children}
        </motion.div>
    );
}
