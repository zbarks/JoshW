# Foot Forward Edinburgh website

React + Vite + Tailwind. Hosted on Vercel.

## Run locally
```
npm install
npm run dev
```

## Where to change things
- **Booking link, app links, phone, email, socials:** `config/site.ts`. Paste the booking URL into `BOOKING_URL`; every "Book a session" button uses it.
- **Page titles and Google/AI descriptions:** `seo/routes.ts`
- **Academy FAQs** (shown on the page and sent to Google as FAQ data): `seo/faqs.ts`
- **Business details for Google (schema.org):** the JSON-LD block in `index.html`
- **AI assistant summary:** `public/llms.txt`

## SEO notes
- Clean URLs (`/academy` rather than `/#/academy`). Old hash links redirect automatically.
- `npm run build` writes a static HTML file per page with its own title, description, canonical and readable text, so search engines and AI crawlers that do not run JavaScript still see the content. It also generates `sitemap.xml`.
- `public/robots.txt` allows Google, Bing and the main AI search crawlers.
