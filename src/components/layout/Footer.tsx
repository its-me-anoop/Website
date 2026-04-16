import Link from "next/link";
import Image from "next/image";

const year = new Date().getFullYear();

const columns = [
  {
    label: "Studio",
    items: [
      { name: "Ledger", href: "/#work" },
      { name: "Practice", href: "/#practice" },
      { name: "About", href: "/#about" },
      { name: "Send a brief", href: "/#brief" },
    ],
  },
  {
    label: "Elsewhere",
    items: [
      { name: "LinkedIn", href: "https://www.linkedin.com/in/anoop-jose-0b308a296/", external: true },
      { name: "GitHub", href: "https://github.com", external: true },
      { name: "Twitter", href: "https://twitter.com", external: true },
    ],
  },
  {
    label: "Paperwork",
    items: [
      { name: "Flutterly Ltd", href: "/#about" },
      { name: "Reading, Berkshire, UK", href: "/#about" },
      { name: "anoop@flutterly.co.uk", href: "mailto:anoop@flutterly.co.uk" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-background border-t border-border px-4 pt-16 pb-8 sm:px-6 sm:pt-20 md:px-10 md:pt-24">
      <div className="mx-auto max-w-[1200px]">
        {/* Oversize wordmark — editorial statement */}
        <div className="mb-12 overflow-hidden border-b border-border pb-10 sm:mb-16 sm:pb-14">
          <p
            aria-hidden
            className="select-none font-display text-[22vw] font-light leading-[0.9] tracking-[-0.04em] text-foreground sm:text-[18vw]"
          >
            Flutterly<span className="text-accent">.</span>
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-10">
          {/* Brand block */}
          <div className="md:col-span-5">
            <div className="mb-5 inline-block rounded-lg bg-white p-2">
              <Image
                src="/flutterly-logo.png"
                alt="Flutterly logo"
                width={24}
                height={24}
                className="h-6 w-6"
              />
            </div>
            <p className="max-w-sm text-[15px] leading-relaxed text-foreground-secondary">
              A small UK product studio. We design, engineer, and ship web and
              mobile software for founders and teams who still care about the
              craft.
            </p>
            <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.22em] text-foreground-tertiary">
              Est. 2024 · Reading, UK
            </p>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-10 md:col-span-7">
            {columns.map((column) => (
              <div key={column.label}>
                <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-foreground-tertiary">
                  {column.label}
                </p>
                <ul className="space-y-3">
                  {column.items.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        {...("external" in item && item.external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="text-sm text-foreground-secondary transition-colors hover:text-foreground"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom ledger */}
        <div className="mt-16 flex flex-col gap-3 border-t border-border pt-6 font-mono text-[10px] uppercase tracking-[0.22em] text-foreground-tertiary sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Flutterly Ltd · All rights reserved</p>
          <p>Hand-built in Reading · Last updated {year}</p>
        </div>
      </div>
    </footer>
  );
}
