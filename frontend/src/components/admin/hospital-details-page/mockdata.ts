import type { HospitalStatus } from "../hospitals-page/types";

export const mockHospitalDetails = {
  id: "hosp-1",
  name: "City Health Hospital",
  address: "MG Road, Bangalore",
  status: "PENDING" as HospitalStatus,
  staffName: "Ramesh Kumar",
  staffEmail: "ramesh@cityhealth.com",
  staffPhone: "9876543210",
  availableVaccines: ["Covishield", "Covaxin"],
  workingHours: "9:00 AM – 5:00 PM",
  createdAt: "2026-01-10",
};

export const statusVariant: Record<
  HospitalStatus,
  "default" | "secondary" | "destructive"
> = {
  PENDING: "secondary",
  APPROVED: "default",
  REJECTED: "destructive",
};
