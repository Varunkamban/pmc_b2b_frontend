import { createContext, useContext, useReducer, useCallback, useMemo } from "react";
import { boardData as initialBoardData } from "./mockBoardData";
import { DRIVER_SUB_STATUS } from "./driverStatusConfig";

const COLUMNS = {
  NEW_REQUESTS: "New Requests",
  UNDER_REVIEW: "Under Review",
  DRIVER_ASSIGNED: "Driver Assigned",
  DRIVER_ARRIVED: "Driver Arrived",
  IN_TRANSIT: "In Transit",
  COMPLETED: "Completed",
};

const COLUMN_ORDER = [
  COLUMNS.NEW_REQUESTS,
  COLUMNS.UNDER_REVIEW,
  COLUMNS.DRIVER_ASSIGNED,
  COLUMNS.DRIVER_ARRIVED,
  COLUMNS.IN_TRANSIT,
  COLUMNS.COMPLETED,
];

const STATUS_TO_COLUMN = {
  [DRIVER_SUB_STATUS.PICK_ME_SENT]:         COLUMNS.DRIVER_ASSIGNED,
  [DRIVER_SUB_STATUS.MAIN_DRIVER_ASSIGNED]:  COLUMNS.DRIVER_ASSIGNED,
  [DRIVER_SUB_STATUS.MAIN_DRIVER_EN_ROUTE]:  COLUMNS.DRIVER_ASSIGNED,
  [DRIVER_SUB_STATUS.MAIN_DRIVER_ARRIVED]:   COLUMNS.DRIVER_ASSIGNED,
  [DRIVER_SUB_STATUS.EN_ROUTE_TO_CUSTOMER]:  COLUMNS.DRIVER_ASSIGNED,

  [DRIVER_SUB_STATUS.ARRIVED_AT_CUSTOMER]:   COLUMNS.DRIVER_ARRIVED,
  [DRIVER_SUB_STATUS.INSPECTING_EXTERIOR]:   COLUMNS.DRIVER_ARRIVED,
  [DRIVER_SUB_STATUS.INSPECTING_INTERIOR]:   COLUMNS.DRIVER_ARRIVED,
  [DRIVER_SUB_STATUS.CAPTURING_PHOTOS]:      COLUMNS.DRIVER_ARRIVED,
  [DRIVER_SUB_STATUS.CUSTOMER_HANDOVER]:     COLUMNS.DRIVER_ARRIVED,

  [DRIVER_SUB_STATUS.EN_ROUTE_TO_GARAGE]:    COLUMNS.IN_TRANSIT,
  [DRIVER_SUB_STATUS.ARRIVED_AT_GARAGE]:     COLUMNS.IN_TRANSIT,
  [DRIVER_SUB_STATUS.GARAGE_HANDOVER]:       COLUMNS.IN_TRANSIT,
};

const ACTION = {
  ADD_TICKET: "ADD_TICKET",
  SET_DRIVER_STATUS: "SET_DRIVER_STATUS",
  UPDATE_TICKET: "UPDATE_TICKET",
};

function buildInitialState() {
  const board = initialBoardData[0];
  const columns = {};
  board.labels.forEach((label) => {
    columns[label.labelName] = label.tickets.map((t) => ({
      ...t,
      status: label.labelName,
    }));
  });
  COLUMN_ORDER.forEach((col) => {
    if (!columns[col]) columns[col] = [];
  });
  return { columns, nextId: 8040 };
}

function findTicket(columns, ticketId) {
  for (const col of COLUMN_ORDER) {
    const ticket = columns[col]?.find((t) => t.ticketId === ticketId);
    if (ticket) return { ticket, column: col };
  }
  return null;
}

function timestamp() {
  return new Date().toLocaleString("en-US", {
    month: "short", day: "numeric", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

function kanbanReducer(state, action) {
  switch (action.type) {
    case ACTION.ADD_TICKET: {
      const { formData } = action.payload;
      const ticket = {
        ticketId: `SM-${state.nextId}`,
        priority: formData.priority || "Normal",
        customerName: formData.fullName,
        vehicle: {
          name: [formData.carBrand, formData.carModel].filter(Boolean).join(" "),
          number: formData.numberPlate,
        },
        pickupLocation: formData.pickupLocation,
        createdAt: timestamp(),
        status: COLUMNS.NEW_REQUESTS,
        driverStatus: null,
        drivers: {
          mainDriver: { assignmentStatus: false, name: null },
          supportDriver: { name: null, assignmentStatus: false },
        },
        travel: { eta: null, distance: null },
        arrival: { time: null, status: null },
        inspection: {
          status: false, progress: null, exterior: null, interior: null,
          photos: { taken: 0, required: 6 },
        },
        garage: { name: null, arrivedAt: null, technicianName: null },
        drop: { location: formData.dropLocation, time: null, estTime: null },
      };
      return {
        ...state,
        columns: {
          ...state.columns,
          [COLUMNS.NEW_REQUESTS]: [...state.columns[COLUMNS.NEW_REQUESTS], ticket],
        },
        nextId: state.nextId + 1,
      };
    }

    case ACTION.SET_DRIVER_STATUS: {
      const { ticketId, newDriverStatus } = action.payload;
      const found = findTicket(state.columns, ticketId);
      if (!found) return state;

      const { ticket: oldTicket, column: fromCol } = found;

      if (newDriverStatus === "COMPLETE") {
        const updatedTicket = {
          ...oldTicket,
          status: COLUMNS.COMPLETED,
          driverStatus: DRIVER_SUB_STATUS.GARAGE_HANDOVER,
          drop: { ...oldTicket.drop, time: timestamp() },
        };
        return {
          ...state,
          columns: {
            ...state.columns,
            [fromCol]: state.columns[fromCol].filter((t) => t.ticketId !== ticketId),
            [COLUMNS.COMPLETED]: [...state.columns[COLUMNS.COMPLETED], updatedTicket],
          },
        };
      }

      const targetCol = STATUS_TO_COLUMN[newDriverStatus] || fromCol;
      const updatedTicket = {
        ...oldTicket,
        driverStatus: newDriverStatus,
        status: targetCol,
      };

      if (fromCol === targetCol) {
        return {
          ...state,
          columns: {
            ...state.columns,
            [fromCol]: state.columns[fromCol].map((t) =>
              t.ticketId === ticketId ? updatedTicket : t
            ),
          },
        };
      }

      return {
        ...state,
        columns: {
          ...state.columns,
          [fromCol]: state.columns[fromCol].filter((t) => t.ticketId !== ticketId),
          [targetCol]: [...state.columns[targetCol], updatedTicket],
        },
      };
    }

    case ACTION.UPDATE_TICKET: {
      const { ticketId, updates } = action.payload;
      const newColumns = { ...state.columns };
      for (const col of COLUMN_ORDER) {
        const idx = newColumns[col]?.findIndex((t) => t.ticketId === ticketId);
        if (idx !== undefined && idx >= 0) {
          const updated = [...newColumns[col]];
          updated[idx] = { ...updated[idx], ...updates };
          newColumns[col] = updated;
          break;
        }
      }
      return { ...state, columns: newColumns };
    }

    default:
      return state;
  }
}

const KanbanContext = createContext(null);

/**
 * To update a ticket's status from your API/websocket handler:
 *
 *   const { setDriverStatus } = useKanban();
 *   setDriverStatus("SM-8026", "main_driver_assigned");
 *
 * The board will auto-move the ticket to the correct column.
 */
export function KanbanProvider({ children }) {
  const [state, dispatch] = useReducer(kanbanReducer, null, buildInitialState);

  const addTicket = useCallback((formData) => {
    dispatch({ type: ACTION.ADD_TICKET, payload: { formData } });
  }, []);

  const setDriverStatus = useCallback((ticketId, newDriverStatus) => {
    dispatch({ type: ACTION.SET_DRIVER_STATUS, payload: { ticketId, newDriverStatus } });
  }, []);

  const updateTicket = useCallback((ticketId, updates) => {
    dispatch({ type: ACTION.UPDATE_TICKET, payload: { ticketId, updates } });
  }, []);

  const labels = useMemo(
    () =>
      COLUMN_ORDER.map((name, idx) => ({
        labelId: idx + 1,
        labelName: name,
        tickets: state.columns[name] || [],
      })),
    [state.columns]
  );

  const getAllTickets = useCallback(() => {
    return COLUMN_ORDER.flatMap((col) => state.columns[col] || []);
  }, [state.columns]);

  const value = {
    columns: state.columns,
    columnOrder: COLUMN_ORDER,
    labels,
    getAllTickets,
    addTicket,
    setDriverStatus,
    updateTicket,
    statusToColumn: STATUS_TO_COLUMN,
  };

  return (
    <KanbanContext.Provider value={value}>{children}</KanbanContext.Provider>
  );
}

export function useKanban() {
  const ctx = useContext(KanbanContext);
  if (!ctx) throw new Error("useKanban must be used within KanbanProvider");
  return ctx;
}

export { COLUMNS, COLUMN_ORDER, STATUS_TO_COLUMN };
