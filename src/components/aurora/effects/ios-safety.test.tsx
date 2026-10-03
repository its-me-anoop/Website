import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { render } from "@testing-library/react";
import { LazyMotion, domAnimation } from "framer-motion";
import type { ReactNode } from "react";
import { describe, expect, it } from "vitest";
import { IMacFrame, IPhoneFrame } from "../ui/DeviceFrame";
import { EmberGlow, Reveal } from "./Motion";

/*
 * Guards against the layer-heavy patterns that made iOS Safari leave
 * regions black and freeze animations mid-frame: filter animations,
 * large filter: blur glows, and 3D contexts on touch screens (where
 * WebKit also stops reporting nested elements as in view).
 */

const css = readFileSync(join(process.cwd(), "src/app/globals.css"), "utf8");

function block(selector: string): string {
  const start = css.indexOf(selector);
  expect(start, `${selector} not found in globals.css`).toBeGreaterThan(-1);
  let depth = 0;
  for (let i = css.indexOf("{", start); i < css.length; i++) {
    if (css[i] === "{") depth++;
    if (css[i] === "}" && --depth === 0) return css.slice(start, i + 1);
  }
  return css.slice(start);
}

function sources(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return sources(path);
    return /\.tsx?$/.test(name) && !/\.test\.tsx?$/.test(name) ? [path] : [];
  });
}

const wrap = (ui: ReactNode) => render(<LazyMotion features={domAnimation}>{ui}</LazyMotion>);

describe("entrance animations", () => {
  it.each(["@keyframes a-word-in", "@keyframes a-fade-up", "@keyframes route-enter", "@keyframes a-breathe", "@keyframes a-float"])(
    "%s never animates a filter",
    (name) => {
      expect(block(name)).not.toMatch(/filter/);
    }
  );

  it("the glow breathes on the compositor: transform and opacity only", () => {
    expect(block("@keyframes a-breathe")).toMatch(/transform/);
    expect(block("@keyframes a-breathe")).not.toMatch(/background|width|height/);
  });
});

describe("decorative glows", () => {
  it("no Aurora component uses a large blur filter", () => {
    const offenders = sources(join(process.cwd(), "src/components/aurora")).filter((file) =>
      /blur-\[\d+px\]/.test(readFileSync(file, "utf8"))
    );
    expect(offenders).toEqual([]);
  });

  it("no Aurora component draws a WebGL canvas any more", () => {
    const offenders = sources(join(process.cwd(), "src/components/aurora")).filter((file) =>
      /getContext\(\s*["']webgl/.test(readFileSync(file, "utf8"))
    );
    expect(offenders).toEqual([]);
  });

  it("EmberGlow is a static gradient, not a filter", () => {
    const { container } = wrap(<EmberGlow />);
    const el = container.firstChild as HTMLElement;
    expect(el.style.background).toMatch(/radial-gradient/);
    expect(el.style.filter).toBe("");
  });
});

describe("on a touch screen", () => {
  it("Reveal animates without a filter", () => {
    const { container } = wrap(<Reveal>Text</Reveal>);
    expect((container.firstChild as HTMLElement).style.filter).toBe("");
  });

  it("device frames create no 3D context", () => {
    const { container } = wrap(
      <>
        <IPhoneFrame src="/demos/gp-mobile.webp" alt="" />
        <IMacFrame src="/demos/gp-home.png" alt="" />
      </>
    );
    expect(container.innerHTML).not.toMatch(/preserve-3d|perspective|translateZ/);
  });
});
