import { apiResolver, Response } from "@/utils/api";
import axios from "../axios";
import { Cake } from "./types";

export function getCakes() {
  return apiResolver<Response<Cake>>(() => axios.post("/cakes"));
}
