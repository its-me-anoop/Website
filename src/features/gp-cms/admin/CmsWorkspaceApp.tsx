"use client";

import Link from "next/link";
import {
  Bell,
  BookOpenText,
  ChevronDown,
  ExternalLink,
  FileText,
  Home,
  Image as ImageIcon,
  Menu,
  Settings2,
  Stethoscope,
  Users,
} from "lucide-react";
import { useDemoWorkspace } from "../core/use-demo-workspace";
import type { PracticeWorkspace } from "../core/types";
import { CmsSection } from "./CmsSections";
import type { CmsSectionName } from "./sections";
import type { CmsActor, WorkspaceAccess } from "../auth/types";
import { labelForRole } from "../auth/permissions";
import { CmsSignOutButton } from "./CmsSignOutButton";

const navigation: Array<{
  id: CmsSectionName;
  label: string;
  icon: typeof Home;
}> = [
  { id: "overview", label: "Home", icon: Home },
  { id: "pages", label: "Website pages", icon: FileText },
  { id: "services", label: "Services", icon: Stethoscope },
  { id: "people", label: "Practice team", icon: Users },
  { id: "notices", label: "Notices", icon: Bell },
  { id: "media", label: "Images and files", icon: ImageIcon },
  { id: "practice", label: "Practice details", icon: Settings2 },
  { id: "access", label: "People and activity", icon: BookOpenText },
];

export function CmsWorkspaceApp({
  seed,
  section,
  actor,
  access,
}: {
  seed: PracticeWorkspace;
  section: CmsSectionName;
  actor: CmsActor;
  access: WorkspaceAccess;
}) {
  const { workspace, save, reset, saveState } = useDemoWorkspace(seed, actor);
  const current = navigation.find((item) => item.id === section) ?? navigation[0];

  return (
    <div className="gp-cms-root min-h-screen bg-[var(--cms-canvas)] text-[var(--cms-ink)] lg:grid lg:grid-cols-[270px_minmax(0,1fr)]">
      <aside className="border-b border-[var(--cms-line)] bg-[var(--cms-sidebar)] text-white lg:sticky lg:top-0 lg:h-screen lg:border-b-0 lg:border-r lg:border-white/10">
        <div className="flex min-h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:min-h-[76px] lg:px-5">
          <Link href="/cms" className="flex items-center gap-3 font-semibold tracking-[-0.02em]">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-white text-sm font-bold text-[var(--cms-sidebar)]">
              F
            </span>
            <span>GP Websites</span>
          </Link>
          <span className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/80">
            Demo
          </span>
        </div>

        <details className="group border-t border-white/10 lg:hidden">
          <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 px-4 text-sm font-semibold sm:px-6 [&::-webkit-details-marker]:hidden">
            <span className="inline-flex items-center gap-2">
              <Menu className="h-4 w-4" aria-hidden /> {current.label}
            </span>
            <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180 motion-reduce:transition-none" aria-hidden />
          </summary>
          <CmsNavigation workspaceSlug={workspace.slug} current={section} />
        </details>

        <div className="hidden h-[calc(100vh-76px)] flex-col lg:flex">
          <div className="px-5 pb-4 pt-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/55">
              Current practice
            </p>
            <p className="mt-1 truncate text-sm font-semibold">{workspace.shortName}</p>
          </div>
          <CmsNavigation workspaceSlug={workspace.slug} current={section} />
          <div className="mt-auto border-t border-white/10 p-4">
            <div className="flex items-center gap-3 rounded-xl px-2 py-2">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-white/12 text-xs font-bold">
                {actor.name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase()}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold">{actor.name}</span>
                <span className="block text-xs text-white/60">{labelForRole(access.role)}</span>
              </span>
              <CmsSignOutButton />
            </div>
          </div>
        </div>
      </aside>

      <div className="min-w-0">
        <header className="border-b border-[var(--cms-line)] bg-[var(--cms-surface)]">
          <div className="flex min-h-[76px] flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
            <div className="flex min-w-0 items-center gap-3">
              <span
                className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-xs font-bold text-white"
                style={{ backgroundColor: workspace.brand.primary }}
                aria-hidden
              >
                {workspace.brand.logoText}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{workspace.name}</p>
                <p className="text-xs text-[var(--cms-muted)]">
                  Browser-local demonstration · Core {workspace.coreVersion}
                </p>
              </div>
            </div>
            <Link
              href={`/practice/${workspace.slug}`}
              target="_blank"
              className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-[var(--cms-line-strong)] px-3.5 text-sm font-semibold hover:border-[var(--cms-brand)] hover:text-[var(--cms-brand)]"
            >
              Preview website <ExternalLink className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </header>

        <main id="main" className="px-4 py-7 sm:px-6 sm:py-9 lg:px-8 lg:py-10">
          <div className="mx-auto max-w-[1080px]">
            <div aria-live="polite" className="sr-only">
              {saveState === "saving" ? "Saving changes" : null}
              {saveState === "saved" ? "Changes saved in this browser" : null}
              {saveState === "error" ? "Changes could not be saved" : null}
            </div>
            {saveState === "error" ? (
              <div role="alert" className="mb-6 rounded-xl bg-[var(--cms-danger-soft)] px-4 py-3 text-sm font-semibold text-[var(--cms-danger)]">
                We could not save that change in this browser. Try again or reset the demo data.
              </div>
            ) : null}
            <CmsSection
              key={section}
              section={section}
              workspace={workspace}
              save={save}
              reset={reset}
              saveState={saveState}
              access={access}
            />
          </div>
        </main>
      </div>
    </div>
  );
}

function CmsNavigation({
  workspaceSlug,
  current,
}: {
  workspaceSlug: string;
  current: CmsSectionName;
}) {
  return (
    <nav aria-label="Workspace" className="px-3 pb-4 lg:px-4">
      <ul className="grid gap-1 sm:grid-cols-2 lg:grid-cols-1">
        {navigation.map((item) => {
          const Icon = item.icon;
          const active = current === item.id;
          const href =
            item.id === "overview" ? `/cms/${workspaceSlug}` : `/cms/${workspaceSlug}/${item.id}`;
          return (
            <li key={item.id}>
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={`flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium transition-colors ${
                  active
                    ? "bg-white text-[var(--cms-sidebar)]"
                    : "text-white/78 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon className="h-[18px] w-[18px] shrink-0" aria-hidden />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
