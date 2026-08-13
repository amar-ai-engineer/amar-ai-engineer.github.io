import { ReactNode } from "react";
import SectionHeader from "./SectionHeader";

/**
 * Wraps a view so it fills exactly the viewport (no page scroll on desktop):
 * a compact header at top, then a flexible body area that owns the remaining
 * height. Dense children opt into their own internal scroll with min-h-0.
 */
export default function ViewShell({
  index,
  label,
  header,
  children,
}: {
  index: string;
  label: string;
  header: ReactNode;
  children: ReactNode;
}) {
  return (
    <section
      aria-labelledby={`view-${label.toLowerCase()}`}
      className="flex min-h-full flex-col px-6 pb-16 pt-24 md:h-full md:px-10 md:pb-14 md:pt-24"
    >
      <h1 id={`view-${label.toLowerCase()}`} className="sr-only">
        {label} — Amar Ismail
      </h1>
      <div className="shrink-0">
        <SectionHeader index={index} label={label}>
          {header}
        </SectionHeader>
      </div>
      <div className="mt-6 min-h-0 flex-1">{children}</div>
    </section>
  );
}
