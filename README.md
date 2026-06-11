# Flutterly — Design-grade engineering

The site of **Flutterly Ltd**, the one-person product studio of
**Anoop Jose** (Reading, UK). The homepage runs the
["Aurora" design language](./docs/AURORA.md) — obsidian black under a
WebGL aurora shader, glass surfaces, Syne display type with
outlined-stroke headlines, and scroll-driven choreography. Case-study
pages (`/projects/*`) keep the light
["Porcelain" system](./docs/DESIGN-SYSTEM.md).

## Stack

- **Next.js 16** (App Router, Turbopack) + **React 19**
- **Tailwind CSS v4** (token-driven `@theme`)
- **Hand-rolled motion** on the homepage (WebGL shader, scroll reveals,
  sticky stacking) + **Framer Motion** on case-study pages
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
[`docs/AURORA.md`](./docs/AURORA.md) for the homepage language, and
[`docs/DESIGN-SYSTEM.md`](./docs/DESIGN-SYSTEM.md) for the Porcelain
tokens used by the case-study pages.

## Highlights

- **WebGL aurora hero** — a domain-warped fbm shader, mouse-reactive
  and dimming as you scroll, under film grain and a top-light vignette.
- **Scroll choreography** — intro wipe, blur-rise reveals,
  sticky-stacking work cards that scale and dim as the next slides
  over, a self-drawing process line, dual-direction stack marquees,
  3D-tilt service cards, and a magnetic email CTA.
- **Glass everywhere** — floating capsule nav, frosted project cards
  and chips, all real `backdrop-blur` with inner highlights.
- **SEO** — metadata + Person/Organization JSON-LD, sitemap, robots,
  semantic HTML, and a fully reduced-motion-aware, accessible UI.

© 2026 Flutterly Ltd.
