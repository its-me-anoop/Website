# Flutterly — Design-grade engineering

The site of **Flutterly Ltd**, the one-person product studio of
**Anoop Jose** (Reading, UK). It runs the
["Aurum" design language](./docs/AURUM.md) — a warm cream paper canvas
under drifting amber washes, cocoa ink, plates that read as pressed
card, Bricolage Grotesque over Figtree, and one three-colour rule
— teal → amber → rose — drawn at the seams between sections. Every
page shares a single fixed ground, and two night bands invert it by
re-declaring the same tokens rather than by forking the components.

The two sample client sites under `/demo/*` deliberately keep their
own scoped palettes: they exist to show prospective GP practices and
care homes a finished site of *theirs*, not of ours.

## Stack

- **Next.js 16** (App Router, Turbopack) + **React 19**
- **Tailwind CSS v4** (token-driven `@theme`)
- **Framer Motion** everywhere (single `LazyMotion` provider, `m`
  components, reduced-motion aware)
- A **canvas particle field** and CSS-only wash/tooth/grid layers,
  all `aria-hidden` and suspended when off-screen
- **Vitest** + Testing Library for tests, **Playwright** for the
  browser workflow
- **Self-hosted fonts** — Bricolage Grotesque (with its optical-size
  axis) and Figtree as latin variable woff2 subsets (~97KB total),
  plus Syne, un-preloaded, for the care-home demo alone

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
| `npm run test:contrast` | WCAG 2.2 AA contrast audit of every rendered text node |

## Project structure & design system

See [`docs/index.md`](./docs/index.md) for the architecture overview,
[`docs/AURUM.md`](./docs/AURUM.md) for the design language and the
effects kit, and [`docs/DESIGN-SYSTEM.md`](./docs/DESIGN-SYSTEM.md)
for the Porcelain tokens the case-study markup is built on.

## Highlights

- **One living ground** — drifting amber, rose and teal washes, a
  masked engineering grid and paper tooth, mounted once and fixed, so
  sections scroll *through* the light.
- **One rule, four weights** — teal → amber → rose: 3px between
  sections, 7px at the foot of the fold and the closing band, a tick
  under a heading, and a hairline that fills as the page scrolls.
- **Two atmospheres, one component set** — `.au-night` re-declares the
  same tokens the cream page uses, so a plate, a hairline or a button
  inverts without a variant prop.
- **Word-by-word headlines** — Bricolage resolves out of clipped line
  boxes with the blur burning off, one phrase per heading picking up
  the rule's gradient.
- **Work shown on hardware** — MacBook, iMac and phone frames drawn
  entirely in CSS, so there is no mock-up raster to ship and the
  aluminium re-tints with the ground it sits on.
- **Per-card light** — a card sets `--au-brand` and its hover edge,
  shadow bloom and pointer spotlight all take that colour.
- **Accessible by construction** — WCAG 2.2 AA on cream and cocoa
  alike, proven by a contrast audit that walks every rendered text node
  on every route; full reduced-motion and reduced-transparency paths,
  real table and disclosure semantics, and a headless-browser audit of
  every route at phone and desktop sizes on every change.
- **SEO** — metadata + Person/Organization JSON-LD, sitemap, robots,
  semantic HTML throughout.

© 2026 Flutterly Ltd.
