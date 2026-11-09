import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { serviceHref, services } from "@/lib/marketing/services";
import { Container, Eyebrow } from "../ui/primitives";
import { serviceTone } from "../ui/tones";

/**
 * The five services as a card index: five dividers standing in a
 * drawer, each in its service's colour with its pillar on the tab.
 * Pointing at one (or tabbing to it) stands it up and opens it; the
 * whole divider is the link to that service's page. On touch screens
 * every divider is open. Pure CSS (see `.idx` in globals.css).
 */
export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="tone-chalk s-dots scroll-mt-20 py-[clamp(72px,9vw,136px)]">
      <Container className="flex flex-col gap-10">
        <div className="flex flex-wrap items-end justify-between gap-x-16 gap-y-6">
          <div>
            <Eyebrow>Services</Eyebrow>
            <h2 id="services-title" className="s-display mt-5 max-w-[820px] text-[clamp(2.4rem,5.4vw,4.9rem)]">
              Five things, done <em>properly.</em>
            </h2>
          </div>
          <p className="max-w-[400px] text-[17.5px] leading-[1.55] text-s-ink-soft">
            Pick one, or hand over the lot. Either way you deal with one studio that already knows how the pieces fit.
          </p>
        </div>

        <ul className="idx m-0 list-none p-0">
          {services.map((service, i) => (
            <li key={service.slug} className={`idx-item ${serviceTone[service.slug]} !bg-transparent`} style={{ "--i": i } as CSSProperties}>
              <span aria-hidden="true" className="idx-tab s-label text-[12.5px]">
                {service.pillar}
              </span>
              <Link href={serviceHref(service.slug)} className="idx-card">
                <span className="grid items-center gap-x-8 gap-y-1 px-5 pb-5 pt-5 sm:px-8 sm:pt-6 md:grid-cols-[minmax(0,1fr)_auto]">
                  <span className="flex items-baseline gap-4">
                    <span aria-hidden className="s-label s-num text-[13px] text-s-muted">
                      0{i + 1}
                    </span>
                    <span className="s-display text-[clamp(2rem,4.6vw,4rem)]">{service.name}</span>
                  </span>
                  <span className="flex items-center justify-between gap-5">
                    <span className="s-label text-[13px] text-s-ink-soft">{service.tag}</span>
                    <span aria-hidden className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[9px] border-2 border-s-ink">
                      <ArrowRight className="idx-arrow" size={22} strokeWidth={2.4} />
                    </span>
                  </span>
                </span>
                <span className="idx-body">
                  <span className="block">
                    <span className="grid gap-x-12 gap-y-4 border-t-2 border-s-line px-5 pb-7 pt-5 sm:px-8 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
                      <span className="max-w-[560px] text-[clamp(17px,1.5vw,20px)] font-medium leading-[1.5]">{service.summary}</span>
                      <span aria-hidden="true" className="flex flex-wrap content-start gap-1.5">
                        {service.includes.map((item) => (
                          <span key={item.title} className="s-label rounded-[5px] border-[1.5px] border-s-line-2 px-2 py-1.5 text-[12px]">
                            {item.title}
                          </span>
                        ))}
                      </span>
                    </span>
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
