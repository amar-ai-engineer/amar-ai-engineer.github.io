"use client";

import { profile } from "@/lib/data";
import { useView } from "@/lib/view";

/** Top-left brand: name + mono role subline. Clicking returns to the home view. */
export default function Wordmark() {
  const { setView } = useView();
  return (
    <button
      type="button"
      onClick={() => setView("home")}
      data-cursor="hover"
      className="fixed left-6 top-6 z-40 select-none text-left"
    >
      <div className="text-lg font-bold tracking-tight text-ink">
        {profile.wordmark}
      </div>
      <div className="mono-label mt-1">{profile.tagline.join("  ·  ")}</div>
    </button>
  );
}
