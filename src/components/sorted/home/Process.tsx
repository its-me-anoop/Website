import { rebrandProcess } from "@/lib/marketing/content";
import styles from "./HomeSections.module.css";

export function Process() {
  return (
    <section id="process" aria-labelledby="process-title" className={styles.process}>
      <div className={styles.wrap}>
        <h2 className={styles.processTitle} id="process-title">How we’ll work together</h2>
        <ol className={styles.timeline}>
          {rebrandProcess.map(([step, copy], index) => (
            <li key={step}>
              <span className={styles.stepNumber} aria-hidden>{String(index + 1).padStart(2, "0")}</span>
              <h3>{step}</h3>
              <p>{copy}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
