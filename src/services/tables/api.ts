import { apiResolver, MetaData, Response } from "@/utils/api";
import axios from "../axios";
import { CreateTablePayload, Table, UpdateAvailabilityPayload } from "./types";

export function getAllTables() {
  return apiResolver<Response<Table[], MetaData>>(() => axios.get("/tables"));
}

export function getTable(id: number) {
  return apiResolver<Response<Table>>(() => axios.get(`/tables/${id}`));
}

export function createTable(payload: CreateTablePayload) {
  return apiResolver<Response<Table>>(() => axios.post("/tables", payload));
}

export function updateTable(
  payload: UpdateAvailabilityPayload & { id: number }
) {
  return apiResolver<Response>(() =>
    axios.patch(`/tables/${payload.id}/availability`, {
      is_available: payload.is_available,
    })
  );
}

export function deleteTable(id: number) {
  return apiResolver<Response>(() => axios.delete(`/tables/${id}`));
}
