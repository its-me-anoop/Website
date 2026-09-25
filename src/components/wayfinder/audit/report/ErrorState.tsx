"use client";

import type { AuditFailure } from "@/lib/audit/types";
import { auditMailto } from "@/lib/marketing/audit-links";
import { AuditBar } from "../../ui/AuditBar";
import { Button, ButtonLink } from "../../ui/Button";
import { Heading } from "../../ui/Type";

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
    <div className="mx-auto w-full max-w-[760px]">
      <div className="wf-board wf-on-ink overflow-hidden">
        <p className="wf-label flex items-center gap-2 bg-wf-fail px-5 py-3 font-bold text-white sm:px-7">
          <span aria-hidden="true">✕</span> Audit not completed
        </p>
        <div className="px-5 py-8 sm:px-7 sm:py-10">
          <Heading as="h1" size="md">
            {headings[failure.code] ?? headings.internal}
          </Heading>
          <p className="mt-5 max-w-[58ch] text-[17px] leading-[1.6] text-wf-on-ink-soft">{failure.message}</p>
          {failure.code === "timeout" ? (
            <p className="mt-3 max-w-[58ch] text-[16px] leading-[1.6] text-wf-on-ink-soft">
              A site that takes this long to respond to a single request is losing visitors before they see anything.
              That alone is worth a conversation.
            </p>
          ) : null}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            {retryable ? (
              <Button onClick={onRetry} arrow="right">
                Try again
              </Button>
            ) : null}
            <ButtonLink href={auditMailto(url)} tone={retryable ? "outline" : "sign"}>
              Ask for the written audit instead
            </ButtonLink>
          </div>
        </div>
      </div>
      <div className="mt-12">
        <AuditBar
          label="Or try a different website address"
          hint="Paste the address and press the arrow."
          defaultValue={failure.code === "invalid_url" ? url : ""}
        />
      </div>
    </div>
  );
}
