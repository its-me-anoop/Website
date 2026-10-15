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
  ] as const)("%s: £1,010 plus £29 a month, exactly MSW Bronze over five years", (name, list) => {
    const p = byName<(typeof list)[number]>(list, name);
    expect(p.price).toBe("£1,010");
    expect(p.pricePeriod).toMatch(/^\+ £29\/mo(nth)? \+ VAT$/);
    expect(fiveYears(p)).toBe(2750);
  });

  it.each([
    ["Standard", packages],
    ["Move Standard", clearPath.packages],
  ] as const)("%s: £1,510 plus £29 a month, exactly MSW Silver over five years", (name, list) => {
    const p = byName<(typeof list)[number]>(list, name);
    expect(p.price).toBe("£1,510");
    expect(p.pricePeriod).toMatch(/^\+ £29\/mo(nth)? \+ VAT$/);
    expect(fiveYears(p)).toBe(3250);
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
    expect(t).toMatch(/£1,010/);
    expect(t).toMatch(/£1,510/);
    expect(t).toMatch(/£29 a month/);
    expect(t).not.toMatch(/£995|£1,490|£1,000|£310|£49|£10 a month|first year|year-one/);
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
    expect(essentials).toMatch(/hosting/i);
    expect(essentials).toMatch(/you make your own (content )?changes/i);
    expect(standard).toMatch(/changes made for you/i);
    expect(standard).toMatch(/security updates/i);
  });
});

describe("five-year minimum term", () => {
  it.each([...packages, ...clearPath.packages].map((p) => [p.name, p] as const))(
    "%s states the 5-year minimum term on its card",
    (_name, p) => {
      expect(p.priceNote).toBe("Minimum 5-year term");
    }
  );

  it("is explained in the FAQs and metadata, and nothing implies leaving early", () => {
    const faqs = JSON.stringify(packagesFaq);
    expect(faqs).toMatch(/minimum term of five years/i);
    expect(String(packagesMetadata.description)).toMatch(/5-year minimum term/);
    expect(faqs).not.toMatch(/if you ever move on/i);
  });
});
