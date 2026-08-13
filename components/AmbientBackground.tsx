/**
 * Fixed ambient layer behind everything: drifting teal/cyan blobs + film grain
 * + a breathing vignette. Pure CSS, no JS. Sits at z-0, ignores pointer events.
 */
export default function AmbientBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* blobs */}
      <div
        className="absolute rounded-full blur-3xl"
        style={{
          top: "-10%",
          left: "-5%",
          width: "45vw",
          height: "45vw",
          background:
            "radial-gradient(circle at center, var(--blob-a), transparent 65%)",
          animation: "blob-drift-a 28s ease-in-out infinite",
        }}
      />
      <div
        className="absolute rounded-full blur-3xl"
        style={{
          top: "20%",
          right: "-10%",
          width: "50vw",
          height: "50vw",
          background:
            "radial-gradient(circle at center, var(--blob-b), transparent 65%)",
          animation: "blob-drift-b 34s ease-in-out infinite",
        }}
      />
      <div
        className="absolute rounded-full blur-3xl"
        style={{
          bottom: "-15%",
          left: "25%",
          width: "40vw",
          height: "40vw",
          background:
            "radial-gradient(circle at center, var(--blob-c), transparent 65%)",
          animation: "blob-drift-c 40s ease-in-out infinite",
        }}
      />

      {/* soft center bloom ties the composition together */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 42%, var(--blob-bloom), transparent 70%)",
        }}
      />

      {/* film grain */}
      <div
        className="absolute inset-[-50%]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
          opacity: 0.035,
          animation: "grain-shift 8s steps(6) infinite alternate",
        }}
      />

      {/* breathing vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 120% at 50% 40%, transparent 55%, rgba(40,60,90,0.10) 100%)",
          animation: "vignette-breathe 9s ease-in-out infinite",
        }}
      />
    </div>
  );
}
