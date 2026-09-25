import Image from "next/image";
import { site } from "@/lib/site";
import { Reveal } from "../motion/Reveal";
import { ButtonLink } from "../ui/Button";
import { Container, Heading, Kicker } from "../ui/Type";

/**
 * The studio statement beside the founder's portrait, framed like the
 * name board on a ward: who you will actually be dealing with.
 */
export function About() {
  return (
    <section id="about" className="scroll-mt-20 border-y-2 border-wf-ink bg-wf-paper-2 py-20 sm:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-[minmax(0,420px)_1fr] lg:gap-20">
        <Reveal className="mx-auto w-full max-w-[400px] lg:mx-0 lg:max-w-none">
          <figure className="overflow-hidden rounded-[10px] border-2 border-wf-ink bg-wf-card">
            <p className="wf-label flex items-center justify-between bg-wf-ink px-5 py-3 text-wf-on-ink">
              <span>Who you&rsquo;ll deal with</span>
              <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-wf-sign" />
            </p>
            <div className="relative aspect-[4/5]">
              <Image
                src="/anoop-jose.jpg"
                alt={`${site.founder}, founder of Flutterly, at the studio in Reading`}
                fill
                sizes="(min-width: 1024px) 420px, 92vw"
                className="object-cover"
              />
            </div>
            <figcaption className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-t-2 border-wf-ink px-5 py-4">
              <span className="text-[20px] font-extrabold tracking-[-0.02em]">{site.founder}</span>
              <span className="wf-label text-wf-ink-soft">Design · Build · Support</span>
            </figcaption>
          </figure>
        </Reveal>

        <div>
          <Kicker>About the studio</Kicker>
          <Heading size="xl" className="mt-7 max-w-[14ch]">
            The person you brief is the person who <mark className="wf-mark">builds.</mark>
          </Heading>
          <div className="mt-8 max-w-[60ch] space-y-5 text-[18px] leading-[1.65] text-wf-ink-soft">
            <p>
              Flutterly is the independent studio of {site.founder}, a designer and engineer in Reading. There are no
              account managers, no hand-offs and no outsourcing. Every website and app is designed, built and supported
              by the same person.
            </p>
            <p>
              That matters most in healthcare, where the website is often the first way a patient or a family reaches
              you, and sometimes the only one. It has to work for everyone, on any phone, every time.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href={`mailto:${site.email}`}>Email the studio</ButtonLink>
            <ButtonLink href={site.social.linkedin} tone="outline" external arrow="up-right">
              LinkedIn
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
