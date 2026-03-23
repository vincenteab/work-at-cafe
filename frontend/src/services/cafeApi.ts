import { apiClient } from "./api";

export interface Cafe {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  userId?: number;
}

export const cafeService = {
  getAll: async () => {
    const response = await apiClient.get<Cafe[]>("/cafes");
    return response.data;
  },

  getById: async (id: number) => {
    const response = await apiClient.get<Cafe>(`/cafes/${id}`);
    return response.data;
  },

  create: async (data: {
    name: string;
    latitude: number;
    longitude: number;
    userId: number;
  }) => {
    const response = await apiClient.post<Cafe>("/cafes", data);
    return response.data;
  },

  update: async (id: number, data: Partial<Omit<Cafe, "id">>) => {
    const response = await apiClient.patch<Cafe>(`/cafes/${id}`, data);
    return response.data;
  },

  delete: async (id: number) => {
    await apiClient.delete(`/cafes/${id}`);
  },
};
