"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { site } from "@/lib/site";
import { Reveal } from "@/components/fx";
import { footerColumns } from "./data";

/**
 * The closing band: contact details, the site map, and an oversized
 * wordmark that the aurora light grazes from below. The wordmark is
 * `aria-hidden` — the accessible name of the studio is already in the
 * logo link above it.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/8">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%] bg-[radial-gradient(70%_120%_at_50%_120%,rgba(47,216,173,0.22),transparent_70%)]"
      />

      <div className="relative mx-auto w-full max-w-[1240px] px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_2fr]">
          <Reveal>
            <Link href="/" className="inline-flex items-center gap-2.5">
              <Image src="/flutterly-logo.png" alt="" width={32} height={32} />
              <span className="text-[17px] font-semibold tracking-tight text-au-ink">
                Flutterly
              </span>
            </Link>
            <p className="mt-4 max-w-[320px] text-[14px] leading-relaxed text-au-ink-3">
              An independent product studio in Reading, UK — websites for GP
              practices, care homes and ambitious products.
            </p>
            <ul className="mt-6 space-y-3 text-[14px]">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="group inline-flex items-center gap-2.5 text-au-ink-2 transition-colors duration-300 hover:text-au-teal"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.045] text-au-teal transition-colors duration-300 group-hover:border-au-teal/40">
                    <Mail size={14} aria-hidden />
                  </span>
                  {site.email}
                </a>
              </li>
              <li className="inline-flex items-center gap-2.5 text-au-ink-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.045] text-au-ink-3">
                  <MapPin size={14} aria-hidden />
                </span>
                {site.address.addressLocality}, {site.address.addressRegion}, UK
              </li>
            </ul>
          </Reveal>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4">
            {footerColumns.map((column, i) => (
              <Reveal key={column.title} delay={0.06 * i}>
                <h2 className="au-mono text-[11px] font-medium uppercase tracking-[0.24em] text-au-muted">
                  {column.title}
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => {
                    const external = link.href.startsWith("http");
                    const classes =
                      "group inline-flex items-center gap-1 text-[14px] text-au-ink-2 transition-colors duration-300 hover:text-au-teal";
                    return (
                      <li key={link.label}>
                        {external ? (
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={classes}
                          >
                            {link.label}
                            <ArrowUpRight
                              size={13}
                              aria-hidden
                              className="opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                            />
                          </a>
                        ) : (
                          <Link href={link.href} className={classes}>
                            {link.label}
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </Reveal>
            ))}
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-white/8 pt-7 text-[13px] text-au-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName} · {site.address.addressLocality}, UK
          </p>
          <p>Custom-coded, accessible websites — never a template.</p>
        </div>
      </div>

      {/* Oversized wordmark, clipped by the viewport edge. */}
      <div aria-hidden className="relative select-none overflow-hidden">
        <p className="au-fade-text -mb-[0.18em] w-full whitespace-nowrap px-2 text-center text-[clamp(3.4rem,17vw,15rem)] font-semibold leading-none tracking-[-0.055em] opacity-[0.16]">
          Flutterly
        </p>
      </div>
    </footer>
  );
}
