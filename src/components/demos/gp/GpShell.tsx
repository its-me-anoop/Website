import Link from "next/link";
import { SampleRibbon } from "../SampleRibbon";
import { GpNav } from "./GpNav";
import { GpThemeSwitcher } from "./GpThemeSwitcher";
import { cqc, navLinks, practice } from "./data";

/**
 * Chrome for the Willowbrook Surgery demo — a modern take on an NHS
 * practice site: slim deep-blue utility strip, white masthead with a
 * cross wordmark and pill CTA, white nav with a blue current-page
 * underline, and a deep-blue footer. Every colour and radius reads a
 * `--dgp-*` token, so the three palette schemes restyle all of it.
 * Server components except GpNav (current-page marking) and the
 * scheme switcher; the root route transition skips /demo so content
 * renders before hydration.
 *
 * Type ladder (keep to it): text-sm 14 small print · text-base 16
 * body · text-lg 18 card titles/h3 · text-2xl 24 h2 · clamp h1.
 */

/** Soft elevation used by every raised surface in the demo. */
export const gpShadow =
  "shadow-[0_1px_2px_rgba(16,42,67,0.05),0_16px_32px_-24px_rgba(16,42,67,0.35)]";

export function GpShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="demo-gp-root relative min-h-screen">
      <SampleRibbon
        sectorHref="/gp-websites"
        sectorLabel="Get a site like this for your practice"
      />

      {/* Flutterly's chrome, not the practice's: one structure, three
          palettes, so a visiting practice manager can see the same
          NHS-standard site in their own colours. */}
      <aside
        aria-label="Sample site controls"
        className="bg-[#231317] text-[#f5e6d7]"
      >
        <div className="mx-auto flex w-full max-w-[1100px] flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-2.5 sm:px-6">
          <GpThemeSwitcher />
          <p className="text-[12.5px] text-[#f5e6d7]/70">
            Same pages, same NHS patterns — only the palette changes.
          </p>
        </div>
      </aside>

      <header>
        {/* Utility strip */}
        <div className="bg-[var(--dgp-blue-deep)] text-white">
          <div className="mx-auto flex w-full max-w-[1100px] flex-wrap items-center justify-between gap-x-6 gap-y-1 px-4 py-2 text-sm sm:px-6">
            <p className="text-white/90">{practice.address}</p>
            <p className="text-white/90">
              Out of hours: call <strong className="text-white">NHS 111</strong>
            </p>
          </div>
        </div>

        {/* Masthead */}
        <div className="bg-white">
          <div className="mx-auto flex w-full max-w-[1100px] flex-wrap items-center justify-between gap-x-8 gap-y-4 px-4 py-4 sm:px-6 sm:py-5">
            <Link
              href="/demo/gp-practice"
              className="group flex items-center gap-3"
            >
              <span
                aria-hidden
                className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[var(--dgp-blue)]"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-6 w-6 fill-none stroke-white stroke-[2.5]"
                >
                  <path strokeLinecap="round" d="M12 5.5v13M5.5 12h13" />
                </svg>
              </span>
              <span>
                <span className="block text-[22px] font-bold leading-tight tracking-tight text-[var(--dgp-ink)] group-hover:text-[var(--dgp-blue)]">
                  {practice.name}
                </span>
                <span className="mt-0.5 block text-sm text-[var(--dgp-ink-soft)]">
                  {practice.strap}
                </span>
              </span>
            </Link>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <a
                href={practice.phoneHref}
                className="group flex items-center gap-2.5 text-[var(--dgp-ink)]"
              >
                <span
                  aria-hidden
                  className="grid h-9 w-9 place-items-center rounded-full bg-[var(--dgp-sky)]"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4.5 w-4.5 fill-none stroke-[var(--dgp-blue)] stroke-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 5c0 8.3 6.7 15 15 15l2-4-4.5-2-2 2c-2.8-1.4-5.1-3.7-6.5-6.5l2-2L8 3 4 5Z"
                    />
                  </svg>
                </span>
                <span>
                  <span className="block text-sm leading-none text-[var(--dgp-ink-soft)]">
                    Call us, 8:00am – 6:30pm
                  </span>
                  <span className="mt-1 block text-[17px] font-bold leading-none tracking-tight group-hover:text-[var(--dgp-blue)] group-hover:underline">
                    {practice.phone}
                  </span>
                </span>
              </a>
              <Link
                href="/demo/gp-practice/online-consultation"
                className="rounded-full bg-[var(--dgp-green)] px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-[var(--dgp-green-deep)]"
              >
                Get help online
              </Link>
            </div>
          </div>
        </div>
        <GpNav />
      </header>

      <main id="main">{children}</main>

      <footer className="mt-16 bg-[var(--dgp-blue-deep)] text-white">
        <div className="mx-auto grid w-full max-w-[1100px] gap-10 px-4 py-12 sm:grid-cols-3 sm:px-6">
          <div>
            <h2 className="text-base font-bold">{practice.name}</h2>
            <p className="mt-3 text-sm leading-relaxed text-white/80">
              {practice.address}
              <br />
              Telephone:{" "}
              <a
                href={practice.phoneHref}
                className="font-semibold text-white underline underline-offset-2"
              >
                {practice.phone}
              </a>
              <br />
              Open 8:00am – 6:30pm, Monday to Friday
            </p>
          </div>
          <div>
            <h2 className="text-base font-bold">Quick links</h2>
            <ul className="mt-2 text-sm">
              {navLinks.slice(1).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block py-1.5 text-white/80 underline underline-offset-2 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/demo/gp-practice/practice-information"
                  className="block py-1.5 text-white/80 underline underline-offset-2 hover:text-white"
                >
                  Practice information & policies
                </Link>
              </li>
              <li>
                <Link
                  href="/demo/gp-practice/accessibility"
                  className="block py-1.5 text-white/80 underline underline-offset-2 hover:text-white"
                >
                  Accessibility statement
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-base font-bold">Urgent help</h2>
            <p className="mt-3 text-sm leading-relaxed text-white/80">
              When the surgery is closed, call{" "}
              <strong className="text-white">NHS 111</strong>. In a
              life-threatening emergency, always call{" "}
              <strong className="text-white">999</strong>.
            </p>

            <h2 className="mt-6 text-base font-bold">Inspection rating</h2>
            <p className="mt-3 flex flex-wrap items-center gap-2 text-sm text-white/80">
              <span className="rounded-full bg-[var(--dgp-green)] px-2.5 py-1 text-sm font-bold text-white">
                CQC: {cqc.rating}
              </span>
              <span>{cqc.date}</span>
            </p>
          </div>
        </div>
        <div className="border-t border-white/20">
          <p className="mx-auto w-full max-w-[1100px] px-4 py-4 text-sm text-white/70 sm:px-6">
            {practice.name} is a fictional practice. This sample website was
            designed and built by{" "}
            <Link
              href="/gp-websites"
              className="text-white underline underline-offset-2"
            >
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
export function GpBreadcrumb({ current }: { current: string }) {
  return (
    <nav aria-label="Breadcrumb" className="bg-[var(--dgp-sky)]">
      <ol className="mx-auto flex w-full max-w-[1100px] flex-wrap items-center gap-1.5 px-4 pt-5 text-sm sm:px-6">
        <li>
          <Link
            href="/demo/gp-practice"
            className="font-medium text-[var(--dgp-blue-deep)] underline underline-offset-2 hover:text-[var(--dgp-blue)]"
          >
            Home
          </Link>
        </li>
        <li aria-hidden className="text-[var(--dgp-ink-soft)]">
          ›
        </li>
        <li aria-current="page" className="text-[var(--dgp-ink-soft)]">
          {current}
        </li>
      </ol>
    </nav>
  );
}

/** Pale-sky page-title band used on every inner page, with breadcrumb. */
export function GpPageHero({
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
    <div className="border-b border-[var(--dgp-sky-line)] bg-[var(--dgp-sky)]">
      <GpBreadcrumb current={crumb ?? title} />
      <div className="mx-auto w-full max-w-[1100px] px-4 pb-9 pt-4 sm:px-6 sm:pb-12 sm:pt-5">
        <h1 className="max-w-[720px] text-[clamp(1.8rem,4.5vw,2.6rem)] font-bold leading-tight tracking-tight">
          {title}
        </h1>
        {lede ? (
          <p className="mt-3 max-w-[640px] text-lg leading-relaxed text-[var(--dgp-ink-soft)]">
            {lede}
          </p>
        ) : null}
      </div>
    </div>
  );
}

/** Page section with a spacing variant so rhythm can vary:
    tight follow-ons, generous topic changes. */
export function GpSection({
  children,
  className = "",
  pad = "normal",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  pad?: "flush" | "normal" | "spacious";
  id?: string;
}) {
  const pads = {
    flush: "pb-12 pt-0",
    normal: "py-12",
    spacious: "py-16 sm:py-20",
  } as const;
  return (
    <section
      id={id}
      className={`mx-auto w-full max-w-[1100px] px-4 sm:px-6 ${pads[pad]} ${className}`}
    >
      {children}
    </section>
  );
}

/** Soft-shadowed card; the border tints scheme-blue on hover.
    Reserved for interactive tiles — static content stays in plain flow. */
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
      className={`group block rounded-[var(--dgp-radius-lg)] border border-[var(--dgp-line)] bg-white p-5 transition-colors hover:border-[var(--dgp-blue)] ${gpShadow}`}
    >
      <h3 className="flex items-start justify-between gap-3 text-lg font-bold leading-snug text-[var(--dgp-ink)] group-hover:text-[var(--dgp-blue)]">
        {title}
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          className="mt-1 h-4 w-4 shrink-0 fill-none stroke-[var(--dgp-blue)] stroke-2 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
        </svg>
      </h3>
      <p className="mt-1.5 text-base leading-relaxed text-[var(--dgp-ink-soft)]">
        {copy}
      </p>
    </Link>
  );
}

/** Large primary task tile — the two things most patients come to do. */
export function GpPrimaryCard({
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
      className={`group flex items-center justify-between gap-4 rounded-[var(--dgp-radius-lg)] border border-[var(--dgp-line)] bg-white p-6 transition-colors hover:border-[var(--dgp-blue)] sm:p-7 ${gpShadow}`}
    >
      <div>
        <h3 className="text-lg font-bold leading-snug text-[var(--dgp-ink)] group-hover:text-[var(--dgp-blue)]">
          {title}
        </h3>
        <p className="mt-1.5 text-base leading-relaxed text-[var(--dgp-ink-soft)]">
          {copy}
        </p>
      </div>
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        className="h-9 w-9 shrink-0 rounded-full bg-[var(--dgp-blue)] fill-none stroke-white stroke-2 p-2 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6 6 6-6 6" />
      </svg>
    </Link>
  );
}

/** Solid green pill action (the scheme's "do" colour). External
    destinations open in the same tab, per NHS service manual guidance. */
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
      className="inline-block rounded-full bg-[var(--dgp-green)] px-7 py-3 text-base font-semibold text-white transition-colors hover:bg-[var(--dgp-green-deep)]"
    >
      {children}
    </a>
  );
}

/** Amber information callout — full border and tint, no side stripe. */
export function GpCallout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[var(--dgp-radius-lg)] border border-[var(--dgp-amber-line)] bg-[var(--dgp-amber-tint)] p-5 sm:p-6">
      {/* A notice, not a document section — deliberately not a heading,
          so task tiles keep their place in the page outline. */}
      <p className="flex items-center gap-2 text-base font-bold">
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          className="h-5 w-5 shrink-0 fill-none stroke-[var(--dgp-amber-ink)] stroke-2"
        >
          <circle cx="12" cy="12" r="9" />
          <path strokeLinecap="round" d="M12 8v5" />
          <circle cx="12" cy="16.5" r="0.5" className="fill-[var(--dgp-amber-ink)]" />
        </svg>
        {title}
      </p>
      <div className="mt-1.5 text-base leading-relaxed text-[var(--dgp-ink-soft)]">
        {children}
      </div>
    </div>
  );
}

/** NHS-style care card: coloured header band + white body. The pattern
    patients already know from nhs.uk — and no side stripes. */
export function GpCareCard({
  variant,
  title,
  children,
}: {
  variant: "non-urgent" | "urgent" | "emergency";
  title: string;
  children: React.ReactNode;
}) {
  const header =
    variant === "urgent"
      ? "bg-[var(--dgp-red)]"
      : variant === "emergency"
        ? "bg-[var(--dgp-emergency)]"
        : "bg-[var(--dgp-blue)]";
  return (
    <div
      className={`overflow-hidden rounded-[var(--dgp-radius-lg)] border border-[var(--dgp-line)] bg-white ${gpShadow}`}
    >
      {/* h3: every current use sits inside a section already headed by an h2. */}
      <h3 className={`${header} px-5 py-3.5 text-lg font-bold text-white`}>
        {title}
      </h3>
      <div className="p-5 text-base leading-relaxed text-[var(--dgp-ink-soft)]">
        {children}
      </div>
    </div>
  );
}

/** One consistent note for the demo's illustrative dead-ends. */
export function GpSampleNote({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1.5 text-sm text-[var(--dgp-ink-soft)]">
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

/** Self-contained illustrative street map for the fictional practice —
    no live embed, no external tiles, clearly stylised. */
export function GpMiniMap() {
  return (
    <svg
      role="img"
      aria-label="Illustrative map showing Willowbrook Surgery on Meadow Lane, next to the village green and the number 12 bus stop"
      viewBox="0 0 560 300"
      className="h-auto w-full rounded-[var(--dgp-radius-lg)] border border-[var(--dgp-line)]"
    >
      <rect width="560" height="300" fill="#eef3f0" />
      {/* village green */}
      <path
        d="M0 210 Q120 170 210 215 T440 240 L560 220 L560 300 L0 300 Z"
        fill="#dcead9"
      />
      {/* river */}
      <path
        d="M470 0 C450 70 500 130 468 210 C450 255 470 280 462 300"
        fill="none"
        stroke="#c3dbe8"
        strokeWidth="14"
        strokeLinecap="round"
      />
      {/* roads */}
      <path d="M0 150 H560" stroke="#ffffff" strokeWidth="22" />
      <path d="M0 150 H560" stroke="var(--dgp-line)" strokeWidth="24" fill="none" opacity="0.35" />
      <path d="M0 150 H560" stroke="#ffffff" strokeWidth="20" />
      <path d="M150 0 V150" stroke="#ffffff" strokeWidth="16" />
      <path d="M340 150 C350 200 330 250 360 300" stroke="#ffffff" strokeWidth="14" fill="none" />
      {/* buildings */}
      <g fill="#d5dee2">
        <rect x="40" y="90" width="44" height="30" rx="3" />
        <rect x="200" y="86" width="52" height="34" rx="3" />
        <rect x="380" y="92" width="40" height="28" rx="3" />
        <rect x="60" y="180" width="46" height="30" rx="3" />
        <rect x="500" y="90" width="34" height="30" rx="3" />
      </g>
      {/* the surgery */}
      <rect x="256" y="174" width="72" height="48" rx="4" fill="#ffffff" stroke="var(--dgp-blue)" strokeWidth="2.5" />
      <path d="M292 186 v24 M280 198 h24" stroke="var(--dgp-blue)" strokeWidth="5" strokeLinecap="round" />
      {/* marker */}
      <g transform="translate(292 168)">
        <path d="M0 0 C-14 -18 -14 -34 0 -40 C14 -34 14 -18 0 0 Z" fill="var(--dgp-blue)" />
        <circle cx="0" cy="-28" r="6" fill="#ffffff" />
      </g>
      {/* bus stop */}
      <g transform="translate(196 140)">
        <circle r="9" fill="var(--dgp-blue-deep)" />
        <text
          y="3.5"
          textAnchor="middle"
          fontSize="10"
          fontWeight="700"
          fill="#ffffff"
          fontFamily="ui-sans-serif, system-ui, sans-serif"
        >
          12
        </text>
      </g>
      {/* labels */}
      <g
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fill="var(--dgp-ink-soft)"
        fontSize="13"
      >
        <text x="16" y="143">Meadow Lane</text>
        <text x="94" y="262">Willowbrook Green</text>
        <text x="480" y="40" transform="rotate(78 480 40)">River Loddon</text>
      </g>
      <text
        x="292"
        y="248"
        textAnchor="middle"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontWeight="700"
        fontSize="14"
        fill="var(--dgp-ink)"
      >
        Willowbrook Surgery
      </text>
      <text
        x="548"
        y="288"
        textAnchor="end"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontSize="11"
        fill="var(--dgp-ink-soft)"
      >
        Illustrative map — sample site
      </text>
    </svg>
  );
}
