const garageList = document.getElementById("garageList");
const garageMessage = document.getElementById("garageMessage");
const garageLoadingState = document.getElementById("garageLoadingState");
const garageEmptyState = document.getElementById("garageEmptyState");
const refreshGarageBtn = document.getElementById("refreshGarageBtn");

const totalBikesCount = document.getElementById("totalBikesCount");
const totalMileageCount = document.getElementById("totalMileageCount");
const maintenanceDueCount = document.getElementById("maintenanceDueCount");

const GARAGE_LOGIN_REDIRECT = `login.html?redirect=${encodeURIComponent("garage.html")}`;

function getApi() {
  return window.MotorcycleTrackerApi || null;
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForApiClient(timeout = 1800) {
  const startedAt = Date.now();

  while (!getApi() && Date.now() - startedAt < timeout) {
    await wait(50);
  }

  return getApi();
}

async function waitForGarageSession(timeout = 1800) {
  const api = await waitForApiClient(timeout);

  if (!api) {
    return null;
  }

  const startedAt = Date.now();

  while (!api.getToken() && Date.now() - startedAt < timeout) {
    await wait(50);
  }

  return api.getToken() ? api : null;
}

function formatPrice(price) {
  if (price === null || price === undefined) {
    return "N/A";
  }

  return `$${Number(price).toLocaleString()}`;
}

function formatMileage(mileage) {
  if (mileage === null || mileage === undefined) {
    return "0 mi";
  }

  return `${Number(mileage).toLocaleString()} mi`;
}

function showGarageMessage(message) {
  garageMessage.textContent = message;
  garageMessage.style.display = "block";
}

function hideGarageMessage() {
  garageMessage.textContent = "";
  garageMessage.style.display = "none";
}

function getMotorcycleFromGarageItem(item) {
  return item.motorcycle || item.bike || item;
}

function getGarageMileage(item) {
  return item.currentMileage || item.mileage || 0;
}

function getGarageId(item) {
  return item.id || item.garageId;
}

function updateGarageStats(garageItems) {
  const totalBikes = garageItems.length;
  const totalMileage = garageItems.reduce((sum, item) => {
    return sum + Number(getGarageMileage(item) || 0);
  }, 0);

  totalBikesCount.textContent = totalBikes;
  totalMileageCount.textContent = formatMileage(totalMileage);
  maintenanceDueCount.textContent = "0";
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

  garageItems.forEach((item) => {
    garageList.appendChild(renderGarageCard(item));
  });
}

async function requestGarageWithRetry(api, path, options = {}, retries = 1) {
  const response = await api.apiRequest(path, options);

  if (response.ok || retries <= 0) {
    return response;
  }

  await wait(350);
  return api.apiRequest(path, options);
}

async function loadGarage() {
  hideGarageMessage();
  garageLoadingState.style.display = "block";
  garageEmptyState.style.display = "none";
  garageList.innerHTML = "";

  const api = await waitForGarageSession();

  if (!api) {
    garageLoadingState.style.display = "none";
    showGarageMessage("Sign in again to load your garage.");
    window.location.href = GARAGE_LOGIN_REDIRECT;
    return;
  }

  try {
    const response = await requestGarageWithRetry(api, "/api/garage");

    if (!response.ok) {
      throw new Error(`Backend returned ${response.status}`);
    }

    const garageItems = await response.json();
    renderGarage(garageItems);

    if (typeof window.loadGarageBadgeCount === "function") {
      window.loadGarageBadgeCount();
    }
  } catch (error) {
    garageLoadingState.style.display = "none";
    showGarageMessage("Garage could not load. Try refresh once, then sign in again if it still fails.");
    console.error("Failed to load garage:", error);
  }
}

async function removeGarageItem(garageId) {
  const api = await waitForGarageSession();

  if (!api) {
    showGarageMessage("Sign in again before removing motorcycles from your garage.");
    window.location.href = GARAGE_LOGIN_REDIRECT;
    return;
  }

  try {
    const response = await requestGarageWithRetry(api, `/api/garage/${garageId}`, {
      method: "DELETE"
    });

    if (!response.ok) {
      throw new Error(`Backend returned ${response.status}`);
    }

    await loadGarage();
  } catch (error) {
    showGarageMessage("Could not remove this motorcycle from the garage.");
    console.error("Failed to remove garage item:", error);
  }
}

if (garageList) {
  garageList.addEventListener("click", (event) => {
    const deleteButton = event.target.closest(".garage-delete-btn");

    if (!deleteButton) {
      return;
    }

    const garageId = deleteButton.dataset.garageId;
    removeGarageItem(garageId);
  });
}

if (refreshGarageBtn) {
  refreshGarageBtn.addEventListener("click", loadGarage);
}

document.addEventListener("DOMContentLoaded", loadGarage);
