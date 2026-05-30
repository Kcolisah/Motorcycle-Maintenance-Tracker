(() => {
  const API_BASE_URL =
    window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
      ? "http://localhost:8082"
      : "https://api.olysa.app";

  const TOKEN_KEY = "mtAuthToken";
  const USER_KEY = "mtAuthUser";

  function saveAuth(token, user) {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
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
  }

  async function apiRequest(path, options = {}) {
    const headers = {
      ...(options.headers || {})
    };

    const token = getToken();

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers
    });

    if (response.status === 401 || response.status === 403) {
      clearAuth();
    }

    return response;
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