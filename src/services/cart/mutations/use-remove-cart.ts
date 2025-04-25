import { QK_CARTS } from "@/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RemoveCartItem } from "../api";

export function useRemoveCart() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: RemoveCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QK_CARTS] });
    },
  });
}