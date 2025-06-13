import { useQuery } from "@tanstack/react-query";
import { getPendingPaymentURL } from "../api";
import { QK_PAYMENTS } from "../../../constants";

export function usePaymentURL(orderID: string) {
  return useQuery({
    queryKey: [QK_PAYMENTS, orderID],
    queryFn: () => getPendingPaymentURL(orderID),
    enabled: !!orderID,
  });
}
