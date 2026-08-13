import ViewShell from "@/components/ViewShell";
import { about } from "@/lib/data";

const BADGES = [
  { label: "OPEN SOURCE", color: "var(--accent)" },
  { label: "SHIPPED", color: "#6a5acd" },
  { label: "RELIABLE", color: "var(--gold)" },
  { label: "TRUSTED", color: "var(--alert)" },
];

/** About view — awards left, mascot center, bio + stats + manifesto right. */
export default function About() {
  return (
    <ViewShell
      index="04"
      label="ABOUT"
      header={
        <>
          The person behind the models — turning messy problems into tools
          people actually{" "}
          <strong className="text-gradient font-semibold">use</strong>.
        </>
      }
    >
      <div className="grid grid-cols-1 gap-8 lg:h-full lg:min-h-0 lg:grid-cols-[0.85fr_1.4fr] lg:gap-14">
        {/* badges */}
        <div className="hidden flex-wrap content-center gap-4 lg:flex">
          {BADGES.map((b) => (
            <div
              key={b.label}
              className="grid h-20 w-20 place-items-center rounded-full text-center text-white shadow-lg"
              style={{
                background: b.color,
                animation: "float-idle 6s ease-in-out infinite",
              }}
            >
              <span className="px-2 font-mono text-[8px] uppercase tracking-[0.18em] leading-tight">
                {b.label}
              </span>
            </div>
          ))}
        </div>

        {/* bio (scrolls internally only if very short screens) */}
        <div className="flex flex-col justify-center pr-1 lg:min-h-0 lg:overflow-y-auto">
          <h2 className="display text-4xl text-ink">{about.bioTitle}</h2>
          <div className="mono-label mt-2 text-accent">{about.bioRole}</div>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-muted">
            {about.bio}
          </p>

          <div className="mono-label mt-6">BY THE NUMBERS</div>
          <div className="mt-3 grid grid-cols-3 gap-3">
            {about.stats.map((s) => (
              <div key={s.label} className="glass p-4">
                <div className="text-2xl font-bold text-accent">{s.value}</div>
                <div className="mono-label mt-1">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="glass mt-4 p-5">
            <div className="mono-label mb-2">MANIFESTO</div>
            <p className="text-sm leading-relaxed text-ink">{about.manifesto}</p>
          </div>
        </div>
      </div>
    </ViewShell>
  );
}
