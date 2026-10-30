import { AuditBar, Container } from "../ui/primitives";
import { BriefBuilder } from "./BriefBuilder";

/**
 * The close: a glow that follows the pointer, one question, and a
 * three-tap brief builder that books the call (or drafts the email)
 * with the visitor's brief attached. The free website audit sits
 * beneath for anyone who would rather start with a report.
 */
export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      data-fx-glow
      className="fx-glow relative scroll-mt-24 overflow-hidden border-t border-a-line py-[clamp(100px,12vw,180px)]"
    >
      <Container className="flex flex-col gap-11">
        <h2
          id="contact-title"
          className="fx-wt a-display max-w-[1100px] text-[clamp(3.25rem,8.4vw,8.25rem)] leading-[0.9]"
          data-wf="H2 · Display 132 / 90"
        >
          Got something that needs <em>sorting?</em>
        </h2>
        <BriefBuilder />
        <div id="audit" className="flex scroll-mt-28 flex-col gap-4 border-t border-a-line pt-10">
          <p className="max-w-[560px] text-[17px] leading-[1.6] text-a-ink-soft">
            Rather start with a report? Paste your website address for a free check of its accessibility, speed and
            search.
          </p>
          <AuditBar placeholder="yourbusiness.co.uk" />
        </div>
      </Container>
    </section>
  );
}
