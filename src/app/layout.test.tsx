import type { ReactElement } from "react";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/font/local", () => ({ default: () => ({ variable: "font" }) }));
import RootLayout from "./layout";

describe("RootLayout", () => {
  it("lets Next jump to the top of a new page instead of smooth-scrolling there", () => {
    const html = RootLayout({ children: null }) as ReactElement<Record<string, unknown>>;
    expect(html.type).toBe("html");
    /* Next disables `scroll-behavior: smooth` during route changes only when
       this attribute is present; in-page anchor links stay smooth. */
    expect(html.props["data-scroll-behavior"]).toBe("smooth");
  });
});
