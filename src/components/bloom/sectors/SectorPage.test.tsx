import React from "react";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { LazyMotion } from "framer-motion";
import domMax from "@/lib/motion-features";
import { gpSector, careSector } from "../data";
import { SectorPage } from "./SectorPage";

function renderSector(sector: typeof gpSector) {
  return render(
    <LazyMotion features={domMax} strict>
      <SectorPage sector={sector} />
    </LazyMotion>
  );
}

describe("SectorPage", () => {
  it("renders the GP sector with a link to the hosted sample site", () => {
    renderSector(gpSector);

    expect(
      screen.getByRole("heading", { level: 1, name: gpSector.headline })
    ).toBeInTheDocument();

    const demoLinks = screen
      .getAllByRole("link")
      .filter((a) => a.getAttribute("href") === "/demo/gp-practice");
    expect(demoLinks.length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Willowbrook Surgery/).length).toBeGreaterThan(0);
  });

  it("renders the care sector with a link to the hosted sample site", () => {
    renderSector(careSector);

    const demoLinks = screen
      .getAllByRole("link")
      .filter((a) => a.getAttribute("href") === "/demo/care-home");
    expect(demoLinks.length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Oakfield House/).length).toBeGreaterThan(0);
  });
});
