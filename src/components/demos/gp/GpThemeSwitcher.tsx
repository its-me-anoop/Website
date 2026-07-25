"use client";

import { useCallback, useSyncExternalStore } from "react";

/* ─────────────────────────────────────────────────────────────
   The showcase control.

   Three palettes over one structure. Everything a patient uses —
   the care cards, the task tiles, the breadcrumbs, the green "do"
   colour, the focus style — is the NHS service manual's and does
   not change. Only the `--dgp-*` tokens move, and every one of the
   three clears WCAG 2.2 AA independently.

   This bar is Flutterly's chrome, not the practice's, so it sits
   above the masthead with the sample ribbon and is labelled as
   such. Without JavaScript the site renders in the default NHS
   theme and this control simply does nothing.
   ───────────────────────────────────────────────────────────── */

export const GP_THEMES = [
  {
    id: "nhs",
    name: "NHS blue",
    note: "The nhs.uk palette patients already know",
    swatch: ["#005eb8", "#007f3b", "#f0f4f5"],
  },
  {
    id: "forest",
    name: "Forest",
    note: "For a village or market-town practice",
    swatch: ["#155c3c", "#9a4a12", "#f1f4ee"],
  },
  {
    id: "slate",
    name: "Slate",
    note: "For an urban practice or a PCN",
    swatch: ["#1e40af", "#047857", "#f1f5f9"],
  },
] as const;

export type GpThemeId = (typeof GP_THEMES)[number]["id"];

const STORAGE_KEY = "flutterly:gp-demo-theme";
const ATTR = "data-gp-theme";
const EVENT = "flutterly:gp-theme";

/**
 * Applied before paint by a blocking script in the demo layout, so a
 * returning visitor never sees the default theme flash first. Exported
 * so the layout and this component cannot drift apart.
 */
export const GP_THEME_BOOTSTRAP = `(function(){try{var t=localStorage.getItem(${JSON.stringify(
  STORAGE_KEY
)});if(t){document.documentElement.setAttribute(${JSON.stringify(
  ATTR
)},t)}}catch(e){}})()`;

/* The theme lives on the document, not in React state: the bootstrap
   script writes it before React exists, so the DOM is the single source
   of truth and `useSyncExternalStore` reads from it. That also means no
   hydration mismatch — the server snapshot is always the default. */
function subscribe(onChange: () => void) {
  window.addEventListener(EVENT, onChange);
  return () => window.removeEventListener(EVENT, onChange);
}

function readTheme(): GpThemeId {
  const value = document.documentElement.getAttribute(ATTR);
  return GP_THEMES.some((t) => t.id === value) ? (value as GpThemeId) : "nhs";
}

const serverTheme = (): GpThemeId => "nhs";

export function GpThemeSwitcher() {
  const theme = useSyncExternalStore(subscribe, readTheme, serverTheme);

  const choose = useCallback((next: GpThemeId) => {
    document.documentElement.setAttribute(ATTR, next);
    const root = document.querySelector<HTMLElement>(".demo-gp-root");
    if (root) root.dataset.theme = next;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* Storage denied in private browsing — the choice just will not
         survive a reload. */
    }
    window.dispatchEvent(new Event(EVENT));
  }, []);

  return (
    <fieldset className="flex flex-wrap items-center gap-x-4 gap-y-2 border-0 p-0">
      <legend className="sr-only">Choose a colour scheme for this sample</legend>
      <span aria-hidden className="text-[13px] font-semibold text-[#f5e6d7]">
        Colour scheme
      </span>
      <div className="flex flex-wrap gap-2">
        {GP_THEMES.map((option) => {
          const checked = theme === option.id;
          return (
            <label
              key={option.id}
              className={`flex cursor-pointer items-center gap-2 rounded-full border px-3 py-1.5 text-[13px] transition-colors ${
                checked
                  ? "border-[#f5e6d7] bg-[#f5e6d7] font-semibold text-[#170c0f]"
                  : "border-[#f5e6d7]/40 text-[#f5e6d7] hover:border-[#f5e6d7]/80"
              }`}
            >
              <input
                type="radio"
                name="gp-demo-theme"
                value={option.id}
                checked={checked}
                onChange={() => choose(option.id)}
                className="sr-only"
              />
              <span aria-hidden className="flex gap-0.5">
                {option.swatch.map((colour) => (
                  <span
                    key={colour}
                    className="h-3 w-3 rounded-full ring-1 ring-black/25"
                    style={{ background: colour }}
                  />
                ))}
              </span>
              {option.name}
              <span className="sr-only"> — {option.note}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
