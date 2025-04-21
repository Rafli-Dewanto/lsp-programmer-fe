import { useQuery } from "@tanstack/react-query";
import { getCake, getCakes } from "../api";
import { QK_CAKES } from "@/constants";
import { CakesQueryParams } from "../types";

export function useCakes(params: CakesQueryParams) {
  return useQuery({
    queryKey: [QK_CAKES, params],
    queryFn: () => getCakes(params),
  });
}

export function useCake(id: number) {
  return useQuery({
    queryKey: [id],
    queryFn: () => getCake(id),
  });
}
