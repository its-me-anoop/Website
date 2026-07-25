"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, m, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { site } from "@/lib/site";
import { EASE, Magnetic } from "@/components/fx";

const links = [
  { href: "/#services", label: "Services" },
  { href: "/gp-websites", label: "GP practices" },
  { href: "/care-home-websites", label: "Care homes" },
  { href: "/packages", label: "Packages" },
  { href: "/#work", label: "Work" },
] as const;

/**
 * A floating glass command bar. It rides just below the top edge, gains
 * weight once the page scrolls past the fold, and highlights whichever
 * link you are hovering with a single shared pill that slides between
 * them (`layoutId`). The mobile sheet drops out of the same bar.
 */
export function Nav() {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [lifted, setLifted] = useState(false);
  const reduce = useReducedMotion();
  const pathname = usePathname();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setLifted(y > 28));

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
      className="sticky top-0 z-[150] px-3 pt-3 sm:px-5 sm:pt-4"
      initial={reduce ? false : { y: -28, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
    >
      <div
        className={`mx-auto flex w-full max-w-[1240px] items-center justify-between gap-3 rounded-[22px] px-3 py-2.5 transition-[background-color,box-shadow,border-color] duration-500 sm:px-4 ${
          lifted || open
            ? "au-frost"
            : "border border-transparent bg-transparent"
        }`}
      >
        <Link
          href="/"
          aria-label="Flutterly — home"
          className="group flex items-center gap-2.5 rounded-full py-1 pl-1 pr-3"
        >
          <span className="relative flex h-8 w-8 items-center justify-center">
            <span
              aria-hidden
              className="absolute inset-0 rounded-full bg-au-teal/25 blur-[10px] transition-opacity duration-500 group-hover:opacity-100 sm:opacity-70"
            />
            <Image
              src="/flutterly-logo.png"
              alt=""
              width={30}
              height={30}
              priority
              className="relative"
            />
          </span>
          <span className="text-[16px] font-semibold tracking-tight text-au-ink">
            Flutterly
          </span>
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center lg:flex"
          onMouseLeave={() => setHovered(null)}
        >
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onMouseEnter={() => setHovered(link.href)}
                className={`relative rounded-full px-4 py-2 text-[14px] font-medium transition-colors duration-300 ${
                  active ? "text-au-ink" : "text-au-ink-3 hover:text-au-ink"
                }`}
              >
                {hovered === link.href && !reduce ? (
                  <m.span
                    layoutId="nav-hover"
                    aria-hidden
                    className="absolute inset-0 -z-10 rounded-full border border-white/10 bg-white/[0.07]"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                ) : null}
                {link.label}
                {active ? (
                  <span
                    aria-hidden
                    className="absolute inset-x-4 -bottom-0.5 h-px bg-[linear-gradient(90deg,transparent,var(--au-teal),transparent)]"
                  />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          {/* One contact target at every width — a second, hidden-on-mobile
              copy would put an invisible mailto: first in the DOM. */}
          <Magnetic>
            <a
              href={`mailto:${site.email}`}
              className="group/cta relative inline-flex items-center gap-1.5 overflow-hidden rounded-full bg-au-teal px-3.5 py-2 text-[13px] font-medium text-au-teal-ink shadow-[0_14px_36px_-16px_rgba(47,216,173,0.85)] transition-colors duration-300 hover:bg-au-aqua sm:px-4 sm:py-2.5 sm:text-[13.5px]"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-y-0 -left-full w-1/2 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.6),transparent)] transition-transform duration-700 group-hover/cta:translate-x-[320%]"
              />
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
            aria-controls="aurora-mobile-menu"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/[0.05] text-au-ink transition-colors duration-300 hover:border-au-teal/40 hover:text-au-teal lg:hidden"
          >
            {open ? <X size={18} aria-hidden /> : <Menu size={18} aria-hidden />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <m.nav
            id="aurora-mobile-menu"
            aria-label="Mobile"
            className="au-frost mx-auto mt-2 w-full max-w-[1240px] overflow-hidden rounded-[24px] p-3 lg:hidden"
            initial={reduce ? false : { opacity: 0, y: -14, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            /* Much snappier on the way out than in: once a link is
               chosen the sheet has to clear the page it just navigated
               to, so the exit is short enough to feel instant. */
            exit={{
              opacity: 0,
              y: -8,
              height: 0,
              transition: { duration: 0.12, ease: "easeIn" },
            }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <ul className="grid gap-1">
              {links.map((link, i) => (
                <m.li
                  key={link.href}
                  initial={reduce ? false : { opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, ease: EASE, delay: 0.05 + i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-3 rounded-2xl px-4 py-3 text-[17px] font-medium text-au-ink transition-colors duration-300 hover:bg-white/[0.06]"
                  >
                    <span className="au-mono text-[11px] tabular-nums text-au-teal">
                      0{i + 1}
                    </span>
                    {link.label}
                  </Link>
                </m.li>
              ))}
            </ul>
            <Link
              href="/free-audit"
              onClick={() => setOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 rounded-2xl bg-au-teal px-5 py-3.5 text-center text-[15px] font-medium text-au-teal-ink"
            >
              Get your free website audit
              <ArrowUpRight size={16} aria-hidden />
            </Link>
          </m.nav>
        )}
      </AnimatePresence>
    </m.header>
  );
}
