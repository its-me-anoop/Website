"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { Menu, Phone, X } from "lucide-react";
import { site } from "@/lib/site";
import { EASE } from "./primitives";

const links = [
  { href: "/#services", label: "Services" },
  { href: "/gp-websites", label: "GP practices" },
  { href: "/care-home-websites", label: "Care homes" },
  { href: "/packages", label: "Packages" },
  { href: "/#work", label: "Work" },
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
      className="bl-frost sticky top-0 z-[120] border-b border-bl-line"
      initial={reduce ? false : { y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      <div className="mx-auto flex h-[72px] w-full max-w-[1240px] items-center justify-between gap-3 px-5 sm:px-8">
        <Link
          href="/"
          aria-label="Flutterly — home"
          className="flex items-center gap-2.5 transition-transform duration-300 hover:-translate-y-0.5"
        >
          <Image src="/flutterly-logo.png" alt="" width={30} height={30} priority />
          <span className="text-[16px] font-semibold tracking-tight text-bl-ink">
            Flutterly
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-6 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[14px] font-medium text-bl-ink-soft transition-colors duration-300 hover:text-bl-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <a
            href={`tel:${site.phone}`}
            className="hidden items-center gap-2 text-[14px] font-medium text-bl-ink transition-colors duration-300 hover:text-bl-teal xl:flex"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-bl-teal-soft text-bl-teal">
              <Phone size={14} aria-hidden />
            </span>
            {site.phoneDisplay}
          </a>
          <a
            href={`mailto:${site.email}`}
            className="rounded-full bg-bl-teal px-4 py-2 text-[13.5px] font-medium text-white shadow-[0_10px_26px_-12px_rgba(14,122,99,0.65)] transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-bl-teal-hover sm:px-5 sm:py-2.5"
          >
            Get in touch
          </a>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="bloom-mobile-menu"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-bl-line-2 bg-bl-surface text-bl-ink lg:hidden"
          >
            {open ? <X size={18} aria-hidden /> : <Menu size={18} aria-hidden />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <m.nav
            id="bloom-mobile-menu"
            aria-label="Mobile"
            className="bl-card mx-4 mb-4 grid gap-1 rounded-3xl border border-bl-line bg-bl-surface p-4 lg:hidden"
            initial={reduce ? false : { opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.18, ease: EASE }}
          >
            {links.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex items-baseline gap-3 rounded-2xl px-4 py-3 text-[17px] font-medium text-bl-ink transition-colors hover:bg-bl-band"
              >
                <span className="text-[11px] tabular-nums text-bl-muted">
                  0{i + 1}
                </span>
                {link.label}
              </Link>
            ))}
            <a
              href={`tel:${site.phone}`}
              onClick={() => setOpen(false)}
              className="flex items-baseline gap-3 rounded-2xl px-4 py-3 text-[17px] font-medium text-bl-ink transition-colors hover:bg-bl-band"
            >
              <span className="text-[11px] tabular-nums text-bl-muted">06</span>
              {site.phoneDisplay}
            </a>
            <Link
              href="/free-audit"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-bl-teal px-5 py-3 text-center text-[15px] font-medium text-white"
            >
              Get your free website audit
            </Link>
          </m.nav>
        )}
      </AnimatePresence>
    </m.header>
  );
}
