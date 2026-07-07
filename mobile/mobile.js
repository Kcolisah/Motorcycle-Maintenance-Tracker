const ASSET_BASE = "..";
const API_ORIGIN =
  window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
    ? "http://localhost:8082"
    : "https://api.olysa.app";
const API_BASE_URL = `${API_ORIGIN}/api`;

const TOKEN_KEY = "mtAuthToken";
const USER_KEY = "mtAuthUser";
const READ_UPDATES_KEY = "mtReadUpdateIds";

const fallbackMotorcycles = [
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
];;

const brandLogoMap = {
  Aprilia: `${ASSET_BASE}/images/Aprilia/Aprilia_Logo.png`,
  BMW: `${ASSET_BASE}/images/BMW/BMW_Logo.png`,
  Ducati: `${ASSET_BASE}/images/Ducati/Ducati_Logo.png`,
  Harley: `${ASSET_BASE}/images/Harley/Harley_Logo.png`,
  "Harley-Davidson": `${ASSET_BASE}/images/Harley/Harley_Logo.png`,
  Honda: `${ASSET_BASE}/images/Honda/Honda_Logo.png`,
  Indian: `${ASSET_BASE}/images/Indian/Indian_Logo.png`,
  "Indian Motorcycle": `${ASSET_BASE}/images/Indian/Indian_Logo.png`,
  Kawasaki: `${ASSET_BASE}/images/Kawasaki/Kawasaki_Logo.png`,
  KTM: `${ASSET_BASE}/images/KTM/KTM_Logo.png`,
  Suzuki: `${ASSET_BASE}/images/Suzuki/Suzuki_logo.png`,
  Triumph: `${ASSET_BASE}/images/Triumph/Triumph_Logo.png`,
  Yamaha: `${ASSET_BASE}/images/Yamaha/Yamaha_Logo.png`,
};

const staticServicePreview = [
  { date: "May 1, 2024", title: "Oil Change", description: "Shell Advance 15W-50", mileage: "4,200 mi", cost: "$120.00", status: "DONE" },
  { date: "Feb 10, 2024", title: "Chain Adjustment", description: "Adjusted and lubricated", mileage: "3,800 mi", cost: "$80.00", status: "DONE" },
  { date: "Nov 20, 2023", title: "Tire Replacement", description: "Pirelli Diablo Rosso IV", mileage: "3,200 mi", cost: "$400.00", status: "DONE" },
];

const previewGarageItems = [
  buildPreviewGarageItem("ducati-v4", "Ducati Panigale V4", "Ducati", "SuperSport", 2022, 4250, 23999, `${ASSET_BASE}/images/Ducati/SuperSport/Ducati_Panigale_V4.png`),
  buildPreviewGarageItem("yamaha-r1", "Yamaha R1", "Yamaha", "SuperSport", 2021, 7800, 19199, `${ASSET_BASE}/images/Yamaha/SuperSport/Yamaha_R1.png`),
  buildPreviewGarageItem("zx6r", "Kawasaki Ninja ZX-6R", "Kawasaki", "SuperSport", 2023, 2150, 11599, `${ASSET_BASE}/images/Kawasaki/SuperSport/Kawasaki_Ninja_ZX_6R.png`),
];

const state = {
  view: "home",
  previousView: "home",
  selectedBrand: "Ducati",
  selectedCategory: "SuperSport",
  selectedCatalogBikeId: null,
  selectedGarageId: null,
  selectedMaintenanceGarageId: null,
  maintenanceStatusFilter: "upcoming",
  detailTab: "Overview",
  brandQuery: "",
  bikeQuery: "",
  catalog: fallbackMotorcycles.map(normalizeCatalogBike),
  garageItems: [],
  taskMap: new Map(),
  user: null,
  authReady: false,
  garageReady: false,
  catalogReady: false,
  backendOnline: false,
  updatesOpen: false,
  profileOpen: false,
};

const appShell = document.getElementById("app-shell");
const appHeader = document.getElementById("app-header");
const appMain = document.getElementById("app-main");
const bottomNav = document.getElementById("bottom-nav");
const overlayLayer = document.getElementById("mobile-overlay-layer");
const toast = document.getElementById("toast");

const icons = {
  bell: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a6 6 0 0 0-6 6v3.8L4.7 16a1 1 0 0 0 .9 1.4h12.8a1 1 0 0 0 .9-1.4L18 12.8V9a6 6 0 0 0-6-6Z"></path><path d="M9.5 20a2.5 2.5 0 0 0 5 0"></path></svg>`,
  back: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6"></path></svg>`,
  share: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 16V4"></path><path d="m8 8 4-4 4 4"></path><path d="M5 13v6h14v-6"></path></svg>`,
  dots: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="5" cy="12" r="1.5"></circle><circle cx="12" cy="12" r="1.5"></circle><circle cx="19" cy="12" r="1.5"></circle></svg>`,
  search: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"></circle><path d="m20 20-3.8-3.8"></path></svg>`,
  gauge: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 14a8 8 0 1 1 16 0"></path><path d="m12 14 4-4"></path><path d="M8 18h8"></path></svg>`,
  bike: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="7" cy="17" r="3"></circle><circle cx="17" cy="17" r="3"></circle><path d="M7 17h4l3-7h2l1 7"></path><path d="M9 10h5"></path></svg>`,
  wrench: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.5 6.5a4 4 0 0 0 4.9 4.9L11 19.8a2.2 2.2 0 1 1-3.1-3.1l8.4-8.4a4 4 0 0 0-1.8-1.8Z"></path></svg>`,
  wallet: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h15a1 1 0 0 1 1 1v11H5a2 2 0 0 1-2-2V7.8A2.8 2.8 0 0 1 5.8 5H18"></path><path d="M16 13h4"></path></svg>`,
  calendar: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3v4"></path><path d="M17 3v4"></path><rect x="4" y="5" width="16" height="16" rx="2"></rect><path d="M4 10h16"></path></svg>`,
  plus: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14"></path><path d="M5 12h14"></path></svg>`,
  chevron: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6"></path></svg>`,
};

function buildPreviewGarageItem(id, model, brand, category, year, mileage, price, image) {
  return {
    id,
    currentMileage: mileage,
    addedAt: "2024-05-01",
    motorcycle: {
      id,
      model,
      brand,
      category,
      year,
      price,
      image,
      imageUrl: image,
    },
  };
}

function normalizeCatalogBike(bike) {
  return {
    id: bike.id,
    brand: bike.brand || "Unknown Brand",
    category: bike.category || "Unknown Category",
    model: bike.model || "Saved Motorcycle",
    year: bike.year || "N/A",
    price: Number(bike.price || 0),
    image: resolveAssetPath(bike.imageUrl || bike.image_url || bike.image || "images/LOGO.png"),
  };
}

function normalizeGarageItem(item) {
  const motorcycle = item?.motorcycle || item?.bike || item || {};
  return {
    id: String(item?.id || item?.garageId || motorcycle?.garageId || motorcycle?.id || cryptoRandomId()),
    motorcycleId: motorcycle?.id || item?.motorcycleId || item?.bikeId || null,
    currentMileage: Number(item?.currentMileage ?? item?.mileage ?? motorcycle?.mileage ?? 0),
    addedAt: item?.addedAt || item?.createdAt || item?.dateAdded || null,
    purchaseDate: item?.purchaseDate || item?.createdAt || item?.addedAt || null,
    motorcycle: {
      id: motorcycle?.id || item?.motorcycleId || null,
      model: motorcycle?.model || item?.model || "Saved Motorcycle",
      brand: motorcycle?.brand || item?.brand || "Unknown Brand",
      category: motorcycle?.category || item?.category || "Unknown Category",
      year: motorcycle?.year || item?.year || "N/A",
      price: Number(motorcycle?.price ?? item?.price ?? 0),
      image: resolveAssetPath(motorcycle?.imageUrl || motorcycle?.image_url || motorcycle?.image || motorcycle?.imagePath || item?.image || "images/LOGO.png"),
    },
  };
}

function normalizeTask(task) {
  return {
    id: String(task?.id || cryptoRandomId()),
    title: task?.title || task?.task || task?.service || "Maintenance Task",
    description: task?.description || task?.note || task?.notes || "No description added.",
    dueDate: task?.dueDate || task?.date || task?.serviceDate || null,
    status: task?.status || "PENDING",
    mileage: task?.mileage || task?.currentMileage || "--",
    cost: task?.cost || task?.totalCost || null,
  };
}

function cryptoRandomId() {
  return `local-${Math.random().toString(36).slice(2)}`;
}

function resolveAssetPath(path) {
  const raw = String(path || "");
  if (!raw) return `${ASSET_BASE}/images/LOGO.png`;
  if (raw.startsWith("http") || raw.startsWith("data:") || raw.startsWith("../")) return raw;
  if (raw.startsWith("/")) return raw;
  return `${ASSET_BASE}/${raw}`;
}

function getLogoForBrand(brand) {
  return brandLogoMap[brand] || brandLogoMap[normalizeBrandName(brand)] || `${ASSET_BASE}/images/LOGO.png`;
}

function normalizeBrandName(brand) {
  if (brand === "Harley-Davidson") return "Harley";
  if (brand === "Indian Motorcycle") return "Indian";
  return brand;
}

function formatNumber(value) {
  return Number(value || 0).toLocaleString();
}

function formatMoney(value) {
  const number = Number(value || 0);
  if (!number) return "$0";
  return `$${number.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
}

function formatDate(value) {
  if (!value) return "--";
  const date = new Date(String(value).includes("T") ? value : `${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return "--";
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 2100);
}

function getStoredUser() {
  try {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
}

function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

function runningFromFileSystem() {
  return window.location.protocol === "file:";
}

function redirectToDesktopSignIn() {
  if (runningFromFileSystem()) return false;

  const redirectTarget = "mobile/index.html";
  window.location.replace(`${ASSET_BASE}/login.html?redirect=${encodeURIComponent(redirectTarget)}`);
  return true;
}

function getInitials(user) {
  const source = user?.username || user?.email || "Guest";
  return source
    .split(/[\s._-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "GU";
}

function normalizeUser(user) {
  if (!user) return null;
  return {
    id: user.id,
    username: user.username || (user.isDemo ? "Demo Rider" : "Rider"),
    email: user.email || (user.isDemo ? "demo@motorcycle-tracker.local" : ""),
    isDemo: Boolean(user.isDemo),
    role: user.isDemo ? "Demo Account" : "Rider Account",
    initials: getInitials(user),
  };
}

function saveAuth(token, user) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(normalizeUser(user)));
  state.user = normalizeUser(user);
}

function clearAuth() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  state.user = null;
}

async function apiRequest(path, options = {}) {
  const headers = new Headers(options.headers || {});
  const token = getToken();
  if (token && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  const response = await fetch(`${API_BASE_URL}${path}`, { ...options, headers });
  if (response.status === 401 || response.status === 403) {
    clearAuth();
  }
  return response;
}

async function readJson(response) {
  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

async function fetchJson(path, options = {}) {
  const response = await apiRequest(path, options);
  const data = await readJson(response);
  if (!response.ok) {
    throw new Error(`Backend returned ${response.status}`);
  }
  return data;
}

async function refreshCurrentUser() {
  if (!getToken()) return null;
  try {
    const user = await fetchJson("/auth/me");
    saveAuth(getToken(), user);
    return state.user;
  } catch {
    return null;
  }
}

async function signInDemo() {
  const response = await apiRequest("/auth/demo", { method: "POST" });
  const data = await readJson(response);
  if (!response.ok || !data?.token) {
    throw new Error("Demo login failed.");
  }

  saveAuth(data.token, {
    username: data.username || "Demo Rider",
    email: data.email || "demo@motorcycle-tracker.local",
    isDemo: true,
  });

  await refreshCurrentUser();
  state.authReady = true;
  render();
  return state.user;
}

async function initializeAuth() {
  state.user = normalizeUser(getStoredUser()) || null;

  if (!getToken()) {
    if (redirectToDesktopSignIn()) return false;

    // Local file preview only: keep the shell usable without a backend/login redirect.
    state.user = null;
    state.authReady = true;
    return true;
  }

  const user = await refreshCurrentUser();
  state.user = user || state.user;

  if (!state.user) {
    if (redirectToDesktopSignIn()) return false;
  }

  state.authReady = true;
  return true;
}

async function loadCatalog() {
  try {
    const backendMotorcycles = await fetchJson("/motorcycles");
    if (Array.isArray(backendMotorcycles) && backendMotorcycles.length) {
      state.catalog = backendMotorcycles.map(normalizeCatalogBike);
      state.backendOnline = true;
    }
  } catch (error) {
    console.warn("Using static motorcycle catalog for mobile.", error);
  } finally {
    state.catalogReady = true;
    render();
  }
}

async function loadTasksForGarage(garageId) {
  const tasks = await fetchJson(`/garage/${encodeURIComponent(garageId)}/tasks`);
  const normalizedTasks = Array.isArray(tasks) ? tasks.map(normalizeTask) : [];
  state.taskMap.set(String(garageId), normalizedTasks);
  return normalizedTasks;
}

async function loadAllTaskSummaries() {
  await Promise.allSettled(
    state.garageItems.map(async (item) => {
      if (!item.id) return;
      await loadTasksForGarage(item.id);
    })
  );
}

async function loadGarage() {
  try {
    const garageItems = await fetchJson("/garage");
    state.garageItems = Array.isArray(garageItems) ? garageItems.map(normalizeGarageItem) : [];
    state.backendOnline = true;
    await loadAllTaskSummaries();
  } catch (error) {
    console.warn("Using preview garage data for mobile.", error);
    state.garageItems = previewGarageItems.map(normalizeGarageItem);
    previewGarageItems.forEach((item, index) => {
      state.taskMap.set(String(item.id), index === 0 ? staticServicePreview.map(normalizeTask) : []);
    });
  } finally {
    if (!state.selectedGarageId && state.garageItems[0]) {
      state.selectedGarageId = String(state.garageItems[0].id);
    }
    if (!state.selectedMaintenanceGarageId && state.garageItems[0]) {
      state.selectedMaintenanceGarageId = String(state.garageItems[0].id);
    }
    state.garageReady = true;
    render();
  }
}

function routeTo(view) {
  state.previousView = state.view;
  state.view = view;
  state.updatesOpen = false;
  state.profileOpen = false;
  render();
}

function backToPrevious(fallback = "home") {
  routeTo(state.previousView || fallback);
}

function getBrands() {
  return [...new Set(state.catalog.map((bike) => bike.brand))].sort((a, b) => a.localeCompare(b));
}

function getCategoriesForBrand(brand) {
  return [...new Set(state.catalog.filter((bike) => bike.brand === brand).map((bike) => bike.category))].sort();
}

function getBikesForSelection() {
  const query = state.bikeQuery.trim().toLowerCase();
  return state.catalog.filter((bike) => {
    const brandMatch = !state.selectedBrand || bike.brand === state.selectedBrand;
    const categoryMatch = !state.selectedCategory || bike.category === state.selectedCategory;
    const queryMatch = !query || `${bike.brand} ${bike.category} ${bike.model}`.toLowerCase().includes(query);
    return brandMatch && categoryMatch && queryMatch;
  });
}

function getCatalogBikeById(id) {
  return state.catalog.find((bike) => String(bike.id) === String(id)) || state.catalog[0];
}

function getGarageItemById(id) {
  return state.garageItems.find((item) => String(item.id) === String(id)) || state.garageItems[0] || null;
}

function selectedGarageItem() {
  return getGarageItemById(state.selectedGarageId);
}

function selectedCatalogBike() {
  return getCatalogBikeById(state.selectedCatalogBikeId);
}

function getTasks(garageId) {
  return state.taskMap.get(String(garageId)) || [];
}

function getAllTasks() {
  return Array.from(state.taskMap.values()).flat();
}

function summarizeGarageTasks(garageId) {
  const tasks = getTasks(garageId);
  const active = tasks.filter((task) => task.status !== "DONE");
  const done = tasks.filter((task) => task.status === "DONE");
  const lastDone = done.find((task) => task.dueDate) || done[0] || null;
  const nextActive = active.find((task) => task.dueDate) || active[0] || null;
  return {
    total: tasks.length,
    active: active.length,
    done: done.length,
    lastService: lastDone?.dueDate ? formatDate(lastDone.dueDate) : done.length ? "Completed" : "--",
    nextService: nextActive?.dueDate ? formatDate(nextActive.dueDate) : active.length ? "Open task" : "--",
  };
}


function getTaskGroup(task) {
  const status = String(task?.status || "PENDING").trim().toUpperCase().replaceAll(" ", "_");
  if (["DONE", "COMPLETE", "COMPLETED"].includes(status)) return "completed";
  if (["IN_PROGRESS", "INPROGRESS", "STARTED", "ACTIVE"].includes(status)) return "in-progress";
  return "upcoming";
}

function getTaskGroupLabel(group) {
  const labels = {
    upcoming: "Upcoming",
    "in-progress": "In Progress",
    completed: "Completed",
  };
  return labels[group] || "Upcoming";
}

function getTaskDueMeta(task, selectedItem) {
  const group = getTaskGroup(task);
  if (group === "completed") {
    return {
      tone: "complete",
      primary: task.dueDate ? `Completed ${formatDate(task.dueDate)}` : "Completed",
      secondary: task.mileage && task.mileage !== "--" ? `${escapeHtml(task.mileage)} mi` : "Service history",
    };
  }

  if (task.dueDate) {
    const due = new Date(String(task.dueDate).includes("T") ? task.dueDate : `${task.dueDate}T00:00:00`);
    if (!Number.isNaN(due.getTime())) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      due.setHours(0, 0, 0, 0);
      const dayDiff = Math.round((due - today) / 86400000);
      if (dayDiff < 0) return { tone: "overdue", primary: `Overdue by ${Math.abs(dayDiff)} day${Math.abs(dayDiff) === 1 ? "" : "s"}`, secondary: formatDate(task.dueDate) };
      if (dayDiff === 0) return { tone: "warning", primary: "Due today", secondary: formatDate(task.dueDate) };
      return { tone: "warning", primary: `Due in ${dayDiff} day${dayDiff === 1 ? "" : "s"}`, secondary: formatDate(task.dueDate) };
    }
  }

  if (task.mileage && task.mileage !== "--") {
    const current = Number(selectedItem?.currentMileage || 0);
    const target = Number(String(task.mileage).replace(/[^0-9.]/g, ""));
    if (target && current) {
      const remaining = target - current;
      if (remaining < 0) return { tone: "overdue", primary: `Due ${formatNumber(Math.abs(remaining))} mi ago`, secondary: `${formatNumber(current)} / ${formatNumber(target)} mi` };
      return { tone: "warning", primary: `Due in ${formatNumber(remaining)} mi`, secondary: `${formatNumber(current)} / ${formatNumber(target)} mi` };
    }
    return { tone: "neutral", primary: `Due at ${escapeHtml(task.mileage)} mi`, secondary: "Mileage based" };
  }

  return { tone: "neutral", primary: group === "in-progress" ? "In progress" : "No due date", secondary: task.dueDate ? formatDate(task.dueDate) : "Add details later" };
}

function getUpdates() {
  if (typeof window.getAllUpdates === "function") return window.getAllUpdates();
  if (Array.isArray(window.updates)) return window.updates;
  return [
    { id: "mobile-preview", category: "Mobile", title: "Mobile App UI", shortText: "Testing the new app-style mobile interface.", fullText: "Testing the new app-style mobile interface." },
  ];
}

function getReadUpdateIds() {
  try {
    const ids = JSON.parse(localStorage.getItem(READ_UPDATES_KEY));
    return Array.isArray(ids) ? ids : [];
  } catch {
    return [];
  }
}

function saveReadUpdateIds(ids) {
  localStorage.setItem(READ_UPDATES_KEY, JSON.stringify(ids));
}

function isUpdateRead(id) {
  return getReadUpdateIds().includes(id);
}

function getUnreadUpdates() {
  return getUpdates().filter((update) => !isUpdateRead(update.id));
}

function toggleUpdateRead(id) {
  const ids = getReadUpdateIds();
  if (ids.includes(id)) {
    saveReadUpdateIds(ids.filter((readId) => readId !== id));
  } else {
    saveReadUpdateIds([...ids, id]);
  }
  render();
}

function toggleAllUpdatesRead() {
  const updates = getUpdates();
  const unread = getUnreadUpdates();
  saveReadUpdateIds(unread.length ? updates.map((update) => update.id) : []);
  render();
}

function renderHeader() {
  const avatar = escapeHtml(state.user?.initials || "GU");
  const unreadCount = getUnreadUpdates().length;

  if (["brand", "category", "bike-select", "bike-preview", "learn", "about", "contact", "updates"].includes(state.view)) {
    appHeader.innerHTML = `
      <button class="back-btn" type="button" data-route="${state.view === "brand" ? "home" : state.view === "category" ? "brand" : state.view === "bike-select" ? "category" : state.view === "bike-preview" ? "bike-select" : state.view === "learn" ? "home" : "more"}" aria-label="Back">${icons.back}</button>
      <div class="header-actions">
        <button class="icon-btn notification-btn ${unreadCount ? "has-unread" : ""}" type="button" data-action="toggle-updates" aria-label="Updates">
          ${icons.bell}${unreadCount ? `<span class="notification-badge">${unreadCount > 99 ? "99+" : unreadCount}</span>` : ""}
        </button>
        <button class="profile-btn" type="button" data-action="toggle-profile" aria-label="Profile"><span class="profile-avatar">${avatar}</span></button>
      </div>
    `;
    return;
  }

  if (state.view === "detail") {
    const item = selectedGarageItem();
    const model = item?.motorcycle?.model || "motorcycle";
    appHeader.innerHTML = `
      <button class="back-btn" type="button" data-route="garage" aria-label="Back to garage">${icons.back}</button>
      <div class="header-actions">
        <button class="icon-btn" type="button" data-action="share" aria-label="Share ${escapeHtml(model)}">${icons.share}</button>
        <button class="more-btn" type="button" data-action="bike-menu" aria-label="More options">${icons.dots}</button>
      </div>
    `;
    return;
  }

  appHeader.innerHTML = `
    <div class="logo-row">
      <div class="logo-mark">MT</div>
      <div class="logo-copy">
        <strong>Motorcycle</strong>
        <span>Tracker</span>
      </div>
    </div>
    <div class="header-actions">
      <button class="icon-btn notification-btn ${unreadCount ? "has-unread" : ""}" type="button" data-action="toggle-updates" aria-label="Updates">
        ${icons.bell}${unreadCount ? `<span class="notification-badge">${unreadCount > 99 ? "99+" : unreadCount}</span>` : ""}
      </button>
      <button class="profile-btn" type="button" data-action="toggle-profile" aria-label="Profile"><span class="profile-avatar">${avatar}</span></button>
    </div>
  `;
}

function renderHome() {
  const popular = ["Ducati", "BMW", "Kawasaki", "KTM"];

  return `
    <section class="screen home-screen">
      <p class="kicker">Track. Maintain. Ride.</p>
      <h1 class="hero-title">FIND YOUR<br><span>MOTORCYCLE</span></h1>
      <p class="lede">Explore motorcycles by brand and category. Start with a clean selection flow and build your garage later.</p>

      <div class="hero-bike-wrap">
        <img class="hero-bike" src="${ASSET_BASE}/images/HomePageBike.png" alt="Red Ducati motorcycle" />
      </div>

      <button class="primary-btn" type="button" data-route="brand">Select Motorcycle <span>→</span></button>
      <button class="secondary-btn" type="button" data-route="learn">Learn More</button>

      <div class="section-head">
        <h2>Popular Brands</h2>
        <button type="button" data-route="brand">View All</button>
      </div>

      <div class="brand-strip">
        ${popular.map((brand) => `
          <button class="brand-mini" type="button" data-select-brand="${escapeHtml(brand)}" data-route="category">
            <img src="${getLogoForBrand(brand)}" alt="${escapeHtml(brand)} logo" />
            <span>${escapeHtml(brand)}</span>
          </button>
        `).join("")}
      </div>
    </section>
  `;
}

function renderLearn() {
  return `
    <section class="screen info-screen">
      <p class="kicker">Tracker Flow</p>
      <h1 class="page-title">How it works</h1>
      <p class="page-copy">This matches the desktop Learn More flow: brand first, category second, then motorcycle results.</p>
      <div class="step-list">
        <article class="step-card"><span>01</span><strong>Select your brand</strong><p>Choose the motorcycle brand you want to explore first.</p></article>
        <article class="step-card"><span>02</span><strong>Pick a category</strong><p>Only valid categories for that brand will be shown.</p></article>
        <article class="step-card"><span>03</span><strong>View motorcycles</strong><p>See the motorcycles available for that brand and category.</p></article>
      </div>
      <button class="primary-btn" type="button" data-route="brand">Start Selection</button>
    </section>
  `;
}

function renderBrand() {
  const query = state.brandQuery.trim().toLowerCase();
  const filteredBrands = getBrands().filter((brand) => brand.toLowerCase().includes(query));

  return `
    <section class="screen brand-screen">
      <h1 class="page-title">Choose Your Brand</h1>

      <label class="search-wrap">
        ${icons.search}
        <input id="brand-search" type="search" placeholder="Search brand..." value="${escapeHtml(state.brandQuery)}" autocomplete="off" />
      </label>

      <div class="brand-grid">
        ${filteredBrands.map((brand) => `
          <button class="brand-card ${brand === state.selectedBrand ? "active" : ""}" type="button" data-select-brand="${escapeHtml(brand)}" data-route="category">
            <img src="${getLogoForBrand(brand)}" alt="${escapeHtml(brand)} logo" />
            <span>${escapeHtml(brand)}</span>
          </button>
        `).join("")}
      </div>

      ${filteredBrands.length ? "" : `<div class="empty-state">No brand matched that search.</div>`}

      <div class="request-card">
        <p>Don't see your brand?</p>
        <button class="tiny-btn" type="button" data-action="request-brand">Request a Brand</button>
      </div>
    </section>
  `;
}

function renderCategory() {
  const categories = getCategoriesForBrand(state.selectedBrand);
  return `
    <section class="screen category-screen">
      <p class="kicker">${escapeHtml(state.selectedBrand)}</p>
      <h1 class="page-title">Pick Category</h1>
      <p class="page-copy">Only categories available for ${escapeHtml(state.selectedBrand)} are shown.</p>
      <div class="category-grid">
        ${categories.map((category) => `
          <button class="category-card ${category === state.selectedCategory ? "active" : ""}" type="button" data-select-category="${escapeHtml(category)}" data-route="bike-select">
            <span>${escapeHtml(category)}</span>
            <small>${state.catalog.filter((bike) => bike.brand === state.selectedBrand && bike.category === category).length} bikes</small>
          </button>
        `).join("")}
      </div>
    </section>
  `;
}

function renderBikeSelect() {
  const bikes = getBikesForSelection();
  return `
    <section class="screen bike-select-screen">
      <p class="kicker">${escapeHtml(state.selectedBrand)} • ${escapeHtml(state.selectedCategory)}</p>
      <h1 class="page-title">Select Bike</h1>
      <label class="search-wrap">
        ${icons.search}
        <input id="bike-search" type="search" placeholder="Search motorcycle..." value="${escapeHtml(state.bikeQuery)}" autocomplete="off" />
      </label>
      <div class="catalog-list">
        ${bikes.map((bike) => renderCatalogCard(bike)).join("")}
      </div>
      ${bikes.length ? "" : `<div class="empty-state">No motorcycle matched that search.</div>`}
    </section>
  `;
}

function renderCatalogCard(bike) {
  return `
    <article class="bike-card catalog-card">
      <div class="bike-thumb"><img src="${bike.image}" alt="${escapeHtml(bike.model)}" /></div>
      <div class="bike-info">
        <div>
          <h3>${escapeHtml(bike.model)}</h3>
          <div class="meta-row"><span>${escapeHtml(String(bike.year))}</span><span class="dot-sep"></span><span>${escapeHtml(bike.category)}</span></div>
        </div>
        <div class="card-actions">
          <button class="detail-btn" type="button" data-catalog-detail="${escapeHtml(String(bike.id))}">View →</button>
          <button class="overflow-btn" type="button" data-add-catalog-bike="${escapeHtml(String(bike.id))}" aria-label="Add ${escapeHtml(bike.model)}">+</button>
        </div>
      </div>
    </article>
  `;
}

function renderBikePreview() {
  const bike = selectedCatalogBike();
  if (!bike) return `<section class="screen"><div class="empty-state">No motorcycle selected.</div></section>`;

  return `
    <section class="screen detail-screen">
      <div class="detail-hero">
        <div class="detail-brand-row">
          <img src="${getLogoForBrand(bike.brand)}" alt="${escapeHtml(bike.brand)} logo" />
          <div>
            <h1>${escapeHtml(bike.model)}</h1>
            <span>${escapeHtml(String(bike.year))}</span>
          </div>
        </div>
        <div class="detail-bike-stage"><img src="${bike.image}" alt="${escapeHtml(bike.model)}" /></div>
      </div>
      <div class="quick-specs">
        <div class="quick-spec"><span>Brand</span><strong>${escapeHtml(bike.brand)}</strong></div>
        <div class="quick-spec"><span>Category</span><strong>${escapeHtml(bike.category)}</strong></div>
        <div class="quick-spec"><span>Price</span><strong>${formatMoney(bike.price)}</strong></div>
      </div>
      <div class="detail-card">
        <h2>Add to Garage</h2>
        <p>This uses the same backend idea as desktop: select a motorcycle, enter mileage, then save it to your garage.</p>
        <button class="primary-btn block-gap" type="button" data-add-catalog-bike="${escapeHtml(String(bike.id))}">Add to Garage</button>
      </div>
    </section>
  `;
}

function renderGarage() {
  const totalMileage = state.garageItems.reduce((sum, item) => sum + Number(item.currentMileage || 0), 0);
  const totalDue = state.garageItems.reduce((sum, item) => sum + summarizeGarageTasks(item.id).active, 0);

  return `
    <section class="screen garage-screen">
      <div class="title-row">
        <div>
          <h1 class="page-title">My Garage</h1>
          <p class="page-copy">${state.backendOnline ? "Connected to backend." : "Preview mode. Backend not available."}</p>
        </div>
        <button class="add-btn" type="button" data-action="add-bike">+ Add Bike</button>
      </div>

      <div class="garage-list">
        ${state.garageItems.length ? state.garageItems.map(renderGarageCard).join("") : renderEmptyGarage()}
      </div>

      <div class="stat-grid">
        <div class="stat-card"><span class="stat-icon">${icons.bike}</span><span class="stat-copy"><span>Total Bikes</span><strong>${state.garageItems.length}</strong></span></div>
        <div class="stat-card"><span class="stat-icon blue">${icons.gauge}</span><span class="stat-copy"><span>Total Mileage</span><strong>${formatNumber(totalMileage)} mi</strong></span></div>
        <div class="stat-card"><span class="stat-icon">${icons.wrench}</span><span class="stat-copy"><span>Maintenance Due</span><strong>${totalDue}</strong></span></div>
        <div class="stat-card"><span class="stat-icon green">${icons.wallet}</span><span class="stat-copy"><span>Total Spent</span><strong>$0</strong></span></div>
      </div>
    </section>
  `;
}

function renderEmptyGarage() {
  return `
    <div class="empty-state stacked-empty">
      <p>No motorcycles saved yet.</p>
      <button class="primary-btn" type="button" data-action="add-bike">Add Your First Bike</button>
    </div>
  `;
}

function renderGarageCard(item) {
  const bike = item.motorcycle;
  const summary = summarizeGarageTasks(item.id);
  return `
    <article class="bike-card">
      <div class="bike-thumb"><img src="${bike.image}" alt="${escapeHtml(bike.model)}" /></div>
      <div class="bike-info">
        <div>
          <h3>${escapeHtml(bike.model)}</h3>
          <div class="meta-row"><span>${escapeHtml(String(bike.year))}</span><span class="dot-sep"></span><span>${formatNumber(item.currentMileage)} mi</span></div>
          ${summary.active ? `<span class="status-pill warn">${summary.active} open task${summary.active === 1 ? "" : "s"}</span>` : `<span class="status-pill ok">No open tasks</span>`}
        </div>
        <div class="card-actions">
          <button class="detail-btn" type="button" data-garage-detail="${escapeHtml(String(item.id))}">View Details →</button>
          <button class="overflow-btn" type="button" data-action="bike-menu" aria-label="More options for ${escapeHtml(bike.model)}">···</button>
        </div>
      </div>
    </article>
  `;
}

function renderDetail() {
  const item = selectedGarageItem();
  if (!item) return `<section class="screen"><div class="empty-state">No garage motorcycle selected.</div></section>`;
  const bike = item.motorcycle;
  const tabs = ["Overview", "Maintenance", "Notes", "Docs"];

  return `
    <section class="screen detail-screen">
      <div class="detail-hero">
        <div class="detail-brand-row">
          <img src="${getLogoForBrand(bike.brand)}" alt="${escapeHtml(bike.brand)} logo" />
          <div><h1>${escapeHtml(bike.model)}</h1><span>${escapeHtml(String(bike.year))}</span></div>
        </div>
        <div class="detail-bike-stage"><img src="${bike.image}" alt="${escapeHtml(bike.model)}" /></div>
      </div>

      <div class="quick-specs">
        <div class="quick-spec"><span>Mileage</span><strong>${formatNumber(item.currentMileage)} mi</strong></div>
        <div class="quick-spec"><span>Added</span><strong>${formatDate(item.addedAt)}</strong></div>
        <div class="quick-spec"><span>Price</span><strong>${formatMoney(bike.price)}</strong></div>
      </div>

      <div class="tabs" role="tablist" aria-label="Bike detail sections">
        ${tabs.map((tab) => `<button class="tab-btn ${state.detailTab === tab ? "active" : ""}" type="button" data-tab="${tab}">${tab}</button>`).join("")}
      </div>

      ${renderDetailTab(item)}
    </section>
  `;
}

function renderDetailTab(item) {
  const bike = item.motorcycle;
  const tasks = getTasks(item.id);
  const summary = summarizeGarageTasks(item.id);

  if (state.detailTab === "Maintenance") {
    return `
      <div class="detail-card">
        <h2>Recent Maintenance</h2>
        <p>${escapeHtml(bike.model)} has ${tasks.length} backend task${tasks.length === 1 ? "" : "s"}. Next service: ${escapeHtml(summary.nextService)}.</p>
        <div class="spec-list">
          ${tasks.slice(0, 3).map((task) => `<div class="spec-line"><span>${escapeHtml(task.title)}</span><strong>${escapeHtml(task.dueDate ? formatDate(task.dueDate) : task.status)}</strong></div>`).join("") || `<div class="spec-line"><span>No maintenance tasks yet</span><strong>--</strong></div>`}
        </div>
        <button class="secondary-btn" type="button" data-maintenance-for="${escapeHtml(String(item.id))}">Open Maintenance</button>
      </div>
    `;
  }

  if (state.detailTab === "Notes") {
    return `<div class="detail-card"><h2>Notes</h2><p>Mobile notes are still a frontend placeholder. Backend storage has not been added yet.</p></div>`;
  }

  if (state.detailTab === "Docs") {
    return `<div class="detail-card"><h2>Documents</h2><p>Insurance, title, service PDFs, and receipts can sit here once document upload backend support exists.</p></div>`;
  }

  return `
    <div class="detail-card">
      <h2>About This Bike</h2>
      <p>${escapeHtml(bike.model)} is saved in your garage from the backend garage endpoint.</p>
      <div class="spec-list">
        <div class="spec-line"><span>Brand</span><strong>${escapeHtml(bike.brand)}</strong></div>
        <div class="spec-line"><span>Category</span><strong>${escapeHtml(bike.category)}</strong></div>
        <div class="spec-line"><span>Year</span><strong>${escapeHtml(String(bike.year))}</strong></div>
        <div class="spec-line"><span>Garage ID</span><strong>${escapeHtml(String(item.id))}</strong></div>
      </div>
    </div>
  `;
}

function renderMaintenance() {
  const selectedItem = getGarageItemById(state.selectedMaintenanceGarageId) || state.garageItems[0] || null;
  const tasks = selectedItem ? getTasks(selectedItem.id) : [];
  const summary = selectedItem ? summarizeGarageTasks(selectedItem.id) : { total: 0, done: 0, lastService: "--", nextService: "--" };
  const groups = {
    upcoming: tasks.filter((task) => getTaskGroup(task) === "upcoming"),
    "in-progress": tasks.filter((task) => getTaskGroup(task) === "in-progress"),
    completed: tasks.filter((task) => getTaskGroup(task) === "completed"),
  };
  const activeGroup = state.maintenanceStatusFilter || "upcoming";
  const visibleTasks = groups[activeGroup] || groups.upcoming;
  const bikeName = selectedItem?.motorcycle?.model || "Select a motorcycle";

  return `
    <section class="screen maintenance-screen maintenance-v2-screen">
      <div class="title-row maintenance-title-row">
        <div>
          <h1 class="page-title">Maintenance</h1>
          <p class="page-copy">Filtered per motorcycle in your garage.</p>
        </div>
        <button class="add-btn" type="button" data-action="add-record">+ Add Record</button>
      </div>

      <div class="bike-filter-strip maintenance-bike-strip" aria-label="Garage motorcycle filter">
        ${state.garageItems.map((item) => `
          <button class="filter-chip ${String(item.id) === String(state.selectedMaintenanceGarageId) ? "active" : ""}" type="button" data-maintenance-filter="${escapeHtml(String(item.id))}">
            ${escapeHtml(item.motorcycle.model)}
          </button>
        `).join("") || `<button class="filter-chip active" type="button" data-action="add-bike">Add bike first</button>`}
      </div>

      <div class="maintenance-stats-v2" aria-label="Maintenance summary for ${escapeHtml(bikeName)}">
        <article class="maintenance-stat-v2"><span>Total Tasks</span><strong>${summary.total}</strong></article>
        <article class="maintenance-stat-v2"><span>Total Spent</span><strong>$0</strong></article>
        <article class="maintenance-stat-v2"><span>Last Service</span><strong>${escapeHtml(summary.lastService)}</strong></article>
        <article class="maintenance-stat-v2"><span>Next Service</span><strong>${escapeHtml(summary.nextService)}</strong></article>
      </div>

      <div class="maintenance-status-tabs" role="tablist" aria-label="Maintenance task status">
        ${["upcoming", "in-progress", "completed"].map((group) => `
          <button class="maintenance-status-tab ${activeGroup === group ? "active" : ""}" type="button" data-maintenance-status="${group}">
            <span>${getTaskGroupLabel(group)}</span><em>${groups[group].length}</em>
          </button>
        `).join("")}
      </div>

      <div class="maintenance-task-list-v2">
        ${visibleTasks.length ? visibleTasks.map((task) => renderTaskRow(task, selectedItem)).join("") : renderMaintenanceEmptyState(activeGroup)}
      </div>
    </section>
  `;
}

function renderMaintenanceEmptyState(group) {
  return `
    <div class="maintenance-empty-v2">
      <strong>No ${escapeHtml(getTaskGroupLabel(group).toLowerCase())} tasks</strong>
      <span>${group === "completed" ? "Completed work will show here." : "Add a record when this bike needs service."}</span>
    </div>
  `;
}

function renderTaskRow(task, selectedItem = null) {
  const group = getTaskGroup(task);
  const dueMeta = getTaskDueMeta(task, selectedItem);
  return `
    <button class="maintenance-task-card-v2 ${dueMeta.tone}" type="button" data-task-detail="${escapeHtml(task.id)}" aria-label="View ${escapeHtml(task.title)}">
      <div class="maintenance-task-main-v2">
        <strong>${escapeHtml(task.title)}</strong>
        <span>${escapeHtml(task.description || getTaskGroupLabel(group))}</span>
        <em>${escapeHtml(getTaskGroupLabel(group))}</em>
      </div>
      <div class="maintenance-task-due-v2">
        <strong>${escapeHtml(dueMeta.primary)}</strong>
        <span>${escapeHtml(dueMeta.secondary)}</span>
      </div>
      <span class="maintenance-task-arrow" aria-hidden="true">›</span>
    </button>
  `;
}

function renderMore() {
  const userName = state.user?.username || "Guest Rider";
  return `
    <section class="screen more-screen more-v2-screen">
      <p class="kicker">Menu</p>
      <h1 class="page-title">More</h1>
      <p class="page-copy">Product pages, support, updates, and future account tools.</p>

      <div class="more-account-card">
        <div>
          <span>${escapeHtml(state.user?.initials || "GU")}</span>
          <strong>${escapeHtml(userName)}</strong>
          <small>${state.backendOnline ? "Backend connected" : "Preview mode"}</small>
        </div>
        <button type="button" data-action="toggle-profile">Account</button>
      </div>

      <div class="more-section-label">Pages</div>
      <div class="more-grid more-grid-v2">
        <button class="more-card more-card-v2" type="button" data-route="about"><span><strong>About Us</strong><span>Read the purpose behind Motorcycle Tracker.</span></span><span>→</span></button>
        <button class="more-card more-card-v2" type="button" data-route="contact"><span><strong>Contact</strong><span>Questions, feedback, and project support.</span></span><span>→</span></button>
        <button class="more-card more-card-v2" type="button" data-route="updates"><span><strong>Updates</strong><span>Product notifications and changelog.</span></span><span>→</span></button>
      </div>

      <div class="more-section-label">Tracker</div>
      <div class="more-grid more-grid-v2">
        <button class="more-card more-card-v2" type="button" data-route="brand"><span><strong>Choose Brand</strong><span>Open the motorcycle selection flow.</span></span><span>→</span></button>
        <button class="more-card more-card-v2" type="button" data-action="request-brand"><span><strong>Request a Brand</strong><span>Future feedback feature.</span></span><span>→</span></button>
        <button class="more-card more-card-v2" type="button" data-action="future"><span><strong>Settings</strong><span>Profile, notifications, and preferences.</span></span><span>→</span></button>
      </div>
    </section>
  `;
}

function renderAbout() {
  return `
    <section class="screen info-screen about-mobile-screen mobile-story-screen">
      <p class="kicker">Project Overview</p>
      <h1 class="mobile-display-title">Built for riders who want a cleaner way to track their bikes</h1>
      <p class="page-copy mobile-large-copy">Motorcycle Tracker is a motorcycle management project focused on helping users explore bikes by brand and category, build a personal garage, and organize maintenance in one place.</p>

      <div class="mobile-story-card primary-story-card">
        <span>Motorcycle Tracker</span>
        <h2>Why this project exists</h2>
        <p>The goal is simple: make motorcycle selection and maintenance feel structured, visual, and easy to follow instead of scattered across notes, memory, and random tabs.</p>
      </div>

      <div class="mobile-mini-grid">
        <article><strong>Explore</strong><span>Browse motorcycles by brand and category.</span></article>
        <article><strong>Garage</strong><span>Save bikes and keep their details close.</span></article>
        <article><strong>Maintain</strong><span>Track service records in a cleaner flow.</span></article>
      </div>
    </section>
  `;
}

function renderContact() {
  return `
    <section class="screen info-screen contact-mobile-screen mobile-story-screen">
      <p class="kicker">Get in touch</p>
      <h1 class="mobile-display-title">Questions, feedback, or project support</h1>
      <p class="page-copy mobile-large-copy">Use this page to send a message about Motorcycle Tracker, report an issue, or ask a general question about the project.</p>

      <div class="mobile-mini-grid contact-mini-grid-mobile">
        <article><strong>Project Support</strong><span>Questions about the tracker, features, or general use.</span></article>
        <article><strong>Bug Reports</strong><span>Found something broken or not working as expected.</span></article>
      </div>

      <form class="mobile-contact-form" id="mobile-contact-form">
        <label>Name<input type="text" id="mobile-contact-name" placeholder="Your name" required /></label>
        <label>Email<input type="email" id="mobile-contact-email" placeholder="Your email" required /></label>
        <label>Subject<input type="text" id="mobile-contact-subject" placeholder="What is this about?" required /></label>
        <label>Message<textarea id="mobile-contact-message" placeholder="Write your message here" required></textarea></label>
        <button class="primary-btn" type="submit">Send Message</button>
      </form>
    </section>
  `;
}

function renderUpdatesPage() {
  const updates = getUpdates();
  return `
    <section class="screen updates-screen">
      <p class="kicker">Notifications</p>
      <h1 class="page-title">Updates</h1>
      <p class="page-copy">Uses the same local update data and read/unread behavior as the desktop notification widget.</p>
      <button class="secondary-btn compact-btn" type="button" data-action="toggle-all-updates-read">${getUnreadUpdates().length ? "Mark all read" : "Mark all unread"}</button>
      <div class="updates-list-mobile">
        ${updates.map((update) => renderUpdateCard(update)).join("")}
      </div>
    </section>
  `;
}

function renderUpdateCard(update) {
  const read = isUpdateRead(update.id);
  return `
    <article class="update-card ${read ? "read" : "unread"}">
      <span>${escapeHtml(update.category || "Update")}</span>
      <strong>${escapeHtml(update.title)}</strong>
      <p>${escapeHtml(update.shortText || update.fullText || "")}</p>
      <button class="tiny-btn" type="button" data-toggle-update-read="${escapeHtml(update.id)}">${read ? "Mark unread" : "Mark read"}</button>
    </article>
  `;
}

function renderMain() {
  switch (state.view) {
    case "brand": return renderBrand();
    case "category": return renderCategory();
    case "bike-select": return renderBikeSelect();
    case "bike-preview": return renderBikePreview();
    case "garage": return renderGarage();
    case "detail": return renderDetail();
    case "maintenance": return renderMaintenance();
    case "more": return renderMore();
    case "learn": return renderLearn();
    case "about": return renderAbout();
    case "contact": return renderContact();
    case "updates": return renderUpdatesPage();
    case "home":
    default: return renderHome();
  }
}

function renderOverlay() {
  const panels = [];
  if (state.updatesOpen) panels.push(renderUpdatesPanel());
  if (state.profileOpen) panels.push(renderProfilePanel());
  overlayLayer.innerHTML = panels.join("");
}

function renderUpdatesPanel() {
  const updates = getUpdates().slice(0, 3);
  const unreadCount = getUnreadUpdates().length;
  return `
    <div class="floating-panel updates-floating" data-floating-panel>
      <div class="floating-head"><strong>Latest Updates</strong><small>${unreadCount} unread</small></div>
      <div class="floating-list">
        ${updates.map((update) => renderUpdateCard(update)).join("")}
      </div>
      <div class="floating-actions">
        <button class="tiny-btn" type="button" data-action="toggle-all-updates-read">${unreadCount ? "Mark all read" : "Mark all unread"}</button>
        <button class="tiny-btn" type="button" data-route="updates">See all</button>
      </div>
    </div>
  `;
}

function renderProfilePanel() {
  const signedIn = Boolean(getToken() && state.user);
  const user = signedIn ? state.user : normalizeUser({ username: "Guest Rider", email: "Choose an account to continue", isDemo: false });
  const actionLabel = signedIn ? "Sign out" : "Sign in";
  const actionName = signedIn ? "sign-out" : "sign-in";

  return `
    <div class="floating-panel profile-floating" data-floating-panel>
      <div class="account-summary">
        <span class="profile-avatar-large">${escapeHtml(user.initials || "GU")}</span>
        <div>
          <strong>${escapeHtml(user.username || "Guest Rider")}</strong>
          <small>${escapeHtml(signedIn ? user.email || "Demo Account" : "Choose an account to continue")}</small>
        </div>
      </div>
      <button class="account-link disabled" type="button">Account Information</button>
      <button class="account-link disabled" type="button">Manage Billing</button>
      <button class="account-link disabled" type="button">Product Settings</button>
      <button class="account-link danger" type="button" data-action="${actionName}">${actionLabel}</button>
    </div>
  `;
}

function updateBottomNav() {
  const navViews = ["home", "garage", "maintenance", "more"];
  const activeView = navViews.includes(state.view) ? state.view : "";
  bottomNav.querySelectorAll(".nav-item").forEach((button) => {
    button.classList.toggle("active", button.dataset.route === activeView);
  });
  const hideBottom = ["brand", "category", "bike-select", "bike-preview", "detail", "learn", "about", "contact", "updates"].includes(state.view);
  appShell.classList.toggle("no-bottom", hideBottom);
}

function render() {
  renderHeader();
  appMain.innerHTML = renderMain();
  updateBottomNav();
  renderOverlay();
  bindDynamicEvents();
  appMain.scrollTop = 0;
}

function bindDynamicEvents() {
  const brandInput = document.getElementById("brand-search");
  if (brandInput && document.activeElement?.id !== "brand-search") {
    brandInput.focus({ preventScroll: true });
    brandInput.setSelectionRange(brandInput.value.length, brandInput.value.length);
  }
  const bikeInput = document.getElementById("bike-search");
  if (bikeInput && document.activeElement?.id !== "bike-search") {
    bikeInput.focus({ preventScroll: true });
    bikeInput.setSelectionRange(bikeInput.value.length, bikeInput.value.length);
  }

  const mobileContactForm = document.getElementById("mobile-contact-form");
  if (mobileContactForm && !mobileContactForm.dataset.bound) {
    mobileContactForm.dataset.bound = "true";
    mobileContactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const name = document.getElementById("mobile-contact-name")?.value.trim() || "";
      const email = document.getElementById("mobile-contact-email")?.value.trim() || "";
      const subject = document.getElementById("mobile-contact-subject")?.value.trim() || "Motorcycle Tracker Contact";
      const message = document.getElementById("mobile-contact-message")?.value.trim() || "";
      const emailSubject = encodeURIComponent(`Motorcycle Tracker Contact: ${subject}`);
      const emailBody = encodeURIComponent(`Name: ${name}
Email: ${email}

Message:
${message}`);
      window.location.href = `mailto:Kcolisah@gmail.com?subject=${emailSubject}&body=${emailBody}`;
    });
  }
}

function handleRouteClick(target) {
  const routeButton = target.closest("[data-route]");
  if (!routeButton) return false;
  const brand = routeButton.dataset.selectBrand || routeButton.dataset.brand;
  if (brand) {
    state.selectedBrand = brand;
    const categories = getCategoriesForBrand(brand);
    state.selectedCategory = categories[0] || "";
  }
  routeTo(routeButton.dataset.route);
  return true;
}

async function addCatalogBikeToGarage(bikeId) {
  const bike = getCatalogBikeById(bikeId);
  if (!bike) return;

  const mileageInput = window.prompt(`Enter current mileage for ${bike.model}:`, "0");
  if (mileageInput === null) return;
  const currentMileage = Number(mileageInput);
  if (Number.isNaN(currentMileage) || currentMileage < 0) {
    showToast("Enter a valid mileage number.");
    return;
  }

  try {
    await fetchJson(`/garage/${encodeURIComponent(bike.id)}?currentMileage=${encodeURIComponent(currentMileage)}`, { method: "POST" });
    showToast(`${bike.model} added to garage.`);
    await loadGarage();
    routeTo("garage");
  } catch (error) {
    console.error("Failed to add bike:", error);
    showToast("Could not add bike. Backend may be unavailable or garage may be full.");
  }
}

async function addMaintenanceRecord() {
  const garageId = state.selectedMaintenanceGarageId;
  if (!garageId) {
    showToast("Add or select a motorcycle first.");
    return;
  }

  const title = window.prompt("Maintenance task title:", "Oil Change");
  if (!title) return;
  const description = window.prompt("Description:", "") || "";
  const dueDate = window.prompt("Due date (YYYY-MM-DD, optional):", "") || null;

  try {
    await fetchJson(`/garage/${encodeURIComponent(garageId)}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: title.trim(), description: description.trim(), dueDate }),
    });
    await loadTasksForGarage(garageId);
    showToast("Maintenance task added.");
    render();
  } catch (error) {
    console.error("Failed to add maintenance record:", error);
    showToast("Could not add maintenance task.");
  }
}

function handleSelectionClick(target) {
  const brandButton = target.closest("[data-select-brand]");
  if (brandButton) {
    state.selectedBrand = brandButton.dataset.selectBrand;
    const categories = getCategoriesForBrand(state.selectedBrand);
    state.selectedCategory = categories[0] || "";
    return false;
  }

  const categoryButton = target.closest("[data-select-category]");
  if (categoryButton) {
    state.selectedCategory = categoryButton.dataset.selectCategory;
    state.bikeQuery = "";
    return false;
  }

  const catalogDetail = target.closest("[data-catalog-detail]");
  if (catalogDetail) {
    state.selectedCatalogBikeId = catalogDetail.dataset.catalogDetail;
    routeTo("bike-preview");
    return true;
  }

  const addCatalog = target.closest("[data-add-catalog-bike]");
  if (addCatalog) {
    addCatalogBikeToGarage(addCatalog.dataset.addCatalogBike);
    return true;
  }

  const garageDetail = target.closest("[data-garage-detail]");
  if (garageDetail) {
    state.selectedGarageId = garageDetail.dataset.garageDetail;
    state.detailTab = "Overview";
    routeTo("detail");
    return true;
  }

  const maintenanceFilter = target.closest("[data-maintenance-filter]");
  if (maintenanceFilter) {
    state.selectedMaintenanceGarageId = maintenanceFilter.dataset.maintenanceFilter;
    state.maintenanceStatusFilter = "upcoming";
    render();
    return true;
  }

  const maintenanceStatus = target.closest("[data-maintenance-status]");
  if (maintenanceStatus) {
    state.maintenanceStatusFilter = maintenanceStatus.dataset.maintenanceStatus || "upcoming";
    render();
    return true;
  }

  const maintenanceFor = target.closest("[data-maintenance-for]");
  if (maintenanceFor) {
    state.selectedMaintenanceGarageId = maintenanceFor.dataset.maintenanceFor;
    routeTo("maintenance");
    return true;
  }

  const tabButton = target.closest("[data-tab]");
  if (tabButton) {
    state.detailTab = tabButton.dataset.tab;
    render();
    return true;
  }

  const updateToggle = target.closest("[data-toggle-update-read]");
  if (updateToggle) {
    toggleUpdateRead(updateToggle.dataset.toggleUpdateRead);
    return true;
  }

  return false;
}

async function handleActionClick(target) {
  const actionButton = target.closest("[data-action]");
  if (!actionButton) return false;
  const action = actionButton.dataset.action;

  if (action === "toggle-updates") {
    state.updatesOpen = !state.updatesOpen;
    state.profileOpen = false;
    render();
    return true;
  }

  if (action === "toggle-profile") {
    state.profileOpen = !state.profileOpen;
    state.updatesOpen = false;
    render();
    return true;
  }

  if (action === "toggle-all-updates-read") {
    toggleAllUpdatesRead();
    return true;
  }

  if (action === "sign-out") {
    clearAuth();
    state.profileOpen = false;
    window.location.href = `${ASSET_BASE}/login.html?redirect=${encodeURIComponent("mobile/index.html")}`;
    return true;
  }

  if (action === "sign-in") {
    state.profileOpen = false;
    window.location.href = `${ASSET_BASE}/login.html?redirect=${encodeURIComponent("mobile/index.html")}`;
    return true;
  }

  if (action === "demo-login") {
    try {
      await signInDemo();
      showToast("Demo user signed in.");
      await loadGarage();
    } catch {
      showToast("Demo login failed.");
    }
    return true;
  }

  if (action === "add-bike") {
    state.selectedBrand = state.selectedBrand || "Ducati";
    routeTo("brand");
    return true;
  }

  if (action === "add-record") {
    await addMaintenanceRecord();
    return true;
  }

  const messages = {
    "request-brand": "Request Brand is planned for a later backend pass.",
    "bike-menu": "Bike options are placeholders for now.",
    share: "Share action can be wired later.",
    future: "This section is planned for a later pass.",
  };
  showToast(messages[action] || "Coming later.");
  return true;
}

appHeader.addEventListener("click", async (event) => {
  if (handleRouteClick(event.target)) return;
  await handleActionClick(event.target);
});

bottomNav.addEventListener("click", (event) => {
  handleRouteClick(event.target);
});

appMain.addEventListener("click", async (event) => {
  if (handleSelectionClick(event.target)) return;
  if (handleRouteClick(event.target)) return;
  await handleActionClick(event.target);
});

overlayLayer.addEventListener("click", async (event) => {
  if (handleSelectionClick(event.target)) return;
  if (handleRouteClick(event.target)) return;
  if (await handleActionClick(event.target)) return;
  if (!event.target.closest("[data-floating-panel]")) {
    state.profileOpen = false;
    state.updatesOpen = false;
    render();
  }
});

document.addEventListener("click", (event) => {
  const clickedInsideFloating = event.target.closest("[data-floating-panel]");
  const clickedTrigger = event.target.closest("[data-action='toggle-updates'], [data-action='toggle-profile']");
  if (!clickedInsideFloating && !clickedTrigger && (state.profileOpen || state.updatesOpen)) {
    state.profileOpen = false;
    state.updatesOpen = false;
    render();
  }
});

appMain.addEventListener("input", (event) => {
  if (event.target.id === "brand-search") {
    state.brandQuery = event.target.value;
    render();
  }
  if (event.target.id === "bike-search") {
    state.bikeQuery = event.target.value;
    render();
  }
});

async function init() {
  render();
  const authReady = await initializeAuth();
  if (!authReady) return;
  await Promise.allSettled([loadCatalog(), loadGarage()]);
}

init();
