import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCake } from "../api";
import { QK_CAKES } from "@/constants";

export function useDeleteCake() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCake,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QK_CAKES],
      });
    },
  });
}