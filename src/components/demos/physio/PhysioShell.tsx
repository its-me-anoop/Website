import Link from "next/link";
import { loadPhysioContent } from "@/lib/cms/physio";
import { formatDate } from "@/lib/cms/schemas/shared";
import { SampleRibbon } from "../SampleRibbon";
import { PhysioNav } from "./PhysioNav";
import { navLinks } from "./links";

/**
 * Chrome for the Forbury Physiotherapy demo — athletic editorial:
 * warm paper canvas, a light masthead over a dark slate nav strip
 * (the rhythm break the GP and care demos don't use), coral actions
 * used sparingly. Server components except PhysioNav (current-page
 * marking); the root route transition skips /demo so content renders
 * before hydration.
 *
 * Type ladder (keep to it): text-sm 14 small print · text-base 16
 * body · text-lg 18 card titles/h3 · text-xl 20 inner h2 · text-2xl 24
 * section h2 · clamp h1.
 */
export function PhysioShell({ children }: { children: React.ReactNode }) {
  const { clinic } = loadPhysioContent();
  return (
    <div className="demo-physio-root relative min-h-screen">
      <SampleRibbon
        sectorHref="/packages"
        sectorLabel="Get a site like this for your clinic"
      />

      <header className="bg-[var(--dpy-surface)]">
        <div className="mx-auto flex w-full max-w-[1180px] flex-wrap items-center justify-between gap-x-8 gap-y-3 px-4 py-6 sm:px-6">
          <Link href="/demo/physio-clinic" className="group">
            <span className="dpy-display block text-[26px] font-bold leading-none tracking-tight text-[var(--dpy-ink)]">
              {clinic.name}
            </span>
            <span className="mt-1.5 block text-sm text-[var(--dpy-ink-soft)]">
              {clinic.strap}
            </span>
          </Link>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a
              href={clinic.phoneHref}
              className="text-[17px] font-semibold text-[var(--dpy-ink)] underline decoration-[var(--dpy-line)] decoration-2 underline-offset-4 hover:decoration-[var(--dpy-coral)]"
            >
              {clinic.phone}
            </a>
            <Link
              href="/demo/physio-clinic/first-appointment"
              className="rounded-full bg-[var(--dpy-coral)] px-5 py-2.5 text-[15px] font-semibold text-white transition-colors hover:bg-[var(--dpy-coral-deep)]"
            >
              Book your first visit
            </Link>
          </div>
        </div>
        <PhysioNav />
      </header>

      <main id="main">{children}</main>

      <footer className="mt-20 bg-[var(--dpy-slate)] text-[var(--dpy-slate-ink)]">
        <div className="mx-auto grid w-full max-w-[1180px] gap-10 px-4 py-14 sm:grid-cols-3 sm:px-6">
          <div>
            <p className="dpy-display text-lg font-bold text-white">{clinic.name}</p>
            <p className="mt-3 max-w-[260px] text-sm leading-relaxed text-[var(--dpy-slate-ink)]/85">
              {clinic.address}
              <br />
              <a href={clinic.phoneHref} className="underline underline-offset-2 hover:text-white">
                {clinic.phone}
              </a>
              <br />
              <a href={`mailto:${clinic.email}`} className="underline underline-offset-2 hover:text-white">
                {clinic.email}
              </a>
            </p>
          </div>
          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-white/70">
              Find your way
            </h2>
            <ul className="mt-3 space-y-1.5 text-sm">
              {navLinks.slice(1).map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="underline underline-offset-2 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/demo/physio-clinic/accessibility"
                  className="underline underline-offset-2 hover:text-white"
                >
                  Accessibility statement
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-white/70">
              Opening hours
            </h2>
            <dl className="mt-3 space-y-1 text-sm">
              {clinic.openingTimes.map(({ day, hours }) => (
                <div key={day} className="flex justify-between gap-4">
                  <dt className="text-[var(--dpy-slate-ink)]/75">{day}</dt>
                  <dd>{hours}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
        <div className="border-t border-white/10">
          <p className="mx-auto w-full max-w-[1180px] px-4 py-4 text-sm text-[var(--dpy-slate-ink)]/75 sm:px-6">
            {clinic.name} is a fictional clinic. This sample website was
            designed and built by{" "}
            <Link href="/packages" className="underline underline-offset-2 hover:text-white">
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

/** Tinted, asymmetric page-title band used on every inner page. */
export function PhysioPageHero({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
}) {
  return (
    <div className="border-b border-[var(--dpy-line)] bg-[var(--dpy-tint)]">
      <div className="mx-auto w-full max-w-[1180px] px-4 py-12 sm:px-6 sm:py-16">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--dpy-coral)]">
          {eyebrow}
        </p>
        <h1 className="dpy-display mt-3 max-w-[820px] text-[clamp(2rem,5.2vw,3.2rem)] font-bold leading-[1.05]">
          {title}
        </h1>
        {lede ? (
          <p className="mt-5 max-w-[620px] text-lg leading-relaxed text-[var(--dpy-ink-soft)]">
            {lede}
          </p>
        ) : null}
      </div>
    </div>
  );
}

/** Page section with a spacing variant so rhythm can vary: tight
    follow-ons, generous topic changes. */
export function PhysioSection({
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
    <section className={`mx-auto w-full max-w-[1180px] px-4 sm:px-6 ${pads[pad]} ${className}`}>
      {children}
    </section>
  );
}

/** Section heading — the 24px tier of the type ladder. */
export function PhysioHeading({
  eyebrow,
  children,
}: {
  eyebrow?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      {eyebrow ? (
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--dpy-coral)]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="dpy-display mt-1.5 text-2xl font-bold leading-tight">{children}</h2>
    </div>
  );
}

/** Solid coral action button — used sparingly, for the one primary
    action on a page. */
export function PhysioButton({
  children,
  href,
  tone = "coral",
}: {
  children: React.ReactNode;
  href: string;
  tone?: "coral" | "outline";
}) {
  const classes =
    tone === "coral"
      ? "bg-[var(--dpy-coral)] text-white hover:bg-[var(--dpy-coral-deep)]"
      : "border border-[var(--dpy-ink)]/25 bg-[var(--dpy-surface)] text-[var(--dpy-ink)] hover:border-[var(--dpy-coral)] hover:text-[var(--dpy-coral)]";
  return (
    <Link
      href={href}
      className={`inline-block rounded-full px-6 py-3 text-[15px] font-semibold transition-colors ${classes}`}
    >
      {children}
    </Link>
  );
}

/** Oversized, numbered editorial index — the "condition-index"
    typographic motif that carries the design without any imagery. */
export function PhysioIndex({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <ol className="divide-y divide-white/10">
      {items.map((item, index) => {
        const number = String(index + 1).padStart(2, "0");
        const row = (
          <>
            <span
              aria-hidden
              className="dpy-display shrink-0 text-[clamp(1.6rem,4vw,2.6rem)] font-bold leading-none text-[var(--dpy-coral)]"
            >
              {number}
            </span>
            <span className="dpy-display text-[clamp(1.15rem,2.6vw,1.6rem)] font-bold leading-tight text-white">
              {item.label}
            </span>
          </>
        );
        return (
          <li key={item.label}>
            {item.href ? (
              <Link
                href={item.href}
                className="group flex items-center gap-5 py-5 hover:opacity-90 sm:gap-8 sm:py-6"
              >
                {row}
              </Link>
            ) : (
              <div className="flex items-center gap-5 py-5 sm:gap-8 sm:py-6">{row}</div>
            )}
          </li>
        );
      })}
    </ol>
  );
}

/** Full-border callout for a load-bearing notice — no side stripe. */
export function PhysioCallout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-md border border-[var(--dpy-line)] bg-[var(--dpy-coral-tint)] p-6">
      <p className="text-lg font-bold text-[var(--dpy-ink)]">{title}</p>
      <div className="mt-2 text-base leading-relaxed text-[var(--dpy-ink-soft)]">{children}</div>
    </div>
  );
}

/** "Page last reviewed / Next review due" freshness pattern. */
export function PhysioReviewDate({ reviewed }: { reviewed: string }) {
  const [year, month] = reviewed.split("-").map(Number);
  const dueIso = `${year + 1}-${String(month).padStart(2, "0")}-${reviewed.slice(8, 10)}`;
  return (
    <p className="mt-10 border-t border-[var(--dpy-line)] pt-4 text-sm text-[var(--dpy-ink-soft)]">
      Page last reviewed: {formatDate(reviewed)}
      <br />
      Next review due: {formatDate(dueIso)}
    </p>
  );
}
