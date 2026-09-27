import { describe, expect, it } from "vitest";
import { auditHref, auditMailto } from "./audit-links";

describe("auditHref", () => {
  it("builds a shareable /audit address with the trimmed url", () => {
    expect(auditHref("  example.nhs.uk ")).toBe("/audit?url=example.nhs.uk");
  });

  it("adds the sector when one is given", () => {
    expect(auditHref("example.nhs.uk", "care-home")).toBe("/audit?url=example.nhs.uk&sector=care-home");
  });
});

describe("auditMailto", () => {
  it("addresses the studio inbox with a generic subject when no url is known", () => {
    const href = auditMailto();
    expect(href.startsWith("mailto:anoop@flutterly.co.uk?subject=")).toBe(true);
    expect(decodeURIComponent(href)).toContain("Written website audit request");
  });

  it("names the site in the subject and carries the instant summary in the body", () => {
    const href = decodeURIComponent(auditMailto("example.nhs.uk", "Score 58/100"));
    expect(href).toContain("Written website audit: example.nhs.uk");
    expect(href).toContain("Website address: example.nhs.uk");
    expect(href).toContain("Instant audit summary:\nScore 58/100");
  });
});
