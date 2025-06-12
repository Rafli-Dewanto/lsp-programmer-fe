import { QK_INVENTORIES } from "../../../constants";
import { getInventories, getInventory } from "../api";
import { useQuery } from "@tanstack/react-query";

export function useInventories() {
  return useQuery({
    queryKey: [QK_INVENTORIES],
    queryFn: getInventories,
  });
}

export function useInventory(id: string) {
  return useQuery({
    queryKey: [QK_INVENTORIES, id],
    queryFn: () => getInventory(id),
  });
}