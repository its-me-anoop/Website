# Flutterly — Digital by nature.

The site of **Flutterly Ltd**, the one-person studio of **Anoop Jose**
(Reading, UK) for **websites, apps, IT support, social media and SEO**,
with a specialism in accessible healthcare websites.

The studio homepage introduces the work with a copper wing over dark water. The portfolio can be filtered by website or app. Service pages, booking, the website audit and project stories share the Flutterly navigation, and the five healthcare demonstration sites each have their own patient-facing identity.

## Stack

- **Next.js 16** (App Router, Turbopack) + **React 19**
- **Tailwind CSS v4** (token-driven `@theme`)
- **Framer Motion** (single `LazyMotion` provider, `m` components,
  reduced-motion aware)
- **Vitest** + Testing Library for tests, **Playwright** for the
  browser workflow and axe-core accessibility audit
- **Self-hosted fonts**: Archivo and Newsreader italic as woff2 in
  `src/fonts/`, for the marketing pages and the printed audit report;
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
| `npm run test:contrast` | Worst-case contrast of hero and closing-band text (server on :3100) |
| `node scripts/og-card.mjs` | Re-render the two social cards |

## Project structure & design system

See [`docs/index.md`](./docs/index.md) for the architecture overview,
[`docs/SORTED.md`](./docs/SORTED.md) for the marketing language,
[`docs/DESIGN-SYSTEM.md`](./docs/DESIGN-SYSTEM.md) for the Porcelain
tokens used by the case-study pages, and [`DESIGN.md`](./DESIGN.md) for
the demo-site scopes.

## Highlights

- **The instant audit**: paste a website address into the audit bar,
  press the arrow, and `/audit` fetches the page server-side, runs about
  sixty checks across seven areas (accessibility, speed, search,
  content, mobile, security, local presence), and renders a scored,
  prioritised report with a sales section keyed to the weakest areas and
  a prefilled email for the written follow-up. The engine lives in
  `src/lib/audit/` (see [`docs/AUDIT.md`](./docs/AUDIT.md)); the API is
  `GET /api/audit?url=…`, rate-limited, SSRF-guarded, nothing stored.
- **Portfolio**: real client websites and studio-built apps, with working links to the client site, product page or case study.
- **Showcase tabs**: keyboard-accessible previews of five healthcare sample sites.
- **Accessibility as a feature**: WCAG 2.2 AA contrast on every pair,
  one `<h1>` per page, skip link, keyboard-operable menu and tabs,
  `prefers-reduced-motion` honoured everywhere, axe audited.
- **SEO**: per-route metadata, Person / Organization / Service / FAQ
  JSON-LD, sitemap and robots, shared constants in `src/lib/site.ts`.

© 2026 Flutterly Ltd.
