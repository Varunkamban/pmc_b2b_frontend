import { DRIVER_SUB_STATUS } from "./driverStatusConfig";

export const boardData = [
  {
    boardId: 1,
    boardName: "Swiss Car",
    boardDescription: "Swiss Car Service Booking Tickets Tracking",

    labels: [

      {
        labelId: 1,
        labelName: "New Requests",
        tickets: [
          {
            ticketId: "SM-8021",
            priority: "VIP",
            customerName: "Zayed Al Nahyan",
            vehicle: { name: "Rolls Royce Ghost", number: "DXB L1" },
            pickupLocation: "Burj Khalifa, Residential Wing",
            createdAt: "Nov 28 2026, 08:00 AM",
            status: "New Requests",
            driverStatus: null,
            drivers: {
              mainDriver: { assignmentStatus: false, name: null },
              supportDriver: { name: null, assignmentStatus: false }
            },
            travel: { eta: null, distance: null },
            arrival: { time: null, status: null },
            inspection: {
              status: false,
              progress: null,
              exterior: null,
              interior: null,
              photos: { taken: 0, required: 6 },
            },
            garage: { name: null, arrivedAt: null, technicianName: null },
            drop: { location: "DIFC, Gate Avenue", time: null, estTime: null }
          },
          {
            ticketId: "SM-8022",
            priority: "Normal",
            customerName: "Fatima Al Maktoum",
            vehicle: { name: "Mercedes S-Class", number: "DXB A 5540" },
            pickupLocation: "Palm Jumeirah, Shoreline Apt 8",
            createdAt: "Nov 28 2026, 08:15 AM",
            status: "New Requests",
            driverStatus: null,
            drivers: {
              mainDriver: { assignmentStatus: false, name: null },
              supportDriver: { name: null, assignmentStatus: false }
            },
            travel: { eta: null, distance: null },
            arrival: { time: null, status: null },
            inspection: {
              status: false,
              progress: null,
              exterior: null,
              interior: null,
              photos: { taken: 0, required: 6 },
            },
            garage: { name: null, arrivedAt: null, technicianName: null },
            drop: { location: "Al Quoz, Service Center", time: null, estTime: null }
          },
          {
            ticketId: "SM-8023",
            priority: "VIP",
            customerName: "Khalid Al Falasi",
            vehicle: { name: "Bentley Continental", number: "DXB B 1234" },
            pickupLocation: "Emirates Hills, Villa 42",
            createdAt: "Nov 28 2026, 08:30 AM",
            status: "New Requests",
            driverStatus: null,
            drivers: {
              mainDriver: { assignmentStatus: false, name: null },
              supportDriver: { name: null, assignmentStatus: false }
            },
            travel: { eta: null, distance: null },
            arrival: { time: null, status: null },
            inspection: {
              status: false,
              progress: null,
              exterior: null,
              interior: null,
              photos: { taken: 0, required: 6 },
            },
            garage: { name: null, arrivedAt: null, technicianName: null },
            drop: { location: "DIFC, Gate Avenue", time: null, estTime: null }
          }
        ]
      },

      {
        labelId: 2,
        labelName: "Under Review",
        tickets: [
          {
            ticketId: "SM-8024",
            priority: "VIP",
            customerName: "Omar Al Suwaidi",
            vehicle: { name: "Porsche Cayenne", number: "DXB C 7788" },
            pickupLocation: "Dubai Marina, Tower A",
            createdAt: "Nov 28 2026, 07:30 AM",
            status: "Under Review",
            driverStatus: null,
            drivers: {
              mainDriver: { assignmentStatus: false, name: null },
              supportDriver: { name: null, assignmentStatus: false }
            },
            travel: { eta: null, distance: null },
            arrival: { time: null, status: null },
            inspection: {
              status: false,
              progress: null,
              exterior: null,
              interior: null,
              photos: { taken: 0, required: 6 },
            },
            garage: { name: null, arrivedAt: null, technicianName: null },
            drop: { location: "Al Quoz Auto Service", time: null, estTime: null }
          },
          {
            ticketId: "SM-8025",
            priority: "Normal",
            customerName: "Rashid Al Ketbi",
            vehicle: { name: "Range Rover Sport", number: "DXB D 9912" },
            pickupLocation: "JBR, Sadaf Tower 4",
            createdAt: "Nov 28 2026, 07:45 AM",
            status: "Under Review",
            driverStatus: null,
            drivers: {
              mainDriver: { assignmentStatus: false, name: null },
              supportDriver: { name: null, assignmentStatus: false }
            },
            travel: { eta: null, distance: null },
            arrival: { time: null, status: null },
            inspection: {
              status: false,
              progress: null,
              exterior: null,
              interior: null,
              photos: { taken: 0, required: 6 },
            },
            garage: { name: null, arrivedAt: null, technicianName: null },
            drop: { location: "SZR, Auto Service Zone", time: null, estTime: null }
          }
        ]
      },

      // === DRIVER ASSIGNED (Section D: Coordination Phase) ===
      {
        labelId: 3,
        labelName: "Driver Assigned",
        tickets: [
          {
            ticketId: "SM-8026",
            priority: "VIP",
            customerName: "Ahmed Al-Rashid",
            vehicle: { name: "BMW 3 Series", number: "M72528" },
            pickupLocation: "Dubai Marina, Tower B",
            createdAt: "Nov 28 2026, 07:00 AM",
            status: "Driver Assigned",
            driverStatus: DRIVER_SUB_STATUS.PICK_ME_SENT,
            drivers: {
              mainDriver: { assignmentStatus: false, name: null },
              supportDriver: { name: "Abdul Rahman", assignmentStatus: true, rating: 4.8 }
            },
            travel: { eta: null, distance: null },
            arrival: { time: null, status: null },
            inspection: {
              status: false,
              progress: null,
              exterior: null,
              interior: null,
              photos: { taken: 0, required: 6 },
            },
            garage: { name: "Al Quoz Auto Service", arrivedAt: null, technicianName: null },
            drop: { location: "Al Quoz Auto Service", time: null, estTime: null }
          },
          {
            ticketId: "SM-8031",
            priority: "VIP",
            customerName: "Saeed Al Mansoori",
            vehicle: { name: "Audi Q7", number: "DXB E 4455" },
            pickupLocation: "Business Bay, Executive Tower",
            createdAt: "Nov 28 2026, 06:45 AM",
            status: "Driver Assigned",
            driverStatus: DRIVER_SUB_STATUS.MAIN_DRIVER_ASSIGNED,
            drivers: {
              mainDriver: {
                assignmentStatus: true,
                name: "Khalid Al-Ameri",
                rating: 4.9,
                vehicle: "Toyota Camry · White",
                trips: 620,
              },
              supportDriver: { name: "Abdul Rahman", assignmentStatus: true, rating: 4.8 }
            },
            travel: { eta: "4 min", distance: "1.8 km" },
            arrival: { time: null, status: null },
            inspection: {
              status: false,
              progress: null,
              exterior: null,
              interior: null,
              photos: { taken: 0, required: 6 },
            },
            garage: { name: "Al Quoz Auto Service", arrivedAt: null, technicianName: null },
            drop: { location: "SZR, Auto Service Zone", time: null, estTime: null }
          },
          {
            ticketId: "SM-8032",
            priority: "Normal",
            customerName: "Hamdan Al Falasi",
            vehicle: { name: "Lexus LX 570", number: "DXB F 6677" },
            pickupLocation: "Downtown Dubai, Blvd Point",
            createdAt: "Nov 28 2026, 06:30 AM",
            status: "Driver Assigned",
            driverStatus: DRIVER_SUB_STATUS.EN_ROUTE_TO_CUSTOMER,
            drivers: {
              mainDriver: {
                assignmentStatus: true,
                name: "Khalid Al-Ameri",
                rating: 4.9,
                vehicle: "Toyota Camry · White",
                trips: 620,
              },
              supportDriver: { name: "Tariq Hassan", assignmentStatus: true, rating: 4.7 }
            },
            travel: { eta: "14 min", distance: "6.2 km" },
            arrival: { time: null, status: null },
            inspection: {
              status: false,
              progress: null,
              exterior: null,
              interior: null,
              photos: { taken: 0, required: 6 },
            },
            garage: { name: "Al Quoz Auto Service", arrivedAt: null, technicianName: null },
            drop: { location: "Al Quoz Auto Service", time: null, estTime: null }
          },
        ]
      },

      // === DRIVER ARRIVED (Section E: Car Inspection & Customer Handover) ===
      {
        labelId: 4,
        labelName: "Driver Arrived",
        tickets: [
          {
            ticketId: "SM-8027",
            priority: "VIP",
            customerName: "Nasser Al Dhaheri",
            vehicle: { name: "Mercedes G-Class", number: "DXB G 8899" },
            pickupLocation: "Jumeirah Beach Residence, Tower 3",
            createdAt: "Nov 28 2026, 06:00 AM",
            status: "Driver Arrived",
            driverStatus: DRIVER_SUB_STATUS.INSPECTING_EXTERIOR,
            drivers: {
              mainDriver: { name: "Khalid Al-Ameri", assignmentStatus: true, rating: 4.9 },
              supportDriver: { name: "Abdul Rahman", assignmentStatus: true, rating: 4.8 }
            },
            travel: { eta: "18 min", distance: "11.2 km" },
            arrival: { time: "06:48 AM", status: "On Time" },
            inspection: {
              status: false,
              progress: "exterior",
              exterior: {
                scratches: true,
                lights: true,
                tyres: true,
                windscreen: false,
                bodyPanels: true,
              },
              interior: null,
              photos: { taken: 0, required: 6 },
            },
            garage: { name: "Al Quoz Auto Service", arrivedAt: null, technicianName: null },
            drop: { location: "Al Quoz Auto Service", time: null, estTime: null }
          },
          {
            ticketId: "SM-8028",
            priority: "Normal",
            customerName: "Majid Al Marri",
            vehicle: { name: "Toyota Land Cruiser", number: "DXB H 1122" },
            pickupLocation: "Al Barsha, Villa Community",
            createdAt: "Nov 28 2026, 05:45 AM",
            status: "Driver Arrived",
            driverStatus: DRIVER_SUB_STATUS.CUSTOMER_HANDOVER,
            drivers: {
              mainDriver: { name: "Rahul Mehta", assignmentStatus: true, rating: 4.6 },
              supportDriver: { name: "Tariq Hassan", assignmentStatus: true, rating: 4.7 }
            },
            travel: { eta: "18 min", distance: "11.2 km" },
            arrival: { time: "06:30 AM", status: "On Time" },
            inspection: {
              status: true,
              progress: "handover",
              exterior: {
                scratches: true,
                lights: true,
                tyres: true,
                windscreen: true,
                bodyPanels: true,
              },
              interior: {
                seats: true,
                dashboard: true,
                keysReceived: true,
                valuablesRemoved: true,
                odometer: "42,810 km",
                fuelLevel: "60%",
              },
              photos: { taken: 6, required: 6 },
            },
            garage: { name: "Al Quoz Auto Service", arrivedAt: null, technicianName: null },
            drop: { location: "SZR, Auto Service Zone", time: null, estTime: null }
          },
        ]
      },

      // === IN TRANSIT (Section F: Driving to Garage) ===
      {
        labelId: 5,
        labelName: "In Transit",
        tickets: [
          {
            ticketId: "SM-8029",
            priority: "VIP",
            customerName: "Sultan Al Qasimi",
            vehicle: { name: "Maserati Levante", number: "DXB J 3344" },
            pickupLocation: "DIFC, Gate Village",
            createdAt: "Nov 28 2026, 05:00 AM",
            status: "In Transit",
            driverStatus: DRIVER_SUB_STATUS.EN_ROUTE_TO_GARAGE,
            drivers: {
              mainDriver: { name: "Rahul Mehta", assignmentStatus: true },
              supportDriver: { name: "Abdul Rahman", assignmentStatus: true }
            },
            travel: { eta: "18 min", distance: "8.4 km", speed: "62 km/h" },
            arrival: { time: "05:42 AM", status: "On Time" },
            inspection: {
              status: true,
              progress: "complete",
              exterior: { scratches: true, lights: true, tyres: true, windscreen: true, bodyPanels: true },
              interior: { seats: true, dashboard: true, keysReceived: true, valuablesRemoved: true, odometer: "38,200 km", fuelLevel: "75%" },
              photos: { taken: 6, required: 6 },
            },
            garage: { name: "Al Quoz Auto Service Center", arrivedAt: null, technicianName: null },
            drop: {
              location: "Al Quoz Auto Service Center",
              time: null,
              estTime: "Nov 28 2026, 06:15 AM"
            }
          },
          {
            ticketId: "SM-8033",
            priority: "Normal",
            customerName: "Abdullah Al Shamsi",
            vehicle: { name: "BMW X5", number: "DXB K 5566" },
            pickupLocation: "Motor City, Green Community",
            createdAt: "Nov 28 2026, 04:30 AM",
            status: "In Transit",
            driverStatus: DRIVER_SUB_STATUS.ARRIVED_AT_GARAGE,
            drivers: {
              mainDriver: { name: "Khalid Al-Ameri", assignmentStatus: true },
              supportDriver: { name: "Tariq Hassan", assignmentStatus: true }
            },
            travel: { eta: "Arrived", distance: "12.1 km", speed: "0 km/h" },
            arrival: { time: "05:10 AM", status: "On Time" },
            inspection: {
              status: true,
              progress: "complete",
              exterior: { scratches: true, lights: true, tyres: true, windscreen: true, bodyPanels: true },
              interior: { seats: true, dashboard: true, keysReceived: true, valuablesRemoved: true, odometer: "55,420 km", fuelLevel: "45%" },
              photos: { taken: 6, required: 6 },
            },
            garage: {
              name: "SZR Auto Service Zone",
              arrivedAt: "Nov 28 2026, 05:48 AM",
              technicianName: null,
              checklist: { delivered: true, keysHanded: true, parkingNoted: true, receiptReceived: false },
            },
            drop: {
              location: "SZR Auto Service Zone",
              time: null,
              estTime: "Nov 28 2026, 05:45 AM"
            }
          },
        ]
      },

      {
        labelId: 6,
        labelName: "Completed",
        tickets: [
          {
            ticketId: "SM-8030",
            priority: "VIP",
            customerName: "Mohammed Al Hashimi",
            vehicle: { name: "Rolls Royce Cullinan", number: "DXB M 7788" },
            pickupLocation: "Emirates Hills, Villa 18",
            createdAt: "Nov 27 2026, 08:00 AM",
            status: "Completed",
            driverStatus: DRIVER_SUB_STATUS.GARAGE_HANDOVER,
            drivers: {
              mainDriver: { name: "Rahul Mehta", assignmentStatus: true },
              supportDriver: { name: "Arun Kumar", assignmentStatus: true }
            },
            travel: { eta: "Completed", distance: "12.4 km" },
            arrival: { time: "08:38 AM", status: "On Time" },
            inspection: {
              status: true,
              progress: "complete",
              exterior: { scratches: true, lights: true, tyres: true, windscreen: true, bodyPanels: true },
              interior: { seats: true, dashboard: true, keysReceived: true, valuablesRemoved: true, odometer: "22,150 km", fuelLevel: "80%" },
              photos: { taken: 6, required: 6 },
            },
            garage: {
              name: "Al Quoz Auto Service Center",
              arrivedAt: "Nov 27 2026, 09:15 AM",
              technicianName: "Ahmad Technician",
              checklist: { delivered: true, keysHanded: true, parkingNoted: true, receiptReceived: true },
            },
            drop: {
              location: "Al Quoz Auto Service Center",
              time: "Nov 27 2026, 09:15 AM",
              estTime: "Nov 27 2026, 09:10 AM"
            }
          },
        ]
      }

    ]
  }
];
