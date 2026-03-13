export function computeKanbanStats(labels) {
  const allTickets = labels.flatMap((l) => l.tickets);

  const statusCounts = {};
  labels.forEach((label) => {
    statusCounts[label.labelName] = label.tickets.length;
  });

  const totalTickets = allTickets.length;
  const vipTickets = allTickets.filter((t) => t.priority === "VIP").length;
  const completedTickets = statusCounts["Completed"] || 0;
  const completionRate =
    totalTickets > 0 ? Math.round((completedTickets / totalTickets) * 100) : 0;

  const activeDriverNames = new Set();
  allTickets.forEach((t) => {
    if (t.drivers?.mainDriver?.name) activeDriverNames.add(t.drivers.mainDriver.name);
    if (t.drivers?.supportDriver?.name) activeDriverNames.add(t.drivers.supportDriver.name);
  });

  const recentTickets = [...allTickets]
    .sort((a, b) => b.ticketId.localeCompare(a.ticketId))
    .slice(0, 8);

  const driverActivity = [];
  allTickets.forEach((ticket) => {
    const label = labels.find((l) =>
      l.tickets.some((t) => t.ticketId === ticket.ticketId)
    );
    if (ticket.drivers?.mainDriver?.name) {
      driverActivity.push({
        name: ticket.drivers.mainDriver.name,
        role: "Main Driver",
        ticketId: ticket.ticketId,
        status: label?.labelName || ticket.status,
        vehicle: ticket.vehicle,
      });
    }
    if (ticket.drivers?.supportDriver?.name) {
      driverActivity.push({
        name: ticket.drivers.supportDriver.name,
        role: "Support Driver",
        ticketId: ticket.ticketId,
        status: label?.labelName || ticket.status,
        vehicle: ticket.vehicle,
      });
    }
  });

  const uniqueDriverMap = new Map();
  driverActivity.forEach((d) => {
    if (!uniqueDriverMap.has(d.name)) {
      uniqueDriverMap.set(d.name, { ...d, assignedCount: 1 });
    } else {
      uniqueDriverMap.get(d.name).assignedCount += 1;
    }
  });
  const drivers = Array.from(uniqueDriverMap.values());

  const statusPipeline = [
    "New Requests",
    "Under Review",
    "Driver Assigned",
    "Driver Arrived",
    "In Transit",
    "Completed",
  ].map((name) => ({
    name,
    count: statusCounts[name] || 0,
    percentage:
      totalTickets > 0
        ? Math.round(((statusCounts[name] || 0) / totalTickets) * 100)
        : 0,
  }));

  return {
    totalTickets,
    vipTickets,
    completedTickets,
    completionRate,
    activeDriverCount: activeDriverNames.size,
    statusCounts,
    statusPipeline,
    recentTickets,
    drivers,
    allLabels: labels,
  };
}

export const STATUS_COLORS = {
  "New Requests": { bg: "#EFF6FF", text: "#2563EB", accent: "#3B82F6" },
  "Under Review": { bg: "#FFFBEB", text: "#D97706", accent: "#F59E0B" },
  "Driver Assigned": { bg: "#F0FDF4", text: "#16A34A", accent: "#22C55E" },
  "Driver Arrived": { bg: "#FDF4FF", text: "#9333EA", accent: "#A855F7" },
  "In Transit": { bg: "#FFF7ED", text: "#EA580C", accent: "#F97316" },
  "Completed": { bg: "#F0FDF4", text: "#15803D", accent: "#16A34A" },
};

export const KPI_ICONS = {
  "New Requests": "fa-solid fa-inbox",
  "Under Review": "fa-solid fa-magnifying-glass",
  "Driver Assigned": "fa-solid fa-user-check",
  "Driver Arrived": "fa-solid fa-location-dot",
  "In Transit": "fa-solid fa-truck-fast",
  "Completed": "fa-solid fa-circle-check",
};
