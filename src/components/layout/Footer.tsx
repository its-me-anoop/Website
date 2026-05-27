"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

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
      { href: "mailto:anoop@flutterly.co.uk", label: "Email" },
      { href: "https://github.com/its-me-anoop", label: "GitHub", external: true },
      {
        href: "https://www.linkedin.com/in/anoop-jose-0b308a296/",
        label: "LinkedIn",
        external: true,
      },
    ],
  },
];

export function Footer() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <footer
      ref={ref}
      className="relative overflow-hidden border-t border-white/[0.06] bg-[#06070d]"
      aria-label="Footer"
    >
      {/* Soft bottom glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-16 h-32"
        style={{
          background:
            "linear-gradient(180deg, rgba(99,102,241,0.07) 0%, transparent 100%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1240px] px-5 py-16 md:px-7">
        <div className="grid gap-12 md:grid-cols-[1.4fr_repeat(3,1fr)] md:gap-10">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-xs"
          >
            <Link href="/" className="inline-flex items-center gap-2.5">
              <Image
                src="/flutterly-logo.png"
                alt=""
                width={22}
                height={22}
                className="h-5 w-5 object-contain invert brightness-0"
              />
              <span className="font-display text-[16px] font-semibold tracking-tight text-white">
                Flutterly
              </span>
            </Link>
            <p className="mt-4 text-[13.5px] leading-[1.6] text-ink-3">
              A UK product studio designing and engineering web and mobile apps.
              Built to last, shipped with care.
            </p>
            <div className="mt-5 flex items-center gap-2">
              <SocialButton
                href="mailto:anoop@flutterly.co.uk"
                label="Email"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
              </SocialButton>
              <SocialButton
                href="https://github.com/its-me-anoop"
                label="GitHub"
                external
              >
                <Github className="h-4 w-4" aria-hidden="true" />
              </SocialButton>
              <SocialButton
                href="https://www.linkedin.com/in/anoop-jose-0b308a296/"
                label="LinkedIn"
                external
              >
                <Linkedin className="h-4 w-4" aria-hidden="true" />
              </SocialButton>
            </div>
          </motion.div>

          {/* Cols */}
          {cols.map((col, i) => (
            <motion.div
              key={col.heading}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
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
                      className="group inline-flex items-center gap-1.5 text-[13.5px] font-medium tracking-tight text-ink-3 transition-colors duration-300 hover:text-white"
                    >
                      <span className="h-px w-2 bg-muted/40 transition-all duration-300 group-hover:w-4 group-hover:bg-brand" />
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 flex flex-col items-start gap-3 border-t border-white/[0.06] pt-6 md:flex-row md:items-center md:justify-between"
        >
          <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted">
            © 2026 Flutterly Ltd · Reading, UK
          </span>
          <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted">
            Made by{" "}
            <span className="font-sans tracking-tight text-ink-3 normal-case">
              Anoop Jose
            </span>
          </span>
        </motion.div>
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
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.06] bg-white/[0.03] text-ink-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/40 hover:bg-brand/10 hover:text-white"
    >
      {children}
    </Link>
  );
}
