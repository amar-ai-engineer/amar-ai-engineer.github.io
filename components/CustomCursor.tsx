"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Custom cursor: a small solid dot that tracks instantly + a larger ring that
 * follows with lag (lerp). Ring grows + tints on elements marked
 * [data-cursor="hover"] (or native links/buttons). Hidden on touch devices.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // only on devices with a fine pointer + hover, and not reduced-motion
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!fine.matches) return;
    setEnabled(true);

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { x: mouse.x, y: mouse.y };
    let hovering = false;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouse.x}px, ${mouse.y}px) translate(-50%, -50%)`;
      }
      const t = e.target as HTMLElement | null;
      const isHover = !!t?.closest(
        'a, button, [data-cursor="hover"], input, textarea',
      );
      if (isHover !== hovering) {
        hovering = isHover;
        ringRef.current?.classList.toggle("cursor-ring--hover", hovering);
      }
    };

    const loop = () => {
      ring.x += (mouse.x - ring.x) * 0.18;
      ring.y += (mouse.y - ring.y) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.x}px, ${ring.y}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[99999] h-1.5 w-1.5 rounded-full"
        style={{ background: "var(--accent)" }}
      />
      <div
        ref={ringRef}
        className="cursor-ring pointer-events-none fixed left-0 top-0 z-[99998] h-8 w-8 rounded-full border transition-[width,height,background-color,border-color] duration-200"
        style={{ borderColor: "rgba(13,20,23,0.28)" }}
      />
      <style>{`
        .cursor-ring--hover {
          width: 44px !important;
          height: 44px !important;
          background: rgba(12,126,112,0.10);
          border-color: rgba(12,126,112,0.5) !important;
        }
      `}</style>
    </>
  );
}
