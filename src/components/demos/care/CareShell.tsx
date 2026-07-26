import Link from "next/link";
import { SampleRibbon } from "../SampleRibbon";
import { home, navLinks } from "./data";

/**
 * Chrome for the Oakfield House demo — warm cream canvas, Syne
 * display type, terracotta actions. Server components throughout:
 * the demo adds no client-side interactivity of its own, and the
 * root route transition skips /demo so content renders before
 * hydration.
 */
export function CareShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="demo-care-root min-h-screen">
      <SampleRibbon
        sectorHref="/care-home-websites"
        sectorLabel="Get a site like this for your home"
      />

      <header className="border-b border-[var(--dch-line)] bg-[var(--dch-canvas)]">
        <div className="mx-auto flex w-full max-w-[1100px] flex-wrap items-center justify-between gap-x-6 gap-y-3 px-4 py-5 sm:px-6">
          <Link href="/demo/care-home" className="group">
            <span className="dch-display block text-[24px] font-bold leading-none text-[var(--dch-ink)] group-hover:text-[var(--dch-terra)]">
              Oakfield House
            </span>
            <span className="mt-1 block text-[12.5px] uppercase tracking-[0.18em] text-[var(--dch-soft)]">
              Caversham · est. 1986
            </span>
          </Link>
          <a
            href={home.phoneHref}
            className="rounded-full bg-[var(--dch-terra)] px-5 py-2.5 text-[14.5px] font-semibold text-white transition-colors hover:bg-[var(--dch-terra-deep)]"
          >
            Call {home.phone}
          </a>
        </div>
        <nav aria-label="Care home" className="border-t border-[var(--dch-line)]">
          <ul className="mx-auto flex w-full max-w-[1100px] flex-wrap px-2 sm:px-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block px-3 py-3 text-[14.5px] font-semibold text-[var(--dch-soft)] transition-colors hover:text-[var(--dch-terra)]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main id="main">{children}</main>

      <footer className="bg-[#2c231a] text-[#efe8dc]">
        <div className="mx-auto grid w-full max-w-[1100px] gap-8 px-4 py-10 sm:grid-cols-3 sm:px-6">
          <div>
            <p className="dch-display text-[19px] font-bold">Oakfield House</p>
            <p className="mt-2 text-[14px] leading-relaxed text-[#efe8dc]/80">
              {home.address}
              <br />
              <a href={home.phoneHref} className="underline hover:text-white">
                {home.phone}
              </a>
            </p>
          </div>
          <div>
            <h2 className="text-[12px] font-bold uppercase tracking-[0.18em] text-[#efe8dc]/75">
              Find your way
            </h2>
            <ul className="mt-3 space-y-1.5 text-[14px]">
              {navLinks.slice(1).map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="underline-offset-2 hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/demo/care-home/accessibility"
                  className="underline-offset-2 hover:underline"
                >
                  Accessibility statement
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-[12px] font-bold uppercase tracking-[0.18em] text-[#efe8dc]/75">
              Registered care
            </h2>
            <p className="mt-3 text-[14px] leading-relaxed text-[#efe8dc]/80">
              Residential, dementia and respite care for up to 34 residents.
              Registered manager: {home.manager}.
            </p>
          </div>
        </div>
        <div className="border-t border-white/10">
          <p className="mx-auto w-full max-w-[1100px] px-4 py-4 text-[13px] text-[#efe8dc]/75 sm:px-6">
            Oakfield House is a fictional care home. This sample website was
            designed and built by{" "}
            <Link href="/care-home-websites" className="underline hover:text-white">
              Flutterly
            </Link>
            .
          </p>
        </div>
      </footer>
    </div>
  );
}

/* ── Shared page primitives ─────────────────────────────────── */

export function CarePageHero({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
}) {
  return (
    <div className="border-b border-[var(--dch-line)] bg-[var(--dch-cream)]">
      <div className="mx-auto w-full max-w-[1100px] px-4 py-10 sm:px-6 sm:py-14">
        <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-[var(--dch-terra)]">
          {eyebrow}
        </p>
        <h1 className="dch-display mt-3 max-w-[720px] text-[clamp(1.9rem,4.8vw,2.9rem)] font-bold leading-[1.1] text-[var(--dch-ink)]">
          {title}
        </h1>
        {lede ? (
          <p className="mt-4 max-w-[620px] text-[16.5px] leading-relaxed text-[var(--dch-soft)]">
            {lede}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export function CareSection({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`mx-auto w-full max-w-[1100px] px-4 py-12 sm:px-6 ${className}`}>
      {children}
    </section>
  );
}

export function CareHeading({
  eyebrow,
  children,
}: {
  eyebrow?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      {eyebrow ? (
        <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-[var(--dch-terra)]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="dch-display mt-2 text-[clamp(1.5rem,3.4vw,2.1rem)] font-bold leading-[1.15] text-[var(--dch-ink)]">
        {children}
      </h2>
    </div>
  );
}

export function CareButton({
  children,
  href,
  tone = "terra",
}: {
  children: React.ReactNode;
  href: string;
  tone?: "terra" | "outline";
}) {
  const classes =
    tone === "terra"
      ? "bg-[var(--dch-terra)] text-white hover:bg-[var(--dch-terra-deep)]"
      : "border border-[var(--dch-ink)]/25 bg-[var(--dch-surface)] text-[var(--dch-ink)] hover:border-[var(--dch-terra)] hover:text-[var(--dch-terra)]";
  return (
    <Link
      href={href}
      className={`inline-block rounded-full px-6 py-3 text-[15px] font-semibold transition-colors ${classes}`}
    >
      {children}
    </Link>
  );
}
