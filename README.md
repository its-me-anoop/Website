# Flutterly Limited — Digital delivery

The website of **Flutterly Limited**, a digital delivery company led by
**Anoop Jose** in Reading, UK. Flutterly provides accessible websites and
digital products, business email and collaboration setup, social media
campaign support and ongoing technical care. GP practices and care homes are
core specialisms. Marketing pages use the ["Bloom" language](./docs/BLOOM.md),
while case-study pages (`/projects/*`) retain the light
["Porcelain" system](./docs/DESIGN-SYSTEM.md).

## Stack

- **Next.js 16** (App Router, Turbopack) + **React 19**
- **Tailwind CSS v4** (token-driven `@theme`)
- **Framer Motion** everywhere (single `LazyMotion` provider, `m`
  components, reduced-motion aware)
- **Vitest** + Testing Library for tests, **Playwright** for the
  browser workflow
- **Self-hosted fonts** — Archivo and Atkinson Hyperlegible Next for the
  marketing experience, with the existing project-page font assets retained

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
[`docs/BLOOM.md`](./docs/BLOOM.md) for the marketing language, and
[`docs/DESIGN-SYSTEM.md`](./docs/DESIGN-SYSTEM.md) for the Porcelain tokens
used by the case-study pages. The custom, reusable GP website platform MVP is
documented in [`docs/GP-CMS.md`](./docs/GP-CMS.md).

## GP Websites CMS demo

- `/cms` opens the fictional multi-practice workspace directory.
- `/cms/[workspace]` opens the shared, task-led practice admin.
- `/practice/[workspace]` renders the matching branded public GP website.

The demo saves changes in browser-local storage only. It has no production
authentication, tenant isolation, database, patient data or clinical-system
integration. See the CMS architecture note for the Vercel deployment model,
future private-repository boundary and controlled upgrade strategy.

## Marketing routes

- `/services` brings the complete delivery offer into one clear structure.
- `/gp-websites` and `/care-home-websites` explain the sector specialisms.
- `/business-email` covers professional email and collaboration setup.
- `/social-media-marketing` covers campaign and content support.
- `/packages` and `/free-audit` provide clear commercial entry points.
- `/cookie-policy` documents browser storage and optional consent categories.
- `/demo/*` routes are complete fictional sample sites used as proof.

© 2026 Flutterly Ltd.
