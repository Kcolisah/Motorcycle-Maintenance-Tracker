document.addEventListener("DOMContentLoaded", () => {
  const config = window.MT_ADMIN_CONFIG || {};
  const api = window.MotorcycleTrackerApi;

  const loginCard = document.getElementById("admin-login-card");
  const dashboard = document.getElementById("admin-dashboard");
  const loginForm = document.getElementById("admin-login-form");
  const usernameInput = document.getElementById("admin-username");
  const passwordInput = document.getElementById("admin-password");
  const loginStatus = document.getElementById("admin-login-status");
  const localPreviewLoginBtn = document.getElementById("local-preview-login-btn");
  const logoutBtn = document.getElementById("admin-logout-btn");

  const form = document.getElementById("admin-update-form");
  const typeInput = document.getElementById("update-type");
  const dateInput = document.getElementById("update-date");
  const titleInput = document.getElementById("update-title");
  const shortInput = document.getElementById("update-short");
  const fullInput = document.getElementById("update-full");
  const updateStatus = document.getElementById("admin-update-status");
  const clearFormBtn = document.getElementById("clear-form-btn");

  const loadedUpdatesList = document.getElementById("admin-loaded-updates-list");
  const updatesSearch = document.getElementById("updates-search");
  const updatesFilter = document.getElementById("updates-filter");

  const preview = {
    type: document.getElementById("preview-type"),
    title: document.getElementById("preview-title"),
    date: document.getElementById("preview-date"),
    short: document.getElementById("preview-short"),
    full: document.getElementById("preview-full")
  };

  const TOKEN_KEY = config.tokenStorageKey || "mtAdminToken";
  const MODE_KEY = config.sessionStorageKey || "mtAdminMode";
  const LOCAL_UPDATES_KEY = config.localUpdatesStorageKey || window.mtCustomUpdatesStorageKey || "mtCustomUpdates";
  const LOGIN_ENDPOINT = config.loginEndpoint || "/api/admin/login";
  const UPDATES_ENDPOINT = config.updatesEndpoint || "/api/admin/updates";

  function setStatus(element, message, state = "") {
    if (!element) return;
    element.textContent = message;
    element.className = `admin-status ${state}`.trim();
  }

  function getMonthYear() {
    return new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(new Date());
  }

  function slugify(value) {
    return String(value || "")
      .toLowerCase()
      .trim()
      .replace(/['"]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 72);
  }

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function normalizeUpdate(update) {
    return {
      id: String(update?.id || slugify(update?.title || "update")).trim(),
      title: String(update?.title || "Untitled update").trim(),
      date: String(update?.date || "Undated").trim(),
      category: String(update?.category || update?.type || "Update").trim(),
      shortText: String(update?.shortText || update?.short || "").trim(),
      fullText: String(update?.fullText || update?.body || update?.shortText || "").trim()
    };
  }

  function dedupeUpdates(updates) {
    const seen = new Set();
    return updates
      .map(normalizeUpdate)
      .filter((update) => {
        if (!update.id || seen.has(update.id)) return false;
        seen.add(update.id);
        return true;
      });
  }

  function getLocalUpdates() {
    try {
      const stored = JSON.parse(localStorage.getItem(LOCAL_UPDATES_KEY));
      return Array.isArray(stored) ? dedupeUpdates(stored) : [];
    } catch (error) {
      return [];
    }
  }

  function getStaticUpdates() {
    return Array.isArray(window.updates) ? dedupeUpdates(window.updates) : [];
  }

  function getAllUpdatesWithSource() {
    const localUpdates = getLocalUpdates().map((update) => ({ ...update, source: "local" }));
    const localIds = new Set(localUpdates.map((update) => update.id));
    const staticUpdates = getStaticUpdates()
      .filter((update) => !localIds.has(update.id))
      .map((update) => ({ ...update, source: "static" }));

    return [...localUpdates, ...staticUpdates];
  }

  function saveLocalUpdate(update) {
    const normalized = normalizeUpdate(update);
    const nextUpdates = [normalized, ...getLocalUpdates().filter((item) => item.id !== normalized.id)];
    localStorage.setItem(LOCAL_UPDATES_KEY, JSON.stringify(nextUpdates));
    window.dispatchEvent(new CustomEvent("mtUpdatesChanged"));
    renderLoadedUpdates();
    return normalized;
  }

  function deleteLocalUpdate(id) {
    const nextUpdates = getLocalUpdates().filter((update) => update.id !== id);
    localStorage.setItem(LOCAL_UPDATES_KEY, JSON.stringify(nextUpdates));
    window.dispatchEvent(new CustomEvent("mtUpdatesChanged"));
    renderLoadedUpdates();
    setStatus(updateStatus, "Local preview update removed.", "success");
  }

  function isBackendMode() {
    return Boolean(localStorage.getItem(TOKEN_KEY));
  }

  function isLocalPreviewMode() {
    return sessionStorage.getItem(MODE_KEY) === "local-preview";
  }

  function hasAdminAccess() {
    return isBackendMode() || isLocalPreviewMode();
  }

  function showDashboard() {
    if (loginCard) loginCard.hidden = true;
    if (dashboard) dashboard.hidden = false;
    if (dateInput) dateInput.value ||= getMonthYear();
    updatePreview();
    renderLoadedUpdates();
  }

  function showLogin() {
    if (loginCard) loginCard.hidden = false;
    if (dashboard) dashboard.hidden = true;
  }

  function unlockLocalPreview() {
    sessionStorage.setItem(MODE_KEY, "local-preview");
    setStatus(loginStatus, "Local preview mode opened. Updates only show on this browser until Spring is connected.", "success");
    showDashboard();
  }

  function logout() {
    localStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(MODE_KEY);
    if (passwordInput) passwordInput.value = "";

    if (loginCard) {
      setStatus(loginStatus, "Signed out.");
      showLogin();
      return;
    }

    window.location.href = "index.html";
  }

  function buildUpdateFromForm() {
    const title = titleInput?.value.trim() || "";
    const date = dateInput?.value.trim() || getMonthYear();
    const category = typeInput?.value.trim() || "Update";

    return normalizeUpdate({
      id: `${new Date().getFullYear()}-${slugify(date)}-${slugify(title || "update")}`,
      title,
      date,
      category,
      shortText: shortInput?.value.trim() || "",
      fullText: fullInput?.value.trim() || ""
    });
  }

  function updatePreview() {
    if (!preview.title) return;

    const update = buildUpdateFromForm();
    preview.type.textContent = update.category || "Update";
    preview.title.textContent = update.title || "Update title";
    preview.date.textContent = update.date || getMonthYear();
    preview.short.textContent = update.shortText || "Short update message will appear here.";
    preview.full.textContent = update.fullText || "Full update details will appear here.";
  }

  function clearForm() {
    if (typeInput) typeInput.value = "Frontend";
    if (dateInput) dateInput.value = getMonthYear();
    if (titleInput) titleInput.value = "";
    if (shortInput) shortInput.value = "";
    if (fullInput) fullInput.value = "";
    updatePreview();
    setStatus(updateStatus, "");
  }

  function populateTypeFilter(updates) {
    if (!updatesFilter || updatesFilter.dataset.ready === "true") return;

    const categories = [...new Set(updates.map((update) => update.category).filter(Boolean))].sort();
    updatesFilter.innerHTML = `<option value="all">All types</option>${categories
      .map((category) => `<option value="${escapeHtml(category)}">${escapeHtml(category)}</option>`)
      .join("")}`;
    updatesFilter.dataset.ready = "true";
  }

  function renderLoadedUpdates() {
    if (!loadedUpdatesList) return;

    const updates = getAllUpdatesWithSource();
    populateTypeFilter(updates);

    const searchValue = (updatesSearch?.value || "").toLowerCase().trim();
    const filterValue = updatesFilter?.value || "all";

    const filteredUpdates = updates.filter((update) => {
      const matchesType = filterValue === "all" || update.category === filterValue;
      const searchable = `${update.title} ${update.date} ${update.category} ${update.shortText} ${update.fullText}`.toLowerCase();
      const matchesSearch = !searchValue || searchable.includes(searchValue);
      return matchesType && matchesSearch;
    });

    if (!filteredUpdates.length) {
      loadedUpdatesList.innerHTML = `<p class="admin-empty">No updates match this view.</p>`;
      return;
    }

    loadedUpdatesList.innerHTML = filteredUpdates.map((update) => {
      const isLocal = update.source === "local";
      const action = isLocal
        ? `<button class="admin-btn small danger" type="button" data-delete-local="${escapeHtml(update.id)}">Remove local preview</button>`
        : `<span class="admin-source-badge static">Posted / code-loaded</span>`;

      return `
        <article class="admin-update-row">
          <header>
            <div class="admin-update-meta">
              <span>${escapeHtml(update.category)}</span>
              <small>${escapeHtml(update.date)}</small>
              <span class="admin-source-badge ${isLocal ? "" : "static"}">${isLocal ? "Local preview" : "Protected"}</span>
            </div>
            ${action}
          </header>
          <strong>${escapeHtml(update.title)}</strong>
          <p>${escapeHtml(update.shortText)}</p>
          <p class="admin-update-full">${escapeHtml(update.fullText)}</p>
        </article>
      `;
    }).join("");
  }

  async function login(event) {
    event.preventDefault();
    setStatus(loginStatus, "Checking login...");
    if (localPreviewLoginBtn) localPreviewLoginBtn.hidden = true;

    try {
      const response = await fetch(LOGIN_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: usernameInput.value.trim(),
          password: passwordInput.value
        })
      });

      const data = api?.parseJsonResponse ? await api.parseJsonResponse(response) : await response.json().catch(() => null);

      if (!response.ok || !data?.token) {
        throw new Error(data?.message || "Login failed.");
      }

      localStorage.setItem(TOKEN_KEY, data.token);
      sessionStorage.removeItem(MODE_KEY);
      setStatus(loginStatus, "Logged in.", "success");
      showDashboard();
    } catch (error) {
      setStatus(loginStatus, "Spring admin login is not connected yet. Backend auth is needed for real protection.", "error");
      if (localPreviewLoginBtn) localPreviewLoginBtn.hidden = false;
    }
  }

  async function postUpdate(event) {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const update = buildUpdateFromForm();
    setStatus(updateStatus, "Sending update...");

    if (isLocalPreviewMode() && !isBackendMode()) {
      saveLocalUpdate(update);
      clearForm();
      setStatus(updateStatus, "Saved as local preview. The public update icon/list changes on this browser only.", "success");
      return;
    }

    try {
      const token = localStorage.getItem(TOKEN_KEY);
      const response = await fetch(UPDATES_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify(update)
      });

      if (!response.ok) {
        const data = api?.parseJsonResponse ? await api.parseJsonResponse(response) : null;
        throw new Error(data?.message || "Update could not be published.");
      }

      clearForm();
      setStatus(updateStatus, "Update sent.", "success");
    } catch (error) {
      setStatus(updateStatus, "Backend publishing is not connected yet. Use local preview mode for browser-only testing.", "error");
    }
  }

  loginForm?.addEventListener("submit", login);
  localPreviewLoginBtn?.addEventListener("click", unlockLocalPreview);
  logoutBtn?.addEventListener("click", logout);
  form?.addEventListener("submit", postUpdate);
  clearFormBtn?.addEventListener("click", clearForm);

  [typeInput, dateInput, titleInput, shortInput, fullInput].forEach((input) => {
    input?.addEventListener("input", updatePreview);
    input?.addEventListener("change", updatePreview);
  });

  updatesSearch?.addEventListener("input", renderLoadedUpdates);
  updatesFilter?.addEventListener("change", renderLoadedUpdates);
  loadedUpdatesList?.addEventListener("click", (event) => {
    const deleteButton = event.target.closest("[data-delete-local]");
    if (!deleteButton) return;
    deleteLocalUpdate(deleteButton.getAttribute("data-delete-local"));
  });

  if (hasAdminAccess()) {
    showDashboard();
  } else if (loginCard) {
    showLogin();
  } else {
    window.location.href = "index.html";
  }
});
