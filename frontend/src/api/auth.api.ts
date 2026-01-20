import type { LoginResponse } from "@/types/auth";
import api from "./axios";
import { mockLoginApi } from "./auth.mock.api";

const USE_MOCKS = "true";

export const loginApi = async (
  email: string,
  password: string,
): Promise<LoginResponse> => {
  // for testing only
  if (USE_MOCKS) {
    return mockLoginApi(email);
  }

  const response = await api.post<LoginResponse>("/auth/login", {
    email,
    password,
  });

  return response.data;
};

export const registerUserApi = async (registerUserData: unknown) => {
  await api.post("/auth/register/user", registerUserData);
};

export const registerStaffApi = async (registerStaffData: unknown) => {
  await api.post("/auth/register/staff", registerStaffData);
};
