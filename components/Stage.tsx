"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useView, type ViewKey } from "@/lib/view";
import HomeHero from "./sections/HomeHero";
import Work from "./sections/Work";
import Testimonials from "./sections/Testimonials";
import About from "./sections/About";
import Contact from "./sections/Contact";

const VIEWS: Record<ViewKey, React.ComponentType> = {
  home: HomeHero,
  work: Work,
  testimonials: Testimonials,
  about: About,
  contact: Contact,
};

/**
 * The central stage. One view is shown at a time and swaps in place with a
 * crossfade when the active view changes — no scrolling between sections.
 * Dense views (Work, About) scroll internally if they exceed the viewport.
 */
export default function Stage() {
  const { view } = useView();
  const Active = VIEWS[view];
  const reduce = useReducedMotion();
  const offset = reduce ? 0 : 14;

  return (
    <main
      id="main-content"
      className="relative h-screen w-full overflow-hidden"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={view}
          initial={{ opacity: 0, y: offset }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -offset }}
          transition={{ duration: reduce ? 0.15 : 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 overflow-y-auto md:overflow-hidden"
        >
          <Active />
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
