"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "./data";

/**
 * Primary nav for the GP demo. The one client component in the demo:
 * it exists solely to mark the current page (aria-current + underline),
 * and server-renders identically for the no-JS experience.
 *
 * A single scrollable row on every viewport — no hamburger, no JS —
 * with the current page marked by a solid NHS-blue underline.
 */
export function GpNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Primary"
      className="border-y border-[var(--dgp-line)] bg-white"
    >
      <ul className="mx-auto flex w-full max-w-[1140px] items-stretch overflow-x-auto px-4 sm:px-6">
        {navLinks.map((link) => {
          const active =
            link.href === "/demo/gp-practice"
              ? pathname === link.href
              : pathname?.startsWith(link.href);
          return (
            <li key={link.href} className="shrink-0">
              <Link
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`block whitespace-nowrap px-3.5 py-3.5 text-base font-medium transition-colors sm:px-4 ${
                  active
                    ? "text-[var(--dgp-blue)] shadow-[inset_0_-3px_0_var(--dgp-blue)]"
                    : "text-[var(--dgp-ink)] hover:text-[var(--dgp-blue)] hover:shadow-[inset_0_-3px_0_var(--dgp-sky-line)]"
                }`}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
