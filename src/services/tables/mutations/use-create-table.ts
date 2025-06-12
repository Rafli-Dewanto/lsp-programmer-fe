import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTable } from "../api";
import { QK_TABLES } from "@/constants";

export function useCreateTable() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTable,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QK_TABLES],
      });
    },
  });
}
