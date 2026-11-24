import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import nextConfig from "../../next.config";
import { site } from "@/lib/site";

/**
 * Cal.com booking was retired. Every "talk to us" action now lands on
 * the contact section of the homepage, and the old /book URL (printed
 * on earlier audit reports and their QR codes) must keep working.
 */
describe("Cal.com booking is retired", () => {
  it("has no booking config, and one contact target for every CTA", () => {
    expect(site).not.toHaveProperty("booking");
    expect(site.contact).toEqual({ href: "/#contact", label: "Get in touch" });
  });

  it("no longer depends on the Cal.com embed", () => {
    const pkg = JSON.parse(readFileSync(join(process.cwd(), "package.json"), "utf8"));
    expect({ ...pkg.dependencies, ...pkg.devDependencies }).not.toHaveProperty("@calcom/embed-react");
  });

  it("permanently redirects the old /book URL to the contact section", async () => {
    const redirects = (await nextConfig.redirects?.()) ?? [];
    expect(redirects).toContainEqual({ source: "/book", destination: site.contact.href, permanent: true });
  });
});
