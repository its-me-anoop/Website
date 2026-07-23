import type { Metadata } from "next";
import {
  CareHeading,
  CarePageHero,
  CareSection,
} from "@/components/demos/care/CareShell";
import { home } from "@/components/demos/care/data";

export const metadata: Metadata = { title: "Contact & visits" };

export default function CareContactPage() {
  return (
    <>
      <CarePageHero
        eyebrow="Contact & visits"
        title="Come and see Oakfield for yourself"
        lede="No set visiting hours, no appointment needed for a first look — though calling ahead means the right person is free to show you around."
      />

      <CareSection>
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <CareHeading eyebrow="Reach us">Talk to a person, not a queue</CareHeading>
            <ul className="mt-5 space-y-3 text-[15.5px] leading-relaxed">
              <li>
                <strong>Telephone:</strong>{" "}
                <a href={home.phoneHref} className="font-semibold text-[var(--dch-terra)] underline underline-offset-2">
                  {home.phone}
                </a>{" "}
                <span className="text-[var(--dch-soft)]">— answered by staff at the home, day and night</span>
              </li>
              <li>
                <strong>Email:</strong>{" "}
                <a
                  href={`mailto:${home.email}`}
                  className="font-semibold text-[var(--dch-terra)] underline underline-offset-2"
                >
                  {home.email}
                </a>
              </li>
              <li>
                <strong>Address:</strong>{" "}
                <span className="text-[var(--dch-soft)]">{home.address}</span>
              </li>
            </ul>
            <p className="mt-5 max-w-[480px] text-[14.5px] leading-relaxed text-[var(--dch-soft)]">
              For enquiries about a place at Oakfield, ask for {home.manager},
              our registered manager. If she is with residents, she will call
              you back the same day.
            </p>
          </div>

          <div>
            <CareHeading eyebrow="Find us">Getting to Oakfield</CareHeading>
            <div className="mt-5 flex h-[180px] items-center justify-center rounded-3xl border border-[var(--dch-line)] bg-[var(--dch-cream)] text-[14px] text-[var(--dch-soft)]">
              Map placeholder — sample site
            </div>
            <ul className="mt-4 list-disc space-y-1.5 pl-5 text-[14.5px] leading-relaxed text-[var(--dch-soft)]">
              <li>Ten minutes from Reading town centre, just off the Henley road</li>
              <li>Visitor parking in the front drive, with two accessible bays</li>
              <li>Level access from the car park to the front door</li>
            </ul>
          </div>
        </div>
      </CareSection>

      <div className="bg-[var(--dch-surface)]">
        <CareSection>
          <div className="rounded-3xl bg-[var(--dch-cream)] p-8 sm:p-10">
            <CareHeading eyebrow="Visiting">
              Families are part of the home
            </CareHeading>
            <p className="mt-4 max-w-[640px] text-[15.5px] leading-relaxed text-[var(--dch-soft)]">
              Visit whenever suits you — mornings, evenings, weekends.
              Grandchildren and well-behaved dogs are welcome, there is always
              a spare cup at coffee time, and you can join any activity on the
              calendar. The only thing we ask is patience at mealtimes during a
              resident&rsquo;s first fortnight, while they find their feet.
            </p>
          </div>
        </CareSection>
      </div>
    </>
  );
}
