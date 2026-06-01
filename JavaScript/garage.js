const garageList = document.getElementById("garageList");
const garageMessage = document.getElementById("garageMessage");
const garageLoadingState = document.getElementById("garageLoadingState");
const garageEmptyState = document.getElementById("garageEmptyState");
const refreshGarageBtn = document.getElementById("refreshGarageBtn");

const totalBikesCount = document.getElementById("totalBikesCount");
const totalMileageCount = document.getElementById("totalMileageCount");
const maintenanceDueCount = document.getElementById("maintenanceDueCount");

const garageTaskSummary = new Map();

function sleep(ms) { return new Promise((resolve) => setTimeout(resolve, ms)); }
function getApi() { return window.MotorcycleTrackerApi; }
function formatPrice(price) { return price === null || price === undefined || price === "" ? "N/A" : `$${Number(price).toLocaleString()}`; }
function formatMileage(mileage) { return mileage === null || mileage === undefined || mileage === "" ? "0 mi" : `${Number(mileage).toLocaleString()} mi`; }
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
  const response = await fetch(path, options);
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

function updateGarageStats(garageItems) {
  const totalBikes = garageItems.length;
  const totalMileage = garageItems.reduce((sum, item) => sum + Number(getGarageMileage(item) || 0), 0);
  const totalDue = garageItems.reduce((sum, item) => {
    const garageId = getGarageId(item);
    const summary = garageTaskSummary.get(String(garageId));
    return sum + (summary?.active || 0);
  }, 0);

  totalBikesCount.textContent = totalBikes;
  totalMileageCount.textContent = formatMileage(totalMileage);
  maintenanceDueCount.textContent = totalDue;
}

function renderGarageCard(item) {
  const motorcycle = getMotorcycleFromGarageItem(item);
  const garageId = getGarageId(item);

  const card = document.createElement("article");
  card.className = "garage-card";

  card.innerHTML = `
    <div class="garage-card-image-wrap">
      <img class="garage-card-image" src="${motorcycle.imageUrl || motorcycle.image || ""}" alt="${motorcycle.model || "Motorcycle"}">
    </div>

    <div class="garage-card-info">
      <h3>${motorcycle.model || "Saved Motorcycle"}</h3>

      <div class="garage-card-meta">
        <span>${motorcycle.brand || "Unknown Brand"}</span>
        <span>${motorcycle.category || "Unknown Category"}</span>
        <span>${motorcycle.year || "N/A"}</span>
      </div>

      <div class="garage-card-details">
        <div class="garage-card-detail">
          <span>Price</span>
          <strong>${formatPrice(motorcycle.price || item.purchasePrice)}</strong>
        </div>

        <div class="garage-card-detail">
          <span>Mileage</span>
          <strong>${formatMileage(getGarageMileage(item))}</strong>
        </div>

        <div class="garage-card-detail">
          <span>Added</span>
          <strong>${item.addedAt ? new Date(item.addedAt).toLocaleDateString() : "N/A"}</strong>
        </div>
      </div>
    </div>

    <div class="garage-card-actions">
      <a class="garage-card-action" href="maintenance.html?garageId=${garageId}">
        Maintenance
      </a>

      <button class="garage-delete-btn" type="button" data-garage-id="${garageId}">
        Remove
      </button>
    </div>
  `;

  return card;
}

function renderGarage(garageItems) {
  garageList.innerHTML = "";
  garageLoadingState.style.display = "none";
  updateGarageStats(garageItems);

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
