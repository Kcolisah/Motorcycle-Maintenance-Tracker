(() => {
  const API_TIMEOUT_MS = 2500;

  const compareSpecsMap = window.MT_BIKE_SPECS_MAP || {};

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

  const comparisonRows = (window.MT_COMPARE_ROW_DEFINITIONS || []).map((row) => ({
    ...row,
    formatter: getComparisonFormatter(row.formatter)
  }));

  const compareIconSvg = {
    engine: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 10h3l2-3h5l2 3h4v7h-3l-2 3H9l-2-3H4z"></path><path d="M9 10v7"></path><path d="M15 10v7"></path></svg>`,
    lightning: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13 2 4 14h7l-1 8 10-13h-7z"></path></svg>`,
    speed: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 14a8 8 0 1 1 16 0"></path><path d="m12 14 4-4"></path><path d="M7 18h10"></path></svg>`,
    launch: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 18h14"></path><path d="M7 14l4-4 3 3 4-7"></path></svg>`
  };

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

  function resolveCompareImagePath(path) {
  if (!path) {
    return "assets/images/HomePageBike.png";
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
      image: resolveCompareImagePath(rawBike.imageUrl || rawBike.image_url || rawBike.image || rawBike.imagePath),
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

  function getComparisonFormatter(formatterName) {
    const formatters = {
      currency: formatCurrency,
      horsepower: (value) => formatNumber(value, "hp"),
      weight: (value) => formatNumber(value, "lbs"),
      acceleration: (value) => formatNumber(value, "sec"),
      speed: (value) => formatNumber(value, "mph"),
      powerToWeight: (value) => formatDecimal(value, 3, "hp/lb")
    };

    return formatters[formatterName] || null;
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
          <img src="${bike.image}" alt="${bike.model}" onerror="this.src='assets/images/HomePageBike.png'">
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
            <span>${compareIconSvg.engine}${bike.engine}</span>
            <span>${compareIconSvg.lightning}${bike.horsepower}</span>
            <span>${compareIconSvg.speed}${bike.topSpeed}</span>
            <span>${compareIconSvg.launch}${bike.zeroSixty}</span>
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
    if (typeof window.getMotorcycleBrandAccent === "function") {
      return window.getMotorcycleBrandAccent(brand);
    }

    return "#ff2b2b";
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

  function getBikeUseCase(bike) {
    const category = String(bike.category || "").toLowerCase();
    const power = Number(bike.horsepowerValue) || 0;
    const speed = Number(bike.topSpeedMph) || 0;
    const weight = Number(bike.weightLbs) || 0;
    const price = Number(bike.price) || 0;

    if (category.includes("cruiser")) {
      return "Best for relaxed street riding, ownership comfort, and longer rides.";
    }

    if (category.includes("hyper") || power >= 180 || speed >= 185) {
      return "Best for max performance, experienced riders, and high-speed goals.";
    }

    if (category.includes("super") || power >= 120) {
      return "Best for aggressive sport riding, track focus, and riders who want room to grow.";
    }

    if (weight && weight <= 390 && price && price <= 8000) {
      return "Best for lighter daily use, easier ownership, and learning the platform.";
    }

    if (price && price <= 9000) {
      return "Best for value-focused riders who want a capable bike without overspending.";
    }

    return "Best for riders who want a balanced motorcycle for regular use and ownership tracking.";
  }

  function getComparisonVerdict(bikeA, bikeB) {
    const performanceRows = ["horsepowerValue", "topSpeedMph", "zeroToSixtySeconds", "powerToWeight"];
    const ownershipRows = ["price", "weightLbs"];
    let performanceA = 0;
    let performanceB = 0;
    let ownershipA = 0;
    let ownershipB = 0;

    comparisonRows.forEach((row) => {
      const winner = getWinnerSide(bikeA, bikeB, row);

      if (performanceRows.includes(row.key)) {
        if (winner === "a") performanceA += 1;
        if (winner === "b") performanceB += 1;
      }

      if (ownershipRows.includes(row.key)) {
        if (winner === "a") ownershipA += 1;
        if (winner === "b") ownershipB += 1;
      }
    });

    const performanceWinner = performanceA === performanceB ? "tie" : performanceA > performanceB ? "a" : "b";
    const ownershipWinner = ownershipA === ownershipB ? "tie" : ownershipA > ownershipB ? "a" : "b";

    return { performanceWinner, ownershipWinner, performanceA, performanceB, ownershipA, ownershipB };
  }

  function getVerdictSentence(verdict, bikeA, bikeB) {
    if (verdict.performanceWinner === "tie" && verdict.ownershipWinner === "tie") {
      return "This is a close matchup. Use the garage and maintenance flow to decide which one fits your ownership plan better.";
    }

    const performanceName = getWinnerName(verdict.performanceWinner, bikeA, bikeB);
    const ownershipName = getWinnerName(verdict.ownershipWinner, bikeA, bikeB);

    if (verdict.performanceWinner !== "tie" && verdict.ownershipWinner !== "tie" && verdict.performanceWinner !== verdict.ownershipWinner) {
      return `${performanceName} leans stronger for performance, while ${ownershipName} looks easier to justify from an ownership/value angle.`;
    }

    if (verdict.performanceWinner !== "tie") {
      return `${performanceName} is the stronger performance pick in this matchup. Check price, weight, and maintenance needs before calling it the better ownership choice.`;
    }

    return `${ownershipName} looks like the cleaner ownership pick, especially if price and weight matter more than pure output.`;
  }

  function getPlainWinnerText(label, winnerSide, bikeA, bikeB, tieText) {
    if (winnerSide === "same" || winnerSide === "tie") {
      return tieText;
    }

    return `${getWinnerName(winnerSide, bikeA, bikeB)} leads on ${label}.`;
  }

  function renderBikeBestForCard(bike, sideLabel) {
    return `
      <div class="compare-insight-card compare-insight-best-for">
        <span class="compare-insight-icon">${sideLabel === "A" ? "A" : "B"}</span>
        <div>
          <small>${sideLabel === "A" ? "First Pick" : "Second Pick"}</small>
          <strong>Best For: ${bike.model}</strong>
          <p>${getBikeUseCase(bike)}</p>
        </div>
      </div>
    `;
  }

  function renderInsights(bikeA, bikeB) {
    const powerRow = comparisonRows.find((row) => row.key === "horsepowerValue");
    const speedRow = comparisonRows.find((row) => row.key === "topSpeedMph");
    const weightRow = comparisonRows.find((row) => row.key === "weightLbs");
    const accelerationRow = comparisonRows.find((row) => row.key === "zeroToSixtySeconds");
    const valueRow = comparisonRows.find((row) => row.key === "price");

    const powerWinner = getWinnerSide(bikeA, bikeB, powerRow);
    const speedWinner = getWinnerSide(bikeA, bikeB, speedRow);
    const weightWinner = getWinnerSide(bikeA, bikeB, weightRow);
    const accelerationWinner = getWinnerSide(bikeA, bikeB, accelerationRow);
    const valueWinner = getWinnerSide(bikeA, bikeB, valueRow);

    const powerDelta = getDeltaPercent(bikeA.horsepowerValue, bikeB.horsepowerValue);
    const speedDelta = bikeA.topSpeedMph && bikeB.topSpeedMph ? Math.abs(bikeA.topSpeedMph - bikeB.topSpeedMph) : null;
    const weightDelta = bikeA.weightLbs && bikeB.weightLbs ? Math.abs(bikeA.weightLbs - bikeB.weightLbs) : null;
    const priceDelta = bikeA.price && bikeB.price ? Math.abs(bikeA.price - bikeB.price) : null;
    const verdict = getComparisonVerdict(bikeA, bikeB);

    elements.insights.innerHTML = `
      <div class="compare-insight-card compare-insight-intro compare-insight-verdict">
        <span class="compare-insight-icon">▦</span>
        <div>
          <small>Plain-English Verdict</small>
          <strong>How to read this matchup</strong>
          <p>${getVerdictSentence(verdict, bikeA, bikeB)}</p>
        </div>
      </div>

      ${renderBikeBestForCard(bikeA, "A")}
      ${renderBikeBestForCard(bikeB, "B")}

      <div class="compare-insight-card">
        <span class="compare-insight-icon">⚡</span>
        <div>
          <small>Power</small>
          <strong>${getPlainWinnerText("horsepower", powerWinner, bikeA, bikeB, "Both bikes are close on horsepower.")}</strong>
          <p>${powerDelta ? `${Math.abs(powerDelta)}% separates the two horsepower numbers.` : "Use this when you care about pull, passing power, and long-term performance headroom."}</p>
        </div>
      </div>

      <div class="compare-insight-card">
        <span class="compare-insight-icon">⌁</span>
        <div>
          <small>Speed</small>
          <strong>${getPlainWinnerText("top speed", speedWinner, bikeA, bikeB, "Both bikes are close on top speed.")}</strong>
          <p>${speedDelta ? `${speedDelta} mph separates the current top-speed estimates.` : "Top speed matters less than comfort and maintenance for most ownership use."}</p>
        </div>
      </div>

      <div class="compare-insight-card">
        <span class="compare-insight-icon">◈</span>
        <div>
          <small>Daily Use</small>
          <strong>${getPlainWinnerText("lighter weight", weightWinner, bikeA, bikeB, "Both bikes are close on weight.")}</strong>
          <p>${weightDelta ? `${weightDelta} lbs separates the two bikes. Lower weight usually helps low-speed control and daily usability.` : "Weight is one of the easiest specs to feel in parking lots, traffic, and city riding."}</p>
        </div>
      </div>

      <div class="compare-insight-card">
        <span class="compare-insight-icon">$</span>
        <div>
          <small>Value</small>
          <strong>${getPlainWinnerText("price", valueWinner, bikeA, bikeB, "Both bikes are close on price.")}</strong>
          <p>${priceDelta ? `${formatCurrency(priceDelta)} separates the current catalog prices.` : "Price is only the starting point. Maintenance, tires, insurance, and mods decide the real ownership cost."}</p>
        </div>
      </div>

      <div class="compare-insight-card">
        <span class="compare-insight-icon">⏱</span>
        <div>
          <small>Launch</small>
          <strong>${getPlainWinnerText("0–60 mph", accelerationWinner, bikeA, bikeB, "Both bikes are close on 0–60.")}</strong>
          <p>Acceleration is useful for quick performance context, but garage fit and service history matter more for long-term ownership.</p>
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
