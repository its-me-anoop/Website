import Link from "next/link";
import { site } from "@/lib/site";
import { footerColumns } from "@/lib/marketing/content";
import { SignArrow } from "../ui/Arrow";
import { BrandMark } from "../ui/Bits";

/**
 * The building directory at the bottom of every page: an ink board
 * with the studio's details, every route by column, and a plate that
 * sends you back to the top.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="wf-on-ink bg-wf-ink text-wf-on-ink">
      <div className="mx-auto w-full max-w-[1320px] px-4 pb-8 pt-16 sm:px-8 sm:pt-20">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <div>
            <BrandMark size="lg" />
            <p className="mt-6 max-w-[36ch] text-[17px] leading-[1.6] text-wf-on-ink-soft">
              An independent studio in {site.address.addressLocality}, {site.address.addressRegion}. Websites for GP
              practices, care homes and clinics, plus web and mobile products.
            </p>
            <dl className="mt-8 space-y-3 text-[16px]">
              {[
                { label: "New projects", email: site.email },
                { label: "Existing clients", email: site.supportEmail },
              ].map((row) => (
                <div key={row.email} className="flex flex-wrap gap-x-3">
                  <dt className="text-wf-on-ink-soft">{row.label}</dt>
                  <dd>
                    <a href={`mailto:${row.email}`} className="wf-link font-bold">
                      {row.email}
                    </a>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h2 className="wf-label border-b-2 border-wf-sign pb-2 text-wf-on-ink">{column.title}</h2>
                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => {
                    const external = link.href.startsWith("http");
                    const classes = "wf-link text-[15.5px] text-wf-on-ink-soft hover:text-wf-sign";
                    return (
                      <li key={link.label}>
                        {external ? (
                          <a href={link.href} target="_blank" rel="noopener noreferrer" className={classes}>
                            {link.label}
                            <span className="sr-only"> (opens in a new tab)</span>
                          </a>
                        ) : (
                          <Link href={link.href} className={classes}>
                            {link.label}
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-wf-on-ink-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <a
            href="#main"
            className="group inline-flex w-fit items-stretch overflow-hidden rounded-[6px] border-2 border-wf-sign text-[15px] font-bold"
          >
            <span className="flex items-center bg-wf-sign px-3 text-wf-ink">
              <SignArrow dir="up" size={18} className="transition-transform duration-300 group-hover:-translate-y-0.5" />
            </span>
            <span className="flex items-center px-4 py-2.5">Back to the top</span>
          </a>
          <div className="space-y-1 text-[14px] text-wf-on-ink-soft sm:text-right">
            <p>
              © {year} {site.legalName}. {site.address.addressLocality}, UK. Custom-coded, never a template.
            </p>
            <p>Set in Atkinson Hyperlegible, a typeface designed for readers with low vision.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
