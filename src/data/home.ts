// Homepage content. Plain data, so it can be edited without touching layout code.

export const outcomes = [
  {
    t: 'A chatbot that answers from your own documents',
    d: 'Your team or customers ask questions in plain English; the assistant answers from your files, policies or product data — with access control.',
    proof: 'Botmer · FinSolve',
    href: '/services/ai-chatbot-development/',
  },
  {
    t: 'Automate slow, manual review work',
    d: 'Pull data out of invoices and contracts, flag defects in product images, or sort documents — so people only check what matters.',
    proof: 'DocuMind · VisionQC',
    href: '/services/ai-agents/',
  },
  {
    t: 'Turn video and images into new value',
    d: 'Convert, enhance or analyse video at scale — 2D-to-3D, upscaling, depth and detection — running on cloud GPUs.',
    proof: 'Stereo 3D pipeline',
    href: '/services/computer-vision/',
  },
  {
    t: 'Add AI to your product, ready for real users',
    d: 'A model is only half the job. I build the API, database, dashboard and billing so it works for paying customers.',
    proof: 'Izzy.AI',
    href: '/services/mlops-model-deployment/',
  },
];

export const capabilities = [
  {
    title: 'GenAI & LLM systems',
    line: 'Assistants, agents and fine-tuned models that answer from your data.',
    items: ['RAG pipelines', 'LLM fine-tuning · LoRA / QLoRA', 'Diffusion fine-tuning', 'Agent workflows · LangGraph'],
    link: { label: 'AI chatbot development', href: '/services/ai-chatbot-development/' },
  },
  {
    title: 'Computer vision & video AI',
    line: 'Depth, stereo 3D, super-resolution and detection on real footage.',
    items: ['Monocular depth estimation', '2D-to-3D stereo conversion', 'Video super-resolution', 'Keypoint & defect models'],
    link: { label: 'Computer vision development', href: '/services/computer-vision/' },
  },
  {
    title: 'GPU infrastructure',
    line: 'Pipelines that run on cloud GPUs reliably, in chunks, at volume.',
    items: ['RunPod · CUDA', 'Docker images', 'Chunked & async processing', 'Cloudflare R2 storage'],
    link: { label: 'Model deployment & MLOps', href: '/services/mlops-model-deployment/' },
  },
  {
    title: 'Optimisation & MLOps',
    line: 'Faster, cheaper inference — then keep it healthy.',
    items: ['Inference optimisation', 'Mixed precision & batching', 'CI · GitHub Actions', 'Monitoring & retraining'],
    link: { label: 'Model deployment & MLOps', href: '/services/mlops-model-deployment/' },
  },
  {
    title: 'AI backend & APIs',
    line: 'The API, database and billing a product needs around the model.',
    items: ['FastAPI · Flask', 'Database design', 'Dashboards', 'Stripe subscriptions'],
    link: { label: 'AI consulting', href: '/services/ai-consulting/' },
  },
];

export const moreWork = [
  {
    name: 'VictorAI',
    desc: 'Fashion design generation — fine-tuned Stable Diffusion on shoe images, built the inference pipeline and a Gradio app.',
    stack: 'Diffusers · PyTorch · Gradio',
  },
  {
    name: 'Botmer Assistant',
    desc: 'RAG-powered assistant on Telegram — built the RAG backend and the Telegram integration.',
    stack: 'RAG · LLM · Telegram API',
  },
];

export const lab = [
  { name: 'FinSolve', desc: 'RAG assistant with role-based access enforced at retrieval time', stack: 'LangChain · ChromaDB · Gemini', url: 'https://github.com/amar-ai-engineer/finsolve-rag' },
  { name: 'DocuMind', desc: 'Invoice & contract extraction — OCR first, LLM only when needed', stack: 'PyMuPDF · OCR · Gemini', url: 'https://github.com/amar-ai-engineer/documind-ai' },
  { name: 'VisionQC', desc: 'Defect inspection with Grad-CAM heatmaps', stack: 'PyTorch · ResNet18 · OpenCV', url: 'https://github.com/amar-ai-engineer/visionqc-ai' },
  { name: 'AgentForce', desc: 'Four-agent research workflow as a state machine', stack: 'LangGraph · Gemini', url: 'https://github.com/amar-ai-engineer/agentforce-ai' },
  { name: 'ADEGuard', desc: 'Adverse drug event detection with dual NER and explanations', stack: 'SciSpacy · BioBERT · SHAP', url: 'https://github.com/amar-ai-engineer/adeguard-nlp' },
  { name: 'SpecialistLLM', desc: 'QLoRA fine-tune of TinyLlama for medical Q&A', stack: 'PEFT · Hugging Face', url: 'https://github.com/amar-ai-engineer/specialistllm' },
];

export const process = [
  { name: 'Discover', d: 'Is AI the right fix, and what does success look like?' },
  { name: 'Prototype', d: 'A working model on your data, fast, with regular demos.' },
  { name: 'Optimise', d: 'Faster, cheaper inference — fine-tune, batch, cut GPU cost.' },
  { name: 'Deploy', d: 'Containers, GPUs and an API that plugs into your product.' },
  { name: 'Support', d: 'Monitoring and retraining. I don’t disappear.' },
];

export const homeFaqs = [
  {
    q: 'What AI consulting and development services do you offer?',
    a: 'I scope, build and deploy production AI systems: LLM and RAG applications, AI agents, computer vision and video AI, model fine-tuning, and the GPU infrastructure and APIs that run them.',
  },
  {
    q: 'Do you work with businesses in the US and Europe?',
    a: 'Yes. I work remotely with international clients — my longest engagement is with a media company in the Netherlands.',
  },
  {
    q: 'Can you deploy on our own cloud?',
    a: 'Yes. I have shipped on AWS, Azure, RunPod GPUs and Cloudflare, packaged with Docker and automated with GitHub Actions.',
  },
  {
    q: 'How does an AI project start?',
    a: 'With a short brief and a call. I check whether AI is the right fix, agree what success looks like, then propose a scoped first milestone.',
  },
  {
    q: 'How long does an AI project take?',
    a: 'A working prototype on your data usually takes 1–2 weeks. A production-ready system — deployed, integrated and monitored — typically takes 4–8 weeks. You see a demo every week.',
  },
  {
    q: 'How much does an AI project cost?',
    a: 'Most projects are fixed-price, quoted after a free 30-minute scoping call. A focused proof of concept typically starts from $1,500; a production system usually runs $4,000–$15,000, depending on scope, data and integrations. Ongoing support is available as a monthly retainer.',
  },
];

export const marquee = ['PyTorch', 'CUDA', 'Hugging Face', 'Diffusers', 'LangChain', 'RAG', 'Wav2Vec2', 'FFmpeg', 'Docker', 'RunPod', 'FastAPI', 'Cloudflare R2', 'Cloudflare Workers', 'AWS', 'Azure', 'GitHub Actions'];

// The hero "full-stack system" visual: five layers, three example systems.
export const heroSystems = {
  vision: { label: 'Vision', route: 'POST /v1/video/jobs', tech: ['frames · images · video', 'depth · detection · super-res — PyTorch', 'CUDA · cloud GPUs · Docker', 'FastAPI · async jobs · object storage', 'video app · batch pipeline'] },
  llm: { label: 'LLM', route: 'POST /v1/chat', tech: ['documents · questions', 'retrieval + LLM — LangChain · Hugging Face', 'vector DB · GPU or API inference', 'FastAPI · streaming responses', 'assistant · Telegram bot'] },
  speech: { label: 'Speech', route: 'POST /v1/audio/analyze', tech: ['audio recordings', 'Wav2Vec2 classifier — PyTorch', 'GPU worker · Docker', 'REST API · database', 'dashboard · subscription billing'] },
};
export const heroLayers = ['Data in', 'Model', 'Compute', 'API', 'Product'];
