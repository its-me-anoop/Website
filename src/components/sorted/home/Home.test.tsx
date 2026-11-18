import React from "react";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
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

  it("opens on the sticker wall as it was found, described once for assistive technology", () => {
    renderHome();
    const hero = document.getElementById("top")!;
    expect(hero).toHaveAttribute("data-state", "mess");
    const table = within(hero).getByRole("img", { name: /Twelve parts of an organisation's digital side/ });
    expect(table.querySelectorAll(".sort-piece")).toHaveLength(pieces.length);
    /* Both the problem and the fix are in the markup; CSS shows the one the scroll has reached. */
    pieces.forEach((piece) => {
      expect(within(table).getByText(piece.found)).toBeInTheDocument();
      expect(within(table).getByText(piece.sorted)).toBeInTheDocument();
    });
  });

  it("lets the scroll play the scene: no switch, one number for CSS to read, and a room that can hold", () => {
    renderHome();
    const hero = document.getElementById("top")!;
    expect(within(hero).queryByRole("switch")).toBeNull();
    expect(hero.style.getPropertyValue("--q")).toBe("0");
    expect(hero.style.getPropertyValue("--count")).toBe(String(pieces.length));
    expect(hero).toHaveAttribute("data-pin");
    expect(hero.querySelector(".hero-pin")).not.toBeNull();
    /* Each sticker knows its place in the order the dot visits them. */
    const order = Array.from(hero.querySelectorAll<HTMLElement>(".sort-piece"), (el) => el.style.getPropertyValue("--n"));
    expect(order).toEqual(pieces.map((_, i) => String(i)));
  });

  it("gives the travelling dot a place to start, in the headline, and one to end, in the footer's wordmark", () => {
    const { container } = renderHome();
    const slots = container.querySelectorAll('[data-dot="slot"]');
    expect(slots).toHaveLength(2);
    expect(document.getElementById("hero-title")).toContainElement(slots[0] as HTMLElement);
    expect(container.querySelector("footer")).toContainElement(slots[1] as HTMLElement);
    slots.forEach((slot) => expect(slot).toHaveAttribute("aria-hidden", "true"));
  });

  it("marks something for the dot to land on in every room", () => {
    renderHome();
    ["top", "clients", "services", "work", "audit", "studio", "process", "contact"].forEach((id) =>
      expect(document.getElementById(id)!.querySelector("[data-dot]"), `#${id}`).not.toBeNull()
    );
    expect(document.getElementById("work")!.querySelectorAll("[data-dot-step]")).toHaveLength(featuredWork.length);
  });

  it("scatters the pieces the same way on the server and the client", () => {
    expect(scatterOf(3)).toEqual(scatterOf(3));
    expect(scatterOf(3)).not.toEqual(scatterOf(4));
    pieces.forEach((_, i) => {
      const s = scatterOf(i);
      [s.rx, s.ry, s.rz].forEach((turn) => expect(Math.abs(turn)).toBeLessThanOrEqual(44));
    });
  });

  it("lists all five services as rows that open their pages", () => {
    renderHome();
    const section = document.getElementById("services")!;
    const rows = within(section).getAllByRole("link");
    expect(rows.map((a) => a.getAttribute("href"))).toEqual(services.map((s) => `/services/${s.slug}`));
    services.forEach((s) => expect(within(section).getByText(s.summary)).toBeInTheDocument());
  });

  it("files each service under its own colour, with its pillar typed beside it", () => {
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

  it("keeps the decorative scenes out of the accessibility tree", () => {
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

  it("walks through eight rooms, each wall with the floor it ends on", () => {
    renderHome();
    const room = (id: string) => {
      const el = document.getElementById(id)!;
      return [Array.from(el.classList).find((c) => c.startsWith("tone-")), el.querySelector("[data-floor]")?.getAttribute("data-floor")];
    };
    expect(room("top")).toEqual(["tone-cobalt", "paper"]);
    expect(room("clients")).toEqual(["tone-chalk", undefined]);
    expect(room("services")).toEqual(["tone-navy", "pink"]);
    expect(room("work")).toEqual(["tone-ochre", "bottle"]);
    expect(room("audit")).toEqual(["tone-sky", "tomato"]);
    expect(room("studio")).toEqual(["tone-sun", "paper"]);
    expect(room("process")).toEqual(["tone-jade", "tomato"]);
    expect(room("contact")).toEqual(["tone-flame", "cobalt"]);
  });

  it("types the studio's three lines on the hero's floor, where a screen reader can read them", () => {
    renderHome();
    const floor = document.getElementById("top")!.querySelector("[data-floor]")!;
    expect(floor).not.toHaveAttribute("aria-hidden");
    expect(within(floor as HTMLElement).getAllByRole("listitem")).toHaveLength(3);
    expect(within(floor as HTMLElement).getByRole("link", { name: "Scroll to clients" })).toHaveAttribute("href", "#clients");
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
