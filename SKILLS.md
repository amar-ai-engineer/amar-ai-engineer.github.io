# SKILLS.md — how to build each piece of new-portfolio

Recipes and technical notes for recreating the fuch.ai design language. Pair with `CLAUDE.md`
(tokens, rules) and `PLAN.md` (structure).

---

## 1. Liquid-glass panel
The core visual. One reusable utility.
```css
.glass {
  background: rgba(255,255,255,0.55);
  backdrop-filter: blur(20px) saturate(140%);
  -webkit-backdrop-filter: blur(20px) saturate(140%);
  border: 1px solid rgba(255,255,255,0.6);
  border-radius: var(--radius-card);      /* 14px; 999px for pills, 20px for modals */
  box-shadow: 0 8px 30px rgba(40,60,90,0.12),
              inset 0 1px 0 rgba(255,255,255,0.7); /* inner top highlight */
}
```
Used for: nav pill, project cards, right-rail cards, contact cards, search pill.

## 2. Ambient background (blobs + grain + vignette)
Fixed layer behind everything, `z-index: 0`, `pointer-events: none`.
- 3–4 large `radial-gradient` blobs in teal `#0C7E70` / cyan `#8FE9FF` at low opacity, each on its
  own slow `@keyframes` drift (20–40s, ease-in-out, alternate).
- Film grain: tiling SVG/PNG noise at ~3–5% opacity, subtle `grain-shift` animation.
- Breathing vignette: radial dark edge that fades in/out over ~8s.
- Gate all of this behind `prefers-reduced-motion: no-preference`.

## 3. Custom cursor
- `<div id="cursor-root">` fixed, `pointer-events:none`, `z-index: 99999`.
- Two parts: a small solid dot (follows instantly) + a larger ring (follows with lag via lerp in a
  `requestAnimationFrame` loop or Framer Motion spring).
- On hover over `[data-cursor="hover"]` (links, buttons): ring scales up + accent tint.
- Hide on touch devices (`@media (hover: none)`).

## 4. Floating glass nav pill (top-right)
- `position: fixed`, `.glass` pill.
- Two icon buttons (chat → opens Ask-Ami terminal; doc → opens CV modal) + text links
  HOME / WORK / TESTIMONIALS / ABOUT / CONTACT.
- Active link = solid white inner pill with soft shadow.
- On scroll, section links update via IntersectionObserver.

## 5. Mascot "Ami"
Can't reuse fuch.ai's 3D renders. Two tiers:
- **v1 (default):** stylized robot built from SVG + CSS/Framer Motion — glossy head, cyan `#8FE9FF`
  chest glow, idle float (translateY loop), subtle head tilt toward cursor, occasional blink/glitch.
- **v2 (optional):** `react-three-fiber` + `@react-three/drei` loading a **CC0** robot GLB
  (e.g. from Poly Pizza / Sketchfab CC0), with an idle animation mixer.
Pose varies per section (home = front, work = 3/4, about = front hero).

## 6. Typewriter line (home + terminal)
- Type text char-by-char with a blinking caret (`@keyframes caret-blink`).
- Loop through phrases; use a small hook `useTypewriter(phrases, speed)`.
- Home line style: JetBrains Mono, ink bright, teal caret.

## 7. Suggestion chips
- Pill buttons, mono, prefixed `>`; hover lifts + accent border.
- Clicking a chip opens the Ask-Ami terminal pre-filled with that question.

## 8. Ask-Ami terminal (modal overlay)
- Full-screen backdrop: blur + dim the page behind.
- Centered dark window `#0d1417`, radius 20, left rail with 3 mac dots (red/yellow/green),
  rotated `AMI · TERMINAL` label, `LIVE` + green dot at bottom.
- Header: `ami v1.0 · online`, hint line `type a question, or one of: /work /testimonials /about /contact /cv /clear`.
- Command chips + input prompt `$ guest@ami:~ $`.
- Wire `/` commands to navigate; free text can be canned responses now, real LLM later
  (Claude API — see repo-level claude-api skill if adding).

## 9. Work section
- **Left:** career timeline — vertical line, dot markers, `YEAR — YEAR / Company / Role`, active
  item has teal dot + bold.
- **Center:** mascot.
- **Right:** "SELECTED WORK" stacked `.glass` cards — index (`01 · HEALTHCARE`), title, one-line
  blurb, tag chips, isometric line-art thumbnail, `↗`. Active card highlighted with tinted thumb.
- Each card → `/work/[slug]`.

## 10. Project detail page (`/work/[slug]`)
- `← back` pill (top-left), `← nn / NN →` pager (top-right).
- Tag chip `● PROJ_NAME`, huge title, `Role · Timeline` subtitle.
- Hero image card ("click to expand" → lightbox).
- Body: numbered sections `01 · CONTEXT`, `02 · THE PROBLEM`, `03 · WHAT I BUILT`, `04 · IMPACT`,
  active section gets a left teal accent border.
- Right rail `.glass` cards: **At a Glance** (Role / Timeline / key metric), **Stack** (chips),
  **Ask Ami** (mini prompt).
- Footer: `NEXT → <project>`.
- Subtle grid background.

## 11. Testimonials (replaces IDEA52)
- Section header `0X / TESTIMONIALS` + one-line intro.
- Grid/marquee of `.glass` quote cards: quote, avatar, name, role/company, star row.
- Optional auto-scroll marquee row of logos.
- Mark all quotes `TODO: confirm real` until Amar supplies them.

## 12. About
- Floating award badges (CSS-positioned circular badges) on the left, mascot center.
- Right: big `ami` wordmark, mono role line, first-person bio paragraph, **By the numbers** stat
  cards (`3+ YEARS`, `NN PROJECTS`, `NN MODELS`), **Manifesto** glass card.
- Bottom marquee: career trajectory.

## 13. Contact
- **Find me** `.glass` card: Book a call, Email, LinkedIn, GitHub — icon + label + sublabel + `↗`.
- **Profile** card: avatar, name, role, `● Open to freelance` + local time pill, "What I'm good for".
- **Message Ami** `.glass` card: assistant intro bubble + action rows (Hire me / A project / Just say hi).

## 14. CV modal
- Separate mac-window-styled modal (traffic-light dots, blurred backdrop).
- Top bar: phone/email, in-page nav (About/Experience/Capabilities/Impact), dark-mode toggle,
  `Download CV ⬇` black pill (links to a real PDF).
- Hero: huge `Amar Ismail.` + `AI ENGINEER — HEALTHCARE / FINTECH — 3+ YEARS` + `SCROLL`.
- Clean minimal off-white resume styling (distinct from the glass site).

## 15. Marquee
- Duplicated track translated `-50%` on loop for seamless scroll; pause on hover; `·` separators.

---

## Animation checklist (keyframes to implement)
blob-drift (a–d) · grain-shift · vignette-breathe · caret-blink · typewriter · marquee-scroll ·
mascot idle-float · mascot blink/glitch · card hover-lift · nav active-pill · shimmer/scan on CTAs.
Every one gated by `prefers-reduced-motion`.

## Performance / a11y
- Lazy-load the 3D mascot (if used) and the terminal modal.
- `next/image` for thumbnails; inline SVG for line-art.
- Keyboard: `⌘K` search, `Esc` closes modals, focus-trap in modals, visible focus rings.
- Color contrast: keep body text at ink `.96`/`.60`, never dimmer for real content.
