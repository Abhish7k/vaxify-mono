import type { StaffAppointment } from "./StaffAppointmentsListSection";

export const mockStaffAppointments: StaffAppointment[] = [
  {
    id: "sapt-1",
    patientName: "Rahul Sharma",
    patientPhone: "9876543210",
    vaccine: "Covishield",
    date: "2026-02-10",
    timeSlot: "10:00 AM – 11:00 AM",
    status: "UPCOMING",
  },
  {
    id: "sapt-2",
    patientName: "Anita Verma",
    patientPhone: "9123456789",
    vaccine: "Covaxin",
    date: "2026-02-08",
    timeSlot: "11:00 AM – 12:00 PM",
    status: "COMPLETED",
  },
  {
    id: "sapt-3",
    patientName: "Kunal Mehta",
    patientPhone: "9988776655",
    vaccine: "Covishield",
    date: "2026-02-05",
    timeSlot: "09:00 AM – 10:00 AM",
    status: "COMPLETED",
  },
];
