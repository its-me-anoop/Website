"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { name: "Services", href: "/#services" },
  { name: "Work", href: "/projects" },
  { name: "About", href: "/#about" },
  { name: "Contact", href: "/#contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
          isScrolled
            ? "bg-black/80 backdrop-blur-2xl backdrop-saturate-150"
            : "bg-transparent"
        }`}
      >
        <nav
          className="max-w-[980px] mx-auto px-6 lg:px-0 h-12 flex items-center justify-between"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link
            href="/"
            className="relative h-7 w-28 shrink-0"
            aria-label="Flutterly - Home"
          >
            <Image
              src="/logo-horizontal.png"
              alt="Flutterly"
              fill
              className="object-contain object-left"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-xs text-gray-300 hover:text-white transition-colors duration-300"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden relative w-8 h-8 flex items-center justify-center"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            <div className="relative w-[17px] h-[9px]">
              <span
                className={`absolute left-0 top-0 w-full h-[1px] bg-gray-100 transition-all duration-300 ease-in-out origin-center ${
                  isMobileMenuOpen
                    ? "rotate-45 translate-y-[4px]"
                    : "rotate-0 translate-y-0"
                }`}
              />
              <span
                className={`absolute left-0 bottom-0 w-full h-[1px] bg-gray-100 transition-all duration-300 ease-in-out origin-center ${
                  isMobileMenuOpen
                    ? "-rotate-45 -translate-y-[4px]"
                    : "rotate-0 translate-y-0"
                }`}
              />
            </div>
          </button>
        </nav>

        {/* Apple-style thin border when scrolled */}
        {isScrolled && (
          <div className="h-px bg-[#424245]/60" aria-hidden="true" />
        )}
      </header>

      {/* Mobile Menu - Full screen overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-400 ease-in-out ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/95 backdrop-blur-2xl"
          onClick={closeMobileMenu}
        />

        {/* Menu content */}
        <div className="relative z-10 pt-20 px-12 h-full flex flex-col">
          <div className="flex-1 flex flex-col justify-center -mt-20">
            {navLinks.map((link, index) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={closeMobileMenu}
                className={`block py-4 border-b border-[#333336] text-2xl font-semibold text-gray-100 tracking-tight transition-all duration-300 ease-in-out ${
                  isMobileMenuOpen
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
                style={{
                  transitionDelay: isMobileMenuOpen
                    ? `${150 + index * 50}ms`
                    : "0ms",
                }}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
