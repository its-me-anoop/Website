"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  m as motion,
  useMotionValueEvent,
  useScroll,
  useReducedMotion,
} from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Work", href: "#work" },
  { name: "Services", href: "#services" },
  { name: "Process", href: "#practice" },
  { name: "About", href: "#studio" },
];

/** Section ids observed to drive the active-link state. */
const sectionIds = ["work", "services", "practice", "studio"];

/**
 * Noir chrome: a slim fixed bar — wordmark left, quiet uppercase links and a
 * bracketed "Let's talk" CTA right — that gains a frosted backdrop on scroll.
 * Mobile gets a full-height curtain menu with oversized links.
 */
export function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const reduce = useReducedMotion();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 10);
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

  // Lock page scroll behind the full-screen menu.
  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [menuOpen]);

  const hrefFor = (href: string) => (pathname === "/" ? href : `/${href}`);

  return (
    <>
      <motion.header
        className={cn(
          "fixed inset-x-0 top-0 z-[100] transition-[background-color,box-shadow] duration-500",
          scrolled && !menuOpen ? "frosted shadow-[0_1px_0_var(--line)]" : "bg-transparent"
        )}
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      >
        <div className="mx-auto flex h-16 w-full max-w-[1320px] items-center justify-between px-[var(--gutter)]">
          {/* Wordmark */}
          <Link
            href="/"
            className="font-display text-[17px] font-semibold tracking-tight text-ink"
            aria-label="Flutterly — home"
          >
            Flutterly<span className="text-accent">.</span>
          </Link>

          {/* Desktop nav */}
          <nav
            className="hidden items-center gap-8 text-[13.5px] font-medium text-ink-3 md:flex"
            aria-label="Primary"
          >
            {navItems.map((item) => {
              const active = activeSection === item.href.slice(1);
              return (
                <Link
                  key={item.name}
                  href={hrefFor(item.href)}
                  className={cn(
                    "group relative py-1 transition-colors duration-300",
                    active ? "text-ink" : "hover:text-ink"
                  )}
                >
                  {item.name}
                  <span
                    className={cn(
                      "absolute -bottom-0.5 left-0 h-px bg-accent transition-all duration-300",
                      active ? "w-full" : "w-0 group-hover:w-full"
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Link
              href={pathname === "/" ? "#brief" : "/#brief"}
              className="group inline-flex h-9 items-center gap-1.5 rounded-full bg-accent px-4 text-[12.5px] font-semibold text-accent-ink transition-colors duration-300 hover:bg-accent-hover"
            >
              Start a project
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Mobile toggle */}
          <motion.button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line-2 text-ink transition-colors duration-300 hover:border-line-3 md:hidden"
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

      {/* Mobile curtain menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={reduce ? { opacity: 0 } : { y: "-100%" }}
            animate={reduce ? { opacity: 1 } : { y: 0 }}
            exit={reduce ? { opacity: 0 } : { y: "-100%" }}
            transition={{ duration: 0.55, ease: [0.83, 0, 0.17, 1] }}
            className="fixed inset-0 z-[99] flex flex-col justify-end bg-night px-[var(--gutter)] pb-12 pt-24 md:hidden"
          >
            <nav className="grid gap-2" aria-label="Mobile primary">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden border-b border-white/10"
                >
                  <Link
                    href={hrefFor(item.href)}
                    onClick={() => setMenuOpen(false)}
                    className="group flex items-baseline justify-between py-4 font-display text-[clamp(32px,8.5vw,48px)] font-semibold leading-none tracking-[-0.02em] text-night-ink transition-colors duration-300 hover:text-accent"
                  >
                    {item.name}
                    <span className="font-mono text-[11px] tracking-[0.2em] text-white/40">
                      0{i + 1}
                    </span>
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.5 }}
                className="mt-8"
              >
                <Link
                  href={pathname === "/" ? "#brief" : "/#brief"}
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-[14px] font-semibold text-accent-ink"
                >
                  Start a project
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
