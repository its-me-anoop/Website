import React from "react";
import { cn } from "@/lib/utils";

interface PhoneFrameProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * A lightweight, CSS-only modern smartphone bezel (titanium rails + dynamic
 * island) used to frame in-product UI demos. Maintains a 9:19.5 aspect ratio.
 */
export function PhoneFrame({ children, className }: PhoneFrameProps) {
  return (
    <div
      className={cn("relative mx-auto w-full max-w-[320px] select-none", className)}
    >
      <div className="relative w-full pb-[214%]">
        <div className="absolute inset-0">
          {/* Titanium outer rail */}
          <div className="pointer-events-none absolute inset-0 z-10 rounded-[54px] border-[7px] border-[#2c2c30] bg-[#1a1a1e] shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)] outline outline-1 outline-black/50">
            {/* Inner bezel */}
            <div className="absolute inset-[3px] h-[calc(100%-6px)] w-[calc(100%-6px)] overflow-hidden rounded-[47px] border-[3px] border-black bg-black">
              <div className="pointer-events-auto absolute inset-0 overflow-hidden rounded-[43px] bg-black">
                {children}
              </div>
            </div>
          </div>

          {/* Dynamic island */}
          <div className="absolute left-1/2 top-[19px] z-20 h-[34px] w-[112px] -translate-x-1/2 rounded-full bg-black" />

          {/* Side rails */}
          <div className="absolute -left-[9px] top-[104px] h-[26px] w-[3px] rounded-l bg-[#2c2c30]" />
          <div className="absolute -left-[9px] top-[146px] h-[56px] w-[3px] rounded-l bg-[#2c2c30]" />
          <div className="absolute -left-[9px] top-[214px] h-[56px] w-[3px] rounded-l bg-[#2c2c30]" />
          <div className="absolute -right-[9px] top-[184px] h-[88px] w-[3px] rounded-r bg-[#2c2c30]" />
        </div>
      </div>
    </div>
  );
}
