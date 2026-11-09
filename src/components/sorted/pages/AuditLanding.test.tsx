import React from "react";
import { describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import { LazyMotion } from "framer-motion";
import domMax from "@/lib/motion-features";
import { AuditLanding } from "./AuditLanding";
import { metadata } from "@/app/free-audit/page";

vi.mock("next/navigation", () => ({ usePathname: () => "/free-audit", useRouter: () => ({ push: vi.fn() }) }));

const text = () =>
  render(
    <LazyMotion features={domMax} strict>
      <AuditLanding />
    </LazyMotion>
  ).container.textContent ?? "";

describe("AuditLanding", () => {
  it("positions the audit for any organisation, with healthcare as an extra", () => {
    const t = text();
    expect(t).not.toMatch(/what patients and families feel first/);
    expect(t).not.toMatch(/every NHS-facing site is held to/);
    expect(t).toMatch(/help visitors find what they need and take the next step/);
    expect(t).toMatch(/For healthcare websites, the written review can also consider relevant NHS and CQC guidance/);
  });

  it("labels the healthcare-only sector checks honestly", () => {
    const t = text();
    expect(t).not.toMatch(/Sector-aware: GP, care home, dental, pharmacy, physio/);
    expect(t).toMatch(/General checks for any website/);
    expect(t).toMatch(/extra content checks for GP, care home, dental, pharmacy and physio sites/i);
  });

  it("describes where the audit runs and what is kept accurately", () => {
    const t = text();
    expect(t).not.toMatch(/in your browser/);
    expect(t).not.toMatch(/nothing stored/i);
  });

  it("has a broad meta description", () => {
    expect(metadata.description).toBe(
      "Get a free website review from Flutterly: accessibility, speed, search, content, mobile experience, security and local presence, with clear fixes to consider."
    );
  });
});
