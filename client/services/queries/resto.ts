import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../api/axios";
import type { Restaurant } from "@/types";

export function useRestaurantsQuery(params?: {
  q?: string;
  city?: string;
  sort?: string;
}) {
  return useQuery({
    queryKey: ["restaurants", params],
    queryFn: async () => {
      const { data } = await axios.get<Restaurant[]>("/resto", { params });
      return data;
    },
    staleTime: 60_000,
  });
}

export function useRestaurantDetailQuery(id?: string | number) {
  return useQuery({
    enabled: !!id,
    queryKey: ["restaurant", id],
    queryFn: async () => {
      const { data } = await axios.get(`/resto/${id}`);
      return data as any;
    },
    staleTime: 60_000,
  });
}

// Optional server cart syncing (requires auth token)
export function useCartMutations() {
  const qc = useQueryClient();
  const add = useMutation({
    mutationFn: async (payload: {
      menuId: number | string;
      quantity: number;
    }) => {
      const { data } = await axios.post("/cart", payload);
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cart"] });
    },
  });
  const update = useMutation({
    mutationFn: async (payload: { id: number | string; quantity: number }) => {
      const { data } = await axios.put(`/cart/${payload.id}`, {
        quantity: payload.quantity,
      });
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["cart"] }),
  });
  const remove = useMutation({
    mutationFn: async (id: number | string) => {
      const { data } = await axios.delete(`/cart/${id}`);
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["cart"] }),
  });
  return { add, update, remove };
}
