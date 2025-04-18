import { QK_ORDERS } from "@/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PlaceOrderCake } from "../api";

export function usePlaceOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: PlaceOrderCake,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QK_ORDERS],
      });
    },
  });
}
