import { apiResolver, Response } from "../../utils/api";
import axios from "../axios";

type PaymentURL = string;

export function getPendingPaymentURL(orderID: string) {
  return apiResolver<Response<PaymentURL>>(() =>
    axios.get(`/payments/${orderID}`)
  );
}
