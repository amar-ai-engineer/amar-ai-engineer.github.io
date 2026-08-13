/**
 * Lightweight cross-component openers. Any component can ask Ami or open the CV
 * without prop-drilling through the chrome — SiteChrome listens for these.
 */
export function askAmi(question?: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("ami:ask", { detail: question ?? "" }));
}

export function openCv() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("ami:cv"));
}
