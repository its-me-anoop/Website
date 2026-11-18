import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Dot, Floor, Porthole } from "./Room";

describe("Floor", () => {
  it("is decoration when it holds nothing", () => {
    const { container } = render(<Floor colour="tomato" />);
    const floor = container.firstElementChild as HTMLElement;
    expect(floor).toHaveClass("s-floor");
    expect(floor).toHaveAttribute("aria-hidden", "true");
    expect(floor.style.getPropertyValue("--floor-c")).toBe("var(--s-tomato)");
  });

  it("is read out when something stands on it", () => {
    const { container } = render(
      <Floor colour="paper">
        <p>Reading, UK</p>
      </Floor>
    );
    expect(container.firstElementChild).not.toHaveAttribute("aria-hidden");
    expect(screen.getByText("Reading, UK")).toBeInTheDocument();
  });

  it("names its colour, so a room can be checked for the floor it ends on", () => {
    const { container } = render(<Floor colour="bottle" />);
    expect(container.firstElementChild).toHaveAttribute("data-floor", "bottle");
  });
});

describe("Porthole and Dot", () => {
  it("are hidden from assistive technology", () => {
    const { container } = render(
      <>
        <Porthole colour="var(--s-pink)" />
        <Dot />
      </>
    );
    const [hole, dot] = Array.from(container.children) as HTMLElement[];
    expect(hole).toHaveAttribute("aria-hidden", "true");
    expect(hole.style.getPropertyValue("--hole")).toBe("var(--s-pink)");
    expect(dot).toHaveAttribute("aria-hidden", "true");
    expect(dot).toHaveClass("s-dot");
  });
});
