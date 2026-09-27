import { ticker } from "@/lib/marketing/content";
import { Marquee } from "../ui/Marquee";

const commitments = ticker.filter((_, i) => i % 2 === 1);
const names = ticker.filter((_, i) => i % 2 === 0);

/** Two opposing rows: who the studio has built for, and what every build promises. */
export function Ticker() {
  return (
    <section aria-label="Clients and commitments" className="relative border-y border-a-line bg-a-night/60 py-8">
      <Marquee
        items={names}
        label="Clients and products"
        duration={45}
        renderItem={(item) => (
          <span className="a-display flex items-center gap-10 px-5 text-[clamp(1.6rem,3.4vw,2.6rem)] text-a-ink/90">
            {item}
            <span aria-hidden className="text-[0.6em] text-a-amber">
              ✦
            </span>
          </span>
        )}
      />
      <Marquee
        items={commitments}
        label="Commitments on every build"
        duration={38}
        reverse
        className="mt-4"
        renderItem={(item) => (
          <span className="a-mono flex items-center gap-8 px-4 text-[13px] uppercase tracking-[0.14em] text-a-muted">
            {item}
            <span aria-hidden className="h-1 w-1 rounded-full bg-a-gold" />
          </span>
        )}
      />
    </section>
  );
}
