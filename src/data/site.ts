// Site-wide facts. Edit here; every page, schema block and footer reads from this file.
export const site = {
  url: 'https://amar-ai-engineer.github.io',
  name: 'Amar Ismail',
  brand: 'Amar Ismail — AI Engineering & Consulting',
  jobTitle: 'AI Engineer & AI Consultant',
  // One consistent entity description: used on the site, LinkedIn, GitHub and directories.
  entity:
    'Amar Ismail is an AI engineer and consultant who builds and deploys production AI systems — LLM and RAG apps, AI agents, computer vision and GPU pipelines — for businesses in the US and Europe.',
  email: 'amarismail522@gmail.com',
  city: 'Faisalabad',
  country: 'PK',
  availability: 'Available now',
  linkedin: 'https://www.linkedin.com/in/amar-ai-engineer/',
  github: 'https://github.com/amar-ai-engineer',
  recommendations: 'https://www.linkedin.com/in/amar-ai-engineer/details/recommendations/',
  introVideo: 'https://www.youtube.com/watch?v=L3K8nAgeybQ',
  newsletter: {
    name: 'Research to Production',
    // TODO: replace with the newsletter URL once the first edition is published on LinkedIn.
    url: 'https://www.linkedin.com/in/amar-ai-engineer/',
  },
  portrait: '/img/amar-ismail.jpg',
};

export const services = [
  { slug: 'ai-consulting', short: 'AI consulting' },
  { slug: 'ai-chatbot-development', short: 'AI chatbot development' },
  { slug: 'ai-agents', short: 'AI agent development' },
  { slug: 'computer-vision', short: 'Computer vision' },
  { slug: 'mlops-model-deployment', short: 'Model deployment & MLOps' },
];
