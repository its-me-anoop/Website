# Design Language — "Signal"

The marketing site (home, GP practices, care homes, packages, Clear Path,
free audit, audit report, booking, accessibility statement) runs Signal.
Case-study pages keep Porcelain and the demo sites keep their own scopes.
Everything is scoped to `.signal-root` (see `Shell`).

## The idea

Flutterly's argument is that a healthcare website has to work for
everyone: the older patient, the anxious relative, the phone in a car
park. Signal makes that argument with the page itself instead of
decoration:

- **One accent, and it is the focus ring.** Signal yellow marks the one
  filled action, highlighted words and keyboard focus. Nothing else is
  coloured.
- **Type chosen for reading.** Archivo, a grotesque with a width axis,
  sets headlines in a slightly condensed, signage-like cut. Body text is
  Atkinson Hyperlegible Next, drawn by the Braille Institute for
  low-vision readers.
- **Effects that demonstrate the service.** The homepage lens shows the
  hero as someone with blurred vision, cataracts, glare or no colour
  vision might see it. The sample sites are real and working, in a frame.

What Signal deliberately avoids: gradients, glassmorphism, glows, neon,
floating decorative chips, fake browser chrome, sparkle separators,
icon-in-a-box bento grids and animated gradient text.

## Tokens (`src/app/globals.css`)

| Token | Value | Use |
|---|---|---|
| `--s-ink` | `#0f0f0e` | Dark canvas |
| `--s-on-ink` / `--s-on-ink-2` | `#f2f0eb` / `#aeaba3` | Text on ink (≈17:1 / ≈8.4:1) |
| `--s-paper` | `#f2f0eb` | Light bands (`.s-paper`) |
| `--s-on-paper` / `--s-on-paper-2` | `#121211` / `#56534c` | Text on paper (≈17:1 / ≈6.9:1) |
| `--s-signal` | `#ffd23f` | Action fill, highlight, focus. Ink on it ≈13:1 |
| `--s-line`, `--s-line-2`, `--s-line-paper` | | Hairlines |
| `--s-pass` `--s-warn` `--s-fail` | | Audit statuses on ink, each ≥ 4.5:1 |

Tailwind utilities are generated as `bg-s-*`, `text-s-*`, `border-s-*`.
Ink and paper bands alternate down each page; the closing band is yellow.

## Type

- `.s-display`: Archivo, weight 750, `font-stretch: 84%`, tracking −0.025em.
- `<em>` inside a display heading is a highlighter stroke (yellow behind
  ink). Where `animation-timeline: view()` is supported it draws in as the
  heading scrolls into view; otherwise it is simply present.
- `.s-label`: small uppercase Archivo for section labels.

## Effects

| Effect | Where | Notes |
|---|---|---|
| Vision lens (`home/VisionLens`, `effects/vision.ts`) | Home hero | CSS `backdrop-filter` per condition. Follows a mouse; taps move it on touch. Conditions are toggle buttons (`aria-pressed`) with a live description; the lens is `aria-hidden` |
| Live sample sites (`ui/LiveSite`) | Showcase, sector pages | Same-origin iframe at 1280px, scaled to fit, mounted only near the viewport, ≥1024px only; screenshot poster until loaded; phones get a screenshot and a link |
| Work index preview (`home/Work`) | Home | Preview beside the list wipes in (clip-path) for the hovered or focused row |
| Headline rise (`Display rise`) | Every h1 | Pure CSS, final state in SSR HTML |
| Highlighter draw | Emphasised words | Scroll-driven CSS only |
| `Reveal` | Sections | Short rise on entry |

`useMotionAllowed()` reads `prefers-reduced-motion` through
`useSyncExternalStore` with a `false` server snapshot, so SSR and
hydration always agree. Under reduced motion every animation is removed
and all content is visible.

## Accessibility

- One `<h1>` per page. Focus is a 3px signal-yellow outline (ink plus a
  yellow halo on paper bands).
- The sample-site showcase follows the WAI-ARIA tabs pattern.
- `npm run test:a11y` (axe, WCAG 2.2 A/AA) and `npm run test:browser`
  cover every route.

## Printed audit report

The PDF (`audit/print/PrintReport.tsx`) is a paper document and keeps its
light bone-and-coal palette (`--k-*` tokens, Zodiak and Switzer) via
`audit/print/print-parts.tsx`. On screen the report is Signal.
