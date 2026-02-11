import { AuthResponse, User, ApiResponse } from "../types";
import api from "./api";

export const authService = {
  async register(
    name: string,
    email: string,
    password: string,
  ): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/auth/register", {
      name,
      email,
      password,
    });

    if (response.data.success) {
      localStorage.setItem("token", response.data.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.data.user));
    }

    return response.data;
  },

  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/auth/login", {
      email,
      password,
    });

    if (response.data.success) {
      localStorage.setItem("token", response.data.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.data.user));
    }

    return response.data;
  },

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  },

  async getMe(): Promise<User | null> {
    try {
      const response = await api.get<ApiResponse<{ user: User }>>("/auth/me");
      return response.data.data?.user || null;
    } catch (error) {
      return null;
    }
  },

  getToken(): string | null {
    return localStorage.getItem("token");
  },

  getUser(): User | null {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },
};
