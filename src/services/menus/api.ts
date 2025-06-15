import { apiResolver, MetaData, Response } from "@/utils/api";
import axios from "../axios";
import { Menu, MenuQueryParams } from "./types";

export function getMenus(params: MenuQueryParams) {
  return apiResolver<Response<Menu[], MetaData>>(() =>
    axios.get("/menus", {
      params: {
        page: params.page || 1,
        title: params.title,
        price: params.price,
        category: params.category,
        limit: params.limit || 10,
      },
    })
  );
}

export function getMenu(id: number) {
  return apiResolver<Response<Menu>>(() => axios.get(`/menus/${id}`));
}

export function createMenu(payload: Menu) {
  return apiResolver<Response<Menu>>(() =>
    axios.post("/menus", {
      title: payload.title,
      description: payload.description,
      quantity: Number(payload.quantity),
      price: Number(payload.price),
      category: payload.category,
      image: payload.image,
    })
  );
}

export function updateMenu(payload: Menu) {
  const { id, ...data } = payload;
  return apiResolver<Response<Menu>>(() => axios.put(`/menus/${id}`, data));
}

export function deleteMenu(id: number) {
  return apiResolver<Response<string>>(() => axios.delete(`/menus/${id}`));
}
