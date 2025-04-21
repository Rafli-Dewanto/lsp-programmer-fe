import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCake } from "../api";
import { QK_CAKES } from "@/constants";

export function useUpdateCake() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCake,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QK_CAKES],
      });
    },
  });
}
