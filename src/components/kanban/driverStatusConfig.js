/**
 * Driver sub-statuses mapped to the driver app flow (Sections D → F).
 *
 * Section D — After Acceptance / Coordination Phase  →  "Driver Assigned" column
 * Section E — Car Inspection & Customer Handover     →  "Driver Arrived" column
 * Section F — Driving to Garage                      →  "In Transit" column
 */

export const DRIVER_SUB_STATUS = {
  // Section D: Coordination Phase  (Kanban column: "Driver Assigned")
  PICK_ME_SENT:            "pick_me_sent",
  MAIN_DRIVER_ASSIGNED:    "main_driver_assigned",
  MAIN_DRIVER_EN_ROUTE:    "main_driver_en_route",
  MAIN_DRIVER_ARRIVED:     "main_driver_arrived",
  EN_ROUTE_TO_CUSTOMER:    "en_route_to_customer",

  // Section E: Car Inspection & Pickup  (Kanban column: "Driver Arrived")
  ARRIVED_AT_CUSTOMER:     "arrived_at_customer",
  INSPECTING_EXTERIOR:     "inspecting_exterior",
  INSPECTING_INTERIOR:     "inspecting_interior",
  CAPTURING_PHOTOS:        "capturing_photos",
  CUSTOMER_HANDOVER:       "customer_handover",

  // Section F: Driving to Garage  (Kanban column: "In Transit")
  EN_ROUTE_TO_GARAGE:      "en_route_to_garage",
  ARRIVED_AT_GARAGE:       "arrived_at_garage",
  GARAGE_HANDOVER:         "garage_handover",
};

export const DRIVER_STATUS_META = {
  // D — Coordination Phase
  [DRIVER_SUB_STATUS.PICK_ME_SENT]: {
    label: "Pick Me Sent",
    description: "Waiting for Main Driver to accept",
    icon: "fa-solid fa-paper-plane",
    color: "#D97706",
    bgColor: "#FFFBEB",
    phase: "coordination",
    step: 1,
    totalSteps: 5,
  },
  [DRIVER_SUB_STATUS.MAIN_DRIVER_ASSIGNED]: {
    label: "Main Driver Assigned",
    description: "Main driver confirmed & en route",
    icon: "fa-solid fa-user-check",
    color: "#16A34A",
    bgColor: "#F0FDF4",
    phase: "coordination",
    step: 2,
    totalSteps: 5,
  },
  [DRIVER_SUB_STATUS.MAIN_DRIVER_EN_ROUTE]: {
    label: "Main Driver En Route",
    description: "Main driver navigating to support driver",
    icon: "fa-solid fa-route",
    color: "#2563EB",
    bgColor: "#EFF6FF",
    phase: "coordination",
    step: 3,
    totalSteps: 5,
  },
  [DRIVER_SUB_STATUS.MAIN_DRIVER_ARRIVED]: {
    label: "Main Driver Arrived",
    description: "Main driver waiting at support driver location",
    icon: "fa-solid fa-car-side",
    color: "#9333EA",
    bgColor: "#FDF4FF",
    phase: "coordination",
    step: 4,
    totalSteps: 5,
  },
  [DRIVER_SUB_STATUS.EN_ROUTE_TO_CUSTOMER]: {
    label: "En Route to Customer",
    description: "Both drivers heading to customer",
    icon: "fa-solid fa-road",
    color: "#0369A1",
    bgColor: "#E0F2FE",
    phase: "coordination",
    step: 5,
    totalSteps: 5,
  },

  // E — Car Inspection & Pickup
  [DRIVER_SUB_STATUS.ARRIVED_AT_CUSTOMER]: {
    label: "Arrived at Customer",
    description: "At pickup location, ready for inspection",
    icon: "fa-solid fa-location-dot",
    color: "#16A34A",
    bgColor: "#F0FDF4",
    phase: "inspection",
    step: 1,
    totalSteps: 5,
  },
  [DRIVER_SUB_STATUS.INSPECTING_EXTERIOR]: {
    label: "Inspecting Exterior",
    description: "Checking body, tyres, lights, windscreen",
    icon: "fa-solid fa-magnifying-glass",
    color: "#D97706",
    bgColor: "#FFFBEB",
    phase: "inspection",
    step: 2,
    totalSteps: 5,
  },
  [DRIVER_SUB_STATUS.INSPECTING_INTERIOR]: {
    label: "Inspecting Interior",
    description: "Seats, dashboard, odometer, fuel level",
    icon: "fa-solid fa-clipboard-check",
    color: "#D97706",
    bgColor: "#FFFBEB",
    phase: "inspection",
    step: 3,
    totalSteps: 5,
  },
  [DRIVER_SUB_STATUS.CAPTURING_PHOTOS]: {
    label: "Capturing Photos",
    description: "Front, back, sides, odometer, interior",
    icon: "fa-solid fa-camera",
    color: "#2563EB",
    bgColor: "#EFF6FF",
    phase: "inspection",
    step: 4,
    totalSteps: 5,
  },
  [DRIVER_SUB_STATUS.CUSTOMER_HANDOVER]: {
    label: "Customer Handover",
    description: "Getting customer signature & confirmation",
    icon: "fa-solid fa-file-signature",
    color: "#9333EA",
    bgColor: "#FDF4FF",
    phase: "inspection",
    step: 5,
    totalSteps: 5,
  },

  // F — Driving to Garage
  [DRIVER_SUB_STATUS.EN_ROUTE_TO_GARAGE]: {
    label: "En Route to Garage",
    description: "Driving customer car to service center",
    icon: "fa-solid fa-truck-fast",
    color: "#0369A1",
    bgColor: "#E0F2FE",
    phase: "garage",
    step: 1,
    totalSteps: 3,
  },
  [DRIVER_SUB_STATUS.ARRIVED_AT_GARAGE]: {
    label: "Arrived at Garage",
    description: "At garage, completing handover checklist",
    icon: "fa-solid fa-warehouse",
    color: "#16A34A",
    bgColor: "#F0FDF4",
    phase: "garage",
    step: 2,
    totalSteps: 3,
  },
  [DRIVER_SUB_STATUS.GARAGE_HANDOVER]: {
    label: "Garage Handover Done",
    description: "Keys handed, car parked, receipt received",
    icon: "fa-solid fa-circle-check",
    color: "#15803D",
    bgColor: "#DCFCE7",
    phase: "garage",
    step: 3,
    totalSteps: 3,
  },
};
