/* Open Pages mobile navigation.
 * Defensive checks keep this script safe if the expected markup changes.
 */
(() => {
  "use strict";

  const toggle = document.querySelector("#nav-toggle");
  const navigation = document.querySelector("#primary-navigation");
  const status = document.querySelector("#navigation-status");
  const year = document.querySelector("#current-year");

  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  // The navigation can still be used on wider screens if the toggle is absent.
  if (!toggle || !navigation) return;

  function setMenuOpen(isOpen, announce = false) {
    toggle.setAttribute("aria-expanded", String(isOpen));
    navigation.classList.toggle("is-open", isOpen);
    if (announce && status) {
      status.textContent = isOpen ? "Navigation menu opened." : "Navigation menu closed.";
    }
  }

  toggle.addEventListener("click", () => {
    const currentlyOpen = toggle.getAttribute("aria-expanded") === "true";
    setMenuOpen(!currentlyOpen, true);
  });

  // Close the compact menu after a section link is selected.
  navigation.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    if (!link) return;
    if (window.matchMedia && window.matchMedia("(max-width: 650px)").matches) {
      setMenuOpen(false, true);
    }
  });

  // Escape closes an open mobile menu and returns focus to its trigger.
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
      setMenuOpen(false, true);
      toggle.focus();
    }
  });

  // Ensure a compact-menu state does not remain stuck after resizing to desktop.
  let resizeFrame = null;
  window.addEventListener("resize", () => {
    if (resizeFrame !== null) window.clearTimeout(resizeFrame);
    resizeFrame = window.setTimeout(() => {
      if (!window.matchMedia || !window.matchMedia("(max-width: 650px)").matches) {
        setMenuOpen(false);
      }
      resizeFrame = null;
    }, 120);
  });
})();
