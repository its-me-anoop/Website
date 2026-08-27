import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink, LockKeyhole } from "lucide-react";
import { demoWorkspaces } from "@/data/gp-cms/demo-workspaces";

export function GpDemoPortfolio() {
  return (
    <section id="gp-demo-sites" className="border-y border-bl-line bg-bl-band">
      <div className="mx-auto max-w-[1240px] px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-bl-nhs">Shared CMS, distinct practice websites</p>
            <h2 className="mt-4 max-w-[500px] text-[clamp(1.9rem,4vw,2.8rem)] font-medium leading-[1.1] tracking-[-0.035em] text-bl-ink">Three ways the same platform can feel at home in a practice.</h2>
          </div>
          <p className="max-w-[620px] text-[15.5px] leading-relaxed text-bl-ink-soft">Each fictional site uses the same reusable content and publishing core. The information architecture, visual rhythm and patient emphasis adapt to the practice, without copying a separate CMS for each client.</p>
        </div>
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {demoWorkspaces.map((workspace) => (
            <article key={workspace.id} className="flex min-w-0 flex-col overflow-hidden rounded-[24px] border border-bl-line bg-bl-surface">
              <div className="relative aspect-[16/10] overflow-hidden" style={{ backgroundColor: workspace.brand.surface }}>
                <Image src={workspace.portfolio.image} alt={workspace.portfolio.imageAlt} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
                <span className="absolute left-4 top-4 rounded-full bg-bl-surface/95 px-3 py-1 text-[11px] font-semibold text-bl-ink">{workspace.portfolio.label}</span>
              </div>
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <p className="text-[12px] font-semibold text-bl-nhs">{workspace.portfolio.emphasis}</p>
                <h3 className="mt-2 text-[20px] font-medium tracking-tight text-bl-ink">{workspace.name}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-bl-ink-soft">{workspace.portfolio.description}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href={`/practice/${workspace.slug}`} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-bl-teal px-4 text-[13.5px] font-semibold text-bl-canvas hover:bg-bl-teal-hover">Preview site <ExternalLink className="h-4 w-4" aria-hidden /></Link>
                  <Link href="/cms/sign-in" className="inline-flex min-h-11 items-center gap-2 px-2 text-[13px] font-semibold text-bl-teal hover:underline">CMS sign-in <LockKeyhole className="h-3.5 w-3.5" aria-hidden /></Link>
                </div>
              </div>
            </article>
          ))}
        </div>
        <Link href="#contact" className="mt-8 inline-flex items-center gap-2 text-[14px] font-semibold text-bl-teal hover:underline">Talk through a practice-specific website <ArrowRight className="h-4 w-4" aria-hidden /></Link>
      </div>
    </section>
  );
}
