import axios from "axios";
import { CreateOrderPayload, MenuItem, Order } from "./types";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ?? error.message ?? "Something went wrong";

    return Promise.reject(
      new Error(Array.isArray(message) ? message.join(", ") : message),
    );
  },
);

export const api = {
  getMenu: async (): Promise<MenuItem[]> => {
    const { data } = await apiClient.get<MenuItem[]>("/menu");
    return data;
  },

  createOrder: async (payload: CreateOrderPayload): Promise<Order> => {
    const { data } = await apiClient.post<Order>("/orders", payload);
    return data;
  },

  getOrder: async (id: number): Promise<Order> => {
    const { data } = await apiClient.get<Order>(`/orders/${id}`);
    return data;
  },
};

export default apiClient;
