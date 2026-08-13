import Link from "next/link";
import IsoThumb from "./IsoThumb";
import type { Project } from "@/lib/data";

/**
 * A "selected work" card — large left thumbnail panel (grey halftone + line-art,
 * tinted when featured or hovered), index/sector + metric, title, blurb, tags.
 * The ↗ arrow reveals on hover, and the card lifts.
 */
export default function ProjectCard({
  project,
  active = false,
}: {
  project: Project;
  active?: boolean;
}) {
  return (
    <Link
      href={`/work/${project.slug}`}
      data-cursor="hover"
      className={`group flex items-stretch gap-4 p-3 transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(40,60,90,0.18)] ${
        active ? "glass-tinted" : "glass"
      }`}
    >
      {/* thumbnail panel */}
      <div
        className="relative w-40 shrink-0 overflow-hidden rounded-[10px]"
        style={{
          backgroundColor: "var(--thumb-bg)",
          backgroundImage:
            "radial-gradient(circle, var(--thumb-dot) 1px, transparent 1px)",
          backgroundSize: "7px 7px",
        }}
      >
        <div
          className={`absolute inset-0 transition-opacity duration-300 ${
            active ? "opacity-100" : "opacity-0"
          } group-hover:opacity-100`}
          style={{
            background:
              "linear-gradient(135deg, rgba(12,126,112,0.22), rgba(12,126,112,0.05))",
          }}
        />
        <div
          className={`relative grid h-full min-h-32 place-items-center transition-colors duration-300 ${
            active ? "text-accent" : "text-ink-dim"
          } group-hover:text-accent`}
        >
          <IsoThumb sector={project.sector} />
        </div>
      </div>

      {/* content */}
      <div className="flex min-w-0 flex-1 flex-col py-1 pr-1">
        <div className="flex items-start justify-between gap-2">
          <span className="mono-label">
            {project.index} · {project.sector}
          </span>
          <span className="flex items-center gap-2">
            {project.metric && (
              <span className="mono-label text-accent-deep">
                {project.metric.value}
              </span>
            )}
            <span className="text-ink-dim opacity-0 transition group-hover:opacity-100">
              ↗
            </span>
          </span>
        </div>

        <h3 className="mt-1.5 text-lg font-semibold text-ink">
          {project.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-ink-muted">
          {project.blurb}
        </p>

        <div className="mt-auto flex flex-wrap gap-1.5 pt-3">
          {project.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-ink-dim"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
