"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, X } from "lucide-react";
import { navLinks } from "@/lib/marketing/content";
import { serviceHref, services } from "@/lib/marketing/services";
import { Dot } from "../ui/Room";
import { serviceTone } from "../ui/tones";

/** One wall colour and a lean per card of the index, in route order. */
const cards = [
  { tone: "tone-cobalt", tilt: -1.6 },
  { tone: "tone-pink", tilt: 1.2 },
  { tone: "tone-sky", tilt: -0.8 },
  { tone: "tone-jade", tilt: 1.8 },
  { tone: "tone-sun", tilt: -1.3 },
  { tone: "tone-flame", tilt: 0.9 },
] as const;

/**
 * The bar is not a bar: three groups of pills floating over whatever
 * room is at the top of the window, each with an ink outline so it
 * shows on every wall. On the left the butterfly, the
 * wordmark and its vermilion dot; in the middle (from `lg`) the routes
 * on a paper pill; on the right the audit link, the booking pill and
 * the pink index pill.
 *
 * The index opens the whole site as cards on an ochre wall: one per
 * route, numbered in the serif, then the five services and the two ways
 * to start. It is a modal: focus moves into it and is held there,
 * Escape closes it, and focus returns to the pill that opened it.
 */
export function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const sheetRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  /* Close on navigation: remember where the index opened. */
  const [openedOn, setOpenedOn] = useState(pathname);
  if (open && openedOn !== pathname) {
    setOpen(false);
    setOpenedOn(pathname);
  }

  /* While the index is open: Escape closes it, Tab stays inside the header, and the page behind does not scroll. */
  useEffect(() => {
    if (!open) return;
    const header = sheetRef.current?.closest("header");
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (e.key !== "Tab" || !header) return;
      const stops = Array.from(header.querySelectorAll<HTMLElement>("[data-index-stop]"));
      if (!stops.length) return;
      const first = stops[0];
      const last = stops[stops.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && (active === first || !header.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (active === last || !header.contains(active))) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    const { overflow } = document.documentElement.style;
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = overflow;
    };
  }, [open]);

  const isActive = (href: string) =>
    !href.includes("#") && (pathname === href || !!pathname?.startsWith(`${href}/`));

  const close = () => setOpen(false);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-[120]">
      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] items-center justify-between gap-2 px-3 pt-3 sm:px-6 sm:pt-5">
        <Link
          href="/"
          aria-label="Flutterly home"
          className="pointer-events-auto flex h-12 shrink-0 items-center gap-2 rounded-full border-[1.5px] border-s-navy bg-s-chalk pl-2 pr-4 text-s-navy sm:h-[52px] sm:pr-5"
        >
          <Image src="/flutterly-logo.png" alt="" width={36} height={36} priority />
          <span className="s-display text-[20px] sm:text-[22px]">Flutterly</span>
          <Dot className="text-[26px]" />
        </Link>

        <nav
          aria-label="Primary"
          className="pointer-events-auto hidden h-[52px] items-center rounded-full border-[1.5px] border-s-navy bg-s-chalk px-1.5 lg:flex"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className="group flex h-10 items-center gap-1.5 rounded-full px-3.5 text-[15px] font-semibold text-[#3a3836] transition-colors hover:bg-s-chalk-2 hover:text-s-navy aria-[current=page]:text-s-navy xl:px-4"
            >
              {link.label}
              {isActive(link.href) ? <Dot className="text-[22px]" /> : null}
            </Link>
          ))}
        </nav>

        <div className="pointer-events-auto flex shrink-0 items-center gap-1.5 sm:gap-2">
          <Link href="/free-audit" className="s-key s-key-plain hidden h-12 border-[1.5px] border-s-navy px-5 text-[15px] sm:h-[52px] md:inline-flex">
            Free audit
          </Link>
          <Link href="/book" className="s-key h-12 border-[1.5px] border-s-navy px-4 text-[15px] [--key-edge:#ff6a3d] [--key-face:var(--s-flame)] [--key-ink:var(--s-navy)] sm:h-[52px] sm:px-5">
            Book a call
          </Link>
          <button
            ref={toggleRef}
            type="button"
            data-index-stop
            onClick={() => {
              setOpenedOn(pathname);
              setOpen((o) => !o);
            }}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="site-menu"
            className="s-key s-key-pink h-12 gap-2.5 border-[1.5px] border-s-navy px-4 text-[15px] sm:h-[52px] sm:px-5"
          >
            <span aria-hidden className="hidden sm:inline">
              index
            </span>
            {open ? (
              <X size={18} strokeWidth={2.6} aria-hidden />
            ) : (
              <span aria-hidden className="flex w-[16px] flex-col gap-[4px]">
                <span className="h-[2px] w-full rounded-full bg-current" />
                <span className="h-[2px] w-full rounded-full bg-current" />
              </span>
            )}
          </button>
        </div>
      </div>

      {open ? (
        <nav
          ref={sheetRef}
          id="site-menu"
          aria-label="Site menu"
          className="tone-ochre menu-open pointer-events-auto fixed inset-0 overflow-y-auto overscroll-contain"
        >
          <div className="mx-auto flex min-h-full w-full max-w-[1440px] flex-col justify-between gap-10 px-4 pb-8 pt-24 sm:px-8 sm:pb-10 sm:pt-32">
            <ul className="m-0 grid list-none grid-cols-2 gap-3 p-0 sm:gap-5 md:grid-cols-3 xl:grid-cols-6">
              {navLinks.map((link, i) => {
                const card = cards[i % cards.length];
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={close}
                      data-index-stop
                      aria-current={isActive(link.href) ? "page" : undefined}
                      className="menu-card group flex h-full flex-col gap-3 rounded-[24px] bg-s-chalk p-2.5 pb-4 text-s-navy sm:p-3 sm:pb-5"
                      style={{ "--tilt": `${card.tilt}deg`, "--i": i } as CSSProperties}
                    >
                      <span className={`${card.tone} relative flex aspect-[5/4] items-end justify-between overflow-hidden rounded-[8px] p-3 sm:aspect-[4/5]`}>
                        <span aria-hidden className="s-mark text-[clamp(3.4rem,8vw,6.5rem)] leading-[0.74]">
                          {i + 1}
                        </span>
                        <ArrowRight
                          aria-hidden
                          size={26}
                          strokeWidth={2.2}
                          className="mb-1 transition-transform duration-500 group-hover:-rotate-45"
                        />
                      </span>
                      <span className="flex items-center justify-between gap-2 px-1">
                        <span className="s-display text-[clamp(1.25rem,2.2vw,1.7rem)]">{link.label}</span>
                        {isActive(link.href) ? (
                          <span aria-hidden className="s-mono text-[12px] text-[#66625d]">
                            you are here
                          </span>
                        ) : null}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="grid gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:items-end">
              <div>
                <p className="s-eyebrow">Services</p>
                <ul className="m-0 mt-4 flex list-none flex-wrap gap-2 p-0">
                  {services.map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={serviceHref(s.slug)}
                        onClick={close}
                        data-index-stop
                        className="s-chip min-h-12 gap-2.5 px-4 text-[17px] font-semibold transition-transform duration-300 hover:-rotate-1 hover:scale-[1.04]"
                      >
                        <span aria-hidden className={`${serviceTone[s.slug]} h-3 w-3 shrink-0 rounded-full`} />
                        {s.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="grid gap-2.5 sm:grid-cols-2">
                <Link href="/free-audit" onClick={close} data-index-stop className="s-key s-key-plain h-14 text-[16.5px]">
                  Free website audit
                </Link>
                <Link href="/book" onClick={close} data-index-stop className="s-key h-14 text-[16.5px]">
                  Book a call
                </Link>
              </div>
            </div>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
