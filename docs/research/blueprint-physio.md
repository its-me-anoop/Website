Blueprint follows.

# Physiotherapy Clinic Demo — Blueprint

**Working fiction:** a small private physiotherapy clinic in the Reading area, 2–4 clinicians (suggested name style: "Thames Valley Physio & Rehab" — invented; verify no collision). **Naming rule that is itself a compliance point: "Chartered" must never appear in the business name or whole-clinic claims** — it attaches only to individual CSP members. Regulator is the **HCPC**, and — a point of genuine confusion the demo resolves confidently — a standard physio clinic is *not* CQC-registered. Follows the Flutterly convention: `content/physio-clinic/*.json`, `reviewed` dates, fictional-demo ribbon.

## (a) Pages (6)

1. **Home** — hero with primary booking CTA; short conditions overview linking deeper; one tasteful NHS-positioning line ("appointments this week, no GP referral needed — alongside or instead of an NHS wait," never disparaging); "we work with major UK health insurers" line (genericised — see checklist).
2. **Conditions & treatments** — the standard, ASA-safe MSK taxonomy (back and neck pain/sciatica, shoulder incl. frozen shoulder, tennis/golfer's elbow, knee/hip/ankle, sports injuries, post-op rehab, headaches/vestibular, women's & pelvic health, arthritis and long-term pain management) with a credible treatment scope: assessment, manual therapy, exercise-based rehab, acupuncture, sports massage. Deliberately **no** ultrasound-guided injections or diagnostics — that would need a doctor on staff and drags in CQC questions the demo shouldn't touch.
3. **Your first appointment** — the low-anxiety page: 45–60 minutes; the four beats (conversation and history → physical assessment → treatment usually starts the same visit → plain-English explanation and a home exercise plan); what to wear (shorts for knee/hip, vest top for shoulder/neck); what to bring (timeline, GP letters, scan results, medication list, insurance details); and the **self-pay vs insured fork** explained side-by-side.
4. **Pricing** — public price table: initial assessment and follow-up with duration and price (realistic Reading band: initial £55–£75, follow-up £45–£60 — outside London premium, not copied from any real clinic); typical course-length honesty ("most acute problems settle in 2–4 sessions; complex problems 4–8+"); insurance notes (excess may apply, pre-authorisation number needed, GP-referral rules vary by insurer); cancellation policy (24 hours' notice; insurers do not pay for missed sessions — the patient does).
5. **Our team** — 2–4 fictional practitioners: photo, name, title, sample HCPC number in real format (`HCPC PH000000 — sample`), "Chartered member of the CSP" *on the individual*, qualification with institution and year (e.g. "MSc Physiotherapy, [University], 2018"), one or two special interests. Specific beats vague every time.
6. **Trust & regulation (About)** — the highest-leverage sector-literacy page: "Physiotherapist is a protected title — every clinician here is HCPC-registered, and you can verify this on the HCPC register"; the confident "physiotherapy is regulated by the HCPC rather than the CQC" line; CSP membership explained in lay terms; professional indemnity insurance, DBS checks, ICO/data-protection registration; clinic accessibility specifics (step-free, ground-floor rooms, parking).

## (b) CMS content model (`content/physio-clinic/`)

- **`clinic.json`** — `reviewed`, `name`, `strap`, `phone`, `email`, `address`, `openingTimes[] {day, hours}`, `access[]` (step-free, parking, bus — concrete accessibility detail is a sector trust signal), `bookingCopy`, `nhsPositioningLine`, `insurersCopy` (the genericised "major UK health insurers" line).
- **`home.json`** — `reviewed`, `hero {title, copy}`, `primaryTasks[] {title, copy, href}` (book, prices, first-visit), `conditionsTeaser[]`.
- **`conditions.json`** — `reviewed`, `conditions[] {slug, title, plainSummary, whatWeAssess, typicalApproach}` — fields deliberately named for what is *assessed and managed*, not cured; the schema itself enforces ASA-safe copy.
- **`treatments.json`** — `reviewed`, `approaches[] {title, copy, whoItHelps}` (manual therapy, exercise rehab, acupuncture, sports massage).
- **`first-appointment.json`** — `reviewed`, `duration`, `beats[] {title, copy}` (the four-beat structure), `whatToWear[] {bodyArea, suggestion}`, `whatToBring[]`, `selfPay {steps[]}`, `insured {steps[], preAuthCopy, excessCopy, gpReferralCopy}` — the fork is first-class in the model because it's the underserved pattern.
- **`pricing.json`** — `reviewed`, `sessions[] {type, duration, price, includes}`, `courseLengthCopy` (the anti-upsell honesty line), `insuranceNotes[]`, `cancellation {noticeHours, policyCopy, insurerNote}`.
- **`team.json`** — `reviewed`, `practitioners[] {name, title, hcpcNumber, hcpcSampleNote, cspMember (bool), qualifications[] {award, institution, year}, specialInterests[], bio}` — `cspMember` sits on the *person*, structurally encoding the CSP brand rule.
- **`trust.json`** — `reviewed`, `blocks[] {title, copy}` (protected title / HCPC-not-CQC / CSP / indemnity / DBS / data protection), `verifyRegisterCopy`.

## (c) Regulatory / trust checklist

- [ ] **HCPC number per practitioner** in the real format, each marked "(sample)," plus the explainer: "'physiotherapist' is a protected title — you can verify any clinician on the HCPC register." Never the vague "fully qualified team."
- [ ] **"Chartered" attached only to individuals** — never in the clinic name, logo, or whole-practice claims (a genuine CSP brand-guideline rule that a careless template site would break); no CSP lozenge/logo reproduction — text only.
- [ ] **The HCPC-not-CQC line** — one confident sentence; wrongly implying CQC inspection (or naming no regulator at all) are both real-world failure modes the demo must avoid.
- [ ] **ASA/CAP-safe claims** — conditions list kept to the standard MSK taxonomy; no "cure," no "guaranteed pain-free," no outcome promises; copy describes assessment and management.
- [ ] **Public pricing** — session type, duration, price on a dedicated page; "call to discuss fees" is the sector's most-cited anti-pattern.
- [ ] **Insurance mechanics explained, insurers genericised** — excess, pre-authorisation reference, session-count approval, and insurer-varying GP-referral rules explained in plain English; use "major UK health insurers" or lightly invented names rather than real insurer logos/trademarks on a fictional site.
- [ ] **Cancellation policy including the insurer detail** — insurers don't pay for missed sessions; the best real sites disclose this and it reads as honest, not harsh.
- [ ] **Indemnity, DBS, ICO registration mentioned** on the trust page — the full independent-practitioner governance stack in lay terms.
- [ ] **NHS context acknowledged honestly** — NHS self-referral and First Contact Physiotherapy exist and are named; the private pitch is speed and choice, never a claim of clinical superiority.
- [ ] **No CQC-adjacent services implied** — no in-house injections, imaging or bloods; keeps the fiction clean and the regulatory story simple.
- [ ] **Fictional labelling** — demo ribbon on every page; all registration numbers and prices marked as illustrative samples.

## (d) Tone & vocabulary

- Calm, precise, physically literate: "assessment," "movement," "load," "rehab plan," "flare-up," "getting you back to [running/gardening/lifting your grandchild]" — goal-oriented and concrete, never miracle-flavoured.
- Evidence-honest by construction: "most people with X improve over Y sessions," "we'll tell you at the first visit what we think is going on and how long it's likely to take." Uncertainty stated plainly builds more trust than certainty faked.
- Respectful of the NHS: "alongside or instead of an NHS wait" is the ceiling of the comparison; wait-time framing is about *your options*, not NHS failings.
- Anti-upsell explicitly: "no wasted sessions, no pressure to keep coming back" — the best real sites say this in as many words and it lands.
- Second person, active voice, short sentences; body-part language plain (kneecap, not patella — with the clinical term in brackets only where useful).

## (e) What separates the best sites from templates

1. **A real self-pay vs insured explainer** — research found *no* UK physio site doing this well as a first-class artifact; the fork (what you pay vs what your insurer needs: pre-auth number, excess, referral rules) built into the first-appointment and pricing pages makes the demo genuinely better than the live market, not an imitation of it.
2. **The trust & regulation page in lay terms** — HCPC protected title, why there's no CQC rating, what CSP membership means, indemnity/DBS/ICO — modelled on the single best real example found (Physio Experts) and rarer than public pricing.
3. **Practitioner bios with dated, institution-level qualifications and sample HCPC numbers** — specificity ("MSc Neurological Physiotherapy, Coventry, 2019") is the visible line between a credible clinic and a template with stock headshots.
4. **The first-appointment page with wear/bring detail** — shorts-for-knees-level practicality signals real clinical familiarity, lowers first-visit anxiety, and mirrors the "before your visit" pattern already proven in Flutterly's GP demo.
