"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, m } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { navLinks } from "@/lib/marketing/content";
import { serviceHref, services } from "@/lib/marketing/services";
import { EASE } from "../effects/Motion";
import { useMotionAllowed } from "../effects/hooks";
import { serviceTone } from "../ui/tones";

/** One tone per row of the menu sheet, so it opens like a fan of dividers. */
const sheetTones = ["tone-cobalt", "tone-flame", "tone-sun", "tone-jade", "tone-pink", "tone-navy"] as const;

/**
 * A solid chalk bar across the top of every page: the butterfly and
 * wordmark, the routes as condensed labels with a flame marker under
 * the current one, then the audit link and the booking key. Below `lg`
 * a menu key opens a sheet where each route is a coloured divider that
 * flaps down into place, followed by the five services.
 */
export function Nav() {
  const [open, setOpen] = useState(false);
  const motion = useMotionAllowed();
  const pathname = usePathname();
  const sheetRef = useRef<HTMLElement>(null);

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

  const isActive = (href: string) =>
    !href.includes("#") && (pathname === href || !!pathname?.startsWith(`${href}/`));

  return (
    <header className="tone-chalk fixed inset-x-0 top-0 z-[120] border-b-2 border-s-navy">
      <div className="mx-auto flex h-16 w-full max-w-[1320px] items-center justify-between gap-3 px-4 sm:px-8">
        <Link href="/" aria-label="Flutterly home" className="-ml-1 flex h-11 items-center gap-2 rounded-[8px] px-1">
          <Image src="/flutterly-logo.png" alt="" width={34} height={34} priority />
          <span className="s-display text-[22px]">Flutterly</span>
        </Link>

        <nav aria-label="Primary" className="hidden h-full items-stretch lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className="s-label group relative flex items-center px-3.5 text-[14.5px] text-s-ink-soft transition-colors hover:text-s-ink aria-[current=page]:text-s-ink xl:px-4"
            >
              {link.label}
              {isActive(link.href) ? (
                <m.span
                  layoutId="nav-active"
                  aria-hidden
                  className="absolute inset-x-2 bottom-[-2px] h-[5px] bg-s-flame"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              ) : (
                <span
                  aria-hidden
                  className="absolute inset-x-2 bottom-[-2px] h-[5px] origin-left scale-x-0 bg-s-navy transition-transform duration-300 group-hover:scale-x-100"
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link href="/free-audit" className="s-ul hidden min-h-11 items-center text-[15px] font-semibold text-s-ink sm:inline-flex">
            Free audit
          </Link>
          <Link href="/book" className="s-key h-10 px-4 text-[14.5px] [--key-depth:4px]">
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
            aria-controls="site-menu"
            className="s-key s-key-plain h-10 w-10 border-2 border-s-navy [--key-depth:4px] [--key-edge:var(--s-navy)] lg:hidden"
          >
            {open ? <X size={19} strokeWidth={2.4} aria-hidden /> : <Menu size={19} strokeWidth={2.4} aria-hidden />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <m.nav
            ref={sheetRef}
            id="site-menu"
            aria-label="Site menu"
            className="absolute inset-x-0 top-full max-h-[calc(100dvh-4rem)] overflow-y-auto border-b-2 border-s-navy bg-s-chalk lg:hidden"
            initial={motion ? { opacity: 0 } : false}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <ul>
              {navLinks.map((link, i) => (
                <m.li
                  key={link.href}
                  style={{ transformOrigin: "50% 0%" }}
                  initial={motion ? { rotateX: -80, opacity: 0, transformPerspective: 900 } : false}
                  animate={{ rotateX: 0, opacity: 1, transformPerspective: 900 }}
                  transition={{ delay: motion ? 0.045 * i : 0, duration: 0.5, ease: EASE }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className={`${sheetTones[i % sheetTones.length]} group flex items-center justify-between gap-4 px-5 py-4 sm:px-8`}
                  >
                    <span className="s-display text-[30px]">{link.label}</span>
                    <span className="flex items-center gap-3">
                      <span aria-hidden className="s-label hidden text-[12px] group-aria-[current=page]:inline">
                        You are here
                      </span>
                      <ArrowRight size={22} strokeWidth={2.4} aria-hidden />
                    </span>
                  </Link>
                </m.li>
              ))}
            </ul>

            <div className="px-5 pb-6 pt-6 sm:px-8">
              <p className="s-eyebrow">Services</p>
              <ul className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={serviceHref(s.slug)}
                      onClick={() => setOpen(false)}
                      className="flex min-h-12 items-center gap-2.5 rounded-[9px] border-[1.5px] border-s-line-2 bg-white px-3 text-[15.5px] font-semibold text-s-ink"
                    >
                      <span aria-hidden className={`${serviceTone[s.slug]} h-3 w-3 shrink-0 rounded-[3px]`} />
                      {s.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <Link href="/free-audit" onClick={() => setOpen(false)} className="s-key s-key-plain h-12 border-2 border-s-navy text-[15.5px] [--key-edge:var(--s-navy)]">
                  Free website audit
                </Link>
                <Link href="/book" onClick={() => setOpen(false)} className="s-key h-12 text-[15.5px]">
                  Book a call
                </Link>
              </div>
            </div>
          </m.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
