import type { LoginResponse } from "@/types/auth";
import api from "./axios";

export const loginApi = async (
  email: string,
  password: string,
): Promise<LoginResponse> => {
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
