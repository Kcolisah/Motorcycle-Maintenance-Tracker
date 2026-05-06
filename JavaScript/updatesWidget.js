document.addEventListener("DOMContentLoaded", () => {
  const updatesTrigger = document.getElementById("updates-trigger");
  const updatesPopover = document.getElementById("updates-popover");
  const updatesPopoverList = document.getElementById("updates-popover-list");

  if (!updatesTrigger || !updatesPopover || !updatesPopoverList) {
    console.error("Updates widget elements are missing.");
    return;
  }

  const updates = window.updates || [];

  updatesPopoverList.innerHTML = updates
    .slice(0, 3)
    .map((update) => {
      return `
        <a href="updates.html#${update.id}" class="updates-popover-item">
          <span>${update.category}</span>
          <strong>${update.title}</strong>
          <p>${update.shortText}</p>
        </a>
      `;
    })
    .join("");

  updatesTrigger.addEventListener("click", (event) => {
    event.stopPropagation();
    updatesPopover.hidden = !updatesPopover.hidden;
  });

  document.addEventListener("click", (event) => {
    const clickedInsideUpdates =
      updatesPopover.contains(event.target) || updatesTrigger.contains(event.target);

    if (!clickedInsideUpdates) {
      updatesPopover.hidden = true;
    }
  });
});
