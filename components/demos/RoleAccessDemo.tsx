"use client";

import { useState } from "react";

const ROLES = ["Finance", "HR", "Engineering"] as const;
type Role = (typeof ROLES)[number];

const QUESTION = "What was last quarter's revenue?";
const ANSWERS: Record<Role, { ok: boolean; text: string }> = {
  Finance: {
    ok: true,
    text: "€4.2M last quarter, up 18% on the quarter before.",
  },
  HR: {
    ok: false,
    text: "That's finance data — your HR role isn't cleared to see it.",
  },
  Engineering: {
    ok: false,
    text: "Restricted. Engineering can't access finance figures.",
  },
};

/** FinSolve mini-demo: switch role → the same question returns a different,
 *  access-checked answer. Shows security enforced at retrieval, not the prompt. */
export default function RoleAccessDemo() {
  const [role, setRole] = useState<Role>("Finance");
  const a = ANSWERS[role];

  return (
    <div className="glass p-5">
      <div className="mono-label">SIGNED IN AS</div>
      <div className="mt-2 flex flex-wrap gap-2">
        {ROLES.map((r) => {
          const active = role === r;
          return (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              data-cursor="hover"
              aria-pressed={active}
              style={active ? { color: "var(--btn-ink)" } : undefined}
              className={`glass-pill px-4 py-2 font-mono text-xs transition ${
                active
                  ? "btn-primary"
                  : "border border-line text-ink-muted hover:text-accent"
              }`}
            >
              {r}
            </button>
          );
        })}
      </div>

      <div className="mt-5 rounded-[12px] border border-line p-4">
        <div className="font-mono text-xs text-ink-dim">$ ask FinSolve</div>
        <div className="mt-1 text-sm text-ink">{QUESTION}</div>
        <div className="mt-3 flex items-start gap-2 text-sm">
          <span aria-hidden>{a.ok ? "✅" : "🔒"}</span>
          <span
            key={role}
            className={a.ok ? "text-ink" : "text-ink-muted"}
            style={{ animation: "fadein 0.3s ease" }}
          >
            {a.text}
          </span>
        </div>
      </div>

      <p className="mt-3 text-xs text-ink-dim">
        Access is checked before anything is retrieved — not just asked for in
        the prompt. Switch roles to see it enforced.
      </p>

      <style>{`@keyframes fadein { from { opacity: 0 } to { opacity: 1 } }`}</style>
    </div>
  );
}
