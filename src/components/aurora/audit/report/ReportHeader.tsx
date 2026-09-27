"use client";

import { useState } from "react";
import { ArrowUpRight, FileDown, Link2 } from "lucide-react";
import { aSector } from "@/lib/audit/score";
import { sectors, type AuditReport } from "@/lib/audit/types";
import { displayUrl } from "@/lib/audit/url";
import { cn } from "@/lib/utils";
import { Reveal } from "../../effects/Motion";
import { Display, Eyebrow, Tag } from "../../ui/primitives";
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
    <header className="mx-auto w-full max-w-[1280px] px-5 sm:px-8">
      <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-start lg:gap-16">
        <div>
          <Reveal>
            <Eyebrow className="text-a-muted">Instant website audit</Eyebrow>
            <Display as="h1" size="lg" className="mt-5 break-words text-a-ink">
              {page.host}
            </Display>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="mt-4 text-[15px] leading-[1.55] text-a-ink-soft">
              {page.title ? <>&ldquo;{page.title}&rdquo; &middot; </> : null}
              <a
                href={page.finalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-a-amber underline-offset-4 hover:underline"
              >
                {displayUrl(page.finalUrl)}
                <ArrowUpRight size={13} aria-hidden />
              </a>
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {page.platform ? <Tag>Built on {page.platform.name}</Tag> : null}
              {page.clientRendered ? <Tag tone="warn">Content drawn by JavaScript</Tag> : null}
              {page.crossSiteRedirect ? <Tag tone="fail">Redirected to another site</Tag> : null}
              {!page.https ? <Tag tone="fail">Not HTTPS</Tag> : null}
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-7 max-w-[560px] text-[19px] leading-[1.5] text-a-ink sm:text-[21px]">
              {report.verdict}
            </p>
          </Reveal>

          <Reveal delay={0.18} className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 text-[14px] text-a-muted">
            <form action="/audit" method="get" className="flex items-center gap-2">
              <input type="hidden" name="url" value={url} />
              <label htmlFor="audit-sector" className="whitespace-nowrap">
                Checked as a
              </label>
              <select
                id="audit-sector"
                name="sector"
                defaultValue={report.sector}
                onChange={(e) => e.currentTarget.form?.requestSubmit()}
                className="rounded-[8px] border border-a-line-2 bg-a-deep px-2.5 py-1.5 text-[14px] text-a-ink"
              >
                {sectorOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                    {o.value === report.detectedSector ? " (detected)" : ""}
                  </option>
                ))}
              </select>
              <noscript>
                <button type="submit" className="rounded-[8px] bg-a-deep px-3 py-1.5 text-a-ink">
                  Re-run
                </button>
              </noscript>
            </form>
            <button
              type="button"
              onClick={copyLink}
              className="inline-flex items-center gap-1.5 text-a-ink-soft underline-offset-4 hover:underline"
            >
              <Link2 size={14} aria-hidden />
              {copied ? "Link copied" : "Copy report link"}
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              title="Opens your browser's print dialog. Choose “Save as PDF” as the destination for a designed, shareable report."
              className="inline-flex items-center gap-1.5 text-a-ink-soft underline-offset-4 hover:underline"
            >
              <FileDown size={14} aria-hidden />
              Save as PDF
            </button>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="flex flex-col items-center lg:items-end">
          <ScoreDial score={report.score} grade={report.grade} />
          <p className="mt-4 flex items-center gap-2 text-[14px] text-a-ink-soft">
            <span className="a-display text-[28px] leading-none text-a-ink">{report.grade}</span>
            <span>
              grade for {aSector(report.sector)}
              {report.sector !== report.detectedSector ? " (your choice)" : ""}
            </span>
          </p>
        </Reveal>
      </div>

      <Reveal delay={0.2} className="mt-14">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-6 border-y border-a-line py-6 sm:grid-cols-3 lg:grid-cols-6">
          {facts.map((f) => (
            <div key={f.label}>
              <dt className="a-eyebrow text-a-muted">{f.label}</dt>
              <dd className={cn("a-display mt-2 text-[28px] leading-none text-a-ink tabular-nums")}>{f.value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 max-w-[760px] text-[13.5px] leading-[1.55] text-a-muted">
          Automated check of the page&rsquo;s HTML and response headers, fetched just now from a UK server.
          It cannot run JavaScript, judge design, or measure real visitors&rsquo; speed; the written audit
          covers those. Nothing you enter is stored.
        </p>
      </Reveal>
    </header>
  );
}
