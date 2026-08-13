/**
 * Line-art isometric illustration for a project card thumbnail. Stroke uses
 * currentColor so the parent panel can tint it (dim by default, accent on
 * hover / when featured).
 */
export default function IsoThumb({ sector }: { sector: string }) {
  return (
    <svg
      width="96"
      height="96"
      viewBox="0 0 96 96"
      fill="none"
      aria-hidden
      className="text-current"
    >
      {/* isometric platform */}
      <path
        d="M48 26 L74 41 L48 56 L22 41 Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M22 41 L22 52 L48 67 L74 52 L74 41 M48 56 L48 67"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* rising object */}
      <path
        d="M48 40 L48 16 M48 16 L43 23 M48 16 L53 23"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="48" cy="40" r="2" fill="currentColor" />
      {/* sector nodes */}
      <circle cx="74" cy="41" r="1.6" fill="currentColor" opacity="0.6" />
      <circle cx="22" cy="41" r="1.6" fill="currentColor" opacity="0.6" />
      {sector === "HEALTHCARE" && (
        <path d="M40 44 h6 v-3 h4 v3 h6 M40 44 v4 h16 v-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      )}
    </svg>
  );
}
