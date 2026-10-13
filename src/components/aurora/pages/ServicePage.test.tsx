import React from "react";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { LazyMotion } from "framer-motion";
import domMax from "@/lib/motion-features";
import { getService, services } from "@/lib/marketing/services";
import { ServicePage } from "./ServicePage";
import { ServicesIndexPage } from "./ServicesIndexPage";

vi.mock("next/navigation", () => ({ usePathname: () => "/services/websites" }));

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

const wrap = (ui: React.ReactNode) => render(<LazyMotion features={domMax} strict>{ui}</LazyMotion>);

describe("ServicePage", () => {
  it.each(services.map((s) => [s.slug, s] as const))("%s renders one h1, every inclusion and every FAQ", (_slug, service) => {
    wrap(<ServicePage service={service} />);
    const h1 = screen.getAllByRole("heading", { level: 1 });
    expect(h1).toHaveLength(1);
    expect(h1[0]).toHaveTextContent(service.heading.emphasis);
    service.includes.forEach((item) => expect(screen.getByRole("heading", { name: item.title })).toBeInTheDocument());
    service.faqs.forEach((faq) => expect(screen.getByText(faq.q)).toBeInTheDocument());
    service.related.forEach((link) =>
      expect(screen.getAllByRole("link", { name: new RegExp(link.label, "i") })[0]).toHaveAttribute("href", link.href)
    );
  });

  it("links to the other four services but not to itself", () => {
    const service = getService("seo")!;
    wrap(<ServicePage service={service} />);
    const others = within(screen.getByRole("navigation", { name: /other services/i })).getAllByRole("link");
    expect(others.map((a) => a.getAttribute("href"))).toEqual([
      "/services/websites",
      "/services/apps",
      "/services/it-support",
      "/services/social-media",
    ]);
  });

  it("offers a booking call and the free audit", () => {
    wrap(<ServicePage service={getService("apps")!} />);
    expect(screen.getAllByRole("link", { name: /book a call/i })[0]).toHaveAttribute("href", "/book");
    expect(screen.getAllByRole("textbox", { name: /your website address/i }).length).toBeGreaterThan(0);
  });

  it("shows the five sample sites as tabs on the websites page only", () => {
    const { unmount } = wrap(<ServicePage service={getService("websites")!} />);
    expect(within(screen.getByRole("tablist", { name: /sample sites by sector/i })).getAllByRole("tab")).toHaveLength(5);
    unmount();
    wrap(<ServicePage service={getService("it-support")!} />);
    expect(screen.queryByRole("tablist")).toBeNull();
  });
});

describe("ServicesIndexPage", () => {
  it("lists every service under its pillar and links to its page", () => {
    wrap(<ServicesIndexPage />);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    ["Build", "Support", "Grow"].forEach((pillar) =>
      expect(screen.getByRole("heading", { level: 2, name: new RegExp(`^${pillar}`) })).toBeInTheDocument()
    );
    services.forEach((s) => {
      const links = screen.getAllByRole("link").filter((a) => a.getAttribute("href") === `/services/${s.slug}`);
      expect(links.length).toBeGreaterThan(0);
    });
  });
});
