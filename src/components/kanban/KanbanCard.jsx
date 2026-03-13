import { memo } from "react";
import {
  FaClock,
  FaMapMarkerAlt,
  FaCar,
  FaUser,
  FaPhone,
  FaComment,
} from "react-icons/fa";
import { DRIVER_STATUS_META } from "./driverStatusConfig";
import { COLUMNS } from "./KanbanContext";

const DriverMiniAvatars = ({ drivers }) => (
  <div className="ds-drivers-row-compact">
    {drivers?.supportDriver?.name && (
      <div className="ds-mini-driver">
        <div className="ds-mini-avatar support">
          {drivers.supportDriver.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </div>
        <span>{drivers.supportDriver.name.split(" ")[0]}</span>
      </div>
    )}
    {drivers?.mainDriver?.name && (
      <div className="ds-mini-driver">
        <div className="ds-mini-avatar main">
          {drivers.mainDriver.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </div>
        <span>{drivers.mainDriver.name.split(" ")[0]}</span>
      </div>
    )}
  </div>
);

const KanbanCard = memo(({ ticket, labelName }) => {
  if (!ticket) return null;

  const dsMeta = ticket.driverStatus
    ? DRIVER_STATUS_META[ticket.driverStatus]
    : null;

  const renderProgressBar = () => {
    if (!dsMeta) return null;
    const segments = Array.from({ length: dsMeta.totalSteps });
    return (
      <div className="ds-progress-bar">
        {segments.map((_, i) => (
          <div
            key={i}
            className={`ds-progress-seg ${i < dsMeta.step ? "filled" : ""} ${
              i === dsMeta.step - 1 ? "current" : ""
            }`}
            style={
              i < dsMeta.step ? { backgroundColor: dsMeta.color } : undefined
            }
          />
        ))}
      </div>
    );
  };

  const renderDriverBadge = () => {
    if (!dsMeta) return null;
    return (
      <div
        className="ds-status-badge"
        style={{ backgroundColor: dsMeta.bgColor, color: dsMeta.color }}
      >
        <i className={dsMeta.icon} />
        <span>{dsMeta.label}</span>
      </div>
    );
  };

  const renderStatusSection = () => {
    switch (labelName) {
      case COLUMNS.NEW_REQUESTS:
        return (
          <div className="ticket-details-box">
            <div className="detail-row">
              <FaMapMarkerAlt /> {ticket.pickupLocation}
            </div>
            <div className="detail-row">
              <FaClock /> {ticket.createdAt}
            </div>
          </div>
        );

      case COLUMNS.UNDER_REVIEW:
        return (
          <div className="status-container">
            <div className="waiting-badge">WAITING FOR ACTION</div>
            <div className="detail-row">
              <FaClock /> {ticket.createdAt}
            </div>
          </div>
        );

      case COLUMNS.DRIVER_ASSIGNED:
        return renderDriverAssigned();

      case COLUMNS.DRIVER_ARRIVED:
        return renderDriverArrived();

      case COLUMNS.IN_TRANSIT:
        return renderInTransit();

      case COLUMNS.COMPLETED:
        return (
          <div className="completed-box">
            <div className="detail-row">
              <FaMapMarkerAlt /> {ticket.drop?.location}
            </div>
            {ticket.garage?.name && (
              <div className="ds-garage-label">
                <i className="fa-solid fa-warehouse" /> {ticket.garage.name}
              </div>
            )}
            <div className="completed-footer">
              <span className="success-tag">COMPLETED</span>
              <span className="time-text">{ticket.drop?.time}</span>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const renderDriverAssigned = () => {
    const support = ticket.drivers?.supportDriver;
    const main = ticket.drivers?.mainDriver;

    return (
      <div className="ds-section">
        {renderDriverBadge()}
        {renderProgressBar()}
        <div className="ds-description">{dsMeta?.description}</div>

        <div className="ds-driver-card">
          <div className="ds-driver-avatar support">
            <FaUser size={12} />
          </div>
          <div className="ds-driver-detail">
            <p className="ds-driver-name">{support?.name || "Unassigned"}</p>
            <span className="ds-driver-role">
              Support Driver {support?.rating ? `· ★ ${support.rating}` : ""}
            </span>
          </div>
          <div className="ds-driver-actions">
            <button type="button" className="ds-action-btn">
              <FaPhone size={10} />
            </button>
            <button type="button" className="ds-action-btn">
              <FaComment size={10} />
            </button>
          </div>
        </div>

        {main?.assignmentStatus && main?.name && (
          <div className="ds-driver-card main">
            <div className="ds-driver-avatar main">
              <FaUser size={12} />
            </div>
            <div className="ds-driver-detail">
              <p className="ds-driver-name">{main.name}</p>
              <span className="ds-driver-role">
                Main Driver {main.rating ? `· ★ ${main.rating}` : ""}
                {main.vehicle ? ` · ${main.vehicle}` : ""}
              </span>
            </div>
          </div>
        )}

        {ticket.travel?.eta && (
          <div className="ds-travel-bar">
            <div className="ds-travel-item">
              <FaClock size={11} />
              <span>ETA {ticket.travel.eta}</span>
            </div>
            <div className="ds-travel-item">
              <FaMapMarkerAlt size={11} />
              <span>{ticket.travel.distance}</span>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderDriverArrived = () => {
    const inspectionData = ticket.inspection;

    return (
      <div className="ds-section">
        {renderDriverBadge()}
        {renderProgressBar()}
        <div className="ds-description">{dsMeta?.description}</div>

        <div className="ds-arrival-box">
          <div className="detail-row">
            <FaMapMarkerAlt /> {ticket.pickupLocation}
          </div>
          <div className="ds-arrival-meta">
            <span className="ds-arrival-time">
              <FaClock size={11} /> {ticket.arrival?.time}
            </span>
            {ticket.arrival?.status && (
              <span className="on-time-tag">{ticket.arrival.status}</span>
            )}
          </div>
        </div>

        {inspectionData && dsMeta?.phase === "inspection" && (
          <div className="ds-inspection-card">
            <div className="ds-inspection-header">
              <i className="fa-solid fa-clipboard-list" />
              <span>Car Inspection</span>
            </div>
            <div className="ds-inspection-items">
              <InspectionCheckItem
                label="Exterior"
                done={!!inspectionData.exterior}
                active={inspectionData.progress === "exterior"}
              />
              <InspectionCheckItem
                label="Interior"
                done={!!inspectionData.interior}
                active={inspectionData.progress === "interior"}
              />
              <InspectionCheckItem
                label="Photos"
                done={inspectionData.photos?.taken >= inspectionData.photos?.required}
                active={inspectionData.progress === "photos"}
                extra={`${inspectionData.photos?.taken || 0}/${inspectionData.photos?.required || 6}`}
              />
              <InspectionCheckItem
                label="Handover"
                done={inspectionData.progress === "handover" || inspectionData.progress === "complete"}
                active={inspectionData.progress === "handover"}
              />
            </div>
          </div>
        )}

        <DriverMiniAvatars drivers={ticket.drivers} />
      </div>
    );
  };

  const renderInTransit = () => {
    const garageData = ticket.garage;

    return (
      <div className="ds-section">
        {renderDriverBadge()}
        {renderProgressBar()}
        <div className="ds-description">{dsMeta?.description}</div>

        <div className="ds-transit-info">
          <div className="ds-transit-route">
            <div className="ds-transit-point start">
              <span className="ds-transit-dot start" />
              <span>{ticket.pickupLocation}</span>
            </div>
            <div className="ds-transit-line" />
            <div className="ds-transit-point end">
              <span className="ds-transit-dot end" />
              <span>{garageData?.name || ticket.drop?.location}</span>
            </div>
          </div>

          {ticket.travel?.eta &&
            ticket.travel.eta !== "Arrived" &&
            ticket.travel.eta !== "Completed" && (
              <div className="ds-transit-stats">
                <div className="ds-transit-stat">
                  <span className="ds-stat-value">{ticket.travel.distance}</span>
                  <span className="ds-stat-label">Distance</span>
                </div>
                <div className="ds-transit-stat-divider" />
                <div className="ds-transit-stat">
                  <span className="ds-stat-value highlight">{ticket.travel.eta}</span>
                  <span className="ds-stat-label">ETA</span>
                </div>
                {ticket.travel.speed && (
                  <>
                    <div className="ds-transit-stat-divider" />
                    <div className="ds-transit-stat">
                      <span className="ds-stat-value">{ticket.travel.speed}</span>
                      <span className="ds-stat-label">Speed</span>
                    </div>
                  </>
                )}
              </div>
            )}
        </div>

        {garageData?.checklist && (
          <div className="ds-garage-checklist">
            <div className="ds-inspection-header">
              <i className="fa-solid fa-warehouse" />
              <span>Garage Handover</span>
            </div>
            <div className="ds-inspection-items">
              <InspectionCheckItem label="Car delivered" done={garageData.checklist.delivered} />
              <InspectionCheckItem label="Keys handed" done={garageData.checklist.keysHanded} />
              <InspectionCheckItem label="Parking noted" done={garageData.checklist.parkingNoted} />
              <InspectionCheckItem label="Receipt received" done={garageData.checklist.receiptReceived} />
            </div>
          </div>
        )}

        {ticket.drop?.estTime && (
          <div className="ds-est-time">
            <FaClock size={11} />
            <span>
              Est:{" "}
              {new Date(ticket.drop.estTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        )}

        <DriverMiniAvatars drivers={ticket.drivers} />
      </div>
    );
  };

  return (
    <div className="ticket-card">
      <div className="card-top">
        <span className="ticket-id">#{ticket.ticketId}</span>
        <span className={`priority-badge ${ticket.priority?.toLowerCase()}`}>
          {ticket.priority === "VIP" ? "★ VIP" : "NORMAL"}
        </span>
      </div>

      <div className="customer-info">
        <h4 className="customer-name">{ticket.customerName}</h4>
        <p className="vehicle-info">
          <FaCar size={12} style={{ marginRight: 4 }} />
          {ticket.vehicle?.name} <span className="separator">|</span>{" "}
          {ticket.vehicle?.number}
        </p>
      </div>

      {renderStatusSection()}
    </div>
  );
});

KanbanCard.displayName = "KanbanCard";

const InspectionCheckItem = ({ label, done, active, extra }) => (
  <div className={`ds-check-item ${done ? "done" : ""} ${active ? "active" : ""}`}>
    <span className={`ds-check-icon ${done ? "done" : ""}`}>
      {done ? "✓" : active ? "●" : "○"}
    </span>
    <span className="ds-check-label">{label}</span>
    {extra && <span className="ds-check-extra">{extra}</span>}
  </div>
);

export default KanbanCard;
