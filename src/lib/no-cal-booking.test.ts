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

/*
 * With booking gone, the copy should not send people to "a short call":
 * the way in is email, from the contact section.
 */
describe("copy points people to email, not a call", () => {
  const files = [
    "src/lib/marketing/services.ts",
    "src/lib/marketing/content.ts",
    "src/components/sorted/pages/PackagesPage.tsx",
    "src/components/sorted/pages/ServicesIndexPage.tsx",
    "src/components/sorted/pages/ProjectPage.tsx",
    "src/app/packages/page.tsx",
  ];

  it.each(files)("%s never asks for a short call", (file) => {
    const text = readFileSync(join(process.cwd(), file), "utf8");
    expect(text).not.toMatch(/short call/i);
    expect(text).not.toMatch(/quickest way to a written plan/i);
  });
});
