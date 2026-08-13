"use client";

import ViewShell from "@/components/ViewShell";
import { contact, profile } from "@/lib/data";

const FIND_ME = [
  { label: "Book a call", sub: profile.call.replace("https://", ""), href: profile.call },
  { label: "Email", sub: profile.email, href: `mailto:${profile.email}` },
  { label: "LinkedIn", sub: profile.linkedin.replace("https://www.", ""), href: profile.linkedin },
  { label: "GitHub", sub: profile.github.replace("https://", ""), href: profile.github },
];

const ACTIONS = [
  { title: "Hire me", sub: "Full-time or contract role" },
  { title: "A project", sub: "Freelance — build or ship something" },
  { title: "Just say hi", sub: "Anything else on your mind" },
];

/** Contact view — find-me + profile cards left, message-Ami card right. */
export default function Contact() {
  return (
    <ViewShell
      index="05"
      label="CONTACT"
      header={
        <>
          {contact.headline}{" "}
          <strong className="text-band font-semibold text-ink">
            {contact.headlineAccent}
          </strong>
        </>
      }
    >
      <div className="grid grid-cols-1 gap-6 lg:h-full lg:min-h-0 lg:grid-cols-2 lg:gap-12 lg:overflow-visible">
        {/* find me + profile */}
        <div className="no-scrollbar space-y-3 lg:min-h-0 lg:overflow-y-auto lg:pr-1">
          <div className="glass p-5">
            <div className="mono-label mb-1">FIND ME</div>
            {FIND_ME.map((f) => (
              <a
                key={f.label}
                href={f.href}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                className="flex items-center justify-between border-b border-line py-2 last:border-0"
              >
                <span>
                  <span className="block text-sm font-semibold text-ink">
                    {f.label}
                  </span>
                  <span className="font-mono text-xs text-ink-dim">{f.sub}</span>
                </span>
                <span className="text-ink-dim">↗</span>
              </a>
            ))}
          </div>

          <div className="glass p-5">
            <div className="text-lg font-semibold text-ink">{profile.name}</div>
            <div className="mono-label mt-1">
              AI ENGINEER · {profile.location.toUpperCase()}
            </div>
            <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1.5">
              <span className="h-2 w-2 rounded-full bg-accent" />
              <span className="font-mono text-xs text-accent-deep">
                {contact.status}
              </span>
            </div>
            <div className="mono-label mb-1 mt-3">WHAT I&apos;M GOOD FOR</div>
            {contact.goodFor.map((g) => (
              <div key={g.code} className="flex gap-3 border-t border-line py-1.5">
                <span className="mono-label w-8 shrink-0 text-accent-deep">
                  {g.code}
                </span>
                <span className="text-sm text-ink-muted">{g.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* message ami */}
        <div className="glass h-fit self-center p-6">
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-accent/15 text-accent">
              ✦
            </span>
            <div>
              <div className="font-semibold text-ink">Message Ami</div>
              <div className="mono-label">AMAR&apos;S ASSISTANT · REPLIES FAST</div>
            </div>
          </div>
          <div className="mt-4 rounded-[12px] bg-ink/5 p-4 text-sm text-ink">
            You&apos;ve seen the work already — good context. What brings you here?
          </div>
          <div className="mt-4 space-y-3">
            {ACTIONS.map((a, i) => {
              const primary = i === 0;
              return (
                <a
                  key={a.title}
                  href={`mailto:${profile.email}?subject=${encodeURIComponent(a.title)}`}
                  data-cursor="hover"
                  className={`flex items-center justify-between rounded-[12px] p-4 transition ${
                    primary
                      ? "btn-primary"
                      : "border border-line hover:border-accent/40"
                  }`}
                >
                  <span>
                    <span
                      className="block font-semibold"
                      style={primary ? { color: "var(--btn-ink)" } : undefined}
                    >
                      {!primary ? (
                        <span className="text-ink">{a.title}</span>
                      ) : (
                        a.title
                      )}
                    </span>
                    <span
                      className="font-mono text-xs"
                      style={
                        primary
                          ? { color: "var(--btn-ink)", opacity: 0.78 }
                          : undefined
                      }
                    >
                      {!primary ? (
                        <span className="text-ink-dim">{a.sub}</span>
                      ) : (
                        a.sub
                      )}
                    </span>
                  </span>
                  <span
                    className={primary ? "" : "text-accent"}
                    style={primary ? { color: "var(--btn-ink)" } : undefined}
                  >
                    →
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </ViewShell>
  );
}
