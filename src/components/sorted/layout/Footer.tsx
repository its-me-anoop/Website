"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/lib/site";
import { footerColumns } from "@/lib/marketing/content";
import { StudioMark } from "./StudioMark";

export function Footer({ credit }: { credit?: ReactNode } = {}) {
  const pathname = usePathname();

  return (
    <footer className="studio-footer">
      <div className="studio-footer-inner">
        <div className="studio-footer-intro">
          <div>
            <Link href="/" aria-label="Return to the Flutterly homepage" className="studio-brand"><StudioMark /></Link>
            <p>Independent digital studio<br />Reading, Berkshire, UK</p>
          </div>
          <div className="studio-footer-email">
            <span>New projects</span>
            <a href={`mailto:${site.email}`}>{site.email}<ArrowUpRight aria-hidden="true" /></a>
          </div>
        </div>
        <nav aria-label="Footer" className="studio-footer-links">
          {footerColumns.map(({ title, links }) => (
            <div key={title}>
              <h2>{title}</h2>
              <ul>
                {links.map(({ label, href }) => (
                  <li key={label}>
                    {href.startsWith("http") ? (
                      <a href={href} target="_blank" rel="noopener noreferrer">{label}<ArrowUpRight size={12} aria-hidden="true" /></a>
                    ) : (
                      <Link href={href} aria-current={pathname === href ? "page" : undefined}>{label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
        <div className="studio-footer-colophon">
          <p>© {new Date().getFullYear()} {site.legalName}</p>
          {credit && <p>{credit}</p>}
          <a href={`mailto:${site.supportEmail}`}>Client support <ArrowUpRight size={13} aria-hidden="true" /></a>
        </div>
      </div>
    </footer>
  );
}
