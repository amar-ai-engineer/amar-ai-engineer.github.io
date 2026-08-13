"use client";

import { useState } from "react";
import { about, career, profile, projects } from "@/lib/data";
import { useFocusTrap } from "@/lib/useFocusTrap";

const CAPABILITIES = [
  "RAG & retrieval systems",
  "LLM apps & agents",
  "Computer vision",
  "Fine-tuning & evaluation",
  "Python · PyTorch · LangChain",
  "FastAPI · Docker · cloud",
];

/**
 * CV / resume modal — a mac-window styled overlay with a rotated rail, a top bar
 * (contact + section nav + light/dark toggle + Download CV), a big name hero,
 * and a scrollable minimal resume built from the site data.
 */
export default function CvModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [dark, setDark] = useState(false);
  const trapRef = useFocusTrap<HTMLDivElement>(open, onClose);
  if (!open) return null;

  const surface = dark ? "#0d1417" : "#f5f4f1";
  const ink = dark ? "#eafdff" : "rgba(13,20,23,0.96)";
  const dim = dark ? "rgba(234,252,255,0.5)" : "rgba(13,20,23,0.5)";
  const line = dark ? "rgba(255,255,255,0.12)" : "rgba(13,20,23,0.12)";

  return (
    <div
      className="fixed inset-0 z-[9000] grid place-items-center bg-black/40 p-4 backdrop-blur-md md:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Resume"
    >
      <div
        ref={trapRef}
        tabIndex={-1}
        data-surface={dark ? "dark" : "light"}
        onClick={(e) => e.stopPropagation()}
        className="flex h-[85vh] w-full max-w-5xl overflow-hidden rounded-[20px] shadow-2xl outline-none"
        style={{ background: surface, color: ink }}
      >
        {/* rail */}
        <div
          className="flex w-11 shrink-0 flex-col items-center justify-between border-r py-4"
          style={{ borderColor: line, background: dark ? "#0a0f12" : "#0d1417" }}
        >
          <div className="flex flex-col gap-2">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          </div>
          <div
            className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/40"
            style={{ writingMode: "vertical-rl" }}
          >
            LIVE_RESUME_NODE
          </div>
          <span className="h-2 w-2 rounded-full bg-[#28c840]" />
        </div>

        {/* content */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* top bar */}
          <div
            className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b px-6 py-3"
            style={{ borderColor: line }}
          >
            <div className="font-mono text-xs" style={{ color: dim }}>
              {profile.email}
            </div>
            <div className="hidden gap-5 font-mono text-xs md:flex" style={{ color: dim }}>
              <span>About</span>
              <span>Experience</span>
              <span>Capabilities</span>
              <span>Impact</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setDark((d) => !d)}
                data-cursor="hover"
                aria-label="Toggle dark mode"
                className="grid h-8 w-8 place-items-center rounded-full border"
                style={{ borderColor: line }}
              >
                {dark ? "☀" : "☾"}
              </button>
              <a
                href="/Amar-Ismail-CV.pdf"
                download
                data-cursor="hover"
                className="rounded-full bg-black px-4 py-2 text-xs font-semibold text-white"
              >
                Download CV ↓
              </a>
              <button
                type="button"
                onClick={onClose}
                data-cursor="hover"
                aria-label="Close"
                className="grid h-8 w-8 place-items-center rounded-full border"
                style={{ borderColor: line }}
              >
                ✕
              </button>
            </div>
          </div>

          {/* scroll area */}
          <div className="min-h-0 flex-1 overflow-y-auto px-8 py-10 md:px-14">
            {/* hero */}
            <div className="font-mono text-[11px] uppercase tracking-[0.3em]" style={{ color: dim }}>
              RESUME &apos;26
            </div>
            <h1 className="mt-6 text-5xl font-bold tracking-tight md:text-7xl">
              {profile.name}
              <span className="text-accent">.</span>
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-[0.2em]" style={{ color: dim }}>
              <span>AI Engineer</span>
              <span>—</span>
              <span>Healthcare / FinTech</span>
              <span>—</span>
              <span>{profile.yearsExperience} Years</span>
            </div>

            {/* about */}
            <Section title="About" line={line} dim={dim}>
              <p className="max-w-2xl leading-relaxed">{about.bio}</p>
            </Section>

            {/* experience */}
            <Section title="Experience" line={line} dim={dim}>
              <div className="space-y-5">
                {career.map((c, i) => (
                  <div key={i} className="flex flex-col gap-1 md:flex-row md:justify-between">
                    <div>
                      <div className="font-semibold">{c.company}</div>
                      <div className="text-sm" style={{ color: dim }}>{c.role}</div>
                    </div>
                    <div className="font-mono text-xs" style={{ color: dim }}>{c.period}</div>
                  </div>
                ))}
              </div>
            </Section>

            {/* capabilities */}
            <Section title="Capabilities" line={line} dim={dim}>
              <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                {CAPABILITIES.map((c) => (
                  <div key={c} className="rounded-lg border px-3 py-2 text-sm" style={{ borderColor: line }}>
                    {c}
                  </div>
                ))}
              </div>
            </Section>

            {/* impact */}
            <Section title="Selected impact" line={line} dim={dim}>
              <div className="space-y-3">
                {projects.map((p) => (
                  <div key={p.slug} className="flex items-baseline justify-between gap-4">
                    <span>
                      <span className="font-semibold">{p.title}</span>{" "}
                      <span className="text-sm" style={{ color: dim }}>— {p.blurb}</span>
                    </span>
                    {p.metric && (
                      <span className="shrink-0 font-mono text-sm text-accent">
                        {p.metric.value}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </Section>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
  line,
  dim,
}: {
  title: string;
  children: React.ReactNode;
  line: string;
  dim: string;
}) {
  return (
    <div className="mt-12 border-t pt-8" style={{ borderColor: line }}>
      <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.3em]" style={{ color: dim }}>
        {title}
      </div>
      {children}
    </div>
  );
}
