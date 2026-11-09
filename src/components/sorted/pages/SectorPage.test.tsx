import React from "react";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { LazyMotion } from "framer-motion";
import domMax from "@/lib/motion-features";
import { careSector, gpSector } from "@/lib/marketing/content";
import { SectorPage } from "./SectorPage";

vi.mock("next/navigation", () => ({ usePathname: () => "/gp-websites" }));

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

describe.each([gpSector, careSector])("SectorPage ($slug)", (sector) => {
  function renderPage() {
    return render(
      <LazyMotion features={domMax} strict>
        <SectorPage sector={sector} />
      </LazyMotion>
    );
  }

  it("leads with the sector headline as the only h1", () => {
    renderPage();
    const h1s = screen.getAllByRole("heading", { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(h1s[0]).toHaveTextContent(sector.headline);
  });

  it("sends visitors to the audit and the hosted sample", () => {
    renderPage();
    const hrefs = screen.getAllByRole("link").map((a) => a.getAttribute("href"));
    expect(hrefs).toContain("/free-audit");
    expect(hrefs).toContain(sector.demo.href);
  });

  it("lists every feature, standard, inclusion and question", () => {
    const { container } = renderPage();
    sector.features.forEach((f) => expect(screen.getByRole("heading", { name: f.title })).toBeInTheDocument());
    sector.compliance.points.forEach((p) => expect(screen.getByText(p)).toBeInTheDocument());
    sector.included.forEach((p) => expect(screen.getByText(p)).toBeInTheDocument());
    expect(container.querySelectorAll("details")).toHaveLength(sector.faqs.length);
  });
});
