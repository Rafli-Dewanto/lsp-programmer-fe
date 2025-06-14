import { useQuery } from "@tanstack/react-query";
import { getMenu, getMenus } from "../api";
import { QK_MENUS } from "@/constants";
import { MenuQueryParams } from "../types";

export function useMenus(params: MenuQueryParams) {
  return useQuery({
    queryKey: [QK_MENUS, params],
    queryFn: () => getMenus(params),
  });
}

export function useMenu(id: number) {
  return useQuery({
    queryKey: [id],
    queryFn: () => getMenu(id),
  });
}
