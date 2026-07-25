import React from "react";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { LazyMotion } from "framer-motion";
import domMax from "@/lib/motion-features";
import { PaperField } from "./PaperField";
import { CountUp } from "./CountUp";
import { Marquee } from "./Marquee";
import { Reveal, TextReveal } from "./Reveal";

function withMotion(ui: React.ReactNode) {
  return render(
    <LazyMotion features={domMax} strict>
      {ui}
    </LazyMotion>
  );
}

describe("CountUp", () => {
  it("passes through a value that does not open with digits", () => {
    withMotion(<CountUp value="WCAG 2.2 AA" />);
    expect(screen.getByText("WCAG 2.2 AA")).toBeInTheDocument();
  });

  it("always exposes the final value to assistive technology", () => {
    const { container } = withMotion(<CountUp value="100%" />);
    expect(container.querySelector("[aria-label='100%']")).toBeInTheDocument();
    /* The counting digits themselves are decorative — the label carries
       the meaning, so the animated span must stay hidden. */
    expect(container.querySelector("[aria-hidden]")).toBeInTheDocument();
  });
});

describe("Marquee", () => {
  /* Asserted as a contract rather than a copy count: how many copies it
     takes to keep a full-bleed band full depends on the widest display
     worth covering, so the number is free to change. What must not
     change is that the row repeats, and that assistive tech hears the
     list exactly once. */
  it("repeats the row for a seamless loop but announces it once", () => {
    const { container } = withMotion(
      <Marquee>
        <span>Pembroke Care</span>
      </Marquee>
    );

    const copies = screen.getAllByText("Pembroke Care").length;
    expect(copies).toBeGreaterThanOrEqual(2);
    expect(container.querySelectorAll("[aria-hidden='true']")).toHaveLength(
      copies - 1
    );
  });
});

describe("Reveal", () => {
  it("renders its children rather than gating them behind the animation", () => {
    withMotion(
      <Reveal>
        <p>Evidence over promises</p>
      </Reveal>
    );
    expect(screen.getByText("Evidence over promises")).toBeInTheDocument();
  });
});

describe("TextReveal", () => {
  it("keeps the full heading readable once split into words", () => {
    withMotion(
      <TextReveal
        as="h2"
        segments={[{ text: "Live products." }, { text: "Real organisations.", tone: "accent" }]}
      />
    );

    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toHaveTextContent("Live products. Real organisations.");
  });
});

describe("PaperField", () => {
  it("is decorative: hidden from the accessibility tree and untouchable", () => {
    const { container } = render(<PaperField />);
    const root = container.firstElementChild!;

    expect(root).toHaveAttribute("aria-hidden");
    expect(root.className).toContain("pointer-events-none");
    expect(root.className).toContain("fixed");
  });
});
