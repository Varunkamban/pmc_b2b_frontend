import SideNav from "components/layout/sidenav/sidenav.component";
import { useState } from "react";
import KanbanColumn from "./KanbanColumn";
import Header from "components/layout/header/header";
import CreateTicketModal from "./CreateTicketModal";
import { useKanban, COLUMN_ORDER, COLUMNS } from "./KanbanContext";
import { matchesSearch } from "./searchTickets";

const Kanban = () => {
  const [showCreateTicket, setShowCreateTicket] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [vehicleFilter, setVehicleFilter] = useState("All");
  const [driverFilter, setDriverFilter] = useState("All");
  const [pickupDateFilter, setPickupDateFilter] = useState("");

  const { labels } = useKanban();

  const allTickets = labels.flatMap((l) => l.tickets);

  const vehicles = new Set();
  const drivers = new Set();
  allTickets.forEach((t) => {
    if (t.vehicle?.name) vehicles.add(t.vehicle.name);
    if (t.drivers?.supportDriver?.name) drivers.add(t.drivers.supportDriver.name);
    if (t.drivers?.mainDriver?.name) drivers.add(t.drivers.mainDriver.name);
  });
  const vehicleOptions = ["All", ...Array.from(vehicles).sort()];
  const driverOptions = ["All", ...Array.from(drivers).sort()];

  const ticketMatches = (t) => {
    if (!matchesSearch(t, search)) return false;
    if (priorityFilter !== "All" && t.priority !== priorityFilter) return false;
    if (vehicleFilter !== "All" && t.vehicle?.name !== vehicleFilter) return false;
    if (driverFilter !== "All") {
      const hasDriver =
        t.drivers?.supportDriver?.name === driverFilter ||
        t.drivers?.mainDriver?.name === driverFilter;
      if (!hasDriver) return false;
    }
    if (pickupDateFilter) {
      const ticketDate = t.createdAt ? new Date(t.createdAt).toLocaleDateString("en-CA") : "";
      if (ticketDate !== pickupDateFilter) return false;
    }
    return true;
  };

  const filteredLabels = labels
    .map((label) => ({
      ...label,
      tickets: label.tickets.filter(ticketMatches),
    }));

  const totalShown = filteredLabels.reduce((s, l) => s + l.tickets.length, 0);
  const hasActiveFilters =
    priorityFilter !== "All" ||
    vehicleFilter !== "All" ||
    driverFilter !== "All" ||
    pickupDateFilter !== "" ||
    search.trim() !== "";

  const clearAll = () => {
    setPriorityFilter("All");
    setVehicleFilter("All");
    setDriverFilter("All");
    setPickupDateFilter("");
    setSearch("");
  };

  return (
    <div className="dashboard-container vendor-admin">
      <SideNav sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div
        className={`main-content ${sidebarOpen ? "sidebar-open" : "sidebar-closed"}`}
      >
        <Header
          title="Kanban Board"
          onNewRequest={() => setShowCreateTicket(true)}
          searchValue={search}
          onSearch={setSearch}
        />

        <div className="content w-100 pb-0">
          {/* Filter Bar */}
          <div className="kb-filter-bar">
            <div className="kb-filter-row">
              <div className="kb-filter-dropdown">
                <label className="kb-filter-label">Priority</label>
                <select
                  className="kb-filter-select"
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                >
                  <option value="All">All Priority</option>
                  <option value="VIP">VIP</option>
                  <option value="Normal">Normal</option>
                </select>
              </div>

              <div className="kb-filter-dropdown">
                <label className="kb-filter-label">Vehicle</label>
                <select
                  className="kb-filter-select"
                  value={vehicleFilter}
                  onChange={(e) => setVehicleFilter(e.target.value)}
                >
                  {vehicleOptions.map((v) => (
                    <option key={v} value={v}>
                      {v === "All" ? "All Vehicles" : v}
                    </option>
                  ))}
                </select>
              </div>

              <div className="kb-filter-dropdown">
                <label className="kb-filter-label">Driver</label>
                <select
                  className="kb-filter-select"
                  value={driverFilter}
                  onChange={(e) => setDriverFilter(e.target.value)}
                >
                  {driverOptions.map((d) => (
                    <option key={d} value={d}>
                      {d === "All" ? "All Drivers" : d}
                    </option>
                  ))}
                </select>
              </div>

              <div className="kb-filter-dropdown">
                <label className="kb-filter-label">Pickup Date</label>
                <input
                  type="date"
                  className="kb-filter-select"
                  value={pickupDateFilter}
                  onChange={(e) => setPickupDateFilter(e.target.value)}
                />
              </div>

              {hasActiveFilters && (
                <div className="kb-filter-meta">
                  <span className="kb-filter-count">
                    {totalShown} of {allTickets.length} tickets
                  </span>
                  <button
                    type="button"
                    className="kb-filter-clear"
                    onClick={clearAll}
                  >
                    Clear All
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Board */}
          <div className="sec-kanban-main">
            <div className="sec-kanban-board">
              {filteredLabels.map((label) => (
                <KanbanColumn
                  key={label.labelId}
                  label={label}
                  showAddButton={label.labelName === COLUMNS.NEW_REQUESTS}
                  openCreateTicket={() => setShowCreateTicket(true)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <CreateTicketModal
        show={showCreateTicket}
        onClose={() => setShowCreateTicket(false)}
      />
    </div>
  );
};

export default Kanban;
