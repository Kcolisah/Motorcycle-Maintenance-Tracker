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

const brandAccentMap = {
  Aprilia: "#ff2b2b",
  BMW: "#4aa3ff",
  Ducati: "#ff2b2b",
  Harley: "#ff7a00",
  Honda: "#ff2b2b",
  Indian: "#c0392b",
  Kawasaki: "#22ff00",
  KTM: "#ff7a00",
  Suzuki: "#4aa3ff",
  Triumph: "#ffffff",
  Yamaha: "#4aa3ff"
};

const bikeSpecsMap = {
  "Aprilia RS457": {
    engine: "457cc parallel-twin",
    horsepower: "47 hp",
    weight: "386 lbs",
    zeroSixty: "5.0 seconds",
    topSpeed: "118 mph"
  },
  "Aprilia RS660": {
    engine: "659cc parallel-twin",
    horsepower: "100 hp",
    weight: "403 lbs",
    zeroSixty: "3.8 seconds",
    topSpeed: "149 mph"
  },
  "Aprilia RSV4": {
    engine: "1099cc V4",
    horsepower: "217 hp",
    weight: "445 lbs",
    zeroSixty: "3.1 seconds",
    topSpeed: "180 mph"
  },
  "BMW G310RR": {
    engine: "313cc single-cylinder",
    horsepower: "34 hp",
    weight: "383 lbs",
    zeroSixty: "6.2 seconds",
    topSpeed: "100 mph"
  },
  "BMW F900R": {
    engine: "895cc parallel-twin",
    horsepower: "99 hp",
    weight: "465 lbs",
    zeroSixty: "3.5 seconds",
    topSpeed: "124 mph"
  },
  "BMW S1000RR": {
    engine: "999cc inline-four",
    horsepower: "205 hp",
    weight: "434 lbs",
    zeroSixty: "3.0 seconds",
    topSpeed: "188 mph"
  },
  "BMW M1000RR": {
    engine: "999cc inline-four",
    horsepower: "205 hp",
    weight: "423 lbs",
    zeroSixty: "2.9 seconds",
    topSpeed: "189 mph"
  },
  "Ducati SuperSport 950": {
    engine: "937cc L-twin",
    horsepower: "110 hp",
    weight: "460 lbs",
    zeroSixty: "3.4 seconds",
    topSpeed: "152 mph"
  },
  "Ducati Panigale V2": {
    engine: "955cc V-twin",
    horsepower: "155 hp",
    weight: "441 lbs",
    zeroSixty: "3.2 seconds",
    topSpeed: "170 mph"
  },
  "Ducati Panigale V4": {
    engine: "1103cc V4",
    horsepower: "215 hp",
    weight: "434 lbs",
    zeroSixty: "3.0 seconds",
    topSpeed: "186 mph"
  },
  "Ducati Streetfighter V4": {
    engine: "1103cc V4",
    horsepower: "208 hp",
    weight: "439 lbs",
    zeroSixty: "3.0 seconds",
    topSpeed: "180 mph"
  },
  "Harley Iron 993": {
    engine: "975cc V-twin",
    horsepower: "90 hp",
    weight: "481 lbs",
    zeroSixty: "4.4 seconds",
    topSpeed: "120 mph"
  },
  "Harley Low Rider S": {
    engine: "1923cc V-twin",
    horsepower: "103 hp",
    weight: "679 lbs",
    zeroSixty: "4.1 seconds",
    topSpeed: "120 mph"
  },
  "Harley Sportster S": {
    engine: "1252cc V-twin",
    horsepower: "121 hp",
    weight: "502 lbs",
    zeroSixty: "3.5 seconds",
    topSpeed: "143 mph"
  },
  "Honda CBR 500R": {
    engine: "471cc parallel-twin",
    horsepower: "47 hp",
    weight: "423 lbs",
    zeroSixty: "5.2 seconds",
    topSpeed: "116 mph"
  },
  "Honda CBR 650R": {
    engine: "649cc inline-four",
    horsepower: "94 hp",
    weight: "463 lbs",
    zeroSixty: "3.9 seconds",
    topSpeed: "149 mph"
  },
  "Honda CBR 600RR": {
    engine: "599cc inline-four",
    horsepower: "121 hp",
    weight: "410 lbs",
    zeroSixty: "3.2 seconds",
    topSpeed: "160 mph"
  },
  "Honda CBR 1000RR": {
    engine: "999cc inline-four",
    horsepower: "189 hp",
    weight: "430 lbs",
    zeroSixty: "2.9 seconds",
    topSpeed: "186 mph"
  },
  "Indian Chief": {
    engine: "1890cc V-twin",
    horsepower: "89 hp",
    weight: "670 lbs",
    zeroSixty: "4.2 seconds",
    topSpeed: "115 mph"
  },
  "Indian Scout": {
    engine: "1133cc V-twin",
    horsepower: "100 hp",
    weight: "561 lbs",
    zeroSixty: "3.9 seconds",
    topSpeed: "124 mph"
  },
  "Kawasaki Ninja 500R": {
    engine: "451cc parallel-twin",
    horsepower: "51 hp",
    weight: "377 lbs",
    zeroSixty: "4.5 seconds",
    topSpeed: "118 mph"
  },
  "Kawasaki Ninja 650R": {
    engine: "649cc parallel-twin",
    horsepower: "67 hp",
    weight: "426 lbs",
    zeroSixty: "3.8 seconds",
    topSpeed: "130 mph"
  },
  "Kawasaki Ninja ZX6R": {
    engine: "636cc inline-four",
    horsepower: "127 hp",
    weight: "434 lbs",
    zeroSixty: "3.2 seconds",
    topSpeed: "164 mph"
  },
  "Kawasaki Ninja ZX 10R": {
    engine: "998cc inline-four",
    horsepower: "203 hp",
    weight: "456 lbs",
    zeroSixty: "3.0 seconds",
    topSpeed: "186 mph"
  },
  "Kawasaki-Ninja ZX14R": {
    engine: "1441cc inline-four",
    horsepower: "197 hp",
    weight: "593 lbs",
    zeroSixty: "2.8 seconds",
    topSpeed: "186 mph"
  },
  "Kawasaki Ninja H2": {
    engine: "998cc supercharged inline-four",
    horsepower: "228 hp",
    weight: "526 lbs",
    zeroSixty: "2.7 seconds",
    topSpeed: "209 mph"
  },
  "Kawasaki Ninja H2R": {
    engine: "998cc supercharged inline-four",
    horsepower: "310 hp",
    weight: "476 lbs",
    zeroSixty: "2.5 seconds",
    topSpeed: "240 mph"
  },
  "KTM RC390": {
    engine: "373cc single-cylinder",
    horsepower: "43 hp",
    weight: "379 lbs",
    zeroSixty: "5.1 seconds",
    topSpeed: "105 mph"
  },
  "KTM RC8C": {
    engine: "889cc parallel-twin",
    horsepower: "135 hp",
    weight: "311 lbs",
    zeroSixty: "3.0 seconds",
    topSpeed: "170 mph"
  },
  "Suzuki GSX 250R": {
    engine: "248cc parallel-twin",
    horsepower: "24 hp",
    weight: "392 lbs",
    zeroSixty: "7.8 seconds",
    topSpeed: "90 mph"
  },
  "Suzuki GSX 8R": {
    engine: "776cc parallel-twin",
    horsepower: "82 hp",
    weight: "452 lbs",
    zeroSixty: "3.9 seconds",
    topSpeed: "140 mph"
  },
  "Suzuki GSX 600R": {
    engine: "599cc inline-four",
    horsepower: "124 hp",
    weight: "412 lbs",
    zeroSixty: "3.3 seconds",
    topSpeed: "160 mph"
  },
  "Suzuki GSX 750R": {
    engine: "750cc inline-four",
    horsepower: "148 hp",
    weight: "419 lbs",
    zeroSixty: "3.0 seconds",
    topSpeed: "168 mph"
  },
  "Suzuki GSX 1000R": {
    engine: "999cc inline-four",
    horsepower: "199 hp",
    weight: "443 lbs",
    zeroSixty: "2.9 seconds",
    topSpeed: "186 mph"
  },
  "Suzuki GSX Hayabusa": {
    engine: "1340cc inline-four",
    horsepower: "187 hp",
    weight: "582 lbs",
    zeroSixty: "3.0 seconds",
    topSpeed: "186 mph"
  },
  "Triumph Daytona 660": {
    engine: "660cc inline-three",
    horsepower: "95 hp",
    weight: "443 lbs",
    zeroSixty: "3.9 seconds",
    topSpeed: "143 mph"
  },
  "Triumph Speed Triple_RR": {
    engine: "1160cc inline-three",
    horsepower: "177 hp",
    weight: "438 lbs",
    zeroSixty: "3.1 seconds",
    topSpeed: "170 mph"
  },
  "Triumph Daytona 765": {
    engine: "765cc inline-three",
    horsepower: "128 hp",
    weight: "410 lbs",
    zeroSixty: "3.4 seconds",
    topSpeed: "160 mph"
  },
  "Triumph Speed Triple 1200 RS": {
    engine: "1160cc inline-three",
    horsepower: "177 hp",
    weight: "437 lbs",
    zeroSixty: "3.1 seconds",
    topSpeed: "170 mph"
  },
  "Yamaha R3": {
    engine: "321cc parallel-twin",
    horsepower: "42 hp",
    weight: "375 lbs",
    zeroSixty: "5.0 seconds",
    topSpeed: "112 mph"
  },
  "Yamaha R7": {
    engine: "689cc parallel-twin",
    horsepower: "73 hp",
    weight: "414 lbs",
    zeroSixty: "3.9 seconds",
    topSpeed: "145 mph"
  },
  "Yamaha R6": {
    engine: "599cc inline-four",
    horsepower: "117 hp",
    weight: "419 lbs",
    zeroSixty: "3.3 seconds",
    topSpeed: "160 mph"
  },
  "Yamaha R1": {
    engine: "998cc inline-four",
    horsepower: "198 hp",
    weight: "448 lbs",
    zeroSixty: "2.9 seconds",
    topSpeed: "186 mph"
  }
};

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
        alert("This motorcycle is already in your garage, or your garage is full.");
      }

      return true;
    }

    if (!response.ok) {
      throw new Error(`Backend returned ${response.status}`);
    }

    if (showSuccessMessage) {
      alert(`${currentBike.model} added to garage.`);
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
      addToGarageBtn.textContent = "ADD TO GARAGE +";
    }
  }
}

if (maintainBtn) {
  maintainBtn.addEventListener("click", async () => {
    const bikeWasSaved = await addCurrentBikeToGarage(false);

    if (bikeWasSaved) {
      window.location.href = "garage.html";
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
