# Gap analysis — Willowbrook Surgery demo vs the checklist and exemplar sites

**What is already right** (so the list below reads as calibrated, not padding): the 6-item flat nav matches NHS England's reference IA without the dropdown depth real competitor sites trade away; the home page is the textbook task-first 2+4 card hierarchy; "online consultation" and "emergency appointment" wording is correctly avoided; the emergency care card is symptom-based; there are no PDFs, no pop-ups/overlays, and no accessibility toolbar (all explicit NHS anti-patterns); the skip link, focus ring, opening-times table markup and registration-without-ID copy are all genuinely correct. The gaps below are ordered by importance.

## Tier 1 — statutory/contractual content that is missing or wrong

1. **Friends and Family Test claim/reality mismatch — Practice information page.** `practiceInfo` in `data.ts` claims FFT results "are displayed in our waiting room and on this website" — they are displayed nowhere in the demo. This is the worst kind of gap: a false claim a real practice would be caught out on, and FFT publication is itself contractual (GMS Regs Part 14). Either publish sample FFT results or remove the sentence.

2. **No Enhanced Access / extended hours anywhere — Home (opening times table) and Contact pages.** `openingTimes` shows Saturday/Sunday as flatly "Closed — call NHS 111". Since Oct 2022 every PCN is contractually required to offer 6:30–8pm weekday and 9am–5pm Saturday appointments; every credible real site names the hub or number. This is information patients are entitled to, and the most checkable omission in the demo.

3. **Registration is not a first-class journey, and there is no catchment checker — Contact page (buried `#register` anchor) + navigation.** Registration is one of only seven journeys the NHS benchmarking tool scores; exemplars make it a top-level nav item (Wootton) or homepage lead (Formby). The catchment boundary itself — "sketch diagram, plan, or postcode" — is a statutory practice-leaflet item, and the current copy ("if you live in our catchment area") gives patients nothing to check against. Fix: a dedicated "Register with the surgery" page with a postcode check and, ideally, an "accepting new patients" status line on the Home page.

4. **No CQC rating and no GP net-earnings disclosure — Practice information page.** Both are explicit publication requirements (GP earnings statutory; CQC rating named in PRN00651's About-page checklist), and both appeared prominently on exemplar sites (CQC badge on 2 of 5). These are the two items a patient or practice manager familiar with real GP sites will notice missing first.

5. **Accessibility statement is missing every statutory structural element — Accessibility page.** Currently three warm marketing-style sections. Missing: explicit compliance status vs WCAG 2.2 AA; itemised non-accessible content (an empty list reads as unaudited, not flawless); preparation/testing methodology; enforcement procedure (EHRC via EASS) — a statutory Reg 7(4) item; a written reporting channel (phone-only "tell reception" is insufficient); a response-time commitment; and a third-party content scope note (the self-referral links on Services would be outside the practice's statement in a real deployment). Also state deliberately that no overlay widget is used and why — it turns a "why is there no accessibility button" question into demonstrated expertise.

6. **Several statutory practice-leaflet items have no home — Practice information and Appointments pages.** Missing entirely: named accountable GP arrangements; partnership structure; staff professional qualifications (Our team lists roles but should carry qualifications); training-practice status; ICB contact details; patients' rights and responsibilities; **home-visit criteria and request route with a cut-off time** (Appointments page — the best exemplar, Dr G Singh, treats this as its own section); out-of-hours detail beyond the 111 band.

7. **No "You and Your General Practice" charter link — footer or Practice information.** Contractual since 1 Oct 2025; the single most currently-topical, lowest-cost addition for a demo claiming 2025/26 accuracy.

## Tier 2 — NHS pattern and credibility gaps

8. **No review-date discipline — site-wide, worst on Practice information, Services & clinics, Prescriptions.** The "Page last reviewed: [date] / Next review due: [date]" pattern exists precisely because practices are contractually required to review content every 12 months; only the Accessibility page has an informal half-version. This is the discipline every practice manager already lives under on their NHS.UK profile — the cheapest, highest-credibility fix available.

9. **One amber callout doing three components' jobs — Home, Services (and prefixes on Appointments, Prescriptions).** Per the service-manual decision tree: Home's "Travelling this summer?" is a service-wide announcement → notification banner (blue, above the H1); Services' "Not sure which service you need?" is a wayfinding nudge → inset text; Appointments/Prescriptions callouts are correct as warning callouts but need the visually-hidden "Important:" prefix. Currently every page has an identical amber box regardless of message type, which trains users to stop reading them.

10. **Care cards missing hidden urgency prefixes; non-urgent tier unused — Appointments page.** Add `sr-only` "Urgent advice:" / "Immediate action required:" spans (colour-blind and screen-reader users cannot rely on colour); consider adding the missing blue non-urgent card so the three-tier triage is complete.

11. **Self-referral routes dead-end at "ask reception" — Services & clinics page.** Pharmacy First, physio, Talking Therapies, sexual health, stop smoking all end with "Reception can give you the contact details" — quietly reintroducing the phone-call friction self-referral exists to remove. Every real site links directly. NHS guidance also requires direct links (not homepages) for externally-hosted content.

12. **Time formatting violates the style guide — ~8 strings across `data.ts`, `GpShell.tsx`, `appointments/`, `prescriptions/`, `contact/`.** "8:00am – 6:30pm" → "8am to 6:30pm" (no leading ":00", ranges use "to", never dashes). Mechanical find-and-replace, directly citable to the service manual.

13. **Terminology drift — Prescriptions, Team, nav/footer, Home task tiles.** "Medication reviews" → "Medicine reviews" (3 occurrences; explicit A-to-Z rule); patient-facing "practice" → "surgery" ("Join the practice", "Practice information & policies", "Practice news") while keeping "practice" in legal/formal nouns ("practice list", job titles, PPG).

## Tier 3 — worthwhile additions

14. **No "Managing your health online" page.** One of NHS England's ten official content templates, created specifically because patients get confused between the online form, the NHS App and practice-system apps. Add it, or fold explicit "use X for Y" framing into Appointments/Prescriptions.

15. **No online-consultation core-hours messaging — Appointments page.** Show the 8am–6:30pm Mon–Fri availability window and the "submitted after 3pm / outside hours → response next working day" pattern from the official template; it is the most 2025/26-current detail a demo can carry.

16. **No measurable access commitments — Appointments page.** Exemplar differentiator (Dr G Singh: "90% of calls answered within 10 minutes"). Willowbrook's soft promises ("reply within one working day") are good tone; a numbered commitment is stronger.

17. **No visible site search — GpShell/GpNav.** One of the 50 benchmarking criteria (visibly labelled "Search", not icon-only). Defensible to omit on a 9-page demo, but worth a note if pitched as production-representative.

18. **No contents list on Practice information.** The page's 7 anchor-linked sections are the exact use case for the NHS contents-list component (up to 8 sections).

19. **Minor:** lead with "fit note (sick note)" rather than "sick (fit) note" per the A to Z; breadcrumb includes the current page (NHS pattern shows ancestors only — low priority, not harmful); verify the focus-ring contrast values against `--dgp-canvas` with a tool rather than by eye; if forms, sticky headers, or carousels are ever added, WCAG 2.2's Redundant Entry / Focus Not Obscured / Dragging Movements criteria become live.
