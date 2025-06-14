import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMenu } from "../api";
import { QK_MENUS } from "@/constants";

export function useUpdateMenu() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMenu,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QK_MENUS],
      });
    },
  });
}
