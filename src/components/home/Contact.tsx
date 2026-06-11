import { ArrowUpRight, Clock, MapPin, Phone } from "lucide-react";
import { site } from "@/lib/site";
import { Reveal } from "./Reveal";
import { MagneticCta } from "./MagneticCta";

const DETAILS = [
  { icon: Phone, text: site.phoneDisplay, color: "text-mint" },
  { icon: MapPin, text: "READING, UK", color: "text-candy" },
  { icon: Clock, text: "REPLIES < 48H", color: "text-amber" },
];

export function Contact() {
  return (
    <section
      id="contact"
      className="relative z-[1] px-6 pb-[120px] pt-[170px] text-center md:px-12"
    >
      <div className="mx-auto max-w-[1320px]">
        <Reveal className="mb-6 font-jb text-[11px] uppercase tracking-[0.3em] text-mint">
          <span className="text-frost/40">07 /</span> Get in touch
        </Reveal>
        <Reveal delay={80}>
          <h2 className="m-0 font-syne text-[clamp(40px,9.4vw,148px)] font-extrabold uppercase leading-[.96] tracking-[-0.035em] text-frost">
            Let&rsquo;s build
            <br />
            <span className="bg-clip-text text-transparent [background-image:linear-gradient(110deg,#8B7CFF_5%,#3DF2C4_50%,#FF6FCB_95%)]">
              something.
            </span>
          </h2>
        </Reveal>
        <Reveal delay={160}>
          <p className="mx-auto mb-0 mt-8 max-w-[460px] text-[17px] leading-[1.65] text-frost/60">
            A handful of projects a year — write anyway. If it isn&rsquo;t a
            fit here, I&rsquo;ll point you somewhere good.
          </p>
        </Reveal>

        <Reveal kind="pop" delay={240} className="mt-[52px] flex justify-center">
          <MagneticCta>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-3.5 rounded-full bg-frost px-7 py-5 font-grotesk text-[clamp(17px,2.4vw,28px)] font-bold text-obsidian shadow-[0_0_50px_rgba(139,124,255,.35)] transition-shadow duration-300 hover:shadow-[0_0_70px_rgba(61,242,196,.55)] sm:px-[52px] sm:py-[26px]"
            >
              {site.email}
              <ArrowUpRight
                className="h-5 w-5 sm:h-6 sm:w-6"
                aria-hidden
              />
            </a>
          </MagneticCta>
        </Reveal>

        <Reveal delay={340} className="mt-16 flex flex-wrap justify-center gap-x-9 gap-y-4">
          {DETAILS.map(({ icon: Icon, text, color }) => (
            <span
              key={text}
              className="inline-flex items-center gap-2.5 font-jb text-xs tracking-[0.12em] text-frost/55"
            >
              <Icon size={14} className={color} aria-hidden />
              {text}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
