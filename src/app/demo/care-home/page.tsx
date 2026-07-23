import Link from "next/link";
import { Flower2, HeartHandshake, Home as HomeIcon, UtensilsCrossed } from "lucide-react";
import {
  CareButton,
  CareHeading,
  CareSection,
} from "@/components/demos/care/CareShell";
import {
  careTypes,
  faqs,
  home,
  inspection,
  lifeMoments,
} from "@/components/demos/care/data";

const toneBg = {
  sage: "bg-[var(--dch-sage-soft)]",
  terra: "bg-[#f6e3d9]",
  cream: "bg-[var(--dch-cream)]",
} as const;

const momentIcons = [UtensilsCrossed, Flower2, HeartHandshake, HomeIcon] as const;

export default function CareDemoHome() {
  return (
    <>
      {/* Welcome */}
      <div className="border-b border-[var(--dch-line)] bg-[var(--dch-cream)]">
        <div className="mx-auto grid w-full max-w-[1100px] items-center gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-[var(--dch-terra)]">
              A care home in Caversham
            </p>
            <h1 className="dch-display mt-3 max-w-[560px] text-[clamp(2.1rem,5.4vw,3.3rem)] font-bold leading-[1.08] text-[var(--dch-ink)]">
              The comfort of home, with care that never sleeps
            </h1>
            <p className="mt-5 max-w-[520px] text-[16.5px] leading-relaxed text-[var(--dch-soft)]">
              Oakfield House is a 34-bed home for residential, dementia and
              respite care — small enough that everyone knows your name, and
              settled enough that it feels like yours from the first week.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <CareButton href="/demo/care-home/contact">Book a visit</CareButton>
              <CareButton href="/demo/care-home/families" tone="outline">
                Advice for families
              </CareButton>
            </div>
            <p className="mt-5 text-[14.5px] text-[var(--dch-soft)]">
              Or call {home.manager}, our registered manager, on{" "}
              <a href={home.phoneHref} className="font-semibold text-[var(--dch-terra)] underline underline-offset-2">
                {home.phone}
              </a>
            </p>
          </div>

          {/* Illustration panel — stands in for photography in the sample. */}
          <div className="relative mx-auto w-full max-w-[420px]">
            <div aria-hidden className="grid grid-cols-2 gap-3">
              <div className="flex h-[150px] items-end rounded-3xl bg-[var(--dch-sage-soft)] p-4">
                <Flower2 size={34} className="text-[var(--dch-sage)]" />
              </div>
              <div className="mt-8 flex h-[150px] items-end rounded-3xl bg-[#f6e3d9] p-4">
                <HomeIcon size={34} className="text-[var(--dch-terra)]" />
              </div>
              <div className="-mt-8 flex h-[150px] items-end rounded-3xl bg-[#efe6f2] p-4">
                <HeartHandshake size={34} className="text-[#7c5e88]" />
              </div>
              <div className="flex h-[150px] items-end rounded-3xl bg-[var(--dch-cream)] p-4 ring-1 ring-[var(--dch-line)]">
                <UtensilsCrossed size={34} className="text-[var(--dch-soft)]" />
              </div>
            </div>
            <p className="mt-3 text-center text-[12px] text-[var(--dch-soft)]">
              Sample imagery — a real build uses photography of your home
            </p>
          </div>
        </div>
      </div>

      {/* Care types */}
      <CareSection>
        <CareHeading eyebrow="How we can help">
          Three kinds of care, one familiar place
        </CareHeading>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {careTypes.map((type) => (
            <article
              key={type.title}
              className={`rounded-3xl p-6 ${toneBg[type.tone as keyof typeof toneBg]}`}
            >
              <h3 className="dch-display text-[19px] font-bold text-[var(--dch-ink)]">
                {type.title}
              </h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-[var(--dch-soft)]">
                {type.copy}
              </p>
            </article>
          ))}
        </div>
      </CareSection>

      {/* Inspection block */}
      <div className="bg-[var(--dch-surface)]">
        <CareSection>
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_1fr]">
            <div>
              <CareHeading eyebrow="Inspected and open about it">
                Rated {inspection.rating} by the Care Quality Commission
              </CareHeading>
              <p className="mt-4 max-w-[480px] text-[15px] leading-relaxed text-[var(--dch-soft)]">
                We publish our inspection results in full because choosing care
                should never mean taking someone&rsquo;s word for it. Read the
                report, then come and see the home for yourself.
              </p>
              <p className="mt-3 text-[13px] text-[var(--dch-soft)]">
                {inspection.note}
              </p>
            </div>
            <table className="w-full max-w-[420px] border-collapse justify-self-center text-[15px] lg:justify-self-end">
              <caption className="sr-only">
                Inspection ratings by area (sample content)
              </caption>
              <tbody>
                {inspection.areas.map(([area, rating]) => (
                  <tr key={area} className="border-b border-[var(--dch-line)]">
                    <th scope="row" className="py-3 pr-4 text-left font-semibold text-[var(--dch-ink)]">
                      {area}
                    </th>
                    <td className="py-3 text-right">
                      <span
                        className={`rounded-full px-3 py-1 text-[13px] font-bold ${
                          rating === "Outstanding"
                            ? "bg-[#efe6f2] text-[#6d4f7a]"
                            : "bg-[var(--dch-sage-soft)] text-[var(--dch-sage)]"
                        }`}
                      >
                        {rating}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CareSection>
      </div>

      {/* Life at Oakfield */}
      <CareSection>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <CareHeading eyebrow="Life at Oakfield">
            Days worth getting up for
          </CareHeading>
          <CareButton href="/demo/care-home/life" tone="outline">
            See a week at Oakfield
          </CareButton>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {lifeMoments.map((moment, i) => {
            const Icon = momentIcons[i];
            return (
              <article
                key={moment.title}
                className="rounded-3xl border border-[var(--dch-line)] bg-[var(--dch-surface)] p-6"
              >
                <Icon size={26} className="text-[var(--dch-terra)]" aria-hidden />
                <h3 className="dch-display mt-4 text-[17px] font-bold text-[var(--dch-ink)]">
                  {moment.title}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-[var(--dch-soft)]">
                  {moment.copy}
                </p>
              </article>
            );
          })}
        </div>
      </CareSection>

      {/* Fees + FAQ teaser */}
      <div className="bg-[var(--dch-cream)]">
        <CareSection>
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <CareHeading eyebrow="Honest answers">
                The questions every family asks
              </CareHeading>
              <p className="mt-4 max-w-[460px] text-[15px] leading-relaxed text-[var(--dch-soft)]">
                Fees, visiting, what happens when needs change — the things
                that matter are answered plainly here, not saved for a sales
                call.
              </p>
              <div className="mt-6">
                <CareButton href="/demo/care-home/families">
                  Read the family guide
                </CareButton>
              </div>
            </div>
            <div className="divide-y divide-[var(--dch-line)] rounded-3xl border border-[var(--dch-line)] bg-[var(--dch-surface)]">
              {faqs.slice(0, 3).map((faq) => (
                <details key={faq.q} className="group p-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15.5px] font-semibold text-[var(--dch-ink)] [&::-webkit-details-marker]:hidden">
                    {faq.q}
                    <span
                      aria-hidden
                      className="text-[20px] leading-none text-[var(--dch-terra)] transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-[var(--dch-soft)]">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </CareSection>
      </div>

      {/* Closing CTA */}
      <CareSection className="text-center">
        <h2 className="dch-display mx-auto max-w-[560px] text-[clamp(1.6rem,3.8vw,2.3rem)] font-bold leading-[1.15] text-[var(--dch-ink)]">
          The kettle is always on — come and see Oakfield for yourself
        </h2>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <CareButton href="/demo/care-home/contact">Book a visit</CareButton>
          <a
            href={home.phoneHref}
            className="inline-block rounded-full border border-[var(--dch-ink)]/25 bg-[var(--dch-surface)] px-6 py-3 text-[15px] font-semibold text-[var(--dch-ink)] transition-colors hover:border-[var(--dch-terra)] hover:text-[var(--dch-terra)]"
          >
            Call {home.phone}
          </a>
        </div>
        <p className="mt-5 text-[14px] text-[var(--dch-soft)]">
          Prefer to browse first?{" "}
          <Link href="/demo/care-home/life" className="font-semibold text-[var(--dch-terra)] underline underline-offset-2">
            See what a week here looks like
          </Link>
        </p>
      </CareSection>
    </>
  );
}
