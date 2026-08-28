# Dental Practice Demo — Blueprint

**Working fiction:** a mixed NHS/private practice in the Reading area (suggested name style: "Kennet Bridge Dental" — invented, no real-practice collision found in the research; verify before use). Mixed-model is deliberate: it is the most realistic UK configuration and unlocks the richest content (NHS bands *and* private fee transparency). Follows the existing Flutterly convention: `content/dental-practice/*.json`, every file carries a `reviewed` date, every page carries the fictional-demo ribbon.

## (a) Pages (6)

1. **Home** — route to the three highest-intent tasks in one screen: book (CTA repeated in header, hero, and end-of-page), urgent dental pain (prominent callout above the fold), and fees. States NHS + private positioning plainly. Trust row of *non-official* GDC/CQC-style text badges.
2. **Fees** — the GDC Standard 2.4 proof page. NHS tab: Band 1/2/3 + urgent table (£27.90 / £76.60 / £332.10 / £27.90, "correct as of April 2026"), the one-charge-per-course rule, free-repeat-within-2-months rule, always-free items, exemptions summarised with a link out to NHS.uk. Private tab: from–to ranges next to a short treatment list, plus membership-plan pricing if included. England-only disclaimer line.
3. **Treatments** — NHS general dentistry plus 2–3 private items (e.g. Invisalign-style aligners described generically, implants, whitening). Every treatment shows in-line from–to pricing (never "call for a quote"). Before/after content is clearly stylised illustration, never photoreal "real patient" proof.
4. **New patients** — staged journey (register → what your first visit involves → what to bring → written treatment plan) plus a substantial **nervous patients** section: anxiety acknowledged directly, one or two *specific* accommodations named (first-slot-of-the-day appointments, agree-a-stop-signal policy, talk-through-first consult with nothing done), sedation described in layers if mentioned at all.
5. **Urgent & out-of-hours** — own same-day emergency-slot policy stated first, then NHS 111 signposting for when closed, urgent Band 1 price (£27.90), and an A&E self-triage line (uncontrolled bleeding, swelling affecting breathing/swallowing, facial trauma → A&E, not the dentist).
6. **About, team & complaints** — every clinician with GDC-register-style name, qualification + country of qualification, and a clearly-marked sample GDC number; CQC registration/rating statement in text; and the dual-track complaints section (see checklist) — the single highest-signal sector-literacy element, since most live sites get it wrong.

## (b) CMS content model (`content/dental-practice/`)

- **`practice.json`** — `reviewed`, `name`, `strap`, `phone`, `emergencyPhone`, `address`, `openingTimes[] {day, hours}`, `access[]` (parking, step-free, hearing loop), `nhsAndPrivate` (positioning copy), `acceptingNhsPatients` (bool — managers toggle this constantly), `cqc {status, ratingText, reportUrl, sampleNote}`, `outOfHoursCopy`.
- **`fees-nhs.json`** — `reviewed`, `effectiveFrom: "2026-04-01"` (the April uprating is why this is its own file — one edit a year), `bands[] {band, price, covers}`, `urgentPrice`, `rules[]` (one charge per course; free repeat within 2 months; always-free items), `exemptionsSummary`, `exemptionsLink`, `englandOnlyNote`.
- **`fees-private.json`** — `reviewed`, `items[] {treatment, priceFrom, priceTo, note}`, `guaranteeCopy` (whether/how long work is guaranteed — a GDC Standard 2 item), `planCopy` (optional membership plan).
- **`treatments.json`** — `reviewed`, `treatments[] {slug, title, category: "nhs" | "private" | "both", summary, whatHappens, priceFrom, priceTo, priceNote}` — pricing lives on the treatment record so it renders in-line, matching how a practice manager prices per item.
- **`new-patients.json`** — `reviewed`, `journeySteps[] {title, copy}`, `whatToBring[]`, `newPatientOffer {title, price, includes[]}` (the low-commitment entry offer), `nervousPatients {intro, accommodations[], sedationCopy}`.
- **`urgent.json`** — `reviewed`, `sameDayPolicy`, `whenWeAreClosed` (111 copy), `urgentBandPrice`, `goToAeIf[]` (the self-triage list).
- **`team.json`** — `reviewed`, `groups[] {group, members[] {name, role, qualifications, countryOfQualification, gdcNumber, gdcSampleNote}}` — mirrors the GP demo's grouped-team shape.
- **`complaints.json`** — `reviewed`, `intro`, `practiceStep` (talk to us first, response within 10 working days), `nhsRoute {steps[], escalation}` (ICB → PHSO), `privateRoute {steps[], escalation}` (Dental Complaints Service, 12-month window), `gdcNote` (GDC is for serious fitness-to-practise concerns, not routine complaints).

## (c) Regulatory / trust checklist

- [ ] **GDC number per named clinician** — full register-style name, qualification, country of qualification, number formatted like the real thing (e.g. `GDC 000000`) with an adjacent "(sample number for demonstration)" note. Include a one-line "you can verify any registrant on the GDC register" explainer.
- [ ] **"Regulated by the General Dental Council" statement** — text only; do **not** reproduce the GDC logo.
- [ ] **CQC registration + rating displayed** — as text ("Rated Good — read the report") with a visually distinct, obviously non-official badge. **Never** use the real CQC ratings widget/logo on a fictional site — it's a controlled regulatory brand asset.
- [ ] **NHS charge bands** — current figures (Band 1 £27.90 / Band 2 £76.60 / Band 3 £332.10 / urgent £27.90), dated "correct as of April 2026," with the one-charge-per-course and free-repeat rules stated, exemptions linked to NHS.uk, England-only caveat.
- [ ] **Private fee transparency (GDC Standard 2.4)** — prices visible without asking, from–to ranges for variable work, pricing cross-linked from every treatment.
- [ ] **Dual-track complaints procedure (GDC Standard 5)** — NHS route (practice → ICB → PHSO) and private route (practice → Dental Complaints Service, free, 12-month limit) shown as two distinct paths, with the "GDC is a last resort for conduct concerns" clarification.
- [ ] **Emergency access** — NHS 111 for out-of-hours, urgent Band 1 price, A&E triage cue for trauma/bleeding/airway swelling.
- [ ] **CAP-safe testimonials/before-after** — no fabricated "real patient" photo-proof; stylised illustrations or clearly-labelled illustrative content only (CAP Code 3.47–3.50 treats before/afters as claims needing substantiation).
- [ ] **Fictional labelling** — the existing demo ribbon on every page; all registration numbers, ratings and earnings-style figures marked as samples in the copy itself.

## (d) Tone & vocabulary

- Plain-English, NHS.uk register for anything NHS: "check-up," "filling," "urgent appointment," "course of treatment," "band" — never "hygiene recall," "restoration," or Latin.
- Warm and specific, not salesy. Private/cosmetic copy may be slightly aspirational but never promises outcomes ("straighter teeth" as a goal, not "a perfect smile guaranteed").
- Anxiety is named, not euphemised: "If you're nervous about the dentist, tell us — you won't be the only patient today who is." Avoid the empty "we're great with nervous patients" claim; every reassurance is a concrete accommodation.
- Money talk is direct: state prices, state what's included, state what changes the price. "From £X" only where genuinely variable, with the reason.
- Second person throughout; sentences short; no exclamation marks.

## (e) What separates the best sites from templates

1. **The dual-track complaints section done correctly** — even award-winning live sites conflate or omit the NHS (ICB/PHSO) vs private (Dental Complaints Service) split; getting it right is the cheapest expert signal on the whole site.
2. **A dated, single-edit NHS fee block with the actual rules** — one-charge-per-course and free-repeat-within-2-months are the details patients care about and template sites never include; modelling it as `fees-nhs.json` with `effectiveFrom` also demos CMS thinking (it changes every April).
3. **Nervous-patient content with named accommodations** — a distinct section with concrete offers (quiet first slot, stop signal, tour before treatment), modelled on the best real example found (The Dental Suite), which even the sector's award winners lack.
4. **An urgent-care page that self-triages** — own same-day policy first, then 111, then the A&E red-flag list — the difference between "compliant" and "actually useful," and almost no template site has it.
