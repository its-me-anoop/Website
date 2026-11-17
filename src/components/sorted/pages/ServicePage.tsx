"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { serviceHref, services, type Service } from "@/lib/marketing/services";
import { Reveal } from "../effects/Motion";
import { Shell } from "../layout/Shell";
import { PageHero } from "../layout/PageHero";
import { CtaBand } from "../layout/CtaBand";
import { ButtonLink, CheckItem, Container, Eyebrow, FaqList } from "../ui/primitives";
import { Showcase } from "./Showcase";

export function ServicePage({ service }: { service: Service }) {
  const { lead, emphasis, trail } = service.heading;
  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <Shell>
      <PageHero
        eyebrow={`${service.pillar} · ${service.name}`}
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
          <ul className="m-0 list-none border-t border-s-line-2 p-0">
            {service.includes.map((item, i) => (
              <Reveal
                as="li"
                key={item.title}
                turn={0}
                delay={i * 0.04}
                className="grid gap-x-12 gap-y-2 border-b border-s-line-2 py-7 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]"
              >
                <h3 className="s-display text-[clamp(1.5rem,2.4vw,2.1rem)]">{item.title}</h3>
                <p className="text-[17px] leading-[1.6] text-s-ink-soft">{item.copy}</p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {service.slug === "websites" ? <Showcase /> : null}

      <section aria-labelledby="fit-title" className="tone-chalk border-t border-s-line-2 py-[clamp(72px,9vw,128px)]">
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
            <div className="flex flex-col gap-1 border-t border-s-line-2 pt-5">
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

      <nav aria-label="Other services" className="inner-related tone-white">
        <ul className="m-0 grid list-none p-0 sm:grid-cols-2 lg:grid-cols-4">
          {others.map((s) => (
            <li key={s.slug}>
              <Link
                href={serviceHref(s.slug)}
                className="group"
              >
                <span className="s-display flex w-full items-center justify-between gap-3 text-[clamp(1.6rem,2.4vw,2.1rem)]">
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
