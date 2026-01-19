import type { AuthUser, LoginResponse } from "@/types/auth";

export const mockLoginApi = async (
  email: string,
  password: string,
): Promise<LoginResponse> => {
  // simulate network delay
  await new Promise((res) => setTimeout(res, 500));

  let user: AuthUser;

  if (email === "user@test.com") {
    user = { id: "u1", email, role: "user" };
  } else if (email === "staff@test.com") {
    user = { id: "s1", email, role: "staff" };
  } else if (email === "admin@test.com") {
    user = { id: "a1", email, role: "admin" };
  } else {
    throw new Error("Invalid credentials");
  }

  console.log("from mock api : ", user);

  const token = `mock-${user.role}-token`;

  localStorage.setItem("token", token);

  localStorage.setItem("storedUser", JSON.stringify(user));

  return { token, user };
};
