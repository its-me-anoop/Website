# Instant website audit

The audit bar on every Kiln page submits a native GET form to
`/audit?url=…`. That page calls `GET /api/audit`, which fetches the
site server-side, runs the check modules and returns a scored report.
The page then renders the report with a sales section keyed to the
weakest areas and a prefilled email for the written follow-up. Nothing
is stored beyond a short in-memory cache.

## Flow

```
AuditBar (primitives.tsx)   native <form action="/audit" method="get">
        │
        ▼
/audit  (app/audit/page.tsx → kiln/audit/ReportPage.tsx, client)
        │  fetch /api/audit?url=…&sector=…   (70 s client timeout)
        ▼
/api/audit (app/api/audit/route.ts, Node runtime)
        │  normaliseUrl → cache → rate limit → runAudit
        ▼
lib/audit/run.ts
        │  safeFetch main page (+ robots.txt, sitemap, http→https, favicon)
        │  parsePage → PageFacts, sector + platform detection
        │  checks/*  → Check[]      score.ts → categories, score, grade,
        ▼             priorities, verdict
AuditReport (types.ts)
```

## Safety

Fetching arbitrary addresses from the server is the risky part, so the
guard rails are layered:

- `url.ts` — `normaliseUrl` accepts bare hosts, adds `https://`, rejects
  non-HTTP schemes, credentials and single-label names, and classifies
  IP literals (loopback, link-local / cloud metadata, RFC 1918, CGNAT,
  IPv6 ULA / mapped). `isBlockedHostname` refuses `localhost`,
  `.local`, `.internal`, `.lan` and `.arpa` names.
- `guard.ts` — `assertPublicHost` resolves every hostname with DNS and
  refuses if any returned address is private. This runs on the first
  request and again on every redirect hop.
- `fetch.ts` — `safeFetch` follows redirects manually (max 6, each hop
  re-guarded), enforces a wall-clock deadline (15 s for the main page,
  shorter for side requests), caps the body at 2 MB, only accepts HTML
  content types for the main document, and records TTFB and total time.
  A named `User-Agent` (`FlutterlyAudit/1.0`) identifies the crawler.
- `route.ts` — 8 audits per IP per minute, 10-minute result cache
  (200 entries), `Cache-Control: private, no-store`, `maxDuration = 60`.
  Every failure is an `AuditError` with a stable `code` and a message
  written for the user, mapped to 400 / 422 / 429 / 504.

## Checks

Each module in `lib/audit/checks/` exports a `CheckModule` that takes
the `AuditContext` (`PageFacts`, parsed document, headers, side
requests, sector) and returns `Check[]`. A check has a stable `id`,
`category`, `status` (`pass` | `warn` | `fail` | `info`), `impact`
(`high` | `medium` | `low`), a plain-English `title` and `detail`, an
optional `fix`, and optional `evidence` strings shown under the row.

| Category | Weight | Examples |
|---|---|---|
| `accessibility` | 20 | `lang`, alt text, heading order, form labels, link text, zoom lock, landmarks, iframe titles, accessibility statement |
| `content` | 18 | word count, readability, phone / address / hours, privacy, complaints, freshness, placeholder text, sector tasks (appointments, prescriptions, CQC, fees, Pharmacy First…) |
| `performance` | 17 | TTFB, total load, HTML size, compression, render-blocking scripts, script/stylesheet counts, third parties, image sizing / lazy loading / formats, fonts, caching, client-rendered |
| `seo` | 15 | title, description, indexability, canonical, redirect chain, cross-site redirect, robots.txt, sitemap, Open Graph, Twitter, structured data, favicon, internal links |
| `mobile` | 12 | viewport, fixed-width layouts, plugins, `tel:` links, responsive images, polish (theme-colour, icons), text size |
| `security` | 10 | HTTPS, http→https redirect, HSTS, CSP, clickjacking, hardening headers, mixed content, information disclosure, outdated libraries, cookies |
| `local` | 8 | LocalBusiness / MedicalOrganization schema, NAP consistency, location in title / description, map, geo meta, reviews |

Sector-specific content checks are gated on `ctx.sector`. The sector is
detected from the page text (`page.ts`) and can be overridden from the
report header, which re-runs the audit with `?sector=`.

Pages that ship almost no server-rendered text are flagged
`clientRendered`. Content checks that depend on text then report as
`info` rather than failing the site for something the crawler could not
see, and `perf-client-rendered` explains the trade-off.

## Scoring

`score.ts`:

- Status values: pass 1, warn 0.5, fail 0. `info` is shown but never
  scored. Each check is weighted by impact (high 3, medium 2, low 1).
- A category score is the weighted mean × 100. The overall score is the
  category scores weighted by the table above. Categories with no
  scorable checks are dropped from the mean.
- Grades: A ≥ 90, B ≥ 75, C ≥ 60, D ≥ 45, else E. `verdictFor` writes
  a one-line summary addressed to the sector's audience.
- `prioritise` orders failing then warning checks by impact, then by
  category weight, and returns the top fixes for the "fix these first"
  list and the email summary.

## Report UI

`kiln/audit/ReportPage.tsx` derives its state from the `url` and
`sector` search params:

- **idle** — no address: an entry form with the audit bar.
- **loading** — `Progress` lists the stages while the request runs.
- **error** — `ErrorState` shows the message, a retry for transient
  codes (`timeout`, `unreachable`, `rate_limited`, `internal`) and a
  `mailto:` for the written audit.
- **done** — `ReportHeader` (score dial, page facts, sector override),
  `CategoryList` (expandable rows), `Priorities`, `Pitch` (weakest
  areas → what Flutterly builds, suggested package, prefilled written-
  audit email, booking link) and the closing `CtaBand`.

## The PDF

"Save as PDF" in the report header calls `window.print()`. What prints
is not the web page but `kiln/audit/print/PrintReport.tsx`, a designed
A4 document rendered next to the interactive report and swapped in by
`@media print` (`.k-screen` hides, `.k-pdf` shows). It shares the same
tokens, fonts and components, so it is the Kiln language on paper:

1. **Cover** (coal, full bleed): host, title, platform tags, a bone card
   with the score dial, grade, verdict and facts strip, and the seven
   area scores at a glance.
2. **Summary** (bone): the seven areas with bars, scores, weights and
   counts, plus a legend for the marks and how the score is built.
3. **Fix these first**: the top five priorities with impact, area,
   what was found and the fix.
4. **Every check, area by area**: needs-attention checks in full with
   evidence, passing checks as a compact list. This section flows
   across pages inside a `<table>`, whose `thead`/`tfoot` repeat on
   every printed page and so carry the running header and footer.
5. **Next steps** (coal): the three weakest areas against what a
   Flutterly build does about each (or "keep what you have" for strong
   sites), the suggested package as a bone card, the free written audit
   with email and booking URL, and a QR code to `/book` (`QrBook.tsx`,
   generated once and embedded as a path).

Geometry lives in the `k-pdf-*` rules in `globals.css`: `@page` is A4
with zero margin so the browser adds no header/footer and the cover
bleeds; `print-color-adjust: exact` forces backgrounds on; fixed pages
are `min-height: 297mm` flex columns with `break-after: page`;
`k-avoid-break` keeps a check row on one page. Shared copy between the
screen pitch and the printed one comes from `report/pitch-model.ts`.

A `data-audit-state` attribute on the live region exposes the current
state for the browser workflow. `/audit` is `noindex` and excluded from
the sitemap; `/api/` is disallowed in `robots.txt`.

## Tests

- `lib/audit/url.test.ts` — normalisation and private-address blocking.
- `lib/audit/engine.test.ts` — every check module and the scorer
  against good and bad HTML fixtures, no network.
- `kiln/audit/ReportPage.test.tsx` — the four UI states with the router
  and `fetch` mocked.
- `scripts/browser-workflow.mjs` — submits the homepage audit bar
  against the running server and asserts the report settles.
