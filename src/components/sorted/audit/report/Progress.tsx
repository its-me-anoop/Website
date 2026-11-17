"use client";

export const stages = [
  "Reading the public page and its response headers",
  "Checking accessibility, speed and content signals",
  "Scoring the checks and prioritising fixes",
] as const;

export function Progress({ host }: { host: string }) {
  return (
    <div className="cv-status" aria-busy="true">
      <p className="cv-label">Audit in progress</p>
      <p className="cv-checking">{host}</p>
      <div className="cv-loading" aria-hidden />
      <ol className="mt-7 list-decimal space-y-2 pl-5 text-s-ink-soft" aria-label="Audit progress">
        {stages.map((stage) => <li key={stage}>{stage}</li>)}
      </ol>
      <p className="mt-7 text-sm text-s-muted">Your report will appear here when the checks finish.</p>
    </div>
  );
}
