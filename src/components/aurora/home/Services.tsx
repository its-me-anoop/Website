import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { serviceHref, services } from "@/lib/marketing/services";
import { Container } from "../ui/primitives";

/**
 * The five services as large rows on paper. Hovering or focusing a row
 * floods it with amber from the left and turns its arrow; each row opens
 * that service's page.
 */
export function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="a-paper fx-grid scroll-mt-24 bg-a-paper py-[clamp(88px,10vw,152px)] text-a-paper-ink"
    >
      <Container className="flex flex-col gap-16">
        <div className="flex flex-wrap items-end justify-between gap-x-16 gap-y-6">
          <h2
            id="services-title"
            className="fx-wt a-display max-w-[820px] text-[clamp(2.6rem,5.6vw,5.25rem)] leading-[0.95] text-a-ink"
            data-wf="H2 · Display 84 / 95"
          >
            Five things, done <em>properly.</em>
          </h2>
          <p className="fx-wp max-w-[380px] text-[17px] leading-[1.6] text-a-ink-soft">
            Pick one, or hand over the lot. Either way you deal with one studio that already knows how the pieces fit.
          </p>
        </div>

        <ul className="m-0 list-none border-t border-a-paper-line-2 p-0">
          {services.map((service) => (
            <li key={service.slug} className="fx-row border-b border-a-paper-line-2">
              <div className="fx-row-fill" aria-hidden="true" />
              <Link
                href={serviceHref(service.slug)}
                data-cursor={service.cursorLabel}
                className="grid items-baseline gap-x-12 gap-y-2.5 px-3 py-8 text-a-ink md:grid-cols-[minmax(0,1.05fr)_minmax(0,1.35fr)_minmax(0,0.7fr)]"
              >
                <span className="fx-wt fx-row-ink a-display text-[clamp(2.25rem,4.4vw,4rem)] leading-none tracking-[-0.035em]">
                  {service.name}
                </span>
                <span className="fx-wp fx-row-ink text-[17px] leading-[1.55] text-a-ink-soft">{service.summary}</span>
                <span className="fx-row-ink a-mono flex items-center justify-between gap-4 text-[12px] uppercase tracking-[0.1em] text-a-ink-soft">
                  <span>{service.tag}</span>
                  <ArrowRight className="fx-row-arrow shrink-0" size={26} strokeWidth={1.6} aria-hidden />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
