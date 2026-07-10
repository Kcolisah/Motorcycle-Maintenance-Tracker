(() => {
  const AUTH_REQUIRED_PAGES = new Set(["garage.html", "maintenance.html"]);

  function getApi() {
    return window.MotorcycleTrackerApi;
  }

  function getCurrentPage() {
    const path = window.location.pathname;
    const page = path.substring(path.lastIndexOf("/") + 1);
    return page || "index.html";
  }

  function getRedirectTarget() {
    const params = new URLSearchParams(window.location.search);
    const redirect = params.get("redirect") || "garage.html";

    if (redirect.startsWith("http") || redirect.startsWith("//")) {
      return "garage.html";
    }

    return redirect;
  }

  function getInitials(user) {
    const name = user?.username || user?.email || "Guest";

    return (
      name
        .split(/[\s._-]+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase())
        .join("") || "GU"
    );
  }

  function normalizeUser(user) {
    if (!user) {
      return null;
    }

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      isDemo: Boolean(user.isDemo),
      initials: getInitials(user),
      role: user.isDemo ? "Demo Account" : "Rider Account"
    };
  }

  function getSession() {
    const api = getApi();

    if (!api) {
      return null;
    }

    const token = api.getToken();
    const user = api.getUser();

    if (!token || !user) {
      return null;
    }

    return {
      token,
      user
    };
  }

  function saveSession(token, user) {
    const api = getApi();

    if (!api) {
      return null;
    }

    const normalizedUser = normalizeUser(user);
    api.saveAuth(token, normalizedUser);

    return {
      token,
      user: normalizedUser
    };
  }

  function clearSession() {
    const api = getApi();

    if (api) {
      api.clearAuth();
    }
  }

  function showAuthMessage(message, type = "info") {
    const messageBox = document.querySelector("[data-auth-message]");

    if (!messageBox) {
      return;
    }

    messageBox.hidden = false;
    messageBox.textContent = message;
    messageBox.dataset.type = type;
  }

  function setFormLoading(form, isLoading) {
    if (!form) {
      return;
    }

    const submitButton = form.querySelector("button[type='submit']");

    form.querySelectorAll("input, button").forEach((element) => {
      element.disabled = isLoading;
    });

    if (submitButton) {
      if (!submitButton.dataset.defaultText) {
        submitButton.dataset.defaultText = submitButton.textContent;
      }

      submitButton.textContent = isLoading ? "Please wait..." : submitButton.dataset.defaultText;
    }
  }

  async function refreshCurrentUser() {
    const api = getApi();

    if (!api || !api.getToken()) {
      return null;
    }

    const response = await api.apiRequest("/api/auth/me");
    const data = await api.parseJsonResponse(response);

    if (!response.ok || !data) {
      return null;
    }

    saveSession(api.getToken(), data);
    return normalizeUser(data);
  }

  async function handleAuthResponse(response, redirectTarget) {
    const api = getApi();
    const data = await api.parseJsonResponse(response);

    if (!response.ok) {
      const message = data?.message || data?.error || "Authentication failed.";
      showAuthMessage(message, "error");
      return;
    }

    if (!data?.token) {
      showAuthMessage("No token was returned by the backend.", "error");
      return;
    }

    saveSession(data.token, {
      username: data.username,
      email: data.email
    });

    const currentUser = await refreshCurrentUser();

    if (!currentUser) {
      showAuthMessage("Signed in, but current user could not be loaded.", "error");
      return;
    }

    window.location.href = redirectTarget;
  }

  async function signIn(email, password, redirectTarget) {
    const api = getApi();

    if (!api) {
      showAuthMessage("API client is not loaded.", "error");
      return;
    }

    const response = await api.apiRequest("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    await handleAuthResponse(response, redirectTarget);
  }

  async function register(username, email, password, redirectTarget) {
    const api = getApi();

    if (!api) {
      showAuthMessage("API client is not loaded.", "error");
      return;
    }

    const response = await api.apiRequest("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, email, password })
    });

    await handleAuthResponse(response, redirectTarget);
  }

   async function signInDemo(redirectTarget) {
    const api = getApi();

    if (!api) {
      showAuthMessage("API client is not loaded.", "error");
      return;
    }

    const response = await api.apiRequest("/api/auth/demo", {
      method: "POST"
    });

    await handleAuthResponse(response, redirectTarget);
  }

  function signOut() {
    clearSession();
    window.location.href = "login.html";
  }

  function buildAccountMenu() {
    const wrapper = document.createElement("div");
    wrapper.className = "account-menu";
    wrapper.innerHTML = `
      <button class="account-menu-trigger" type="button" aria-label="Open account menu" aria-expanded="false">
        <span class="account-avatar" data-account-initials>?</span>
        <span class="account-label" data-account-label>Sign in</span>
      </button>

      <div class="account-dropdown" data-account-dropdown hidden>
        <div class="account-dropdown-header">
          <span class="account-avatar account-avatar-large" data-account-initials>?</span>
          <div>
            <strong data-account-name>Guest</strong>
            <p data-account-email>Not signed in</p>
          </div>
        </div>

        <button class="account-dropdown-link account-dropdown-preview" type="button" data-desktop-preview="account">
          <span>Account Information</span>
          <em>Preview</em>
        </button>
        <button class="account-dropdown-link account-dropdown-preview" type="button" data-desktop-preview="billing">
          <span>Manage Billing</span>
          <em>Not active</em>
        </button>
        <button class="account-dropdown-link account-dropdown-preview" type="button" data-desktop-preview="settings">
          <span>Product Settings</span>
          <em>Soon</em>
        </button>
        <button class="account-dropdown-link account-dropdown-preview" type="button" data-desktop-preview="request-brand">
          <span>Request Brand / Motorcycle</span>
          <em>Staged</em>
        </button>
        <button class="account-dropdown-link account-signout-btn" type="button" data-account-action>Sign in</button>
      </div>
    `;

    return wrapper;
  }

  function hydrateAccountMenu(menu) {
    const session = getSession();
    const user = session?.user;
    const initials = user?.initials || "GU";

    menu.querySelectorAll("[data-account-initials]").forEach((element) => {
      element.textContent = initials;
    });

    const label = menu.querySelector("[data-account-label]");
    const name = menu.querySelector("[data-account-name]");
    const email = menu.querySelector("[data-account-email]");
    const action = menu.querySelector("[data-account-action]");

    if (user) {
      label.textContent = user.username;
      name.textContent = user.username;
      email.textContent = user.email;
      action.textContent = "Sign out";
      action.dataset.mode = "signout";
    } else {
      label.textContent = "Sign in";
      name.textContent = "Guest Rider";
      email.textContent = "Choose an account to continue";
      action.textContent = "Sign in";
      action.dataset.mode = "signin";
    }
  }

  function refreshAccountMenus() {
    document.querySelectorAll(".account-menu").forEach((menu) => {
      hydrateAccountMenu(menu);
    });
  }

  function initAccountMenus() {
    const navbars = document.querySelectorAll(".navbar");

    navbars.forEach((navbar) => {
      if (!navbar.querySelector(".account-menu")) {
        navbar.appendChild(buildAccountMenu());
      }
    });

    document.querySelectorAll(".account-menu").forEach((menu) => {
      hydrateAccountMenu(menu);

      const trigger = menu.querySelector(".account-menu-trigger");
      const dropdown = menu.querySelector("[data-account-dropdown]");
      const action = menu.querySelector("[data-account-action]");

      trigger.addEventListener("click", (event) => {
        event.stopPropagation();
        const isOpen = !dropdown.hidden;
        dropdown.hidden = isOpen;
        trigger.setAttribute("aria-expanded", String(!isOpen));
      });

      menu.querySelectorAll("[data-desktop-preview]").forEach((button) => {
        button.addEventListener("click", (event) => {
          event.preventDefault();
          event.stopPropagation();
          dropdown.hidden = true;
          trigger.setAttribute("aria-expanded", "false");
          openDesktopFeaturePreview(button.dataset.desktopPreview);
        });
      });

      action.addEventListener("click", () => {
        if (action.dataset.mode === "signout") {
          signOut();
          return;
        }

        const currentPage = getCurrentPage();
        window.location.href = `login.html?redirect=${encodeURIComponent(currentPage)}`;
      });
    });

    document.addEventListener("click", () => {
      document.querySelectorAll(".account-dropdown").forEach((dropdown) => {
        dropdown.hidden = true;
      });

      document.querySelectorAll(".account-menu-trigger").forEach((trigger) => {
        trigger.setAttribute("aria-expanded", "false");
      });
    });
  }

  const DESKTOP_FEATURE_PREVIEWS = {
    account: {
      eyebrow: "Account Preview",
      title: "Rider account controls are planned",
      copy: "This area will manage rider profile details, garage preferences, account security, and ownership settings once account screens are connected.",
      items: ["Rider profile", "Garage preferences", "Account security"],
      action: "Use the live sign-in/demo flow for now."
    },
    billing: {
      eyebrow: "Billing Preview",
      title: "Billing is not active yet",
      copy: "Subscriptions and premium tools are intentionally disabled until the product has real users, clear value, and backend billing support.",
      items: ["Premium garage tools", "Maintenance reminders", "Future subscription controls"],
      action: "No payment flow is connected."
    },
    settings: {
      eyebrow: "Settings Preview",
      title: "Product settings are planned",
      copy: "Settings will control units, reminders, notifications, and dashboard behavior after the core product loop is stable.",
      items: ["Miles / kilometers", "Reminder preferences", "Display options"],
      action: "The current build keeps settings read-only."
    },
    "request-brand": {
      eyebrow: "Catalog Request Preview",
      title: "Brand and motorcycle requests are planned",
      copy: "Riders will be able to suggest missing brands, models, years, corrections, and maintenance data once request storage and admin review are connected.",
      items: ["Missing brand request", "Missing motorcycle request", "Spec correction queue"],
      action: "Requests will go through admin review before publishing."
    },
    "request-motorcycle": {
      eyebrow: "Motorcycle Request Preview",
      title: "Missing motorcycle requests are planned",
      copy: "This will let riders ask for specific models, years, trims, and corrections without needing direct admin access.",
      items: ["Model and year intake", "Spec correction notes", "Admin approval later"],
      action: "Preview only until backend intake is connected."
    },
    feedback: {
      eyebrow: "Feedback Guide",
      title: "Review the product loop, not just the visuals",
      copy: "The most useful feedback is whether a rider understands the flow: choose a bike, save it, open the garage, track service, and compare a future upgrade.",
      items: ["What felt confusing?", "What felt useful?", "What would make you return?"],
      action: "Use this build to judge clarity and rider value."
    },
    roadmap: {
      eyebrow: "Product Roadmap",
      title: "The roadmap is intentional",
      copy: "This frontend build previews the product direction before the backend sprint. Garage history, reminders, ownership costs, and mod tracking become real once persistence and admin control are wired.",
      items: ["Backend garage history", "Maintenance reminders", "Cost and mod tracking"],
      action: "Preview only — no backend submission yet."
    }
  };

  function getDesktopFeaturePreviewConfig(feature) {
    return DESKTOP_FEATURE_PREVIEWS[feature] || DESKTOP_FEATURE_PREVIEWS.settings;
  }

  function ensureDesktopPreviewRoot() {
    let root = document.querySelector("[data-desktop-preview-root]");

    if (!root) {
      root = document.createElement("div");
      root.className = "desktop-preview-root";
      root.dataset.desktopPreviewRoot = "true";
      document.body.appendChild(root);
    }

    return root;
  }

  function closeDesktopFeaturePreview() {
    const root = document.querySelector("[data-desktop-preview-root]");

    if (root) {
      root.innerHTML = "";
      root.classList.remove("is-open");
    }

    document.body.classList.remove("desktop-preview-open");
  }

  function openDesktopFeaturePreview(feature) {
    const config = getDesktopFeaturePreviewConfig(feature);
    const root = ensureDesktopPreviewRoot();

    root.innerHTML = `
      <div class="desktop-preview-backdrop" data-close-desktop-preview></div>
      <section class="desktop-preview-modal" role="dialog" aria-modal="true" aria-label="${config.eyebrow}">
        <button class="desktop-preview-close" type="button" data-close-desktop-preview aria-label="Close preview">×</button>
        <span class="desktop-preview-eyebrow">${config.eyebrow}</span>
        <h2>${config.title}</h2>
        <p>${config.copy}</p>
        <div class="desktop-preview-grid">
          ${config.items.map((item) => `<span>${item}</span>`).join("")}
        </div>
        <div class="desktop-preview-note">
          <strong>Current build</strong>
          <span>${config.action}</span>
        </div>
        <div class="desktop-preview-actions">
          <button class="desktop-preview-primary" type="button" data-close-desktop-preview>Got it</button>
          <a class="desktop-preview-secondary" href="garage.html">Open Garage</a>
        </div>
      </section>
    `;

    root.classList.add("is-open");
    document.body.classList.add("desktop-preview-open");

    root.querySelectorAll("[data-close-desktop-preview]").forEach((element) => {
      element.addEventListener("click", closeDesktopFeaturePreview);
    });
  }

  function initDesktopPreviewActions() {
    document.addEventListener("click", (event) => {
      const trigger = event.target.closest("[data-desktop-preview]");

      if (!trigger) {
        return;
      }

      event.preventDefault();
      openDesktopFeaturePreview(trigger.dataset.desktopPreview);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeDesktopFeaturePreview();
      }
    });
  }


  async function guardPrivatePages() {
    const currentPage = getCurrentPage();

    if (!AUTH_REQUIRED_PAGES.has(currentPage)) {
      return;
    }

    const api = getApi();

    if (!api || !api.getToken()) {
      window.location.href = `login.html?redirect=${encodeURIComponent(currentPage)}`;
      return;
    }

    const user = await refreshCurrentUser();

    if (!user) {
      window.location.href = `login.html?redirect=${encodeURIComponent(currentPage)}`;
    }
  }

  async function initLoginPage() {
    const loginForm = document.querySelector("[data-login-form]");
    const registerForm = document.querySelector("[data-register-form]");
    const demoButton = document.querySelector("[data-demo-login]");
    const redirectTarget = getRedirectTarget();
    const session = getSession();

    if (session) {
      const activeUserLabel = document.querySelector("[data-active-user]");
      const continueButton = document.querySelector("[data-continue-session]");

      if (activeUserLabel) {
        activeUserLabel.textContent = session.user.username;
      }

      if (continueButton) {
        continueButton.hidden = false;
        continueButton.addEventListener("click", () => {
          window.location.href = redirectTarget;
        });
      }
    }

    if (loginForm) {
      loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        setFormLoading(loginForm, true);

        const emailInput = loginForm.querySelector("input[name='email'], input[type='email']");
        const passwordInput = loginForm.querySelector("input[name='password'], input[type='password']");

        const email = emailInput?.value.trim() || "";
        const password = passwordInput?.value || "";

if (!email || !password) {
  showAuthMessage("Email and password are required.", "error");
  return;
}

        try {
          await signIn(email, password, redirectTarget);
        } finally {
          setFormLoading(loginForm, false);
        }
      });
    }

    if (registerForm) {
      registerForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        setFormLoading(registerForm, true);

        const formData = new FormData(registerForm);
        const username = formData.get("username");
        const email = formData.get("email");
        const password = formData.get("password");

        try {
          await register(username, email, password, redirectTarget);
        } finally {
          setFormLoading(registerForm, false);
        }
      });
    }

    if (demoButton) {
      demoButton.addEventListener("click", async () => {
        demoButton.disabled = true;

        try{
          await signInDemo(redirectTarget);
        } finally {
          demoButton.disabled = false;
        }
      });
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    initDesktopPreviewActions();
    initAccountMenus();
    initLoginPage();
    guardPrivatePages();
    refreshCurrentUser().then(refreshAccountMenus).catch(() => {});
  });

  window.MotorcycleTrackerAuth = {
    getSession,
    refreshCurrentUser,
    signIn,
    register,
    signInDemo,
    signOut
  };
})();

(function restoreHiddenAdminShortcut() {
  if (window.__mtHiddenAdminShortcutReady) return;
  window.__mtHiddenAdminShortcutReady = true;

  let mtLogoClicks = 0;
  let mtLogoTimer = null;

  function resetMtLogoClicks() {
    mtLogoClicks = 0;
    if (mtLogoTimer) {
      clearTimeout(mtLogoTimer);
      mtLogoTimer = null;
    }
  }

  document.addEventListener("click", function (event) {
    const logo = event.target.closest(".logo-block, .logo-mark, .logo-text, [data-mt-logo]");
    if (!logo) return;

    mtLogoClicks += 1;
    if (mtLogoTimer) clearTimeout(mtLogoTimer);

    mtLogoTimer = setTimeout(resetMtLogoClicks, 1800);

    if (mtLogoClicks >= 5) {
      resetMtLogoClicks();
      window.location.href = window.MT_ADMIN_URL || "updates.html";
    }
  });
})();
