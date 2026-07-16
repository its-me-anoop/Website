# Flutterly — Design-grade engineering

The site of **Flutterly Ltd**, the one-person product studio of
**Anoop Jose** (Reading, UK). The homepage runs the
["Atelier" design language](./docs/ATELIER.md) — a warm cream gallery
with oversized Space Grotesk type revealed word by word, fanned
project cards with `@handle` chips, folder-tab browsing, marquee bands
and pill chrome. Case-study pages (`/projects/*`) keep the light
["Porcelain" system](./docs/DESIGN-SYSTEM.md).

## Stack

- **Next.js 16** (App Router, Turbopack) + **React 19**
- **Tailwind CSS v4** (token-driven `@theme`)
- **Framer Motion** everywhere (single `LazyMotion` provider, `m`
  components, reduced-motion aware)
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
[`docs/ATELIER.md`](./docs/ATELIER.md) for the homepage language, and
[`docs/DESIGN-SYSTEM.md`](./docs/DESIGN-SYSTEM.md) for the Porcelain
tokens used by the case-study pages.

## Highlights

- **Staggered word reveals** — headlines rise out of clipped line
  boxes word by word as they scroll into view, with tinted segments
  (terracotta, violet, ghost-muted).
- **Fanned art decks** — the hero spreads five project cards into a
  fan; the statement cluster fans open scroll-linked; `@handle`
  speech-bubble chips drift above both.
- **Gallery furniture** — a featured-work carousel, a folder-tab work
  browser, drifting community walls, a lime ticker band and marquee
  wordmarks, all in pill chrome on a warm cream canvas.
- **SEO** — metadata + Person/Organization JSON-LD, sitemap, robots,
  semantic HTML, and a fully reduced-motion-aware, accessible UI.

© 2026 Flutterly Ltd.
