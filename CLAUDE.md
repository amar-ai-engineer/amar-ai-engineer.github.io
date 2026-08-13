# CLAUDE.md — new-portfolio

Experiential AI-engineer portfolio for **Amar Ismail**, inspired by [fuch.ai](https://www.fuch.ai/).
Read `PLAN.md` for the full build plan and `SKILLS.md` for how to build each piece.

## What this is
A single-page-app-style portfolio with modal overlays and a robot AI-guide mascot named **"Ami"**.
Same structure and design language as fuch.ai, Amar's content, **IDEA52 replaced with TESTIMONIALS**.

## Who this is for
- **Amar Ismail** — AI Engineer, 3+ years, based in Pakistan
- Niches: **Healthcare AI, FinTech, Business Automation**
- Email: amarismail522@gmail.com · GitHub: amar-ai-engineer · LinkedIn: linkedin.com/in/amar-ai-engineer
- Projects: DocuMind, VisionQC, ADEGuard, FinSolve, AgentForce, SpecialistLLM

## Stack
- Next.js (App Router) + TypeScript
- Tailwind CSS (theme = design tokens below)
- Framer Motion for animation
- `next/font` for Inter + JetBrains Mono
- Deploy on Vercel

## Design tokens (do not drift from these)
```
bg:        #EAEEF4 (desktop) / #FFFFFF (mobile) / deep #DCE3EC
accent:    #0C7E70 (calm/primary) · #0B8676 (warm) · #0E7E8E (focus)
glow:      #8FE9FF (cyan, mascot highlights)
alert:     #C83F37   gold: #D8A657
ink:       rgba(13,20,23,.96) bright / .60 muted / .36 dim
line:      rgba(13,20,23,.12)
fonts:     Inter (display/body), JetBrains Mono (uppercase labels, .18em–.42em tracking)
radii:     card 14 · control 8 · chip 4 · modal 20 · pill 999
```
Signature look: **liquid-glass** panels (translucent white + backdrop-blur + light border + inner
highlight), drifting gradient blobs, film grain, custom cursor, mono uppercase micro-labels.

## Content writing rules (ALWAYS follow — from user memory)
- **No AI-sounding words** (leverage, revolutionize, cutting-edge, harness, delve, foster, seamless, etc.)
- Simple vocabulary — write like talking to a friend
- Add human factor — real stories, mistakes, experience
- **Business impact first, tech second**
- Keep copy short; let the design carry the wow

## Conventions
- Components in `components/`, one concern each; page sections composed in `app/`
- Reusable `.glass` utility for all glass panels; don't re-implement blur per component
- Respect `prefers-reduced-motion` — gate every non-essential animation
- Mobile is a lighter, mostly-white build (match fuch.ai behavior)
- All micro-labels: JetBrains Mono, uppercase, wide tracking

## Git
- **Do NOT add `Co-Authored-By` / Claude credit lines in commits** (user preference)
- Don't commit or push unless Amar asks

## Don't
- Don't invent fake metrics/testimonials as if real — mark placeholders clearly (`TODO: confirm`)
- Don't copy fuch.ai's proprietary 3D robot renders or their exact copy — recreate the *language*
