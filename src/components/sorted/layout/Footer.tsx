"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { CSSProperties, ReactNode } from "react";
import { site } from "@/lib/site";
import { footerColumns } from "@/lib/marketing/content";

const WORDMARK = "Flutterly";
const letterTones = ["#ffffff", "var(--s-sun)", "var(--s-pink)", "var(--s-jade)", "var(--s-flame)"] as const;

/**
 * The navy foot of every page: who to write to, every route in five
 * columns, and the name spelled out in keys you can press.
 * `credit` replaces the closing line, e.g. a product's creator credit.
 */
export function Footer({ credit }: { credit?: ReactNode } = {}) {
  const year = new Date().getFullYear();
  const pathname = usePathname();

  return (
    <footer className="tone-navy relative overflow-hidden">
      <div className="mx-auto w-full max-w-[1320px] px-5 pt-16 sm:px-8 sm:pt-20">
        <div className="grid gap-14 xl:grid-cols-[1fr_2.5fr]">
          <div>
            <div className="flex items-center gap-3">
              <Image src="/flutterly-logo.png" alt="" width={40} height={40} />
              <span className="s-display text-[30px]">Flutterly</span>
            </div>
            <p className="mt-5 max-w-[360px] text-[16px] leading-[1.6] text-s-ink-soft">
              Websites, apps, IT support, social media and SEO for businesses in Reading and beyond. Designed,
              built and looked after by one studio.
            </p>
            <ul className="mt-7 space-y-3 text-[15.5px]">
              {[
                { label: "New projects", email: site.email },
                { label: "Existing clients", email: site.supportEmail },
              ].map((row) => (
                <li key={row.email} className="flex flex-col gap-0.5">
                  <span className="s-label text-[12px] text-s-muted">{row.label}</span>
                  <a href={`mailto:${row.email}`} className="s-ul w-fit font-semibold text-s-ink">
                    {row.email}
                  </a>
                </li>
              ))}
              <li className="pt-1 text-s-muted">
                {site.address.addressLocality}, {site.address.addressRegion}, UK
              </li>
            </ul>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h3 className="s-label border-b-2 border-s-line-2 pb-2.5 text-[13px] text-s-accent">{column.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => {
                    const external = link.href.startsWith("http");
                    const classes =
                      "inline-flex min-h-6 items-center text-[15px] text-s-ink-soft transition-colors hover:text-white aria-[current=page]:font-semibold aria-[current=page]:text-white";
                    return (
                      <li key={link.label}>
                        {external ? (
                          <a href={link.href} target="_blank" rel="noopener noreferrer" className={classes}>
                            {link.label}
                          </a>
                        ) : (
                          <Link href={link.href} aria-current={pathname === link.href ? "page" : undefined} className={classes}>
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

        {/* The name as a row of keys. Decorative: the brand is named above. */}
        <div aria-hidden className="mt-16 flex select-none justify-between gap-[0.9vw] sm:mt-20">
          {WORDMARK.split("").map((letter, i) => (
            <span
              key={i}
              className="s-key s-display flex aspect-[5/6] min-w-0 flex-1 items-center justify-center [--key-radius:1vw] text-[clamp(1.5rem,7.6vw,6.6rem)] [--key-depth:clamp(4px,0.9vw,12px)]"
              style={
                {
                  "--key-face": letterTones[i % letterTones.length],
                  "--key-ink": "var(--s-navy)",
                  "--key-edge": `color-mix(in srgb, ${letterTones[i % letterTones.length]} 58%, #000)`,
                } as CSSProperties
              }
            >
              {letter}
            </span>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t-2 border-s-line-2 py-6 text-[14px] text-s-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. {site.address.addressLocality}, UK.
          </p>
          <p>{credit ?? "Build it. Run it. Grow it."}</p>
        </div>
      </div>
    </footer>
  );
}
