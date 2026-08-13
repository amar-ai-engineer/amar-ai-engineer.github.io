"use client";

import { useRef } from "react";

/**
 * 2D→3D mini-demo: a layered scene whose planes shift by different amounts as
 * the cursor moves, giving a real sense of depth — the same illusion the
 * pipeline creates for every frame of flat video. Auto-sways when idle so it
 * still reads on touch devices.
 */
export default function DepthHoverDemo() {
  const frame = useRef<HTMLDivElement>(null);
  const layers = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = frame.current;
    const group = layers.current;
    if (!el || !group) return;
    const r = el.getBoundingClientRect();
    const nx = ((e.clientX - r.left) / r.width - 0.5) * 2; // -1..1
    const ny = ((e.clientY - r.top) / r.height - 0.5) * 2;
    group.style.animation = "none";
    for (const child of Array.from(group.children)) {
      const layer = child as HTMLElement;
      const d = Number(layer.dataset.depth || 0);
      layer.style.transform = `translate3d(${-nx * d}px, ${-ny * d * 0.6}px, 0)`;
    }
  };

  const reset = () => {
    const group = layers.current;
    if (!group) return;
    for (const child of Array.from(group.children)) {
      (child as HTMLElement).style.transform = "";
    }
    group.style.animation = ""; // resume idle sway
  };

  return (
    <div>
      <div
        ref={frame}
        onMouseMove={onMove}
        onMouseLeave={reset}
        className="relative aspect-video w-full overflow-hidden rounded-[14px] border border-line"
        style={{ perspective: "900px", background: "#0a1a1e" }}
      >
        <div
          ref={layers}
          className="absolute inset-[-8%]"
          style={{ animation: "depth-sway 7s ease-in-out infinite" }}
        >
          {/* sky */}
          <div
            data-depth="4"
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, #0b2a30 0%, #114b47 55%, #1c6f5f 100%)",
            }}
          />
          {/* sun / glow */}
          <div
            data-depth="10"
            className="absolute left-1/2 top-[26%] h-24 w-24 -translate-x-1/2 rounded-full"
            style={{
              background:
                "radial-gradient(circle, #b7f7e4 0%, #4fe9b4 45%, transparent 72%)",
              filter: "blur(2px)",
            }}
          />
          {/* far mountains */}
          <svg
            data-depth="18"
            viewBox="0 0 100 40"
            preserveAspectRatio="none"
            className="absolute bottom-[30%] left-0 w-full"
            style={{ height: "45%" }}
          >
            <path d="M0 40 L18 14 L34 32 L52 8 L70 30 L86 16 L100 34 L100 40 Z" fill="#12564f" />
          </svg>
          {/* near hills */}
          <svg
            data-depth="30"
            viewBox="0 0 100 30"
            preserveAspectRatio="none"
            className="absolute bottom-[14%] left-0 w-full"
            style={{ height: "40%" }}
          >
            <path d="M0 30 L20 12 L40 24 L60 10 L80 22 L100 12 L100 30 Z" fill="#0c3d3a" />
          </svg>
          {/* foreground ridge */}
          <svg
            data-depth="48"
            viewBox="0 0 100 20"
            preserveAspectRatio="none"
            className="absolute bottom-0 left-0 w-full"
            style={{ height: "34%" }}
          >
            <path d="M0 20 L0 8 L26 2 L54 12 L80 3 L100 10 L100 20 Z" fill="#061f1d" />
          </svg>
          {/* foreground accent (nearest, moves most) */}
          <div
            data-depth="62"
            className="absolute bottom-[10%] left-[16%] h-16 w-1.5 rounded-full"
            style={{ background: "#052018" }}
          />
          <div
            data-depth="62"
            className="absolute bottom-[22%] left-[16%] h-8 w-8 -translate-x-1/2 rounded-full"
            style={{ background: "#08281f" }}
          />
        </div>

        {/* frame + labels */}
        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
        <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-black/40 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-white/80">
          2D → 3D
        </span>
        <span className="pointer-events-none absolute bottom-3 right-3 hidden rounded-full bg-black/40 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-white/70 md:block">
          🖱 move to feel depth
        </span>
      </div>

      <p className="mt-3 text-xs text-ink-dim">
        Move your mouse across the scene — each layer sits at a different depth.
        The pipeline builds that depth for every frame of a flat video, then
        streams it to a headset in true 3D.
      </p>

      <style>{`
        @keyframes depth-sway {
          0%, 100% { transform: translate3d(-6px, 0, 0) }
          50% { transform: translate3d(6px, -3px, 0) }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="depth-sway"] { animation: none !important }
        }
      `}</style>
    </div>
  );
}
