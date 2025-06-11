import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateEmployee } from "../api";
import { QK_CUSTOMER } from "@/constants";

export function useUpdateEmployee() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QK_CUSTOMER],
      });
    },
  });
}
