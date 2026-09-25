import React from "react";
import { describe, expect, it, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { careSector, gpSector, samples } from "@/lib/marketing/content";
import { SectorPage } from "./SectorPage";

vi.mock("next/navigation", () => ({ usePathname: () => "/gp-websites" }));

describe.each([gpSector, careSector])("SectorPage ($slug)", (sector) => {
  const sample = samples.find((s) => s.href === sector.demo.href)!;

  it("leads with the sector headline as the only h1", () => {
    render(<SectorPage sector={sector} />);
    const h1s = screen.getAllByRole("heading", { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(h1s[0]).toHaveTextContent(sector.headline);
  });

  it("sends visitors to the audit and the hosted sample", () => {
    render(<SectorPage sector={sector} />);
    const hrefs = screen.getAllByRole("link").map((a) => a.getAttribute("href"));
    expect(hrefs).toContain("/free-audit");
    expect(hrefs).toContain(sector.demo.href);
    expect(hrefs).toContain(sector.demo.innerPath);
  });

  it("signposts the sample's own pages from the hero", () => {
    render(<SectorPage sector={sector} />);
    const post = screen.getByRole("list", { name: new RegExp(`pages on the ${sample.name} sample site`, "i") });
    const arms = within(post).getAllByRole("link");
    expect(arms.map((a) => a.getAttribute("href"))).toEqual(sample.routes.map((r) => r.href));
  });

  it("lists every feature, standard, inclusion and question", () => {
    const { container } = render(<SectorPage sector={sector} />);
    sector.features.forEach((f) => expect(screen.getByRole("heading", { name: f.title })).toBeInTheDocument());
    sector.compliance.points.forEach((p) => expect(screen.getByText(p)).toBeInTheDocument());
    sector.included.forEach((p) => expect(screen.getByText(p)).toBeInTheDocument());
    expect(container.querySelectorAll("details")).toHaveLength(sector.faqs.length);
  });
});
