"use client";

import { useState } from "react";

const VIDEO_ID = "L3K8nAgeybQ";

/**
 * Intro video: a click-to-play facade. Shows the YouTube thumbnail + play
 * button; only loads the (heavy) YouTube iframe when the visitor clicks it —
 * fast first paint, no autoplay until asked.
 */
export default function VideoIntro() {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="glass relative aspect-video w-full overflow-hidden rounded-[16px]">
      {playing ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1`}
          title="Amar Ismail — AI Engineer, intro"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          data-cursor="hover"
          aria-label="Play Amar's intro video"
          className="group absolute inset-0 block"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://i.ytimg.com/vi/${VIDEO_ID}/maxresdefault.jpg`}
            alt="Amar Ismail introducing himself"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <span className="absolute inset-0 bg-black/25 transition group-hover:bg-black/10" />
          <span
            className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full shadow-lg transition group-hover:scale-110"
            style={{ background: "var(--grad-primary)", color: "var(--btn-ink)" }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
          <span className="absolute bottom-3 left-3 rounded-full bg-black/45 px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest text-white/90 backdrop-blur">
            ▶ Watch my intro
          </span>
        </button>
      )}
    </div>
  );
}
