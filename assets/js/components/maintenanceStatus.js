(() => {
  const labels = {
    PENDING: "Pending",
    IN_PROGRESS: "In Progress",
    DONE: "Done"
  };

  const nextStatuses = {
    PENDING: "IN_PROGRESS",
    IN_PROGRESS: "DONE"
  };

  function getNextStatus(status) {
    return nextStatuses[status] || null;
  }

  function getStatusLabel(status) {
    return labels[status] || labels.PENDING;
  }

  window.MTMaintenanceStatus = {
    labels,
    nextStatuses,
    getNextStatus,
    getStatusLabel
  };
})();
