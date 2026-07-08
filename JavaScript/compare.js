(() => {
  const API_TIMEOUT_MS = 2500;

const compareSpecsMap = {
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

  const state = {
    catalog: [],
    selectedIds: {
      a: null,
      b: null
    },
    source: "static"
  };

  const elements = {
    status: document.getElementById("compareStatus"),
    results: document.getElementById("compareResults"),
    count: document.querySelector("[data-compare-count]"),
    swap: document.getElementById("compareSwapBtn"),
    bikeCards: document.getElementById("compareBikeCards"),
    table: document.getElementById("compareTable"),
    insights: document.getElementById("compareInsights"),
    tableBikeA: document.querySelector("[data-table-bike-a]"),
    tableBikeB: document.querySelector("[data-table-bike-b]"),
    selects: {
      a: {
        brand: document.getElementById("compareBrandA"),
        model: document.getElementById("compareModelA"),
        year: document.getElementById("compareYearA")
      },
      b: {
        brand: document.getElementById("compareBrandB"),
        model: document.getElementById("compareModelB"),
        year: document.getElementById("compareYearB")
      }
    }
  };

  const comparisonRows = [
    {
      label: "Category",
      detail: "Bike type",
      key: "category",
      type: "text"
    },
    {
      label: "Year",
      detail: "Model year",
      key: "year",
      type: "text"
    },
    {
      label: "Price",
      detail: "Starting price",
      key: "price",
      type: "number",
      lowerWins: true,
      formatter: formatCurrency,
      unit: "value"
    },
    {
      label: "Engine",
      detail: "Configuration",
      key: "engine",
      type: "text"
    },
    {
      label: "Horsepower",
      detail: "Peak output",
      key: "horsepowerValue",
      displayKey: "horsepower",
      type: "number",
      higherWins: true,
      formatter: (value) => formatNumber(value, "hp"),
      unit: "power"
    },
    {
      label: "Weight",
      detail: "Curb / wet weight",
      key: "weightLbs",
      displayKey: "weight",
      type: "number",
      lowerWins: true,
      formatter: (value) => formatNumber(value, "lbs"),
      unit: "weight"
    },
    {
      label: "0–60 mph",
      detail: "Acceleration",
      key: "zeroToSixtySeconds",
      displayKey: "zeroSixty",
      type: "number",
      lowerWins: true,
      formatter: (value) => formatNumber(value, "sec"),
      unit: "acceleration"
    },
    {
      label: "Top Speed",
      detail: "Estimated max speed",
      key: "topSpeedMph",
      displayKey: "topSpeed",
      type: "number",
      higherWins: true,
      formatter: (value) => formatNumber(value, "mph"),
      unit: "speed"
    },
    {
      label: "Power / Weight",
      detail: "Horsepower per pound",
      key: "powerToWeight",
      type: "number",
      higherWins: true,
      formatter: (value) => formatDecimal(value, 3, "hp/lb"),
      unit: "ratio"
    }
  ];

  function getStaticMotorcycles() {
    try {
      return Array.isArray(motorcycles) ? motorcycles : [];
    } catch (error) {
      return [];
    }
  }

  function parseNumber(value) {
    if (value === null || value === undefined || value === "") {
      return null;
    }

    if (typeof value === "number") {
      return Number.isFinite(value) ? value : null;
    }

    const match = String(value).replace(/,/g, "").match(/-?\d+(\.\d+)?/);
    return match ? Number(match[0]) : null;
  }

  function getFallbackSpecs(model) {
    return compareSpecsMap[model] || {};
  }

  function normalizeBike(rawBike) {
    const fallbackSpecs = getFallbackSpecs(rawBike.model);
    const horsepowerValue = parseNumber(rawBike.horsepower ?? rawBike.horsepower_hp ?? fallbackSpecs.horsepower);
    const weightLbs = parseNumber(rawBike.weightLbs ?? rawBike.weight_lbs ?? rawBike.weight ?? fallbackSpecs.weight);
    const zeroToSixtySeconds = parseNumber(rawBike.zeroToSixtySeconds ?? rawBike.zero_to_sixty_seconds ?? rawBike.zeroSixty ?? fallbackSpecs.zeroSixty);
    const topSpeedMph = parseNumber(rawBike.topSpeedMph ?? rawBike.top_speed_mph ?? rawBike.topSpeed ?? fallbackSpecs.topSpeed);
    const price = parseNumber(rawBike.price);

    return {
      id: String(rawBike.id ?? `${rawBike.brand}-${rawBike.model}-${rawBike.year}`),
      brand: rawBike.brand || "Unknown Brand",
      category: rawBike.category || "Not added yet",
      model: rawBike.model || "Unknown Model",
      year: Number(rawBike.year) || "Not added yet",
      price,
      image: rawBike.imageUrl || rawBike.image_url || rawBike.image || "images/HomePageBike.png",
      engine: rawBike.engine || fallbackSpecs.engine || "Not added yet",
      horsepower: rawBike.horsepower ? formatNumber(parseNumber(rawBike.horsepower), "hp") : fallbackSpecs.horsepower || "Not added yet",
      horsepowerValue,
      weight: rawBike.weight ? formatNumber(parseNumber(rawBike.weight), "lbs") : fallbackSpecs.weight || (weightLbs ? formatNumber(weightLbs, "lbs") : "Not added yet"),
      weightLbs,
      zeroSixty: rawBike.zeroSixty || rawBike.zero_to_sixty_seconds ? formatNumber(zeroToSixtySeconds, "sec") : fallbackSpecs.zeroSixty || (zeroToSixtySeconds ? formatNumber(zeroToSixtySeconds, "sec") : "Not added yet"),
      zeroToSixtySeconds,
      topSpeed: rawBike.topSpeed || rawBike.top_speed_mph ? formatNumber(topSpeedMph, "mph") : fallbackSpecs.topSpeed || (topSpeedMph ? formatNumber(topSpeedMph, "mph") : "Not added yet"),
      topSpeedMph,
      powerToWeight: horsepowerValue && weightLbs ? horsepowerValue / weightLbs : null
    };
  }

  function dedupeBikes(bikes) {
    const seen = new Map();

    bikes.forEach((bike) => {
      const key = `${bike.brand}|${bike.model}|${bike.year}|${bike.id}`;
      if (!seen.has(key)) {
        seen.set(key, bike);
      }
    });

    return [...seen.values()];
  }

  function sortBikes(bikes) {
    return bikes.sort((a, b) => {
      const brandCompare = String(a.brand).localeCompare(String(b.brand));
      if (brandCompare !== 0) return brandCompare;

      const modelCompare = String(a.model).localeCompare(String(b.model));
      if (modelCompare !== 0) return modelCompare;

      return Number(b.year) - Number(a.year);
    });
  }

  async function fetchWithTimeout(url) {
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), API_TIMEOUT_MS);

    try {
      return await fetch(url, { signal: controller.signal });
    } finally {
      window.clearTimeout(timeoutId);
    }
  }

  async function loadCatalog() {
    const staticCatalog = getStaticMotorcycles().map(normalizeBike);
    const apiBase = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" ? "http://localhost:8082" : "https://api.olysa.app";

    try {
      const response = await fetchWithTimeout(`${apiBase}/api/motorcycles`);

      if (!response.ok) {
        throw new Error(`Backend returned ${response.status}`);
      }

      const backendCatalog = await response.json();

      if (!Array.isArray(backendCatalog) || backendCatalog.length === 0) {
        throw new Error("Backend returned an empty motorcycle catalog.");
      }

      state.source = "backend";
      state.catalog = sortBikes(dedupeBikes(backendCatalog.map(normalizeBike)));
    } catch (error) {
      console.warn("Compare page using static catalog fallback:", error);
      state.source = "static";
      state.catalog = sortBikes(dedupeBikes(staticCatalog));
    }
  }

  function uniqueValues(items, mapper) {
    return [...new Set(items.map(mapper).filter(Boolean))].sort((a, b) => String(a).localeCompare(String(b)));
  }

  function getBrands() {
    return uniqueValues(state.catalog, (bike) => bike.brand);
  }

  function getModelsForBrand(brand) {
    return uniqueValues(
      state.catalog.filter((bike) => bike.brand === brand),
      (bike) => bike.model
    );
  }

  function getYearsForBrandAndModel(brand, model) {
    return uniqueValues(
      state.catalog.filter((bike) => bike.brand === brand && bike.model === model),
      (bike) => bike.year
    ).sort((a, b) => Number(b) - Number(a));
  }

  function findBike(brand, model, year) {
    return state.catalog.find((bike) => bike.brand === brand && bike.model === model && String(bike.year) === String(year));
  }

  function findBikeById(id) {
    return state.catalog.find((bike) => bike.id === String(id));
  }

  function setOptions(select, values, placeholder) {
    select.innerHTML = "";

    if (placeholder) {
      const placeholderOption = document.createElement("option");
      placeholderOption.value = "";
      placeholderOption.textContent = placeholder;
      select.appendChild(placeholderOption);
    }

    values.forEach((value) => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = value;
      select.appendChild(option);
    });
  }

  function selectDefaults() {
    const defaultA =
      state.catalog.find((bike) => bike.model === "Yamaha R6") ||
      state.catalog.find((bike) => bike.brand === "Yamaha") ||
      state.catalog[0];

    const defaultB =
      state.catalog.find((bike) => bike.model === "Suzuki GSX 750R") ||
      state.catalog.find((bike) => bike.model === "Kawasaki Ninja 650R") ||
      state.catalog.find((bike) => bike.id !== defaultA?.id) ||
      state.catalog[1] ||
      state.catalog[0];

    state.selectedIds.a = defaultA?.id || null;
    state.selectedIds.b = defaultB?.id || null;
  }

  function syncSide(side, selectedBike) {
    const selects = elements.selects[side];
    const brands = getBrands();
    const brand = selectedBike?.brand || brands[0] || "";
    const models = getModelsForBrand(brand);
    const model = selectedBike?.model || models[0] || "";
    const years = getYearsForBrandAndModel(brand, model);
    const year = selectedBike?.year || years[0] || "";

    setOptions(selects.brand, brands, "Select brand");
    selects.brand.value = brand;

    setOptions(selects.model, models, "Select model");
    selects.model.disabled = !brand;
    selects.model.value = model;

    setOptions(selects.year, years, "Year");
    selects.year.disabled = !model;
    selects.year.value = year;

    const resolvedBike = findBike(brand, model, year);
    state.selectedIds[side] = resolvedBike?.id || null;
  }

  function syncSelectors() {
    syncSide("a", findBikeById(state.selectedIds.a));
    syncSide("b", findBikeById(state.selectedIds.b));
  }

  function handleBrandChange(side) {
    const selects = elements.selects[side];
    const brand = selects.brand.value;
    const model = getModelsForBrand(brand)[0] || "";
    const year = getYearsForBrandAndModel(brand, model)[0] || "";
    const bike = findBike(brand, model, year);

    state.selectedIds[side] = bike?.id || null;
    syncSelectors();
    renderComparison();
  }

  function handleModelChange(side) {
    const selects = elements.selects[side];
    const brand = selects.brand.value;
    const model = selects.model.value;
    const year = getYearsForBrandAndModel(brand, model)[0] || "";
    const bike = findBike(brand, model, year);

    state.selectedIds[side] = bike?.id || null;
    syncSelectors();
    renderComparison();
  }

  function handleYearChange(side) {
    const selects = elements.selects[side];
    const bike = findBike(selects.brand.value, selects.model.value, selects.year.value);

    state.selectedIds[side] = bike?.id || null;
    renderComparison();
  }

  function bindControls() {
    ["a", "b"].forEach((side) => {
      const selects = elements.selects[side];

      selects.brand.addEventListener("change", () => handleBrandChange(side));
      selects.model.addEventListener("change", () => handleModelChange(side));
      selects.year.addEventListener("change", () => handleYearChange(side));
    });

    elements.swap.addEventListener("click", () => {
      const previousA = state.selectedIds.a;
      state.selectedIds.a = state.selectedIds.b;
      state.selectedIds.b = previousA;
      syncSelectors();
      renderComparison();
    });
  }

  function formatCurrency(value) {
    if (value === null || value === undefined || Number.isNaN(Number(value))) {
      return "Not added yet";
    }

    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0
    }).format(Number(value));
  }

  function formatNumber(value, suffix = "") {
    if (value === null || value === undefined || Number.isNaN(Number(value))) {
      return "Not added yet";
    }

    const formatted = Number(value) % 1 === 0 ? String(Number(value)) : Number(value).toFixed(1);
    return suffix ? `${formatted} ${suffix}` : formatted;
  }

  function formatDecimal(value, digits = 2, suffix = "") {
    if (value === null || value === undefined || Number.isNaN(Number(value))) {
      return "Not added yet";
    }

    return suffix ? `${Number(value).toFixed(digits)} ${suffix}` : Number(value).toFixed(digits);
  }

  function formatModelName(bike) {
    return `${bike.year} ${bike.model}`;
  }

  function getDisplayValue(bike, row) {
    if (!bike) {
      return "Not added yet";
    }

    const rawValue = row.displayKey ? bike[row.displayKey] : bike[row.key];

    if (row.type === "number") {
      const numericValue = bike[row.key];
      return row.formatter ? row.formatter(numericValue) : formatNumber(numericValue);
    }

    if (row.key === "price") {
      return formatCurrency(bike.price);
    }

    return rawValue || "Not added yet";
  }

  function getWinnerSide(bikeA, bikeB, row) {
    if (row.type !== "number") {
      return "same";
    }

    const valueA = bikeA?.[row.key];
    const valueB = bikeB?.[row.key];

    if (valueA === null || valueA === undefined || valueB === null || valueB === undefined) {
      return "unknown";
    }

    if (Number(valueA) === Number(valueB)) {
      return "same";
    }

    if (row.higherWins) {
      return Number(valueA) > Number(valueB) ? "a" : "b";
    }

    if (row.lowerWins) {
      return Number(valueA) < Number(valueB) ? "a" : "b";
    }

    return "same";
  }

  function getResultLabel(winnerSide) {
    if (winnerSide === "a") {
      return "First pick";
    }

    if (winnerSide === "b") {
      return "Second pick";
    }

    if (winnerSide === "same") {
      return "Tie";
    }

    return "N/A";
  }

  function getResultChips(winnerSide) {
    if (winnerSide === "a" || winnerSide === "b") {
      return `<span class="compare-result-chip is-win">✓</span>`;
    }

    if (winnerSide === "same") {
      return `<span class="compare-result-chip is-tie">=</span>`;
    }

    return `<span class="compare-result-chip is-loss">—</span>`;
  }

  function getResultClass(winnerSide, side) {
    if (winnerSide === side) {
      return "is-winner";
    }

    if (winnerSide === "same") {
      return "is-same";
    }

    return "";
  }

  function getCategoryTone(category) {
    const normalizedCategory = String(category || "").toLowerCase();

    if (normalizedCategory.includes("hyper")) return "Hyper performance";
    if (normalizedCategory.includes("super")) return "Track focused";
    if (normalizedCategory.includes("sport")) return "Sport street";
    if (normalizedCategory.includes("cruiser")) return "Cruiser comfort";

    return "Supported bike";
  }

  function renderBikeCard(bike, side) {
    const pickLabel = side === "a" ? "First pick" : "Second pick";

    return `
      <article class="compare-bike-card" style="--compare-brand-accent: ${getBrandAccent(bike.brand)}">
        <div class="compare-bike-card-top">
          <span>${pickLabel}</span>
          <small>${getCategoryTone(bike.category)}</small>
        </div>

        <div class="compare-bike-image-wrap">
          <img src="${bike.image}" alt="${bike.model}" onerror="this.src='images/HomePageBike.png'">
        </div>

        <div class="compare-bike-copy">
          <p>${bike.brand}</p>
          <h2>${bike.model}</h2>
          <div class="compare-bike-meta">
            <span>${bike.year}</span>
            <span>${bike.category}</span>
            <span>${formatCurrency(bike.price)}</span>
          </div>

          <div class="compare-bike-spec-tags">
            <span>${bike.engine}</span>
            <span>${bike.horsepower}</span>
            <span>${bike.zeroSixty}</span>
          </div>

          <button class="compare-view-btn" type="button" data-view-bike="${bike.id}">View Details</button>
        </div>
      </article>
    `;
  }

  function renderTable(bikeA, bikeB) {
    elements.table.innerHTML = comparisonRows.map((row) => {
      const winnerSide = getWinnerSide(bikeA, bikeB, row);
      const resultClass = winnerSide === "a" || winnerSide === "b" ? "is-active" : winnerSide === "same" ? "is-even" : "is-muted";
      const resultText = getResultLabel(winnerSide);
      const resultChips = getResultChips(winnerSide);

      return `
        <div class="compare-row">
          <div class="compare-row-label">
            <strong>${row.label}</strong>
            <span>${row.detail}</span>
          </div>

          <div class="compare-row-value ${getResultClass(winnerSide, "a")}">
            ${getDisplayValue(bikeA, row)}
          </div>

          <div class="compare-row-result ${resultClass}">
            <div class="compare-result-chips">${resultChips}</div>
            <span class="compare-result-label">${resultText}</span>
          </div>

          <div class="compare-row-value ${getResultClass(winnerSide, "b")}">
            ${getDisplayValue(bikeB, row)}
          </div>
        </div>
      `;
    }).join("");
  }

  function getBrandAccent(brand) {
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

    return brandAccentMap[brand] || "#ff2b2b";
  }

  function getDeltaPercent(valueA, valueB, digits = 1) {
    if (!valueA || !valueB || Number(valueB) === 0) {
      return null;
    }

    return (((Number(valueA) - Number(valueB)) / Number(valueB)) * 100).toFixed(digits);
  }

  function getWinnerName(winnerSide, bikeA, bikeB) {
    if (winnerSide === "a") return bikeA.model;
    if (winnerSide === "b") return bikeB.model;
    return "Both bikes";
  }

  function renderInsights(bikeA, bikeB) {
    const powerWinner = getWinnerSide(bikeA, bikeB, comparisonRows.find((row) => row.key === "horsepowerValue"));
    const weightWinner = getWinnerSide(bikeA, bikeB, comparisonRows.find((row) => row.key === "weightLbs"));
    const accelerationWinner = getWinnerSide(bikeA, bikeB, comparisonRows.find((row) => row.key === "zeroToSixtySeconds"));
    const valueWinner = getWinnerSide(bikeA, bikeB, comparisonRows.find((row) => row.key === "price"));

    const powerDelta = getDeltaPercent(bikeA.horsepowerValue, bikeB.horsepowerValue);
    const weightDelta = bikeA.weightLbs && bikeB.weightLbs ? Math.abs(bikeA.weightLbs - bikeB.weightLbs) : null;

    elements.insights.innerHTML = `
      <div class="compare-insight-card compare-insight-intro">
        <span class="compare-insight-icon">▦</span>
        <div>
          <strong>Comparison Insights</strong>
          <p>Quick read before opening the full bike detail page.</p>
        </div>
      </div>

      <div class="compare-insight-card">
        <span class="compare-insight-icon">⚡</span>
        <div>
          <strong>Power</strong>
          <p>${getWinnerName(powerWinner, bikeA, bikeB)} has the stronger horsepower number${powerDelta ? ` by about ${Math.abs(powerDelta)}%` : ""}.</p>
        </div>
      </div>

      <div class="compare-insight-card">
        <span class="compare-insight-icon">◈</span>
        <div>
          <strong>Weight</strong>
          <p>${getWinnerName(weightWinner, bikeA, bikeB)} is lighter${weightDelta ? ` by ${weightDelta} lbs` : ""}.</p>
        </div>
      </div>

      <div class="compare-insight-card">
        <span class="compare-insight-icon">⏱</span>
        <div>
          <strong>Acceleration</strong>
          <p>${getWinnerName(accelerationWinner, bikeA, bikeB)} has the better 0–60 estimate.</p>
        </div>
      </div>

      <div class="compare-insight-card">
        <span class="compare-insight-icon">$</span>
        <div>
          <strong>Value</strong>
          <p>${getWinnerName(valueWinner, bikeA, bikeB)} is the lower-priced option in the current catalog.</p>
        </div>
      </div>
    `;
  }

  function bindViewButtons() {
    document.querySelectorAll("[data-view-bike]").forEach((button) => {
      button.addEventListener("click", () => {
        const bike = findBikeById(button.dataset.viewBike);

        if (!bike) {
          return;
        }

        localStorage.setItem("selectedBrand", bike.brand);
        localStorage.setItem("selectedCategory", bike.category);
        localStorage.setItem("selectedBikeModel", bike.model);
        window.location.href = "bikes.html";
      });
    });
  }

  function renderComparison() {
    const bikeA = findBikeById(state.selectedIds.a);
    const bikeB = findBikeById(state.selectedIds.b);

    if (!bikeA || !bikeB) {
      elements.results.hidden = true;
      elements.status.hidden = false;
      elements.status.textContent = "Select two motorcycles to compare.";
      return;
    }

    elements.status.hidden = true;
    elements.results.hidden = false;

    elements.tableBikeA.textContent = formatModelName(bikeA);
    elements.tableBikeB.textContent = formatModelName(bikeB);

    elements.bikeCards.innerHTML = `${renderBikeCard(bikeA, "a")}${renderBikeCard(bikeB, "b")}`;
    renderTable(bikeA, bikeB);
    renderInsights(bikeA, bikeB);
    bindViewButtons();
  }

  function updateCatalogStatus() {
    const sourceLabel = state.source === "backend" ? "backend catalog" : "static catalog fallback";
    const uniqueYears = uniqueValues(state.catalog, (bike) => bike.year).sort((a, b) => Number(b) - Number(a));

    if (elements.count) {
      elements.count.textContent = `${state.catalog.length} Bikes Available`;
    }

    const brandCount = uniqueValues(state.catalog, (bike) => bike.brand).length;
    const yearCount = uniqueYears.length;
    const brandMetric = document.querySelector("[data-compare-brand-count]");
    const specMetric = document.querySelector("[data-compare-spec-count]");
    const yearMetric = document.querySelector("[data-compare-year-count]");

    if (brandMetric) {
      brandMetric.textContent = brandCount;
    }

    if (specMetric) {
      specMetric.textContent = "8";
    }

    if (yearMetric) {
      yearMetric.textContent = yearCount;
    }

    elements.status.textContent = `Loaded ${state.catalog.length} supported bikes from the ${sourceLabel}. Available years: ${uniqueYears.join(", ")}.`;
  }

  function revealSections() {
    document.querySelectorAll(".reveal-section").forEach((section) => {
      section.classList.add("revealed");
    });
  }

  async function initComparePage() {
    if (!elements.results || !elements.status) {
      return;
    }

    await loadCatalog();

    if (!state.catalog.length) {
      elements.status.textContent = "No motorcycles are available to compare yet.";
      if (elements.count) {
        elements.count.textContent = "No Bikes Available";
      }

      const brandMetric = document.querySelector("[data-compare-brand-count]");
      const yearMetric = document.querySelector("[data-compare-year-count]");
      if (brandMetric) brandMetric.textContent = "—";
      if (yearMetric) yearMetric.textContent = "—";
      revealSections();
      return;
    }

    updateCatalogStatus();
    selectDefaults();
    syncSelectors();
    bindControls();
    renderComparison();
    revealSections();
  }

  document.addEventListener("DOMContentLoaded", initComparePage);
})();
