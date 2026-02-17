"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface SafariBrowserFrameProps {
    children: React.ReactNode;
    className?: string;
    url?: string;
}

export function SafariBrowserFrame({ children, className, url = "flutterly.co.uk" }: SafariBrowserFrameProps) {
    return (
        <div className={cn("relative w-full rounded-xl overflow-hidden shadow-xl shadow-black/20 bg-surface border border-white/[0.06] flex flex-col", className)}>
            {/* Toolbar */}
            <div className="flex items-center gap-4 px-4 py-2.5 bg-surface/90 backdrop-blur-sm border-b border-white/[0.04] shrink-0">
                <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-white/[0.08]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-white/[0.08]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-white/[0.08]" />
                </div>

                <div className="flex-1 flex justify-center">
                    <div className="flex items-center justify-center w-full max-w-[240px] bg-white/[0.04] rounded-md py-1 px-3 text-[11px] text-foreground-tertiary font-medium border border-white/[0.04] truncate">
                        {url}
                    </div>
                </div>

                <div className="w-10" />
            </div>

            {/* Content */}
            <div className="relative w-full flex-1 bg-background min-h-0">
                {children}
            </div>
        </div>
    );
}
