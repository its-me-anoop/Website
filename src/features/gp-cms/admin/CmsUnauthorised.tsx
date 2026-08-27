import Link from "next/link";
import { ArrowLeft, ShieldAlert } from "lucide-react";

export function CmsUnauthorised({ workspace }: { workspace?: string }) {
  return (
    <div className="gp-cms-root grid min-h-screen place-items-center bg-[var(--cms-canvas)] px-5 py-10 text-[var(--cms-ink)]">
      <main id="main" className="w-full max-w-[560px] rounded-2xl border border-[var(--cms-line)] bg-[var(--cms-surface)] p-6 sm:p-8">
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[var(--cms-warning-soft)] text-[var(--cms-warning)]"><ShieldAlert className="h-6 w-6" aria-hidden /></span>
        <h1 className="mt-6 text-3xl font-semibold tracking-[-0.04em]">You do not have access to that workspace</h1>
        <p className="mt-3 text-base leading-7 text-[var(--cms-muted)]">
          {workspace ? `Your account is not allowed to manage ${workspace}.` : "Your account is not allowed to manage this CMS area."} Ask a practice administrator or Flutterly to review your access.
        </p>
        <div className="mt-7 flex flex-wrap gap-3"><Link href="/cms" className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[var(--cms-brand)] px-4 text-sm font-semibold text-white"><ArrowLeft className="h-4 w-4" aria-hidden /> Back to workspaces</Link><Link href="/" className="inline-flex min-h-11 items-center rounded-xl px-3 text-sm font-semibold text-[var(--cms-brand)] hover:underline">Back to Flutterly</Link></div>
      </main>
    </div>
  );
}
