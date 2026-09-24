"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, m } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navLinks, samples } from "@/lib/marketing/content";
import { cn } from "@/lib/utils";
import { EASE } from "../effects/Motion";
import { useMotionAllowed } from "../effects/hooks";

/**
 * Floating glass capsule. Wordmark, inline links from `lg`, then the
 * two actions. It tightens once the page scrolls, and below `lg` a
 * menu button opens a full-height sheet with every route.
 */
export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const motion = useMotionAllowed();
  const pathname = usePathname();
  const sheetRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /* Close on navigation: remember where the sheet opened. */
  const [openedOn, setOpenedOn] = useState(pathname);
  if (open && openedOn !== pathname) {
    setOpen(false);
    setOpenedOn(pathname);
  }

  /* Close when keyboard focus leaves the header. */
  useEffect(() => {
    if (!open) return;
    const onFocus = (e: FocusEvent) => {
      const header = sheetRef.current?.closest("header");
      if (header && e.target instanceof Node && !header.contains(e.target)) setOpen(false);
    };
    document.addEventListener("focusin", onFocus);
    return () => document.removeEventListener("focusin", onFocus);
  }, [open]);

  const isActive = (href: string) => !href.includes("#") && pathname === href;

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-[120] px-3 pt-3 sm:px-5 sm:pt-4">
      <div
        className={cn(
          "pointer-events-auto mx-auto flex h-14 items-center justify-between gap-3 rounded-full border pl-2 pr-2 transition-[max-width,background-color,border-color,box-shadow] duration-500",
          scrolled || open
            ? "max-w-[1080px] border-a-line-2 bg-a-void/70 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.9)] backdrop-blur-2xl"
            : "max-w-[1320px] border-transparent bg-transparent"
        )}
      >
        <Link
          href="/"
          aria-label="Flutterly home"
          className="flex h-10 items-center gap-2.5 rounded-full px-3 transition-colors hover:bg-white/5"
        >
          <Image src="/flutterly-logo.png" alt="" width={24} height={24} priority />
          <span className="a-display text-[19px] tracking-[-0.03em]">Flutterly</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-0.5 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className="relative rounded-full px-3.5 py-2 text-[14px] text-a-ink-soft transition-colors hover:text-a-ink aria-[current=page]:text-a-ink"
            >
              {isActive(link.href) ? (
                <m.span
                  layoutId="nav-active"
                  aria-hidden
                  className="absolute inset-0 -z-10 rounded-full bg-white/[0.08]"
                  transition={{ type: "spring", stiffness: 400, damping: 34 }}
                />
              ) : null}
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <Link
            href="/free-audit"
            className="hidden h-10 items-center rounded-full px-4 text-[14px] text-a-ink transition-colors hover:bg-white/[0.07] sm:inline-flex"
          >
            Free audit
          </Link>
          <Link
            href="/book"
            className="a-shine inline-flex h-10 items-center rounded-full bg-a-amber px-4 text-[14px] font-medium text-a-void transition-colors hover:bg-a-amber-hover"
          >
            Book a call
          </Link>
          <button
            type="button"
            onClick={() => {
              setOpenedOn(pathname);
              setOpen((o) => !o);
            }}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="aurora-menu"
            className="flex h-10 w-10 items-center justify-center rounded-full text-a-ink transition-colors hover:bg-white/[0.08] lg:hidden"
          >
            {open ? <X size={18} aria-hidden /> : <Menu size={18} aria-hidden />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <m.nav
            ref={sheetRef}
            id="aurora-menu"
            aria-label="Site menu"
            className="a-glass pointer-events-auto mx-auto mt-2 max-h-[calc(100dvh-5.5rem)] max-w-[1080px] overflow-y-auto rounded-[28px] p-3 lg:hidden"
            initial={motion ? { opacity: 0, y: -12, filter: "blur(8px)" } : false}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -12, filter: "blur(8px)" }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <ul className="grid">
              {navLinks.map((link, i) => (
                <m.li
                  key={link.href}
                  initial={motion ? { opacity: 0, x: -12 } : false}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: motion ? 0.04 * i : 0, duration: 0.4, ease: EASE }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="a-display flex items-baseline gap-4 rounded-[18px] px-4 py-3 text-[30px] transition-colors hover:bg-white/5"
                  >
                    <span aria-hidden className="a-mono w-6 text-[11px] font-normal tracking-normal text-a-muted">
                      0{i + 1}
                    </span>
                    {link.label}
                  </Link>
                </m.li>
              ))}
            </ul>

            <p className="a-eyebrow mt-5 px-4">Sample sites</p>
            <ul className="mt-2 grid gap-0.5 sm:grid-cols-2">
              {samples.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={s.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between gap-2 rounded-[14px] px-4 py-2.5 text-[15px] text-a-ink-soft transition-colors hover:bg-white/5 hover:text-a-ink"
                  >
                    {s.name}
                    <ArrowUpRight size={14} aria-hidden className="shrink-0 opacity-60" />
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-4 grid gap-2 border-t border-a-line p-2 pt-4 sm:grid-cols-2">
              <Link
                href="/free-audit"
                onClick={() => setOpen(false)}
                className="rounded-full border border-a-line-2 px-4 py-3 text-center text-[15px] text-a-ink transition-colors hover:bg-white/5"
              >
                Free website audit
              </Link>
              <Link
                href="/book"
                onClick={() => setOpen(false)}
                className="rounded-full bg-a-amber px-4 py-3 text-center text-[15px] font-medium text-a-void transition-colors hover:bg-a-amber-hover"
              >
                Book a call
              </Link>
            </div>
          </m.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
