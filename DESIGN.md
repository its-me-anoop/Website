# Flutterly — Design Context

Three scoped design systems coexist. Never leak tokens across scopes.

## 1. Aurum (every Flutterly-branded route)

See docs/AURUM.md. Warm cream paper canvas `#fdf6ec` under one shared
fixed ground (drifting amber/rose/teal washes, masked grid, paper
tooth), cocoa ink, plates that read as pressed card, **Bricolage
Grotesque over Figtree**, and one three-colour rule — **teal `#1b8fa1` → amber
`#e89a2a` → rose `#c73e6f`** — at the seams between sections. Teal is
the only action colour; `--au-teal-deep` carries anything that has to
read at body size. Two `.au-night` bands (the fold, the process
interlude) invert the page by re-declaring the same tokens, so one set
of components serves both grounds. Motion: shared `EASE` curve,
`Reveal` / `TextReveal` / `Stagger` entrances, full reduced-motion and
reduced-transparency fallbacks. `.aurum-root` scope.

## 2. Case-study product scopes (`/projects/*`)

`.sipli-theme` (deep water teal) and `.artling-theme` (burnt amber) sit inside Aurum and
retint it: each sets `--au-accent` and remaps the semantic Porcelain
tokens their markup uses (see docs/DESIGN-SYSTEM.md for those tokens).

## 3. Demo GP — "Willowbrook" (`/demo/gp-practice`, `.demo-gp-root`)

A modern practice site that keeps NHS trust cues: white chrome with a
blue-cross wordmark, pale sky hero washes, soft-shadow rounded-2xl
cards, pill CTAs, deep-blue footer. NHS blue/green/yellow/red keep
their NHS meanings throughout.

- Tokens (globals.css): `--dgp-blue #005eb8`, `--dgp-blue-deep #003087`,
  `--dgp-tint #f0f4f5`, `--dgp-sky #e9f2fa` / `--dgp-sky-line #d2e2f0`
  (hero washes), `--dgp-ink #212b32`, `--dgp-ink-soft #4c6272`,
  `--dgp-line #d8dde0`, `--dgp-green #007f3b` (the "do" action colour),
  `--dgp-yellow` (focus), `--dgp-red` (urgent), `--dgp-amber` /
  `--dgp-amber-line` / `--dgp-amber-tint` (warning callouts).
- Elevation: one shared soft shadow (`gpShadow` in GpShell) on every
  raised surface; radius ladder rounded-full (pills/chips) ·
  rounded-2xl (cards/panels) · rounded-xl (media, wordmark).
- Type ladder: text-sm 14 (small print) · text-base 16 (body) ·
  text-lg 18 (card titles/h3) · 20 (inner-page h2) · text-2xl 24
  (landing-section h2) · clamp h1. No sizes off the ladder.
- Light theme only (`colorScheme: "light"`): patients of every age on any
  device in daylight; no dark mode.
- Server components only — no client JS in the demo; native `<details>`,
  real `<table>`, semantic HTML.
- Typography: system/Geist sans, fixed scale, body ≥15px, generous
  line-height. One `<h1>` per page.
- Focus style: 3px `--dgp-yellow` outline (NHS convention).
- House rules that override NHS-manual habits: **no side-stripe borders**
  (no `border-left > 1px` accents on rounded cards) — use full borders,
  background tints and icons instead; no gradient text; no pure #000/#fff
  pairings for large surfaces (NHS palette colours are exempt as brand
  colours).

## Imagery (demos)

Copyright-free photography (Unsplash/Pexels licence), downloaded into
`public/demos/`, served via `next/image` with real alt text. Credit sources
in `public/demos/CREDITS.md`. Never attach a stock photograph of a real
person to a named fictional clinician.

## Accessibility floor (everywhere)

WCAG 2.2 AA: 4.5:1 body contrast, 3:1 large text/UI, visible focus, skip
link to `#main`, `prefers-reduced-motion` honoured, keyboard operable.
`npm run test:contrast` walks every rendered text node on every route,
composites the colour actually painted behind it, and fails on anything
under the floor for its size — so this is a checked claim, not a hope.
