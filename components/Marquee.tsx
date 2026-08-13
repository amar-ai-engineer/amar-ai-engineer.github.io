import { outcomes } from "@/lib/data";

/** Seamless scrolling marquee of real business outcomes, bottom-left chrome. */
export default function Marquee() {
  const items = [...outcomes, ...outcomes]; // duplicate for seamless loop
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed bottom-5 left-6 z-30 hidden max-w-[46vw] items-center gap-3 md:flex"
    >
      <span className="mono-label whitespace-nowrap text-accent-deep">
        PROVEN RESULTS
      </span>
      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div
          className="flex w-max gap-6"
          style={{ animation: "marquee-scroll 26s linear infinite" }}
        >
          {items.map((t, i) => (
            <span key={i} className="mono-label whitespace-nowrap">
              {t}
              <span className="ml-6 text-accent">·</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
