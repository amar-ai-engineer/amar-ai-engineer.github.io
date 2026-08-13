"use client";

import { nav } from "@/lib/data";
import { useView, type ViewKey } from "@/lib/view";
import ThemeToggle from "./ThemeToggle";

/**
 * Top-right floating glass nav pill. Two icon buttons (chat -> Ask-Ami terminal,
 * doc -> CV modal) + view tabs. Clicking a tab swaps the central view in place.
 */
export default function NavPill({
  onOpenTerminal,
  onOpenCv,
}: {
  onOpenTerminal?: () => void;
  onOpenCv?: () => void;
}) {
  const { view, setView } = useView();

  return (
    <nav
      aria-label="Primary"
      className="glass glass-pill fixed right-6 top-5 z-40 hidden items-center gap-1 px-2 py-2 md:flex"
    >
      <button
        type="button"
        aria-label="Ask Ami"
        onClick={onOpenTerminal}
        data-cursor="hover"
        className="grid h-9 w-9 place-items-center rounded-full text-ink-muted transition hover:bg-accent/10 hover:text-accent"
      >
        <ChatIcon />
      </button>
      <button
        type="button"
        aria-label="Open CV"
        onClick={onOpenCv}
        data-cursor="hover"
        className="grid h-9 w-9 place-items-center rounded-full text-ink-muted transition hover:bg-accent/10 hover:text-accent"
      >
        <DocIcon />
      </button>
      <ThemeToggle className="mr-1 h-9 w-9" />

      {nav.map((item) => {
        const id = item.href.replace("#", "") as ViewKey;
        const isActive = view === id;
        return (
          <button
            key={item.href}
            type="button"
            onClick={() => setView(id)}
            data-cursor="hover"
            aria-current={isActive ? "page" : undefined}
            style={isActive ? { color: "var(--btn-ink)" } : undefined}
            className={`mono-label rounded-full px-3.5 py-2 transition ${
              isActive ? "btn-primary" : "hover:text-ink"
            }`}
          >
            {item.label}
          </button>
        );
      })}
    </nav>
  );
}

function ChatIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v7A2.5 2.5 0 0 1 17.5 15H9l-4 4v-4H6.5A2.5 2.5 0 0 1 4 12.5v-7Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DocIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 3h8l4 4v14a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M14 3v4h4M8 12h8M8 16h5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
