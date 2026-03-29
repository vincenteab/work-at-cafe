import { apiClient } from "./api";

export interface User {
  id: number;
  email: string;
  name: string | null;
}

interface AuthResponse {
  message: string;
  user: User;
  token: string;
}

const saveTokenAndUser = (token: string, user: User) => {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
};

export const authService = {
  register: async (data: any) => {
    const response = await apiClient.post<AuthResponse>(
      "/users/register",
      data,
    );

    if (response.data.token) {
      saveTokenAndUser(response.data.token, response.data.user);
    }
    return response.data;
  },

  login: async (data: any) => {
    const response = await apiClient.post<AuthResponse>("/users/login", data);

    // If login works and token comes back, save it in localStorage
    if (response.data.token) {
      saveTokenAndUser(response.data.token, response.data.user);
    }

    return response.data;
  },

  logout: () => {
    // Logging out is deleting the token and user from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },
};
