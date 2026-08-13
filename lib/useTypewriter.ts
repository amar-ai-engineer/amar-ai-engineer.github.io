"use client";

import { useEffect, useState } from "react";

/**
 * Types each phrase char-by-char, pauses, deletes, moves to the next.
 * Respects prefers-reduced-motion by showing the first phrase statically.
 */
export function useTypewriter(
  phrases: string[],
  { typeMs = 45, deleteMs = 25, holdMs = 1800 } = {},
) {
  const [text, setText] = useState("");

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setText(phrases[0] ?? "");
      return;
    }

    let phrase = 0;
    let char = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const current = phrases[phrase] ?? "";
      if (!deleting) {
        char++;
        setText(current.slice(0, char));
        if (char === current.length) {
          deleting = true;
          timer = setTimeout(tick, holdMs);
          return;
        }
        timer = setTimeout(tick, typeMs);
      } else {
        char--;
        setText(current.slice(0, char));
        if (char === 0) {
          deleting = false;
          phrase = (phrase + 1) % phrases.length;
        }
        timer = setTimeout(tick, deleteMs);
      }
    };

    timer = setTimeout(tick, typeMs);
    return () => clearTimeout(timer);
  }, [phrases, typeMs, deleteMs, holdMs]);

  return text;
}
