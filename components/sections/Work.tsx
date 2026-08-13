import ViewShell from "@/components/ViewShell";
import ProjectCard from "@/components/ProjectCard";
import { career, projects } from "@/lib/data";

export default function Work() {
  return (
    <ViewShell
      index="02"
      label="WORK"
      header={
        <>
          3+ years of shipping AI that earns its keep, serving{" "}
          <strong className="text-gradient font-semibold">real users</strong>
          {" — where I've been, and what I built."}
        </>
      }
    >
      <div className="grid grid-cols-1 gap-8 lg:h-full lg:min-h-0 lg:grid-cols-[1fr_1.5fr] lg:gap-14">
        {/* left — career timeline */}
        <div className="flex flex-col lg:min-h-0">
          <div className="mb-5 flex shrink-0 items-center justify-between">
            <span className="mono-label">CAREER</span>
            <span className="mono-label">
              {String(career.length).padStart(2, "0")}
            </span>
          </div>
          <ol className="no-scrollbar relative border-l border-line pl-6 pr-1 lg:min-h-0 lg:flex-1 lg:overflow-y-auto">
            {career.map((c, i) => (
              <li key={i} className="relative mb-7 last:mb-0">
                <span
                  className={`absolute -left-[27px] top-1.5 h-2.5 w-2.5 rounded-full ${
                    c.current ? "bg-accent" : "bg-ink/20"
                  }`}
                />
                <div className="mono-label">{c.period}</div>
                <div
                  className={`mt-1 text-base ${
                    c.current ? "font-semibold text-ink" : "text-ink-muted"
                  }`}
                >
                  {c.company}
                </div>
                <div className="font-mono text-xs text-ink-dim">{c.role}</div>
              </li>
            ))}
          </ol>
        </div>

        {/* right — selected work (list scrolls internally on desktop) */}
        <div className="flex flex-col lg:min-h-0">
          <div className="mb-5 flex shrink-0 items-center justify-between">
            <span className="mono-label">SELECTED WORK</span>
            <span className="mono-label">
              {String(projects.length).padStart(2, "0")}
            </span>
          </div>
          <div className="no-scrollbar flex flex-col gap-4 pr-1.5 lg:min-h-0 lg:flex-1 lg:overflow-y-auto">
            {projects.map((p, i) => (
              <ProjectCard key={p.slug} project={p} active={i === 0} />
            ))}
          </div>
        </div>
      </div>
    </ViewShell>
  );
}
