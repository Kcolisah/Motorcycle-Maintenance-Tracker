(() => {
  const API_BASE_URL =
    window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
      ? "http://localhost:8082"
      : "https://api.olysa.app";

  const TOKEN_KEY = "mtAuthToken";
  const USER_KEY = "mtAuthUser";
  const LEGACY_SESSION_KEY = "mtAuthSession";

  const nativeFetch = window.fetch.bind(window);

  function saveAuth(token, user) {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    localStorage.removeItem(LEGACY_SESSION_KEY);
  }

  function getToken() {
    return localStorage.getItem(TOKEN_KEY);
  }

  function getUser() {
    try {
      const storedUser = localStorage.getItem(USER_KEY);
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.warn("Saved user could not be read:", error);
      return null;
    }
  }

  function clearAuth() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(LEGACY_SESSION_KEY);
  }

  function isApiRequest(input) {
    const url = typeof input === "string" ? input : input?.url || "";

    return (
      url.startsWith("/api/") ||
      url.startsWith(`${API_BASE_URL}/api/`) ||
      url.includes("localhost:8082/api/") ||
      url.includes("api.olysa.app/api/")
    );
  }

  function normalizeApiInput(input) {
    if (typeof input === "string" && input.startsWith("/api/")) {
      return `${API_BASE_URL}${input}`;
    }

    return input;
  }

  async function parseJsonResponse(response) {
    const text = await response.text();

    if (!text) {
      return null;
    }

    try {
      return JSON.parse(text);
    } catch (error) {
      console.warn("Response was not valid JSON:", error);
      return null;
    }
  }

  async function apiRequest(path, options = {}) {
    const headers = new Headers(options.headers || {});
    const token = getToken();

    if (token && !headers.has("Authorization")) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    const response = await nativeFetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers
    });

    if (response.status === 401 || response.status === 403) {
      clearAuth();
    }

    return response;
  }

  window.fetch = async function authenticatedFetch(input, options = {}) {
    const finalInput = normalizeApiInput(input);
    const headers = new Headers(options.headers || {});
    const token = getToken();

    if (token && isApiRequest(finalInput) && !headers.has("Authorization")) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    const response = await nativeFetch(finalInput, {
      ...options,
      headers
    });

    if ((response.status === 401 || response.status === 403) && isApiRequest(finalInput)) {
      clearAuth();

      const currentPage = window.location.pathname.split("/").pop() || "index.html";
      const shouldRedirect = currentPage !== "login.html" && currentPage !== "register.html";

      if (shouldRedirect) {
        window.location.href = `login.html?redirect=${encodeURIComponent(currentPage)}`;
      }
    }

    return response;
  };

  window.MotorcycleTrackerApi = {
    API_BASE_URL,
    saveAuth,
    getToken,
    getUser,
    clearAuth,
    apiRequest,
    parseJsonResponse
  };
})();