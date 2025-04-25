import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToWishlist } from "../api";
import { QK_WISHLIST } from "@/constants";

export function useAddWishlist() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addToWishlist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QK_WISHLIST] });
    },
  });
}
