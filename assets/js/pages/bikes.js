const addToGarageBtn = document.getElementById("addToGarageBtn");
const featuredBikeImage = document.getElementById("featuredBikeImage");
const featuredBikeCaption = document.getElementById("featuredBikeCaption");
const brandLine = document.getElementById("brandLine");
const seriesLine = document.getElementById("seriesLine");
const miniBrand = document.getElementById("miniBrand");
const miniCategory = document.getElementById("miniCategory");
const specEngine = document.getElementById("specEngine");
const specHorsepower = document.getElementById("specHorsepower");
const specWeight = document.getElementById("specWeight");
const specZeroSixty = document.getElementById("specZeroSixty");
const specTopSpeed = document.getElementById("specTopSpeed");
const summaryBrand = document.getElementById("summaryBrand");
const summaryCategory = document.getElementById("summaryCategory");
const summaryYear = document.getElementById("summaryYear");
const summaryPrice = document.getElementById("summaryPrice");
const currentIndex = document.getElementById("currentIndex");
const totalCount = document.getElementById("totalCount");
const previewList = document.getElementById("previewList");
const maintainBtn = document.getElementById("maintainBtn");
const backToHomeBtn = document.getElementById("backToHomeBtn");
const bikePageDots = document.getElementById("bike-page-dots");
const bikeNextActionPanel = document.getElementById("bikeNextActionPanel");

const brandAccentMap = window.MT_BRAND_ACCENT_MAP || {};

const bikeSpecsMap = window.MT_BIKE_SPECS_MAP || {};

function getAccentColor(brand) {
  return brandAccentMap[brand] || "#ff2b2b";
}

function getBikeSpecs(bike) {
  return bikeSpecsMap[bike.model] || {
    engine: "Not added yet",
    horsepower: "Not added yet",
    weight: "Not added yet",
    zeroSixty: "Not added yet",
    topSpeed: "Not added yet"
  };
}

function formatPrice(price) {
  return price.toLocaleString();
}

function setAccentColor(color) {
  document.documentElement.style.setProperty("--brand-accent", color);
}


function hideBikeNextActions() {
  if (!bikeNextActionPanel) {
    return;
  }

  bikeNextActionPanel.hidden = true;
  bikeNextActionPanel.innerHTML = "";
}

function showBikeNextActions(status = "saved") {
  if (!bikeNextActionPanel || !currentBike) {
    return;
  }

  const alreadySaved = status === "already-saved";
  const title = alreadySaved ? "This bike is already in your garage" : "Bike saved to your garage";
  const copy = alreadySaved
    ? "Open your garage to manage it, start a maintenance board, or compare it against another motorcycle."
    : "Next, turn this selection into something useful: open your garage, start service tracking, or compare your next bike.";

  bikeNextActionPanel.hidden = false;
  bikeNextActionPanel.innerHTML = `
    <div class="bike-next-action-copy">
      <span>${alreadySaved ? "Garage Ready" : "Saved"}</span>
      <strong>${title}</strong>
      <p>${copy}</p>
    </div>
    <div class="bike-next-action-buttons">
      <button type="button" data-bike-next="garage">View Garage</button>
      <button type="button" data-bike-next="maintenance">Start Maintenance</button>
      <button type="button" data-bike-next="compare">Compare</button>
    </div>
  `;
}

function handleBikeNextAction(action) {
  if (action === "garage") {
    window.location.href = "garage.html";
    return;
  }

  if (action === "maintenance") {
    window.location.href = "maintenance.html";
    return;
  }

  if (action === "compare") {
    window.location.href = "compare.html";
  }
}


function getSelectedBike() {
  const storedBikeModel = localStorage.getItem("selectedBikeModel");
  const storedBrand = localStorage.getItem("selectedBrand");
  const storedCategory = localStorage.getItem("selectedCategory");

  if (storedBikeModel) {
    const exactBike = motorcycles.find((bike) => bike.model === storedBikeModel);
    if (exactBike) {
      return exactBike;
    }
  }

  if (storedBrand && storedCategory) {
    const firstMatchingBike = motorcycles.find(
      (bike) => bike.brand === storedBrand && bike.category === storedCategory
    );
    if (firstMatchingBike) {
      return firstMatchingBike;
    }
  }

  return motorcycles.find((bike) => bike.brand === "Honda" && bike.category === "SuperSport") || motorcycles[0];
}

let currentBike = null;

function getRelatedBikes() {
  return motorcycles.filter(
    (bike) =>
      bike.brand === currentBike.brand &&
      bike.category === currentBike.category
  );
}

function renderBikeDots(relatedBikes) {
  if (!bikePageDots) {
    return;
  }

  bikePageDots.innerHTML = "";

  relatedBikes.forEach((bike, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "dot-line";

    if (bike.id === currentBike.id) {
      dot.classList.add("active");
    }

    dot.setAttribute("aria-label", `View ${bike.model}`);

    dot.addEventListener("click", () => {
      currentBike = bike;
      localStorage.setItem("selectedBikeModel", bike.model);
      renderBike();
    });

    bikePageDots.appendChild(dot);
  });
}

function renderPreviews() {
  const relatedBikes = getRelatedBikes();
  previewList.innerHTML = "";

  relatedBikes.forEach((bike) => {
    const card = document.createElement("button");
    card.className = "bikes-preview-card";
    card.type = "button";

    if (bike.id === currentBike.id) {
      card.classList.add("active");
    }

    const img = document.createElement("img");
    img.src = bike.image;
    img.alt = bike.model;

    const label = document.createElement("span");
    label.textContent = bike.model;

    card.appendChild(img);
    card.appendChild(label);

    card.addEventListener("click", () => {
      currentBike = bike;
      localStorage.setItem("selectedBikeModel", bike.model);
      renderBike();
    });

    previewList.appendChild(card);
  });

  const currentPosition = relatedBikes.findIndex((bike) => bike.id === currentBike.id);
  currentIndex.textContent = String(currentPosition + 1).padStart(2, "0");
  totalCount.textContent = String(relatedBikes.length).padStart(2, "0");
  renderBikeDots(relatedBikes);
}

function renderBike() {
  const specs = getBikeSpecs(currentBike);

  setAccentColor(getAccentColor(currentBike.brand));

  featuredBikeImage.src = currentBike.image;
  featuredBikeImage.alt = currentBike.model;
  featuredBikeCaption.textContent = currentBike.model;

  brandLine.textContent = currentBike.brand.toUpperCase();
  seriesLine.textContent = currentBike.model.replace(`${currentBike.brand} `, "").toUpperCase();

  miniBrand.textContent = currentBike.brand;
  miniCategory.textContent = currentBike.category;

  specEngine.textContent = `Engine: ${specs.engine}`;
  specHorsepower.textContent = `Horsepower: ${specs.horsepower}`;
  specWeight.textContent = `Weight: ${specs.weight}`;
  specZeroSixty.textContent = `0–60 mph: ${specs.zeroSixty}`;
  specTopSpeed.textContent = `Top Speed: ${specs.topSpeed}`;

  summaryBrand.textContent = currentBike.brand;
  summaryCategory.textContent = currentBike.category;
  summaryYear.textContent = currentBike.year;
  summaryPrice.textContent = formatPrice(currentBike.price);

  renderPreviews();
  hideBikeNextActions();
}

async function addCurrentBikeToGarage(showSuccessMessage = true) {
  if (!currentBike || !currentBike.id) {
    alert("No motorcycle selected.");
    return false;
  }

  if (addToGarageBtn) {
    addToGarageBtn.disabled = true;
    addToGarageBtn.textContent = "ADDING...";
  }

  try {
    const mileageInput = prompt("Enter current mileage for this motorcycle:", "0");

    if (mileageInput === null) {
      return false;
    }

    const currentMileage = Number(mileageInput);

    if (Number.isNaN(currentMileage) || currentMileage < 0) {
      alert("Please enter a valid mileage number.");
      return false;
    }

    const response = await fetch(
      `https://api.olysa.app/api/garage/${currentBike.id}?currentMileage=${currentMileage}`,
      {
        method: "POST"
      }
    );

    if (response.status === 409) {
      if (showSuccessMessage) {
        showBikeNextActions("already-saved");
      }

      return true;
    }

    if (!response.ok) {
      throw new Error(`Backend returned ${response.status}`);
    }

    if (showSuccessMessage) {
      showBikeNextActions("saved");
    }

    if (typeof window.loadGarageBadgeCount === "function") {
      window.loadGarageBadgeCount();
    }

    return true;
  } catch (error) {
    console.error("Failed to add motorcycle to garage:", error);
    alert("Could not add motorcycle to garage. Make sure the backend is running.");
    return false;
  } finally {
    if (addToGarageBtn) {
      addToGarageBtn.disabled = false;
      addToGarageBtn.textContent = "SAVE TO GARAGE +";
    }
  }
}

if (maintainBtn) {
  maintainBtn.addEventListener("click", async () => {
    const bikeWasSaved = await addCurrentBikeToGarage(false);

    if (bikeWasSaved) {
      window.location.href = "maintenance.html";
    }
  });
}

if (backToHomeBtn) {
  backToHomeBtn.addEventListener("click", () => {
    localStorage.setItem("restoreTrackerState", "true");
    window.location.href = "index.html#tracker-preview";
  });
}

function initializeBikePage() {
  if (typeof loadMotorcyclesFromApi === "function") {
    loadMotorcyclesFromApi().finally(() => {
      currentBike = getSelectedBike();
      renderBike();
    });

    return;
  }

  currentBike = getSelectedBike();
  renderBike();
}

if (addToGarageBtn) {
  addToGarageBtn.addEventListener("click", () => {
    addCurrentBikeToGarage(true);
  });
}

initializeBikePage();
