import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { site } from "@/lib/site";
import { Container } from "../ui/primitives";

/**
 * The close: one question on flame, the booking key and the email
 * address. The free audit has its own section above.
 */
export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="tone-flame relative scroll-mt-20 overflow-hidden py-[clamp(88px,11vw,168px)]">
      <Container className="flex flex-col gap-11">
        <h2 id="contact-title" className="s-display max-w-[1100px] text-[clamp(2.9rem,8vw,7.6rem)] [--lh:0.92]">
          Got something that needs <em>sorting?</em>
        </h2>
        <div className="flex flex-wrap items-center gap-x-10 gap-y-6">
          <Link href="/book" className="s-key group/btn h-16 px-8 text-[19px] [--key-depth:7px]">
            Book a {site.booking.durationMinutes}-minute call
            <ArrowRight size={20} strokeWidth={2.6} aria-hidden className="transition-transform duration-300 group-hover/btn:translate-x-1" />
          </Link>
          <a href={`mailto:${site.email}`} className="s-ul s-display text-[clamp(21px,2.4vw,33px)] text-s-ink">
            {site.email}
          </a>
        </div>
        <p className="max-w-[520px] border-t-2 border-s-line-2 pt-6 text-[17px] leading-[1.55] text-s-ink-soft">
          A reply within one working day, from the person who will do the work.
        </p>
      </Container>
    </section>
  );
}
