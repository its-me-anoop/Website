import Link from "next/link";
import { ArrowRight, Building2, ExternalLink, ShieldCheck } from "lucide-react";
import { summariseWorkspace, type PracticeWorkspace } from "../core/types";

export function CmsDirectory({ workspaces }: { workspaces: readonly PracticeWorkspace[] }) {
  return (
    <div className="gp-cms-root min-h-screen bg-[var(--cms-canvas)] text-[var(--cms-ink)]">
      <header className="border-b border-[var(--cms-line)] bg-[var(--cms-surface)]">
        <div className="mx-auto flex min-h-16 max-w-[1240px] items-center justify-between gap-4 px-4 sm:px-6">
          <Link href="/cms" className="flex items-center gap-3 font-semibold tracking-[-0.02em]">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-[var(--cms-brand)] text-sm font-bold text-white">
              F
            </span>
            Flutterly GP Websites
          </Link>
          <Link
            href="/gp-websites"
            className="inline-flex min-h-11 items-center gap-2 rounded-xl px-3 text-sm font-semibold text-[var(--cms-muted)] hover:bg-[var(--cms-soft)] hover:text-[var(--cms-ink)]"
          >
            Flutterly website <ExternalLink className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </header>

      <main id="main" className="mx-auto max-w-[1240px] px-4 py-10 sm:px-6 sm:py-14">
        <div className="max-w-[760px]">
          <p className="text-sm font-semibold text-[var(--cms-brand)]">Demo workspace directory</p>
          <h1 className="mt-2 text-[clamp(2rem,5vw,3.6rem)] font-semibold leading-[1.05] tracking-[-0.045em]">
            Choose the practice you want to update
          </h1>
          <p className="mt-4 max-w-[65ch] text-base leading-7 text-[var(--cms-muted)] sm:text-lg">
            Each practice has its own content, colours, people and publishing history.
            This local prototype uses fictional data and does not contain patient information.
          </p>
        </div>

        <section aria-labelledby="workspaces-title" className="mt-10 sm:mt-14">
          <div className="flex flex-wrap items-end justify-between gap-3 border-b border-[var(--cms-line)] pb-4">
            <div>
              <h2 id="workspaces-title" className="text-xl font-semibold tracking-[-0.025em]">
                Practice workspaces
              </h2>
              <p className="mt-1 text-sm text-[var(--cms-muted)]">
                {workspaces.length} fictional practices are available in this demonstration.
              </p>
            </div>
            <span className="inline-flex items-center gap-2 text-sm font-medium text-[var(--cms-positive)]">
              <ShieldCheck className="h-4 w-4" aria-hidden /> No patient data
            </span>
          </div>

          <div className="divide-y divide-[var(--cms-line)]">
            {workspaces.map((workspace) => {
              const summary = summariseWorkspace(workspace);
              return (
                <article
                  key={workspace.id}
                  className="grid gap-5 py-7 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center"
                >
                  <div className="flex min-w-0 gap-4">
                    <span
                      className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-sm font-bold text-white"
                      style={{ backgroundColor: summary.brand.primary }}
                      aria-hidden
                    >
                      {summary.brand.logoText}
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-lg font-semibold tracking-[-0.02em]">{summary.name}</h3>
                      <p className="mt-1 text-sm leading-6 text-[var(--cms-muted)]">{summary.tagline}</p>
                      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-[var(--cms-muted)]">
                        <span>{summary.publishedCount} published items</span>
                        <span>{summary.draftCount} drafts to review</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 sm:pl-16 lg:pl-0">
                    <Link
                      href={`/practice/${workspace.slug}`}
                      className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-[var(--cms-line-strong)] px-4 text-sm font-semibold hover:border-[var(--cms-brand)] hover:text-[var(--cms-brand)]"
                    >
                      View website <ExternalLink className="h-4 w-4" aria-hidden />
                    </Link>
                    <Link
                      href={`/cms/${workspace.slug}`}
                      className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[var(--cms-brand)] px-4 text-sm font-semibold text-white hover:bg-[var(--cms-brand-dark)]"
                    >
                      Open workspace <ArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <aside className="mt-10 flex gap-4 rounded-2xl bg-[var(--cms-soft)] p-5 sm:p-6">
          <Building2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--cms-brand)]" aria-hidden />
          <div>
            <h2 className="font-semibold">A reusable platform, not separate admin builds</h2>
            <p className="mt-1 max-w-[72ch] text-sm leading-6 text-[var(--cms-muted)]">
              Both workspaces use the same CMS core and public-site renderer. A new practice is
              added through validated workspace configuration, with no copied admin code.
            </p>
          </div>
        </aside>
      </main>
    </div>
  );
}
