import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../../assets/images/logo-1.png";

const DashboardIcon = () => (
  <i className="fa-solid fa-border-all"></i>
);

const KanbanIcon = () => (
  <i className="fa-solid fa-table-columns"></i>
);

const TicketIcon = () => (
  <i className="fa-solid fa-ticket"></i>
);

const UploadIcon = () => (
  <i className="fa-solid fa-upload"></i>
);

const ReportIcon = () => (
  <i className="fa-solid fa-chart-column"></i>
);

const NotificationIcon = () => (
  <i className="fa-solid fa-bell"></i>
);

const SettingsIcon = () => (
  <i className="fa-solid fa-gear"></i>
);

const SideNav = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuSections = [
    {
      title: "OPERATIONS",
      items: [
        { icon: DashboardIcon, label: "Dashboard", path: "/dashboard" },
        { icon: KanbanIcon, label: "Kanban Board", path: "/kanban" },
        { icon: TicketIcon, label: "Tickets", path: "/tickets" }
      ]
    },
    {
      title: "MANAGEMENT",
      items: [
        { icon: UploadIcon, label: "Bulk Upload", path: "/bulk-upload" },
        { icon: ReportIcon, label: "Reports", path: "/reports" }
      ]
    },
    {
      title: "SYSTEM",
      items: [
        { icon: NotificationIcon, label: "Notifications", path: "/notifications" },
        { icon: SettingsIcon, label: "Settings", path: "/settings" }
      ]
    }
  ];

  return (
    <div className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>

      {/* Logo */}
      <div className="logo-container">
        <div className="logo-content">

          {sidebarOpen && (
            <div className="logo">
              <img src={logo} alt="logo" />
            </div>
          )}

          <button
            className="toggle-btn"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

        </div>
      </div>

      {/* Menu */}
      <div className="menu-container">

        {menuSections.map((section, index) => (

          <div key={index} className="menu-section">

            {sidebarOpen && (
              <div className="menu-section-title">
                {section.title}
              </div>
            )}

            {section.items.map((item, i) => {

              const IconComponent = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <div
                  key={i}
                  className={`menu-item ${isActive ? "active" : ""}`}
                  onClick={() => navigate(item.path)}
                >

                  <div className="menu-item-content">
                    <IconComponent />
                    {sidebarOpen && <span>{item.label}</span>}
                  </div>

                </div>
              );
            })}

          </div>

        ))}

      </div>

      {/* User */}
      <div className="sidebar-user">

        <img
          src="https://i.pravatar.cc/40"
          alt="user"
          className="user-avatar"
        />

        {sidebarOpen && (
          <div className="user-info">
            <div className="user-name">Marc G.</div>
            <div className="user-role">Fleet Manager</div>
          </div>
        )}

      </div>

    </div>
  );
};

export default SideNav;