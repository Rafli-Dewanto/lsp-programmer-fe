import { useQuery } from "@tanstack/react-query";
import { QK_RESERVATIONS } from "../../../constants";
import { getReservation, getReservations } from "../api";

export function useReservations(forAdmin: boolean) {
  return useQuery({
    queryFn: () => getReservations(forAdmin),
    queryKey: [QK_RESERVATIONS, forAdmin],
  });
}

export function useReservation(id: string) {
  return useQuery({
    queryFn: () => getReservation(id),
    queryKey: [QK_RESERVATIONS, id],
    enabled: !!id,
  });
}
