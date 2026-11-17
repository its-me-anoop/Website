import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import { auditChecks } from "@/lib/marketing/content";
import { auditMailto } from "@/lib/marketing/audit-links";
import { AuditEntry } from "../audit/AuditEntry";
import { Shell } from "../layout/Shell";
import "../conversion.css";

export function AuditLanding() {
  return (
    <Shell>
      <AuditEntry />
      <section className="cv-width cv-section cv-columns" aria-labelledby="audit-coverage">
        <div>
          <p className="cv-label">What gets checked</p>
          <h2 className="cv-heading" id="audit-coverage">Seven areas of your website.</h2>
          <p className="cv-body">The checks help visitors find what they need and take the next step. Accessibility and clear content carry the most weight.</p>
        </div>
        <div className="cv-topics">
          {auditChecks.map((check) => (
            <details key={check.title}>
              <summary>{check.title}<Plus size={19} aria-hidden /></summary>
              <p>{check.copy}</p>
            </details>
          ))}
        </div>
      </section>
      <section className="cv-secondary" aria-labelledby="audit-method">
        <div className="cv-width cv-section">
          <p className="cv-label">Reading your results</p>
          <h2 id="audit-method" className="cv-heading">Two ways to look at your site.</h2>
          <div className="cv-methods">
            <article>
              <h3>The instant report</h3>
              <p>Flutterly’s server reads your page and its response headers. Around sixty checks are scored across seven areas. The results stay in a temporary cache for about ten minutes.</p>
              <p>General checks for any website, with extra content checks for GP, care home, dental, pharmacy and physio sites.</p>
              <a href="#main" className="cv-inline-link">Run the audit <ArrowUpRight size={16} aria-hidden /></a>
            </article>
            <article>
              <h3>A second pair of eyes</h3>
              <p>Anoop can follow the journeys your visitors take on real devices, review the design and copy, and send you his findings. The written review is free and usually takes a week.</p>
              <p>For healthcare websites, the written review can also consider relevant NHS and CQC guidance.</p>
              <a href={auditMailto()} className="cv-inline-link">Request a written review <ArrowUpRight size={16} aria-hidden /></a>
            </article>
          </div>
        </div>
      </section>
      <div className="cv-width cv-endnote" id="contact">
        <span>Want help making the fixes?</span>
        <Link className="cv-inline-link" href="/packages">Explore the packages <ArrowUpRight size={16} aria-hidden /></Link>
      </div>
    </Shell>
  );
}
