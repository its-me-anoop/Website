function Strip() {
  return (
    <span className="whitespace-nowrap pr-14 font-syne text-xl font-bold uppercase tracking-[0.12em] text-frost/85">
      Web apps <span className="text-iris">*</span> Native iOS{" "}
      <span className="text-mint">*</span> Flutter{" "}
      <span className="text-candy">*</span> Backend &amp; APIs{" "}
      <span className="text-amber">*</span> Design systems{" "}
      <span className="text-iris">*</span>
    </span>
  );
}

/** Full-width glass band under the hero with a looping services strip. */
export function MarqueeBand() {
  return (
    <div className="relative z-[1] mt-16 overflow-hidden border-y border-white/[.09] bg-[rgba(9,11,18,.35)] py-[22px] backdrop-blur-[10px]">
      <div className="flex w-max [animation:au-marquee_28s_linear_infinite]">
        <Strip />
        <span aria-hidden>
          <Strip />
        </span>
      </div>
    </div>
  );
}
