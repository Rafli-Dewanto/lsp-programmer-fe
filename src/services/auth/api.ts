import { apiResolver, Response } from "@/utils/api";
import axios from "../axios";
import { Login, AuthResponse, Register, token } from "./types";

export function register(payload: Register) {
  return apiResolver<Response<AuthResponse>>(() =>
    axios.post("/register", payload)
  );
}

export function login(payload: Login) {
  return apiResolver<Response<token>>(() =>
    axios.post("/login", payload)
  );
}
