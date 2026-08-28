import Link from "next/link";
import { loadPharmacyContent } from "@/lib/cms/pharmacy";
import { SampleRibbon } from "../SampleRibbon";
import { PharmacyNav } from "./PharmacyNav";
import { navLinks } from "./links";

/**
 * Chrome for the Willowbrook Pharmacy demo — task-first community
 * green: white canvas, mint panels, a green masthead with a small
 * aria-hidden cross motif, rounded service tiles. Server components
 * except PharmacyNav (current-page marking).
 *
 * Type ladder (keep to it): text-sm 14 small print · text-base 16
 * body · text-lg 18 card titles/h3 · text-[20px] inner h2 · text-2xl
 * 24 section h2 · clamp h1.
 */
export function PharmacyShell({ children }: { children: React.ReactNode }) {
  const { pharmacy } = loadPharmacyContent();
  return (
    <div className="demo-pharm-root relative min-h-screen">
      <SampleRibbon
        sectorHref="/packages"
        sectorLabel="Get a site like this for your pharmacy"
      />

      <header className="bg-[var(--dph-green)] text-white">
        <div className="mx-auto flex w-full max-w-[1100px] flex-wrap items-center justify-between gap-x-8 gap-y-4 px-4 py-5 sm:px-6">
          <div>
            <Link
              href="/demo/pharmacy"
              className="flex items-center gap-2.5 text-[26px] font-bold tracking-tight hover:underline"
            >
              <PharmacyCrossMotif />
              {pharmacy.name}
            </Link>
            <p className="mt-0.5 text-sm text-white/85">{pharmacy.strap}</p>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <a
              href={pharmacy.phoneHref}
              className="group flex items-center gap-2 text-white hover:underline"
            >
              <svg
                aria-hidden
                viewBox="0 0 24 24"
                className="h-4.5 w-4.5 fill-none stroke-current stroke-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 5c0 8.3 6.7 15 15 15l2-4-4.5-2-2 2c-2.8-1.4-5.1-3.7-6.5-6.5l2-2L8 3 4 5Z"
                />
              </svg>
              <span className="text-[17px] font-semibold tracking-tight">
                {pharmacy.phone}
              </span>
            </a>
            <Link
              href="/demo/pharmacy/pharmacy-first"
              className="rounded-md bg-white px-4 py-2.5 text-base font-semibold text-[var(--dph-green-deep)] shadow-[0_3px_0_rgba(3,86,47,0.3)] transition-colors hover:bg-[var(--dph-mint)]"
            >
              NHS Pharmacy First
            </Link>
          </div>
        </div>
        <PharmacyNav />
      </header>

      <main id="main">{children}</main>

      <footer className="mt-16 border-t-4 border-[var(--dph-green)] bg-[var(--dph-mint)]">
        <div className="mx-auto grid w-full max-w-[1100px] gap-8 px-4 py-10 sm:grid-cols-3 sm:px-6">
          <div>
            <h2 className="text-base font-bold">{pharmacy.name}</h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--dph-ink-soft)]">
              {pharmacy.address}
              <br />
              Telephone:{" "}
              <a href={pharmacy.phoneHref} className="text-[var(--dph-green)] underline">
                {pharmacy.phone}
              </a>
              <br />
              Email:{" "}
              <a
                href={`mailto:${pharmacy.email}`}
                className="text-[var(--dph-green)] underline"
              >
                {pharmacy.email}
              </a>
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[var(--dph-ink-soft)]">
              Two doors from{" "}
              <Link href="/demo/gp-practice" className="text-[var(--dph-green)] underline">
                Willowbrook Surgery
              </Link>{" "}
              — ask your GP to nominate us for prescriptions.
            </p>
          </div>
          <div>
            <h2 className="text-base font-bold">Quick links</h2>
            <ul className="mt-1 text-sm">
              {navLinks.slice(1).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block py-1.5 text-[var(--dph-green)] underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/demo/pharmacy/accessibility"
                  className="block py-1.5 text-[var(--dph-green)] underline"
                >
                  Accessibility statement
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-base font-bold">Registered pharmacy</h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--dph-ink-soft)]">
              <PharmacyRegulatoryLine />
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--dph-ink-soft)]">
              {pharmacy.legal.sampleNote}
            </p>
          </div>
        </div>
        <div className="border-t border-[var(--dph-line)]">
          <p className="mx-auto w-full max-w-[1100px] px-4 py-4 text-sm text-[var(--dph-ink-soft)] sm:px-6">
            {pharmacy.name} is a fictional pharmacy. This sample website was
            designed and built by{" "}
            <Link href="/packages" className="text-[var(--dph-green)] underline">
              Flutterly
            </Link>
            .
          </p>
        </div>
      </footer>
    </div>
  );
}

/* ── Regulatory block ───────────────────────────────────────── */

/**
 * The mandatory footer regulatory line, present on every page: premises
 * number, named superintendent with their own sample GPhC number, and
 * the legal entity — the cheapest expert signal a pharmacy site can
 * carry, formatted like the real thing and clearly marked as a sample.
 */
export function PharmacyRegulatoryLine() {
  const { pharmacy } = loadPharmacyContent();
  const { legal, superintendent } = pharmacy;
  return (
    <>
      GPhC premises no. {legal.gphcPremisesNumber} (sample) · Superintendent
      pharmacist: {superintendent.name}, GPhC {superintendent.gphcNumber}{" "}
      (sample) · {legal.entityName}, company no. {legal.companyNumber}
    </>
  );
}

/* ── Shared page primitives ─────────────────────────────────── */

/** Small aria-hidden cross motif for the masthead — the one graphic
    element in an otherwise photo-free design. */
export function PharmacyCrossMotif() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-6 w-6 shrink-0">
      <rect x="9" y="2" width="6" height="20" rx="2" fill="currentColor" />
      <rect x="2" y="9" width="20" height="6" rx="2" fill="currentColor" />
    </svg>
  );
}

/** Breadcrumb trail for inner pages. */
export function PharmacyBreadcrumb({ current }: { current: string }) {
  return (
    <nav aria-label="Breadcrumb" className="bg-[var(--dph-mint)]">
      <ol className="mx-auto flex w-full max-w-[1100px] flex-wrap items-center gap-1.5 px-4 pt-4 text-sm sm:px-6">
        <li>
          <Link
            href="/demo/pharmacy"
            className="text-[var(--dph-green)] underline underline-offset-2 hover:text-[var(--dph-green-deep)]"
          >
            Home
          </Link>
        </li>
        <li aria-hidden className="text-[var(--dph-ink-soft)]">
          ›
        </li>
        <li aria-current="page" className="text-[var(--dph-ink-soft)]">
          {current}
        </li>
      </ol>
    </nav>
  );
}

/** Tinted page-title band used on every inner page, with breadcrumb. */
export function PharmacyPageHero({
  title,
  lede,
  crumb,
}: {
  title: string;
  lede?: string;
  /** Breadcrumb label; defaults to the page title. */
  crumb?: string;
}) {
  return (
    <div className="border-b border-[var(--dph-line)] bg-[var(--dph-mint)]">
      <PharmacyBreadcrumb current={crumb ?? title} />
      <div className="mx-auto w-full max-w-[1100px] px-4 pb-8 pt-4 sm:px-6 sm:pb-10 sm:pt-5">
        <h1 className="max-w-[720px] text-[clamp(1.8rem,4.5vw,2.6rem)] font-bold leading-tight tracking-tight text-[var(--dph-ink)]">
          {title}
        </h1>
        {lede ? (
          <p className="mt-3 max-w-[640px] text-lg leading-relaxed text-[var(--dph-ink-soft)]">
            {lede}
          </p>
        ) : null}
      </div>
    </div>
  );
}

/** Page section with a spacing variant so rhythm can vary: tight
    follow-ons, generous topic changes. */
export function PharmacySection({
  children,
  className = "",
  pad = "normal",
}: {
  children: React.ReactNode;
  className?: string;
  pad?: "flush" | "normal" | "spacious";
}) {
  const pads = {
    flush: "pb-12 pt-0",
    normal: "py-12",
    spacious: "py-16 sm:py-20",
  } as const;
  return (
    <section
      className={`mx-auto w-full max-w-[1100px] px-4 sm:px-6 ${pads[pad]} ${className}`}
    >
      {children}
    </section>
  );
}

/** Rounded service tile; a full border, never a side stripe. */
export function PharmacyCard({
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
      className="group block rounded-xl border border-[var(--dph-line)] bg-white p-5 transition-colors hover:border-[var(--dph-green)]"
    >
      <h3 className="text-lg font-bold text-[var(--dph-green)] underline-offset-2 group-hover:underline">
        {title}
      </h3>
      <p className="mt-1.5 text-base leading-relaxed text-[var(--dph-ink-soft)]">
        {copy}
      </p>
    </Link>
  );
}

/** Large primary task tile — the two things most patients come to do. */
export function PharmacyPrimaryCard({
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
      className="group flex items-center justify-between gap-4 rounded-xl border border-[var(--dph-line)] bg-white p-6 transition-colors hover:border-[var(--dph-green)] sm:p-7"
    >
      <div>
        <h3 className="text-lg font-bold leading-snug text-[var(--dph-green)] underline-offset-2 group-hover:underline">
          {title}
        </h3>
        <p className="mt-1.5 text-base leading-relaxed text-[var(--dph-ink-soft)]">
          {copy}
        </p>
      </div>
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        className="h-8 w-8 shrink-0 rounded-full bg-[var(--dph-green)] fill-none stroke-white stroke-2 p-1.5 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6 6 6-6 6" />
      </svg>
    </Link>
  );
}

/** NHS (free) vs Private (paid) badge — the load-bearing distinction a
    pharmacy manager makes about every service. Green fill for NHS-free,
    neutral outline for private-paid, so the two never read as equal. */
export function PharmacyFundingBadge({
  funding,
}: {
  funding: "nhs-free" | "private-paid";
}) {
  if (funding === "nhs-free") {
    return (
      <span className="inline-flex items-center rounded-full bg-[var(--dph-green)] px-3 py-1 text-sm font-semibold text-white">
        NHS · free
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-full border border-[var(--dph-ink-soft)] px-3 py-1 text-sm font-semibold text-[var(--dph-ink-soft)]">
      Private · paid
    </span>
  );
}

/** Amber notice callout — full border and tint, no side stripe. The
    visually hidden "Important:" prefix is for users who cannot rely on
    colour alone. */
export function PharmacyCallout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-[var(--dph-amber-line)] bg-[var(--dph-amber-tint)] p-5">
      <p className="flex items-center gap-2 text-base font-bold">
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          className="h-5 w-5 shrink-0 fill-none stroke-[#9a6b00] stroke-2"
        >
          <circle cx="12" cy="12" r="9" />
          <path strokeLinecap="round" d="M12 8v5" />
          <circle cx="12" cy="16.5" r="0.5" className="fill-[#9a6b00]" />
        </svg>
        <span>
          <span className="sr-only">Important: </span>
          {title}
        </span>
      </p>
      <div className="mt-1.5 text-base leading-relaxed text-[var(--dph-ink-soft)]">
        {children}
      </div>
    </div>
  );
}

/** Inset text for mild wayfinding emphasis. */
export function PharmacyInset({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-[var(--dph-line)] bg-[var(--dph-mint)] p-5 text-base leading-relaxed text-[var(--dph-ink-soft)]">
      {children}
    </div>
  );
}

/** "Page last reviewed / Next review due" — the NHS freshness pattern
    that backs the contractual content review. */
export function PharmacyReviewDate({ reviewed }: { reviewed: string }) {
  const formatter = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
  const [year, month, day] = reviewed.split("-").map(Number);
  const reviewedDate = new Date(Date.UTC(year, month - 1, day));
  const dueDate = new Date(Date.UTC(year + 1, month - 1, day));
  return (
    <p className="mt-10 border-t border-[var(--dph-line)] pt-4 text-sm text-[var(--dph-ink-soft)]">
      Page last reviewed: {formatter.format(reviewedDate)}
      <br />
      Next review due: {formatter.format(dueDate)}
    </p>
  );
}

/** Honest hours table: separate morning/afternoon columns, so a lunch
    closure is structural, not buried in a sentence. */
export function PharmacyHoursTable({
  openingTimes,
}: {
  openingTimes: readonly { day: string; morning: string; afternoon: string }[];
}) {
  return (
    <table className="w-full border-collapse text-base">
      <caption className="sr-only">Pharmacy opening times by day of the week</caption>
      <thead>
        <tr className="border-b-2 border-[var(--dph-line)]">
          <th scope="col" className="py-2 pr-4 text-left text-sm font-semibold text-[var(--dph-ink-soft)]">
            Day
          </th>
          <th scope="col" className="py-2 pr-4 text-left text-sm font-semibold text-[var(--dph-ink-soft)]">
            Morning
          </th>
          <th scope="col" className="py-2 text-left text-sm font-semibold text-[var(--dph-ink-soft)]">
            Afternoon
          </th>
        </tr>
      </thead>
      <tbody>
        {openingTimes.map(({ day, morning, afternoon }) => (
          <tr key={day} className="border-b border-[var(--dph-line)]">
            <th scope="row" className="py-2.5 pr-4 text-left font-semibold">
              {day}
            </th>
            <td className="py-2.5 pr-4 text-[var(--dph-ink-soft)]">{morning}</td>
            <td className="py-2.5 text-[var(--dph-ink-soft)]">{afternoon}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/** Self-contained illustrative street map — no live embed, no external
    tiles, clearly stylised, and it doubles as the GP-demo cross-link. */
export function PharmacyMiniMap() {
  return (
    <svg
      role="img"
      aria-label="Illustrative map showing Willowbrook Pharmacy on Meadow Lane, two doors from Willowbrook Surgery"
      viewBox="0 0 560 300"
      className="h-auto w-full rounded-xl border border-[var(--dph-line)]"
    >
      <rect width="560" height="300" fill="var(--dph-mint)" />
      <path
        d="M0 210 Q120 170 210 215 T440 240 L560 220 L560 300 L0 300 Z"
        fill="var(--dph-green-tint)"
      />
      <path d="M0 150 H560" stroke="#ffffff" strokeWidth="22" />
      <path d="M0 150 H560" stroke="var(--dph-line)" strokeWidth="24" fill="none" opacity="0.35" />
      <path d="M0 150 H560" stroke="#ffffff" strokeWidth="20" />
      <path d="M150 0 V150" stroke="#ffffff" strokeWidth="16" />
      <g fill="#d9e3da">
        <rect x="40" y="90" width="44" height="30" rx="3" />
        <rect x="460" y="92" width="46" height="30" rx="3" />
        <rect x="60" y="180" width="46" height="30" rx="3" />
      </g>
      {/* Willowbrook Surgery, two doors along */}
      <rect x="180" y="174" width="64" height="44" rx="4" fill="#ffffff" stroke="var(--dph-ink-soft)" strokeWidth="2" />
      <text
        x="212"
        y="200"
        textAnchor="middle"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontSize="10"
        fill="var(--dph-ink-soft)"
      >
        Surgery
      </text>
      {/* the pharmacy, two doors along */}
      <rect x="270" y="174" width="70" height="48" rx="4" fill="#ffffff" stroke="var(--dph-green)" strokeWidth="2.5" />
      <rect x="298" y="188" width="14" height="4" rx="1" fill="var(--dph-green)" />
      <rect x="303" y="183" width="4" height="14" rx="1" fill="var(--dph-green)" />
      <g transform="translate(305 168)">
        <path d="M0 0 C-14 -18 -14 -34 0 -40 C14 -34 14 -18 0 0 Z" fill="var(--dph-green)" />
        <circle cx="0" cy="-28" r="6" fill="#ffffff" />
      </g>
      <g
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fill="var(--dph-ink-soft)"
        fontSize="13"
      >
        <text x="16" y="143">Meadow Lane</text>
        <text x="94" y="262">Willowbrook Green</text>
      </g>
      <text
        x="305"
        y="248"
        textAnchor="middle"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontWeight="700"
        fontSize="14"
        fill="var(--dph-ink)"
      >
        Willowbrook Pharmacy
      </text>
      <text
        x="548"
        y="288"
        textAnchor="end"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontSize="11"
        fill="var(--dph-ink-soft)"
      >
        Illustrative map — sample site
      </text>
    </svg>
  );
}
