"use client";

import type { AuditFailure } from "@/lib/audit/types";
import { auditMailto } from "@/lib/marketing/audit-links";
import { Reveal } from "../../effects/Motion";
import { AuditBar, ButtonLink, Display, Eyebrow } from "../../ui/primitives";

const headings: Record<AuditFailure["error"]["code"], string> = {
  invalid_url: "That does not look like a website address",
  blocked_host: "That address cannot be audited",
  dns_failed: "That domain could not be found",
  unreachable: "The site could not be reached",
  timeout: "The site took too long to answer",
  http_error: "The site answered with an error",
  not_html: "That address is not a web page",
  too_large: "That page is too large to audit",
  too_many_redirects: "The site redirected too many times",
  rate_limited: "Slow down a moment",
  internal: "Something went wrong",
};

export function ErrorState({
  failure,
  url,
  onRetry,
}: {
  failure: AuditFailure["error"];
  url: string;
  onRetry: () => void;
}) {
  const retryable = ["timeout", "unreachable", "internal", "rate_limited"].includes(failure.code);
  return (
    <div className="mx-auto flex w-full max-w-[720px] flex-col items-center text-center">
      <Reveal>
        <Eyebrow className="text-a-fail before:!bg-a-fail before:!shadow-none">Audit not completed</Eyebrow>
        <Display as="h1" size="md" className="mt-5 text-a-ink">
          {headings[failure.code] ?? headings.internal}
        </Display>
        <p className="mx-auto mt-5 max-w-[560px] text-[16.5px] leading-[1.6] text-a-ink-soft">
          {failure.message}
        </p>
        {failure.code === "timeout" ? (
          <p className="mx-auto mt-3 max-w-[560px] text-[15px] leading-[1.6] text-a-muted">
            A site that takes this long to respond to a single request is losing visitors before
            they see anything. That alone is worth a conversation.
          </p>
        ) : null}
      </Reveal>
      <Reveal delay={0.08} className="mt-8 flex flex-wrap items-center justify-center gap-3">
        {retryable ? (
          <button
            type="button"
            onClick={onRetry}
            className="a-shine inline-flex h-12 items-center justify-center rounded-full bg-a-lime px-6 text-[15px] font-medium text-a-void transition-colors hover:bg-a-lime-hover"
          >
            Try again
          </button>
        ) : null}
        <ButtonLink href={auditMailto(url)} tone={retryable ? "glass" : "primary"}>
          Ask for the written audit instead
        </ButtonLink>
      </Reveal>
      <Reveal delay={0.14} className="mt-12 flex w-full justify-center">
        <AuditBar
          align="center"
          hint="Or try a different address."
          defaultValue={failure.code === "invalid_url" ? url : ""}
        />
      </Reveal>
    </div>
  );
}
