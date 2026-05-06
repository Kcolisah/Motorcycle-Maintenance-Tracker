const updatesTrigger = document.getElementById("update-trigger");
const updatesPopover = document.getElementById("update-popover");
const updatesPopoverList = document.getElementById("update-popover-list");

function renderHomepageUpdates() {
  if (!updatesPopoverList) return;

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
}

function toggleUpdatesPopover() {
  if (!updatesPopover) return;

  updatesPopover.hidden = !updatesPopover.hidden;
}

if (updatesTrigger) {
  updatesTrigger.addEventListener("click", toggleUpdatesPopover);
}

renderHomepageUpdates();