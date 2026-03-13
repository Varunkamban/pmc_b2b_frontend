import { memo } from "react";
import { FaPlus } from "react-icons/fa";
import KanbanCard from "./KanbanCard";

const KanbanColumn = memo(({ label, showAddButton, openCreateTicket }) => {
  return (
    <div className="kanban-main">
      <div className="kanban-header">
        <h3 className="kanban-title">
          <span className="dot" /> {label.labelName}
          <span className="ticket-count">{label.tickets.length}</span>
        </h3>
      </div>
      <div className="kanban-label">
        <div className="kanban-body">
          {label.tickets.map((ticket) => (
            <KanbanCard
              key={ticket.ticketId}
              ticket={ticket}
              labelName={label.labelName}
            />
          ))}

          {showAddButton && (
            <button type="button" className="add-ticket-btn-dashed" onClick={openCreateTicket}>
              <FaPlus /> New Ticket
            </button>
          )}
        </div>
      </div>
    </div>
  );
});

KanbanColumn.displayName = "KanbanColumn";

export default KanbanColumn;
