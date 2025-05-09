import axiosInstance from "../axiosInstance";

export const loginService = async (email: string, password: string) => {
  try {
    const response = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password }),
      credentials: "include"
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed");
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Unknown error");
    }
  }
};

export const register = async (
  email: string,
  username: string,
  password: string
) => {
  await axiosInstance.post("http://localhost:3000/api/register", {
    email,
    username,
    password
  });
};
