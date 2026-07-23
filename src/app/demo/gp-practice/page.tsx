import Link from "next/link";
import {
  GpCallout,
  GpCard,
  GpSection,
} from "@/components/demos/gp/GpShell";
import {
  alert,
  faqs,
  news,
  openingTimes,
  practice,
  tasks,
} from "@/components/demos/gp/data";

export default function GpDemoHome() {
  return (
    <>
      {/* Practice welcome */}
      <div className="border-b border-[var(--dgp-line)] bg-[var(--dgp-tint)]">
        <div className="mx-auto w-full max-w-[1100px] px-4 py-8 sm:px-6 sm:py-12">
          <h1 className="max-w-[760px] text-[clamp(1.9rem,4.8vw,2.8rem)] font-bold leading-tight tracking-tight">
            What do you need to do today?
          </h1>
          <p className="mt-3 max-w-[640px] text-[17px] leading-relaxed text-[var(--dgp-ink-soft)]">
            Most requests can be handled right here, without waiting on the
            phone. If you are not sure where to start, call us on{" "}
            <a href={practice.phoneHref} className="font-semibold text-[var(--dgp-blue)] underline">
              {practice.phone}
            </a>
            .
          </p>
        </div>
      </div>

      <GpSection className="pt-8">
        <GpCallout title={alert.title}>{alert.copy}</GpCallout>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tasks.map((task) => (
            <GpCard key={task.title} {...task} />
          ))}
        </div>
      </GpSection>

      {/* Urgent help */}
      <div className="bg-[var(--dgp-blue)] text-white">
        <div className="mx-auto grid w-full max-w-[1100px] gap-6 px-4 py-8 sm:grid-cols-2 sm:px-6">
          <div>
            <h2 className="text-[20px] font-bold">Need help right now?</h2>
            <p className="mt-2 max-w-[440px] text-[15px] leading-relaxed text-white/85">
              If the surgery is closed, NHS 111 can help day and night — online
              or by phone. In a life-threatening emergency, call 999.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 sm:justify-end">
            <a
              href="https://111.nhs.uk/"
              className="rounded-md bg-white px-6 py-3 text-[16px] font-semibold text-[var(--dgp-blue)] hover:bg-[var(--dgp-tint)]"
            >
              Get help from NHS 111
            </a>
            <a
              href="tel:999"
              className="rounded-md border-2 border-white px-6 py-3 text-[16px] font-semibold text-white hover:bg-white/10"
            >
              Emergency: 999
            </a>
          </div>
        </div>
      </div>

      {/* Opening times + contact */}
      <GpSection>
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-[22px] font-bold tracking-tight">
              Opening times
            </h2>
            <table className="mt-4 w-full border-collapse text-[15px]">
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
            <p className="mt-3 text-[14px] text-[var(--dgp-ink-soft)]">
              Phone lines open at 8:00am. The quietest time to call is after
              10:30am.
            </p>
          </div>
          <div>
            <h2 className="text-[22px] font-bold tracking-tight">Find us</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-[var(--dgp-ink-soft)]">
              {practice.address}
            </p>
            <div className="mt-4 flex h-[180px] items-center justify-center rounded-md border border-[var(--dgp-line)] bg-[var(--dgp-tint)] text-[14px] text-[var(--dgp-ink-soft)]">
              Map placeholder — sample site
            </div>
            <p className="mt-3 text-[14px] leading-relaxed text-[var(--dgp-ink-soft)]">
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
          <h2 className="text-[22px] font-bold tracking-tight">
            Practice news
          </h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {news.map((item) => (
              <article
                key={item.title}
                className="rounded-md border border-[var(--dgp-line)] bg-white p-5"
              >
                <p className="text-[13px] font-semibold uppercase tracking-wide text-[var(--dgp-ink-soft)]">
                  {item.date}
                </p>
                <h3 className="mt-1.5 text-[16.5px] font-bold">{item.title}</h3>
                <p className="mt-1.5 text-[14.5px] leading-relaxed text-[var(--dgp-ink-soft)]">
                  {item.copy}
                </p>
              </article>
            ))}
          </div>
        </GpSection>
      </div>

      {/* Self-serve answers */}
      <GpSection>
        <h2 className="text-[22px] font-bold tracking-tight">How do I…?</h2>
        <div className="mt-5 divide-y divide-[var(--dgp-line)] rounded-md border border-[var(--dgp-line)] bg-white">
          {faqs.map((faq) => (
            <details key={faq.q} className="group p-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[16px] font-semibold text-[var(--dgp-blue)] underline-offset-2 hover:underline [&::-webkit-details-marker]:hidden">
                {faq.q}
                <span
                  aria-hidden
                  className="text-[20px] leading-none text-[var(--dgp-ink-soft)] transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-[680px] text-[15px] leading-relaxed text-[var(--dgp-ink-soft)]">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </GpSection>
    </>
  );
}
