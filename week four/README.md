# TaskFlow Performance Optimization

A lightweight, responsive task manager used to demonstrate practical front-end performance optimization.

## Project layout
- `baseline/`: intentionally less optimized starting point for comparison.
- `optimized/`: improved version; open `optimized/index.html` in a browser.
- `PERFORMANCE_REPORT.md`: full methodology, code-level findings, measurements that can be verified locally, and Lighthouse instructions.
- `PERFORMANCE_REPORT.pdf`: report copy.

## Run locally
Open `baseline/index.html` and `optimized/index.html` in Chrome. Both are static and require no install or server. For repeatable Lighthouse testing, serve either folder locally (for example, `python -m http.server 8000` from the folder) and test the URL in Chrome DevTools > Lighthouse.

## Important measurement note
The report does not invent Lighthouse/PageSpeed scores. Those vary by device, browser, network, and hosting. Record your actual baseline and optimized Lighthouse results in the report's measurement table after running the audit.

## Production deployment notes
The project includes minified CSS/JS files and references them in the optimized HTML. Configure the hosting platform/CDN to serve versioned static assets with long-lived cache headers and Brotli/gzip compression. Those server-level settings are not applied by opening files locally.
