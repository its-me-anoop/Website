# Flutterly — Product Context

## What this is

The website of **Flutterly Ltd**, the one-person product studio of Anoop Jose
(Reading, UK), specialising in websites for **GP practices and care homes**.
The marketing site runs the "Bloom" design language (docs/BLOOM.md). Two demo
sites live under `/demo/*` and are the studio's proof of work:

- `/demo/gp-practice` — **Willowbrook Surgery**, a fictional NHS GP practice.
- `/demo/care-home` — a fictional care home.

The demos are sales artefacts: a prospective practice manager should look at
them and think "I want our site to work like this."

## Users

- **Marketing pages:** GP practice managers and care-home owners in the UK
  evaluating a web studio. Mostly non-technical, NHS-literate, risk-averse.
- **GP demo:** simulates *patients* — every age, every device, often anxious,
  often in a hurry, frequently older or with access needs. Task-first: book,
  order, check, register. WCAG 2.2 AA is a hard floor.

## Register

- Marketing (Bloom) pages: **brand**.
- Demo sites (`/demo/*`): **product** — the user is in a task; earned
  familiarity with NHS conventions beats novelty. The category's "best tools"
  are nhs.uk and the NHS service manual: patients trust interfaces that feel
  like the NHS.

## Tone

Calm, plain-English, warm but never cute. NHS-style content design: short
sentences, tasks before descriptions, no jargon. Fictional practice content
must stay clearly fictional (Ofcom fictional phone range, invented postcode,
`robots: noindex`).

## Anti-references

- Template GP sites with buried tasks, PDF-first content, and phone-only flows.
- Generic AI-generated healthcare aesthetics (teal-on-white gradient slop).
- Anything that could be mistaken for a real NHS practice in search results.

## Strategic principles

1. The demo must feel like a *better* NHS practice site, not a different genre.
2. Every page answers "what can I do here?" above the fold.
3. Accessibility is a selling point — the demos advertise WCAG 2.2 AA work.
4. Honest content: commitments, not invented stats; fictional data flagged.
