(() => {
  const GARAGE_BADGE_API_BASE_URL = "http://localhost:8080/api";

  async function loadGarageBadgeCount() {
    const badges = document.querySelectorAll("[data-garage-count]");

    if (badges.length === 0) {
      return;
    }

    try {
      const response = await fetch(`${GARAGE_BADGE_API_BASE_URL}/garage`);

      if (!response.ok) {
        throw new Error(`Backend returned ${response.status}`);
      }

      const garageItems = await response.json();
      const count = garageItems.length;

      badges.forEach((badge) => {
        badge.textContent = count;

        if (count > 0) {
          badge.classList.add("is-visible");
        } else {
          badge.classList.remove("is-visible");
        }
      });
    } catch (error) {
      console.warn("Garage badge count could not load:", error);

      badges.forEach((badge) => {
        badge.textContent = "0";
        badge.classList.remove("is-visible");
      });
    }
  }

  window.loadGarageBadgeCount = loadGarageBadgeCount;

  document.addEventListener("DOMContentLoaded", loadGarageBadgeCount);
})();