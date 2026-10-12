# robotaworks.com

Static landing site for RobotaWorks. Plain HTML and CSS, no build step.

Owner of updates: the growth role, tracked from hq#113.

## Files

- `index.html` - Czech homepage (primary audience: Shoptet merchants)
- `en/index.html` - English company page
- `robots.txt`, `sitemap.xml`, `404.html`, `CNAME`, `favicon.svg`, `styles.css`

## Keeping it updated

- Change copy only to match what is true today. No pricing or launch dates
  until they are decided in hq.
- When a page changes, update its `<lastmod>` in `sitemap.xml`.
- Every page needs: unique `<title>` and meta description, canonical,
  `hreflang` pair, Open Graph tags, and one `<h1>`.
- No trackers or third-party scripts without an hq decision (personal data).
- Not yet done: `og.png` (1200x630 social image), operator identification
  line in the footer, Search Console verification after the site is live.
