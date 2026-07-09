const ASSET_BASE = "../assets";
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

const mobileCompareSpecsMap = {
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
  compareIds: { a: null, b: null },
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
  lastDataError: null,
  isReloading: false,
  updatesOpen: false,
  profileOpen: false,
  activeTaskId: null,
  activeBikeActionId: null,
  activeFormSheet: null,
  activeAddCatalogBikeId: null,
  activeRemoveGarageId: null,
  activeEditTaskId: null,
  activeFeaturePreview: null,
  lastSavedGarageId: null,
  isSubmittingForm: false,
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
  lightning: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13 2 4 14h7l-1 8 10-13h-7z"></path></svg>`,
  bike: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="7" cy="17" r="3"></circle><circle cx="17" cy="17" r="3"></circle><path d="M7 17h4l3-7h2l1 7"></path><path d="M9 10h5"></path></svg>`,
  wrench: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.5 6.5a4 4 0 0 0 4.9 4.9L11 19.8a2.2 2.2 0 1 1-3.1-3.1l8.4-8.4a4 4 0 0 0-1.8-1.8Z"></path></svg>`,
  wallet: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h15a1 1 0 0 1 1 1v11H5a2 2 0 0 1-2-2V7.8A2.8 2.8 0 0 1 5.8 5H18"></path><path d="M16 13h4"></path></svg>`,
  calendar: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3v4"></path><path d="M17 3v4"></path><rect x="4" y="5" width="16" height="16" rx="2"></rect><path d="M4 10h16"></path></svg>`,
  plus: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14"></path><path d="M5 12h14"></path></svg>`,
  chevron: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6"></path></svg>`,
  scales: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v16"></path><path d="M5 7h14"></path><path d="M7 7 4 14h6L7 7Z"></path><path d="M17 7l-3 7h6l-3-7Z"></path><path d="M8 20h8"></path></svg>`,
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

function closeAllSheets() {
  state.activeTaskId = null;
  state.activeBikeActionId = null;
  state.activeFormSheet = null;
  state.activeAddCatalogBikeId = null;
  state.activeRemoveGarageId = null;
  state.activeEditTaskId = null;
  state.activeFeaturePreview = null;
  state.isSubmittingForm = false;
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
    state.lastDataError = "catalog";
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
    state.lastDataError = "garage";
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
  closeAllSheets();
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

function selectedAddCatalogBike() {
  return getCatalogBikeById(state.activeAddCatalogBikeId);
}

function getTasks(garageId) {
  return state.taskMap.get(String(garageId)) || [];
}

function findTaskContext(taskId) {
  for (const item of state.garageItems) {
    const task = getTasks(item.id).find((entry) => String(entry.id) === String(taskId));
    if (task) return { task, garageItem: item };
  }
  return { task: null, garageItem: null };
}

function statusForTaskGroup(group) {
  if (group === "completed") return "DONE";
  if (group === "in-progress") return "IN_PROGRESS";
  return "PENDING";
}

function getTaskActionCopy(group) {
  return group === "completed" ? "Mark completed" : `Move to ${getTaskGroupLabel(group)}`;
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

  if (["brand", "category", "bike-select", "bike-preview", "learn", "about", "contact", "updates", "v1"].includes(state.view)) {
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


function renderLoadingScreen(label = "Loading Motorcycle Tracker") {
  return `
    <section class="screen loading-screen">
      <div class="loading-card">
        <span class="loading-mark">MT</span>
        <strong>${escapeHtml(label)}</strong>
        <p>Preparing garage, maintenance, and rider data.</p>
        <div class="loading-bar"><span></span></div>
      </div>
    </section>
  `;
}

function renderBackendNotice(context = "mobile") {
  if (state.backendOnline) return "";
  if (!state.garageReady && !state.catalogReady) return "";
  return `
    <div class="mobile-data-notice">
      <strong>Preview mode</strong>
      <span>Using safe demo data while backend is unavailable.</span>
      <button type="button" data-action="retry-data">Retry</button>
    </div>
  `;
}

function renderMobileBrandMarquee() {
  const brands = ["BMW", "DUCATI", "HARLEY", "HONDA", "INDIAN", "KAWASAKI", "KTM", "SUZUKI", "TRIUMPH", "YAMAHA", "APRILIA"];
  const tickerItems = [...brands, ...brands].map((brand) => `<span>${escapeHtml(brand)}</span>`).join("");
  return `
    <div class="mobile-brand-marquee" aria-label="Motorcycle brand ticker">
      <div class="mobile-brand-track">${tickerItems}</div>
    </div>
  `;
}

function renderPlaceholderCard(title, copy, actionLabel = "Coming soon") {
  return `
    <article class="placeholder-card">
      <strong>${escapeHtml(title)}</strong>
      <p>${escapeHtml(copy)}</p>
      <button class="tiny-btn" type="button" data-action="future">${escapeHtml(actionLabel)}</button>
    </article>
  `;
}


function renderMobileReviewGuide() {
  return `
    <div class="mobile-review-guide">
      <div class="mobile-review-head">
        <span>Review Build</span>
        <strong>Try this first</strong>
      </div>
      <div class="mobile-review-steps">
        <button type="button" data-route="brand"><b>01</b><span>Pick a bike</span></button>
        <button type="button" data-route="garage"><b>02</b><span>Open garage</span></button>
        <button type="button" data-route="maintenance"><b>03</b><span>Add service</span></button>
        <button type="button" data-route="compare"><b>04</b><span>Compare next</span></button>
      </div>
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
      ${renderBackendNotice("home")}
      ${renderMobileReviewGuide()}

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

      ${renderMobileBrandMarquee()}
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
  if (!state.catalogReady) return renderLoadingScreen("Loading motorcycle catalog");
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

      <div class="request-card request-preview-card">
        <span class="mini-status-pill">Catalog feedback</span>
        <p>Don’t see your brand or motorcycle?</p>
        <small>Requests are preview-only for this build. This shows how rider feedback will work once backend intake is connected.</small>
        <button class="tiny-btn" type="button" data-action="request-brand">Preview Request Flow</button>
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
  if (!state.catalogReady) return renderLoadingScreen("Loading motorcycles");
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


function renderMobileSavedNextActions() {
  const item = getGarageItemById(state.lastSavedGarageId);
  if (!item) return "";
  const bike = item.motorcycle;

  return `
    <div class="mobile-saved-next-card">
      <span>Saved to Garage</span>
      <strong>${escapeHtml(bike.model)}</strong>
      <p>Next, open the garage record, start a maintenance task, or compare this bike against another model.</p>
      <div class="mobile-saved-actions">
        <button type="button" data-garage-detail="${escapeHtml(String(item.id))}">View Garage</button>
        <button type="button" data-action="start-maintenance-after-save" data-garage-id="${escapeHtml(String(item.id))}">Start Maintenance</button>
        <button type="button" data-route="compare">Compare</button>
      </div>
    </div>
  `;
}

function renderMobileGarageOnboarding() {
  const hasBikes = state.garageItems.length > 0;
  return `
    <div class="mobile-ownership-guide ${hasBikes ? "has-bikes" : "is-empty"}">
      <span>${hasBikes ? "Ownership Hub" : "Start Here"}</span>
      <strong>${hasBikes ? "Your saved bikes become service records." : "Your garage is the heart of the tracker."}</strong>
      <p>${hasBikes ? "Open a bike to view details, start maintenance, or keep building history over time." : "Save a motorcycle first. Then you can track mileage, service work, reminders, and ownership notes."}</p>
      <div class="mobile-ownership-points">
        <em>Garage</em>
        <em>Service</em>
        <em>History</em>
      </div>
    </div>
  `;
}

function renderGarage() {
  if (!state.garageReady) return renderLoadingScreen("Loading garage");
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

      ${renderBackendNotice("garage")}
      ${renderMobileGarageOnboarding()}
      ${renderMobileSavedNextActions()}

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
    <div class="empty-state stacked-empty mobile-empty-garage-v2">
      <span>Garage empty</span>
      <strong>Save your first motorcycle.</strong>
      <p>Once a bike is saved, this becomes your ownership dashboard for mileage, service work, records, and future reminders.</p>
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
          <button class="overflow-btn" type="button" data-bike-actions="${escapeHtml(String(item.id))}" aria-label="More options for ${escapeHtml(bike.model)}">···</button>
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
  const summary = summarizeGarageTasks(item.id);

  return `
    <section class="screen detail-screen bike-detail-v2-screen">
      <div class="detail-hero detail-hero-v2">
        <div class="detail-brand-row">
          <img src="${getLogoForBrand(bike.brand)}" alt="${escapeHtml(bike.brand)} logo" />
          <div><h1>${escapeHtml(bike.model)}</h1><span>${escapeHtml(String(bike.year))} • ${escapeHtml(bike.category)}</span></div>
        </div>
        <div class="detail-bike-stage"><img src="${bike.image}" alt="${escapeHtml(bike.model)}" /></div>
      </div>

      <div class="bike-detail-summary-v2">
        <article><span>Mileage</span><strong>${formatNumber(item.currentMileage)} mi</strong></article>
        <article><span>Open Tasks</span><strong>${summary.active}</strong></article>
        <article><span>Next Service</span><strong>${escapeHtml(summary.nextService)}</strong></article>
      </div>


      <div class="tabs tabs-v2" role="tablist" aria-label="Bike detail sections">
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
    const recentTasks = tasks.slice(0, 4);
    return `
      <div class="detail-card detail-card-v2">
        <div class="detail-section-title">
          <div><span>Service</span><h2>Maintenance summary</h2></div>
          <button class="tiny-btn" type="button" data-maintenance-for="${escapeHtml(String(item.id))}">Open</button>
        </div>
        <div class="detail-mini-stats">
          <article><span>Total</span><strong>${summary.total}</strong></article>
          <article><span>Done</span><strong>${summary.done}</strong></article>
          <article><span>Next</span><strong>${escapeHtml(summary.nextService)}</strong></article>
        </div>
        <div class="detail-task-preview-list">
          ${recentTasks.length ? recentTasks.map((task) => renderTaskRow(task, item)).join("") : renderMaintenanceEmptyState("upcoming")}
        </div>
      </div>
    `;
  }

  if (state.detailTab === "Notes") {
    return `
      <div class="detail-card detail-card-v2 placeholder-flow-card">
        <div class="detail-section-title"><div><span>Notes</span><h2>Rider notes</h2></div></div>
        ${renderPlaceholderCard("No notes yet", "Add bike-specific reminders, repair thoughts, mod plans, or inspection notes once note storage is wired.", "Add note soon")}
        <div class="placeholder-list-v2">
          <article><strong>Service ideas</strong><span>Track what you want to check next.</span></article>
          <article><strong>Mod plans</strong><span>Keep future upgrades tied to the bike.</span></article>
          <article><strong>Ride notes</strong><span>Record small issues before they become expensive.</span></article>
        </div>
      </div>
    `;
  }

  if (state.detailTab === "Docs") {
    return `
      <div class="detail-card detail-card-v2 placeholder-flow-card">
        <div class="detail-section-title"><div><span>Documents</span><h2>Receipts and records</h2></div></div>
        ${renderPlaceholderCard("No documents uploaded", "Receipts, service PDFs, title photos, insurance cards, and inspection records can live here later.", "Upload coming soon")}
        <div class="placeholder-list-v2 docs-list-v2">
          <article><strong>Receipts</strong><span>Oil, tires, parts, labor.</span></article>
          <article><strong>Service Records</strong><span>Dealer or shop paperwork.</span></article>
          <article><strong>Bike Photos</strong><span>Proof, condition, upgrades.</span></article>
        </div>
      </div>
    `;
  }

  return `
    <div class="detail-card detail-card-v2">
      <div class="detail-section-title"><div><span>Overview</span><h2>Bike dashboard</h2></div></div>
      <p>${escapeHtml(bike.model)} is saved in your garage. This overview keeps key ownership details and maintenance direction in one compact mobile view.</p>
      <div class="spec-list spec-list-v2">
        <div class="spec-line"><span>Brand</span><strong>${escapeHtml(bike.brand)}</strong></div>
        <div class="spec-line"><span>Category</span><strong>${escapeHtml(bike.category)}</strong></div>
        <div class="spec-line"><span>Year</span><strong>${escapeHtml(String(bike.year))}</strong></div>
        <div class="spec-line"><span>Added</span><strong>${formatDate(item.addedAt)}</strong></div>
        <div class="spec-line"><span>Total Spent</span><strong>$0</strong></div>
      </div>
    </div>
  `;
}

function renderMobileMaintenanceGuide(selectedItem) {
  const hasBike = Boolean(selectedItem);
  return `
    <div class="mobile-maintenance-guide ${hasBike ? "has-bike" : "needs-bike"}">
      <span>${hasBike ? "Service Board" : "Pick a Bike"}</span>
      <strong>${hasBike ? "Track the work that keeps this bike ready." : "Maintenance starts from a saved garage bike."}</strong>
      <p>${hasBike ? "Use quick records for oil, chain, tires, brakes, or custom issues. Completed work becomes history later." : "Save a motorcycle to your garage, then open its board to create service records."}</p>
      <div>
        <em>Oil</em>
        <em>Chain</em>
        <em>Tires</em>
        <em>Brakes</em>
      </div>
    </div>
  `;
}

function renderMaintenance() {
  if (!state.garageReady) return renderLoadingScreen("Loading maintenance");
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

      ${renderBackendNotice("maintenance")}
      ${renderMobileMaintenanceGuide(selectedItem)}

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
  const title = `No ${getTaskGroupLabel(group).toLowerCase()} tasks`;
  const helper = group === "completed"
    ? "Finished service will become this bike's history."
    : "Add oil, chain, tire, brake, or custom service work when this bike needs attention.";
  return `
    <div class="maintenance-empty-v2 mobile-maintenance-empty-v2">
      <strong>${escapeHtml(title)}</strong>
      <span>${escapeHtml(helper)}</span>
      ${group !== "completed" ? `<button type="button" data-action="add-record">Add First Record</button>` : ""}
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


function parseCompareNumber(value) {
  if (value === null || value === undefined || value === "") return null;
  if (typeof value === "number") return Number.isFinite(value) ? value : null;
  const match = String(value).replace(/,/g, "").match(/-?\d+(\.\d+)?/);
  return match ? Number(match[0]) : null;
}

function getMobileCompareSpecs(model) {
  return mobileCompareSpecsMap[model] || {};
}

function escapeRegExp(value) {
  return String(value || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function getCompareDisplayModel(bike) {
  const model = String(bike?.model || "Motorcycle").trim();
  const brand = String(bike?.brand || "").trim();
  if (!brand) return model;
  const brandPrefix = new RegExp(`^${escapeRegExp(brand)}[\\s_-]*`, "i");
  return model.replace(brandPrefix, "").trim() || model;
}

function getCompareFullModelLabel(bike) {
  return String(bike?.model || "Motorcycle").replace(/[_-]+/g, " ").replace(/\s+/g, " ").trim();
}

const mobileCompareExtraSpecsMap = {
  "Yamaha R6": { fuelCapacity: "3.7 gal", abs: "Yes" },
  "Suzuki GSX 750R": { fuelCapacity: "4.0 gal", abs: "Yes" },
  "Yamaha R7": { fuelCapacity: "3.4 gal", abs: "Yes" },
  "Yamaha R1": { fuelCapacity: "4.5 gal", abs: "Yes" },
  "Suzuki GSX 600R": { fuelCapacity: "4.5 gal", abs: "Yes" },
  "Suzuki GSX 1000R": { fuelCapacity: "4.2 gal", abs: "Yes" },
  "Kawasaki Ninja ZX6R": { fuelCapacity: "4.5 gal", abs: "Yes" },
  "Kawasaki Ninja ZX 10R": { fuelCapacity: "4.5 gal", abs: "Yes" },
  "Honda CBR 600RR": { fuelCapacity: "4.8 gal", abs: "Yes" },
  "Honda CBR 1000RR": { fuelCapacity: "4.3 gal", abs: "Yes" },
};

function getMobileCompareExtraSpecs(bike) {
  const direct = mobileCompareExtraSpecsMap[bike?.model] || {};
  const category = String(bike?.category || "").toLowerCase();
  let fallbackFuel = "4.0 gal";
  if (category.includes("cruiser")) fallbackFuel = "3.8 gal";
  if (category.includes("sport")) fallbackFuel = "3.7 gal";
  if (category.includes("supersport")) fallbackFuel = "4.5 gal";
  if (category.includes("hyper")) fallbackFuel = "4.5 gal";
  return {
    fuelCapacity: bike?.fuelCapacity || direct.fuelCapacity || fallbackFuel,
    abs: bike?.abs || direct.abs || "Yes",
  };
}

function normalizeCompareBike(bike) {
  if (!bike) return null;
  const fallbackSpecs = getMobileCompareSpecs(bike.model);
  const extraSpecs = getMobileCompareExtraSpecs(bike);
  const directHorsepowerValue = parseCompareNumber(bike.horsepower);
  const horsepowerValue = parseCompareNumber(bike.horsepower ?? fallbackSpecs.horsepower);
  const zeroToSixtySeconds = parseCompareNumber(bike.zeroSixty ?? fallbackSpecs.zeroSixty);
  const topSpeed = bike.topSpeed || fallbackSpecs.topSpeed || "Not added yet";
  const weight = bike.weight || fallbackSpecs.weight || "Not added yet";
  const fuelCapacity = extraSpecs.fuelCapacity || "Not added yet";
  const engine = bike.engine || fallbackSpecs.engine || "Not added yet";
  const priceValue = parseCompareNumber(bike.price);
  return {
    ...bike,
    priceValue,
    displayModel: getCompareDisplayModel(bike),
    fullModelLabel: getCompareFullModelLabel(bike),
    engine,
    engineDisplacementValue: parseCompareNumber(engine),
    horsepower: bike.horsepower ? (Number.isFinite(directHorsepowerValue) ? `${directHorsepowerValue} hp` : String(bike.horsepower)) : fallbackSpecs.horsepower || "Not added yet",
    horsepowerValue,
    zeroSixty: bike.zeroSixty || fallbackSpecs.zeroSixty || "Not added yet",
    zeroToSixtySeconds,
    topSpeed,
    topSpeedValue: parseCompareNumber(topSpeed),
    weight,
    weightValue: parseCompareNumber(weight),
    fuelCapacity,
    fuelCapacityValue: parseCompareNumber(fuelCapacity),
    abs: extraSpecs.abs || "Yes",
  };
}

function getDefaultCompareBike(side, excludeId = null) {
  const preferredModel = side === "a" ? "Yamaha R6" : "Suzuki GSX 750R";
  return state.catalog.find((bike) => bike.model === preferredModel && String(bike.id) !== String(excludeId))
    || state.catalog.find((bike) => String(bike.id) !== String(excludeId))
    || state.catalog[0]
    || null;
}

function ensureCompareDefaults() {
  if (!state.catalog.length) return;
  const yamaha = getDefaultCompareBike("a");
  const suzuki = getDefaultCompareBike("b", yamaha?.id);
  if (!state.compareIds.a && yamaha) state.compareIds.a = String(yamaha.id);
  if (!state.compareIds.b && suzuki) state.compareIds.b = String(suzuki.id);
}

function getCompareBike(side) {
  ensureCompareDefaults();
  const id = state.compareIds[side];
  const bike = state.catalog.find((entry) => String(entry.id) === String(id)) || getDefaultCompareBike(side) || state.catalog[0];
  return normalizeCompareBike(bike);
}

function getCompareModelsForBrand(brand) {
  return [...new Set(state.catalog.filter((bike) => bike.brand === brand).map((bike) => bike.model))].sort((a, b) => a.localeCompare(b));
}

function getCompareYearsForModel(brand, model) {
  return [...new Set(state.catalog.filter((bike) => bike.brand === brand && bike.model === model).map((bike) => bike.year))].sort((a, b) => Number(b) - Number(a));
}

function findCompareCandidate({ brand, model, year, excludeId }) {
  let candidates = state.catalog.filter((bike) => (!brand || bike.brand === brand) && (!model || bike.model === model) && (!year || String(bike.year) === String(year)));
  if (!candidates.length && brand && model) candidates = state.catalog.filter((bike) => bike.brand === brand && bike.model === model);
  if (!candidates.length && brand) candidates = state.catalog.filter((bike) => bike.brand === brand);
  if (!candidates.length) candidates = state.catalog;
  return candidates.find((bike) => String(bike.id) !== String(excludeId)) || candidates[0] || null;
}

function updateCompareSelection(side, field, value) {
  const current = getCompareBike(side);
  const otherSide = side === "a" ? "b" : "a";
  let brand = current?.brand || getBrands()[0] || "";
  let model = current?.model || "";
  let year = current?.year || "";

  if (field === "brand") {
    brand = value;
    model = getCompareModelsForBrand(brand)[0] || "";
    year = getCompareYearsForModel(brand, model)[0] || "";
  }

  if (field === "model") {
    model = value;
    year = getCompareYearsForModel(brand, model)[0] || "";
  }

  if (field === "year") {
    year = value;
  }

  const candidate = findCompareCandidate({ brand, model, year, excludeId: state.compareIds[otherSide] });
  if (candidate) state.compareIds[side] = String(candidate.id);
  render();
}

function swapCompareBikes() {
  const oldA = state.compareIds.a;
  state.compareIds.a = state.compareIds.b;
  state.compareIds.b = oldA;
  render();
}

function resetCompareBike(side) {
  const otherSide = side === "a" ? "b" : "a";
  const replacement = getDefaultCompareBike(side, state.compareIds[otherSide]);
  if (replacement) state.compareIds[side] = String(replacement.id);
  render();
}

function compareSelectOptions(values, selectedValue) {
  return values.map((value) => `<option value="${escapeHtml(String(value))}" ${String(value) === String(selectedValue) ? "selected" : ""}>${escapeHtml(String(value))}</option>`).join("");
}

function formatCompareAcceleration(value) {
  const number = parseCompareNumber(value);
  return Number.isFinite(number) ? `${number.toFixed(number % 1 === 0 ? 0 : 1)} sec` : value ?? "--";
}

function compareStoreCard(side, bike) {
  return `
    <article class="compare-store-bike-card compare-store-bike-${side}">
      <div class="compare-store-card-top">
        <span>Bike ${side.toUpperCase()}</span>
        <button class="compare-store-close" type="button" data-action="compare-reset-${side}" aria-label="Reset Bike ${side.toUpperCase()}">×</button>
      </div>
      <div class="compare-store-bike-stage">
        <img src="${bike.image}" alt="${escapeHtml(bike.model)}" />
      </div>
      <div class="compare-store-bike-copy">
        <small>${escapeHtml(bike.brand)}</small>
        <strong>${escapeHtml(bike.displayModel)}</strong>
        <em>${escapeHtml(String(bike.year))}</em>
        <b>${formatMoney(bike.price)} <span>USD</span></b>
      </div>
      <div class="compare-store-spec-chips">
        <span>${icons.lightning}${escapeHtml(bike.horsepower)}</span>
        <span>${icons.gauge}${escapeHtml(bike.topSpeed)}</span>
      </div>
    </article>
  `;
}

function compareStoreSelectGroup(side, bike) {
  const brands = getBrands();
  const models = getCompareModelsForBrand(bike.brand);
  const years = getCompareYearsForModel(bike.brand, bike.model);
  return `
    <div class="compare-store-select-group compare-store-select-${side}">
      <div class="compare-store-select-title"><span>${side === "a" ? "First Pick" : "Second Pick"}</span><small>${side === "a" ? "Baseline" : "Challenger"}</small></div>
      <label><span>Brand</span><select data-compare-side="${side}" data-compare-field="brand" aria-label="Bike ${side.toUpperCase()} brand">${compareSelectOptions(brands, bike.brand)}</select></label>
      <label><span>Model</span><select data-compare-side="${side}" data-compare-field="model" aria-label="Bike ${side.toUpperCase()} model">${compareSelectOptions(models, bike.model)}</select></label>
      <label><span>Year</span><select data-compare-side="${side}" data-compare-field="year" aria-label="Bike ${side.toUpperCase()} year">${compareSelectOptions(years, bike.year)}</select></label>
    </div>
  `;
}

function getCompareStoreWinner(row, bikeA, bikeB) {
  if (row.type === "text") return String(bikeA[row.key]) === String(bikeB[row.key]) ? "tie" : "none";
  const a = Number(bikeA[row.key]);
  const b = Number(bikeB[row.key]);
  if (!Number.isFinite(a) || !Number.isFinite(b)) {
    const displayA = row.displayKey ? bikeA[row.displayKey] : bikeA[row.key];
    const displayB = row.displayKey ? bikeB[row.displayKey] : bikeB[row.key];
    return String(displayA) === String(displayB) ? "tie" : "none";
  }
  if (a === b) return "tie";
  if (row.lowerWins) return a < b ? "a" : "b";
  return a > b ? "a" : "b";
}

function formatCompareStoreValue(row, bike) {
  const rawValue = row.displayKey ? bike[row.displayKey] : bike[row.key];
  if (row.formatter) return row.formatter(rawValue);
  return rawValue ?? "--";
}

function renderCompareStoreRows(bikeA, bikeB) {
  const rows = [
    { label: "Year", key: "year", type: "text" },
    { label: "Price", key: "priceValue", type: "number", lowerWins: true, formatter: (value) => formatMoney(value) },
    { label: "Power", key: "horsepowerValue", displayKey: "horsepower", type: "number" },
    { label: "Engine", key: "engineDisplacementValue", displayKey: "engine", type: "number" },
    { label: "0–60 mph", key: "zeroToSixtySeconds", displayKey: "zeroSixty", type: "number", lowerWins: true, formatter: formatCompareAcceleration },
    { label: "Top Speed", key: "topSpeedValue", displayKey: "topSpeed", type: "number" },
    { label: "Weight (Wet)", key: "weightValue", displayKey: "weight", type: "number", lowerWins: true },
    { label: "Fuel Capacity", key: "fuelCapacityValue", displayKey: "fuelCapacity", type: "number" },
    { label: "ABS", key: "abs", type: "text" },
  ];

  return rows.map((row) => {
    const winner = getCompareStoreWinner(row, bikeA, bikeB);
    const displayA = formatCompareStoreValue(row, bikeA);
    const displayB = formatCompareStoreValue(row, bikeB);
    const result = winner === "tie" ? "=" : winner === "a" || winner === "b" ? "✓" : "—";
    return `
      <div class="compare-store-row compare-store-winner-${winner}">
        <div class="compare-store-row-label">${escapeHtml(row.label)}</div>
        <div class="compare-store-row-value compare-store-value-a">
          ${winner === "a" ? `<em>Winner</em>` : ""}
          <span>${escapeHtml(String(displayA ?? "--"))}</span>
        </div>
        <div class="compare-store-row-result"><b>${escapeHtml(result)}</b></div>
        <div class="compare-store-row-value compare-store-value-b">
          <span>${escapeHtml(String(displayB ?? "--"))}</span>
          ${winner === "b" ? `<em>Winner</em>` : ""}
        </div>
      </div>
    `;
  }).join("");
}

function getCompareInsightWinner(row, bikeA, bikeB) {
  return getCompareStoreWinner(row, bikeA, bikeB);
}

function getCompareInsightName(winner, bikeA, bikeB) {
  if (winner === "a") return bikeA.displayModel;
  if (winner === "b") return bikeB.displayModel;
  return "Both bikes";
}

function getMobileBikeUseCase(bike) {
  const category = String(bike.category || "").toLowerCase();
  const power = Number(bike.horsepowerValue) || 0;
  const speed = Number(bike.topSpeedValue) || 0;
  const weight = Number(bike.weightValue) || 0;
  const price = Number(bike.priceValue) || 0;

  if (category.includes("cruiser")) return "Relaxed street riding and longer ownership comfort.";
  if (category.includes("hyper") || power >= 180 || speed >= 185) return "Maximum performance and experienced-rider goals.";
  if (category.includes("super") || power >= 120) return "Sport riding, track focus, and long-term growth.";
  if (weight && weight <= 390 && price && price <= 8000) return "Lightweight daily riding and easier ownership.";
  if (price && price <= 9000) return "Value-focused ownership without overspending.";
  return "Balanced riding with room for garage and maintenance tracking.";
}

function getMobileCompareVerdict(bikeA, bikeB) {
  const rows = [
    { key: "horsepowerValue", type: "number" },
    { key: "topSpeedValue", type: "number" },
    { key: "zeroToSixtySeconds", type: "number", lowerWins: true },
    { key: "priceValue", type: "number", lowerWins: true },
    { key: "weightValue", type: "number", lowerWins: true },
  ];

  let aWins = 0;
  let bWins = 0;

  rows.forEach((row) => {
    const winner = getCompareInsightWinner(row, bikeA, bikeB);
    if (winner === "a") aWins += 1;
    if (winner === "b") bWins += 1;
  });

  if (aWins === bWins) return "This is a balanced matchup. Pick based on the ownership style you want to track.";
  const winner = aWins > bWins ? bikeA.displayModel : bikeB.displayModel;
  return `${winner} leads more categories, but garage fit and maintenance plans still decide the better ownership choice.`;
}

function renderCompareStoreInsights(bikeA, bikeB) {
  const powerWinner = getCompareInsightWinner({ key: "horsepowerValue", type: "number" }, bikeA, bikeB);
  const speedWinner = getCompareInsightWinner({ key: "topSpeedValue", type: "number" }, bikeA, bikeB);
  const priceWinner = getCompareInsightWinner({ key: "priceValue", type: "number", lowerWins: true }, bikeA, bikeB);
  const weightWinner = getCompareInsightWinner({ key: "weightValue", type: "number", lowerWins: true }, bikeA, bikeB);

  return `
    <section class="compare-store-insight-card" aria-label="Comparison insights">
      <div class="compare-store-section-title">Quick Read</div>
      <div class="compare-store-verdict">
        <span>${icons.gauge}</span>
        <p>${escapeHtml(getMobileCompareVerdict(bikeA, bikeB))}</p>
      </div>

      <div class="compare-store-best-grid">
        <div>
          <small>First Pick</small>
          <strong>${escapeHtml(bikeA.displayModel)}</strong>
          <p>${escapeHtml(getMobileBikeUseCase(bikeA))}</p>
        </div>
        <div>
          <small>Second Pick</small>
          <strong>${escapeHtml(bikeB.displayModel)}</strong>
          <p>${escapeHtml(getMobileBikeUseCase(bikeB))}</p>
        </div>
      </div>

      <div class="compare-store-insight-grid">
        <span><b>Power</b><em>${escapeHtml(getCompareInsightName(powerWinner, bikeA, bikeB))}</em></span>
        <span><b>Speed</b><em>${escapeHtml(getCompareInsightName(speedWinner, bikeA, bikeB))}</em></span>
        <span><b>Value</b><em>${escapeHtml(getCompareInsightName(priceWinner, bikeA, bikeB))}</em></span>
        <span><b>Daily Use</b><em>${escapeHtml(getCompareInsightName(weightWinner, bikeA, bikeB))}</em></span>
      </div>
    </section>
  `;
}

function renderCompare() {
  if (!state.catalogReady) return renderLoadingScreen("Loading compare catalog");
  ensureCompareDefaults();
  const bikeA = getCompareBike("a");
  const bikeB = getCompareBike("b");

  return `
    <section class="screen compare-store-screen">
      <div class="compare-store-intro">
        <p class="kicker">Compare</p>
        <h1>Compare Motorcycles</h1>
        <p>Side-by-side specs and key details to find your perfect ride.</p>
      </div>

      <section class="compare-store-product-panel" aria-label="Selected motorcycle comparison">
        <div class="compare-store-product-grid">
          ${compareStoreCard("a", bikeA)}
          ${compareStoreCard("b", bikeB)}
        </div>
        <button class="compare-store-swap" type="button" data-action="compare-swap"><span aria-hidden="true">↔</span><strong>Swap</strong></button>
      </section>

      <section class="compare-store-select-panel" aria-label="Motorcycle selectors">
        ${compareStoreSelectGroup("a", bikeA)}
        ${compareStoreSelectGroup("b", bikeB)}
      </section>

      ${renderCompareStoreInsights(bikeA, bikeB)}

      <section class="compare-store-table-card" aria-label="Spec comparison">
        <div class="compare-store-section-title">Spec Comparison</div>
        <div class="compare-store-table-head">
          <span>Category</span>
          <span>Bike A<small>${escapeHtml(bikeA.fullModelLabel)}</small></span>
          <span></span>
          <span>Bike B<small>${escapeHtml(bikeB.fullModelLabel)}</small></span>
        </div>
        <div class="compare-store-table-body">
          ${renderCompareStoreRows(bikeA, bikeB)}
        </div>
      </section>
    </section>
  `;
}

function renderMore() {
  const userName = state.user?.username || "Guest Rider";
  return `
    <section class="screen more-screen more-v2-screen compact-more-screen">
      <p class="kicker">Menu</p>
      <h1 class="page-title compact-page-title">More</h1>
      <p class="page-copy compact-page-copy">Pages, tracker tools, support, and account options.</p>

      <div class="more-account-card compact-account-card">
        <div>
          <span>${escapeHtml(state.user?.initials || "GU")}</span>
          <strong>${escapeHtml(userName)}</strong>
          <small>${state.backendOnline ? "Backend connected" : "Preview mode"}</small>
        </div>
        <button type="button" data-action="toggle-profile">Account</button>
      </div>

      <div class="more-section-group">
        <div class="more-section-label">Pages</div>
        <div class="more-list-v3">
          <button class="more-row-v3" type="button" data-route="about"><span><strong>About Us</strong><small>Project purpose and direction.</small></span><em>→</em></button>
          <button class="more-row-v3" type="button" data-route="contact"><span><strong>Contact</strong><small>Feedback, support, and questions.</small></span><em>→</em></button>
          <button class="more-row-v3" type="button" data-route="updates"><span><strong>Updates</strong><small>Notifications and changelog.</small></span><em>→</em></button>
        </div>
      </div>

      <div class="more-section-group">
        <div class="more-section-label">Tracker</div>
        <div class="more-list-v3">
          <button class="more-row-v3" type="button" data-route="brand"><span><strong>Choose Brand</strong><small>Open motorcycle selection.</small></span><em>→</em></button>
          <button class="more-row-v3" type="button" data-route="v1"><span><strong>Roadmap</strong><small>Now, next, and later product direction.</small></span><em>→</em></button>
          <button class="more-row-v3" type="button" data-action="request-brand"><span><strong>Request Catalog</strong><small>Preview brand, model, and spec requests.</small></span><em>→</em></button>
          <button class="more-row-v3" type="button" data-action="preview-feature" data-feature="settings"><span><strong>Settings</strong><small>Preview profile and app preferences.</small></span><em>→</em></button>
        </div>
      </div>

      <div class="mobile-feedback-card">
        <span>Reviewer Mode</span>
        <strong>Tell me what would make this useful.</strong>
        <p>Best feedback: what felt confusing, what felt valuable, and what you would track for your own bike.</p>
        <div>
          <button type="button" data-action="preview-feature" data-feature="feedback">Feedback Guide</button>
          <button type="button" data-action="preview-feature" data-feature="roadmap">Roadmap</button>
        </div>
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


function renderV1Checklist() {
  const sections = [
    { label: "Now", items: ["Garage and maintenance loop", "Compare insights", "Reviewer feedback prompts", "Desktop/mobile product parity"] },
    { label: "Next", items: ["Backend-powered garage history", "Persistent maintenance records", "Catalog/admin request review", "Demo limits enforced by API"] },
    { label: "Later", items: ["Reminder engine", "Ownership cost tracking", "Mod/build history", "VIN/recall integrations"] },
  ];

  return `
    <section class="screen info-screen v1-screen">
      <p class="kicker">Product Roadmap</p>
      <h1 class="page-title compact-page-title">What comes next</h1>
      <p class="page-copy compact-page-copy">The current build shows the frontend product shell. The next major sprint makes the garage and maintenance history real through the backend.</p>
      <div class="v1-checklist">
        ${sections.map((section) => `
          <article class="v1-card">
            <strong>${escapeHtml(section.label)}</strong>
            <ul>
              ${section.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
            </ul>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function renderUpdatesPage() {
  const updates = getUpdates();
  const unreadCount = getUnreadUpdates().length;
  return `
    <section class="screen updates-screen updates-inbox-screen">
      <p class="kicker">Notifications</p>
      <h1 class="page-title compact-page-title">Updates</h1>
      <p class="page-copy compact-page-copy">A cleaner inbox for product updates, mobile changes, and tracker notices.</p>
      <div class="updates-summary-v2">
        <article><span>Unread</span><strong>${unreadCount}</strong></article>
        <article><span>Total</span><strong>${updates.length}</strong></article>
      </div>
      <button class="secondary-btn compact-btn" type="button" data-action="toggle-all-updates-read">${unreadCount ? "Mark all read" : "Mark all unread"}</button>
      <div class="updates-list-mobile updates-list-v2">
        ${updates.length ? updates.map((update) => renderUpdateCard(update)).join("") : renderUpdatesEmptyState()}
      </div>
    </section>
  `;
}

function renderUpdatesEmptyState() {
  return `
    <div class="maintenance-empty-v2 updates-empty-v2">
      <strong>No updates yet</strong>
      <span>Product changes and tracker notices will appear here.</span>
    </div>
  `;
}

function renderUpdateCard(update) {
  const read = isUpdateRead(update.id);
  return `
    <article class="update-card update-card-v2 ${read ? "read" : "unread"}">
      <div class="update-card-top">
        <span>${escapeHtml(update.category || "Update")}</span>
        <em>${read ? "Read" : "New"}</em>
      </div>
      <strong>${escapeHtml(update.title)}</strong>
      <p>${escapeHtml(update.shortText || update.fullText || "")}</p>
      <button class="tiny-btn" type="button" data-toggle-update-read="${escapeHtml(update.id)}">${read ? "Mark unread" : "Mark read"}</button>
    </article>
  `;
}

function renderMain() {
  if (!state.authReady && !runningFromFileSystem()) return renderLoadingScreen("Preparing secure session");
  switch (state.view) {
    case "brand": return renderBrand();
    case "category": return renderCategory();
    case "bike-select": return renderBikeSelect();
    case "bike-preview": return renderBikePreview();
    case "garage": return renderGarage();
    case "detail": return renderDetail();
    case "maintenance": return renderMaintenance();
    case "compare": return renderCompare();
    case "more": return renderMore();
    case "learn": return renderLearn();
    case "about": return renderAbout();
    case "contact": return renderContact();
    case "updates": return renderUpdatesPage();
    case "v1": return renderV1Checklist();
    case "home":
    default: return renderHome();
  }
}


function renderTaskActionSheet() {
  if (!state.activeTaskId) return "";
  const { task, garageItem } = findTaskContext(state.activeTaskId);
  if (!task) return "";
  const group = getTaskGroup(task);
  const dueMeta = getTaskDueMeta(task, garageItem);
  const bikeName = garageItem?.motorcycle?.model || "Selected motorcycle";

  return `
    <div class="sheet-backdrop" data-action="close-sheet"></div>
    <section class="bottom-sheet task-sheet" data-floating-panel role="dialog" aria-label="Maintenance task actions">
      <div class="sheet-handle" aria-hidden="true"></div>
      <div class="sheet-head">
        <span>${escapeHtml(getTaskGroupLabel(group))}</span>
        <button type="button" data-action="close-sheet" aria-label="Close">×</button>
      </div>
      <h2>${escapeHtml(task.title)}</h2>
      <p>${escapeHtml(task.description || "No description added.")}</p>
      <div class="sheet-meta-grid">
        <div><span>Bike</span><strong>${escapeHtml(bikeName)}</strong></div>
        <div><span>Due</span><strong>${escapeHtml(dueMeta.primary)}</strong></div>
        <div><span>Details</span><strong>${escapeHtml(dueMeta.secondary)}</strong></div>
      </div>
      <div class="sheet-action-group">
        <span>Move status</span>
        ${["upcoming", "in-progress", "completed"].map((targetGroup) => `
          <button class="sheet-action-btn ${group === targetGroup ? "active" : ""}" type="button" data-action="move-task-status" data-task-status="${targetGroup}">
            ${escapeHtml(getTaskActionCopy(targetGroup))}
          </button>
        `).join("")}
      </div>
      <button class="sheet-action-btn sheet-single-action" type="button" data-action="edit-task-placeholder" data-edit-task-id="${escapeHtml(String(task.id))}">Edit task details</button>
      <div class="sheet-footer-actions">
        <button class="secondary-btn compact-btn" type="button" data-maintenance-for="${escapeHtml(String(garageItem?.id || ""))}">View Maintenance</button>
        <button class="secondary-btn compact-btn" type="button" data-route="detail" data-garage-detail="${escapeHtml(String(garageItem?.id || ""))}">View Bike</button>
      </div>
    </section>
  `;
}

function renderBikeActionSheet() {
  if (!state.activeBikeActionId) return "";
  const item = getGarageItemById(state.activeBikeActionId);
  if (!item) return "";
  const bike = item.motorcycle;
  const summary = summarizeGarageTasks(item.id);

  return `
    <div class="sheet-backdrop" data-action="close-sheet"></div>
    <section class="bottom-sheet bike-sheet" data-floating-panel role="dialog" aria-label="Bike actions">
      <div class="sheet-handle" aria-hidden="true"></div>
      <div class="sheet-head">
        <span>Garage Bike</span>
        <button type="button" data-action="close-sheet" aria-label="Close">×</button>
      </div>
      <h2>${escapeHtml(bike.model)}</h2>
      <p>${escapeHtml(String(bike.year))} • ${formatNumber(item.currentMileage)} mi • ${summary.active} open task${summary.active === 1 ? "" : "s"}</p>
      <div class="sheet-action-group">
        <button class="sheet-action-btn" type="button" data-garage-detail="${escapeHtml(String(item.id))}">View Details</button>
        <button class="sheet-action-btn" type="button" data-maintenance-for="${escapeHtml(String(item.id))}">Maintenance</button>
        <button class="sheet-action-btn" type="button" data-action="bike-notes-placeholder">Notes</button>
        <button class="sheet-action-btn danger-soft" type="button" data-action="open-remove-bike" data-remove-bike-id="${escapeHtml(String(item.id))}">Remove Bike</button>
      </div>
    </section>
  `;
}

function renderAddBikeFormSheet() {
  const bike = selectedAddCatalogBike();
  if (!bike) return "";
  return `
    <div class="sheet-backdrop" data-action="close-sheet"></div>
    <section class="bottom-sheet form-sheet" data-floating-panel role="dialog" aria-label="Add motorcycle mileage">
      <div class="sheet-handle" aria-hidden="true"></div>
      <div class="sheet-head">
        <span>Add to Garage</span>
        <button type="button" data-action="close-sheet" aria-label="Close">×</button>
      </div>
      <h2>${escapeHtml(bike.model)}</h2>
      <p>Enter the current mileage before adding this motorcycle to your garage.</p>
      <div class="sheet-bike-preview">
        <img src="${bike.image}" alt="${escapeHtml(bike.model)}" />
        <div><strong>${escapeHtml(String(bike.year))} ${escapeHtml(bike.brand)}</strong><span>${escapeHtml(bike.category)} • ${formatMoney(bike.price)}</span></div>
      </div>
      <form class="sheet-form" id="add-bike-form">
        <label>Current mileage
          <input id="add-bike-mileage" type="number" inputmode="numeric" min="0" step="1" placeholder="0" value="0" required />
        </label>
        <button class="primary-btn" type="submit" ${state.isSubmittingForm ? "disabled" : ""}>${state.isSubmittingForm ? "Adding..." : "Add to Garage"}</button>
        <button class="secondary-btn" type="button" data-action="close-sheet">Cancel</button>
      </form>
    </section>
  `;
}

function renderMaintenanceFormSheet() {
  const item = getGarageItemById(state.selectedMaintenanceGarageId);
  const bikeName = item?.motorcycle?.model || "Selected motorcycle";
  return `
    <div class="sheet-backdrop" data-action="close-sheet"></div>
    <section class="bottom-sheet form-sheet" data-floating-panel role="dialog" aria-label="Add maintenance task">
      <div class="sheet-handle" aria-hidden="true"></div>
      <div class="sheet-head">
        <span>Add Record</span>
        <button type="button" data-action="close-sheet" aria-label="Close">×</button>
      </div>
      <h2>New maintenance task</h2>
      <p>Add a service reminder for ${escapeHtml(bikeName)}. This replaces the browser prompt flow.</p>
      <form class="sheet-form" id="maintenance-form">
        <label>Task title
          <input id="maintenance-title" type="text" placeholder="Oil Change" required />
        </label>
        <label>Description
          <textarea id="maintenance-description" placeholder="Oil, filter, notes, or parts used"></textarea>
        </label>
        <div class="sheet-form-grid">
          <label>Due date
            <input id="maintenance-due-date" type="date" />
          </label>
          <label>Mileage note
            <input id="maintenance-mileage" type="number" inputmode="numeric" min="0" step="1" placeholder="Optional" />
          </label>
        </div>
        <label>Status
          <select id="maintenance-status">
            <option value="PENDING">Upcoming</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="DONE">Completed</option>
          </select>
        </label>
        <button class="primary-btn" type="submit" ${state.isSubmittingForm ? "disabled" : ""}>${state.isSubmittingForm ? "Saving..." : "Save Task"}</button>
        <button class="secondary-btn" type="button" data-action="close-sheet">Cancel</button>
      </form>
    </section>
  `;
}

function renderRemoveBikeConfirmSheet() {
  const item = getGarageItemById(state.activeRemoveGarageId);
  if (!item) return "";
  const bike = item.motorcycle;
  return `
    <div class="sheet-backdrop" data-action="close-sheet"></div>
    <section class="bottom-sheet form-sheet danger-sheet" data-floating-panel role="dialog" aria-label="Remove bike confirmation">
      <div class="sheet-handle" aria-hidden="true"></div>
      <div class="sheet-head">
        <span>Remove Bike</span>
        <button type="button" data-action="close-sheet" aria-label="Close">×</button>
      </div>
      <h2>Remove ${escapeHtml(bike.model)}?</h2>
      <p>This confirmation UI is ready. If the backend delete endpoint is available, it will remove the bike. Preview mode removes it locally only.</p>
      <div class="sheet-warning-card">
        <strong>${escapeHtml(String(bike.year))} ${escapeHtml(bike.brand)}</strong>
        <span>${formatNumber(item.currentMileage)} mi • ${summarizeGarageTasks(item.id).total} task${summarizeGarageTasks(item.id).total === 1 ? "" : "s"}</span>
      </div>
      <div class="sheet-footer-actions">
        <button class="secondary-btn compact-btn" type="button" data-action="close-sheet">Keep Bike</button>
        <button class="primary-btn compact-btn danger-primary" type="button" data-action="confirm-remove-bike" data-remove-bike-id="${escapeHtml(String(item.id))}" ${state.isSubmittingForm ? "disabled" : ""}>${state.isSubmittingForm ? "Removing..." : "Remove"}</button>
      </div>
    </section>
  `;
}

function renderEditTaskPlaceholderSheet() {
  const { task, garageItem } = findTaskContext(state.activeEditTaskId);
  if (!task) return "";
  return `
    <div class="sheet-backdrop" data-action="close-sheet"></div>
    <section class="bottom-sheet form-sheet" data-floating-panel role="dialog" aria-label="Edit task details">
      <div class="sheet-handle" aria-hidden="true"></div>
      <div class="sheet-head">
        <span>Edit Task</span>
        <button type="button" data-action="close-sheet" aria-label="Close">×</button>
      </div>
      <h2>${escapeHtml(task.title)}</h2>
      <p>Edit form layout is ready for ${escapeHtml(garageItem?.motorcycle?.model || "this bike")}. Backend update wiring can come after the API endpoint is confirmed.</p>
      <form class="sheet-form" id="edit-task-form">
        <label>Task title
          <input id="edit-task-title" type="text" value="${escapeHtml(task.title)}" />
        </label>
        <label>Description
          <textarea id="edit-task-description">${escapeHtml(task.description || "")}</textarea>
        </label>
        <div class="sheet-footer-actions">
          <button class="secondary-btn compact-btn" type="button" data-action="close-sheet">Cancel</button>
          <button class="primary-btn compact-btn" type="submit">Save Later</button>
        </div>
      </form>
    </section>
  `;
}

function getPreviewFeatureConfig(feature) {
  const configs = {
    account: {
      eyebrow: "Account Preview",
      title: "Account information is coming soon",
      copy: "This will show rider profile details, saved garage count, account status, and login/security information once the backend account screen is finalized.",
      items: ["Profile details", "Garage summary", "Login and security status"],
    },
    billing: {
      eyebrow: "Billing Preview",
      title: "Billing is not active yet",
      copy: "Motorcycle Tracker is not charging users right now. This area is reserved for future premium features after the core garage and maintenance product is real.",
      items: ["No active subscription", "No payment required", "Future premium tools"],
    },
    settings: {
      eyebrow: "Settings Preview",
      title: "Product settings are planned",
      copy: "This will eventually control app preferences, motorcycle units, notification rules, and account-level product settings.",
      items: ["Units and display", "Reminder preferences", "Notification controls"],
    },
    share: {
      eyebrow: "Share Preview",
      title: "Share cards will come later",
      copy: "This will eventually let riders share a bike profile, garage summary, or maintenance record with a clean public card.",
      items: ["Bike profile share", "Garage snapshot", "Maintenance proof"],
    },
    feedback: {
      eyebrow: "Feedback Guide",
      title: "Review the rider loop",
      copy: "Useful feedback is not just whether it looks good. I need to know if the flow makes sense: pick a bike, save it, track service, compare a future upgrade, and understand why you would return.",
      items: ["What confused you?", "What felt useful?", "What would make you come back?"],
    },
    roadmap: {
      eyebrow: "Roadmap Preview",
      title: "The next product layers are planned",
      copy: "The mobile app previews the future direction before backend persistence is wired: history, reminders, cost tracking, mods, and admin-reviewed catalog requests.",
      items: ["Backend garage history", "Maintenance reminders", "Costs and mods later"],
    },
    future: {
      eyebrow: "Coming Soon",
      title: "This feature is planned for later",
      copy: "The mobile shell is ready, but this action needs backend support or a later product pass before it becomes active.",
      items: ["Preview UI ready", "Backend wiring later", "No broken dead-end"],
    },
  };

  return configs[feature] || configs.future;
}

function renderRequestBrandSheet() {
  return `
    <div class="sheet-backdrop" data-action="close-sheet"></div>
    <section class="bottom-sheet form-sheet feature-preview-sheet" data-floating-panel role="dialog" aria-label="Request brand or motorcycle preview">
      <div class="sheet-handle" aria-hidden="true"></div>
      <div class="sheet-head">
        <span>Request Catalog</span>
        <button type="button" data-action="close-sheet" aria-label="Close">×</button>
      </div>
      <span class="mini-status-pill">Backend pass soon</span>
      <h2>Brand and motorcycle requests are planned</h2>
      <p>Riders will be able to suggest missing brands, models, years, corrections, and maintenance data once feedback storage is connected.</p>
      <div class="preview-field-stack" aria-hidden="true">
        <label>Brand or motorcycle<input type="text" value="Example: CFMoto 450SS" disabled /></label>
        <label>What should be added?<textarea disabled>Missing model, specs correction, or maintenance data request.</textarea></label>
      </div>
      <div class="feature-preview-list">
        <span>Missing brand requests</span>
        <span>Missing motorcycle requests</span>
        <span>Admin review before publish</span>
      </div>
      <button class="primary-btn compact-btn" type="button" data-action="close-sheet">Got it</button>
    </section>
  `;
}

function renderFeaturePreviewSheet() {
  const config = getPreviewFeatureConfig(state.activeFeaturePreview);
  return `
    <div class="sheet-backdrop" data-action="close-sheet"></div>
    <section class="bottom-sheet form-sheet feature-preview-sheet" data-floating-panel role="dialog" aria-label="${escapeHtml(config.eyebrow)}">
      <div class="sheet-handle" aria-hidden="true"></div>
      <div class="sheet-head">
        <span>${escapeHtml(config.eyebrow)}</span>
        <button type="button" data-action="close-sheet" aria-label="Close">×</button>
      </div>
      <span class="mini-status-pill">Coming soon</span>
      <h2>${escapeHtml(config.title)}</h2>
      <p>${escapeHtml(config.copy)}</p>
      <div class="feature-preview-list">
        ${config.items.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}
      </div>
      <button class="primary-btn compact-btn" type="button" data-action="close-sheet">Back to app</button>
    </section>
  `;
}

function renderFormSheet() {
  if (state.activeFormSheet === "add-bike") return renderAddBikeFormSheet();
  if (state.activeFormSheet === "maintenance-form") return renderMaintenanceFormSheet();
  if (state.activeFormSheet === "remove-bike") return renderRemoveBikeConfirmSheet();
  if (state.activeFormSheet === "edit-task") return renderEditTaskPlaceholderSheet();
  if (state.activeFormSheet === "request-brand") return renderRequestBrandSheet();
  if (state.activeFormSheet === "feature-preview") return renderFeaturePreviewSheet();
  return "";
}

function renderOverlay() {
  const panels = [];
  if (state.updatesOpen) panels.push(renderUpdatesPanel());
  if (state.profileOpen) panels.push(renderProfilePanel());
  if (state.activeTaskId) panels.push(renderTaskActionSheet());
  if (state.activeBikeActionId) panels.push(renderBikeActionSheet());
  if (state.activeFormSheet) panels.push(renderFormSheet());
  overlayLayer.innerHTML = panels.join("");
  overlayLayer.classList.toggle("has-sheet", Boolean(state.activeTaskId || state.activeBikeActionId || state.activeFormSheet));
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
      <button class="account-link account-link-preview" type="button" data-action="preview-feature" data-feature="account"><span>Account Information</span><em>Preview</em></button>
      <button class="account-link account-link-preview" type="button" data-action="preview-feature" data-feature="billing"><span>Manage Billing</span><em>Not active</em></button>
      <button class="account-link account-link-preview" type="button" data-action="preview-feature" data-feature="settings"><span>Product Settings</span><em>Soon</em></button>
      <button class="account-link danger" type="button" data-action="${actionName}">${actionLabel}</button>
    </div>
  `;
}

function updateBottomNav() {
  const navViews = ["home", "garage", "maintenance", "compare", "more"];
  const activeView = navViews.includes(state.view) ? state.view : "";
  bottomNav.querySelectorAll(".nav-item").forEach((button) => {
    button.classList.toggle("active", button.dataset.route === activeView);
  });
  const hideBottom = ["brand", "category", "bike-select", "bike-preview", "detail", "learn", "about", "contact", "updates", "v1"].includes(state.view);
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



  document.querySelectorAll("[data-compare-field]").forEach((select) => {
    if (select.dataset.bound) return;
    select.dataset.bound = "true";
    select.addEventListener("change", (event) => {
      updateCompareSelection(event.target.dataset.compareSide, event.target.dataset.compareField, event.target.value);
    });
  });

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

  const addBikeForm = document.getElementById("add-bike-form");
  if (addBikeForm && !addBikeForm.dataset.bound) {
    addBikeForm.dataset.bound = "true";
    addBikeForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (state.isSubmittingForm) return;
      const mileage = document.getElementById("add-bike-mileage")?.value || "0";
      await addCatalogBikeToGarage(state.activeAddCatalogBikeId, mileage);
    });
  }

  const maintenanceForm = document.getElementById("maintenance-form");
  if (maintenanceForm && !maintenanceForm.dataset.bound) {
    maintenanceForm.dataset.bound = "true";
    maintenanceForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (state.isSubmittingForm) return;
      await addMaintenanceRecord({
        title: document.getElementById("maintenance-title")?.value || "",
        description: document.getElementById("maintenance-description")?.value || "",
        dueDate: document.getElementById("maintenance-due-date")?.value || null,
        mileage: document.getElementById("maintenance-mileage")?.value || "--",
        status: document.getElementById("maintenance-status")?.value || "PENDING",
      });
    });
  }

  const editTaskForm = document.getElementById("edit-task-form");
  if (editTaskForm && !editTaskForm.dataset.bound) {
    editTaskForm.dataset.bound = "true";
    editTaskForm.addEventListener("submit", (event) => {
      event.preventDefault();
      closeAllSheets();
      showToast("Edit task API will be wired after the backend endpoint is confirmed.");
      render();
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

async function addCatalogBikeToGarage(bikeId, currentMileage) {
  const bike = getCatalogBikeById(bikeId);
  if (!bike) return;

  const mileage = Number(currentMileage);
  if (Number.isNaN(mileage) || mileage < 0) {
    showToast("Enter a valid mileage number.");
    return;
  }

  state.isSubmittingForm = true;
  render();

  if (!state.backendOnline) {
    const localItem = normalizeGarageItem({
      id: `local-garage-${bike.id}-${Date.now()}`,
      currentMileage: mileage,
      addedAt: new Date().toISOString().slice(0, 10),
      motorcycle: bike,
    });
    state.garageItems.unshift(localItem);
    state.taskMap.set(String(localItem.id), []);
    state.selectedGarageId = String(localItem.id);
    state.selectedMaintenanceGarageId = String(localItem.id);
    state.lastSavedGarageId = String(localItem.id);
    closeAllSheets();
    showToast(`${bike.model} added in preview mode.`);
    routeTo("garage");
    return;
  }

  try {
    await fetchJson(`/garage/${encodeURIComponent(bike.id)}?currentMileage=${encodeURIComponent(mileage)}`, { method: "POST" });
    closeAllSheets();
    showToast(`${bike.model} added to garage.`);
    await loadGarage();
    const savedItem = state.garageItems.find((item) => String(item.motorcycle?.id) === String(bike.id)) || state.garageItems[0];
    if (savedItem) {
      state.selectedGarageId = String(savedItem.id);
      state.selectedMaintenanceGarageId = String(savedItem.id);
      state.lastSavedGarageId = String(savedItem.id);
    }
    routeTo("garage");
  } catch (error) {
    console.error("Failed to add bike:", error);
    state.isSubmittingForm = false;
    showToast("Could not add bike. Backend may be unavailable or garage may be full.");
    render();
  }
}


async function updateMobileTaskStatus(taskId, nextGroup) {
  const { task, garageItem } = findTaskContext(taskId);
  if (!task || !garageItem) {
    showToast("Task not found.");
    return;
  }

  const nextStatus = statusForTaskGroup(nextGroup);
  const previousStatus = task.status;
  task.status = nextStatus;
  state.maintenanceStatusFilter = nextGroup;
  closeAllSheets();
  render();

  try {
    if (state.backendOnline) {
      await fetchJson(`/tasks/${encodeURIComponent(taskId)}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });
      await loadTasksForGarage(garageItem.id);
    }
    showToast(`Task moved to ${getTaskGroupLabel(nextGroup)}.`);
    render();
  } catch (error) {
    console.error("Failed to update task status:", error);
    task.status = previousStatus;
    showToast("Could not update task status.");
    render();
  }
}

async function addMaintenanceRecord(payload) {
  const garageId = state.selectedMaintenanceGarageId;
  if (!garageId) {
    showToast("Add or select a motorcycle first.");
    return;
  }

  const title = String(payload?.title || "").trim();
  if (!title) {
    showToast("Task title is required.");
    return;
  }

  const taskPayload = {
    title,
    description: String(payload?.description || "").trim(),
    dueDate: payload?.dueDate || null,
  };

  state.isSubmittingForm = true;
  render();

  if (!state.backendOnline) {
    const currentTasks = getTasks(garageId);
    state.taskMap.set(String(garageId), [
      normalizeTask({ ...taskPayload, status: payload?.status || "PENDING", mileage: payload?.mileage || "--" }),
      ...currentTasks,
    ]);
    state.maintenanceStatusFilter = getTaskGroup({ status: payload?.status || "PENDING" });
    closeAllSheets();
    showToast("Maintenance task added in preview mode.");
    render();
    return;
  }

  try {
    await fetchJson(`/garage/${encodeURIComponent(garageId)}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(taskPayload),
    });
    await loadTasksForGarage(garageId);
    closeAllSheets();
    showToast("Maintenance task added.");
    render();
  } catch (error) {
    console.error("Failed to add maintenance record:", error);
    state.isSubmittingForm = false;
    showToast("Could not add maintenance task.");
    render();
  }
}

async function removeGarageBike(garageId) {
  const item = getGarageItemById(garageId);
  if (!item) {
    showToast("Bike not found.");
    return;
  }

  state.isSubmittingForm = true;
  render();

  if (!state.backendOnline) {
    state.garageItems = state.garageItems.filter((entry) => String(entry.id) !== String(garageId));
    state.taskMap.delete(String(garageId));
    state.selectedGarageId = state.garageItems[0] ? String(state.garageItems[0].id) : null;
    state.selectedMaintenanceGarageId = state.garageItems[0] ? String(state.garageItems[0].id) : null;
    closeAllSheets();
    showToast("Bike removed in preview mode.");
    routeTo("garage");
    return;
  }

  try {
    await fetchJson(`/garage/${encodeURIComponent(garageId)}`, { method: "DELETE" });
    closeAllSheets();
    showToast("Bike removed from garage.");
    await loadGarage();
    routeTo("garage");
  } catch (error) {
    console.error("Failed to remove bike:", error);
    state.isSubmittingForm = false;
    showToast("Remove is not available in the mobile preview yet.");
    render();
  }
}

function openAddBikeSheet(bikeId) {
  state.activeAddCatalogBikeId = bikeId;
  state.activeFormSheet = "add-bike";
  state.activeTaskId = null;
  state.activeBikeActionId = null;
  render();
}

function openMaintenanceForm() {
  if (!state.selectedMaintenanceGarageId) {
    showToast("Add or select a motorcycle first.");
    return;
  }
  state.activeFormSheet = "maintenance-form";
  state.activeTaskId = null;
  state.activeBikeActionId = null;
  render();
}

function openRemoveBikeSheet(garageId) {
  state.activeRemoveGarageId = garageId;
  state.activeFormSheet = "remove-bike";
  state.activeTaskId = null;
  state.activeBikeActionId = null;
  render();
}

function openEditTaskPlaceholder(taskId) {
  state.activeEditTaskId = taskId;
  state.activeFormSheet = "edit-task";
  state.activeTaskId = null;
  state.activeBikeActionId = null;
  render();
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
    openAddBikeSheet(addCatalog.dataset.addCatalogBike);
    return true;
  }

  const garageDetail = target.closest("[data-garage-detail]");
  if (garageDetail) {
    state.selectedGarageId = garageDetail.dataset.garageDetail;
    state.detailTab = "Overview";
    state.activeTaskId = null;
    state.activeBikeActionId = null;
    routeTo("detail");
    return true;
  }

  const taskDetail = target.closest("[data-task-detail]");
  if (taskDetail) {
    state.activeTaskId = taskDetail.dataset.taskDetail;
    state.activeBikeActionId = null;
    render();
    return true;
  }

  const bikeActions = target.closest("[data-bike-actions]");
  if (bikeActions) {
    state.activeBikeActionId = bikeActions.dataset.bikeActions;
    state.activeTaskId = null;
    render();
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
    state.activeTaskId = null;
    state.activeBikeActionId = null;
    routeTo("maintenance");
    return true;
  }

  const tabButton = target.closest("[data-tab]");
  if (tabButton) {
    state.detailTab = tabButton.dataset.tab;
    render();
    return true;
  }



  const compareViewBike = target.closest("[data-compare-view-bike]");
  if (compareViewBike) {
    state.selectedCatalogBikeId = compareViewBike.dataset.compareViewBike;
    routeTo("bike-preview");
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

  if (action === "compare-swap") {
    swapCompareBikes();
    return true;
  }

  if (action === "compare-reset-a" || action === "compare-reset-b") {
    resetCompareBike(action.endsWith("a") ? "a" : "b");
    return true;
  }

  if (action === "retry-data") {
    state.catalogReady = false;
    state.garageReady = false;
    state.lastDataError = null;
    render();
    await Promise.allSettled([loadCatalog(), loadGarage()]);
    showToast(state.backendOnline ? "Data refreshed." : "Still using preview data.");
    return true;
  }

  if (action === "close-sheet") {
    closeAllSheets();
    render();
    return true;
  }

  if (action === "move-task-status") {
    await updateMobileTaskStatus(state.activeTaskId, actionButton.dataset.taskStatus || "upcoming");
    return true;
  }

  if (action === "bike-notes-placeholder") {
    const item = getGarageItemById(state.activeBikeActionId);
    if (item) {
      state.selectedGarageId = String(item.id);
      state.detailTab = "Notes";
      routeTo("detail");
    } else {
      showToast("Notes tab is coming next.");
    }
    return true;
  }

  if (action === "open-remove-bike") {
    openRemoveBikeSheet(actionButton.dataset.removeBikeId || state.activeBikeActionId);
    return true;
  }

  if (action === "confirm-remove-bike") {
    await removeGarageBike(actionButton.dataset.removeBikeId || state.activeRemoveGarageId);
    return true;
  }

  if (action === "edit-task-placeholder") {
    openEditTaskPlaceholder(actionButton.dataset.editTaskId || state.activeTaskId);
    return true;
  }

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

  if (action === "request-brand") {
    state.activeFormSheet = "request-brand";
    state.profileOpen = false;
    state.updatesOpen = false;
    render();
    return true;
  }

  if (action === "preview-feature") {
    state.activeFeaturePreview = actionButton.dataset.feature || "future";
    state.activeFormSheet = "feature-preview";
    state.profileOpen = false;
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
    openMaintenanceForm();
    return true;
  }

  if (action === "start-maintenance-after-save") {
    const garageId = actionButton.dataset.garageId || state.lastSavedGarageId || state.selectedGarageId;
    if (garageId) {
      state.selectedMaintenanceGarageId = String(garageId);
      state.selectedGarageId = String(garageId);
    }
    routeTo("maintenance");
    return true;
  }

  if (action === "bike-menu") {
    const item = selectedGarageItem();
    if (item) {
      state.activeBikeActionId = String(item.id);
      state.activeTaskId = null;
      render();
      return true;
    }
  }

  const messages = {
    "bike-menu": "Bike options are not available in the mobile preview yet.",
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
    state.activeTaskId = null;
    state.activeBikeActionId = null;
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
