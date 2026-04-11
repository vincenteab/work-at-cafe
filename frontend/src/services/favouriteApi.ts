import { apiClient } from "./api";

export interface Cafe {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  userId?: number;
}

export const favouriteService = {
  getAll: async () => {
    const response = await apiClient.get<Cafe[]>("/favourites");
    return response.data;
  },

  create: async (data: { cafeId: number }) => {
    const response = await apiClient.post<Cafe>("/favourites", data);
    return response.data;
  },

  delete: async (id: number) => {
    await apiClient.delete(`/favourites/${id}`);
  },
};
