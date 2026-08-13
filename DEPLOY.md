# Deploy — Netlify (free, commercial-OK, runs /api/ami)

Run these from `new-portfolio/`. The `!` prefix runs them in this Claude session
so I can see the output; or run them in your own terminal.

## Quick path — Netlify CLI (no GitHub needed)

```bash
# 1. Log in (opens a browser to authorize)
npx netlify-cli login

# 2. First deploy — choose "Create & configure a new site", pick a name
npx netlify-cli deploy --build --prod
#   (Ami will use canned replies on this first deploy — no key set yet)

# 3. Upload the Gemini key from .env.local (no secret typed in the terminal)
npx netlify-cli env:import .env.local

# 4. Redeploy so the /api/ami function picks up the key → Ami is live
npx netlify-cli deploy --build --prod
```

Your live URL is printed after step 2/4 (e.g. `https://amar-ismail.netlify.app`).

## Long-term path — GitHub + auto-deploy (optional, better)
1. Create a GitHub repo, then:
   ```bash
   git add -A && git commit -m "Portfolio site"
   git branch -M main
   git remote add origin <your-repo-url>
   git push -u origin main
   ```
2. In Netlify: **Add new site → Import from Git → pick the repo.**
3. Netlify auto-detects Next.js. Add env var **GEMINI_API_KEY** in
   **Site settings → Environment variables**.
4. Every `git push` now deploys automatically, with preview URLs on branches.

## After deploy
- 🔁 **Regenerate the Gemini key** (it was pasted in chat). Then update
  `.env.local` and re-run `npx netlify-cli env:import .env.local` + redeploy,
  or edit it in the Netlify dashboard.
- Optional: set a custom domain in **Site settings → Domain management**.
- `GEMINI_API_KEY` is the only required env var. `.env.local` is gitignored.

## Notes
- Node is pinned to 22 (`netlify.toml` / `.nvmrc`).
- No `output: export` in `next.config` → API routes run as functions. Keep it that way.
- Free-tier Gemini has a daily cap; on overflow Ami falls back to canned replies automatically.
