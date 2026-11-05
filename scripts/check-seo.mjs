// Fails the build if any page breaks the SEO rules from the spec.
// Checks: one <h1>, title ≤ 60 chars, meta description ≤ 160 chars, canonical, valid JSON-LD, no broken internal links.
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const DIST = 'dist';
const files = [];
const walk = (d) => readdirSync(d).forEach((f) => { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') && files.push(p); });
walk(DIST);

const decode = (s) => s.replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const errors = [];
const warn = [];
for (const f of files) {
  const html = readFileSync(f, 'utf8');
  const page = '/' + relative(DIST, f).replace(/index\.html$/, '').replace(/\\/g, '/');
  const is404 = page.startsWith('/404');
  const h1 = (html.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) errors.push(`${page}: ${h1} <h1> tags (need exactly 1)`);
  const title = decode((html.match(/<title>([^<]*)<\/title>/) || [])[1] || '');
  if (!title) errors.push(`${page}: missing <title>`);
  else if (title.length > 60) errors.push(`${page}: title ${title.length} chars > 60 — "${title}"`);
  const desc = decode((html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '');
  if (!desc) errors.push(`${page}: missing meta description`);
  else if (desc.length > 160) errors.push(`${page}: description ${desc.length} chars > 160`);
  if (!is404 && !/<link rel="canonical"/.test(html)) errors.push(`${page}: missing canonical`);
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(m[1]); } catch (e) { errors.push(`${page}: invalid JSON-LD — ${e.message}`); }
  }
  for (const m of html.matchAll(/<img\b[^>]*>/g)) {
    if (!/\salt="/.test(m[0])) errors.push(`${page}: <img> without alt`);
  }
  for (const m of html.matchAll(/href="(\/[^"#?]*)/g)) {
    const href = m[1];
    if (href.startsWith('//') || href.startsWith('/_astro/')) continue;
    const target = join(DIST, href);
    const ok = existsSync(target) && (statSync(target).isFile() || existsSync(join(target, 'index.html')));
    if (!ok) errors.push(`${page}: broken internal link ${href}`);
  }
}
console.log(`SEO check: ${files.length} pages scanned`);
warn.forEach((w) => console.warn('  warn:', w));
if (errors.length) { errors.forEach((e) => console.error('  ✗', e)); process.exit(1); }
console.log('  ✓ all pages pass');
