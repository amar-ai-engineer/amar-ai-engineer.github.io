"use client";

import { useCallback, useEffect, useState } from "react";
import Wordmark from "./Wordmark";
import NavPill from "./NavPill";
import MobileNav from "./MobileNav";
import Marquee from "./Marquee";
import SearchPill from "./SearchPill";
import AwardBadge from "./AwardBadge";
import AskAmiTerminal from "./AskAmiTerminal";
import CvModal from "./CvModal";

/**
 * Persistent global chrome: wordmark, glass nav, marquee, search, award badge,
 * plus the Ask-Ami terminal and CV modal overlays and the ⌘K shortcut.
 * Listens for ami:ask / ami:cv events so any component can open them.
 */
export default function SiteChrome() {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [cvOpen, setCvOpen] = useState(false);
  const [pending, setPending] = useState<string>("");

  const openTerminal = useCallback(() => {
    setPending("");
    setTerminalOpen(true);
  }, []);
  const openCv = useCallback(() => setCvOpen(true), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setTerminalOpen((v) => !v);
      }
      if (e.key === "Escape") {
        setTerminalOpen(false);
        setCvOpen(false);
      }
    };
    const onAsk = (e: Event) => {
      setPending((e as CustomEvent).detail || "");
      setTerminalOpen(true);
    };
    const onCv = () => setCvOpen(true);

    window.addEventListener("keydown", onKey);
    window.addEventListener("ami:ask", onAsk);
    window.addEventListener("ami:cv", onCv);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("ami:ask", onAsk);
      window.removeEventListener("ami:cv", onCv);
    };
  }, []);

  return (
    <>
      <Wordmark />
      <NavPill onOpenTerminal={openTerminal} onOpenCv={openCv} />
      <MobileNav onOpenTerminal={openTerminal} onOpenCv={openCv} />
      <AwardBadge />
      <Marquee />
      <SearchPill onOpen={openTerminal} />
      <AskAmiTerminal
        open={terminalOpen}
        onClose={() => setTerminalOpen(false)}
        initialQuestion={pending}
      />
      <CvModal open={cvOpen} onClose={() => setCvOpen(false)} />
    </>
  );
}
