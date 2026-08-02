"use client";

import Image from "next/image";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  ExternalLink,
  MapPin,
  Menu,
  Phone,
  Pill,
  Stethoscope,
  Users,
} from "lucide-react";
import type { CSSProperties } from "react";
import { useDemoWorkspace } from "../core/use-demo-workspace";
import type { PracticePage, PracticeWorkspace } from "../core/types";

export function PracticeSite({
  seed,
  pageSlug,
  isCmsPreview = false,
}: {
  seed: PracticeWorkspace;
  pageSlug?: string;
  isCmsPreview?: boolean;
}) {
  const { workspace } = useDemoWorkspace(seed);
  const previewPage = pageSlug
    ? workspace.pages.find((page) => page.slug === pageSlug)
    : undefined;
  const publishedPages = workspace.pages.filter((page) => page.status === "published");
  const siteStyle = {
    "--practice-primary": workspace.brand.primary,
    "--practice-primary-dark": workspace.brand.primaryDark,
    "--practice-accent": workspace.brand.accent,
    "--practice-surface": workspace.brand.surface,
  } as CSSProperties;

  return (
    <div className="gp-site-root min-h-screen" style={siteStyle}>
      {isCmsPreview && previewPage ? (
        <div className="bg-[var(--practice-accent)] text-[var(--practice-ink)]">
          <div className="mx-auto flex min-h-11 max-w-[1180px] flex-wrap items-center justify-between gap-2 px-4 py-2 text-sm sm:px-6">
            <p className="font-semibold">
              CMS preview — this page is only visible to authorised workspace users
            </p>
            <Link href={`/cms/${workspace.slug}/pages`} className="font-semibold underline underline-offset-2">
              Return to page editor
            </Link>
          </div>
        </div>
      ) : null}

      <header>
        <div className="bg-[var(--practice-primary)] text-white">
          <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-5 px-4 py-5 sm:px-6 sm:py-6">
            <Link href={`/practice/${workspace.slug}`} className="flex min-w-0 items-center gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white text-sm font-extrabold text-[var(--practice-primary)]">
                {workspace.brand.logoText}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-xl font-bold tracking-[-0.025em] sm:text-2xl">
                  {workspace.name}
                </span>
                <span className="mt-0.5 hidden text-sm text-white/82 sm:block">{workspace.tagline}</span>
              </span>
            </Link>
            <a
              href={workspace.contact.phoneHref}
              className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-white px-4 text-sm font-bold text-[var(--practice-primary)] hover:bg-[var(--practice-surface)]"
            >
              <Phone className="h-4 w-4" aria-hidden /> {workspace.contact.phone}
            </a>
          </div>
        </div>

        <details className="group border-b border-[var(--practice-line)] bg-white lg:hidden">
          <summary className="mx-auto flex min-h-12 max-w-[1180px] cursor-pointer list-none items-center justify-between px-4 text-sm font-bold text-[var(--practice-primary)] sm:px-6 [&::-webkit-details-marker]:hidden">
            Website menu <Menu className="h-5 w-5" aria-hidden />
          </summary>
          <PracticeNavigation workspace={workspace} pages={publishedPages} />
        </details>
        <div className="hidden border-b border-[var(--practice-line)] bg-white lg:block">
          <PracticeNavigation workspace={workspace} pages={publishedPages} />
        </div>
      </header>

      <UrgentHelp />

      <main id="main">
        {previewPage ? (
          <InnerPage workspace={workspace} page={previewPage} />
        ) : (
          <HomePage workspace={workspace} />
        )}
      </main>

      <footer className="mt-16 bg-[var(--practice-ink)] text-white">
        <div className="mx-auto grid max-w-[1180px] gap-8 px-4 py-10 sm:px-6 md:grid-cols-3">
          <div>
            <h2 className="text-base font-bold">{workspace.name}</h2>
            <p className="mt-2 text-sm leading-6 text-white/72">
              {workspace.contact.address}<br />{workspace.contact.postcode}
            </p>
          </div>
          <div>
            <h2 className="text-base font-bold">When we are closed</h2>
            <p className="mt-2 text-sm leading-6 text-white/72">
              Use NHS 111 online or call 111. In a life-threatening emergency, call 999.
            </p>
          </div>
          <div>
            <h2 className="text-base font-bold">About this website</h2>
            <p className="mt-2 text-sm leading-6 text-white/72">
              Fictional practice and demo content only. No patient services or clinical systems are connected.
            </p>
          </div>
        </div>
        <div className="border-t border-white/15">
          <p className="mx-auto max-w-[1180px] px-4 py-4 text-xs text-white/65 sm:px-6">
            Custom GP website platform demonstration by Flutterly Limited.
          </p>
        </div>
      </footer>
    </div>
  );
}

function PracticeNavigation({ workspace, pages }: { workspace: PracticeWorkspace; pages: PracticePage[] }) {
  return (
    <nav aria-label="Primary" className="mx-auto max-w-[1180px] px-4 sm:px-6">
      <ul className="grid sm:grid-cols-2 lg:flex lg:flex-wrap">
        {pages.map((page) => (
          <li key={page.id}>
            <Link
              href={
                page.slug === "home"
                  ? `/practice/${workspace.slug}`
                  : `/practice/${workspace.slug}/${page.slug}`
              }
              className="block min-h-11 border-b border-[var(--practice-line)] px-3 py-3 text-sm font-bold text-[var(--practice-primary)] hover:bg-[var(--practice-surface)] lg:border-b-0"
            >
              {page.navigationLabel}
            </Link>
          </li>
        ))}
        <li>
          <a href={`/practice/${workspace.slug}#services`} className="block min-h-11 border-b border-[var(--practice-line)] px-3 py-3 text-sm font-bold text-[var(--practice-primary)] hover:bg-[var(--practice-surface)] lg:border-b-0">
            Services
          </a>
        </li>
        <li>
          <a href={`/practice/${workspace.slug}#contact`} className="block min-h-11 px-3 py-3 text-sm font-bold text-[var(--practice-primary)] hover:bg-[var(--practice-surface)]">
            Contact
          </a>
        </li>
      </ul>
    </nav>
  );
}

function HomePage({ workspace }: { workspace: PracticeWorkspace }) {
  const publishedNotices = workspace.notices.filter((notice) => notice.status === "published");
  const services = workspace.services.filter((service) => service.status === "published");
  const team = workspace.team.filter((person) => person.status === "published");
  return (
    <>
      <PracticeHero workspace={workspace} />

      {publishedNotices.length ? (
        <section aria-label="Practice notices" className="mx-auto max-w-[1180px] px-4 pt-8 sm:px-6">
          {publishedNotices.map((notice) => (
            <article key={notice.id} className="flex gap-4 rounded-xl border border-[var(--practice-warning-line)] bg-[var(--practice-warning-soft)] p-4 sm:p-5">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-[var(--practice-warning)]" aria-hidden />
              <div><h2 className="font-bold">{notice.title}</h2><p className="mt-1 text-sm leading-6 text-[var(--practice-muted)]">{notice.message}</p></div>
            </article>
          ))}
        </section>
      ) : null}

      <section className="mx-auto max-w-[1180px] px-4 py-12 sm:px-6 sm:py-16" aria-labelledby="common-actions-heading">
        <h2 id="common-actions-heading" className="text-2xl font-bold tracking-[-0.025em]">Common requests</h2>
        <p className="mt-2 max-w-[68ch] text-sm leading-6 text-[var(--practice-muted)]">Start with the task you need. Links to NHS services open on the NHS website.</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <ActionCard icon={CalendarDays} title="Appointments" copy="Find routine, urgent and home-visit options." href={practicePageHref(workspace, "appointments")} />
          <ActionCard icon={Pill} title="Repeat prescriptions" copy="Order a repeat prescription and check what to allow for." href={practicePageHref(workspace, "prescriptions")} />
          <ActionCard icon={Users} title="Join the practice" copy="Check registration information and what happens next." href={practicePageHref(workspace, "new-patients")} />
          <ActionCard icon={Stethoscope} title="Use the NHS App" copy="Access available NHS services online." href="https://www.nhs.uk/nhs-app/" external />
          <ActionCard icon={AlertTriangle} title="Get urgent help" copy="Use NHS 111 if you need urgent medical help." href="https://111.nhs.uk/" external />
        </div>
      </section>

      <section id="services" className="scroll-mt-6 bg-[var(--practice-surface)]">
        <div className="mx-auto max-w-[1180px] px-4 py-12 sm:px-6 sm:py-16">
          <div className="max-w-[720px]"><p className="text-sm font-bold text-[var(--practice-primary)]">Care at the practice</p><h2 className="mt-2 text-3xl font-bold tracking-[-0.035em]">Services and clinics</h2><p className="mt-3 text-base leading-7 text-[var(--practice-muted)]">Clear information about the care available and how to access it.</p></div>
          <div className="mt-7 divide-y divide-[var(--practice-line)] border-y border-[var(--practice-line)]">
            {services.map((service) => (
              <article key={service.id} className="grid gap-2 py-5 md:grid-cols-[280px_1fr] md:gap-8"><h3 className="text-lg font-bold text-[var(--practice-primary)]">{service.title}</h3><div><p className="font-semibold">{service.summary}</p><p className="mt-2 text-sm leading-6 text-[var(--practice-muted)]">{service.details}</p></div></article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1180px] gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-2">
        <div>
          <div className="flex items-center gap-2 text-[var(--practice-primary)]"><Clock3 className="h-5 w-5" aria-hidden /><h2 className="text-2xl font-bold tracking-[-0.025em]">Opening times</h2></div>
          <dl className="mt-5 divide-y divide-[var(--practice-line)] border-y border-[var(--practice-line)]">{workspace.openingTimes.map((item) => <div key={item.day} className="grid grid-cols-[110px_1fr] gap-4 py-3 text-sm"><dt className="font-bold">{item.day}</dt><dd className="text-[var(--practice-muted)]">{item.hours}{item.note ? <span className="block text-xs">{item.note}</span> : null}</dd></div>)}</dl>
        </div>
        <div id="contact" className="scroll-mt-6">
          <div className="flex items-center gap-2 text-[var(--practice-primary)]"><MapPin className="h-5 w-5" aria-hidden /><h2 className="text-2xl font-bold tracking-[-0.025em]">Find and contact us</h2></div>
          <address className="mt-5 not-italic text-base leading-7 text-[var(--practice-muted)]">{workspace.contact.address}<br />{workspace.contact.postcode}</address>
          <a href={workspace.contact.phoneHref} className="mt-4 inline-flex min-h-11 items-center gap-2 text-lg font-bold text-[var(--practice-primary)] underline underline-offset-4"><Phone className="h-5 w-5" aria-hidden />{workspace.contact.phone}</a>
          <p className="mt-5 text-sm leading-6 text-[var(--practice-muted)]">{workspace.contact.directions}</p>
          <div className="mt-5 rounded-xl bg-[var(--practice-surface)] p-4"><p className="flex gap-3 text-sm leading-6 text-[var(--practice-muted)]"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--practice-primary)]" aria-hidden />{workspace.contact.accessibility}</p></div>
        </div>
      </section>

      {team.length ? (
        <section className="border-y border-[var(--practice-line)] bg-white">
          <div className="mx-auto max-w-[1180px] px-4 py-12 sm:px-6"><div className="flex items-center gap-2 text-[var(--practice-primary)]"><Users className="h-5 w-5" aria-hidden /><h2 className="text-2xl font-bold tracking-[-0.025em]">Meet the practice team</h2></div><div className="mt-5 grid gap-x-10 gap-y-5 sm:grid-cols-2">{team.map((person) => <article key={person.id} className="border-t border-[var(--practice-line)] pt-4"><h3 className="font-bold">{person.name}</h3><p className="text-sm text-[var(--practice-muted)]">{person.role}</p>{person.biography ? <p className="mt-2 text-sm leading-6 text-[var(--practice-muted)]">{person.biography}</p> : null}</article>)}</div></div>
        </section>
      ) : null}
    </>
  );
}

function PracticeHero({ workspace }: { workspace: PracticeWorkspace }) {
  const actions = <div className="mt-7 flex flex-wrap gap-3"><a href={workspace.homepage.primaryAction.href} className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-[var(--practice-primary)] px-5 text-base font-bold text-white hover:bg-[var(--practice-primary-dark)]">{workspace.homepage.primaryAction.label} <ArrowRight className="h-4 w-4" aria-hidden /></a><a href={workspace.homepage.secondaryAction.href} className="inline-flex min-h-12 items-center rounded-xl border-2 border-[var(--practice-primary)] bg-[var(--practice-canvas)] px-5 text-base font-bold text-[var(--practice-primary)] hover:bg-[var(--practice-surface)]">{workspace.homepage.secondaryAction.label}</a></div>;
  if (workspace.presentation === "digital") {
    return <section className="bg-[var(--practice-primary)] text-white"><div className="mx-auto grid max-w-[1180px] gap-8 px-4 py-9 sm:px-6 sm:py-12 lg:grid-cols-[0.9fr_1.1fr] lg:py-16"><div className="self-center"><p className="text-sm font-bold text-white/75">{workspace.homepage.eyebrow}</p><h1 className="mt-3 text-[clamp(2.2rem,5vw,4rem)] font-bold leading-[1.04] tracking-[-0.045em]">{workspace.homepage.heading}</h1><p className="mt-5 max-w-[56ch] text-lg leading-8 text-white/80">{workspace.homepage.introduction}</p><div className="mt-7 grid max-w-[520px] gap-3 sm:grid-cols-2"><a href={workspace.homepage.primaryAction.href} className="rounded-xl bg-white p-4 text-[var(--practice-primary)] hover:bg-[var(--practice-surface)]"><span className="block text-sm font-bold">Start online</span><span className="mt-1 block text-sm leading-5">Routine requests, on your time.</span></a><a href="#contact" className="rounded-xl border border-white/30 p-4 text-white hover:bg-white/10"><span className="block text-sm font-bold">Need to call?</span><span className="mt-1 block text-sm leading-5">Find our opening times and phone number.</span></a></div></div><Image src={workspace.brand.heroImage} alt={workspace.brand.heroImageAlt} width={920} height={640} priority className="aspect-[16/11] w-full rounded-2xl object-cover" /></div></section>;
  }
  if (workspace.presentation === "neighbourhood") {
    return <section className="bg-[var(--practice-surface)]"><div className="mx-auto max-w-[1180px] px-4 py-9 sm:px-6 sm:py-12 lg:py-16"><Image src={workspace.brand.heroImage} alt={workspace.brand.heroImageAlt} width={1200} height={540} priority className="h-[210px] w-full rounded-2xl object-cover sm:h-[320px]" /><div className="mx-auto -mt-10 max-w-[880px] rounded-2xl bg-[var(--practice-canvas)] px-5 py-7 shadow-[0_16px_38px_-26px_rgba(33,43,50,0.38)] sm:px-9 sm:py-9"><p className="text-sm font-bold text-[var(--practice-primary)]">{workspace.homepage.eyebrow}</p><h1 className="mt-3 text-[clamp(2.2rem,5vw,4rem)] font-bold leading-[1.04] tracking-[-0.045em] text-[var(--practice-ink)]">{workspace.homepage.heading}</h1><p className="mt-4 max-w-[62ch] text-lg leading-8 text-[var(--practice-muted)]">{workspace.homepage.introduction}</p>{actions}</div></div></section>;
  }
  return <section className="bg-[var(--practice-surface)]"><div className="mx-auto grid max-w-[1180px] items-center gap-8 px-4 py-9 sm:px-6 sm:py-12 lg:grid-cols-[minmax(0,1fr)_460px] lg:py-16"><div><p className="text-sm font-bold text-[var(--practice-primary)]">{workspace.homepage.eyebrow}</p><h1 className="mt-3 max-w-[760px] text-[clamp(2.2rem,5vw,4rem)] font-bold leading-[1.04] tracking-[-0.045em] text-[var(--practice-ink)]">{workspace.homepage.heading}</h1><p className="mt-5 max-w-[62ch] text-lg leading-8 text-[var(--practice-muted)]">{workspace.homepage.introduction}</p>{actions}</div><Image src={workspace.brand.heroImage} alt={workspace.brand.heroImageAlt} width={920} height={640} priority className="aspect-[4/3] w-full rounded-2xl object-cover shadow-[0_14px_36px_-22px_rgba(33,43,50,0.4)]" /></div></section>;
}

function InnerPage({ workspace, page }: { workspace: PracticeWorkspace; page: PracticePage }) {
  return (
    <>
      <div className="border-b border-[var(--practice-line)] bg-[var(--practice-surface)]">
        <div className="mx-auto max-w-[1180px] px-4 py-9 sm:px-6 sm:py-12"><p className="text-sm font-bold text-[var(--practice-primary)]">{workspace.shortName}</p><h1 className="mt-2 max-w-[800px] text-[clamp(2.2rem,5vw,3.6rem)] font-bold leading-[1.05] tracking-[-0.04em]">{page.title}</h1><p className="mt-4 max-w-[65ch] text-lg leading-8 text-[var(--practice-muted)]">{page.summary}</p></div>
      </div>
      <div className="mx-auto max-w-[1180px] px-4 py-10 sm:px-6 sm:py-14">
        <p className="max-w-[760px] text-sm text-[var(--practice-muted)]">Last reviewed {formatReviewDate(page.lastUpdated)}</p>
        <div className="mt-7 max-w-[760px] space-y-10">{page.sections.map((section) => <section key={section.id}><h2 className="text-2xl font-bold tracking-[-0.025em]">{section.heading}</h2><p className="mt-3 whitespace-pre-line text-base leading-7 text-[var(--practice-muted)]">{section.body}</p></section>)}</div>
        <aside className="mt-12 max-w-[760px] rounded-xl bg-[var(--practice-surface)] p-5"><h2 className="font-bold">Need more help?</h2><p className="mt-2 text-sm leading-6 text-[var(--practice-muted)]">Call the practice on <a href={workspace.contact.phoneHref} className="font-bold text-[var(--practice-primary)] underline">{workspace.contact.phone}</a>. For urgent help when we are closed, use <a href="https://111.nhs.uk/" className="font-bold text-[var(--practice-primary)] underline">NHS 111</a>.</p></aside>
      </div>
    </>
  );
}

function UrgentHelp() {
  return <section className="border-b border-[var(--practice-warning-line)] bg-[var(--practice-warning-soft)]" aria-label="Urgent medical help">
    <div className="mx-auto grid max-w-[1180px] gap-2 px-4 py-3 text-sm leading-6 sm:px-6 md:grid-cols-[auto_1fr_auto] md:items-center md:gap-4">
      <span className="inline-flex items-center gap-2 font-bold text-[var(--practice-warning)]"><AlertTriangle className="h-5 w-5" aria-hidden /> Need urgent medical help?</span>
      <p className="text-[var(--practice-muted)]">Use <a href="https://111.nhs.uk/" className="font-bold text-[var(--practice-primary)] underline underline-offset-2">NHS 111 online</a> or call 111. For a life-threatening emergency, call 999.</p>
      <a href="https://111.nhs.uk/" className="inline-flex min-h-11 items-center font-bold text-[var(--practice-primary)] underline underline-offset-2">Get urgent help <ExternalLink className="ml-1 h-4 w-4" aria-hidden /></a>
    </div>
  </section>;
}

function practicePageHref(workspace: PracticeWorkspace, slug: string) {
  return workspace.pages.some((page) => page.slug === slug && page.status === "published")
    ? `/practice/${workspace.slug}/${slug}`
    : `/practice/${workspace.slug}`;
}

function formatReviewDate(value: string) {
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" }).format(new Date(value));
}

function ActionCard({ icon: Icon, title, copy, href, external = false }: { icon: typeof CalendarDays; title: string; copy: string; href: string; external?: boolean }) {
  return <a href={href} {...(external ? { target: "_blank", rel: "noreferrer" } : {})} className="group flex min-h-36 flex-col rounded-xl border border-[var(--practice-line)] bg-white p-5 shadow-[0_2px_0_var(--practice-line)] hover:border-[var(--practice-primary)]"><Icon className="h-6 w-6 text-[var(--practice-primary)]" aria-hidden /><h3 className="mt-4 text-lg font-bold text-[var(--practice-primary)] group-hover:underline">{title}</h3><p className="mt-1 text-sm leading-6 text-[var(--practice-muted)]">{copy}</p>{external ? <ExternalLink className="mt-auto h-4 w-4 self-end text-[var(--practice-primary)]" aria-hidden /> : <ArrowRight className="mt-auto h-4 w-4 self-end text-[var(--practice-primary)]" aria-hidden />}</a>;
}
