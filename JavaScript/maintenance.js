const API_BASE_URL = "https://api.olysa.app/api";

const selectedGarageBikeName = document.getElementById("selectedGarageBikeName");
const selectedGarageBikeMeta = document.getElementById("selectedGarageBikeMeta");

const maintenanceMessage = document.getElementById("maintenanceMessage");
const maintenanceTaskForm = document.getElementById("maintenanceTaskForm");
const maintenanceLoadingState = document.getElementById("maintenanceLoadingState");
const refreshTasksBtn = document.getElementById("refreshTasksBtn");
const createTaskBtn = document.getElementById("createTaskBtn");

const maintenanceBikeSelector = document.getElementById("maintenanceBikeSelector");
const maintenanceBikeSelectorGrid = document.getElementById("maintenanceBikeSelectorGrid");

const pendingTasks = document.getElementById("pendingTasks");
const inProgressTasks = document.getElementById("inProgressTasks");
const doneTasks = document.getElementById("doneTasks");

const pendingCount = document.getElementById("pendingCount");
const inProgressCount = document.getElementById("inProgressCount");
const doneCount = document.getElementById("doneCount");

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

const urlParams = new URLSearchParams(window.location.search);
const garageId = urlParams.get("garageId");

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

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatDate(dateValue) {
  if (!dateValue) {
    return "N/A";
  }

  return new Date(`${dateValue}T00:00:00`).toLocaleDateString();
}

function formatMileage(value) {
  const number = Number(value || 0);
  return `${number.toLocaleString()} mi`;
}

function getMotorcycleFromGarageItem(item) {
  return item.motorcycle || item.bike || item;
}

function getGarageId(item) {
  return String(item.id || item.garageId);
}

function getMotorcycleImage(motorcycle) {
  return motorcycle.imageUrl || motorcycle.image || motorcycle.imagePath || "images/LOGO.png";
}

function getGarageMileage(item) {
  return item.currentMileage ?? item.mileage ?? getMotorcycleFromGarageItem(item).mileage ?? 0;
}

function getGarageAddedDate(item) {
  return item.addedAt || item.createdAt || item.dateAdded || null;
}

function setFormEnabled(isEnabled) {
  const formElements = maintenanceTaskForm.querySelectorAll("input, textarea, button");

  formElements.forEach((element) => {
    element.disabled = !isEnabled;
  });

  refreshTasksBtn.disabled = !isEnabled;
}

function setTaskBoardVisible(isVisible) {
  maintenanceTaskForm.hidden = !isVisible;
  document.querySelector(".maintenance-status-grid").hidden = !isVisible;
  refreshTasksBtn.hidden = !isVisible;
}

function setSelectorVisible(isVisible) {
  if (maintenanceBikeSelector) {
    maintenanceBikeSelector.hidden = !isVisible;
  }
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

function renderMaintenanceBikeSelector(garageItems) {
  if (!maintenanceBikeSelectorGrid) {
    showMaintenanceMessage("Maintenance selector markup is missing from maintenance.html.");
    return;
  }

  maintenanceBikeSelectorGrid.innerHTML = "";

  if (!garageItems || garageItems.length === 0) {
    maintenanceBikeSelectorGrid.innerHTML = `
      <article class="maintenance-selector-empty">
        <h4>No motorcycles saved yet</h4>
        <p>Add a motorcycle to your garage before creating maintenance tasks.</p>
        <a href="index.html#tracker-preview">Browse Bikes</a>
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

      <a class="maintenance-selector-btn" href="maintenance.html?garageId=${encodeURIComponent(itemGarageId)}">
        View Maintenance
      </a>
    `;

    maintenanceBikeSelectorGrid.appendChild(card);
  });
}

async function loadGarageSelector() {
  selectedGarageBikeName.textContent = "Choose a motorcycle";
  selectedGarageBikeMeta.textContent = "Select one of your saved bikes to manage its maintenance tasks.";

  setFormEnabled(false);
  setTaskBoardVisible(false);
  setSelectorVisible(true);
  clearTaskColumns();

  maintenanceLoadingState.style.display = "block";
  maintenanceLoadingState.textContent = "Loading saved motorcycles...";
  hideMaintenanceMessage();

  try {
    const response = await fetch(`${API_BASE_URL}/garage`);

    if (!response.ok) {
      const errorText = await getBackendErrorText(response);
      throw new Error(`Backend returned ${response.status}: ${errorText}`);
    }

    const garageItems = await response.json();

    maintenanceLoadingState.style.display = "none";
    renderMaintenanceBikeSelector(garageItems);
  } catch (error) {
    maintenanceLoadingState.style.display = "none";
    showMaintenanceMessage("Could not load your saved motorcycles.");
    console.error("Failed to load maintenance bike selector:", error);
  }
}

async function loadSelectedGarageBike() {
  if (!garageId) {
    await loadGarageSelector();
    return false;
  }

  setSelectorVisible(false);
  setTaskBoardVisible(true);

  try {
    const response = await fetch(`${API_BASE_URL}/garage`);

    if (!response.ok) {
      const errorText = await getBackendErrorText(response);
      throw new Error(`Backend returned ${response.status}: ${errorText}`);
    }

    const garageItems = await response.json();
    const selectedGarageItem = garageItems.find((item) => getGarageId(item) === String(garageId));

    if (!selectedGarageItem) {
      selectedGarageBikeName.textContent = "Garage bike not found";
      selectedGarageBikeMeta.textContent = "This garage item may have been removed.";
      setFormEnabled(false);
      showMaintenanceMessage("This garage motorcycle could not be found.");
      return false;
    }

    const motorcycle = getMotorcycleFromGarageItem(selectedGarageItem);

    selectedGarageBikeName.textContent = motorcycle.model || "Saved Motorcycle";
    selectedGarageBikeMeta.textContent = `${motorcycle.brand || "Unknown Brand"} • ${motorcycle.category || "Unknown Category"} • ${motorcycle.year || "N/A"}`;

    setFormEnabled(true);
    return true;
  } catch (error) {
    selectedGarageBikeName.textContent = "Garage unavailable";
    selectedGarageBikeMeta.textContent = "Make sure the Spring Boot backend is running.";
    setFormEnabled(false);
    showMaintenanceMessage("Could not load the selected garage bike.");
    console.error("Failed to load selected garage bike:", error);
    return false;
  }
}

function getNextStatus(status) {
  if (status === "PENDING") {
    return "IN_PROGRESS";
  }

  if (status === "IN_PROGRESS") {
    return "DONE";
  }

  return null;
}

function getStatusLabel(status) {
  if (status === "IN_PROGRESS") {
    return "In Progress";
  }

  if (status === "DONE") {
    return "Done";
  }

  return "Pending";
}

function createEmptyNote(text) {
  const note = document.createElement("div");
  note.className = "maintenance-empty-note";
  note.textContent = text;
  return note;
}

function renderTaskCard(task) {
  const card = document.createElement("article");
  card.className = "maintenance-task-card";

  const nextStatus = getNextStatus(task.status);

  const nextStatusButton = nextStatus
    ? `<button class="maintenance-task-action" type="button" data-task-id="${task.id}" data-next-status="${nextStatus}">
        Move to ${getStatusLabel(nextStatus)}
      </button>`
    : "";

  card.innerHTML = `
    <h4>${escapeHtml(task.title || "Untitled Task")}</h4>

    <p>${escapeHtml(task.description || "No description added.")}</p>

    <div class="maintenance-task-meta">
      <span>${escapeHtml(getStatusLabel(task.status))}</span>
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
      column.appendChild(createEmptyNote(`No ${getStatusLabel(status).toLowerCase()} tasks.`));
      return;
    }

    taskGroup.forEach((task) => {
      column.appendChild(renderTaskCard(task));
    });
  });
}

async function loadTasks() {
  if (!garageId) {
    maintenanceLoadingState.style.display = "none";
    clearTaskColumns();
    return;
  }

  hideMaintenanceMessage();
  maintenanceLoadingState.style.display = "block";
  maintenanceLoadingState.textContent = "Loading maintenance tasks...";

  try {
    const response = await fetch(`${API_BASE_URL}/garage/${garageId}/tasks`);

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

async function createTask(event) {
  event.preventDefault();

  if (!garageId) {
    showMaintenanceMessage("Choose a motorcycle before adding tasks.");
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
    const response = await fetch(`${API_BASE_URL}/garage/${garageId}/tasks`, {
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
    showMaintenanceMessage("Maintenance task added.", "success");
    await loadTasks();
  } catch (error) {
    showMaintenanceMessage("Could not add maintenance task.");
    console.error("Failed to create maintenance task:", error);
  } finally {
    createTaskBtn.disabled = false;
    createTaskBtn.textContent = "Add Task";
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

document.addEventListener("click", (event) => {
  const statusButton = event.target.closest("[data-next-status]");
  const deleteButton = event.target.closest(".maintenance-delete-btn");

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

async function initializeMaintenancePage() {
  const bikeLoaded = await loadSelectedGarageBike();

  if (bikeLoaded) {
    await loadTasks();
    return;
  }

  if (!garageId) {
    return;
  }

  maintenanceLoadingState.style.display = "none";
  clearTaskColumns();
}

initializeMaintenancePage();
