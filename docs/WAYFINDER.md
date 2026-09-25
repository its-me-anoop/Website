# Design Language — "Wayfinder"

The marketing site (home, GP practices, care homes, packages, Clear Path,
free audit, audit report, booking, accessibility statement) runs
Wayfinder. It replaced the dark, shader-lit "Aurora" language.

## The idea

Flutterly builds websites that get people where they need to go:
patients to an appointment, families to the fees page, customers to
Pharmacy First. So the site itself behaves like the signage in a
well-run building. It uses a paper ground, sign-black plates, one signal
yellow, and arrows that do the pointing. It has no glass, glow or
gradients. Everything is a flat plate with crisp edges, the way real signs
are made.

The signature pieces all come from that idea:

| Piece | Where | What it does |
|---|---|---|
| **Fingerpost** (`home/Fingerpost`) | Home hero, sector heroes | An ink pole with arms that swing out on load. Every arm is a real link to a page on a sample site ("Book an appointment → Willowbrook Surgery"). |
| **Directory board** (`home/Directory`) | Home | Tabs per sector; each panel lists the questions visitors arrive with and the sample page that answers each. Rows flip down like split-flap plates on a tab change. |
| **Route line** (`home/Route`) | Home, Clear Path | The process as a transit line: four stops on a yellow line that fills as it scrolls into view and runs on past launch. |
| **Departures board** | Clear Path | The MSW dates on an ink board in mono type. |
| **Sign-plate buttons** (`ui/Button`) | Everywhere | The label, then the arrow in its own square. |
| **Yellow mark** (`.wf-mark`) | Headlines | A painted stripe under the words that matter. |

## Tokens (`src/app/globals.css`)

| Token | Value | Use |
|---|---|---|
| `--wf-paper` | `#f3f1ea` | Page ground |
| `--wf-paper-2` | `#e8e5db` | Alternate bands |
| `--wf-card` | `#fbfaf6` | Raised plates |
| `--wf-ink` | `#14171b` | Text and sign panels (≈15.9:1 on paper) |
| `--wf-ink-soft` | `#474c54` | Secondary text (≈7.6:1) |
| `--wf-muted` | `#5d626a` | Captions (≈5.4:1 paper, ≈4.9:1 paper-2) |
| `--wf-sign` | `#ffd21a` | **The action colour.** Always a fill (ink on it ≈12.4:1) or a mark on ink; never text on paper |
| `--wf-on-ink` / `--wf-on-ink-soft` | `#f3f1ea` / `#b7bbc1` | Text on ink (≈15.9:1 / ≈9.3:1) |
| `--wf-pass` `--wf-warn` `--wf-fail` | | Audit statuses, each ≥ 4.5:1 on paper and paper-2 |

Tailwind utilities are generated as `bg-wf-*`, `text-wf-*`, `border-wf-*`.
Surfaces flip their children with `.wf-on-ink` (ink boards) and
`.wf-on-sign` (the yellow closing band): leads, links, marks, buttons and
focus rings all read the surface they sit on.

## Type

One superfamily: **Atkinson Hyperlegible Next** with **Atkinson
Hyperlegible Mono**, designed by the Braille Institute so that easily
confused characters (I l 1, O 0, rn m) stay distinct for readers with
low vision. For a studio that sells accessibility, the typeface is part
of the argument. Both fonts are SIL OFL and self-hosted in `src/fonts/`.

- **Display** (`.wf-display`): weight 800, tracking −0.034em, leading 0.96.
- **Body**: weight 400, 17–20px, generous leading.
- **Sign labels** (`.wf-label`): the mono, uppercase, tracked 0.08em.

## Layering

Component classes (`.wf-*`) live in `@layer components`, so Tailwind
utilities can adjust them per use. Root, focus and selection rules stay
unlayered. The Porcelain heading rule is scoped with
`:not(.wayfinder-root *)` so it no longer overrides heading utilities
here, and Porcelain and demo pages are unchanged.

## Motion

Motion is purposeful and CSS-first, and every piece is removed for
`prefers-reduced-motion`.

- Fingerpost arms swing out from the pole on load (`wf-swing`).
- Directory rows flip in on tab change (`wf-flip`).
- The route line fills with scroll where `animation-timeline: view()`
  is supported, and is simply drawn elsewhere.
- `motion/Reveal` rises content in on first scroll. It only hides an
  element after hydration, when that element starts below the fold and
  motion is allowed. Content is never invisible without JavaScript, and
  nothing above the fold waits to paint.
- Hero copy settles (`wf-settle`) without ever starting transparent,
  so LCP is recorded.
- In-app navigations get an ink and yellow curtain that slides off to the
  right (`app/template.tsx`).

No framer-motion is used by the marketing components. The app-wide
`LazyMotion` provider remains for the Porcelain case-study pages.

## Accessibility

- Focus is a two-tone ring (yellow inside, ink outside), visible on
  paper, yellow and ink alike.
- One `<h1>` per page. The fingerpost reads task first ("Book an
  appointment, Willowbrook Surgery sample site") even though the place
  sits above the task visually.
- The sample directory follows the WAI-ARIA tabs pattern (arrows,
  Home/End, roving tabindex).
- The fingerpost switches to a single-sided post by container query when
  its column is narrower than 520px, so labels are never squeezed.
- `npm run test:a11y` (axe, WCAG 2.2 A/AA) and `npm run test:browser`
  cover every route. The browser workflow also follows every fingerpost
  arm and every directory question to a live page.

## Brand assets

`node scripts/render-brand-assets.mjs` renders the 1200×630 social card
(`public/og-wayfinder.png`) and the icons (`src/app/icon.png`,
`apple-icon.png`, `favicon.ico`). The icons show the Flutterly wings as
an ink pictogram on a yellow plate, from the real fonts and logo.

## Printed audit report

The PDF (`audit/print/PrintReport.tsx`) is a paper document with its own
bone-and-coal palette (`--k-*` tokens, Zodiak and Switzer). On screen
the report is Wayfinder.
