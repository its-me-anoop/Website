import React from "react";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { SectionHeader } from "./SectionHeader";

describe("SectionHeader component", () => {
  it("renders the eyebrow, title and lede", () => {
    render(
      <SectionHeader
        eyebrow="What we build"
        headingId="services-heading"
        title={<>End-to-end product</>}
        lede="Supporting copy."
      />
    );

    expect(screen.getByText("What we build")).toBeInTheDocument();
    expect(screen.getByText("End-to-end product")).toBeInTheDocument();
    expect(screen.getByText("Supporting copy.")).toBeInTheDocument();
  });

  it("links the heading id for aria-labelledby", () => {
    render(<SectionHeader eyebrow="X" title="Title" headingId="my-heading" />);
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toHaveAttribute("id", "my-heading");
  });
});
