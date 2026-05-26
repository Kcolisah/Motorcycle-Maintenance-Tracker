(() => {
  const SESSION_KEY = "mtAuthSession";
  const DEMO_USER = {
    id: "demo-user",
    username: "Demo Rider",
    email: "demo@motorcycletracker.local",
    initials: "DR",
    role: "Demo Account",
    isDemo: true
  };

  const AUTH_REQUIRED_PAGES = new Set(["garage.html", "maintenance.html"]);

  function getCurrentPage() {
    const path = window.location.pathname;
    const page = path.substring(path.lastIndexOf("/") + 1);
    return page || "index.html";
  }

  function getRedirectTarget() {
    const params = new URLSearchParams(window.location.search);
    return params.get("redirect") || "index.html";
  }

  function getSession() {
    try {
      const storedSession = localStorage.getItem(SESSION_KEY);
      return storedSession ? JSON.parse(storedSession) : null;
    } catch (error) {
      console.warn("Auth session could not be read:", error);
      return null;
    }
  }

  function saveSession(user) {
    const session = {
      user,
      signedInAt: new Date().toISOString()
    };

    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return session;
  }

  function clearSession() {
    localStorage.removeItem(SESSION_KEY);
  }

  function signInDemo(redirectTarget = "index.html") {
    saveSession(DEMO_USER);
    window.location.href = redirectTarget;
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

        <a href="account.html" class="account-dropdown-link is-disabled" aria-disabled="true">Account Information</a>
        <a href="billing.html" class="account-dropdown-link is-disabled" aria-disabled="true">Manage Billing</a>
        <a href="settings.html" class="account-dropdown-link is-disabled" aria-disabled="true">Product Settings</a>
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

      menu.querySelectorAll(".account-dropdown-link.is-disabled").forEach((link) => {
        link.addEventListener("click", (event) => {
          event.preventDefault();
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

  function guardPrivatePages() {
    const currentPage = getCurrentPage();

    if (!AUTH_REQUIRED_PAGES.has(currentPage)) {
      return;
    }

    if (!getSession()) {
      window.location.href = `login.html?redirect=${encodeURIComponent(currentPage)}`;
    }
  }

  function initLoginPage() {
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

    if (demoButton) {
      demoButton.addEventListener("click", () => {
        signInDemo(redirectTarget);
      });
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    guardPrivatePages();
    initAccountMenus();
    initLoginPage();
  });

  window.MotorcycleTrackerAuth = {
    getSession,
    signInDemo,
    signOut
  };
})();
