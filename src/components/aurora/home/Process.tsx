import { rebrandProcess } from "@/lib/marketing/content";
import { Container } from "../ui/primitives";

/* Where each step's dot sits on the drawn line (percent across, px down). */
const dots = [
  [2, 84],
  [27, 36],
  [52, 74],
  [77, 31],
] as const;

/**
 * From first call to launch, and long after: an ember line that draws
 * itself as it scrolls in, a dot per step, and the four steps below.
 */
export function Process() {
  return (
    <section
      id="process"
      aria-labelledby="process-title"
      className="a-paper scroll-mt-24 bg-a-paper pb-[clamp(88px,10vw,152px)] text-a-paper-ink"
    >
      <Container className="flex flex-col gap-10">
        <div aria-hidden="true" className="mb-[clamp(40px,5vw,80px)] h-px bg-a-paper-line-2" />
        <h2
          id="process-title"
          className="fx-wt a-display max-w-[900px] text-[clamp(2.6rem,5.6vw,5.25rem)] leading-[0.95] text-a-ink"
          data-wf="H2 · Display 84 / 95"
        >
          From first call to <em>launch,</em> and long after.
        </h2>
        <div aria-hidden="true" className="relative hidden h-[120px] md:block">
          <svg
            className="fx-wipex absolute inset-0 h-full w-full overflow-visible"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path
              d="M0 70 L2 70 C14.5 70 14.5 30 27 30 C39.5 30 39.5 62 52 62 C64.5 62 64.5 26 77 26 C89.5 26 89.5 14 100 14"
              fill="none"
              stroke="var(--a-ember-deep)"
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          {dots.map(([left, top]) => (
            <div
              key={left}
              className="fx-rv absolute -ml-1.5 -mt-1.5 h-3 w-3 rounded-full bg-a-amber shadow-[0_0_0_4px_var(--a-paper),0_0_0_5px_var(--a-ember-deep)]"
              style={{ left: `${left}%`, top }}
            />
          ))}
        </div>
        <ol className="m-0 grid list-none gap-y-9 p-0 sm:grid-cols-2 lg:grid-cols-4">
          {rebrandProcess.map(([step, copy]) => (
            <li key={step} className="flex flex-col gap-2.5 pr-8">
              <h3 className="fx-wt a-display text-[28px] tracking-[-0.03em] text-a-ink">{step}</h3>
              <p className="fx-wp text-[16px] leading-[1.6] text-a-ink-soft">{copy}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
