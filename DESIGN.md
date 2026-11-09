# Flutterly — Design Context

Six scoped design systems coexist. Never leak tokens across scopes.

## 1. Sorted (marketing: home, services, sectors, packages, Clear Path, audit, booking, accessibility, 404)

See docs/SORTED.md. "Your digital side, sorted." taken literally: the
page is a desk of chalk `#f4f3ee` and navy `#0b1026`, flat colour and
hard edges, no gradients. Cobalt `#2238e8` is the studio's colour and
**flame `#ff5c1f` is the only action colour, always a fill with navy
text**. Sun, jade and pink complete the five colours that code the five
services (`ui/tones.ts`). One typeface, Archivo: wide and heavy for
display (`.s-display`), condensed capitals for labels (`.s-label`); an
emphasised word wears a label (`<em>` is a tilted colour block, never
italic). Buttons are keys with a side that presses (`.s-key`); cards are
flat sheets with a navy rule. 3D is DOM only, in small bounded scenes:
the sorting table in the home hero, the card index, turning screen
slabs, the exploded audit page, slab stacks, the staff pass, and flaps
for section, headline and route transitions. `tone-*` classes remap the
semantic tokens for a coloured band. `.s-root` scope; `.s-chrome` for
the bar and footer around a case study. Reduced-motion and no-JS
fallbacks everywhere; the first paint is always the finished layout.
Sorted pages have their own dark theme (`prefers-color-scheme: dark`)
and declare `color-scheme: light dark`, which also keeps Safari 27.3's
Adaptive Dark Mode from repainting them; use `border-s-rule` /
`var(--s-rule)` for rules that must show in both.

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

## 7. Duo Discover (`/duo`, standalone public document)

See docs/DUO-UX-CONTRACT.md. The app directory is intentionally isolated from the marketing styles above. Its runtime token owner is public/duo/styles.css: lilac paper, dark ink and iris actions; readable system sans with compact Arial display headings. Real app icons and genuine owned Duo simulator media supply visual interest. Evidence, unavailable-media and ownership labels remain visible. Changes here must not affect other Flutterly routes.
