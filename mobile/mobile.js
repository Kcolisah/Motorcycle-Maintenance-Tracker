const ASSET_BASE = "..";

const brandLogoMap = {
  Aprilia: `${ASSET_BASE}/images/Aprilia/Aprilia_Logo.png`,
  BMW: `${ASSET_BASE}/images/BMW/BMW_Logo.png`,
  Ducati: `${ASSET_BASE}/images/Ducati/Ducati_Logo.png`,
  "Harley-Davidson": `${ASSET_BASE}/images/Harley/Harley_Logo.png`,
  Honda: `${ASSET_BASE}/images/Honda/Honda_Logo.png`,
  "Indian Motorcycle": `${ASSET_BASE}/images/Indian/Indian_Logo.png`,
  Kawasaki: `${ASSET_BASE}/images/Kawasaki/Kawasaki_Logo.png`,
  KTM: `${ASSET_BASE}/images/KTM/KTM_Logo.png`,
  Suzuki: `${ASSET_BASE}/images/Suzuki/Suzuki_logo.png`,
  Triumph: `${ASSET_BASE}/images/Triumph/Triumph_Logo.png`,
  Yamaha: `${ASSET_BASE}/images/Yamaha/Yamaha_Logo.png`,
};

const brands = Object.keys(brandLogoMap);

const garageBikes = [
  {
    id: "ducati-v4",
    brand: "Ducati",
    model: "Ducati Panigale V4",
    year: 2022,
    mileage: 4250,
    price: 23999,
    image: `${ASSET_BASE}/images/Ducati/SuperSport/Ducati_Panigale_V4.png`,
    logo: brandLogoMap.Ducati,
    nextService: "2,500 mi",
    lastService: "May 1, 2024",
    serviceCount: 6,
    about: "The Panigale V4 is powered by a 1,103 cc Desmosedici Stradale engine and designed for high performance on the track and street.",
    specs: [
      ["Engine", "1,103 cc"],
      ["Power", "214 hp"],
      ["Torque", "90.4 lb-ft"],
      ["Transmission", "6-speed"],
      ["Weight", "385 lbs"],
      ["Fuel Capacity", "4.0 gal"],
    ],
  },
  {
    id: "yamaha-r1",
    brand: "Yamaha",
    model: "Yamaha R1",
    year: 2021,
    mileage: 7800,
    price: 19199,
    image: `${ASSET_BASE}/images/Yamaha/SuperSport/Yamaha_R1.png`,
    logo: brandLogoMap.Yamaha,
    nextService: "1,200 mi",
    lastService: "Apr 12, 2024",
    serviceCount: 4,
    about: "A sharp liter-class supersport with crossplane character, aggressive ergonomics, and serious track-focused personality.",
    specs: [
      ["Engine", "998 cc"],
      ["Power", "198 hp"],
      ["Torque", "83 lb-ft"],
      ["Transmission", "6-speed"],
      ["Weight", "448 lbs"],
      ["Fuel Capacity", "4.5 gal"],
    ],
  },
  {
    id: "zx6r",
    brand: "Kawasaki",
    model: "Kawasaki Ninja ZX-6R",
    year: 2023,
    mileage: 2150,
    price: 11599,
    image: `${ASSET_BASE}/images/Kawasaki/SuperSport/Kawasaki_Ninja_ZX_6R.png`,
    logo: brandLogoMap.Kawasaki,
    nextService: "3,000 mi",
    lastService: "Mar 8, 2024",
    serviceCount: 3,
    about: "A focused 636 cc supersport that balances street usability with aggressive middleweight performance.",
    specs: [
      ["Engine", "636 cc"],
      ["Power", "127 hp"],
      ["Torque", "52 lb-ft"],
      ["Transmission", "6-speed"],
      ["Weight", "430 lbs"],
      ["Fuel Capacity", "4.5 gal"],
    ],
  },
];

const serviceRecords = [
  { date: "May 1, 2024", task: "Oil Change", note: "Shell Advance 15W-50", mileage: "4,200 mi", cost: "$120.00" },
  { date: "Feb 10, 2024", task: "Chain Adjustment", note: "Adjusted and lubricated", mileage: "3,800 mi", cost: "$80.00" },
  { date: "Nov 20, 2023", task: "Tire Replacement", note: "Pirelli Diablo Rosso IV", mileage: "3,200 mi", cost: "$400.00" },
  { date: "Aug 15, 2023", task: "Brake Fluid Change", note: "Motul RBF 600", mileage: "2,600 mi", cost: "$90.00" },
  { date: "May 10, 2023", task: "Oil Change", note: "Shell Advance 15W-50", mileage: "1,800 mi", cost: "$120.00" },
  { date: "Mar 5, 2023", task: "Initial Service", note: "Dealer service", mileage: "600 mi", cost: "$150.00" },
];

const state = {
  view: "home",
  selectedBrand: "Ducati",
  selectedBikeId: "ducati-v4",
  detailTab: "Overview",
  brandQuery: "",
};

const appShell = document.getElementById("app-shell");
const appHeader = document.getElementById("app-header");
const appMain = document.getElementById("app-main");
const bottomNav = document.getElementById("bottom-nav");
const toast = document.getElementById("toast");

const icons = {
  bell: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a6 6 0 0 0-6 6v3.8L4.7 16a1 1 0 0 0 .9 1.4h12.8a1 1 0 0 0 .9-1.4L18 12.8V9a6 6 0 0 0-6-6Z"></path><path d="M9.5 20a2.5 2.5 0 0 0 5 0"></path></svg>`,
  user: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 21a8 8 0 0 0-16 0"></path><circle cx="12" cy="8" r="4"></circle></svg>`,
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

function formatNumber(value) {
  return value.toLocaleString();
}

function formatMoney(value) {
  return `$${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
}

function selectedBike() {
  return garageBikes.find((bike) => bike.id === state.selectedBikeId) || garageBikes[0];
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 1900);
}

function routeTo(view) {
  state.view = view;
  render();
}

function renderHeader() {
  const bike = selectedBike();

  if (state.view === "brand") {
    appHeader.innerHTML = `
      <button class="back-btn" type="button" data-route="home" aria-label="Back to home">${icons.back}</button>
      <div class="header-actions"></div>
    `;
    return;
  }

  if (state.view === "detail") {
    appHeader.innerHTML = `
      <button class="back-btn" type="button" data-route="garage" aria-label="Back to garage">${icons.back}</button>
      <div class="header-actions">
        <button class="icon-btn" type="button" data-action="share" aria-label="Share ${bike.model}">${icons.share}</button>
        <button class="more-btn" type="button" data-action="more" aria-label="More options">${icons.dots}</button>
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
      <button class="icon-btn" type="button" data-action="updates" aria-label="Updates">${icons.bell}</button>
      <button class="icon-btn" type="button" data-action="profile" aria-label="Profile">${icons.user}</button>
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
      <button class="secondary-btn" type="button" data-action="learn">Learn More</button>

      <div class="section-head">
        <h2>Popular Brands</h2>
        <button type="button" data-route="brand">View All</button>
      </div>

      <div class="brand-strip">
        ${popular.map((brand) => `
          <button class="brand-mini" type="button" data-brand="${brand}" data-route="brand">
            <img src="${brandLogoMap[brand]}" alt="${brand} logo" />
            <span>${brand}</span>
          </button>
        `).join("")}
      </div>
    </section>
  `;
}

function renderBrand() {
  const query = state.brandQuery.trim().toLowerCase();
  const filteredBrands = brands.filter((brand) => brand.toLowerCase().includes(query));

  return `
    <section class="screen brand-screen">
      <h1 class="page-title">Choose Your Brand</h1>

      <label class="search-wrap">
        ${icons.search}
        <input id="brand-search" type="search" placeholder="Search brand..." value="${escapeHtml(state.brandQuery)}" autocomplete="off" />
      </label>

      <div class="brand-grid">
        ${filteredBrands.map((brand) => `
          <button class="brand-card ${brand === state.selectedBrand ? "active" : ""}" type="button" data-select-brand="${brand}">
            <img src="${brandLogoMap[brand]}" alt="${brand} logo" />
            <span>${brand}</span>
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

function renderGarage() {
  const totalMileage = garageBikes.reduce((sum, bike) => sum + bike.mileage, 0);
  const totalSpent = 1250;

  return `
    <section class="screen garage-screen">
      <div class="title-row">
        <div>
          <h1 class="page-title">My Garage</h1>
          <p class="page-copy">Your motorcycles at a glance.</p>
        </div>
        <button class="add-btn" type="button" data-action="add-bike">+ Add Bike</button>
      </div>

      <div class="garage-list">
        ${garageBikes.map(renderBikeCard).join("")}
      </div>

      <div class="stat-grid">
        <div class="stat-card">
          <span class="stat-icon">${icons.bike}</span>
          <span class="stat-copy"><span>Total Bikes</span><strong>${garageBikes.length}</strong></span>
        </div>
        <div class="stat-card">
          <span class="stat-icon blue">${icons.gauge}</span>
          <span class="stat-copy"><span>Total Mileage</span><strong>${formatNumber(totalMileage)} mi</strong></span>
        </div>
        <div class="stat-card">
          <span class="stat-icon">${icons.wrench}</span>
          <span class="stat-copy"><span>Maintenance Due</span><strong>1</strong></span>
        </div>
        <div class="stat-card">
          <span class="stat-icon green">${icons.wallet}</span>
          <span class="stat-copy"><span>Total Spent</span><strong>$1,250.00</strong></span>
        </div>
      </div>
    </section>
  `;
}

function renderBikeCard(bike) {
  return `
    <article class="bike-card">
      <div class="bike-thumb">
        <img src="${bike.image}" alt="${bike.model}" />
      </div>
      <div class="bike-info">
        <div>
          <h3>${bike.model}</h3>
          <div class="meta-row">
            <span>${bike.year}</span>
            <span class="dot-sep"></span>
            <span>${formatNumber(bike.mileage)} mi</span>
          </div>
        </div>
        <div class="card-actions">
          <button class="detail-btn" type="button" data-bike-detail="${bike.id}">View Details →</button>
          <button class="overflow-btn" type="button" data-action="bike-menu" aria-label="More options for ${bike.model}">···</button>
        </div>
      </div>
    </article>
  `;
}

function renderDetail() {
  const bike = selectedBike();
  const tabs = ["Overview", "Maintenance", "Notes", "Docs"];

  return `
    <section class="screen detail-screen">
      <div class="detail-hero">
        <div class="detail-brand-row">
          <img src="${bike.logo}" alt="${bike.brand} logo" />
          <div>
            <h1>${bike.model}</h1>
            <span>${bike.year}</span>
          </div>
        </div>

        <div class="detail-bike-stage">
          <img src="${bike.image}" alt="${bike.model}" />
        </div>
      </div>

      <div class="quick-specs">
        <div class="quick-spec"><span>Mileage</span><strong>${formatNumber(bike.mileage)} mi</strong></div>
        <div class="quick-spec"><span>Purchase Date</span><strong>May 12, 2022</strong></div>
        <div class="quick-spec"><span>Purchase Price</span><strong>${formatMoney(bike.price)}</strong></div>
      </div>

      <div class="tabs" role="tablist" aria-label="Bike detail sections">
        ${tabs.map((tab) => `<button class="tab-btn ${state.detailTab === tab ? "active" : ""}" type="button" data-tab="${tab}">${tab}</button>`).join("")}
      </div>

      ${renderDetailTab(bike)}
    </section>
  `;
}

function renderDetailTab(bike) {
  if (state.detailTab === "Maintenance") {
    return `
      <div class="detail-card">
        <h2>Recent Maintenance</h2>
        <p>${bike.model} has ${bike.serviceCount} records. Next service is estimated at ${bike.nextService}.</p>
        <div class="spec-list">
          ${serviceRecords.slice(0, 3).map((record) => `
            <div class="spec-line"><span>${record.task}</span><strong>${record.date}</strong></div>
          `).join("")}
        </div>
      </div>
    `;
  }

  if (state.detailTab === "Notes") {
    return `
      <div class="detail-card">
        <h2>Notes</h2>
        <p>Quick bike notes can live here later, like tire setup, preferred oil, repair reminders, and seller history.</p>
      </div>
    `;
  }

  if (state.detailTab === "Docs") {
    return `
      <div class="detail-card">
        <h2>Documents</h2>
        <p>Insurance, title, service PDFs, and receipt uploads can sit here when we add the backend support.</p>
      </div>
    `;
  }

  return `
    <div class="detail-card">
      <h2>About This Bike</h2>
      <p>${bike.about}</p>

      <div class="spec-list">
        ${bike.specs.map(([label, value]) => `
          <div class="spec-line"><span>${label}</span><strong>${value}</strong></div>
        `).join("")}
      </div>
    </div>
  `;
}

function renderMaintenance() {
  return `
    <section class="screen maintenance-screen">
      <div class="title-row">
        <div>
          <h1 class="page-title">Maintenance</h1>
          <p class="page-copy">Track all maintenance and service history.</p>
        </div>
        <button class="add-btn" type="button" data-action="add-record">+ Add Record</button>
      </div>

      <div class="maintenance-grid">
        <div class="maintenance-panel">
          <span class="stat-icon blue">${icons.calendar}</span>
          <span class="stat-copy"><span>Total Records</span><strong>6</strong></span>
        </div>
        <div class="maintenance-panel">
          <span class="stat-icon blue">${icons.wallet}</span>
          <span class="stat-copy"><span>Total Spent</span><strong>$1,250.00</strong></span>
        </div>
        <div class="maintenance-panel">
          <span class="stat-icon green">${icons.wrench}</span>
          <span class="stat-copy"><span>Last Service</span><strong>May 1, 2024</strong></span>
        </div>
        <div class="maintenance-panel">
          <span class="stat-icon orange">${icons.gauge}</span>
          <span class="stat-copy"><span>Next Service</span><strong>2,500 mi</strong></span>
        </div>
      </div>

      <div class="table-card">
        <div class="table-head">
          <span>Date</span><span>Mileage</span><span>Cost</span>
        </div>
        ${serviceRecords.map((record) => `
          <div class="service-row">
            <div class="service-title">
              <strong>${record.date}<br>${record.task}</strong>
              <span>${record.note}</span>
            </div>
            <span>${record.mileage}</span>
            <span>${record.cost}</span>
          </div>
        `).join("")}
      </div>
    </section>
  `;
}

function renderMore() {
  return `
    <section class="screen more-screen">
      <h1 class="page-title">More</h1>
      <p class="page-copy">Mobile app ideas we can wire into the real product later.</p>

      <div class="more-grid">
        <button class="more-card" type="button" data-route="brand">
          <span><strong>Choose Brand</strong><span>Open the app-style brand flow.</span></span>
          <span>→</span>
        </button>
        <button class="more-card" type="button" data-action="request-brand">
          <span><strong>Request a Brand</strong><span>Great future addition for user feedback.</span></span>
          <span>→</span>
        </button>
        <button class="more-card" type="button" data-action="future">
          <span><strong>Documents</strong><span>Insurance, title, receipts, and uploads.</span></span>
          <span>→</span>
        </button>
        <button class="more-card" type="button" data-action="future">
          <span><strong>Settings</strong><span>Profile, notifications, and preferences.</span></span>
          <span>→</span>
        </button>
      </div>
    </section>
  `;
}

function renderMain() {
  switch (state.view) {
    case "brand":
      return renderBrand();
    case "garage":
      return renderGarage();
    case "detail":
      return renderDetail();
    case "maintenance":
      return renderMaintenance();
    case "more":
      return renderMore();
    case "home":
    default:
      return renderHome();
  }
}

function updateBottomNav() {
  const navViews = ["home", "garage", "maintenance", "more"];
  const activeView = navViews.includes(state.view) ? state.view : "";

  bottomNav.querySelectorAll(".nav-item").forEach((button) => {
    button.classList.toggle("active", button.dataset.route === activeView);
  });

  const hideBottom = state.view === "brand" || state.view === "detail";
  appShell.classList.toggle("no-bottom", hideBottom);
}

function render() {
  renderHeader();
  appMain.innerHTML = renderMain();
  updateBottomNav();
  bindDynamicEvents();
  appMain.scrollTop = 0;
}

function bindDynamicEvents() {
  const searchInput = document.getElementById("brand-search");
  if (searchInput) {
    searchInput.focus({ preventScroll: true });
    searchInput.setSelectionRange(searchInput.value.length, searchInput.value.length);
  }
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function handleRouteClick(target) {
  const routeButton = target.closest("[data-route]");
  if (!routeButton) return false;

  const brand = routeButton.dataset.brand;
  if (brand) {
    state.selectedBrand = brand;
  }

  routeTo(routeButton.dataset.route);
  return true;
}

function handleActionClick(target) {
  const actionButton = target.closest("[data-action]");
  if (!actionButton) return false;

  const action = actionButton.dataset.action;
  const messages = {
    updates: "Updates panel can be wired in later.",
    profile: "Profile/login can connect to the existing auth later.",
    learn: "This is the app preview flow. Desktop was not touched.",
    "request-brand": "Request Brand is a strong future addition.",
    "add-bike": "Add Bike button is a mobile placeholder for now.",
    "add-record": "Add Record button is a mobile placeholder for now.",
    "bike-menu": "Bike actions can be wired later.",
    share: "Share action can be wired later.",
    more: "More bike options can be wired later.",
    future: "This section is planned for a later backend pass.",
  };

  showToast(messages[action] || "Coming later.");
  return true;
}

appHeader.addEventListener("click", (event) => {
  if (handleRouteClick(event.target)) return;
  handleActionClick(event.target);
});

bottomNav.addEventListener("click", (event) => {
  handleRouteClick(event.target);
});

appMain.addEventListener("click", (event) => {
  if (handleRouteClick(event.target)) return;

  const brandButton = event.target.closest("[data-select-brand]");
  if (brandButton) {
    state.selectedBrand = brandButton.dataset.selectBrand;
    showToast(`${state.selectedBrand} selected`);
    render();
    return;
  }

  const bikeDetailButton = event.target.closest("[data-bike-detail]");
  if (bikeDetailButton) {
    state.selectedBikeId = bikeDetailButton.dataset.bikeDetail;
    state.detailTab = "Overview";
    routeTo("detail");
    return;
  }

  const tabButton = event.target.closest("[data-tab]");
  if (tabButton) {
    state.detailTab = tabButton.dataset.tab;
    render();
    return;
  }

  handleActionClick(event.target);
});

appMain.addEventListener("input", (event) => {
  if (event.target.id === "brand-search") {
    state.brandQuery = event.target.value;
    render();
  }
});

render();
