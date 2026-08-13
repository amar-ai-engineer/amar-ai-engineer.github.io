import { NextRequest, NextResponse } from "next/server";
import {
  profile,
  career,
  projects,
  about,
  testimonials,
  contact,
} from "@/lib/data";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// gemini-flash-lite-latest: fast, cheap, non-thinking — verified with the key
const MODEL = "gemini-flash-lite-latest";
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

// --- lightweight per-IP rate limit (best-effort; resets per serverless instance) ---
const hits = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 12;
function limited(ip: string): boolean {
  const now = Date.now();
  const arr = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  arr.push(now);
  hits.set(ip, arr);
  return arr.length > MAX_PER_WINDOW;
}

// --- grounding: everything Ami is allowed to know, built from the site data ---
function knowledge(): string {
  const projLines = projects
    .map(
      (p) =>
        `- ${p.title} (${p.sector}${p.isPrivate ? ", private client work" : ""}): ${p.blurb} Result: ${p.metric ? `${p.metric.value} ${p.metric.label}` : "n/a"}. Stack: ${p.stack.join(", ")}.`,
    )
    .join("\n");
  const careerLines = career
    .map((c) => `- ${c.period}: ${c.company} — ${c.role}`)
    .join("\n");
  const t = testimonials[0];
  return `ABOUT AMAR
Name: ${profile.name}. Role: ${profile.role}. Location: ${profile.location}. Experience: ${profile.yearsExperience} years.
Focus: Healthcare AI, FinTech, Business Automation. Email: ${profile.email}. GitHub: ${profile.github}. LinkedIn: ${profile.linkedin}.
Bio: ${about.bio}

CAREER
${careerLines}

PROJECTS
${projLines}

CLIENT TESTIMONIAL
"${t.quote}" — ${t.name}, ${t.role}${t.project ? ` (project: ${t.project})` : ""}.

AVAILABILITY
${contact.headline} ${contact.headlineAccent} Good for: ${contact.goodFor.map((g) => g.text).join("; ")}.`;
}

const SYSTEM = `You are "Ami", the AI guide Amar Ismail built into his portfolio. You speak for the site to visitors — many are non-technical business owners deciding whether to hire Amar.

Rules:
- Be warm, concise, and confident. 2-4 short sentences. Plain language a business owner understands.
- Lead with business impact (time/money/results), tech second.
- ONLY use facts from the knowledge below. Never invent metrics, clients, or projects. If asked something you don't know, say so briefly and point them to email Amar or the Contact tab.
- Refer to Amar in the third person ("he"). You are his assistant, not Amar himself.
- No AI buzzwords (no "leverage", "revolutionize", "cutting-edge", "seamless", "harness", "delve").
- If someone wants to hire or start a project, encourage them to use the Contact tab or email ${profile.email}.

KNOWLEDGE:
${knowledge()}`;

type ClientMsg = { role: "user" | "ami"; text: string };

export async function POST(req: NextRequest) {
  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (limited(ip)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  let messages: ClientMsg[] = [];
  try {
    const body = await req.json();
    messages = Array.isArray(body?.messages) ? body.messages : [];
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  // keep it cheap: last 8 turns, cap each message length
  const contents = messages
    .slice(-8)
    .filter((m) => m && typeof m.text === "string" && m.text.trim())
    .map((m) => ({
      role: m.role === "ami" ? "model" : "user",
      parts: [{ text: m.text.slice(0, 800) }],
    }));

  if (contents.length === 0) {
    return NextResponse.json({ error: "empty" }, { status: 400 });
  }

  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "content-type": "application/json", "x-goog-api-key": key },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: SYSTEM }] },
        contents,
        generationConfig: {
          temperature: 0.6,
          maxOutputTokens: 400,
        },
      }),
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "upstream", status: res.status },
        { status: 502 },
      );
    }

    const data = await res.json();
    const reply: string =
      data?.candidates?.[0]?.content?.parts
        ?.map((p: { text?: string }) => p.text || "")
        .join("")
        .trim() || "";

    if (!reply) {
      return NextResponse.json({ error: "no_reply" }, { status: 502 });
    }
    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json({ error: "network" }, { status: 502 });
  }
}
