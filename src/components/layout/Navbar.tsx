"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useReducedMotion,
} from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Work", href: "#work" },
  { name: "Services", href: "#services" },
  { name: "Process", href: "#practice" },
  { name: "About", href: "#studio" },
];

/** Section ids observed to drive the active-link state. */
const sectionIds = ["work", "services", "practice", "oss", "studio"];

/**
 * Apple-style fixed navigation: a slim frosted bar with a hairline that
 * appears on scroll, quiet text links with an active state, and an
 * accessible mobile sheet (Esc to close).
 */
export function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const reduce = useReducedMotion();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 8);
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
      <motion.header
        className={cn(
          "fixed inset-x-0 top-0 z-[100] transition-[background-color,box-shadow] duration-500",
          scrolled || menuOpen
            ? "frosted shadow-[0_1px_0_var(--line)]"
            : "bg-transparent"
        )}
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="mx-auto flex h-13 w-full max-w-[1200px] items-center justify-between px-[var(--gutter)] py-2.5">
          {/* Brand */}
          <Link
            href="/"
            className="font-display text-[15px] font-semibold tracking-tight text-ink"
            aria-label="Anoop Jose — home"
          >
            Anoop Jose
          </Link>

          {/* Desktop nav */}
          <nav
            className="hidden items-center gap-7 text-[13px] font-medium text-ink-3 md:flex"
            aria-label="Primary"
          >
            {navItems.map((item) => {
              const active = activeSection === item.href.slice(1);
              return (
                <Link
                  key={item.name}
                  href={hrefFor(item.href)}
                  className={cn(
                    "relative py-1 transition-colors duration-300",
                    active ? "text-ink" : "hover:text-ink"
                  )}
                >
                  {item.name}
                  {active &&
                    (reduce ? (
                      <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-ink" />
                    ) : (
                      <motion.span
                        layoutId="active-nav-underline"
                        className="absolute -bottom-0.5 left-0 right-0 h-px bg-ink"
                        transition={{ type: "spring", stiffness: 400, damping: 34 }}
                      />
                    ))}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Link href={pathname === "/" ? "#brief" : "/#brief"}>
              <Button variant="primary" size="sm">
                Get in touch
              </Button>
            </Link>
          </div>

          {/* Mobile toggle */}
          <motion.button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            className="flex h-9 w-9 items-center justify-center rounded-full text-ink transition-colors duration-300 hover:bg-black/[0.04] md:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            whileTap={{ scale: 0.94 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {menuOpen ? (
                <motion.span
                  key="x"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={18} aria-hidden="true" />
                </motion.span>
              ) : (
                <motion.span
                  key="m"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={18} aria-hidden="true" />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.header>

      {/* Mobile sheet */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="frosted fixed inset-x-0 top-[52px] z-[99] border-b border-line p-5 md:hidden"
          >
            <nav className="grid gap-1" aria-label="Mobile primary">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                >
                  <Link
                    href={hrefFor(item.href)}
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-xl px-3 py-3 text-[17px] font-medium text-ink-2 transition-colors duration-300 hover:bg-black/[0.04] hover:text-ink"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              <hr className="my-2 border-line" />
              <Link
                href={pathname === "/" ? "#brief" : "/#brief"}
                onClick={() => setMenuOpen(false)}
                className="block"
              >
                <Button variant="primary" size="md" className="w-full">
                  Get in touch
                </Button>
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
