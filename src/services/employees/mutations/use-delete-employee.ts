import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteEmployee } from "../api";
import { QK_CUSTOMER } from "@/constants";

export function useDeleteEmployee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QK_CUSTOMER],
      });
    },
  });
}
