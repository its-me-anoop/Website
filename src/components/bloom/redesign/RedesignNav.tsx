"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import styles from "./redesign-shell.module.css";

const links = [
  { href: "/", label: "Home" },
  { href: "/gp-websites", label: "GP practices" },
  { href: "/care-home-websites", label: "Care homes" },
  { href: "/services", label: "Services" },
  { href: "/packages", label: "Packages" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

function PlusIcon() {
  return (
    <svg
      className={styles.plusIcon}
      viewBox="0 0 8 8"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path d="M3.99512 0V8M8 3.995L0 3.99499" stroke="currentColor" />
    </svg>
  );
}

export function RedesignNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.navInner}>
          <Link href="/" className={styles.brand} aria-label="Flutterly home">
            <Image
              src="/flutterly-logo.png"
              alt=""
              width={32}
              height={32}
              priority
              className={styles.brandMark}
            />
            <span className={styles.brandWords}>
              <span className={styles.brandName}>Flutterly</span>
              <span className={styles.brandDescriptor}>Digital delivery</span>
            </span>
          </Link>

          <div className={styles.navActions}>
            <Link href="/book" className={styles.bookButton}>
              Book a call
            </Link>
            <button
              type="button"
              className={styles.menuButton}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="flutterly-navigation"
              onClick={() => setOpen((value) => !value)}
            >
              <PlusIcon />
              <span>{open ? "Close" : "Menu"}</span>
            </button>
          </div>
        </div>
      </header>

      <nav
        id="flutterly-navigation"
        aria-label="Primary navigation"
        aria-hidden={open ? undefined : true}
        inert={open ? undefined : true}
        className={`${styles.menuOverlay} ${open ? styles.menuOverlayOpen : ""}`}
      >
        <div className={styles.menuGrid}>
          {links.map((link, index) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`${styles.menuLink} ${active ? styles.menuLinkActive : ""}`}
                onClick={() => setOpen(false)}
              >
                <span className={styles.menuIndex}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                {link.label}
              </Link>
            );
          })}
        </div>
        <div className={styles.menuFooter}>
          <Link href="/book" className={styles.menuBadge} onClick={() => setOpen(false)}>
            Book a call
          </Link>
          <a
            href={`mailto:${site.email}`}
            className={styles.menuBadge}
            onClick={() => setOpen(false)}
          >
            Email
          </a>
          <a
            href={site.social.linkedin}
            className={styles.menuBadge}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </nav>
    </>
  );
}
