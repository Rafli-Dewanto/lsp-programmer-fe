import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QK_CUSTOMER } from "../../../constants";
import { updateCustomer } from "../api";

export function useUpdateCustomer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [QK_CUSTOMER],
    mutationFn: updateCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QK_CUSTOMER],
      });
    },
  });
}
