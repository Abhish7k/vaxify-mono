import type { AdminHospital } from "./types";

export const mockHospitals: AdminHospital[] = [
  {
    id: "hosp-1",
    name: "City Health Hospital",
    address: "MG Road, Bangalore",
    staffName: "Ramesh Kumar",
    staffEmail: "ramesh@cityhealth.com",
    status: "PENDING",
  },
  {
    id: "hosp-2",
    name: "Apollo Care Center",
    address: "Indiranagar, Bangalore",
    staffName: "Anita Verma",
    staffEmail: "anita@apollo.com",
    status: "APPROVED",
  },
  {
    id: "hosp-3",
    name: "Green Life Hospital",
    address: "Whitefield, Bangalore",
    staffName: "Kunal Mehta",
    staffEmail: "kunal@greenlife.com",
    status: "APPROVED",
  },
];
