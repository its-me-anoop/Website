import { processSteps } from "@/lib/marketing/content";
import { Container, SectionHead } from "../ui/Type";

/**
 * The process as a line on a transit map: four stops on a yellow line
 * that fills as it scrolls into view (CSS scroll-driven, where
 * supported; otherwise it is simply drawn). The line runs on past the
 * last stop, because support carries on after launch.
 */
export function Route() {
  return (
    <section id="process" className="wf-on-ink scroll-mt-20 bg-wf-ink py-20 text-wf-on-ink sm:py-28">
      <Container>
        <SectionHead
          kicker="Process"
          title={
            <>
              From first call to launch, <mark className="wf-mark">in four stops.</mark>
            </>
          }
          copy="Working pages early, small reviewable slices, and accessibility checked all the way through rather than bolted on at the end."
        />
        <ol className="relative mt-16 grid gap-12 pl-14 md:grid-cols-4 md:gap-8 md:pl-0 md:pt-16">
          {/* The track and its fill: vertical on phones, horizontal from md. */}
          <span
            aria-hidden="true"
            className="absolute bottom-0 left-[15px] top-2 w-[6px] rounded-full bg-wf-on-ink/15 md:left-4 md:right-0 md:top-[15px] md:h-[6px] md:w-auto"
          />
          <span
            aria-hidden="true"
            className="wf-route-fill absolute bottom-0 left-[15px] top-2 w-[6px] rounded-full bg-wf-sign md:left-4 md:right-0 md:top-[15px] md:h-[6px] md:w-auto"
          />
          {processSteps.map(([title, copy], i) => (
            <li key={title} className="relative">
              <span
                aria-hidden="true"
                className="absolute -left-14 top-0 flex h-9 w-9 items-center justify-center rounded-full border-[5px] border-wf-sign bg-wf-ink md:-top-16 md:left-0"
              />
              <p className="wf-label text-wf-sign">Stop {i + 1}</p>
              <h3 className="mt-2 text-[clamp(1.9rem,3vw,2.6rem)] font-extrabold tracking-[-0.03em]">{title}</h3>
              <p className="mt-3 max-w-[40ch] text-[16.5px] leading-[1.6] text-wf-on-ink-soft">{copy}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
