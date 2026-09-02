# Flutterly — Websites for GP practices and care homes

The site of **Flutterly Ltd**, the one-person product studio of
**Anoop Jose** (Reading, UK). The marketing pages (home, GP practices,
care homes, packages, free audit, accessibility) run the
["Kiln" design language](./docs/KILN.md): a warm bone canvas, deep coal
bands, Zodiak serif display over Switzer body, one vermilion action
colour, a floating pill nav and an audit bar as the hero action.
Case-study pages (`/projects/*`) keep the light
["Porcelain" system](./docs/DESIGN-SYSTEM.md), and five fictional
sample sites under `/demo/*` each carry their own sector-specific scope.

## Stack

- **Next.js 16** (App Router, Turbopack) + **React 19**
- **Tailwind CSS v4** (token-driven `@theme`)
- **Framer Motion** (single `LazyMotion` provider, `m` components,
  reduced-motion aware)
- **Vitest** + Testing Library for tests, **Playwright** for the
  browser workflow and axe-core accessibility audit
- **Self-hosted fonts**: Zodiak and Switzer as woff2 in `src/fonts/`;
  case-study and demo pages stay on system stacks

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
| `npm run cms:validate` | Validate shipped demo content against the schemas |
| `npm run test:browser` | Headless-browser audit of every route (server on :3100) |
| `npm run test:a11y` | axe-core WCAG 2.2 A/AA audit of every route (server on :3100) |

## Project structure & design system

See [`docs/index.md`](./docs/index.md) for the architecture overview,
[`docs/KILN.md`](./docs/KILN.md) for the marketing language,
[`docs/DESIGN-SYSTEM.md`](./docs/DESIGN-SYSTEM.md) for the Porcelain
tokens used by the case-study pages, and [`DESIGN.md`](./DESIGN.md) for
the demo-site scopes.

## Highlights

- **The audit bar**: paste a website address, press the arrow, and a
  prefilled audit request opens in your mail client. No backend, nothing
  stored. It is the hero action and the closing action on every page.
- **Fanned strip**: seven finished sites swing away from the centre in
  3D, each a real link, the ends bleeding off the viewport.
- **Showcase tabs**: an accessible tablist of the five sample sites in
  coal browser frames, with arrow-key navigation.
- **Curved joins**: `clip-path` bites where the bone canvas meets a
  photograph or a coal band.
- **Editorial rows, not cards**: hairline-separated rows with oversized
  serif numerals for features, checks and personas; package cards are
  the only cards and they sit on coal.
- **Accessibility as a feature**: WCAG 2.2 AA contrast on every pair,
  one `<h1>` per page, skip link, keyboard-operable menu and tabs,
  `prefers-reduced-motion` honoured everywhere, axe audited.
- **SEO**: per-route metadata, Person / Organization / Service / FAQ
  JSON-LD, sitemap and robots, shared constants in `src/lib/site.ts`.

© 2026 Flutterly Ltd.
