"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { serviceHref, services, type Service } from "@/lib/marketing/services";
import { Shell } from "../layout/Shell";
import { PageHero } from "../layout/PageHero";
import { CtaBand } from "../layout/CtaBand";
import { ButtonLink, CheckItem, Container, FaqList } from "../ui/primitives";
import { Showcase } from "./Showcase";

/**
 * One service page, rendered entirely from its `Service` entry: the
 * hero, what is included, who it suits and the questions people ask,
 * the related proof, then the other four services and the close. The
 * websites page also carries the five sample sites.
 */
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
        <div className="flex flex-wrap items-center justify-center gap-3">
          <ButtonLink href="/book" size="lg" arrow="right" magnetic>
            Book a call
          </ButtonLink>
          {service.slug === "websites" ? (
            <ButtonLink href="#samples" tone="outline" size="lg">
              See the sample sites
            </ButtonLink>
          ) : null}
        </div>
      </PageHero>

      <section
        aria-labelledby="included-title"
        className="a-paper fx-grid bg-a-paper py-[clamp(80px,9vw,140px)] text-a-paper-ink"
      >
        <Container className="flex flex-col gap-12">
          <h2
            id="included-title"
            className="fx-wt a-display max-w-[820px] text-[clamp(2.4rem,5vw,4.5rem)] leading-[0.96] text-a-ink"
            data-wf="H2 · Display 72 / 96"
          >
            What&apos;s <em>included.</em>
          </h2>
          <ol className="m-0 list-none border-t border-a-paper-line-2 p-0">
            {service.includes.map((item, i) => (
              <li
                key={item.title}
                className="grid gap-x-12 gap-y-2 border-b border-a-paper-line-2 px-1 py-7 md:grid-cols-[3rem_minmax(0,1fr)_minmax(0,1.4fr)]"
              >
                <span aria-hidden className="a-mono pt-2 text-[12px] text-a-ink-soft">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="fx-wt a-display text-[clamp(1.6rem,2.6vw,2.25rem)] tracking-[-0.03em] text-a-ink">
                  {item.title}
                </h3>
                <p className="fx-wp text-[17px] leading-[1.6] text-a-ink-soft">{item.copy}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {service.slug === "websites" ? <Showcase /> : null}

      <section aria-labelledby="fit-title" className="fx-grid bg-a-void py-[clamp(80px,9vw,140px)]">
        <Container className="grid gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <div className="flex flex-col gap-8">
            <h2
              id="fit-title"
              className="fx-wt a-display text-[clamp(2.2rem,4.4vw,3.75rem)] leading-[0.98]"
              data-wf="H2 · Display 60 / 98"
            >
              Who it <em>suits.</em>
            </h2>
            <ul className="m-0 grid list-none gap-3 p-0">
              {service.goodFor.map((line) => (
                <CheckItem key={line}>{line}</CheckItem>
              ))}
            </ul>
            <div className="flex flex-col gap-1 border-t border-a-line pt-6">
              <p className="a-mono text-[11px] uppercase tracking-[0.12em] text-a-muted">See also</p>
              <ul className="m-0 list-none p-0">
                {service.related.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="fx-ul inline-flex min-h-11 items-center gap-2 text-[16px] text-a-ink"
                    >
                      {link.label}
                      <ArrowRight size={15} aria-hidden className="text-a-amber" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <h2 className="a-mono text-[11px] font-medium uppercase tracking-[0.12em] text-a-muted">
              Questions people ask
            </h2>
            <FaqList items={service.faqs} />
          </div>
        </Container>
      </section>

      <nav aria-label="Other services" className="a-paper bg-a-paper text-a-paper-ink">
        <Container>
          <ul className="m-0 grid list-none border-t border-a-paper-line-2 p-0 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((s) => (
              <li key={s.slug} className="fx-row border-b border-a-paper-line-2 lg:border-b-0">
                <div className="fx-row-fill" aria-hidden="true" />
                <Link
                  href={serviceHref(s.slug)}
                  data-cursor={s.cursorLabel}
                  className="flex min-h-[120px] flex-col justify-between gap-4 px-4 py-6 text-a-ink"
                >
                  <span className="fx-row-ink a-mono text-[11px] uppercase tracking-[0.12em] text-a-ink-soft">
                    {s.pillar}
                  </span>
                  <span className="fx-row-ink a-display flex items-center justify-between gap-3 text-[28px] tracking-[-0.03em]">
                    {s.name}
                    <ArrowRight className="fx-row-arrow shrink-0" size={22} strokeWidth={1.6} aria-hidden />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </nav>

      <CtaBand
        id="contact"
        title={
          <>
            Tell me what needs <em>sorting.</em>
          </>
        }
        copy={`A short call about your ${/^[A-Z]{2}/.test(service.name) ? service.name : service.name.toLowerCase()} is the quickest way to a written plan and a price. Or start with a free audit of the website you have today.`}
      />
    </Shell>
  );
}
