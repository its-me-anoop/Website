import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { render } from "@testing-library/react";
import { LazyMotion, domAnimation } from "framer-motion";
import type { ReactNode } from "react";
import { describe, expect, it } from "vitest";
import { Phone3D } from "../ui/Phone3D";
import { Reveal, Tilt } from "./Motion";

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
  it.each(["@keyframes a-word-in", "@keyframes a-fade-up", "@keyframes route-enter"])("%s never animates a filter", (name) => {
    expect(block(name)).not.toMatch(/filter/);
  });

  it("the fallback blobs use gradients, not a blur filter", () => {
    expect(block(".a-blobs span {")).not.toMatch(/filter/);
  });
});

describe("decorative glows", () => {
  it("no Aurora component uses a large blur filter", () => {
    const offenders = sources(join(process.cwd(), "src/components/aurora")).filter((file) =>
      /blur-\[\d+px\]/.test(readFileSync(file, "utf8"))
    );
    expect(offenders).toEqual([]);
  });
});

describe("on a touch screen", () => {
  it("Reveal animates without a filter", () => {
    const { container } = wrap(<Reveal>Text</Reveal>);
    expect((container.firstChild as HTMLElement).style.filter).toBe("");
  });

  it("Tilt creates no 3D context", () => {
    const { container } = wrap(<Tilt>Card</Tilt>);
    expect(container.innerHTML).not.toMatch(/preserve-3d|perspective/);
  });

  it("Phone3D renders flat, without depth slabs or a float loop", () => {
    const { container } = wrap(<Phone3D src="/demos/gp-mobile.webp" />);
    expect(container.innerHTML).not.toMatch(/preserve-3d|perspective|a-phone-float|translateZ/);
  });
});
