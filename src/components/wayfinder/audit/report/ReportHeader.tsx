"use client";

import { useState } from "react";
import { ArrowUpRight, FileDown, Link2 } from "lucide-react";
import { aSector } from "@/lib/audit/score";
import { sectors, type AuditReport } from "@/lib/audit/types";
import { displayUrl } from "@/lib/audit/url";
import { cn } from "@/lib/utils";
import { Tag } from "../../ui/Bits";
import { Heading, Kicker } from "../../ui/Type";
import { ScoreDial } from "./ScoreDial";

function kb(bytes: number) {
  return bytes >= 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.round(bytes / 1024)} KB`;
}

const sectorOptions: { value: (typeof sectors)[number]; label: string }[] = [
  { value: "gp-practice", label: "GP practice" },
  { value: "care-home", label: "Care home" },
  { value: "dental-practice", label: "Dental practice" },
  { value: "pharmacy", label: "Pharmacy" },
  { value: "physio-clinic", label: "Physiotherapy clinic" },
  { value: "other", label: "Other organisation" },
];

export function ReportHeader({ report, url }: { report: AuditReport; url: string }) {
  const { page } = report;
  const [copied, setCopied] = useState(false);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* Clipboard unavailable: the address bar still has the link. */
    }
  }

  const facts = [
    { label: "First byte", value: `${page.ttfbMs} ms` },
    { label: "HTML weight", value: kb(page.htmlBytes) },
    { label: "Words", value: page.wordCount.toLocaleString("en-GB") },
    { label: "Scripts", value: String(page.scriptCount) },
    { label: "Third parties", value: String(page.externalDomains.length) },
    { label: "Checks passed", value: `${report.totals.pass}/${report.totals.checks - report.totals.info}` },
  ];

  return (
    <header className="mx-auto w-full max-w-[1320px] px-4 sm:px-8">
      <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-start lg:gap-16">
        <div className="min-w-0">
          <Kicker>Instant website audit</Kicker>
          <Heading as="h1" size="lg" className="mt-6 break-words">
            {page.host}
          </Heading>
          <p className="mt-4 text-[16px] leading-[1.55] text-wf-ink-soft">
            {page.title ? <>&ldquo;{page.title}&rdquo; &middot; </> : null}
            <a
              href={page.finalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="wf-link inline-flex items-center gap-1 font-bold text-wf-ink"
            >
              {displayUrl(page.finalUrl)}
              <ArrowUpRight size={14} aria-hidden />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {page.platform ? <Tag>Built on {page.platform.name}</Tag> : null}
            {page.clientRendered ? <Tag tone="warn">Content drawn by JavaScript</Tag> : null}
            {page.crossSiteRedirect ? <Tag tone="fail">Redirected to another site</Tag> : null}
            {!page.https ? <Tag tone="fail">Not HTTPS</Tag> : null}
          </div>
          <p className="mt-7 max-w-[34ch] text-[21px] font-bold leading-[1.4] tracking-[-0.01em] sm:text-[24px]">
            {report.verdict}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-[15px]">
            <form action="/audit" method="get" className="flex items-center gap-2">
              <input type="hidden" name="url" value={url} />
              <label htmlFor="audit-sector" className="whitespace-nowrap text-wf-ink-soft">
                Checked as a
              </label>
              <select
                id="audit-sector"
                name="sector"
                defaultValue={report.sector}
                onChange={(e) => e.currentTarget.form?.requestSubmit()}
                className="rounded-[6px] border-2 border-wf-ink bg-white px-2.5 py-1.5 text-[15px] font-bold"
              >
                {sectorOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                    {o.value === report.detectedSector ? " (detected)" : ""}
                  </option>
                ))}
              </select>
              <noscript>
                <button type="submit" className="rounded-[6px] border-2 border-wf-ink px-3 py-1.5 font-bold">
                  Re-run
                </button>
              </noscript>
            </form>
            <button type="button" onClick={copyLink} className="wf-link inline-flex items-center gap-1.5 font-bold">
              <Link2 size={15} aria-hidden />
              {copied ? "Link copied" : "Copy report link"}
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              title="Opens your browser's print dialog. Choose “Save as PDF” as the destination for a designed, shareable report."
              className="wf-link inline-flex items-center gap-1.5 font-bold"
            >
              <FileDown size={15} aria-hidden />
              Save as PDF
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center lg:items-end">
          <ScoreDial score={report.score} grade={report.grade} />
          <p className="mt-4 flex items-center gap-3 text-[15px] text-wf-ink-soft">
            <span className="flex h-11 w-11 items-center justify-center rounded-[6px] bg-wf-sign text-[26px] font-extrabold leading-none text-wf-ink">
              {report.grade}
            </span>
            <span>
              grade for {aSector(report.sector)}
              {report.sector !== report.detectedSector ? " (your choice)" : ""}
            </span>
          </p>
        </div>
      </div>

      <dl className="mt-14 grid grid-cols-2 gap-x-6 gap-y-6 border-y-2 border-wf-ink py-6 sm:grid-cols-3 lg:grid-cols-6">
        {facts.map((f) => (
          <div key={f.label}>
            <dt className="wf-label text-wf-muted">{f.label}</dt>
            <dd className={cn("mt-2 text-[28px] font-extrabold leading-none tracking-[-0.02em] tabular-nums")}>{f.value}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 max-w-[80ch] text-[14.5px] leading-[1.55] text-wf-muted">
        Automated check of the page&rsquo;s HTML and response headers, fetched just now from a UK server. It cannot
        run JavaScript, judge design, or measure real visitors&rsquo; speed; the written audit covers those. Nothing
        you enter is stored.
      </p>
    </header>
  );
}
