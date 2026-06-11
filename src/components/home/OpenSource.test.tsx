import React from "react";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { OpenSource } from "./OpenSource";
import { site } from "@/lib/site";

describe("OpenSource (aurora)", () => {
  it("renders the section heading", () => {
    render(<OpenSource />);
    expect(
      screen.getByRole("heading", { level: 2, name: /some of it/i })
    ).toBeInTheDocument();
  });

  it("links the GitHub profile", () => {
    render(<OpenSource />);
    expect(
      screen.getByRole("link", { name: new RegExp(site.social.githubHandle) })
    ).toHaveAttribute("href", site.social.github);
  });

  it("links all four repos to GitHub", () => {
    render(<OpenSource />);
    for (const repo of [
      "hydration-engine",
      "nextjs-seo-kit",
      "gesture-lab",
      "friday-ship",
    ]) {
      const link = screen.getByRole("link", { name: new RegExp(repo) });
      expect(link).toHaveAttribute("href", `${site.social.github}/${repo}`);
      expect(link).toHaveAttribute("target", "_blank");
    }
  });
});
