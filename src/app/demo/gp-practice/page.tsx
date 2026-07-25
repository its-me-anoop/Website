import Image from "next/image";
import Link from "next/link";
import {
  GpCallout,
  GpCard,
  GpMiniMap,
  GpSection,
  gpShadow,
} from "@/components/demos/gp/GpShell";
import {
  alert,
  cqc,
  digitalTools,
  faqs,
  moreTasks,
  news,
  openingTimes,
  practice,
  primaryTasks,
  waysIn,
} from "@/components/demos/gp/data";

/* The three ways in are the page's real content, so they lead. Each
   one carries the same weight: an online request, a phone call and a
   visit to the desk all reach the same clinical queue, and saying so
   plainly is what stops the 8am scramble. */
const wayIcons: Record<string, React.ReactNode> = {
  online: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 5h16v11H8l-4 4V5Zm4 4h8m-8 3h5"
    />
  ),
  phone: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 5c0 8.3 6.7 15 15 15l2-4-4.5-2-2 2c-2.8-1.4-5.1-3.7-6.5-6.5l2-2L8 3 4 5Z"
    />
  ),
  "in-person": (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 21V9l9-6 9 6v12M9 21v-6h6v6"
    />
  ),
};

export default function GpDemoHome() {
  return (
    <>
      {/* Practice welcome */}
      <div className="border-b border-[var(--dgp-sky-line)] bg-[var(--dgp-sky)]">
        <div className="mx-auto grid w-full max-w-[1100px] items-center gap-8 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-[1fr_420px] lg:gap-12">
          <div>
            <h1 className="max-w-[760px] text-[clamp(1.9rem,4.8vw,2.8rem)] font-bold leading-tight tracking-tight">
              What do you need to do today?
            </h1>
            <p className="mt-3 max-w-[560px] text-lg leading-relaxed text-[var(--dgp-ink-soft)]">
              Ask us for help online any time between 8:00am and 6:30pm — or
              call, or come in. Whichever you choose, a GP reads it and decides
              what happens next.
            </p>
            <p className="mt-4 flex flex-wrap items-center gap-2 text-base text-[var(--dgp-ink-soft)]">
              <span className="rounded-full bg-[var(--dgp-green)] px-3 py-1 text-sm font-bold text-white">
                CQC: {cqc.rating}
              </span>
              <span>{cqc.date}</span>
            </p>
          </div>
          <div className="relative">
            <Image
              src="/demos/gp/gp-hero.jpg"
              alt="The bright reception area at Willowbrook Surgery, with patients checking in at the front desk"
              width={800}
              height={534}
              sizes="(min-width: 1024px) 420px, 100vw"
              className={`rounded-[var(--dgp-radius-lg)] object-cover ${gpShadow}`}
            />
            <p
              className={`absolute bottom-4 left-4 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[var(--dgp-ink)] ${gpShadow}`}
            >
              Open 8:00am – 6:30pm, Monday to Friday
            </p>
          </div>
        </div>
      </div>

      {/* The three front doors */}
      <GpSection className="pt-8">
        <h2 className="text-2xl font-bold tracking-tight">
          Three ways to reach us
        </h2>
        <p className="mt-2 max-w-[70ch] text-base leading-relaxed text-[var(--dgp-ink-soft)]">
          They all end up in the same place. Pick whichever suits you — nobody
          is seen sooner for choosing one over another.
        </p>
        <ul className="mt-6 grid gap-4 lg:grid-cols-3">
          {waysIn.map((way) => {
            const external = way.href.startsWith("tel:");
            const Wrapper = external ? "a" : Link;
            return (
              <li key={way.id}>
                <div
                  className={`flex h-full flex-col rounded-[var(--dgp-radius-lg)] border border-[var(--dgp-line)] bg-white p-6 ${gpShadow}`}
                >
                  <svg
                    aria-hidden
                    viewBox="0 0 24 24"
                    className="h-9 w-9 shrink-0 fill-none stroke-[var(--dgp-blue)] stroke-[1.75]"
                  >
                    {wayIcons[way.id]}
                  </svg>
                  <h3 className="mt-4 text-lg font-bold">{way.title}</h3>
                  <p className="mt-1 text-sm font-semibold text-[var(--dgp-green-deep)]">
                    {way.lede}
                  </p>
                  <p className="mt-2.5 text-base leading-relaxed text-[var(--dgp-ink-soft)]">
                    {way.copy}
                  </p>
                  <p className="mt-3 text-base leading-relaxed text-[var(--dgp-ink-soft)]">
                    <strong className="font-semibold text-[var(--dgp-ink)]">
                      Best for:
                    </strong>{" "}
                    {way.best}
                  </p>
                  <p className="mt-auto pt-5">
                    <Wrapper
                      href={way.href}
                      className="inline-flex items-center gap-2 text-base font-bold text-[var(--dgp-blue)] underline underline-offset-2"
                    >
                      {way.action}
                      <svg
                        aria-hidden
                        viewBox="0 0 24 24"
                        className="h-4 w-4 shrink-0 fill-none stroke-current stroke-[2.5]"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
                      </svg>
                    </Wrapper>
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </GpSection>

      <GpSection pad="flush">
        <GpCallout title={alert.title}>{alert.copy}</GpCallout>

        <h2 className="mt-10 text-2xl font-bold tracking-tight">
          Everyday tasks
        </h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[...primaryTasks, ...moreTasks].map((task) => (
            <GpCard key={task.title} {...task} />
          ))}
        </div>
      </GpSection>

      {/* Urgent help */}
      <GpSection pad="flush">
        <div className="rounded-[var(--dgp-radius-lg)] bg-[var(--dgp-blue)] text-white">
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

      {/* What the practice runs on */}
      <GpSection>
        <h2 className="text-2xl font-bold tracking-tight">
          Do more without ringing us
        </h2>
        <p className="mt-2 max-w-[70ch] text-base leading-relaxed text-[var(--dgp-ink-soft)]">
          Most of what people phone about can be done online in a couple of
          minutes — and if a text arrives from the surgery with a link in it,
          these are the systems it comes from.
        </p>
        <ul className="mt-6 grid gap-x-8 gap-y-1 sm:grid-cols-2">
          {digitalTools.map((tool) => (
            <li key={tool.name} className="border-b border-[var(--dgp-line)]">
              {tool.external ? (
                <a href={tool.href} className="group flex items-center justify-between gap-4 py-4">
                  <span>
                    <span className="text-lg font-bold text-[var(--dgp-blue)] underline-offset-2 group-hover:underline">
                      {tool.name}
                    </span>
                    <span className="mt-0.5 block text-base leading-relaxed text-[var(--dgp-ink-soft)]">
                      {tool.role}
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
              ) : (
                <Link href={tool.href} className="group flex items-center justify-between gap-4 py-4">
                  <span>
                    <span className="text-lg font-bold text-[var(--dgp-blue)] underline-offset-2 group-hover:underline">
                      {tool.name}
                    </span>
                    <span className="mt-0.5 block text-base leading-relaxed text-[var(--dgp-ink-soft)]">
                      {tool.role}
                    </span>
                  </span>
                  <svg
                    aria-hidden
                    viewBox="0 0 24 24"
                    className="h-5 w-5 shrink-0 fill-none stroke-[var(--dgp-blue)] stroke-2 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
                  </svg>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </GpSection>

      {/* Opening times + find us */}
      <div className="bg-[var(--dgp-tint)]">
        <GpSection pad="spacious">
          <div className="grid gap-6 lg:grid-cols-2">
            <div
              className={`rounded-[var(--dgp-radius-lg)] border border-[var(--dgp-line)] bg-white p-6 sm:p-8 ${gpShadow}`}
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
                Online requests are open the whole time we are — you do not
                have to ring at 8:00am to be seen today.
              </p>
            </div>
            <div
              className={`rounded-[var(--dgp-radius-lg)] border border-[var(--dgp-line)] bg-white p-6 sm:p-8 ${gpShadow}`}
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
      </div>

      {/* News */}
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

      {/* Wellbeing & self-help */}
      <div className="bg-[var(--dgp-tint)]">
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
      </div>

      {/* Self-serve answers */}
      <GpSection>
        <h2 className="text-2xl font-bold tracking-tight">How do I…?</h2>
        <div
          className={`mt-5 divide-y divide-[var(--dgp-line)] rounded-[var(--dgp-radius-lg)] border border-[var(--dgp-line)] bg-white ${gpShadow}`}
        >
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
