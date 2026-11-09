"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { serviceHref, services, type Service } from "@/lib/marketing/services";
import { Reveal } from "../effects/Motion";
import { Shell } from "../layout/Shell";
import { PageHero } from "../layout/PageHero";
import { CtaBand } from "../layout/CtaBand";
import { SlabStack, type SlabColour } from "../ui/SlabStack";
import { ButtonLink, CheckItem, Container, Eyebrow, FaqList } from "../ui/primitives";
import { serviceTone } from "../ui/tones";
import { Showcase } from "./Showcase";

/** The stack beside each hero ends on a white slab over the page's own colour. */
const stackFor: Record<Service["slug"], readonly SlabColour[]> = {
  websites: ["navy", "pink", "jade", "sun", "flame", "white"],
  apps: ["navy", "pink", "jade", "sun", "cobalt", "white"],
  "it-support": ["navy", "pink", "sun", "flame", "cobalt", "white"],
  "social-media": ["navy", "jade", "sun", "flame", "cobalt", "white"],
  seo: ["navy", "pink", "jade", "flame", "cobalt", "white"],
};

/**
 * One service page, rendered entirely from its `Service` entry. The
 * hero takes the service's own colour (the divider you opened on the
 * home page), then what is included, who it suits and the questions
 * people ask, the related proof, the other four services as their own
 * dividers, and the close. The websites page also carries the five
 * sample sites.
 */
export function ServicePage({ service }: { service: Service }) {
  const { lead, emphasis, trail } = service.heading;
  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <Shell>
      <PageHero
        eyebrow={`${service.pillar} · ${service.name}`}
        tone={serviceTone[service.slug]}
        art={<SlabStack order={stackFor[service.slug]} />}
        title={
          <>
            {lead} <em>{emphasis}</em>
            {trail ? ` ${trail}` : null}
          </>
        }
        copy={<p>{service.intro}</p>}
      >
        <div className="flex flex-wrap items-center gap-4">
          <ButtonLink href="/book" size="lg" arrow="right">
            Book a call
          </ButtonLink>
          {service.slug === "websites" ? (
            <ButtonLink href="#samples" tone="plain" size="lg">
              See the sample sites
            </ButtonLink>
          ) : null}
        </div>
      </PageHero>

      <section aria-labelledby="included-title" className="tone-white py-[clamp(72px,9vw,128px)]">
        <Container className="flex flex-col gap-10">
          <div>
            <Eyebrow>{service.name}</Eyebrow>
            <h2 id="included-title" className="s-display mt-5 max-w-[820px] text-[clamp(2.3rem,4.8vw,4.2rem)]">
              What&apos;s <em>included.</em>
            </h2>
          </div>
          <ol className="m-0 list-none border-t-2 border-s-navy p-0">
            {service.includes.map((item, i) => (
              <Reveal
                as="li"
                key={item.title}
                turn={0}
                delay={i * 0.04}
                className="grid gap-x-12 gap-y-2 border-b-[1.5px] border-s-line-2 py-7 md:grid-cols-[4rem_minmax(0,1fr)_minmax(0,1.4fr)]"
              >
                <span aria-hidden className="s-display s-num text-[30px] text-s-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="s-display text-[clamp(1.5rem,2.4vw,2.1rem)]">{item.title}</h3>
                <p className="text-[17px] leading-[1.6] text-s-ink-soft">{item.copy}</p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {service.slug === "websites" ? <Showcase /> : null}

      <section aria-labelledby="fit-title" className="tone-chalk s-dots border-t-2 border-s-navy py-[clamp(72px,9vw,128px)]">
        <Container className="grid gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <div className="flex flex-col gap-8">
            <h2 id="fit-title" className="s-display text-[clamp(2.1rem,4.2vw,3.5rem)]">
              Who it <em>suits.</em>
            </h2>
            <ul className="m-0 grid list-none gap-3.5 p-0">
              {service.goodFor.map((line) => (
                <CheckItem key={line}>{line}</CheckItem>
              ))}
            </ul>
            <div className="flex flex-col gap-1 border-t-2 border-s-navy pt-5">
              <p className="s-label text-[12.5px] text-s-muted">See also</p>
              <ul className="m-0 list-none p-0">
                {service.related.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="group inline-flex min-h-11 items-center gap-2 text-[16.5px] font-semibold text-s-ink">
                      <span className="s-ul">{link.label}</span>
                      <ArrowRight size={16} strokeWidth={2.6} aria-hidden className="text-s-accent transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <h2 className="s-label text-[13px] text-s-muted">Questions people ask</h2>
            <FaqList items={service.faqs} />
          </div>
        </Container>
      </section>

      <nav aria-label="Other services" className="border-t-2 border-s-navy">
        <ul className="m-0 grid list-none p-0 sm:grid-cols-2 lg:grid-cols-4">
          {others.map((s) => (
            <li key={s.slug}>
              <Link
                href={serviceHref(s.slug)}
                className={`${serviceTone[s.slug]} group flex min-h-[150px] flex-col justify-between gap-6 px-6 py-6 sm:px-8`}
              >
                <span className="s-label text-[12.5px] text-s-ink-soft">{s.pillar}</span>
                <span className="s-display flex items-center justify-between gap-3 text-[clamp(1.6rem,2.4vw,2.1rem)]">
                  {s.name}
                  <ArrowRight className="shrink-0 transition-transform duration-300 group-hover:translate-x-1.5" size={26} strokeWidth={2.4} aria-hidden />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <CtaBand
        id="contact"
        title={
          <>
            Tell me what needs <em>sorting.</em>
          </>
        }
        copy={service.nextStep.prompt}
        audit={service.nextStep.audit === "primary" ? "bar" : "link"}
      />
    </Shell>
  );
}
