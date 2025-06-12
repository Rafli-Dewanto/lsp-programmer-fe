import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTable } from "../api";
import { QK_TABLES } from "@/constants";

export function useDeleteTable() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTable,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QK_TABLES],
      });
    },
  });
}