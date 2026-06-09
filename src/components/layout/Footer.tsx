"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import { site } from "@/lib/site";

const cols = [
  {
    heading: "Site",
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

/** Footer — quiet grey band with link columns and legal line. */
export function Footer() {
  return (
    <footer className="relative bg-canvas-2" aria-label="Footer">
      <div className="mx-auto w-full max-w-[1200px] px-[var(--gutter)] py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.5fr_repeat(3,1fr)] md:gap-10">
          {/* Identity */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xs"
          >
            <Link
              href="/"
              className="font-display text-[17px] font-semibold tracking-tight text-ink"
            >
              Anoop Jose
            </Link>
            <p className="mt-3 text-[14px] leading-[1.6] text-ink-3">
              Developer &amp; designer crafting web and mobile apps. Built to
              last, shipped with care — through Flutterly, my product studio.
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
          </motion.div>

          {/* Link columns */}
          {cols.map((col, i) => (
            <motion.div
              key={col.heading}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.08 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <h3 className="text-[12px] font-semibold uppercase tracking-[0.16em] text-muted">
                {col.heading}
              </h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      target={"external" in l && l.external ? "_blank" : undefined}
                      rel={"external" in l && l.external ? "noopener noreferrer" : undefined}
                      className="text-[14px] font-medium text-ink-3 transition-colors duration-300 hover:text-ink"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Legal row */}
        <div className="mt-14 flex flex-col items-start gap-3 border-t border-line pt-6 md:flex-row md:items-center md:justify-between">
          <span className="text-[12px] text-muted">
            © 2026 Flutterly Ltd · Reading, UK
          </span>
          <span className="text-[12px] text-muted">
            Designed &amp; built by <span className="text-ink-3">Anoop Jose</span>
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
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line bg-surface text-ink-3 shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:text-accent"
    >
      {children}
    </Link>
  );
}
