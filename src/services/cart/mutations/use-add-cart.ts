import { QK_CARTS } from "@/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddToCart } from "../api";

export function useAddCart() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: AddToCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QK_CARTS] });
    },
  });
}