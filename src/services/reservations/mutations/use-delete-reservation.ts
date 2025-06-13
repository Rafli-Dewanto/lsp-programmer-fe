import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QK_RESERVATIONS } from "../../../constants";
import { deleteReservation } from "../api";

export function useDeleteReservation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteReservation,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QK_RESERVATIONS],
      });
    },
  });
}
