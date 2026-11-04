import React from "react";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { LazyMotion } from "framer-motion";
import domMax from "@/lib/motion-features";
import { streetcrew, type StreetCrewContent } from "@/lib/projects/streetcrew";
import { StreetCrewLanding } from "./StreetCrewLanding";

vi.mock("next/navigation", () => ({ usePathname: () => "/projects/streetcrew" }));

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

function renderPage(content?: StreetCrewContent) {
  return render(
    <LazyMotion features={domMax} strict>
      <StreetCrewLanding content={content} />
    </LazyMotion>
  );
}

describe("StreetCrewLanding", () => {
  it("has a single h1 about exploring streets", () => {
    renderPage();
    const h1 = screen.getAllByRole("heading", { level: 1 });
    expect(h1).toHaveLength(1);
    expect(h1[0].textContent).toMatch(/street/i);
  });

  it("says the app is coming soon and offers no dead store link before launch", () => {
    renderPage();
    expect(screen.getAllByText(/coming soon to the App Store/i).length).toBeGreaterThan(0);
    expect(screen.queryByRole("link", { name: /Download StreetCrew on the App Store/i })).toBeNull();
  });

  it("links to the App Store safely once a listing exists", () => {
    const url = "https://apps.apple.com/gb/app/streetcrew/id123";
    renderPage({ ...streetcrew, appStoreUrl: url });
    const links = screen.getAllByRole("link", { name: /Download StreetCrew on the App Store/i });
    expect(links.length).toBeGreaterThan(0);
    links.forEach((a) => {
      expect(a).toHaveAttribute("href", url);
      expect(a).toHaveAttribute("target", "_blank");
      expect(a.getAttribute("rel")).toContain("noopener");
    });
    expect(screen.queryByText(/coming soon to the App Store/i)).toBeNull();
  });

  it("shows every feature group from the listing", () => {
    renderPage();
    const features = document.getElementById("features")!;
    streetcrew.featureGroups.forEach((g) =>
      expect(within(features).getByRole("heading", { name: g.title })).toBeInTheDocument()
    );
  });

  it("links to the published privacy policy in a new tab", () => {
    renderPage();
    const policy = screen.getAllByRole("link", { name: /privacy policy/i });
    expect(policy.some((a) => a.getAttribute("href") === streetcrew.links.privacy)).toBe(true);
    policy.forEach((a) => expect(a.getAttribute("rel")).toContain("noopener"));
  });

  it("states the privacy facts", () => {
    renderPage();
    expect(screen.getAllByText(/no account/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/stay on your device/i).length).toBeGreaterThan(0);
  });

  it("shows the real App Store screenshots and no drawn stand-ins", () => {
    renderPage();
    streetcrew.screenshots.forEach((shot) => {
      const imgs = screen.getAllByAltText(shot.alt);
      imgs.forEach((img) => expect(decodeURIComponent(img.getAttribute("src") ?? "")).toContain(shot.src));
    });
    expect(screen.getAllByAltText(/StreetCrew app icon/i).length).toBeGreaterThan(0);
    expect(document.querySelector("svg[data-explored-map]")).toBeNull();
  });

  it("credits the build to Flutterly with a link to app services", () => {
    renderPage();
    expect(screen.getAllByRole("link", { name: /app/i }).some((a) => a.getAttribute("href") === "/services/apps")).toBe(true);
  });
});
