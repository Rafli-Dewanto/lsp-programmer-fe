import { apiResolver, MetaData, Response } from "@/utils/api";
import axios from "../axios";
import { AddToCartPayload, CartResponse } from "./types";
import { Token } from "../auth/types";

export function AddToCart(payload: AddToCartPayload) {
  return apiResolver<Response<Token>>(() => axios.post(`/carts`, payload));
}

export function GetCustomerCarts() {
  return apiResolver<Response<CartResponse, MetaData>>(() =>
    axios.get(`/carts/customer`)
  );
}

export function RemoveCartItem(id: number) {
  return apiResolver<Response<CartResponse, MetaData>>(() =>
    axios.delete(`/carts/${id}`)
  );
}
