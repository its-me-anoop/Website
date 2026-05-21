"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { AppleButton } from "@/components/ui/AppleButton";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Work", href: "#work" },
  { name: "Process", href: "#practice" },
  { name: "Studio", href: "#studio" },
  { name: "Open Source", href: "#oss" },
];

/**
 * A sleek, high-precision floating glassmorphic Navigation Bar.
 * Styled in the official Apple pro aesthetic, using Geist sans-serif,
 * glass/blur overlays, and responsive mobile integrations.
 */
export function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const shouldReduceMotion = useReducedMotion();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 20);
    if (latest < 100) {
      setActiveSection("");
    }
  });

  useEffect(() => {
    const sections = ["work", "practice", "studio", "oss"];
    const observerOptions = {
      root: null,
      rootMargin: "-30% 0px -50% 0px",
      threshold: 0.1,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const getHref = (href: string) => (pathname === "/" ? href : `/${href}`);

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-[100] p-4 transition-all duration-500">
        <div
          className={`mx-auto flex h-14 w-full max-w-[1200px] items-center justify-between rounded-full border px-6 text-[13px] transition-all duration-500 ${
            scrolled || menuOpen
              ? "border-white/10 bg-[#000000]/70 shadow-lg shadow-black/40 backdrop-blur-xl"
              : "border-transparent bg-transparent"
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 font-sans font-medium text-white transition-opacity hover:opacity-85">
            <Image
              src="/flutterly-logo.png"
              alt="Flutterly"
              width={20}
              height={20}
              className="h-5 w-5 object-contain invert brightness-0"
              priority
            />
            <span className="tracking-tight text-white font-semibold">Flutterly</span>
          </Link>

          {/* Desktop Nav */}
          <nav
            className="hidden items-center gap-1.5 text-[12px] font-medium tracking-wide text-zinc-400 md:flex relative"
            aria-label="Primary"
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.href.slice(1);
              return (
                <Link
                  key={item.name}
                  href={getHref(item.href)}
                  className={cn(
                    "relative rounded-full px-4 py-1.5 transition-colors duration-300",
                    isActive ? "text-white font-semibold" : "hover:text-white"
                  )}
                >
                  {isActive && !shouldReduceMotion && (
                    <motion.span
                      layoutId="active-nav-pill"
                      className="absolute inset-0 -z-10 rounded-full border border-white/10 bg-white/5 shadow-inner backdrop-blur-md"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {isActive && shouldReduceMotion && (
                    <span className="absolute inset-0 -z-10 rounded-full border border-white/10 bg-white/5 shadow-inner backdrop-blur-md" />
                  )}
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Start CTA */}
          <div className="hidden md:block">
            <Link href={pathname === "/" ? "#brief" : "/#brief"}>
              <AppleButton variant="primary" className="min-h-9 px-4 py-1.5 text-[11px] font-semibold">
                Start a project
              </AppleButton>
            </Link>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-9 w-9 items-center justify-center rounded-full text-zinc-400 hover:text-white transition-colors md:hidden"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 top-20 z-[99] mx-4 rounded-3xl border border-white/10 bg-[#000000]/95 px-6 py-6 shadow-2xl backdrop-blur-2xl md:hidden"
          >
            <nav className="grid gap-2" aria-label="Mobile primary">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={getHref(item.href)}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl px-3 py-3 text-lg font-medium text-zinc-300 transition-colors hover:bg-white/5 hover:text-white"
                >
                  {item.name}
                </Link>
              ))}
              <hr className="my-2 border-white/5" />
              <Link
                href={pathname === "/" ? "#brief" : "/#brief"}
                onClick={() => setMenuOpen(false)}
                className="mt-2 block"
              >
                <AppleButton variant="primary" className="w-full text-[13px] font-semibold">
                  Start a project
                </AppleButton>
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
