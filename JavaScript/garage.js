const API_BASE_URL = "http://localhost:8080/api";

const garageList = document.getElementById("garageList");
const garageMessage = document.getElementById("garageMessage");
const garageLoadingState = document.getElementById("garageLoadingState");
const garageEmptyState = document.getElementById("garageEmptyState");
const refreshGarageBtn = document.getElementById("refreshGarageBtn");

const totalBikesCount = document.getElementById("totalBikesCount");
const totalMileageCount = document.getElementById("totalMileageCount");
const maintenanceDueCount = document.getElementById("maintenanceDueCount");

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

async function loadGarage() {
  hideGarageMessage();
  garageLoadingState.style.display = "block";
  garageEmptyState.style.display = "none";
  garageList.innerHTML = "";

  try {
    const response = await fetch(`${API_BASE_URL}/garage`);

    if (!response.ok) {
      throw new Error(`Backend returned ${response.status}`);
    }

    const garageItems = await response.json();
    renderGarage(garageItems);
  } catch (error) {
    garageLoadingState.style.display = "none";
    showGarageMessage("Garage could not load. Make sure the Spring Boot backend is running.");
    console.error("Failed to load garage:", error);
  }
}

async function removeGarageItem(garageId) {
  try {
    const response = await fetch(`${API_BASE_URL}/garage/${garageId}`, {
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

garageList.addEventListener("click", (event) => {
  const deleteButton = event.target.closest(".garage-delete-btn");

  if (!deleteButton) {
    return;
  }

  const garageId = deleteButton.dataset.garageId;
  removeGarageItem(garageId);
});

refreshGarageBtn.addEventListener("click", loadGarage);

loadGarage();