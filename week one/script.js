// Small, accessible interactions: mobile navigation and current footer year.
const menuToggle = document.querySelector(".menu-toggle");
const primaryNavigation = document.querySelector("#primary-navigation");

if (menuToggle && primaryNavigation) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
    primaryNavigation.classList.toggle("is-open", !isOpen);
  });

  // Close the mobile menu after a navigation link is selected.
  primaryNavigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
      primaryNavigation.classList.remove("is-open");
    });
  });

  // Restore the desktop navigation state when resizing above the mobile breakpoint.
  window.addEventListener("resize", () => {
    if (window.innerWidth > 680) {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
      primaryNavigation.classList.remove("is-open");
    }
  });
}

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();
