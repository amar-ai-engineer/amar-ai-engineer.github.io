"use client";

import { useEffect, useRef, useState } from "react";
import { useView, type ViewKey } from "@/lib/view";
import { amiReply } from "@/lib/amiReply";
import { openCv } from "@/lib/terminal";
import { useFocusTrap } from "@/lib/useFocusTrap";

type Msg = { role: "user" | "ami"; text: string };

const CHIPS = [
  "Show me his best work",
  "What's he building right now?",
  "How do I hire him?",
  "What does he work on?",
];

/**
 * Ask-Ami terminal overlay — dark window, mac dots, rotated rail, command chips,
 * a running log and a prompt. Slash commands navigate views / open the CV.
 * Free text gets a canned reply (swap for a real Claude call later).
 */
export default function AskAmiTerminal({
  open,
  onClose,
  initialQuestion,
}: {
  open: boolean;
  onClose: () => void;
  initialQuestion?: string;
}) {
  const { setView } = useView();
  const [log, setLog] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  // trap focus in the window; the component focuses its own input, so autoFocus off
  const trapRef = useFocusTrap<HTMLDivElement>(open, onClose, { autoFocus: false });

  // focus input + optionally auto-run a prefilled question on open
  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    if (initialQuestion) {
      run(initialQuestion);
      setInput("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, initialQuestion]);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [log]);

  function navigate(v: ViewKey) {
    setView(v);
    onClose();
  }

  async function run(raw: string) {
    const text = raw.trim();
    if (!text || busy) return;

    if (text.startsWith("/")) {
      const cmd = text.slice(1).toLowerCase();
      const views: ViewKey[] = ["home", "work", "testimonials", "about", "contact"];
      if (views.includes(cmd as ViewKey)) return navigate(cmd as ViewKey);
      if (cmd === "cv" || cmd === "resume") {
        onClose();
        openCv();
        return;
      }
      if (cmd === "clear") return setLog([]);
      setLog((l) => [
        ...l,
        { role: "user", text },
        {
          role: "ami",
          text: "Commands: /work /testimonials /about /contact /cv /clear",
        },
      ]);
      return;
    }

    // free text → real Ami (Gemini), with a graceful fallback to canned replies
    const userMsg: Msg = { role: "user", text };
    const history = [...log, userMsg];
    setBusy(true);
    setLog((l) => [...l, userMsg, { role: "ami", text: "…" }]);

    const replaceLast = (reply: string) =>
      setLog((l) => {
        const copy = l.slice();
        copy[copy.length - 1] = { role: "ami", text: reply };
        return copy;
      });

    try {
      const res = await fetch("/api/ami", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });
      if (!res.ok) throw new Error(String(res.status));
      const data = await res.json();
      replaceLast(
        typeof data?.reply === "string" && data.reply.trim()
          ? data.reply
          : amiReply(text),
      );
    } catch {
      replaceLast(amiReply(text));
    } finally {
      setBusy(false);
      inputRef.current?.focus();
    }
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    run(input);
    setInput("");
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[9000] grid place-items-center bg-black/30 p-4 backdrop-blur-md md:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Ask Ami terminal"
    >
      <div
        ref={trapRef}
        tabIndex={-1}
        data-surface="dark"
        onClick={(e) => e.stopPropagation()}
        className="relative flex h-[560px] w-full max-w-3xl overflow-hidden rounded-[20px] font-mono text-sm shadow-2xl outline-none"
        style={{ background: "#0d1417", color: "#eafdff" }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close terminal"
          className="absolute right-3 top-3 z-10 grid h-8 w-8 place-items-center rounded-full text-white/50 transition hover:bg-white/10 hover:text-white"
        >
          ✕
        </button>
        {/* left rail */}
        <div className="flex w-12 shrink-0 flex-col items-center justify-between border-r border-white/10 py-4">
          <div className="flex flex-col gap-2">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          </div>
          <div
            className="text-[10px] uppercase tracking-[0.3em] text-white/40"
            style={{ writingMode: "vertical-rl" }}
          >
            AMI · TERMINAL
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#28c840]" />
            <span
              className="text-[9px] uppercase tracking-[0.2em] text-white/40"
              style={{ writingMode: "vertical-rl" }}
            >
              LIVE
            </span>
          </div>
        </div>

        {/* body */}
        <div className="flex min-w-0 flex-1 flex-col p-5">
          <div className="text-emerald-400">ami v1.0 · cognition_layer online</div>
          <div className="mt-1 text-white/50">
            type a question, or one of:{" "}
            <span className="text-emerald-300">
              /work /testimonials /about /contact /cv /clear
            </span>
          </div>

          {/* log */}
          <div ref={logRef} className="mt-4 min-h-0 flex-1 space-y-3 overflow-y-auto pr-1">
            {log.length === 0 && (
              <>
                <div className="text-white/40">
                  // hello. ask me anything about amar.
                </div>
                <div className="flex flex-wrap gap-2">
                  {CHIPS.map((c) => (
                    <button
                      key={c}
                      type="button"
                      data-cursor="hover"
                      onClick={() => run(c)}
                      className="rounded-md border border-white/15 px-3 py-1.5 text-left text-white/80 transition hover:border-emerald-400/50 hover:text-emerald-300"
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </>
            )}
            {log.map((m, i) => (
              <div key={i} className={m.role === "user" ? "text-white/90" : "text-emerald-200"}>
                <span className={m.role === "user" ? "text-white/40" : "text-emerald-400"}>
                  {m.role === "user" ? "› " : "ami › "}
                </span>
                <span className="whitespace-pre-wrap">{m.text}</span>
              </div>
            ))}
          </div>

          {/* prompt */}
          <form onSubmit={submit} className="mt-3 flex items-center gap-2 border-t border-white/10 pt-3">
            <span className="text-emerald-400">$ guest@ami:~ $</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={busy}
              spellCheck={false}
              autoComplete="off"
              aria-label="Ask Ami a question"
              className="min-w-0 flex-1 bg-transparent text-white outline-none placeholder:text-white/25 disabled:opacity-60"
              placeholder={busy ? "ami is thinking…" : "ask anything…"}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
