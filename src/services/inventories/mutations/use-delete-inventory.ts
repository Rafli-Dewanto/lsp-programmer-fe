import { QK_INVENTORIES } from "../../../constants";
import { deleteInventory } from "../api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteInventory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteInventory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QK_INVENTORIES],
      });
    },
  });
}