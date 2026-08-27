"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  Bell,
  Building2,
  Check,
  CheckCircle2,
  CircleHelp,
  Clock3,
  ExternalLink,
  FilePenLine,
  FileText,
  Image as ImageIcon,
  Info,
  KeyRound,
  Palette,
  Plus,
  RotateCcw,
  Save,
  ShieldCheck,
  Sparkles,
  UserRound,
  Users,
} from "lucide-react";
import type {
  PracticePage,
  PracticeWorkspace,
  PublishStatus,
  WorkspaceSaveReason,
} from "../core/types";
import type { SaveState } from "../core/use-demo-workspace";
import type { CmsSectionName } from "./sections";
import { EmptyState, Field, inputClass, StatusBadge, textareaClass } from "./ui";
import type { WorkspaceAccess } from "../auth/types";

type SaveWorkspace = (
  workspace: PracticeWorkspace,
  reason: WorkspaceSaveReason
) => void;

type SectionProps = {
  workspace: PracticeWorkspace;
  save: SaveWorkspace;
  reset: () => void;
  saveState: SaveState;
  access: WorkspaceAccess;
};

export function CmsSection({
  section,
  ...props
}: SectionProps & { section: CmsSectionName }) {
  const readOnly = !props.access.can.edit_content && !props.access.can.manage_practice;
  const content = (() => {
  switch (section) {
    case "pages":
      return <PagesSection {...props} />;
    case "services":
      return <ServicesSection {...props} />;
    case "people":
      return <PeopleSection {...props} />;
    case "notices":
      return <NoticesSection {...props} />;
    case "media":
      return <MediaSection {...props} />;
    case "practice":
      return <PracticeSection {...props} />;
    case "access":
      return <AccessSection {...props} />;
    default:
      return <OverviewSection {...props} />;
  }
  })();

  return (
    <>
      {readOnly ? (
        <div className="mb-6 rounded-xl bg-[var(--cms-warning-soft)] px-4 py-3 text-sm leading-6 text-[var(--cms-warning)]">
          <strong>You have view-only access.</strong> You can review this workspace and its draft previews, but an administrator must make changes.
        </div>
      ) : null}
      {content}
    </>
  );
}

function OverviewSection({ workspace, reset, access }: SectionProps) {
  const drafts = [
    ...workspace.pages.filter((item) => item.status === "draft").map((item) => ({
      label: item.title,
      kind: "page",
      href: `/cms/${workspace.slug}/pages`,
    })),
    ...workspace.services
      .filter((item) => item.status === "draft")
      .map((item) => ({
        label: item.title,
        kind: "service",
        href: `/cms/${workspace.slug}/services`,
      })),
    ...workspace.notices
      .filter((item) => item.status === "draft")
      .map((item) => ({
        label: item.title,
        kind: "notice",
        href: `/cms/${workspace.slug}/notices`,
      })),
  ];
  const publishedCount =
    workspace.pages.filter((item) => item.status === "published").length +
    workspace.services.filter((item) => item.status === "published").length +
    workspace.notices.filter((item) => item.status === "published").length;

  return (
    <>
      <SectionHeading
        eyebrow="Workspace home"
        title={`Good morning. What would you like to update?`}
        copy={`Manage ${workspace.shortName} in small, clear steps. Changes stay in this browser until production storage and sign-in are connected.`}
      />

      <div className="mt-8 grid gap-4 md:grid-cols-[1.35fr_0.65fr]">
        <section className="rounded-2xl bg-[var(--cms-sidebar)] p-6 text-white sm:p-7" aria-labelledby="attention-heading">
          <div className="flex items-center gap-2 text-sm font-semibold text-white/70">
            <Sparkles className="h-4 w-4" aria-hidden /> Suggested next step
          </div>
          <h2 id="attention-heading" className="mt-3 text-2xl font-semibold tracking-[-0.03em]">
            {drafts.length ? `Review ${drafts.length} item${drafts.length === 1 ? "" : "s"} before publishing` : "Everything currently looks up to date"}
          </h2>
          <p className="mt-2 max-w-[58ch] text-sm leading-6 text-white/72">
            {drafts.length
              ? "Drafts are private to this demo workspace. Open an item, check the wording, preview it and publish when it is ready."
              : "There are no drafts waiting for review. You can still check opening times or prepare a notice."}
          </p>
          <Link
            href={drafts[0]?.href ?? `/cms/${workspace.slug}/practice`}
            className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-xl bg-white px-4 text-sm font-semibold text-[var(--cms-sidebar)] hover:bg-[var(--cms-soft)]"
          >
            {drafts.length ? "Review first draft" : "Check practice details"}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </section>

        <section className="rounded-2xl border border-[var(--cms-line)] bg-[var(--cms-surface)] p-6" aria-labelledby="website-status-heading">
          <div className="flex items-center gap-2 text-sm font-semibold text-[var(--cms-positive)]">
            <CheckCircle2 className="h-4 w-4" aria-hidden /> Website available
          </div>
          <h2 id="website-status-heading" className="mt-3 text-xl font-semibold tracking-[-0.025em]">
            {publishedCount} published items
          </h2>
          <p className="mt-2 text-sm leading-6 text-[var(--cms-muted)]">
            The preview only shows content marked Published.
          </p>
          <Link
            href={`/practice/${workspace.slug}`}
            target="_blank"
            className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[var(--cms-brand)] hover:underline"
          >
            Open website preview <ExternalLink className="h-4 w-4" aria-hidden />
          </Link>
        </section>
      </div>

      <section className="mt-10" aria-labelledby="common-tasks-heading">
        <h2 id="common-tasks-heading" className="text-xl font-semibold tracking-[-0.025em]">
          Common tasks
        </h2>
        <div className="mt-4 divide-y divide-[var(--cms-line)] border-y border-[var(--cms-line)]">
          <TaskLink
            href={`/cms/${workspace.slug}/pages`}
            icon={FilePenLine}
            title="Update a website page"
            copy="Change patient-facing wording, save a draft and preview it before publishing."
          />
          <TaskLink
            href={`/cms/${workspace.slug}/notices`}
            icon={Bell}
            title="Add or review a notice"
            copy="Prepare closures, service changes and other time-sensitive messages."
          />
          <TaskLink
            href={`/cms/${workspace.slug}/practice`}
            icon={Clock3}
            title="Check contact details and opening times"
            copy="Keep the information patients rely on accurate."
          />
          <TaskLink
            href={`/cms/${workspace.slug}/people`}
            icon={Users}
            title="Update the practice team"
            copy="Add clear roles and choose who appears on the public website."
          />
        </div>
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-[1fr_340px]" aria-labelledby="recent-activity-heading">
        <div>
          <h2 id="recent-activity-heading" className="text-xl font-semibold tracking-[-0.025em]">
            Recent activity
          </h2>
          <ol className="mt-4 divide-y divide-[var(--cms-line)]">
            {workspace.audit.slice(0, 4).map((event) => (
              <li key={event.id} className="grid gap-1 py-4 sm:grid-cols-[150px_1fr] sm:gap-5">
                <time className="text-sm text-[var(--cms-muted)]" dateTime={event.occurredAt}>
                  {formatDate(event.occurredAt)}
                </time>
                <div>
                  <p className="text-sm font-semibold">{event.action}</p>
                  <p className="mt-1 text-sm leading-6 text-[var(--cms-muted)]">
                    {event.detail} · {event.actor}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <aside className="self-start rounded-2xl bg-[var(--cms-soft)] p-5">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Info className="h-4 w-4 text-[var(--cms-brand)]" aria-hidden /> About this demo
          </div>
          <p className="mt-2 text-sm leading-6 text-[var(--cms-muted)]">
            Your changes are saved only in this browser. Resetting returns this practice to its fictional sample data.
          </p>
          {access.can.reset_demo ? <button
            type="button"
            onClick={reset}
            className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-xl px-2 text-sm font-semibold text-[var(--cms-brand)] hover:underline"
          >
            <RotateCcw className="h-4 w-4" aria-hidden /> Reset demo data
          </button> : null}
        </aside>
      </section>
    </>
  );
}

function PagesSection({ workspace, save, saveState }: SectionProps) {
  const [selectedId, setSelectedId] = useState(workspace.pages[0]?.id ?? "");
  const source = workspace.pages.find((page) => page.id === selectedId) ?? workspace.pages[0];
  const [draft, setDraft] = useState<PracticePage | undefined>(source);

  function selectPage(page: PracticePage) {
    setSelectedId(page.id);
    setDraft(structuredClone(page));
  }

  function commit(status: PublishStatus) {
    if (!draft) return;
    const nextPage = {
      ...draft,
      status,
      lastUpdated: new Date().toISOString(),
    };
    save(
      {
        ...workspace,
        pages: workspace.pages.map((page) => (page.id === nextPage.id ? nextPage : page)),
      },
      {
        intent: status === "published" ? "publish_content" : "save_content",
        action: status === "published" ? `Published ${nextPage.title}` : `Saved ${nextPage.title} as a draft`,
        detail: "Updated the page wording in the guided editor.",
      }
    );
    setDraft(nextPage);
  }

  return (
    <>
      <SectionHeading
        eyebrow="Website content"
        title="Website pages"
        copy="Choose a page, make one clear change at a time, then save it as a draft or publish it."
        action={
          <Link
            href={`/practice/${workspace.slug}`}
            target="_blank"
            className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-[var(--cms-line-strong)] px-4 text-sm font-semibold hover:border-[var(--cms-brand)] hover:text-[var(--cms-brand)]"
          >
            Preview website <ExternalLink className="h-4 w-4" aria-hidden />
          </Link>
        }
      />

      <div className="mt-8 grid gap-7 lg:grid-cols-[280px_minmax(0,1fr)]">
        <section aria-labelledby="page-list-heading">
          <div className="flex items-center justify-between gap-3">
            <h2 id="page-list-heading" className="text-sm font-semibold">Choose a page</h2>
            <span className="text-xs text-[var(--cms-muted)]">{workspace.pages.length} pages</span>
          </div>
          <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
            {workspace.pages.map((page) => (
              <button
                key={page.id}
                type="button"
                onClick={() => selectPage(page)}
                aria-pressed={page.id === draft?.id}
                className={`min-h-16 rounded-xl border p-3 text-left transition-colors ${
                  page.id === draft?.id
                    ? "border-[var(--cms-brand)] bg-[var(--cms-brand-soft)]"
                    : "border-[var(--cms-line)] bg-[var(--cms-surface)] hover:border-[var(--cms-line-strong)]"
                }`}
              >
                <span className="flex items-center justify-between gap-3">
                  <span className="text-sm font-semibold">{page.title}</span>
                  <StatusBadge status={page.status} />
                </span>
                <span className="mt-1 block truncate text-xs text-[var(--cms-muted)]">/{page.slug}</span>
              </button>
            ))}
          </div>
          <button
            type="button"
            className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-xl px-2 text-sm font-semibold text-[var(--cms-brand)] hover:underline"
            onClick={() => window.alert("Page templates will be connected to production storage in a later release. This demo keeps the page set fixed.")}
          >
            <Plus className="h-4 w-4" aria-hidden /> Start a new page
          </button>
        </section>

        {draft ? (
          <form
            className="min-w-0 rounded-2xl border border-[var(--cms-line)] bg-[var(--cms-surface)]"
            onSubmit={(event) => {
              event.preventDefault();
              commit("draft");
            }}
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--cms-line)] px-5 py-4 sm:px-6">
              <div className="flex items-center gap-3">
                <StatusBadge status={draft.status} />
                <span className="text-xs text-[var(--cms-muted)]">
                  Last changed {formatDate(draft.lastUpdated)}
                </span>
              </div>
              <span aria-live="polite" className="text-sm font-medium text-[var(--cms-positive)]">
                {saveState === "saved" ? "Saved in this browser" : null}
              </span>
            </div>

            <div className="space-y-7 p-5 sm:p-6">
              <div className="rounded-xl bg-[var(--cms-soft)] p-4">
                <div className="flex gap-3">
                  <CircleHelp className="mt-0.5 h-5 w-5 shrink-0 text-[var(--cms-brand)]" aria-hidden />
                  <div>
                    <p className="text-sm font-semibold">Write for patients, not the practice</p>
                    <p className="mt-1 text-sm leading-6 text-[var(--cms-muted)]">
                      Lead with the action someone can take. Use familiar words and include dates or response times where they matter. Do not add patient information, individual clinical advice or claims you have not checked.
                    </p>
                  </div>
                </div>
              </div>

              <Field label="Page title" hint="Shown at the top of the page and in browser tabs.">
                <input
                  className={inputClass}
                  value={draft.title}
                  onChange={(event) => setDraft({ ...draft, title: event.target.value })}
                  required
                />
              </Field>
              <Field label="Menu label" hint="Keep this short so it is easy to scan on a phone.">
                <input
                  className={inputClass}
                  value={draft.navigationLabel}
                  onChange={(event) => setDraft({ ...draft, navigationLabel: event.target.value })}
                  required
                />
              </Field>
              <Field label="Short description" hint="Helps colleagues understand what this page is for.">
                <textarea
                  className={textareaClass}
                  value={draft.summary}
                  onChange={(event) => setDraft({ ...draft, summary: event.target.value })}
                  required
                />
              </Field>

              <fieldset className="space-y-6">
                <legend className="text-base font-semibold">Page content</legend>
                {draft.sections.map((section, index) => (
                  <div key={section.id} className="space-y-4 border-t border-[var(--cms-line)] pt-5">
                    <p className="text-sm font-semibold text-[var(--cms-muted)]">Section {index + 1}</p>
                    <Field label="Heading">
                      <input
                        className={inputClass}
                        value={section.heading}
                        onChange={(event) =>
                          setDraft({
                            ...draft,
                            sections: draft.sections.map((item) =>
                              item.id === section.id ? { ...item, heading: event.target.value } : item
                            ),
                          })
                        }
                        required
                      />
                    </Field>
                    <Field label="Information" hint="Use short paragraphs and put the most important instruction first.">
                      <textarea
                        className={`${textareaClass} min-h-36`}
                        value={section.body}
                        onChange={(event) =>
                          setDraft({
                            ...draft,
                            sections: draft.sections.map((item) =>
                              item.id === section.id ? { ...item, body: event.target.value } : item
                            ),
                          })
                        }
                        required
                      />
                    </Field>
                  </div>
                ))}
              </fieldset>
            </div>

            <div className="sticky bottom-0 flex flex-wrap items-center gap-2 border-t border-[var(--cms-line)] bg-[var(--cms-surface)] px-5 py-4 sm:px-6">
              <button
                type="submit"
                className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-[var(--cms-line-strong)] px-4 text-sm font-semibold hover:border-[var(--cms-brand)]"
              >
                <Save className="h-4 w-4" aria-hidden /> Save as draft
              </button>
              <button
                type="button"
                onClick={() => commit("published")}
                className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[var(--cms-brand)] px-4 text-sm font-semibold text-white hover:bg-[var(--cms-brand-dark)]"
              >
                <Check className="h-4 w-4" aria-hidden /> Publish page
              </button>
              <Link
                href={`/cms/${workspace.slug}/preview/${draft.slug}`}
                target="_blank"
                className="ml-auto inline-flex min-h-11 items-center gap-2 px-2 text-sm font-semibold text-[var(--cms-brand)] hover:underline"
              >
                Preview <ExternalLink className="h-4 w-4" aria-hidden />
              </Link>
            </div>
            <p className="border-t border-[var(--cms-line)] px-5 py-3 text-xs leading-5 text-[var(--cms-muted)] sm:px-6">Before publishing: check the contact route, opening hours, linked NHS service and any date or eligibility wording. Publish only information approved by your practice.</p>
          </form>
        ) : (
          <EmptyState title="No pages yet" copy="Start with a Home page so patients have a clear place to begin." />
        )}
      </div>
    </>
  );
}

function ServicesSection({ workspace, save }: SectionProps) {
  const [selectedId, setSelectedId] = useState(workspace.services[0]?.id ?? "");
  const selected = workspace.services.find((item) => item.id === selectedId);
  const [title, setTitle] = useState(selected?.title ?? "");
  const [summary, setSummary] = useState(selected?.summary ?? "");
  const [details, setDetails] = useState(selected?.details ?? "");

  function choose(id: string) {
    const service = workspace.services.find((item) => item.id === id);
    if (!service) return;
    setSelectedId(id);
    setTitle(service.title);
    setSummary(service.summary);
    setDetails(service.details);
  }

  function commit(status: PublishStatus) {
    if (!selected) return;
    save(
      {
        ...workspace,
        services: workspace.services.map((item) =>
          item.id === selected.id ? { ...item, title, summary, details, status } : item
        ),
      },
      { intent: status === "published" ? "publish_content" : "save_content", action: `${status === "published" ? "Published" : "Saved"} ${title}`, detail: "Updated a service description." }
    );
  }

  return (
    <>
      <SectionHeading eyebrow="Patient information" title="Services" copy="Keep clinic and support information clear, current and easy to act on." />
      <div className="mt-8 grid gap-7 lg:grid-cols-[320px_minmax(0,1fr)]">
        <section aria-labelledby="services-list-heading">
          <h2 id="services-list-heading" className="text-sm font-semibold">Choose a service</h2>
          <div className="mt-3 grid gap-2">
            {workspace.services.map((service) => (
              <button
                key={service.id}
                type="button"
                onClick={() => choose(service.id)}
                aria-pressed={selectedId === service.id}
                className={`rounded-xl border p-4 text-left ${selectedId === service.id ? "border-[var(--cms-brand)] bg-[var(--cms-brand-soft)]" : "border-[var(--cms-line)] bg-[var(--cms-surface)] hover:border-[var(--cms-line-strong)]"}`}
              >
                <span className="flex items-start justify-between gap-3">
                  <span className="text-sm font-semibold leading-5">{service.title}</span>
                  <StatusBadge status={service.status} />
                </span>
                <span className="mt-2 block text-xs leading-5 text-[var(--cms-muted)]">{service.summary}</span>
              </button>
            ))}
          </div>
        </section>
        {selected ? (
          <form
            className="rounded-2xl border border-[var(--cms-line)] bg-[var(--cms-surface)] p-5 sm:p-6"
            onSubmit={(event) => {
              event.preventDefault();
              commit("draft");
            }}
          >
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold tracking-[-0.02em]">Edit service</h2>
              <StatusBadge status={selected.status} />
            </div>
            <div className="mt-6 space-y-6">
              <Field label="Service name"><input className={inputClass} value={title} onChange={(event) => setTitle(event.target.value)} required /></Field>
              <Field label="One-line summary" hint="Tell patients what this service helps with."><textarea className={textareaClass} value={summary} onChange={(event) => setSummary(event.target.value)} required /></Field>
              <Field label="What patients need to know" hint="Explain eligibility, how to access it and what happens next."><textarea className={`${textareaClass} min-h-40`} value={details} onChange={(event) => setDetails(event.target.value)} required /></Field>
            </div>
            <div className="mt-7 flex flex-wrap gap-2 border-t border-[var(--cms-line)] pt-5">
              <button type="submit" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-[var(--cms-line-strong)] px-4 text-sm font-semibold"><Save className="h-4 w-4" aria-hidden /> Save as draft</button>
              <button type="button" onClick={() => commit("published")} className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[var(--cms-brand)] px-4 text-sm font-semibold text-white"><Check className="h-4 w-4" aria-hidden /> Publish service</button>
            </div>
          </form>
        ) : null}
      </div>
    </>
  );
}

function PeopleSection({ workspace, save }: SectionProps) {
  function changeStatus(id: string, status: PublishStatus) {
    const person = workspace.team.find((item) => item.id === id);
    if (!person) return;
    save(
      { ...workspace, team: workspace.team.map((item) => (item.id === id ? { ...item, status } : item)) },
      { intent: "update_team", action: `${status === "published" ? "Published" : "Hid"} ${person.name}`, detail: "Changed who appears on the practice website." }
    );
  }
  const groups = useMemo(() => [...new Set(workspace.team.map((person) => person.group))], [workspace.team]);
  return (
    <>
      <SectionHeading eyebrow="Practice team" title="People patients may see" copy="Use clear role names and only publish the details each colleague has agreed to share." action={<button type="button" onClick={() => window.alert("The add-person flow is represented but not connected to production storage in this demo.")} className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[var(--cms-brand)] px-4 text-sm font-semibold text-white"><Plus className="h-4 w-4" aria-hidden /> Add a person</button>} />
      <div className="mt-8 space-y-9">
        {groups.map((group) => (
          <section key={group} aria-labelledby={`group-${group.replaceAll(" ", "-")}`}>
            <h2 id={`group-${group.replaceAll(" ", "-")}`} className="text-lg font-semibold tracking-[-0.02em]">{group}</h2>
            <div className="mt-3 divide-y divide-[var(--cms-line)] border-y border-[var(--cms-line)]">
              {workspace.team.filter((person) => person.group === group).map((person) => (
                <article key={person.id} className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[var(--cms-soft)] text-[var(--cms-brand)]"><UserRound className="h-5 w-5" aria-hidden /></span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold">{person.name}</h3>
                    <p className="text-sm text-[var(--cms-muted)]">{person.role}</p>
                    {person.biography ? <p className="mt-1 text-sm leading-6 text-[var(--cms-muted)]">{person.biography}</p> : null}
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={person.status} />
                    <button type="button" onClick={() => changeStatus(person.id, person.status === "published" ? "draft" : "published")} className="min-h-11 rounded-xl px-3 text-sm font-semibold text-[var(--cms-brand)] hover:underline">
                      {person.status === "published" ? "Hide from website" : "Publish profile"}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}

function NoticesSection({ workspace, save }: SectionProps) {
  function changeStatus(id: string, status: PublishStatus) {
    const notice = workspace.notices.find((item) => item.id === id);
    if (!notice) return;
    save(
      { ...workspace, notices: workspace.notices.map((item) => (item.id === id ? { ...item, status } : item)) },
      { intent: status === "published" ? "publish_content" : "update_notice", action: `${status === "published" ? "Published" : "Saved"} notice`, detail: notice.title }
    );
  }
  return (
    <>
      <SectionHeading eyebrow="Time-sensitive messages" title="Notices" copy="Use notices for closures and important service changes. Add an end date, keep clinical advice off notices and remove messages when they no longer apply." action={<button type="button" onClick={() => window.alert("A guided notice composer is planned for the next MVP slice. Existing demo notices can be published now.")} className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[var(--cms-brand)] px-4 text-sm font-semibold text-white"><Plus className="h-4 w-4" aria-hidden /> Create a notice</button>} />
      <div className="mt-8">
        {workspace.notices.length ? (
          <div className="divide-y divide-[var(--cms-line)] border-y border-[var(--cms-line)]">
            {workspace.notices.map((notice) => (
              <article key={notice.id} className="grid gap-4 py-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
                <div className="flex gap-4">
                  <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${notice.tone === "urgent" ? "bg-[var(--cms-danger-soft)] text-[var(--cms-danger)]" : "bg-[var(--cms-warning-soft)] text-[var(--cms-warning)]"}`}>
                    {notice.tone === "urgent" ? <AlertTriangle className="h-5 w-5" aria-hidden /> : <Bell className="h-5 w-5" aria-hidden />}
                  </span>
                  <div>
                    <div className="flex flex-wrap items-center gap-2"><h2 className="font-semibold">{notice.title}</h2><StatusBadge status={notice.status} /></div>
                    <p className="mt-2 max-w-[68ch] text-sm leading-6 text-[var(--cms-muted)]">{notice.message}</p>
                    <p className="mt-2 text-xs text-[var(--cms-muted)]">Starts {formatShortDate(notice.startsOn)}{notice.endsOn ? ` · Ends ${formatShortDate(notice.endsOn)}` : ""}</p>
                  </div>
                </div>
                <button type="button" onClick={() => changeStatus(notice.id, notice.status === "published" ? "draft" : "published")} className="min-h-11 justify-self-start rounded-xl border border-[var(--cms-line-strong)] px-4 text-sm font-semibold lg:justify-self-end">
                  {notice.status === "published" ? "Return to draft" : "Publish notice"}
                </button>
              </article>
            ))}
          </div>
        ) : (
          <EmptyState title="No notices are showing" copy="That is often a good thing. Create one only when patients need a temporary, prominent update." action={<button type="button" onClick={() => window.alert("The notice composer is not connected in this demonstration.")} className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[var(--cms-brand)] px-4 text-sm font-semibold text-white"><Plus className="h-4 w-4" aria-hidden /> Create the first notice</button>} />
        )}
      </div>
    </>
  );
}

function MediaSection({ workspace, save }: SectionProps) {
  const [selectedId, setSelectedId] = useState(workspace.media[0]?.id ?? "");
  const selected = workspace.media.find((item) => item.id === selectedId);
  const [alt, setAlt] = useState(selected?.alt ?? "");
  function choose(id: string) {
    const media = workspace.media.find((item) => item.id === id);
    if (!media) return;
    setSelectedId(id);
    setAlt(media.alt);
  }
  return (
    <>
      <SectionHeading eyebrow="Images and documents" title="Media library" copy="Use meaningful file names and describe images for people who cannot see them." action={<button type="button" onClick={() => window.alert("Production uploads need Vercel-compatible object storage. This demo intentionally uses bundled fictional assets only.")} className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[var(--cms-brand)] px-4 text-sm font-semibold text-white"><Plus className="h-4 w-4" aria-hidden /> Add an image</button>} />
      <div className="mt-8 grid gap-7 lg:grid-cols-[minmax(0,1fr)_340px]">
        <section aria-labelledby="media-grid-heading">
          <h2 id="media-grid-heading" className="sr-only">Available images</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {workspace.media.map((item) => (
              <button key={item.id} type="button" onClick={() => choose(item.id)} aria-pressed={item.id === selectedId} className={`overflow-hidden rounded-xl border bg-[var(--cms-surface)] text-left ${item.id === selectedId ? "border-[var(--cms-brand)] ring-2 ring-[var(--cms-focus)]" : "border-[var(--cms-line)] hover:border-[var(--cms-line-strong)]"}`}>
                <Image src={item.src} alt="" width={360} height={240} className="aspect-[4/3] w-full object-cover" />
                <span className="block truncate px-3 py-2.5 text-sm font-semibold">{item.name}</span>
              </button>
            ))}
          </div>
        </section>
        {selected ? (
          <form className="self-start rounded-2xl border border-[var(--cms-line)] bg-[var(--cms-surface)] p-5" onSubmit={(event) => { event.preventDefault(); save({ ...workspace, media: workspace.media.map((item) => item.id === selected.id ? { ...item, alt } : item) }, { intent: "update_media", action: "Updated image description", detail: selected.name }); }}>
            <div className="flex items-center gap-2"><ImageIcon className="h-5 w-5 text-[var(--cms-brand)]" aria-hidden /><h2 className="font-semibold">Image details</h2></div>
            <p className="mt-2 text-sm text-[var(--cms-muted)]">{selected.name}</p>
            <div className="mt-5"><Field label="Image description" hint="Describe the useful content, not every visual detail."><textarea className={textareaClass} value={alt} onChange={(event) => setAlt(event.target.value)} required /></Field></div>
            <button type="submit" className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-xl bg-[var(--cms-brand)] px-4 text-sm font-semibold text-white"><Save className="h-4 w-4" aria-hidden /> Save description</button>
          </form>
        ) : null}
      </div>
    </>
  );
}

function PracticeSection({ workspace, save }: SectionProps) {
  const [name, setName] = useState(workspace.name);
  const [tagline, setTagline] = useState(workspace.tagline);
  const [phone, setPhone] = useState(workspace.contact.phone);
  const [address, setAddress] = useState(workspace.contact.address);
  const [postcode, setPostcode] = useState(workspace.contact.postcode);
  const [primary, setPrimary] = useState(workspace.brand.primary);
  return (
    <>
      <SectionHeading eyebrow="Practice setup" title="Practice details" copy="Keep core information in one place so the public website uses the same trusted source." />
      <form className="mt-8 max-w-[800px] space-y-10" onSubmit={(event) => { event.preventDefault(); save({ ...workspace, name, tagline, brand: { ...workspace.brand, primary }, contact: { ...workspace.contact, phone, phoneHref: `tel:${phone.replace(/\s/g, "")}`, address, postcode } }, { intent: "update_practice", action: "Updated practice details", detail: "Changed public contact or brand information." }); }}>
        <section aria-labelledby="identity-heading" className="rounded-2xl border border-[var(--cms-line)] bg-[var(--cms-surface)] p-5 sm:p-6">
          <div className="flex items-center gap-3"><Building2 className="h-5 w-5 text-[var(--cms-brand)]" aria-hidden /><div><h2 id="identity-heading" className="font-semibold">Name and contact</h2><p className="mt-1 text-sm text-[var(--cms-muted)]">Shown in the website header and footer.</p></div></div>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <Field label="Practice name"><input className={inputClass} value={name} onChange={(event) => setName(event.target.value)} required /></Field>
            <Field label="Telephone number"><input className={inputClass} value={phone} onChange={(event) => setPhone(event.target.value)} inputMode="tel" required /></Field>
            <div className="sm:col-span-2"><Field label="Short description"><input className={inputClass} value={tagline} onChange={(event) => setTagline(event.target.value)} required /></Field></div>
            <Field label="Street address"><input className={inputClass} value={address} onChange={(event) => setAddress(event.target.value)} required /></Field>
            <Field label="Postcode"><input className={inputClass} value={postcode} onChange={(event) => setPostcode(event.target.value)} required /></Field>
          </div>
        </section>
        <section aria-labelledby="brand-heading" className="rounded-2xl border border-[var(--cms-line)] bg-[var(--cms-surface)] p-5 sm:p-6">
          <div className="flex items-center gap-3"><Palette className="h-5 w-5 text-[var(--cms-brand)]" aria-hidden /><div><h2 id="brand-heading" className="font-semibold">Website appearance</h2><p className="mt-1 text-sm text-[var(--cms-muted)]">A controlled choice keeps text and buttons accessible.</p></div></div>
          <div className="mt-6 max-w-sm"><Field label="Main site colour" hint="Choose a dark colour so white button text stays easy to read."><div className="flex items-center gap-3"><input type="color" value={primary} onChange={(event) => setPrimary(event.target.value)} className="h-12 w-16 cursor-pointer rounded-xl border border-[var(--cms-line-strong)] bg-white p-1" /><input className={inputClass} value={primary} onChange={(event) => setPrimary(event.target.value)} pattern="#[0-9a-fA-F]{6}" required /></div></Field></div>
        </section>
        <section aria-labelledby="hours-heading" className="rounded-2xl border border-[var(--cms-line)] bg-[var(--cms-surface)] p-5 sm:p-6">
          <div className="flex items-center gap-3"><Clock3 className="h-5 w-5 text-[var(--cms-brand)]" aria-hidden /><div><h2 id="hours-heading" className="font-semibold">Opening times</h2><p className="mt-1 text-sm text-[var(--cms-muted)]">These demo times are ready to publish. Guided editing is the next storage-backed slice.</p></div></div>
          <dl className="mt-5 divide-y divide-[var(--cms-line)]">
            {workspace.openingTimes.map((item) => <div key={item.day} className="grid grid-cols-[110px_1fr] gap-4 py-3 text-sm"><dt className="font-semibold">{item.day}</dt><dd className="text-[var(--cms-muted)]">{item.hours}{item.note ? <span className="block text-xs">{item.note}</span> : null}</dd></div>)}
          </dl>
        </section>
        <div className="flex flex-wrap items-center gap-3"><button type="submit" className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-[var(--cms-brand)] px-5 text-sm font-semibold text-white"><Save className="h-4 w-4" aria-hidden /> Save practice details</button><span className="text-sm text-[var(--cms-muted)]">The public preview updates in this browser.</span></div>
      </form>
    </>
  );
}

function AccessSection({ workspace }: SectionProps) {
  return (
    <>
      <SectionHeading eyebrow="Workspace governance" title="People and activity" copy="A readable foundation for access roles and change history. Real sign-in and server-enforced permissions are not connected in this demo." />
      <div className="mt-8 grid gap-9 lg:grid-cols-[1fr_1fr]">
        <section aria-labelledby="workspace-people-heading">
          <div className="flex items-center justify-between gap-3"><h2 id="workspace-people-heading" className="text-lg font-semibold tracking-[-0.02em]">Workspace people</h2><button type="button" onClick={() => window.alert("Invitations require a production authentication and email provider.")} className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[var(--cms-brand)] hover:underline"><Plus className="h-4 w-4" aria-hidden /> Invite someone</button></div>
          <div className="mt-3 divide-y divide-[var(--cms-line)] border-y border-[var(--cms-line)]">
            {workspace.members.map((member) => (
              <article key={member.id} className="flex items-center gap-3 py-4">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-[var(--cms-soft)] text-xs font-bold text-[var(--cms-brand)]">{initials(member.name)}</span>
                <div className="min-w-0 flex-1"><h3 className="truncate text-sm font-semibold">{member.name}</h3><p className="truncate text-xs text-[var(--cms-muted)]">{member.email}</p></div>
                <span className="rounded-full bg-[var(--cms-soft)] px-2.5 py-1 text-xs font-semibold capitalize">{plainRole(member.role)}</span>
              </article>
            ))}
          </div>
          <aside className="mt-5 flex gap-3 rounded-xl bg-[var(--cms-warning-soft)] p-4"><KeyRound className="mt-0.5 h-5 w-5 shrink-0 text-[var(--cms-warning)]" aria-hidden /><p className="text-sm leading-6 text-[var(--cms-warning)]"><strong>Demo limitation:</strong> these roles describe the intended permissions but are not enforced until production authentication and workspace checks are added.</p></aside>
        </section>
        <section aria-labelledby="activity-heading">
          <h2 id="activity-heading" className="text-lg font-semibold tracking-[-0.02em]">Activity history</h2>
          <ol className="mt-3 divide-y divide-[var(--cms-line)] border-y border-[var(--cms-line)]">
            {workspace.audit.map((event) => (
              <li key={event.id} className="py-4"><div className="flex items-start gap-3"><span className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[var(--cms-positive-soft)] text-[var(--cms-positive)]"><Check className="h-4 w-4" aria-hidden /></span><div><p className="text-sm font-semibold">{event.action}</p><p className="mt-1 text-sm leading-5 text-[var(--cms-muted)]">{event.detail}</p><p className="mt-2 text-xs text-[var(--cms-muted)]">{event.actor} · {formatDate(event.occurredAt)}</p></div></div></li>
            ))}
          </ol>
        </section>
      </div>
      <section className="mt-10 rounded-2xl border border-[var(--cms-line)] bg-[var(--cms-surface)] p-5 sm:p-6" aria-labelledby="capabilities-heading">
        <div className="flex gap-3"><ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[var(--cms-positive)]" aria-hidden /><div><h2 id="capabilities-heading" className="font-semibold">Workspace capabilities</h2><p className="mt-1 max-w-[68ch] text-sm leading-6 text-[var(--cms-muted)]">These switches are the foundation for controlled feature rollout from the shared CMS core. They are configuration only in this MVP.</p></div></div>
        <ul className="mt-5 grid gap-2 sm:grid-cols-2">
          {Object.entries(workspace.capabilities).map(([name, enabled]) => <li key={name} className="flex min-h-11 items-center gap-3 rounded-xl bg-[var(--cms-soft)] px-3 text-sm font-medium"><span className={`grid h-5 w-5 place-items-center rounded-full ${enabled ? "bg-[var(--cms-positive)] text-white" : "bg-[var(--cms-line-strong)] text-[var(--cms-muted)]"}`}>{enabled ? <Check className="h-3 w-3" aria-hidden /> : null}</span>{plainCapability(name)}</li>)}
        </ul>
      </section>
    </>
  );
}

function SectionHeading({ eyebrow, title, copy, action }: { eyebrow: string; title: string; copy: string; action?: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-[760px]"><p className="text-sm font-semibold text-[var(--cms-brand)]">{eyebrow}</p><h1 className="mt-2 text-[clamp(2rem,5vw,3rem)] font-semibold leading-[1.08] tracking-[-0.04em]">{title}</h1><p className="mt-3 max-w-[68ch] text-base leading-7 text-[var(--cms-muted)]">{copy}</p></div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

function TaskLink({ href, icon: Icon, title, copy }: { href: string; icon: typeof FileText; title: string; copy: string }) {
  return <Link href={href} className="group grid min-h-20 grid-cols-[44px_1fr_auto] items-center gap-4 py-4"><span className="grid h-11 w-11 place-items-center rounded-xl bg-[var(--cms-soft)] text-[var(--cms-brand)]"><Icon className="h-5 w-5" aria-hidden /></span><span><span className="block text-sm font-semibold group-hover:text-[var(--cms-brand)]">{title}</span><span className="mt-1 block text-sm leading-5 text-[var(--cms-muted)]">{copy}</span></span><ArrowRight className="h-4 w-4 text-[var(--cms-muted)] transition-transform group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden /></Link>;
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" }).format(new Date(value));
}
function formatShortDate(value: string) {
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short" }).format(new Date(`${value}T12:00:00`));
}
function initials(name: string) {
  return name.split(" ").map((part) => part[0]).filter(Boolean).slice(0, 2).join("").toUpperCase();
}
function plainRole(role: string) {
  return role === "owner" ? "Workspace owner" : role === "publisher" ? "Can publish" : role === "editor" ? "Can edit" : "Can view";
}
function plainCapability(name: string) {
  return name === "announcements" ? "Notices" : name === "teamProfiles" ? "Practice team profiles" : name === "serviceDirectory" ? "Service directory" : name === "mediaLibrary" ? "Images and files" : name;
}
