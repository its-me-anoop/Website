"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navLinks } from "@/lib/marketing/content";
import { serviceHref, services } from "@/lib/marketing/services";
import { StudioMark } from "./StudioMark";
import "./studio-shell.css";

export function Nav() {
  const pathname = usePathname();
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn !== null && openOn === pathname;
  const header = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenOn(null);
        toggle.current?.focus();
      }
    }
    function handleOutside(event: Event) {
      if (event.target instanceof Node && !header.current?.contains(event.target)) {
        setOpenOn(null);
      }
    }
    document.addEventListener("keydown", handleEscape);
    document.addEventListener("focusin", handleOutside);
    document.addEventListener("pointerdown", handleOutside);
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("focusin", handleOutside);
      document.removeEventListener("pointerdown", handleOutside);
    };
  }, [open]);

  function currentPage(href: string) {
    return !href.includes("#") && (pathname === href || pathname?.startsWith(href + "/")) ? "page" : undefined;
  }

  return (
    <header ref={header} className="studio-header">
      <div className="studio-nav-inner">
        <Link href="/" aria-label="Flutterly home" className="studio-brand" onClick={() => setOpenOn(null)}>
          <StudioMark />
        </Link>
        <nav aria-label="Primary" className="studio-primary">
          {navLinks.map(({ href, label }) => (
            <Link key={href} href={href} aria-current={currentPage(href)}>{label}</Link>
          ))}
        </nav>
        <div className="studio-nav-actions">
          <Link href="/book" className="studio-call" onClick={() => setOpenOn(null)}>
            Book a call <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
          <button
            ref={toggle} type="button" className="studio-menu-toggle"
            aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}
            aria-controls={open ? "site-menu" : undefined}
            onClick={() => setOpenOn(open ? null : pathname)}
          >
            {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </div>
      {open && (
        <nav id="site-menu" aria-label="Site menu" className="studio-menu">
          <div className="studio-menu-inner">
            <ul className="studio-menu-main">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} aria-current={currentPage(href)} onClick={() => setOpenOn(null)}>
                    {label}<ArrowUpRight size={18} aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
            <div className="studio-menu-secondary">
              <p>Explore services</p>
              {services.map(({ slug, name }) => (
                <Link key={slug} href={serviceHref(slug)} onClick={() => setOpenOn(null)}>{name}</Link>
              ))}
              <Link href="/free-audit" onClick={() => setOpenOn(null)}>Free website audit</Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
