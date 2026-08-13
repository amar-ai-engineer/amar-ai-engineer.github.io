/**
 * Single source of truth for site content.
 * Real content sourced from Amar's previous portfolio (amar-ai-engineer.github.io).
 * A few forward-looking labels are marked `TODO: confirm`.
 */

export const profile = {
  name: "Amar Ismail",
  wordmark: "amar ismail.",
  role: "AI Engineer",
  tagline: ["AI ENGINEER", "COMPUTER VISION", "LLM SYSTEMS"],
  location: "Pakistan (Remote Worldwide)",
  email: "amarismail522@gmail.com",
  linkedin: "https://www.linkedin.com/in/amar-ai-engineer/",
  github: "https://github.com/amar-ai-engineer",
  // TODO: confirm real booking link
  call: "https://cal.com/amar-ismail",
  yearsExperience: "3+",
  mascot: "Ami",
};

export const nav = [
  { label: "HOME", href: "#home" },
  { label: "WORK", href: "#work" },
  { label: "TESTIMONIALS", href: "#testimonials" },
  { label: "ABOUT", href: "#about" },
  { label: "CONTACT", href: "#contact" },
];

// mascot suggestion chips on the home hero
export const homeChips = [
  "who is amar?",
  "what has he built?",
  "is he open to work?",
];

export const homeTypewriter = [
  "i sit here judging models. ask a real question.",
  "ask me what amar has shipped.",
  "curious about healthcare ai? go on.",
];

// ---- career timeline (left column of Work) ----
export type CareerEntry = {
  period: string;
  company: string;
  role: string;
  current?: boolean;
};
export const career: CareerEntry[] = [
  {
    period: "2025 — NOW",
    company: "Freelance AI Engineer",
    role: "GPU video pipelines · domain LLMs · multi-agent automation",
    current: true,
  },
  {
    period: "2022 — 2025",
    company: "SOC Solutions LLC",
    role: "Production AI on AWS & Azure · RAG · GANs",
  },
];

// ---- selected work (right column of Work + detail pages) ----
export type Project = {
  slug: string;
  index: string; // "01"
  sector: string; // HEALTHCARE / FINTECH / AUTOMATION / MEDIA / MANUFACTURING
  title: string;
  blurb: string;
  tags: string[];
  metric?: { label: string; value: string };
  role: string;
  timeline: string;
  stack: string[];
  github?: string;
  isPrivate?: boolean;
  sections: { kicker: string; body: string }[];
};

export const projects: Project[] = [
  {
    slug: "video-3d-pipeline",
    index: "01",
    sector: "MEDIA",
    title: "AI 2D-to-3D Video Pipeline",
    blurb:
      "The AI engine behind a live, paid VR product: turns ordinary 2D video into true 3D and streams it to Meta Quest and Apple Vision Pro — depth estimation, stereo frame generation, and chunked processing across cloud GPUs, up to 8K HDR.",
    tags: ["CUDA", "COMPUTER VISION", "DOCKER"],
    metric: { label: "output", value: "8K HDR" },
    role: "AI Infrastructure & Backend Engineer",
    timeline: "2025 · Client work",
    stack: ["Python", "CUDA", "Docker", "Computer Vision", "RunPod", "Cloudflare"],
    isPrivate: true,
    sections: [
      {
        kicker: "01 · CONTEXT",
        body: "A media client needed to turn a library of flat 2D footage into stereoscopic 3D — at high resolution, in HDR, without a room full of artists doing it frame by frame.",
      },
      {
        kicker: "02 · THE PROBLEM",
        body: "3D conversion is slow and expensive. Doing it by hand doesn't scale, and a single machine chokes on HDR video at production resolution.",
      },
      {
        kicker: "03 · WHAT I BUILT",
        body: "An end-to-end pipeline: AI depth estimation, stereo frame generation, and chunked processing spread across distributed cloud GPUs, orchestrated so long jobs run reliably and pick up where they left off.",
      },
      {
        kicker: "04 · IMPACT",
        body: "A manual, artist-heavy job became an automated cloud process that now powers a live subscription product — paying customers upload a flat video and watch it back in true 3D on their headset, up to 8K HDR. Private client work, shown in generalized form.",
      },
    ],
  },
  {
    slug: "video-upscaling",
    index: "02",
    sector: "MEDIA",
    title: "AI Video Upscaling Pipeline",
    blurb:
      "AI super-resolution for large media libraries — GPU-tuned inference, optimized FFmpeg workflows, and async task orchestration in the cloud.",
    tags: ["PYTORCH", "FFMPEG", "CUDA"],
    metric: { label: "inference", value: "GPU" },
    role: "AI Backend Engineer",
    timeline: "2025 · Client work",
    stack: ["Python", "FFmpeg", "PyTorch", "CUDA", "Docker"],
    isPrivate: true,
    sections: [
      {
        kicker: "01 · CONTEXT",
        body: "The same client had a large back-catalog of low-resolution media they wanted to bring up to modern quality.",
      },
      {
        kicker: "02 · THE PROBLEM",
        body: "Upscaling thousands of files by hand isn't realistic, and naive GPU inference wastes time and money on encoding and I/O.",
      },
      {
        kicker: "03 · WHAT I BUILT",
        body: "An AI super-resolution service with GPU-tuned inference, optimized FFmpeg workflows, and async task orchestration so many videos process in parallel in the cloud.",
      },
      {
        kicker: "04 · IMPACT",
        body: "Old, low-resolution footage gets brought up to modern quality automatically, in bulk, as part of the same live VR product. Private client work, shown in generalized form.",
      },
    ],
  },
  {
    slug: "finsolve",
    index: "03",
    sector: "FINTECH",
    title: "FinSolve",
    blurb:
      "A secure RAG assistant with role-based access for 6 departments — each person only sees the data they're allowed to, enforced at retrieval, not just in the prompt.",
    tags: ["RAG", "LANGCHAIN", "CHROMADB"],
    metric: { label: "response", value: "30s" },
    role: "AI Engineer",
    timeline: "2024",
    stack: ["RAG", "LangChain", "ChromaDB", "Gemini", "Streamlit"],
    github: "https://github.com/amar-ai-engineer/finsolve-rag",
    sections: [
      {
        kicker: "01 · CONTEXT",
        body: "Staff across six departments were waiting hours — and sending piles of email — to get answers that already lived in company documents.",
      },
      {
        kicker: "02 · THE PROBLEM",
        body: "A normal chatbot would happily show finance data to someone in support. Access rules had to be real, not a polite request in the prompt.",
      },
      {
        kicker: "03 · WHAT I BUILT",
        body: "A retrieval assistant that checks each person's role before it fetches anything, so the model only ever sees documents that person is allowed to read.",
      },
      {
        kicker: "04 · IMPACT",
        body: "Query time dropped from around 4 hours to 30 seconds, with roughly 80% less internal email across the six departments.",
      },
    ],
  },
  {
    slug: "documind",
    index: "04",
    sector: "AUTOMATION",
    title: "DocuMind",
    blurb:
      "Pulls structured data out of invoices, receipts and contracts. Tries cheap OCR first and only calls the LLM when it actually needs to.",
    tags: ["OCR", "DOC AI", "GEMINI"],
    metric: { label: "accuracy", value: "96%" },
    role: "AI Engineer",
    timeline: "2024",
    stack: ["Python", "OCR", "PyMuPDF", "Gemini", "Streamlit"],
    github: "https://github.com/amar-ai-engineer/documind-ai",
    sections: [
      {
        kicker: "01 · CONTEXT",
        body: "A team was hand-typing numbers off invoices and receipts into spreadsheets — slow, dull, and easy to get wrong.",
      },
      {
        kicker: "02 · THE PROBLEM",
        body: "Sending every document to an LLM is expensive. Most invoices are simple enough that you don't need one.",
      },
      {
        kicker: "03 · WHAT I BUILT",
        body: "A pipeline that tries plain OCR extraction first and only escalates to the LLM for the messy documents, keeping cost and speed under control.",
      },
      {
        kicker: "04 · IMPACT",
        body: "96% extraction accuracy, about 80% of the manual time saved, handling 500+ documents a day.",
      },
    ],
  },
  {
    slug: "visionqc",
    index: "05",
    sector: "MANUFACTURING",
    title: "VisionQC",
    blurb:
      "A camera-based quality inspector that spots product defects in real time, with Grad-CAM heatmaps showing exactly where the problem is.",
    tags: ["COMPUTER VISION", "PYTORCH", "GRAD-CAM"],
    metric: { label: "detection", value: "95%" },
    role: "AI Engineer",
    timeline: "2024",
    stack: ["PyTorch", "ResNet18", "Grad-CAM", "OpenCV", "Streamlit"],
    github: "https://github.com/amar-ai-engineer/visionqc-ai",
    sections: [
      {
        kicker: "01 · CONTEXT",
        body: "Defective units were slipping past manual inspection and coming back as customer returns.",
      },
      {
        kicker: "02 · THE PROBLEM",
        body: "People get tired and miss things, and a plain yes/no model gives the QC team nothing to act on.",
      },
      {
        kicker: "03 · WHAT I BUILT",
        body: "A deep-learning inspector that flags defects in real time and overlays a Grad-CAM heatmap so an operator can see exactly where the defect is.",
      },
      {
        kicker: "04 · IMPACT",
        body: "Around 95% defect detection and roughly 70% fewer returns.",
      },
    ],
  },
  {
    slug: "agentforce",
    index: "06",
    sector: "AUTOMATION",
    title: "AgentForce",
    blurb:
      "Four agents — Researcher, Analyst, Writer, Reviewer — hand work off through a LangGraph state machine to produce competitive-analysis reports.",
    tags: ["AGENTS", "LANGGRAPH", "AUTOMATION"],
    metric: { label: "vs 3 days", value: "20min" },
    role: "AI Engineer",
    timeline: "2024",
    stack: ["LangGraph", "Gemini", "DuckDuckGo", "Agents", "Streamlit"],
    github: "https://github.com/amar-ai-engineer/agentforce-ai",
    sections: [
      {
        kicker: "01 · CONTEXT",
        body: "Putting together a competitive-analysis report meant days of reading, note-taking and writing.",
      },
      {
        kicker: "02 · THE PROBLEM",
        body: "One big prompt can't hold a whole research project together — it loses the thread and skips the checking step.",
      },
      {
        kicker: "03 · WHAT I BUILT",
        body: "Four specialized agents — Researcher, Analyst, Writer, Reviewer — that pass work between each other through a LangGraph state machine, with a built-in review pass.",
      },
      {
        kicker: "04 · IMPACT",
        body: "A workflow that took about 3 days now finishes in roughly 20 minutes, with an automatic quality check at the end.",
      },
    ],
  },
  {
    slug: "adeguard",
    index: "07",
    sector: "HEALTHCARE",
    title: "ADEGuard",
    blurb:
      "Reads medical reports to catch adverse drug events, using dual NER (SciSpacy + BioBERT) — and explains every severity call it makes.",
    tags: ["NLP", "BIOBERT", "HEALTHCARE"],
    metric: { label: "faster", value: "3x" },
    role: "AI Engineer",
    timeline: "2023",
    stack: ["SciSpacy", "BioBERT", "HDBSCAN", "SHAP", "Streamlit"],
    github: "https://github.com/amar-ai-engineer/adeguard-nlp",
    sections: [
      {
        kicker: "01 · CONTEXT",
        body: "Safety teams read through mountains of medical reports looking for signs a drug caused harm.",
      },
      {
        kicker: "02 · THE PROBLEM",
        body: "Manual review is slow, and in healthcare a black-box 'this is severe' answer isn't good enough — people need to know why.",
      },
      {
        kicker: "03 · WHAT I BUILT",
        body: "A dual-NER pipeline (SciSpacy + BioBERT) that flags adverse drug events and uses SHAP to explain every severity decision.",
      },
      {
        kicker: "04 · IMPACT",
        body: "92% NER accuracy across 23K+ reports, roughly 3x faster than manual review.",
      },
    ],
  },
  {
    slug: "specialistllm",
    index: "08",
    sector: "HEALTHCARE",
    title: "SpecialistLLM",
    blurb:
      "QLoRA fine-tuning turns TinyLlama into a medical Q&A specialist on 5,000 NIH pairs — training only a sliver of the weights while the base model stays frozen.",
    tags: ["FINE-TUNING", "QLORA", "LLM"],
    metric: { label: "params trained", value: "1.2%" },
    role: "AI Engineer",
    timeline: "2024",
    stack: ["QLoRA", "PEFT", "HuggingFace", "TinyLlama", "Streamlit"],
    github: "https://github.com/amar-ai-engineer/specialistllm",
    sections: [
      {
        kicker: "01 · CONTEXT",
        body: "A small open model gives vague, generic answers to medical questions out of the box.",
      },
      {
        kicker: "02 · THE PROBLEM",
        body: "Full fine-tuning needs serious hardware most people don't have, and retrains weights you don't need to touch.",
      },
      {
        kicker: "03 · WHAT I BUILT",
        body: "A QLoRA fine-tune of TinyLlama on 5,000 NIH Q&A pairs that trains just 1.2% of the parameters and keeps the base model frozen — small enough to run on a free Colab GPU.",
      },
      {
        kicker: "04 · IMPACT",
        body: "Much sharper medical answers from a 10MB adapter, trained for free on a Colab GPU.",
      },
    ],
  },
];

// ---- about ----
export const about = {
  headline:
    "The person behind the models — turning messy problems into tools people actually use.",
  bioTitle: "ami",
  bioRole: "AI ENGINEER · HEALTHCARE / FINTECH / AUTOMATION",
  bio: "I'm Ami — the AI Amar built to keep his archive and talk to whoever wanders in. He's an AI Engineer with 3+ years shipping real systems — started at SOC Solutions LLC building production AI on AWS and Azure, now freelance for clients around the world. Most of what I know, I learned watching him work.",
  stats: [
    { value: "3+", label: "YEARS IN AI" },
    { value: "8", label: "PROJECTS SHIPPED" },
    { value: "3", label: "CORE SECTORS" },
  ],
  manifesto:
    "He doesn't chase the newest model for its own sake. He picks the right tool for the job — not every problem needs deep learning, not every chatbot needs RAG — and builds the reliable thing that saves someone real hours. I'm what that habit looks like once it learns to talk.",
};

// ---- testimonials (replaces IDEA52) ----
export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  avatar?: string;
  project?: string;
  verifiedUrl?: string;
  rating: number;
};
export const testimonials: Testimonial[] = [
  {
    quote:
      "Amar has strong analytical skills and works in a very focused and goal-oriented way. He doesn't give up until something is truly right and shows a lot of perseverance in doing so. During my project, he fully committed himself and quickly made the work his own. His dedication and focus make him a valuable collaboration partner. I can definitely recommend working with Amar.",
    name: "Pieter van Groenewoud",
    role: "Tech Entrepreneur · TransferGuard.eu, XclusiveVR.com & Vakantieincuracao.nl",
    avatar: "/pieter.jpeg",
    project: "AI 2D-to-3D Video & Upscaling Pipeline",
    verifiedUrl:
      "https://www.linkedin.com/in/amar-ai-engineer/details/recommendations/",
    rating: 5,
  },
];

// ---- contact ----
export const contact = {
  headline:
    "Open to freelance and contract work — tell me what you're building, and you'll hear back",
  headlineAccent: "within ~24 hours.",
  goodFor: [
    { code: "AI", text: "AI systems for healthcare, fintech and automation" },
    { code: "RAG", text: "Document assistants and retrieval you can actually trust" },
    { code: "OPS", text: "Agents that take real work off your team's plate" },
  ],
  status: "Open to freelance",
};

// real business outcomes for the marquee — results a non-technical client cares about
export const outcomes = [
  "96% invoice accuracy",
  "4 hrs → 30 sec answers",
  "80% less manual work",
  "70% fewer product returns",
  "3-day research done in 20 min",
  "3× faster drug-safety review",
  "500+ documents a day",
  "8K HDR 2D→3D at scale",
];

// tools/logos for the trust marquee (kept for reference)
export const trustedBy = [
  "PYTHON",
  "PYTORCH",
  "LANGCHAIN",
  "LANGGRAPH",
  "HUGGING FACE",
  "BIOBERT",
  "FASTAPI",
  "DOCKER",
  "AWS",
  "AZURE",
  "CUDA",
  "CHROMADB",
];
