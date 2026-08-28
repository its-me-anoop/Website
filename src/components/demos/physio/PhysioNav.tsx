"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "./links";

/**
 * Primary nav for the physio demo. The one client component in the
 * demo: it exists solely to mark the current page (aria-current +
 * underline), and server-renders identically for the no-JS experience.
 */
export function PhysioNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary" className="border-t border-white/10 bg-[var(--dpy-slate)]">
      <ul className="mx-auto flex w-full max-w-[1180px] flex-wrap px-4 sm:px-6">
        {navLinks.map((link) => {
          const active =
            link.href === "/demo/physio-clinic"
              ? pathname === link.href
              : pathname?.startsWith(link.href);
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`block px-3.5 py-3 text-[14.5px] font-semibold text-[var(--dpy-slate-ink)] transition-colors hover:text-white ${
                  active ? "shadow-[inset_0_-3px_0_var(--dpy-coral)] text-white" : ""
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
