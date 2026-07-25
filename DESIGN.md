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
of components serves both grounds. Motion: shared `EASE` curve, `Reveal` /
`TextReveal` / `Stagger` entrances, full reduced-motion and
reduced-transparency fallbacks. `.aurum-root` scope.

## 2. Case-study product scopes (`/projects/*`)

`.sipli-theme` (deep water teal) and `.artling-theme` (burnt amber) sit inside Aurum and
retint it: each sets `--au-accent` and remaps the semantic Porcelain
tokens their markup uses (see docs/DESIGN-SYSTEM.md for those tokens).

## 3. Demo GP — "Willowbrook" (`/demo/gp-practice`, `.demo-gp-root`)

NHS-service-manual flavoured, deliberately familiar to NHS patients:

- **Three colour schemes over one structure.** `nhs` (default), `forest`
  and `slate` re-declare the `--dgp-*` tokens and nothing else — every
  care card, task tile, breadcrumb, focus style and the green "do"
  colour are the service manual's in all three. Chosen by the showcase
  bar above the masthead (Flutterly's chrome, not the practice's),
  applied before paint by a blocking script in the demo layout, and
  each audited separately by `npm run test:contrast`.
- Tokens (globals.css): `--dgp-blue` (masthead/links), `--dgp-blue-deep`
  (nav), `--dgp-tint`, `--dgp-ink`, `--dgp-ink-soft`, `--dgp-line`,
  `--dgp-green` (the "do" action colour), `--dgp-yellow` (focus, the
  same in every scheme), `--dgp-red` (urgent), `--dgp-emergency`,
  `--dgp-amber*` (warning callouts), `--dgp-radius`.
- Type ladder: text-sm 14 (small print) · text-base 16 (body) ·
  text-lg 18 (card titles/h3) · 20 (inner-page h2) · text-2xl 24
  (landing-section h2) · clamp h1. No sizes off the ladder.
- Light theme only (`colorScheme: "light"`): patients of every age on any
  device in daylight; no dark mode.
- Server components except three: the nav (current-page marking), the
  colour-scheme switcher, and the online-consultation form. Everything
  else is native `<details>`, real `<table>`, semantic HTML, and the
  whole site renders and reads without JavaScript.
- **The triage form actually works.** `GpTriageDemo` walks the journey
  every online-consultation supplier implements — what do you need, who
  is it for, tell us about it, here is what happens next — and submits
  nothing. Focus moves to each new question in a layout effect, never a
  `requestAnimationFrame`: focusing asynchronously races anyone who
  starts typing immediately and silently eats their keystrokes.
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
