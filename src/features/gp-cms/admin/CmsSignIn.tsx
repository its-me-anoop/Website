"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Building2, LockKeyhole, ShieldCheck } from "lucide-react";
import type { CmsRole } from "../auth/types";

type DemoWorkspaceChoice = { slug: string; name: string };

export function CmsSignIn({
  mode,
  issue,
  next,
  workspaces,
  providerReady,
}: {
  mode: "demo" | "production" | "unconfigured";
  issue?: string;
  next: string;
  workspaces: readonly DemoWorkspaceChoice[];
  providerReady: boolean;
}) {
  const [workspace, setWorkspace] = useState(workspaces[0]?.slug ?? "");
  const [role, setRole] = useState<CmsRole>("practice_admin");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function startDemo(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await fetch("/api/cms/auth/demo", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ workspace, role }),
      });
      const result = (await response.json()) as { error?: string };
      if (!response.ok) {
        setError(result.error ?? "We could not start the local demo session.");
        return;
      }
      window.location.assign(next);
    } catch {
      setError("We could not start the local demo session. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="gp-cms-root grid min-h-screen bg-[var(--cms-canvas)] text-[var(--cms-ink)] lg:grid-cols-[0.9fr_1.1fr]">
      <aside className="hidden bg-[var(--cms-sidebar)] p-10 text-white lg:flex lg:flex-col xl:p-14">
        <Link href="/" className="flex items-center gap-3 font-semibold">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-white text-sm font-bold text-[var(--cms-sidebar)]">F</span>
          Flutterly GP Websites
        </Link>
        <div className="my-auto max-w-md">
          <p className="text-sm font-semibold text-white/65">Secure workspace access</p>
          <p className="mt-3 text-4xl font-semibold leading-tight tracking-[-0.04em]">
            Your practice website, in the right hands.
          </p>
          <p className="mt-5 text-base leading-7 text-white/72">
            Sign in to update patient-facing information, review drafts and publish changes with a clear record of who did what.
          </p>
        </div>
        <p className="text-sm leading-6 text-white/60">
          Public practice websites remain open. This space is only for authorised staff.
        </p>
      </aside>

      <main id="main" className="flex items-center px-5 py-10 sm:px-8 lg:px-14">
        <div className="mx-auto w-full max-w-[520px]">
          <Link href="/" className="inline-flex items-center gap-3 font-semibold lg:hidden">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--cms-sidebar)] text-sm font-bold text-white">F</span>
            Flutterly GP Websites
          </Link>
          <div className="mt-12 lg:mt-0">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[var(--cms-brand-soft)] text-[var(--cms-brand)]"><LockKeyhole className="h-6 w-6" aria-hidden /></span>
            <h1 className="mt-6 text-3xl font-semibold tracking-[-0.04em]">Sign in to the CMS</h1>
            <p className="mt-3 max-w-[58ch] text-base leading-7 text-[var(--cms-muted)]">
              Use your practice or Flutterly account to manage a workspace. Your role decides which changes you can make.
            </p>
          </div>

          {mode === "demo" ? (
            <form onSubmit={startDemo} className="mt-8 rounded-2xl border border-[var(--cms-line)] bg-[var(--cms-surface)] p-5 sm:p-6">
              <div className="flex gap-3 rounded-xl bg-[var(--cms-warning-soft)] p-4 text-[var(--cms-warning)]">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />
                <p className="text-sm leading-6"><strong>Local demonstration only.</strong> It uses no real account, must not be enabled in production, and is not suitable for real practice content.</p>
              </div>
              <div className="mt-6 space-y-5">
                <label className="block"><span className="text-sm font-semibold">Demo practice</span><select value={workspace} onChange={(event) => setWorkspace(event.target.value)} className="mt-2 min-h-12 w-full rounded-xl border border-[var(--cms-line-strong)] bg-[var(--cms-surface)] px-3 text-base focus:border-[var(--cms-brand)] focus:outline-none focus:ring-3 focus:ring-[var(--cms-focus)]">{workspaces.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}</select></label>
                <label className="block"><span className="text-sm font-semibold">Try a role</span><span className="mt-1 block text-sm leading-5 text-[var(--cms-muted)]">This lets you check what each role can do in the local demonstration.</span><select value={role} onChange={(event) => setRole(event.target.value as CmsRole)} className="mt-2 min-h-12 w-full rounded-xl border border-[var(--cms-line-strong)] bg-[var(--cms-surface)] px-3 text-base focus:border-[var(--cms-brand)] focus:outline-none focus:ring-3 focus:ring-[var(--cms-focus)]"><option value="practice_admin">Practice administrator</option><option value="editor">Editor</option><option value="viewer">Viewer</option><option value="platform_admin">Flutterly platform administrator</option></select></label>
              </div>
              {error ? <p role="alert" className="mt-5 rounded-xl bg-[var(--cms-danger-soft)] p-3 text-sm font-semibold text-[var(--cms-danger)]">{error}</p> : null}
              <button disabled={loading} type="submit" className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[var(--cms-brand)] px-5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60">{loading ? "Starting local demo…" : "Start local demo session"}<ArrowRight className="h-4 w-4" aria-hidden /></button>
            </form>
          ) : providerReady ? (
            <section className="mt-8 rounded-2xl border border-[var(--cms-line)] bg-[var(--cms-surface)] p-5 sm:p-6" aria-labelledby="provider-heading">
              <div className="flex gap-3"><ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[var(--cms-positive)]" aria-hidden /><div><h2 id="provider-heading" className="font-semibold">Continue with your organisation account</h2><p className="mt-2 text-sm leading-6 text-[var(--cms-muted)]">You will be directed to your configured identity provider. Flutterly does not see or store your password.</p></div></div>
              <a href={`/api/cms/auth/start?next=${encodeURIComponent(next)}`} className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[var(--cms-brand)] px-5 text-sm font-semibold text-white">Continue securely <ArrowRight className="h-4 w-4" aria-hidden /></a>
            </section>
          ) : (
            <section className="mt-8 rounded-2xl border border-[var(--cms-line)] bg-[var(--cms-surface)] p-5 sm:p-6" aria-labelledby="provider-heading">
              <div className="flex gap-3"><Building2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--cms-brand)]" aria-hidden /><div><h2 id="provider-heading" className="font-semibold">Organisation sign-in is not configured</h2><p className="mt-2 text-sm leading-6 text-[var(--cms-muted)]">{issue ?? "A verified identity provider and database-backed session adapter are required before this CMS can accept real administrators."}</p></div></div>
              <p className="mt-5 text-sm leading-6 text-[var(--cms-muted)]">If you need access, contact your practice administrator or Flutterly. This message is intentional: no fallback credentials are available.</p>
            </section>
          )}

          <Link href="/" className="mt-7 inline-flex min-h-11 items-center text-sm font-semibold text-[var(--cms-brand)] hover:underline">Back to Flutterly</Link>
        </div>
      </main>
    </div>
  );
}
