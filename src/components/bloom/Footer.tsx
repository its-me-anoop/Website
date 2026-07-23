"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/lib/site";
import { footerColumns } from "./data";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-bl-pine text-bl-pine-ink">
      <div className="mx-auto w-full max-w-[1240px] px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <Image src="/flutterly-logo.png" alt="" width={32} height={32} />
              <span className="text-[17px] font-semibold tracking-tight">
                Flutterly
              </span>
            </div>
            <p className="mt-4 max-w-[300px] text-[14px] leading-relaxed text-bl-pine-ink/65">
              An independent product studio in Reading, UK — websites for GP
              practices, care homes and ambitious products.
            </p>
            <ul className="mt-6 space-y-3 text-[14px]">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-2.5 text-bl-pine-ink/85 transition-colors hover:text-white"
                >
                  <Mail size={15} aria-hidden />
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${site.phone}`}
                  className="inline-flex items-center gap-2.5 text-bl-pine-ink/85 transition-colors hover:text-white"
                >
                  <Phone size={15} aria-hidden />
                  {site.phoneDisplay}
                </a>
              </li>
              <li className="inline-flex items-start gap-2.5 text-bl-pine-ink/65">
                <MapPin size={15} aria-hidden className="mt-0.5 shrink-0" />
                <span>
                  {site.address.addressLocality}, {site.address.addressRegion},{" "}
                  {site.address.addressCountry === "GB" ? "UK" : site.address.addressCountry}
                </span>
              </li>
            </ul>
          </div>

          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-10 sm:grid-cols-4"
          >
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h3 className="text-[12px] font-semibold uppercase tracking-[0.2em] text-bl-pine-ink/50">
                  {column.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => {
                    const external = link.href.startsWith("http");
                    const classes =
                      "text-[14px] text-bl-pine-ink/80 transition-colors hover:text-white";
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
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-7 text-[13px] text-bl-pine-ink/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName} · {site.address.addressLocality}, UK
          </p>
          <p>Custom-coded, accessible websites — never a template.</p>
        </div>
      </div>
    </footer>
  );
}
