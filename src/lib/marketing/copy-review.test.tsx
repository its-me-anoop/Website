import React from "react";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import { LazyMotion } from "framer-motion";
import domMax from "@/lib/motion-features";
import { clearPath, comparison, packagesFaq, packages } from "./content";
import { getService } from "./services";
import { LeavingMswPage } from "@/components/aurora/pages/LeavingMswPage";
import { PackagesPage } from "@/components/aurora/pages/PackagesPage";
import { metadata as packagesMetadata } from "@/app/packages/page";

vi.mock("next/navigation", () => ({ usePathname: () => "/", useRouter: () => ({ push: vi.fn() }) }));
beforeAll(() => {
  vi.stubGlobal("ResizeObserver", class { observe() {} unobserve() {} disconnect() {} });
});
afterAll(() => vi.unstubAllGlobals());

const pageText = (ui: React.ReactNode) =>
  render(<LazyMotion features={domMax} strict>{ui}</LazyMotion>).container.textContent ?? "";

describe("SEO service promise", () => {
  it("does not imply a first-place ranking", () => {
    const seo = getService("seo")!;
    const heading = [seo.heading.lead, seo.heading.emphasis, seo.heading.trail].filter(Boolean).join(" ");
    expect(heading).toBe("Help more people nearby find you.");
    expect(seo.summary).not.toMatch(/first/i);
  });
});

describe("website packages", () => {
  it("speak to any small business or organisation", () => {
    expect(packages[0].copy).toBe(
      "For a small business or organisation that needs a clear, accessible website, hosted and backed up."
    );
  });

  it("are titled as website packages", () => {
    expect(packagesMetadata.title).toBe("Website packages and pricing");
  });

  it("make no unevidenced popularity claim", () => {
    const t = pageText(<PackagesPage />);
    expect(t).not.toMatch(/Most chosen/);
    expect(t).toMatch(/Build plus ongoing care/);
  });

  it("compare on Flutterly's own benefits without blanket claims about every platform", () => {
    expect(comparison.rows.map((r) => r.label)).toEqual(
      expect.arrayContaining(["Custom design", "Clear ownership", "Direct support", "Managed updates"])
    );
    const them = comparison.rows.map((r) => r.them).join(" ");
    expect(them).not.toMatch(/slow scores|locked inside|constant patching|Ticket queues/i);
  });
});

describe("Clear Path wording", () => {
  it("drops internal-sounding sales language", () => {
    const t = pageText(<LeavingMswPage />) + JSON.stringify(clearPath);
    [
      /MSW is shutting down\. That.s Clear Path/,
      /SaaS band/,
      /undercut/,
      /Not inventing clinical-system deadlines/,
      /thousands of\s+surgeries/,
    ].forEach((re) => expect(t).not.toMatch(re));
  });

  it("uses the suggested plain wording", () => {
    const t = pageText(<LeavingMswPage />) + JSON.stringify(clearPath);
    expect(t).toMatch(/A clear route from your current MSW website\./);
    expect(t).toMatch(/A custom website migration with ongoing hosting and support\./);
    expect(t).toMatch(/If you only need a low-cost managed template, that may be the better fit\. I can help you compare the options\./);
    expect(t).toMatch(/Check the dates in your own provider letter before planning the move\./);
    expect(t).toMatch(/Explore the live GP sample, read the accessibility statement and ask for an audit of your current site\./);
  });

  it("keeps the published dates unchanged", () => {
    expect(clearPath.dates.map((d) => d.when)).toEqual(["1 September 2026", "31 March 2027", "31 October 2026"]);
  });
});

describe("pricing matched to My Surgery Website", () => {
  /* MSW (FPM Group, G-Cloud 14 pricing, April 2024), 5-year fixed licence:
     £1,000 setup, then Bronze £350/yr, Silver £450/yr. Five-year totals:
     Bronze £2,750, Silver £3,250. Essentials sits against Bronze
     (self-managed), Standard against Silver (changes made for you). */
  const pounds = (s: string) => Number(s.replace(/[^0-9]/g, ""));
  const fiveYears = (p: { price: string; pricePeriod: string }) =>
    pounds(p.price) + 60 * pounds(p.pricePeriod.match(/£(\d+)/)![1]);
  const byName = <T extends { name: string }>(list: readonly T[], name: string) => list.find((p) => p.name === name)!;

  it.each([
    ["Essentials", packages],
    ["Move Essentials", clearPath.packages],
  ] as const)("%s: £999 plus £29 a month, just under MSW Bronze over five years", (name, list) => {
    const p = byName<(typeof list)[number]>(list, name);
    expect(p.price).toBe("£999");
    expect(p.pricePeriod).toMatch(/^\+ £29\/mo(nth)? on a 5-year term$/);
    expect(p.priceNote).toMatch(/^or £49\/mo(nth)? on a 1-year term$/);
    expect(fiveYears(p)).toBe(2739);
    expect(fiveYears(p)).toBeLessThanOrEqual(2750);
  });

  it.each([
    ["Standard", packages],
    ["Move Standard", clearPath.packages],
  ] as const)("%s: £1,499 plus £29 a month, just under MSW Silver over five years", (name, list) => {
    const p = byName<(typeof list)[number]>(list, name);
    expect(p.price).toBe("£1,499");
    expect(p.pricePeriod).toMatch(/^\+ £29\/mo(nth)? on a 5-year term$/);
    expect(p.priceNote).toMatch(/^or £49\/mo(nth)? on a 1-year term$/);
    expect(fiveYears(p)).toBe(3239);
    expect(fiveYears(p)).toBeLessThanOrEqual(3250);
  });

  it("charges the same £29 a month on every priced package", () => {
    [...packages, ...clearPath.packages]
      .filter((p) => p.price !== "Quoted")
      .forEach((p) => expect(p.pricePeriod).toMatch(/£29\//));
  });

  it("keeps Essentials cheaper than Standard in every year", () => {
    const e = byName(packages, "Essentials");
    const s = byName(packages, "Standard");
    expect(pounds(e.price)).toBeLessThan(pounds(s.price));
  });

  it("leaves no year-one or £10 hosting wording on any priced package", () => {
    [...packages, ...clearPath.packages].forEach((p) =>
      expect(JSON.stringify(p)).not.toMatch(/£10\/|year 1|year-one|first year/i)
    );
  });

  it("keeps Partnership quoted", () => {
    expect(byName(packages, "Partnership").price).toBe("Quoted");
  });

  it("states the new prices in the packages metadata and FAQs, with no old figures left", () => {
    const t = String(packagesMetadata.description) + JSON.stringify(packagesFaq);
    expect(t).toMatch(/£999/);
    expect(t).toMatch(/£1,499/);
    expect(t).toMatch(/£29 a month/);
    expect(t).not.toMatch(/£995|£1,490|£1,000|£1,010|£1,510|£310|£10 a month|first year|year-one/);
  });
});

describe("services defined against the price", () => {
  it.each(["Essentials", "Standard", "Move Essentials", "Move Standard"])(
    "%s says what the build delivers and what the monthly fee covers",
    (name) => {
      const p = [...packages, ...clearPath.packages].find((x) => x.name === name)!;
      expect(p.features.length).toBeGreaterThan(0);
      expect(p.monthly?.length ?? 0).toBeGreaterThan(0);
    }
  );

  it("Essentials is self-managed and Standard makes changes for you, as MSW Bronze and Silver do", () => {
    const essentials = packages.find((p) => p.name === "Essentials")!.monthly!.join(" ");
    const standard = packages.find((p) => p.name === "Standard")!.monthly!.join(" ");
    expect(essentials).toMatch(/host(ing|ed)/i);
    expect(essentials).toMatch(/you make your own (content )?changes/i);
    expect(standard).toMatch(/changes made for you/i);
    expect(standard).toMatch(/security updates/i);
  });
});

describe("term options", () => {
  it.each([...packages, ...clearPath.packages].map((p) => [p.name, p] as const))(
    "%s offers a 1-year or a 5-year term",
    (_name, p) => {
      expect(`${p.pricePeriod} ${p.priceNote}`).toMatch(/5-year/);
      expect(`${p.pricePeriod} ${p.priceNote}`).toMatch(/1-year/);
    }
  );

  it("is explained in the FAQs and metadata", () => {
    const faqs = JSON.stringify(packagesFaq);
    expect(faqs).toMatch(/one year at £49 a month, or five years at £29 a month/i);
    expect(String(packagesMetadata.description)).toMatch(/£29 a month on a 5-year term, or £49 a month on a 1-year term/);
    expect(faqs).not.toMatch(/if you ever move on/i);
    expect(faqs).not.toMatch(/minimum term of five years/i);
  });
});

describe("no VAT is charged", () => {
  it("no package, FAQ or packages metadata mentions VAT", () => {
    const t = JSON.stringify([packages, clearPath, packagesFaq]) + String(packagesMetadata.description);
    expect(t).not.toMatch(/\bVAT\b/i);
  });
});

describe("gaps against MSW closed with stated commitments", () => {
  const all = [...packages, ...clearPath.packages].filter((p) => p.monthly);
  const text = (p: { features: readonly string[]; monthly?: readonly string[] }) =>
    [...p.features, ...(p.monthly ?? [])].join(" | ");

  it.each(all.map((p) => [p.name, p] as const))("%s states support, uptime and the host's certifications", (_n, p) => {
    const t = text(p);
    expect(t).toMatch(/Same-week response on support requests/);
    expect(t).toMatch(/99\.9% uptime target/);
    expect(t).toMatch(/Hosted on Vercel \(ISO 27001 certified, SOC 2 Type 2\)/);
  });

  it.each(["Standard", "Move Standard"])("%s states the content-change allowance in hours", (name) => {
    const p = all.find((x) => x.name === name)!;
    expect(text(p)).toMatch(/Content changes made for you, up to 2 hours a month/);
  });

  it.each(["Essentials", "Move Essentials"])("%s links the practice's online consultation tool and NHS services", (name) => {
    const p = all.find((x) => x.name === name)!;
    expect(text(p)).toMatch(/eConsult/);
    expect(text(p)).toMatch(/NHS App/);
    expect(text(p)).toMatch(/NHS\.uk/);
  });

  it("explains forms, NHS content and data protection in the FAQ", () => {
    const faqs = JSON.stringify(packagesFaq);
    expect(faqs).toMatch(/online forms/i);
    expect(faqs).toMatch(/clinical system/i);
    expect(faqs).toMatch(/registered with the ICO/);
  });
});
