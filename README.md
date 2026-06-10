# Anoop Jose — Developer Portfolio

The portfolio site of **Anoop Jose**, developer & designer and founder of
Flutterly Ltd (Reading, UK). Designed around the
["Noir" design system](./docs/DESIGN-SYSTEM.md): a cinematic, awwwards-style
dark language — oversized Outfit display type with outline-stroke moments,
one vermilion accent, film grain, marquee strips, a preloader, and
scroll-choreographed sections (inspired by the landing-page work showcased
on lafys.com).

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
