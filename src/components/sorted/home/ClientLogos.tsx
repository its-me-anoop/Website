import type { CSSProperties } from "react";
import { clients, type Client } from "@/lib/marketing/clients";
import styles from "./HomeSections.module.css";

function ClientMark({ client }: { client: Client }) {
  if (!client.logo) return <span data-client-wordmark className={styles.wordmark}>{client.name}</span>;
  const { logo } = client;
  const mask = `url("${logo.src}") center / contain no-repeat`;
  const style: CSSProperties = { height: logo.displayHeight, aspectRatio: `${logo.width} / ${logo.height}`, WebkitMask: mask, mask };
  return (
    <>
      <span role="img" aria-label={client.name} data-client-logo={logo.src} className={styles.logo} style={style} />
      {logo.symbolOnly && <span aria-hidden className={styles.wordmark}>{client.name}</span>}
    </>
  );
}

export function ClientLogos() {
  return (
    <section id="clients" aria-labelledby="clients-title" className={styles.clients}>
      <div className={styles.wrap}>
        <h2 id="clients-title" className={styles.clientTitle}>A few of the businesses I work with</h2>
        <ul className={styles.clientList}>
          {clients.map((client) => (
            <li key={client.name}>
              {client.href ? (
                <a className={styles.clientMark} href={client.href} target="_blank" rel="noopener noreferrer"><ClientMark client={client} /></a>
              ) : (
                <span className={styles.clientMark}><ClientMark client={client} /></span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
