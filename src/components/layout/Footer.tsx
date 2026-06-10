"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";

const links = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#practice", label: "Process" },
  { href: "#studio", label: "About" },
  { href: "/projects/sipli", label: "Sipli" },
  { href: "/projects/artling", label: "Artling" },
];

/** Slim legal footer under the contact finale: links rail + credits. */
export function Footer() {
  const pathname = usePathname();
  // In-page section anchors only exist on the homepage; from any other route
  // point them at the homepage (`/#section`) so they navigate then scroll.
  const hrefFor = (href: string) =>
    href.startsWith("#") && pathname !== "/" ? `/${href}` : href;

  return (
    <footer className="border-t border-white/10 bg-night text-night-ink" aria-label="Footer">
      <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-6 px-[var(--gutter)] py-10 md:flex-row md:items-center md:justify-between">
        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
          {links.map((l) => (
            <Link
              key={l.label}
              href={hrefFor(l.href)}
              className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/45 transition-colors duration-300 hover:text-accent"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-col gap-1 font-mono text-[10.5px] uppercase tracking-[0.16em] text-white/35 md:items-end">
          <span>© 2026 {site.legalName} · Reading, UK</span>
          <span>
            Designed &amp; built by{" "}
            <span className="text-white/55">Anoop Jose</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
