import Link from "next/link";
import { loadDentalContent } from "@/lib/cms/dental";
import { SampleRibbon } from "../SampleRibbon";
import { DentalNav } from "./DentalNav";
import { navLinks } from "./links";

/**
 * Chrome for the Kennet Bridge Dental demo — quietly premium clinical
 * restraint: porcelain-warm canvas, graphite ink, deep petrol actions,
 * system stack only (hierarchy carried by weight and tracking, not a
 * display face). Server components except DentalNav (current-page
 * marking); the root route transition skips /demo so content renders
 * before hydration.
 *
 * Type ladder (keep to it): text-sm 14 small print · text-base 16
 * body · text-lg 18 card titles/h3 · text-xl 20 inner h2 · text-2xl 24
 * section h2 · clamp h1.
 */
export function DentalShell({ children }: { children: React.ReactNode }) {
  const { practice } = loadDentalContent();
  return (
    <div className="demo-dental-root relative min-h-screen">
      <SampleRibbon
        sectorHref="/packages"
        sectorLabel="Get a site like this for your practice"
      />

      <header className="bg-[var(--ddt-ink)] text-white">
        <div className="mx-auto flex w-full max-w-[1100px] flex-wrap items-center justify-between gap-x-8 gap-y-4 px-4 py-5 sm:px-6">
          <div>
            <Link
              href="/demo/dental-practice"
              className="text-[24px] font-bold tracking-tight hover:underline"
            >
              {practice.name}
            </Link>
            <p className="mt-0.5 text-sm text-white/75">{practice.strap}</p>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <a
              href={practice.phoneHref}
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
              <span className="text-[16px] font-semibold tracking-tight">{practice.phone}</span>
            </a>
            <a
              href={practice.phoneHref}
              className="rounded-md bg-[var(--ddt-petrol)] px-4 py-2.5 text-base font-semibold text-white transition-colors hover:bg-[var(--ddt-petrol-deep)]"
            >
              Call to book
            </a>
          </div>
        </div>
        <DentalNav />
      </header>

      <main id="main">{children}</main>

      <footer className="mt-16 border-t border-[var(--ddt-line)] bg-[var(--ddt-surface)]">
        <div className="mx-auto grid w-full max-w-[1100px] gap-8 px-4 py-10 sm:grid-cols-3 sm:px-6">
          <div>
            <h2 className="text-base font-bold">{practice.name}</h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--ddt-ink-soft)]">
              {practice.address}
              <br />
              Telephone:{" "}
              <a href={practice.phoneHref} className="text-[var(--ddt-petrol)] underline">
                {practice.phone}
              </a>
              {practice.weekdayHours.map((segment) => (
                <span key={segment.label}>
                  <br />
                  {segment.label}: {segment.hours}
                </span>
              ))}
            </p>
          </div>
          <div>
            <h2 className="text-base font-bold">Quick links</h2>
            <ul className="mt-1 text-sm">
              {navLinks.slice(1).map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="block py-1.5 text-[var(--ddt-petrol)] underline">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/demo/dental-practice/accessibility"
                  className="block py-1.5 text-[var(--ddt-petrol)] underline"
                >
                  Accessibility statement
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-base font-bold">Out of hours</h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--ddt-ink-soft)]">
              {practice.outOfHoursCopy}
            </p>
          </div>
        </div>
        <div className="border-t border-[var(--ddt-line)]">
          <p className="mx-auto w-full max-w-[1100px] px-4 py-4 text-sm text-[var(--ddt-ink-soft)] sm:px-6">
            {practice.name} is a fictional practice. This sample website was
            designed and built by{" "}
            <Link href="/packages" className="text-[var(--ddt-petrol)] underline">
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

/** Breadcrumb trail for inner pages. */
export function DentalBreadcrumb({ current }: { current: string }) {
  return (
    <nav aria-label="Breadcrumb" className="bg-[var(--ddt-sand)]">
      <ol className="mx-auto flex w-full max-w-[1100px] flex-wrap items-center gap-1.5 px-4 pt-4 text-sm sm:px-6">
        <li>
          <Link
            href="/demo/dental-practice"
            className="text-[var(--ddt-petrol)] underline underline-offset-2 hover:text-[var(--ddt-petrol-deep)]"
          >
            Home
          </Link>
        </li>
        <li aria-hidden className="text-[var(--ddt-ink-soft)]">
          ›
        </li>
        <li aria-current="page" className="text-[var(--ddt-ink-soft)]">
          {current}
        </li>
      </ol>
    </nav>
  );
}

/** Sand-tinted page-title band used on every inner page, with breadcrumb. */
export function DentalPageHero({
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
    <div className="border-b border-[var(--ddt-line)] bg-[var(--ddt-sand)]">
      <DentalBreadcrumb current={crumb ?? title} />
      <div className="mx-auto w-full max-w-[1100px] px-4 pb-8 pt-4 sm:px-6 sm:pb-10 sm:pt-5">
        <h1 className="max-w-[720px] text-[clamp(1.8rem,4.5vw,2.6rem)] font-bold leading-tight tracking-tight">
          {title}
        </h1>
        {lede ? (
          <p className="mt-3 max-w-[65ch] text-lg leading-relaxed text-[var(--ddt-ink-soft)]">
            {lede}
          </p>
        ) : null}
      </div>
    </div>
  );
}

/** Page section with a spacing variant so rhythm can vary: tight
    follow-ons, generous topic changes. */
export function DentalSection({
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
    <section className={`mx-auto w-full max-w-[1100px] px-4 sm:px-6 ${pads[pad]} ${className}`}>
      {children}
    </section>
  );
}

/** Plain bordered link card. No side stripes — the full border carries
    the hover state, tinting petrol. */
export function DentalCard({
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
      className="group block rounded-md border border-[var(--ddt-line)] bg-[var(--ddt-surface)] p-5 transition-colors hover:border-[var(--ddt-petrol)]"
    >
      <h3 className="text-lg font-bold text-[var(--ddt-petrol)] underline-offset-2 group-hover:underline">
        {title}
      </h3>
      <p className="mt-1.5 text-base leading-relaxed text-[var(--ddt-ink-soft)]">{copy}</p>
    </Link>
  );
}

/** Solid petrol action button — the one accent colour reserved for
    actions and links. */
export function DentalAction({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <a
      href={href}
      className="inline-block rounded-md bg-[var(--ddt-petrol)] px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-[var(--ddt-petrol-deep)]"
    >
      {children}
    </a>
  );
}

/** Urgent-toned callout — full border and tint, no side stripe. The
    visually hidden "Urgent:" prefix is for users who cannot rely on
    colour alone. */
export function DentalUrgentCallout({
  title,
  children,
  action,
}: {
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <div className="rounded-md border border-[var(--ddt-urgent)]/35 bg-[color-mix(in_oklab,var(--ddt-urgent)_7%,var(--ddt-surface))] p-5 sm:p-6">
      <p className="flex items-center gap-2 text-lg font-bold text-[var(--ddt-urgent)]">
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          className="h-5 w-5 shrink-0 fill-none stroke-current stroke-2"
        >
          <circle cx="12" cy="12" r="9" />
          <path strokeLinecap="round" d="M12 8v5" />
          <circle cx="12" cy="16.5" r="0.5" className="fill-current" />
        </svg>
        <span>
          <span className="sr-only">Urgent: </span>
          {title}
        </span>
      </p>
      <div className="mt-2 max-w-[65ch] text-base leading-relaxed text-[var(--ddt-ink-soft)]">
        {children}
      </div>
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}

/** Sand-tinted inset for mild wayfinding emphasis. */
export function DentalInset({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-md border border-[var(--ddt-line)] bg-[var(--ddt-sand)] p-5 text-base leading-relaxed text-[var(--ddt-ink-soft)]">
      {children}
    </div>
  );
}

/** One consistent note for the demo's illustrative dead-ends and
    sample regulatory figures. */
export function DentalSampleNote({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-4 inline-flex items-center gap-2 rounded-md bg-[var(--ddt-petrol-tint)] px-3 py-1.5 text-sm text-[var(--ddt-ink-soft)]">
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        className="h-4 w-4 shrink-0 fill-none stroke-current stroke-2"
      >
        <circle cx="12" cy="12" r="9" />
        <path strokeLinecap="round" d="M12 11v5" />
        <circle cx="12" cy="7.5" r="0.5" className="fill-current" />
      </svg>
      {children}
    </p>
  );
}

/** "Page last reviewed / Next review due" freshness pattern. */
export function DentalReviewDate({ reviewed }: { reviewed: string }) {
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
    <p className="mt-10 border-t border-[var(--ddt-line)] pt-4 text-sm text-[var(--ddt-ink-soft)]">
      Page last reviewed: {formatter.format(reviewedDate)}
      <br />
      Next review due: {formatter.format(dueDate)}
    </p>
  );
}

/** Small category label — NHS, Private or Both. Text-led, not an
    icon-box; the colour never carries the only meaning. */
export function DentalCategoryTag({ category }: { category: "nhs" | "private" | "both" }) {
  const label = category === "nhs" ? "NHS" : category === "private" ? "Private" : "NHS or private";
  return (
    <span className="inline-block rounded-full border border-[var(--ddt-line)] bg-[var(--ddt-canvas)] px-2.5 py-0.5 text-sm font-semibold uppercase tracking-[0.04em] text-[var(--ddt-ink-soft)]">
      {label}
    </span>
  );
}

/** Triage card for the urgent-care page: coloured header band + white
    body, mirroring the pattern patients already know from NHS
    services. The hidden urgency prefix means colour is never the only
    signal. No side stripes. */
export function DentalTriageCard({
  variant,
  title,
  children,
}: {
  variant: "same-day" | "closed" | "emergency";
  title: string;
  children: React.ReactNode;
}) {
  const header =
    variant === "emergency"
      ? "bg-[var(--ddt-urgent)]"
      : variant === "closed"
        ? "bg-[var(--ddt-petrol-deep)]"
        : "bg-[var(--ddt-petrol)]";
  const prefix =
    variant === "emergency"
      ? "Immediate action required: "
      : variant === "closed"
        ? "Out of hours: "
        : "Same-day advice: ";
  return (
    <div className="overflow-hidden rounded-md border border-[var(--ddt-line)] bg-[var(--ddt-surface)]">
      {/* h3: every current use sits inside a section already headed by an h2. */}
      <h3 className={`${header} px-5 py-3 text-lg font-bold text-white`}>
        <span className="sr-only">{prefix}</span>
        {title}
      </h3>
      <div className="p-5 text-base leading-relaxed text-[var(--ddt-ink-soft)]">{children}</div>
    </div>
  );
}

/** Self-contained illustrative street map for the fictional practice —
    no live embed, no external tiles, clearly stylised. */
export function DentalMiniMap() {
  return (
    <svg
      role="img"
      aria-label="Illustrative map showing Kennet Bridge Dental on Bridge Row, next to the River Kennet and Reading rail station"
      viewBox="0 0 560 300"
      className="h-auto w-full rounded-md border border-[var(--ddt-line)]"
    >
      <rect width="560" height="300" fill="#f2efe9" />
      {/* river */}
      <path
        d="M0 60 C120 90 160 140 130 210 C110 255 150 275 140 300"
        fill="none"
        stroke="#c3dbe0"
        strokeWidth="16"
        strokeLinecap="round"
      />
      {/* roads */}
      <path d="M0 170 H560" stroke="#ffffff" strokeWidth="22" />
      <path d="M0 170 H560" stroke="var(--ddt-line)" strokeWidth="24" fill="none" opacity="0.35" />
      <path d="M0 170 H560" stroke="#ffffff" strokeWidth="20" />
      <path d="M260 0 V170" stroke="#ffffff" strokeWidth="16" />
      {/* bridge across the river */}
      <rect x="118" y="162" width="28" height="16" fill="#ffffff" stroke="var(--ddt-petrol)" strokeWidth="2" />
      {/* buildings */}
      <g fill="#dfdad0">
        <rect x="320" y="110" width="46" height="32" rx="3" />
        <rect x="400" y="100" width="52" height="34" rx="3" />
        <rect x="60" y="200" width="44" height="30" rx="3" />
        <rect x="470" y="190" width="40" height="30" rx="3" />
      </g>
      {/* the practice */}
      <rect x="252" y="182" width="72" height="46" rx="4" fill="#ffffff" stroke="var(--ddt-petrol)" strokeWidth="2.5" />
      <path d="M288 194 v22 M276 205 h24" stroke="var(--ddt-petrol)" strokeWidth="5" strokeLinecap="round" />
      {/* marker */}
      <g transform="translate(288 176)">
        <path d="M0 0 C-14 -18 -14 -34 0 -40 C14 -34 14 -18 0 0 Z" fill="var(--ddt-petrol)" />
        <circle cx="0" cy="-28" r="6" fill="#ffffff" />
      </g>
      {/* station marker */}
      <g transform="translate(430 150)">
        <rect x="-16" y="-11" width="32" height="22" rx="4" fill="var(--ddt-petrol-deep)" />
        <text
          y="5"
          textAnchor="middle"
          fontSize="11"
          fontWeight="700"
          fill="#ffffff"
          fontFamily="ui-sans-serif, system-ui, sans-serif"
        >
          RDG
        </text>
      </g>
      {/* labels */}
      <g fontFamily="ui-sans-serif, system-ui, sans-serif" fill="var(--ddt-ink-soft)" fontSize="13">
        <text x="16" y="163">Bridge Row</text>
        <text x="30" y="42" transform="rotate(62 30 42)">River Kennet</text>
        <text x="384" y="252">Reading station</text>
      </g>
      <text
        x="288"
        y="252"
        textAnchor="middle"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontWeight="700"
        fontSize="14"
        fill="var(--ddt-ink)"
      >
        Kennet Bridge Dental
      </text>
      <text
        x="548"
        y="288"
        textAnchor="end"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontSize="11"
        fill="var(--ddt-ink-soft)"
      >
        Illustrative map — sample site
      </text>
    </svg>
  );
}
