"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { Github, Mail, Menu, X } from "lucide-react";
import { site } from "@/lib/site";
import { EASE } from "./primitives";

const links = [
  { href: "#featured", label: "Featured" },
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
] as const;

export function Nav() {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const toggleRef = useRef<HTMLButtonElement>(null);

  /* Escape closes the sheet and returns focus to the toggle so
     keyboard users aren't dropped to <body>. */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <m.header
      className="sticky top-0 z-[120] bg-[color-mix(in_srgb,var(--at-canvas)_72%,transparent)] backdrop-blur-md"
      initial={reduce ? false : { y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      <div className="mx-auto flex h-[72px] w-full max-w-[1240px] items-center justify-between gap-3 px-5 sm:px-8">
        {/* Brand pill */}
        <a
          href="#top"
          aria-label="Flutterly — back to top"
          className="liquid flex items-center gap-2.5 rounded-full py-2 pl-3 pr-5 transition-transform duration-300 hover:-translate-y-0.5"
        >
          <Image src="/flutterly-logo.png" alt="" width={26} height={26} priority />
          <span className="text-[15px] font-semibold tracking-tight">
            Flutterly
          </span>
        </a>

        {/* Icon circles come before the desktop nav in the DOM so the
            first mailto link on the page is one that is visible at every
            viewport (the Mail circle); flex `order` keeps them on the
            right visually. */}
        <div className="order-3 flex items-center gap-2">
          <a
            href={site.social.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Flutterly on GitHub"
            className="liquid hidden h-10 w-10 items-center justify-center rounded-full transition-transform duration-300 hover:-translate-y-0.5 md:flex"
          >
            <Github size={16} aria-hidden />
          </a>
          <a
            href={`mailto:${site.email}`}
            aria-label={`Email ${site.email}`}
            className="liquid flex h-10 w-10 items-center justify-center rounded-full transition-transform duration-300 hover:-translate-y-0.5"
          >
            <Mail size={16} aria-hidden />
          </a>

          {/* Mobile toggle */}
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls={open ? "atelier-mobile-menu" : undefined}
            className="liquid flex h-10 w-10 items-center justify-center rounded-full md:hidden"
          >
            {open ? <X size={18} aria-hidden /> : <Menu size={18} aria-hidden />}
          </button>
        </div>

        {/* Desktop links */}
        <nav
          aria-label="Primary"
          className="order-2 hidden items-center gap-7 md:flex"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[14px] font-medium text-at-ink-soft transition-colors duration-300 hover:text-at-ink"
            >
              {link.label}
            </a>
          ))}
          <a
            href={`mailto:${site.email}`}
            className="liquid-dark rounded-full px-4.5 py-2 text-[13.5px] font-medium transition-[filter,transform] duration-300 hover:-translate-y-0.5 hover:brightness-110"
          >
            Start a project
          </a>
        </nav>
      </div>

      {/* Mobile sheet — liquid glass panel */}
      <AnimatePresence>
        {open && (
          <m.nav
            id="atelier-mobile-menu"
            aria-label="Mobile"
            className="liquid mx-4 mb-4 grid gap-1 rounded-3xl p-4 md:hidden"
            initial={reduce ? false : { opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.18, ease: EASE }}
          >
            {links.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex items-baseline gap-3 rounded-2xl px-4 py-3 text-[17px] font-medium text-at-ink transition-colors hover:bg-white/40"
              >
                <span className="text-[11px] tabular-nums text-at-muted">
                  0{i + 1}
                </span>
                {link.label}
              </a>
            ))}
            <a
              href={`mailto:${site.email}`}
              onClick={() => setOpen(false)}
              className="liquid-dark mt-2 rounded-full px-5 py-3 text-center text-[15px] font-medium"
            >
              Start a project
            </a>
          </m.nav>
        )}
      </AnimatePresence>
    </m.header>
  );
}
