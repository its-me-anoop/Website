import React from "react";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { LazyMotion } from "framer-motion";
import domMax from "@/lib/motion-features";
import { AuroraBackdrop } from "./AuroraBackdrop";
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
  it("duplicates the row for a seamless loop but announces it once", () => {
    const { container } = withMotion(
      <Marquee>
        <span>Pembroke Care</span>
      </Marquee>
    );

    expect(screen.getAllByText("Pembroke Care")).toHaveLength(2);
    expect(container.querySelectorAll("[aria-hidden='true']")).toHaveLength(1);
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
        segments={[{ text: "Live products." }, { text: "Real organisations.", tone: "gradient" }]}
      />
    );

    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toHaveTextContent("Live products. Real organisations.");
  });
});

describe("AuroraBackdrop", () => {
  it("is decorative: hidden from the accessibility tree and untouchable", () => {
    const { container } = render(<AuroraBackdrop />);
    const root = container.firstElementChild!;

    expect(root).toHaveAttribute("aria-hidden");
    expect(root.className).toContain("pointer-events-none");
    expect(root.className).toContain("fixed");
  });
});
