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
        <div className={cn("relative w-full rounded-xl overflow-hidden shadow-2xl bg-zinc-900 border border-white/10", className)}>
            {/* Browser Toolbar */}
            <div className="flex items-center gap-4 px-4 py-3 bg-zinc-900/90 backdrop-blur border-b border-white/5 disabled:opacity-50">
                {/* Window Controls */}
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
                    <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
                    <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
                </div>

                {/* Address Bar */}
                <div className="flex-1 flex justify-center">
                    <div className="flex items-center justify-center w-full max-w-md bg-zinc-800/50 rounded-md py-1 px-3 text-xs text-zinc-400 font-medium border border-white/5 truncate">
                        <span className="opacity-50 mr-2">🔒</span>
                        {url}
                    </div>
                </div>

                {/* Empty Spacer to balance window controls */}
                <div className="w-14" />
            </div>

            {/* Content Area */}
            <div className="relative w-full bg-zinc-950">
                {children}
            </div>
        </div>
    );
}
