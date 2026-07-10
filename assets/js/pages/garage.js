function resolveGarageImagePath(path) {
  if (!path) {
    return "assets/images/LOGO.png";
  }

  const value = String(path).trim();

  if (
    value.startsWith("http://") ||
    value.startsWith("https://") ||
    value.startsWith("data:") ||
    value.startsWith("assets/") ||
    value.startsWith("/assets/") ||
    value.startsWith("../assets/")
  ) {
    return value;
  }

  if (value.startsWith("/images/")) {
    return `/assets${value}`;
  }

  if (value.startsWith("images/")) {
    return `assets/${value}`;
  }

  if (value.startsWith("./images/")) {
    return `assets/${value.slice(2)}`;
  }

  return value;
}

const garageList = document.getElementById("garageList");
const garageMessage = document.getElementById("garageMessage");
const garageLoadingState = document.getElementById("garageLoadingState");
const garageEmptyState = document.getElementById("garageEmptyState");
const refreshGarageBtn = document.getElementById("refreshGarageBtn");
const garageFlowPanel = document.getElementById("garageFlowPanel");
const garageFlowPrimaryAction = document.getElementById("garageFlowPrimaryAction");

const totalBikesCount = document.getElementById("totalBikesCount");
const totalMileageCount = document.getElementById("totalMileageCount");
const maintenanceDueCount = document.getElementById("maintenanceDueCount");
const maintenanceDueLabel = document.getElementById("maintenanceDueLabel");

const garageTaskSummary = new Map();

const formatters = window.MTFormatters || {};
const garageIcons = window.MTGarageIcons || {};

const sleep = formatters.sleep || ((ms) => new Promise((resolve) => setTimeout(resolve, ms)));
const formatPrice = formatters.formatCurrency || ((price) => (price === null || price === undefined || price === "" ? "N/A" : `$${Number(price).toLocaleString()}`));
const formatMileage = formatters.formatMileage || ((mileage) => (mileage === null || mileage === undefined || mileage === "" ? "0 mi" : `${Number(mileage).toLocaleString()} mi`));
const formatAddedDate = formatters.formatDisplayDate || ((dateValue) => (dateValue ? new Date(dateValue).toLocaleDateString() : "N/A"));
const garageIcon = garageIcons.getGarageIcon || (() => "");

function getApi() { return window.MotorcycleTrackerApi; }
function showGarageMessage(message) { garageMessage.textContent = message; garageMessage.style.display = "block"; }
function hideGarageMessage() { garageMessage.textContent = ""; garageMessage.style.display = "none"; }
function getMotorcycleFromGarageItem(item) { return item.motorcycle || item.bike || item; }
function getGarageMileage(item) { return item.currentMileage || item.mileage || 0; }
function getGarageId(item) { return item.id || item.garageId; }
function getTodayStart() { const today = new Date(); today.setHours(0, 0, 0, 0); return today; }

async function waitForApi() {
  for (let attempt = 0; attempt < 20; attempt += 1) {
    const api = getApi();
    if (api) { return api; }
    await sleep(50);
  }
  return null;
}

async function fetchJson(path, options = {}) {
  const api = await waitForApi();
  const response = api?.apiRequest ? await api.apiRequest(path, options) : await fetch(path, options);
  const text = await response.text();
  const data = text ? JSON.parse(text) : null;
  if (!response.ok) { throw new Error(`Backend returned ${response.status}`); }
  return data;
}


function summarizeTasks(tasks) {
  const today = getTodayStart();
  const soonLimit = new Date(today);
  soonLimit.setDate(today.getDate() + 7);
  const activeTasks = Array.isArray(tasks) ? tasks.filter((task) => (task.status || "PENDING") !== "DONE") : [];
  const overdueTasks = activeTasks.filter((task) => task.dueDate && new Date(`${task.dueDate}T00:00:00`) <= today);
  const soonTasks = activeTasks.filter((task) => task.dueDate && new Date(`${task.dueDate}T00:00:00`) > today && new Date(`${task.dueDate}T00:00:00`) <= soonLimit);
  return { active: activeTasks.length, overdue: overdueTasks.length, soon: soonTasks.length };
}

async function loadTaskSummaries(garageItems) {
  garageTaskSummary.clear();

  await Promise.allSettled(garageItems.map(async (item) => {
    const garageId = getGarageId(item);
    if (!garageId) { return; }

    try {
      const tasks = await fetchJson(`/api/garage/${garageId}/tasks`);
      garageTaskSummary.set(String(garageId), summarizeTasks(tasks));
    } catch (error) {
      garageTaskSummary.set(String(garageId), { active: 0, overdue: 0, soon: 0 });
      console.warn(`Could not load maintenance tasks for garage item ${garageId}:`, error);
    }
  }));
}

function getTaskSummary(garageId) { return garageTaskSummary.get(String(garageId)) || { active: 0, overdue: 0, soon: 0 }; }

function getGarageStatusMarkup(garageId) {
  const summary = getTaskSummary(garageId);
  if (summary.overdue > 0) { return `<span class="garage-status-pill garage-status-danger">${garageIcon("wrench")} Service Due</span>`; }
  if (summary.soon > 0) { return `<span class="garage-status-pill garage-status-warning">${garageIcon("mileage")} Due Soon</span>`; }
  if (summary.active > 0) { return `<span class="garage-status-pill garage-status-neutral">${garageIcon("wrench")} ${summary.active} Open</span>`; }
  return `<span class="garage-status-pill garage-status-ready">${garageIcon("wrench")} Ready to Track</span>`;
}

function updateGarageFlowPanel(garageItems) {
  if (!garageFlowPanel || !garageFlowPrimaryAction) {
    return;
  }

  if (!Array.isArray(garageItems) || garageItems.length === 0) {
    garageFlowPanel.hidden = true;
    garageFlowPanel.style.display = "none";
    garageFlowPrimaryAction.href = "maintenance.html";
    return;
  }

  const firstGarageId = getGarageId(garageItems[0]);

  garageFlowPanel.hidden = false;
  garageFlowPanel.style.display = "";

  if (firstGarageId) {
    garageFlowPrimaryAction.href = `maintenance.html?garageId=${encodeURIComponent(firstGarageId)}`;
  } else {
    garageFlowPrimaryAction.href = "maintenance.html";
  }
}

function updateGarageStats(garageItems) {
  const totalBikes = garageItems.length;
  const totalMileage = garageItems.reduce((sum, item) => sum + Number(getGarageMileage(item) || 0), 0);
  const totalDue = garageItems.reduce((sum, item) => sum + (getTaskSummary(getGarageId(item)).active || 0), 0);

  totalBikesCount.textContent = totalBikes;
  totalMileageCount.textContent = formatMileage(totalMileage);
  maintenanceDueCount.textContent = totalDue;

  if (maintenanceDueLabel) {
    maintenanceDueLabel.textContent = totalDue === 1 ? "open task" : "open tasks";
  }
}

function renderGarageCard(item) {
  const motorcycle = getMotorcycleFromGarageItem(item);
  const garageId = getGarageId(item);
  const statusMarkup = getGarageStatusMarkup(garageId);

  const card = document.createElement("article");
  card.className = "garage-card";

  card.innerHTML = `
    <div class="garage-card-image-wrap">
      <img class="garage-card-image" src="${resolveGarageImagePath(motorcycle.imageUrl || motorcycle.image_url || motorcycle.image || motorcycle.imagePath)}" alt="${motorcycle.model || "Motorcycle"}">
    </div>

    <div class="garage-card-info">
      <div class="garage-card-title-row">
        <div>
          <h3>${motorcycle.model || "Saved Motorcycle"}</h3>
          <div class="garage-card-meta">
            <span>${motorcycle.brand || "Unknown Brand"}</span>
            <span>${motorcycle.category || "Unknown Category"}</span>
            <span>${motorcycle.year || "N/A"}</span>
          </div>
        </div>
        ${statusMarkup}
      </div>

      <div class="garage-card-details">
        <div class="garage-card-detail">
          <span>${garageIcon("price")} Price</span>
          <strong>${formatPrice(motorcycle.price || item.purchasePrice)}</strong>
        </div>

        <div class="garage-card-detail">
          <span>${garageIcon("mileage")} Mileage</span>
          <strong>${formatMileage(getGarageMileage(item))}</strong>
        </div>

        <div class="garage-card-detail">
          <span>${garageIcon("calendar")} Saved</span>
          <strong>${formatAddedDate(item.addedAt)}</strong>
        </div>
      </div>
    </div>

    <div class="garage-card-actions">
      <a class="garage-card-action" href="maintenance.html?garageId=${garageId}">
        ${garageIcon("wrench")}
        <span>Service</span>
        ${garageIcon("arrow")}
      </a>

      <button class="garage-delete-btn" type="button" data-garage-id="${garageId}">
        ${garageIcon("trash")}
        <span>Remove</span>
      </button>
    </div>
  `;

  return card;
}

function renderGarage(garageItems) {
  garageList.innerHTML = "";
  garageLoadingState.style.display = "none";
  updateGarageStats(garageItems);
  updateGarageFlowPanel(garageItems);

  if (garageItems.length === 0) {
    garageEmptyState.style.display = "block";
    return;
  }

  garageEmptyState.style.display = "none";
  garageItems.forEach((item) => garageList.appendChild(renderGarageCard(item)));
}

async function loadGarage() {
  hideGarageMessage();
  garageLoadingState.style.display = "block";
  garageEmptyState.style.display = "none";
  garageList.innerHTML = "";

  try {
    const api = await waitForApi();
    if (!api?.getToken()) {
      window.location.href = "login.html?redirect=garage.html";
      return;
    }

    let garageItems;
    try {
      garageItems = await fetchJson("/api/garage");
    } catch (firstError) {
      await sleep(350);
      garageItems = await fetchJson("/api/garage");
    }

    await loadTaskSummaries(garageItems || []);
    renderGarage(garageItems || []);
  } catch (error) {
    garageLoadingState.style.display = "none";
    showGarageMessage("Garage could not load. Check your session, backend, or network connection, then try Refresh.");
    console.error("Failed to load garage:", error);
  }
}

async function removeGarageItem(garageId) {
  try {
    await fetchJson(`/api/garage/${garageId}`, { method: "DELETE" });
    await loadGarage();
  } catch (error) {
    showGarageMessage("Could not remove this motorcycle from the garage.");
    console.error("Failed to remove garage item:", error);
  }
}

garageList.addEventListener("click", (event) => {
  const deleteButton = event.target.closest(".garage-delete-btn");
  if (!deleteButton) { return; }
  removeGarageItem(deleteButton.dataset.garageId);
});

refreshGarageBtn.addEventListener("click", loadGarage);
document.addEventListener("DOMContentLoaded", loadGarage);
