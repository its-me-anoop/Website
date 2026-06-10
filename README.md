# Flutterly — Product Studio

The site of **Flutterly**, the product studio of Anoop Jose (Reading, UK).
Designed around the ["Lumen" design system](./docs/DESIGN-SYSTEM.md): a
refined dark SaaS-studio language inspired by Lumio
(lumio.apollostudio.design) — sentence-case Outfit display type, small
all-caps mono labels, one calm teal accent, and a live animated studio
dashboard as the hero centrepiece.

## Stack

- **Next.js 16** (App Router, Turbopack) + **React 19**
- **Tailwind CSS v4** (token-driven `@theme`)
- **Framer Motion** — scroll-scrub, blur-in reveals, spring micro-interactions
- **Vitest** + Testing Library for tests
- **Outfit** (bundled local) display face + system body stack

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

## Project structure & design system

See [`docs/index.md`](./docs/index.md) for the architecture overview and
[`docs/DESIGN-SYSTEM.md`](./docs/DESIGN-SYSTEM.md) for tokens, primitives,
motion, and accessibility guidelines.

## Highlights

- **Type-led layout** — solid + hollow display pairs, numbered index rows,
  mono meta labels, content capped at 1320px.
- **Scroll choreography** — preloader curtain, mask line-reveals, sticky
  stacked process cards, hover-preview work index, double marquee strips,
  and a cross-browser liquid-glass lens over the hero.
- **Reusable primitives** in `src/components/ui/` (`RevealText`, `Preloader`,
  `Marquee`, `Button`, `LiquidGlass`).
- **SEO** — metadata + Person/Organization JSON-LD, sitemap, robots, semantic
  HTML, and a fully reduced-motion-aware, accessible UI.

© 2026 Flutterly Ltd.
