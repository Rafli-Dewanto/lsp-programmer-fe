import { EMPLOYEE_ROLES } from "@/constants";
import { AuthResponse, Register } from "../auth/types";
import { apiResolver, Response } from "@/utils/api";
import axios from "../axios";
import { Employee, UpdateEmployeePayload } from "./types";

export function registerEmployee(payload: Register & { role: EMPLOYEE_ROLES }) {
  return apiResolver<Response<AuthResponse>>(() =>
    axios.post("/register", payload, {
      headers: {
        "x-app-role": payload.role,
      },
    })
  );
}

export function getEmployees() {
  return apiResolver<Response<Employee[]>>(() => axios.get(`/employees`));
}

export function getEmployee(id: string) {
  return apiResolver<Response<Employee>>(() => axios.get(`/employees/${id}`));
}

export function updateEmployee(
  payload: UpdateEmployeePayload & { id: string }
) {
  return apiResolver<Response<AuthResponse>>(() =>
    axios.put(
      `/employees/${payload.id}`,
      {
        name: payload.name,
        email: payload.email,
        address: payload.address,
      },
      {
        headers: {
          "x-app-role": payload.role,
        },
      }
    )
  );
}

export function deleteEmployee(id: string) {
  return apiResolver<Response>(() => axios.delete(`/employees/${id}`));
}
