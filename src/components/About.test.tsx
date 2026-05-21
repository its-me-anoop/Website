import React from "react";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import About from "./About";

describe("About Section", () => {
  it("renders the heading and bio text correctly", () => {
    render(<About />);
    
    expect(screen.getByText("№ 05 · The studio")).toBeInTheDocument();
    expect(screen.getByText(/One person/)).toBeInTheDocument();
    
    // Check key quote and body paragraphs
    expect(screen.getByText(/I started Flutterly because I was tired/)).toBeInTheDocument();
    expect(screen.getByText(/We’re small on purpose/)).toBeInTheDocument();
  });

  it("renders founder profile picture caption and details", () => {
    render(<About />);
    
    expect(screen.getByText("Founder · Lead Engineer")).toBeInTheDocument();
    expect(screen.getByText("Anoop Jose")).toBeInTheDocument();
  });

  it("renders the studio meta specs table correctly", () => {
    render(<About />);
    
    expect(screen.getByText("Founded")).toBeInTheDocument();
    expect(screen.getByText("Based")).toBeInTheDocument();
    expect(screen.getByText("Headcount")).toBeInTheDocument();
    expect(screen.getByText("Reply time")).toBeInTheDocument();
  });
});
