import { useQuery } from "@tanstack/react-query";
import { getWishlists } from "../api";
import { QK_WISHLIST } from "@/constants";

export function useWishlist() {
  return useQuery({
    queryKey: [QK_WISHLIST],
    queryFn: getWishlists,
  });
}