import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCake } from "../api";
import { QK_CAKES } from "@/constants";

export function useCreateCake() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCake,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QK_CAKES],
      });
    },
  });
}
