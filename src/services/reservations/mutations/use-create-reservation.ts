import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QK_RESERVATIONS } from "../../../constants";
import { createReservation } from "../api";

export function useCreateReservation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createReservation,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QK_RESERVATIONS],
      });
    },
  });
}
