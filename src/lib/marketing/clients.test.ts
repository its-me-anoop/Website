import { existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { clients } from "./clients";

describe("clients", () => {
  it("lists Anoop's five clients in his order", () => {
    expect(clients.map((c) => c.name)).toEqual([
      "Pembroke Care",
      "Sandbourne Care",
      "Montis Care",
      "20X",
      "Goodwill Dairy",
    ]);
  });

  it("points every logo at a file that ships in public/", () => {
    clients.forEach((client) => {
      if (!client.logo) return;
      expect(client.logo.src).toMatch(/^\/clients\//);
      expect(existsSync(path.join(process.cwd(), "public", client.logo.src))).toBe(true);
    });
  });

  it("gives every logo a positive size so the strip never reflows", () => {
    clients.forEach((client) => {
      if (!client.logo) return;
      expect(client.logo.width).toBeGreaterThan(0);
      expect(client.logo.height).toBeGreaterThan(0);
      expect(client.logo.displayHeight).toBeGreaterThan(0);
    });
  });

  it("uses the real logo for every client that has one on file", () => {
    const withLogo = clients.filter((c) => c.logo).map((c) => c.name);
    expect(withLogo).toEqual(["Pembroke Care", "Sandbourne Care", "20X", "Goodwill Dairy"]);
  });

  it("only links to client sites over https", () => {
    clients.forEach((client) => {
      if (client.href) expect(client.href).toMatch(/^https:\/\//);
    });
  });
});
