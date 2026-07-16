"use client";

import { useEffect, useState } from "react";
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

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <m.header
      className="sticky top-0 z-[120] bg-[color-mix(in_srgb,var(--at-canvas)_82%,transparent)] backdrop-blur-md"
      initial={reduce ? false : { y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      <div className="mx-auto flex h-[72px] w-full max-w-[1240px] items-center justify-between gap-4 px-5 sm:px-8">
        {/* Brand pill */}
        <a
          href="#top"
          aria-label="Flutterly — back to top"
          className="flex items-center gap-2.5 rounded-full bg-at-surface py-2 pl-3 pr-5 shadow-[0_1px_0_var(--at-line-2)] transition-transform duration-300 hover:-translate-y-0.5"
        >
          <Image src="/flutterly-logo.png" alt="" width={26} height={26} priority />
          <span className="text-[15px] font-semibold tracking-tight text-at-ink">
            Flutterly
          </span>
        </a>

        {/* Desktop links */}
        <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
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
            className="rounded-full bg-at-dark px-4.5 py-2 text-[13.5px] font-medium text-at-dark-ink transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-black"
          >
            Start a project
          </a>
        </nav>

        {/* Icon circles */}
        <div className="hidden items-center gap-2 md:flex">
          <a
            href={site.social.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Flutterly on GitHub"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-at-surface text-at-ink shadow-[0_1px_0_var(--at-line-2)] transition-transform duration-300 hover:-translate-y-0.5"
          >
            <Github size={16} aria-hidden />
          </a>
          <a
            href={`mailto:${site.email}`}
            aria-label={`Email ${site.email}`}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-at-surface text-at-ink shadow-[0_1px_0_var(--at-line-2)] transition-transform duration-300 hover:-translate-y-0.5"
          >
            <Mail size={16} aria-hidden />
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="atelier-mobile-menu"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-at-surface text-at-ink shadow-[0_1px_0_var(--at-line-2)] md:hidden"
        >
          {open ? <X size={18} aria-hidden /> : <Menu size={18} aria-hidden />}
        </button>
      </div>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open && (
          <m.nav
            id="atelier-mobile-menu"
            aria-label="Mobile"
            className="mx-4 mb-4 grid gap-1 rounded-3xl bg-at-surface p-4 shadow-[0_24px_60px_-24px_rgba(34,33,31,0.35)] md:hidden"
            initial={reduce ? false : { opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            {links.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex items-baseline gap-3 rounded-2xl px-4 py-3 text-[17px] font-medium text-at-ink transition-colors hover:bg-at-panel"
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
              className="mt-2 rounded-full bg-at-dark px-5 py-3 text-center text-[15px] font-medium text-at-dark-ink"
            >
              Start a project
            </a>
          </m.nav>
        )}
      </AnimatePresence>
    </m.header>
  );
}
