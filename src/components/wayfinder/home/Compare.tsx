import { Check, Minus } from "lucide-react";
import { comparison } from "@/lib/marketing/content";
import { Reveal } from "../motion/Reveal";
import { Container, SectionHead } from "../ui/Type";

/**
 * "Never a page builder", set out like a timetable board: a real
 * <table>, the Flutterly column on a yellow header plate. On phones the
 * rows stack so nothing scrolls sideways.
 */
export function Compare({ className }: { className?: string }) {
  return (
    <section className={className ?? "py-20 sm:py-28"}>
      <Container>
        <SectionHead
          kicker="Never a page builder"
          title="Built by hand, not assembled from a theme."
          copy="Most small-organisation websites sit on a page builder that someone has to keep patching. Flutterly builds a different way, and here is what that changes."
        />
        <Reveal className="mt-12">
          <table className="w-full border-collapse border-y-2 border-wf-ink text-left max-md:block">
            <caption className="sr-only">Comparison of typical template builders against a Flutterly build</caption>
            <thead className="max-md:hidden">
              <tr>
                <th scope="col" className="w-[20%] py-4 pr-6">
                  <span className="sr-only">Area</span>
                </th>
                <th scope="col" className="wf-label w-[40%] px-6 py-4 font-bold text-wf-ink-soft">
                  {comparison.them}
                </th>
                <th scope="col" className="w-[40%] bg-wf-sign px-6 py-4 text-[18px] font-extrabold">
                  {comparison.us}
                </th>
              </tr>
            </thead>
            <tbody className="max-md:block">
              {comparison.rows.map((row) => (
                <tr key={row.label} className="border-t-[1.5px] border-wf-line-2 max-md:block max-md:py-6">
                  <th
                    scope="row"
                    className="py-5 pr-6 align-top text-[18px] font-extrabold tracking-[-0.01em] max-md:block max-md:p-0"
                  >
                    {row.label}
                  </th>
                  <td className="px-6 py-5 align-top text-[16px] leading-[1.55] text-wf-ink-soft max-md:mt-3 max-md:block max-md:p-0">
                    <span className="flex items-start gap-3">
                      <Minus size={18} strokeWidth={3} aria-hidden className="mt-0.5 shrink-0 text-wf-fail" />
                      <span>
                        <span className="sr-only md:hidden">{comparison.them}: </span>
                        {row.them}
                      </span>
                    </span>
                  </td>
                  <td className="bg-wf-card px-6 py-5 align-top text-[16px] font-medium leading-[1.55] max-md:mt-3 max-md:block max-md:rounded-[8px] max-md:border-[1.5px] max-md:border-wf-line-2 max-md:p-4">
                    <span className="flex items-start gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-[1px] flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-[4px] bg-wf-ink text-wf-sign"
                      >
                        <Check size={14} strokeWidth={3.2} />
                      </span>
                      <span>
                        <span className="sr-only md:hidden">{comparison.us}: </span>
                        {row.us}
                      </span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </Container>
    </section>
  );
}
