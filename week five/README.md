# PulseBoard | Final Week Mini Dashboard

## Features
- Fetches dashboard data from `data/dashboard.json` with the Fetch API.
- Responsive KPI cards, CSS bar chart, activity feed, and project table.
- Live project search, status filter, sort controls, refresh, and CSV export.
- Semantic HTML, skip link, visible keyboard focus, labels, live status feedback, and accessible progress bars.
- Performance-aware loading: deferred JavaScript, no third-party dependencies, system fonts, compact DOM updates, and CSS-only chart visuals.

## Run locally
Because browsers commonly block `fetch()` from `file://` URLs, run the project through a local web server:
1. Open a terminal in this folder.
2. Run `python -m http.server 8000`.
3. Visit `http://localhost:8000`.

## Test
Try search, status filters, sorting, refresh, and CSV export. Use keyboard Tab/Shift+Tab/Enter/Space and test at narrow and wide widths. Run Chrome DevTools Lighthouse in Mobile mode. No numeric audit scores are pre-filled because they must come from a real browser run.

## Production notes
For deployment, enable Brotli/gzip and suitable cache headers on the hosting platform/CDN. Add content-hashed filenames when using a build pipeline. The JSON is intentionally static for this assignment.
