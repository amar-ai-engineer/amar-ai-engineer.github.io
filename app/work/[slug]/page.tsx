import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { projects } from "@/lib/data";
import IsoThumb from "@/components/IsoThumb";
import ProjectAsk from "@/components/ProjectAsk";
import DepthHoverDemo from "@/components/demos/DepthHoverDemo";
import ExtractDemo from "@/components/demos/ExtractDemo";
import RoleAccessDemo from "@/components/demos/RoleAccessDemo";

// interactive "try it" demo per project (self-contained, no backend)
const DEMOS: Record<string, { label: string; node: ReactNode }> = {
  "video-3d-pipeline": { label: "TRY IT · FEEL THE DEPTH", node: <DepthHoverDemo /> },
  documind: { label: "TRY IT · EXTRACT AN INVOICE", node: <ExtractDemo /> },
  finsolve: { label: "TRY IT · ROLE-BASED ACCESS", node: <RoleAccessDemo /> },
};

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Not found" };
  return {
    title: `${project.title} — Amar Ismail`,
    description: project.blurb,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const idx = projects.findIndex((p) => p.slug === slug);
  if (idx === -1) notFound();
  const project = projects[idx];
  const next = projects[(idx + 1) % projects.length];

  return (
    <main className="relative min-h-screen px-6 py-8 md:px-10">
      {/* grid background */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-[5] opacity-[0.4]"
        style={{
          backgroundImage:
            "linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(120% 100% at 50% 0%, black 40%, transparent 100%)",
        }}
      />

      {/* top bar: back + pager */}
      <div className="flex items-center justify-between">
        <Link
          href="/#work"
          data-cursor="hover"
          className="glass glass-pill inline-flex items-center gap-2 px-4 py-2 font-mono text-xs text-ink"
        >
          ← back
        </Link>
        <div className="flex items-center gap-3">
          <Link
            href={`/work/${projects[(idx - 1 + projects.length) % projects.length].slug}`}
            data-cursor="hover"
            className="glass grid h-9 w-9 place-items-center rounded-full text-ink"
          >
            ←
          </Link>
          <span className="mono-label">
            {project.index} / {String(projects.length).padStart(2, "0")}
          </span>
          <Link
            href={`/work/${next.slug}`}
            data-cursor="hover"
            className="glass grid h-9 w-9 place-items-center rounded-full text-ink"
          >
            →
          </Link>
        </div>
      </div>

      {/* header */}
      <div className="mx-auto mt-10 max-w-6xl">
        <span className="glass glass-pill inline-flex items-center gap-2 px-3 py-1 font-mono text-[11px] text-accent">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" /> PROJ_
          {project.title.toUpperCase().replace(/\s/g, "_")}
        </span>
        <h1 className="display mt-4 text-5xl text-ink md:text-7xl">
          {project.title}
        </h1>
        <div className="mono-label mt-3">
          {project.role} · {project.timeline}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[1.5fr_1fr]">
          {/* left — hero + body */}
          <div>
            <div className="glass relative flex h-72 items-center justify-center overflow-hidden text-accent md:h-96">
              <div className="scale-[2.2]">
                <IsoThumb sector={project.sector} />
              </div>
              <span className="mono-label absolute bottom-4 left-4 rounded bg-white/60 px-3 py-1">
                CLICK TO EXPAND
              </span>
            </div>

            <p className="mt-8 text-xl leading-relaxed text-ink">
              {project.blurb}
            </p>

            {DEMOS[slug] && (
              <div className="mt-8">
                <div className="mono-label mb-3 flex items-center gap-2 text-accent-deep">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  {DEMOS[slug].label}
                </div>
                {DEMOS[slug].node}
              </div>
            )}

            <div className="mt-10 space-y-8">
              {project.sections.map((s) => (
                <div
                  key={s.kicker}
                  className="border-l-2 border-accent/40 pl-5"
                >
                  <div className="mono-label text-accent">{s.kicker}</div>
                  <p className="mt-2 leading-relaxed text-ink-muted">{s.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* right rail */}
          <aside className="space-y-5">
            <div className="glass p-5">
              <div className="mono-label mb-4">AT A GLANCE</div>
              <Row label="ROLE" value={project.role} />
              <Row label="TIMELINE" value={project.timeline} />
              {project.metric && (
                <Row
                  label={project.metric.label.toUpperCase()}
                  value={project.metric.value}
                  accent
                />
              )}
            </div>

            <div className="glass p-5">
              <div className="mono-label mb-3">STACK</div>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((t) => (
                  <span
                    key={t}
                    className="rounded-[4px] border border-line px-2.5 py-1 font-mono text-[11px] text-ink-muted"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {project.github ? (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                className="glass glass-pill flex items-center justify-between px-5 py-3 font-mono text-xs text-ink transition hover:text-accent"
              >
                <span>VIEW ON GITHUB</span>
                <span className="text-accent">↗</span>
              </a>
            ) : project.isPrivate ? (
              <div className="glass flex items-center gap-2 px-5 py-3 font-mono text-[11px] text-ink-dim">
                <span className="h-1.5 w-1.5 rounded-full bg-ink-dim" />
                PRIVATE CLIENT WORK — SHOWN IN GENERALIZED FORM
              </div>
            ) : null}

            <ProjectAsk projectTitle={project.title} />
          </aside>
        </div>

        {/* next */}
        <Link
          href={`/work/${next.slug}`}
          data-cursor="hover"
          className="mt-16 flex items-center justify-between border-t border-line pt-6"
        >
          <span className="mono-label">NEXT ARTIFACT</span>
          <span className="text-2xl font-semibold text-ink">
            {next.title} <span className="text-accent">→</span>
          </span>
        </Link>
      </div>
    </main>
  );
}

function Row({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="flex items-center justify-between border-b border-line py-2.5 last:border-0">
      <span className="mono-label">{label}</span>
      <span
        className={`text-sm font-medium ${accent ? "text-accent" : "text-ink"}`}
      >
        {value}
      </span>
    </div>
  );
}
