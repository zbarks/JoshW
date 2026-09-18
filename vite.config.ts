import fs from 'fs';
import path from 'path';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { ROUTES } from './seo/routes';
import { FAQS } from './seo/faqs';

const SITE_URL = 'https://www.footforwardedinburgh.com';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

// Writes dist/<route>/index.html for every page with its own title, description,
// canonical and readable content. Crawlers that don't run JavaScript (most AI
// search bots) get real text instead of an empty <div id="root">.
const prerenderRoutes = (): Plugin => ({
  name: 'prerender-routes',
  apply: 'build',
  closeBundle() {
    const dist = path.resolve(__dirname, 'dist');
    const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');

    for (const r of ROUTES) {
      const url = SITE_URL + (r.path === '/' ? '/' : r.path);
      const faq = r.path === '/academy' ? faqSchema() : '';
      const html = template
        .replace(/<title>.*?<\/title>/s, `<title>${esc(r.title)}</title>`)
        .replace(/(<meta name="description" content=")[^"]*/, `$1${esc(r.description)}`)
        .replace(/(<meta property="og:title" content=")[^"]*/, `$1${esc(r.title)}`)
        .replace(/(<meta property="og:description" content=")[^"]*/, `$1${esc(r.description)}`)
        .replace(/(<meta property="og:url" content=")[^"]*/, `$1${url}`)
        .replace(/(<link rel="canonical" href=")[^"]*/, `$1${url}`)
        .replace('</head>', `${faq}</head>`)
        .replace('<!--PRERENDER-->', `<div class="prerender">${r.body}</div>`);

      const outDir = r.path === '/' ? dist : path.join(dist, r.path);
      fs.mkdirSync(outDir, { recursive: true });
      fs.writeFileSync(path.join(outDir, 'index.html'), html);
    }

    const today = new Date().toISOString().slice(0, 10);
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ROUTES.map((r) => `  <url><loc>${SITE_URL}${r.path === '/' ? '/' : r.path}</loc><lastmod>${today}</lastmod><priority>${r.path === '/' ? '1.0' : r.path === '/academy' ? '0.9' : '0.7'}</priority></url>`).join('\n')}
</urlset>
`;
    fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap);
  },
});

// FAQ structured data for the Academy page. Matches the visible FAQ on that page.
const faqSchema = () =>
  `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  })}</script>`;

export default defineConfig({
  server: { port: 3000, host: '0.0.0.0' },
  plugins: [react(), prerenderRoutes()],
  resolve: { alias: { '@': path.resolve(__dirname, '.') } },
  build: { chunkSizeWarningLimit: 1000 },
});
