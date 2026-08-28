import Link from "next/link";
import {
  PharmacyCallout,
  PharmacyHoursTable,
  PharmacyMiniMap,
  PharmacyPrimaryCard,
  PharmacySection,
} from "@/components/demos/pharmacy/PharmacyShell";
import { loadPharmacyContent } from "@/lib/cms/pharmacy";

export default function PharmacyDemoHome() {
  const { home, pharmacy, pharmacyFirst } = loadPharmacyContent();

  return (
    <>
      {/* Welcome */}
      <div className="border-b border-[var(--dph-line)] bg-[var(--dph-mint)]">
        <div className="mx-auto w-full max-w-[1100px] px-4 py-8 sm:px-6 sm:py-12">
          <h1 className="max-w-[760px] text-[clamp(1.9rem,4.8vw,2.8rem)] font-bold leading-tight tracking-tight">
            {home.hero.title}
          </h1>
          <p className="mt-3 max-w-[620px] text-lg leading-relaxed text-[var(--dph-ink-soft)]">
            {home.hero.copy}
          </p>
          <p className="mt-4 max-w-[620px] text-base leading-relaxed text-[var(--dph-ink-soft)]">
            {pharmacy.establishedCopy}
          </p>
        </div>
      </div>

      <PharmacySection className="pt-8">
        {home.alert ? (
          <PharmacyCallout title={home.alert.title}>{home.alert.copy}</PharmacyCallout>
        ) : null}

        <h2 className="sr-only">Today&rsquo;s most common tasks</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {home.primaryTasks.map((task) => (
            <PharmacyPrimaryCard key={task.title} {...task} />
          ))}
        </div>
      </PharmacySection>

      {/* Pharmacy First conditions, named on the homepage */}
      <div className="bg-[var(--dph-green)] text-white">
        <div className="mx-auto w-full max-w-[1100px] px-4 py-10 sm:px-6">
          <h2 className="text-2xl font-bold tracking-tight">
            NHS Pharmacy First: seven conditions, free on the NHS
          </h2>
          <p className="mt-2 max-w-[680px] text-base leading-relaxed text-white/85">
            {pharmacyFirst.freeOnNhsCopy}
          </p>
          <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
            {pharmacyFirst.conditions.map((condition) => (
              <li key={condition.condition} className="border-b border-white/20 pb-3">
                <span className="block text-base font-semibold">{condition.condition}</span>
                <span className="mt-0.5 block text-sm text-white/80">
                  {condition.plainName} — {condition.ages}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-6">
            <Link
              href="/demo/pharmacy/pharmacy-first"
              className="font-semibold text-white underline underline-offset-2 hover:text-white/85"
            >
              See what happens in the consultation, and how to access each one
            </Link>
          </p>
        </div>
      </div>

      {/* Repeat prescriptions / NHS App nomination */}
      <PharmacySection pad="spacious">
        <h2 className="text-2xl font-bold tracking-tight">
          Never run out — nominate us in the NHS App
        </h2>
        <p className="mt-2 max-w-[680px] text-base leading-relaxed text-[var(--dph-ink-soft)]">
          Once your GP practice approves a repeat prescription, nominating
          Willowbrook Pharmacy in the{" "}
          <Link
            href="/demo/pharmacy/prescriptions"
            className="text-[var(--dph-green)] underline"
          >
            NHS App
          </Link>{" "}
          sends it straight to us automatically — no forms, no phone calls,
          nothing to remember. You can also order by phone or in person.
        </p>
      </PharmacySection>

      {/* Opening times + find us */}
      <div className="bg-[var(--dph-mint)]">
        <PharmacySection pad="spacious">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Opening times</h2>
              <div className="mt-4">
                <PharmacyHoursTable openingTimes={pharmacy.openingTimes} />
              </div>
              <p className="mt-3 max-w-[480px] text-sm leading-relaxed text-[var(--dph-ink-soft)]">
                {pharmacy.bankHolidayCopy}
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Find us</h2>
              <p className="mt-4 text-base leading-relaxed text-[var(--dph-ink-soft)]">
                {pharmacy.address}, two doors from{" "}
                <Link href="/demo/gp-practice" className="text-[var(--dph-green)] underline">
                  Willowbrook Surgery
                </Link>
                . Ask your GP to nominate us for prescriptions, or pop in
                for Pharmacy First without an appointment.
              </p>
              <div className="mt-4">
                <PharmacyMiniMap />
              </div>
            </div>
          </div>
        </PharmacySection>
      </div>
    </>
  );
}
