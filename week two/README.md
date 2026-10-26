# Brightside UI Lab: FAQ Accordion

## Overview
This project implements an accessible and responsive FAQ accordion using semantic HTML5, CSS3, and vanilla JavaScript. It has no framework or package dependencies.

## Files
- `index.html` — semantic page structure and sample FAQ content.
- `styles.css` — layout, colors, accordion states, responsive breakpoints, focus styles, and reduced-motion handling.
- `script.js` — DOM selection, delegated event handling, panel state, expand/collapse all, status updates, defensive checks, and dynamic footer year.
- `wireframe.md` — layout and behavior notes.

## How to run
1. Extract the ZIP archive.
2. Open `index.html` in a modern browser.
3. Click or tap a question to open or close its answer.
4. Use **Expand all** / **Collapse all** to open or close every answer.
5. Resize the browser to check mobile and desktop layouts.

No build step or internet connection is required.

## Keyboard and accessibility
- Use `Tab` and `Shift+Tab` to move between interactive controls.
- Press `Enter` or `Space` to toggle a focused question button.
- The buttons expose `aria-expanded` and `aria-controls`.
- Each panel uses `role="region"` and `aria-labelledby` to associate it with its trigger.
- A live status message reports the number of open answers.
- A skip link allows keyboard users to jump to main content.
- CSS respects `prefers-reduced-motion`.

## Interaction behavior
- Multiple answers can be open at the same time.
- The global control expands all panels unless all are already open, in which case it collapses all.
- Panel visibility is managed with the native `hidden` attribute, which provides a dependable fallback if CSS animation is unavailable.
- JavaScript checks for missing containers and missing panels to avoid common runtime failures.

## Testing checklist
- [ ] Open each question and confirm its answer appears.
- [ ] Close each question and confirm its answer is hidden.
- [ ] Open more than one question at once.
- [ ] Test Expand all and Collapse all.
- [ ] Navigate using keyboard only.
- [ ] Confirm the status text updates correctly.
- [ ] Test narrow mobile width and wider desktop width.
- [ ] Check the browser console for errors.
- [ ] Test with reduced-motion enabled if possible.

## Browser fallback note
The component avoids optional modern APIs and uses standard DOM methods, `addEventListener`, and the HTML `hidden` attribute. If JavaScript is completely disabled, the interactive behavior is unavailable. For a production no-script experience, replace the accordion markup with native `<details>` and `<summary>` elements or provide a `<noscript>` notice.

## Customization
Duplicate an `.accordion-item`, provide a unique trigger ID and panel ID, and ensure the trigger's `aria-controls` matches the panel ID while the panel's `aria-labelledby` matches the trigger ID. Keep `aria-expanded` and the initial `hidden` state consistent. Update the FAQ text and theme tokens in `styles.css` to match your project.
