"use client";

import { useState } from "react";
import { askAmi } from "@/lib/terminal";

/** "Ask Ami" card on project detail pages — chips + input open the terminal. */
export default function ProjectAsk({ projectTitle }: { projectTitle: string }) {
  const [value, setValue] = useState("");
  const chips = [
    "What did he actually do here?",
    "What was the impact?",
    "What was the hardest part?",
  ];

  return (
    <div className="glass p-5">
      <div className="mono-label mb-2 flex items-center gap-2 text-accent">
        <span className="h-1.5 w-1.5 rounded-full bg-accent" /> ASK AMI
      </div>
      <p className="text-sm text-ink-muted">
        Curious about {projectTitle}
        {" or Amar's role on it? Ask away."}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {chips.map((c) => (
          <button
            key={c}
            type="button"
            data-cursor="hover"
            onClick={() => askAmi(`${c} (${projectTitle})`)}
            className="rounded-[8px] border border-line px-2.5 py-1.5 text-left font-mono text-[11px] text-ink-muted transition hover:border-accent/40 hover:text-accent"
          >
            {c}
          </button>
        ))}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (value.trim()) askAmi(value);
          setValue("");
        }}
        className="mt-3 flex items-center gap-2 rounded-[8px] border border-line px-3 py-2 font-mono text-xs text-ink-dim"
      >
        <span className="text-accent">$</span>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="ask anything…"
          aria-label={`Ask Ami about ${projectTitle}`}
          className="min-w-0 flex-1 bg-transparent text-ink outline-none placeholder:text-ink-dim"
        />
      </form>
    </div>
  );
}
