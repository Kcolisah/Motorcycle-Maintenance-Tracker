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

  function signInDemo() {
    showAuthMessage("Demo access will be reconnected after real-account frontend testing.", "info");
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
      demoButton.addEventListener("click", () => {
        signInDemo();
      });
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
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