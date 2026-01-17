import { useAuthContext } from "./AuthContext";

// custom hook for the components to use
export const useAuth = () => {
  const { user } = useAuthContext();

  // login action
  const login = async (email: string, password: string) => {
    // TODO
    // - call api
    // - store token
    // - update auth context
    // - redirect based on role
  };

  // logout action
  const logout = () => {
    // TODO
    // - remove toke
    // - reset auth data
    // - redirect
  };

  return {
    user,
    login,
    logout,
    isAuthenticated: !!user,
  };
};
