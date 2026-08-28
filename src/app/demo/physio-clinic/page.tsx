import Link from "next/link";
import {
  PhysioButton,
  PhysioHeading,
  PhysioIndex,
  PhysioSection,
} from "@/components/demos/physio/PhysioShell";
import { loadPhysioContent } from "@/lib/cms/physio";

export default function PhysioDemoHome() {
  const { clinic, home } = loadPhysioContent();

  const indexItems = home.conditionsTeaser.map((teaser) => ({
    label: teaser.label,
    href: teaser.slug
      ? `/demo/physio-clinic/conditions#${teaser.slug}`
      : "/demo/physio-clinic/conditions",
  }));

  return (
    <>
      {/* Hero */}
      <div className="border-b border-[var(--dpy-line)] bg-[var(--dpy-tint)]">
        <div className="mx-auto w-full max-w-[1180px] px-4 py-14 sm:px-6 sm:py-20">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--dpy-coral)]">
            {clinic.name}
          </p>
          <h1 className="dpy-display mt-3 max-w-[820px] text-[clamp(2.2rem,6vw,3.8rem)] font-bold leading-[1.02]">
            {home.hero.title}
          </h1>
          <p className="mt-5 max-w-[620px] text-lg leading-relaxed text-[var(--dpy-ink-soft)]">
            {home.hero.copy}
          </p>
          <p className="mt-4 max-w-[560px] text-base font-semibold text-[var(--dpy-ink)]">
            {clinic.nhsPositioningLine}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <PhysioButton href="/demo/physio-clinic/first-appointment">
              Book your first visit
            </PhysioButton>
            <a
              href={clinic.phoneHref}
              className="text-base font-semibold text-[var(--dpy-ink)] underline decoration-[var(--dpy-line)] decoration-2 underline-offset-4 hover:decoration-[var(--dpy-coral)]"
            >
              Or call {clinic.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Common first steps */}
      <PhysioSection>
        <h2 className="sr-only">Common first steps</h2>
        <ul className="divide-y divide-[var(--dpy-line)]">
          {home.primaryTasks.map((task) => (
            <li key={task.title}>
              <Link href={task.href} className="group flex items-center justify-between gap-6 py-5">
                <span>
                  <h3 className="text-lg font-bold text-[var(--dpy-ink)] underline-offset-4 group-hover:underline group-hover:decoration-[var(--dpy-coral)]">
                    {task.title}
                  </h3>
                  <span className="mt-1 block max-w-[560px] text-base leading-relaxed text-[var(--dpy-ink-soft)]">
                    {task.copy}
                  </span>
                </span>
                <svg
                  aria-hidden
                  viewBox="0 0 24 24"
                  className="h-6 w-6 shrink-0 fill-none stroke-[var(--dpy-coral)] stroke-2 transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6 6 6-6 6" />
                </svg>
              </Link>
            </li>
          ))}
        </ul>
      </PhysioSection>

      {/* Condition index */}
      <div className="bg-[var(--dpy-slate)]">
        <PhysioSection pad="spacious">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="dpy-display text-2xl font-bold text-white">Conditions we see</h2>
            <Link
              href="/demo/physio-clinic/conditions"
              className="text-sm font-semibold text-white underline decoration-white/40 underline-offset-4 hover:decoration-white"
            >
              Full list &amp; treatment approaches →
            </Link>
          </div>
          <div className="mt-2">
            <PhysioIndex items={indexItems} />
          </div>
        </PhysioSection>
      </div>

      {/* NHS positioning + insurance */}
      <PhysioSection pad="spacious">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <PhysioHeading eyebrow="Speed and choice">
              Alongside or instead of an NHS wait
            </PhysioHeading>
            <p className="mt-4 max-w-[520px] text-base leading-relaxed text-[var(--dpy-ink-soft)]">
              {clinic.nhsPositioningLine} NHS self-referral and First Contact Physiotherapy
              exist too — we&rsquo;re simply another route in, not a replacement for what&rsquo;s
              already free.
            </p>
          </div>
          <div>
            <PhysioHeading eyebrow="Insurance">Claiming through your insurer</PhysioHeading>
            <p className="mt-4 max-w-[520px] text-base leading-relaxed text-[var(--dpy-ink-soft)]">
              {clinic.insurersCopy}
            </p>
            <Link
              href="/demo/physio-clinic/first-appointment"
              className="mt-3 inline-block text-base font-semibold text-[var(--dpy-coral)] underline underline-offset-4"
            >
              How self-pay and insured visits differ
            </Link>
          </div>
        </div>
      </PhysioSection>

      {/* Trust teaser + visit us */}
      <div className="bg-[var(--dpy-tint)]">
        <PhysioSection>
          <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
            <div>
              <PhysioHeading eyebrow="Regulation">
                Every clinician is HCPC-registered
              </PhysioHeading>
              <p className="mt-4 max-w-[560px] text-base leading-relaxed text-[var(--dpy-ink-soft)]">
                Physiotherapist is a protected title, and we&rsquo;re regulated by the HCPC
                rather than the CQC — read exactly what that means on our trust &amp;
                regulation page.
              </p>
              <div className="mt-5">
                <PhysioButton href="/demo/physio-clinic/trust" tone="outline">
                  Trust &amp; regulation
                </PhysioButton>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold text-[var(--dpy-ink)]">Visit us</h2>
              <p className="mt-3 text-base leading-relaxed text-[var(--dpy-ink-soft)]">
                {clinic.address}
              </p>
              <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-[var(--dpy-ink-soft)]">
                {clinic.access.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </PhysioSection>
      </div>
    </>
  );
}
