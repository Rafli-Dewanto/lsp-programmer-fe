import { useQuery } from "@tanstack/react-query";
import { GetCustomerCarts } from "../api";
import { QK_CARTS } from "@/constants";

export function useCarts() {
  return useQuery({
    queryKey: [QK_CARTS],
    queryFn: GetCustomerCarts,
  });
}
