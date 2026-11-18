"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { site } from "@/lib/site";
import { footerColumns } from "@/lib/marketing/content";
import { Dot } from "../ui/Room";

/**
 * The foot of every page is the last sheet in the file: a ruled
 * notebook page with a margin line. Who to write to, every route in
 * five columns (the pointer runs a pink highlighter under a link), and
 * the name written as large as the page allows.
 * `credit` replaces the closing line, e.g. a product's creator credit.
 */
export function Footer({ credit }: { credit?: ReactNode } = {}) {
  const year = new Date().getFullYear();
  const pathname = usePathname();

  return (
    <footer className="tone-chalk s-ruled relative overflow-hidden [--margin:clamp(14px,4vw,64px)]">
      <div className="mx-auto w-full max-w-[1440px] pl-[calc(var(--margin)+18px)] pr-5 pt-16 sm:pr-8 sm:pt-24">
        <div className="grid gap-14 xl:grid-cols-[1fr_2.5fr]">
          <div>
            <div className="flex items-center gap-3">
              <Image src="/flutterly-logo.png" alt="" width={44} height={44} />
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
                  <span className="s-label text-[13px] text-s-muted">&gt; {row.label}</span>
                  <a href={`mailto:${row.email}`} className="s-hl w-fit font-semibold text-s-ink">
                    {row.email}
                  </a>
                </li>
              ))}
              <li className="s-label pt-1 text-[13px] text-s-muted">
                &gt; {site.address.addressLocality}, {site.address.addressRegion}, UK
              </li>
            </ul>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h3 className="s-eyebrow">{column.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => {
                    const external = link.href.startsWith("http");
                    const classes =
                      "s-hl inline min-h-6 text-[15px] leading-[1.6] text-s-ink-soft transition-colors hover:text-s-ink aria-[current=page]:font-semibold aria-[current=page]:text-s-ink";
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

        {/* The name as large as the page allows. Decorative: the brand is named above. */}
        <p aria-hidden className="s-display mt-16 flex select-none items-baseline whitespace-nowrap text-[clamp(3.6rem,19.5vw,17.5rem)] leading-[0.8] [--lh:0.8] sm:mt-24">
          Flutterly
          <Dot className="ml-[0.04em] text-[0.62em]" />
        </p>

        <div className="s-label mt-8 flex flex-col gap-2 border-t-[1.5px] border-s-ink py-6 text-[13px] text-s-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. {site.address.addressLocality}, UK.
          </p>
          <p>{credit ?? "Build it. Run it. Grow it."}</p>
        </div>
      </div>
    </footer>
  );
}
