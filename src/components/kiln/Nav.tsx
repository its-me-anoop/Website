"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navLinks, samples } from "./data";
import { EASE } from "./primitives";

/**
 * Floating chrome: a coal pill top-left (wordmark, inline links from
 * `lg`, menu button) and two actions top-right: the free audit and
 * booking a call. The menu opens a coal sheet beneath the pill with
 * every route on the site, so the inline links can stay short.
 */
export function Nav() {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const pathname = usePathname();
  const sheetRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /* Close on route change without a cascading effect: remember the
     pathname the sheet was opened on and reset when it moves. */
  const [openedOn, setOpenedOn] = useState(pathname);
  if (open && openedOn !== pathname) {
    setOpen(false);
    setOpenedOn(pathname);
  }

  /* Close when focus leaves the sheet (keyboard users tabbing on). */
  useEffect(() => {
    if (!open) return;
    const onFocus = (e: FocusEvent) => {
      const target = e.target as Node | null;
      if (target && sheetRef.current && !sheetRef.current.contains(target)) {
        const header = sheetRef.current.closest("header");
        if (header && !header.contains(target)) setOpen(false);
      }
    };
    document.addEventListener("focusin", onFocus);
    return () => document.removeEventListener("focusin", onFocus);
  }, [open]);

  return (
    <m.header
      className="k-nav-enter pointer-events-none fixed inset-x-0 top-0 z-[120] px-3 pt-3 sm:px-4 sm:pt-4"
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: reduce ? 0 : 0.6, ease: EASE }}
    >
      <div className="mx-auto flex w-full max-w-[1400px] items-start justify-between gap-3">
        {/* Pill */}
        <div className="pointer-events-auto relative">
          <div className="k-frost on-coal flex h-11 items-center gap-1 rounded-[12px] pl-1.5 pr-1.5 text-k-coal-ink shadow-[0_12px_30px_-16px_rgba(23,20,15,0.6)] ring-1 ring-white/10">
            <Link
              href="/"
              aria-label="Flutterly home"
              className="flex h-8 items-center gap-2 rounded-[8px] px-2 transition-colors hover:bg-white/10"
            >
              <Image src="/flutterly-logo.png" alt="" width={20} height={20} priority />
              <span className="text-[14px] font-medium tracking-[-0.01em]">Flutterly</span>
            </Link>

            <nav aria-label="Primary" className="hidden items-center lg:flex">
              <span aria-hidden className="mx-1 h-4 w-px bg-k-coal-line" />
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-[8px] px-2.5 py-1.5 text-[13.5px] text-k-coal-soft transition-colors hover:bg-white/10 hover:text-k-coal-ink"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <button
              type="button"
              onClick={() => {
                setOpenedOn(pathname);
                setOpen((o) => !o);
              }}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="kiln-menu"
              className="ml-0.5 flex h-8 w-8 items-center justify-center rounded-[8px] transition-colors hover:bg-white/10"
            >
              {open ? <X size={17} aria-hidden /> : <Menu size={17} aria-hidden />}
            </button>
          </div>

          <AnimatePresence>
            {open && (
              <m.nav
                ref={sheetRef}
                id="kiln-menu"
                aria-label="Site menu"
                className="on-coal absolute left-0 top-[calc(100%+8px)] bg-k-coal ring-1 ring-white/10 w-[calc(100vw-1.5rem)] max-w-[420px] rounded-[16px] p-2 text-k-coal-ink shadow-[0_30px_70px_-30px_rgba(23,20,15,0.8)] sm:w-[420px]"
                initial={reduce ? false : { opacity: 0, y: -8, scale: 0.985 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.985 }}
                transition={{ duration: 0.2, ease: EASE }}
              >
                <ul className="grid gap-0.5">
                  {navLinks.map((link, i) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="flex items-baseline gap-3 rounded-[10px] px-3 py-2.5 text-[17px] transition-colors hover:bg-white/10"
                      >
                        <span aria-hidden className="w-5 text-[11px] tabular-nums text-k-coal-soft">
                          0{i + 1}
                        </span>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>

                <p className="k-eyebrow mt-3 px-3 text-k-coal-soft">Sample sites</p>
                <ul className="mt-1.5 grid grid-cols-2 gap-0.5">
                  {samples.map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={s.href}
                        onClick={() => setOpen(false)}
                        className="flex items-center justify-between gap-2 rounded-[10px] px-3 py-2 text-[14px] text-k-coal-soft transition-colors hover:bg-white/10 hover:text-k-coal-ink"
                      >
                        {s.name}
                        <ArrowUpRight size={13} aria-hidden className="shrink-0 opacity-60" />
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="mt-3 grid gap-1.5 border-t border-k-coal-line px-1 pt-3 sm:grid-cols-2">
                  <Link
                    href="/free-audit"
                    onClick={() => setOpen(false)}
                    className="rounded-[10px] bg-k-butter px-4 py-2.5 text-center text-[14.5px] font-medium text-k-ink transition-colors hover:bg-[#ead977]"
                  >
                    Free website audit
                  </Link>
                  <Link
                    href="/book"
                    onClick={() => setOpen(false)}
                    className="rounded-[10px] bg-k-fire px-4 py-2.5 text-center text-[14.5px] font-medium text-k-bone transition-colors hover:bg-k-fire-hover"
                  >
                    Book a call
                  </Link>
                </div>
              </m.nav>
            )}
          </AnimatePresence>
        </div>

        {/* Actions */}
        <div className="pointer-events-auto flex h-11 items-center gap-2">
          <Link
            href="/free-audit"
            className="hidden h-9 items-center rounded-[10px] bg-k-butter px-3.5 text-[13.5px] font-medium text-k-ink shadow-[0_12px_30px_-16px_rgba(23,20,15,0.5)] transition-colors hover:bg-[#ead977] sm:inline-flex"
          >
            Free audit
          </Link>
          <Link
            href="/book"
            className="inline-flex h-9 items-center rounded-[10px] bg-k-fire px-3.5 text-[13.5px] font-medium text-k-bone shadow-[0_12px_30px_-16px_rgba(191,58,21,0.6)] transition-colors hover:bg-k-fire-hover"
          >
            Book a call
          </Link>
        </div>
      </div>
    </m.header>
  );
}
