import { QK_CUSTOMER } from "@/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authorize, login, register } from "../api";

export function useRegister() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: register,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QK_CUSTOMER] });
    },
  });
}

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QK_CUSTOMER] });
    },
  });
}

export function useAuthorize() {
  return useMutation({
    mutationFn: authorize,
  });
}
