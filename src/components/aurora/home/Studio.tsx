import Image from "next/image";
import { site } from "@/lib/site";
import { WireframeMedia } from "../effects/Wireframe";
import { Container } from "../ui/primitives";

const facts = [
  ["Based in", `${site.address.addressLocality}, ${site.address.addressRegion}`],
  ["Builds with", "Next.js, Flutter, SwiftUI"],
  ["Works to", "WCAG 2.2 AA, test-driven"],
  ["Replies within", "One working day"],
] as const;

/**
 * The studio on paper: the founder's portrait building from a
 * head-and-shoulders wireframe, the one promise that matters, and four
 * plain facts.
 */
export function Studio() {
  return (
    <section
      id="studio"
      aria-labelledby="studio-title"
      className="a-paper fx-grid scroll-mt-24 bg-a-paper py-[clamp(88px,10vw,152px)] text-a-paper-ink"
    >
      <Container className="flex flex-wrap items-start gap-[clamp(40px,6vw,96px)]">
        <figure className="m-0 flex min-w-0 max-w-[520px] flex-[1_1_360px] flex-col gap-3">
          <WireframeMedia
            sketch="portrait"
            label="IMG · Portrait 4:5"
            className="aspect-[4/5] rounded-[18px] text-a-ink/35"
            surface="bg-a-paper-2"
          >
            <Image
              src="/anoop-jose.jpg"
              alt={`${site.founder}, founder of Flutterly, at the studio in Reading`}
              fill
              sizes="(min-width: 1024px) 520px, 92vw"
              className="fx-par object-cover"
            />
          </WireframeMedia>
          <figcaption className="fx-wp a-mono text-[11px] uppercase tracking-[0.12em] text-a-ink-soft">
            {site.founder} · Founder · {site.address.addressLocality}
          </figcaption>
        </figure>

        <div className="flex min-w-0 flex-[1_1_480px] flex-col gap-7 pt-10">
          <h2
            id="studio-title"
            className="fx-wt a-display text-[clamp(2.5rem,5vw,4.75rem)] leading-[0.96] text-a-ink"
            data-wf="H2 · Display 76 / 96"
          >
            The person you brief is the person who <em>builds.</em>
          </h2>
          <p className="fx-wp max-w-[560px] text-[19px] leading-[1.6] text-a-ink-soft">
            I&apos;m {site.founder.split(" ")[0]}. I design, code and look after every project myself, from the website
            and the app to the email, devices and search behind them. Nothing gets lost between a designer, a developer,
            an IT company and a marketing agency, because they are the same person.
          </p>
          <dl className="mt-2 grid grid-cols-[repeat(auto-fit,minmax(min(200px,100%),1fr))] gap-x-8">
            {facts.map(([label, value]) => (
              <div key={label} className="flex flex-col gap-1 border-t border-a-paper-line-2 py-3.5">
                <dt className="fx-wp a-mono text-[11px] uppercase tracking-[0.12em] text-a-ink-soft">{label}</dt>
                <dd className="fx-wp m-0 text-[17px] text-a-ink">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
