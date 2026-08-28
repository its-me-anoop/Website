# Suppliers and exemplar sites — comparison

## Market shape

NHS England's own audit found ~55 distinct GP website suppliers, with 9 covering ~70%+ of sampled practices ([SCW case study](https://scwcsu.nhs.uk/case-studies/navigating-the-digital-front-door-improving-gp-websites-for-a-mobile-device)). The de facto scorecard everyone builds and sells against is NHS England's free 50-criterion [benchmarking tool](https://www.england.nhs.uk/publication/gp-website-benchmarking-and-improvement-tool/), which splits supplier-owned issues (template, nav, responsiveness, technical accessibility) from practice-owned issues (content accuracy, reading level, freshness) — useful framing for a studio: the first half must be right out of the box, the second half is what the CMS must make easy.

## Website suppliers

| Supplier | Owner / scale | Editing model | Differentiator | Watch-outs | Pricing |
|---|---|---|---|---|---|
| **My Surgery Website** | FPM Group; volume incumbent (one trade-press estimate ~48% of primary-care sites, unverified) | WYSIWYG "like Word" | Install base, mature support ops, ISO 27001/Cyber Essentials/DSPT | Thin published feature detail; no triage/translation specifics | Quote-only |
| **Footfall / Foundation** (Silicon Practice) | Schappit Ltd; 1,000+ practices | Drag-and-drop; central push across a PCN/ICB from one console | Only supplier with deep native clinical-system integration (EMIS/SystmOne write-back, PDS verification, capacity-aware routing); claims 30% call reduction | Two overlapping product names confuse buyers | Quote-only |
| **iatro Practice365** | Agilio Software (acquired Oct 2023); 1,500+ practices | On-page live editing, role-based permissions | AI content writer + SEO tooling; Agilio distribution | Still claims WCAG **2.1** AA (stale vs the 2.2 legal floor); post-acquisition roadmap risk | Quote-only |
| **Tree View Designs** | Independent (Dover, 2009); 1,000+ surgeries | Custom-built CMS | Best independent review record (5/5 across 119 Practice Index reviews); DSPT "Standards Exceeded" | Less clinical-system depth than Footfall | Quote-only |
| **GPsurgery.net** | Independent (2005) | Managed ("Flexi": submit changes, updated within hours) or self-edit | Rare outcome-based claim: "Navigator" tier guarantees 50/50 on the NHS benchmark | Managed edits = hours, not instant | Tiered |
| **GenPra** | Independent | Self-edit, or 3 hrs/yr included editing (£70/hr after) | WCAG 2.2 AA explicitly tested with JAWS/NVDA/VoiceOver; transparent pricing | Editing-hours cap | Published |
| **SurgeryWeb** | AlphaWebServices subsidiary | Simplified WordPress | Cheapest transparent pricing | WordPress plugin/patch surface (vendor-managed) | £269–329/yr + £100 setup |
| **Websites4GPs** | Independent (2002) | Self-edit or vendor-updated | Cheapest overall; longest track record | Dated presentation | £27.95/month |
| **GP Surgery Sites / Neighbourhood Direct** | Oldroyd Publishing Group (since 2000) | Live-page WYSIWYG, multi-editor, bulk push | Longest operating history claimed | Brand-name collision with three near-identical competitors | Not published |
| **N3i** | Hull-based NHS IT partner | Bespoke | Website as one line in a wider trusted IT relationship | Not its core product | Not published |
| **Engage Health Systems** | Independent | Part of a wider suite (Consult/Arrive/Call) | Only vendor foregrounding multilingual UI (check-in kiosks) | Website not a standalone product | Not published |

**Category-error corrections** (names often wrongly benchmarked as website suppliers): **EMIS/Optum** (Patient Access), **TPP** (SystmOnline) and **Cegedim/Vision** (in administration since Dec 2024) are clinical systems/patient portals that sit *behind* a practice website; **Accurx, Patchs, Klinik, Anima, eConsult** are online-consultation/triage engines the website links out to; **Livi** is a private video-GP service; "Numed iScribe" does not exist as a GP website product.

**Open differentiation angle:** no surveyed vendor offers a structured/component-based content model — everything is page-template WYSIWYG. A structured-CMS editing story is a genuinely uncrowded pitch in this market (see content model).

## Exemplar practice sites (all read live)

| Site | Why chosen | Worth copying | Anti-pattern observed |
|---|---|---|---|
| [Formby Medical Group](https://www.formbymedicalgroup.nhs.uk/) | HSJ-shortlisted PCN's member practice | "Accepting new patients" homepage lead; "Digital Front Door" as one named entry point patients learn once; cancellation-first appointments copy; access-needs accommodations as a first-class option | Appointments page has no booking link or timeframe table — tone without a call to action |
| [Canbury & Berrylands Surgery](https://www.berrylandssurgery.nhs.uk/) | FootFall flagship | CQC "Good" badge linked to the report; testimonials; extended hours with a named weekend PCN hub number; Test results as top-level nav | Three multi-item dropdowns vs the ≤7-flat-items guidance |
| [Hove Medical Centre](https://www.hovemedicalcentre.co.uk/) | Clean IA reference | Three-tier link separation: task / trust-building (GP earnings, team, PPG) / legal; CQC badge; New Patients as a Quick Link | No urgent-care messaging on the homepage |
| [Dr G Singh & Partners](https://www.drgsinghandpartners.nhs.uk/) | Strongest appointments journey read | Symptom-based emergency decision tree; paediatric A&E routing; home-visit eligibility + same-morning cut-off; **published access standards** ("90% of calls answered within 10 minutes") | Soft "Browse More" catch-all |
| [Wootton Medical Centre](https://woottonmedicalcentre.co.uk/) | Silicon Practice "Foundation" flagship | Registration as a top-level nav item; catchment-area checker at point of registration; visible header search box | Seasonal "HOT WEATHER ADVICE" banner repeated four times, crowding task tiles |
| [Southport & Formby Health](https://www.southportandformbyhealth.com/) | HSJ award context | — (federation-level site, weak single-practice IA reference) | Third-party accessibility overlay toolbar — exactly what NHS guidance says not to do |

**Cross-cutting patterns on the best sites:** registration surfaced top-level; catchment self-check; CQC badge (2 of 5); enhanced-access hours stated with a number; visible search; home-visit criteria with cut-off; measurable access commitments; FFT/testimonials actually displayed, not just referenced.
