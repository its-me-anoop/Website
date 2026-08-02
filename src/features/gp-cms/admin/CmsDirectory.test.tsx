import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { demoWorkspaces } from "@/data/gp-cms/demo-workspaces";
import { CmsDirectory } from "./CmsDirectory";

describe("GP CMS directory", () => {
  it("presents multiple practices as separate workspaces", () => {
    render(<CmsDirectory workspaces={demoWorkspaces} />);

    expect(
      screen.getByRole("heading", { name: "Choose the practice you want to update" })
    ).toBeInTheDocument();
    expect(screen.getByText("Willowbrook Surgery")).toBeInTheDocument();
    expect(screen.getByText("Meadow View Medical Centre")).toBeInTheDocument();
    expect(screen.getByText("Kingsway Family Practice")).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /Open workspace/ })).toHaveLength(3);
  });
});
