import { describe, expect, it } from "vitest";
import nextConfig from "./next.config";

const BASELINE_HEADERS = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

describe("baseline security headers", () => {
  it("applies the four hardening headers to every route", async () => {
    expect(nextConfig.headers).toBeTypeOf("function");
    const rules = await nextConfig.headers!();

    expect(rules).toEqual([
      {
        source: "/:path*",
        headers: BASELINE_HEADERS,
      },
    ]);
  });

  it("does not set CSP or HSTS in the Next config", async () => {
    const rules = await nextConfig.headers!();
    const keys = rules.flatMap((rule) => rule.headers.map((header) => header.key.toLowerCase()));

    expect(keys).not.toContain("content-security-policy");
    expect(keys).not.toContain("content-security-policy-report-only");
    expect(keys).not.toContain("strict-transport-security");
  });

  it("keeps the existing image formats and redirects", async () => {
    expect(nextConfig.images?.formats).toEqual(["image/avif", "image/webp"]);
    expect(nextConfig.images?.minimumCacheTTL).toBe(31536000);

    const redirects = await nextConfig.redirects!();
    expect(redirects).toEqual([
      {
        source: "/little-artist/privacy-policy",
        destination: "/projects/artling/privacy-policy",
        permanent: true,
      },
      {
        source: "/clear-path",
        destination: "/leaving-msw",
        permanent: true,
      },
    ]);
  });
});
