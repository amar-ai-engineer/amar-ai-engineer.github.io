"use client";

import { useCallback, useEffect, useState } from "react";
import { nav } from "@/lib/data";
import { useView, type ViewKey } from "@/lib/view";
import { useFocusTrap } from "@/lib/useFocusTrap";
import ThemeToggle from "./ThemeToggle";

/**
 * Mobile-only navigation: a fixed top-right menu button that opens a full-screen
 * glass overlay with the view tabs plus Ask-Ami / CV actions. Hidden on md+,
 * where the NavPill takes over.
 */
export default function MobileNav({
  onOpenTerminal,
  onOpenCv,
}: {
  onOpenTerminal?: () => void;
  onOpenCv?: () => void;
}) {
  const { view, setView } = useView();
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const trapRef = useFocusTrap<HTMLDivElement>(open, close);

  // lock body scroll while the menu is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const go = (id: ViewKey) => {
    setView(id);
    setOpen(false);
  };

  return (
    <div className="md:hidden">
      {/* toggle button */}
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="glass fixed right-5 top-5 z-[60] grid h-11 w-11 place-items-center rounded-full"
      >
        <span className="relative block h-4 w-5">
          <span
            className={`absolute left-0 h-0.5 w-5 rounded-full bg-ink transition-all duration-300 ${
              open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0.5"
            }`}
          />
          <span
            className={`absolute left-0 top-1/2 h-0.5 w-5 -translate-y-1/2 rounded-full bg-ink transition-opacity duration-200 ${
              open ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`absolute left-0 h-0.5 w-5 rounded-full bg-ink transition-all duration-300 ${
              open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0.5"
            }`}
          />
        </span>
      </button>

      {/* full-screen overlay */}
      <div
        ref={trapRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        aria-hidden={!open}
        inert={!open}
        className={`fixed inset-0 z-50 flex flex-col bg-[var(--bg)]/95 outline-none backdrop-blur-xl transition-all duration-300 ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <nav className="mt-24 flex flex-1 flex-col gap-1 px-8">
          {nav.map((item, i) => {
            const id = item.href.replace("#", "") as ViewKey;
            const isActive = view === id;
            return (
              <button
                key={item.href}
                type="button"
                onClick={() => go(id)}
                aria-current={isActive ? "page" : undefined}
                className={`flex items-baseline gap-4 border-b border-line py-4 text-left transition ${
                  isActive ? "text-accent" : "text-ink"
                }`}
              >
                <span className="mono-label w-8 shrink-0 text-ink-dim">
                  0{i + 1}
                </span>
                <span className="display text-3xl">{item.label.toLowerCase()}</span>
              </button>
            );
          })}
        </nav>

        <div className="flex gap-3 px-8 pb-12">
          <ThemeToggle className="glass h-11 w-11 shrink-0" />
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              onOpenTerminal?.();
            }}
            className="glass glass-pill flex-1 px-5 py-3 font-mono text-xs text-ink"
          >
            ✦ Ask Ami
          </button>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              onOpenCv?.();
            }}
            className="glass glass-pill flex-1 px-5 py-3 font-mono text-xs text-ink"
          >
            ▤ View CV
          </button>
        </div>
      </div>
    </div>
  );
}
