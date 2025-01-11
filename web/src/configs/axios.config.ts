import env from "@/env";
import axios from "axios";
import { getCookie, setCookie, deleteCookie } from 'cookies-next';

const api = axios.create({
  baseURL: env.NEXT_PUBLIC_API_BASE_URL!,
  timeout: 50000,
});


api.interceptors.request.use(
  async (config) => {
    console.log('Request Interceptor Triggered');

    if (config.headers['X-Processed-By-Interceptor']) {
      console.log('Skipping processing for already processed request');
      return config;
    }

    config.headers['X-Processed-By-Interceptor'] = true;

    const token = getCookie('firebase_token');
    console.log('Retrieved Token:', token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error); 
  }
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
