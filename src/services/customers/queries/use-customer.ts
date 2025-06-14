import { useQuery } from "@tanstack/react-query";
import { getCustomer } from "../api";
import { QK_CUSTOMER } from "../../../constants";

export function useCustomer() {
  return useQuery({
    queryKey: [QK_CUSTOMER],
    queryFn: getCustomer,
  });
}
