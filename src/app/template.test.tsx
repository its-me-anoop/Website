import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Template from "./template";

const { currentPath } = vi.hoisted(() => ({ currentPath: vi.fn() }));
vi.mock("next/navigation", () => ({ usePathname: currentPath }));

describe("route template", () => {
  it.each(["/", "/services", "/demo/gp-practice"])("makes %s content available immediately", (path) => {
    currentPath.mockReturnValue(path);
    render(<Template><h1>Page title</h1></Template>);
    expect(screen.getByRole("heading", { name: "Page title" })).toBeVisible();
  });
});
