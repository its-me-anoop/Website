"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { pillars, serviceHref, servicesInPillar } from "@/lib/marketing/services";
import { Shell } from "../layout/Shell";
import { PageHero } from "../layout/PageHero";
import { CtaBand } from "../layout/CtaBand";
import { ButtonLink, Container } from "../ui/primitives";

export function ServicesIndexPage() {
  return (
    <Shell>
      <PageHero
        eyebrow="Studio services"
        title={<>Build&nbsp;it. Run&nbsp;it. <em>Grow&nbsp;it.</em></>}
        copy={<p>Websites, apps and the work that follows launch. Choose the help you need now and keep the same person on the project as it grows.</p>}
      >
        <ButtonLink href="/book" arrow="right">Book a call</ButtonLink>
      </PageHero>

      <div className="inner-directory tone-white">
        <Container>
          {pillars.map((pillar) => (
            <section key={pillar.name} aria-labelledby={`pillar-${pillar.name}`} className="inner-directory-group">
              <header>
                <h2 id={`pillar-${pillar.name}`} className="s-display">{pillar.name}</h2>
                <p>{pillar.line}</p>
              </header>
              <ul>
                {servicesInPillar(pillar.name).map((service) => (
                  <li key={service.slug}>
                    <Link href={serviceHref(service.slug)} className="inner-directory-link">
                      <div>
                        <h3 className="s-display">{service.name}</h3>
                        <p>{service.summary}</p>
                      </div>
                      <span className="inner-directory-arrow" aria-hidden><ArrowUpRight size={18}/></span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </Container>
      </div>
      <CtaBand id="contact" title={<>Where should we <em>start?</em></>} copy="A short call or a free audit of your current website will give you a written recommendation about what to do first." />
    </Shell>
  );
}
