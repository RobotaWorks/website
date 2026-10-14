# robotaworks.com

Static landing site for RobotaWorks. Plain HTML and CSS, no build step.

Owner of updates: the growth role, tracked from hq#113.

## Files

- `index.html` - Czech company homepage: what RobotaWorks is and a card per
  project. Universal, not tied to one product (owner direction, hq#113).
- `en/index.html` - English company homepage, same structure
- `seo-autopilot/index.html` - Czech product page for the Shoptet SEO autopilot
  add-on (was the homepage until 2026-10-14)
- New project: give it its own folder page and add a card to the projects
  grid on both homepages and to `sitemap.xml`.
- `robots.txt`, `sitemap.xml`, `404.html`, `CNAME`, `favicon.svg`, `styles.css`
- `menu.js` - opens and closes the phone menu (below 860 px). Without JS the
  header keeps the language link and the main button.

## Keeping it updated

- Change copy only to match what is true today. No pricing or launch dates
  until they are decided in hq.
- When a page changes, update its `<lastmod>` in `sitemap.xml`.
- Every page needs: unique `<title>` and meta description, canonical,
  `hreflang` pair when a translation exists, Open Graph tags, and one `<h1>`.
- Check every change at 360 px and 390 px wide (phones) as well as desktop.
- No trackers or third-party scripts without an hq decision (personal data).
- Social images (1200x630): `og.png` (Czech company), `en/og.png` (English
  company), `seo-autopilot/og.png` (product).
