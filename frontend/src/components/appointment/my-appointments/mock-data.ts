import type { Appointment } from "./MyAppointmentsListSection";

export const mockAppointments: Appointment[] = [
  {
    id: "apt-1",
    centerId: "center-1",
    centerName: "City Health Hospital",
    centerAddress: "MG Road, Bangalore",
    vaccine: "Covishield",
    date: "2026-02-10",
    timeSlot: "10:00 AM – 11:00 AM",
    status: "BOOKED",
  },
  {
    id: "apt-2",
    centerId: "center-2",
    centerName: "Apollo Care Center",
    centerAddress: "Indiranagar, Bangalore",
    vaccine: "Covaxin",
    date: "2026-01-15",
    timeSlot: "11:00 AM – 12:00 AM",
    status: "COMPLETED",
  },
  {
    id: "apt-3",
    centerId: "center-3",
    centerName: "Green Life Hospital",
    centerAddress: "Whitefield, Bangalore",
    vaccine: "Covishield",
    date: "2026-01-05",
    timeSlot: "09:00 AM – 10:00 AM",
    status: "CANCELLED",
  },
];
