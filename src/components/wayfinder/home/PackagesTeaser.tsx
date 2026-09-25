import { packages } from "@/lib/marketing/content";
import { ButtonLink } from "../ui/Button";
import { PackageCard } from "../ui/PackageCard";
import { Container, SectionHead } from "../ui/Type";

export function PackagesTeaser() {
  return (
    <section id="packages" className="scroll-mt-20 py-20 sm:py-28">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHead
            kicker="Packages"
            title={
              <>
                Three ways to work together. <mark className="wf-mark">Prices on the page.</mark>
              </>
            }
            copy="All prices exclude VAT. Partnership is scoped after a short call, with a written quote within two working days."
          />
          <ButtonLink href="/packages" tone="text" className="shrink-0 lg:mb-2">
            Compare the packages in detail
          </ButtonLink>
        </div>
        <ul className="mt-12 grid items-stretch gap-5 md:grid-cols-2 xl:grid-cols-3">
          {packages.map((pkg, i) => (
            <PackageCard key={pkg.name} pkg={pkg} index={i} />
          ))}
        </ul>
      </Container>
    </section>
  );
}
