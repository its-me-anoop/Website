import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { serviceHref, services } from "@/lib/marketing/services";
import { Floor } from "../ui/Room";
import { Container, Eyebrow } from "../ui/primitives";
import { serviceTone } from "../ui/tones";

/**
 * The five services in the dark room: five rounded rows, each in its
 * service's colour, with its pillar typed beside the number. Pointing
 * at one (or tabbing to it) opens it; the whole row is the link to
 * that service's page. On touch screens every row is open. Pure CSS
 * (see `.idx` in globals.css). The room ends on a pink floor.
 */
export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="tone-navy relative isolate scroll-mt-20">
      <Container className="flex flex-col gap-12 pb-[clamp(56px,7vw,104px)] pt-[clamp(80px,10vw,152px)]">
        <div className="flex flex-wrap items-end justify-between gap-x-16 gap-y-6">
          <div>
            <Eyebrow>Services</Eyebrow>
            <h2 id="services-title" className="s-display mt-5 max-w-[900px] text-[clamp(2.6rem,6.4vw,6rem)]">
              Five things, done <em>properly.</em>
            </h2>
          </div>
          <p className="max-w-[400px] text-[18px] leading-[1.5] text-s-ink-soft">
            Pick one, or hand over the lot. Either way you deal with one studio that already knows how the pieces fit.
          </p>
        </div>

        <ul className="idx m-0 list-none p-0">
          {services.map((service, i) => (
            <li key={service.slug} className={`idx-item ${serviceTone[service.slug]} !bg-transparent`} style={{ "--i": i } as CSSProperties}>
              <Link href={serviceHref(service.slug)} className="idx-card">
                <span className="grid items-center gap-x-8 gap-y-2 px-5 py-5 sm:px-9 sm:py-6 md:grid-cols-[minmax(0,1fr)_auto]">
                  <span className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
                    <span aria-hidden className="s-mark s-num text-[clamp(1.5rem,2.6vw,2.4rem)]">
                      {i + 1}
                    </span>
                    <span className="s-display text-[clamp(2.1rem,5.2vw,4.6rem)]">{service.name}</span>
                    <span aria-hidden="true" className="idx-tab s-label text-[13px] text-s-ink-soft">
                      {service.pillar}
                    </span>
                  </span>
                  <span className="flex items-center justify-between gap-5">
                    <span className="s-label text-[13.5px] text-s-ink-soft">{service.tag}</span>
                    <span aria-hidden data-dot="into" className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-s-ink text-s-bg">
                      <ArrowRight className="idx-arrow" size={22} strokeWidth={2.4} />
                    </span>
                  </span>
                </span>
                <span className="idx-body">
                  <span className="block">
                    <span className="grid gap-x-12 gap-y-5 px-5 pb-7 pt-1 sm:px-9 sm:pb-9 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
                      <span className="s-say max-w-[600px] text-[clamp(19px,1.9vw,26px)]">{service.summary}</span>
                      <span aria-hidden="true" className="flex flex-wrap content-start gap-1.5">
                        {service.includes.map((item) => (
                          <span key={item.title} className="s-chip text-[14px] font-medium">
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
      <Floor colour="pink" />
    </section>
  );
}
