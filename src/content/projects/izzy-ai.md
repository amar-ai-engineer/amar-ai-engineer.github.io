---
order: 2
title: "Case Study: Izzy.AI, an AI Speech-Therapy Platform"
description: "Building a launched AI speech-therapy product end to end: Wav2Vec2 stuttering detection, backend, dashboard and Stripe billing."
h1: "Izzy.AI: an AI speech therapist, from model to billing"
homeTitle: "Izzy.AI — an AI speech therapist, from model to billing"
lede: "A launched AI speech-therapy product. I was a core developer: the stuttering-detection model, the backend, the database, the dashboard and subscription billing."
tag: "Health AI · launched product"
status: "Built at SOC Solutions"
client: "Victoriam.ai (via SOC Solutions)"
role: "Core developer"
period: "2023 – 2025"
state: "Launched at izzyai.com"
service: "mlops-model-deployment"
nodes:
  - { label: "Patient speech audio", tech: "recorded in app" }
  - { label: "Stuttering detection", tech: "Wav2Vec2 · PyTorch" }
  - { label: "Backend API", tech: "architecture & endpoints" }
  - { label: "Database", tech: "schema design" }
  - { label: "Therapist dashboard", tech: "frontend + backend" }
  - { label: "Subscriptions", tech: "Stripe" }
rows:
  - { k: "Problem", v: "Give people who stutter guided therapy practice with automatic feedback, as a paid product." }
  - { k: "My role", v: "Core developer. Built the detection model, backend architecture, database, APIs and dashboard; specced the dashboard with the SME and client." }
  - { k: "Approach", v: "Wav2Vec2 audio model for stuttering detection, served behind the product backend, with Stripe subscription billing." }
  - { k: "Stack", v: "Python · PyTorch · Hugging Face · Wav2Vec2 · REST APIs · Stripe" }
  - { k: "Outcome", v: "Launched publicly as a paid product at izzyai.com, with subscription billing live." }
notes:
  - { k: "Model", t: "Stuttering detection", d: "A Wav2Vec2-based audio model classifies speech segments, turning recordings into feedback a patient can act on." }
  - { k: "Product", t: "A dashboard specced with experts", d: "I ran one-to-one sessions with the speech-therapy expert and the client to define what the dashboard must show." }
  - { k: "Business", t: "Billing from day one", d: "Stripe subscriptions were integrated so the product could charge customers at launch." }
quote: false
about: ["Speech AI", "Wav2Vec2", "AI product development"]
published: "2026-11-05"
updated: "2026-11-05"
---

Izzy.AI was built at SOC Solutions for the agency client Victoriam.ai. The goal was a real product, not a research demo: patients practise, the model analyses their speech, and therapists and patients see progress in a dashboard — all behind a paid subscription.
