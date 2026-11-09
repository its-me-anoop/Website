import React from "react";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { LazyMotion } from "framer-motion";
import domMax from "@/lib/motion-features";
import { ProductShell } from "./ProductShell";
import { SipliLanding } from "@/components/projects/sipli/SipliLanding";
import { ArtlingLanding } from "@/components/projects/artling/ArtlingLanding";
import { LittleLifelineLanding } from "@/components/projects/little-lifeline/LittleLifelineLanding";
import SipliPrivacyPolicy from "@/app/projects/sipli/privacy-policy/page";
import ArtlingPrivacyPolicyPage from "@/app/projects/artling/privacy-policy/page";

vi.mock("next/navigation", () => ({ usePathname: () => "/projects/sipli" }));

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

const withMotion = (ui: React.ReactNode) =>
  render(
    <LazyMotion features={domMax} strict>
      {ui}
    </LazyMotion>
  );

describe("ProductShell", () => {
  it("puts the Flutterly company identity in the primary brand position", () => {
    withMotion(
      <ProductShell mainClassName="sipli-theme">
        <h1>Product</h1>
      </ProductShell>
    );
    expect(screen.getByRole("link", { name: "Flutterly home" })).toHaveAttribute("href", "/");
    expect(screen.queryByRole("link", { name: /Anoop Jose — home/i })).not.toBeInTheDocument();
    const primary = screen.getByRole("navigation", { name: "Primary" });
    expect(within(primary).getByRole("link", { name: "Services" })).toBeInTheDocument();
    expect(within(primary).queryByRole("link", { name: "Process" })).not.toBeInTheDocument();
  });

  it("wraps the page in a single #main landmark with the product theme", () => {
    withMotion(
      <ProductShell mainClassName="sipli-theme">
        <h1>Product</h1>
      </ProductShell>
    );
    const main = screen.getByRole("main");
    expect(main).toHaveAttribute("id", "main");
    expect(main).toHaveClass("sipli-theme");
    expect(within(main).queryByRole("banner")).toBeNull();
  });

  it("uses the company footer and keeps the founder credit out of the brand slot", () => {
    withMotion(
      <ProductShell>
        <h1>Product</h1>
      </ProductShell>
    );
    const footer = screen.getByRole("contentinfo");
    expect(within(footer).getByRole("navigation", { name: "Footer" })).toBeInTheDocument();
    expect(within(footer).queryByText(/Developer & designer crafting/i)).toBeNull();
    expect(within(footer).getByText(/Designed and built by Anoop Jose/i)).toBeInTheDocument();
  });
});

describe.each([
  ["Sipli", () => <SipliLanding />],
  ["Little Artist", () => <ArtlingLanding />],
  ["Little Lifeline", () => <LittleLifelineLanding />],
  ["Sipli privacy policy", () => <SipliPrivacyPolicy />],
  ["Little Artist privacy policy", () => <ArtlingPrivacyPolicyPage />],
])("%s page", (_name, Page) => {
  it("renders the current Flutterly shell, not the old personal brand", () => {
    withMotion(<Page />);
    expect(screen.getByRole("link", { name: "Flutterly home" })).toBeInTheDocument();
    expect(screen.queryByText("Anoop Jose", { selector: "a" })).toBeNull();
    expect(screen.getByRole("main")).toHaveAttribute("id", "main");
  });
});
