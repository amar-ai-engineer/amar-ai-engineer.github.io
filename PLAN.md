# new-portfolio — Build Plan

An experiential AI-engineer portfolio for **Amar Ismail**, inspired by [fuch.ai](https://www.fuch.ai/)
(Sayandeep Bose's "a portfolio you meet, not read"). Same structure and design language,
Amar's content, with the **IDEA52 section replaced by TESTIMONIALS**.

Mascot: **"Ami"** — an AI guide persona (fuch.ai calls theirs "Fuch").

---

## 1. Reference design system (extracted from fuch.ai compiled CSS)

### Colors
| Role | Value |
|---|---|
| Base bg (desktop) | `#EAEEF4` |
| Base bg (mobile) | `#FFFFFF` |
| Deep bg | `#DCE3EC` |
| Accent — calm (primary) | `#0C7E70` |
| Accent — warm | `#0B8676` |
| Accent — focus | `#0E7E8E` |
| Robot glow (bright cyan) | `#8FE9FF` |
| Alert red | `#C83F37` |
| Gold | `#D8A657` |
| Ink bright | `rgba(13,20,23,.96)` |
| Ink muted | `rgba(13,20,23,.60)` |
| Ink dim | `rgba(13,20,23,.36)` |
| Line | `rgba(13,20,23,.12)` |
| Panel fill | `rgba(13,20,23,.045)` |

### Typography
- **Display / body:** Inter (300–700)
- **Mono / labels:** JetBrains Mono — uppercase, tracking `.18em` (ui) to `.42em` (wide)
- Big headings: bold, tight tracking `-0.022em`
- Hero size: `clamp(48px, 7vw, 96px)`; display: `clamp(30px, 3.6vw, 56px)`

### Radii
card `14px` · control `8px` · chip `4px` · modal `20px` · pill `999px`

### Signature effects
- **Liquid glass** panels: translucent white + `backdrop-filter: blur()` + 1px light border + inner top highlight
- Drifting radial-gradient blobs (teal/cyan), film grain overlay, breathing vignette
- Custom cursor (dot + ring, follows mouse, scales on hover)
- Marquee ("trusted by …"), typewriter text, blinking caret, shimmer/scan lines
- ~28 keyframe animations total

---

## 2. Sections / routes (mirrors fuch.ai; IDEA52 → TESTIMONIALS)

| fuch.ai | our version | route |
|---|---|---|
| Home | Home — mascot + typewriter + wordmark | `/` |
| Work | Work — career timeline + selected projects | `/#work` |
| Project detail | Project detail (context/problem/impact + Ask-Ami rail) | `/work/[slug]` |
| **IDEA52** | **Testimonials** | `/#testimonials` |
| About | About — bio, stats, manifesto, awards | `/#about` |
| Contact | Contact — find me, availability, message-Ami | `/#contact` |
| Chat terminal | Ask-Ami terminal overlay | modal |
| CV | Resume modal (Download CV) | modal |

### Global chrome
- Top-left: `amar ismail.` wordmark + `AI ENGINEER · HEALTHCARE · FINTECH · AUTOMATION` mono subline
- Top-right: floating glass pill nav — chat icon, doc/CV icon, then HOME / WORK / TESTIMONIALS / ABOUT / CONTACT (active = white pill)
- Bottom-left: sound toggle, chat icon, scrolling marquee (tech/tools trusted)
- Bottom-right: `Search ⌘K` pill
- Award/highlight badge, custom cursor

---

## 3. Content mapping (Amar)

- **Identity:** Amar Ismail · AI Engineer · 3+ yrs · Pakistan · amarismail522@gmail.com · linkedin.com/in/amar-ai-engineer · github.com/amar-ai-engineer
- **Niches → sectors:** Healthcare AI · FinTech · Business Automation
- **Selected work (6):** DocuMind · VisionQC · ADEGuard · FinSolve · AgentForce · SpecialistLLM
- **Career timeline:** derive from real experience (placeholder until Amar confirms)
- **Stats ("by the numbers"):** 3+ yrs · projects shipped · models deployed (confirm real numbers)
- **Testimonials:** client quotes (placeholder until Amar provides real ones)

> Content must follow the rules in CLAUDE.md — no AI-buzzwords, plain language, business impact first.

---

## 4. Tech stack
- **Next.js** (App Router) + **TypeScript**
- **Tailwind CSS** (custom theme = tokens above)
- **Framer Motion** (entrances, typewriter, blob drift, cursor)
- Mascot **"Ami"**: start as animated SVG/CSS robot; optional upgrade to `react-three-fiber` + free CC0 GLB later
- Fonts via `next/font` (Inter, JetBrains Mono)
- Deploy: Vercel

---

## 5. Build order
1. Scaffold + tokens (Tailwind theme, fonts, `.glass` utility, blob+grain bg, custom cursor)
2. Global chrome (glass nav, marquee, badge, ⌘K search)
3. Home (wordmark, mascot, typewriter, suggestion chips)
4. Work (timeline + project cards) → `/work/[slug]` detail
5. Testimonials
6. About + Contact
7. Ask-Ami terminal overlay + CV modal
8. Responsive pass, a11y, reduced-motion, deploy

---

## Open questions for Amar
- Real career timeline (companies + years)?
- Real stat numbers for "by the numbers"?
- Real testimonials, or placeholder for now?
- Mascot: stylized SVG robot (fast) or a 3D GLB model (heavier)?
