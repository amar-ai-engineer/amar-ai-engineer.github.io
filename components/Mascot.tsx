"use client";

import { useEffect, useRef } from "react";

/**
 * "Ami" — the AI-guide mascot. v1 is a stylized SVG robot: glossy dark body,
 * cyan chest glow, idle float, head tilts toward the cursor, occasional blink.
 * Same API as the planned 3D version so it can be swapped for a GLB later.
 */
export default function Mascot({
  className = "",
  size = 340,
}: {
  className?: string;
  size?: number;
}) {
  const headRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2.6;
      const dx = (e.clientX - cx) / cx; // -1..1
      const dy = (e.clientY - cy) / cy;
      if (headRef.current) {
        headRef.current.style.transform = `translate(${dx * 6}px, ${dy * 4}px) rotate(${dx * 4}deg)`;
      }
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      className={className}
      style={{ width: size, animation: "float-idle 6s ease-in-out infinite" }}
    >
      <svg viewBox="0 0 240 320" width="100%" fill="none" role="img" aria-label="Ami, the AI guide">
        <defs>
          <linearGradient id="body" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#3a4046" />
            <stop offset="0.5" stopColor="#15181b" />
            <stop offset="1" stopColor="#05070a" />
          </linearGradient>
          <linearGradient id="gloss" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.55" />
            <stop offset="0.4" stopColor="#ffffff" stopOpacity="0.05" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="glow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#8fe9ff" />
            <stop offset="1" stopColor="#0e7e8e" stopOpacity="0.2" />
          </radialGradient>
        </defs>

        {/* soft ground shadow */}
        <ellipse cx="120" cy="306" rx="70" ry="10" fill="#28323a" opacity="0.18" />

        {/* legs */}
        <rect x="96" y="232" width="20" height="60" rx="9" fill="url(#body)" />
        <rect x="124" y="232" width="20" height="60" rx="9" fill="url(#body)" />
        <ellipse cx="104" cy="298" rx="18" ry="9" fill="url(#body)" />
        <ellipse cx="136" cy="298" rx="18" ry="9" fill="url(#body)" />

        {/* arms */}
        <rect x="52" y="150" width="18" height="70" rx="9" fill="url(#body)" />
        <rect x="170" y="150" width="18" height="70" rx="9" fill="url(#body)" />

        {/* torso */}
        <rect x="72" y="140" width="96" height="104" rx="26" fill="url(#body)" />
        <rect x="72" y="140" width="96" height="60" rx="26" fill="url(#gloss)" />
        {/* chest glow */}
        <path
          d="M108 178 h24 l-6 16 h-12 z"
          fill="url(#glow)"
          style={{ animation: "vignette-breathe 4s ease-in-out infinite" }}
        />

        {/* head */}
        <g ref={headRef} style={{ transition: "transform 0.25s ease-out", transformOrigin: "120px 90px" }}>
          <ellipse cx="120" cy="86" rx="62" ry="60" fill="url(#body)" />
          <ellipse cx="120" cy="70" rx="62" ry="40" fill="url(#gloss)" />
          {/* visor */}
          <ellipse cx="120" cy="92" rx="44" ry="34" fill="#05070a" />
          {/* eye ring */}
          <circle cx="103" cy="90" r="15" fill="#0b0e11" stroke="#8fe9ff" strokeOpacity="0.5" strokeWidth="2" />
          <circle cx="103" cy="90" r="6" fill="url(#glow)">
            <animate attributeName="ry" values="6;6;1;6" dur="4s" repeatCount="indefinite" />
          </circle>
          {/* accent streak */}
          <path d="M136 84 q10 6 4 18" stroke="#d8a657" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.85" />
        </g>
      </svg>
    </div>
  );
}
