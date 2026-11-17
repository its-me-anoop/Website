import React from "react";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { LazyMotion } from "framer-motion";
import domMax from "@/lib/motion-features";
import { clients } from "@/lib/marketing/clients";
import { auditChecks, featuredWork, projects } from "@/lib/marketing/content";
import { services } from "@/lib/marketing/services";
import { Home } from "./Home";
import { pieces, scatterOf } from "./pieces";

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

describe("Home", () => {
  it("renders one hero headline that reads as a sentence", () => {
    renderHome();
    const headings = screen.getAllByRole("heading", { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0].textContent?.replace(/\s+/g, " ").trim()).toBe("Your digital side, sorted.");
    /* The last word is split into letters that sort themselves; the label keeps it one sentence. */
    expect(headings[0]).toHaveAccessibleName("Your digital side, sorted.");
  });

  it("opens on the sorting table: every piece fixed and filed, described once for assistive technology", () => {
    renderHome();
    const hero = document.getElementById("top")!;
    expect(hero).toHaveAttribute("data-state", "sorted");
    const table = within(hero).getByRole("img", { name: /Twelve parts of an organisation's digital side/ });
    expect(table.querySelectorAll(".sort-piece")).toHaveLength(pieces.length);
    pieces.forEach((piece) => expect(within(table).getByText(piece.sorted)).toBeInTheDocument());
  });

  it("flips the table back to how things were found, and sorted again, with one switch", () => {
    renderHome();
    const hero = document.getElementById("top")!;
    const toggle = within(hero).getByRole("switch", { name: "Show everything sorted" });
    expect(toggle).toHaveAttribute("aria-checked", "true");
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-checked", "false");
    expect(hero).toHaveAttribute("data-state", "mess");
    /* The opening animation must not fight the switch once it has been used. */
    expect(hero).not.toHaveAttribute("data-intro");
    fireEvent.click(toggle);
    expect(hero).toHaveAttribute("data-state", "sorted");
  });

  it("scatters the pieces the same way on the server and the client", () => {
    expect(scatterOf(3)).toEqual(scatterOf(3));
    expect(scatterOf(3)).not.toEqual(scatterOf(4));
    pieces.forEach((_, i) => {
      const s = scatterOf(i);
      [s.rx, s.ry, s.rz].forEach((turn) => expect(Math.abs(turn)).toBeLessThanOrEqual(44));
    });
  });

  it("lists all five services as dividers that open their pages", () => {
    renderHome();
    const section = document.getElementById("services")!;
    const rows = within(section).getAllByRole("link");
    expect(rows.map((a) => a.getAttribute("href"))).toEqual(services.map((s) => `/services/${s.slug}`));
    services.forEach((s) => expect(within(section).getByText(s.summary)).toBeInTheDocument());
  });

  it("files each service under its own colour, with its pillar on the tab", () => {
    renderHome();
    const section = document.getElementById("services")!;
    const items = within(section).getAllByRole("listitem");
    expect(items).toHaveLength(services.length);
    const tones = items.map((li) => Array.from(li.classList).find((c) => c.startsWith("tone-")));
    expect(new Set(tones).size).toBe(services.length);
    items.forEach((li, i) => {
      const tab = li.querySelector(".idx-tab")!;
      expect(tab).toHaveTextContent(services[i].pillar);
      expect(tab).toHaveAttribute("aria-hidden", "true");
    });
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

  it("shows every real project as a tile with a real capture", () => {
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

  it("keeps the 3D scenes out of the accessibility tree", () => {
    const { container } = renderHome();
    const scenes = container.querySelectorAll("[data-scene]");
    expect(scenes.length).toBeGreaterThanOrEqual(1);
    scenes.forEach((scene) => expect(scene).toHaveAttribute("aria-hidden", "true"));
  });

  it("lists the seven audit areas beside the exploded page", () => {
    renderHome();
    const audit = document.getElementById("audit")!;
    expect(within(audit).getAllByRole("listitem").map((li) => li.textContent?.replace(/^0\d/, ""))).toEqual(
      auditChecks.map((c) => c.title)
    );
    expect(audit.querySelectorAll(".xray-sheet")).toHaveLength(auditChecks.length);
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
});
