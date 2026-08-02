# Flutterly GP Websites CMS foundation

This MVP is the first working foundation for a custom Flutterly Limited GP
website platform. It is not WordPress, a reskinned third-party admin, or a
production clinical system. All practices, people, contact details and content
in the demo are fictional.

## What is working

- `/cms` lists independent practice workspaces.
- `/cms/[workspace]` provides a task-led home screen for practice staff.
- Shared editors cover pages, services, team profiles, notices, media metadata,
  practice details, draft/publish states, roles and activity history.
- `/practice/[workspace]` renders a branded patient-facing site from the same
  workspace model. The page editor can open a protected CMS draft preview.
- Three fictional workspaces demonstrate that the admin and renderer are shared;
  adding a practice does not copy either implementation.
- Browser-local storage makes the edit-and-preview loop demonstrable without a
  server or filesystem. It is explicitly a demo adapter, not production storage.

The MVP deliberately excludes patient records, forms containing patient data,
appointment booking, prescriptions, payments, NHS/clinical system integrations,
production identity-provider setup and production media uploads. Links
to NHS services are ordinary outbound links only.

## Patient-journey and safety baseline

The public renderer keeps the most common patient tasks near the top of the
homepage: appointments, repeat prescriptions, joining the practice, the NHS
App and urgent help. Every practice template also places a distinct urgent-help
message below navigation: NHS 111 for urgent medical help and 999 only for a
life-threatening emergency. This is information and signposting, not clinical
triage or medical advice.

The demo CMS gives editors a short, plain-English publishing check: confirm the
contact route, opening hours, linked NHS service, dates and eligibility wording
before a change is made public. It also tells editors not to add patient
information, individual clinical advice or unchecked claims. Notice end dates,
clinical approval workflows, reading-age checks, accessibility validation,
translation/alternative-format support and formal content review schedules need
production implementation and practice governance.

These choices were benchmarked against observed public GP-site conventions and
NHS England guidance, not copied content or branding. Before a real launch,
each practice must clinically review its own pathways, confirm local access and
out-of-hours arrangements, complete an accessibility assessment and maintain
the statutory information, privacy and clinical-safety governance that applies
to it.

## Current module boundary

```text
src/features/gp-cms/
  core/              reusable types, versions, repository contract, demo adapter
  admin/             shared task-led admin application and editors
  public-site/       shared patient-facing renderer
src/data/gp-cms/     host-owned fictional workspace configuration
src/app/cms/         Next.js route adapters for the admin
src/app/practice/    Next.js route adapter for branded public sites
```

`src/features/gp-cms` is deliberately independent of the Flutterly marketing
components and demo data. Routes resolve a workspace and pass it to the shared
admin or renderer. That boundary is intended to make extraction into a private
`flutterly-gp-cms` project straightforward.

## Recommended future private repository

```text
flutterly-gp-cms/
  apps/platform/                 multi-tenant admin and standard public host
  packages/core/                 domain types, validation, capabilities, migrations
  packages/repository/           workspace-scoped persistence contracts
  packages/admin/                reusable task-led admin UI
  packages/public-renderer/      standard patient-facing renderer
  packages/theme-contract/       stable tokens and extension points
  packages/testing/              contract and accessibility test helpers
  starters/custom-practice/      supported base for bespoke client presentation
  docs/releases/                 compatibility and migration notes
```

The private repository remains the maintained source of truth. Individual client
projects should not receive unmanaged copies of the CMS source.

## Consumer options

### 1. Versioned shared packages — standard sites

The preferred option is a multi-tenant platform that consumes versioned private
packages such as `@flutterly-gp-cms/core`, `admin` and `public-renderer`. Each
practice is a workspace record with its own content, brand, members and enabled
capabilities. A separately deployed standard client site can consume the same
package versions and select its workspace through deployment configuration.

Shared features are released from the CMS repository using semantic versions.
Client deployments upgrade deliberately, run contract tests and migrations, and
can enable a new capability per workspace after verification. Package APIs and
theme slots are the extension points; client code does not edit package internals.

### 2. Supported starter/template or fork — deeply bespoke sites

When a practice needs a materially different presentation, start from the
versioned custom-practice starter. Keep content models, repository contracts,
admin packages and migrations as dependencies, while putting bespoke routes,
components and styles in clearly owned client modules. If a true fork is needed,
record its upstream CMS version and keep custom commits separate so upstream
releases can be merged and tested rather than overwriting changes.

The key rule in both approaches is the same: shared behaviour belongs in the
core repository; client presentation and approved extensions live outside core.

## Workspace isolation boundary

The MVP distinguishes workspaces by stable IDs but does **not** provide security
isolation. A production repository must require a workspace ID for every read
and write, derive allowed workspace membership from a verified server session,
and enforce authorization in the server/data layer—not only in the interface.
Database row-level rules or equivalent controls should prevent cross-workspace
access. Media object keys, audit records, cache keys and background jobs must
also be workspace-scoped. Cross-workspace platform operations need a separate,
audited Flutterly role.

Adding a practice in production should therefore mean creating a validated
workspace record, assigning members and a domain, choosing capabilities and
brand configuration, and entering content. It must not mean copying CMS code.

## Authentication and role authorization

All `/cms` routes, CMS previews and mutation requests are protected on the
server by a signed, HttpOnly session cookie. The public `/practice/[workspace]`
sites remain public, but draft previews live only under authenticated CMS routes.
The client may reflect access in its controls, but the server makes every route
and mutation decision.

| Role | Scope | Can do |
| --- | --- | --- |
| Flutterly platform administrator | All workspaces | Full platform and workspace administration, including local demo reset. |
| Practice administrator | Their workspace | Edit and publish content, manage practice settings and members, view activity. |
| Editor | Their workspace | Edit drafts and content, view activity and protected previews, but cannot publish. |
| Viewer | Their workspace | View workspace information, activity and protected previews only. |

The browser-local demo adapter remains a demonstration. Its content can be
altered using browser developer tools and must never hold real data or be
treated as a production security model. In production, the protected mutation
route hands the authenticated session and proposed change to the
database-backed `ProductionAuthAdapter`, which must validate and persist the
change transactionally with an immutable audit event.

### Vercel authentication configuration

No shared administrator credential is included in this repository. Production
requires these Vercel environment variables plus a deployed identity/session
adapter:

```text
GP_CMS_AUTH_MODE=production
GP_CMS_AUTH_SECRET=<a unique random secret, at least 32 characters>
# identity-provider and database credentials are adapter-specific and server-only
```

Set `GP_CMS_AUTH_MODE=demo` only outside production, together with a separate
local `GP_CMS_AUTH_SECRET`, to try the role UI. Demo mode is rejected when
`NODE_ENV=production`. The `production-adapter.ts` contract is the integration
seam for verified identity, database-backed session lookup, workspace membership
and transactional mutation persistence. Add the provider callback, MFA/recovery
policy, session revocation, rate limiting, CSRF controls, audit retention and
operational monitoring before production use.

## Public demo portfolio

The GP Websites marketing route presents three fictional examples, all powered
by the same workspace model and public renderer:

- `/practice/willowbrook`: a calm community/family surgery.
- `/practice/meadow-view`: an urban, digital-first medical centre.
- `/practice/kingsway`: an established neighbourhood practice.

They vary in hero structure, brand palette, imagery, content and service focus.
Their public sites are available for review; CMS links always go through the
protected sign-in route.

## Releases, migrations and safe feature rollout

The model records both `schemaVersion` and `coreVersion`, plus per-workspace
capabilities. These are architecture seams, not automated update machinery in
this demo.

A production release process should:

1. publish a versioned core release with human-readable release notes;
2. declare supported schema and host-app versions;
3. provide idempotent, tested data migrations and a rollback/restore plan;
4. deploy to an internal or pilot workspace first;
5. enable the capability for selected workspaces after browser/accessibility checks;
6. monitor errors and complete the controlled rollout;
7. keep a compatibility window so client sites can upgrade deliberately.

Bespoke code should use stable renderer slots, theme contracts and extension
interfaces. Core upgrades replace a dependency version, not client-owned files.
Automated migrations, release orchestration and feature-flag services are not
implemented in this MVP.

## Vercel compatibility

The current routes use Next.js App Router and static seed data. There are no
filesystem writes, long-lived processes, in-memory server sessions or custom
servers. The browser demo repository uses `localStorage`, so a normal Vercel
production build can render the prototype without persistent server state.

Production deployments should replace the demo adapter with Vercel-compatible
managed services:

- a transactional database for workspaces, content, membership and audit data;
- an authentication provider with server-side session verification;
- object storage for media with workspace-scoped upload authorization;
- optional rate limiting, email and observability adapters.

Secrets belong in Vercel environment variables and must only be read by server
modules. Public variables must never contain credentials. Preview, staging and
production should use separate data and credentials. This MVP has not connected
a Vercel account.

## Production work still required

- identity-provider adapter implementation, invitations and account recovery;
- database-backed tenant isolation and role permissions;
- database persistence, backups, migrations and conflict handling;
- safe media upload, processing and retention;
- immutable, exportable audit logging;
- domain routing and certificate setup for each practice;
- security, accessibility, clinical-safety, privacy and content-governance reviews;
- monitoring, incident response and tested recovery procedures.
