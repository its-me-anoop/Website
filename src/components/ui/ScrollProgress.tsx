"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * A thin fixed bar at the very top that tracks scroll progress.
 * Editorial but subtle — reads like a page-reading indicator on a magazine.
 */
export function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 120,
        damping: 28,
        mass: 0.25,
        restDelta: 0.001,
    });

    return (
        <motion.div
            aria-hidden
            style={{ scaleX }}
            className="pointer-events-none fixed inset-x-0 top-0 z-[110] h-[2px] origin-left bg-accent"
        />
    );
}
