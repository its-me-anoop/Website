"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { navLinks, samples } from "@/lib/marketing/content";
import { cn } from "@/lib/utils";

/**
 * A plain top bar: wordmark, links, the free audit and one filled
 * action. It gains a solid background and a rule once the page
 * scrolls. Below `lg` the links move into a full-width panel.
 */
export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const panelRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /* Close on navigation: remember where the panel opened. */
  const [openedOn, setOpenedOn] = useState(pathname);
  if (open && openedOn !== pathname) {
    setOpen(false);
    setOpenedOn(pathname);
  }

  /* Close when keyboard focus leaves the header. */
  useEffect(() => {
    if (!open) return;
    const onFocus = (e: FocusEvent) => {
      const header = panelRef.current?.closest("header");
      if (header && e.target instanceof Node && !header.contains(e.target)) setOpen(false);
    };
    document.addEventListener("focusin", onFocus);
    return () => document.removeEventListener("focusin", onFocus);
  }, [open]);

  const isActive = (href: string) => !href.includes("#") && pathname === href;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[120] border-b transition-colors duration-300",
        scrolled || open ? "border-s-line bg-s-ink" : "border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-[1320px] items-center justify-between gap-4 px-5 sm:px-8">
        <Link href="/" aria-label="Flutterly home" className="flex items-center gap-2.5">
          <Image src="/flutterly-logo.png" alt="" width={26} height={26} priority />
          <span className="s-display text-[22px] tracking-[-0.02em]">Flutterly</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className="py-2 text-[15.5px] text-s-on-ink-2 underline-offset-[10px] transition-colors hover:text-s-on-ink aria-[current=page]:text-s-on-ink aria-[current=page]:underline aria-[current=page]:decoration-s-signal aria-[current=page]:decoration-2"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/free-audit"
            className="hidden h-10 items-center px-3 text-[15.5px] text-s-on-ink underline-offset-[6px] hover:underline sm:inline-flex"
          >
            Free audit
          </Link>
          <Link
            href="/book"
            className="inline-flex h-10 items-center rounded-[4px] bg-s-signal px-4 text-[15.5px] font-semibold text-s-ink transition-colors hover:bg-s-signal-hover"
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
            aria-controls="site-menu"
            className="flex h-10 w-10 items-center justify-center text-s-on-ink lg:hidden"
          >
            {open ? <X size={22} aria-hidden /> : <Menu size={22} aria-hidden />}
          </button>
        </div>
      </div>

      {open ? (
        <nav
          ref={panelRef}
          id="site-menu"
          aria-label="Site menu"
          className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-s-line bg-s-ink lg:hidden"
        >
          <div className="mx-auto w-full max-w-[1320px] px-5 pb-8 pt-4 sm:px-8">
            <ul className="divide-y divide-s-line">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="s-display block py-4 text-[30px]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="s-label mt-8 text-s-on-ink-2">Sample sites</p>
            <ul className="mt-3 grid gap-1 sm:grid-cols-2">
              {samples.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={s.href}
                    onClick={() => setOpen(false)}
                    className="block py-2 text-[16px] text-s-on-ink-2 hover:text-s-on-ink"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <Link
                href="/free-audit"
                onClick={() => setOpen(false)}
                className="rounded-[4px] border border-s-line-2 px-4 py-3.5 text-center text-[16px] font-semibold"
              >
                Free website audit
              </Link>
              <Link
                href="/book"
                onClick={() => setOpen(false)}
                className="rounded-[4px] bg-s-signal px-4 py-3.5 text-center text-[16px] font-semibold text-s-ink"
              >
                Book a call
              </Link>
            </div>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
