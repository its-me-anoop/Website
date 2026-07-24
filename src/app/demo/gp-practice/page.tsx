import Image from "next/image";
import Link from "next/link";
import {
  GpCallout,
  GpCard,
  GpMiniMap,
  GpPrimaryCard,
  GpSection,
  gpShadow,
} from "@/components/demos/gp/GpShell";
import {
  alert,
  faqs,
  moreTasks,
  news,
  openingTimes,
  practice,
  primaryTasks,
} from "@/components/demos/gp/data";

export default function GpDemoHome() {
  return (
    <>
      {/* Welcome hero */}
      <div className="border-b border-[var(--dgp-sky-line)] bg-[var(--dgp-sky)]">
        <div className="mx-auto grid w-full max-w-[1140px] items-center gap-8 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-[1fr_440px] lg:gap-12">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-[var(--dgp-blue-deep)]">
              <span
                aria-hidden
                className="h-2 w-2 rounded-full bg-[var(--dgp-green)]"
              />
              Welcoming new NHS patients
            </p>
            <h1 className="mt-4 max-w-[680px] text-[clamp(1.9rem,4.8vw,2.8rem)] font-bold leading-tight tracking-tight">
              Caring for Willowbrook, at every stage of life
            </h1>
            <p className="mt-3 max-w-[560px] text-lg leading-relaxed text-[var(--dgp-ink-soft)]">
              Book appointments, order prescriptions and get trusted advice
              right here — without waiting on the phone.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="/demo/gp-practice/appointments"
                className="rounded-full bg-[var(--dgp-green)] px-7 py-3 text-base font-semibold text-white transition-colors hover:bg-[var(--dgp-green-deep)]"
              >
                Book an appointment
              </Link>
              <Link
                href="/demo/gp-practice/prescriptions"
                className="rounded-full border border-[var(--dgp-blue)] bg-white px-7 py-3 text-base font-semibold text-[var(--dgp-blue)] transition-colors hover:bg-[var(--dgp-blue)] hover:text-white"
              >
                Order a repeat prescription
              </Link>
            </div>
          </div>
          <div className="relative">
            <Image
              src="/demos/gp/gp-hero.jpg"
              alt="The bright reception area at Willowbrook Surgery, with patients checking in at the front desk"
              width={800}
              height={534}
              sizes="(min-width: 1024px) 440px, 100vw"
              className={`rounded-2xl object-cover ${gpShadow}`}
            />
            <p
              className={`absolute bottom-4 left-4 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[var(--dgp-ink)] ${gpShadow}`}
            >
              Open 8:00am – 6:30pm, Monday to Friday
            </p>
          </div>
        </div>
      </div>

      <GpSection className="pt-10">
        <GpCallout title={alert.title}>{alert.copy}</GpCallout>

        <h2 className="mt-10 text-2xl font-bold tracking-tight">
          What do you need to do today?
        </h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {primaryTasks.map((task) => (
            <GpPrimaryCard key={task.title} {...task} />
          ))}
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {moreTasks.map((task) => (
            <GpCard key={task.title} {...task} />
          ))}
        </div>
      </GpSection>

      {/* Urgent help */}
      <GpSection pad="flush">
        <div className="rounded-2xl bg-[var(--dgp-blue)] text-white">
          <div className="grid gap-6 px-6 py-8 sm:grid-cols-2 sm:px-8">
            <div>
              <h2 className="text-[20px] font-bold">Need help right now?</h2>
              <p className="mt-2 max-w-[440px] text-base leading-relaxed text-white/85">
                If the surgery is closed, NHS 111 can help day and night —
                online or by phone. In a life-threatening emergency, call 999.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 sm:justify-end">
              <a
                href="https://111.nhs.uk/"
                className="rounded-full bg-white px-6 py-3 text-base font-semibold text-[var(--dgp-blue)] hover:bg-[var(--dgp-sky)]"
              >
                Get help from NHS 111
              </a>
              <a
                href="tel:999"
                className="rounded-full border-2 border-white px-6 py-3 text-base font-semibold text-white hover:bg-white/10"
              >
                Emergency: 999
              </a>
            </div>
          </div>
        </div>
      </GpSection>

      {/* Opening times + find us */}
      <GpSection pad="spacious">
        <div className="grid gap-6 lg:grid-cols-2">
          <div
            className={`rounded-2xl border border-[var(--dgp-line)] bg-white p-6 sm:p-8 ${gpShadow}`}
          >
            <h2 className="text-2xl font-bold tracking-tight">Opening times</h2>
            <table className="mt-4 w-full border-collapse text-base">
              <caption className="sr-only">
                Surgery opening times by day of the week
              </caption>
              <tbody>
                {openingTimes.map(([day, hours]) => (
                  <tr key={day} className="border-b border-[var(--dgp-line)]">
                    <th scope="row" className="py-2.5 pr-4 text-left font-semibold">
                      {day}
                    </th>
                    <td className="py-2.5 text-[var(--dgp-ink-soft)]">{hours}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-3 text-sm text-[var(--dgp-ink-soft)]">
              Phone lines open at 8:00am. The quietest time to call is after
              10:30am.
            </p>
          </div>
          <div
            className={`rounded-2xl border border-[var(--dgp-line)] bg-white p-6 sm:p-8 ${gpShadow}`}
          >
            <h2 className="text-2xl font-bold tracking-tight">Find us</h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--dgp-ink-soft)]">
              {practice.address}
            </p>
            <div className="mt-4">
              <GpMiniMap />
            </div>
            <p className="mt-3 text-sm leading-relaxed text-[var(--dgp-ink-soft)]">
              Step-free access from the main car park, a hearing loop at
              reception, and accessible toilets on the ground floor.{" "}
              <Link href="/demo/gp-practice/contact" className="text-[var(--dgp-blue)] underline">
                More about getting here
              </Link>
            </p>
          </div>
        </div>
      </GpSection>

      {/* News */}
      <div className="bg-[var(--dgp-tint)]">
        <GpSection>
          <h2 className="text-2xl font-bold tracking-tight">Practice news</h2>
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {news.map((item) => (
              <article
                key={item.title}
                className={`rounded-2xl border border-[var(--dgp-line)] bg-white p-6 ${gpShadow}`}
              >
                <time
                  dateTime={item.iso}
                  className="text-sm font-semibold text-[var(--dgp-blue-deep)]"
                >
                  {item.date}
                </time>
                <h3 className="mt-2 text-lg font-bold leading-snug">
                  {item.title}
                </h3>
                <p className="mt-2 text-base leading-relaxed text-[var(--dgp-ink-soft)]">
                  {item.copy}
                </p>
              </article>
            ))}
          </div>
        </GpSection>
      </div>

      {/* Wellbeing & self-help */}
      <GpSection>
        <h2 className="text-2xl font-bold tracking-tight">
          Take care of your own health
        </h2>
        <p className="mt-2 max-w-[680px] text-base leading-relaxed text-[var(--dgp-ink-soft)]">
          Trusted NHS information for checking symptoms, understanding
          medicines and staying well — plus services you can refer yourself
          to, no appointment needed.
        </p>
        <ul className="mt-6 grid gap-x-10 sm:grid-cols-2">
          {[
            ["Health A to Z", "Check symptoms and conditions", "https://www.nhs.uk/conditions/"],
            ["Medicines A to Z", "How your medicines work", "https://www.nhs.uk/medicines/"],
            ["Live Well", "Sleep, exercise, food and quitting smoking", "https://www.nhs.uk/live-well/"],
            ["Every Mind Matters", "Practical mental-health support", "https://www.nhs.uk/every-mind-matters/"],
          ].map(([title, copy, href]) => (
            <li key={title} className="border-b border-[var(--dgp-line)]">
              <a
                href={href}
                className="group flex items-center justify-between gap-4 py-4"
              >
                <span>
                  <span className="text-lg font-bold text-[var(--dgp-blue)] underline-offset-2 group-hover:underline">
                    {title}
                  </span>
                  <span className="mt-0.5 block text-base leading-relaxed text-[var(--dgp-ink-soft)]">
                    {copy}
                  </span>
                </span>
                <svg
                  aria-hidden
                  viewBox="0 0 24 24"
                  className="h-5 w-5 shrink-0 fill-none stroke-[var(--dgp-blue)] stroke-2 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
                </svg>
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-5 text-base leading-relaxed text-[var(--dgp-ink-soft)]">
          You can also{" "}
          <Link href="/demo/gp-practice/services" className="text-[var(--dgp-blue)] underline">
            refer yourself directly
          </Link>{" "}
          to talking therapies, sexual health, stop-smoking support and
          Pharmacy First — no GP appointment needed.
        </p>
      </GpSection>

      {/* Self-serve answers */}
      <GpSection pad="flush">
        <h2 className="text-2xl font-bold tracking-tight">How do I…?</h2>
        <div
          className={`mt-5 divide-y divide-[var(--dgp-line)] rounded-2xl border border-[var(--dgp-line)] bg-white ${gpShadow}`}
        >
          {faqs.map((faq) => (
            <details key={faq.q} className="group p-5 sm:px-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-[var(--dgp-blue)] underline-offset-2 hover:underline [&::-webkit-details-marker]:hidden">
                {faq.q}
                <span
                  aria-hidden
                  className="text-[20px] leading-none text-[var(--dgp-ink-soft)] transition-transform group-open:rotate-45 motion-reduce:transition-none"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-[680px] text-base leading-relaxed text-[var(--dgp-ink-soft)]">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </GpSection>
    </>
  );
}
