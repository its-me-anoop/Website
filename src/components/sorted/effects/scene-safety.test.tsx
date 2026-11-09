import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { render } from "@testing-library/react";
import { LazyMotion, domAnimation } from "framer-motion";
import type { ReactNode } from "react";
import { describe, expect, it } from "vitest";
import { SlabStack } from "../ui/SlabStack";
import { XRay, XRAY_SHEETS } from "../ui/XRay";
import { Reveal, SplitWords, Tilt } from "./Motion";

/*
 * Sorted turns things in 3D on purpose, so these guard the patterns
 * that made iOS Safari leave regions black and freeze animations
 * mid-frame on an earlier version of the site: filter animations, large
 * blur layers, canvases, and 3D contexts that swallow the page. Every
 * scene here is a small, bounded box of DOM with its own perspective.
 */

const root = join(process.cwd(), "src/components/sorted");

function sources(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return sources(path);
    return /\.tsx?$/.test(name) && !/\.test\.tsx?$/.test(name) ? [path] : [];
  });
}

const files = sources(root).map((file) => ({ file: file.slice(root.length + 1), text: readFileSync(file, "utf8") }));
const wrap = (ui: ReactNode) => render(<LazyMotion features={domAnimation}>{ui}</LazyMotion>);

describe("no heavy layers", () => {
  it("no component uses a blur filter or a backdrop blur", () => {
    expect(files.filter((f) => /blur-\[|backdrop-blur|blur\(/.test(f.text)).map((f) => f.file)).toEqual([]);
  });

  it("no component draws to a canvas: every scene is DOM", () => {
    expect(files.filter((f) => /getContext\(|<canvas/.test(f.text)).map((f) => f.file)).toEqual([]);
  });

  it("the page shell is never a 3D context", () => {
    const shell = files.find((f) => f.file === "layout/Shell.tsx")!.text;
    expect(shell).not.toMatch(/preserve-3d|perspective/);
  });
});

describe("Reveal", () => {
  it("tips up with its own perspective, without a filter", () => {
    const { container } = wrap(<Reveal>Text</Reveal>);
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveClass("s-reveal");
    expect(el.style.filter).toBe("");
    expect(el.style.transformOrigin).toBe("50% 0%");
  });
});

describe("SplitWords", () => {
  it("keeps the sentence intact for assistive technology", () => {
    const { container } = wrap(
      <h2>
        <SplitWords>
          Built for <em>everyone</em>.
        </SplitWords>
      </h2>
    );
    expect(container.querySelector("h2")).toHaveTextContent("Built for everyone.");
    expect(container.querySelectorAll(".s-w")).toHaveLength(4);
  });
});

describe("Tilt", () => {
  it("is a plain wrapper until a fine pointer and motion are both confirmed", () => {
    const { container } = wrap(<Tilt>Card</Tilt>);
    const el = container.firstChild as HTMLElement;
    expect(el.style.transform).toBe("");
    expect(el.style.transformStyle).toBe("");
  });
});

describe("decorative scenes", () => {
  it("the slab stack is hidden from assistive technology and stacks bottom to top", () => {
    const { container } = wrap(<SlabStack order={["navy", "cobalt", "white"]} />);
    const scene = container.firstElementChild!;
    expect(scene).toHaveAttribute("aria-hidden", "true");
    const slabs = scene.querySelectorAll<HTMLElement>(".stack-slab");
    expect(Array.from(slabs, (s) => s.style.getPropertyValue("--z"))).toEqual(["0", "1", "2"]);
  });

  it("the exploded page has one sheet per audit area and lifts the one pointed at", () => {
    const { container } = wrap(<XRay active={2} />);
    const scene = container.firstElementChild!;
    expect(scene).toHaveAttribute("aria-hidden", "true");
    const sheets = scene.querySelectorAll(".xray-sheet");
    expect(sheets).toHaveLength(XRAY_SHEETS);
    expect(Array.from(sheets).filter((s) => s.hasAttribute("data-on"))).toHaveLength(1);
    expect(sheets[2]).toHaveAttribute("data-on");
  });
});
