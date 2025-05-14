import { useState, ReactNode, useEffect } from "react";
import { AuthContext } from "../contexts/authContext";
import { loginService } from "../services/authService";
import axiosInstance from "../axiosInstance";
import axios from "axios";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{ id: string; email: string } | null>(null);
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
    await axiosInstance.post(
      "http://localhost:3000/api/logout",
      {},
      { withCredentials: true }
    );
    setUser(null);
  };

  const fetchUser = async () => {
    try {
      const response = await axiosInstance.get("http://localhost:3000/api/me");
      setUser({ id: response.data.user, email: response.data.email ?? null });
    } catch (err) {
      setUser(null);
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        throw new Error(err.response.data.message);
      } else {
        console.error(err);
        throw new Error("Unknown error at fetchUser");
      }
    }
  };

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

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
