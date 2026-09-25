import { Reveal } from "../motion/Reveal";
import { Container, Kicker } from "../ui/Type";

const principles = [
  {
    title: "Questions first",
    copy: "Every build starts with the handful of things people phone about. Those get the first screen; everything else comes after.",
  },
  {
    title: "Plain English",
    copy: "Short sentences and page names people would use themselves, so nobody has to translate the website before they can use it.",
  },
  {
    title: "Readable by everyone",
    copy: "WCAG 2.2 AA from the first sketch: contrast, keyboard use, screen readers and large text, tested before launch rather than after a complaint.",
  },
] as const;

/**
 * The studio's thesis in one sentence, on an ink board, with the three
 * working principles that follow from it.
 */
export function Statement() {
  return (
    <section aria-labelledby="thesis" className="wf-on-ink bg-wf-ink py-20 text-wf-on-ink sm:py-28">
      <Container>
        <Kicker>Why it matters</Kicker>
        <h2
          id="thesis"
          className="wf-display mt-7 max-w-[19ch] text-[clamp(2.3rem,5.4vw,5rem)]"
        >
          Every question a website can&rsquo;t answer becomes <mark className="wf-mark">a phone call.</mark>
        </h2>
        <p className="wf-lead mt-7 max-w-[58ch] text-[18px] leading-[1.6] sm:text-[20px]">
          Or an email, or a wasted trip, or a family choosing somewhere else. So a Flutterly website is planned
          around the questions people arrive with, not around the homepage.
        </p>
        <ol className="mt-14 grid gap-8 border-t border-wf-on-ink-line pt-10 md:grid-cols-3 md:gap-10">
          {principles.map((p, i) => (
            <Reveal as="li" key={p.title} delay={i * 80}>
              <p className="wf-label text-wf-sign">0{i + 1}</p>
              <h3 className="mt-3 text-[24px] font-extrabold tracking-[-0.02em]">{p.title}</h3>
              <p className="mt-3 text-[16.5px] leading-[1.6] text-wf-on-ink-soft">{p.copy}</p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
