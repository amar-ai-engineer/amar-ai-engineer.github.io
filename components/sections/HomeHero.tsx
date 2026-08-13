"use client";

import VideoIntro from "@/components/VideoIntro";
import { homeChips, homeTypewriter } from "@/lib/data";
import { useTypewriter } from "@/lib/useTypewriter";
import { useView } from "@/lib/view";
import { askAmi } from "@/lib/terminal";

export default function HomeHero() {
  const typed = useTypewriter(homeTypewriter);
  const { setView } = useView();

  return (
    <div className="relative flex min-h-full items-center overflow-hidden px-6 py-24 md:px-10 md:py-0">
      <h1 className="sr-only">
        Amar Ismail — AI Engineer building AI that saves businesses time and
        money.
      </h1>

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
        {/* right (desktop) — intro video, lit by an accent bloom */}
        <div className="relative order-1 lg:order-2">
          <span aria-hidden className="glow-layer" />
          <VideoIntro />
          <div className="mono-label mt-3 text-accent-deep">
            ▶ MEET AMAR · A QUICK INTRO
          </div>
        </div>

        {/* left (desktop) — business intro + Ami line + CTA */}
        <div className="order-2 lg:order-1">
          <div className="mono-label mb-3 text-accent-deep">
            AI ENGINEER · HEALTHCARE / FINTECH / AUTOMATION
          </div>
          <h2 className="display text-4xl leading-[1.05] text-ink md:text-5xl">
            AI that saves businesses{" "}
            <span className="text-gradient">time &amp; money</span>.
          </h2>
          <p className="mt-4 max-w-md font-mono text-sm text-ink-muted md:text-base">
            {typed}
            <span className="caret ml-0.5">&nbsp;</span>
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {homeChips.map((c) => (
              <button
                key={c}
                type="button"
                data-cursor="hover"
                onClick={() => askAmi(c)}
                className="glass glass-pill px-4 py-2 font-mono text-xs text-ink-muted transition hover:text-accent"
              >
                <span className="text-accent-deep">›</span> {c}
              </button>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setView("contact")}
              data-cursor="hover"
              style={{ color: "var(--btn-ink)" }}
              className="btn-primary glass-pill px-5 py-2.5 font-mono text-xs"
            >
              Let&apos;s talk →
            </button>
            <button
              type="button"
              onClick={() => setView("work")}
              data-cursor="hover"
              className="glass glass-pill px-5 py-2.5 font-mono text-xs text-ink transition hover:text-accent"
            >
              See the work
            </button>
          </div>

          {/* testimonial pull-quote */}
          <button
            type="button"
            onClick={() => setView("testimonials")}
            data-cursor="hover"
            className="mt-7 block max-w-md border-l-2 border-accent/40 pl-4 text-left"
          >
            <p className="text-sm italic leading-snug text-ink-muted">
              &ldquo;I can definitely recommend working with Amar.&rdquo;
            </p>
            <span className="mono-label mt-1.5 block">
              PIETER VAN GROENEWOUD · TECH ENTREPRENEUR ↗
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
