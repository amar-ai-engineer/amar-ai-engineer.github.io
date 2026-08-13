import { ReactNode } from "react";

/** Shared section kicker + intro line: "02 / WORK  —  intro text". */
export default function SectionHeader({
  index,
  label,
  children,
}: {
  index: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-start md:gap-10">
      <div className="mono-label whitespace-nowrap pt-1 text-accent">
        {index} / {label}
      </div>
      <p className="max-w-2xl text-xl leading-snug text-ink md:text-2xl">
        {children}
      </p>
    </div>
  );
}
