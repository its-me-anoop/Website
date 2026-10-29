# Duo Discover UX contract

This contract owns only the standalone `/duo` directory. Other Flutterly routes retain their existing systems.

## Business context sources

The user's 29 October 2026 instructions authorize a public Flutterly directory using real App Store listings and genuine Duo screenshots. `docs/DUO-DIRECTORY.md` records source provenance and publication constraints. `public/duo/data.js` is the maintained evidence snapshot. No account, collection form, payment, active sponsor, independent device-test claim or analytics is introduced.

## Canonical UI Map

| Capability | Canonical owner | Source of truth | Allowed variants | Verification |
| --- | --- | --- | --- | --- |
| Scrollbar | public/duo/styles.css | Runtime thumb/track tokens | Standards plus WebKit fallback and forced colors | CSS static audit; browser computed style |
| Directory | public/duo/directory-model.js | URL query plus local seven-app data | Category, workflow, text, Duo-media filters | scripts/verify-duo.mjs; browser search/reset/deep links |
| Dialog | public/duo/app.js | Native dialog, showDialog/closeDialog | App evidence, approach, privacy | Escape, Tab loop, close, focus restoration, Back/forward |
| Evidence | public/duo/data.js | Dated App Store developer sources and owned simulator media | Developer claim; owned-app disclosure; absent media | Asset existence; unchanged source data; visible disclosures |

## Visual ownership

`public/duo/styles.css` owns its isolated tokens: paper #f6f6fa, ink #25243b, muted #606177, action #5540cc, lilac #eeebfb, white surfaces. System sans body; Arial display headings. `/duo` does not import global Flutterly CSS. The purpose is an approachable, readable editorial directory with factual detail before decoration. No synthetic device images.

## State and accessibility

Search is immediate and composition-aware. Category/use case/media/query state is shareable in the URL. A detail link adds `app`; Back closes the detail and Forward restores it. Closing a detail returns focus to its trigger even after card rerendering. A deep link without a previous trigger closes to the collection. No-results offers Reset filters. Data is local: no server mutation, asynchronous search or payment failure states apply. Remote destination availability remains outside the directory.

Native links and buttons, labelled search, polite result count, visible focus, sticky dialog Close, keyboard focus containment, reduced-motion fallback and tokenized scrollbars are required. Images reserve native dimensions and retain aspect ratio; six missing Duo sets are disclosed, never replaced with ordinary iPhone/iPad images. English (UK) only; price/source date is explicitly a snapshot. Light theme only.
