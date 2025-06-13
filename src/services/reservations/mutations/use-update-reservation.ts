import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QK_RESERVATIONS } from "../../../constants";
import { updateReservation } from "../api";

export function useUpdateReservation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateReservation,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QK_RESERVATIONS],
      });
    },
  });
}