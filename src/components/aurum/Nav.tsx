"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, m, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { site } from "@/lib/site";
import { EASE, Magnetic } from "@/components/fx";

/* Each link carries one of the three rule colours, so the underline
   that grows under it is never quite the same twice across the bar. */
const links = [
  { href: "/#services", label: "Services", brand: "var(--au-teal)" },
  { href: "/gp-websites", label: "GP practices", brand: "var(--au-nhs)" },
  { href: "/care-home-websites", label: "Care homes", brand: "var(--au-amber)" },
  { href: "/packages", label: "Packages", brand: "var(--au-rose)" },
  { href: "/#work", label: "Work", brand: "var(--au-teal)" },
] as const;

/**
 * A full-width cream bar, seated on the page rather than floating over
 * it: the fold below is a night band, and a solid header above it is
 * how the reference frames that contrast. The bar gains a hairline and
 * a shadow once the page scrolls, each link grows a three-pixel
 * underline in its own colour, and the mobile sheet drops out of the
 * same bar.
 */
export function Nav() {
  const [open, setOpen] = useState(false);
  const [lifted, setLifted] = useState(false);
  const reduce = useReducedMotion();
  const pathname = usePathname();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setLifted(y > 12));

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /* Freeze the page behind the mobile sheet while it is open. */
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <m.header
      className={`au-frost sticky top-0 z-[150] border-b transition-[border-color,box-shadow] duration-300 ${
        lifted || open
          ? "border-au-line shadow-[0_10px_30px_-24px_rgba(20,8,10,0.5)]"
          : "border-transparent"
      }`}
      initial={reduce ? false : { y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: EASE, delay: 0.05 }}
    >
      <div className="mx-auto flex w-full max-w-[1240px] items-center justify-between gap-3 px-4 py-3 sm:px-8">
        <Link
          href="/"
          aria-label="Flutterly — home"
          className="group flex shrink-0 items-center gap-2.5 rounded-full py-1 pr-3"
        >
          <Image
            src="/flutterly-logo.png"
            alt=""
            width={30}
            height={30}
            priority
            className="h-8 w-8"
          />
          <span className="au-display text-[19px] font-medium tracking-[-0.02em] text-au-ink">
            Flutterly
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center lg:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                data-active={active}
                style={{ ["--au-brand" as string]: link.brand }}
                className={`au-underline px-4 py-4 text-[14px] font-medium transition-colors duration-200 ${
                  active ? "text-au-ink" : "text-au-ink-3 hover:text-au-ink"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <Link
            href="/free-audit"
            className="hidden text-[13.5px] font-medium text-au-ink-2 underline-offset-4 transition-colors duration-200 hover:text-au-teal-deep hover:underline sm:inline"
          >
            Free audit
          </Link>

          {/* One contact target at every width — a second, hidden-on-mobile
              copy would put an invisible mailto: first in the DOM. */}
          <Magnetic>
            <a
              href={`mailto:${site.email}`}
              className="au-sweep inline-flex items-center gap-1.5 rounded-full bg-au-teal-deep px-4 py-2.5 text-[13.5px] font-semibold text-au-teal-ink shadow-[0_12px_28px_-14px_rgba(20,108,122,0.8)] transition-colors duration-300 hover:bg-au-teal-press"
            >
              <span className="relative">Get in touch</span>
              <ArrowUpRight
                size={15}
                aria-hidden
                className="relative hidden sm:block"
              />
            </a>
          </Magnetic>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="aurum-mobile-menu"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-au-line bg-au-surface text-au-ink transition-colors duration-300 hover:border-au-teal/50 hover:text-au-teal-deep lg:hidden"
          >
            {open ? <X size={18} aria-hidden /> : <Menu size={18} aria-hidden />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <m.nav
            id="aurum-mobile-menu"
            aria-label="Mobile"
            className="overflow-hidden border-t border-au-line bg-au-paper-2 lg:hidden"
            initial={reduce ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            /* Much snappier on the way out than in: once a link is
               chosen the sheet has to clear the page it just navigated
               to, so the exit is short enough to feel instant. */
            exit={{
              opacity: 0,
              height: 0,
              transition: { duration: 0.12, ease: "easeIn" },
            }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <ul className="mx-auto grid max-w-[1240px] px-4 py-3 sm:px-8">
              {links.map((link, i) => (
                <m.li
                  key={link.href}
                  initial={reduce ? false : { opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, ease: EASE, delay: 0.04 + i * 0.045 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-3 rounded-[var(--r-sm)] px-3 py-3 text-[17px] font-medium text-au-ink transition-colors duration-300 hover:bg-au-surface-2"
                  >
                    <span
                      aria-hidden
                      className="au-label text-[10px]"
                      style={{ color: link.brand }}
                    >
                      0{i + 1}
                    </span>
                    {link.label}
                  </Link>
                </m.li>
              ))}
            </ul>
            <div className="mx-auto max-w-[1240px] px-4 pb-4 sm:px-8">
              <Link
                href="/free-audit"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 rounded-full bg-au-teal-deep px-5 py-3.5 text-center text-[15px] font-semibold text-au-teal-ink"
              >
                Get your free website audit
                <ArrowUpRight size={16} aria-hidden />
              </Link>
            </div>
          </m.nav>
        )}
      </AnimatePresence>
    </m.header>
  );
}
