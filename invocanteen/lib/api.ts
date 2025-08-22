import axios from "axios";

// API Login
export const api_login = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API,
  //Save cookies
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

api_login.interceptors.response.use(
  (res) => res,
  (err) => {
    const msg =
      err?.response?.data?.message ||
      err?.message ||
      "Terjadi kesalahan jaringan";
    return Promise.reject(new Error(msg));
  }
);