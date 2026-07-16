"use client";

import Image from "next/image";
import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { site } from "@/lib/site";
import { footerColumns } from "./data";

const socials = [
  { href: site.social.github, label: "GitHub", Icon: Github, external: true },
  { href: site.social.linkedin, label: "LinkedIn", Icon: Linkedin, external: true },
  { href: `mailto:${site.email}`, label: `Email ${site.email}`, Icon: Mail, external: false },
] as const;

export function Footer() {
  return (
    <footer
      id="contact"
      className="mx-auto w-full max-w-[1240px] px-5 pb-12 sm:px-8"
    >
      <div className="rounded-[36px] bg-at-panel px-7 py-12 sm:px-12 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,2fr)]">
          {/* Studio blurb */}
          <div>
            <div className="flex items-center gap-2.5">
              <Image src="/flutterly-logo.png" alt="" width={30} height={30} />
              <span className="text-[17px] font-semibold tracking-tight text-at-ink">
                Flutterly
              </span>
            </div>
            <h2 className="mt-6 text-[clamp(1.6rem,3vw,2.1rem)] font-medium leading-[1.1] tracking-[-0.03em] text-at-ink">
              One studio, your product.
            </h2>
            <p className="mt-3 max-w-[360px] text-[14px] leading-relaxed text-at-ink-soft">
              Focused web and mobile products, designed and engineered in
              Reading, UK. Replies usually within 48 hours.
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mt-4 inline-block text-[15px] font-medium text-at-ink underline decoration-at-line-2 underline-offset-4 transition-colors hover:decoration-at-ink"
            >
              {site.email}
            </a>
            <div className="mt-7 flex gap-2.5">
              {socials.map(({ href, label, Icon, external }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="liquid flex h-10 w-10 items-center justify-center rounded-full transition-transform duration-300 hover:-translate-y-0.5"
                >
                  <Icon size={16} aria-hidden />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3"
          >
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h3 className="text-[12px] font-medium uppercase tracking-[0.22em] text-at-ink-soft">
                  {column.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => {
                    const external = link.href.startsWith("http");
                    const Tag = external ? "a" : Link;
                    const badge = "badge" in link ? link.badge : undefined;
                    return (
                      <li key={link.label}>
                        <Tag
                          href={link.href}
                          {...(external
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {})}
                          className="inline-flex items-center gap-2 text-[14px] font-medium text-at-ink-soft transition-colors hover:text-at-ink"
                        >
                          {link.label}
                          {badge && (
                            <span className="rounded-full bg-at-terracotta/15 px-2 py-0.5 text-[10.5px] font-medium text-at-terracotta">
                              {badge}
                            </span>
                          )}
                        </Tag>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-at-line pt-7 text-[12.5px] text-at-ink-soft">
          {/* Statically prerendered — the client may hydrate in a later
              year, which is fine to leave as-is. */}
          <span suppressHydrationWarning>
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </span>
          <span>
            Reading, United Kingdom · {site.phoneDisplay}
          </span>
        </div>
      </div>
    </footer>
  );
}
