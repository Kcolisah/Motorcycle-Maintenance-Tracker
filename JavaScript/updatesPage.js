document.addEventListener("DOMContentLoaded", () => {
  const updatesList = document.getElementById("updates-list");
  const detailCategory = document.getElementById("update-detail-category");
  const detailTitle = document.getElementById("update-detail-title");
  const detailDate = document.getElementById("update-detail-date");
  const detailBody = document.getElementById("update-detail-body");
  const detailPanel = document.getElementById("updates-detail-panel");

  const updates = window.updates || [];
  const READ_STORAGE_KEY = "mtReadUpdateIds";
  let selectedUpdateId = null;

  if (!updatesList || !detailCategory || !detailTitle || !detailDate || !detailBody) {
    console.error("Updates page elements are missing.");
    return;
  }

  function getReadIds() {
    try {
      const storedIds = JSON.parse(localStorage.getItem(READ_STORAGE_KEY));
      return Array.isArray(storedIds) ? storedIds : [];
    } catch (error) {
      return [];
    }
  }

  function saveReadIds(readIds) {
    localStorage.setItem(READ_STORAGE_KEY, JSON.stringify(readIds));
    window.dispatchEvent(new CustomEvent("mtUpdatesChanged"));
  }

  function isRead(updateId) {
    return getReadIds().includes(updateId);
  }

  function markRead(updateId) {
    const readIds = getReadIds();

    if (!readIds.includes(updateId)) {
      saveReadIds([...readIds, updateId]);
    }
  }

  function markUnread(updateId) {
    saveReadIds(getReadIds().filter((readId) => readId !== updateId));
  }

  function toggleReadState(updateId) {
    if (isRead(updateId)) {
      markUnread(updateId);
    } else {
      markRead(updateId);
    }

    renderUpdateList();
    showUpdate(updateId, false);
  }

  function renderUpdateList() {
    updatesList.innerHTML = updates
      .map((update) => {
        const read = isRead(update.id);

        return `
          <button class="updates-list-item ${read ? "read" : "unread"}" type="button" data-update-id="${update.id}">
            <div class="updates-list-meta">
              <span>${update.category}</span>
              <small class="updates-status-pill">${read ? "Read" : "Unread"}</small>
            </div>
            <strong>${update.title}</strong>
            <p>${update.shortText}</p>
          </button>
        `;
      })
      .join("");
  }

  function renderDetailAction(updateId) {
    const existingActions = detailPanel?.querySelector(".updates-detail-actions");
    existingActions?.remove();

    if (!detailPanel || !updateId) return;

    const read = isRead(updateId);
    const actionWrap = document.createElement("div");
    actionWrap.className = "updates-detail-actions";
    actionWrap.innerHTML = `
      <button class="updates-read-toggle" type="button" data-detail-toggle-read="${updateId}">
        ${read ? "Mark as unread" : "Mark as read"}
      </button>
    `;

    detailPanel.appendChild(actionWrap);
  }

  function showUpdate(updateId, shouldMarkRead = true) {
    const selectedUpdate = updates.find((update) => update.id === updateId) || updates[0];

    if (!selectedUpdate) return;

    selectedUpdateId = selectedUpdate.id;

    if (shouldMarkRead) {
      markRead(selectedUpdate.id);
      renderUpdateList();
    }

    detailCategory.textContent = selectedUpdate.category;
    detailTitle.textContent = selectedUpdate.title;
    detailDate.textContent = selectedUpdate.date;
    detailBody.textContent = selectedUpdate.fullText;

    document.querySelectorAll(".updates-list-item").forEach((item) => {
      item.classList.toggle("active", item.dataset.updateId === selectedUpdate.id);
    });

    renderDetailAction(selectedUpdate.id);
    window.history.replaceState(null, "", `#${selectedUpdate.id}`);
  }

  updatesList.addEventListener("click", (event) => {
    const updateButton = event.target.closest(".updates-list-item");

    if (!updateButton) return;

    showUpdate(updateButton.dataset.updateId);
  });

  detailPanel?.addEventListener("click", (event) => {
    const detailToggle = event.target.closest("[data-detail-toggle-read]");

    if (!detailToggle) return;

    toggleReadState(detailToggle.dataset.detailToggleRead);
  });

  window.addEventListener("mtUpdatesChanged", () => {
    renderUpdateList();
    if (selectedUpdateId) {
      showUpdate(selectedUpdateId, false);
    }
  });

  renderUpdateList();

  const updateIdFromUrl = window.location.hash.replace("#", "");
  showUpdate(updateIdFromUrl || updates[0]?.id, false);
});
