import { LS_TOKEN } from "@/constants";
import Axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL;
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
