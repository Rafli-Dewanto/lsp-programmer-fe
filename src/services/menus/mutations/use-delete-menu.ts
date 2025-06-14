import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMenu } from "../api";
import { QK_MENUS } from "@/constants";

export function useDeleteMenu() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMenu,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QK_MENUS],
      });
    },
  });
}
