import api from "./axios";
import { API_CONFIG } from "./api.config";

export interface AdminStats {
  totalHospitals: number;
  pendingApprovals: number;
  totalUsers: number;
  activeCenters: number;
  totalAppointments: number;
}

export const adminApi = {
  getStats: async (): Promise<AdminStats> => {
    if (API_CONFIG.USE_MOCKS && API_CONFIG.MODULES.ADMIN) {
      await new Promise((resolve) => setTimeout(resolve, 800));
      return {
        totalHospitals: 28,
        pendingApprovals: 7,
        totalUsers: 224,
        activeCenters: 40,
        totalAppointments: 156,
      };
    }

    const response = await api.get<AdminStats>("/admin/stats");
    return response.data;
  },

  getPendingHospitals: async (): Promise<any[]> => {
    if (API_CONFIG.USE_MOCKS && API_CONFIG.MODULES.ADMIN) {
      await new Promise((resolve) => setTimeout(resolve, 800));
      return [
        {
          id: 1,
          name: "City Care Hospital",
          location: "Pune, Maharashtra",
          requestedOn: "2026-01-18",
          status: "Pending",
        },
        {
          id: 2,
          name: "Green Valley Medical Center",
          location: "Pune, Maharashtra",
          requestedOn: "2026-01-19",
          status: "Pending",
        },
      ];
    }

    const response = await api.get<any[]>("/admin/hospitals/pending");
    return response.data;
  },

  getActivities: async (): Promise<any[]> => {
    if (API_CONFIG.USE_MOCKS && API_CONFIG.MODULES.ADMIN) {
      await new Promise((resolve) => setTimeout(resolve, 800));
      return [
        {
          id: "h-1",
          action: "Hospital approved",
          target: "City Care Hospital",
          type: "HOSPITAL",
          status: "APPROVED",
          timestamp: new Date().toISOString(),
        },
        {
          id: "u-1",
          action: "New user registered",
          target: "John Doe",
          type: "USER",
          timestamp: new Date().toISOString(),
        },
      ];
    }

    const response = await api.get<any[]>("/admin/stats/activities");
    return response.data;
  },
};
