import { useState, ReactNode, useEffect } from "react";
import { AuthContext } from "../contexts/authContext";
import { loginService } from "../services/authService";
import axiosInstance from "../axiosInstance";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{ id: string; } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await fetchUser();
      } catch (_) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    await loginService(email, password);
    await fetchUser();
  };

  const logout = async () => {
    await axiosInstance.post("http://localhost:3000/api/logout", {}, { withCredentials: true });
    setUser(null);
  };

  const fetchUser = async () => {
    try {
      const response = await axiosInstance.get("http://localhost:3000/api/me");
      setUser({ id: response.data.user });
    } catch (_) {
      setUser(null);
    }
  };

  console.log(user);
  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    fetchUser,
    loading
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
