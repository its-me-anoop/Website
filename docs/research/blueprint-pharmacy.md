Blueprint follows.

# Community Pharmacy Demo — Blueprint

**Working fiction:** an independent, family-run community pharmacy in a named Reading neighbourhood (suggested name style: "Caversham Bridge Pharmacy" — invented; verify no real collision before use). Explicitly bricks-and-mortar, **not** a distance-selling pharmacy — so no checkout/mail-order UI anywhere. Regulator is the **GPhC** (not CQC). Follows the Flutterly convention: `content/pharmacy/*.json`, `reviewed` dates, fictional-demo ribbon on every page.

## (a) Pages (6)

1. **Home** — leads with the two highest-frequency patient needs: **Pharmacy First** (all seven conditions named right on the homepage) and **repeat prescriptions / NHS App nomination**. Local continuity framing ("serving Caversham since…", family-run), never scale claims. Hours summary with the lunch-closure pattern visible.
2. **NHS Pharmacy First** — its own page, not a tile in a grid: the seven conditions with age eligibility (earache 1–17, impetigo 1+, infected insect bites 1+, shingles 18+, sinusitis 12+, sore throat 5+, uncomplicated UTI women 16–64), walk-in vs referral routes explained, what happens in the consultation room, "free on the NHS" stated plainly.
3. **Services** — every service badged **NHS (free)** or **Private (paid)**: New Medicine Service (incl. depression since Oct 2025), free NHS blood-pressure checks (40+, walk-in), Pharmacy Contraception Service (start or continue the pill), seasonal flu/COVID vaccination (described generically — "usually September to March, check current eligibility," never hard-coded dates), emergency supply of medicines explainer, a short "after a hospital stay" DMS paragraph; private extras framed as *services* (travel health, weight-management **support** — never named prescription drugs).
4. **Repeat prescriptions** — the workhorse page: nominate us in the NHS App (step-by-step), order by phone or in person, how long until "ready to collect," free local delivery if offered. Static, inline content — no account dashboard, no modal flows.
5. **About & our team** — superintendent pharmacist named with a clearly-marked sample GPhC number; the private consultation room described (it's what makes Pharmacy First/NMS/contraception legally possible); a plain-English "what is the responsible pharmacist?" explainer — deliberately **no** live "who's on duty" widget, because no real site has one and it's an in-store notice requirement.
6. **Hours, find us & feedback** — full hours with explicit lunch closure (e.g. Mon–Fri 9–1 and 2–6, Sat 9–1), "closed Sundays and bank holidays — check the door notice or NHS 111 for the local rota" stated honestly, location/parking/bus detail, and a genuine feedback-and-complaints section (how to raise it with us, then NHS England/ICB for NHS services; medicine-safety concerns and how they're escalated).

## (b) CMS content model (`content/pharmacy/`)

- **`pharmacy.json`** — `reviewed`, `name`, `strap`, `phone`, `address`, `neighbourhood`, `establishedCopy` (the continuity line), `openingTimes[] {day, morning, afternoon}` (split fields — lunch closure is structural, not prose), `bankHolidayCopy`, `deliveryOffered` (bool) + `deliveryCopy`, `consultationRoomCopy`, `legal {entityName, companyNumber, gphcPremisesNumber, sampleNote}`, `superintendent {name, gphcNumber, sampleNote}` — this one file feeds the footer regulatory block on every page.
- **`home.json`** — `reviewed`, `hero {title, copy}`, `primaryTasks[] {title, copy, href}` (Pharmacy First + repeats first, mirroring the GP demo's task-first homepage), `alert {title, copy, expires}` (seasonal notices, e.g. flu-jab season).
- **`pharmacy-first.json`** — `reviewed`, `intro`, `conditions[] {condition, plainName, ages, note}`, `howItWorks[] {step, copy}`, `referralRoutes[]`, `freeOnNhsCopy`, `reviewedPathwaysNote` ("pathways reviewed October 2025" credibility line).
- **`services.json`** — `reviewed`, `services[] {slug, title, funding: "nhs-free" | "private-paid", walkIn (bool), usesConsultationRoom (bool), seasonal (bool), summary, details}` — the `funding` enum is the load-bearing field: it renders the NHS/Private badge and is exactly how a pharmacy manager categorises the offer.
- **`prescriptions.json`** — `reviewed`, `nhsAppSteps[]`, `otherWaysToOrder[]`, `readyTimescaleCopy`, `deliveryCopy`, `emergencySupplyCopy` (run out of a regular medicine — what we can legally do).
- **`team.json`** — `reviewed`, `members[] {name, role, gphcNumber?, sampleNote?, bio}`, `responsiblePharmacistExplainer`.
- **`feedback.json`** — `reviewed`, `howToRaise[]`, `nhsServiceComplaintsRoute`, `medicineSafetyCopy`, `responseCommitment`.

## (c) Regulatory / trust checklist

- [ ] **Footer regulatory block on every page** — the universal independent-pharmacy pattern and the single cheapest expert signal: `GPhC premises no. 9000001 (sample) · Superintendent pharmacist: [Name], GPhC 2000001 (sample) · [Legal entity] Ltd` — 7-digit numbers formatted exactly like the real thing, each marked as a sample, plus the fictional-demo disclaimer.
- [ ] **Superintendent pharmacist named** with their own individual sample GPhC number (a pharmacy legally cannot be registered without one).
- [ ] **"Check the register" line** — GPhC guidance points patients at the public register to verify legitimacy; include the explainer, don't fake a lookup.
- [ ] **No internet-pharmacy logo/badge** — the scheme is discontinued (2025); including a "verified online pharmacy" badge would date the demo instantly.
- [ ] **No named prescription-only medicines as marketing** — GPhC/MHRA/ASA joint enforcement (April 2025) against advertising named weight-loss POMs; the demo says "weight-management support" / "treatment available following consultation," never brand names. This is the sharpest looks-real-vs-would-get-you-struck-off test in the sector.
- [ ] **Consultation room mentioned** wherever confidential services are listed — Pharmacy First, NMS and contraception legally require one.
- [ ] **NHS (free) vs Private (paid) label on every service** — chains blur this; blurring reads as upselling a free NHS service.
- [ ] **Honest hours** — lunch closure and Sunday/bank-holiday closure stated plainly in one canonical place (no live rota gimmick, no drift between blocks).
- [ ] **Responsible pharmacist treated correctly** — explained in plain English on About; not surfaced as a live homepage widget (it's a physical in-store notice requirement, and no real site does this).
- [ ] **No e-commerce/checkout patterns** — that's distance-selling territory with different rules; a walk-in pharmacy site that added a medicines checkout would misrepresent the service model.
- [ ] **Fictional labelling** — demo ribbon on every page per the existing Flutterly convention.

## (d) Tone & vocabulary

- Local and personal: "pop in," "no appointment needed," "ask at the counter," named neighbourhood and landmarks. The independent's lever is continuity and familiarity — the exact opposite of chain scale-speak ("700 branches," "hassle-free").
- NHS service names used correctly and confidently: "Pharmacy First," "New Medicine Service," "nominate us in the NHS App" — sector-literate but always glossed in plain English on first use ("free NHS treatment for seven common conditions, without a GP appointment").
- Honest about limits: closed for lunch, closed bank holidays, "if we're closed, NHS 111 can tell you which pharmacy is open." Reads as trustworthy, not as weakness.
- Never medical-salesy: services described by what the patient gets, not by drug names; no urgency tricks, no "limited slots."
- Warm-but-brisk sentence rhythm; second person; contractions fine.

## (e) What separates the best sites from templates

1. **A dedicated Pharmacy First page with all seven conditions and age bands named** — the best real independent found (Fields Pharmacy, Twyford) does this; most sites bury it in a generic services grid and mention only the headline.
2. **The footer regulatory block, formatted like the real thing** — every credible independent carries premises number + superintendent + legal entity; omitting or burying it is the clearest "doesn't know the sector" tell a pharmacist reviewer would spot in seconds.
3. **Structural NHS-free vs private-paid labelling** — an enum in the content model, a badge in the UI; the big chains get this wrong, so a small site getting it right punches above its weight.
4. **A real feedback-and-complaints page** — GPhC governance standards expect a complaints process, yet almost no independent publishes one; including it makes the fictional pharmacy look *more* professional than most live competitors.
