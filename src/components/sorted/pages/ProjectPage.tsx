import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { caseStudies, type CaseStudy } from "@/lib/marketing/case-studies";
import { CtaBand } from "../layout/CtaBand";
import { Shell } from "../layout/Shell";
import "../portfolio.css";

export function ProjectPage({ study }: { study: CaseStudy }) {
  const others = caseStudies.filter((project) => project.slug !== study.slug);
  return (
    <Shell>
      <article className="case-file">
        <div className="folio-wrap">
          <header className="case-head">
            <Link href="/#work" className="case-back"><ArrowLeft aria-hidden size={16} /> All work</Link>
            <div className="case-lead">
              <div>
                <p className="folio-kicker">{study.eyebrow}</p>
                <h1>{study.name}</h1>
                <p className="case-strap">{[study.heading.lead, study.heading.emphasis, study.heading.trail].filter(Boolean).join(" ")}</p>
                <p className="case-intro">{study.intro}</p>
                <Link className="case-book" href="/book">Book a call <ArrowUpRight aria-hidden size={17} /></Link>
              </div>
              <div className={`case-mark case-mark--${study.slug}`}>
                <Image src={study.mark.src} alt={study.mark.alt} width={study.mark.width} height={study.mark.height}
                  priority unoptimized={study.mark.src.endsWith(".svg")} sizes="(min-width: 800px) 46vw, 90vw" />
              </div>
            </div>
          </header>
          <section className="case-status" aria-labelledby="case-status-title">
            <div>
              <h2 id="case-status-title" className="case-section-title">Project notes</h2>
              <p>{study.status}</p>
            </div>
            <dl>
              {study.facts.map(([term, description]) => (
                <div key={term}><dt>{term}</dt><dd>{description}</dd></div>
              ))}
            </dl>
          </section>
          <section className="case-capabilities" aria-labelledby="case-features-title">
            <h2 id="case-features-title" className="case-section-title">Inside {study.name}</h2>
            <ul>
              {study.features.map((feature) => (
                <li key={feature.title}><h3>{feature.title}</h3><p>{feature.copy}</p></li>
              ))}
            </ul>
          </section>
        </div>
        {study.shots.length > 0 && (
          <section className="case-gallery" aria-labelledby="case-gallery-title">
            <div className="folio-wrap">
              <p className="folio-kicker">Screen gallery</p>
              <h2 id="case-gallery-title" className="case-section-title">{study.shotsTitle}</h2>
              <p className="case-gallery-note">{study.shotsNote}</p>
              <div className="case-shots">
                {study.shots.map((shot) => (
                  <figure key={shot.src} data-frame={shot.frame}>
                    <div><Image src={shot.src} alt={shot.alt} width={shot.width} height={shot.height}
                      sizes={shot.frame === "browser" ? "(min-width: 1024px) 850px, 90vw" : "(min-width: 760px) 22vw, 46vw"} /></div>
                    <figcaption>{shot.caption}</figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </section>
        )}
        <nav className="case-next folio-wrap" aria-label="More work">
          <h2 className="case-section-title">More from the studio</h2>
          <div>
            {others.map((project) => (
              <Link href={`/projects/${project.slug}`} key={project.slug}>
                <span><small>{project.eyebrow}</small>{project.name}</span><ArrowRight size={22} aria-hidden />
              </Link>
            ))}
          </div>
        </nav>
      </article>
      <CtaBand id="contact" title="Have a project in mind?" copy="Tell Anoop what you want to build. You’ll get a written plan and a price before work starts." audit="link" />
    </Shell>
  );
}
