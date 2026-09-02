"use client";

import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { footerColumns } from "./data";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="on-coal bg-k-coal text-k-coal-ink">
      <div className="mx-auto w-full max-w-[1280px] px-5 pb-10 pt-16 sm:px-8 sm:pt-20">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_2fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <Image src="/flutterly-logo.png" alt="" width={28} height={28} />
              <span className="k-display text-[26px] leading-none">Flutterly</span>
            </div>
            <p className="mt-5 max-w-[320px] text-[15px] leading-[1.6] text-k-coal-soft">
              An independent product studio in Reading, Berkshire. Websites
              for GP practices and care homes, plus web and mobile products.
            </p>
            <ul className="mt-7 space-y-2 text-[15px]">
              {[
                { label: "New projects", email: site.email },
                { label: "Existing clients", email: site.supportEmail },
              ].map((row) => (
                <li key={row.email} className="flex flex-wrap gap-x-3">
                  <span className="text-k-coal-soft">{row.label}</span>
                  <a
                    href={`mailto:${row.email}`}
                    className="text-k-coal-ink underline decoration-k-coal-line underline-offset-4 transition-colors hover:decoration-k-coal-ink"
                  >
                    {row.email}
                  </a>
                </li>
              ))}
              <li className="text-k-coal-soft">
                {site.address.addressLocality}, {site.address.addressRegion}, UK
              </li>
            </ul>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h3 className="k-eyebrow text-k-coal-soft">{column.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => {
                    const external = link.href.startsWith("http");
                    const classes =
                      "text-[14.5px] text-k-coal-ink/85 transition-colors hover:text-k-coal-ink";
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

        <div className="mt-16 flex flex-col gap-2 border-t border-k-coal-line pt-6 text-[13px] text-k-coal-soft sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. {site.address.addressLocality}, UK.
          </p>
          <p>Custom-coded, accessible websites. Never a template.</p>
        </div>
      </div>
    </footer>
  );
}
