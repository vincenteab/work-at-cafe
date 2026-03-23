// src/services/api.ts
import axios from "axios";

export const apiClient = axios.create({
  // Make sure this matches the port your Express server is running on!
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
