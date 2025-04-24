import { QK_ORDERS } from "@/constants";
import { useQuery } from "@tanstack/react-query";
import { GetOrderById } from "../api";

export function useCustomersOrders({ page }: { page?: number }) {
  return useQuery({
    queryKey: [QK_ORDERS, page],
    queryFn: () => GetOrderById(page),
  });
}