import { QK_INVENTORIES } from "../../../constants";
import { createInventory } from "../api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateInventory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createInventory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QK_INVENTORIES],
      });
    },
  });
}
