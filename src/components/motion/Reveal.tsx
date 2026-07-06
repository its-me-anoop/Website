"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef, type ReactNode, type CSSProperties } from "react";

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1.0];

export const defaultEase = ease;

export const fadeUp: Variants = {
    hidden: { opacity: 0, y: 22 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease },
    },
};

export const stagger: Variants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.08, delayChildren: 0.05 },
    },
};

export const scaleIn: Variants = {
    hidden: { opacity: 0, scale: 0.94 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.9, ease } },
};

type RevealProps = {
    children: ReactNode;
    delay?: number;
    y?: number;
    duration?: number;
    once?: boolean;
    as?: "div" | "section" | "article" | "span" | "li" | "figure";
    className?: string;
    amount?: number | "some" | "all";
    id?: string;
    style?: CSSProperties;
};

export function Reveal({
    children,
    delay = 0,
    y = 24,
    duration = 0.8,
    once = true,
    as = "div",
    amount = 0.25,
    className,
    id,
    style,
}: RevealProps) {
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref, { once, amount });

    const Component = motion[as] as typeof motion.div;

    return (
        <Component
            ref={ref as React.Ref<HTMLDivElement>}
            initial={{ opacity: 0, y }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
            transition={{ duration, ease, delay }}
            className={className}
            id={id}
            style={style}
        >
            {children}
        </Component>
    );
}

type MaskedLinesProps = {
    text: string;
    className?: string;
    delay?: number;
    stagger?: number;
};

/**
 * Splits text into words and animates each upward from an invisible mask.
 * Used for editorial hero headlines.
 */
export function MaskedLines({
    text,
    className,
    delay = 0,
    stagger = 0.06,
}: MaskedLinesProps) {
    const words = text.split(" ");
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, amount: 0.3 });

    return (
        <span ref={ref} className={className}>
            {words.map((word, i) => (
                <span
                    key={`${word}-${i}`}
                    className="relative inline-block overflow-hidden pb-[0.05em]"
                >
                    <motion.span
                        className="inline-block pr-[0.25em]"
                        initial={{ y: "105%" }}
                        animate={inView ? { y: 0 } : { y: "105%" }}
                        transition={{
                            duration: 0.95,
                            ease,
                            delay: delay + i * stagger,
                        }}
                    >
                        {word}
                    </motion.span>
                </span>
            ))}
        </span>
    );
}
