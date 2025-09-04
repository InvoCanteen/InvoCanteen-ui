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

// ---------------------------------------

// API Register
export const api_register = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API,
  //Save cookies
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

api_register.interceptors.response.use(
  (res) => res,
  (err) => {
    const msg =
      err?.response?.data?.message ||
      err?.message ||
      "Terjadi kesalahan jaringan";
    return Promise.reject(new Error(msg));
  }
);

// ---------------------------------------

export const api_product = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

export async function getProducts() {
  const res = await api_product.get(
    "/api/product/get?sortBy=price&order=asc&minPrice=&maxPrice=&limit=&offset="
  );
  return res.data;
}

// ---------------------------------------

export const api_allcart = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

export async function getAllcart() {
  const res = await api_allcart.get("api/cart");
  const data = res.data;

  // 1 id teratas
  if (Array.isArray(data) && data.length > 0) {
    console.log("Last Order ID :", data[0].id);
  } else {
    console.log("Tidak ada data cart");
  }

  return data;
}