"use client";

import { AuditBar } from "../ui/primitives";

export function AuditEntry({ compact = false }: { compact?: boolean }) {
  return (
    <section className="cv-intake">
      <div className="cv-width cv-intake-grid">
        <div>
          <p className="cv-label">Free website audit</p>
          <h1 className="cv-title">{compact ? "Check any website in seconds." : "How well does your website work?"}</h1>
          <p className="cv-lead">Get a prioritised list of fixes for your site, from slow pages to hard-to-find contact details.</p>
        </div>
        <div className="cv-entry-panel">
          <h2>Run an instant audit</h2>
          <p>Enter a public website address. You can read the results here and save a copy as a PDF.</p>
          <AuditBar placeholder="example.co.uk" autoFocus={compact} hint="Free to run. No email or account needed." />
        </div>
      </div>
    </section>
  );
}
