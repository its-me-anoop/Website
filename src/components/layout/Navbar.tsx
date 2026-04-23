"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { Menu, X } from "lucide-react";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const navItems = [
  { name: "Work", href: "#work" },
  { name: "Process", href: "#practice" },
  { name: "Studio", href: "#about" },
];

export function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 12);
  });

  const getHref = (href: string) => (pathname === "/" ? href : `/${href}`);

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-[100]">
        <div
          className={`mx-auto flex h-12 w-full items-center justify-between px-5 text-sm transition duration-300 md:px-10 ${
            scrolled
              ? "border-b border-border bg-background/82 backdrop-blur-xl"
              : "bg-background/66 backdrop-blur-xl"
          }`}
        >
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Image
              src="/flutterly-logo.png"
              alt="Flutterly"
              width={22}
              height={22}
              className="h-[18px] w-[18px] object-contain brightness-0"
              priority
            />
            <span>Flutterly</span>
          </Link>

          <nav
            className="hidden items-center gap-8 text-xs text-foreground-secondary md:flex"
            aria-label="Primary"
          >
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={getHref(item.href)}
                className="transition duration-200 hover:text-foreground"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <Link
              href={pathname === "/" ? "#brief" : "/#brief"}
              className="inline-flex min-h-8 items-center rounded-full bg-accent px-4 text-xs font-medium text-white transition duration-200 hover:bg-accent-hover"
            >
              Start a project
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-9 w-9 items-center justify-center rounded-full text-foreground md:hidden"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.24, ease }}
            className="fixed inset-x-0 top-12 z-[99] border-b border-border bg-background/96 px-5 py-6 shadow-xl backdrop-blur-xl md:hidden"
          >
            <nav className="grid gap-1" aria-label="Mobile primary">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={getHref(item.href)}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-[8px] px-2 py-3 text-2xl font-semibold"
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href={pathname === "/" ? "#brief" : "/#brief"}
                onClick={() => setMenuOpen(false)}
                className="mt-3 inline-flex min-h-11 items-center justify-center rounded-full bg-accent px-5 text-sm font-medium text-white"
              >
                Start a project
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
