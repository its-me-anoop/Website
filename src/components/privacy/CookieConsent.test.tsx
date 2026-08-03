import React from "react";
import { beforeEach, describe, expect, it } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { CONSENT_STORAGE_KEY } from "@/lib/consent";
import { CookieConsent } from "./CookieConsent";

describe("CookieConsent", () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.cookie = "flutterly-test=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
  });

  it("explains the current cookie use and offers all three top-level choices", async () => {
    render(<CookieConsent />);

    expect(
      await screen.findByRole("heading", {
        name: /currently uses no analytics or marketing cookies/i,
      })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Accept all" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Reject non-essential" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Manage preferences" })
    ).toBeInTheDocument();
  });

  it("persists rejection without creating a cookie and keeps settings reopenable", async () => {
    render(<CookieConsent />);

    fireEvent.click(
      await screen.findByRole("button", { name: "Reject non-essential" })
    );

    const stored = JSON.parse(
      window.localStorage.getItem(CONSENT_STORAGE_KEY) ?? "{}"
    );
    expect(stored).toMatchObject({
      version: 1,
      necessary: true,
      analytics: false,
      marketing: false,
    });
    expect(document.cookie).not.toContain("flutterly-test");
    expect(
      await screen.findByRole("button", { name: "Cookie settings" })
    ).toBeInTheDocument();
  });

  it("saves category choices and restores them when preferences reopen", async () => {
    render(<CookieConsent />);

    fireEvent.click(
      await screen.findByRole("button", { name: "Manage preferences" })
    );

    const essential = screen.getByRole("checkbox", { name: /Essential/ });
    const analytics = screen.getByRole("checkbox", { name: /Analytics/ });
    const marketing = screen.getByRole("checkbox", { name: /Marketing/ });
    expect(essential).toBeChecked();
    expect(essential).toBeDisabled();

    fireEvent.click(analytics);
    expect(analytics).toBeChecked();
    expect(marketing).not.toBeChecked();
    fireEvent.click(screen.getByRole("button", { name: "Save preferences" }));

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: "Cookie settings" })
      ).toBeInTheDocument();
    });

    const stored = JSON.parse(
      window.localStorage.getItem(CONSENT_STORAGE_KEY) ?? "{}"
    );
    expect(stored).toMatchObject({ analytics: true, marketing: false });

    fireEvent.click(screen.getByRole("button", { name: "Cookie settings" }));
    expect(screen.getByRole("checkbox", { name: /Analytics/ })).toBeChecked();
    expect(screen.getByRole("checkbox", { name: /Marketing/ })).not.toBeChecked();
  });
});
