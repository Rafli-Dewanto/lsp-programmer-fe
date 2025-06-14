import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMenu } from "../api";
import { QK_MENUS } from "@/constants";

export function useCreateMenu() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createMenu,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QK_MENUS],
      });
    },
  });
}
