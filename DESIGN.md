# Flutterly — Design Context

Six scoped design systems coexist. Never leak tokens across scopes.

## 1. Studio (marketing)

The primary buyer journey (`/`, `/services`, `/packages`, `/book`,
`/gp-websites`, `/care-home-websites`, `/about`, `/contact`) uses the
**Studio** redesign under `RedesignShell`, inspired by editorial dark-mode
agency sites: near-black canvas (`#050505`), light ink, hairline grid lines,
pill navigation controls, mono supertitles, large Syne display type and Space
Grotesk body type. Light bands (`#f5f5f7`) alternate for contrast sections
such as the accessibility highlight. Corner `+` markers frame the hero
headline; a marquee tagline band, numbered service rows, portfolio grid,
testimonial carousel and FAQ accordion carry the page rhythm. JetBrains Mono is
reserved for labels and indices only.

Scheduler, manage, audit, policy and remaining service-detail routes retain
the original **Bloom** scope documented in `docs/BLOOM.md`: mint canvas, pine
ink, teal actions, Archivo display and Atkinson Hyperlegible Next body. Never
mix the two token sets inside one screen.

## 2. Porcelain (case studies `/projects/*`)

See docs/DESIGN-SYSTEM.md. Light editorial system, system font stacks.

Demo content is CMS-fed: JSON under `content/`, Zod-validated by
`src/lib/cms` at build time (see docs/CMS.md). Pages never hardcode
practice facts — edit the JSON, not the JSX.

## 3. Demo GP — "Willowbrook" (`/demo/gp-practice`, `.demo-gp-root`)

NHS-service-manual flavoured, deliberately familiar to NHS patients:

- Tokens (globals.css): `--dgp-blue #005eb8`, `--dgp-blue-deep #003087`,
  `--dgp-tint #f0f4f5`, `--dgp-ink #212b32`, `--dgp-ink-soft #4c6272`,
  `--dgp-line #d8dde0`, `--dgp-green #007f3b` (the "do" action colour),
  `--dgp-yellow` (focus), `--dgp-red` (urgent), `--dgp-amber` /
  `--dgp-amber-line` / `--dgp-amber-tint` (warning callouts).
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

## 4–6. New sector demos (2026-08)

- **Dental — "Kennet Bridge"** (`/demo/dental-practice`, `.demo-dental-root`,
  `--ddt-*`): porcelain canvas, graphite ink, petrol actions, sand fee
  bands. System stack; hierarchy by weight. Quietly premium.
- **Pharmacy — "Willowbrook"** (`/demo/pharmacy`, `.demo-pharm-root`,
  `--dph-*`): white + mint, deep pharmacy-green actions, NHS-blue service
  badges, amber seasonal notices. Task-first; same fictional village as
  the GP demo. GPhC footer regulatory block on every page.
- **Physio — "Forbury"** (`/demo/physio-clinic`, `.demo-physio-root`,
  `--dpy-*`): warm paper, slate bands, coral actions, Space Grotesk
  display (`.dpy-display`). Athletic editorial, oversized condition index.

## Imagery (demos)

Copyright-free photography (Unsplash/Pexels licence), downloaded into
`public/demos/`, served via `next/image` with real alt text. Credit sources
in `public/demos/CREDITS.md`. Never attach a stock photograph of a real
person to a named fictional clinician.

## Accessibility floor (everywhere)

WCAG 2.2 AA: 4.5:1 body contrast, 3:1 large text/UI, visible focus, skip
link to `#main`, `prefers-reduced-motion` honoured, keyboard operable.
