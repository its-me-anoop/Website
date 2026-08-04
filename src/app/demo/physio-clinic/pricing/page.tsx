import type { Metadata } from "next";
import {
  PhysioCallout,
  PhysioHeading,
  PhysioPageHero,
  PhysioSection,
} from "@/components/demos/physio/PhysioShell";
import { loadPhysioContent } from "@/lib/cms/physio";

export const metadata: Metadata = { title: "Pricing" };

export default function PricingPage() {
  const { pricing } = loadPhysioContent();

  return (
    <>
      <PhysioPageHero
        eyebrow="Published prices"
        title="Pricing"
        lede="No need to call and ask — every session type is priced here, with what's included and how long it takes."
      />

      <PhysioSection>
        <h2 className="sr-only">Session prices</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] border-collapse text-base">
            <caption className="sr-only">
              Session types with duration, price and what&rsquo;s included
            </caption>
            <thead>
              <tr className="border-b-2 border-[var(--dpy-ink)] text-left">
                <th scope="col" className="py-3 pr-4 text-sm font-bold uppercase tracking-[0.08em]">
                  Session
                </th>
                <th scope="col" className="py-3 pr-4 text-sm font-bold uppercase tracking-[0.08em]">
                  Duration
                </th>
                <th scope="col" className="py-3 pr-4 text-sm font-bold uppercase tracking-[0.08em]">
                  Price
                </th>
                <th scope="col" className="py-3 text-sm font-bold uppercase tracking-[0.08em]">
                  What&rsquo;s included
                </th>
              </tr>
            </thead>
            <tbody>
              {pricing.sessions.map((session) => (
                <tr key={session.type} className="border-b border-[var(--dpy-line)]">
                  <th scope="row" className="py-4 pr-4 text-left font-bold text-[var(--dpy-ink)]">
                    {session.type}
                  </th>
                  <td className="py-4 pr-4 text-[var(--dpy-ink-soft)]">{session.duration}</td>
                  <td className="py-4 pr-4 font-semibold text-[var(--dpy-ink)]">
                    {session.price}
                  </td>
                  <td className="py-4 text-[var(--dpy-ink-soft)]">{session.includes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm text-[var(--dpy-ink-soft)]">
          Prices shown are illustrative for this sample site.
        </p>
      </PhysioSection>

      <div className="bg-[var(--dpy-tint)]">
        <PhysioSection>
          <PhysioHeading eyebrow="Honesty by design">
            How long will treatment take?
          </PhysioHeading>
          <p className="mt-4 max-w-[640px] text-base leading-relaxed text-[var(--dpy-ink-soft)]">
            {pricing.courseLengthCopy}
          </p>
        </PhysioSection>
      </div>

      <PhysioSection>
        <PhysioHeading eyebrow="Insurance">Paying through insurance</PhysioHeading>
        <ul className="mt-5 max-w-[640px] list-disc space-y-2 pl-5 text-base leading-relaxed text-[var(--dpy-ink-soft)]">
          {pricing.insuranceNotes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      </PhysioSection>

      <PhysioSection pad="spacious">
        <PhysioHeading eyebrow={`${pricing.cancellation.noticeHours} hours' notice`}>
          Cancellations
        </PhysioHeading>
        <p className="mt-4 max-w-[560px] text-base leading-relaxed text-[var(--dpy-ink-soft)]">
          {pricing.cancellation.policyCopy}
        </p>
        <div className="mt-5 max-w-[560px]">
          <PhysioCallout title="Insurers do not pay for missed sessions">
            {pricing.cancellation.insurerNote}
          </PhysioCallout>
        </div>
      </PhysioSection>
    </>
  );
}
