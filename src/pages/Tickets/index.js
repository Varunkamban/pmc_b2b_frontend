import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SideNav from "components/layout/sidenav/sidenav.component";
import Header from "components/layout/header/header";
import CreateTicketModal from "components/kanban/CreateTicketModal";
import { useKanban } from "components/kanban/KanbanContext";
import { DRIVER_STATUS_META } from "components/kanban/driverStatusConfig";
import { matchesSearch } from "components/kanban/searchTickets";
import { FaSyncAlt } from "react-icons/fa";

const STATUS_OPTIONS = [
  "All Statuses",
  "New Requests",
  "Under Review",
  "Driver Assigned",
  "Driver Arrived",
  "In Transit",
  "Completed",
];

const STATUS_DOT_COLORS = {
  "New Requests": "#3B82F6",
  "Under Review": "#F59E0B",
  "Driver Assigned": "#22C55E",
  "Driver Arrived": "#A855F7",
  "In Transit": "#F97316",
  "Completed": "#16A34A",
};

const PRIORITY_COLORS = {
  VIP: { bg: "#FEF2F2", text: "#EF4444" },
  Normal: { bg: "#FFFBEB", text: "#D97706" },
};

const Tickets = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [showCreateTicket, setShowCreateTicket] = useState(false);
  const { columns } = useKanban();

  const allTickets = Object.entries(columns).flatMap(([colName, tickets]) =>
    tickets.map((t) => ({ ...t, columnName: colName }))
  );

  const filtered = allTickets.filter((t) => {
    if (statusFilter !== "All Statuses" && t.columnName !== statusFilter)
      return false;
    return matchesSearch(t, search);
  });

  const getStatusLabel = (ticket) => {
    const dsMeta = ticket.driverStatus
      ? DRIVER_STATUS_META[ticket.driverStatus]
      : null;
    return dsMeta?.label || ticket.columnName;
  };

  return (
    <div className="dashboard-container vendor-admin">
      <SideNav sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div
        className={`main-content ${sidebarOpen ? "sidebar-open" : "sidebar-closed"}`}
      >
        <Header
          title="Tickets"
          onNewRequest={() => setShowCreateTicket(true)}
          searchValue={search}
          onSearch={setSearch}
        />

        <div className="content w-100 pb-0">
          <div className="tk-page">
            {/* Title bar */}
            <div className="tk-title-bar">
              <div>
                <h2 className="tk-title">All Tickets</h2>
                <p className="tk-subtitle">
                  {filtered.length} of {allTickets.length} tickets
                </p>
              </div>
              <div className="tk-title-actions">
                <select
                  className="tk-select"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                <button className="tk-refresh-btn" onClick={() => navigate("/kanban")}>
                  <FaSyncAlt size={12} /> View Kanban
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="tk-table-wrap">
              <table className="tk-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Customer</th>
                    <th>Vehicle</th>
                    <th>Pickup</th>
                    <th>Status</th>
                    <th>Priority</th>
                    <th>Client</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="tk-table-empty">
                        No tickets match your search
                      </td>
                    </tr>
                  ) : (
                    filtered.map((ticket) => {
                      const statusLabel = getStatusLabel(ticket);
                      const dotColor =
                        STATUS_DOT_COLORS[ticket.columnName] || "#94A3B8";
                      const prioStyle =
                        PRIORITY_COLORS[ticket.priority] ||
                        PRIORITY_COLORS.Normal;

                      return (
                        <tr
                          key={ticket.ticketId}
                          className="tk-row"
                          onClick={() => navigate("/kanban")}
                        >
                          <td className="tk-col-id">{ticket.ticketId}</td>
                          <td className="tk-col-customer">
                            <span className="tk-cust-name">
                              {ticket.customerName}
                            </span>
                            <span className="tk-cust-phone">
                              {ticket.phone || "+971 XX XXX XXXX"}
                            </span>
                          </td>
                          <td className="tk-col-vehicle">
                            {ticket.vehicle?.name}
                          </td>
                          <td className="tk-col-pickup">
                            <span className="tk-pickup-loc">
                              {ticket.pickupLocation}
                            </span>
                            <span className="tk-pickup-time">
                              {ticket.createdAt}
                            </span>
                          </td>
                          <td>
                            <span className="tk-status-badge">
                              <span
                                className="tk-status-dot"
                                style={{ backgroundColor: dotColor }}
                              />
                              {statusLabel}
                            </span>
                          </td>
                          <td>
                            <span
                              className="tk-priority-badge"
                              style={{
                                backgroundColor: prioStyle.bg,
                                color: prioStyle.text,
                              }}
                            >
                              {ticket.priority}
                            </span>
                          </td>
                          <td className="tk-col-client">Swiss Car</td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
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

export default Tickets;
