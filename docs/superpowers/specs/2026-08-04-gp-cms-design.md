# GP Website CMS — Design

**Date:** 2026-08-04 · **Status:** Approved for implementation (autonomous /goal session)

## Problem

The demo sites (`/demo/gp-practice`, `/demo/care-home`) are the studio's proof
of work, but their content lives in hand-written `data.ts` files with no
validation. Nothing stops a stale alert, a broken ISO date, a missing required
section, or content that drifts from NHS standards. When the studio builds a
*real* practice site, a practice manager cannot edit a TypeScript module.

Goal: a robust CMS layer for GP (and care-home) websites — schema-validated,
build-time-checked content that a non-developer could eventually edit, powering
the demos today and client sites tomorrow, and encoding NHS standards as
validation rules rather than tribal knowledge.

## Approaches considered

1. **Schema-validated file CMS (chosen).** Content in JSON under `content/`,
   Zod schemas as the single source of truth, typed loaders that fail the
   build on invalid content. No new runtime services; pages stay 100% server
   components. A git-based admin UI (Decap/Sveltia) or headless CMS can be
   layered on later because the schema is the contract.
2. **Status quo plus types.** Keep TS files, add `satisfies` constraints.
   Cheap, but no runtime rules (date sanity, phone formats, freshness),
   no editing story for non-developers, no NHS-rule enforcement.
3. **Headless CMS (Sanity/Payload/Decap now).** Real editing UI immediately,
   but adds an external service or admin surface, auth, and runtime deps to a
   demo repo that ships static server-rendered pages. Overkill today; the
   chosen design keeps this as a future layer, not a foundation.

## Architecture

```
content/
  gp-practice/
    practice.json        identity, contact, opening times, closures
    home.json            alert, tasks, wellbeing links
    appointments.json    routes, urgent-care cards, online triage copy
    prescriptions.json   ordering steps, pharmacy info, cut-offs
    services.json        clinic groups, self-referral routes
    team.json            staff groups & roles
    practice-info.json   policies (complaints, privacy, carers, PPG…)
    news.json            dated news items
    faqs.json            self-serve answers
  care-home/
    home.json …          same idea, care-home collections
src/lib/cms/
  schemas/gp.ts          Zod schemas for every GP collection
  schemas/care.ts        Zod schemas for care-home collections
  schemas/shared.ts      phone, date, href, image primitives + NHS rules
  load.ts                readContent(site, collection) → parse → cache
  gp.ts                  loadGpContent(): typed, validated GP bundle
  care.ts                loadCareContent(): typed bundle
  index.ts               public API
scripts/validate-content.mjs   `npm run cms:validate` (also used in tests/CI)
```

- **Schemas are the contract.** `z.infer` types replace the hand-written
  `as const` types. Pages import from `@/lib/cms`, never raw JSON.
- **Fail loudly at build time.** Loaders run during prerender; a Zod error
  aborts `next build` with a readable path (`gp-practice/news.json →
  items[2].iso: invalid date`). `npm run cms:validate` gives the same check
  without a build; a vitest suite runs it in CI.
- **Derived data lives in code, not content.** Display dates derive from ISO
  (single source); `tel:` hrefs derive from phone numbers; nav derives from a
  pages registry. Duplication in today's `data.ts` (date + iso, phone +
  phoneHref) disappears.

## NHS rules encoded in schemas

- UK phone format; demo content must use Ofcom's fictional ranges.
- ISO dates validated for real calendar dates; the loader sorts news
  newest-first so display order can never drift from the dates.
- Alerts carry `expires`; the loader drops expired alerts instead of showing
  stale banners (validation warns when an alert has expired).
- Image references must exist under `public/` and carry alt text ≥ 10 chars;
  team photos must not name fictional clinicians (existing house rule).
- Every page collection carries `reviewed` (ISO) — the NHS "page last
  reviewed" pattern — surfaced on inner pages and flagged when > 12 months.
- Required collections must exist per site: a GP site without appointments,
  prescriptions, or an accessibility statement fails validation.
- Opening times must cover all seven days exactly once.

## Migration & demo updates

Pages move from `@/components/demos/{gp,care}/data` to `@/lib/cms`. The
research workflow (NHS guidance, service-manual patterns, supplier
comparison, exemplar sites, WCAG 2.2/PSBAR) produces a gap analysis; content
gaps land as new JSON content and, where needed, new sections/pages. Findings
are recorded in `docs/research/` and drive the update pass.

## Testing

- **Unit (vitest):** schema rules (accept/reject fixtures), loader errors,
  derived-data helpers, and "all shipped content validates".
- **Existing suites** stay green: GP demo component tests keep passing
  against CMS-fed pages.
- **Browser workflow:** `npm run build && PORT=3100 npm start` +
  `BASE_URL=http://localhost:3100 npm run test:browser`.
- **Accessibility:** new axe-core (WCAG 2.2 A/AA) scan across all demo routes,
  wired as `npm run test:a11y`.

## Non-goals (YAGNI)

- No admin UI in this pass; the schema is designed so one can be added.
- No database, no auth, no server mutations.
- Marketing (Bloom) and case-study content stay as they are — the CMS scope
  is the sector demo sites the studio resells.

## Dependencies

`zod@^4` (prod dependency; used at build time only). Everything else uses
existing tooling (vitest, playwright). Axe scan adds `axe-core` as a dev
dependency driven through the existing Playwright install.
