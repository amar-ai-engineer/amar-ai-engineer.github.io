import ViewShell from "@/components/ViewShell";
import { testimonials } from "@/lib/data";

/** Testimonials view (replaces fuch.ai's IDEA52). Features the real, verified
 * client recommendation as one large quote card. Add more to the array to grow. */
export default function Testimonials() {
  const featured = testimonials[0];

  return (
    <ViewShell
      index="03"
      label="TESTIMONIALS"
      header={
        <>
          Don&apos;t take my word for it — here&apos;s what the person who{" "}
          <strong className="text-gradient font-semibold">hired me</strong> had
          to say.
        </>
      }
    >
      <div className="grid place-items-center py-4 md:h-full md:min-h-0 md:py-0">
        <figure className="glass relative mx-auto max-w-3xl p-8 md:p-12">
          {/* quote mark */}
          <span
            aria-hidden
            className="display absolute -top-4 left-8 text-7xl text-accent/25 md:text-8xl"
          >
            &ldquo;
          </span>

          <div className="mb-4 flex gap-1 text-accent">
            {Array.from({ length: featured.rating }).map((_, s) => (
              <span key={s}>★</span>
            ))}
          </div>

          <blockquote className="text-lg leading-relaxed text-ink md:text-xl">
            {featured.quote}
          </blockquote>

          <figcaption className="mt-8 flex flex-wrap items-center gap-4 border-t border-line pt-6">
            {featured.avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={featured.avatar}
                alt={featured.name}
                className="h-12 w-12 shrink-0 rounded-full object-cover ring-2 ring-accent/30"
              />
            ) : (
              <span
                className="grid h-12 w-12 shrink-0 place-items-center rounded-full text-lg font-semibold text-white"
                style={{
                  background:
                    "radial-gradient(circle at 35% 30%, var(--accent-warm), var(--accent))",
                }}
              >
                {featured.name.charAt(0)}
              </span>
            )}
            <span className="min-w-0 flex-1">
              <span className="block text-base font-semibold text-ink">
                {featured.name}
              </span>
              <span className="block text-sm text-ink-muted">
                {featured.role}
              </span>
            </span>
          </figcaption>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            {featured.project && (
              <span className="mono-label rounded-full border border-line px-3 py-1">
                {featured.project}
              </span>
            )}
            {featured.verifiedUrl && (
              <a
                href={featured.verifiedUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                className="mono-label inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-accent-deep transition hover:bg-accent/20"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                VERIFIED ON LINKEDIN ↗
              </a>
            )}
          </div>
        </figure>
      </div>
    </ViewShell>
  );
}
