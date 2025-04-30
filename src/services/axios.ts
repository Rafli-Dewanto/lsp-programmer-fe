import { LS_TOKEN } from "@/constants";
import Axios from "axios";

const baseURL = process.env.NODE_ENV === "production" ? "https://api-cakeville.dewanto.dev" : "http://localhost:8080";
const axios = Axios.create({
  baseURL,
});

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem(LS_TOKEN);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axios;
