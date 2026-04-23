export function Footer() {
  return (
    <footer className="bg-[var(--ink)] text-[var(--paper)]">
      <div className="mx-auto flex w-full max-w-[1240px] flex-col gap-3 border-t border-[rgba(245,239,228,0.1)] px-5 py-8 font-mono text-[10.5px] uppercase tracking-[0.22em] text-[rgba(245,239,228,0.45)] md:flex-row md:items-center md:justify-between md:px-7">
        <span>Flutterly Ltd · © 2026</span>
        <span>Signed, the studio — A. Jose</span>
      </div>
    </footer>
  );
}
