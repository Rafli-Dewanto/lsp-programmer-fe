import { apiResolver, Response } from "@/utils/api";
import axios from "../axios";
import { Menu } from "../menus/types";

export type Wishlist = {
  id: number;
  title: string;
  price: number;
  image?: string;
};

export function getWishlists() {
  return apiResolver<Response<Menu[]>>(() => axios.get("/wishlists"));
}

export function addToWishlist(menuID: number) {
  return apiResolver<Response<void>>(() => axios.post(`/wishlists/${menuID}`));
}

export function removeFromWishlist(menuID: number) {
  return apiResolver<Response<void>>(() =>
    axios.delete(`/wishlists/${menuID}`)
  );
}
