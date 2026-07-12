"use client";

import styles from "./EditorialHome.module.css";

/**
 * Mobile-only containment rules for the editorial homepage.
 *
 * The page shell intentionally clips decorative artwork, so document-level
 * overflow checks cannot detect text or controls that extend beyond the
 * viewport. These rules keep every content-bearing element within the mobile
 * content column while preserving the oversized editorial treatment on wider
 * screens.
 */
export function EditorialResponsiveFixes() {
  return (
    <style>{`
      @media (max-width: 620px) {
        .${styles.header},
        .${styles.hero},
        .${styles.heroCopy},
        .${styles.heroCopy} > *,
        .${styles.heroPanel},
        .${styles.heroPanelTop},
        .${styles.heroActions},
        .${styles.projectBody},
        .${styles.secondaryBody},
        .${styles.serviceCard},
        .${styles.aboutCopy},
        .${styles.contactSection} {
          min-width: 0;
          max-width: 100%;
        }

        .${styles.heroCopy} {
          width: 100%;
          padding-top: 4rem;
        }

        .${styles.eyebrow} {
          width: 100%;
          max-width: 100%;
          font-size: 0.62rem;
          letter-spacing: 0.11em;
          line-height: 1.7;
          white-space: normal;
          overflow-wrap: anywhere;
        }

        .${styles.hero} h1 {
          width: 100%;
          max-width: 100%;
          font-size: clamp(2.9rem, 13.5vw, 4.6rem);
          letter-spacing: -0.065em;
          line-height: 0.9;
        }

        .${styles.hero} h1 span {
          max-width: 100%;
        }

        .${styles.heroIntro} {
          width: 100%;
          max-width: 100%;
          font-size: clamp(1.05rem, 4.8vw, 1.25rem);
          overflow-wrap: break-word;
        }

        .${styles.heroActions} {
          width: 100%;
          flex-direction: column;
          align-items: stretch;
          gap: 0.9rem;
        }

        .${styles.primaryButton},
        .${styles.textButton} {
          width: 100%;
          max-width: 100%;
          justify-content: space-between;
        }

        .${styles.textButton} {
          padding: 0.35rem 0.15rem;
          overflow-wrap: anywhere;
        }

        .${styles.primaryButton} svg,
        .${styles.textButton} svg {
          flex: 0 0 auto;
        }

        .${styles.heroPanelTop} {
          flex-wrap: wrap;
        }

        .${styles.heroOrbital} {
          width: min(78vw, 320px);
          max-width: 100%;
        }

        .${styles.sectionHeading} h2,
        .${styles.sectionHeadingLight} h2,
        .${styles.aboutCopy} h2,
        .${styles.contactSection} h2 {
          max-width: 100%;
          font-size: clamp(2.45rem, 11.5vw, 4rem);
          overflow-wrap: anywhere;
        }

        .${styles.projectMeta},
        .${styles.projectTags},
        .${styles.contactMeta} {
          max-width: 100%;
          flex-wrap: wrap;
        }
      }

      @media (max-width: 380px) {
        .${styles.hero} h1 {
          font-size: clamp(2.75rem, 12.8vw, 3.15rem);
        }

        .${styles.brand} {
          gap: 0.45rem;
        }

        .${styles.brand} span {
          font-size: 1rem;
        }
      }
    `}</style>
  );
}
