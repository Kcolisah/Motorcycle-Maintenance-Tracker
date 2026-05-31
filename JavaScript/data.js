let motorcycles = [
  { id: 1, brand: "Aprilia", category: "Sport", model: "Aprilia RS457", year: 2026, price: 6799, image: "images/Aprilia/Sport/Aprilia_RS457.png" },
  { id: 2, brand: "Aprilia", category: "Sport", model: "Aprilia RS660", year: 2026, price: 11299, image: "images/Aprilia/Sport/Aprilia_RS660.png" },
  { id: 3, brand: "Aprilia", category: "SuperSport", model: "Aprilia RSV4", year: 2026, price: 18999, image: "images/Aprilia/SuperSport/Aprilia_RSV4.png" },

  { id: 4, brand: "BMW", category: "Sport", model: "BMW G310RR", year: 2026, price: 4000, image: "images/BMW/Sport/BMW_G310RR.png" },
  { id: 5, brand: "BMW", category: "Sport", model: "BMW F900R", year: 2026, price: 8995, image: "images/BMW/Sport/BMW_F900R.png" },
  { id: 6, brand: "BMW", category: "SuperSport", model: "BMW S1000RR", year: 2026, price: 26405, image: "images/BMW/SuperSport/BMW_S1000RR.png" },
  { id: 7, brand: "BMW", category: "HyperSport", model: "BMW M1000RR", year: 2026, price: 35000, image: "images/BMW/HyperSport/BMW_M1000RR.png" },

  { id: 8, brand: "Ducati", category: "Sport", model: "Ducati SuperSport 950", year: 2026, price: 18395, image: "images/Ducati/Sport/Ducati_SuperSport_950.png" },
  { id: 9, brand: "Ducati", category: "SuperSport", model: "Ducati Panigale V2", year: 2026, price: 16995, image: "images/Ducati/SuperSport/Ducati_Panigale_V2.png" },
  { id: 10, brand: "Ducati", category: "SuperSport", model: "Ducati Panigale V4", year: 2026, price: 27795, image: "images/Ducati/SuperSport/Ducati_Panigale_V4.png" },
  { id: 11, brand: "Ducati", category: "HyperSport", model: "Ducati Streetfighter V4", year: 2026, price: 29295, image: "images/Ducati/HyperSport/Ducati_Streetfighter_V4.png" },

  { id: 12, brand: "Harley", category: "Cruiser", model: "Harley Iron 993", year: 2026, price: 10499, image: "images/Harley/Cruiser/Harley_Iron_993.png" },
  { id: 13, brand: "Harley", category: "Cruiser", model: "Harley Low Rider S", year: 2026, price: 18999, image: "images/Harley/Cruiser/Harley_Low_Rider_S.png" },
  { id: 14, brand: "Harley", category: "Cruiser", model: "Harley Sportster S", year: 2026, price: 15999, image: "images/Harley/Cruiser/Harley_Sportster_S.png" },

  { id: 15, brand: "Honda", category: "Sport", model: "Honda CBR 500R", year: 2026, price: 6399, image: "images/Honda/Sport/Honda_CBR_500R.png" },
  { id: 16, brand: "Honda", category: "Sport", model: "Honda CBR 650R", year: 2026, price: 9799, image: "images/Honda/Sport/Honda_CBR_650R.png" },
  { id: 17, brand: "Honda", category: "SuperSport", model: "Honda CBR 600RR", year: 2026, price: 12499, image: "images/Honda/SuperSport/Honda_CBR_600RR.png" },
  { id: 18, brand: "Honda", category: "SuperSport", model: "Honda CBR 1000RR", year: 2026, price: 16999, image: "images/Honda/SuperSport/Honda_CBR_1000RR.png" },

  { id: 19, brand: "Indian", category: "Cruiser", model: "Indian Chief", year: 2026, price: 14999, image: "images/Indian/Cruiser/Indian_Chief.png" },
  { id: 20, brand: "Indian", category: "Cruiser", model: "Indian Scout", year: 2026, price: 12999, image: "images/Indian/Cruiser/Indian_Scout.png" },

  { id: 21, brand: "Kawasaki", category: "Sport", model: "Kawasaki Ninja 500R", year: 2026, price: 5399, image: "images/Kawasaki/Sport/Kawasaki_Ninja_500R.png" },
  { id: 22, brand: "Kawasaki", category: "Sport", model: "Kawasaki Ninja 650R", year: 2026, price: 7599, image: "images/Kawasaki/Sport/Kawasaki_Ninja_650R.png" },
  { id: 23, brand: "Kawasaki", category: "SuperSport", model: "Kawasaki Ninja ZX6R", year: 2026, price: 11599, image: "images/Kawasaki/SuperSport/Kawasaki_Ninja_ZX_6R.png" },
  { id: 24, brand: "Kawasaki", category: "SuperSport", model: "Kawasaki Ninja ZX 10R", year: 2026, price: 16999, image: "images/Kawasaki/SuperSport/Kawasaki_Ninja_ZX_10R.png" },
  { id: 25, brand: "Kawasaki", category: "HyperSport", model: "Kawasaki-Ninja ZX14R", year: 2025, price: 17599, image: "images/Kawasaki/HyperSport/Kawasaki_Ninja_ZX_14R.png" },
  { id: 26, brand: "Kawasaki", category: "HyperSport", model: "Kawasaki Ninja H2", year: 2026, price: 34400, image: "images/Kawasaki/HyperSport/Kawasaki_Ninja_H2.png" },
  { id: 27, brand: "Kawasaki", category: "HyperSport", model: "Kawasaki Ninja H2R", year: 2026, price: 62100, image: "images/Kawasaki/HyperSport/Kawasaki_Ninja_H2R.png" },

  { id: 28, brand: "KTM", category: "Sport", model: "KTM RC390", year: 2026, price: 5899, image: "images/KTM/Sport/KTM_RC390.png" },
  { id: 29, brand: "KTM", category: "HyperSport", model: "KTM RC8C", year: 2026, price: 41499, image: "images/KTM/HyperSport/KTM_RC8C.png" },

  { id: 30, brand: "Suzuki", category: "Sport", model: "Suzuki GSX 250R", year: 2026, price: 5149, image: "images/Suzuki/Sport/Suzuki_GSX_250R.png" },
  { id: 31, brand: "Suzuki", category: "Sport", model: "Suzuki GSX 8R", year: 2026, price: 9699, image: "images/Suzuki/Sport/Suzuki_GSX_8R.png" },
  { id: 32, brand: "Suzuki", category: "SuperSport", model: "Suzuki GSX 600R", year: 2026, price: 12199, image: "images/Suzuki/SuperSport/Suzuki_GSX_600R.png" },
  { id: 33, brand: "Suzuki", category: "SuperSport", model: "Suzuki GSX 750R", year: 2026, price: 13249, image: "images/Suzuki/SuperSport/Suzuki_GSX_750R.png" },
  { id: 34, brand: "Suzuki", category: "SuperSport", model: "Suzuki GSX 1000R", year: 2026, price: 18645, image: "images/Suzuki/SuperSport/Suzuki_GSX_1000R.png" },
  { id: 35, brand: "Suzuki", category: "HyperSport", model: "Suzuki GSX Hayabusa", year: 2026, price: 19499, image: "images/Suzuki/HyperSport/Suzuki_GSX_Hayabusa.png" },

  { id: 36, brand: "Triumph", category: "Sport", model: "Triumph Daytona 660", year: 2026, price: 9395, image: "images/Triumph/Sport/Triumph_Daytona_660.png" },
  { id: 37, brand: "Triumph", category: "Sport", model: "Triumph Speed Triple_RR", year: 2026, price: 21495, image: "images/Triumph/Sport/Triumph_Speed_Triple_RR.png" },
  { id: 38, brand: "Triumph", category: "SuperSport", model: "Triumph Daytona 765", year: 2026, price: 9395, image: "images/Triumph/SuperSport/Triumph_Daytona_765.png" },
  { id: 39, brand: "Triumph", category: "SuperSport", model: "Triumph Speed Triple 1200 RS", year: 2026, price: 21545, image: "images/Triumph/SuperSport/Triumph_Speed_Triple_1200_RS.png" },

  { id: 40, brand: "Yamaha", category: "Sport", model: "Yamaha R3", year: 2026, price: 5499, image: "images/Yamaha/Sport/Yamaha_R3.png" },
  { id: 41, brand: "Yamaha", category: "Sport", model: "Yamaha R7", year: 2026, price: 9399, image: "images/Yamaha/Sport/Yamaha_R7.png" },
  { id: 42, brand: "Yamaha", category: "SuperSport", model: "Yamaha R6", year: 2026, price: 13499, image: "images/Yamaha/SuperSport/Yamaha_R6.png" },
  { id: 43, brand: "Yamaha", category: "SuperSport", model: "Yamaha R1", year: 2026, price: 19199, image: "images/Yamaha/SuperSport/Yamaha_R1.png" }
];

const MOTORCYCLE_API_BASE_URL = "https://api.olysa.app/api";

function filterByBrand(bikes, brand) {
  return bikes.filter((bike) => bike.brand === brand);
}

function filterByCategory(bikes, category) {
  return bikes.filter((bike) => bike.category === category);
}

function filterByBrandAndCategory(bikes, brand, category) {
  return bikes.filter((bike) => bike.brand === brand && bike.category === category);
}

let selectedBrand = "";
let selectedCategory = "";
let selectedMotorcycle = null;
let currentBikeIndex = 0;
let currentFilteredBikes = [];
let heroBrandStartIndex = 0;
let heroStage = "home";

function setHeroStage(stage) {
  heroStage = stage;

  if (homePageShell) {
    homePageShell.dataset.heroStage = stage;
  }
}

const heroBrandsPerPage = 4;

const brandContainer = document.getElementById("brand-container");
const categoryContainer = document.getElementById("category-container");
const categoryButtonRow = document.getElementById("category-button-row");
const bikeResults = document.getElementById("bike-results");

const selectMotorcycleBtn = document.getElementById("select-motorcycle-btn");
const backHomeBtn = document.getElementById("back-home-btn");

const heroDefaultLeft = document.getElementById("hero-default-left");
const heroBrandLeft = document.getElementById("hero-brand-left");
const heroBikeStage = document.getElementById("hero-bike-stage");
const heroBrandStage = document.getElementById("hero-brand-stage");
const heroCategoryStage = document.getElementById("hero-category-stage");
const heroMotorcycleStage = document.getElementById("hero-motorcycle-stage");

const heroBrandGrid = document.getElementById("hero-brand-grid");
const heroBrandPrev = document.getElementById("hero-brand-prev");
const heroBrandNext = document.getElementById("hero-brand-next");
const heroCounterNext = document.getElementById("hero-counter-next");
const heroPageDotsWrap = document.getElementById("hero-page-dots");
const heroPageDots = document.querySelectorAll("#hero-page-dots .dot-line");
const heroCounterBox = document.getElementById("hero-counter-box");

const heroCategoryGrid = document.getElementById("hero-category-grid");
const heroCategoryBack = document.getElementById("hero-category-back");
const heroMotorcycleGrid = document.getElementById("hero-motorcycle-grid");
const heroMotorcycleBack = document.getElementById("hero-motorcycle-back");

const trackerSection = document.getElementById("tracker-preview");

const currentCount = document.getElementById("current-count");
const dividerCount = document.getElementById("divider-count");
const countLabel = document.getElementById("count-label");

const specTitle = document.getElementById("spec-title");
const specText = document.getElementById("spec-text");
const specLink = document.getElementById("spec-link");

const heroStageTitle = document.getElementById("hero-stage-title");
const heroStageDescription = document.getElementById("hero-stage-description");
const heroOpenTrackerLink = document.getElementById("hero-open-tracker-link");

const topHomeLink = document.getElementById("top-home-link");
const sideHomeLink = document.getElementById("side-home-link");
const revealSections = document.querySelectorAll(".reveal-section");
const homePageShell = document.getElementById("home-page-shell");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
      }
    });
  },
  {
    threshold: 0.18,
    rootMargin: "0px 0px -60px 0px"
  }
);

revealSections.forEach((section) => {
  revealObserver.observe(section);
});

const brandLogoMap = {
  Aprilia: "images/Aprilia/Aprilia_Logo.png",
  BMW: "images/BMW/BMW_Logo.png",
  Ducati: "images/Ducati/Ducati_Logo.png",
  Harley: "images/Harley/Harley_Logo.png",
  Honda: "images/Honda/Honda_Logo.png",
  Indian: "images/Indian/Indian_Logo.png",
  Kawasaki: "images/Kawasaki/Kawasaki_Logo.png",
  KTM: "images/KTM/KTM_Logo.png",
  Suzuki: "images/Suzuki/Suzuki_logo.png",
  Triumph: "images/Triumph/Triumph_Logo.png",
  Yamaha: "images/Yamaha/Yamaha_Logo.png"
};

let allBrands = [...new Set(motorcycles.map((bike) => bike.brand))];


function normalizeMotorcycleFromApi(bike) {
  return {
    id: bike.id,
    brand: bike.brand,
    category: bike.category,
    model: bike.model,
    year: bike.year,
    price: bike.price,
    image: bike.imageUrl || bike.image_url || bike.image
  };
}

async function loadMotorcyclesFromApi() {
  try {
    const response = await fetch(`${MOTORCYCLE_API_BASE_URL}/motorcycles`);

    if (!response.ok) {
      throw new Error(`Backend returned ${response.status}`);
    }

    const backendMotorcycles = await response.json();

    motorcycles = backendMotorcycles.map(normalizeMotorcycleFromApi);
    allBrands = [...new Set(motorcycles.map((bike) => bike.brand))];

    console.log("Loaded motorcycles from Spring Boot backend:", motorcycles);
  } catch (error) {
    console.warn("Using static data.js motorcycles because backend was not available:", error);
  }
}

function formatPrice(price) {
  return `$${price.toLocaleString()}`;
}

function smoothScrollToElement(element) {
  if (!element) {
    return;
  }

  element.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

function openBikeShowcase(bike) {
  localStorage.setItem("selectedBrand", bike.brand);
  localStorage.setItem("selectedCategory", bike.category);
  localStorage.setItem("selectedBikeModel", bike.model);
  window.location.href = "bikes.html";
}

function showHeroNavigationUI() {
  if (homePageShell) {
    homePageShell.classList.remove("home-state");
  }

  if (heroCounterBox) {
    heroCounterBox.hidden = false;
  }

  if (heroPageDotsWrap) {
    heroPageDotsWrap.hidden = false;
  }
}

function hideHeroNavigationUI() {
  if (homePageShell) {
    homePageShell.classList.add("home-state");
  }

  if (heroCounterBox) {
    heroCounterBox.hidden = true;
  }

  if (heroPageDotsWrap) {
    heroPageDotsWrap.hidden = true;
  }
}

function clearFadeClasses() {
  [
    heroDefaultLeft,
    heroBrandLeft,
    heroBikeStage,
    heroBrandStage,
    heroCategoryStage,
    heroMotorcycleStage
  ].forEach((element) => {
    if (!element) return;
    element.classList.remove("hero-fade-in", "hero-fade-out");
  });
}

function updateHeroDots() {
  if (!heroPageDots.length) {
    return;
  }

  const pageIndex = Math.floor(heroBrandStartIndex / heroBrandsPerPage);

  heroPageDots.forEach((dot, index) => {
    dot.classList.toggle("active", index === pageIndex);
  });
}

function updateHeroBrandCounter() {
  const shownCount = Math.min(heroBrandStartIndex + heroBrandsPerPage, allBrands.length);
  currentCount.textContent = String(shownCount).padStart(2, "0");
  dividerCount.textContent = `/${String(allBrands.length).padStart(2, "0")}`;
  countLabel.textContent = "BRANDS";
}

function updateHeroBrandNavState() {
  if (heroBrandPrev) {
    heroBrandPrev.disabled = heroBrandStartIndex === 0;
  }

  if (heroBrandNext) {
    heroBrandNext.disabled = heroBrandStartIndex + heroBrandsPerPage >= allBrands.length;
  }

  if (heroCounterNext) {
    heroCounterNext.hidden = false;
    heroCounterNext.disabled = heroBrandStartIndex + heroBrandsPerPage >= allBrands.length;
  }

  updateHeroDots();
}

function setActiveBrandUI(brand) {
  document.querySelectorAll(".brand-card").forEach((card) => {
    const cardBrand = card.getAttribute("onclick")?.match(/'([^']+)'/)?.[1];
    card.classList.toggle("active", cardBrand === brand);
  });
}

function setActiveHeroBrandCard(brand) {
  document.querySelectorAll(".hero-brand-card").forEach((card) => {
    card.classList.toggle("active", card.dataset.brand === brand);
  });
}

function setActiveCategoryUI(category) {
  if (!categoryContainer) {
    return;
  }

  categoryContainer.querySelectorAll("button").forEach((button) => {
    button.classList.toggle("active", button.textContent.trim() === category);
  });
}

function renderTrackerCategories(brand) {
  if (!categoryButtonRow) {
    return;
  }

  const categories = getAvailableCategoriesForBrand(brand);
  categoryButtonRow.innerHTML = "";

  categories.forEach((category) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = category;
    button.addEventListener("click", () => {
      selectCategory(category);
    });
    categoryButtonRow.appendChild(button);
  });
}

function getAvailableCategoriesForBrand(brand) {
  return [...new Set(
    motorcycles
      .filter((bike) => bike.brand === brand)
      .map((bike) => bike.category)
  )];
}

function renderHeroBrands() {
  if (!heroBrandGrid) {
    return;
  }

  heroBrandGrid.innerHTML = "";

  const visibleBrands = allBrands.slice(heroBrandStartIndex, heroBrandStartIndex + heroBrandsPerPage);

  visibleBrands.forEach((brand) => {
    const button = document.createElement("button");
    button.className = "hero-brand-card";
    button.type = "button";
    button.dataset.brand = brand;

    button.innerHTML = `
      <img src="${brandLogoMap[brand] || ""}" alt="${brand}">
      <span>${brand}</span>
    `;

    button.addEventListener("click", () => {
      selectBrand(brand, { skipScroll: true });
      setActiveHeroBrandCard(brand);
      enterHeroCategoryMode(brand);
    });

    heroBrandGrid.appendChild(button);
  });

  updateHeroBrandCounter();
  updateHeroBrandNavState();
}

function renderHeroCategories(brand) {
  if (!heroCategoryGrid) {
    return;
  }

  const categories = getAvailableCategoriesForBrand(brand);
  heroCategoryGrid.innerHTML = "";

  categories.forEach((category) => {
    const button = document.createElement("button");
    button.className = "hero-category-card";
    button.type = "button";
    button.textContent = category;

    button.addEventListener("click", () => {
      selectedCategory = category;
      selectCategory(category, { skipScroll: true });
      enterHeroMotorcycleMode(brand, category);
    });

    heroCategoryGrid.appendChild(button);
  });
}

function renderHeroMotorcycles(brand, category) {
  if (!heroMotorcycleGrid) {
    return;
  }

  const bikes = filterByBrandAndCategory(motorcycles, brand, category);
  heroMotorcycleGrid.innerHTML = "";

  bikes.forEach((bike) => {
    const button = document.createElement("button");
    button.className = "hero-motorcycle-card";
    button.type = "button";

    button.innerHTML = `
      <img src="${bike.image}" alt="${bike.model}">
      <span>${bike.model}</span>
    `;

    button.addEventListener("click", () => {
      selectedMotorcycle = bike;
      document.querySelectorAll(".hero-motorcycle-card").forEach((card) => card.classList.remove("active"));
      button.classList.add("active");
      openBikeShowcase(bike);
    });

    heroMotorcycleGrid.appendChild(button);
  });
}

function showNextHeroBrands() {
  if (heroBrandStartIndex + heroBrandsPerPage < allBrands.length) {
    heroBrandStartIndex += heroBrandsPerPage;
    renderHeroBrands();
  }
}

function showPrevHeroBrands() {
  if (heroBrandStartIndex - heroBrandsPerPage >= 0) {
    heroBrandStartIndex -= heroBrandsPerPage;
    renderHeroBrands();
  }
}

function updateRightPanelForBrandMode() {
  heroStageTitle.innerHTML = "SELECT YOUR<br>BRAND";
  heroStageDescription.textContent = "Browse all motorcycle brands directly from the homepage. Move through the list without scrolling, then continue into categories and motorcycles.";

  specTitle.textContent = "Brand Selection";
  specText.textContent = "Browse all available motorcycle brands directly from the homepage. Use the arrows to move through the full list without leaving the hero section.";
  specLink.textContent = "OPEN TRACKER";
  specLink.setAttribute("href", "#tracker-preview");
  heroOpenTrackerLink.textContent = "Open Full Tracker";
}

function enterHeroBrandMode() {
  setHeroStage("brand");
  showHeroNavigationUI();
  clearFadeClasses();

  heroDefaultLeft.classList.add("hero-fade-out");
  heroBikeStage.classList.add("hero-fade-out");

  setTimeout(() => {
    heroDefaultLeft.hidden = true;
    heroBikeStage.hidden = true;

    heroBrandLeft.hidden = false;
    heroBrandStage.hidden = false;
    heroCategoryStage.hidden = true;
    heroMotorcycleStage.hidden = true;

    heroBrandStartIndex = 0;
    renderHeroBrands();
    updateRightPanelForBrandMode();

    heroBrandLeft.classList.add("hero-fade-in");
    heroBrandStage.classList.add("hero-fade-in");

    if (trackerSection) {
      trackerSection.hidden = true;
    }
  }, 260);
}

function enterHeroCategoryMode(brand) {
  setHeroStage("category");
  clearFadeClasses();

  heroBrandStage.classList.add("hero-fade-out");

  setTimeout(() => {
    heroBrandStage.hidden = true;
    heroCategoryStage.hidden = false;

    renderHeroCategories(brand);
    heroCategoryStage.classList.add("hero-fade-in");

    heroStageTitle.innerHTML = `${brand.toUpperCase()}<br>CATEGORIES`;
    heroStageDescription.textContent = `Choose one of the available categories for ${brand}. Only valid categories for this brand are shown.`;

    specTitle.textContent = `${brand} Selected`;
    specText.textContent = `Choose one of the available categories for ${brand}. Only valid categories for this brand are shown.`;
    specLink.textContent = `CONTINUE WITH ${brand.toUpperCase()}`;
    specLink.setAttribute("href", "#tracker-preview");
    heroOpenTrackerLink.textContent = "Open Full Tracker";
  }, 220);
}

function enterHeroMotorcycleMode(brand, category) {
  setHeroStage("motorcycle");
  clearFadeClasses();

  heroCategoryStage.classList.add("hero-fade-out");

  setTimeout(() => {
    heroCategoryStage.hidden = true;
    heroMotorcycleStage.hidden = false;

    renderHeroMotorcycles(brand, category);
    heroMotorcycleStage.classList.add("hero-fade-in");

    heroStageTitle.innerHTML = `${brand.toUpperCase()}<br>${category.toUpperCase()}`;
    heroStageDescription.textContent = `Select one of the available ${category} motorcycles for ${brand}. Click any bike to open its full showcase page.`;

    specTitle.textContent = `${brand} ${category}`;
    specText.textContent = `Select one of the available ${category} motorcycles for ${brand}. Click any bike to open its full showcase page.`;
    specLink.textContent = `VIEW ${brand.toUpperCase()} ${category.toUpperCase()}`;
    specLink.setAttribute("href", "#tracker-preview");
    heroOpenTrackerLink.textContent = "Open Full Tracker";
  }, 220);
}

function resetToHomeState() {
  setHeroStage("home");
  selectedBrand = "";
  selectedCategory = "";
  selectedMotorcycle = null;
  currentFilteredBikes = [];
  currentBikeIndex = 0;
  heroBrandStartIndex = 0;

  clearFadeClasses();

  heroDefaultLeft.hidden = false;
  heroBikeStage.hidden = false;

  heroBrandLeft.hidden = true;
  heroBrandStage.hidden = true;
  heroCategoryStage.hidden = true;
  heroMotorcycleStage.hidden = true;

  hideHeroNavigationUI();

  specTitle.textContent = "Homepage Goal";
  specText.textContent = "This first screen acts as the front page of the project. The user lands here first, then moves into the tracker to choose a brand, category, and eventually see filtered results.";
  specLink.textContent = "ENTER TRACKER";
  specLink.setAttribute("href", "#tracker-preview");

  heroStageTitle.innerHTML = "SELECT YOUR<br>BRAND";
  heroStageDescription.textContent = "Browse all motorcycle brands directly from the homepage. Move through the list without scrolling, then continue into categories and motorcycles.";
  heroOpenTrackerLink.textContent = "Open Full Tracker";

  if (trackerSection) {
    trackerSection.hidden = false;
  }

  if (categoryContainer) {
    categoryContainer.hidden = true;
  }

  if (categoryButtonRow) {
    categoryButtonRow.innerHTML = "";
  }

  if (bikeResults) {
    bikeResults.innerHTML = "";
  }

  document.querySelectorAll(".brand-card").forEach((card) => card.classList.remove("active"));
  document.querySelectorAll(".hero-brand-card").forEach((card) => card.classList.remove("active"));
  document.querySelectorAll(".hero-category-card").forEach((card) => card.classList.remove("active"));
  document.querySelectorAll(".hero-motorcycle-card").forEach((card) => card.classList.remove("active"));

  heroPageDots.forEach((dot, index) => {
    dot.classList.toggle("active", index === 0);
  });
}

function handleBackAction() {
  if (heroStage === "motorcycle") {
    setHeroStage("category");
    clearFadeClasses();

    heroMotorcycleStage.classList.add("hero-fade-out");

    setTimeout(() => {
      heroMotorcycleStage.hidden = true;
      heroCategoryStage.hidden = false;
      heroCategoryStage.classList.add("hero-fade-in");

      heroStageTitle.innerHTML = `${selectedBrand.toUpperCase()}<br>CATEGORIES`;
      heroStageDescription.textContent = `Choose one of the available categories for ${selectedBrand}. Only valid categories for this brand are shown.`;

      specTitle.textContent = `${selectedBrand} Selected`;
      specText.textContent = `Choose one of the available categories for ${selectedBrand}. Only valid categories for this brand are shown.`;
      specLink.textContent = `CONTINUE WITH ${selectedBrand.toUpperCase()}`;
    }, 220);

    return;
  }

  if (heroStage === "category") {
    setHeroStage("brand");
    clearFadeClasses();

    heroCategoryStage.classList.add("hero-fade-out");

    setTimeout(() => {
      heroCategoryStage.hidden = true;
      heroBrandStage.hidden = false;
      heroBrandStage.classList.add("hero-fade-in");
      updateRightPanelForBrandMode();
    }, 220);

    return;
  }

  if (heroStage === "brand") {
    clearFadeClasses();

    heroBrandLeft.classList.add("hero-fade-out");
    heroBrandStage.classList.add("hero-fade-out");

    setTimeout(() => {
      resetToHomeState();
      heroDefaultLeft.classList.add("hero-fade-in");
      heroBikeStage.classList.add("hero-fade-in");
    }, 260);
  }
}

function selectBrand(brand, options = {}) {
  selectedBrand = brand;
  selectedCategory = "";
  selectedMotorcycle = null;
  currentBikeIndex = 0;
  currentFilteredBikes = [];

  setActiveBrandUI(brand);

  if (categoryContainer) {
    categoryContainer.hidden = false;
  }

  renderTrackerCategories(brand);

  if (bikeResults) {
    bikeResults.innerHTML = `<p class="result-empty">Select a category for ${brand}.</p>`;
  }

  if (!options.skipScroll) {
    setTimeout(() => {
      if (categoryContainer && !categoryContainer.hidden) {
        smoothScrollToElement(categoryContainer);
      }
    }, 120);
  }
}

function selectCategory(category, options = {}) {
  if (!selectedBrand) {
    bikeResults.innerHTML = `<p class="result-empty">Select a brand first.</p>`;
    return;
  }

  selectedCategory = category;
  setActiveCategoryUI(category);

  currentFilteredBikes = filterByBrandAndCategory(motorcycles, selectedBrand, selectedCategory);
  currentBikeIndex = 0;

  renderBikes(currentFilteredBikes);

  if (!options.skipScroll) {
    setTimeout(() => {
      if (bikeResults) {
        smoothScrollToElement(bikeResults);
      }
    }, 120);
  }
}

function renderBikes(bikes) {
  bikeResults.innerHTML = "";

  if (bikes.length === 0) {
    bikeResults.innerHTML = `<p class="result-empty">No bikes found for ${selectedBrand} ${selectedCategory}.</p>`;
    return;
  }

  renderFeaturedBike(bikes, currentBikeIndex);
}

function renderFeaturedBike(bikes, index) {
  const bike = bikes[index];
  const total = bikes.length;

  bikeResults.innerHTML = `
    <div class="feature-bike-layout">
      <div class="feature-side-left">
        <div class="feature-side-left-top">
          <span>${selectedBrand}</span>
          <span>${selectedCategory}</span>
        </div>
        <div class="feature-side-left-bottom">Gallery</div>
      </div>

      <div class="feature-main">
        <div class="feature-text-left">
          <h2>${bike.model}</h2>
          <p>${bike.brand} ${bike.category} selection with a focused display layout inspired by your original concept.</p>
        </div>

        <div class="feature-bike-center">
          <img class="feature-bike-image" src="${bike.image}" alt="${bike.model}">
        </div>

        <div class="feature-spec-right">
          <h3>Specification</h3>
          <p><strong>Brand:</strong> ${bike.brand}</p>
          <p><strong>Category:</strong> ${bike.category}</p>
          <p><strong>Year:</strong> ${bike.year}</p>
          <p><strong>Price:</strong> ${formatPrice(bike.price)}</p>
          <button class="feature-link-button" type="button" onclick="openSelectedBikeByIndex(${index})">VIEW MORE</button>
        </div>
      </div>

      <div class="feature-side-right">
        <div class="feature-counter">
          <span class="feature-counter-current">${String(index + 1).padStart(2, "0")}</span>
          <span class="feature-counter-divider">/${String(total).padStart(2, "0")}</span>
          <span class="feature-counter-label">BIKES</span>
        </div>

        <div class="feature-thumbs">
          ${bikes.map((item, thumbIndex) => `
            <button class="feature-thumb ${thumbIndex === index ? "active" : ""}" type="button" onclick="showBikeAtIndex(${thumbIndex})">
              <img src="${item.image}" alt="${item.model}">
            </button>
          `).join("")}
        </div>
      </div>
    </div>
  `;
}

function showBikeAtIndex(index) {
  currentBikeIndex = index;
  renderFeaturedBike(currentFilteredBikes, currentBikeIndex);
}

function openSelectedBikeByIndex(index) {
  const bike = currentFilteredBikes[index];
  if (!bike) {
    return;
  }

  openBikeShowcase(bike);
}

if (selectMotorcycleBtn) {
  selectMotorcycleBtn.addEventListener("click", enterHeroBrandMode);
}

if (backHomeBtn) {
  backHomeBtn.addEventListener("click", handleBackAction);
}

if (heroCategoryBack) {
  heroCategoryBack.addEventListener("click", handleBackAction);
}

if (heroMotorcycleBack) {
  heroMotorcycleBack.addEventListener("click", handleBackAction);
}

if (heroBrandNext) {
  heroBrandNext.addEventListener("click", showNextHeroBrands);
}

if (heroBrandPrev) {
  heroBrandPrev.addEventListener("click", showPrevHeroBrands);
}

if (heroCounterNext) {
  heroCounterNext.addEventListener("click", showNextHeroBrands);
}

if (topHomeLink) {
  topHomeLink.addEventListener("click", (event) => {
    event.preventDefault();
    resetToHomeState();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

if (sideHomeLink) {
  sideHomeLink.addEventListener("click", (event) => {
    event.preventDefault();
    resetToHomeState();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

if (specLink) {
  specLink.addEventListener("click", () => {
    if (trackerSection) {
      trackerSection.hidden = false;
    }
  });
}

if (heroOpenTrackerLink) {
  heroOpenTrackerLink.addEventListener("click", () => {
    if (trackerSection) {
      trackerSection.hidden = false;
    }
  });
}

if (homePageShell) {
  setHeroStage("home");
  loadMotorcyclesFromApi().finally(() => {
    resetToHomeState();
    restoreTrackerStateOnLoad();
  });
}

window.selectBrand = selectBrand;
window.selectCategory = selectCategory;
window.showBikeAtIndex = showBikeAtIndex;
window.openSelectedBikeByIndex = openSelectedBikeByIndex;

function restoreTrackerStateOnLoad() {
  const shouldRestore = localStorage.getItem("restoreTrackerState") === "true";
  if (!shouldRestore) {
    return;
  }

  localStorage.removeItem("restoreTrackerState");

  const storedBrand = localStorage.getItem("selectedBrand");
  const storedCategory = localStorage.getItem("selectedCategory");

  if (!storedBrand) {
    return;
  }

  if (trackerSection) {
    trackerSection.hidden = false;
  }

  selectedBrand = storedBrand;
  selectBrand(storedBrand);

  setTimeout(() => {
    if (storedCategory) {
      selectedCategory = storedCategory;
      selectCategory(storedCategory);
    }

    setTimeout(() => {
      if (trackerSection) {
        smoothScrollToElement(trackerSection);
      }
    }, 180);
  }, 160);
}
