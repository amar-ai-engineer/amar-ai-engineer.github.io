"use client";

import { useView } from "@/lib/view";

/** Circular "award" badge — shown only on the home view (like fuch.ai). */
export default function AwardBadge() {
  const { view } = useView();
  if (view !== "home") return null;

  return (
    <div className="pointer-events-none fixed right-10 top-28 z-30 hidden lg:block">
      <div
        className="grid h-28 w-28 place-items-center rounded-full text-center shadow-[0_10px_30px_rgba(40,60,90,0.18)]"
        style={{
          background:
            "radial-gradient(circle at 35% 30%, var(--accent-warm), var(--accent))",
          animation: "float-idle 6s ease-in-out infinite",
        }}
      >
        <div style={{ color: "var(--btn-ink)" }}>
          <div className="font-mono text-[8px] uppercase tracking-[0.25em] opacity-80">
            Open to
          </div>
          <div className="text-[13px] font-bold leading-tight">FREELANCE</div>
          <div className="font-mono text-[8px] uppercase tracking-[0.25em] opacity-80">
            2026
          </div>
        </div>
      </div>
    </div>
  );
}
