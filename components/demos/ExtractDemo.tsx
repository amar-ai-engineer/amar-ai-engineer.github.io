"use client";

import { useState } from "react";

const FIELDS = [
  { k: "Vendor", v: "Acme Print Co." },
  { k: "Invoice #", v: "INV-4821" },
  { k: "Date", v: "14 Jan 2026" },
  { k: "Subtotal", v: "€1,240.00" },
  { k: "VAT (21%)", v: "€260.40" },
  { k: "Total due", v: "€1,500.40" },
];

/** DocuMind mini-demo: a mock invoice → click Extract → structured fields reveal. */
export default function ExtractDemo() {
  const [state, setState] = useState<"idle" | "running" | "done">("idle");
  const run = () => {
    if (state === "running") return;
    setState("running");
    setTimeout(() => setState("done"), 1300);
  };

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2">
        {/* mock invoice */}
        <div className="glass relative overflow-hidden p-5">
          {state === "running" && (
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-16 opacity-70"
              style={{
                background:
                  "linear-gradient(180deg, transparent, rgba(19,199,149,0.35), transparent)",
                animation: "scan 1.2s ease-in-out",
              }}
            />
          )}
          <div className="mono-label text-accent-deep">INVOICE</div>
          <div className="mt-3 text-lg font-semibold text-ink">
            Acme Print Co.
          </div>
          <div className="mt-1 font-mono text-xs text-ink-dim">
            INV-4821 · 14 Jan 2026
          </div>
          <div className="mt-4 space-y-1.5 font-mono text-xs text-ink-muted">
            <div className="flex justify-between">
              <span>Business cards ×500</span>
              <span>€420.00</span>
            </div>
            <div className="flex justify-between">
              <span>Brochures ×1000</span>
              <span>€820.00</span>
            </div>
            <div className="flex justify-between border-t border-line pt-1.5">
              <span>VAT 21%</span>
              <span>€260.40</span>
            </div>
            <div className="flex justify-between font-semibold text-ink">
              <span>Total</span>
              <span>€1,500.40</span>
            </div>
          </div>
        </div>

        {/* extracted fields */}
        <div className="glass p-5">
          <div className="flex items-center justify-between">
            <span className="mono-label">EXTRACTED DATA</span>
            {state === "done" && (
              <span className="mono-label text-accent-deep">96% ACCURACY</span>
            )}
          </div>

          {state === "idle" && (
            <p className="mt-6 text-sm text-ink-dim">
              Press <span className="text-accent-deep">Extract</span> to pull
              structured fields from the invoice — the way DocuMind does, 500+ a
              day.
            </p>
          )}

          {state !== "idle" && (
            <div className="mt-4 space-y-2">
              {FIELDS.map((f, i) => (
                <div
                  key={f.k}
                  className="flex items-center justify-between border-b border-line pb-1.5 font-mono text-xs transition-all duration-500"
                  style={{
                    opacity: state === "done" ? 1 : 0,
                    transform:
                      state === "done" ? "translateY(0)" : "translateY(6px)",
                    transitionDelay: `${i * 90}ms`,
                  }}
                >
                  <span className="text-ink-dim">{f.k}</span>
                  <span className="font-semibold text-ink">{f.v}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={run}
        data-cursor="hover"
        style={{ color: "var(--btn-ink)" }}
        className="btn-primary glass-pill mt-4 px-5 py-2.5 font-mono text-xs"
      >
        {state === "idle"
          ? "Extract →"
          : state === "running"
            ? "Reading…"
            : "Run again ↻"}
      </button>

      <style>{`@keyframes scan { from { transform: translateY(-4rem) } to { transform: translateY(16rem) } }`}</style>
    </div>
  );
}
