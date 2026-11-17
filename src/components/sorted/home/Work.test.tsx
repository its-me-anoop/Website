import React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { featuredWork } from "@/lib/marketing/content";
import { Work } from "./Work";

describe("portfolio filters", () => {
  it("keeps each featured project available across categories and restores the full index", () => {
    render(<Work />);
    const articleTitles = () => screen.getAllByRole("article").map((card) => within(card).getByRole("heading").textContent);
    for (const category of ["Websites", "Apps", "All"]) {
      const button = screen.getByRole("button", { name: category });
      fireEvent.click(button);
      const projects = featuredWork.filter((project) =>
        category === "All" || (category === "Websites" ? project.kind === "Website" : project.kind !== "Website")
      );
      expect(button).toHaveAttribute("aria-pressed", "true");
      expect(articleTitles()).toEqual(projects.map((project) => project.title));
      expect(screen.getByText(`${projects.length} projects shown`)).toBeInTheDocument();
    }
  });
});
