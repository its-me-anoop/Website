# Demo-site CMS — schema-validated content layer

The two demo sites (`/demo/gp-practice`, `/demo/care-home`) are fed by a
file-based CMS: JSON content under `content/`, Zod schemas as the contract,
and typed loaders that fail the build with a readable message when an edit
breaks a rule. Design spec: `docs/superpowers/specs/2026-08-04-gp-cms-design.md`.
Research behind the content model: `docs/research/`.

## Layout

```
content/
  gp-practice/          Willowbrook Surgery (one file per collection)
    practice.json       identity, phone, address, hours, Enhanced Access,
                        out-of-hours, ICB, access notes, accepting patients
    home.json           alert (with expiry), primary/more tasks, wellbeing links
    appointments.json   booking routes, urgent lists, home visits, online hours
    prescriptions.json  ordering steps
    register.json       catchment, registration steps, notes
    services.json       clinic groups, self-referral routes with direct links
    team.json           staff groups (names, quals, roles), GP earnings copy
    practice-info.json  CQC rating, FFT results, policies
    news.json           dated items (loader sorts newest-first)
    faqs.json           self-serve answers
    accessibility.json  statutory statement sections (PSBAR Reg 7 + GDS shape)
  care-home/            Oakfield House: home/care/life/families/careers.json
src/lib/cms/
  index.ts              public API: loadGpContent(), loadCareContent()
  schemas/              Zod schemas — one export per collection
  load.ts               readCollection(): parse + readable errors
  gp.ts, care.ts        loaders with derived data
```

## Rules the schemas enforce

- UK phone formats; ISO dates that are real calendar dates; emails.
- Opening times must cover all seven days exactly once.
- Exactly two primary tasks on the GP home page; policy ids kebab-case
  (they become anchors); at least two registration steps; the
  accessibility statement must include every statutory section.
- Every collection carries `reviewed` (ISO date) — loaders return a
  `stale` list of collections older than 12 months (the GMS contractual
  review cadence), and pages render "Page last reviewed / Next review
  due" from it.

## Derived data (never stored twice)

- `tel:` hrefs derive from display phone numbers.
- News display dates derive from ISO dates; items are date-sorted.
- Alerts with a past `expires` are dropped at load time.
- `{phone}`, `{name}`, `{address}` placeholders in any string are filled
  from `practice.json`, so practice-wide facts live in one file.

## Editing workflow

1. Edit a JSON file under `content/`.
2. `npm run cms:validate` (or any build/test) — a bad edit fails with
   the file, field and rule, e.g.
   `content/gp-practice/news.json: items.2.date: not a real calendar date`.
3. Pages pick the change up on the next render — no code edits needed.

The schema layer is deliberately the contract a future admin UI or
git-based CMS (Decap/Sveltia) would sit on; nothing in the pages knows
content comes from JSON files.

## Tests

- `src/lib/cms/*.test.ts` — schema rules, loader derivations, error paths.
- `src/lib/cms/shipped-content.test.ts` — the shipped demo content must
  always validate (this is what `npm run cms:validate` runs).
- `npm run test:a11y` — axe-core WCAG 2.2 A/AA scan of every route at
  two viewports (needs the production server on :3100, like
  `test:browser`).
