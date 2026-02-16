import React from "react";
import { cn } from "@/lib/utils";

interface Iphone17ProFrameProps {
    children: React.ReactNode;
    className?: string;
}

export function Iphone17ProFrame({ children, className }: Iphone17ProFrameProps) {
    return (
        <div
            className={cn(
                "relative aspect-[9/19.5] w-full max-w-[320px] mx-auto select-none",
                className
            )}
        >
            {/* Outer Titanium Frame */}
            <div className="absolute inset-0 rounded-[55px] shadow-xl bg-[#2a2a2a] border-[6px] border-[#3a3a3a] outline outline-1 outline-black/40">
                {/* Inner Bezel */}
                <div className="absolute inset-[2px] rounded-[48px] bg-black border-[3px] border-black overflow-hidden h-[calc(100%-4px)] w-[calc(100%-4px)]">
                    {/* Screen Content */}
                    <div className="relative h-full w-full bg-black overflow-hidden rounded-[44px]">
                        {children}
                    </div>
                </div>
            </div>

            {/* Dynamic Island */}
            <div className="absolute top-[20px] left-1/2 -translate-x-1/2 w-[120px] h-[35px] bg-black rounded-full z-20 pointer-events-none" />

            {/* Side Buttons - Left */}
            <div className="absolute top-[100px] -left-[9px] w-[3px] h-[26px] bg-[#2a2a2a] rounded-l-md" /> {/* Mute switch */}
            <div className="absolute top-[140px] -left-[9px] w-[3px] h-[60px] bg-[#2a2a2a] rounded-l-md" /> {/* Volume Up */}
            <div className="absolute top-[210px] -left-[9px] w-[3px] h-[60px] bg-[#2a2a2a] rounded-l-md" /> {/* Volume Down */}

            {/* Side Buttons - Right */}
            <div className="absolute top-[180px] -right-[9px] w-[3px] h-[90px] bg-[#2a2a2a] rounded-r-md" /> {/* Power */}
        </div>
    );
}
