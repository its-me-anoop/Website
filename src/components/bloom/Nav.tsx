"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { site } from "@/lib/site";
import { EASE } from "./primitives";

const links = [
  { href: "/services", label: "Services" },
  { href: "/gp-websites", label: "GP practices" },
  { href: "/care-home-websites", label: "Care homes" },
  { href: "/business-email", label: "Business email" },
  { href: "/social-media-marketing", label: "Social campaigns" },
  { href: "/#work", label: "Projects" },
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
      <div className="mx-auto flex h-[68px] w-full max-w-[1240px] items-center justify-between gap-3 px-5 sm:h-[76px] sm:px-8">
        <Link
          href="/"
          aria-label="Flutterly: home"
          className="flex items-center gap-2.5 transition-transform duration-300 hover:-translate-y-0.5"
        >
          <Image src="/flutterly-logo.png" alt="" width={30} height={30} priority />
          <span className="leading-none text-bl-ink">
            <span className="block text-[16px] font-semibold tracking-[-0.02em]">Flutterly</span>
            <span className="mt-1 hidden text-[10px] font-semibold uppercase tracking-[0.16em] text-bl-muted sm:block">Digital delivery</span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-5 xl:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[13.5px] font-medium text-bl-ink-soft transition-colors duration-300 hover:text-bl-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <a
            href={`mailto:${site.email}?subject=${encodeURIComponent("Project enquiry")}`}
            className="whitespace-nowrap rounded-full bg-bl-teal px-3.5 py-2 text-[13px] font-semibold text-white shadow-[0_10px_26px_-12px_rgba(14,122,99,0.65)] transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-bl-teal-hover min-[380px]:px-4 min-[380px]:text-[13.5px] sm:px-5 sm:py-2.5"
          >
            <span className="min-[380px]:hidden">Contact</span>
            <span className="hidden min-[380px]:inline">Discuss a project</span>
          </a>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="bloom-mobile-menu"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-bl-line-2 bg-bl-surface text-bl-ink xl:hidden"
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
            className="mx-4 mb-4 grid gap-1 border border-bl-line bg-bl-surface p-4 shadow-[0_20px_50px_-28px_rgba(11,47,40,0.35)] xl:hidden"
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
              href={`mailto:${site.email}?subject=${encodeURIComponent("Project enquiry")}`}
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-bl-teal px-5 py-3 text-center text-[15px] font-medium text-white"
            >
              Discuss a project
            </a>
          </m.nav>
        )}
      </AnimatePresence>
    </m.header>
  );
}
