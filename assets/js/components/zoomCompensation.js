(() => {
  const root = document.documentElement;

  const clearCompensation = () => {
    root.classList.remove("desktop-zoom-compensated");
    root.style.removeProperty("--desktop-zoom-scale");
    root.style.removeProperty("--desktop-zoom-width");
    root.style.removeProperty("--desktop-zoom-height");
  };

  const updateZoomCompensation = () => {
    clearCompensation();

    const isDesktop = window.matchMedia("(min-width: 900px)").matches;
    const screenWidth = window.screen?.availWidth || window.screen?.width || 0;
    const viewportWidth = window.innerWidth || 0;
    const windowWidth = window.outerWidth || viewportWidth;

    if (!isDesktop || !screenWidth || !viewportWidth) return;

    const windowIsNearFullWidth = windowWidth >= screenWidth * 0.82;
    const zoomRatio = screenWidth / viewportWidth;
    const shouldCompensate = windowIsNearFullWidth && zoomRatio >= 1.32 && zoomRatio <= 1.75;

    if (!shouldCompensate) return;

    root.classList.add("desktop-zoom-compensated");
    root.style.setProperty("--desktop-zoom-scale", (1 / zoomRatio).toFixed(5));
    root.style.setProperty("--desktop-zoom-width", `${(zoomRatio * 100).toFixed(2)}vw`);
    root.style.setProperty("--desktop-zoom-height", `${(zoomRatio * 100).toFixed(2)}svh`);
  };

  let resizeTimer;
  window.addEventListener("resize", () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(updateZoomCompensation, 120);
  });

  updateZoomCompensation();
})();
