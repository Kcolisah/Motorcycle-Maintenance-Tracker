document.addEventListener("DOMContentLoaded", () => {
  const updatesList = document.getElementById("updates-list");
  const detailCategory = document.getElementById("update-detail-category");
  const detailTitle = document.getElementById("update-detail-title");
  const detailDate = document.getElementById("update-detail-date");
  const detailBody = document.getElementById("update-detail-body");

  const updates = window.updates || [];

  if (!updatesList || !detailCategory || !detailTitle || !detailDate || !detailBody) {
    console.error("Updates page elements are missing.");
    return;
  }

  function renderUpdateList() {
    updatesList.innerHTML = updates
      .map((update) => {
        return `
          <button class="updates-list-item" type="button" data-update-id="${update.id}">
            <span>${update.category}</span>
            <strong>${update.title}</strong>
            <p>${update.shortText}</p>
          </button>
        `;
      })
      .join("");
  }

  function showUpdate(updateId) {
    const selectedUpdate = updates.find((update) => update.id === updateId) || updates[0];

    if (!selectedUpdate) return;

    detailCategory.textContent = selectedUpdate.category;
    detailTitle.textContent = selectedUpdate.title;
    detailDate.textContent = selectedUpdate.date;
    detailBody.textContent = selectedUpdate.fullText;

    document.querySelectorAll(".updates-list-item").forEach((item) => {
      item.classList.toggle("active", item.dataset.updateId === selectedUpdate.id);
    });

    window.history.replaceState(null, "", `#${selectedUpdate.id}`);
  }

  updatesList.addEventListener("click", (event) => {
    const updateButton = event.target.closest(".updates-list-item");

    if (!updateButton) return;

    showUpdate(updateButton.dataset.updateId);
  });

  renderUpdateList();

  const updateIdFromUrl = window.location.hash.replace("#", "");
  showUpdate(updateIdFromUrl || updates[0]?.id);
});
