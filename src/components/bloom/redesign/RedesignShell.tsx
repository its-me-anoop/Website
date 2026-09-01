import { RedesignFooter } from "./RedesignFooter";
import { RedesignNav } from "./RedesignNav";
import styles from "./redesign-shell.module.css";

export function RedesignShell({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.root} data-flutterly-redesign>
      <RedesignNav />
      <div className={styles.pagePad}>
        <main id="main">{children}</main>
        <RedesignFooter />
      </div>
    </div>
  );
}
