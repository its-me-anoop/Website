# Three new demo sites — Design

**Date:** 2026-08-04 · **Status:** Complete — awaiting user approval.
Sector research: `docs/research/sector-{dental,pharmacy,physio}.md`;
per-demo blueprints: `docs/research/blueprint-{dental,pharmacy,physio}.md`.

## What

Three new fictional demo sites join Willowbrook Surgery and Oakfield House
as sales artifacts, each CMS-fed, WCAG 2.2 AA, `robots: noindex`, prefixed
by the SampleRibbon, server-rendered, in the Reading fictional universe
(Ofcom 0118 496 phone range, invented addresses, sample regulatory numbers
clearly marked as samples):

| Demo | Route | Identity | Phone |
|---|---|---|---|
| Dental practice | `/demo/dental-practice` | **Kennet Bridge Dental** — mixed NHS/private practice by the Kennet in central Reading | 0118 496 0234 |
| Community pharmacy | `/demo/pharmacy` | **Willowbrook Pharmacy** — the independent pharmacy two doors from Willowbrook Surgery (same fictional village as the GP demo; the two demos cross-reference, which sells ecosystem thinking) | 0118 496 0567 |
| Physiotherapy clinic | `/demo/physio-clinic` | **Forbury Physiotherapy** — private clinic by Forbury Gardens | 0118 496 0678 |

## Design systems (three new scopes; never leak tokens)

Deliberately three different directions — the demo pages ARE the portfolio:

1. **Dental — `.demo-dental-root`, `--ddt-*`.** Quietly premium clinical
   restraint: porcelain-warm canvas `#fbfaf8`, graphite ink `#20262b`,
   deep petrol action `#0e6b78`, warm sand band `#f3ede2` for fees/private
   sections. System/Geist type only — hierarchy carried by weight and
   tight tracking, not a display face. Thin rules, generous whitespace.
2. **Pharmacy — `.demo-pharm-root`, `--dph-*`.** Task-first community
   green: white canvas, mint tint `#eef4ef`, deep ink `#1d2a22`, pharmacy
   green action `#046b3b`, NHS-adjacent conventions (patients arrive on
   NHS tasks) but unmistakably not the GP demo: green masthead, cross
   motif, rounded service tiles. System type.
3. **Physio — `.demo-physio-root`, `--dpy-*`.** Athletic editorial:
   warm paper `#faf7f2`, slate-navy ink `#232a33`, coral action
   `#c2452f`, Space Grotesk display over system body, oversized
   condition-index typography, asymmetric layouts.

All palettes get AA-checked by the axe audit; exact values may shift a
step darker during verification. Focus styles: each scope defines a
high-contrast focus ring in its accent family.

## Architecture (mirrors the existing CMS exactly)

Per demo `<site>` ∈ {dental-practice, pharmacy, physio-clinic}:

- `content/<site>/*.json` — collections per the research blueprint
- `src/lib/cms/schemas/<slug>.ts` + `src/lib/cms/<slug>.ts` loader
  (slugs: dental, pharmacy, physio) reusing `schemas/shared.ts`
  primitives and `readCollection`
- `src/components/demos/<slug>/` — Shell, links.ts, tests
- `src/app/demo/<site>/` — layout.tsx (noindex metadata + shell) + pages,
  including an accessibility statement page per demo
- Token block in `globals.css` (pre-wired before build agents run)

**Shared-file ownership:** build agents touch ONLY their namespace.
Shared files — `globals.css`, `src/lib/cms/index.ts`, audit-script
routes, Bloom sectors strip, docs — are wired by the orchestrator
afterward, so three agents can build in parallel without conflicts.

## Marketing hookup (light)

A compact "More sample sites" strip in the Bloom home Sectors section
linking the three new demos (title + one-liner each). SampleRibbon on
new demos points to `/packages` ("Get a site like this…" per sector).
No new sector marketing pages.

## Pages & content models (from the research blueprints)

Each demo: 6 sector pages + an accessibility statement (7 routes). Full
field-level content models are in `docs/research/blueprint-*.md` — the
build follows them. Highlights:

**Kennet Bridge Dental** — Home · Fees (NHS Band 1/2/3 table £27.90 /
£76.60 / £332.10 dated "correct as of April 2026", one-charge-per-course
and free-repeat rules, private from–to ranges per GDC Standard 2.4) ·
Treatments (inline pricing, never "call for a quote") · New patients
(incl. nervous-patient section with named accommodations) · Urgent &
out-of-hours (own same-day policy → NHS 111 → A&E red flags) · About,
team & complaints (GDC-style sample numbers per clinician; **dual-track
complaints**: NHS → ICB → PHSO vs private → Dental Complaints Service).
Collections: practice, fees-nhs (own file — one edit each April),
fees-private, treatments, new-patients, urgent, team, complaints.

**Willowbrook Pharmacy** — Home (Pharmacy First + repeats task-first) ·
Pharmacy First (all seven conditions with age bands) · Services (every
service badged NHS-free vs Private-paid via a `funding` enum) · Repeat
prescriptions (NHS App nomination steps) · About & team (superintendent
pharmacist with sample GPhC number, consultation-room explainer) ·
Hours & feedback (structural lunch-closure hours `{day, morning,
afternoon}`, complaints route). **Footer regulatory block on every
page**: premises no. + superintendent + legal entity, sample-marked.
No e-commerce patterns, no named POMs, no discontinued internet-pharmacy
logo. Collections: pharmacy, home, pharmacy-first, services,
prescriptions, team, feedback.

**Forbury Physiotherapy** — Home · Conditions & treatments (ASA-safe
MSK taxonomy; assessment/management language, never "cure") · Your first
appointment (four beats, what to wear/bring, **self-pay vs insured fork**
as first-class content) · Pricing (public table, course-length honesty,
cancellation incl. the insurer detail) · Team (sample HCPC numbers,
"Chartered" only on individuals, dated institution-level qualifications) ·
Trust & regulation (protected title, the HCPC-not-CQC line, CSP,
indemnity/DBS/ICO). Collections: clinic, home, conditions, treatments,
first-appointment, pricing, team, trust.

Regulatory branding rule for all three: regulator names in text only —
no GDC/CQC/GPhC/CSP logos or official widgets on a fictional site, and
every registration number, rating and price marked as a sample in copy.

## Testing

Same bar as the existing demos: schema/loader/shipped-content vitest
suites per demo, page component tests (one h1, alt text, key journeys),
routes added to `test:browser` and `test:a11y`, production build, visual
verification. Review/fix loop via workflow before the final audit.
