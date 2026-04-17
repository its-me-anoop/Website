"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1.0];

const navItems = [
  { name: "Work", href: "#work" },
  { name: "Practice", href: "#practice" },
  { name: "Open source", href: "#oss" },
  { name: "Studio", href: "#studio" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const getHref = (href: string) => {
    if (pathname === "/") return href;
    return `/${href}`;
  };

  return (
    <>
      <nav
        aria-label="Primary"
        className="fixed top-3 left-1/2 z-[100] -translate-x-1/2 w-[min(96vw,780px)] md:w-auto"
      >
        <div
          className="flex items-center gap-1.5 rounded-full border border-[var(--rule-2)] bg-[rgba(245,239,228,0.78)] py-2 pl-4 pr-2 backdrop-blur-xl md:gap-1.5"
          style={{
            boxShadow: scrolled
              ? "0 14px 34px -18px rgba(21,20,15,0.35)"
              : "0 10px 30px -18px rgba(21,20,15,0.18)",
            transition: "box-shadow 0.3s ease",
          }}
        >
          <Link
            href="/"
            className="flex items-center gap-2.5 border-r border-[var(--rule-2)] pr-3 font-display text-[17px] tracking-[-0.01em] text-[var(--ink)]"
          >
            <Image
              src="/flutterly-logo.png"
              alt=""
              width={22}
              height={22}
              className="h-[22px] w-[22px] rounded-full object-cover"
              priority
            />
            <span className="font-medium">Flutterly</span>
          </Link>

          <ul className="hidden items-center gap-0.5 px-1 text-[13.5px] md:flex">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={getHref(item.href)}
                  className="block rounded-full px-3 py-1.5 text-[var(--ink-2)] transition-colors hover:bg-[rgba(21,20,15,0.06)] hover:text-[var(--ink)]"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href={getHref("#brief")}
            className="group ml-auto hidden items-center gap-2 rounded-full bg-[var(--ink)] px-3.5 py-2 text-[13px] text-[var(--paper)] transition-colors hover:bg-[var(--accent)] hover:text-[var(--accent-ink)] md:inline-flex"
          >
            <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-[var(--accent)] group-hover:bg-[var(--accent-ink)]" />
            <span>Send a brief</span>
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden ml-auto inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--rule-2)] text-[var(--ink-2)]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease }}
            className="fixed inset-0 z-[99] flex flex-col items-center justify-center bg-[rgba(245,239,228,0.97)] px-6 backdrop-blur-xl md:hidden"
          >
            <motion.nav
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease }}
              className="w-full max-w-sm space-y-5 text-center"
            >
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.08 + index * 0.05,
                    ease,
                  }}
                >
                  <Link
                    href={getHref(item.href)}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block font-display text-4xl font-light tracking-tight text-[var(--ink)] transition-colors hover:text-[var(--accent)]"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, ease }}
                className="pt-8"
              >
                <Link
                  href={getHref("#brief")}
                  onClick={() => setMobileMenuOpen(false)}
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--ink)] px-7 py-3.5 text-sm font-medium text-[var(--paper)]"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                  Send a brief
                </Link>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
