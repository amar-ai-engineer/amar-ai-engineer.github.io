"use client";

/** Bottom-right ⌘K search pill. Opens the Ask-Ami terminal for now. */
export default function SearchPill({ onOpen }: { onOpen?: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      data-cursor="hover"
      aria-label="Search (Command K)"
      className="glass glass-pill fixed bottom-5 right-6 z-30 hidden items-center gap-2 px-4 py-2.5 md:flex"
    >
      <span className="mono-label" style={{ letterSpacing: "0.1em" }}>
        Search
      </span>
      <kbd className="rounded bg-ink/8 px-1.5 py-0.5 font-mono text-[10px] text-ink-muted">
        ⌘K
      </kbd>
    </button>
  );
}
