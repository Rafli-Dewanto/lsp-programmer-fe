import { QK_INVENTORIES } from "../../../constants";
import { updateInventory } from "../api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateInventory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateInventory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QK_INVENTORIES],
      });
    },
  });
}