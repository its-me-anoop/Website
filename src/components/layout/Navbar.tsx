"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { Menu, X } from "lucide-react";
import { AppleButton } from "@/components/ui/AppleButton";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Services", href: "#services" },
  { name: "Work", href: "#work" },
  { name: "Process", href: "#practice" },
  { name: "Studio", href: "#studio" },
];

export function Navbar() {
  const pathname = usePathname();
  const { scrollY, scrollYProgress } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const shouldReduceMotion = useReducedMotion();

  // Scroll progress for top progress bar
  const progress = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 40,
    restDelta: 0.001,
  });
  const progressScale = useTransform(progress, [0, 1], [0, 1]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24);
    if (latest < 100) setActiveSection("");
  });

  useEffect(() => {
    const sections = ["services", "work", "practice", "oss", "studio"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { root: null, rootMargin: "-30% 0px -50% 0px", threshold: 0.1 }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.unobserve(el);
    });
  }, []);

  // Close menu on Esc
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const getHref = (href: string) => (pathname === "/" ? href : `/${href}`);

  return (
    <>
      {/* Top scroll progress bar */}
      <motion.div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-[110] h-[2px] origin-left bg-gradient-to-r from-brand via-violet to-fuchsia"
        style={{ scaleX: progressScale }}
      />

      <motion.header
        className="fixed inset-x-0 top-0 z-[100] p-3 md:p-4"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
      >
        <motion.div
          className={cn(
            "mx-auto flex h-14 w-full max-w-[1200px] items-center justify-between rounded-full border px-5 text-[13px] transition-all duration-400",
            scrolled || menuOpen
              ? "border-white/[0.08] bg-[rgba(10,11,20,0.7)] shadow-xl shadow-black/40 backdrop-blur-2xl"
              : "border-transparent bg-transparent"
          )}
        >
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-2.5 font-display font-semibold text-white"
            aria-label="Flutterly home"
          >
            <motion.div
              whileHover={{ rotate: -6, scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
              className="relative grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-brand to-fuchsia shadow-md shadow-brand/30"
            >
              <Image
                src="/flutterly-logo.png"
                alt=""
                width={18}
                height={18}
                className="h-4 w-4 object-contain invert brightness-0"
                priority
              />
            </motion.div>
            <span className="tracking-tight">Flutterly</span>
          </Link>

          {/* Desktop nav */}
          <nav
            className="relative hidden items-center gap-0.5 text-[12.5px] font-medium tracking-tight text-ink-3 md:flex"
            aria-label="Primary"
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.href.slice(1);
              return (
                <Link
                  key={item.name}
                  href={getHref(item.href)}
                  className={cn(
                    "relative rounded-full px-3.5 py-1.5 transition-colors duration-300",
                    isActive ? "text-white" : "hover:text-white"
                  )}
                >
                  {isActive && !shouldReduceMotion && (
                    <motion.span
                      layoutId="active-nav-pill"
                      className="absolute inset-0 -z-10 rounded-full border border-white/[0.08] bg-white/[0.05] backdrop-blur"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  {isActive && shouldReduceMotion && (
                    <span className="absolute inset-0 -z-10 rounded-full border border-white/[0.08] bg-white/[0.05] backdrop-blur" />
                  )}
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* CTA */}
          <div className="hidden md:block">
            <Link href={pathname === "/" ? "#brief" : "/#brief"}>
              <AppleButton variant="primary" size="sm" magnetic={false}>
                Start a project
              </AppleButton>
            </Link>
          </div>

          {/* Mobile menu */}
          <motion.button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04] text-ink-2 backdrop-blur transition-colors duration-300 hover:text-white md:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            whileTap={{ scale: 0.94 }}
          >
            <AnimatePresence mode="wait">
              {menuOpen ? (
                <motion.div
                  key="x"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={18} aria-hidden="true" />
                </motion.div>
              ) : (
                <motion.div
                  key="m"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={18} aria-hidden="true" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.div>
      </motion.header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-3 top-[72px] z-[99] rounded-[28px] border border-white/[0.08] bg-[rgba(10,11,20,0.92)] p-5 shadow-2xl backdrop-blur-2xl md:hidden"
          >
            <nav className="grid gap-1" aria-label="Mobile primary">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={getHref(item.href)}
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-xl px-3 py-3 text-[17px] font-medium text-ink-2 transition-all duration-300 hover:bg-white/[0.04] hover:text-white"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              <motion.hr
                className="my-2 border-white/[0.06]"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ delay: 0.25, duration: 0.35 }}
              />
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.35 }}
              >
                <Link
                  href={pathname === "/" ? "#brief" : "/#brief"}
                  onClick={() => setMenuOpen(false)}
                  className="block"
                >
                  <AppleButton variant="primary" size="md" className="w-full" magnetic={false}>
                    Start a project
                  </AppleButton>
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
