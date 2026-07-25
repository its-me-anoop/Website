# Flutterly — Design-grade engineering

The site of **Flutterly Ltd**, the one-person product studio of
**Anoop Jose** (Reading, UK). It runs the
["Aurora" design language](./docs/AURORA.md) — a deep midnight-pine
canvas lit by slow-drifting aurora gradients, glass surfaces with
hairline gradient edges, film grain and one bright teal action colour.
Every page shares a single fixed backdrop, so scrolling reads as
movement through one continuous space.

The two sample client sites under `/demo/*` deliberately keep their
own scoped palettes: they exist to show prospective GP practices and
care homes a finished site of *theirs*, not of ours.

## Stack

- **Next.js 16** (App Router, Turbopack) + **React 19**
- **Tailwind CSS v4** (token-driven `@theme`)
- **Framer Motion** everywhere (single `LazyMotion` provider, `m`
  components, reduced-motion aware)
- A **canvas particle field** and CSS-only aurora/grain/grid layers,
  all `aria-hidden` and suspended when off-screen
- **Vitest** + Testing Library for tests, **Playwright** for the
  browser workflow
- **Self-hosted fonts** — Syne, Space Grotesk, and JetBrains Mono as
  latin variable woff2 subsets (~97KB total); case-study pages stay on
  system stacks

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build (typechecks too) |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npx vitest run` | Run the test suite |
| `npm run test:browser` | Headless-browser audit of every route |

## Project structure & design system

See [`docs/index.md`](./docs/index.md) for the architecture overview,
[`docs/AURORA.md`](./docs/AURORA.md) for the design language and the
effects kit, and [`docs/DESIGN-SYSTEM.md`](./docs/DESIGN-SYSTEM.md)
for the Porcelain tokens the case-study markup is built on.

## Highlights

- **One living backdrop** — drifting aurora fields, a masked
  engineering grid, a horizon glow and film grain, mounted once and
  fixed, so sections scroll *through* the light.
- **Word-by-word headlines** — display type resolves out of clipped
  line boxes with the blur burning off, tinted segments picking up the
  teal→aqua→sky ramp.
- **Glass everywhere it earns its keep** — frosted cards with gradient
  hairlines, a pointer spotlight, 3D tilt on hero artwork, magnetic
  buttons, and a rotating conic beam on the one featured card per page.
- **A bright interlude per page** — the densest content sits on a
  daylight panel, because a comparison table reads better on paper.
- **Accessible by construction** — WCAG 2.2 AA contrast on dark and
  light surfaces, full reduced-motion and reduced-transparency paths,
  real table and disclosure semantics, and a headless-browser audit of
  every route at phone and desktop sizes on every change.
- **SEO** — metadata + Person/Organization JSON-LD, sitemap, robots,
  semantic HTML throughout.

© 2026 Flutterly Ltd.
