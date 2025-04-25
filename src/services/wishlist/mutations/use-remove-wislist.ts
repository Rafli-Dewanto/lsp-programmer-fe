import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeFromWishlist } from "../api";
import { QK_WISHLIST } from "@/constants";

export function useRemoveWishlist() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeFromWishlist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QK_WISHLIST] });
    },
  });
}
