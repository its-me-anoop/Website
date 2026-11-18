# Flutterly — Design Context

Six scoped design systems coexist. Never leak tokens across scopes.

## 1. Rooms (marketing: home, services, sectors, packages, Clear Path, audit, booking, accessibility, 404)

See docs/ROOMS.md. Every section is a room: a wall of one flat colour
(a `tone-*` class), a floor of another (`ui/Room.tsx`), and a few things
standing in it. Paper `#f4efe8` and ink `#201e1f` are the neutrals;
cobalt `#0b41c2` is the studio's wall; **vermilion `#fc4109` is the dot
and the action on paper** (pink on cobalt, ink on a bright wall). Pink,
lilac, sun, mint and ochre are the other walls; bottle green and tomato
are floors only. Five of the colours code the five services
(`ui/tones.ts`). Three faces: Bricolage Grotesque, heavy and tight for
display (`.s-display`) and light for a statement (`.s-say`); Instrument
Serif italic for the one emphasised word (`<em>`, in the tone's mark
colour); Cutive Mono for captions (`.s-label`), with `##` before a
section label and `>` before small print. Every control is a flat pill
(`.s-key`); cards are flat sheets with 24–28px corners and no outline or
shadow. The bar is a row of floating pills; the pink **index** pill
opens the site as cards on an ochre wall. One vermilion dot travels
down every page from anchor to anchor (`data-dot`, see
`effects/DotTrail.tsx`), and the home hero is a scene the scroll plays:
the dot fixes twelve stickers one by one. Motion is flat except two
small DOM scenes (the exploded audit page and the slab stack). `tone-*`
classes remap the semantic tokens for a coloured room. `.s-root` scope;
`.s-chrome` for the bar and footer around a case study. Reduced-motion
and no-JS fallbacks everywhere; the first paint is always the finished
layout. Rooms pages have their own dark theme
(`prefers-color-scheme: dark`) and declare `color-scheme: light dark`,
which also keeps Safari 27.3's Adaptive Dark Mode from repainting them;
use `border-s-rule` / `var(--s-rule)` for rules that must show in both.

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
