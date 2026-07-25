"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "./data";

/**
 * Primary nav for the GP demo. The one client component in the demo:
 * it exists solely to mark the current page (aria-current + underline),
 * and server-renders identically for the no-JS experience.
 */
export function GpNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Primary"
      className="border-t border-white/25 bg-[var(--dgp-blue-deep)]"
    >
      <ul className="mx-auto grid w-full max-w-[1100px] grid-cols-2 sm:flex sm:flex-wrap sm:px-4">
        {navLinks.map((link) => {
          const active =
            link.href === "/demo/gp-practice"
              ? pathname === link.href
              : pathname?.startsWith(link.href);
          /* Below `sm` this is a two-column grid, and the list has an
             odd number of links. `flex` on the cell plus `grow` on the
             anchor makes the link fill its cell: without it a cell whose
             label wrapped to two lines left ~25px at the bottom
             unclickable, with the current-page highlight painting only
             the top two-thirds. The last link spans both columns so the
             row of hairlines runs the full width instead of stopping
             dead in the middle of the page. */
          return (
            <li
              key={link.href}
              className="flex border-b border-white/15 last:col-span-2 sm:border-b-0 sm:last:col-span-1"
            >
              <Link
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`flex grow items-center px-4 py-3 text-base font-medium text-white hover:bg-white/10 hover:underline sm:px-3 ${
                  active
                    ? "bg-white/10 shadow-[inset_0_-4px_0_var(--dgp-yellow)]"
                    : ""
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
