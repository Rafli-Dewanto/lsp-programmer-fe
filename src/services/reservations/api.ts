import { apiResolver, Response } from "../../utils/api";
import axios from "../axios";
import {
  CreateReservationPayload,
  Reservation,
  UpdateReservation,
} from "./types";

export function getReservations(forAdmin: boolean) {
  const url = forAdmin ? "/reservations/admin" : "/reservations";
  return apiResolver<Response<Reservation[]>>(() => axios.get(url));
}

export function getReservation(id: number) {
  return apiResolver<Response<Reservation>>(() =>
    axios.get(`/reservations/${id}`)
  );
}

export function createReservation(payload: CreateReservationPayload) {
  return apiResolver<Response<Reservation>>(() =>
    axios.post("/reservations", payload)
  );
}

export function updateReservation(
  reservation: UpdateReservation & { id: number }
) {
  const { id, ...updateReservation } = reservation;
  return apiResolver<Response<Reservation>>(() =>
    axios.put(`/reservations/${id}`, updateReservation)
  );
}

export function deleteReservation(id: number) {
  return apiResolver<Response>(() => axios.delete(`/reservations/${id}`));
}
