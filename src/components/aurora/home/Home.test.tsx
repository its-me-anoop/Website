import React from "react";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { LazyMotion } from "framer-motion";
import domMax from "@/lib/motion-features";
import { clients } from "@/lib/marketing/clients";
import { featuredWork, projects } from "@/lib/marketing/content";
import { services } from "@/lib/marketing/services";
import { Home } from "./Home";

vi.mock("next/navigation", () => ({ usePathname: () => "/" }));

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

function renderHome() {
  return render(
    <LazyMotion features={domMax} strict>
      <Home />
    </LazyMotion>
  );
}

function linksTo(href: string) {
  return screen.getAllByRole("link").filter((a) => a.getAttribute("href") === href);
}

describe("Home (rebrand)", () => {
  it("renders one hero headline that reads as a sentence", () => {
    renderHome();
    const headings = screen.getAllByRole("heading", { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0].textContent?.replace(/\s+/g, " ").trim()).toBe("Your digital side, sorted.");
  });

  it("uses the real Flutterly butterfly in the hero", () => {
    renderHome();
    const logo = screen.getByRole("img", { name: "The Flutterly butterfly" });
    expect(decodeURIComponent(logo.getAttribute("src") ?? "")).toContain("/flutterly-logo.png");
  });

  it("lists all five services as rows that open their pages", () => {
    renderHome();
    const section = document.getElementById("services")!;
    const rows = within(section).getAllByRole("link");
    expect(rows.map((a) => a.getAttribute("href"))).toEqual(services.map((s) => `/services/${s.slug}`));
    services.forEach((s) => expect(within(section).getByText(s.summary)).toBeInTheDocument());
  });

  it("labels the custom cursor for every service row and primary action", () => {
    renderHome();
    const section = document.getElementById("services")!;
    within(section)
      .getAllByRole("link")
      .forEach((a) => expect(a.dataset.cursor).toMatch(/^Talk /));
    linksTo("/book").forEach((a) => expect(a.dataset.cursor ?? "Book a call").toBeTruthy());
  });

  it("exposes primary navigation with services, work and healthcare", () => {
    renderHome();
    expect(screen.getByRole("navigation", { name: /primary/i })).toBeInTheDocument();
    ["/services", "/#work", "/gp-websites"].forEach((href) => expect(linksTo(href).length).toBeGreaterThan(0));
  });

  it("links to the booking page from the nav, hero and close", () => {
    renderHome();
    expect(linksTo("/book").length).toBeGreaterThanOrEqual(3);
    expect(screen.getByRole("link", { name: /Book a 15-minute call/i })).toHaveAttribute("href", "/book");
  });

  it("keeps the free website audit as a GET form to /audit", () => {
    renderHome();
    const inputs = screen.getAllByRole("textbox", { name: /your website address/i });
    expect(inputs.length).toBeGreaterThanOrEqual(1);
    inputs.forEach((input) => {
      const form = input.closest("form");
      expect(form).toHaveAttribute("action", "/audit");
      expect(form?.getAttribute("method")?.toLowerCase()).toBe("get");
    });
  });

  it("keeps the sample sites out of the work section", () => {
    renderHome();
    const work = document.getElementById("work")!;
    within(work)
      .getAllByRole("link")
      .forEach((a) => expect(a.getAttribute("href")).not.toMatch(/^\/demo\//));
    expect(within(work).queryByText(/sample site/i)).toBeNull();
  });

  it("keeps every real project and its capture in the showroom", () => {
    renderHome();
    const work = document.getElementById("work")!;
    const tiles = work.querySelectorAll("article[data-project-card]");
    expect(Array.from(tiles, (t) => t.querySelector("h3")?.textContent)).toEqual(featuredWork.map((t) => t.title));
    expect(featuredWork.map((t) => t.project).sort()).toEqual(projects.map((p) => p.name).sort());
    tiles.forEach((tile) => expect(tile.querySelector("img")).not.toBeNull());
  });

  it("shows every project once, case studies internally and client sites in a new tab", () => {
    const { container } = renderHome();
    expect(container.querySelectorAll("[data-project-card]")).toHaveLength(projects.length);
    ["/projects/sipli", "/projects/artling", "/projects/little-lifeline"].forEach((href) =>
      expect(linksTo(href).length).toBeGreaterThan(0)
    );
    const external = screen
      .getAllByRole("link")
      .filter((a) => /pembrokecare\.com|greenmead\.co\.uk|sandbournecare|jjpaperessential/.test(a.getAttribute("href") ?? ""));
    expect(external.length).toBeGreaterThanOrEqual(4);
    external.forEach((a) => {
      expect(a).toHaveAttribute("target", "_blank");
      expect(a.getAttribute("rel")).toContain("noopener");
    });
  });

  it("switches project evidence and relevant service links with keyboard navigation", () => {
    renderHome();
    const work = within(document.getElementById("work")!);
    const tabs = work.getAllByRole("tab");
    expect(work.getByRole("tabpanel")).toHaveAttribute("id", "work-panel-pembroke");
    fireEvent.click(tabs[1]);
    expect(tabs[1]).toHaveAttribute("aria-selected", "true");
    expect(work.getByRole("tabpanel")).toHaveTextContent("Sipli");
    expect(work.getByRole("link", { name: "Explore app services" })).toHaveAttribute("href", "/services/apps");
    fireEvent.keyDown(tabs[1], { key: "End" });
    expect(tabs[6]).toHaveFocus();
    expect(work.getByRole("tabpanel")).toHaveTextContent("JJ Paper Essentials");
    fireEvent.keyDown(tabs[6], { key: "ArrowRight" });
    expect(tabs[0]).toHaveFocus();
    expect(work.getByRole("link", { name: "Explore website services" })).toHaveAttribute("href", "/services/websites");
    expect(work.getAllByRole("tabpanel")).toHaveLength(1);
  });

  it("shows every client by name, with their real logo where one is on file", () => {
    renderHome();
    const section = document.getElementById("clients")!;
    expect(within(section).getByRole("heading", { level: 2 })).toBeInTheDocument();
    const logos = within(section).getAllByRole("img");
    expect(logos.map((img) => img.getAttribute("aria-label"))).toEqual(
      clients.filter((c) => c.logo).map((c) => c.name)
    );
    logos.forEach((img) => expect(img.dataset.clientLogo).toMatch(/^\/clients\//));
    const names = within(section)
      .getAllByRole("listitem")
      .map((li) => li.querySelector("[role=img]")?.getAttribute("aria-label") ?? li.textContent);
    expect(names).toEqual(clients.map((c) => c.name));
  });

  it("sets clients without a logo file as a typeset wordmark", () => {
    renderHome();
    const section = document.getElementById("clients")!;
    const wordmarks = section.querySelectorAll("[data-client-wordmark]");
    expect(Array.from(wordmarks, (el) => el.textContent)).toEqual(clients.filter((c) => !c.logo).map((c) => c.name));
  });

  it("opens client sites in a new tab", () => {
    renderHome();
    const section = document.getElementById("clients")!;
    const links = within(section).getAllByRole("link");
    expect(links.length).toBe(clients.filter((c) => c.href).length);
    links.forEach((a) => {
      expect(a).toHaveAttribute("target", "_blank");
      expect(a.getAttribute("rel")).toContain("noopener");
    });
  });

  it("builds media from wireframes that stay out of the accessibility tree", () => {
    const { container } = renderHome();
    const marks = container.querySelectorAll("[data-wireframe]");
    expect(marks.length).toBeGreaterThanOrEqual(1);
    marks.forEach((mark) => expect(mark).toHaveAttribute("aria-hidden", "true"));
  });

  it("introduces the founder with a real portrait", () => {
    renderHome();
    const studio = document.getElementById("studio")!;
    expect(within(studio).getByRole("heading", { level: 2 })).toHaveTextContent("The person you brief is the person who builds.");
    expect(within(studio).getByRole("img", { name: /Anoop Jose, founder of Flutterly/ })).toBeInTheDocument();
  });

  it("renders the four process steps and the footer contact details", () => {
    renderHome();
    ["Call", "Plan", "Build", "Look after"].forEach((step) =>
      expect(screen.getByRole("heading", { level: 3, name: step })).toBeInTheDocument()
    );
    expect(screen.getAllByText(new RegExp(`© ${new Date().getFullYear()}`)).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: /anoop@flutterly\.co\.uk/i }).length).toBeGreaterThan(0);
  });

  it("plays the intro curtain once, hidden from assistive technology", async () => {
    vi.resetModules();
    const { Hero } = await import("./Hero");
    const first = render(<Hero />);
    const curtain = first.container.querySelector("[data-fx-curtain]");
    expect(curtain).toHaveAttribute("aria-hidden", "true");
    expect(first.container.querySelector("#top")).not.toHaveClass("fx-quick");
    first.unmount();
    const again = render(<Hero />);
    expect(again.container.querySelector("[data-fx-curtain]")).toBeNull();
    expect(again.container.querySelector("#top")).toHaveClass("fx-quick");
  });
});
