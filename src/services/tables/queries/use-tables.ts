import { useQuery } from "@tanstack/react-query";
import { getAllTables, getTable } from "../api";
import { QK_TABLES } from "@/constants";

export function useTables() {
  return useQuery({
    queryKey: [QK_TABLES],
    queryFn: getAllTables,
  });
}

export function useTable(id: number) {
  return useQuery({
    queryKey: [QK_TABLES, id],
    queryFn: () => getTable(id),
  });
}
