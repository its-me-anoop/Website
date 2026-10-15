import React, { Suspense } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { act, render, screen } from "@testing-library/react";

vi.mock("next/navigation", () => ({ usePathname: () => "/services" }));

/* The module keeps "has the first page mounted?" state, so each test gets a fresh copy. */
let Template: (props: { children: React.ReactNode }) => React.ReactNode;
beforeEach(async () => {
  vi.resetModules();
  Template = (await import("./template")).default;
});

const curtain = (container: HTMLElement) => container.querySelector(".route-curtain");

describe("route template", () => {
  it("never shows the curtain on the first page, even when React restarts the render", async () => {
    /* A page that suspends once makes React throw away the uncommitted
       render and run it again, as an interrupted hydration does. The retry
       must not flip the first page to "navigated" and render markup the
       server never sent (React error #418). */
    let resolve!: () => void;
    const ready = new Promise<void>((r) => (resolve = r));
    let done = false;
    ready.then(() => (done = true));
    function SuspendOnce() {
      if (!done) throw ready;
      return <p>page</p>;
    }
    const { container } = render(
      <Suspense fallback={null}>
        <Template>
          <SuspendOnce />
        </Template>
      </Suspense>
    );
    await act(async () => {
      resolve();
      await ready;
    });
    expect(await screen.findByText("page")).toBeInTheDocument();
    expect(curtain(container)).toBeNull();
  });

  it("shows the curtain on later in-app navigations", () => {
    const first = render(<Template><p>first</p></Template>);
    expect(curtain(first.container)).toBeNull();
    first.unmount();
    const next = render(<Template><p>next</p></Template>);
    expect(curtain(next.container)).not.toBeNull();
  });
});
