import { about, contact, profile, projects } from "@/lib/data";

/**
 * Tiny keyword responder for the Ask-Ami terminal. Plain language, short.
 * (Swap for a real Claude API call later — see the claude-api skill.)
 */
export function amiReply(input: string): string {
  const q = input.toLowerCase();

  if (/(who|about|yourself|amar\b|background)/.test(q)) {
    return about.bio;
  }
  if (/(work|built|project|ship|portfolio|made)/.test(q)) {
    const list = projects
      .map((p) => `• ${p.title} — ${p.blurb}`)
      .join("\n");
    return `He's shipped ${projects.length} projects:\n${list}\nType /work to browse them.`;
  }
  if (/(hire|open|available|contact|email|reach|freelance|rate|cost)/.test(q)) {
    return `Yes — he's open to freelance and contract work. Email ${profile.email} or type /contact.`;
  }
  if (/(health|clinic|medical)/.test(q)) {
    return "Healthcare is one of his three niches — see ADEGuard and SpecialistLLM under /work.";
  }
  if (/(fintech|finance|bank|money)/.test(q)) {
    return "For fintech, look at FinSolve under /work — a finance assistant grounded in real documents.";
  }
  if (/(automat|agent|rag|llm|model|stack|tech)/.test(q)) {
    return "He works across RAG, agents, computer vision and fine-tuning. Open a project under /work to see the stack.";
  }
  if (/(hardest|challenge|difficult)/.test(q)) {
    return "Ask that on a specific project page — each one has a 'what was the hardest part' breakdown.";
  }
  if (/(award|recognition|proud)/.test(q)) {
    return about.manifesto;
  }
  if (/(help|command|what can)/.test(q)) {
    return "Try: /work  /testimonials  /about  /contact  /cv  /clear — or just ask a question.";
  }
  return `I mostly know about Amar's work. Try asking about his projects, or type /work, /about or /contact. (${contact.status}.)`;
}
