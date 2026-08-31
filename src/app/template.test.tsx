import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render } from "@testing-library/react";
import Template from "./template";

let pathname = "/";

vi.mock("next/navigation", () => ({
  usePathname: () => pathname,
}));

vi.mock("framer-motion", () => ({
  LazyMotion: ({ children }: { children: React.ReactNode }) => (
    <div data-lazy-motion="">{children}</div>
  ),
  m: {
    div: ({ children }: { children: React.ReactNode }) => (
      <div data-framer-enter="">{children}</div>
    ),
  },
  useReducedMotion: () => false,
}));

afterEach(() => {
  pathname = "/";
  cleanup();
});

describe("app template motion wrapper", () => {
  it("skips the Framer enter on Field Notes and demo routes", () => {
    for (const path of ["/", "/packages", "/gp-websites", "/demo/gp-practice"]) {
      pathname = path;
      const { container, unmount } = render(
        <Template>
          <em>page</em>
        </Template>,
      );
      expect(container.querySelector("[data-lazy-motion]")).toBeNull();
      expect(container.querySelector("[data-framer-enter]")).toBeNull();
      expect(container.querySelector("em")).toBeTruthy();
      unmount();
    }
  });

  it("still wraps Bloom routes so existing m components keep LazyMotion", () => {
    pathname = "/services";
    const { container } = render(
      <Template>
        <em>page</em>
      </Template>,
    );
    expect(container.querySelector("[data-lazy-motion]")).toBeTruthy();
    expect(container.querySelector("[data-framer-enter]")).toBeTruthy();
    expect(container.querySelector("[data-framer-enter] em")).toBeTruthy();
  });
});
