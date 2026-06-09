# Anoop Jose — Developer Portfolio

The portfolio site of **Anoop Jose**, developer & designer and founder of
Flutterly Ltd (Reading, UK). Designed around the
["Porcelain" design system](./docs/DESIGN-SYSTEM.md): a light, Apple-inspired
language built on generous whitespace, a single blue accent, SF-style system
typography, and calm scroll-driven motion.

## Stack

- **Next.js 16** (App Router, Turbopack) + **React 19**
- **Tailwind CSS v4** (token-driven `@theme`)
- **Framer Motion** — scroll-scrub, blur-in reveals, spring micro-interactions
- **Vitest** + Testing Library for tests
- **System font stacks** — zero font payload, native SF rendering on Apple
  devices

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

- **Whitespace-first layout** — alternating white/`#f5f5f7` bands, one black
  contrast finale, content capped at 1200px.
- **Apple-style motion** — a scroll-scrubbed iPhone demo in the hero, blur-in
  headlines, frosted navigation, shared-element transitions.
- **Reusable primitives** in `src/components/ui/` (`Button`, `SectionHeader`,
  `LiftCard`, `Reveal`, `Marquee`, `PhoneFrame`).
- **SEO** — metadata + Person/Organization JSON-LD, sitemap, robots, semantic
  HTML, and a fully reduced-motion-aware, accessible UI.

© 2026 Flutterly Ltd.
