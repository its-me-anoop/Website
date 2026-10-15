import React from "react";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import { LazyMotion } from "framer-motion";
import domMax from "@/lib/motion-features";
import { clearPath, comparison, packages } from "./content";
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
      "For a small business or organisation that needs a clear, accessible website without ongoing extras."
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

  it("keeps the published prices and dates unchanged", () => {
    expect(clearPath.packages.map((p) => p.price)).toEqual(["£995", "£1,490"]);
    expect(clearPath.dates.map((d) => d.when)).toEqual(["1 September 2026", "31 March 2027", "31 October 2026"]);
  });
});
