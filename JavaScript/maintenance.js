const selectedGarageBikeName = document.getElementById("selectedGarageBikeName");
const selectedGarageBikeMeta = document.getElementById("selectedGarageBikeMeta");

const maintenanceMessage = document.getElementById("maintenanceMessage");
const maintenanceTaskForm = document.getElementById("maintenanceTaskForm");
const maintenanceLoadingState = document.getElementById("maintenanceLoadingState");
const refreshTasksBtn = document.getElementById("refreshTasksBtn");
const createTaskBtn = document.getElementById("createTaskBtn");

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
const MAINTENANCE_LOGIN_REDIRECT = `login.html?redirect=${encodeURIComponent(window.location.pathname.split("/").pop() + window.location.search)}`;

function getApi() {
  return window.MotorcycleTrackerApi || null;
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForApiClient(timeout = 1800) {
  const startedAt = Date.now();

  while (!getApi() && Date.now() - startedAt < timeout) {
    await wait(50);
  }

  return getApi();
}

async function waitForMaintenanceSession(timeout = 1800) {
  const api = await waitForApiClient(timeout);

  if (!api) {
    return null;
  }

  const startedAt = Date.now();

  while (!api.getToken() && Date.now() - startedAt < timeout) {
    await wait(50);
  }

  return api.getToken() ? api : null;
}

async function apiRequestWithRetry(path, options = {}, retries = 1) {
  const api = await waitForMaintenanceSession();

  if (!api) {
    return null;
  }

  const response = await api.apiRequest(path, options);

  if (response.ok || retries <= 0) {
    return response;
  }

  await wait(350);
  return api.apiRequest(path, options);
}

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

function formatDate(dateValue) {
  if (!dateValue) {
    return "No due date";
  }

  return new Date(`${dateValue}T00:00:00`).toLocaleDateString();
}

function getMotorcycleFromGarageItem(item) {
  return item.motorcycle || item.bike || item;
}

function getGarageId(item) {
  return String(item.id || item.garageId);
}

function setFormEnabled(isEnabled) {
  const formElements = maintenanceTaskForm.querySelectorAll("input, textarea, button");

  formElements.forEach((element) => {
    element.disabled = !isEnabled;
  });

  refreshTasksBtn.disabled = !isEnabled;
}

async function loadSelectedGarageBike() {
  if (!garageId) {
    selectedGarageBikeName.textContent = "No bike selected";
    selectedGarageBikeMeta.textContent = "Go to Garage and choose Maintenance for a saved motorcycle.";
    setFormEnabled(false);
    showMaintenanceMessage("No garage bike was selected. Open this page from the Garage.");
    return false;
  }

  try {
    const response = await apiRequestWithRetry("/api/garage");

    if (!response) {
      selectedGarageBikeName.textContent = "Session unavailable";
      selectedGarageBikeMeta.textContent = "Sign in again to connect this page to your garage.";
      setFormEnabled(false);
      showMaintenanceMessage("Sign in again to load maintenance for this motorcycle.");
      window.location.href = MAINTENANCE_LOGIN_REDIRECT;
      return false;
    }

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
    selectedGarageBikeMeta.textContent = "Try refresh once, then sign in again if this continues.";
    setFormEnabled(false);
    showMaintenanceMessage("Could not load the selected garage bike.");
    console.error("Failed to load selected garage bike:", error);
    return false;
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
    <h4>${task.title || "Untitled Task"}</h4>

    <p>${task.description || "No description added."}</p>

    <div class="maintenance-task-meta">
      <span>${getStatusLabel(task.status)}</span>
      <span>Due: ${formatDate(task.dueDate)}</span>
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

  try {
    const response = await apiRequestWithRetry(`/api/garage/${garageId}/tasks`);

    if (!response) {
      maintenanceLoadingState.style.display = "none";
      clearTaskColumns();
      showMaintenanceMessage("Sign in again to load maintenance tasks.");
      window.location.href = MAINTENANCE_LOGIN_REDIRECT;
      return;
    }

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
    showMaintenanceMessage("Open this page from the Garage before adding tasks.");
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
    const response = await apiRequestWithRetry(`/api/garage/${garageId}/tasks`, {
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

    if (!response) {
      showMaintenanceMessage("Sign in again before adding maintenance tasks.");
      window.location.href = MAINTENANCE_LOGIN_REDIRECT;
      return;
    }

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
    const response = await apiRequestWithRetry(`/api/tasks/${taskId}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        status: nextStatus
      })
    });

    if (!response) {
      showMaintenanceMessage("Sign in again before updating maintenance tasks.");
      window.location.href = MAINTENANCE_LOGIN_REDIRECT;
      return;
    }

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
    const response = await apiRequestWithRetry(`/api/tasks/${taskId}`, {
      method: "DELETE"
    });

    if (!response) {
      showMaintenanceMessage("Sign in again before deleting maintenance tasks.");
      window.location.href = MAINTENANCE_LOGIN_REDIRECT;
      return;
    }

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

if (maintenanceTaskForm) {
  maintenanceTaskForm.addEventListener("submit", createTask);
}

if (refreshTasksBtn) {
  refreshTasksBtn.addEventListener("click", loadTasks);
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

async function initializeMaintenancePage() {
  const api = await waitForMaintenanceSession();

  if (!api) {
    maintenanceLoadingState.style.display = "none";
    clearTaskColumns();
    setFormEnabled(false);
    showMaintenanceMessage("Sign in again to connect maintenance to your garage.");
    window.location.href = MAINTENANCE_LOGIN_REDIRECT;
    return;
  }

  const bikeLoaded = await loadSelectedGarageBike();

  if (bikeLoaded) {
    await loadTasks();
    return;
  }

  maintenanceLoadingState.style.display = "none";
  clearTaskColumns();
}

document.addEventListener("DOMContentLoaded", initializeMaintenancePage);
