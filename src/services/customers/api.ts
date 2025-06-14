import { apiResolver, Response } from "../../utils/api";
import axios from "../axios";
import { CustomerResponse, UpdateCustomerPayload } from "./types";

export function getCustomer() {
  return apiResolver<Response<CustomerResponse>>(() =>
    axios.get(`/customers/me`)
  );
}

export function updateCustomer({
  id,
  payload,
}: {
  id: number;
  payload: UpdateCustomerPayload;
}) {
  return apiResolver<Response<CustomerResponse>>(() =>
    axios.put(`/customers/${id}`, payload)
  );
}
