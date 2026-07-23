import Link from "next/link";
import { SampleRibbon } from "../SampleRibbon";
import { navLinks, practice } from "./data";

/**
 * Chrome for the Willowbrook Surgery demo — NHS-service-manual
 * flavoured: blue masthead, plain link nav, pale grey page ends.
 * Server components throughout: the demo adds no client-side
 * interactivity of its own, and the root route transition skips
 * /demo so content renders before hydration.
 */
export function GpShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="demo-gp-root min-h-screen">
      <SampleRibbon
        sectorHref="/gp-websites"
        sectorLabel="Get a site like this for your practice"
      />

      <header className="bg-[var(--dgp-blue)] text-white">
        <div className="mx-auto w-full max-w-[1100px] px-4 py-5 sm:px-6">
          <Link
            href="/demo/gp-practice"
            className="text-[26px] font-bold tracking-tight hover:underline"
          >
            {practice.name}
          </Link>
          <p className="mt-0.5 text-[14px] text-white/85">{practice.strap}</p>
        </div>
        <nav
          aria-label="Practice"
          className="border-t border-white/25 bg-[var(--dgp-blue-deep)]"
        >
          <ul className="mx-auto flex w-full max-w-[1100px] flex-wrap px-2 sm:px-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block px-3 py-3 text-[15px] font-medium text-white hover:bg-white/10 hover:underline"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main id="main">{children}</main>

      <footer className="mt-16 border-t-4 border-[var(--dgp-blue)] bg-[var(--dgp-tint)]">
        <div className="mx-auto grid w-full max-w-[1100px] gap-8 px-4 py-10 sm:grid-cols-3 sm:px-6">
          <div>
            <h2 className="text-[15px] font-bold">{practice.name}</h2>
            <p className="mt-2 text-[14px] leading-relaxed text-[var(--dgp-ink-soft)]">
              {practice.address}
              <br />
              Telephone:{" "}
              <a href={practice.phoneHref} className="text-[var(--dgp-blue)] underline">
                {practice.phone}
              </a>
            </p>
          </div>
          <div>
            <h2 className="text-[15px] font-bold">Quick links</h2>
            <ul className="mt-2 space-y-1.5 text-[14px]">
              {navLinks.slice(1).map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[var(--dgp-blue)] underline">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/demo/gp-practice/accessibility"
                  className="text-[var(--dgp-blue)] underline"
                >
                  Accessibility statement
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-[15px] font-bold">Urgent help</h2>
            <p className="mt-2 text-[14px] leading-relaxed text-[var(--dgp-ink-soft)]">
              When the surgery is closed, call{" "}
              <strong className="text-[var(--dgp-ink)]">NHS 111</strong>. In a
              life-threatening emergency, always call{" "}
              <strong className="text-[var(--dgp-ink)]">999</strong>.
            </p>
          </div>
        </div>
        <div className="border-t border-[var(--dgp-line)]">
          <p className="mx-auto w-full max-w-[1100px] px-4 py-4 text-[13px] text-[var(--dgp-ink-soft)] sm:px-6">
            {practice.name} is a fictional practice. This sample website was
            designed and built by{" "}
            <Link href="/gp-websites" className="text-[var(--dgp-blue)] underline">
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

/** Blue page-title band used on every inner page. */
export function GpPageHero({
  title,
  lede,
}: {
  title: string;
  lede?: string;
}) {
  return (
    <div className="border-b border-[var(--dgp-line)] bg-[var(--dgp-tint)]">
      <div className="mx-auto w-full max-w-[1100px] px-4 py-8 sm:px-6 sm:py-10">
        <h1 className="max-w-[720px] text-[clamp(1.8rem,4.5vw,2.6rem)] font-bold leading-tight tracking-tight">
          {title}
        </h1>
        {lede ? (
          <p className="mt-3 max-w-[640px] text-[17px] leading-relaxed text-[var(--dgp-ink-soft)]">
            {lede}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export function GpSection({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`mx-auto w-full max-w-[1100px] px-4 py-10 sm:px-6 ${className}`}>
      {children}
    </section>
  );
}

/** Bordered card with the NHS-style left accent on hover. */
export function GpCard({
  title,
  copy,
  href,
}: {
  title: string;
  copy: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group block rounded-md border border-[var(--dgp-line)] bg-white p-5 shadow-[0_2px_0_var(--dgp-line)] transition-colors hover:border-[var(--dgp-blue)]"
    >
      <h3 className="text-[17px] font-bold text-[var(--dgp-blue)] underline-offset-2 group-hover:underline">
        {title}
      </h3>
      <p className="mt-1.5 text-[14.5px] leading-relaxed text-[var(--dgp-ink-soft)]">
        {copy}
      </p>
    </Link>
  );
}

/** Solid green action button (NHS "do" colour). External destinations
    open in the same tab, per NHS service manual guidance. */
export function GpAction({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <a
      href={href}
      className="inline-block rounded-md bg-[var(--dgp-green)] px-6 py-3 text-[16px] font-semibold text-white shadow-[0_3px_0_var(--dgp-green-deep)] transition-colors hover:bg-[var(--dgp-green-deep)]"
    >
      {children}
    </a>
  );
}

/** Amber information callout. */
export function GpCallout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-md border-l-8 border-[#ffb81c] bg-[#fff7e6] p-5">
      <h2 className="text-[16px] font-bold">{title}</h2>
      <div className="mt-1 text-[14.5px] leading-relaxed text-[var(--dgp-ink-soft)]">
        {children}
      </div>
    </div>
  );
}
