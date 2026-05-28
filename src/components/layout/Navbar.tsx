"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  m,
  useMotionValueEvent,
  useScroll,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Services", href: "#services" },
  { name: "Work", href: "#work" },
  { name: "Process", href: "#practice" },
  { name: "Studio", href: "#studio" },
];

/** Section ids observed to drive the active-link pill. */
const sectionIds = ["services", "work", "practice", "oss", "studio"];

/**
 * Floating glass navigation bar with:
 *  • a scroll-progress hairline,
 *  • a spring-animated active-section pill, and
 *  • an accessible mobile sheet (Esc to close).
 */
export function Navbar() {
  const pathname = usePathname();
  const { scrollY, scrollYProgress } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const reduce = useReducedMotion();

  const progress = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 40,
    restDelta: 0.001,
  });

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24);
    if (latest < 120) setActiveSection("");
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        }),
      { rootMargin: "-30% 0px -50% 0px", threshold: 0.1 }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const hrefFor = (href: string) => (pathname === "/" ? href : `/${href}`);

  return (
    <>
      {/* Scroll progress hairline */}
      <m.div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-[110] h-[2px] origin-left bg-signal"
        style={{ scaleX: progress }}
      />

      <m.header
        className="fixed inset-x-0 top-0 z-[100] p-3 md:p-4"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
      >
        <div
          className={cn(
            "mx-auto flex h-14 w-full max-w-[1180px] items-center justify-between rounded-full px-5 transition-all duration-500",
            scrolled || menuOpen
              ? "glass shadow-[0_20px_50px_-20px_rgba(0,0,0,0.7)]"
              : "border border-transparent"
          )}
        >
          {/* Brand */}
          <Link
            href="/"
            className="group flex items-center gap-2.5 font-display font-semibold text-ink"
            aria-label="Flutterly home"
          >
            <m.span
              whileHover={{ rotate: -8, scale: 1.05 }}
              whileTap={{ scale: 0.94 }}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
              className="grid h-7 w-7 place-items-center rounded-[9px] bg-signal shadow-[0_6px_18px_-6px_var(--signal-glow)]"
            >
              <Image
                src="/flutterly-logo.png"
                alt=""
                width={18}
                height={18}
                className="h-4 w-4 object-contain brightness-0"
                priority
              />
            </m.span>
            <span className="tracking-tight">Flutterly</span>
          </Link>

          {/* Desktop nav */}
          <nav
            className="relative hidden items-center gap-0.5 text-[13px] font-medium text-ink-3 md:flex"
            aria-label="Primary"
          >
            {navItems.map((item) => {
              const active = activeSection === item.href.slice(1);
              return (
                <Link
                  key={item.name}
                  href={hrefFor(item.href)}
                  className={cn(
                    "relative rounded-full px-3.5 py-1.5 transition-colors duration-300",
                    active ? "text-ink" : "hover:text-ink"
                  )}
                >
                  {active &&
                    (reduce ? (
                      <span className="absolute inset-0 -z-10 rounded-full border border-line-2 bg-white/[0.05]" />
                    ) : (
                      <m.span
                        layoutId="active-nav-pill"
                        className="absolute inset-0 -z-10 rounded-full border border-line-2 bg-white/[0.05]"
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      />
                    ))}
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Link href={pathname === "/" ? "#brief" : "/#brief"}>
              <Button variant="signal" size="sm" magnetic={false}>
                Start a project
              </Button>
            </Link>
          </div>

          {/* Mobile toggle */}
          <m.button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line-2 bg-white/[0.03] text-ink-2 transition-colors duration-300 hover:text-ink md:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            whileTap={{ scale: 0.94 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {menuOpen ? (
                <m.span
                  key="x"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={18} aria-hidden="true" />
                </m.span>
              ) : (
                <m.span
                  key="m"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={18} aria-hidden="true" />
                </m.span>
              )}
            </AnimatePresence>
          </m.button>
        </div>
      </m.header>

      {/* Mobile sheet */}
      <AnimatePresence>
        {menuOpen && (
          <m.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="glass fixed inset-x-3 top-[72px] z-[99] rounded-[28px] p-5 shadow-2xl md:hidden"
          >
            <nav className="grid gap-1" aria-label="Mobile primary">
              {navItems.map((item, i) => (
                <m.div
                  key={item.name}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.3 }}
                >
                  <Link
                    href={hrefFor(item.href)}
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-xl px-3 py-3 text-[17px] font-medium text-ink-2 transition-colors duration-300 hover:bg-white/[0.04] hover:text-ink"
                  >
                    {item.name}
                  </Link>
                </m.div>
              ))}
              <hr className="my-2 border-line" />
              <Link
                href={pathname === "/" ? "#brief" : "/#brief"}
                onClick={() => setMenuOpen(false)}
                className="block"
              >
                <Button variant="signal" size="md" className="w-full" magnetic={false}>
                  Start a project
                </Button>
              </Link>
            </nav>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
