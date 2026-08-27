"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import styles from "./redesign-shell.module.css";

const links = [
  { href: "/", label: "Home" },
  { href: "/gp-websites", label: "GP practices" },
  { href: "/care-home-websites", label: "Care homes" },
  { href: "/packages", label: "Packages" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export function RedesignNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.navInner}>
        <Link href="/" className={styles.brand} aria-label="Flutterly home">
          <Image
            src="/flutterly-logo.png"
            alt=""
            width={40}
            height={40}
            priority
            className={styles.brandMark}
          />
          <span className={styles.brandWords}>
            <span className={styles.brandName}>Flutterly</span>
            <span className={styles.brandDescriptor}>Digital delivery</span>
          </span>
        </Link>

        <nav className={styles.desktopNav} aria-label="Primary navigation">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.navLink} ${active ? styles.navLinkActive : ""}`}
                aria-current={active ? "page" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className={styles.navActions}>
          <Link href="/book" className={styles.bookButton}>
            Book a call
          </Link>
          <button
            type="button"
            className={styles.menuButton}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="flutterly-mobile-navigation"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X aria-hidden size={21} /> : <Menu aria-hidden size={21} />}
          </button>
        </div>
      </div>

      <nav
        id="flutterly-mobile-navigation"
        aria-label="Mobile navigation"
        className={`${styles.mobileNav} ${open ? styles.mobileNavOpen : ""}`}
        hidden={!open}
      >
        {links.map((link, index) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={active ? "page" : undefined}
              className={styles.mobileLink}
              onClick={() => setOpen(false)}
            >
              <span>0{index + 1}</span>
              {link.label}
            </Link>
          );
        })}
        <Link
          href="/book"
          className={styles.mobileBookButton}
          onClick={() => setOpen(false)}
        >
          Book a call
        </Link>
      </nav>
    </header>
  );
}
