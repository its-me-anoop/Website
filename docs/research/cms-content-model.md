# Recommended CMS content model for GP practice websites

Design principles derived from the research: (1) **structured fields, not free-form pages** — no incumbent supplier offers this, and it is the only way to enforce NHS style rules at the field level; (2) **every entity carries review metadata**, because a 12-month full review is a regulatory MUST and "Page last reviewed / Next review due" is the NHS trust pattern; (3) **time-bound content must expire**, because the benchmarking tool scores any lingering overlay/stale notice as Inadequate; (4) **rendering rules live in the template**, so an editor physically cannot output "8:00am – 6:30pm" or an undated alert.

## Shared metadata (on every collection and singleton)

| Field | Type | Purpose |
|---|---|---|
| `lastReviewed` | date | Renders "Page last reviewed: 15 March 2026" |
| `nextReviewDue` | date | Renders "Next review due:"; drives an overdue-content dashboard (key pages 6-monthly, everything else annually per PRN01429) |
| `reviewOwner` | reference (staff/role) | Who signs off |

## Singletons

**1. Practice profile** — practice name; strapline; main phone; email (complaints-only routing flag); ODS code; `acceptingNewPatients` (boolean → homepage status line); partnership structure (rich text: partner names or company details); training-practice statement; named-accountable-GP statement; ICB name + full contact details; CQC rating (enum) + inspection report URL; YYGP charter URL; out-of-hours copy; dispensing-practice flag.

**2. Catchment area** — boundary polygon or postcode-prefix list (drives the postcode checker); fallback sketch-map image + alt text; catchment description.

**3. Accessibility statement** — scope statement; compliance status (enum: fully / partially / not compliant, rendered against "WCAG 2.2 AA"); repeatable **non-accessible content items** (description, reason enum: non-compliance / disproportionate burden / out of scope, remediation date); testing methodology (who, when, tools — JAWS/NVDA/VoiceOver etc.); statement prepared date; feedback channels (written + phone — both required); response-time commitment (days); enforcement block (EHRC/EASS links, template-provided); third-party content note; "no overlay widget, and why" note.

**4. GP net earnings** — financial year; mean net earnings; number of full-time / part-time GPs; publish date. (Yearly entries; latest renders on Practice information.)

**5. Online services statement** — online-consultation tool name + URL; core-hours window (structured, renders "8am to 6:30pm, Monday to Friday"); out-of-hours response promise; NHS App capabilities list; practice-system app name + URL. (Feeds Appointments, Prescriptions and a "Managing your health online" page — the tool-by-tool "use X for Y" table NHS research says patients need.)

## Collections

**Sites/Locations** (multi-site support) — name; address; phone; directions/transport; parking notes; **access features** as a structured checklist (step-free access, wheelchair access, disabled parking, disabled toilet, hearing/induction loop, signing service, baby changing) — mirrors the NHS.UK facilities profile exactly; `lastConfirmed` date per site.

**Opening hours** — per site: day rows (`day`, `opens`, `closes` as structured times — template renders "8am to 6:30pm"); bank-holiday overrides (date + hours/closed); **Enhanced Access sessions** (day, hours, location/hub name, hub phone) — the contractual evening/Saturday provision most sites omit.

**Team members** — full name; role (enum: GP Partner, Salaried GP, Practice Nurse, Clinical Pharmacist, …); **professional qualifications** (statutory requirement); registration number (optional); bio; photo (optional, alt required); `isPartner`, `isAccountableGpContact` flags; specialities.

**Services & clinics** — name; short description; how to access (enum: book with us / self-referral / pharmacy / drop-in); **self-referral URL (mandatory when access = self-referral** — prevents the "ask reception" dead-end); eligibility; related task page.

**Notices/Alerts** — heading; body; **type (enum: notification-banner | warning-callout | inset-text)** — the template places notification banners above the H1, renders callouts amber with the hidden "Important:" prefix, and enforces max 2 callouts/page; placement page(s); `startDate`; **`endDate` (required)** — auto-expiry, no undated seasonal banners; never rendered as an overlay.

**News posts** — title; date (renders full month name); body; **expiry date (required)**; optional related task page (per guidance, time-bound items belong on task pages, and News stays out of the main nav).

**Policies** — type (enum covering the statutory list: complaints & feedback, privacy notice, your medical records, SMS/email use, National Data Opt-out, zero tolerance, chaperones, carers, patients' rights & responsibilities, home-visit criteria, cookie policy); body; summary. Practice information renders these with a contents list (≤8 sections) and per-policy review dates.

**FFT results** — month/period; response count; % recommend / % not; method note. Latest renders on Practice information — making the "results are displayed on this website" claim true by construction.

**PPG updates** — date; summary of progress/agreed actions (statutory "keep patients updated").

**FAQs** — question; answer; placement page.

**Access commitments** (optional differentiator) — metric ("calls answered within 10 minutes"); target ("90%"); measured period. Renders on Appointments as published standards, exemplar-style.

**Task links** — label (**lint: must start with a verb**, seeded from NHS-tested CTA wording); destination URL; channel (NHS App / online form / phone); tier (primary/secondary); placement. Drives the homepage 2+4 card grid and per-page action buttons.

## Page types (structured templates, not free-form)

Home, Appointments (slots: urgent care card set with hidden prefixes, routes, response expectation, home-visit section fed by the policy entry, cancellation callout), Prescriptions (ordering routes, pharmacy nomination, medicine reviews, charges/disposal), Contact (composes Sites + Opening hours + out-of-hours), Register with the surgery (catchment checker + no-ID reassurance + routes — first-class page, not an anchor), Managing your health online (composes Online services statement), Practice information hub, Accessibility statement, generic content page. Seed all copy from NHS England's official templates (PRN00651 §5).

## Editorial guardrails (field/lint level)

- Time and date fields structured; renderer alone controls "8am to 6:30pm" / "15 March 2026" formatting.
- Term lint on rich text: flag "online consultation", "emergency appointment", "triage", "medication", "chemist", "click here", patient-facing "practice"-as-entity.
- Reading-age check (Flesch-Kincaid/Hemingway-style score surfaced next to the editor, target 9–11).
- Image fields require alt text; **no PDF upload field on patient content types** (HTML only).
- Publishing an Alert without an end date, or a self-referral service without a URL, is a validation error.

## Coverage check

This model gives a practice manager a maintainable home for every MUST in the checklist: statutory leaflet content (Practice profile, Team, Policies, Sites, Catchment, Opening hours), 2025/26 items (YYGP link, online-consultation core hours), FFT and GP earnings publication, PPG updates, the accessibility statement's statutory structure, and the 12-month review duty (shared review metadata + overdue dashboard). The SHOULD-level style rules are enforced by the renderer and lints rather than editor discipline — which is precisely the gap none of the incumbent WYSIWYG suppliers close.
