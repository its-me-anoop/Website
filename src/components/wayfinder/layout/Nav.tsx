"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { navLinks, samples } from "@/lib/marketing/content";
import { SignArrow } from "../ui/Arrow";
import { BrandMark } from "../ui/Bits";
import { ButtonLink } from "../ui/Button";

/**
 * The sign bar: a paper strip ruled in ink along the bottom, pinned to
 * the top of the page. The current page carries a yellow bar beneath
 * its link, the "you are here" of the site. Below `lg` a menu button
 * opens a full-height ink directory of every route.
 */
export function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const sheetRef = useRef<HTMLElement>(null);

  /* Close on navigation: remember where the sheet opened. */
  const [openedOn, setOpenedOn] = useState(pathname);
  if (open && openedOn !== pathname) {
    setOpen(false);
    setOpenedOn(pathname);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    /* Close when keyboard focus leaves the header. */
    const onFocus = (e: FocusEvent) => {
      const header = sheetRef.current?.closest("header");
      if (header && e.target instanceof Node && !header.contains(e.target)) setOpen(false);
    };
    /* Lock scrolling on <body>, not <html>: body carries overflow-x:
       hidden from the base styles, and moving the lock to <html> would
       turn body into its own scroll container and unstick this header. */
    const root = document.body;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    document.addEventListener("focusin", onFocus);
    return () => {
      root.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("focusin", onFocus);
    };
  }, [open]);

  const isActive = (href: string) => !href.includes("#") && pathname === href;

  return (
    <header className="sticky top-0 z-[120] border-b-2 border-wf-ink bg-wf-paper">
      <div className="mx-auto flex h-[68px] w-full max-w-[1320px] items-center justify-between gap-4 px-4 sm:px-8">
        <Link href="/" aria-label="Flutterly home" className="-ml-1 rounded-[6px] p-1">
          <BrandMark />
        </Link>

        <nav aria-label="Primary" className="hidden h-full items-stretch lg:flex">
          <ul className="flex h-full items-stretch gap-1">
            {navLinks.map((link) => (
              <li key={link.href} className="flex">
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className="relative flex items-center whitespace-nowrap px-3 text-[15.5px] xl:px-3.5 font-medium text-wf-ink transition-colors hover:bg-wf-paper-2 aria-[current=page]:font-bold after:absolute after:inset-x-2 after:-bottom-[2px] after:h-[5px] after:bg-transparent after:transition-colors hover:after:bg-wf-line-2 aria-[current=page]:after:bg-wf-sign"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/free-audit"
            className="wf-link hidden whitespace-nowrap px-2 text-[15.5px] font-bold sm:inline lg:hidden xl:inline"
          >
            Free audit
          </Link>
          {/* The arrow square drops on the narrowest phones so the action
              still fits beside the wordmark and the menu button. */}
          <ButtonLink href="/book" size="sm" className="wf-btn--compact whitespace-nowrap">
            Book a call
          </ButtonLink>
          <button
            type="button"
            onClick={() => {
              setOpenedOn(pathname);
              setOpen((o) => !o);
            }}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="wayfinder-menu"
            className="flex h-[42px] w-[42px] items-center justify-center rounded-[6px] border-2 border-wf-ink bg-wf-card text-wf-ink lg:hidden"
          >
            {open ? <X size={20} strokeWidth={2.6} aria-hidden /> : <Menu size={20} strokeWidth={2.6} aria-hidden />}
          </button>
        </div>
      </div>

      {open ? (
        <nav
          ref={sheetRef}
          id="wayfinder-menu"
          aria-label="Site menu"
          className="wf-on-ink fixed inset-x-0 bottom-0 top-[70px] overflow-y-auto bg-wf-ink text-wf-on-ink lg:hidden"
        >
          <div className="mx-auto w-full max-w-[1320px] px-4 pb-10 pt-4 sm:px-8">
            <ul className="border-b border-wf-on-ink-line">
              {navLinks.map((link) => (
                <li key={link.href} className="border-t border-wf-on-ink-line">
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className="group flex items-center justify-between gap-4 py-4 text-[28px] font-extrabold tracking-[-0.025em] aria-[current=page]:text-wf-sign"
                  >
                    {link.label}
                    <span
                      aria-hidden="true"
                      className="flex h-10 w-10 items-center justify-center rounded-[6px] bg-wf-sign text-wf-ink transition-transform group-hover:translate-x-1"
                    >
                      <SignArrow size={20} />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <p className="wf-label mt-8 text-wf-on-ink-soft">Sample sites</p>
            <ul className="mt-3 grid gap-x-6 sm:grid-cols-2">
              {samples.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={s.href}
                    onClick={() => setOpen(false)}
                    className="wf-link flex items-center gap-2 py-2 text-[17px]"
                  >
                    <SignArrow dir="up-right" size={14} className="text-wf-sign" />
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <ButtonLink href="/book" className="w-full justify-between">
                Book a call
              </ButtonLink>
              <ButtonLink href="/free-audit" tone="outline" className="w-full justify-between">
                Free website audit
              </ButtonLink>
            </div>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
