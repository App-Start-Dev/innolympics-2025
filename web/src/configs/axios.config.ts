import env from "@/env";
import axios from "axios";
import { cookies } from "next/headers";

const api = axios.create({
  baseURL: env.NEXT_PUBLIC_API_BASE_URL!,
  timeout: 50000,
});

api.interceptors.request.use(
  async (config) => {
    config.headers["Accept"] = "application/json";
    const token = (await cookies()).get("firebase_token")?.value;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized request");
    }
    return Promise.reject(error);
  },
);

export default api;
