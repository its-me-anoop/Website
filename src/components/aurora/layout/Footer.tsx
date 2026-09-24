"use client";

import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { footerColumns } from "@/lib/marketing/content";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-a-line bg-a-void">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[420px] opacity-60"
        style={{
          background:
            "radial-gradient(60% 80% at 50% 110%, rgba(255,122,26,0.35), rgba(255,194,74,0.12) 45%, transparent 75%)",
        }}
      />
      <div className="relative mx-auto w-full max-w-[1320px] px-5 pt-20 sm:px-8 sm:pt-24">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_2fr]">
          <div>
            <div className="flex items-center gap-3">
              <Image src="/flutterly-logo.png" alt="" width={32} height={32} />
              <span className="a-display text-[28px]">Flutterly</span>
            </div>
            <p className="mt-6 max-w-[340px] text-[15px] leading-[1.65] text-a-ink-soft">
              An independent product studio in Reading, Berkshire. Websites for GP practices and care homes,
              plus web and mobile products.
            </p>
            <ul className="mt-8 space-y-2.5 text-[15px]">
              {[
                { label: "New projects", email: site.email },
                { label: "Existing clients", email: site.supportEmail },
              ].map((row) => (
                <li key={row.email} className="flex flex-wrap gap-x-3">
                  <span className="text-a-muted">{row.label}</span>
                  <a
                    href={`mailto:${row.email}`}
                    className="text-a-ink underline decoration-a-line-2 underline-offset-4 transition-colors hover:decoration-a-amber"
                  >
                    {row.email}
                  </a>
                </li>
              ))}
              <li className="text-a-muted">
                {site.address.addressLocality}, {site.address.addressRegion}, UK
              </li>
            </ul>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h3 className="a-mono text-[11px] font-medium uppercase tracking-[0.16em] text-a-muted">
                  {column.title}
                </h3>
                <ul className="mt-5 space-y-3">
                  {column.links.map((link) => {
                    const external = link.href.startsWith("http");
                    const classes = "text-[14.5px] text-a-ink-soft transition-colors hover:text-a-amber";
                    return (
                      <li key={link.label}>
                        {external ? (
                          <a href={link.href} target="_blank" rel="noopener noreferrer" className={classes}>
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

        <p aria-hidden className="a-wordmark mt-20 select-none text-center text-[clamp(5rem,22vw,20rem)]">
          flutterly
        </p>

        <div className="relative flex flex-col gap-2 border-t border-a-line py-7 text-[13px] text-a-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. {site.address.addressLocality}, UK.
          </p>
          <p>Custom-coded, accessible websites. Never a template.</p>
        </div>
      </div>
    </footer>
  );
}
