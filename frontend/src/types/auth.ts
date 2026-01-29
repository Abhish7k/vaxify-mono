export type Role = "user" | "staff" | "admin";

export interface AuthUser {
  id: string;
  email: string;
  role: Role;
  name?: string;
  phone?: string;
}

export interface LoginResponse {
  token: string;
  user: AuthUser;
}
