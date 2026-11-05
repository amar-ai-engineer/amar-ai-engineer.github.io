import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Service pages: one Markdown file per service in src/content/services/.
const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: z.object({
    order: z.number(),
    title: z.string().max(60),            // <title> tag
    description: z.string().max(160),     // meta description
    h1: z.string(),
    kicker: z.string(),
    summary: z.string(),                  // answer-first 40–60 words
    cta: z.string(),
    facts: z.array(z.object({ k: z.string(), v: z.string() })),
    gets: z.array(z.object({ t: z.string(), d: z.string() })),
    flowTitle: z.string(),
    flowIntro: z.string(),
    flow: z.array(z.object({ t: z.string(), tech: z.string() })),
    proofTitle: z.string(),
    proof: z.array(z.object({ name: z.string(), badge: z.string().optional(), text: z.string(), href: z.string().optional(), linkLabel: z.string().optional() })),
    faqs: z.array(z.object({ q: z.string(), a: z.string() })),
    related: z.array(z.string()),
    closing: z.string(),
    updated: z.string(),
  }),
});

// Case studies: one Markdown file per project in src/content/projects/.
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    order: z.number(),
    title: z.string().max(60),
    description: z.string().max(160),
    h1: z.string(),
    homeTitle: z.string(),
    lede: z.string(),
    tag: z.string(),
    status: z.string(),
    client: z.string(),
    role: z.string(),
    period: z.string(),
    state: z.string(),
    service: z.string(),
    nodes: z.array(z.object({ label: z.string(), tech: z.string() })),
    rows: z.array(z.object({ k: z.string(), v: z.string() })),
    notes: z.array(z.object({ k: z.string(), t: z.string(), d: z.string() })).default([]),
    quote: z.boolean().default(false),
    about: z.array(z.string()),
    published: z.string(),
    updated: z.string(),
  }),
});

export const collections = { services, projects };
