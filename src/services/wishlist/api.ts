import { apiResolver, Response } from "@/utils/api";
import axios from "../axios";
import { Cake } from "../cakes/types";

export type Wishlist = {
  id: number;
  title: string;
  price: number;
  image?: string;
};

export function getWishlists() {
  return apiResolver<Response<Cake[]>>(() => axios.get("/wishlists"));
}

export function addToWishlist(cakeId: number) {
  return apiResolver<Response<void>>(() => axios.post(`/wishlists/${cakeId}`));
}

export function removeFromWishlist(cakeId: number) {
  return apiResolver<Response<void>>(() =>
    axios.delete(`/wishlists/${cakeId}`)
  );
}
