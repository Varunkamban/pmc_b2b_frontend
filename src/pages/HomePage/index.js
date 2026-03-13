import { AuthContext } from "context/AuthContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import SideNav from "components/layout/sidenav/sidenav.component";
import Header from "components/layout/header/header";
import CreateTicketModal from "components/kanban/CreateTicketModal";
import {
  computeKanbanStats,
  STATUS_COLORS,
  KPI_ICONS,
} from "components/dashboard/dashboardUtils";
import { useKanban } from "components/kanban/KanbanContext";
import {
  FaArrowRight,
  FaChartLine,
  FaClock,
  FaTrophy,
  FaUserTie,
  FaCar,
  FaExternalLinkAlt,
} from "react-icons/fa";

const Dashboard = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showCreateTicket, setShowCreateTicket] = useState(false);
  const [search, setSearch] = useState("");
  const { columns } = useKanban();

  const labels = Object.keys(columns).map((name, idx) => ({
    labelId: idx + 1,
    labelName: name,
    tickets: columns[name] || [],
  }));
  const stats = computeKanbanStats(labels);

  const inProgressCount =
    (stats.statusCounts["Under Review"] || 0) +
    (stats.statusCounts["Driver Assigned"] || 0) +
    (stats.statusCounts["Driver Arrived"] || 0) +
    (stats.statusCounts["In Transit"] || 0);

  return (
    <div className="dashboard-container vendor-admin">
      <SideNav sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div
        className={`main-content ${sidebarOpen ? "sidebar-open" : "sidebar-closed"}`}
      >
        <Header
          title="Dashboard"
          onNewRequest={() => setShowCreateTicket(true)}
          searchValue={search}
          onSearch={(val) => {
            setSearch(val);
            if (val.trim()) navigate("/tickets");
          }}
        />

        <div className="content w-100 pb-0">
          <div className="dashboard-page">
            {/* Welcome Bar */}
            <div className="dash-welcome-bar">
              <div className="dash-welcome-left">
                <h2 className="dash-welcome-title">Operations Overview</h2>
                <p className="dash-welcome-sub">
                  Real-time snapshot of your fleet service pipeline
                </p>
              </div>
              <div className="dash-welcome-actions">
                <button
                  className="dash-btn-kanban"
                  onClick={() => navigate("/kanban")}
                >
                  <i className="fa-solid fa-table-columns" /> Open Kanban Board
                  <FaArrowRight />
                </button>
                <button className="dash-btn-logout" onClick={logout}>
                  <i className="fa-solid fa-right-from-bracket" /> Logout
                </button>
              </div>
            </div>

            {/* Summary Cards Row */}
            <div className="dash-summary-row">
              <SummaryCard
                icon={<FaChartLine />}
                label="Total Tickets"
                value={stats.totalTickets}
                color="#2563EB"
                bgColor="#EFF6FF"
              />
              <SummaryCard
                icon={<FaClock />}
                label="In Progress"
                value={inProgressCount}
                color="#D97706"
                bgColor="#FFFBEB"
              />
              <SummaryCard
                icon={<FaTrophy />}
                label="Completed"
                value={stats.completedTickets}
                color="#16A34A"
                bgColor="#F0FDF4"
              />
              <SummaryCard
                icon={<FaUserTie />}
                label="Active Drivers"
                value={stats.activeDriverCount}
                color="#9333EA"
                bgColor="#FDF4FF"
              />
            </div>

            {/* KPI Status Cards */}
            <div className="dash-section-header">
              <h3>Pipeline Breakdown</h3>
              <button
                className="dash-link-btn"
                onClick={() => navigate("/kanban")}
              >
                View on Kanban <FaExternalLinkAlt size={11} />
              </button>
            </div>

            <div className="dash-kpi-grid">
              {stats.statusPipeline.map((stage) => (
                <div
                  key={stage.name}
                  className="dash-kpi-card"
                  style={{
                    borderLeft: `4px solid ${STATUS_COLORS[stage.name]?.accent}`,
                  }}
                  onClick={() => navigate("/kanban")}
                >
                  <div
                    className="dash-kpi-icon"
                    style={{
                      backgroundColor: STATUS_COLORS[stage.name]?.bg,
                      color: STATUS_COLORS[stage.name]?.text,
                    }}
                  >
                    <i className={KPI_ICONS[stage.name]} />
                  </div>
                  <div className="dash-kpi-info">
                    <span className="dash-kpi-count">{stage.count}</span>
                    <span className="dash-kpi-label">{stage.name}</span>
                  </div>
                  <div className="dash-kpi-bar-wrap">
                    <div
                      className="dash-kpi-bar"
                      style={{
                        width: `${stage.percentage}%`,
                        backgroundColor: STATUS_COLORS[stage.name]?.accent,
                      }}
                    />
                  </div>
                  <span className="dash-kpi-pct">{stage.percentage}%</span>
                </div>
              ))}
            </div>

            {/* Middle Row: Pipeline Visualization + Performance */}
            <div className="dash-middle-row">
              {/* Pipeline Chart */}
              <div className="dash-card dash-pipeline-card">
                <div className="dash-card-header">
                  <h4>Status Distribution</h4>
                  <span className="dash-badge-total">
                    {stats.totalTickets} tickets
                  </span>
                </div>
                <div className="dash-pipeline-chart">
                  {stats.statusPipeline.map((stage) => (
                    <div key={stage.name} className="dash-pipeline-row">
                      <span className="dash-pipeline-label">{stage.name}</span>
                      <div className="dash-pipeline-track">
                        <div
                          className="dash-pipeline-fill"
                          style={{
                            width: `${stage.percentage}%`,
                            backgroundColor:
                              STATUS_COLORS[stage.name]?.accent,
                          }}
                        />
                      </div>
                      <span className="dash-pipeline-value">
                        {stage.count}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="dash-completion-ring-section">
                  <div className="dash-completion-ring">
                    <svg viewBox="0 0 36 36" className="dash-ring-svg">
                      <path
                        className="dash-ring-bg"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="dash-ring-fill"
                        strokeDasharray={`${stats.completionRate}, 100`}
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <div className="dash-ring-text">
                      <span className="dash-ring-pct">
                        {stats.completionRate}%
                      </span>
                      <span className="dash-ring-label">Completed</span>
                    </div>
                  </div>
                  <div className="dash-ring-legend">
                    <div className="dash-legend-item">
                      <span
                        className="dash-legend-dot"
                        style={{ backgroundColor: "#16A34A" }}
                      />
                      Completed ({stats.completedTickets})
                    </div>
                    <div className="dash-legend-item">
                      <span
                        className="dash-legend-dot"
                        style={{ backgroundColor: "#E2E8F0" }}
                      />
                      Remaining ({stats.totalTickets - stats.completedTickets})
                    </div>
                  </div>
                </div>
              </div>

              {/* Active Drivers Card */}
              <div className="dash-card dash-drivers-card">
                <div className="dash-card-header">
                  <h4>Active Drivers</h4>
                  <span className="dash-badge-total">
                    {stats.drivers.length} assigned
                  </span>
                </div>

                {stats.drivers.length === 0 ? (
                  <div className="dash-empty-state">
                    <FaUserTie size={32} />
                    <p>No drivers currently assigned</p>
                  </div>
                ) : (
                  <div className="dash-driver-list">
                    {stats.drivers.map((driver, idx) => (
                      <div key={idx} className="dash-driver-row">
                        <div className="dash-driver-avatar">
                          {driver.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div className="dash-driver-info">
                          <span className="dash-driver-name">
                            {driver.name}
                          </span>
                          <span className="dash-driver-role">
                            {driver.role}
                          </span>
                        </div>
                        <div className="dash-driver-meta">
                          <span
                            className="dash-driver-status"
                            style={{
                              backgroundColor:
                                STATUS_COLORS[driver.status]?.bg || "#F1F5F9",
                              color:
                                STATUS_COLORS[driver.status]?.text || "#334155",
                            }}
                          >
                            {driver.status}
                          </span>
                          <span className="dash-driver-ticket">
                            #{driver.ticketId}
                          </span>
                        </div>
                        {driver.assignedCount > 1 && (
                          <span className="dash-driver-count">
                            +{driver.assignedCount - 1} more
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Performance Metrics */}
                <div className="dash-perf-section">
                  <h5>Fleet Performance</h5>
                  <div className="dash-perf-grid">
                    <div className="dash-perf-item">
                      <span className="dash-perf-val">
                        {stats.completionRate}%
                      </span>
                      <span className="dash-perf-label">Completion Rate</span>
                    </div>
                    <div className="dash-perf-item">
                      <span className="dash-perf-val">
                        {stats.vipTickets}
                      </span>
                      <span className="dash-perf-label">VIP Requests</span>
                    </div>
                    <div className="dash-perf-item">
                      <span className="dash-perf-val">18 min</span>
                      <span className="dash-perf-label">Avg. ETA</span>
                    </div>
                    <div className="dash-perf-item">
                      <span className="dash-perf-val">98%</span>
                      <span className="dash-perf-label">On-Time Rate</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Tickets Table */}
            <div className="dash-card dash-tickets-card">
              <div className="dash-card-header">
                <h4>Recent Service Requests</h4>
                <button
                  className="dash-link-btn"
                  onClick={() => navigate("/kanban")}
                >
                  View All on Kanban <FaArrowRight size={11} />
                </button>
              </div>

              <div className="dash-table-wrap">
                <table className="dash-table">
                  <thead>
                    <tr>
                      <th>Ticket ID</th>
                      <th>Customer</th>
                      <th>Vehicle</th>
                      <th>Pickup Location</th>
                      <th>Priority</th>
                      <th>Status</th>
                      <th>Created</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.recentTickets.map((ticket) => {
                      const label = stats.allLabels.find((l) =>
                        l.tickets.some(
                          (t) => t.ticketId === ticket.ticketId
                        )
                      );
                      const statusName = label?.labelName || ticket.status;
                      const colors = STATUS_COLORS[statusName] || {};

                      return (
                        <tr
                          key={ticket.ticketId}
                          className="dash-table-row"
                          onClick={() => navigate("/kanban")}
                        >
                          <td className="dash-td-id">
                            #{ticket.ticketId}
                          </td>
                          <td>
                            <div className="dash-td-customer">
                              <span className="dash-td-avatar">
                                {ticket.customerName
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </span>
                              {ticket.customerName}
                            </div>
                          </td>
                          <td>
                            <div className="dash-td-vehicle">
                              <FaCar className="dash-td-car-icon" />
                              <div>
                                <span>{ticket.vehicle?.name}</span>
                                <small>{ticket.vehicle?.number}</small>
                              </div>
                            </div>
                          </td>
                          <td className="dash-td-loc">
                            {ticket.pickupLocation}
                          </td>
                          <td>
                            <span
                              className={`dash-priority-badge ${ticket.priority?.toLowerCase()}`}
                            >
                              {ticket.priority === "VIP"
                                ? "VIP"
                                : "NORMAL"}
                            </span>
                          </td>
                          <td>
                            <span
                              className="dash-status-badge"
                              style={{
                                backgroundColor: colors.bg || "#F1F5F9",
                                color: colors.text || "#334155",
                              }}
                            >
                              {statusName}
                            </span>
                          </td>
                          <td className="dash-td-date">
                            {ticket.createdAt}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
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

const SummaryCard = ({ icon, label, value, color, bgColor }) => (
  <div className="dash-summary-card">
    <div className="dash-summary-icon" style={{ backgroundColor: bgColor, color }}>
      {icon}
    </div>
    <div className="dash-summary-info">
      <span className="dash-summary-value">{value}</span>
      <span className="dash-summary-label">{label}</span>
    </div>
  </div>
);

export default Dashboard;
