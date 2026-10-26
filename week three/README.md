# Open Pages — Accessible Information Portal

## Overview
A responsive blog/information portal concept demonstrating accessibility-focused HTML, CSS, and vanilla JavaScript.

## Files
- `index.html` — semantic page structure and content
- `styles.css` — responsive styling, focus states, contrast-conscious palette, reduced-motion support
- `script.js` — accessible mobile navigation, Escape handling, status messages, resize reset
- `ACCESSIBILITY_REPORT.md` — audit approach, improvements, WCAG mapping, and test instructions

## Run locally
1. Extract the ZIP archive.
2. Open `index.html` in a modern browser.
3. Resize the window to test desktop and mobile navigation.
4. Use the keyboard-only procedure in `ACCESSIBILITY_REPORT.md`.

## Important audit note
The report includes a code-based review and recommended test steps. It does not claim that Lighthouse or WAVE was actually run. Before submitting, run Lighthouse Accessibility and/or WAVE on the page, record the actual results in the report, and address any remaining findings.

## Keyboard support
- `Tab` / `Shift+Tab`: move between links and buttons.
- `Enter` / `Space`: activate links or buttons.
- `Escape`: close an open mobile menu and return focus to its toggle button.

## Design notes
The page uses semantic landmarks, a skip link, descriptive link text, a labeled navigation landmark, `aria-expanded` and `aria-controls` on the mobile menu button, a live status region, visible focus outlines, responsive layout rules, and reduced-motion support.
