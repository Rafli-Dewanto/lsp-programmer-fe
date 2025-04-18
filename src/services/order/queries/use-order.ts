import { QK_ORDERS } from "@/constants";
import { useQuery } from "@tanstack/react-query";
import { GetOrderCake } from "../api";

export function useOrder() {
  return useQuery({
    queryKey: [QK_ORDERS],
    queryFn: GetOrderCake,
  });
}
