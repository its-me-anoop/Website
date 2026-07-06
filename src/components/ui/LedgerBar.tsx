"use client";

import { motion } from "framer-motion";
import { defaultEase } from "@/components/motion/Reveal";
import type { ReactNode } from "react";

type Cell = {
    label: string;
    value: ReactNode;
};

type LedgerBarProps = {
    cells: Cell[];
    className?: string;
};

/**
 * The editorial ledger bar. Shows small meta pairs (label + value) across
 * the width of the container, with a subtle stagger.
 */
export function LedgerBar({ cells, className }: LedgerBarProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: defaultEase, delay: 0.1 }}
            className={`grid gap-4 border-b border-border pb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-foreground-tertiary sm:text-[11px] ${
                className ?? ""
            }`}
            style={{
                gridTemplateColumns: `repeat(${cells.length}, minmax(0, 1fr))`,
            }}
        >
            {cells.map((cell, i) => (
                <motion.div
                    key={`${cell.label}-${i}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.6,
                        ease: defaultEase,
                        delay: 0.18 + i * 0.06,
                    }}
                    className="flex flex-col gap-1"
                >
                    <span className="text-foreground-tertiary">{cell.label}</span>
                    <span className="text-foreground-secondary">{cell.value}</span>
                </motion.div>
            ))}
        </motion.div>
    );
}

export function LiveDot({ label }: { label: string }) {
    return (
        <span className="inline-flex items-center gap-2 text-foreground">
            <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            {label}
        </span>
    );
}
