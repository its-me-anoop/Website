import Link from "next/link";
import { packages, packagesFaq } from "@/lib/marketing/content";
import { Compare } from "../home/Compare";
import { CtaBand } from "../layout/CtaBand";
import { PageHero } from "../layout/PageHero";
import { Shell } from "../layout/Shell";
import { FaqList } from "../ui/Bits";
import { PackageCard } from "../ui/PackageCard";
import { Container, SectionHead } from "../ui/Type";

/**
 * Packages: the three price plates straight under the hero, then the
 * anti-template table and the questions people ask before a quote.
 */
export function PackagesPage() {
  return (
    <Shell>
      <PageHero
        kicker="Packages and prices"
        title={
          <>
            Clear packages. <mark className="wf-mark">Prices on the page.</mark>
          </>
        }
        copy={
          <p>
            Essentials is a one-off build with the first year of hosting included. Standard adds a monthly care plan.
            Partnership is for organisations that want a digital partner, quoted after a short call. All prices exclude
            VAT.
          </p>
        }
      />

      <section className="py-16 sm:py-20">
        <Container>
          <ul className="grid items-stretch gap-5 md:grid-cols-2 xl:grid-cols-3">
            {packages.map((pkg, i) => (
              <PackageCard key={pkg.name} pkg={pkg} index={i} headingLevel="h2" />
            ))}
          </ul>
          <p className="mx-auto mt-10 max-w-[64ch] text-center text-[17px] leading-[1.6] text-wf-ink-soft">
            Not sure which fits? Start with the{" "}
            <Link href="/free-audit" className="wf-link font-bold text-wf-ink">
              free website audit
            </Link>
            . It ends with a recommendation either way, including &ldquo;keep what you have&rdquo; when that is the
            honest answer.
          </p>
        </Container>
      </section>

      <Compare className="border-t-2 border-wf-ink bg-wf-paper-2 py-20 sm:py-28" />

      <section className="border-t-2 border-wf-ink py-20 sm:py-28">
        <Container className="grid gap-10 lg:grid-cols-[minmax(0,380px)_1fr] lg:gap-20">
          <SectionHead kicker="Questions" title="Before you get in touch." size="md" />
          <FaqList items={packagesFaq} />
        </Container>
      </section>

      <CtaBand
        title={
          <>
            Tell Flutterly what you <mark className="wf-mark">need.</mark>
          </>
        }
        copy="A short call or an email is enough to scope most projects, and every conversation ends with a clear, written next step."
        id="contact"
      />
    </Shell>
  );
}
