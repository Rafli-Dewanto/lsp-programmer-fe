import { apiResolver, MetaData, Response } from "@/utils/api";
import axios from "../axios";
import { GetOrderResponse, OrderPayload, OrderResponse } from "./types";

export function PlaceOrderCake(payload: OrderPayload) {
  return apiResolver<Response<OrderResponse>>(() =>
    axios.post("/orders", {
      items: payload.items,
    })
  );
}

export function GetOrderCake() {
  return apiResolver<Response<GetOrderResponse[]>>(() => axios.get(`/orders`));
}

export function GetOrderById(page?: number) {
  return apiResolver<Response<GetOrderResponse[], MetaData>>(() =>
    axios.get(`/orders/customers`, {
      params: {
        page: page || 1,
        limit: 10,
      },
    })
  );
}
