import { apiResolver, Response } from "@/utils/api";
import axios from "../axios";
import { Login, AuthResponse, Register, Token } from "./types";

export function register(payload: Register) {
  return apiResolver<Response<AuthResponse>>(() =>
    axios.post("/register", payload)
  );
}

export function login(payload: Login) {
  return apiResolver<Response<Token>>(() => axios.post("/login", payload));
}

export function authorize() {
  return apiResolver<Response>(() => axios.get("/authorize"));
}
