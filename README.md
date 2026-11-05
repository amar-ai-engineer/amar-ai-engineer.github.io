# amar-ai-engineer.github.io

Portfolio and service site for Amar Ismail — AI consulting & development services.
Static site built with [Astro](https://astro.build), hosted free on GitHub Pages.

## Run locally

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # builds to dist/ and runs the SEO check
```

## Edit content (no code needed)

| What | File |
| --- | --- |
| Name, email, links, availability, newsletter URL | `src/data/site.ts` |
| Homepage sections, FAQ, process, lab projects | `src/data/home.ts` |
| Service pages (one file each) | `src/content/services/*.md` |
| Case studies (one file each) | `src/content/projects/*.md` |
| Newsletter editions on /insights/ | `src/data/insights.json` |

Add a case study or service by copying an existing `.md` file and changing the text.
Edit any of these directly on github.com — the site rebuilds and goes live in 1–2 minutes.

## SEO

Every build runs `scripts/check-seo.mjs` and fails if a page has more or less than one H1,
a title over 60 characters, a description over 160, a missing canonical, invalid schema,
an image without alt text, or a broken internal link.

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes it.
One-time setup: repo **Settings → Pages → Source: GitHub Actions**.
