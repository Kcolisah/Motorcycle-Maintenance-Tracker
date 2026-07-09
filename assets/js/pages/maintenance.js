function resolveMaintenanceImagePath(path) {
  if (!path) {
    return "assets/images/LOGO.png";
  }

  const value = String(path).trim();

  if (
    value.startsWith("http://") ||
    value.startsWith("https://") ||
    value.startsWith("data:") ||
    value.startsWith("assets/") ||
    value.startsWith("/assets/") ||
    value.startsWith("../assets/")
  ) {
    return value;
  }

  if (value.startsWith("/images/")) {
    return `/assets${value}`;
  }

  if (value.startsWith("images/")) {
    return `assets/${value}`;
  }

  if (value.startsWith("./images/")) {
    return `assets/${value.slice(2)}`;
  }

  return value;
}

const API_BASE_URL = "https://api.olysa.app/api";

const selectedGarageBikeName = document.getElementById("selectedGarageBikeName");
const selectedGarageBikeMeta = document.getElementById("selectedGarageBikeMeta");

const maintenanceMessage = document.getElementById("maintenanceMessage");
const maintenanceTaskForm = document.getElementById("maintenanceTaskForm");
const maintenanceLoadingState = document.getElementById("maintenanceLoadingState");
const refreshTasksBtn = document.getElementById("refreshTasksBtn");
const createTaskBtn = document.getElementById("createTaskBtn");

const maintenanceMain = document.querySelector(".maintenance-main");
const maintenanceStatusGrid = document.querySelector(".maintenance-status-grid");
const maintenanceBoardGuide = document.getElementById("maintenanceBoardGuide");

const maintenanceBikeSelector = document.getElementById("maintenanceBikeSelector");
const maintenanceBikeSelectorGrid = document.getElementById("maintenanceBikeSelectorGrid");

const pendingTasks = document.getElementById("pendingTasks");
const inProgressTasks = document.getElementById("inProgressTasks");
const doneTasks = document.getElementById("doneTasks");

const pendingCount = document.getElementById("pendingCount");
const inProgressCount = document.getElementById("inProgressCount");
const doneCount = document.getElementById("doneCount");

const taskTitleInput = document.getElementById("taskTitle");
const taskDueDateInput = document.getElementById("taskDueDate");
const taskDescriptionInput = document.getElementById("taskDescription");

const maintenanceTaskPresets = {
  oil: {
    title: "Oil change",
    description: "Change engine oil, replace filter if needed, and note mileage after service."
  },
  chain: {
    title: "Chain service",
    description: "Clean, lubricate, and inspect chain slack, sprockets, and wear."
  },
  tires: {
    title: "Tire check",
    description: "Check tire pressure, tread depth, sidewalls, and wear pattern."
  },
  brakes: {
    title: "Brake inspection",
    description: "Inspect pads, rotors, brake fluid level, and lever feel."
  }
};

const statusColumns = {
  PENDING: pendingTasks,
  IN_PROGRESS: inProgressTasks,
  DONE: doneTasks
};

const statusCounts = {
  PENDING: pendingCount,
  IN_PROGRESS: inProgressCount,
  DONE: doneCount
};

const statusDropZones = {
  PENDING: pendingTasks?.closest(".maintenance-column"),
  IN_PROGRESS: inProgressTasks?.closest(".maintenance-column"),
  DONE: doneTasks?.closest(".maintenance-column")
};

let urlParams = new URLSearchParams(window.location.search);
let selectedGarageId = urlParams.get("garageId");
let garageItemsCache = [];
let draggedTask = null;

const formatters = window.MTFormatters || {};
const maintenanceStatus = window.MTMaintenanceStatus || {};

function showMaintenanceMessage(message, type = "error") {
  maintenanceMessage.textContent = message;
  maintenanceMessage.className = "maintenance-message";

  if (type === "success") {
    maintenanceMessage.classList.add("success");
  }

  maintenanceMessage.style.display = "block";
}

function hideMaintenanceMessage() {
  maintenanceMessage.textContent = "";
  maintenanceMessage.className = "maintenance-message";
  maintenanceMessage.style.display = "none";
}

async function getBackendErrorText(response) {
  try {
    return await response.text();
  } catch (error) {
    return "No backend error body returned.";
  }
}

const escapeHtml = formatters.escapeHtml || ((value) => String(value ?? ""));

const formatDate = formatters.formatDateOnly || ((dateValue) => (dateValue ? new Date(`${dateValue}T00:00:00`).toLocaleDateString() : "N/A"));

function getDueDateInfo(dateValue) {
  if (!dateValue) {
    return {
      label: "No due date",
      className: "is-no-date"
    };
  }

  const today = new Date();
  const dueDate = new Date(`${dateValue}T00:00:00`);

  today.setHours(0, 0, 0, 0);
  dueDate.setHours(0, 0, 0, 0);

  const dayDifference = Math.round((dueDate - today) / 86400000);

  if (dayDifference < 0) {
    return {
      label: `Overdue by ${Math.abs(dayDifference)}d`,
      className: "is-overdue"
    };
  }

  if (dayDifference === 0) {
    return {
      label: "Due today",
      className: "is-today"
    };
  }

  if (dayDifference <= 7) {
    return {
      label: `Due in ${dayDifference}d`,
      className: "is-soon"
    };
  }

  return {
    label: formatDate(dateValue),
    className: "is-later"
  };
}

const formatMileage = formatters.formatMileage || ((value) => `${Number(value || 0).toLocaleString()} mi`);

function getMotorcycleFromGarageItem(item) {
  return item.motorcycle || item.bike || item;
}

function getGarageId(item) {
  return String(item.id || item.garageId);
}

function getMotorcycleImage(motorcycle) {
  return resolveMaintenanceImagePath(motorcycle.imageUrl || motorcycle.image_url || motorcycle.image || motorcycle.imagePath);
}

function getGarageMileage(item) {
  return item.currentMileage ?? item.mileage ?? getMotorcycleFromGarageItem(item).mileage ?? 0;
}

function getGarageAddedDate(item) {
  return item.addedAt || item.createdAt || item.dateAdded || null;
}

function getMaintenanceUrlForGarageId(garageId) {
  return `maintenance.html?garageId=${encodeURIComponent(garageId)}`;
}

function setFormEnabled(isEnabled) {
  const formElements = maintenanceTaskForm.querySelectorAll("input, textarea, button");

  formElements.forEach((element) => {
    element.disabled = !isEnabled;
  });

  refreshTasksBtn.disabled = !isEnabled;
}

function runBoardRevealAnimation() {
  const animatedElements = [maintenanceTaskForm, maintenanceStatusGrid].filter(Boolean);

  animatedElements.forEach((element) => {
    element.classList.remove("maintenance-board-reveal");
    void element.offsetWidth;
    element.classList.add("maintenance-board-reveal");
  });
}

function setTaskBoardVisible(isVisible, shouldAnimate = false) {
  if (maintenanceMain) {
    maintenanceMain.classList.toggle("maintenance-board-open", isVisible);
  }

  maintenanceTaskForm.hidden = !isVisible;
  maintenanceTaskForm.style.display = isVisible ? "" : "none";

  if (maintenanceStatusGrid) {
    maintenanceStatusGrid.hidden = !isVisible;
    maintenanceStatusGrid.style.display = isVisible ? "" : "none";
  }

  if (maintenanceBoardGuide) {
    maintenanceBoardGuide.hidden = !isVisible;
    maintenanceBoardGuide.style.display = isVisible ? "" : "none";
  }

  refreshTasksBtn.hidden = !isVisible;
  refreshTasksBtn.style.display = isVisible ? "" : "none";

  if (isVisible && shouldAnimate) {
    runBoardRevealAnimation();
  }
}

function setSelectorVisible(isVisible) {
  if (!maintenanceBikeSelector) {
    return;
  }

  maintenanceBikeSelector.hidden = !isVisible;
  maintenanceBikeSelector.style.display = isVisible ? "block" : "none";
}

function clearTaskColumns() {
  Object.values(statusColumns).forEach((column) => {
    if (column) {
      column.innerHTML = "";
    }
  });

  Object.values(statusCounts).forEach((count) => {
    if (count) {
      count.textContent = "0";
    }
  });
}

function setupStatusDropZones() {
  Object.entries(statusDropZones).forEach(([status, column]) => {
    if (!column) {
      return;
    }

    column.dataset.dropStatus = status;
    column.classList.add("maintenance-drop-zone");
  });
}

function clearDropZoneHighlights() {
  Object.values(statusDropZones).forEach((column) => {
    if (!column) {
      return;
    }

    column.classList.remove("is-drop-target", "is-drop-blocked");
  });
}

function updateDropZoneHighlight(targetStatus) {
  Object.entries(statusDropZones).forEach(([status, column]) => {
    if (!column) {
      return;
    }

    const isTarget = status === targetStatus;
    const isSameStatus = draggedTask && draggedTask.status === targetStatus;

    column.classList.toggle("is-drop-target", isTarget && !isSameStatus);
    column.classList.toggle("is-drop-blocked", isTarget && isSameStatus);
  });
}

async function handleTaskDrop(targetStatus) {
  if (!draggedTask || !targetStatus) {
    return;
  }

  const taskId = draggedTask.id;
  const currentStatus = draggedTask.status;

  clearDropZoneHighlights();

  if (!taskId || currentStatus === targetStatus) {
    return;
  }

  await updateTaskStatus(taskId, targetStatus);
}

async function fetchGarageItems() {
  if (garageItemsCache.length > 0) {
    return garageItemsCache;
  }

  const response = await fetch(`${API_BASE_URL}/garage`);

  if (!response.ok) {
    const errorText = await getBackendErrorText(response);
    throw new Error(`Backend returned ${response.status}: ${errorText}`);
  }

  garageItemsCache = await response.json();
  return garageItemsCache;
}

function findGarageItemById(garageIdToFind) {
  return garageItemsCache.find((item) => {
    return getGarageId(item) === String(garageIdToFind);
  });
}

function updateSelectedBikeCard(selectedGarageItem) {
  const motorcycle = getMotorcycleFromGarageItem(selectedGarageItem);

  selectedGarageBikeName.textContent = motorcycle.model || "Saved Motorcycle";
  selectedGarageBikeMeta.textContent = `${motorcycle.brand || "Unknown Brand"} • ${motorcycle.category || "Unknown Category"} • ${motorcycle.year || "N/A"} • Ready for service tasks`;
}

function updateSelectorCardState() {
  const selectorCards = document.querySelectorAll("[data-selector-card-garage-id]");

  selectorCards.forEach((card) => {
    const cardGarageId = card.dataset.selectorCardGarageId;
    const isSelected = selectedGarageId && cardGarageId === String(selectedGarageId);
    const cardButton = card.querySelector("[data-select-garage-id]");

    card.classList.toggle("is-selected", Boolean(isSelected));

    if (cardButton) {
      cardButton.textContent = isSelected ? "Selected Board" : "Open Service Board";
      cardButton.setAttribute("aria-pressed", isSelected ? "true" : "false");
    }
  });
}

function renderMaintenanceBikeSelector(garageItems) {
  if (!maintenanceBikeSelectorGrid) {
    showMaintenanceMessage("Maintenance selector markup is missing from maintenance.html.");
    return;
  }

  maintenanceBikeSelectorGrid.innerHTML = "";

  if (!garageItems || garageItems.length === 0) {
    maintenanceBikeSelectorGrid.innerHTML = `
      <article class="maintenance-selector-empty">
        <h4>No garage motorcycles yet</h4>
        <p>Save a motorcycle first. Then this board becomes the place for oil changes, chain service, tires, brakes, inspections, and future service history.</p>
        <a href="index.html#tracker-preview">Find a Bike</a>
      </article>
    `;
    return;
  }

  garageItems.forEach((item) => {
    const motorcycle = getMotorcycleFromGarageItem(item);
    const itemGarageId = getGarageId(item);

    const name = motorcycle.model || "Saved Motorcycle";
    const brand = motorcycle.brand || "Unknown Brand";
    const category = motorcycle.category || "Unknown Category";
    const year = motorcycle.year || "N/A";
    const image = getMotorcycleImage(motorcycle);
    const mileage = formatMileage(getGarageMileage(item));
    const addedDate = getGarageAddedDate(item);

    const card = document.createElement("article");
    card.className = "maintenance-selector-card";
    card.dataset.selectorCardGarageId = itemGarageId;

    card.innerHTML = `
      <div class="maintenance-selector-image-wrap">
        <img src="${escapeHtml(image)}" alt="${escapeHtml(name)}" />
      </div>

      <div class="maintenance-selector-copy">
        <h4>${escapeHtml(name)}</h4>
        <p>${escapeHtml(brand)} • ${escapeHtml(category)} • ${escapeHtml(year)}</p>
      </div>

      <div class="maintenance-selector-stats">
        <span>
          <strong>Mileage</strong>
          ${escapeHtml(mileage)}
        </span>

        <span>
          <strong>Added</strong>
          ${escapeHtml(addedDate ? formatDate(String(addedDate).slice(0, 10)) : "N/A")}
        </span>
      </div>

      <button
        class="maintenance-selector-btn"
        type="button"
        data-select-garage-id="${escapeHtml(itemGarageId)}"
        aria-pressed="false"
      >
        Open Service Board
      </button>
    `;

    maintenanceBikeSelectorGrid.appendChild(card);
  });

  updateSelectorCardState();
}

function showNoBikeSelectedState() {
  selectedGarageBikeName.textContent = "Choose a motorcycle";
  selectedGarageBikeMeta.textContent = "Select a saved bike to add service tasks, move work through progress, and build its history.";

  setSelectorVisible(true);
  setFormEnabled(false);
  setTaskBoardVisible(false);
  clearTaskColumns();

  maintenanceLoadingState.style.display = "none";
  hideMaintenanceMessage();
  updateSelectorCardState();
}

async function loadSelectedGarageBike() {
  if (!selectedGarageId) {
    showNoBikeSelectedState();
    return false;
  }

  try {
    await fetchGarageItems();

    const selectedGarageItem = findGarageItemById(selectedGarageId);

    if (!selectedGarageItem) {
      selectedGarageBikeName.textContent = "Garage bike not found";
      selectedGarageBikeMeta.textContent = "This garage item may have been removed.";
      setFormEnabled(false);
      setTaskBoardVisible(false);
      updateSelectorCardState();
      showMaintenanceMessage("This garage motorcycle could not be found.");
      return false;
    }

    updateSelectedBikeCard(selectedGarageItem);
    updateSelectorCardState();
    setFormEnabled(true);
    return true;
  } catch (error) {
    selectedGarageBikeName.textContent = "Garage unavailable";
    selectedGarageBikeMeta.textContent = "Make sure the Spring Boot backend is running.";
    setFormEnabled(false);
    setTaskBoardVisible(false);
    showMaintenanceMessage("Could not load the selected garage bike.");
    console.error("Failed to load selected garage bike:", error);
    return false;
  }
}

async function loadMaintenanceHub() {
  setSelectorVisible(true);
  setFormEnabled(false);
  setTaskBoardVisible(Boolean(selectedGarageId));

  maintenanceLoadingState.style.display = "block";
  maintenanceLoadingState.textContent = selectedGarageId
    ? "Loading selected motorcycle..."
    : "Loading saved motorcycles...";

  try {
    const garageItems = await fetchGarageItems();

    renderMaintenanceBikeSelector(garageItems);

    if (!selectedGarageId) {
      showNoBikeSelectedState();
      return;
    }

    const bikeLoaded = await loadSelectedGarageBike();

    if (bikeLoaded) {
      setTaskBoardVisible(true, true);
      await loadTasks();
      return;
    }

    maintenanceLoadingState.style.display = "none";
  } catch (error) {
    maintenanceLoadingState.style.display = "none";
    setTaskBoardVisible(false);
    showMaintenanceMessage("Could not load your saved motorcycles.");
    console.error("Failed to load maintenance hub:", error);
  }
}

async function selectGarageBikeInPlace(garageIdToSelect) {
  selectedGarageId = String(garageIdToSelect);

  window.history.pushState(
    { garageId: selectedGarageId },
    "",
    getMaintenanceUrlForGarageId(selectedGarageId)
  );

  hideMaintenanceMessage();
  updateSelectorCardState();
  setFormEnabled(false);
  setTaskBoardVisible(true, true);
  clearTaskColumns();

  maintenanceLoadingState.style.display = "block";
  maintenanceLoadingState.textContent = "Loading maintenance tasks...";

  const bikeLoaded = await loadSelectedGarageBike();

  if (bikeLoaded) {
    await loadTasks();
  }

  setFormEnabled(bikeLoaded);
}

function getNextStatus(status) {
  return maintenanceStatus.getNextStatus ? maintenanceStatus.getNextStatus(status) : null;
}

function getStatusLabel(status) {
  return maintenanceStatus.getStatusLabel ? maintenanceStatus.getStatusLabel(status) : "Pending";
}

function createEmptyNote(text) {
  const note = document.createElement("div");
  note.className = "maintenance-empty-note";
  note.innerHTML = `
    <span class="maintenance-empty-dot" aria-hidden="true"></span>
    <p>${escapeHtml(text)}</p>
  `;
  return note;
}

function getEmptyTaskMessage(status) {
  if (status === "PENDING") {
    return "No pending tasks yet. Add the next oil change, chain service, tire check, brake inspection, or repair note.";
  }

  if (status === "IN_PROGRESS") {
    return "Nothing in progress. Move a task here when work has started.";
  }

  if (status === "DONE") {
    return "No completed service yet. Finished work will become this bike's history.";
  }

  return `No ${getStatusLabel(status).toLowerCase()} tasks.`;
}

function renderTaskCard(task) {
  const card = document.createElement("article");
  card.className = "maintenance-task-card";
  card.draggable = true;
  card.dataset.taskId = task.id;
  card.dataset.taskStatus = task.status || "PENDING";

  const nextStatus = getNextStatus(task.status);
  const dueDateInfo = getDueDateInfo(task.dueDate);

  const nextStatusButton = nextStatus
    ? `<button class="maintenance-task-action" type="button" data-task-id="${task.id}" data-next-status="${nextStatus}">
        Move to ${getStatusLabel(nextStatus)}
      </button>`
    : "";

  card.innerHTML = `
    <div class="maintenance-task-topline">
      <span class="maintenance-task-status-pill">${escapeHtml(getStatusLabel(task.status))}</span>
      <span class="maintenance-due-badge ${escapeHtml(dueDateInfo.className)}">${escapeHtml(dueDateInfo.label)}</span>
    </div>

    <h4>${escapeHtml(task.title || "Untitled Task")}</h4>

    <p>${escapeHtml(task.description || "No description added.")}</p>

    <div class="maintenance-task-meta">
      <span>Drag to move</span>
      <span>Due: ${escapeHtml(formatDate(task.dueDate))}</span>
    </div>

    <div class="maintenance-task-actions">
      ${nextStatusButton}

      <button class="maintenance-delete-btn" type="button" data-task-id="${task.id}">
        Delete
      </button>
    </div>
  `;

  return card;
}

function renderTasks(tasks) {
  clearTaskColumns();

  const groupedTasks = {
    PENDING: [],
    IN_PROGRESS: [],
    DONE: []
  };

  tasks.forEach((task) => {
    const status = task.status || "PENDING";

    if (groupedTasks[status]) {
      groupedTasks[status].push(task);
    }
  });

  Object.keys(groupedTasks).forEach((status) => {
    const column = statusColumns[status];
    const count = statusCounts[status];
    const taskGroup = groupedTasks[status];

    if (!column || !count) {
      console.error(`Missing maintenance column or count for status: ${status}`);
      return;
    }

    count.textContent = taskGroup.length;

    if (taskGroup.length === 0) {
      column.appendChild(createEmptyNote(getEmptyTaskMessage(status)));
      return;
    }

    taskGroup.forEach((task) => {
      column.appendChild(renderTaskCard(task));
    });
  });
}

async function loadTasks() {
  if (!selectedGarageId) {
    maintenanceLoadingState.style.display = "none";
    clearTaskColumns();
    return;
  }

  hideMaintenanceMessage();
  maintenanceLoadingState.style.display = "block";
  maintenanceLoadingState.textContent = "Loading maintenance tasks...";

  try {
    const response = await fetch(`${API_BASE_URL}/garage/${selectedGarageId}/tasks`);

    if (!response.ok) {
      const errorText = await getBackendErrorText(response);
      throw new Error(`Backend returned ${response.status}: ${errorText}`);
    }

    const tasks = await response.json();

    maintenanceLoadingState.style.display = "none";
    renderTasks(tasks);
  } catch (error) {
    maintenanceLoadingState.style.display = "none";
    clearTaskColumns();
    showMaintenanceMessage("Could not load maintenance tasks.");
    console.error("Failed to load maintenance tasks:", error);
  }
}

function applyMaintenancePreset(presetKey) {
  const preset = maintenanceTaskPresets[presetKey];

  if (!preset || !taskTitleInput || !taskDescriptionInput) {
    return;
  }

  taskTitleInput.value = preset.title;
  taskDescriptionInput.value = preset.description;

  if (taskDueDateInput && !taskDueDateInput.value) {
    const suggestedDate = new Date();
    suggestedDate.setDate(suggestedDate.getDate() + 7);
    taskDueDateInput.value = suggestedDate.toISOString().slice(0, 10);
  }

  taskTitleInput.focus();
  showMaintenanceMessage("Task shortcut filled in. Adjust the details, then add it to the board.", "success");
}

async function createTask(event) {
  event.preventDefault();

  if (!selectedGarageId) {
    showMaintenanceMessage("Choose a garage motorcycle before adding maintenance tasks.");
    return;
  }

  const title = document.getElementById("taskTitle").value.trim();
  const description = document.getElementById("taskDescription").value.trim();
  const dueDate = document.getElementById("taskDueDate").value;

  if (!title) {
    showMaintenanceMessage("Task title is required.");
    return;
  }

  createTaskBtn.disabled = true;
  createTaskBtn.textContent = "Adding...";

  try {
    const response = await fetch(`${API_BASE_URL}/garage/${selectedGarageId}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title,
        description,
        dueDate: dueDate || null
      })
    });

    if (!response.ok) {
      const errorText = await getBackendErrorText(response);
      throw new Error(`Backend returned ${response.status}: ${errorText}`);
    }

    maintenanceTaskForm.reset();
    showMaintenanceMessage("Maintenance task added to the service board.", "success");
    await loadTasks();
  } catch (error) {
    showMaintenanceMessage("Could not add maintenance task.");
    console.error("Failed to create maintenance task:", error);
  } finally {
    createTaskBtn.disabled = false;
    createTaskBtn.textContent = "Add Maintenance Task";
  }
}

async function updateTaskStatus(taskId, nextStatus) {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks/${taskId}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        status: nextStatus
      })
    });

    if (!response.ok) {
      const errorText = await getBackendErrorText(response);
      throw new Error(`Backend returned ${response.status}: ${errorText}`);
    }

    await loadTasks();
  } catch (error) {
    showMaintenanceMessage("Could not update task status.");
    console.error("Failed to update task status:", error);
  }
}

async function deleteTask(taskId) {
  const shouldDelete = window.confirm("Delete this maintenance task?");

  if (!shouldDelete) {
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
      method: "DELETE"
    });

    if (!response.ok) {
      const errorText = await getBackendErrorText(response);
      throw new Error(`Backend returned ${response.status}: ${errorText}`);
    }

    await loadTasks();
  } catch (error) {
    showMaintenanceMessage("Could not delete task.");
    console.error("Failed to delete task:", error);
  }
}

document.addEventListener("dragstart", (event) => {
  const taskCard = event.target.closest(".maintenance-task-card");

  if (!taskCard) {
    return;
  }

  draggedTask = {
    id: taskCard.dataset.taskId,
    status: taskCard.dataset.taskStatus
  };

  taskCard.classList.add("is-dragging");

  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", draggedTask.id);
  }
});

document.addEventListener("dragover", (event) => {
  if (!draggedTask) {
    return;
  }

  const dropZone = event.target.closest("[data-drop-status]");

  if (!dropZone) {
    clearDropZoneHighlights();
    return;
  }

  event.preventDefault();

  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = "move";
  }

  updateDropZoneHighlight(dropZone.dataset.dropStatus);
});

document.addEventListener("drop", (event) => {
  if (!draggedTask) {
    return;
  }

  const dropZone = event.target.closest("[data-drop-status]");

  if (!dropZone) {
    clearDropZoneHighlights();
    return;
  }

  event.preventDefault();
  handleTaskDrop(dropZone.dataset.dropStatus);
});

document.addEventListener("dragend", (event) => {
  const taskCard = event.target.closest(".maintenance-task-card");

  if (taskCard) {
    taskCard.classList.remove("is-dragging");
  }

  draggedTask = null;
  clearDropZoneHighlights();
});

document.addEventListener("click", (event) => {
  const presetButton = event.target.closest("[data-task-preset]");
  const selectorButton = event.target.closest("[data-select-garage-id]");
  const statusButton = event.target.closest("[data-next-status]");
  const deleteButton = event.target.closest(".maintenance-delete-btn");

  if (presetButton) {
    applyMaintenancePreset(presetButton.dataset.taskPreset);
    return;
  }

  if (selectorButton) {
    const garageIdToSelect = selectorButton.dataset.selectGarageId;
    selectGarageBikeInPlace(garageIdToSelect);
    return;
  }

  if (statusButton) {
    const taskId = statusButton.dataset.taskId;
    const nextStatus = statusButton.dataset.nextStatus;
    updateTaskStatus(taskId, nextStatus);
    return;
  }

  if (deleteButton) {
    const taskId = deleteButton.dataset.taskId;
    deleteTask(taskId);
  }
});

maintenanceTaskForm.addEventListener("submit", createTask);
refreshTasksBtn.addEventListener("click", loadTasks);

window.addEventListener("popstate", async () => {
  urlParams = new URLSearchParams(window.location.search);
  selectedGarageId = urlParams.get("garageId");

  if (!selectedGarageId) {
    showNoBikeSelectedState();
    window.history.replaceState({}, "", "maintenance.html");
    return;
  }

  const bikeLoaded = await loadSelectedGarageBike();

  if (bikeLoaded) {
    setTaskBoardVisible(true, true);
    await loadTasks();
  }
});

setupStatusDropZones();
loadMaintenanceHub();
