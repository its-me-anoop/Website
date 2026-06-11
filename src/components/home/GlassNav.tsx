"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const LINKS = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#about", label: "About" },
];

/**
 * Floating glass capsule nav, pinned top-centre over the aurora.
 * Desktop shows the section links inline; small screens get a
 * hamburger that drops a glass panel with the same links.
 */
export function GlassNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav
        aria-label="Primary"
        className="fixed left-1/2 top-[22px] z-50 flex -translate-x-1/2 items-center gap-3 rounded-full border border-white/[.09] bg-[rgba(9,11,18,.55)] py-2.5 pl-4 pr-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,.08),0_18px_50px_rgba(0,0,0,.45)] backdrop-blur-[22px] md:gap-7 md:pl-[26px]"
      >
        <a
          href="#top"
          className="inline-flex items-center gap-2.5 font-syne text-lg font-extrabold tracking-[-0.5px] text-frost"
        >
          <Image
            src="/flutterly-logo.png"
            alt=""
            width={26}
            height={26}
            priority
          />
          <span>
            Flutterly<span className="text-mint">*</span>
          </span>
        </a>
        <div className="hidden items-center gap-[22px] md:flex">
          {LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="font-jb text-[11px] uppercase tracking-[0.18em] text-frost/60 transition-colors duration-[250ms] hover:text-frost"
            >
              {label}
            </a>
          ))}
        </div>
        <a
          href="#contact"
          className="hidden rounded-full bg-frost px-[22px] py-2.5 font-grotesk text-sm font-bold text-obsidian transition-[transform,box-shadow] duration-[250ms] ease-[cubic-bezier(.3,1.4,.45,.9)] hover:scale-105 hover:shadow-[0_0_28px_rgba(61,242,196,.45)] active:scale-95 md:inline-block"
        >
          Start a project
        </a>
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[.14] bg-white/5 text-frost transition-colors duration-[250ms] hover:border-mint/50 md:hidden"
        >
          {open ? <X size={17} aria-hidden /> : <Menu size={17} aria-hidden />}
        </button>
      </nav>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="fixed left-1/2 top-[86px] z-50 flex w-[calc(100vw-32px)] max-w-[360px] -translate-x-1/2 flex-col overflow-hidden rounded-[26px] border border-white/[.09] bg-[rgba(9,11,18,.85)] p-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,.08),0_18px_50px_rgba(0,0,0,.55)] backdrop-blur-[26px] md:hidden"
        >
          {LINKS.map(({ href, label }, i) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`rounded-2xl px-5 py-4 font-jb text-xs uppercase tracking-[0.18em] text-frost/75 transition-colors duration-[250ms] hover:bg-white/5 hover:text-frost ${
                i > 0 ? "border-t border-white/[.06]" : ""
              }`}
            >
              <span className="mr-3 text-frost/30">0{i + 1}</span>
              {label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-2xl bg-frost px-5 py-4 text-center font-grotesk text-sm font-bold text-obsidian"
          >
            Start a project
          </a>
        </nav>
      )}
    </>
  );
}
