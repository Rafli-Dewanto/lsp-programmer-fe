import { useQuery } from "@tanstack/react-query";
import { getCakes } from "../api";
import { QK_CAKES } from "@/constants";

export function useCakes() {
  return useQuery({
    queryKey: [QK_CAKES],
    queryFn: getCakes,
  });
}
