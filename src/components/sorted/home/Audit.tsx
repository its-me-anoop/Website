import { ChevronDown } from "lucide-react";
import { auditChecks } from "@/lib/marketing/content";
import { AuditBar } from "../ui/primitives";
import styles from "./HomeSections.module.css";

export function Audit() {
  return (
    <section id="audit" aria-labelledby="audit-title" className={styles.audit}>
      <div className={styles.auditLayout}>
        <div>
          <p className={styles.label}>Free website audit</p>
          <h2 id="audit-title" className={styles.heading}>How’s your site doing?</h2>
        </div>
        <div className={styles.auditBody}>
          <p className={styles.intro}>Enter your web address for a report on how your site works for the people using it.</p>
          <AuditBar className={styles.auditForm} placeholder="yourbusiness.co.uk" hint="Free to run. No account needed." />
          <details className={styles.checks}>
            <summary>What does the audit check?<ChevronDown size={17} aria-hidden /></summary>
            <ul>{auditChecks.map((check) => <li key={check.title}>{check.title}</li>)}</ul>
          </details>
        </div>
      </div>
    </section>
  );
}
