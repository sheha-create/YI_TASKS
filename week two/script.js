/* Brightside FAQ Accordion
 * Uses small, reusable functions and defensive checks so the component
 * fails gracefully if expected elements are missing.
 */
(() => {
  "use strict";

  const accordion = document.querySelector("#faq-accordion");
  const toggleAllButton = document.querySelector("#toggle-all");
  const statusMessage = document.querySelector("#component-status");
  const yearElement = document.querySelector("#current-year");

  // Update the footer year when the target element exists.
  if (yearElement) {
    yearElement.textContent = String(new Date().getFullYear());
  }

  // If the accordion container is missing, do not continue initialization.
  if (!accordion) {
    if (statusMessage) {
      statusMessage.textContent = "The accordion could not be initialized.";
    }
    return;
  }

  const triggers = Array.from(
    accordion.querySelectorAll(".accordion-trigger[aria-controls]")
  );

  // Validate that every trigger references a panel before binding events.
  const pairs = triggers.map((trigger) => {
    const panelId = trigger.getAttribute("aria-controls");
    const panel = panelId ? document.getElementById(panelId) : null;
    return { trigger, panel };
  }).filter(({ trigger, panel }) => {
    if (!panel) {
      // A missing panel should not crash the rest of the component.
      trigger.disabled = true;
      trigger.setAttribute("aria-disabled", "true");
      return false;
    }
    return true;
  });

  if (pairs.length === 0) {
    if (statusMessage) {
      statusMessage.textContent = "No questions are available right now.";
    }
    if (toggleAllButton) toggleAllButton.disabled = true;
    return;
  }

  /**
   * Set one panel's open state and keep the DOM and ARIA state in sync.
   * The hidden attribute is the reliable fallback; CSS only decorates it.
   */
  function setPanelOpen(trigger, panel, shouldOpen) {
    trigger.setAttribute("aria-expanded", String(shouldOpen));
    panel.hidden = !shouldOpen;
  }

  function isPanelOpen(pair) {
    return pair.trigger.getAttribute("aria-expanded") === "true" && !pair.panel.hidden;
  }

  function getOpenCount() {
    return pairs.filter(isPanelOpen).length;
  }

  function updateStatus() {
    const openCount = getOpenCount();
    if (statusMessage) {
      statusMessage.textContent = `${openCount} of ${pairs.length} answers open`;
    }
    if (toggleAllButton) {
      const allOpen = openCount === pairs.length;
      toggleAllButton.textContent = allOpen ? "Collapse all" : "Expand all";
      toggleAllButton.setAttribute("aria-label", allOpen ? "Collapse all answers" : "Expand all answers");
    }
  }

  // Delegate clicks from the accordion to keep event handling maintainable.
  accordion.addEventListener("click", (event) => {
    const trigger = event.target.closest(".accordion-trigger");
    if (!trigger || !accordion.contains(trigger) || trigger.disabled) return;

    const pair = pairs.find((candidate) => candidate.trigger === trigger);
    if (!pair) return;

    setPanelOpen(pair.trigger, pair.panel, !isPanelOpen(pair));
    updateStatus();
  });

  if (toggleAllButton) {
    toggleAllButton.addEventListener("click", () => {
      const shouldOpenAll = getOpenCount() !== pairs.length;
      pairs.forEach(({ trigger, panel }) => setPanelOpen(trigger, panel, shouldOpenAll));
      updateStatus();
    });
  }

  // Initialize from the HTML's declared ARIA state.
  pairs.forEach(({ trigger, panel }) => {
    const initiallyOpen = trigger.getAttribute("aria-expanded") === "true";
    setPanelOpen(trigger, panel, initiallyOpen);
  });
  updateStatus();
})();
