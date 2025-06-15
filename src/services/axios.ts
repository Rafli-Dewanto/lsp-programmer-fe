import { COOKIE_TOKEN } from "@/constants";
import Axios from "axios";
import { getCookie } from "cookies-next/client";
import { logger } from "../utils/logger";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://api-cakeville.dewanto.dev"
    : "http://localhost:8080";

const axios = Axios.create({
  baseURL,
});

axios.interceptors.request.use((config) => {
  const token = getCookie(COOKIE_TOKEN);
  logger.trace("token", token);
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axios;
