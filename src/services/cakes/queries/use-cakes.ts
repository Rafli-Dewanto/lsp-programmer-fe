import { useQuery } from "@tanstack/react-query";
import { getCakes } from "../api";

export function useCakes() {
  return useQuery({
    queryKey: ["cakes"],
    queryFn: getCakes,
  });
}