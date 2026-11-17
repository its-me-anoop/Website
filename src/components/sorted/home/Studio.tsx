import Image from "next/image";
import { site } from "@/lib/site";
import styles from "./HomeSections.module.css";

export function Studio() {
  return (
    <section id="studio" aria-labelledby="studio-title" className={styles.studio}>
      <div className={styles.studioLayout}>
        <figure className={styles.studioPortrait}>
          <div className={styles.photo}>
            <Image src="/anoop-jose.jpg" alt={`${site.founder}, founder of Flutterly`} fill sizes="(min-width: 900px) 340px, (min-width: 600px) 35vw, 72vw" />
          </div>
          <figcaption><strong>{site.founder}</strong>Designer &amp; developer</figcaption>
        </figure>
        <div className={styles.studioCopy}>
          <p className={styles.label}>The studio</p>
          <h2 id="studio-title" className={styles.heading}>The person you brief is the person who <em>builds.</em></h2>
          <p className={styles.intro}>I’m Anoop, the designer and developer behind Flutterly. I work from Reading with care providers, independent businesses and people bringing their first app to life.</p>
          <p className={styles.studioNote}>You’ll speak to me when we sketch the idea, when you try the first version and when something needs a fix after launch.</p>
        </div>
      </div>
    </section>
  );
}
