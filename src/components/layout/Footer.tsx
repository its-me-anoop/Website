import React from "react";

/**
 * Technical Footer redesigned using Apple Pro conventions.
 * Features high-precision spacing, subtle borders, and smooth micro-interactions.
 */
export function Footer() {
  return (
    <footer className="bg-[#000000] text-zinc-500 font-sans text-[11px] overflow-hidden">
      <div className="mx-auto w-full max-w-[1240px] px-5 py-14 md:px-7">
        {/* Sleek top rule */}
        <div className="border-t border-white/5 pt-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-1">
            <span className="font-semibold text-zinc-400 font-sans tracking-tight text-[12px]">
              Flutterly Ltd
            </span>
            <span className="text-zinc-600 font-mono uppercase tracking-[0.16em] text-[9px]">
              © 2026 · All Rights Reserved
            </span>
          </div>

          {/* Secondary specs navigation */}
          <div className="flex flex-wrap gap-x-8 gap-y-2 font-mono uppercase tracking-[0.2em] text-[9.5px]">
            <a
              href="#work"
              className="transition-colors duration-300 hover:text-[var(--accent)] hover:underline hover:underline-offset-4"
            >
              Work
            </a>
            <a
              href="#practice"
              className="transition-colors duration-300 hover:text-[var(--accent)] hover:underline hover:underline-offset-4"
            >
              Practice
            </a>
            <a
              href="#oss"
              className="transition-colors duration-300 hover:text-[var(--accent)] hover:underline hover:underline-offset-4"
            >
              Open Source
            </a>
            <a
              href="#studio"
              className="transition-colors duration-300 hover:text-[var(--accent)] hover:underline hover:underline-offset-4"
            >
              Studio
            </a>
          </div>

          <div className="text-zinc-600 font-mono uppercase tracking-[0.2em] text-[9.5px] md:text-right">
            Signed, the studio —{" "}
            <span className="text-zinc-400 font-sans tracking-tight font-semibold normal-case">
              Anoop Jose
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
