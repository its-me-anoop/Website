"use client";

import { useState } from "react";
import styles from "./home.module.css";

export type FaqItem = {
  q: string;
  a: string;
};

export function FaqAccordion({ items }: { items: readonly FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className={styles.faqList}>
      {items.map((item, index) => {
        const open = openIndex === index;
        const panelId = `faq-panel-${index}`;
        const buttonId = `faq-button-${index}`;

        return (
          <article key={item.q} className={styles.faqItem}>
            <button
              type="button"
              id={buttonId}
              className={styles.faqButton}
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpenIndex(open ? null : index)}
            >
              <span className={styles.faqIndex}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className={styles.faqQuestion}>{item.q}</span>
              <span className={styles.faqToggle} aria-hidden>
                {open ? "−" : "+"}
              </span>
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={`${styles.faqPanel} ${open ? styles.faqPanelOpen : ""}`}
              hidden={!open}
            >
              <p>{item.a}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
}
