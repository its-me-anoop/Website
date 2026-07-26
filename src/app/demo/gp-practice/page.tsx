import Image from "next/image";
import Link from "next/link";
import {
  GpCallout,
  GpCard,
  GpMiniMap,
  GpPrimaryCard,
  GpSection,
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
      {/* Practice welcome */}
      <div className="border-b border-[var(--dgp-line)] bg-[var(--dgp-tint)]">
        <div className="mx-auto grid w-full max-w-[1100px] items-center gap-8 px-4 py-8 sm:px-6 sm:py-12 lg:grid-cols-[1fr_400px]">
          <div>
            <h1 className="max-w-[760px] text-[clamp(1.9rem,4.8vw,2.8rem)] font-bold leading-tight tracking-tight">
              What do you need to do today?
            </h1>
            <p className="mt-3 max-w-[560px] text-lg leading-relaxed text-[var(--dgp-ink-soft)]">
              Book appointments, order prescriptions and get advice right
              here, without waiting on the phone.
            </p>
          </div>
          {/* No `priority`: the image is display:none below lg, and the
              unconditional preload would cost phones ~170KB for nothing. */}
          <Image
            src="/demos/gp/gp-hero.jpg"
            alt="The bright reception area at Willowbrook Surgery, with patients checking in at the front desk"
            width={800}
            height={534}
            className="hidden rounded-md object-cover shadow-[0_2px_0_var(--dgp-line)] lg:block"
          />
        </div>
      </div>

      <GpSection className="pt-8">
        <GpCallout title={alert.title}>{alert.copy}</GpCallout>

        <h2 className="sr-only">Common tasks</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
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
      <div className="bg-[var(--dgp-blue)] text-white">
        <div className="mx-auto grid w-full max-w-[1100px] gap-6 px-4 py-8 sm:grid-cols-2 sm:px-6">
          <div>
            <h2 className="text-[20px] font-bold">Need help right now?</h2>
            <p className="mt-2 max-w-[440px] text-base leading-relaxed text-white/85">
              If the surgery is closed, NHS 111 can help day and night — online
              or by phone. In a life-threatening emergency, call 999.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 sm:justify-end">
            <a
              href="https://111.nhs.uk/"
              className="rounded-md bg-white px-6 py-3 text-base font-semibold text-[var(--dgp-blue)] hover:bg-[var(--dgp-tint)]"
            >
              Get help from NHS 111
            </a>
            <a
              href="tel:999"
              className="rounded-md border-2 border-white px-6 py-3 text-base font-semibold text-white hover:bg-white/10"
            >
              Emergency: 999
            </a>
          </div>
        </div>
      </div>

      {/* Opening times + find us */}
      <GpSection pad="spacious">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
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
          <div>
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
          <div className="mt-2 divide-y divide-[var(--dgp-line)]">
            {news.map((item) => (
              <article
                key={item.title}
                className="grid gap-1 py-5 sm:grid-cols-[150px_1fr] sm:gap-6"
              >
                <time
                  dateTime={item.iso}
                  className="pt-0.5 text-sm font-semibold text-[var(--dgp-ink-soft)]"
                >
                  {item.date}
                </time>
                <div>
                  <h3 className="text-lg font-bold">{item.title}</h3>
                  <p className="mt-1 max-w-[640px] text-base leading-relaxed text-[var(--dgp-ink-soft)]">
                    {item.copy}
                  </p>
                </div>
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
        <div className="mt-5 divide-y divide-[var(--dgp-line)] rounded-md border border-[var(--dgp-line)] bg-white">
          {faqs.map((faq) => (
            <details key={faq.q} className="group p-5">
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
