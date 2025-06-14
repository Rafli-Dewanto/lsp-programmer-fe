import { QK_CARTS } from "@/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BulkRemoveCartItem, RemoveCartItem } from "../api";

export function useRemoveCart() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: RemoveCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QK_CARTS] });
    },
  });
}

export function useBulkRemoveCart() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: BulkRemoveCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QK_CARTS] });
    },
  });
}