import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTable } from "../api";
import { QK_TABLES } from "@/constants";

export function useUpdateTable() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTable,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QK_TABLES],
      });
    },
  });
}