import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerEmployee } from "../api";
import { QK_CUSTOMER } from "@/constants";

export function useRegisterEmployee() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: registerEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QK_CUSTOMER],
      });
    },
  });
}
