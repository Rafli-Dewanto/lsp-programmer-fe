import { apiResolver, Response } from "@/utils/api";
import axios from "../axios";
import { CreateInventory, Inventory, UpdateInventory } from "./types";

export function getInventories() {
  return apiResolver<Response<Inventory[]>>(() => axios.get("/inventories"));
}

export function getInventory(id: string) {
  return apiResolver<Response<Inventory>>(() =>
    axios.get(`/inventories/by-id/${id}`)
  );
}

export function createInventory(data: CreateInventory) {
  return apiResolver<Response<Inventory>>(() =>
    axios.post("/inventories", data)
  );
}

export function updateInventory(data: UpdateInventory & { id: string }) {
  return apiResolver<Response<Inventory>>(() =>
    axios.put(`/inventories/${data.id}`, {
      name: data.name,
      quantity: data.quantity,
      unit: data.unit,
      minimum_stock: data.minimum_stock,
      reorder_point: data.reorder_point,
      unit_price: data.unit_price,
    })
  );
}

export function deleteInventory(id: string) {
  return apiResolver<Response>(() => axios.delete(`/inventories/${id}`));
}
