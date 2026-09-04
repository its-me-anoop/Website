import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { LazyMotion } from "framer-motion";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import domMax from "@/lib/motion-features";
import { Showcase } from "./Showcase";

let sequenceTop = 96;
let desktopSequence = true;
let stageHeight = 620;
let animationFrame: FrameRequestCallback | undefined;

function flushFrame() {
  act(() => {
    const callback = animationFrame;
    animationFrame = undefined;
    callback?.(0);
  });
}

function renderShowcase() {
  const result = render(<LazyMotion features={domMax} strict><Showcase /></LazyMotion>);
  flushFrame();
  return result;
}

beforeEach(() => {
  sequenceTop = 96;
  desktopSequence = true;
  stageHeight = 620;
  animationFrame = undefined;
  vi.stubGlobal("innerHeight", 800);
  vi.stubGlobal("ResizeObserver", class { observe() {} disconnect() {} });
  vi.spyOn(window, "requestAnimationFrame").mockImplementation((callback) => {
    animationFrame = callback;
    return 1;
  });
  vi.spyOn(window, "cancelAnimationFrame").mockImplementation(() => {});
  vi.spyOn(window, "matchMedia").mockImplementation((query) => ({
    matches: query.includes("1024px") ? desktopSequence : query.includes("768px"),
    media: query, onchange: null, addListener() {}, removeListener() {},
    addEventListener() {}, removeEventListener() {}, dispatchEvent: () => false,
  }));
  vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(function (this: HTMLElement) {
    const top = this.hasAttribute("data-showcase-sequence") ? sequenceTop : 96;
    return { x: 0, y: top, top, left: 0, right: 1100, bottom: top + stageHeight,
      width: 1100, height: stageHeight, toJSON() {} };
  });
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("Showcase scroll sequence", () => {
  it("loads the active screenshot eagerly so a newly selected panel is ready in WebKit", () => {
    renderShowcase();
    const image = screen.getByRole("img", { name: /Homepage of the Willowbrook Surgery sample site/ });
    expect(image).toHaveAttribute("loading", "eager");
    expect(image).toHaveAttribute("src", "/demos/gp-home.png");
    expect(image).not.toHaveAttribute("srcset");
  });

  it("gives the fifth sector a full pinned scroll interval before releasing the stage", () => {
    const { container } = renderShowcase();
    const track = container.querySelector<HTMLElement>("[data-showcase-sequence]")!;
    const pinnedTravel = Number.parseFloat(track.style.getPropertyValue("--sequence-height")) - stageHeight;
    const fifthSectorStart = 4 * 520;
    expect(pinnedTravel - fifthSectorStart).toBeGreaterThanOrEqual(520);
  });

  it("preserves a focused sample link during scrolling and resumes after focus leaves the panel", () => {
    renderShowcase();
    const link = screen.getByRole("link", { name: /Open the sample site/ });
    act(() => link.focus());
    sequenceTop = 96 - 520;
    fireEvent.scroll(window);
    flushFrame();
    expect(screen.getByRole("tab", { name: /GP practice/ })).toHaveAttribute("aria-selected", "true");
    expect(link).toHaveFocus();
    const outside = screen.getByRole("link", { name: "Willowbrook Surgery" });
    act(() => outside.focus());
    flushFrame();
    expect(screen.getByRole("tab", { name: /Care home/ })).toHaveAttribute("aria-selected", "true");
    expect(outside).toHaveFocus();
  });

  it("advances all five sectors while scrolling through the pinned desktop stage, and reverses", () => {
    const { container } = renderShowcase();
    expect(container.querySelector("[data-showcase-sequence]")).toHaveAttribute("data-pinned", "true");
    const labels = ["GP practice", "Care home", "Dental", "Pharmacy", "Physio"];
    labels.forEach((label, index) => {
      sequenceTop = 96 - index * 520;
      fireEvent.scroll(window);
      flushFrame();
      expect(screen.getByRole("tab", { name: new RegExp(label) })).toHaveAttribute("aria-selected", "true");
    });
    sequenceTop = 96;
    fireEvent.scroll(window);
    flushFrame();
    expect(screen.getByRole("tab", { name: /GP practice/ })).toHaveAttribute("aria-selected", "true");
  });

  it("keeps a manual selection until scrolling into the next sector and retains arrow-key navigation", () => {
    renderShowcase();
    const dental = screen.getByRole("tab", { name: /Dental/ });
    fireEvent.click(dental);
    fireEvent.scroll(window);
    flushFrame();
    expect(dental).toHaveAttribute("aria-selected", "true");
    fireEvent.keyDown(dental, { key: "ArrowRight" });
    expect(screen.getByRole("tab", { name: /Pharmacy/ })).toHaveFocus();
    sequenceTop = 96 - 520;
    fireEvent.scroll(window);
    flushFrame();
    expect(screen.getByRole("tab", { name: /Care home/ })).toHaveAttribute("aria-selected", "true");
  });

  it.each([
    [320, 640], [390, 844], [820, 1180], [1024, 600], [667, 375],
  ])("cycles every sector down and up in the compact %sx%s viewport", (width, height) => {
    desktopSequence = false;
    vi.stubGlobal("innerWidth", width);
    vi.stubGlobal("innerHeight", height);
    stageHeight = height - 140;
    const { container } = renderShowcase();
    expect(container.querySelector("[data-showcase-sequence]")).toHaveAttribute("data-pinned", "true");
    const labels = ["GP practice", "Care home", "Dental", "Pharmacy", "Physio"];
    const stepDistance = Math.max(360, height * 0.65);
    [0, 1, 2, 3, 4, 3, 2, 1, 0].forEach((index) => {
      sequenceTop = 96 - index * stepDistance;
      fireEvent.scroll(window);
      flushFrame();
      expect(screen.getByRole("tab", { name: new RegExp(labels[index]) })).toHaveAttribute("aria-selected", "true");
    });
  });

  it("releases the compact stage when supporting details open without losing its scroll position", () => {
    desktopSequence = false;
    const { container } = renderShowcase();
    const hint = screen.getByText("Scroll through the five sectors, or choose one below.");
    sequenceTop = 96 - 520;
    const disclosure = screen.getByText("About this sample").closest("details")!;
    act(() => {
      disclosure.open = true;
      fireEvent(disclosure, new Event("toggle"));
    });
    flushFrame();
    const track = container.querySelector<HTMLElement>("[data-showcase-sequence]")!;
    expect(track).toHaveAttribute("data-pinned", "false");
    expect(track.style.paddingTop).toBe("520px");
    expect(hint).toBeInTheDocument();
    expect(hint).toHaveAttribute("aria-hidden", "true");
    expect(screen.getByText("Appointments, prescriptions and the NHS App one tap from the homepage")).toBeVisible();
    act(() => {
      disclosure.open = false;
      fireEvent(disclosure, new Event("toggle"));
    });
    flushFrame();
    expect(track).toHaveAttribute("data-pinned", "true");
    expect(track.style.paddingTop).toBe("");
    expect(hint).toHaveAttribute("aria-hidden", "false");
  });

  it("clamps the released offset once the final sample has left its pinned interval", () => {
    desktopSequence = false;
    const { container } = renderShowcase();
    sequenceTop = 96 - 3000;
    const disclosure = screen.getByText("About this sample").closest("details")!;
    act(() => {
      disclosure.open = true;
      fireEvent(disclosure, new Event("toggle"));
    });
    flushFrame();
    expect(container.querySelector<HTMLElement>("[data-showcase-sequence]")!.style.paddingTop).toBe("2600px");
  });

  it.each(["pointer", "keyboard"] as const)("handles %s focus safely after closing the compact disclosure", (modality) => {
    desktopSequence = false;
    renderShowcase();
    const summary = screen.getByText("About this sample");
    const disclosure = summary.closest("details")!;
    if (modality === "pointer") fireEvent.pointerDown(summary);
    else fireEvent.keyDown(summary, { key: "Enter" });
    act(() => summary.focus());
    act(() => {
      disclosure.open = true;
      fireEvent(disclosure, new Event("toggle"));
    });
    flushFrame();
    act(() => {
      disclosure.open = false;
      fireEvent(disclosure, new Event("toggle"));
    });
    flushFrame();
    sequenceTop = 96 - 520;
    fireEvent.scroll(window);
    flushFrame();
    const selected = modality === "pointer" ? /Care home/ : /GP practice/;
    expect(screen.getByRole("tab", { name: selected })).toHaveAttribute("aria-selected", "true");
    if (modality === "keyboard") expect(summary).toHaveFocus();
  });

  it("keeps the selected compact tab in view while cycling in either direction", () => {
    desktopSequence = false;
    const normalBounds = vi.mocked(HTMLElement.prototype.getBoundingClientRect).getMockImplementation()!;
    vi.mocked(HTMLElement.prototype.getBoundingClientRect).mockImplementation(function (this: HTMLElement) {
      const bounds = normalBounds.call(this);
      if (this.getAttribute("role") === "tablist") return { ...bounds, left: 0, right: 280, width: 280 };
      if (this.getAttribute("role") === "tab") {
        const position = Array.from(this.parentElement!.children).indexOf(this);
        const left = position * 120 - this.parentElement!.scrollLeft;
        return { ...bounds, left, right: left + 120, width: 120 };
      }
      return bounds;
    });
    renderShowcase();
    const list = screen.getByRole("tablist");
    sequenceTop = 96 - 4 * 520;
    fireEvent.scroll(window);
    flushFrame();
    expect(list.scrollLeft).toBe(320);
    sequenceTop = 96;
    fireEvent.scroll(window);
    flushFrame();
    expect(list.scrollLeft).toBe(0);
  });

  it("respects a manual tab choice when it closes expanded supporting details", () => {
    desktopSequence = false;
    renderShowcase();
    sequenceTop = 96 - 520;
    const disclosure = screen.getByText("About this sample").closest("details")!;
    act(() => {
      disclosure.open = true;
      fireEvent(disclosure, new Event("toggle"));
    });
    flushFrame();
    fireEvent.click(screen.getByRole("tab", { name: /Physio/ }));
    flushFrame();
    expect(screen.getByRole("tab", { name: /Physio/ })).toHaveAttribute("aria-selected", "true");
  });

  it("does not pin a stage taller than the available viewport", () => {
    stageHeight = 900;
    const { container } = renderShowcase();
    expect(container.querySelector("[data-showcase-sequence]")).toHaveAttribute("data-pinned", "false");
  });
});
