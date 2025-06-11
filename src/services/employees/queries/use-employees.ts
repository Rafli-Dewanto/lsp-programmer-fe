import { useQuery } from "@tanstack/react-query";
import { getEmployee, getEmployees } from "../api";
import { QK_CUSTOMER } from "@/constants";

export function useEmployees() {
  return useQuery({
    queryKey: [QK_CUSTOMER],
    queryFn: () => getEmployees(),
  });
}

export function useEmployee(id: string) {
  return useQuery({
    queryKey: [QK_CUSTOMER, id],
    queryFn: () => getEmployee(id),
  });
}
