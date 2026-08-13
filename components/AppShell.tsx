"use client";

import { ViewProvider } from "@/lib/view";
import Stage from "./Stage";
import SiteChrome from "./SiteChrome";

/** Client root: view state + central stage + persistent chrome. */
export default function AppShell() {
  return (
    <ViewProvider>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Stage />
      <SiteChrome />
    </ViewProvider>
  );
}
