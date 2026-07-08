(() => {
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function formatCurrency(value) {
    if (value === null || value === undefined || value === "" || Number.isNaN(Number(value))) {
      return "N/A";
    }

    return `$${Number(value).toLocaleString()}`;
  }

  function formatMileage(value) {
    if (value === null || value === undefined || value === "") {
      return "0 mi";
    }

    return `${Number(value).toLocaleString()} mi`;
  }

  function formatDisplayDate(value) {
    return value ? new Date(value).toLocaleDateString() : "N/A";
  }

  function formatDateOnly(value) {
    return value ? new Date(`${value}T00:00:00`).toLocaleDateString() : "N/A";
  }

  function parseNumber(value) {
    if (value === null || value === undefined || value === "") {
      return null;
    }

    const parsed = Number(String(value).replace(/[^0-9.]/g, ""));
    return Number.isNaN(parsed) ? null : parsed;
  }

  window.MTFormatters = {
    sleep,
    escapeHtml,
    formatCurrency,
    formatMileage,
    formatDisplayDate,
    formatDateOnly,
    parseNumber
  };
})();
