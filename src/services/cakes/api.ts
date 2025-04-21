import { apiResolver, MetaData, Response } from "@/utils/api";
import axios from "../axios";
import { Cake, CakesQueryParams } from "./types";

export function getCakes(params: CakesQueryParams) {
  return apiResolver<Response<Cake[], MetaData>>(() =>
    axios.get("/cakes", {
      params: {
        page: params.page || 1,
        title: params.title,
        price: params.price,
        category: params.category,
      },
    })
  );
}

export function getCake(id: number) {
  return apiResolver<Response<Cake>>(() => axios.get(`/cakes/${id}`));
}

export function createCake(payload: Cake) {
  console.log(payload);
  return apiResolver<Response<Cake>>(() =>
    axios.post("/cakes", {
      title: payload.title,
      description: payload.description,
      price: Number(payload.price),
      category: payload.category,
      image: payload.image_url,
    })
  );
}

export function updateCake(payload: Cake) {
  const { id, ...data } = payload;
  return apiResolver<Response<Cake>>(() => axios.put(`/cakes/${id}`, data));
}

export function deleteCake(id: number) {
  return apiResolver<Response<string>>(() => axios.delete(`/cakes/${id}`));
}
