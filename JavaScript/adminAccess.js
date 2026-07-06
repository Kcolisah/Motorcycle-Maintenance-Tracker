document.addEventListener("DOMContentLoaded", () => {
  const accessTarget = document.querySelector(".logo-block");
  const adminPath = "/motorcycle-admin/";
  let clickCount = 0;
  let resetTimer = null;

  if (!accessTarget) return;

  accessTarget.setAttribute("role", "button");
  accessTarget.setAttribute("tabindex", "0");

  function resetClicks() {
    clickCount = 0;
    window.clearTimeout(resetTimer);
    resetTimer = null;
  }

  function registerAccessTap() {
    clickCount += 1;
    window.clearTimeout(resetTimer);

    if (clickCount >= 5) {
      window.location.href = adminPath;
      return;
    }

    resetTimer = window.setTimeout(resetClicks, 3500);
  }

  accessTarget.addEventListener("click", registerAccessTap);
  accessTarget.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      registerAccessTap();
    }
  });
});
