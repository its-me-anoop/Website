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
 * A sleek, high-precision floating glassmorphic Navigation Bar
 * with Apple-style fluid animations.
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
      <motion.header 
        className="fixed left-0 right-0 top-0 z-[100] p-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
          delay: 0.1,
        }}
      >
        <motion.div
          className={cn(
            "mx-auto flex h-14 w-full max-w-[1200px] items-center justify-between rounded-full border px-6 text-[13px] transition-all",
            scrolled || menuOpen
              ? "border-white/[0.06] bg-black/70 shadow-lg shadow-black/30 backdrop-blur-xl"
              : "border-transparent bg-transparent"
          )}
          animate={{
            backgroundColor: scrolled || menuOpen ? "rgba(0, 0, 0, 0.7)" : "rgba(0, 0, 0, 0)",
            borderColor: scrolled || menuOpen ? "rgba(255, 255, 255, 0.06)" : "rgba(255, 255, 255, 0)",
          }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-2.5 font-sans font-medium text-white transition-opacity duration-300 hover:opacity-80"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Image
                src="/flutterly-logo.png"
                alt="Flutterly"
                width={20}
                height={20}
                className="h-5 w-5 object-contain invert brightness-0"
                priority
              />
            </motion.div>
            <span className="tracking-tight text-white font-semibold">Flutterly</span>
          </Link>

          {/* Desktop Nav */}
          <nav
            className="hidden items-center gap-1 text-[12px] font-medium tracking-wide text-zinc-400 md:flex relative"
            aria-label="Primary"
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.href.slice(1);
              return (
                <Link
                  key={item.name}
                  href={getHref(item.href)}
                  className={cn(
                    "relative rounded-full px-4 py-2 transition-colors duration-300",
                    isActive ? "text-white font-semibold" : "hover:text-white"
                  )}
                >
                  {isActive && !shouldReduceMotion && (
                    <motion.span
                      layoutId="active-nav-pill"
                      className="absolute inset-0 -z-10 rounded-full border border-white/[0.08] bg-white/[0.04] backdrop-blur-md"
                      transition={{ 
                        type: "spring", 
                        stiffness: 400, 
                        damping: 35,
                      }}
                    />
                  )}
                  {isActive && shouldReduceMotion && (
                    <span className="absolute inset-0 -z-10 rounded-full border border-white/[0.08] bg-white/[0.04] backdrop-blur-md" />
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
          <motion.button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-9 w-9 items-center justify-center rounded-full text-zinc-400 transition-colors duration-300 hover:text-white md:hidden"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {menuOpen ? (
                <motion.div
                  key="close"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={18} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={18} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.div>
      </motion.header>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ 
              duration: 0.3, 
              ease: [0.22, 1, 0.36, 1],
            }}
            className="fixed inset-x-0 top-20 z-[99] mx-4 rounded-[24px] border border-white/[0.06] bg-black/95 px-6 py-6 shadow-2xl backdrop-blur-2xl md:hidden"
          >
            <nav className="grid gap-1" aria-label="Mobile primary">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    delay: index * 0.05,
                    duration: 0.3,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Link
                    href={getHref(item.href)}
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-xl px-3 py-3.5 text-lg font-medium text-zinc-300 transition-all duration-300 hover:bg-white/[0.04] hover:text-white"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              <motion.hr 
                className="my-3 border-white/[0.04]"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 0.25, duration: 0.4 }}
              />
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                <Link
                  href={pathname === "/" ? "#brief" : "/#brief"}
                  onClick={() => setMenuOpen(false)}
                  className="mt-2 block"
                >
                  <AppleButton variant="primary" className="w-full text-[13px] font-semibold">
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
