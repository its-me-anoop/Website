"use client";

import Image from "next/image";
import { Check as CheckIcon } from "lucide-react";
import { site } from "@/lib/site";
import { aSector, categoryMeta, sectorLabel } from "@/lib/audit/score";
import type { AuditReport, CategoryScore, Check, Impact } from "@/lib/audit/types";
import { displayUrl } from "@/lib/audit/url";
import { cn } from "@/lib/utils";
import { Eyebrow, Tag } from "../../primitives";
import { pitchModel, promise } from "../report/pitch-model";
import { ScoreDial } from "../report/ScoreDial";
import { scoreBar, scoreTone, StatusMark, statusLabel } from "../report/StatusMark";
import { QrBook } from "./QrBook";

/**
 * The report as a designed A4 document, in the Kiln language: a coal
 * cover with the score, a bone summary and fix-first page, every check
 * area by area, and a closing coal page that sets the weakest areas
 * against what a Flutterly build does about them.
 *
 * It is rendered alongside the interactive report but hidden on screen;
 * `@media print` in globals.css swaps the two, so the browser's Print /
 * Save as PDF produces this document. Page geometry lives in the
 * `k-pdf-*` classes there.
 */

const shortDomain = site.domain.replace(/^www\./, "");

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatKb(bytes: number) {
  return bytes >= 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.round(bytes / 1024)} KB`;
}

const impactLabel: Record<Impact, string> = {
  high: "High impact",
  medium: "Medium impact",
  low: "Low impact",
};

function Wordmark({ onCoal }: { onCoal?: boolean }) {
  return (
    <span className="inline-flex items-center gap-[2mm]">
      <Image src="/flutterly-logo.png" alt="" width={20} height={20} className="h-[5mm] w-[5mm]" />
      <span className={cn("k-display text-[12pt] leading-none", onCoal ? "text-k-coal-ink" : "text-k-ink")}>Flutterly</span>
    </span>
  );
}

function RunningHead({ report, onCoal }: { report: AuditReport; onCoal?: boolean }) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-[6mm] border-b pb-[3mm] text-[8.5pt]",
        onCoal ? "border-k-coal-line text-k-coal-soft" : "border-k-line text-k-muted"
      )}
    >
      <Wordmark onCoal={onCoal} />
      <span className="truncate">
        Instant website audit &middot; <span className={onCoal ? "text-k-coal-ink" : "text-k-ink"}>{report.page.host}</span>
      </span>
      <span className="shrink-0">{formatDate(report.generatedAt)}</span>
    </div>
  );
}

function PageFoot({ onCoal, label }: { onCoal?: boolean; label: string }) {
  return (
    <div className="k-pdf-foot mt-auto pt-[5mm]">
      <div
        className={cn(
          "flex items-center justify-between gap-[6mm] border-t pt-[3mm] text-[7.5pt]",
          onCoal ? "border-k-coal-line text-k-coal-soft" : "border-k-line text-k-muted"
        )}
      >
        <span>
          {site.legalName} &middot; {site.address.addressLocality}, UK &middot; {shortDomain} &middot; {site.email}
        </span>
        <span className="k-eyebrow !text-[7pt]">{label}</span>
      </div>
    </div>
  );
}

/* ── Cover ─────────────────────────────────────────────────── */

function Cover({ report }: { report: AuditReport }) {
  const { page, totals } = report;
  const facts: [string, string][] = [
    ["First byte", `${page.ttfbMs} ms`],
    ["HTML weight", formatKb(page.htmlBytes)],
    ["Words", String(page.wordCount)],
    ["Scripts", String(page.scriptCount)],
    ["Third parties", String(page.externalDomains.length)],
  ];
  return (
    <section className="k-pdf-page on-coal bg-k-coal text-k-coal-ink">
      <RunningHead report={report} onCoal />

      <div className="mt-[10mm]">
        <Eyebrow className="text-k-fire-lite">Instant website audit &middot; {sectorLabel(report.sector)}</Eyebrow>
        <p className="k-display mt-[6mm] break-words text-[34pt] leading-[1.02] text-k-coal-ink">{page.host}</p>
        <p className="mt-[4mm] text-[10.5pt] leading-[1.5] text-k-coal-soft">
          {page.title ? <>&ldquo;{page.title}&rdquo; &middot; </> : null}
          {displayUrl(page.finalUrl)}
        </p>
        {page.platform || page.clientRendered || page.crossSiteRedirect || !page.https ? (
          <div className="mt-[4mm] flex flex-wrap gap-[2mm]">
            {page.platform ? <Tag tone="bone">Built on {page.platform.name}</Tag> : null}
            {page.clientRendered ? <Tag tone="butter">Content drawn by JavaScript</Tag> : null}
            {page.crossSiteRedirect ? <Tag tone="fire">Redirected to another site</Tag> : null}
            {!page.https ? <Tag tone="fire">Not HTTPS</Tag> : null}
          </div>
        ) : null}
      </div>

      <div className="mt-[10mm] rounded-[16px] bg-k-paper p-[8mm] text-k-ink">
        <div className="flex items-center gap-[8mm]">
          <ScoreDial score={report.score} grade={report.grade} className="h-[50mm] w-[50mm] shrink-0 sm:h-[50mm] sm:w-[50mm]" />
          <div className="min-w-0">
            <p className="flex items-baseline gap-[3mm]">
              <span className={cn("k-display text-[40pt] leading-none", scoreTone(report.score))}>{report.grade}</span>
              <span className="text-[10pt] text-k-ink-soft">grade for {aSector(report.sector)}</span>
            </p>
            <p className="mt-[3mm] text-[12pt] leading-[1.45] text-k-ink">{report.verdict}</p>
            <p className="mt-[3mm] text-[9pt] text-k-muted">
              {totals.pass} of {totals.checks} checks passed &middot; {totals.fail} to fix &middot; {totals.warn} to improve
              {totals.info ? <> &middot; {totals.info} for information</> : null}
            </p>
          </div>
        </div>
        <dl className="mt-[7mm] grid grid-cols-5 gap-[4mm] border-t border-k-line pt-[5mm]">
          {facts.map(([k, v]) => (
            <div key={k}>
              <dt className="k-eyebrow !text-[7pt] text-k-muted">{k}</dt>
              <dd className="k-display mt-[1.5mm] text-[15pt] leading-none text-k-ink">{v}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="mt-[9mm]">
        <p className="k-eyebrow !text-[7pt] text-k-coal-soft">Seven areas at a glance</p>
        <ol className="mt-[3mm] grid grid-cols-7 gap-[3mm]">
          {report.categories.map((c, i) => (
            <li key={c.id} className="border-t border-k-coal-line pt-[3mm]">
              <p className="text-[7pt] tabular-nums text-k-coal-soft">0{i + 1}</p>
              <p className={cn("k-display mt-[1.5mm] text-[21pt] leading-none tabular-nums", scoreTone(c.score, true))}>
                {c.score ?? "–"}
              </p>
              <p className="mt-[1.5mm] text-[7.5pt] leading-[1.3] text-k-coal-ink">{c.name}</p>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-auto pt-[8mm]">
        <p className="max-w-[150mm] text-[8.5pt] leading-[1.55] text-k-coal-soft">
          An automated check of the page&rsquo;s HTML and response headers, fetched from a UK server on{" "}
          {formatDate(report.generatedAt)}. It cannot run JavaScript, judge design or measure real visitors&rsquo; speed; the
          written audit on the last page covers those. Nothing entered is stored.
        </p>
        <PageFoot onCoal label="Cover" />
      </div>
    </section>
  );
}

/* ── Summary ───────────────────────────────────────────────── */

function AreaRow({ category, index }: { category: CategoryScore; index: number }) {
  const { score, counts } = category;
  return (
    <li className="grid grid-cols-[7mm_1fr_36mm_34mm] items-center gap-x-[3.5mm] border-t border-k-line py-[4.5mm]">
      <span className="k-display text-[10pt] tabular-nums text-k-fire">0{index + 1}</span>
      <div className="min-w-0">
        <p className="k-display text-[13.5pt] leading-tight text-k-ink">{category.name}</p>
        <p className="mt-[0.8mm] text-[8pt] leading-[1.4] text-k-ink-soft">{categoryMeta[category.id].blurb}</p>
      </div>
      <div className="flex items-center gap-[3mm]">
        <span className="h-[1.6mm] w-[22mm] overflow-hidden rounded-full bg-k-line">
          <span className={cn("block h-full rounded-full", scoreBar(score))} style={{ width: `${score ?? 0}%` }} />
        </span>
        <span className={cn("k-display w-[10mm] text-right text-[18pt] leading-none tabular-nums", scoreTone(score))}>
          {score ?? "–"}
        </span>
      </div>
      <p className="text-right text-[8pt] leading-[1.45] text-k-ink-soft">
        <span className="block">
          {counts.fail ? <span className="text-k-fire">{counts.fail} to fix</span> : null}
          {counts.fail && counts.warn ? " · " : null}
          {counts.warn ? <span className="text-k-ochre">{counts.warn} to improve</span> : null}
          {!counts.fail && !counts.warn ? <span className="text-k-moss">Nothing to fix</span> : null}
        </span>
        <span className="block text-k-muted">weight {category.weight}%</span>
      </p>
    </li>
  );
}

function Summary({ report, who }: { report: AuditReport; who: string }) {
  return (
    <section className="k-pdf-page bg-k-bone text-k-ink">
      <RunningHead report={report} />
      <Eyebrow className="mt-[9mm] text-k-muted">Seven areas</Eyebrow>
      <h2 className="k-display mt-[4mm] text-[24pt] text-k-ink">
        How the site scores, area by <em>area</em>.
      </h2>
      <p className="mt-[3mm] max-w-[140mm] text-[10pt] leading-[1.55] text-k-ink-soft">
        Each area is weighted by how much it affects {who}: accessibility and content count most because they are what {who} feel
        first. The full list of checks, with what was found and how to fix it, follows on the next pages, with a key to the marks.
      </p>
      <ol className="mt-[6mm] border-b border-k-line">
        {report.categories.map((c, i) => (
          <AreaRow key={c.id} category={c} index={i} />
        ))}
      </ol>

      <PageFoot label="Summary" />
    </section>
  );
}

function Legend({ who }: { who: string }) {
  return (
    <div className="mt-[6mm] grid grid-cols-2 gap-[8mm] rounded-[8px] bg-k-bone-2/70 px-[5mm] py-[4mm] text-[8pt] leading-[1.5] text-k-ink-soft">
      <div>
        <p className="k-eyebrow !text-[7pt] text-k-muted">Reading the checks</p>
        <ul className="mt-[2.5mm] grid gap-[1.5mm]">
          {(["fail", "warn", "pass", "info"] as const).map((s) => (
            <li key={s} className="flex items-center gap-[2.5mm]">
              <StatusMark status={s} size={12} />
              <span>
                <span className="font-medium text-k-ink">{statusLabel[s]}.</span>{" "}
                {s === "fail"
                  ? "Costs the score and should be fixed."
                  : s === "warn"
                    ? "Half marks; worth improving."
                    : s === "pass"
                      ? "Full marks."
                      : "Could not be judged from the HTML alone; not scored."}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className="k-eyebrow !text-[7pt] text-k-muted">How the score is built</p>
        <p className="mt-[2.5mm]">
          Every check is weighted by its impact on {who} (high counts three times a low). Each area&rsquo;s score is the weighted
          share of marks earned; the overall score combines the areas by the weights shown. Grades: A from 90, B from 75, C from
          60, D from 45.
        </p>
      </div>
    </div>
  );
}

/* ── Fix first ─────────────────────────────────────────────── */

function Priorities({ report, who }: { report: AuditReport; who: string }) {
  const items = report.priorities.slice(0, 5);
  const rest = report.totals.fail + report.totals.warn - items.length;
  if (!items.length) return null;
  return (
    <section className="k-pdf-page bg-k-bone text-k-ink">
      <RunningHead report={report} />
      <Eyebrow className="mt-[9mm] text-k-muted">Fix these first</Eyebrow>
      <h2 className="k-display mt-[4mm] text-[22pt] text-k-ink">
        The {items.length} changes that would help {who} <em>most</em>.
      </h2>
      <p className="mt-[3mm] max-w-[140mm] text-[9.5pt] leading-[1.5] text-k-ink-soft">
        Ranked by how much each affects {who}, then by how badly it is failing; hand them to whoever looks after the site
        {rest > 0 ? `. The other ${rest} follow in the area breakdown` : ""}.
      </p>
      <ol className="mt-[6mm] border-b border-k-line">
        {items.map((check, i) => (
          <li key={check.id} className="grid grid-cols-[10mm_1fr] gap-x-[4mm] border-t border-k-line py-[3mm]">
            <span className="k-display text-[22pt] leading-none tabular-nums text-k-fire">{i + 1}</span>
            <div className="min-w-0">
              <div className="flex flex-wrap items-baseline gap-x-[3mm] gap-y-[1mm]">
                <p className="k-display text-[13pt] leading-tight text-k-ink">{check.title}</p>
                <p className="flex items-center gap-[1.5mm] text-[8pt] text-k-muted">
                  <StatusMark status={check.status} size={10} />
                  {impactLabel[check.impact]} &middot; {categoryMeta[check.category].name}
                </p>
              </div>
              <p className="mt-[1.2mm] max-w-[150mm] text-[9pt] leading-[1.5] text-k-ink-soft">{check.detail}</p>
              {check.fix ? (
                <p className="mt-[1.2mm] max-w-[150mm] text-[9pt] leading-[1.5] text-k-ink">
                  <span className="font-medium text-k-fire">Fix:</span> {check.fix}
                </p>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
      <PageFoot label="Fix first" />
    </section>
  );
}

/* ── Every check, area by area ─────────────────────────────── */

function CheckDetail({ check }: { check: Check }) {
  return (
    <li className="k-avoid-break grid grid-cols-[5mm_1fr] items-start gap-x-[3mm] border-t border-k-line py-[3.2mm]">
      <StatusMark status={check.status} size={12} className="mt-[1mm]" />
      <div className="min-w-0">
        <p className="text-[10pt] font-medium leading-snug text-k-ink">{check.title}</p>
        <p className="mt-[1mm] max-w-[150mm] text-[9pt] leading-[1.5] text-k-ink-soft">{check.detail}</p>
        {check.fix ? (
          <p className="mt-[1mm] max-w-[150mm] text-[9pt] leading-[1.5] text-k-ink">
            <span className="font-medium text-k-fire">Fix:</span> {check.fix}
          </p>
        ) : null}
        {check.evidence?.length ? (
          <ul className="mt-[1.5mm] flex flex-wrap gap-[1.5mm]">
            {check.evidence.slice(0, 3).map((e) => (
              <li
                key={e}
                className="max-w-full truncate rounded-[4px] bg-k-bone-2 px-[2mm] py-[0.8mm] font-mono text-[7.5pt] text-k-ink-soft"
              >
                {e}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </li>
  );
}

function AreaDetail({ category, index }: { category: CategoryScore; index: number }) {
  const attention = category.checks.filter((c) => c.status !== "pass");
  const passing = category.checks.filter((c) => c.status === "pass");
  return (
    <section className={index === 0 ? "mt-[8mm]" : "mt-[12mm]"}>
      <header className="k-avoid-break-after grid grid-cols-[9mm_1fr_auto] items-end gap-x-[5mm] border-b-[0.5mm] border-k-ink pb-[3mm]">
        <span className="k-display text-[10pt] tabular-nums text-k-fire">0{index + 1}</span>
        <div>
          <h3 className="k-display text-[20pt] leading-none text-k-ink">{category.name}</h3>
          <p className="mt-[1.5mm] text-[9pt] leading-[1.45] text-k-ink-soft">{category.summary}</p>
        </div>
        <p className="text-right">
          <span className={cn("k-display block text-[28pt] leading-none tabular-nums", scoreTone(category.score))}>
            {category.score ?? "–"}
          </span>
          <span className="mt-[1mm] block text-[7.5pt] text-k-muted">weight {category.weight}%</span>
        </p>
      </header>
      {attention.length ? (
        <ul className="border-b border-k-line">
          {attention.map((c) => (
            <CheckDetail key={c.id} check={c} />
          ))}
        </ul>
      ) : null}
      {passing.length ? (
        <div className="k-avoid-break mt-[4mm] rounded-[8px] bg-k-bone-2/70 px-[5mm] py-[4mm]">
          <p className="k-eyebrow !text-[7pt] text-k-moss">
            Passing &middot; {passing.length} {passing.length === 1 ? "check" : "checks"}
          </p>
          <ul className="mt-[2.5mm] grid grid-cols-2 gap-x-[6mm] gap-y-[1.2mm] text-[8.5pt] leading-[1.4] text-k-ink-soft">
            {passing.map((c) => (
              <li key={c.id} className="flex items-start gap-[2mm]">
                <CheckIcon size={11} strokeWidth={2.6} aria-hidden className="mt-[0.9mm] shrink-0 text-k-moss" />
                <span>{c.title}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}

function Detail({ report, who }: { report: AuditReport; who: string }) {
  return (
    <table className="k-pdf-flow bg-k-bone text-k-ink">
      <thead>
        <tr>
          <td className="k-pdf-flow-head">
            <RunningHead report={report} />
          </td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="k-pdf-flow-body">
            <Eyebrow className="text-k-muted">Every check</Eyebrow>
            <h2 className="k-display mt-[4mm] text-[24pt] text-k-ink">
              What was found, area by <em>area</em>.
            </h2>
            <p className="mt-[3mm] max-w-[140mm] text-[10pt] leading-[1.55] text-k-ink-soft">
              Checks that need attention come first in each area, with what was found and a fix that any developer can act on.
              Passing checks are listed beneath so you can see what is already working for {who}.
            </p>
            <Legend who={who} />
            {report.categories.map((c, i) => (
              <AreaDetail key={c.id} category={c} index={i} />
            ))}
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td className="k-pdf-flow-foot">
            <PageFoot label="Every check" />
          </td>
        </tr>
      </tfoot>
    </table>
  );
}

/* ── Next steps ────────────────────────────────────────────── */

function NextSteps({ report }: { report: AuditReport }) {
  const { who, weakest, keep, recommended } = pitchModel(report);
  return (
    <section className="k-pdf-page k-pdf-after on-coal bg-k-coal text-k-coal-ink">
      <RunningHead report={report} onCoal />
      <Eyebrow className="mt-[7mm] text-k-fire-lite">What Flutterly would do</Eyebrow>
      <h2 className="k-display mt-[3.5mm] max-w-[160mm] text-[20pt] text-k-coal-ink">
        {keep ? (
          <>
            Honest answer: <em>keep what you have.</em>
          </>
        ) : (
          <>
            Every Flutterly build is checked against this <em>same list</em> before launch.
          </>
        )}
      </h2>
      <p className="mt-[2.5mm] max-w-[150mm] text-[9.5pt] leading-[1.5] text-k-coal-soft">
        {keep
          ? "This site is in good shape. Fix the items in this report with whoever built it, and if you would like a second pair of eyes on the things a machine cannot judge, the written audit is free."
          : `Below are the three areas where the current site is weakest, and what a Flutterly build does about each of them for ${who}.`}
      </p>

      <div className="mt-[5mm] grid grid-cols-[1fr_78mm] gap-[7mm]">
        <ol className="self-start border-b border-k-coal-line">
          {weakest.map((cat) => (
            <li key={cat.id} className="grid grid-cols-[12mm_1fr] gap-x-[4mm] border-t border-k-coal-line py-[3mm]">
              <span className={cn("k-display text-[22pt] leading-none tabular-nums", scoreTone(cat.score, true))}>
                {cat.score}
              </span>
              <div>
                <p className="k-display text-[14pt] leading-tight text-k-coal-ink">{cat.name}</p>
                <p className="mt-[1.2mm] text-[8.5pt] leading-[1.5] text-k-coal-soft">
                  <span className="font-medium text-k-coal-ink">Now:</span> {cat.summary}
                </p>
                {!keep ? (
                  <p className="mt-[1.2mm] text-[8.5pt] leading-[1.5] text-k-coal-soft">
                    <span className="font-medium text-k-fire-lite">A Flutterly build:</span> {promise[cat.id]}
                  </p>
                ) : null}
              </div>
            </li>
          ))}
        </ol>

        <article className="self-start rounded-[14px] bg-k-paper p-[5mm] text-k-ink">
          <p className="k-eyebrow !text-[7pt] text-k-muted">{keep ? "If a refresh is due" : "Suggested starting point"}</p>
          <p className="k-display mt-[2.5mm] text-[20pt] leading-none">{recommended.name}</p>
          <p className="mt-[1.5mm] text-[9pt] text-k-ink-soft">{recommended.strap}</p>
          <p className="k-display mt-[4mm] text-[22pt] leading-none">{recommended.price}</p>
          <p className="mt-[1.5mm] text-[9pt] text-k-ink-soft">{recommended.pricePeriod}</p>
          {recommended.priceNote ? (
            <p className="mt-[1mm] text-[8pt] leading-[1.4] text-k-ink-soft">{recommended.priceNote}</p>
          ) : null}
          <ul className="mt-[3.5mm] grid gap-[1.2mm] border-t border-k-line pt-[3.5mm] text-[8pt] leading-[1.4] text-k-ink">
            {recommended.features.map((f) => (
              <li key={f} className="flex items-start gap-[2mm]">
                <CheckIcon size={11} strokeWidth={2.6} aria-hidden className="mt-[0.9mm] shrink-0 text-k-fire" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
          <p className="mt-[4mm] text-[7.5pt] leading-[1.45] text-k-muted">
            Plus VAT. All three packages at {`${shortDomain}/packages`}.
          </p>
        </article>
      </div>

      <div className="mt-auto k-avoid-break">
        <div className="grid grid-cols-[1fr_auto] items-end gap-[8mm] border-t border-k-coal-line pt-[4mm]">
          <div>
            <h3 className="k-display text-[14pt] leading-tight text-k-coal-ink">Next step: the full written audit, free.</h3>
            <p className="mt-[2mm] max-w-[125mm] text-[8.5pt] leading-[1.5] text-k-coal-soft">
              {site.founder} reviews the site by hand: design, content, real-device speed and the journeys {who} actually take. A
              scored, plain-English report within a week, yours to act on with anyone.
            </p>
            <p className="mt-[2mm] text-[8.5pt] leading-[1.5] text-k-coal-ink">
              Email <span className="font-medium">{site.email}</span> with this report, or book a{" "}
              {`${site.booking.durationMinutes}-minute`} call at <span className="font-medium">{`${shortDomain}/book`}</span>.
            </p>
          </div>
          <div className="rounded-[10px] bg-k-paper p-[3mm] text-k-ink">
            <QrBook className="h-[22mm] w-[22mm]" />
            <p className="mt-[1.5mm] text-center text-[7pt] leading-none text-k-muted">Scan to book</p>
          </div>
        </div>
        <PageFoot onCoal label="Next steps" />
      </div>
    </section>
  );
}

export function PrintReport({ report }: { report: AuditReport }) {
  const { who } = pitchModel(report);
  return (
    <div className="k-pdf" aria-hidden>
      <Cover report={report} />
      <Summary report={report} who={who} />
      <Priorities report={report} who={who} />
      <Detail report={report} who={who} />
      <NextSteps report={report} />
    </div>
  );
}
