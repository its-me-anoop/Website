"use client";

import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { footerColumns } from "@/lib/marketing/content";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-s-line bg-s-ink">
      <div className="mx-auto w-full max-w-[1320px] px-5 pt-20 sm:px-8">
        <p className="s-label text-s-on-ink-2">Write to the studio</p>
        <a
          href={`mailto:${site.email}`}
          className="s-display mt-4 inline-block break-all text-[clamp(2rem,6.5vw,5.6rem)] underline decoration-s-signal decoration-[0.06em] underline-offset-[0.14em] transition-colors hover:text-s-signal"
        >
          {site.email}
        </a>
        <p className="mt-5 text-[16px] text-s-on-ink-2">A reply within one working day, from the person who will build your site.</p>

        <div className="mt-20 grid gap-14 border-t border-s-line pt-14 lg:grid-cols-[1fr_2fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <Image src="/flutterly-logo.png" alt="" width={28} height={28} />
              <span className="s-display text-[24px]">Flutterly</span>
            </div>
            <p className="mt-5 max-w-[340px] text-[15.5px] leading-[1.6] text-s-on-ink-2">
              An independent product studio in Reading, Berkshire. Websites for GP practices and care homes, plus web
              and mobile products.
            </p>
            <ul className="mt-6 space-y-2 text-[15.5px]">
              {[
                { label: "New projects", email: site.email },
                { label: "Existing clients", email: site.supportEmail },
              ].map((row) => (
                <li key={row.email} className="flex flex-wrap gap-x-3">
                  <span className="text-s-on-ink-2">{row.label}</span>
                  <a href={`mailto:${row.email}`} className="underline underline-offset-4 hover:decoration-s-signal">
                    {row.email}
                  </a>
                </li>
              ))}
              <li className="text-s-on-ink-2">
                {site.address.addressLocality}, {site.address.addressRegion}, UK
              </li>
            </ul>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h3 className="s-label text-s-on-ink-2">{column.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => {
                    const external = link.href.startsWith("http");
                    const classes = "text-[15.5px] text-s-on-ink underline-offset-4 hover:underline hover:decoration-s-signal";
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

        <div className="mt-16 flex flex-col gap-2 border-t border-s-line py-7 text-[14px] text-s-on-ink-2 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. {site.address.addressLocality}, UK.
          </p>
          <p>Custom-coded, accessible websites. Never a template.</p>
        </div>
      </div>
    </footer>
  );
}
