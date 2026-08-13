"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type ViewKey =
  | "home"
  | "work"
  | "testimonials"
  | "about"
  | "contact";

const ALL: ViewKey[] = ["home", "work", "testimonials", "about", "contact"];

const ViewCtx = createContext<{
  view: ViewKey;
  setView: (v: ViewKey) => void;
}>({ view: "home", setView: () => {} });

/**
 * Holds the single active view for the SPA. Syncs with the URL hash so the
 * browser back button and deep links (e.g. /#work) work, including returning
 * from a project detail route.
 */
export function ViewProvider({ children }: { children: ReactNode }) {
  const [view, setViewState] = useState<ViewKey>("home");

  useEffect(() => {
    const readHash = () => {
      const h = window.location.hash.replace("#", "") as ViewKey;
      if (ALL.includes(h)) setViewState(h);
    };
    readHash();
    window.addEventListener("hashchange", readHash);
    return () => window.removeEventListener("hashchange", readHash);
  }, []);

  const setView = (v: ViewKey) => {
    setViewState(v);
    if (typeof window !== "undefined") {
      history.replaceState(null, "", `#${v}`);
    }
  };

  return (
    <ViewCtx.Provider value={{ view, setView }}>{children}</ViewCtx.Provider>
  );
}

export const useView = () => useContext(ViewCtx);
