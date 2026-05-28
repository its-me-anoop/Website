"use client";

import Image from "next/image";
import Link from "next/link";
import { m } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import { site } from "@/lib/site";

const cols = [
  {
    heading: "Studio",
    links: [
      { href: "#services", label: "Services" },
      { href: "#work", label: "Work" },
      { href: "#practice", label: "Process" },
      { href: "#studio", label: "About" },
    ],
  },
  {
    heading: "Projects",
    links: [
      { href: "/projects/sipli", label: "Sipli" },
      { href: "/projects/artling", label: "Artling" },
      { href: "#work", label: "All projects" },
    ],
  },
  {
    heading: "Connect",
    links: [
      { href: `mailto:${site.email}`, label: "Email" },
      { href: site.social.github, label: "GitHub", external: true },
      { href: site.social.linkedin, label: "LinkedIn", external: true },
    ],
  },
];

export function Footer() {
  return (
    <footer
      className="relative overflow-hidden border-t border-line bg-obsidian"
      aria-label="Footer"
    >
      {/* Oversized wordmark watermark */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -bottom-6 select-none text-center font-display text-[22vw] font-semibold leading-none tracking-[-0.05em] text-white/[0.02] md:-bottom-10"
      >
        Flutterly
      </div>

      <div className="relative mx-auto w-full max-w-[1280px] px-[var(--gutter)] py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.5fr_repeat(3,1fr)] md:gap-10">
          {/* Brand */}
          <m.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xs"
          >
            <Link href="/" className="inline-flex items-center gap-2.5">
              <span className="grid h-7 w-7 place-items-center rounded-[9px] bg-signal">
                <Image
                  src="/flutterly-logo.png"
                  alt=""
                  width={18}
                  height={18}
                  className="h-4 w-4 object-contain brightness-0"
                />
              </span>
              <span className="font-display text-[16px] font-semibold tracking-tight text-ink">
                Flutterly
              </span>
            </Link>
            <p className="mt-4 text-[13.5px] leading-[1.6] text-ink-3">
              A UK product studio designing and engineering web and mobile apps.
              Built to last, shipped with care.
            </p>
            <div className="mt-5 flex items-center gap-2">
              <SocialButton href={`mailto:${site.email}`} label="Email">
                <Mail className="h-4 w-4" aria-hidden="true" />
              </SocialButton>
              <SocialButton href={site.social.github} label="GitHub" external>
                <Github className="h-4 w-4" aria-hidden="true" />
              </SocialButton>
              <SocialButton href={site.social.linkedin} label="LinkedIn" external>
                <Linkedin className="h-4 w-4" aria-hidden="true" />
              </SocialButton>
            </div>
          </m.div>

          {/* Link columns */}
          {cols.map((col, i) => (
            <m.div
              key={col.heading}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.08 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <h3 className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-muted">
                {col.heading}
              </h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      target={"external" in l && l.external ? "_blank" : undefined}
                      rel={"external" in l && l.external ? "noopener noreferrer" : undefined}
                      className="group inline-flex items-center gap-1.5 text-[13.5px] font-medium text-ink-3 transition-colors duration-300 hover:text-ink"
                    >
                      <span className="h-px w-2 bg-muted/50 transition-all duration-300 group-hover:w-4 group-hover:bg-signal" />
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </m.div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="mt-14 flex flex-col items-start gap-3 border-t border-line pt-6 md:flex-row md:items-center md:justify-between">
          <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted">
            © 2026 Flutterly Ltd · Reading, UK
          </span>
          <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted">
            Made by{" "}
            <span className="font-sans normal-case tracking-tight text-ink-3">
              Anoop Jose
            </span>
          </span>
        </div>
      </div>
    </footer>
  );
}

function SocialButton({
  href,
  label,
  external = false,
  children,
}: {
  href: string;
  label: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line bg-white/[0.03] text-ink-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-signal/40 hover:bg-signal/10 hover:text-ink"
    >
      {children}
    </Link>
  );
}
