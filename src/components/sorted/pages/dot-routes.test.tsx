import React from "react";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import { LazyMotion } from "framer-motion";
import domMax from "@/lib/motion-features";
import { caseStudies } from "@/lib/marketing/case-studies";
import { careSector, gpSector, packages } from "@/lib/marketing/content";
import { services } from "@/lib/marketing/services";
import { BookPage } from "../booking/BookPage";
import { AccessibilityStatement } from "./AccessibilityStatement";
import { AuditLanding } from "./AuditLanding";
import { LeavingMswPage } from "./LeavingMswPage";
import { NotFoundPage } from "./NotFoundPage";
import { PackagesPage } from "./PackagesPage";
import { ProjectPage } from "./ProjectPage";
import { SectorPage } from "./SectorPage";
import { ServicePage } from "./ServicePage";
import { ServicesIndexPage } from "./ServicesIndexPage";

/*
 * The travelling dot's route through each sub page. A route is made of
 * anchors in the markup, so these check the markup: every page gives
 * the dot somewhere to start in sight, things of its own to walk, and
 * something to end on.
 */

vi.mock("next/navigation", () => ({ usePathname: () => "/" }));
vi.mock("@calcom/embed-react", () => ({ default: () => null, getCalApi: async () => () => {} }));

beforeAll(() => {
  vi.stubGlobal(
    "ResizeObserver",
    class {
      observe() {}
      unobserve() {}
      disconnect() {}
    }
  );
});
afterAll(() => vi.unstubAllGlobals());

const page = (ui: React.ReactNode) => render(<LazyMotion features={domMax} strict>{ui}</LazyMotion>).container;

const count = (root: Element, selector: string) => root.querySelectorAll(selector).length;

/** The steps a list offers the dot: its own, not those of a list or card nested in it. */
const stepsOf = (list: Element) =>
  Array.from(list.querySelectorAll("[data-dot-step]")).filter(
    (el) => el.closest('[data-dot="steps"]') === list && !el.parentElement?.closest("[data-dot-step]")
  );

const pages: [string, () => React.ReactNode][] = [
  ["services", () => <ServicesIndexPage />],
  ...services.map((s): [string, () => React.ReactNode] => [`services/${s.slug}`, () => <ServicePage service={s} />]),
  ["packages", () => <PackagesPage />],
  ["gp-websites", () => <SectorPage sector={gpSector} />],
  ["care-home-websites", () => <SectorPage sector={careSector} />],
  ["free-audit", () => <AuditLanding />],
  ["book", () => <BookPage />],
  ["leaving-msw", () => <LeavingMswPage />],
  ...caseStudies.map((c): [string, () => React.ReactNode] => [`projects/${c.slug}`, () => <ProjectPage study={c} />]),
  [
    "accessibility",
    () => <AccessibilityStatement description="About this site." reviewed="September 2026" sections={[{ title: "Scope", body: "All of it." }, { title: "Contact", body: "Write." }]} />,
  ],
];

describe.each(pages)("the dot's route on /%s", (_name, ui) => {
  it("starts on the page's heading, where it can be seen", () => {
    const root = page(ui());
    const start = root.querySelector("#top [data-dot-em], #top .s-eyebrow[data-dot]");
    expect(start).not.toBeNull();
  });

  it("has things of the page's own to walk below the hero, each list with steps to stand on", () => {
    const root = page(ui());
    const lists = Array.from(root.querySelectorAll('main [data-dot="steps"]'));
    lists.forEach((list) => expect(stepsOf(list).length, list.className).toBeGreaterThanOrEqual(1));
    /* A list of steps, or things marked one by one (the services index marks each service's arrow). */
    const singles = Array.from(root.querySelectorAll('main [data-dot="into"], main [data-dot="top"]')).filter((el) => !el.closest("#top, #contact"));
    expect(lists.length + singles.length).toBeGreaterThanOrEqual(1);
  });

  it("ends in the footer's wordmark", () => {
    const root = page(ui());
    expect(count(root, 'footer [data-dot="slot"]')).toBe(1);
  });
});

describe("where the dot takes the eye", () => {
  it("goes into each page's main action, drawn to the closing one from further off", () => {
    const root = page(<ServicePage service={services[0]} />);
    const hero = root.querySelector('#top a[data-dot="into"]')!;
    expect(hero).toHaveAttribute("href", "/book");
    /* The hero's button waits its turn after the headline: no pull. */
    expect(hero).not.toHaveAttribute("data-dot-pull");
    const close = root.querySelector('#contact a[href="/book"]')!;
    expect(close).toHaveAttribute("data-dot", "into");
    expect(Number(close.getAttribute("data-dot-pull"))).toBeGreaterThan(100);
  });

  it("is drawn into the featured package's button, and lands on every package card", () => {
    const root = page(<PackagesPage />);
    const cards = root.querySelector('main ul[data-dot="steps"]')!;
    expect(stepsOf(cards)).toHaveLength(packages.length);
    const featured = packages.find((p) => "featured" in p && p.featured)!;
    const buttons = Array.from(cards.querySelectorAll('a[data-dot="into"]'));
    expect(buttons).toHaveLength(1);
    expect(buttons[0]).toHaveTextContent(featured.cta);
  });

  it("walks a service's inclusions by their numbers and its questions by their buttons", () => {
    const service = services[0];
    const root = page(<ServicePage service={service} />);
    const lists = Array.from(root.querySelectorAll('main [data-dot="steps"]'));
    expect(lists.some((l) => l.tagName === "OL" && stepsOf(l).length === service.includes.length)).toBe(true);
    expect(lists.some((l) => l.querySelector("details") && stepsOf(l).length === service.faqs.length)).toBe(true);
  });

  it("gives the 404 page, which has nothing to walk, its one way back", () => {
    const root = page(<NotFoundPage />);
    expect(root.querySelector('#top a[data-dot="into"]')).toHaveAttribute("href", "/");
    expect(count(root, 'footer [data-dot="slot"]')).toBe(1);
  });
});
