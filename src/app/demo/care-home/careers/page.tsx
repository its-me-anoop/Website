import type { Metadata } from "next";
import {
  CareHeading,
  CarePageHero,
  CareSection,
} from "@/components/demos/care/CareShell";
import { home, roles } from "@/components/demos/care/data";

export const metadata: Metadata = { title: "Careers" };

const promises = [
  ["Paid properly", "Above the local going rate, with paid breaks, paid training days and double time on bank holidays."],
  ["Trained properly", "Funded NVQs, dementia-care training and a named mentor for your first three months."],
  ["Treated properly", "Rotas published four weeks ahead, no zero-hours contracts, and a manager whose door is actually open."],
] as const;

export default function CareersPage() {
  return (
    <>
      <CarePageHero
        eyebrow="Careers at Oakfield"
        title="Do work that matters, with people who notice"
        lede="Care work is skilled work. At Oakfield it is treated that way — in pay, in training and in respect."
      />

      <CareSection>
        <CareHeading eyebrow="What we promise our team">
          Three promises, kept in writing
        </CareHeading>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {promises.map(([title, copy]) => (
            <article
              key={title}
              className="rounded-3xl bg-[var(--dch-sage-soft)] p-6"
            >
              <h3 className="dch-display text-[18px] font-bold text-[var(--dch-ink)]">
                {title}
              </h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-[var(--dch-soft)]">
                {copy}
              </p>
            </article>
          ))}
        </div>
      </CareSection>

      <div className="bg-[var(--dch-surface)]">
        <CareSection>
          <CareHeading eyebrow="Open roles">
            We&rsquo;re currently hiring
          </CareHeading>
          <ul className="mt-8 max-w-[760px] divide-y divide-[var(--dch-line)] rounded-3xl border border-[var(--dch-line)] bg-[var(--dch-canvas)]">
            {roles.map((role) => (
              <li key={role.title} className="p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="dch-display text-[18px] font-bold text-[var(--dch-ink)]">
                    {role.title}
                  </h3>
                  <p className="text-[13px] font-semibold uppercase tracking-wide text-[var(--dch-terra)]">
                    {role.detail}
                  </p>
                </div>
                <p className="mt-2 max-w-[560px] text-[14.5px] leading-relaxed text-[var(--dch-soft)]">
                  {role.copy}
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-[640px] text-[15px] leading-relaxed text-[var(--dch-soft)]">
            To apply, call {home.manager} on{" "}
            <a href={home.phoneHref} className="font-semibold text-[var(--dch-terra)] underline underline-offset-2">
              {home.phone}
            </a>{" "}
            or drop in with a CV — the kettle will be on either way. (This is a
            sample website, so the roles shown are illustrative.)
          </p>
        </CareSection>
      </div>
    </>
  );
}
