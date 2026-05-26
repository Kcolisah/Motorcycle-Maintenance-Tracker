document.addEventListener("DOMContentLoaded", () => {
  const updatesTrigger = document.getElementById("updates-trigger");
  const updatesPopover = document.getElementById("updates-popover");
  const updatesPopoverList = document.getElementById("updates-popover-list");

  if (!updatesTrigger || !updatesPopover || !updatesPopoverList) {
    return;
  }

  const updates = window.updates || [];
  const PREVIEW_LIMIT = 3;
  const READ_STORAGE_KEY = "mtReadUpdateIds";

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

  function getUnreadCount() {
    return updates.filter((update) => !isRead(update.id)).length;
  }

  function formatCount(count) {
    return count > 99 ? "99+" : String(count);
  }

  function getPreviewUpdates() {
    return updates.slice(0, PREVIEW_LIMIT);
  }

  function ensureBadge() {
    let badge = updatesTrigger.querySelector("[data-updates-count]");

    if (!badge) {
      badge = document.createElement("span");
      badge.className = "updates-count-badge";
      badge.dataset.updatesCount = "";
      updatesTrigger.appendChild(badge);
    }

    return badge;
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

    renderWidget();
  }

  function toggleAllUpdates() {
    const unreadCount = getUnreadCount();

    if (unreadCount > 0) {
      saveReadIds(updates.map((update) => update.id));
    } else {
      saveReadIds([]);
    }

    renderWidget();
  }

  function renderHeader() {
    const unreadCount = getUnreadCount();
    const header = updatesPopover.querySelector(".updates-popover-header");

    if (!header) return;

    header.innerHTML = `
      <div class="updates-popover-title-wrap">
        <span>Latest Updates</span>
        <small class="updates-popover-subtitle">
          ${unreadCount === 1 ? "1 unread update" : `${unreadCount} unread updates`}
        </small>
      </div>

      <div class="updates-popover-header-actions">
        <button class="updates-mark-all-btn" id="updates-mark-all-btn" type="button">
          ${unreadCount > 0 ? "Mark all read" : "Mark all unread"}
        </button>
        <a href="updates.html">See all</a>
      </div>
    `;

    const markAllButton = document.getElementById("updates-mark-all-btn");
    markAllButton?.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      toggleAllUpdates();
    });
  }

  function renderBadge() {
    const unreadCount = getUnreadCount();
    const badge = ensureBadge();

    badge.textContent = formatCount(unreadCount);
    badge.classList.toggle("is-visible", unreadCount > 0);
    updatesTrigger.classList.toggle("has-unread", unreadCount > 0);
    updatesTrigger.setAttribute("aria-label", unreadCount > 0 ? `Updates, ${unreadCount} unread` : "Updates");
  }

  function renderList() {
    updatesPopoverList.innerHTML = getPreviewUpdates()
      .map((update) => {
        const read = isRead(update.id);
        const statusText = read ? "Mark as unread" : "Mark as read";

        return `
          <article class="updates-popover-item ${read ? "read" : "unread"}" data-update-id="${update.id}">
            <a href="updates.html#${update.id}" class="updates-popover-link" data-update-link="${update.id}">
              <span>${update.category}</span>
              <strong>${update.title}</strong>
              <p>${update.shortText}</p>
            </a>

            <button class="updates-read-toggle" type="button" data-toggle-update-read="${update.id}">
              ${statusText}
            </button>
          </article>
        `;
      })
      .join("");
  }

  function renderWidget() {
    renderHeader();
    renderBadge();
    renderList();
  }

  updatesPopoverList.addEventListener("click", (event) => {
    const toggleButton = event.target.closest("[data-toggle-update-read]");
    const updateLink = event.target.closest("[data-update-link]");

    if (toggleButton) {
      event.preventDefault();
      event.stopPropagation();
      toggleReadState(toggleButton.dataset.toggleUpdateRead);
      return;
    }

    if (updateLink) {
      markRead(updateLink.dataset.updateLink);
    }
  });

  updatesTrigger.addEventListener("click", (event) => {
    event.stopPropagation();
    updatesPopover.hidden = !updatesPopover.hidden;
  });

  document.addEventListener("click", (event) => {
    const clickedInsideUpdates = updatesPopover.contains(event.target) || updatesTrigger.contains(event.target);

    if (!clickedInsideUpdates) {
      updatesPopover.hidden = true;
    }
  });

  window.addEventListener("mtUpdatesChanged", renderWidget);

  renderWidget();
});
