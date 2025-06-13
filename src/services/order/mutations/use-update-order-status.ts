import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateFoodStatus } from "../api";
import { QK_ORDERS } from "../../../constants";
import { FoodStatus } from "../types";

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      orderId,
      status,
    }: {
      orderId: number;
      status: FoodStatus;
    }) => UpdateFoodStatus(orderId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QK_ORDERS],
      });
    },
  });
}
