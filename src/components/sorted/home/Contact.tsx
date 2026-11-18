import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { site } from "@/lib/site";
import { Floor, Porthole } from "../ui/Room";
import { Container } from "../ui/primitives";

/**
 * The close: one question on the vermilion wall beside a sun-yellow
 * porthole, the booking pill and the email address, and a cobalt
 * floor. The free audit has its own room above.
 */
export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="tone-flame relative isolate scroll-mt-20 overflow-hidden">
      <Porthole colour="var(--s-sun)" className="right-[-10%] top-[8%] w-[min(58vw,640px)]" />
      <Container className="flex flex-col gap-11 pb-[clamp(72px,9vw,136px)] pt-[clamp(96px,12vw,184px)]">
        <h2 id="contact-title" className="s-display max-w-[1100px] text-[clamp(3rem,9vw,8.6rem)] [--lh:0.9]">
          Got something that needs <em>sorting?</em>
        </h2>
        <div className="flex flex-wrap items-center gap-x-10 gap-y-6">
          <Link href="/book" data-dot="into" data-dot-pull="260" className="s-key group/btn h-16 px-8 text-[19px]">
            Book a {site.booking.durationMinutes}-minute call
            <ArrowRight size={20} strokeWidth={2.6} aria-hidden className="transition-transform duration-300 group-hover/btn:translate-x-1" />
          </Link>
          <a href={`mailto:${site.email}`} data-dot="top" data-dot-x="0.5" className="s-ul s-display text-[clamp(21px,2.6vw,36px)] text-s-ink">
            {site.email}
          </a>
        </div>
        <p className="max-w-[520px] border-t-[1.5px] border-s-ink pt-6 text-[17.5px] font-medium leading-[1.5] text-s-ink">
          A reply within one working day, from the person who will do the work.
        </p>
      </Container>
      <Floor colour="cobalt" />
    </section>
  );
}
