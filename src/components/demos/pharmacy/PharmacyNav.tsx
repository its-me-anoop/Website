"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "./links";

/**
 * Primary nav for the pharmacy demo. The one client component in the
 * demo: it exists solely to mark the current page (aria-current +
 * underline), and server-renders identically for the no-JS experience.
 */
export function PharmacyNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary" className="border-t border-white/20 bg-[var(--dph-green-deep)]">
      <ul className="mx-auto grid w-full max-w-[1100px] grid-cols-2 sm:flex sm:flex-wrap sm:px-4">
        {navLinks.map((link) => {
          const active =
            link.href === "/demo/pharmacy"
              ? pathname === link.href
              : pathname?.startsWith(link.href);
          return (
            <li key={link.href} className="border-b border-white/10 sm:border-b-0">
              <Link
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`block px-4 py-3 text-base font-medium text-white hover:bg-white/10 hover:underline sm:px-3 ${
                  active ? "bg-white/10 underline underline-offset-4" : ""
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
